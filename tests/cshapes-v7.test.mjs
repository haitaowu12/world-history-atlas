import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {selectCshapesAt,cshapesNameAt,cshapesReadout} from '../dist/cshapes-history.mjs';
const data=JSON.parse(fs.readFileSync(new URL('../dist/data/cshapes-periods-v7.geojson',import.meta.url)));
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
const at=y=>selectCshapesAt(data,y),unit=(y,code)=>at(y).find(f=>f.properties.gwcode===code);
test('every annual CShapes view 1886–2019 has dated units, unique identities and bilingual labels',()=>{
 for(let year=1886;year<=2019;year++){
  const selected=at(year);assert.ok(selected.length>=120,`${year}: ${selected.length}`);
  assert.equal(new Set(selected.map(f=>f.properties.code)).size,selected.length,`${year}: unique codes`);
  for(const f of selected){const p=f.properties,key=year*10000+1231;assert.ok(p.validFromKey<=key&&key<=p.validToKey);assert.ok(p.name.en&&p.name.zh);assert.equal(p.selectedDate,`${year}-12-31`);}
 }
 for(const year of [0,1885,2020,2026,NaN,'1960'])assert.deepEqual(at(year),[]);
});
test('annual end-of-year identity transitions do not resurrect Soviet Union or divided Germany',()=>{
 assert.equal(unit(1990,365).properties.name.en,'Soviet Union');
 assert.equal(unit(1991,365).properties.name.en,'Russia');
 assert.equal(unit(1900,365).properties.name.en,'Russian Empire');
 assert.equal(unit(1921,365).properties.name.en,'Russia · civil-war period');
 assert.equal(unit(1922,365).properties.name.en,'Soviet Union');
 assert.ok(unit(1989,265));assert.ok(!unit(1990,265));
 assert.equal(unit(1989,260).properties.name.en,'West Germany');assert.equal(unit(1990,260).properties.name.en,'Germany');
 assert.equal(unit(1947,265).properties.name.en,'Soviet occupation zone of Germany');
});
test('independence and renaming years use source periods without future labels',()=>{
 assert.equal(unit(1956,452).properties.name.en,'Gold Coast');assert.equal(unit(1957,452).properties.name.en,'Ghana');
 assert.equal(unit(1962,820).properties.name.en,'Federation of Malaya');assert.equal(unit(1963,820).properties.name.en,'Malaysia');
 assert.equal(unit(1971,780).properties.name.en,'Ceylon');assert.equal(unit(1972,780).properties.name.en,'Sri Lanka');
 assert.equal(unit(1952,551).properties.name.en,'Northern Rhodesia');
 assert.equal(unit(1964,551).properties.name.en,'Zambia');
 assert.ok(!unit(2010,626));assert.ok(unit(2011,626));
 assert.ok(!unit(1992,531));assert.ok(unit(1993,531));
 assert.equal(unit(2002,345).properties.name.en,'Federal Republic of Yugoslavia');assert.equal(unit(2003,345).properties.name.en,'Serbia and Montenegro');assert.ok(!unit(2006,345));
});
test('source validity dates and geometry origin remain separate from annual display identity',()=>{
 const sample=unit(1960,365);assert.equal(sample.properties.sourceName,'Russia (Soviet Union)');assert.equal(sample.properties.selectedDate,'1960-12-31');assert.equal(sample.properties.license,'CC BY-NC-SA-4.0');assert.ok(sample.properties.sourceDate);
 assert.match(cshapesReadout(1960),/31 Dec 1960/);assert.match(cshapesReadout(1960,'zh'),/12月31日/);
 assert.equal(data.metadata.sourceSha256,'384b1ea90b9419f30a858d7ec237c85a22c60d1b35b5f85f215a1204f9989d42');
});
test('broad geography and every polygon winding survive display simplification',()=>{
 for(const f of data.features){assert.ok(f.geometry.coordinates.length);assert.ok(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI, f.properties.id);for(const poly of f.geometry.coordinates){for(const [i,r] of poly.entries()){assert.ok(r.length>=4);assert.deepEqual(r[0],r.at(-1));const a=d3.geoArea({type:'Polygon',coordinates:[r]});assert.ok(i?a>2*Math.PI:a<2*Math.PI,`${f.properties.id} ring ${i}`);}}}
 const points=[[-0.1276,51.5072,200],[2.3522,48.8566,220],[-77.0369,38.9072,2],[139.6917,35.6895,740]];
 for(const year of [1900,1960,2010])for(const [lon,lat,code]of points)assert.ok(d3.geoContains(unit(year,code),[lon,lat]),`${year} ${code}: capital inside`);
 assert.ok(d3.geoContains(unit(2010,625),[31.6,4.85]));assert.ok(!d3.geoContains(unit(2011,625),[31.6,4.85]));assert.ok(d3.geoContains(unit(2011,626),[31.6,4.85]));
 assert.ok(!d3.geoContains(unit(1992,365),[30.523,50.45]),'Kyiv not within post-Soviet Russia');
});

test('1975 Vietnam source aggregation is distinct from formal unification in 1976',()=>{
 const north1974=unit(1974,816),south1974=unit(1974,817),transition=unit(1975,816),united=unit(1976,816);
 assert.equal(north1974.properties.name.en,'North Vietnam');assert.equal(south1974.properties.name.en,'South Vietnam');assert.equal(unit(1975,817),undefined);
 assert.equal(transition.properties.name.en,'Vietnam · 1975 transition reference');assert.equal(transition.properties.name.zh,'越南 · 1975年过渡参照');assert.match(transition.properties.note.en,/not evidence of formal state unification/);assert.match(transition.properties.note.en,/2 July 1976/);assert.ok(transition.properties.sources.some(s=>s.url.includes('digitallibrary.un.org/record/3979563')));
 assert.equal(united.properties.name.en,'Vietnam');assert.equal(united.properties.selectedDate,'1976-12-31');const original=data.features.find(f=>f.properties.id===transition.properties.id);assert.strictEqual(transition.geometry,original.geometry,'source polygon remains untouched');
});

test('1954 Vietnam map labels the July Geneva line as provisional',()=>{
 for(const [code,en]of [[816,'Northern Vietnam · provisional 1954 reference'],[817,'Southern Vietnam · provisional 1954 reference']]){
  const f=unit(1954,code),original=data.features.find(x=>x.properties.id===f.properties.id);assert.equal(f.properties.name.en,en);assert.equal(f.properties.validFrom,'1954-05-01');assert.match(f.properties.note.en,/20 July Geneva agreement.*provisional military demarcation/);assert.match(f.properties.note.en,/does not mean that agreement existed in May/);assert.match(f.properties.note.zh,/1954年5月1日.*7月20日.*7月22日/);assert.ok(f.properties.sources.some(x=>x.url.includes('frus1952-54v16/d1035')));assert.strictEqual(f.geometry,original.geometry);
 }
 assert.equal(unit(1955,816).properties.name.en,'North Vietnam');assert.equal(unit(1955,817).properties.name.en,'South Vietnam');
});
