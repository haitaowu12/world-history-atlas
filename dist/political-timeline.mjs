import {activeAt, toOrdinal} from './core.mjs';

// Membership is editorial, not inferred from an entry's duration or its theme.
// A battle, biography, city occupation or printing date is never a state bar.
export function isPoliticalTimelineRecord(record, scope = 'key') {
  if (record?.kind !== 'polity' || record.timeline?.exclude) return false;
  if(scope==='all')return true;
  if(record.timeline?.level)return record.timeline.level==='major';
  return (record.importance ?? 3) >= 4 || ['sui-reunification','qin-unification'].includes(record.id);
}

export function politicalTimelineRecords(records, {region='all', scope='key', window} = {}) {
  return records.filter(r => isPoliticalTimelineRecord(r, scope) &&
    (region === 'all' || r.region === region) &&
    (!window || (r.start <= window.end && r.end >= window.start)));
}

export function politicalTimelineLabel(record, lang='en') {
  const labels={'ly-dynasty':{en:'Lý dynasty',zh:'李朝'},'neo-babylonian-empire':{en:'Neo-Babylonian Empire',zh:'新巴比伦帝国'},'gran-colombia':{en:'Gran Colombia',zh:'大哥伦比亚'},'mexica-triple-alliance':{en:'Mexica Triple Alliance',zh:'墨西加三方同盟'}};
  return record.timeline?.label?.[lang] || record.timelineLabel?.[lang] || labels[record.id]?.[lang] || record.title?.[lang]?.split(/[：:·]/)[0].trim() || record.id;
}

// Choose by relevance before packing. The old chronological-first packing
// allowed early minor entries to displace the states at the selected year.
export function politicalTimelineLanes(records, window, year, {maxLanes=5,selectedId=''} = {}) {
  const low=toOrdinal(window.start), high=toOrdinal(window.end), span=high-low+1;
  const candidates=records.filter(r=>r.start<=window.end&&r.end>=window.start).sort((a,b)=>
    Number(b.id===selectedId)-Number(a.id===selectedId) ||
    Number(activeAt(b,year))-Number(activeAt(a,year)) ||
    (b.importance??3)-(a.importance??3) ||
    Math.min(Math.abs(a.start-year),Math.abs(a.end-year))-Math.min(Math.abs(b.start-year),Math.abs(b.end-year)) ||
    a.start-b.start || a.id.localeCompare(b.id));
  const tracks=[], rows=[], omitted=[];
  for (const record of candidates) {
    const left=Math.max(0,(toOrdinal(record.start)-low)/span*100);
    const right=Math.min(100,(toOrdinal(record.end)-low+1)/span*100);
    const width=right-left;
    // Reserve room for the clickable bar, without moving its dated left edge.
    const end=Math.min(100,left+Math.max(width,1.2));
    let lane=tracks.findIndex(intervals=>intervals.every(i=>end+.7<=i.left||left>=i.end+.7));
    if(lane<0)lane=tracks.length;
    if(lane>=maxLanes){omitted.push(record);continue;}
    if(!tracks[lane])tracks[lane]=[];
    tracks[lane].push({left,end});
    rows.push({record,left,width,lane,continuesBefore:record.start<window.start,continuesAfter:record.end>window.end});
  }
  return {rows:rows.sort((a,b)=>a.lane-b.lane||a.left-b.left),count:Math.max(1,tracks.length),omitted};
}
