// D3 uses spherical winding, opposite to RFC7946 for sub-hemisphere exteriors.
// All political / administrative units shipped here are smaller than a
// hemisphere. Only ring traversal changes: vertices, holes and islands stay.
export function normalizePolygonGeometry(geometry,geoArea){
  if(!geometry||!['Polygon','MultiPolygon'].includes(geometry.type))return geometry;
  let changed=false;
  const polygon=rings=>rings.map((ring,index)=>{
    const first=ring[0],last=ring.at(-1);
    const closed=first&&last&&(first[0]!==last[0]||first[1]!==last[1])?[...ring,first]:ring;
    if(closed!==ring)changed=true;
    const area=geoArea({type:'Polygon',coordinates:[closed]});
    const reverse=index===0?area>2*Math.PI:area<2*Math.PI;
    if(!reverse)return closed;
    changed=true;return [...closed].reverse();
  });
  const coordinates=geometry.type==='Polygon'?polygon(geometry.coordinates):geometry.coordinates.map(polygon);
  return changed?{...geometry,coordinates}:geometry;
}

export function normalizeMapFeature(feature,geoArea){
  const geometry=normalizePolygonGeometry(feature.geometry,geoArea);
  return geometry===feature.geometry?feature:{...feature,geometry};
}

export function normalizeMapCollection(collection,geoArea){
  if(!collection?.features)return collection;
  return {...collection,features:collection.features.map(f=>normalizeMapFeature(f,geoArea))};
}
