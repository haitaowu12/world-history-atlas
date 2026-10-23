import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {applyChinaReviews,linkChinaContext} from '../dist/china-review.mjs';
import {chinaRoutes,searchLibrary,nearLibraryPlace} from '../dist/china-library.mjs';

const read = file => JSON.parse(readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const manifest=read('china-import-manifest.json'),library=read('china-library.json'),reviews=read('china-reviews.json');
const events=manifest.eventFiles.flatMap(f=>read(f.path));
const before=JSON.stringify({events,library});
const reviewed=applyChinaReviews(events,library,reviews);
const event=id=>reviewed.events.find(r=>r.id===id);
const stop=id=>reviewed.library.journeys.flatMap(j=>j.stops).find(s=>s.id===id);

test('targeted corrections preserve frozen content and stable record identities',()=>{
  assert.equal(JSON.stringify({events,library}),before);
  assert.deepEqual(reviewed.events.map(r=>r.id),events.map(r=>r.id));
  assert.deepEqual(reviewed.library.journeys.map(j=>j.stops.map(s=>s.id)),library.journeys.map(j=>j.stops.map(s=>s.id)));
  for(const review of reviews.eventReviews){
    const r=event(review.id),original=events.find(v=>v.id===review.id);
    assert.equal(r.provenance.sourceCommit,manifest.source.commit);
    assert.equal(r.provenance.status,'reviewed');
    assert.deepEqual(r.provenance.originalRecord.location,original.location);
    assert.ok(r.sources.some(s=>s.url.includes(manifest.source.commit)));
    assert.ok(r.sources.some(s=>!s.url.includes('github.com')));
  }
});

test('Bi Sheng uses a supported date range and does not claim a verified Kaifeng workshop',()=>{
  const r=event('china-landmark-497');
  assert.deepEqual([r.start,r.end],[1041,1048]);
  assert.equal(r.provenance.originalRecord.start,1047);
  assert.match(r.dateNote.en,/not a verified workshop/);
  assert.doesNotMatch(r.title.en,/in Kaifeng/);
});

test('compound Su Shi chapters distinguish arrival anchors from work and arrest dates',()=>{
  for(const [id,anchor,workYear] of [
    ['004',1071,1073],['005',1075,1076],['006',1077,1079],['007',1080,1082],['009',1097,1100]
  ]){
    const s=stop('china-stop-sushi-'+id);
    assert.equal(s.year,anchor);assert.match(s.review.note.en,new RegExp(String(workYear)));
    assert.equal(s.review.original.year,anchor);
  }
  assert.match(stop('china-stop-wangyangming-001').description.zh,/1481/);
  assert.match(stop('china-stop-wangyangming-001').review.original.description.zh,/次年/);
});

test('disputed early Xuanzang chronology remains qualified without a fabricated date shift',()=>{
  const original=library.journeys.find(j=>j.id==='china-journey-xuanzang');
  for(const old of original.stops.slice(0,8)){
    const s=stop(old.id);assert.equal(s.year,old.year);
    assert.match(s.dateLabel.en,/disputed/);assert.match(s.review.note.en,/disputed|629/);
    assert.equal(s.personalPresenceVerified,false);
  }
  assert.match(stop('china-stop-libai-001').description.en,/birthplace is disputed/);
});

test('chronicle adaptation retains correction notes, quotations and item evidence',()=>{
  const routes=chinaRoutes(reviewed.library,manifest);
  assert.equal(routes.flatMap(r=>r.stops).filter(s=>s.review).length,reviews.chronicleReviews.length);
  const su=routes.find(r=>r.id==='china-journey-sushi');
  assert.ok(su.stops.every(s=>s.quotation?.en&&s.quotation?.zh));
  assert.ok(su.sources.some(s=>s.publisher.includes('National Palace Museum')));
  assert.equal(new Set(su.sources.map(s=>s.url)).size,su.sources.length);
  assert.equal(su.provenance.status,'inherited'); // Targeted annotations do not certify a whole route.
});

test('historical names are discoverable without treating nearby records as one settlement',()=>{
  const places=read('china-library-places.json').gazetteer;
  assert.ok(searchLibrary(places,'成周').some(p=>p.name.zh==='洛邑'));
  assert.ok(searchLibrary(library.profiles,'Ｓｕ Ｓｈｉ').some(p=>p.id==='china-person-sushi'));
  assert.equal(nearLibraryPlace({coord:[112.45,34.62]},{coord:[112.46,34.62]}),true);
  assert.equal(nearLibraryPlace({coord:[112.45,34.62]},{coord:[116.4,39.9]}),false);
  const linked=linkChinaContext(reviewed.events,read('history.json'));
  assert.ok(linked.find(r=>r.id==='china-landmark-497').relatedIds.includes('northern-song'));
  assert.ok(linked.find(r=>r.id==='china-landmark-497').relatedIds.includes('diamond-sutra-868'));
});

test('a review cannot silently attach to a missing item or replace its source identity',()=>{
  assert.throws(()=>applyChinaReviews(events,library,{...reviews,eventReviews:[{id:'missing',patch:{}}]}),/Unknown/);
  assert.throws(()=>applyChinaReviews(events,library,{...reviews,eventReviews:[{id:events[0].id,patch:{id:'renamed'}}]}),/identity/);
  assert.throws(()=>applyChinaReviews(events,library,{...reviews,chronicleReviews:[{journeyId:'missing',stopId:'missing',patch:{}}]}),/Unknown/);
});
