import test from 'node:test';
import assert from 'node:assert/strict';
import {
  nearestSnapshot, previousSnapshot, yearDistance, midpoint, timeWindow,
  timelineLanes, rankRecords, eventsNear, greatCircleKm, nearbyHistories,
  quizScore, safeMapState, visibleInYear, eraAt, relatedPolityRecords,
} from '../dist/atlas-model.mjs';
import {MIN_YEAR, MAX_YEAR, validYear} from '../dist/core.mjs';

const record=(id,start,end,extra={})=>({id,start,end,theme:'states',kind:'polity',importance:3,...extra});

test('polity detail matches whole names without matching unrelated words',()=>{
  const rows=[record('ming-court',1400,1500,{title:{en:'Ming court'}}),record('andean-farming',1400,1500,{title:{en:'Andean farming'}}),record('linked',1400,1500,{title:{en:'Explicitly linked'}}),record('ming-old',1200,1300,{title:{en:'Ming'}})];
  assert.deepEqual(relatedPolityRecords(rows,'ming',['linked'],1415).map(r=>r.id),['ming-court','linked']);
  assert.deepEqual(relatedPolityRecords(rows,'',[],1415),[]);
});

test('snapshot selection never uses the future or relabels the source year',()=>{
  const snapshots=[{year:1200},{year:-500},{year:200},{year:0},{year:1000},{year:Infinity}];
  const copy=structuredClone(snapshots);
  assert.equal(nearestSnapshot(snapshots,-501),null);
  assert.equal(nearestSnapshot(snapshots,0),null);
  assert.equal(nearestSnapshot(null,1000),null);
  assert.equal(nearestSnapshot(snapshots,1199).year,1000);
  assert.equal(nearestSnapshot(snapshots,1200).year,1200);
  assert.equal(nearestSnapshot(snapshots,2026).year,1200);
  assert.deepEqual(snapshots,copy);
});

test('previous snapshot and distances respect the missing civil year zero',()=>{
  const snapshots=[{year:-500},{year:-1},{year:1},{year:200}];
  assert.equal(previousSnapshot(snapshots,snapshots[2]).year,-1);
  assert.equal(previousSnapshot(snapshots,snapshots[1]).year,-500);
  assert.equal(previousSnapshot(snapshots,snapshots[0]),null);
  assert.equal(previousSnapshot(snapshots,null),null);
  assert.equal(yearDistance(-1,1),1);
  assert.equal(yearDistance(-100,100),199);
  assert.equal(midpoint(record('cross-era',-2,2)),1);
});

test('timeline windows stay within the supported chronology and never emit zero',()=>{
  for(const year of [MIN_YEAR,-3000,-1,1,1000,1960,MAX_YEAR]) {
    const window=timeWindow(year);
    assert.ok(validYear(window.start));
    assert.ok(validYear(window.end));
    assert.ok(window.start<=year&&window.end>=year);
    assert.ok(window.start>=MIN_YEAR&&window.end<=MAX_YEAR);
  }
  assert.deepEqual(timeWindow(1,2),{start:-1,end:2});
});

test('timeline keeps point events visible at both window endpoints',()=>{
  const entries=[record('left',1000,1000,{kind:'event'}),record('right',1200,1200,{kind:'event'})];
  const {rows}=timelineLanes(entries,{start:1000,end:1200});
  assert.equal(rows.length,2);
  for(const row of rows) {
    assert.ok(row.width>0,`${row.record.id} must have a visible width`);
    assert.ok(row.left>=0&&row.left<100,`${row.record.id} must start inside the axis`);
    assert.ok(row.left+row.width<=100.00001,`${row.record.id} must stay inside the axis`);
  }
});

test('timeline caps dense overlaps without dropping its omitted count',()=>{
  const entries=Array.from({length:10},(_,i)=>record('overlap-'+i,900,1300));
  const original=structuredClone(entries);
  const packed=timelineLanes(entries,{start:1000,end:1200},3);
  assert.equal(packed.rows.length,3);
  assert.equal(packed.omitted,7);
  assert.equal(packed.count,3);
  assert.deepEqual(packed.rows.map(r=>r.lane),[0,1,2]);
  for(const row of packed.rows) {assert.equal(row.left,0);assert.equal(row.width,100);}
  assert.deepEqual(entries,original);
});

