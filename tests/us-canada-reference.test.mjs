import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {buildAreaHistoryIndex,areaHistory,searchAreas} from '../dist/us-canada-reference.mjs';

const dataRoot=new URL('../dist/data/',import.meta.url);
const read=file=>JSON.parse(fs.readFileSync(new URL(file,dataRoot),'utf8'));
const manifest=read('us-canada-reference.json');
const layers=manifest.layers.map(layer=>({layer,collection:read(layer.file)}));
const features=layers.flatMap(({collection})=>collection.features);
const byId=new Map(features.map(feature=>[feature.properties.id,feature]));
const context={};
vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),context);
const d3=context.d3;
const polygons=geometry=>geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
const finitePoint=point=>Array.isArray(point)&&point.length===2&&Number.isFinite(point[0])&&Number.isFinite(point[1])&&Math.abs(point[0])<=180&&Math.abs(point[1])<=90;

// Independent release receipt: changing these requires another source review,
// rather than merely rewriting the manifest hashes to accept altered data.
const pinned={
 commit:'9380cca83db5f9aef52d5e762765100745f84b27',
 file:'geojson/ne_50m_admin_1_states_provinces.geojson',
 sha256:'69a0e06e640b2d505858ae1cb63034e4677f3000b35a98e16312932b98c426b9'
};

test('US/Canada reference retains pinned provenance and cannot enter historical snapshot membership',()=>{
 assert.equal(manifest.schemaVersion,1);
 assert.equal(manifest.role,'modern-reference');
 assert.equal(manifest.sourceRelease,'5.1.1');
 assert.equal(manifest.sourceReleaseYear,2022);
 assert.equal(manifest.sourceCommit,pinned.commit);
 assert.equal(manifest.sourceFile,pinned.file);
 assert.equal(manifest.sourceSHA256,pinned.sha256);
 assert.equal(manifest.license,'public-domain');
 assert.match(manifest.scope.en,/modern|Modern/);
 assert.match(manifest.scope.en,/do not reconstruct.*historical/i);
 assert.match(manifest.scope.zh,/现代/);
 assert.match(manifest.scope.zh,/不重建.*历史/);
 assert.ok(manifest.sources.some(source=>source.url.includes(pinned.commit)&&source.url.includes(pinned.file)));
 assert.ok(manifest.sources.every(source=>source.evidenceNote&&source.checkedAt&&new URL(source.url).protocol==='https:'));
 const historical=read('map-snapshots.json');
 const referenceFiles=new Set(manifest.layers.map(layer=>layer.file));
 assert.ok(historical.layers.every(layer=>!referenceFiles.has(layer.file)));
 assert.ok(historical.snapshots.every(snapshot=>snapshot.featureIds.every(id=>!byId.has(id))));
 for(const feature of features){
  const properties=feature.properties;
  assert.equal(properties.role,'modern-administrative-reference',properties.id);
  assert.equal(properties.sourceRelease,manifest.sourceRelease);
  assert.equal(properties.license,manifest.license);
  for(const historicalField of ['sourceYear','contextValidity','start','end'])
   assert.equal(properties[historicalField],undefined,properties.id+' must not assert '+historicalField);
 }
});

test('reference shards obey byte/hash limits and enumerate exactly 50 states, DC and 13 Canadian units',()=>{
 assert.equal(layers.length,2);
 assert.equal(features.length,64);
 assert.equal(byId.size,64,'stable IDs are unique across both countries');
 const expected={USA:'AK AL AR AZ CA CO CT DC DE FL GA HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA RI SC SD TN TX UT VA VT WA WI WV WY',CAN:'AB BC MB NB NL NS NT NU ON PE QC SK YT'};
 for(const {layer,collection} of layers){
  const bytes=fs.readFileSync(new URL(layer.file,dataRoot));
  assert.equal(bytes.length,layer.bytes,layer.file+' bytes');
  assert.equal(createHash('sha256').update(bytes).digest('hex'),layer.sha256,layer.file+' hash');
  assert.ok(bytes.length<450000,layer.file+' stays below 450 KB');
  assert.equal(collection.type,'FeatureCollection');
  assert.equal(collection.features.length,layer.features);
  assert.equal(layer.features,layer.country==='USA'?51:13);
  assert.ok(collection.features.every(feature=>feature.properties.country===layer.country));
  assert.deepEqual(collection.features.map(feature=>feature.properties.abbreviation).sort(),expected[layer.country].split(' ').sort());
 }
 assert.equal(features.filter(feature=>feature.properties.country==='USA'&&feature.properties.type==='State').length,50);
 assert.equal(byId.get('US-DC').properties.type,'Federal District');
 assert.equal(features.filter(feature=>feature.properties.country==='CAN'&&feature.properties.type==='Province').length,10);
 assert.equal(features.filter(feature=>feature.properties.country==='CAN'&&feature.properties.type==='Territory').length,3);
});

