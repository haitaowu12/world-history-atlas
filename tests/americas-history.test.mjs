import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {createAmericasLoader,americasPhasesAt,composeAmericasFeatures,amendAmericasChronology,readingStepYear} from '../dist/americas-history.mjs';
import {DEFAULT_LAYERS,selectMapView,restoreMapLayers} from '../dist/map-views.mjs';
import {mapDisplayPalette} from '../dist/map-palette.mjs';
import {normalizeMapCollection} from '../dist/map-geometry.mjs';
const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const index=read('americas-history.json'),ctx={};
vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);
const d3=ctx.d3;
const loader=createAmericasLoader(index,async file=>normalizeMapCollection(read(file),d3.geoArea));
const rows=async year=>{await loader.load(year);return loader.peek(year);};
const at=(features,point)=>features.filter(f=>d3.geoContains(f,point));

test('dated Americas assets retain pinned source identities, source epochs, licenses and transport budgets',()=>{
 assert.equal(index.countries.USA.archiveSHA256,'db6f124d913bdda718fbf4153d5b1abe569cb9b60cb2a4d73b25afb5a258c457');
 assert.equal(index.countries.CAN.archiveSHA256,'99eb89f444af9dd4dcd36227ad1413eae28d274cc23493f452b4d64dc25dc926');
 assert.match(index.sources.USA.license,/2.5/);assert.match(index.sources.CAN.license,/Open Government/);
 assert.equal(index.countries.CAN.duplicates.length,1);
 let bytes=0;
 for(const country of Object.values(index.countries)){
  let end=country.start-1;
  for(const phase of country.phases){assert.equal(phase.start,end+1);end=phase.end;assert.ok(phase.sourceRows.length===phase.divisions);}
  assert.equal(end,country.end);
  for(const descriptor of [...country.sharedFiles,...country.phases.flatMap(p=>p.files)]){
   const raw=fs.readFileSync(new URL('../dist/data/'+descriptor.file,import.meta.url));
   assert.equal(raw.length,descriptor.bytes);assert.ok(raw.length<450000);
   assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),descriptor.sha256);bytes+=raw.length;
  }
 }
 assert.ok(bytes<8500000,'no repeated country-wide phase polygons');
 assert.equal(americasPhasesAt(index,1776).length,0,'source does not authorize1776 geometry');
});

test('US reference distinguishes early extent, independent republics and the1854 transfer from its1853 signature',async()=>{
 let features=await rows(1783);
 assert.ok(at(features,[-71.2,42.5]).some(f=>f.properties.parent==='USA'));
 assert.equal(at(features,[-81.7,28.2]).length,0,'Florida is not prematurely US');
 assert.ok(at(features,[-72.7,44.1]).some(f=>f.properties.parent==='vermont-republic'));
 features=await rows(1837);
 assert.ok(at(features,[-99,31]).some(f=>f.properties.parent==='texas-republic'));
 assert.equal(at(features,[-99,31]).some(f=>f.properties.parent==='USA'),false);
 features=await rows(1853);assert.equal(at(features,[-110.97,32.22]).some(f=>f.properties.parent==='USA'),false,'Tucson before ratification exchange');
 features=await rows(1854);assert.ok(at(features,[-110.97,32.22]).some(f=>f.properties.parent==='USA'));
 features=await rows(1866);assert.equal(at(features,[-150,64]).some(f=>f.properties.parent==='USA'),false);
 features=await rows(1867);assert.ok(at(features,[-150,64]).some(f=>f.properties.parent==='USA'));
});

test('Canadian fills follow Confederation, western accession, Newfoundland and Nunavut source stages',async()=>{
 let features=await rows(1867);
 assert.equal(features.filter(f=>f.properties.countryReference==='CAN'&&f.properties.parent==='CAN').length,4);
 assert.ok(at(features,[-123,54]).some(f=>f.properties.parent==='british-north-america'));
 features=await rows(1871);assert.ok(at(features,[-123,54]).some(f=>f.properties.parent==='CAN'));
 features=await rows(1948);assert.ok(at(features,[-56.2,48.8]).some(f=>f.properties.parent==='newfoundland'));
 assert.equal(at(features,[-56.2,48.8]).some(f=>f.properties.parent==='CAN'),false);
 features=await rows(1949);assert.ok(at(features,[-56.2,48.8]).some(f=>f.properties.parent==='CAN'));
 features=await rows(1998);assert.equal(features.some(f=>f.properties.name.en==='Nunavut'),false);
 features=await rows(1999);assert.ok(features.some(f=>f.properties.name.en==='Nunavut'));
});

