// Occupation context is an additive interpretation, not a new frontier dataset.
// Country hatches reuse dated CShapes country-reference units; point markers
// indicate selected affected places or representative country locations.
export function wartimeContextsAt(data,year){
 if(!Number.isInteger(year))return [];
 return (data?.records||[]).filter(record=>record.start<=year&&year<=record.end);
}
export function wartimeCountryReferences(data,year,features){
 const active=wartimeContextsAt(data,year).filter(record=>record.render==='country-reference');
 return active.flatMap(record=>{
  const feature=features.find(f=>f.properties?.sourceDataset==='cshapes-2.0'&&f.properties.gwcode===record.gwcode);
  return feature?[{record,feature}]:[];
 });
}
export function wartimePlaces(data,year){return wartimeContextsAt(data,year).filter(record=>record.render==='place-reference');}
export function wartimeForCountry(data,year,feature){
 const code=feature?.properties?.gwcode;
 if(feature?.properties?.sourceDataset!=='cshapes-2.0'||!Number.isInteger(code))return [];
 return wartimeContextsAt(data,year).filter(record=>record.gwcode===code);
}

// Add reviewed records without changing the released source checkpoint.
export function applyWartimeFollowup(data,followup){
 if(data?.schemaVersion!==1||followup?.schemaVersion!==1||!Array.isArray(data.records)||!Array.isArray(followup.records))throw Error('Invalid wartime follow-up');
 const sources={...data.sources};for(const [id,source] of Object.entries(followup.sources||{})){if(sources[id]||!source.url?.startsWith('https://')||!source.title||!source.publisher)throw Error('Invalid wartime source '+id);sources[id]=source;}
 const ids=new Set(data.records.map(r=>r.id));for(const row of followup.records){const area=row.render==='country-reference'&&Number.isInteger(row.gwcode)&&['germany','axis','western-allies','soviet'].includes(row.authority),place=row.render==='place-reference'&&Number.isFinite(row.location?.lon)&&Math.abs(row.location.lon)<=180&&Number.isFinite(row.location?.lat)&&Math.abs(row.location.lat)<=90;if(ids.has(row.id)||!row.id||!Number.isInteger(row.start)||!Number.isInteger(row.end)||row.start>row.end||!row.title?.en||!row.title?.zh||!row.summary?.en||!row.summary?.zh||!Array.isArray(row.sourceIds)||!row.sourceIds.length||row.sourceIds.some(id=>!sources[id])||(!area&&!place))throw Error('Invalid wartime reference '+row.id);ids.add(row.id);}
 return {...data,sources,records:[...data.records,...followup.records]};
}
