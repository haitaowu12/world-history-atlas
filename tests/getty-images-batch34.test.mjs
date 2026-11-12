import test from 'node:test';import assert from 'node:assert/strict';import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
const s=readAtlasData('visual-assets-getty-images-05-v18.json');
test('six Getty works cover nine exact subjects and preserve source-specific rights',()=>{
 assert.equal(s.items.length,6);assert.equal(new Set(s.items.flatMap(a=>a.recordIds)).size,9);assert.equal(s.associations.length,9);
 for(const a of s.items){assert.equal(a.rights.label,'CC0');assert.ok(a.bytes<=750000);assert.ok(a.metadataI18n.creator.zh);assert.ok(a.metadataI18n.date.zh);assert.ok(a.metadataI18n.institution.zh);assert.ok(a.contextSources.every(x=>x.url!==a.sourceUrl));}
 const ids=new Set(loadAtlasRecords().records.map(r=>r.id));assert.ok(s.items.every(a=>a.recordIds.every(id=>ids.has(id))));
});
test('Constantine and Rudolf supply identified rulership evidence rather than event reconstructions',()=>{
 const [coin,,,medal]=s.items;assert.equal(coin.representation,'object-photograph');assert.match(coin.date,/307–337/);assert.match(coin.interpretation.en,/rather than recording either meeting/);
 assert.match(medal.caption.en,/Roman emperor and king of Hungary and Bohemia/);assert.match(medal.interpretation.en,/rather than uniform government/);assert.doesNotMatch(medal.alt.en,/reverse|Capricorn/);
});
test('photographs retain before-relocation and post-dynasty dates',()=>{
 const [,abu,chapel,,,mandalay]=s.items;assert.match(abu.date,/1877/);assert.match(abu.interpretation.en,/reopened in 1968/);assert.match(chapel.caption.en,/nineteenth-century/);assert.match(mandalay.date,/1887–1897/);assert.match(mandalay.interpretation.en,/after the monarchy fell in 1885/);
});
test('Jerusalem manuscript labels later reception and attributes its anti-Jewish framing',()=>{
 const a=s.items[4];assert.equal(a.kind,'manuscript');assert.equal(a.representation,'manuscript-detail');assert.match(a.date,/1413–1415/);assert.match(a.caption.en,/Roman siege of 70 CE/);
 assert.match(a.interpretation.en,/anti-Jewish theological framing/);assert.match(a.interpretation.en,/polemic belongs to the later work/);assert.match(a.interpretation.zh,/反犹太/);
});
