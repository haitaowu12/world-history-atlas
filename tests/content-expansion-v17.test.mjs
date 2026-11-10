import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion,applyEvidenceReviews,hasReviewedLimitedChronology} from '../dist/content-expansion.mjs';
import {validateRecords} from '../dist/core.mjs';
import {buildDiscoveryIndex} from '../dist/discovery.mjs';
import {buildReadingCatalog} from '../dist/reading-catalog.mjs';
import {readingStepYear} from '../dist/americas-history.mjs';
import {journeys} from '../dist/journeys.mjs';

const bytes=file=>fs.readFileSync(new URL('../dist/data/'+file,import.meta.url));
const read=file=>JSON.parse(bytes(file));
const hash=value=>createHash('sha256').update(value).digest('hex');
const prior=read('content-expansion-v16.json'),manifest=read('content-expansion-v17.json');
const expansion=manifest.files.flatMap(f=>read(f.file));
const fresh=manifest.addition.files.flatMap(read);
const base=['history.json','people.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read);
base.push(...read('china-import-manifest.json').eventFiles.flatMap(f=>read(f.path)));
const all=applyEvidenceReviews([...base,...expansion],read(manifest.evidenceReviewsFile));
const byId=new Map(all.map(r=>[r.id,r]));
const library=read('china-library.json'),courses=read(manifest.coursesFile);
const bilingual=(value,label)=>{for(const lang of ['en','zh'])assert.ok(typeof value?.[lang]==='string'&&value[lang].trim(),label+' '+lang);};

// Independent byte receipts taken from main 3849fb8 before V17 activation.
const frozen={
 'content-expansion-v16.json':'ea192ebf2b9d4cea92659b686f818a8779cc6dd2a5cafe3a5edc88bcc6ce5127',
 'expansion-courses-v16.json':'479793655e534f0a21c8829c53b27f6ec5f2f2e9b4faa01f1dbaf81aeb8df56a',
 'history-media.json':'2a1b4f6fc8999719d1e9bbf8b5c9ff9f4921288a436aa1078b7aec7b7fa02463',
 'china-library.json':'bcbad8ffb67ed93af138030d61e325a87e87097af9343d38f742cd686160c325'
};

test('V17 activates without rewriting published V16 content, reference identities or media',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v17.json');
 assert.equal(manifest.version,'0.23.0');
 assert.equal(manifest.baseline.manifest,'content-expansion-v16.json');
 assert.equal(manifest.baseline.localCommit,'3849fb809e9340e0a06ffa9329c0cdcdb3f733a0');
 for(const [file,sha] of Object.entries(frozen))assert.equal(hash(bytes(file)),sha,file);
 for(const file of prior.files)assert.deepEqual(manifest.files.find(f=>f.file===file.file),file,file.file);
 for(const file of manifest.files){
  const content=bytes(file.file);
  assert.equal(hash(content),file.sha256,file.file+' hash');
  assert.equal(content.length,file.bytes,file.file+' size');
  assert.equal(JSON.parse(content).length,file.records,file.file+' count');
  assert.ok(content.length<=450000,file.file+' response budget');
 }
 assert.deepEqual(manifest.workstreams,prior.workstreams);
 const media=read(manifest.mediaFile);
 assert.equal(media.items.length,29);
 for(const item of read('history-media.json').items)assert.deepEqual(media.items.find(x=>x.id===item.id),item,item.id+' published credit');
});

test('the entire 101-profile backlog becomes biographies without duplicating the 278-person directory',()=>{
 assert.equal(fresh.length,148);
 const people=fresh.filter(r=>r.kind==='person'),stories=fresh.filter(r=>r.kind!=='person');
 assert.equal(people.length,101);assert.equal(stories.length,47);
 assert.equal(all.length,2084);assert.equal(byId.size,all.length);
 assert.equal(all.filter(r=>r.kind==='person').length,278);
 assert.deepEqual(manifest.runtimeCounts,{records:2084,biographies:278,people:278,guidedReadings:103});
 assert.equal(manifest.baseline.records,1936);
 assert.equal(manifest.addition.records,fresh.length);
 assert.equal(manifest.addition.biographies,people.length);
 assert.equal(manifest.addition.biographyMilestones,people.reduce((n,r)=>n+r.milestones.length,0));
 assert.deepEqual(new Set(manifest.addition.recordIds),new Set(fresh.map(r=>r.id)));
 const previouslyLinked=new Set(['china-person-xuanzang','china-person-zhenghe','china-person-liqingzhao']);
 for(const profile of library.profiles.filter(p=>!previouslyLinked.has(p.id))){
  const person=byId.get(profile.id);assert.ok(person,profile.id);
  assert.equal(person.sourceProfileId,profile.id);assert.deepEqual(person.name,profile.name);
 }
 const directory=buildDiscoveryIndex({records:all,library});
 assert.equal(directory.people.length,278);
 assert.ok(directory.people.every(person=>byId.get(person.recordId)?.kind==='person'),'no profile-only people remain');
 for(const profile of library.profiles){
  const entry=directory.personById.get(profile.id);assert.ok(entry?.recordId,profile.id);
  assert.ok(entry.profileIds.includes(profile.id));
  assert.ok(entry.intervals.some(span=>span.meaning==='source-profile-span'&&span.start===profile.span[0]&&span.end===profile.span[1]),profile.id+' inherited interval retained separately');
 }
});

