// Modern polygons organize navigation; membership is not a historical claim.
export function buildAreaHistoryIndex(records,features,contains,associations=[]){
 const result=Object.fromEntries(features.map(f=>[f.properties.id,[]]));
 for(const record of records.filter(r=>r.region==='north-america')){
  const points=[{location:record.location,role:'representative'},...(record.milestones||[]).map(m=>({location:m.location,role:'milestone',year:m.year}))];
  for(const feature of features){
   const matches=points.filter(p=>p.location&&contains(feature,[p.location.lon,p.location.lat]));
   if(matches.length)result[feature.properties.id].push({recordId:record.id,roles:[...new Set(matches.map(p=>p.role))],milestoneYears:[...new Set(matches.filter(p=>p.role==='milestone').map(p=>p.year))]});
  }
 }
 const recordIds=new Set(records.filter(r=>r.region==='north-america').map(r=>r.id)),seen=new Set();
 for(const association of associations){
  const {areaId,recordId,place,note,sources,checkedAt}=association,key=areaId+':'+recordId;
  if(!result[areaId]||!recordIds.has(recordId)||seen.has(key))throw Error('Unknown or duplicate geographic association '+key);
  if(!place?.en||!place?.zh||!note?.en||!note?.zh||!checkedAt||!sources?.length)throw Error('Incomplete geographic association '+key);
  seen.add(key);
  let link=result[areaId].find(item=>item.recordId===recordId);
  if(!link){link={recordId,roles:[],milestoneYears:[]};result[areaId].push(link);}
  link.roles.push('editorial');link.locationAssociation=structuredClone({place,note,sources,checkedAt});
 }
 return result;
}

export function areaHistory(areaId,index,records,{year=null}={}){
 const links=new Map((index[areaId]||[]).map(link=>[link.recordId,link]));
 return records.filter(record=>{
  const link=links.get(record.id);if(!link)return false;
  if(year===null)return true;
  return (link.roles.includes('representative')||link.roles.includes('editorial'))&&record.start<=year&&record.end>=year||link.milestoneYears.includes(year);
 }).sort((a,b)=>a.start-b.start||a.id.localeCompare(b.id));
}

export function searchAreas(features,query='',country='all'){
 const q=query.trim().normalize('NFKC').toLocaleLowerCase();
 return features.filter(f=>(country==='all'||f.properties.country===country)&&(!q||[f.properties.id,f.properties.name.en,f.properties.name.zh,...(f.properties.id==='US-DC'?['District of Columbia','Washington DC','Washington, DC','华盛顿哥伦比亚特区']:[])].some(s=>s.normalize('NFKC').toLocaleLowerCase().includes(q))));
}
