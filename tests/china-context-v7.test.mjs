import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chinaPhaseAt,chinaPeriodFeatures,createChinaContextLoader,activePeriodPlaces} from '../dist/china-period-context.mjs';
const base=new URL('../dist/data/',import.meta.url);
const load=async file=>JSON.parse(await fs.readFile(new URL(file,base),'utf8'));
const index=await load('china-context-index-v7.json');
test('China period metadata covers its display scope without containing retired polygons',()=>{
 for(let year=-403;year<=2026;year++){if(!year)continue;const found=chinaPhaseAt(index,year);assert.ok(found,String(year));const matches=index.periods.flatMap(p=>p.phases).filter(p=>year>=p.start&&year<=p.end);assert.equal(matches.length,1,String(year));assert.deepEqual(found.phase.featureIds,[]);assert.deepEqual(found.phase.administrativeIds,[]);}
 for(const period of index.periods){assert.deepEqual(period.files,[]);assert.deepEqual(period.administrativeFiles,[]);}
 for(const year of [-404,0,2027,NaN,1.5])assert.equal(chinaPhaseAt(index,year),null);
});
test('retired boundaries never cause political or administrative geometry requests',async()=>{
 const calls=[];const loader=createChinaContextLoader(index,async file=>{calls.push(file);return load(file);});
 for(const year of [-399,-222,-221,25,220,300,400,500,906,1127,1600,1912,1949,2026]){const result=await loader.load(year,{includeAdministrative:true});assert.deepEqual(result.features,[]);assert.deepEqual(result.administrative,[]);}
 assert.deepEqual(calls,[]);
});
test('source settlement appearance and disappearance are bounded and duplicate locations do not crowd labels',()=>{
 const row=(id,extras={})=>({id,start:100,end:500,name:{en:id,zh:id},location:{lat:35,lon:110},...extras});
 const rows=[row('future',{appear:250}),row('ended',{vanish:200}),row('capital',{isCapital:true,tier:1}),row('duplicate'),row('elsewhere',{location:{lat:36,lon:111},tier:2})];
 const active=activePeriodPlaces(rows,200,{budget:5});assert.deepEqual(active.map(r=>r.id),['capital','elsewhere']);assert.deepEqual(activePeriodPlaces(rows,200,{region:'africa'}),[]);assert.equal(activePeriodPlaces(rows,200,{budget:1}).length,1);
});
