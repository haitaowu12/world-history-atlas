import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {applyChinaReviews} from '../dist/china-review.mjs';
import {applyReviewedUpdate} from '../dist/upstream-intake.mjs';
import {applyWartimeFollowup,wartimeCountryReferences,wartimePlaces} from '../dist/wartime-context.mjs';
import {selectCshapesAt} from '../dist/cshapes-history.mjs';
const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url)));
const manifest=read('china-import-manifest.json');
const events=manifest.eventFiles.flatMap(file=>read(file.path));
const library={...read('china-library.json'),...read('china-library-places.json')};
const expansion=read('content-expansion-v15.json');
const people=[...read('people.json'),...expansion.files.flatMap(f=>read(f.file)).filter(r=>r.kind==='person')];
const next=read('jiangshan-reviewed-followup-v16.json');
const baseWar=read('wartime-occupation-context.json'),warUpdate=read('wartime-occupation-followup-v16.json'),geo=read('cshapes-periods-v7.geojson');
test('the Liao review and Shen Kuo mission extend prior published records',()=>{
 const original=JSON.stringify({events,people,library});
 const base=applyChinaReviews(events,library,read('china-reviews.json'));
 const earlier=applyReviewedUpdate(base.events,people,base.library,read('jiangshan-reviewed-update.json'));
 const prior=applyReviewedUpdate(earlier.events,earlier.people,earlier.library,read('jiangshan-followup-v15.json'));
 const result=applyReviewedUpdate(prior.events,prior.people,prior.library,next);
 assert.equal(JSON.stringify({events,people,library}),original);
 const event=result.events.find(r=>r.id==='china-landmark-169');
 assert.equal(event.start,926);assert.match(event.summary.en,/did not mean the disappearance/);assert.match(event.summary.zh,/不代表.*消失/);assert.match(event.provenance.originalText.title.en,/ending Balhae/);assert.ok(event.sources.some(s=>s.url.includes('ijkh.khistory.org')));
 const before=people.find(p=>p.id==='china-person-shen-kuo'),after=result.people.find(p=>p.id===before.id);
 assert.deepEqual(after.milestones.map(m=>m.year),[1063,1072,1075]);assert.deepEqual(after.milestones.slice(0,2),before.milestones);assert.match(after.milestones[2].location.label,/meeting location not established/);assert.ok(after.sources.some(s=>s.url.includes('宋史/卷331')));
 const invalid=structuredClone(next);invalid.personSupplements[0].additionalMilestones[0].year=1200;
 assert.throws(()=>applyReviewedUpdate(prior.events,prior.people,prior.library,invalid),/Invalid biography milestone/);
});
test('wartime additions keep year-end context separate from partial occupation and fronts',()=>{
 const before=JSON.stringify(baseWar),data=applyWartimeFollowup(baseWar,warUpdate);assert.equal(JSON.stringify(baseWar),before);
 const ids=year=>new Set(wartimeCountryReferences(data,year,selectCshapesAt(geo,year)).map(x=>x.record.id));
 assert.ok(!ids(1940).has('ww2-poland-german-reference-1941-43'));assert.ok(!ids(1941).has('ww2-france-axis-reference-1942-43'));
 for(const year of [1942,1943]){assert.ok(ids(year).has('ww2-france-axis-reference-1942-43'));assert.ok(ids(year).has('ww2-poland-german-reference-1941-43'));}
 assert.ok(ids(1941).has('ww2-poland-german-reference-1941-43'));assert.ok(!ids(1944).has('ww2-poland-german-reference-1941-43'));assert.ok(!ids(1944).has('ww2-france-axis-reference-1942-43'));
 assert.ok(wartimePlaces(data,1918).some(r=>r.id==='ww1-belgium-transition-1918'));assert.ok(wartimePlaces(data,1944).some(r=>r.id==='ww2-france-1944'));assert.match(data.records.find(r=>r.id==='ww2-poland-german-reference-1941-43').summary.en,/not a reconstructed occupation frontier/);
 assert.throws(()=>applyWartimeFollowup(baseWar,{...warUpdate,records:[baseWar.records[0]]}),/Invalid wartime reference/);
 const bad=structuredClone(warUpdate);bad.records[0].sourceIds=['unknown'];assert.throws(()=>applyWartimeFollowup(baseWar,bad),/Invalid wartime reference/);
});
