import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {selectCshapesAt} from '../dist/cshapes-history.mjs';
import {wartimeContextsAt,wartimeCountryReferences,wartimePlaces,wartimeForCountry} from '../dist/wartime-context.mjs';
import {DEFAULT_LAYERS,restoreMapLayers,selectMapView} from '../dist/map-views.mjs';

const read=name=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+name,import.meta.url),'utf8'));
const data=read('wartime-occupation-context.json'),countries=read('cshapes-periods-v7.geojson');
const ids=(year,render)=>new Set(wartimeContextsAt(data,year).filter(r=>!render||r.render===render).map(r=>r.id));

test('wartime records retain bilingual context, linked sources and valid reference types',()=>{
 assert.match(data.scope.en,/not a reconstructed occupation boundary or front line/);
 assert.match(data.scope.zh,/不是重建的占领边界或战线/);
 assert.equal(new Set(data.records.map(r=>r.id)).size,data.records.length);
 for(const r of data.records){
  assert.ok(Number.isInteger(r.start)&&r.start<=r.end,r.id);
  assert.ok(r.title.en&&r.title.zh&&r.summary.en&&r.summary.zh,r.id);
  assert.ok(r.sourceIds.length&&r.sourceIds.every(id=>data.sources[id]?.url.startsWith('https://')),r.id);
  if(r.render==='country-reference')assert.ok(Number.isInteger(r.gwcode)&&['germany','axis','western-allies','soviet'].includes(r.authority),r.id);
  else{assert.equal(r.render,'place-reference',r.id);assert.ok(Number.isFinite(r.location?.lon)&&Number.isFinite(r.location?.lat),r.id);}
 }
});

test('each hatched reference exists in CShapes for its whole display period',()=>{
 for(const year of [1913,1914,1916,1917,1918,1938,1939,1940,1941,1942,1943,1944,1945,1948,1949,1951,1952]){
  const features=selectCshapesAt(countries,year),records=wartimeContextsAt(data,year).filter(r=>r.render==='country-reference');
  const refs=wartimeCountryReferences(data,year,features);
  assert.equal(refs.length,records.length,`missing country source reference in ${year}`);
  assert.equal(new Set(records.map(r=>r.gwcode)).size,records.length,`duplicate country hatching in ${year}`);
  for(const ref of refs){assert.strictEqual(ref.feature,features.find(f=>f.properties.gwcode===ref.record.gwcode));assert.equal(ref.feature.properties.sourceDataset,'cshapes-2.0');}
 }
});

test('partial occupations and changing fronts do not become whole-country hatches',()=>{
 assert.equal(ids(1921).size,0);
 assert.ok(ids(1916,'place-reference').has('ww1-belgium'));
 assert.ok(ids(1916,'place-reference').has('ww1-serbia'));
 assert.ok(!ids(1916,'country-reference').has('ww1-belgium'));
 for(const year of [1939,1940,1941,1942,1943,1944]){
  const refIds=ids(year,'country-reference');assert.ok(![...refIds].some(id=>id.startsWith('ww2-poland')||id.startsWith('ww2-france')||id==='ww2-prague'));
 }
 for(const place of ['belgium','netherlands','luxembourg','norway','greece'])assert.ok(ids(1944,'place-reference').has(`ww2-${place}-1944`));
 assert.ok(ids(1944,'country-reference').has('ww2-denmark-martial-law'));
 assert.ok(!ids(1945,'country-reference').has('ww2-denmark-martial-law'));
 assert.deepEqual([...ids(1945,'country-reference')].sort(),['ww2-germany-soviet-zone','ww2-germany-west-zones','ww2-japan-occupation']);
 for(const id of ['ww2-netherlands-1945','ww2-norway-1945','ww2-manila-1945','ww2-tarakan-1945','ww2-hong-kong-1945','ww2-singapore-1945'])assert.ok(ids(1945,'place-reference').has(id),id);
 assert.ok(ids(1951,'country-reference').has('ww2-japan-occupation'));
 assert.equal(ids(1952).size,0);
});

test('country context, nearby markers and map view follow the selected year',()=>{
 const refs=selectCshapesAt(countries,1942),belgium=refs.find(f=>f.properties.gwcode===211),france=refs.find(f=>f.properties.gwcode===220);
 assert.equal(wartimeForCountry(data,1942,belgium)[0].id,'ww2-belgium');
 assert.equal(wartimeForCountry(data,1944,belgium)[0].id,'ww2-belgium-1944');
 assert.equal(wartimeForCountry(data,1942,france)[0].id,'ww2-france-partition');
 assert.deepEqual(wartimeForCountry(data,1942,{properties:{}}),[]);
 assert.ok(wartimePlaces(data,1942).some(r=>r.id==='ww2-nanjing'));
 assert.equal(DEFAULT_LAYERS.occupations,true);
 assert.equal(restoreMapLayers({occupations:false}).occupations,false);
 assert.equal(selectMapView({...DEFAULT_LAYERS,occupations:false},'reference').occupations,false);
});
