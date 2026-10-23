import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {politicalTimelineRecords,politicalTimelineLanes} from '../dist/political-timeline.mjs';
import {nearbyTurningPoints} from '../dist/nearby-context.mjs';
import {composeHistoricalFeatures,outlineCaption} from '../dist/map-composition.mjs';
import {formatYear} from '../dist/core.mjs';
const data=['history.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url))));

test('modern political timeline has ongoing overviews across six regions without reviving the USSR',()=>{
 const rows=politicalTimelineRecords(data,{window:{start:2026,end:2026}});
 assert.ok(new Set(rows.map(r=>r.region)).size>=6);
 assert.ok(rows.some(r=>r.id==='prc-political-period'));
 assert.ok(rows.some(r=>r.id==='france-fifth-republic'));
 assert.ok(!rows.some(r=>r.id==='soviet-union-polity'));
});

test('political overview excludes event, place and biography bars regardless of importance or theme',()=>{
 const falseStates=['event','place','person','culture','idea'].map((kind,i)=>({id:'nonstate-'+i,kind,theme:'states',importance:5,start:900,end:1500,region:'east-asia'}));
 const selected=politicalTimelineRecords([...data,...falseStates],{window:{start:900,end:1500}});
 assert.ok(selected.length>20);
 assert.ok(selected.every(r=>r.kind==='polity'));
 assert.ok(selected.some(r=>r.id==='northern-song'));
 assert.ok(selected.some(r=>r.id==='southern-song'));
 assert.ok(!selected.some(r=>r.id==='quanzhou'));
 assert.ok(!selected.some(r=>r.id.startsWith('nonstate-')));
});

test('state lane packing favors the selected-year polity and exposes every omitted state',()=>{
 const rows=[{id:'early',start:900,end:1100,importance:5},{id:'current',start:1000,end:1300,importance:4},{id:'later',start:1100,end:1400,importance:4}];
 const lanes=politicalTimelineLanes(rows,{start:900,end:1500},1200,{maxLanes:1});
 assert.equal(lanes.rows[0].record.id,'current');
 assert.equal(lanes.omitted.length,2);
 assert.equal(lanes.rows.length+lanes.omitted.length,rows.length);
 for(const r of lanes.rows){assert.ok(r.left>=0&&r.width>0&&r.left+r.width<=100);}
});

test('nearby turning points stay regionally balanced despite imported record density',()=>{
 const china=Array.from({length:100},(_,i)=>({id:'china-'+i,kind:'event',region:'east-asia',start:1200+i%10,importance:5}));
 const rest=['africa','europe','south-asia'].map((region,i)=>({id:region,kind:'event',region,start:1202+i,importance:3}));
 const selected=nearbyTurningPoints([...china,...rest],1200,{limit:4});
 assert.equal(new Set(selected.map(r=>r.region)).size,4);
 assert.ok(nearbyTurningPoints(china,1200,{region:'east-asia',limit:10}).length<=10);
});

test('schematic composition replaces duplicate dynasty outlines while preserving unrelated states',()=>{
 const f=(id,name)=>({properties:{id,polityId:id,name:{en:name,zh:name}}});
 const global=[f('song','Northern Song'),f('byzantine','Eastern Roman Empire')];
 const china=[f('china-schematic-song','Song')];
 const merged=composeHistoricalFeatures(global,china);
 assert.equal(merged.length,2);
 assert.ok(merged.includes(global[1]));
 assert.ok(!merged.includes(global[0]));
});

test('schematic caption presents the source stage without manufacturing a snapshot year',()=>{
 const f={properties:{schematic:true,sourcePhase:{start:-1,end:8}}};
 assert.match(outlineCaption(f,'en',formatYear),/1 BCE.*8 CE/);
 assert.match(outlineCaption(f,'en',formatYear),/schematic stage/);
 assert.equal(f.properties.sourceYear,undefined);
});
