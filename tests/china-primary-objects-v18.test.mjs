import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
import {VISUAL_STUDIES} from '../dist/visual-studies.mjs';
const shard=readAtlasData('visual-assets-china-batch-09-v18.json'),byId=new Map(shard.items.map(i=>[i.id,i]));
test('fifteen primary objects preserve source identity, roles and chronology holds',()=>{
 assert.equal(shard.items.length,15);assert.equal(shard.associations.length,16);assert.equal(new Set(shard.associations.map(a=>a.recordId)).size,12);
 for(const a of shard.items){assert.ok(a.sourceUrl.startsWith('https://digitalarchive.npm.gov.tw/'));assert.equal(a.rights.label,'CC BY 4.0');assert.ok(a.width<=1400&&a.height<=1400);assert.ok(a.bytes<300000);assert.ok(a.metadataI18n.creator.zh);assert.ok(!a.rights.note.en.includes('複製IIIF'));}
 for(const id of ['china-event-qing-023','china-event-qing-028','china-event-xihan-007'])assert.ok(!shard.associations.some(a=>a.recordId===id));
 assert.match(byId.get('china-batch-09-jinchuan-memorial').metadataI18n.creator.zh,/李棠/);
 assert.match(byId.get('china-batch-09-liuyuxi').caption.en,/Qing-dynasty/);assert.match(byId.get('china-batch-09-wangyangming-xiang-shrine').date,/undated/);
 assert.match(byId.get('china-batch-09-hongwu-revenue-edict').date,/intercalary tenth lunar month/);assert.match(byId.get('china-batch-09-jinchuan-red-flag-courier').date,/1775.*1776/);
 assert.match(byId.get('china-batch-09-qianlong-ten-campaigns-kesi').date,/reproduces.*1792/);
});
test('Taiwan campaign no longer compresses its endpoint into the renaming year',()=>{
 const row=loadAtlasRecords().records.find(r=>r.id==='china-event-qing-022');assert.equal(row.start,1787);assert.equal(row.end,1787);assert.equal(row.provenance.originalRecord.start,1787);
 assert.match(row.summary.en,/1787.*1788/s);assert.match(row.summary.zh,/战事延续至1788/);assert.match(row.dateNote.en,/campaign ended in 1788/);
 assert.ok(row.sources.some(s=>s.url.includes('thcts.sinica.edu.tw')));assert.ok(row.sources.some(s=>s.url.includes('south.npm.gov.tw')));
});
test('new looking exercises connect visible craft and writing to named primary texts',()=>{
 const s=VISUAL_STUDIES.find(s=>s.id==='textiles-work-and-poetry');assert.match(s.observations[1].en,/Xie Huilian.*Zhou Fang/);
 const e=VISUAL_STUDIES.find(s=>s.id==='imperial-gifts-and-demands');assert.match(e.observations[1].en,/second lunar month in 1388/);assert.match(e.observations[0].zh,/与卿同享/);
 for(const id of [...s.assets,...e.assets])assert.ok(byId.has(id));
});
