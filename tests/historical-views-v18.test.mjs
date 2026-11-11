import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-world-batch-09-v18.json');
const byId=new Map(shard.items.map(i=>[i.id.split('-').at(-1),i]));
const evidence=JSON.parse(fs.readFileSync(new URL('../docs/v18-world-batch-09-evidence.json',import.meta.url)));
test('historical views admit thirteen exact official files and twelve distinct stories',()=>{
 assert.equal(shard.items.length,13);assert.equal(new Set(shard.items.flatMap(i=>i.recordIds)).size,12);assert.equal(evidence.evidence.length,13);
 assert.ok(!byId.has('tc5wctnv'));assert.match(evidence.held[0].reason,/1300/);
 for(const item of shard.items){
  assert.ok(item.bytes<=750000);assert.ok(Math.max(item.width,item.height)<=1000);
  const bytes=fs.readFileSync(new URL('../dist/'+item.file,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);
  const receipt=evidence.evidence.find(r=>r.assetId===item.id);assert.equal(receipt.sha256,item.sha256);assert.equal(receipt.downloadedFrom,item.downloadedFrom);
  const locations=receipt.sourceEvidence.items.flatMap(i=>i.locations).filter(l=>l.license);assert.ok(locations.length);assert.ok(locations.every(l=>l.license.id==='pdm'));
  assert.equal(item.rights.label,'Public Domain Mark');assert.deepEqual(shard.associations.find(a=>a.assetId===item.id).context,item.caption);
 }
});
test('historical view captions retain dating and distinguish later reconstructions or reception',()=>{
 assert.match(byId.get('efusb37c').date,/Undated/);assert.match(byId.get('g6u2rykr').date,/Undated/);
 assert.match(byId.get('wqwu4shh').caption.en,/1831.*1822.*imagines/);
 assert.match(byId.get('hheyrprn').caption.en,/approximately to 1870/);
 assert.match(byId.get('e236c678').caption.en,/later architectural reconstruction/);
 assert.match(byId.get('xkff2t3q').interpretation.en,/political accusation/);
 assert.match(byId.get('xh96865n').caption.en,/1879.*1826/);
 for(const i of shard.items){assert.ok(!/Undated|Circa|century|June|after a painting/.test(i.caption.zh),i.id);assert.notEqual(i.caption.en,i.interpretation.en);assert.ok(!/not an eyewitness photograph/.test(i.interpretation.en));}
});
