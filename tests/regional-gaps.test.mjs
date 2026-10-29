import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {createHash} from 'node:crypto';
import {historicalContextFeatures} from '../dist/atlas-model.mjs';import {reviewedRegionalFeature,amendRegionalChronology} from '../dist/regional-chronology.mjs';
import {historicalCollection,historicalMetadata} from './map-fixtures.mjs';
// Preserve the 627-instance checkpoint when later additive datasets are loaded.
const all=historicalCollection.features.filter(f=>!['historical-basemaps-china-review','remsen-warring-250','kiu-song-jin-1141','herrmann-ming-1415','historical-basemaps-three-region-transitions','woudloper-gupta-schematic','woudloper-gupta-schematic-later-gaps','historical-basemaps-later-gaps','hiribarren-borno-regional-context','woudloper-gupta-successor-schematic','soewinhan-toungoo-sphere'].includes(f.properties.sourceDataset)),fresh=all.filter(f=>f.properties.sourceDataset==='historical-basemaps-regional-gaps'),at=y=>historicalContextFeatures(all,y),find=(y,id)=>at(y).find(f=>f.properties.polityId===id);
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
const raw=id=>all.find(f=>f.properties.id===id),read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url)));
const positive=[
 [150,'satavahana',[80.36,16.57]],[650,'pallava',[79.7,12.84]],[700,'chalukya-badami',[75.67,15.91]],
 [800,'rashtrakuta',[77.15,17.2]],[1000,'chalukya-kalyani',[76.94,17.87]],[900,'pala',[85.45,25.14]],
 [900,'gurjara-pratihara',[79.92,27.06]],[1300,'delhi-sultanate',[77.2,28.61]],[1500,'vijayanagara',[76.46,15.33]],
 [1100,'polonnaruwa',[81,7.94]],[200,'aksum',[38.72,14.13]],[1200,'wagadu-transition',[-7.96,15.67]],
 [1000,'kanem',[16.5,14]],[1400,'ethiopia',[39.05,12.03]],[1700,'ethiopia',[37.47,12.61]],
 [1600,'benin',[5.62,6.34]],[1700,'oyo',[4.33,8.88]],[1800,'dahomey',[1.99,7.18]],[1300,'great-zimbabwe-region',[30.93,-20.27]],
 [500,'funan-region',[105.15,10.25]],[700,'dvaravati-region',[100.06,13.82]],[1200,'champa',[109.06,13.88]],
 [1500,'champa',[108.98,11.57]],[1200,'bagan',[94.86,21.17]],[1300,'sukhothai',[99.7,17.02]],[1400,'ayutthaya',[100.57,14.36]]
];
test('60 selected source references add geographically located coverage across three regions',()=>{
 assert.equal(fresh.length,60);assert.equal(all.length,624);assert.equal(new Set(fresh.map(f=>f.properties.polityId)).size,24);
 assert.deepEqual(historicalMetadata.regionalGapsReview.regions,{'south-asia':20,africa:23,'southeast-asia':17});
 for(const [year,id,point]of positive){const f=find(year,id);assert.ok(f,`${id}@${year}`);assert.ok(d3.geoContains(f,point),`${id}@${year}: witness omitted`);assert.equal(d3.geoContains(f,[2.35,48.86]),false,`${id}: spherical complement`);}
 const prior=all.filter(f=>!fresh.includes(f));for(const [year,id]of positive.filter(x=>!['aksum','ethiopia','ayutthaya'].includes(x[1])))assert.equal(historicalContextFeatures(prior,year).some(f=>f.properties.polityId===id),false,`${id}: negative control`);
});
test('South Asian sequence separates early/later Chalukyas and does not prolong rejected shapes',()=>{
 for(let y=600;y<=1189;y++){
  const id=y<753?'chalukya-badami':y<973?'rashtrakuta':'chalukya-kalyani';assert.ok(find(y,id),`${id}@${y}`);
  for(const other of ['chalukya-badami','rashtrakuta','chalukya-kalyani'].filter(x=>x!==id))assert.equal(find(y,other),undefined,`${other} leaks into${y}`);
 }
 for(const [y,id]of [[225,'satavahana'],[300,'satavahana'],[880,'pallava'],[700,'pala'],[1100,'pala'],[1000,'gurjara-pratihara'],[1190,'chalukya-kalyani'],[1200,'delhi-sultanate'],[1400,'delhi-sultanate'],[1526,'delhi-sultanate'],[1565,'vijayanagara']])assert.equal(find(y,id),undefined,`${id}@${y}`);
 assert.match(find(100,'satavahana').properties.note.en,/Paithan is omitted/);assert.equal(d3.geoContains(find(100,'satavahana'),[75.38,19.48]),false);
 assert.equal(d3.geoContains(find(1300,'delhi-sultanate'),[76.46,15.33]),false);
});
test('Chola whole-island fill follows conquest and independence while mainland vertices stay frozen',()=>{
 const island=[81,7.94],mainland=[79.14,10.79],original=raw('1000-chola'),before=JSON.stringify(original);
 for(let y=985;y<=1279;y++){
  const chola=find(y,'chola');assert.ok(chola);assert.ok(d3.geoContains(chola,mainland));
  assert.equal(d3.geoContains(chola,island),y>=1017&&y<=1069,`Sri Lanka@${y}`);
  assert.equal(!!find(y,'polonnaruwa'),y>=1070&&y<=1199,`Polonnaruwa@${y}`);
 }
 const amended=find(1000,'chola');assert.notEqual(amended,original);assert.deepEqual(amended.geometry.coordinates,original.geometry.coordinates.slice(1));assert.equal(find(1000,'chola'),amended,'cached wrapper');assert.equal(JSON.stringify(original),before);
 assert.deepEqual(raw('gaps-1000-polonnaruwa').geometry.coordinates,[original.geometry.coordinates[0]]);
 for(const id of ['early-1100-chola','early-1200-chola']){const original=raw(id),amended=amendRegionalChronology([original],original.properties.year)[0];assert.deepEqual(amended.geometry.coordinates,original.geometry.coordinates.slice(1));assert.match(amended.properties.note.en,/expelled/);}
 assert.equal(find(1000,'polonnaruwa'),undefined,'source year must not activate a future derived phase');assert.equal(find(1200,'polonnaruwa'),undefined);
});
test('explicit context eligibility constrains an exact source year and supports later component reuse',()=>{
 const f=raw('gaps-1000-polonnaruwa');assert.equal(historicalContextFeatures([f],1000).length,0);assert.equal(historicalContextFeatures([f],1070).length,1);
 const exact={...f,properties:{...f.properties,contextValidity:undefined}};assert.equal(historicalContextFeatures([exact],1000).length,1);assert.equal(historicalContextFeatures([exact],1001).length,0);
});
test('African phases distinguish Wagadu/Soso/Mali and imperial versus fragmented Ethiopian context',()=>{
 assert.ok(find(1179,'ghana'));assert.equal(find(1180,'ghana'),undefined);assert.ok(find(1180,'wagadu-transition'));assert.ok(find(1234,'wagadu-transition'));assert.equal(find(1235,'wagadu-transition'),undefined);assert.ok(find(1235,'mali'));
 const g=raw('1100-ghana'),text=JSON.stringify(g);assert.equal(reviewedRegionalFeature(g).properties.contextValidity.end,1179);assert.equal(JSON.stringify(g),text);
 for(let y=100;y<=699;y++)assert.ok(find(y,'aksum'),`Aksum@${y}`);assert.equal(find(700,'aksum'),undefined);
 for(let y=800;y<=1299;y++)assert.ok(find(y,'kanem'),`Kanem@${y}`);assert.equal(find(1300,'kanem'),undefined);
 for(const [y,label]of [[1270,'early Solomonic'],[1530,'early Solomonic'],[1636,'Gondarine'],[1768,'Gondarine'],[1769,'principalities'],[1854,'principalities'],[1855,'renewed imperial']])assert.match(find(y,'ethiopia').properties.name.en,new RegExp(label));
 assert.equal(find(1531,'ethiopia'),undefined);assert.equal(find(1635,'ethiopia'),undefined);
 assert.ok(find(1829,'oyo'));assert.equal(find(1830,'oyo'),undefined);assert.ok(find(1815,'dahomey'));assert.equal(find(1878,'benin'),undefined);
 assert.ok(find(1449,'great-zimbabwe-region'));assert.equal(find(1450,'great-zimbabwe-region'),undefined);
});
test('mainland Southeast Asia preserves occupation, cession and southern Cham continuity',()=>{
 assert.ok(find(549,'funan-region'));assert.equal(find(550,'funan-region'),undefined);assert.equal(find(600,'funan-region'),undefined);
 assert.ok(find(989,'dvaravati-region'));assert.equal(find(990,'dvaravati-region'),undefined);assert.equal(find(1000,'dvaravati-region'),undefined);
 assert.match(find(1190,'champa').properties.name.en,/occupation/);assert.match(find(1220,'champa').properties.name.en,/occupation/);assert.match(find(1221,'champa').properties.name.en,/pre-1306/);
 assert.ok(d3.geoContains(find(1305,'champa'),[107.59,16.46]));assert.equal(find(1306,'champa'),undefined);assert.equal(find(1400,'champa'),undefined);
 const south=find(1471,'champa');assert.ok(south);assert.equal(d3.geoContains(south,[107.59,16.46]),false);assert.equal(d3.geoContains(south,[109.06,13.88]),false);assert.ok(d3.geoContains(south,[108.98,11.57]));
 assert.ok(find(1319,'sukhothai'));assert.equal(find(1320,'sukhothai'),undefined);assert.equal(find(1400,'sukhothai'),undefined);
 assert.ok(find(1351,'ayutthaya'));assert.equal(find(1350,'ayutthaya'),undefined);assert.ok(find(1568,'ayutthaya'));assert.equal(find(1569,'ayutthaya'),undefined);assert.equal(find(1599,'ayutthaya'),undefined);assert.ok(find(1600,'ayutthaya'));
});
test('Bagan source composite includes the mislabeled central plain without introducing a late Pyu state',()=>{
 for(let y=950;y<=1286;y++){const f=find(y,'bagan');assert.ok(f,`Bagan@${y}`);assert.ok(d3.geoContains(f,[94.86,21.17]),`Bagan capital@${y}`);}
 assert.equal(find(900,'bagan'),undefined);assert.equal(find(1287,'bagan'),undefined);assert.equal(find(1400,'bagan'),undefined);
 const f=find(1200,'bagan');assert.deepEqual(f.properties.sourceFeatureIndices,[218,31]);assert.deepEqual(f.properties.sourceNames,['Bagan','Pyu state']);assert.match(f.properties.sourceCorrection.note.en,/mislabeled Pyu/);assert.equal(at(1200).some(f=>/Pyu state/.test(f.properties.name.en)),false);
});
test('cultural networks and source windows retain explicit bilingual limits',()=>{
 for(const id of ['wagadu-transition','great-zimbabwe-region','funan-region','dvaravati-region'])assert.ok(fresh.filter(f=>f.properties.polityId===id).every(f=>f.properties.kind==='culture'));
 for(const f of fresh){const p=f.properties;assert.equal(p.sourceYear,p.year);assert.ok(p.contextValidity.note.en&&p.contextValidity.note.zh);assert.ok(p.contextValidity.evidence.length);assert.match(p.note.en,/not an annual frontier/);assert.ok(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI);}
 const meta=historicalMetadata.regionalGapsReview;assert.equal(meta.inputs.length,19);for(const input of meta.inputs){assert.match(input.sourceSha256,/^[a-f0-9]{64}$/);assert.ok(input.url.includes(meta.sourceCommit));}
});
test('all 567 earlier instances and layer descriptors remain byte-for-byte preserved',()=>{
 const baseline=read('../docs/REGIONAL_GAPS_BASELINE.json');assert.equal(baseline.featureCount,567);assert.equal(all.filter(f=>!fresh.includes(f)).length,564);
 for(const prior of baseline.layers){if(prior.descriptor.file==='territories-jiangshan.geojson'){assert.ok(!historicalMetadata.layers.some(x=>x.file===prior.descriptor.file));continue;}assert.deepEqual(historicalMetadata.layers.find(l=>l.file===prior.descriptor.file),prior.descriptor);assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../dist/data/'+prior.descriptor.file,import.meta.url))).digest('hex'),prior.sha256);}
});