test('source seam cannot recolor Alaska or duplicate old North American political fills',async()=>{
 const features=await rows(1900),us=features.filter(f=>f.properties.parent==='USA'),palette=mapDisplayPalette(us,{scheme:'mineral'});
 assert.equal(new Set(us.map(f=>palette.get(f.properties.id))).size,1,'statehood does not establish the acquisition date');
 const global=[{properties:{id:'old',gwcode:2}},{properties:{id:'alaska',gwcode:3}},{properties:{id:'nfl',gwcode:21}},{properties:{id:'keep',gwcode:710}}];
 assert.deepEqual(composeAmericasFeatures(global,1900,new Set(['USA','CAN']),[]).map(f=>f.properties.id),['keep']);
 const metadata=read('map-snapshots.json'),russia=metadata.layers.flatMap(l=>read(l.file).features).find(f=>f.properties.id==='1815-russian');
 const before=JSON.stringify(russia),fixed=amendAmericasChronology([russia],1867)[0];
 assert.equal(JSON.stringify(russia),before);assert.equal(fixed.geometry.coordinates.length,2);
 assert.equal(d3.geoContains(normalizeMapCollection({features:[fixed]},d3.geoArea).features[0],[-149.9,61.2]),false);
 assert.ok(d3.geoContains(normalizeMapCollection({features:[fixed]},d3.geoArea).features[0],[100,60]));
});

test('view switching and reading anchors preserve independent options and broad article periods',()=>{
 const history={...DEFAULT_LAYERS,rivers:false,markers:false};
 const reference=selectMapView(history,'reference');assert.equal(reference.territories,false);assert.equal(reference.modern,true);
 assert.equal(reference.rivers,false);assert.equal(reference.markers,false);
 assert.equal(selectMapView(reference,'history').territories,true);
 assert.equal(restoreMapLayers({usCanada:false,labels:false}).regions,true,'obsolete preference cannot disable worldwide geography');
 const anchors=read('reading-map-anchors.json').paths['course-expansion-na2'];
 const article={id:'indian-act-assimilation',start:1876,end:1985};
 assert.equal(readingStepYear({mapYears:anchors.years},article,1931),1876);
 assert.equal(readingStepYear({mapYears:{[article.id]:1700}},article,1931),1931);
 assert.deepEqual(article,{id:'indian-act-assimilation',start:1876,end:1985});
});


test('every dated source polygon has finite year-independent render geometry without globe complements',()=>{
 const filenames=new Set(Object.values(index.countries).flatMap(c=>[...c.sharedFiles,...c.phases.flatMap(p=>p.files)].map(f=>f.file)));
 const path=d3.geoPath(d3.geoEqualEarth());
 for(const file of filenames){for(const f of read(file).features){
  assert.ok(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI,file+': source area');
  const polygons=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
  for(const polygon of polygons)for(const ring of polygon){assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring.at(-1));for(const [lon,lat]of ring)assert.ok(Number.isFinite(lon)&&Number.isFinite(lat)&&Math.abs(lon)<=180&&Math.abs(lat)<=90);}
  assert.ok(!/NaN|Infinity/.test(path(f)),file+': finite projection');
 }}
});

test('Florida signature does not become US administrative transfer before the1821 exchange',async()=>{
 for(const year of [1818,1819,1820])assert.equal((await rows(year)).some(f=>f.properties.id==='americas-usa-division-40'),false,String(year));
 const florida=(await rows(1821)).find(f=>f.properties.id==='americas-usa-division-40');assert.ok(florida);
 assert.equal(florida.properties.sourceStartKey,18190222);assert.equal(florida.properties.effectiveStartKey,18210222);
 assert.ok(at(await rows(1821),[-81.38,28.54]).some(f=>f.properties.parent==='USA'));
});
