import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const china=readAtlasData('visual-assets-china-batch-06-v18.json'),world=readAtlasData('visual-assets-world-batch-07-v18.json');
const byId=new Map([...china.items,...world.items].map(i=>[i.id,i]));
const c=id=>byId.get('china-batch-06-'+id),w=id=>byId.get('world07-'+id);
test('China images retain complete paired openings and identify the correct side',()=>{
 assert.equal(china.items.length,39);assert.equal(china.associations.length,27);
 for(const [id,side] of [['liubang','right'],['hanwudi','left'],['tangxuanzong','right'],['lijing','left'],['yanzhenqing','left'],['liuzongyuan','right']]){
  const i=c(id);assert.match(i.alt.en,new RegExp(side));assert.equal(i.width,1400);assert.match(i.downloadedFrom,/\/full\/1400,/);assert.match(i.rights.label,/CC BY 4.0/);assert.equal(i.representation,'later-depiction');
 }
});
test('authored works, later book editions and original photo views remain distinct',()=>{
 for(const id of ['wangyangming','wanganshi','xinqiji'])assert.equal(c(id).representation,'manuscript-detail');
 assert.equal(c('wangyangming').date,'1514');assert.match(c('qijiguang-page2').date,/1798.*16th/);assert.match(c('qijiguang-page2').alt.en,/left.*right/);
 assert.match(c('huoqubing-recto').alt.en,/horse.*figure/);assert.match(c('huoqubing-recto').date,/1914.*Western Han/);
 assert.ok(!byId.has('china-batch-06-huoqubing'));assert.ok(!byId.has('china-batch-06-dengxiaoping'));assert.ok(!byId.has('china-batch-06-zhangjuzheng'));
 assert.match(c('dengxiaoping-original').alt.en,/Carter.*interpreter/);assert.match(c('maozedong').alt.en,/left.*Nixon.*right/);
});
test('portrait dating preserves remounting and posthumous object identity',()=>{
 assert.match(c('licunxu').date,/Unknown; remounted 1748/);assert.match(c('xiaowendi').caption.en,/522.*523.*after his death/);
 assert.match(c('wangwei').caption.en,/Wang Yuanqi.*1711/);assert.equal(c('wangwei').kind,'artwork');
 for(const id of ['weiqing','zhouyu','luxun']){assert.equal(c(id).date,'1928');assert.equal(c(id).representation,'historical-artwork');}
 assert.match(c('tu-youyou').rights.note.en,/Bengt Nyman.*CC BY 2.0/);
});
test('all new delivered files respect encoded-image limits and exact source identities',()=>{
 for(const i of byId.values()){
  assert.ok(i.bytes<=750000,i.id);assert.ok(Math.max(i.width,i.height)<=3000,i.id);assert.match(i.sha256,/^[a-f0-9]{64}$/);assert.ok(i.sourceUrl&&i.rightsSourceUrl&&i.downloadedFrom,i.id);
 }
 assert.equal(c('zhangfei').bytes,724467);assert.equal(c('xiexuan').bytes,615065);
});
test('world objects keep chronological and findspot qualifications',()=>{
 assert.equal(world.items.length,18);assert.equal(world.associations.length,18);
 assert.match(w('met-451303').caption.en,/1403.*1436/);assert.match(w('met-451303').interpretation.en,/after Timur/);
 assert.match(w('met-548212').interpretation.en,/Amarna.*restored/);
 assert.match(w('met-322265').caption.en,/probably from Palmyra/);assert.match(w('met-316873').caption.en,/possibly from Guerrero/);
 assert.match(w('met-308005').interpretation.en,/separate.*1910/);assert.match(w('met-322353').caption.en,/Phraates III/);
 assert.match(w('met-29616').date,/Mauludi/);assert.ok(!/AH/.test(w('met-29616').date));assert.match(w('met-29616').interpretation.en,/distinct from the Hijri/);
});
test('world object observations add knowledge without duplicating captions or exposing screening flags',()=>{
 for(const i of world.items){
  assert.notEqual(i.caption.en,i.interpretation.en,i.id);assert.notEqual(i.caption.zh,i.interpretation.zh,i.id);
  assert.ok(!/isOasc|isRestricted|share_license_status/.test(i.rights.note.en),i.id);
  assert.deepEqual(world.associations.find(a=>a.assetId===i.id).context,i.caption);
 }
});
