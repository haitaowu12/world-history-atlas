import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {historicalContextFeatures} from '../dist/atlas-model.mjs';
import {selectCshapesAt} from '../dist/cshapes-history.mjs';
import {composeCountryPeriodContext} from '../dist/regional-country-context.mjs';
import {mapDisplayPalette} from '../dist/map-palette.mjs';
import {historicalCollection} from './map-fixtures.mjs';

const all=historicalCollection.features;
const at=year=>historicalContextFeatures(all,year);
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);
const d3=ctx.d3;
const find=(year,id)=>at(year).find(f=>f.properties.polityId===id);

test('Brazil retains dated context through colonial, crown and imperial handoffs',()=>{
 for(let year=1600;year<=1885;year++){
  const id=year<1822?'brazil-portuguese':'brazil-empire';
  assert.ok(find(year,id),`${year}: Brazil regional reference must remain visible`);
 }
 for(const year of [1814,1815,1821,1822,1867,1877,1878,1885]){
  const brazil=find(year,year<1822?'brazil-portuguese':'brazil-empire');
  assert.ok(d3.geoContains(brazil,[-43.2,-22.9]),`${year}: Rio de Janeiro is inside the selected outline`);
 }
 assert.equal(find(1822,'brazil-portuguese'),undefined,'the colonial label must stop at independence');
 assert.equal(find(1821,'brazil-empire'),undefined,'no Empire before independence');
 const empire=find(1867,'brazil-empire');
 assert.equal(empire.properties.sourceYear,1878,'backward context must preserve the actual source date');
 assert.equal(empire.properties.name.en,'Empire of Brazil');
 assert.ok(empire.properties.sourceNames.includes('Kingdom of Brazil'),'preserve the corrected source alias');
 assert.equal(d3.geoContains(empire,[-56.16,-34.9]),false,'1878 Brazil must exclude independent Uruguay');
});

test('regional coverage cannot pass merely because Europe or China has a polygon',()=>{
 // Geographic witnesses, independent of feature counts or generated metadata.
 const witnesses=[
  ['chile',[-70.65,-33.45]],['peru-republic',[-77.04,-12.05]],
  ['bolivia',[-68.1,-16.5]],['uruguay',[-56.16,-34.9]],
  ['colombia',[-74.07,4.71]],['ecuador',[-78.5,-.22]],
  ['asante',[-1.62,6.69]],['sokoto',[5.24,13.06]],
  ['buganda',[32.58,.347]],['bunyoro',[31.1,1.8]],
  ['kuba',[21.8,-4.9]],['luba',[24.7,-6.2]],['merina',[47.5,-18.9]],
 ];
 for(const year of [1863,1867,1873,1874,1877,1878,1885]){
  for(const [id,point]of witnesses){
   const feature=find(year,id);assert.ok(feature,`${year}: ${id} absent`);
   assert.ok(d3.geoContains(feature,point),`${year}: ${id} has lost its regional witness`);
  }
 }
 // Regression witness: the preceding release still passed worldwide temporal
 // coverage while omitting all of these additions in the reported 1867 view.
 const before=historicalContextFeatures(all.filter(f=>f.properties.sourceDataset!=='historical-basemaps-regional-continuity'),1867);
 assert.ok(before.length>0);
 assert.equal(before.some(f=>f.properties.polityId==='brazil-empire'),false);
 assert.equal(before.some(f=>f.properties.polityId==='asante'),false);
});

test('selected African phases and South American successors have no internal eligibility gaps',()=>{
 for(const [id,start]of [['asante',1750],['luba',1800],['lunda',1800],['kuba',1800],['sokoto',1815],['buganda',1815],['bunyoro',1815],['merina',1815],['chile',1831],['uruguay',1830],['ecuador',1832],['peru-republic',1839],['bolivia',1839],['colombia',1863],['paraguay',1871]]){
  for(let year=start;year<=1885;year++)assert.ok(find(year,id),`${id} disappears at ${year}`);
 }
 assert.equal(find(1830,'ecuador'),undefined,'do not backdate the successor phase into Gran Colombia');
 assert.equal(find(1862,'colombia'),undefined,'do not backdate the United States of Colombia title');
 assert.equal(find(1870,'paraguay'),undefined,'the postwar source is not extended into the preceding war');
});

