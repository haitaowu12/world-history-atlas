import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {applyChinaReviews} from '../dist/china-review.mjs';
const old=loadAtlasRecords('content-expansion-v17.json').records,now=loadAtlasRecords().records;
const before=new Map(old.map(r=>[r.id,r])),after=new Map(now.map(r=>[r.id,r]));
const manifest=readAtlasData('content-expansion-v18.json'),reviews=readAtlasData(manifest.chinaReviewsFile);
test('V18 story corrections preserve all identities, years, coordinates and unrelated records',()=>{
 assert.deepEqual(now.map(r=>r.id),old.map(r=>r.id));
 const targets=new Set(reviews.eventReviews.map(r=>r.id));assert.deepEqual([...targets],['china-landmark-359','china-landmark-368']);
 for(const row of now){const prior=before.get(row.id);if(!targets.has(row.id)){assert.deepEqual(row,prior,row.id);continue;}
  for(const key of ['start','end','locationPrecision'])assert.equal(row[key],prior[key]);
  for(const key of ['lon','lat'])assert.equal(row.location[key],prior.location[key]);
  assert.equal(row.provenance.status,'reviewed');assert.deepEqual(row.provenance.originalText,{title:prior.title,summary:prior.summary});
  assert.equal(row.provenance.sourceCommit,prior.provenance.sourceCommit);
  assert.ok(row.location.labelI18n.en);assert.ok(row.location.labelI18n.zh);
 }
});
test('poets meeting and manuscript recovery have specific bilingual corrections and sources',()=>{
 const poets=after.get('china-landmark-359'),yan=after.get('china-landmark-368');
 assert.match(poets.summary.en,/Luoyang or possibly Chenliu/);assert.match(poets.summary.zh,/也可能是陈留/);assert.match(poets.title.en,/Li Bai, Du Fu and Gao Shi/);
 assert.match(yan.summary.en,/sent his elder nephew Quanming/);assert.match(yan.summary.zh,/派长侄泉明/);
 assert.match(yan.dateNote.en,/ninth lunar month/);assert.match(yan.location.labelI18n.zh,/书写地点未定/);
 assert.ok(poets.sources.some(s=>s.url.includes('cup.cuhk.edu.hk')));assert.ok(yan.sources.some(s=>s.url.includes('digitalarchive.npm.gov.tw')));
 assert.ok(!yan.title.en.includes('immortal'));assert.ok(!poets.title.en.includes('first time in Luoyang'));
});
test('correction file has a verified manifest receipt and rejects identity replacement',()=>{
 const bytes=fs.readFileSync(new URL('../dist/data/'+manifest.chinaReviewsFile,import.meta.url));
 assert.equal(bytes.length,manifest.chinaVisualReviews.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.chinaVisualReviews.sha256);assert.equal(reviews.eventReviews.length,manifest.chinaVisualReviews.records);
 assert.throws(()=>applyChinaReviews(old,{journeys:[]},{schemaVersion:1,eventReviews:[{id:'china-landmark-359',patch:{id:'other'}}]}),/cannot replace source identity/);
});