test('every reference unit keeps bilingual names and a finite label anchor inside its own shape',()=>{
 for(const feature of features){
  const p=feature.properties;
  assert.equal(feature.type,'Feature');
  assert.equal(p.id,(p.country==='USA'?'US-':'CA-')+p.abbreviation);
  assert.equal(typeof p.name.en,'string');assert.ok(p.name.en.trim());
  assert.equal(typeof p.name.zh,'string');assert.match(p.name.zh,/[\u3400-\u9fff]/u,p.id+' Chinese name');
  assert.ok(finitePoint(p.labelPoint),p.id+' valid longitude/latitude label anchor');
  assert.ok(d3.geoContains(feature,p.labelPoint),p.id+' label anchor stays on own polygon');
 }
 // Natural Earth uses "Washington" for both the state and DC. Stable IDs
 // and types disambiguate those source names; homonyms are not duplicate IDs.
 assert.notEqual(byId.get('US-DC'),byId.get('US-WA'));
});

test('reference geometry has closed finite spherical rings and finite Equal Earth render paths',()=>{
 const projection=d3.geoEqualEarth().scale(150).translate([0,0]);
 const path=d3.geoPath(projection);
 let polygonCount=0,ringCount=0;
 for(const feature of features){
  const label=feature.properties.id;
  assert.ok(['Polygon','MultiPolygon'].includes(feature.geometry?.type),label+' polygon geometry');
  const area=d3.geoArea(feature);
  assert.ok(Number.isFinite(area)&&area>0&&area<2*Math.PI,label+' positive sub-hemisphere feature');
  for(const polygon of polygons(feature.geometry)){
   polygonCount++;
   assert.ok(polygon.length>0,label+' exterior ring');
   for(const [ringIndex,ring]of polygon.entries()){
    ringCount++;
    assert.ok(ring.length>=4,label+' ring has at least three vertices and closure');
    assert.deepEqual(ring[0],ring.at(-1),label+' closed ring');
    assert.ok(ring.every(finitePoint),label+' finite geographic coordinates');
    const ringArea=d3.geoArea({type:'Polygon',coordinates:[ring]});
    // In D3, a correctly oriented hole as a standalone polygon has the
    // complementary area. Measure its excluded interior with 4π-area.
    const interiorArea=ringIndex===0?ringArea:4*Math.PI-ringArea;
    assert.ok(Number.isFinite(interiorArea)&&interiorArea>0&&interiorArea<2*Math.PI,label+' exterior/hole orientation '+ringIndex);
   }
  }
  const rendered=path(feature);
  assert.equal(typeof rendered,'string');assert.ok(rendered.length>0,label+' renderable path');
  assert.doesNotMatch(rendered,/NaN|Infinity/,label+' finite SVG path');
  assert.ok(path.bounds(feature).flat().every(Number.isFinite),label+' finite projected bounds');
 }
 assert.ok(polygonCount>300&&ringCount>=polygonCount,'islands and all rings must be exercised');
});

test('known inland and island locations select the correct unit without globe-complement overlap',()=>{
 const points={
  'CA-BC':[-124,54],
  'CA-ON':[-85,50],
  'CA-NU':[-96,65],
  'US-AK':[-147.72,64.84],
  'US-HI':[-155.5,19.6],
  'US-DC':[-77.0365,38.8977],
  'US-CA':[-119.7,36.7],
  'US-TX':[-99,31]
 };
 for(const [id,point]of Object.entries(points))
  assert.deepEqual(features.filter(feature=>d3.geoContains(feature,point)).map(feature=>feature.properties.id),[id],id+' interior membership');
 assert.deepEqual(features.filter(feature=>d3.geoContains(feature,[0,0])),[],'unrelated continent/ocean is outside every reference unit');
});

