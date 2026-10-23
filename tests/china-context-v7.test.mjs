import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chinaPhaseAt,chinaPeriodFeatures,createChinaContextLoader,activePeriodPlaces} from '../dist/china-period-context.mjs';
const base=new URL('../dist/data/',import.meta.url);
const load=async file=>JSON.parse(await fs.readFile(new URL(file,base),'utf8'));
const index=await load('china-context-index-v7.json');
test('source China phases cover every civil year in their display scope without overlapping stages',()=>{
 for(let year=-403;year<=2026;year++){if(!year)continue;const found=chinaPhaseAt(index,year);assert.ok(found,String(year));const matches=index.periods.flatMap(p=>p.phases).filter(p=>year>=p.start&&year<=p.end);assert.equal(matches.length,1,String(year));if(year<1949)assert.ok(found.phase.featureIds.length>0,String(year));}
 for(const year of [-404,0,2027,NaN,1.5])assert.equal(chinaPhaseAt(index,year),null);
});
test('phase transitions remove superseded source political outlines instead of carrying one dynasty forward',async()=>{
 const loader=createChinaContextLoader(index,load);
 for(const [year,period] of [[-222,'zhanguo'],[-221,'qin'],[24,'xihan'],[25,'donghan'],[219,'donghan'],[220,'sanguo'],[316,'xijin'],[317,'dongjin'],[906,'tang'],[907,'wudai'],[1126,'beisong'],[1127,'nansong'],[1643,'ming'],[1644,'qing'],[1911,'qing'],[1912,'roc'],[1948,'roc'],[1949,'prc'],[2026,'prc']]){const result=await loader.load(year);assert.equal(result.period.id,period);assert.ok(result.features.every(f=>f.properties.periodId===period));}
 assert.equal((await loader.load(2026)).features.length,0,'empty original modern snapshot must use shared world layer');
});
test('lazy phases preserve only source political roles and load administrative geometry separately',async()=>{
 let calls=[];const loader=createChinaContextLoader(index,async file=>{calls.push(file);return load(file);});
 const a=await loader.load(300);assert.ok(a.features.length);assert.equal(a.administrative.length,0);assert.ok(calls.every(f=>!f.startsWith('china-administrative')));assert.ok(a.features.every(f=>['main','rival'].includes(f.properties.role)));assert.ok(a.features.every(f=>f.properties.schematic&&f.properties.review.includes('not-independently')));
 const before=calls.length;await loader.load(301);assert.equal(calls.length,before,'adjacent years share era geometry cache');
 const b=await loader.load(300,{includeAdministrative:true});assert.ok(b.administrative.length);assert.ok(calls.some(f=>f.startsWith('china-administrative')));
});
test('source settlement appearance and disappearance are bounded and duplicate locations do not crowd labels',()=>{
 const row=(id,extras={})=>({id,start:100,end:500,name:{en:id,zh:id},location:{lat:35,lon:110},...extras});
 const rows=[row('future',{appear:250}),row('ended',{vanish:200}),row('capital',{isCapital:true,tier:1}),row('duplicate'),row('elsewhere',{location:{lat:36,lon:111},tier:2})];
 const active=activePeriodPlaces(rows,200,{budget:5});assert.deepEqual(active.map(r=>r.id),['capital','elsewhere']);assert.deepEqual(activePeriodPlaces(rows,200,{region:'africa'}),[]);assert.equal(activePeriodPlaces(rows,200,{budget:1}).length,1);
});
