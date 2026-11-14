import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-exact-25-v18.json');
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));

test('three NPS site images have exact bytes, item credits and scoped government-work rights',()=>{
 assert.equal(shard.items.length,3);assert.equal(shard.associations.length,0);
 for(const a of shard.items){
  const bytes=fs.readFileSync(new URL('../dist/'+a.file,import.meta.url));
  assert.equal(bytes.length,a.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);
  assert.equal(a.representation,'site-photograph');assert.equal(a.kind,'site');
  assert.equal(a.rights.url,'https://www.nps.gov/aboutus/disclaimer.htm');
  assert.match(a.rights.note.en,/United States/);assert.match(a.rights.note.en,/No claim to original U.S. Government works/);
  assert.ok(records.get(a.recordIds[0]).sources.some(s=>s.url===a.sourceUrl));
  for(const field of ['title','alt','caption','interpretation','transformation'])assert.ok(a[field].en&&a[field].zh);
 }
});
test('Hopewell image identifies reconstructed Mound City rather than moving the representative map point',()=>{
 const a=shard.items[0],r=records.get('hopewell-ceremonial-networks');
 assert.deepEqual([a.width,a.height],[1200,800]);assert.match(a.creator,/Tom Engberg/);
 assert.match(a.caption.en,/reconstructed/);assert.match(a.interpretation.en,/distinct from the Hopewell Mound Group/);
 assert.match(a.date,/capture date unrecorded/);assert.deepEqual([r.start,r.end],[1,400]);
 assert.equal(r.location.label,'Hopewell Mound Group, Ohio River watershed');assert.match(r.summary.en,/Mound City Group/);
});
test('Cahokia and Chaco distinguish modern terrain and conservation from the historical communities',()=>{
 const [cahokia,chaco]=shard.items.slice(1);
 assert.doesNotMatch(cahokia.caption.en,/Monks Mound/);assert.match(cahokia.creator,/unrecorded/);
 assert.match(chaco.caption.en,/Preservation work/);assert.equal(chaco.date,'2007');assert.match(chaco.alt.en,/Two workers/);
 assert.deepEqual([records.get('cahokia').start,records.get('cahokia').end],[800,1400]);
 const r=records.get('chaco');assert.deepEqual([r.start,r.end],[850,1250]);assert.match(r.summary.en,/theobromine/);
 assert.match(r.summary.en,/1000–1125/);assert.match(r.summary.en,/go beyond the test/);assert.match(r.summary.zh,/仍是超出检测本身/);
});
test('NPS increment adds three unique illustrated entries without changing the denominator',()=>{
 const c=readAtlasData('visual-coverage-v18.json');assert.equal(c.covered,1029);assert.equal(c.assets,553);assert.equal(c.total,2087);assert.equal(c.remaining,15);
 for(const a of shard.items)assert.equal(c.coveredIds.filter(id=>id===a.recordIds[0]).length,1);
});