test('new narratives retain bilingual places, inspected source notes, connected records and reviewed chronology limits',()=>{
 assert.deepEqual(validateRecords(all),[]);
 assert.deepEqual(auditExpansion(expansion,manifest,all),[]);
 const expectedExceptions=new Set(['china-person-mengzi','china-person-sunbin','china-person-quyuan','china-person-wangxizhi','china-person-taoyuanming','china-person-chensheng']);
 const actualExceptions=new Set(fresh.filter(hasReviewedLimitedChronology).map(r=>r.id));
 assert.deepEqual(actualExceptions,expectedExceptions);
 assert.deepEqual(new Set(manifest.chronologyExceptions.map(r=>r.recordId)),expectedExceptions);
 for(const record of fresh){
  assert.equal(record.expansion.release,11);assert.equal(record.expansion.edition,'v17');
  for(const field of ['title','summary','dateNote'])bilingual(record[field],record.id+' '+field);
  bilingual(record.expansion.reviewLimit,record.id+' review limit');
  assert.ok(record.relatedIds.length>=2&&record.relatedIds.every(id=>byId.has(id)&&id!==record.id),record.id+' related reading');
  for(const location of [record.location,...(record.milestones||[]).map(m=>m.location)])bilingual(location.labelI18n,record.id+' place');
  const sources=record.sources.filter(s=>new URL(s.url).hostname!=='github.com');
  assert.ok(sources.length,record.id+' historical evidence beyond donor credit');
  for(const source of sources){
   assert.equal(new URL(source.url).protocol,'https:',source.url);
   for(const field of ['title','publisher','evidenceNote','evidenceNoteZh'])assert.ok(source[field]?.trim(),record.id+' '+field);
   assert.equal(source.checkedAt,'2026-11-09');
   assert.match(source.retrieval,/^(opened|downloaded)-[a-z]/i,source.url+' recorded inspection method');
   assert.doesNotMatch(source.retrieval,/search[- ]?snippet|indexed-only/i,source.url+' inspected evidence beyond indexing');
  }
 }
 // These are offline evidence-contract checks, not independent certification of historical claims.
});

test('thirty new readings connect the expanded material while old shared steps remain unchanged',()=>{
 const oldCourses=read(prior.coursesFile),oldIds=new Set(oldCourses.map(c=>c.id));
 for(const old of oldCourses)assert.deepEqual(courses.find(c=>c.id===old.id),old,old.id+' shared step order');
 const studies=courses.filter(c=>!oldIds.has(c.id));
 assert.equal(studies.length,30);assert.equal(courses.length,80);
 assert.equal(manifest.counts.readingPaths,courses.length);
 assert.equal(new Set(courses.map(c=>c.id)).size,courses.length);
 const paths=buildReadingCatalog(journeys,[...read('courses.json'),...courses],byId);
 assert.equal(paths.length,103,'includes the sixteen base courses and seven existing journeys');
 for(const study of studies){
  const path=paths.find(p=>p.id===study.id);assert.ok(path,study.id);
  assert.deepEqual(path.stops,study.recordIds);assert.deepEqual(path.routeIds,[]);
  bilingual(study.title,study.id+' title');bilingual(study.activity,study.id+' activity');
  assert.ok(study.recordIds.some(id=>fresh.some(r=>r.id===id)),study.id+' new material');
  for(const question of study.questions)bilingual(question,study.id+' question');
  for(const id of path.stops){
   const record=byId.get(id),year=path.mapYears[id];assert.ok(record,study.id+' '+id);
   assert.ok(Number.isInteger(year)&&record.start<=year&&year<=record.end,study.id+' date '+id);
   assert.equal(readingStepYear(path,record,null),year,study.id+' map anchor '+id);
  }
 }
});
