import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {VISUAL_STUDIES} from '../dist/visual-studies.mjs';
const shards=['visual-assets-world-new-07-v18.json','visual-assets-africa-americas-07-v18.json'].map(readAtlasData),items=shards.flatMap(x=>x.items),records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
const asset=n=>items.find(a=>a.id.endsWith('-'+n));
test('eleven new images cover eleven distinct subjects, with both prints counted once for Mexico',()=>{
 assert.equal(items.length,11);assert.equal(new Set(items.flatMap(a=>a.recordIds)).size,11);
 assert.deepEqual(asset('892401').recordIds,['person-toussaint','haitian-revolution']);
 assert.deepEqual(asset('717892').recordIds,asset('735898').recordIds);
 for(const a of items){assert.match(a.rights.label,/Public Domain/);for(const id of a.recordIds)assert.ok(records.get(id).sources.some(s=>s.url===a.sourceUrl));}
 const c=readAtlasData('visual-coverage-v18.json');assert.equal(c.covered,1029);assert.equal(c.assets,553);assert.equal(c.remaining,15);
});
test('uncertain likeness, posthumous memorial and later impression retain their distinct identities',()=>{
 assert.match(asset('892401').caption.en,/not a verified likeness/);assert.match(asset('892401').interpretation.en,/probably never saw/);
 assert.equal(asset('291117').representation,'modern-memorial');assert.match(asset('291117').caption.en,/Posthumous commemoration/);
 assert.match(asset('735898').date,/later impression/);assert.match(asset('735898').interpretation.en,/exact printing year is unrecorded/);
 assert.match(records.get('person-simon-bolivar').summary.en,/1884–1898/);
});
test('chronologically adjacent artifacts have concrete named connections and no invented findspot',()=>{
 assert.match(records.get('aldus-griffo-portable-classics-1501').summary.en,/December 1499.*roman type designed by Griffo/s);
 assert.match(records.get('huguenot-refugee-settlement').summary.en,/born in the Low Countries to Huguenot emigrants/);
 assert.match(records.get('huguenot-refugee-settlement').summary.en,/just after this entry’s focus window/);
 assert.match(asset('468231').caption.en,/Poligny, France/);
 assert.ok(!/palace|house|patron/i.test(asset('452774').caption.en+' '+asset('452774').interpretation.en));
 assert.match(asset('240230').interpretation.en,/imported into Cyprus and also made there/);
});
test('Princeton quipu uses its own Public Domain permission and does not invent a decoding',()=>{
 assert.equal(asset('133974').rights.label,'Public Domain');assert.ok(!asset('133974').rights.url.includes('creativecommons'));
 assert.match(asset('133974').credit,/Image courtesy of the Princeton University Art Museum/);
 assert.match(records.get('inka-quipu-recordkeeping').summary.en,/dated to before 1532 in Princeton’s collection/);
 assert.match(asset('133974').interpretation.en,/contents undecoded/);
});
test('twentieth study compares actual Posada sheets, with localized sources retained',()=>{
 const s=VISUAL_STUDIES.find(s=>s.id==='posada-revolution-print');assert.deepEqual(s.assets,[asset('717892').id,asset('735898').id]);assert.equal(VISUAL_STUDIES.length,22);
 assert.match(s.observations[0].en,/Gran Marcha Triunfal/);assert.match(s.observations[1].en,/printed later by José Sanchez/);
 const catalog=readAtlasData('history-media-v18.json');for(const a of items)for(const k of ['date','creator','institution']){const m=catalog.items.find(x=>x.id===a.id).metadataI18n[k];assert.equal(m.en,a[k]);assert.ok(m.zh);}
 assert.equal(readAtlasData('evidence-followups-v18.json').length,63);
});
