import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion,partitionExpansion,applyEvidenceReviews} from '../dist/content-expansion.mjs';
import {buildDiscoveryIndex,searchDiscovery} from '../dist/discovery.mjs';
import {defaultState,filterRecords,relatedRecords,stateFromHash,hashFromState} from '../dist/core.mjs';
import {politicalTimelineRecords} from '../dist/political-timeline.mjs';

const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const prior=read('content-expansion-v10.json'),manifest=read(CONTENT_MANIFEST);
const expansion=manifest.files.flatMap(file=>read(file.file));
const fresh=expansion.filter(record=>record.expansion?.edition==='v11');
const base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read);
base.push(...read('china-import-manifest.json').eventFiles.flatMap(file=>read(file.path)));
const all=[...base,...expansion],byId=new Map(all.map(record=>[record.id,record]));

test('V11 is the current additive edition and preserves the exact V10 source inventory',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v11.json');
 for(const file of prior.files)assert.deepEqual(manifest.files.find(item=>item.file===file.file),file);
 for(const file of manifest.files){
  const bytes=fs.readFileSync(new URL('../dist/data/'+file.file,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256,file.file);
  assert.equal(bytes.length,file.bytes);assert.equal(JSON.parse(bytes).length,file.records);
  assert.ok(bytes.length<=450000);
 }
 assert.equal(byId.size,all.length);
 assert.equal(all.length,manifest.baseline.records+fresh.length);
 assert.deepEqual(new Set(fresh.map(r=>r.id)),new Set(manifest.addition.recordIds));
 assert.equal(fresh.length,manifest.addition.records);
 assert.equal(partitionExpansion(fresh).people.length,manifest.addition.biographies);
 assert.equal(fresh.reduce((n,r)=>n+(r.milestones?.length||0),0),manifest.addition.biographyMilestones);
 assert.deepEqual(auditExpansion(expansion,manifest,all),[]);
});

test('V11 biographies reach bilingual shared discovery and connected histories link back',()=>{
 const people=all.filter(r=>r.kind==='person');
 const index=buildDiscoveryIndex({records:all,people,library:read('china-library.json')});
 const biographies=partitionExpansion(fresh).people;
 assert.equal(index.people.length,245+biographies.length);
 assert.deepEqual(new Set(fresh.map(r=>r.region)),new Set(['africa','west-central-asia','europe','south-asia','east-asia','southeast-asia','north-america','latin-america','oceania']));
 for(const person of biographies){
  for(const name of [person.name.en,person.name.zh,...(person.aliases||[])]){
   assert.ok(searchDiscovery(index,name,{kind:'person'}).some(r=>r.id===person.id),person.id+' discovery '+name);
   assert.ok(filterRecords(all,{...defaultState(),mode:'all',query:name}).some(r=>r.id===person.id),person.id+' atlas '+name);
  }
  assert.ok(fresh.some(r=>r.kind!=='person'&&person.relatedIds.includes(r.id)),person.id+' needs new contextual reading');
 }
 for(const row of fresh)for(const id of row.relatedIds){
  assert.ok(byId.has(id),id);
  assert.ok(relatedRecords(all,byId.get(id)).some(r=>r.id===row.id),row.id+' reverse reading');
 }
});

test('V11 retains previous reading stops, adds source-comparison questions, and preserves share years',()=>{
 const oldCourses=read(prior.coursesFile),courses=read(manifest.coursesFile);
 assert.deepEqual(courses.map(c=>c.id),oldCourses.map(c=>c.id));
 for(const old of oldCourses){
  const course=courses.find(c=>c.id===old.id);
  for(const id of old.recordIds)assert.ok(course.recordIds.includes(id),old.id+' lost '+id);
  for(const question of old.questions)assert.ok(course.questions.some(q=>q.en===question.en&&q.zh===question.zh));
 }
 for(const row of fresh){
  for(const stream of row.expansion.workstreams){
   const course=courses.find(c=>c.workstream===stream);
   assert.ok(course.recordIds.includes(row.id),row.id+' reading path');
   if(row.kind==='person')assert.ok(course.questions.some(q=>q.en.includes(row.title.en)&&q.zh.includes(row.title.zh)),row.id+' source exercise');
  }
  for(const lang of ['en','zh']){
   const restored=stateFromHash(hashFromState({...defaultState(),mode:'all',year:row.start,entry:row.id,lang}),all);
   assert.equal(restored.entry,row.id);assert.equal(restored.year,row.start);assert.equal(restored.lang,lang);
  }
 }
 const oldRows=[...base,...prior.files.flatMap(f=>read(f.file))];
 assert.deepEqual(politicalTimelineRecords(all,{scope:'all'}).map(r=>r.id),politicalTimelineRecords(oldRows,{scope:'all'}).map(r=>r.id));
});

