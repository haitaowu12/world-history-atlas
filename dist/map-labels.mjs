// Place labels inside an existing source shape. This changes no geometry or
// historical claim; disconnected colonial/island components can otherwise put
// a spherical centroid in the ocean between them.
const geometryAnchors=new WeakMap();
const finitePoint=p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90;

function inside(shape,point,geo){return finitePoint(point)&&geo.geoContains(shape,point);}
function componentAnchor(polygon,geo){
 const center=geo.geoCentroid(polygon);
 if(inside(polygon,center,geo))return center;
 const [[west,south],[east,north]]=geo.geoBounds(polygon);
 if(![west,south,east,north].every(Number.isFinite))return null;
 const span=east>=west?east-west:east+360-west;
 // Search coarse-to-fine, starting near the geographic center. Returning no
 // label is preferable to placing one outside the source's land geometry.
 const fractions=[.5,.25,.75,.125,.375,.625,.875,.0625,.1875,.3125,.4375,.5625,.6875,.8125,.9375];
 for(const y of fractions)for(const x of fractions){
  let lon=west+span*x;if(lon>180)lon-=360;
  const point=[lon,south+(north-south)*y];if(inside(polygon,point,geo))return point;
 }
 return null;
}

export function featureLabelAnchor(feature,geo){
 if(!feature?.geometry||!geo?.geoContains)return null;
 for(const explicit of [feature.properties?.labelPoint,feature.properties?.labelAnchor])if(inside(feature,explicit,geo))return explicit;
 const geometry=feature.geometry;if(geometryAnchors.has(geometry))return geometryAnchors.get(geometry);
 const center=geo.geoCentroid(feature);if(inside(feature,center,geo)){geometryAnchors.set(geometry,center);return center;}
 const polygons=geometry.type==='Polygon'?[geometry.coordinates]:geometry.type==='MultiPolygon'?geometry.coordinates:[];
 const components=polygons.map(coordinates=>({type:'Polygon',coordinates})).map(shape=>({shape,area:geo.geoArea(shape)})).sort((a,b)=>b.area-a.area);
 let anchor=null;for(const {shape} of components){anchor=componentAnchor(shape,geo);if(anchor)break;}
 geometryAnchors.set(geometry,anchor);return anchor;
}
