import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {applyPlaceLabelTranslations} from '../dist/place-labels.mjs';
import {applySummaryEdits} from '../dist/content-expansion.mjs';
import {applyChinaReviews} from '../dist/china-review.mjs';
const old=loadAtlasRecords('content-expansion-v17.json').records,now=loadAtlasRecords().records;
const before=new Map(old.map(r=>[r.id,r])),after=new Map(now.map(r=>[r.id,r]));
const manifest=readAtlasData('content-expansion-v18.json'),reviews=readAtlasData(manifest.chinaReviewsFile);
test('V18 story corrections preserve identities, coordinates and unrelated records with three explicit chronology corrections',()=>{
 assert.deepEqual(now.filter(r=>before.has(r.id)).map(r=>r.id),old.map(r=>r.id));
 const translated=new Map(applySummaryEdits(applyPlaceLabelTranslations(old,readAtlasData(manifest.placeLabelsFile)),readAtlasData(manifest.summaryEditsFile)).map(r=>[r.id,r]));
 const targets=new Set(reviews.eventReviews.map(r=>r.id));assert.deepEqual([...targets],['china-landmark-359','china-landmark-368','china-landmark-119','china-landmark-314','china-event-donghan-001','china-landmark-036','china-event-sui-010','china-landmark-424','china-landmark-466','china-landmark-505','china-landmark-335','china-landmark-291','china-event-xihan-001','china-event-xihan-010','china-landmark-519','china-event-zhanguo-016','china-landmark-276','china-event-qing-003','china-landmark-108','china-landmark-478','china-landmark-343','china-landmark-536','china-event-zhanguo-015','china-event-nansong-005','china-landmark-068','china-landmark-443','china-landmark-039','china-landmark-225','china-event-ming-019','china-event-ming-013','china-event-qing-022','china-event-qing-020','china-landmark-378','china-landmark-379','china-landmark-383','china-landmark-480','china-landmark-481','china-landmark-526','china-event-qing-018']);
 for(const row of now.filter(r=>before.has(r.id))){const prior=translated.get(row.id);if(!targets.has(row.id)){assert.deepEqual(row,prior,row.id);continue;}
  assert.equal(row.locationPrecision,prior.locationPrecision);for(const key of ['start','end']){if(row.id==='china-landmark-343'){assert.equal(prior[key],495);assert.equal(row[key],493);}else if(row.id==='china-landmark-443'){assert.equal(prior[key],393);assert.equal(row[key],405);}else if(row.id==='china-landmark-526'){assert.equal(prior[key],960);assert.equal(row[key],key==='start'?937:975);}else assert.equal(row[key],prior[key]);}
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


test('eight additional corrections separate dates, populations and stages of events',()=>{
 const get=id=>after.get(id);
 assert.match(get('china-landmark-119').summary.en,/166 BCE/);assert.match(get('china-landmark-119').dateNote.en,/158 BCE/);
 assert.match(get('china-landmark-314').summary.en,/more than 300,000 soldiers/);assert.match(get('china-landmark-314').summary.en,/no number for that selected force/);
 assert.match(get('china-event-donghan-001').summary.en,/south of Hao/);assert.match(get('china-event-donghan-001').summary.zh,/六月.*十月/);
 for(const year of ['605','606','608'])assert.ok(get('china-landmark-036').summary.en.includes(year));
 assert.match(get('china-event-sui-010').summary.en,/615.*617/);assert.match(get('china-event-sui-010').location.labelI18n.en,/Yanmen/);
 assert.match(get('china-landmark-424').summary.en,/19,179 chests and 2,119 bags/);assert.match(get('china-landmark-424').summary.zh,/19,179箱、2,119袋/);
 assert.ok(!get('china-landmark-466').summary.en.includes('fatal'));assert.match(get('china-landmark-466').summary.en,/died later that year/);
 assert.match(get('china-landmark-505').summary.en,/attributes the claim.*Qing official accounts/);assert.match(get('china-landmark-505').summary.zh,/指控/);
});

test('corrected stories admit seven specific named-person images without implying event illustrations',()=>{
 const shard=readAtlasData('visual-assets-corrected-stories-02-v18.json');assert.equal(shard.items.length,0);assert.equal(shard.associations.length,7);
 assert.deepEqual(shard.associations.map(a=>a.recordId),['china-landmark-119','china-landmark-314','china-event-donghan-001','china-landmark-036','china-event-sui-010','china-landmark-424','china-landmark-466']);
 for(const link of shard.associations){assert.equal(link.role,'named-person');assert.ok(link.context.en);assert.ok(link.context.zh);assert.ok(reviews.eventReviews.find(r=>r.id===link.recordId).sources.some(s=>s.url===link.evidenceUrl));}
 assert.ok(!shard.associations.some(a=>a.recordId==='china-landmark-505'));
});

test('new corrections distinguish age, legend, military campaigns and later administrations',()=>{
 const get=id=>after.get(id);
 assert.match(get('china-landmark-335').summary.en,/already over forty/);assert.ok(!get('china-landmark-335').title.en.includes('forty years'));
 assert.match(get('china-landmark-291').summary.zh,/传说/);assert.match(get('china-landmark-291').summary.en,/legend/);
 assert.ok(!get('china-event-xihan-001').summary.zh.includes('十面埋伏'));assert.match(get('china-event-xihan-001').location.labelI18n.en,/not Gaixia/);
 assert.match(get('china-event-xihan-010').dateNote.en,/not the creation of all four/);assert.match(get('china-landmark-519').summary.en,/117 BCE.*Shiji/);
 for(const id of ['china-event-zhanguo-016','china-landmark-276']){assert.match(get(id).summary.en,/Shiji reports/);assert.match(get(id).summary.zh,/《史记》记/);}
 for(const date of ['1661','1662','1664'])assert.ok(get('china-event-qing-003').summary.en.includes(date));
 assert.match(get('china-landmark-108').summary.en,/398.*mid-fifth/s);assert.match(get('china-landmark-478').summary.en,/later writing/);
});

test('Longmen explicitly corrects the source year while preserving the original and later relief date',()=>{
 const row=after.get('china-landmark-343');assert.equal(row.start,493);assert.equal(row.end,493);assert.equal(row.provenance.originalRecord.start,495);
 assert.match(row.dateNote.en,/About 493/);assert.match(row.summary.en,/522–523/);assert.match(row.summary.zh,/宣武帝/);
 assert.equal(row.location.lat,34.55);assert.equal(row.location.lon,112.47);assert.equal(row.locationPrecision,'representative');
 assert.ok(row.sources.some(s=>s.url==='https://whc.unesco.org/document/1076'));
 for(const id of ['china-landmark-279','china-landmark-356'])assert.ok(!reviews.eventReviews.some(r=>r.id===id));
});

test('seven new corrected-story links exclude held chronologies and duplicate tomb coverage',()=>{
 const shard=readAtlasData('visual-assets-corrected-stories-03-v18.json');assert.equal(shard.items.length,0);assert.equal(shard.associations.length,7);
 for(const a of shard.associations)assert.ok(reviews.eventReviews.find(r=>r.id===a.recordId).sources.some(s=>s.url===a.evidenceUrl));
 assert.equal(shard.associations.find(a=>a.recordId==='china-landmark-343').role,'related-work');
 for(const id of ['china-landmark-519','china-landmark-279','china-landmark-356','china-landmark-526'])assert.ok(!shard.associations.some(a=>a.recordId===id));
});


test('Fuchun uses the artist’s unfinished inscription rather than a completion claim',()=>{
 const r=after.get('china-landmark-536');assert.equal(r.start,1350);assert.equal(r.end,1350);assert.match(r.summary.en,/1347/);assert.match(r.summary.en,/still unfinished/);assert.match(r.summary.zh,/未得完备/);assert.ok(!r.title.en.includes('eighty-two'));assert.match(r.location.labelI18n.en,/landscape reference/);assert.ok(r.sources.some(s=>s.url==='https://digitalarchive.npm.gov.tw/Collection/Detail/1194?dep=P'));
});


test('new chronology corrections separate campaigns, succession and later storytelling',()=>{
 const get=id=>after.get(id);
 assert.match(get('china-event-zhanguo-015').title.en,/Qin captures/);assert.match(get('china-event-zhanguo-015').summary.en,/does not date his death/);
 assert.match(get('china-event-nansong-005').summary.en,/Songshi records/);assert.match(get('china-event-nansong-005').summary.en,/later account/);
 assert.match(get('china-landmark-068').summary.en,/Li Tao.*questioning/);
 const tao=get('china-landmark-443');assert.equal(tao.start,405);assert.equal(tao.provenance.originalRecord.start,393);assert.match(tao.dateNote.en,/not the composition/);
 assert.match(get('china-landmark-039').summary.en,/fourth lunar month.*ninth month/);
 assert.match(get('china-landmark-225').summary.en,/1224.*1225/);
 assert.match(get('china-event-ming-019').summary.en,/1479.*Mingshi biography next.*1477/);assert.ok(!get('china-event-ming-019').summary.en.includes('Joseon'));
 assert.match(get('china-event-ming-013').summary.en,/1427.*1428/);assert.ok(!reviews.eventReviews.some(r=>r.id==='china-event-xihan-007'));
 for(const id of ['china-event-zhanguo-015','china-event-nansong-005','china-landmark-068','china-landmark-443','china-landmark-039','china-landmark-225','china-event-ming-019','china-event-ming-013'])assert.ok(get(id).sources.some(s=>s.evidenceNoteZh));
});
test('six corrected focal-subject links do not reintroduce peripheral portraits',()=>{
 const s=readAtlasData('visual-assets-corrected-stories-04-v18.json');assert.equal(s.items.length,0);assert.equal(s.associations.length,6);
 assert.equal(s.associations.find(a=>a.recordId==='china-event-zhanguo-015').assetId,'china-batch-06-baiqi');
 assert.match(s.associations.find(a=>a.recordId==='china-event-nansong-005').context.en,/Yue Fei, at right/);
 for(const id of ['china-event-xihan-007','china-event-ming-019','china-event-ming-013'])assert.ok(!s.associations.some(a=>a.recordId===id));
});

test('four album connections identify focal figures without inventing event illustrations',()=>{
 const s=readAtlasData('visual-assets-existing-links-06-v18.json');assert.equal(s.items.length,0);assert.equal(s.associations.length,4);
 assert.deepEqual(s.associations.map(a=>a.recordId),['china-fengtian-refuge-783','china-landmark-185','china-landmark-186','china-landmark-085']);
 assert.match(s.associations[0].context.en,/Dezong stands at left/);assert.match(s.associations[1].context.en,/Xie Lingyun appears at left/);
 assert.match(s.associations[3].context.en,/official residence.*1138.*functioned/s);
 const a=readAtlasData('visual-assets-china-batch-06-v18.json').items.find(a=>a.id==='china-batch-06-tangxuanzong');assert.match(a.title.en,/Xuanzong, right, and Dezong, left/);
 for(const x of s.associations){assert.equal(x.role,'historical-context');assert.ok(x.context.zh);assert.ok(x.evidenceUrl.startsWith('https://digitalarchive.npm.gov.tw/'));}
});


test('Ili command is separated from the Altishahr campaign endpoint',()=>{
 const r=after.get('china-event-qing-020');assert.equal(r.start,1759);assert.equal(r.end,1759);assert.equal(r.provenance.originalRecord.start,1759);
 assert.match(r.summary.en,/ended in 1759/);assert.match(r.summary.en,/tenth lunar month of 1762/);assert.match(r.summary.zh,/1762年农历十月/);
 assert.equal(r.location.lon,81.301);assert.equal(r.location.lat,43.901);assert.ok(r.sources.some(s=>s.url.includes('226263.html')));
});