test('V11 cannot bypass evidence scope, connected reading or supported life chronology',()=>{
 const person=fresh.find(r=>r.kind==='person');
 const rejects=(change,pattern)=>{
  const changed=structuredClone(expansion),row=changed.find(r=>r.id===person.id);change(row);
  assert.ok(auditExpansion(changed,manifest,all).some(message=>pattern.test(message)),String(pattern));
 };
 rejects(r=>r.expansion.edition='v10',/missing V11 edition/);
 rejects(r=>delete r.expansion.reviewLimit.zh,/bilingual review scope/);
 rejects(r=>delete r.sources[0].retrieval,/source access/);
 rejects(r=>r.relatedIds=[r.relatedIds[0]],/connected reading/);
 rejects(r=>r.milestones[0].year=r.end+1,/outside focus or out of order/);
 rejects(r=>delete r.milestones[0].location.label,/place meaning/);
 rejects(r=>r.timeline={level:'major'},/only political/);
});

test('source follow-ups expose inspected evidence without changing released narrative or geography',()=>{
 const reviews=read(manifest.evidenceReviewsFile),snapshot=JSON.stringify(all);
 const result=applyEvidenceReviews(all,reviews);
 assert.equal(JSON.stringify(all),snapshot,'released inputs must not be mutated');
 assert.equal(result.length,all.length);
 for(const review of reviews){
  const original=byId.get(review.recordId),updated=result.find(r=>r.id===review.recordId);
  for(const key of ['id','title','start','end','summary','dateNote','location','relatedIds'])assert.deepEqual(updated[key],original[key],key);
  assert.deepEqual(updated.sources.slice(0,original.sources.length),original.sources);
  for(const source of review.sources)assert.ok(updated.sources.some(s=>s.url===source.url&&s.retrieval===source.retrieval));
  assert.deepEqual(updated.expansion.reviewLimit,review.reviewLimit);
  assert.deepEqual(updated.evidenceReviews.at(-1).previousReviewLimit,original.expansion.reviewLimit);
 }
 assert.equal(result.find(r=>r.id==='person-lesia-ukrainka'),byId.get('person-lesia-ukrainka'),'unreviewed records stay intact');
});

test('source follow-ups reject unknown targets, duplicate citations and incomplete access scope',()=>{
 const review=read(manifest.evidenceReviewsFile)[0];
 assert.throws(()=>applyEvidenceReviews(all,[{...review,recordId:'absent-record'}]),/Unknown or duplicate/);
 assert.throws(()=>applyEvidenceReviews(all,[review,review]),/Unknown or duplicate/);
 assert.throws(()=>applyEvidenceReviews(all,[{...review,sources:[byId.get(review.recordId).sources[0]]}]),/duplicate follow-up source/);
 assert.throws(()=>applyEvidenceReviews(all,[{...review,reviewLimit:{en:'Only English'}}]),/incomplete evidence follow-up/);
 assert.throws(()=>applyEvidenceReviews(all,[{...review,sources:[{...review.sources[0],retrieval:''}]}]),/invalid or duplicate follow-up source/);
 assert.throws(()=>applyEvidenceReviews(all,[{...review,sources:[{...review.sources[0],url:'https://user:secret@example.com/doc'}]}]),/invalid or duplicate follow-up source/);
});
