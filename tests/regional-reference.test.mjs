import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {REGIONAL_ZOOM,boundsContain,referenceAreaName,searchRegionalUnits,referenceHistory,projectedReferenceBounds,visibleReferenceCountries} from '../dist/regional-reference.mjs';
import {CONTENT_MANIFEST} from '../dist/content-expansion.mjs';
import {applyChinaReviews} from '../dist/china-review.mjs';

const root=new URL('../dist/data/',import.meta.url);
const bytes=file=>fs.readFileSync(new URL(file,root));
const read=file=>JSON.parse(bytes(file));
const metadata=read('regional-reference.json');
const layers=metadata.countries.flatMap(country=>country.layers.map(layer=>({country,layer,collection:read(layer.file)})));
const features=layers.flatMap(({collection})=>collection.features);
const byId=new Map(features.map(feature=>[feature.properties.id,feature]));
const bySource=new Map(features.map(feature=>[feature.properties.sourceId,feature]));
const context={};
vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),context);
const d3=context.d3;
const polygons=geometry=>geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
const finitePoint=point=>Array.isArray(point)&&point.length===2&&point.every(Number.isFinite)&&Math.abs(point[0])<=180&&Math.abs(point[1])<=90;
const content=read(CONTENT_MANIFEST);
const base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json',...content.files.map(file=>file.file)].flatMap(read);
const china=read('china-import-manifest.json').eventFiles.flatMap(file=>read(file.path));
const records=[...base,...applyChinaReviews(china,read('china-library.json'),read('china-reviews.json')).events];
const recordsById=new Map(records.map(record=>[record.id,record]));

// Independent input receipt, rather than self-accepting generated output hashes.
const source={
 commit:'9380cca83db5f9aef52d5e762765100745f84b27',
 file:'geojson/ne_10m_admin_1_states_provinces.geojson',
 sha256:'22d0e3ad85eb3e27f17cabf8ba2d50e554fbc27a87796ff891d958185da62fb5'
};

test('worldwide regional reference retains pinned modern-source scope and stays outside historical snapshots',()=>{
 assert.equal(metadata.schemaVersion,1);assert.equal(metadata.role,'modern-reference');
 assert.equal(metadata.sourceCommit,source.commit);assert.equal(metadata.sourceFile,source.file);assert.equal(metadata.sourceSHA256,source.sha256);
 assert.equal(metadata.sourceRelease,'5.1.1');assert.equal(metadata.sourceReleaseYear,2022);
 assert.equal(metadata.contentVersion,'0.11.0','frozen geometry link checkpoint');assert.equal(read(content.regionalHistoryFile).contentVersion,content.version);assert.equal(metadata.license,'public-domain');
 assert.ok(bytes(metadata.licenseFile).length>0);
 assert.match(metadata.scope.en,/not historical boundaries/);assert.match(metadata.scope.en,/not.*authoritative current administrative register/);
 assert.match(metadata.scope.en,/do not adjudicate sovereignty/);assert.match(metadata.scope.zh,/不裁定主权/);
 assert.ok(metadata.sources.some(item=>item.url.includes(source.commit)&&item.url.includes(source.file)));
 for(const item of metadata.sources){assert.equal(new URL(item.url).protocol,'https:');assert.ok(item.evidenceNote&&item.checkedAt&&item.publisher);}
 const historical=read('map-snapshots.json'),files=new Set(layers.map(({layer})=>layer.file));
 assert.ok(historical.layers.every(layer=>!files.has(layer.file)));
 assert.ok(historical.snapshots.every(snapshot=>snapshot.featureIds.every(id=>!byId.has(id))));
 for(const feature of features){
  assert.equal(feature.properties.role,'modern-administrative-reference');
  assert.equal(feature.properties.sourceRelease,metadata.sourceRelease);
  for(const key of ['start','end','sourceYear','contextValidity','timeline'])assert.equal(feature.properties[key],undefined,feature.properties.id+' does not assert historical '+key);
 }
});

