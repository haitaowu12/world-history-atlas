import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-world-batch-06-v18.json');
const items=new Map(shard.items.map(i=>[i.id.replace('world-batch-06-',''),i]));
test('new biography images distinguish photographs, later depictions and authored works',()=>{
 assert.equal(items.get('caesar').representation,'ancient-portrait');
 assert.equal(shard.items.length,32);assert.equal(shard.associations.length,35);
 for(const id of ['kura-salote','reagan-tutu','clinton-kim','tsuda','yosano','fukuzawa'])assert.equal(items.get(id).representation,'historical-photograph',id);
 for(const id of ['newton','copernicus','hildegard','alexander','gutenberg','chatelet'])assert.equal(items.get(id).representation,'later-depiction',id);
 assert.equal(items.get('tepapa-sheppard').representation,'document-facsimile');
 assert.match(items.get('avicenna').date,/undated/);assert.match(items.get('avicenna').caption.en,/binding board/);assert.ok(!items.get('avicenna').kind.includes('portrait'));
});
test('page-specific book imagery and map reconstruction dates remain explicit',()=>{
 const book=items.get('orbis-pictus');assert.match(book.downloadedFrom,/b29339492_0030/);assert.match(book.date,/1810.*22/);assert.match(book.caption.en,/Hoole.*Anderson/);
 const map=items.get('kura-ngata');assert.match(map.date,/1939.*1800.*1840/);assert.match(map.caption.en,/photographic copy/);
 assert.match(items.get('kura-salote').date,/publication date/);
});
test('held files are excluded and unusual rights statements remain specific',()=>{
 for(const id of ['hiratsuka','clinton-mandela','clinton-havel'])assert.ok(!items.has(id));
 assert.match(items.get('reagan-tutu').rights.label,/United States government work/);
 assert.match(items.get('kura-salote').rights.note.en,/AWNS-19361007-54-02/);
 assert.match(items.get('kura-ngata').rights.note.en,/Map 330/);
 assert.match(items.get('npg-npg-2015-136').creator,/Magda Pach/);assert.match(items.get('npg-npg-2015-136').caption.en,/not one of Kahlo/);
 assert.equal(items.get('clinton-kim').width,400);assert.equal(items.get('clinton-kim').height,266);
});
