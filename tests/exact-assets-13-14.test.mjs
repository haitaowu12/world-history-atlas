import test from 'node:test';import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {VISUAL_STUDIES} from '../dist/visual-studies.mjs';
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r])),get=id=>records.get(id),a=readAtlasData('visual-assets-exact-13-v18.json').items,sei=readAtlasData('visual-assets-exact-14-v18.json').items[0];
test('three exact witnesses distinguish later books from a contemporary group photograph',()=>{
 assert.equal(a.length,3);assert.deepEqual(a.map(x=>x.date),['1650','1829','1870']);assert.deepEqual(a.map(x=>x.rights.label),['Public Domain Mark','Public Domain Mark','Public Domain']);
 assert.match(a[1].credit,/Royal College of Physicians/);assert.match(a[1].interpretation.en,/abridged Arabic/);assert.match(a[2].interpretation.en,/councillors/);
 for(const x of a)assert.ok(get(x.recordIds[0]).sources.some(s=>s.url===x.sourceUrl));
});
test('Sei Shonagon is a credited later literary depiction with a specific source-led gesture',()=>{
 assert.equal(sei.kind,'artwork');assert.equal(sei.representation,'historical-artwork');assert.match(sei.caption.en,/Tosa Mitsuoki/);assert.match(sei.date,/17th century/);assert.equal(sei.rights.label,'CC BY 4.0');assert.match(sei.credit,/ColBase/);assert.ok(sei.bytes<750000);
 const r=get('person-sei-shonagon');assert.match(r.summary.en,/Bai Juyi/);assert.match(r.summary.zh,/中宫/);assert.match(r.summary.en,/not a contemporary portrait/);assert.equal(r.start,1000);assert.equal(r.end,1002);assert.ok(r.sources.some(s=>s.url===sei.sourceUrl));
});
test('new biography paragraphs replace generic framing without deleting substantive qualifications',()=>{
 assert.doesNotMatch(get('person-ulugh-beg').summary.en,/should not hide|warns against assuming|Reading the biography/);assert.match(get('person-ulugh-beg').summary.en,/al-Kashi and Qadi Zada/);
 assert.doesNotMatch(get('person-ibn-battuta').summary.en,/empty world waiting|rich starting point/);assert.match(get('person-ibn-battuta').summary.en,/parts of its itinerary are disputed/);
 assert.match(get('person-louis-riel').summary.en,/Thomas Scott/);assert.match(get('person-louis-riel').summary.en,/1870 group photograph/);
});
test('title-page study teaches editorial transmission using the two real dated pages',()=>{
 const s=VISUAL_STUDIES.find(s=>s.id==='title-pages-transmission');assert.deepEqual(s.assets,a.slice(0,2).map(x=>x.id));assert.match(s.question.en,/editor or translator/);assert.match(s.observations[0].en,/1650/);assert.match(s.observations[1].en,/abridged Arabic/);assert.equal(VISUAL_STUDIES.length,22);
});
