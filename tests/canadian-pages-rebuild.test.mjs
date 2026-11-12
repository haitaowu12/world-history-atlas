import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
import {createHistoryMedia} from '../dist/history-media.mjs';
const shard=readAtlasData('visual-assets-canadian-pages-02-v18.json');
const proof=JSON.parse(fs.readFileSync(new URL('../docs/v18-canadian-pages-02-evidence.json',import.meta.url)));
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
test('two Canadian source pages retain exact bytes and item-level US rights evidence',()=>{
 assert.equal(shard.items.length,2);
 for(const a of shard.items){
  const bytes=fs.readFileSync(new URL('../dist/'+a.file,import.meta.url));
  assert.equal(bytes.length,a.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);
  assert.ok(a.width<=1200&&a.height<=1200);
  const receipt=proof.receipts.find(r=>r.id===a.id);
  assert.equal(receipt.rawRights['possible-copyright-status'],'NOT_IN_COPYRIGHT');
  assert.equal(receipt.rawRights['copyright-region'],'US');
  for(const k of ['creator','date','institution']){assert.equal(a.metadataI18n[k].en,a[k]);assert.ok(a.metadataI18n[k].zh);}
 }
});
test('Macdonald portrait is enabled as a portrait without inventing its original date',()=>{
 const a=shard.items.find(a=>a.id==='canadian-pages-02-macdonald');
 assert.equal(a.kind,'portrait');assert.equal(a.representation,'historical-portrait');
 assert.deepEqual(a.recordIds,['person-john-a-macdonald']);
 assert.match(a.date,/1891.*undated/);assert.match(a.alt.en,/facsimile signature/);
 assert.equal(createHistoryMedia(shard).portrait('person-john-a-macdonald').id,a.id);
});
test('delegate list separates 1864 participation, edition date and 1867 federation',()=>{
 const a=shard.items.find(a=>a.id==='canadian-pages-02-confederation');
 assert.deepEqual(a.recordIds,['canadian-confederation']);
 assert.match(a.caption.en,/1864.*1865.*1867/);
 assert.match(a.interpretation.en,/Prince Edward Island.*not one of the four/);
 assert.equal(records.get('canadian-confederation').start,1867);
});
test('Canadian edits shorten prose while retaining political consequences and chronology',()=>{
 for(const original of proof.originalTargets){
  const r=records.get(original.id);
  assert.deepEqual(r.sources,original.sources);assert.deepEqual(r.location,original.location);
  assert.equal(r.start,original.start);assert.equal(r.end,original.end);
  for(const lang of ['en','zh'])assert.ok(r.summary[lang].length<original.summary[lang].length);
 }
 const r=records.get('person-john-a-macdonald');
 assert.match(r.summary.en,/Cartier/);assert.match(r.summary.en,/1883.*residential|residential schooling in 1883/);
 assert.match(r.summary.en,/control over food/);assert.match(r.summary.en,/1885 head-tax/);
 assert.match(r.summary.zh,/同化/);assert.match(r.summary.zh,/人头税/);
});
