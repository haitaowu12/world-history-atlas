import {formatYear, formatPeriod, validYear, safeSourceURL} from './core.mjs';

const norm = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase();
const words = value => typeof value === 'string' ? value : Array.isArray(value) ? value.map(words).join(' ') : value && typeof value === 'object' ? Object.values(value).map(words).join(' ') : '';
export function searchLibrary(rows, query) {
  const q = norm(query).trim();
  return !q ? rows : rows.filter(row => norm(words([row.name,row.title,row.subtitle,row.modern,row.aliases,row.remark,row.summary,row.description,row.tag,row.ruler,row.era,row.eraName,row.eraZh,row.eraEn,row.rulerZh,row.rulerEn])).includes(q));
}
export function libraryLocation(row) {
  if (Number.isFinite(row.location?.lon) && Number.isFinite(row.location?.lat)) return row.location;
  if (Array.isArray(row.coord) && row.coord.length === 2 && row.coord.every(Number.isFinite)) return {lon:row.coord[0],lat:row.coord[1],label:words(row.name||row.modern||row.title)};
  return null;
}
export function nearLibraryPlace(a,b,km=20) {
  const p=libraryLocation(a),q=libraryLocation(b);if(!p||!q)return false;
  const rad=Math.PI/180,dLat=(q.lat-p.lat)*rad,dLon=(q.lon-p.lon)*rad;
  const v=Math.sin(dLat/2)**2+Math.cos(p.lat*rad)*Math.cos(q.lat*rad)*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(v),Math.sqrt(Math.max(0,1-v)))<=km;
}
export function chinaRoutes(library,manifest) {
  return (library.journeys||[]).map((journey,i)=>{
    const stops=(journey.stops||[]).map((s,n)=>({id:s.id||`china-stop-${i}-${n}`,year:s.year,dateLabel:s.dateLabel,label:s.place||s.title,title:s.title,description:s.description,lat:s.location?.lat??s.coord?.[1],lon:s.location?.lon??s.coord?.[0],quotation:s.quotation,review:s.review}));
    const years=stops.map(s=>s.year).filter(validYear),sourceURL=`https://github.com/haitaowu12/jiangshan-map/blob/${manifest.source.commit}/js/lore_data.js`;
    const note={en:'An inherited Jiangshan chronicle. Connections follow the source sequence; campaign locations and literary associations do not establish that the named person travelled each leg. Dates, quotations and attributions have not all been independently corroborated.',zh:'引自江山时序的纪事。连线按原资料顺序连接地点；战役地点或文学关联不能证明相关人物亲自走过每一段。年代、引文与归属尚未全部独立核实。'};
    const reviewSources=stops.flatMap(s=>s.review?.sources||[]),uniqueSources=reviewSources.filter((s,n)=>reviewSources.findIndex(v=>v.url===s.url)===n);
    return {id:journey.id,kind:'journey',narrativeType:'chronicle',title:journey.title,start:Math.min(...years),end:Math.max(...years),summary:journey.description||journey.summary||{en:'Explore connected places and dated episodes in this historical chronicle. Chapter dates anchor a sequence; notes distinguish later events, literary works and disputed chronology.',zh:'沿地图探索历史纪事中的地点与年代节点。篇章日期用于组织顺序；注释区分后续事件、文学作品及有争议的编年。'},dateNote:note,caveat:note,geometryPrecision:'schematic',stops,legs:stops.slice(1).map((s,n)=>({from:stops[n].id,to:s.id,evidenceNote:'Sequence inherited from the pinned Jiangshan chronicle; the line is not an independently reconstructed travel path.'})),sources:[{title:'Jiangshan Map · original chronicle',publisher:'DeanChensj and contributors',url:sourceURL,evidenceNote:note.en,checkedAt:manifest.source.checkedAt},...uniqueSources.filter(s=>s.url!==sourceURL)],provenance:{dataset:'jiangshan',status:'inherited',note,reviewedStops:stops.filter(s=>s.review).length}};
  });
}
