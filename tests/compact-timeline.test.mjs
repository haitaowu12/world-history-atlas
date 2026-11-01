import test from 'node:test';
import assert from 'node:assert/strict';
import {compactPoliticalTimeline} from '../dist/compact-timeline.mjs';
import {toOrdinal} from '../dist/core.mjs';
const state=(id,region,start,end,importance=4)=>({id,region,start,end,importance,kind:'polity'});
test('compact comparison keeps a selected state beside a concurrent state without replacing dates or admitting events',()=>{
 const song=state('song','east-asia',1127,1279,2),jin=state('jin','east-asia',1115,1234,5),goryeo=state('goryeo','east-asia',918,1392,4),france=state('france','europe',987,1328),abbasids=state('abbasids','west-central-asia',750,1258);
 const event={...state('battle','east-asia',1200,1200,5),kind:'event'};
 const result=compactPoliticalTimeline([jin,goryeo,france,abbasids,song,event],{year:1200,selectedId:'song'}),east=result.regions.find(r=>r.id==='east-asia');
 assert.equal(east.rows.find(r=>r.record===song).record.start,1127);
 assert.equal(east.rows.length,1);assert.ok(east.omitted.includes(jin)&&east.omitted.includes(goryeo));
 const focused=compactPoliticalTimeline([jin,goryeo,france,abbasids,song,event],{year:1200,region:'east-asia',selectedId:'song'}).regions[0];
 assert.ok(focused.rows.some(r=>r.record===jin));
 assert.ok(result.regions.every(r=>r.rows.every(x=>x.record.kind==='polity')));
 assert.notEqual(focused.rows[0].lane,focused.rows[1].lane);
 assert.ok(result.regions.some(r=>r.id==='europe')&&result.regions.some(r=>r.id==='west-central-asia'));
});
test('compact date coordinates clip continuing periods to the selected window, including BCE/CE without year zero',()=>{
 const ancient=state('ancient','europe',-100,100),result=compactPoliticalTimeline([ancient],{year:1,region:'europe',span:300});
 for(const group of result.regions)for(const row of group.rows){assert.ok(row.left>=0&&row.width>0&&row.left+row.width<=100);const expected=Math.max(0,(toOrdinal(row.record.start)-toOrdinal(result.window.start))/(toOrdinal(result.window.end)-toOrdinal(result.window.start)+1)*100);assert.equal(row.left,expected);}
 assert.ok(result.ticks.every(y=>y!==0));assert.ok(result.position>=0&&result.position<=100);
 const ongoing=compactPoliticalTimeline([state('ongoing','europe',900,2026)],{year:1200,region:'europe',span:600});
 assert.ok(ongoing.regions[0].rows[0].continuesAfter);assert.equal(ongoing.regions[0].rows[0].record.end,2026);
});