test('all 4596 source units and 251 country-area groups have unique identities and bounded hash-checked shards',()=>{
 assert.equal(metadata.counts.features,4596);assert.equal(features.length,4596);
 assert.equal(metadata.counts.countryAreaGroups,251);assert.equal(metadata.countries.length,251);
 assert.equal(new Set(metadata.countries.map(country=>country.code)).size,251);
 assert.equal(byId.size,4596);assert.equal(bySource.size,4596);
 assert.equal(new Set(layers.map(({layer})=>layer.file)).size,layers.length);
 let totalBytes=0,largest=0;
 for(const {country,layer,collection}of layers){
  const data=bytes(layer.file);totalBytes+=data.length;largest=Math.max(largest,data.length);
  assert.equal(data.length,layer.bytes,layer.file+' byte receipt');
  assert.equal(createHash('sha256').update(data).digest('hex'),layer.sha256,layer.file+' hash receipt');
  assert.ok(data.length<450000,layer.file+' under450KB');
  assert.equal(collection.type,'FeatureCollection');assert.equal(collection.features.length,layer.features);
  assert.ok(collection.features.every(feature=>feature.properties.country===country.code));
 }
 assert.equal(totalBytes,metadata.counts.geometryBytes);assert.equal(largest,metadata.counts.largestChunk);
 const isoCounts=new Map();for(const feature of features){const iso=feature.properties.isoCode;isoCounts.set(iso,(isoCounts.get(iso)||0)+1);}
 assert.ok([...isoCounts.values()].some(count=>count>1),'duplicate source ISO codes are exercised');
 for(const feature of features){const p=feature.properties;assert.equal(p.id,p.isoCode&&p.isoCode!=='-1'&&isoCounts.get(p.isoCode)===1?p.isoCode:p.sourceId,p.sourceId+' collision-safe identity');}
 for(const country of metadata.countries){
  assert.equal(country.count,features.filter(feature=>feature.properties.country===country.code).length);
  assert.ok(country.name.en&&country.name.zh);assert.ok(finitePoint(country.center));
 }
 const expected={USA:51,CAN:13,CHN:32,IND:36,BRA:27,AUS:11,JPN:47,FRA:101,DEU:16,NGA:37};
 for(const [code,count]of Object.entries(expected))assert.equal(metadata.countries.find(country=>country.code===code)?.count,count,code+' source inventory');
});

test('names preserve source granularity, truthful language fallbacks and disambiguated DC',()=>{
 for(const feature of features){const p=feature.properties;assert.ok(p.name.en?.trim(),p.id+' English source name');assert.ok(p.name.zh?.trim(),p.id+' Chinese or explicit source fallback');}
 for(const id of ['ATA+99?','KIR+99?','COL+99?','VEN+99?','AIA+99?','MEX+99?','RUS+99?'])
  assert.deepEqual(bySource.get(id).properties.name,{en:`Unnamed unit (${id})`,zh:`未命名单元（${id}）`},id+' unnamed-source disclosure is not an invented place name');
 assert.equal(features.filter(feature=>feature.properties.country==='FRA'&&feature.properties.sourceType==='Metropolitan department').length,96);
 assert.equal(features.filter(feature=>feature.properties.country==='FRA'&&feature.properties.sourceType==='Overseas department').length,5);
 assert.equal(byId.get('NG-FC').properties.sourceType,'State','FCT source classification is retained rather than silently modernized');
 assert.equal(bySource.get('RUS-283').properties.country,'RUS');assert.equal(bySource.get('RUS-283').properties.isoCode,'UA-43','source group and ISO prefix are different evidence fields');
 assert.equal(metadata.countries.find(country=>country.code==='HKG').count,18);
 assert.equal(metadata.countries.find(country=>country.code==='MAC').count,1);
 assert.equal(metadata.countries.find(country=>country.code==='TWN').count,21);
 assert.equal(referenceAreaName(byId.get('US-DC'),'en'),'District of Columbia');
 assert.equal(referenceAreaName(byId.get('US-DC'),'zh'),'哥伦比亚特区');
 assert.notEqual(referenceAreaName(byId.get('US-DC')),referenceAreaName(byId.get('US-WA')));
});

