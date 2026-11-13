import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {createHistoryMedia} from '../dist/history-media.mjs';
const shard=readAtlasData('visual-assets-rebuilt-archive-pages-01-v18.json');
const get=id=>shard.items.find(x=>x.id===id);
test('seven recovered source pages retain exact bytes and bilingual scoped credits',()=>{
 assert.equal(shard.items.length,7);
 for(const a of shard.items){
  const b=fs.readFileSync(new URL('../dist/'+a.file,import.meta.url));
  assert.equal(b.length,a.bytes);assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);
  assert.ok(a.width<=1200&&a.height<=1200);assert.match(a.rights.note.en,/NOT_IN_COPYRIGHT/);
  for(const k of ['creator','date','institution']){assert.equal(a.metadataI18n[k].en,a[k]);assert.ok(a.metadataI18n[k].zh);}
 }
 assert.match(get('authored-women-01-gabriela-mistral').rights.note.en,/no copyright jurisdiction/);
});
test('source pages distinguish artwork and later views from ancient monuments',()=>{
 const a=get('site-books-01-samarkand-tomb');assert.equal(a.kind,'artwork');assert.match(a.caption.en,/fifth edition.*1876/);assert.match(a.interpretation.en,/coloured banding/);
 assert.match(get('site-books-01-lubeck-petrikirche').date,/circa 1906.*unknown/);
 assert.match(get('site-books-01-gondar-fasilides').caption.en,/1902.*seventeenth-century/);
 const h=get('inscribed-monuments-01-hammurabi');assert.match(h.caption.en,/Susa, not Babylon/);assert.match(h.interpretation.en,/law text lies outside/);assert.doesNotMatch(h.date,/2250/);
});
test('authored and issued documents never stand in for portraits',()=>{
 const media=createHistoryMedia(shard);
 for(const id of ['person-gabriela-mistral','person-taytu-betul'])assert.equal(media.portrait(id),null);
 assert.match(get('authored-women-01-gabriela-mistral').caption.en,/introduction.*1923/);
 const t=get('african-pages-01-taytu-letter');assert.match(t.creator,/issued in the name/);assert.match(t.caption.en,/7 February 1901.*1902/);assert.doesNotMatch(t.caption.en,/Adwa|portrait|autograph/);
});
test('each recovered image serves its named history rather than generic association padding',()=>{
 assert.equal(shard.associations.length,0);
 assert.deepEqual(shard.items.flatMap(x=>x.recordIds),['samarkand','lubeck-hanseatic-trade','gondar-permanent-capital','person-gabriela-mistral','bisotun-royal-inscription','old-babylon','person-taytu-betul']);
 assert.match(get('inscribed-monuments-01-bisotun').caption.en,/royal account as Gaumata/);
});