test('inclusive intervals sharing a date cannot occupy the same timeline lane',()=>{
  const entries=[record('before',1000,1100),record('after',1100,1200)];
  const {rows}=timelineLanes(entries,{start:1000,end:1200});
  assert.notEqual(rows[0].lane,rows[1].lane);
  const acrossEra=timelineLanes([record('bce',-1,-1),record('ce',1,1)],{start:-2,end:2});
  assert.equal(acrossEra.rows.length,2);
  assert.ok(acrossEra.rows.every(r=>Number.isFinite(r.left)&&r.width>0));
});

test('ranking prioritizes importance and breaks equal scores with polity records',()=>{
  const entries=[record('place',1000,1200,{kind:'place'}),record('state',1000,1200),record('important',900,1300,{kind:'idea',importance:5})];
  const original=structuredClone(entries);
  assert.deepEqual(rankRecords(entries,1100).map(r=>r.id),['important','state','place']);
  assert.deepEqual(entries,original);
});

test('nearby events are chosen by distance in time, then displayed in chronology',()=>{
  const entries=[record('far',-100, -100,{kind:'event'}),record('before',-1,-1,{kind:'event'}),record('now',1,1,{kind:'event'}),record('later',10,10,{kind:'event'}),record('state',1,100)];
  assert.deepEqual(eventsNear(entries,1,2).map(r=>r.id),['before','now']);
  assert.deepEqual(visibleInYear(entries,1).map(r=>r.id),['now','state']);
  assert.equal(visibleInYear(entries,0).length,0);
  assert.equal(eraAt(-1).id,eraAt(1).id);
});

test('geographic distance crosses the antimeridian by the short route',()=>{
  const a={lon:179,lat:0},b={lon:-179,lat:0};
  assert.ok(Math.abs(greatCircleKm(a,b)-222.39)<1);
  assert.equal(greatCircleKm(a,a),0);
  assert.ok(Math.abs(greatCircleKm({lon:0,lat:0},{lon:180,lat:0})-20015.09)<1);
  assert.ok(Math.abs(greatCircleKm(a,b)-greatCircleKm(b,a))<1e-9);
  const histories=[record('near-dateline',100,200,{location:b}),record('far',1,2,{location:{lon:0,lat:0}})];
  assert.deepEqual(nearbyHistories(histories,a,300).map(r=>r.record.id),['near-dateline']);
});

test('map quiz scores are bounded, monotone and reject invalid distances',()=>{
  assert.equal(quizScore(0),1000);
  assert.ok(quizScore(100)>quizScore(1000));
  assert.ok(quizScore(1000)>quizScore(5000));
  for(const invalid of [-1,NaN,Infinity,undefined]) assert.equal(quizScore(invalid),0);
  assert.ok(quizScore(20015)>=0);
});

test('map URL options constrain categories, route identifiers and stop indices',()=>{
  assert.deepEqual(safeMapState('#kind=person&route=ibn-battuta&stop=3'),{kind:'person',route:'ibn-battuta',stop:3});
  assert.deepEqual(safeMapState('#kind=__proto__&route=%3Cscript%3E&stop=-20'),{kind:'all',route:'script',stop:0});
  assert.equal(safeMapState('#stop=99999').stop,100);
  assert.equal(safeMapState('#stop=not-a-number').stop,0);
  assert.equal(safeMapState('#route='+'a'.repeat(200)).route.length,80);
});

// A polity opened outside its period should land on an available dated map.
test('polity entry dates prefer an in-period map snapshot near the focus midpoint',async()=>{
 const {representativeYear}=await import('../dist/atlas-model.mjs');
 const snapshots=[{year:600},{year:800},{year:1000}];
 assert.equal(representativeYear(record('tang',618,907),snapshots),800);
 assert.equal(representativeYear(record('event',750,750,{kind:'event'}),snapshots),750);
 assert.equal(representativeYear(record('unmapped',1100,1190),snapshots),1145);
});
