import test from 'node:test';
import assert from 'node:assert/strict';
import {compactPoliticalTimeline} from '../dist/compact-timeline.mjs';
import {chinaPeriods} from '../dist/period-tracks.mjs';
import {toOrdinal} from '../dist/core.mjs';
const state=(id,region,start,end,importance=4)=>({id,region,start,end,importance,kind:'polity'});
test('China is the default East Asia track, with concurrent states in the regional comparison',()=>{
 const jin=state('jurchen-jin-dynasty','east-asia',1115,1234,5),goryeo=state('goryeo-kingdom','east-asia',918,1392,4),france=state('france','europe',987,1328),abbasids=state('abbasids','west-central-asia',750,1258);
 const event={...state('battle','east-asia',1200,1200,5),kind:'event'};
 const records=[jin,goryeo,france,abbasids,event];
 const result=compactPoliticalTimeline(records,{year:1200});
 assert.deepEqual(result.regions.map(r=>r.id),['east-asia','europe','west-central-asia']);
 const east=result.regions.find(r=>r.id==='east-asia');
 assert.equal(east.track.id,'china');
 assert.deepEqual(east.rows.map(r=>r.record.id),['period-china-later-tang','period-china-five-dynasties','period-china-northern-song','period-china-southern-song','period-china-yuan','period-china-ming']);
 assert.ok(east.omitted.includes(jin)&&east.omitted.includes(goryeo));
 const focused=compactPoliticalTimeline(records,{year:1200,region:'east-asia',selectedId:jin.id}).regions[0];
 assert.ok(focused.rows.some(r=>r.record===jin&&r.lane===1));
 assert.ok(focused.rows.every(r=>r.record!==event));
 const korea=compactPoliticalTimeline(records,{year:1200,focusId:'korea'}).regions[0];
 assert.equal(korea.track.id,'korea');
 assert.equal(korea.rows[0].record,goryeo);
 const gap=compactPoliticalTimeline(records,{year:1900,focusId:'korea'}).regions[0];
 assert.equal(gap.track.id,'korea');
 assert.equal(gap.rows.length,0);
});
test('the China reading sequence covers every civil year from the conventional Shang interval onward',()=>{
 assert.equal(chinaPeriods[0].start,-1600);
 assert.equal(chinaPeriods.at(-1).end,2026);
 for(let i=1;i<chinaPeriods.length;i++)assert.equal(toOrdinal(chinaPeriods[i].start)-toOrdinal(chinaPeriods[i-1].end),1);
 for(const [year,id] of [[-206,'qin-han'],[9,'xin'],[24,'han-restoration'],[690,'wu-zhou'],[705,'later-tang'],[1912,'republican'],[1949,'prc']]){
  const group=compactPoliticalTimeline([],{year,region:'east-asia'}).regions[0];
  assert.equal(group.rows.find(r=>r.record.start<=year&&year<=r.record.end).record.id,'period-china-'+id);
 }
});
test('regional comparison fills dated runs by editorial priority without extending source periods',()=>{
 const early=state('earlier','europe',900,999),later=state('later','europe',1000,1100),rival=state('rival','europe',1030,1050,5);
 const rows=compactPoliticalTimeline([early,later,rival],{year:1000,region:'europe'}).regions[0].rows.filter(r=>r.lane===0);
 assert.deepEqual(rows.map(r=>r.record.id),['earlier','later','rival','later']);
 for(let i=1;i<rows.length;i++)assert.ok(Math.abs(rows[i].left-rows[i-1].left-rows[i-1].width)<1e-8);
 assert.equal(later.end,1100);
});
test('compact date coordinates clip continuing periods to the selected window, including BCE/CE without year zero',()=>{
 const ancient=state('ancient','europe',-100,100),result=compactPoliticalTimeline([ancient],{year:1,region:'europe',span:300});
 for(const group of result.regions)for(const row of group.rows){assert.ok(row.left>=0&&row.width>0&&row.left+row.width<=100);const expected=Math.max(0,(toOrdinal(row.record.start)-toOrdinal(result.window.start))/(toOrdinal(result.window.end)-toOrdinal(result.window.start)+1)*100);assert.equal(row.left,expected);}
 assert.ok(result.ticks.every(y=>y!==0));assert.ok(result.position>=0&&result.position<=100);
 const ongoing=compactPoliticalTimeline([state('ongoing','europe',900,2026)],{year:1200,region:'europe',span:600});
 assert.ok(ongoing.regions[0].rows[0].continuesAfter);assert.equal(ongoing.regions[0].rows[0].record.end,2026);
});

test('each new civilization focus covers its full declared range without widening dates',()=>{
 for(const [focusId,start,end] of [['egypt',-2649,-30],['mesopotamia',-2900,-539],['japan',538,2026]]){
  const group=compactPoliticalTimeline([],{year:start,focusId}).regions[0];
  const periods=group.track.periods;
  assert.equal(periods[0].start,start);
  assert.equal(periods.at(-1).end,end);
  for(let i=1;i<periods.length;i++){
   assert.equal(toOrdinal(periods[i].start),toOrdinal(periods[i-1].end)+1,periods[i].id);
  }
  const last=compactPoliticalTimeline([],{year:end,focusId}).regions[0];
  assert.ok(last.rows.some(row=>row.record.end===end));
 }
});