const sample=['CA-BC','CA-ON','US-AK','US-DC'].map(id=>byId.get(id));
const records=[
 {id:'mobile-life',region:'north-america',start:1750,end:1850,location:{lon:-124,lat:54},milestones:[
  {year:1800,location:{lon:-124,lat:54}},
  {year:1810,location:{lon:-85,lat:50}},
  {year:1810,location:{lon:-85,lat:50}}
 ]},
 {id:'early-ontario',region:'north-america',start:1600,end:1600,location:{lon:-85,lat:50}},
 {id:'late-ontario',region:'north-america',start:1890,end:1900,location:{lon:-85,lat:50}},
 {id:'other-region',region:'europe',start:1750,end:1850,location:{lon:-124,lat:54}},
 {id:'unmapped',region:'north-america',start:1750,end:1850,location:{lon:2.35,lat:48.86}}
];

test('area indexing distinguishes representative and milestone associations without duplicating people',()=>{
 const beforeRecords=JSON.stringify(records),beforeFeatures=JSON.stringify(sample);
 const index=buildAreaHistoryIndex(records,sample,d3.geoContains);
 assert.deepEqual(Object.keys(index).sort(),sample.map(feature=>feature.properties.id).sort());
 assert.deepEqual(index['CA-BC'],[{recordId:'mobile-life',roles:['representative','milestone'],milestoneYears:[1800]}]);
 assert.deepEqual(index['CA-ON'].find(link=>link.recordId==='mobile-life'),{recordId:'mobile-life',roles:['milestone'],milestoneYears:[1810]});
 assert.equal(index['CA-ON'].filter(link=>link.recordId==='mobile-life').length,1);
 assert.deepEqual(index['US-AK'],[]);assert.deepEqual(index['US-DC'],[]);
 assert.ok(!Object.values(index).flat().some(link=>['other-region','unmapped'].includes(link.recordId)));
 assert.equal(JSON.stringify(records),beforeRecords,'record input remains unchanged');
 assert.equal(JSON.stringify(sample),beforeFeatures,'source geometry remains unchanged');
});

test('area year filtering uses focus intervals for representative points and exact years for milestone-only associations',()=>{
 const index=buildAreaHistoryIndex(records,sample,d3.geoContains);
 const ids=(area,year=null)=>areaHistory(area,index,records,{year}).map(record=>record.id);
 assert.deepEqual(ids('CA-ON'),['early-ontario','mobile-life','late-ontario'],'all-year navigation retains and sorts every association');
 assert.deepEqual(ids('CA-ON',1600),['early-ontario']);
 assert.deepEqual(ids('CA-ON',1810),['mobile-life'],'the dated milestone is available');
 assert.deepEqual(ids('CA-ON',1811),[],'an Ontario milestone must not imply continuous residence');
 assert.deepEqual(ids('CA-ON',1895),['late-ontario']);
 assert.deepEqual(ids('CA-BC',1750),['mobile-life'],'inclusive representative focus start');
 assert.deepEqual(ids('CA-BC',1850),['mobile-life'],'inclusive representative focus end');
 assert.deepEqual(ids('CA-BC',1749),[]);assert.deepEqual(ids('CA-BC',1851),[]);
 assert.deepEqual(ids('missing-area'),[]);
});

test('area discovery supports bilingual names, stable IDs, normalized search and country scope',()=>{
 const ids=(query,country='all')=>searchAreas(features,query,country).map(feature=>feature.properties.id);
 assert.deepEqual(ids('ｏｎｔａｒｉｏ'),['CA-ON']);
 assert.deepEqual(ids('不列颠哥伦比亚'),['CA-BC']);
 assert.deepEqual(ids('  US-DC  '),['US-DC']);
 assert.deepEqual(ids('District of Columbia'),['US-DC'],'UI-friendly district alias preserves the source ID');
 assert.deepEqual(ids('Ontario','USA'),[]);
 assert.equal(ids('','USA').length,51);assert.equal(ids('','CAN').length,13);
 assert.deepEqual(new Set(ids('Washington')),new Set(['US-DC','US-WA']),'source-name homonyms stay discoverable as separate units');
});
