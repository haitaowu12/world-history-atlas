import {REGIONS,toOrdinal,fromOrdinal,activeAt} from './core.mjs';
import {timeWindow} from './atlas-model.mjs';
import {isPoliticalTimelineRecord,politicalTimelineRecords,politicalTimelineLanes} from './political-timeline.mjs?v=2';

export function compactPoliticalTimeline(records,{year,region='across',span=600,selectedId=''}={}){
 const window=timeWindow(year,span),selected=records.find(r=>r.id===selectedId);
 const filtered=politicalTimelineRecords(records,{window});
 if(isPoliticalTimelineRecord(selected,'all')&&selected.start<=window.end&&selected.end>=window.start&&!filtered.includes(selected))filtered.push(selected);
 const available=REGIONS.filter(id=>filtered.some(r=>r.region===id));
 const preferred=[selected?.region,'europe','west-central-asia','east-asia',...available];
 const ids=region==='across'?[...new Set(preferred.filter(id=>available.includes(id)))].slice(0,3):[region];
 const regions=ids.map(id=>{const all=filtered.filter(r=>r.region===id).sort((a,b)=>Number(b.id===selectedId)-Number(a.id===selectedId)||Number(activeAt(b,year))-Number(activeAt(a,year))||(b.importance??3)-(a.importance??3)||a.id.localeCompare(b.id));const shown=all.slice(0,region==='across'?1:2),lanes=politicalTimelineLanes(shown,window,year,{maxLanes:2,selectedId});return {id,...lanes,omitted:[...lanes.omitted,...all.slice(shown.length)]};});
 const start=toOrdinal(window.start),end=toOrdinal(window.end),ticks=Array.from({length:5},(_,i)=>fromOrdinal(Math.round(start+(end-start)*i/4)));
 return {window,ticks,position:(toOrdinal(year)-start)/(end-start)*100,regions,available,omitted:regions.reduce((n,r)=>n+r.omitted.length,0)};
}