test('every simplified unit has finite closed spherical rings, valid holes and a usable interior label',()=>{
 const path=d3.geoPath(d3.geoEqualEarth().scale(150).translate([0,0]));
 let polygonCount=0,holeCount=0,vertices=0;
 const corrected=new Set(metadata.transformations.labelCorrectionIds);
 for(const feature of features){
  const p=feature.properties;
  assert.equal(feature.type,'Feature');assert.ok(['Polygon','MultiPolygon'].includes(feature.geometry.type),p.id);
  const area=d3.geoArea(feature);assert.ok(Number.isFinite(area)&&area>0&&area<2*Math.PI,p.id+' sub-hemisphere geometry');
  for(const polygon of polygons(feature.geometry)){
   polygonCount++;assert.ok(polygon.length>0,p.id+' exterior exists');
   for(const [index,ring]of polygon.entries()){
    vertices+=ring.length;if(index>0)holeCount++;
    assert.ok(ring.length>=4,p.id+' closed ring minimum');assert.deepEqual(ring[0],ring.at(-1),p.id+' ring closure');
    assert.ok(ring.every(finitePoint),p.id+' finite coordinates');
    assert.ok(new Set(ring.map(point=>point.join(','))).size>=3,p.id+' distinct vertices');
    const a=d3.geoArea({type:'Polygon',coordinates:[ring]}),interior=index===0?a:4*Math.PI-a;
    assert.ok(Number.isFinite(interior)&&interior>0&&interior<2*Math.PI,p.id+' exterior/hole winding '+index);
   }
  }
  assert.ok(finitePoint(p.sourceLabelPoint),p.id+' original label retained');assert.ok(finitePoint(p.labelPoint),p.id+' derived label finite');
  assert.ok(d3.geoContains(feature,p.labelPoint),p.id+' label inside own shape');
  assert.ok(boundsContain(p.bounds,p.labelPoint),p.id+' label inside exported bounds');
  assert.equal(p.labelMethod,corrected.has(p.id)?'interior-label':'source',p.id+' label derivation disclosed');
  if(p.labelMethod==='source')assert.ok(p.labelPoint.every((value,index)=>Math.abs(value-p.sourceLabelPoint[index])<=.0000005+1e-12),p.id+' source anchor retained within six-decimal label rounding');
  const rendered=path(feature);assert.equal(typeof rendered,'string');assert.ok(rendered.length>0,p.id+' renderable');assert.doesNotMatch(rendered,/NaN|Infinity/,p.id+' finite SVG');
 }
 assert.ok(polygonCount>4596,'island components are exercised');
 assert.equal(holeCount,111,'all111 interior rings from the independently inspected pinned source survive simplification');
 assert.equal(vertices,metadata.counts.outputVertices);
 assert.ok(vertices<metadata.counts.inputVertices,'reference geometry is simplified');
});

// Coordinates independently checked against the pinned oriented raw input.
const locations=[
 ['USA','US-CA',[-119.7,36.7]],['USA','US-TX',[-99,31]],['USA','US-DC',[-77.0365,38.8977]],['USA','US-AK',[-147.72,64.84]],['USA','US-HI',[-155.5,19.6]],
 ['CAN','CA-BC',[-124,54]],['CAN','CA-ON',[-85,50]],['CAN','CA-NU',[-96,65]],
 ['CHN','CN-BJ',[116.4,39.9]],['CHN','CN-SC',[104,30.7]],['CHN','CN-GD',[113.26,23.13]],
 ['IND','IN-MH',[76,19]],['IND','IN-KL',[76.5,9.7]],['IND','IN-TN',[78,11]],
 ['BRA','BR-AM',[-64,-4]],['BRA','BR-SP',[-48,-22]],['BRA','BR-DF',[-47.9,-15.8]],
 ['AUS','AU-WA',[120,-25]],['AUS','AUS-2654',[147,-32]],['AUS','AU-TAS',[146.5,-42]],
 ['JPN','JP-01',[142.5,43.5]],['JPN','JP-13',[139.75,35.7]],['JPN','JP-47',[127.68,26.21]],
 ['FRA','FR-75',[2.35,48.8566]],['FRA','FR-59',[3.06,50.63]],['FRA','FR-GF',[-53,4]],
 ['DEU','DE-BE',[13.4,52.52]],['DEU','DE-BY',[11.6,48.14]],
 ['NGA','NG-LA',[3.36,6.6]],['NGA','NG-FC',[7.4,9.05]],['NGA','NG-KN',[8.5,11.9]]
];

