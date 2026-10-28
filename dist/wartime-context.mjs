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
