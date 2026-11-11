import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-world-batch-11-v18.json');
test('five reform and political images preserve source-specific identities and rights',()=>{
 assert.equal(shard.items.length,5);assert.equal(shard.associations.length,6);
 assert.equal(new Set(shard.associations.map(a=>a.recordId)).size,5);
 for(const image of shard.items){assert.equal(image.rights.label,'Public Domain Mark');assert.ok(image.sourceUrl.startsWith('https://wellcomecollection.org/works/'));assert.ok(Math.max(image.width,image.height)<=1000);assert.ok(image.bytes<600000);}
});
test('reform satire does not silently resolve its conflicting date or endorse caricature',()=>{
 const satire=shard.items.find(i=>i.id==='world-batch-11-ujyw7fb2');
 assert.match(satire.date,/1832\?/);assert.match(satire.interpretation.en,/conflicts.*1833.*unresolved/);assert.match(satire.caption.en,/racist caricatures/);
 assert.match(shard.items.find(i=>i.id==='world-batch-11-v6fuy6sr').date,/1840/);
 for(const id of ['world-batch-11-mwzn6pu9','world-batch-11-xbyqnxnb'])assert.equal(shard.items.find(i=>i.id===id).date,'Undated');
});