test('neighboring Great Lakes and central African references remain visually distinct',()=>{
 const selected=at(1867),palette=mapDisplayPalette(selected,{scheme:'mineral'});
 for(const [a,b]of [['buganda','bunyoro'],['luba','lunda'],['luba','kuba']]){
  assert.notEqual(palette.get(find(1867,a).properties.id),palette.get(find(1867,b).properties.id),`${a} and ${b} must not visually merge`);
 }
});

test('1886 hands South American coverage to the existing annual country source',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../dist/data/cshapes-periods-v7.geojson',import.meta.url)));
 const features=selectCshapesAt(data,1886);
 for(const point of [[-43.2,-22.9],[-70.65,-33.45],[-77.04,-12.05],[-68.1,-16.5],[-56.16,-34.9],[-74.07,4.71],[-78.5,-.22]]){
  assert.ok(features.some(f=>d3.geoContains(f,point)),`annual source loses ${point} at the 1886 handoff`);
 }
});

test('the annual-country switch preserves reviewed African regions until their source handoff',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../dist/data/cshapes-periods-v7.geojson',import.meta.url)));
 for(const [id,point,handoff]of [['asante',[-1.62,6.69],1888],['sokoto',[5.24,13.06],1899],['buganda',[32.58,.347],1891],['bunyoro',[31.1,1.8],1891]]){
  for(let year=1886;year<=1903;year++){
   const annual=selectCshapesAt(data,year),before=JSON.stringify(annual);
   const combined=composeCountryPeriodContext(annual,all,year);
   assert.equal(JSON.stringify(annual),before,'composition must not mutate the annual source');
   assert.ok(combined.some(f=>d3.geoContains(f,point)),`${id}: geographic gap at ${year}`);
   const supplement=combined.find(f=>f.properties.polityId===id);
   assert.equal(!!supplement,year<handoff,`${id}: only the explicitly reviewed source gap is supplemented`);
   if(supplement){
    assert.equal(supplement.properties.sourceYear,1878);
    assert.ok(combined.indexOf(supplement)<combined.findIndex(f=>f.properties.sourceDataset==='cshapes-2.0'),'dated context underneath annual units');
   }
  }
 }
 const annual=selectCshapesAt(data,1900);
 assert.strictEqual(composeCountryPeriodContext(annual,all,1900),annual,'no lingering references after the handoffs');
 const fake={type:'Feature',geometry:all[0].geometry,properties:{...all[0].properties,polityId:'unreviewed',countryPeriodSupplement:true,contextValidity:{start:1886,end:1900,backwardReviewed:true}}};
 assert.ok(!composeCountryPeriodContext(selectCshapesAt(data,1886),[fake],1886).includes(fake),'a flag on an unrelated dataset cannot bypass review');
});

test('known bad source polygons remain excluded and new layers meet the transport budget',()=>{
 assert.ok(!all.some(f=>['1800-peru-colonial','1800-rioplata','1900-ethiopia','1878-venezuela'].includes(f.properties.id)));
 const meta=JSON.parse(fs.readFileSync(new URL('../dist/data/map-snapshots.json',import.meta.url)));
 for(const layer of meta.layers.filter(l=>l.file.startsWith('territories-continuity-'))){
  const bytes=fs.readFileSync(new URL('../dist/data/'+layer.file,import.meta.url));
  assert.ok(bytes.length<450000);
  for(const feature of JSON.parse(bytes).features){
   assert.ok(d3.geoArea(feature)>0&&d3.geoArea(feature)<2*Math.PI);
   for(const make of [d3.geoEqualEarth,d3.geoNaturalEarth1,d3.geoEquirectangular])assert.doesNotMatch(d3.geoPath(make())(feature),/NaN|Infinity/);
  }
 }
});
