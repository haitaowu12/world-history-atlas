import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const items=readAtlasData('visual-assets-exact-08-v18.json').items,records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));const asset=n=>items.find(a=>a.id.endsWith('-'+n));
test('six culture-specific objects preserve source and bilingual identity',()=>{
 assert.equal(items.length,6);assert.equal(new Set(items.flatMap(a=>a.recordIds)).size,6);
 const c=readAtlasData('history-media-v18.json');
 for(const a of items){assert.equal(a.rights.label,'Public Domain / CC0');assert.equal(a.rightsSourceUrl,a.sourceUrl);assert.ok(records.get(a.recordIds[0]).sources.some(s=>s.url===a.sourceUrl));for(const k of ['date','creator','institution']){const m=c.items.find(x=>x.id===a.id).metadataI18n[k];assert.equal(m.en,a[k]);assert.ok(m.zh);}}
});
test('cultural comparisons are not fabricated archaeological findspots or patronage',()=>{
 assert.match(asset('62339').interpretation.en,/not a proven findspot/);assert.match(asset('49373').interpretation.en,/not documented as a find/);
 assert.match(asset('42717').caption.en,/probably Guanyin/);assert.match(asset('42717').interpretation.en,/does not name an imperial patron/);
 assert.match(records.get('liangzhu').summary.en,/without establishing a findspot/);
});
test('monochrome collection images do not pretend to show glaze colours and moon jar explains manufacture',()=>{
 for(const id of ['52010','49368'])assert.match(asset(id).caption.en,/Monochrome collection photograph/);
 assert.match(asset('49368').interpretation.en,/not a picture of a particular caravan/);
 assert.match(asset('45432').interpretation.en,/two hemispheres/);
 assert.match(records.get('joseon-kingdom').summary.en,/later rediscovery and naming/);
});