test('regional geometry resolves US/Canada and eight other source groups at known interior and island locations',()=>{
 for(const [country,id,point]of locations){
  assert.equal(byId.get(id)?.properties.country,country,id+' source group');
  assert.deepEqual(features.filter(feature=>feature.properties.country===country&&d3.geoContains(feature,point)).map(feature=>feature.properties.id),[id],id+' unique source-unit containment');
  assert.ok(boundsContain(byId.get(id).properties.bounds,point),id+' viewport/index bounds');
 }
});

test('regional discovery supports bilingual names, normalized text, IDs and truthful language fallback',()=>{
 const ids=(query,lang='en')=>searchRegionalUnits(features,query,lang).map(feature=>feature.properties.id);
 assert.deepEqual(ids('  ｏｎｔａｒｉｏ  '),['CA-ON']);
 assert.ok(ids('四川','zh').includes('CN-SC'));assert.ok(ids('不列颠哥伦比亚','zh').includes('CA-BC'));
 assert.deepEqual(ids('District of Columbia'),['US-DC']);assert.deepEqual(ids('Washington DC'),['US-DC']);
 assert.deepEqual(ids('华盛顿哥伦比亚特区','zh'),['US-DC']);
 for(const [,id]of locations)assert.ok(ids(id).includes(id),id+' searchable identity');
 assert.equal(ids('').length,4596);
 const placeholder=bySource.get('ATA+99?');assert.equal(referenceAreaName(placeholder,'zh'),placeholder.properties.name.zh);
 assert.equal(referenceAreaName({properties:{id:'untranslated',name:{en:'Source label',zh:''}}},'zh'),'Source label','missing Chinese keeps the available source name');
});

test('regional history links resolve to the reviewed corpus with explicit geometry or named-place evidence',()=>{
 assert.equal(records.length,1879);assert.equal(recordsById.size,1879);
 for(const feature of features){
  const p=feature.properties;assert.equal(new Set(p.historyLinks.map(link=>link.recordId)).size,p.historyLinks.length,p.id+' unique linked histories');
  for(const link of p.historyLinks){
   const record=recordsById.get(link.recordId);assert.ok(record,p.id+' target '+link.recordId);
   assert.ok(link.roles.length>0&&link.roles.every(role=>['representative','milestone','editorial'].includes(role)));
   if(link.roles.includes('representative'))assert.ok(d3.geoContains(feature,[record.location.lon,record.location.lat]),p.id+' representative point');
   for(const year of link.milestoneYears)assert.ok(record.milestones?.some(milestone=>milestone.year===year&&d3.geoContains(feature,[milestone.location.lon,milestone.location.lat])),p.id+' milestone '+year);
   if(link.roles.includes('editorial')){
    assert.ok(link.locationAssociation?.place.en&&link.locationAssociation.place.zh&&link.locationAssociation.note.en&&link.locationAssociation.note.zh,p.id+' named-place disclosure');
    assert.ok(link.locationAssociation.sources.length>0,p.id+' named-place sources');
   }
  }
 }
 assert.ok(byId.get('CN-BJ').properties.historyLinks.length>0,'China histories are included');
 assert.ok(byId.get('US-CA').properties.historyLinks.length>0,'US histories are included');
 assert.ok(byId.get('CA-ON').properties.historyLinks.length>0,'Canada histories are included');
});

test('reference history year filtering separates focus spans, exact milestones and reviewed place associations',()=>{
 const feature={properties:{historyLinks:[
  {recordId:'focus',roles:['representative'],milestoneYears:[]},
  {recordId:'travel',roles:['milestone'],milestoneYears:[1810]},
  {recordId:'named-place',roles:['editorial'],milestoneYears:[]}
 ]}};
 const sample=[{id:'focus',start:1800,end:1820},{id:'travel',start:1700,end:1900},{id:'named-place',start:1805,end:1815},{id:'unlinked',start:1800,end:1820}];
 const snapshot=JSON.stringify({feature,sample}),ids=year=>referenceHistory(feature,sample,year).map(record=>record.id);
 assert.deepEqual(ids(null),['travel','focus','named-place']);assert.deepEqual(ids(1799),[]);
 assert.deepEqual(ids(1800),['focus']);assert.deepEqual(ids(1805),['focus','named-place']);
 assert.deepEqual(ids(1810),['travel','focus','named-place']);assert.deepEqual(ids(1811),['focus','named-place']);
 assert.deepEqual(ids(1815),['focus','named-place']);assert.deepEqual(ids(1820),['focus']);assert.deepEqual(ids(1821),[]);
 assert.equal(JSON.stringify({feature,sample}),snapshot);
});

