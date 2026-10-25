// Dated source units remain distinct, including non-federal and competing claims.
export function americasPhasesAt(index,year){
 if(!Number.isInteger(year))return [];
 return Object.entries(index?.countries||{}).flatMap(([code,country])=>{
  const phase=country.phases.find(phase=>phase.start<=year&&year<=phase.end);
  return phase?[{code,phase,files:country.sharedFiles?.length?country.sharedFiles:phase.files}]:[];
 });
}

export function createAmericasLoader(index,loadCollection){
 const files=new Map(),phases=new Map(),pending=new Map();
 async function loadPhase(item){
  const key=item.phase.id;if(phases.has(key))return phases.get(key);if(pending.has(key))return pending.get(key);
  const request=Promise.all(item.files.map(async descriptor=>{
   if(!files.has(descriptor.file))files.set(descriptor.file,loadCollection(descriptor.file).catch(error=>{files.delete(descriptor.file);throw error;}));
   return files.get(descriptor.file);
  })).then(collections=>{
   const wanted=new Set(item.phase.sourceRows),rows=collections.flatMap(collection=>collection.features).filter(f=>wanted.has(f.properties.sourceRow));
   const result=rows.map(f=>({...f,properties:{...f.properties,sourceYear:item.phase.sourceYear,year:item.phase.sourceYear,
    start:item.phase.start,end:item.phase.end,contextValidity:{...f.properties.contextValidity,start:item.phase.start,end:item.phase.end}}}));
   if(result.length!==item.phase.divisions)throw Error('Incomplete dated Americas phase '+key);
   phases.set(key,result);while(phases.size>8)phases.delete(phases.keys().next().value);
   // Keep shared US units, but bound old Canadian source-stage requests.
   while(files.size>14){const old=[...files.keys()].find(name=>!name.startsWith('americas-units-usa-')&&!item.files.some(file=>file.file===name));if(!old)break;files.delete(old);}
   return result;
  }).finally(()=>pending.delete(key));
  pending.set(key,request);return request;
 }
 return {index,covered:year=>new Set(americasPhasesAt(index,year).map(item=>item.code)),
  peek:year=>americasPhasesAt(index,year).flatMap(item=>phases.get(item.phase.id)||[]),
  ready:year=>americasPhasesAt(index,year).every(item=>phases.has(item.phase.id)),
  load:year=>Promise.all(americasPhasesAt(index,year).map(loadPhase)).then(rows=>rows.flat())};
}

const correctedRussia=new WeakMap();
export function amendAmericasChronology(features,year){
 return features.filter(f=>!(f.properties.id==='1878-mexico'&&year===1853)).map(f=>{
  if(f.properties.id!=='1815-russian'||year<1867||f.geometry.type!=='MultiPolygon')return f;
  if(!correctedRussia.has(f)){
   // Source components0–14 are Alaska;15 is Chukotka and16 Eurasia.
   // Remove whole source components, never draw a replacement frontier.
   correctedRussia.set(f,{...f,geometry:{...f.geometry,coordinates:f.geometry.coordinates.slice(15)},properties:{...f.properties,
    geometryAmendment:{reviewedAt:'2026-10-25',removedComponents:Array.from({length:15},(_,i)=>i),reason:'Alaska ceded in1867; source Chukotka and Eurasia components retained.',
     evidence:'https://www.archives.gov/milestone-documents/check-for-the-purchase-of-alaska'},
    note:{en:'The 1815 reference retains its Eurasian source geometry. Its 15 Alaska components are removed from 1867 after the transfer to the United States. Remaining vertices are not an annual reconstruction of Russia’s borders.',
     zh:'1815年参照保留其欧亚来源几何。1867年向美国移交后，移除15个阿拉斯加分量；其余顶点并非俄国边界的逐年重建。'}}});
  }
  return correctedRussia.get(f);
 });
}

export function composeAmericasFeatures(globalFeatures,year,covered,divisions=[]){
 const retained=amendAmericasChronology(globalFeatures,year).filter(f=>{
  const p=f.properties;
  if(covered.has('USA')&&(['usa'].includes(p.polityId)||[2,3,4].includes(p.gwcode)))return false;
  if(covered.has('CAN')&&(p.polityId==='canada'||[20,21].includes(p.gwcode)))return false;
  return true;
 });
 return [...retained,...divisions];
}

// Parent names are labels at existing representative unit points, not new polygons.
export function americasParentLabels(divisions,area){
 const names={USA:{en:'United States',zh:'美国'},CAN:{en:'Canada',zh:'加拿大'},
  'british-north-america':{en:'British North America',zh:'英属北美'},newfoundland:{en:'Newfoundland',zh:'纽芬兰'},
  'texas-republic':{en:'Republic of Texas',zh:'得克萨斯共和国'},'vermont-republic':{en:'Vermont Republic',zh:'佛蒙特共和国'}};
 const groups=new Map();
 for(const f of divisions){const key=f.properties.parent;if(!names[key])continue;const prior=groups.get(key);if(!prior||area(f)>area(prior))groups.set(key,f);}
 return [...groups].map(([key,f])=>({...f,properties:{...f.properties,id:'label-'+key,name:names[key],role:'parent-label'}}));
}

// An editorial reading order is not a route. Explicit anchors preserve event context.
export function readingStepYear(path,record,fallback){
 const anchor=path?.mapYears?.[record.id];
 return Number.isInteger(anchor)&&record.start<=anchor&&anchor<=record.end?anchor:fallback;
}
