// Inherited Jiangshan schematics share the atlas year and map. Their source
// display phases are explicit and are never silently treated as verified borders.
const MIN_YEAR=-403,MAX_YEAR=2026;
export function chinaPhaseAt(index,year){
 if(!Number.isInteger(year)||year===0||year<MIN_YEAR||year>MAX_YEAR)return null;
 const period=index?.periods?.find(p=>year>=p.start&&year<=p.end);
 if(!period)return null;
 const phase=period.phases.find(p=>year>=p.start&&year<=p.end);
 return phase?{period,phase}:null;
}
export function chinaPeriodFeatures(collection,phase,{administrative=false}={}){
 if(!collection||!phase)return [];
 const array=Array.isArray(collection)?collection:collection.features||[];
 if(administrative)return [...new Set(phase.administrativeIds||[])].map(i=>array[i]).filter(Boolean);
 const wanted=new Set(phase.featureIds||[]);
 return array.filter(f=>wanted.has(f.properties?.id)).map(f=>({...f,properties:{...f.properties,sourcePhase:{key:phase.id,start:phase.start,end:phase.end,endExclusive:phase.sourceUntilExclusive,caption:phase.caption.zh},contextValidity:{start:phase.start,end:phase.end,intervalMeaning:'inherited-source-display-window'},schematic:true}}));
}
export function createChinaContextLoader(index,loadJSON){
 const political=new Map(),administrative=new Map();
 async function fetchPeriod(period,admin){const cache=admin?administrative:political,files=admin?period.administrativeFiles:period.files;if(!cache.has(period.id))cache.set(period.id,Promise.all((files||[]).map(loadJSON)).then(parts=>parts.flatMap(p=>p.features||[])).catch(error=>{cache.delete(period.id);throw error;}));return cache.get(period.id);}
 return {
  phaseAt:year=>chinaPhaseAt(index,year),
  async load(year,{includeAdministrative=false}={}){const found=chinaPhaseAt(index,year);if(!found)return {year,period:null,phase:null,features:[],administrative:[]};const [features,admin]=await Promise.all([fetchPeriod(found.period,false),includeAdministrative?fetchPeriod(found.period,true):[]]);return {year,...found,features:chinaPeriodFeatures(features,found.phase),administrative:chinaPeriodFeatures(admin,found.phase,{administrative:true})};},
  clear(){political.clear();administrative.clear();}
 };
}
// This is a display selector, not a claim that a city was capital throughout
// the source era. Capital flags only prioritize labels; render the neutral
// place symbol unless a separately dated capital-status record supports it.
export function activePeriodPlaces(settlements,year,{zoom=1,budget,region='all',query=''}={}){
 if(!Number.isInteger(year)||year===0||!['all','east-asia'].includes(region))return [];
 const normalized=query.trim().toLocaleLowerCase(),limit=Math.max(0,budget??(zoom<2?8:zoom<3.5?16:zoom<5?30:55)),seen=new Set();
 return [...(settlements||[])].filter(p=>p.start<=year&&p.end>=year&&(!Number.isInteger(p.appear)||year>=p.appear)&&(!Number.isInteger(p.vanish)||year<p.vanish)&&p.location&&Number.isFinite(p.location.lat)&&Number.isFinite(p.location.lon)&&(!normalized||[p.name?.en,p.name?.zh,p.modern?.en,p.modern?.zh].some(x=>x?.toLocaleLowerCase().includes(normalized)))).sort((a,b)=>(b.isCapital===true)-(a.isCapital===true)||(a.tier||9)-(b.tier||9)||a.id.localeCompare(b.id)).filter(p=>{const key=p.location.lon.toFixed(2)+','+p.location.lat.toFixed(2);if(seen.has(key))return false;seen.add(key);return true;}).slice(0,limit);
}
export function sourcePhaseTimeline(index){
 return (index?.periods||[]).map(period=>({id:`source-period-${period.id}`,title:period.name,start:period.start,end:period.end,region:'east-asia',kind:'period-guide',theme:'states',importance:4,sourceDisplayWindow:true,phaseCount:period.phases.length,intervalMeaning:'source-display-window-not-dynasty-lifespan'}));
}