test('regional viewport activation includes US/Canada and every requested source group when zoomed to it',()=>{
 assert.equal(REGIONAL_ZOOM,1.8);
 const viewport={width:1200,height:800},projection=d3.geoEqualEarth().fitExtent([[16,100],[1184,728]],{type:'Sphere'});
 const zoomTo=(point,k=6)=>{const [x,y]=projection(point);return d3.zoomIdentity.translate(viewport.width/2-x*k,viewport.height/2-y*k).scale(k);};
 assert.deepEqual(visibleReferenceCountries(metadata.countries,projection,zoomTo([-99,40],REGIONAL_ZOOM-.01),viewport),[],'overview avoids loading all administrative geometry');
 for(const code of ['USA','CAN','CHN','IND','BRA','AUS','JPN','FRA','DEU','NGA']){
  const point=locations.find(([country])=>country===code)[2];
  assert.ok(visibleReferenceCountries(metadata.countries,projection,zoomTo(point),viewport).some(country=>country.code===code),code+' must appear on zoom');
 }
 assert.ok(visibleReferenceCountries(metadata.countries,projection,zoomTo([-99,40],REGIONAL_ZOOM),viewport).some(country=>country.code==='USA'),'inclusive activation threshold');
 assert.deepEqual(visibleReferenceCountries(metadata.countries,projection,d3.zoomIdentity.translate(-100000,-100000).scale(6),viewport),[],'offscreen groups are excluded');
 const wrapped=[[170,-10],[-170,10]];
 assert.ok(boundsContain(wrapped,[179,0]));assert.ok(boundsContain(wrapped,[-179,0]));assert.ok(!boundsContain(wrapped,[0,0]));assert.ok(!boundsContain(wrapped,[179,11]));
 const boxes=projectedReferenceBounds(wrapped,projection,zoomTo([179,0]));assert.equal(boxes.length,2);
 assert.ok(boxes.flat(2).every(Number.isFinite),'antimeridian viewport boxes stay finite');
});

// Incoming region links must preserve the historical year and reject unknown source groups.
test('regional share country resolution validates source groups without changing year or language',async()=>{
 const {regionalCountryFromHash}=await import('../dist/regional-reference.mjs');
 const groups=[{code:'USA'},{code:'CAN'},{code:'CHN'}];
 const hash='#year=-500&lang=zh&mode=all&regions=CAN';
 assert.equal(regionalCountryFromHash(hash,groups),'CAN');
 assert.equal(new URLSearchParams(hash.slice(1)).get('year'),'-500');
 assert.equal(regionalCountryFromHash('#year=1200&regions=CHN',groups),'CHN');
 assert.equal(regionalCountryFromHash('#regions=XYZ',groups),'');
 assert.equal(regionalCountryFromHash('#regions=CAN%2Ffile',groups),'');
 assert.equal(regionalCountryFromHash('#year=1867',groups),'');
});

test('a regional focus prioritizes its own labels instead of previously cached neighbouring countries',async()=>{
 const {regionalLabelCandidates}=await import('../dist/regional-reference.mjs');
 const rows=['CHN','USA','CAN','IND','FRA'].map(country=>({properties:{country}}));
 assert.deepEqual(regionalLabelCandidates(rows,'IND').map(f=>f.properties.country),['IND']);
 assert.deepEqual(regionalLabelCandidates(rows,'CAN').map(f=>f.properties.country),['CAN','USA']);
 assert.deepEqual(regionalLabelCandidates(rows,'USA').map(f=>f.properties.country),['USA','CAN']);
 assert.equal(regionalLabelCandidates(rows),rows);
});
