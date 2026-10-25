// Build-time tools only: topojson-server@3.0.1, topojson-client@3.1.0,
// topojson-simplify@3.0.3, polylabel@2.0.1. Supply their external package directory.
import fs from 'node:fs';import vm from 'node:vm';import {createHash} from 'node:crypto';import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';
import {normalizeMapFeature} from '../dist/map-geometry.mjs';import {boundsContain} from '../dist/regional-reference.mjs';import {applyChinaReviews} from '../dist/china-review.mjs';
const root=new URL('../',import.meta.url),[input,toolsDir]=process.argv.slice(2);if(!input||!toolsDir)throw Error('Supply pinned 10m source file and external build-tools directory');
const require=createRequire(toolsDir+'/package.json'),server=require('topojson-server'),client=require('topojson-client'),simplify=require('topojson-simplify'),polylabel=(await import(pathToFileURL(require.resolve('polylabel')).href)).default;
const bytes=fs.readFileSync(input),hash=b=>createHash('sha256').update(b).digest('hex'),inputHash='22d0e3ad85eb3e27f17cabf8ba2d50e554fbc27a87796ff891d958185da62fb5';if(hash(bytes)!==inputHash)throw Error('Source differs from pinned 5.1.1 admin1 input');
const read=n=>JSON.parse(fs.readFileSync(new URL('dist/data/'+n,root),'utf8')),write=(n,v)=>fs.writeFileSync(new URL('dist/data/'+n,root),JSON.stringify(v)+'\n');
const raw=JSON.parse(bytes),ctx={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),ctx);const d3=ctx.d3;
const topology=server.topology({units:raw},1e7),weighted=simplify.presimplify(topology,simplify.sphericalTriangleArea),protectedArcs=new Set();
const protect=value=>{if(typeof value==='number')protectedArcs.add(value<0?~value:value);else value.forEach(protect);};
for(let i=0;i<raw.features.length;i++){
 const f=raw.features[i],g=topology.objects.units.geometries[i],polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates,arcs=g.type==='Polygon'?[g.arcs]:g.arcs;
 const wholeArea=d3.geoArea(normalizeMapFeature(f,d3.geoArea));
 for(let j=0;j<polys.length;j++){
  const polyArea=d3.geoArea(normalizeMapFeature({type:'Feature',geometry:{type:'Polygon',coordinates:polys[j]}},d3.geoArea));
  if(wholeArea<2e-6||polyArea<2e-8)protect(arcs[j]);else for(let h=1;h<arcs[j].length;h++)protect(arcs[j][h]);
 }
}
for(const index of protectedArcs)for(const point of weighted.arcs[index])point[2]=Infinity;
const threshold=simplify.quantile(weighted,.12),reduced=simplify.simplify(weighted,threshold),simplified=client.feature(reduced,reduced.objects.units).features;
const manifest=read('content-expansion-v12.json'),base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json',...manifest.files.map(f=>f.file)].flatMap(read),importManifest=read('china-import-manifest.json'),china=importManifest.eventFiles.flatMap(f=>read(f.path));
const records=[...base,...applyChinaReviews(china,read('china-library.json'),read('china-reviews.json')).events];if(records.length!==1863)throw Error('Unexpected atlas inventory');
const oldAssociations=read('us-canada-area-links-v12.json'),isoCounts=new Map();for(const f of raw.features)isoCounts.set(f.properties.iso_3166_2,(isoCounts.get(f.properties.iso_3166_2)||0)+1);
const round=value=>Array.isArray(value)?value.map(round):+value.toFixed(4),fallbacks=[],labelCorrections=[],invalidRings=[];let inputVertices=0,outputVertices=0;
const count=g=>g.type==='Polygon'?g.coordinates.reduce((n,r)=>n+r.length,0):g.coordinates.reduce((n,p)=>n+p.reduce((m,r)=>m+r.length,0),0);
function usable(feature){return feature.geometry&&d3.geoArea(feature)>1e-15&&d3.geoArea(feature)<2*Math.PI;}
function cleanGeometry(g,id){const clean=rings=>rings.filter((ring,i)=>{const ok=new Set(ring.map(p=>p.join(','))).size>=3;if(!ok)invalidRings.push(id+':'+i);return ok;});const polygons=(g.type==='Polygon'?[g.coordinates]:g.coordinates).map(p=>{if(new Set(p[0].map(x=>x.join(','))).size<3)return [];return clean(p);}).filter(p=>p.length);return {type:'MultiPolygon',coordinates:polygons};}
const features=simplified.map((f,i)=>{
 const p=raw.features[i].properties,id=p.iso_3166_2&&p.iso_3166_2!=='-1'&&isoCounts.get(p.iso_3166_2)===1?p.iso_3166_2:p.adm1_code;
 const name={en:p.name_en||p.name||`Unnamed unit (${p.adm1_code})`,zh:p.name_zh||p.name_en||p.name||`未命名单元（${p.adm1_code}）`};
 const properties={id,sourceId:p.adm1_code,isoCode:p.iso_3166_2,country:p.adm0_a3,name,sourceType:p.type_en||p.type||null,abbreviation:p.postal||p.abbrev||'',sourceLabelPoint:[p.longitude,p.latitude],role:'modern-administrative-reference',sourceRelease:'5.1.1',historyLinks:[]};
 let out=normalizeMapFeature({type:'Feature',properties,geometry:cleanGeometry({type:f.geometry.type,coordinates:round(f.geometry.coordinates)},id)},d3.geoArea);
 if(!usable(out)){fallbacks.push(id);out=normalizeMapFeature({type:'Feature',properties,geometry:raw.features[i].geometry},d3.geoArea);}
 if(!usable(out))throw Error(id+': invalid positive spherical geometry');
 const sourcePoint=properties.sourceLabelPoint;let label=sourcePoint;
 if(!sourcePoint.every(Number.isFinite)||!d3.geoContains(out,sourcePoint)){
  const polys=out.geometry.type==='Polygon'?[out.geometry.coordinates]:out.geometry.coordinates;
  const largest=[...polys].sort((a,b)=>d3.geoArea({type:'Polygon',coordinates:b})-d3.geoArea({type:'Polygon',coordinates:a}))[0];label=polylabel(largest,.0001).slice(0,2);labelCorrections.push(id);
 }
 properties.labelPoint=label.map(n=>+n.toFixed(6));if(!d3.geoContains(out,properties.labelPoint))properties.labelPoint=label;
 if(!d3.geoContains(out,properties.labelPoint))throw Error(id+': label not inside own unit');
 properties.labelMethod=label===sourcePoint?'source':'interior-label';properties.bounds=d3.geoBounds(out);inputVertices+=count(raw.features[i].geometry);outputVertices+=count(out.geometry);return out;
});
const seen=new Set();for(const f of features){if(seen.has(f.properties.id))throw Error('Duplicate unit ID');seen.add(f.properties.id);}
for(const r of records){
 const points=[{location:r.location,role:'representative'},...(r.milestones||[]).map(m=>({location:m.location,role:'milestone',year:m.year}))];
 for(const f of features){const matches=points.filter(p=>p.location&&boundsContain(f.properties.bounds,[p.location.lon,p.location.lat])&&d3.geoContains(f,[p.location.lon,p.location.lat]));if(matches.length)f.properties.historyLinks.push({recordId:r.id,roles:[...new Set(matches.map(p=>p.role))],milestoneYears:[...new Set(matches.filter(p=>p.role==='milestone').map(p=>p.year))]});}
}
for(const a of oldAssociations){const f=features.find(f=>f.properties.id===a.areaId);if(!f)throw Error('Missing legacy area '+a.areaId);let link=f.properties.historyLinks.find(l=>l.recordId===a.recordId);if(link?.roles.includes('representative'))continue;if(!link){link={recordId:a.recordId,roles:[],milestoneYears:[]};f.properties.historyLinks.push(link);}link.roles.push('editorial');link.locationAssociation={place:a.place,sources:a.sources,note:{en:'Reviewed named-place association retained from the V12 coastal-location review; geographic orientation only.',zh:'保留V12沿海地点核查中的地名关联，仅用于地理定位。'}};}
const contemporaryMeta=read('contemporary-world.json'),countryFeatures=contemporaryMeta.layers.filter(l=>l.role==='countries').flatMap(l=>read(l.file).features),countryMap=new Map(countryFeatures.map(f=>[f.properties.code,f]));
const groups=new Map();for(const f of features){const code=f.properties.country;if(!groups.has(code))groups.set(code,[]);groups.get(code).push(f);}
const countries=[];let largestChunk=0,totalBytes=0;
for(const [code,units]of groups){
 const source=raw.features.find(f=>f.properties.adm0_a3===code).properties,country=countryMap.get(code),name=country?.properties.name||{en:source.admin,zh:source.admin};
 const chunks=[];let part=[];const flush=()=>{if(!part.length)return;const data={type:'FeatureCollection',features:part},file=`regional-${code.toLowerCase()}-${String(chunks.length+1).padStart(2,'0')}.geojson`,text=JSON.stringify(data)+'\n',length=Buffer.byteLength(text);if(length>450000)throw Error(file+': oversized single unit');write(file,data);chunks.push({file,bytes:length,sha256:hash(text),features:part.length});largestChunk=Math.max(largestChunk,length);totalBytes+=length;part=[];};
 for(const f of units){if(Buffer.byteLength(JSON.stringify({type:'FeatureCollection',features:[...part,f]}))+1>440000)flush();part.push(f);}flush();
 countries.push({code,name,count:units.length,center:country?.properties.labelPoint||units[0].properties.labelPoint,bounds:d3.geoBounds({type:'FeatureCollection',features:units}),layers:chunks});
}
countries.sort((a,b)=>a.name.en.localeCompare(b.name.en));
const metadata={schemaVersion:1,role:'modern-reference',sourceRelease:'5.1.1',sourceReleaseYear:2022,checkedAt:'2026-10-25',sourceCommit:'9380cca83db5f9aef52d5e762765100745f84b27',sourceFile:'geojson/ne_10m_admin_1_states_provinces.geojson',sourceSHA256:inputHash,license:'public-domain',licenseFile:'regional-reference.LICENSE.md',contentVersion:manifest.version,counts:{features:features.length,countryAreaGroups:countries.length,geometryBytes:totalBytes,largestChunk,inputVertices,outputVertices},transformations:{topologyQuantization:1e7,protectedSmallAndHoleArcs:protectedArcs.size,weightedPointQuantile:.12,weightThreshold:threshold,coordinateDecimals:4,inputPolygonComponents:raw.features.reduce((n,f)=>n+(f.geometry.type==='Polygon'?1:f.geometry.coordinates.length),0),outputPolygonComponents:features.reduce((n,f)=>n+(f.geometry.type==='Polygon'?1:f.geometry.coordinates.length),0),geometryFallbackIds:fallbacks,labelCorrectionIds:labelCorrections,removedDegenerateRings:invalidRings.length,tools:{'topojson-server':'3.0.1','topojson-client':'3.1.0','topojson-simplify':'3.0.3',polylabel:'2.0.1'}},scope:{en:'Modern source administrative units from Natural Earth 5.1.1 (2022). Levels and territorial groupings vary; these are not historical boundaries or an authoritative current administrative register. Source country/area groupings do not adjudicate sovereignty.',zh:'Natural Earth 5.1.1版（2022年）的现代来源行政单元。级别与地区分组并不统一，不是历史疆界或权威现行行政名录；来源的国家／地区分组不裁定主权。'},sources:[{title:'Admin 1 – States, provinces (1:10 million)',publisher:'Natural Earth',url:'https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/',checkedAt:'2026-10-25',evidenceNote:'Official dataset description inspected in the in-app browser: worldwide source units, mixed administrative levels, gaps and change over time; de facto source conventions.'},{title:'Natural Earth terms of use',publisher:'Natural Earth',url:'https://www.naturalearthdata.com/about/terms-of-use/',checkedAt:'2026-10-25',evidenceNote:'Public-domain reuse; separate source notice retained.'},{title:'Pinned 5.1.1 source GeoJSON',publisher:'Natural Earth contributors',url:'https://github.com/nvkelso/natural-earth-vector/blob/9380cca83db5f9aef52d5e762765100745f84b27/geojson/ne_10m_admin_1_states_provinces.geojson',evidenceNote:'Acquired via Git from the pinned release; input checksum verified.',checkedAt:'2026-10-25'}],countries};write('regional-reference.json',metadata);console.log(JSON.stringify({counts:metadata.counts,fallbacks:fallbacks.length,labelCorrections:labelCorrections.length},null,2));
