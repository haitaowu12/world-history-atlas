import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion} from '../dist/content-expansion.mjs';
import {defaultState,filterRecords,validateRecords} from '../dist/core.mjs';
import {traceForHash,traceFromHash,sharedMilestone,milestoneFromHash} from '../dist/share-context.mjs';
const bytes=file=>fs.readFileSync(new URL('../dist/data/'+file,import.meta.url));
const read=file=>JSON.parse(bytes(file));
const previous=read('content-expansion-v14.json'),current=read(CONTENT_MANIFEST);
const fresh=read('expansion-jiangshan-review-v15.json');
const all=[...['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read),...read('china-import-manifest.json').eventFiles.flatMap(f=>read(f.path)),...current.files.flatMap(f=>read(f.file))];
const by=new Map(all.map(r=>[r.id,r]));
test('the Jiangshan review extends the published data without rewriting it',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v15.json');assert.equal(current.version,'0.16.0');
 assert.equal(all.length,1911);assert.equal(by.size,all.length);assert.equal(fresh.length,2);
 for(const f of previous.files){assert.deepEqual(current.files.find(n=>n.file===f.file),f);assert.equal(createHash('sha256').update(bytes(f.file)).digest('hex'),f.sha256);}
 assert.deepEqual(validateRecords(all),[]);assert.deepEqual(auditExpansion(current.files.flatMap(f=>read(f.file)),current,all),[]);
 for(const r of fresh){for(const lang of ['en','zh'])assert.ok(filterRecords(all,{...defaultState(),mode:'all',query:r.name[lang]}).some(n=>n.id===r.id));for(const source of r.sources)assert.ok(source.evidenceNoteZh&&source.retrieval==='opened-page');assert.ok(r.relatedIds.every(id=>by.has(id)));}
 for(const old of read(previous.coursesFile)){const next=read(current.coursesFile).find(c=>c.id===old.id);assert.ok(next);for(const id of old.recordIds)assert.ok(next.recordIds.includes(id));}
});
test('biographies retain the historical qualifications and are not routes',()=>{
 const zu=by.get('china-person-zu-chongzhi'),yelu=by.get('china-person-yelu-chucai');
 assert.match(zu.dateNote.en,/500.*501/);assert.match(zu.dateNote.zh,/500.*501/);assert.equal(zu.milestones[1].year,478);assert.equal(zu.milestones[1].approximate,true);
 assert.match(zu.milestones[2].location.label,/death place uncertain/);assert.match(zu.summary.en,/method.*confidence/s);
 assert.deepEqual(yelu.milestones.map(m=>m.year),[1215,1218,1231]);assert.match(yelu.milestones[1].description.en,/not a verified meeting point/);assert.match(yelu.summary.en,/not a complete.*itinerary/);assert.equal(zu.route,undefined);assert.equal(yelu.route,undefined);
 for(const r of fresh)for(const m of r.milestones){assert.ok(m.location.labelI18n.en&&m.location.labelI18n.zh);assert.ok(m.year>=r.start&&m.year<=r.end);}
});
test('shared map traces reject malformed, extreme and inherited inputs',()=>{
 assert.equal(traceForHash({lon:116.39167,lat:39.90421}),'116.392,39.904');assert.deepEqual(traceFromHash('116.392,39.904'),{lon:116.392,lat:39.904});
 for(const value of ['181,0','0,91','1,2,3','1e2,3','<x>,4','1.1234,2',''])assert.equal(traceFromHash(value),null,value);
 assert.equal(traceForHash({lon:0,lat:0,inheritedPlace:{id:'existing'}}),'');assert.equal(traceForHash({lon:NaN,lat:0}),'');
});
test('shared biography milestones distinguish same-year events and reject stale selections',()=>{
 const r={milestones:[{year:100},{year:100},{year:101}]};
 assert.equal(sharedMilestone(r,1,100),'1');assert.equal(milestoneFromHash('1',r,100,0),1);
 for(const value of ['2','-1','01','9','1x','Infinity',''])assert.equal(milestoneFromHash(value,r,100,0),0,value);
 assert.equal(sharedMilestone(r,2,100),'');assert.equal(sharedMilestone(r,0,101),'');
});

test('the inherited Zu event no longer assigns the pi calculation to 462',async()=>{
 const {applyChinaReviews}=await import('../dist/china-review.mjs');
 const {applyReviewedUpdate}=await import('../dist/upstream-intake.mjs');
 const library={...read('china-library.json'),...read('china-library-places.json')};
 const events=read('china-import-manifest.json').eventFiles.flatMap(f=>read(f.path));
 const original=events.find(e=>e.id==='china-landmark-490');
 const base=applyChinaReviews(events,library,read('china-reviews.json'));
 const old=applyReviewedUpdate(base.events,all,base.library,read('jiangshan-reviewed-update.json'));
 const result=applyReviewedUpdate(old.events,old.people,old.library,read('jiangshan-followup-v15.json'));
 const review=result.events.find(e=>e.id===original.id);
 assert.equal(review.start,462);assert.match(review.title.en,/Daming calendar/);assert.match(review.summary.en,/do not date.*462/);assert.match(review.provenance.originalText.title.en,/calculates pi/);
 assert.equal(review.provenance.sourceCommit,original.provenance.sourceCommit);assert.ok(review.relatedIds.includes('china-person-zu-chongzhi'));
 assert.equal(result.events.filter(e=>e.provenance.status==='reviewed').length,8);
});
