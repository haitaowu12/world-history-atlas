import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
const links=readAtlasData('visual-assets-exact-links-17-v18.json');

test('seven source-reviewed connections reuse named later portraits without new images',()=>{
 assert.equal(links.items.length,0);assert.equal(links.associations.length,7);
 assert.equal(new Set(links.associations.map(a=>a.recordId)).size,7);
 for(const a of links.associations){assert.equal(a.role,'named-person');assert.ok(a.context.en);assert.ok(a.context.zh);assert.ok(records.get(a.recordId).sources.some(s=>s.url===a.evidenceUrl));}
 for(const id of ['china-landmark-369','china-landmark-104','china-landmark-120','china-event-xihan-007'])assert.ok(!links.associations.some(a=>a.recordId===id));
});
test('Daxing separates 582 construction from 583 relocation and preserves the inherited record',()=>{
 const r=records.get('china-landmark-344');assert.equal(r.start,582);assert.equal(r.end,583);assert.equal(r.provenance.originalRecord.start,584);
 assert.match(r.summary.en,/Gao Jiong/);assert.match(r.summary.zh,/同年十二月/);assert.equal(r.location.lon,108.93);assert.equal(r.location.lat,34.28);
 assert.doesNotMatch(r.title.en,/584|Code/);
});
test('Luoyang distinguishes the 605 orders from completion in 606',()=>{
 const r=records.get('china-event-sui-005');assert.equal(r.start,605);assert.match(r.summary.en,/Yang Su, Yang Da and Yuwen Kai/);assert.match(r.summary.en,/completion.*606/);assert.doesNotMatch(r.summary.en,/founding the examination/);assert.match(r.location.labelI18n.en,/not the full canal/);
});
test('Jiangnan companions explicitly follow one project without asserting network-wide completion',()=>{
 const a=records.get('china-event-sui-008'),b=records.get('china-landmark-083');
 assert.ok(a.relatedIds.includes(b.id));assert.ok(b.relatedIds.includes(a.id));
 assert.match(a.summary.en,/same project/);assert.match(b.summary.en,/same works/);assert.match(a.dateNote.en,/records an order/);assert.match(b.dateNote.en,/not converted/);
 assert.match(a.location.labelI18n.en,/outside the named corridor/);assert.equal(a.start,610);assert.equal(b.start,610);
});
test('Mongol narratives distinguish reported force strength, chronology and later administration',()=>{
 const a=records.get('china-landmark-405'),b=records.get('china-landmark-176');
 assert.match(a.summary.en,/reportedly numbering 400,000/);assert.match(a.summary.en,/not a count of soldiers killed/);assert.match(a.summary.en,/differently from the annals/);
 assert.match(b.summary.en,/1226/);assert.match(b.summary.en,/1286/);assert.equal(b.start,1226);assert.ok(b.sources.some(s=>s.url.endsWith('/元史/卷060')));
});
test('Luntai explains the rejected frontier proposal and continuing military preparedness',()=>{
 const r=records.get('china-landmark-305');assert.equal(r.start,-89);assert.match(r.summary.en,/Sang Hongyang/);assert.match(r.summary.en,/horses and military readiness/);assert.match(r.dateNote.en,/Zhenghe 4/);assert.match(r.location.labelI18n.zh,/颁诏地点未定/);
 const a=links.associations.find(a=>a.recordId===r.id);assert.match(a.context.en,/left.*Jing at right/);
});
