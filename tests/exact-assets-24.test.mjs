import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import{createHash}from'node:crypto';
import{loadAtlasRecords,readAtlasData}from'../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-exact-24-v18.json'),rs=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
test('five inspected CC0 images retain exact source records, rights and unchanged derivative bytes',()=>{
 assert.equal(shard.items.length,5);for(const a of shard.items){const bytes=fs.readFileSync(new URL('../dist/'+a.file,import.meta.url));assert.equal(bytes.length,a.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);assert.match(a.rights.url,/publicdomain\/zero\/1.0/);assert.ok(rs.get(a.recordIds[0]).sources.some(s=>s.url===a.sourceUrl));assert.ok(a.alt.zh);assert.ok(a.interpretation.zh);}
});
test('Malagan image matches the newly reviewed date anchor rather than the unillustrated Met object',()=>{
 const a=shard.items[0],r=rs.get(a.recordIds[0]);assert.match(a.sourceUrl,/1971.149/);assert.equal(a.date,'1800s');assert.match(a.caption.en,/sea-snail opercula/);assert.match(r.summary.en,/1800–1899/);assert.doesNotMatch(r.summary.en,/1875–1925/);assert.match(r.summary.en,/name.*not recorded/);assert.ok(r.sources.some(s=>s.url.includes('/311158')));
});
test('Westphalian allegory distinguishes preparatory drawing from final engraving and treaty event',()=>{
 const a=shard.items[1],r=rs.get(a.recordIds[0]);assert.match(a.alt.en,/blank oval/);assert.match(a.interpretation.en,/finished engraving/);assert.match(a.interpretation.en,/not a witnessed signing/);assert.equal(r.start,1648);assert.equal(r.end,1648);assert.ok(r.sources.some(s=>s.url.endsWith('/acquisition-highlights-2016')));
});
test('African photographs preserve specific occasion and do not admit the conflicting Senghor record',()=>{
 assert.deepEqual(shard.items.slice(2).flatMap(a=>a.recordIds),['person-julius-nyerere','person-miriam-makeba','person-leopold-senghor']);assert.match(shard.items[2].caption.en,/21 April 1965/);assert.equal(shard.items[2].kind,'photograph');assert.match(shard.items[3].caption.en,/Photographer unrecorded/);assert.match(shard.items[3].alt.en,/mirror/);assert.ok(!readAtlasData('history-media-v18.json').items.some(a=>a.sourceUrl.includes('ac58b66e-d0b4')));
 const c=readAtlasData('visual-coverage-v18.json');assert.equal(c.covered,1026);assert.equal(c.assets,550);assert.equal(c.total,2087);assert.equal(c.remaining,18);
});
