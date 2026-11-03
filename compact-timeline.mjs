import {REGIONS,toOrdinal,fromOrdinal,activeAt} from './core.mjs';
import {timeWindow} from './atlas-model.mjs';
import {isPoliticalTimelineRecord,politicalTimelineRecords} from './political-timeline.mjs?v=2';
import {periodTracks} from './period-tracks.mjs?v=2';

// Choose one reading subject at each dated interval. Preserve the record's
// real dates; clipping here only controls the visual segment in this strip.
function primaryRows(records,window,selectedId){
 const low=toOrdinal(window.start),high=toOrdinal(window.end)+1,span=high-low;
 const candidates=records.filter(r=>r.start<=window.end&&r.end>=window.start)
  .sort((a,b)=>Number(b.id===selectedId)-Number(a.id===selectedId)||(b.importance??3)-(a.importance??3)||a.start-b.start||a.id.localeCompare(b.id));
 const edges=[...new Set([low,high,...candidates.flatMap(r=>[Math.max(low,toOrdinal(r.start)),Math.min(high,toOrdinal(r.end)+1)])])].sort((a,b)=>a-b);
 const runs=[];
 for(let i=0;i<edges.length-1;i++){
  const start=edges[i],end=edges[i+1],record=candidates.find(r=>activeAt(r,fromOrdinal(start)));
  if(!record)continue;
  const last=runs.at(-1);
  if(last?.record===record&&last.end===start)last.end=end;
  else runs.push({record,start,end});
 }
 return runs.map(({record,start,end})=>({record,lane:0,left:(start-low)/span*100,width:(end-start)/span*100,
  continuesBefore:start===low&&record.start<window.start,continuesAfter:end===high&&record.end>window.end}));
}

export function compactPoliticalTimeline(records,{year,region='across',span=600,selectedId='',focusId=''}={}){
 const window=timeWindow(year,span),selected=records.find(r=>r.id===selectedId),focus=periodTracks.find(t=>t.id===focusId);
 const filtered=politicalTimelineRecords(records,{window,scope:'all'});
 if(isPoliticalTimelineRecord(selected,'all')&&selected.start<=window.end&&selected.end>=window.start&&!filtered.includes(selected))filtered.push(selected);
 const china=periodTracks[0];
 const available=REGIONS.filter(id=>filtered.some(r=>r.region===id)||periodTracks.some(track=>track.region===id&&track.periods?.some(r=>r.start<=window.end&&r.end>=window.start)));
 const preferred=[focus?.region,'east-asia',selected?.region,'europe','west-central-asia',...available];
 const ids=region==='across'?[...new Set(preferred.filter(id=>id&&(id===focus?.region||available.includes(id))))].slice(0,3):[region];
 const regions=ids.map(id=>{
  const all=filtered.filter(r=>r.region===id);
  const track=focus?.region===id?focus:id===china.region?china:null;
  const primary=track?(track.periods||records.filter(r=>track.ids.includes(r.id))):all;
  const rows=primaryRows(primary,window,selectedId);
  const comparison=all.filter(r=>!primary.includes(r)&&!rows.some(({record})=>record.relatedIds?.[0]===r.id));
  const secondary=region!=='across'?primaryRows(comparison,window,selectedId).map(r=>({...r,lane:1})):[];
  rows.push(...secondary);
  return {id,track,rows,count:secondary.length?2:1,omitted:all.filter(r=>!rows.some(row=>row.record===r||row.record.relatedIds?.[0]===r.id))};
 });
 const start=toOrdinal(window.start),end=toOrdinal(window.end),ticks=Array.from({length:5},(_,i)=>fromOrdinal(Math.round(start+(end-start)*i/4)));
 return {window,ticks,position:(toOrdinal(year)-start)/(end-start+1)*100,regions,available,omitted:regions.reduce((n,r)=>n+r.omitted.length,0)};
}
