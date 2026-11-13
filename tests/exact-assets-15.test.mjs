import test from 'node:test';import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r])),a=readAtlasData('visual-assets-exact-15-v18.json').items;
test('three Jin and Gaya images match already-cited individual museum objects',()=>{
 assert.equal(a.length,3);assert.deepEqual(a.map(x=>x.recordIds[0]),['western-jin-dynasty','eastern-jin-dynasty','gaya-confederated-polities']);
 for(const x of a){assert.equal(x.kind,'object');assert.equal(x.rights.label,'Public Domain / CC0');assert.ok(records.get(x.recordIds[0]).sources.some(s=>s.url===x.sourceUrl));}
});
test('specific material and scale replace framing while retaining interpretation limits',()=>{
 assert.match(records.get('western-jin-dynasty').summary.en,/museum interprets/);assert.match(records.get('eastern-jin-dynasty').summary.en,/7.3 centimetres/);assert.match(records.get('gaya-confederated-polities').summary.en,/attributed specifically to Great Gaya/);
 assert.match(a[0].interpretation.en,/remains an interpretation/);assert.match(a[2].interpretation.en,/does not identify an excavated tomb/);
 assert.doesNotMatch(records.get('eastern-jin-dynasty').summary.en,/history often told/);assert.doesNotMatch(records.get('gaya-confederated-polities').summary.en,/three uniform blocks/);
});
