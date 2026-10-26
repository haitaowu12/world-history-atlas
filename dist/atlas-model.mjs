import {reviewedRegionalFeature,amendRegionalChronology} from './regional-chronology.mjs';
import {MIN_YEAR, MAX_YEAR, validYear, toOrdinal, fromOrdinal, activeAt} from './core.mjs';

export const REGIONAL = {
  africa:{name:{en:'Africa',zh:'非洲'},color:'#ad704c',center:[20,5],zoom:2.4},
  'west-central-asia':{name:{en:'West & Central Asia',zh:'西亚与中亚'},color:'#a87491',center:[52,34],zoom:3.5},
  europe:{name:{en:'Europe',zh:'欧洲'},color:'#668aa0',center:[18,49],zoom:3.4},
  'south-asia':{name:{en:'South Asia',zh:'南亚'},color:'#bf9253',center:[78,23],zoom:4},
  'east-asia':{name:{en:'East Asia',zh:'东亚'},color:'#b66b65',center:[112,34],zoom:3.2},
  'southeast-asia':{name:{en:'Southeast Asia',zh:'东南亚'},color:'#6f9272',center:[111,9],zoom:3.6},
  'north-america':{name:{en:'North America',zh:'北美洲'},color:'#8c839e',center:[-102,37],zoom:2.5},
  'latin-america':{name:{en:'Latin America',zh:'拉丁美洲'},color:'#a3825a',center:[-70,-12],zoom:2.6},
  oceania:{name:{en:'Oceania',zh:'大洋洲'},color:'#558f98',center:[147,-18],zoom:2.7}
};
export const KINDS={polity:{en:'States',zh:'政权'},event:{en:'Events',zh:'事件'},place:{en:'Places',zh:'地点'},idea:{en:'Ideas',zh:'思想'},culture:{en:'Cultures',zh:'文化'},person:{en:'People',zh:'人物'}};
export const ERAS=[
  {id:'beginnings',start:-13000,end:-3001,year:-7000,name:{en:'Early societies',zh:'早期社会'},short:{en:'Origins',zh:'早期社会'},question:{en:'How did people build lasting communities?',zh:'人们如何建立长久的共同体？'}},
  {id:'cities',start:-3000,end:-501,year:-1500,name:{en:'Cities & early states',zh:'城市与早期国家'},short:{en:'First states',zh:'早期国家'},question:{en:'Cities, writing, and new forms of power.',zh:'城市、文字与新的权力形式。'}},
  {id:'classical',start:-500,end:499,year:200,name:{en:'Classical worlds',zh:'古典世界'},short:{en:'Classical',zh:'古典时代'},question:{en:'Explore empires, philosophies, and societies side by side.',zh:'并读各地的帝国、思想与社会。'}},
  {id:'regional',start:500,end:999,year:800,name:{en:'New centers of power',zh:'新的权力中心'},short:{en:'New powers',zh:'区域兴起'},question:{en:'Changing states and traditions across a connected world.',zh:'相互联系的世界中，政权与传统不断改变。'}},
  {id:'networks',start:1000,end:1499,year:1200,name:{en:'An age of connections',zh:'交流与连接的时代'},short:{en:'Connections',zh:'交流时代'},question:{en:'Ports, cities, and kingdoms. Many histories, one moment.',zh:'港口、城市与王国：同一时刻，多种历史。'}},
  {id:'oceans',start:1500,end:1749,year:1600,name:{en:'Worlds across the oceans',zh:'跨越海洋的世界'},short:{en:'Ocean worlds',zh:'海洋世界'},question:{en:'Exchange, conquest, resistance, and changing horizons.',zh:'交流、征服、抵抗与不断拓展的视野。'}},
  {id:'revolutions',start:1750,end:1913,year:1800,name:{en:'Revolutions & industry',zh:'革命与工业'},short:{en:'Revolutions',zh:'革命与工业'},question:{en:'New claims to rights, new technologies, and expanding empires.',zh:'新的权利诉求、新技术与扩张中的帝国。'}},
  {id:'modern',start:1914,end:2026,year:1960,name:{en:'A changing modern world',zh:'变迁中的现代世界'},short:{en:'Modern world',zh:'现代世界'},question:{en:'War, independence, rights, and an interconnected planet.',zh:'战争、独立、权利与相互依存的地球。'}}
];
export function eraAt(year){return ERAS.find(e=>year>=e.start&&year<=e.end)||ERAS[0];}
export function midpoint(record){return fromOrdinal(Math.round((toOrdinal(record.start)+toOrdinal(record.end))/2));}
export function representativeYear(record,snapshots){
  const middle=midpoint(record);
  if(inferKind(record)!=='polity')return middle;
  return snapshots.filter(s=>activeAt(record,s.year)).sort((a,b)=>yearDistance(a.year,middle)-yearDistance(b.year,middle)||a.year-b.year)[0]?.year??middle;
}
export function inferKind(r){return r.kind||((r.end-r.start<15)?'event':r.theme==='states'?'polity':r.theme==='knowledge'?'idea':r.theme==='culture'?'culture':'place');}
export function rankRecords(records,year){return [...records].sort((a,b)=>(b.importance||3)-(a.importance||3)||(inferKind(b)==='polity')-(inferKind(a)==='polity')||Math.abs(a.start-year)-Math.abs(b.start-year)||a.id.localeCompare(b.id));}
export function nearestSnapshot(snapshots,year){
  if(!validYear(year)||!Array.isArray(snapshots))return null;
  return snapshots.filter(s=>validYear(s.year)&&s.year<=year).sort((a,b)=>b.year-a.year)[0]||null;
}
// Source dates and reviewed display intervals are separate. A state's lifespan
// alone is never an implicit permission to reuse a boundary.
export function exactSnapshot(snapshots,year){
  if(!validYear(year)||!Array.isArray(snapshots))return null;
  return snapshots.find(s=>validYear(s.year)&&s.year===year)||null;
}
export function featureSourceYear(feature){return feature?.properties?.sourceYear??feature?.properties?.year;}
export function reviewedIntervalContains(interval,year){
  return !!interval&&validYear(year)&&validYear(interval.start)&&validYear(interval.end)&&interval.start<=interval.end&&year>=interval.start&&year<=interval.end;
}
export function historicalContextFeatures(features,year){
  if(!validYear(year)||!Array.isArray(features))return [];
  const choices=new Map();
  for(const original of features){
    const feature=reviewedRegionalFeature(original);
    const p=feature?.properties;if(!p)continue;
    const sourceYear=featureSourceYear(feature),key=p.polityId||p.code||p.id;
    if(!key||!validYear(sourceYear))continue;
    const exact=sourceYear===year,interval=p.contextValidity;
    // A valid explicit window also constrains its source year (derived phases).
    // Malformed windows cannot authorize reuse; exact source checkpoints survive.
    if(reviewedIntervalContains(interval,interval?.start)&&!reviewedIntervalContains(interval,year))continue;
    if(!exact&&(!reviewedIntervalContains(interval,year)||(sourceYear>year&&interval.backwardReviewed!==true)))continue;
    const prior=sourceYear<=year,old=choices.get(key),oldYear=featureSourceYear(old),oldPrior=oldYear<=year;
    if(!old||(prior&&!oldPrior)||(prior===oldPrior&&(prior?sourceYear>oldYear:sourceYear<oldYear)))choices.set(key,feature);
  }
  return amendRegionalChronology([...choices.values()],year);
}
export function featureNameAt(feature,year){
  const p=feature?.properties||{};
  return p.namePeriods?.find(period=>reviewedIntervalContains(period,year))?.name||p.name;
}
export function featureCategoryAt(feature,year){
  const p=feature?.properties||{};
  return p.categoryPeriods?.find(period=>reviewedIntervalContains(period,year))?.category||p.category;
}
export function contemporaryFeaturesAt(features,historicalFeatures,year,metadata={}){
  if(!validYear(year)||!Array.isArray(features))return [];
  const isReviewYear=year===metadata.reviewedYear;
  if(!isReviewYear&&!reviewedIntervalContains(metadata.contextValidity,year))return [];
  const eligible=features.filter(f=>isReviewYear||(reviewedIntervalContains(f.properties?.contextValidity,year)&&(featureSourceYear(f)<=year||f.properties.contextValidity.backwardReviewed===true)));
  const mapped=new Map(eligible.map(f=>[f.properties.code,f]));
  for(const fallback of metadata.historicalFallbacks||[]){
    if(!reviewedIntervalContains(fallback,year))continue;
    const identity=features.find(f=>f.properties.code===fallback.code);
    const geometry=historicalContextFeatures((historicalFeatures||[]).filter(f=>f.properties.polityId===fallback.polityId),year)[0];
    if(identity&&geometry)mapped.set(fallback.code,{...geometry,properties:{...geometry.properties,contemporary:true,code:fallback.code,name:identity.properties.name,namePeriods:identity.properties.namePeriods,category:identity.properties.category,categoryPeriods:identity.properties.categoryPeriods,color:identity.properties.color,referenceFallback:true,sourceYear:featureSourceYear(geometry)}});
  }
  return [...mapped.values()];
}
export function mapCoverage(snapshots,year,contemporaryMetadata={},features){
  const empty={mode:'gap',snapshot:null,before:null,after:null,contextFeatures:[],sourceYears:[]};
  if(!validYear(year)||!Array.isArray(snapshots))return empty;
  const dated=snapshots.filter(s=>validYear(s.year));
  const snapshot=exactSnapshot(dated,year);
  const before=dated.filter(s=>s.year<year).sort((a,b)=>b.year-a.year)[0]||null;
  const after=dated.filter(s=>s.year>year).sort((a,b)=>a.year-b.year)[0]||null;
  const contextFeatures=historicalContextFeatures(features,year);
  const sourceYears=[...new Set(contextFeatures.map(featureSourceYear))].sort((a,b)=>a-b);
  const contemporary=contemporaryMetadata?.reviewedYear===year||reviewedIntervalContains(contemporaryMetadata?.contextValidity,year);
  let mode='gap';
  if(snapshot&&(!Array.isArray(features)||(contextFeatures.length&&sourceYears.every(y=>y===year))))mode='historical';
  else if(contemporary)mode='contemporary';
  else if(contextFeatures.length)mode='context';
  return {mode,snapshot,before,after,contextFeatures:mode==='contemporary'?[]:contextFeatures,sourceYears:mode==='historical'&&!sourceYears.length?[snapshot.year]:mode==='contemporary'?[contemporaryMetadata.geometryVintage]:sourceYears};
}
// Coalesce pointer/keyboard slider events while allowing direct navigation to
// cancel an older queued year before it can overwrite the new view.
export function createFrameQueue(apply,request,cancel){
  let frame=null,pending;
  return {
    queue(value){pending=value;if(frame===null)frame=request(()=>{frame=null;const value=pending;pending=undefined;apply(value);});},
    cancel(){if(frame!==null)cancel(frame);frame=null;pending=undefined;}
  };
}
export function previousSnapshot(snapshots,current){return current?nearestSnapshot(snapshots,fromOrdinal(toOrdinal(current.year)-1)):null;}
export function yearDistance(a,b){return Math.abs(toOrdinal(a)-toOrdinal(b));}
export function timeWindow(year,span){
  const n=span|| (year<-3000?6000:year<-500?2000:year<1500?600:year<1900?300:140);
  const middle=toOrdinal(year),start=Math.max(toOrdinal(MIN_YEAR),middle-n/2),end=Math.min(toOrdinal(MAX_YEAR),middle+n/2);
  return {start:fromOrdinal(Math.floor(start)),end:fromOrdinal(Math.ceil(end))};
}
export function timelineLanes(records,window,maxLanes=7){
  const low=toOrdinal(window.start),high=toOrdinal(window.end),span=high-low||1,ends=[];
  const rows=[];let omitted=0;
  for(const r of [...records].filter(r=>r.end>=window.start&&r.start<=window.end).sort((a,b)=>a.start-b.start||b.end-a.end)){
    const datedLeft=Math.max(0,(toOrdinal(r.start)-low)/span*100),right=Math.min(100,(toOrdinal(r.end)-low)/span*100);
    const width=Math.min(100,Math.max(.8,right-datedLeft)),left=Math.min(datedLeft,100-width),occupied=left+Math.max(width,2.3);
    let lane=ends.findIndex(x=>x<=left-.5);if(lane<0)lane=ends.length;
    if(lane>=maxLanes){omitted++;continue;}
    ends[lane]=occupied;rows.push({record:r,left,width:Math.min(width,100-left),lane});
  }
  return {rows,count:Math.max(1,ends.length),omitted};
}
export function eventsNear(records,year,count=6){return records.filter(r=>inferKind(r)==='event').sort((a,b)=>yearDistance(a.start,year)-yearDistance(b.start,year)||a.start-b.start).slice(0,count).sort((a,b)=>a.start-b.start);}
export function greatCircleKm(a,b){
  const radians=Math.PI/180,lat1=a.lat*radians,lat2=b.lat*radians,dlat=(b.lat-a.lat)*radians,dlon=(b.lon-a.lon)*radians;
  const h=Math.sin(dlat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(Math.min(1,h)),Math.sqrt(Math.max(0,1-h)));
}
export function nearbyHistories(records,location,radius=400){return records.map(r=>({record:r,km:greatCircleKm(location,r.location)})).filter(x=>x.km<=radius).sort((a,b)=>a.record.start-b.record.start||a.km-b.km);}
export function quizScore(km){return Number.isFinite(km)&&km>=0?Math.max(0,Math.round(1000*Math.exp(-km/1800))):0;}
export function visibleInYear(records,year){return records.filter(r=>activeAt(r,year));}
export function safeMapState(hash){
 const p=new URLSearchParams(hash.replace(/^#/,''));
 return {kind:Object.hasOwn(KINDS,p.get('kind'))?p.get('kind'):'all',route:p.get('route')?.replace(/[^a-z0-9-]/g,'').slice(0,80)||'',stop:Math.max(0,Math.min(100,Number.parseInt(p.get('stop')||'0',10)||0))};
}
