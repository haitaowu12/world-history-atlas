import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import{createHash}from'node:crypto';
import{loadAtlasRecords,readAtlasData}from'../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-exact-22-v18.json'),rs=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
test('two Southeast Asian literature images retain exact public-domain evidence and unchanged bytes',()=>{
 assert.equal(shard.items.length,2);for(const a of shard.items){const bytes=fs.readFileSync(new URL('../dist/'+a.file,import.meta.url));assert.equal(bytes.length,a.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);assert.match(a.rights.url,/publicdomain\/mark\/1.0/);assert.equal(a.height,1024);assert.ok(rs.get(a.recordIds[0]).sources.some(s=>s.url===a.sourceUrl));}
});
test('Malay Annals identifies the 1821 translation without claiming a Tun Sri Lanang autograph',()=>{
 const a=shard.items[0],r=rs.get('malay-annals-court-memory');assert.equal(a.date,'1821');assert.equal(a.kind,'document');assert.match(a.caption.en,/John Leyden/);assert.match(a.interpretation.en,/not the original 1612/);assert.match(r.summary.en,/1821 London/);assert.equal(r.start,1612);assert.equal(r.end,1615);
 const link=shard.associations[0];assert.equal(link.recordId,'person-tun-sri-lanang');assert.equal(link.role,'related-work');assert.match(link.context.en,/compilation and editing/);assert.match(rs.get(link.recordId).summary.en,/not a surviving page in his hand/);assert.ok(rs.get(link.recordId).sources.some(s=>s.url===link.evidenceUrl));
});
test('Kieu frontispiece is a later manuscript copy and not a portrait or invented exact date',()=>{
 const a=shard.items[1],r=rs.get('person-nguyen-du');assert.equal(a.date,'Second half of the 19th century');assert.equal(a.kind,'manuscript');assert.match(a.caption.en,/fol. 1r/);assert.match(a.interpretation.en,/not a portrait/);assert.match(a.alt.en,/three figures/);assert.match(r.summary.en,/after the poet’s death/);assert.equal(r.start,1765);assert.equal(r.end,1820);assert.doesNotMatch(a.date,/1894/);
});
test('literary additions preserve sources and replace defensive prose with visible publication evidence',()=>{
 for(const id of ['malay-annals-court-memory','person-tun-sri-lanang','person-nguyen-du']){const r=rs.get(id);assert.ok(r.sources.length>=3);assert.doesNotMatch(r.summary.en,/should not be treated|This biography consequently|should not be mistaken/);assert.ok(r.summary.zh);}
 const c=readAtlasData('visual-coverage-v18.json');assert.equal(c.covered,1012);assert.equal(c.total,2087);assert.equal(c.assets,545);assert.equal(c.remaining,32);assert.equal(c.regions['southeast-asia'].covered,37);
});
