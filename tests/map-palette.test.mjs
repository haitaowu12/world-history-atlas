import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {mapDisplayPalette,neighboringDisplayGroups,displayColor} from '../dist/map-palette.mjs';
import {createChinaContextLoader} from '../dist/china-period-context.mjs';
import {contemporaryCollection} from './map-fixtures.mjs';
const box=(id,x0,y0,x1,y1,p={})=>({type:'Feature',properties:{id,polityId:id,color:'#abcdef',...p},geometry:{type:'Polygon',coordinates:[[[x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]]]}});
const palette=features=>mapDisplayPalette(features,{scheme:'mineral'});
test('touching and nearby independent regions cannot inherit the same preferred shade',()=>{
 const a=box('a',0,0,5,5),b=box('b',5,0,10,5),island=box('island',11,0,12,1),far=box('far',70,0,71,1),rows=[a,b,island,far];
 assert.equal(displayColor(a.properties),displayColor(b.properties),'negative control: the previous identity palette collides');
 const p=palette(rows);assert.notEqual(p.get('a'),p.get('b'));assert.notEqual(p.get('b'),p.get('island'));
 const edges=neighboringDisplayGroups(rows);assert.ok(edges.some(e=>e.a.includes('a')&&e.b.includes('b')));assert.ok(!edges.some(e=>[...e.a,...e.b].includes('far')),'far-away reuse remains available');
});
test('boundary samples find long borders, dateline neighbours and polar neighbours',()=>{
 for(const rows of [[box('a',0,-30,20,30),box('b',20,-30,40,30)],[box('a',179,0,179.6,1),box('b',-179.6,0,-179,1)],[box('a',0,88,1,89),box('b',50,88,51,89)]]){
  assert.equal(neighboringDisplayGroups(rows).length,1);const p=palette(rows);assert.notEqual(p.get('a'),p.get('b'));
 }
});
test('only explicit shared display identities bypass separation and inputs remain unchanged',()=>{
 const rows=[box('cn',120,20,122,25,{code:'CHN'}),box('tw',122.5,22,123,24,{code:'TWN'}),box('jp',124,22,125,24,{code:'JPN'}),box('us-a',-100,35,-95,40,{role:'division',parent:'USA'}),box('us-b',-95,35,-90,40,{role:'division',parent:'USA'})],before=JSON.stringify(rows),p=palette(rows);
 assert.equal(p.get('cn'),p.get('tw'));assert.notEqual(p.get('jp'),p.get('tw'));assert.equal(p.get('us-a'),p.get('us-b'));assert.equal(JSON.stringify(rows),before);
 assert.deepEqual([...palette([...rows].reverse())].sort(),[...p].sort(),'source ordering must not change the result');
 p.set('cn','#000000');assert.notEqual(palette(rows).get('cn'),'#000000','caller mutation cannot poison the cache');
});
test('dense overlapping networks extend the palette instead of silently reusing a neighbour colour',()=>{
 const rows=Array.from({length:16},(_,i)=>box('overlap-'+i,0,0,1,1)),p=palette(rows);assert.equal(new Set(p.values()).size,16);for(const c of p.values())assert.match(c,/^#[\da-f]{6}$/i);
});
test('shipped contemporary borders distinguish known neighbouring countries and the old Balkan collision',()=>{
 const rows=contemporaryCollection.features,p=palette(rows),by=code=>rows.find(f=>f.properties.code===code);
 for(const [a,b]of [['ALB','SRB'],['ARM','AZE'],['FRA','DEU'],['BEL','NLD'],['EGY','LBY'],['USA','CAN'],['USA','MEX'],['CHN','RUS'],['CHN','IND'],['JPN','KOR']])assert.notEqual(p.get(by(a).properties.id),p.get(by(b).properties.id),a+' / '+b);
 assert.equal(p.get(by('CHN').properties.id),p.get(by('TWN').properties.id));
 assert.equal(displayColor(by('ALB').properties),displayColor(by('SRB').properties),'reproduce the prior shipped palette collision');
});
test('all detected nearby display groups have distinct colours in the modern and Warring States data',async()=>{
 const read=name=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+name,import.meta.url))),loader=createChinaContextLoader(read('china-context-index-v7.json'),async name=>read(name)),rows=(await loader.load(-399)).features;
 for(const features of [contemporaryCollection.features,rows]){assert.ok(features.length>1);const p=palette(features);for(const edge of neighboringDisplayGroups(features))assert.notEqual(p.get(edge.a[0]),p.get(edge.b[0]),edge.a+' / '+edge.b);}
});
