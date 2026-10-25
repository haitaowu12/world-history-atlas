import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {applySearchUpdate,applyReviewedUpdate} from '../dist/upstream-intake.mjs';
import {applyChinaReviews} from '../dist/china-review.mjs';
import {buildDiscoveryIndex,searchDiscovery} from '../dist/discovery.mjs';
import {layoutRegionalLabels} from '../dist/regional-reference.mjs';

const read = file=>JSON.parse(readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const manifest=read('china-import-manifest.json');
const library={...read('china-library.json'),...read('china-library-places.json')};
const events=manifest.eventFiles.flatMap(file=>read(file.path));
const people=read('people.json');
const aliases=read('jiangshan-search-update.json'),update=read('jiangshan-reviewed-update.json');

test('additive aliases retain frozen identity, independent review state and ASCII search reach',()=>{
  const before=JSON.stringify(library),updated=applySearchUpdate(library,aliases);
  assert.equal(JSON.stringify(library),before);
  assert.equal(aliases.rows.length,76);
  assert.equal(aliases.rows.flatMap(row=>row.aliases).length,232);
  assert.deepEqual(updated.gazetteer.map(p=>p.id),library.gazetteer.map(p=>p.id));
  const index=buildDiscoveryIndex({library:updated});
  assert.ok(searchDiscovery(index,'lantianguan',{kind:'place'}).some(p=>p.referenceIds.includes('china-gazetteer-004')));
  assert.equal(updated.gazetteer[3].reviewStatus,'inherited');
  assert.equal(updated.gazetteer[3].aliasSource.license,'GPL-3.0');
  assert.throws(()=>applySearchUpdate(library,{...aliases,rows:[{...aliases.rows[0],id:'missing'}]}),/identity mismatch/);
  assert.throws(()=>applySearchUpdate(library,{...aliases,rows:[{...aliases.rows[0],coord:[0,0]}]}),/identity mismatch/);
});

test('new independently checked correction preserves all earlier reviews and chronicle stop identities',()=>{
  const baseline=applyChinaReviews(events,library,read('china-reviews.json'));
  const before=JSON.stringify(baseline),result=applyReviewedUpdate(baseline.events,people,baseline.library,update);
  assert.equal(JSON.stringify(baseline),before);
  assert.equal(result.events.filter(row=>row.provenance.status==='reviewed').length,7);
  assert.deepEqual(result.library.journeys,baseline.library.journeys);
  assert.equal(result.library.journeys.flatMap(j=>j.stops).filter(s=>s.review).length,24);
  const bao=result.events.find(row=>row.id==='china-landmark-498');
  assert.equal(bao.start,1061);
  assert.match(bao.title.en,/central military/);
  assert.match(bao.provenance.originalText.title.en,/magistrate/);
  assert.match(bao.provenance.originalRecord.dateNote.en,/civil year/);
  assert.ok(bao.sources.some(source=>source.url.endsWith('卷012#嘉祐六年')));
  for(const review of read('china-reviews.json').eventReviews)
    assert.deepEqual(result.events.find(row=>row.id===review.id),baseline.events.find(row=>row.id===review.id));
});

test('Xuanzang source readings do not silently change disputed chronology, route geometry or milestones',()=>{
  const original=people.find(person=>person.id==='person-xuanzang');
  const result=applyReviewedUpdate(events,people,library,update).people.find(person=>person.id===original.id);
  assert.deepEqual(result.milestones,original.milestones);
  assert.equal(result.summary,original.summary);
  assert.equal(result.sources.filter(source=>source.publisher.startsWith('CBETA')).length,2);
  assert.match(result.keyFacts.en.join(' '),/not adopted/);
  assert.deepEqual(result.dateNote,original.dateNote);
  assert.throws(()=>applyReviewedUpdate(events,people,library,{...update,personSupplements:[{id:'missing'}]}),/Unknown/);
});

test('province labels yield to marker hit areas and stay inside a narrow viewport',()=>{
  const unit=(id,x,y)=>({properties:{id,name:{en:id,zh:'省区名称'},labelPoint:[x,y]}});
  const blocked=unit('Marker overlap',100,100),clear=unit('Clear',220,130),edge=unit('Beyond edge',385,180);
  const options={projection:p=>p,transform:{k:3,apply:p=>p},viewport:{width:390,height:450},obstacles:[{x:90,y:90,w:22,h:22}]};
  const rows=layoutRegionalLabels([blocked,clear,edge],options);
  assert.deepEqual(rows,[clear]);
  assert.deepEqual(layoutRegionalLabels([clear],{...options,transform:{k:2,apply:p=>p}}),[]);
  const dense=Array.from({length:30},(_,i)=>unit('A',30+(i%6)*60,30+Math.floor(i/6)*70));
  assert.equal(layoutRegionalLabels(dense,{...options,obstacles:[]}).length,14);
});
