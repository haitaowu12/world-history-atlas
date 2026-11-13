import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const shards=['visual-assets-world-new-05-v18.json','visual-assets-world-new-06-v18.json','visual-assets-africa-americas-06-v18.json'].map(readAtlasData),items=shards.flatMap(x=>x.items),records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
const asset=n=>items.find(a=>a.id.endsWith('-'+n));
test('twelve new objects have twelve distinct historical targets and individually verified reuse',()=>{
 assert.equal(items.length,12);assert.equal(new Set(items.flatMap(a=>a.recordIds)).size,12);assert.equal(shards.flatMap(s=>s.associations).length,0);
 for(const a of items){assert.equal(a.recordIds.length,1);assert.ok(records.has(a.recordIds[0]));assert.match(a.rights.label,/Public Domain/);assert.equal(a.rightsSourceUrl,a.sourceUrl);assert.ok(records.get(a.recordIds[0]).sources.some(s=>s.url===a.sourceUrl));}
 const c=readAtlasData('visual-coverage-v18.json');assert.equal(c.covered,929);assert.equal(c.assets,523);assert.equal(c.remaining,115);
});
test('royal and religious objects preserve incomplete and tentative identifications',()=>{
 assert.match(asset('544879').caption.en,/Fragmentary.*Shabaqo/);assert.match(asset('313146').interpretation.en,/not a portrait of a named ruler/);
 assert.match(asset('39120').caption.en,/possibly Vishnu/);assert.match(asset('74501').caption.en,/probably Neminatha/);assert.match(asset('74501').interpretation.en,/reverse.*not shown/s);
 assert.match(asset('309960').interpretation.en,/possibly a llama/);assert.match(asset('313384').interpretation.en,/probably.*spiritual or vital force/s);
});
test('new material-culture paragraphs do not invent findspots, ceremonies or ethnic equivalence',()=>{
 assert.match(asset('73810').interpretation.en,/does not establish.*Thăng Long/);
 assert.match(asset('38143').interpretation.en,/not identified.*Palampet/);
 assert.match(asset('505581').interpretation.en,/does not document the particular use/);
 assert.match(asset('848697').interpretation.en,/different textile tradition from the Karen/);
 assert.match(asset('314362').interpretation.en,/original significance remains uncertain/);
 assert.match(records.get('andean-altitude-agriculture').summary.en,/1532 endpoint/);
});
test('all new image metadata is bilingual and source additions retain earlier review records',()=>{
 const catalog=readAtlasData('history-media-v18.json');
 for(const a of items){const current=catalog.items.find(i=>i.id===a.id);for(const k of ['date','creator','institution']){assert.equal(current.metadataI18n[k].en,a[k]);assert.ok(current.metadataI18n[k].zh);}}
 assert.equal(readAtlasData('evidence-followups-v18.json').length,33);
 assert.deepEqual(readAtlasData('evidence-followups-v18.json')[0],readAtlasData('evidence-followups-v11.json')[0]);
 assert.ok(!items.some(x=>x.id.includes('39378')||x.id.includes('313662')||x.id.includes('311225')));
});
