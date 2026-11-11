import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const c=readAtlasData('visual-assets-china-batch-08-v18.json'),byId=new Map(c.items.map(i=>[i.id.replace('china-batch-08-',''),i]));
test('Chinese album batch excludes unresolved chronology links and orphaned images',()=>{
 assert.equal(c.items.length,31);assert.equal(c.associations.length,50);
 for(const id of ['china-event-xihan-007','china-event-zhanguo-015','china-event-nansong-005','china-landmark-068','china-landmark-443','china-landmark-039','china-landmark-225','china-event-ming-019','china-event-ming-013'])assert.ok(!c.associations.some(a=>a.recordId===id));
 for(const id of ['quyuan-zhangliang','dongzhongshu','chenghua','xuande'])assert.ok(!byId.has(id));
 for(const i of c.items){assert.ok(i.bytes<=750000);assert.ok(Math.max(i.width,i.height)<=1400);assert.ok(!/複製IIIF|article|什麼是IIIF/.test(i.rights.note.en));assert.equal(i.rights.label,'CC BY 4.0');assert.ok(c.associations.some(a=>a.assetId===i.id));}
});
test('Chinese manuscript and scroll dates preserve lunar dating, unfinished work and museum framing',()=>{
 assert.equal(byId.get('zhuxi-letter-1194').date,'Eighth lunar month of 1194');assert.match(byId.get('zhuxi-letter-1194').caption.en,/First sheet/);
 assert.equal(byId.get('fuchun-river').date,'Begun 1347; inscribed 1350');assert.match(byId.get('fuchun-river').caption.en,/section 11/);assert.match(byId.get('fuchun-river').interpretation.zh,/未得完备/);
 for(const id of ['yuan-renzong','yuan-wenzong']){assert.equal(byId.get(id).date,'Undated');assert.match(byId.get(id).caption.en,/remounted in 1748.*unestablished/);}
 assert.match(byId.get('tengwang-pavilion').caption.en,/probably/);
});
test('paired portraits identify the proper figure in each new connection',()=>{
 for(const link of c.associations.filter(a=>a.assetId.endsWith('yuefei-zhuxi')))assert.match(link.context.en,/Zhu Xi, at left/);
 for(const link of c.associations.filter(a=>a.assetId.endsWith('sunquan-jinwudi')))assert.match(link.context.en,/Sima Yan.*at left/);
 const h=c.associations.filter(a=>a.assetId.endsWith('hanxuandi-guangwu'));assert.equal(h.length,4);assert.match(h.find(a=>a.recordId==='china-event-donghan-002').context.en,/Guangwu, at left/);
 assert.match(byId.get('simaqian').alt.en,/Sima Qian, right.*Yang Xiong, left/);assert.match(byId.get('wangxizhi').alt.en,/Wang Xizhi, left/);
});
test('five existing-object links retain narrow subject and place distinctions',()=>{
 const s=readAtlasData('visual-assets-existing-links-05-v18.json');assert.equal(s.items.length,0);assert.equal(s.associations.length,5);assert.equal(new Set(s.associations.map(a=>a.recordId)).size,5);
 assert.match(s.associations.find(a=>a.recordId==='person-ashoka').context.en,/distinct from the Kalinga edict/);
 assert.match(s.associations.find(a=>a.recordId==='nz-womens-suffrage').context.en,/cover.*1893/);
 assert.match(s.associations.find(a=>a.recordId==='buddhist-art-mathura-gandhara').context.en,/Sanchi in central India/);
});

test('undated court portraits do not assert a lifetime or later painting date',()=>{const portraits=c.items.filter(i=>i.kind==='portrait');assert.equal(portraits.length,26);for(const i of portraits){assert.equal(i.representation,'historical-portrait');assert.equal(i.date,'Undated');assert.ok(!i.caption.en.includes('Undated later portraits'));}});
