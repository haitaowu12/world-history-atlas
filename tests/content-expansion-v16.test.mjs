import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditExpansion} from '../dist/content-expansion.mjs';
import {validateRecords} from '../dist/core.mjs';
import {journeys} from '../dist/journeys.mjs';
import {buildReadingCatalog} from '../dist/reading-catalog.mjs';
import {readingStepYear} from '../dist/americas-history.mjs';

const bytes=file=>fs.readFileSync(new URL('../dist/data/'+file,import.meta.url));
const read=file=>JSON.parse(bytes(file));
const sha256=value=>createHash('sha256').update(value).digest('hex');
const prior=read('content-expansion-v15.json'),manifest=read('content-expansion-v16.json');
const expansion=manifest.files.flatMap(file=>read(file.file));
const fresh=manifest.addition.files.flatMap(read);
const base=[...['history.json','people.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read),...read('china-import-manifest.json').eventFiles.flatMap(file=>read(file.path))];
const all=[...base,...expansion],byId=new Map(all.map(record=>[record.id,record]));
const courses=read(manifest.coursesFile),studies=read('story-readings-v16.json');
const bilingual=(value,label)=>{for(const lang of ['en','zh'])assert.ok(typeof value?.[lang]==='string'&&value[lang].trim(),label+' '+lang);};
const historicalSources=record=>record.sources.filter(source=>!/(^|\.)github\.com$/.test(new URL(source.url).hostname));
const inspected=source=>{
 assert.equal(new URL(source.url).protocol,'https:',source.url);
 for(const field of ['title','publisher','evidenceNote','evidenceNoteZh'])assert.ok(source[field]?.trim(),source.url+' '+field);
 assert.equal(source.checkedAt,'2026-11-09',source.url+' review date');
 assert.match(source.retrieval,/^opened-page(?:-|$)/,source.url+' inspected passage disclosure');
};

// Receipts from the published V15 checkout, independent of the V16 generator.
const frozen={
 'content-expansion-v15.json':'6bbc7a176326b1d8035b2e3f7aa5c10d6ea5d919fcf50ed7c31394cc6f6fdb31',
 'expansion-courses-v15.json':'932b9f6d356b6b0c9809e126723ba52fe6b3e006f35b476d8d36a8872a945f99',
 'evidence-followups-v11.json':'b384895cc88989d50a3f1e502b5035c3e3d6b95f6962e206b7fa23dd9c7f8cb5'
};

test('the V16 checkpoint preserves the frozen V15 inputs and descriptors',()=>{
 assert.equal(manifest.baseline.manifest,'content-expansion-v15.json');
 for(const [file,hash] of Object.entries(frozen))assert.equal(sha256(bytes(file)),hash,file+' frozen receipt');
 for(const file of prior.files)assert.deepEqual(manifest.files.find(item=>item.file===file.file),file,file.file+' prior descriptor');
 assert.equal(new Set(manifest.files.map(file=>file.file)).size,manifest.files.length,'unique input shards');
 for(const file of manifest.files){
  const content=bytes(file.file);
  assert.equal(sha256(content),file.sha256,file.file+' hash');
  assert.equal(content.length,file.bytes,file.file+' bytes');
  assert.equal(JSON.parse(content).length,file.records,file.file+' record count');
 }
 assert.equal(manifest.evidenceReviewsFile,prior.evidenceReviewsFile);
 assert.deepEqual(manifest.workstreams,prior.workstreams);
 for(const old of read(prior.coursesFile))assert.deepEqual(courses.find(course=>course.id===old.id),old,old.id+' unchanged reading and shared stop order');
});

test('V16 manifest totals describe the actual fourteen additions and complete runtime corpus',()=>{
 assert.deepEqual(manifest.addition.files,['expansion-china-stories-v16.json','expansion-world-stories-v16.json']);
 assert.deepEqual(manifest.files.filter(file=>!prior.files.some(old=>old.file===file.file)).map(file=>file.file),manifest.addition.files);
 assert.equal(fresh.length,14);
 assert.deepEqual(new Set(fresh.map(record=>record.id)),new Set(manifest.addition.recordIds));
 assert.equal(new Set(fresh.map(record=>record.id)).size,fresh.length);
 for(const [rows,totals] of [[fresh,manifest.addition],[expansion,manifest.counts]]){
  assert.equal(totals.records,rows.length);
  assert.equal(totals.biographies,rows.filter(record=>record.kind==='person').length);
  assert.equal(totals.biographyMilestones,rows.reduce((count,record)=>count+(record.milestones?.length||0),0));
  assert.equal(totals.politicalOverviews,rows.filter(record=>record.kind==='polity').length);
  assert.equal(totals.sourceURLs,new Set(rows.flatMap(record=>record.sources.map(source=>source.url))).size);
 }
 assert.equal(manifest.baseline.records,base.length+prior.counts.records,'includes donor and civilization story files');
 assert.equal(all.length,manifest.baseline.records+manifest.addition.records);
 assert.equal(byId.size,all.length,'unique IDs across base, import and all expansion files');
 assert.equal(manifest.counts.readingPaths,courses.length);
 assert.deepEqual(manifest.counts.releases,Object.fromEntries([...new Set(expansion.map(record=>record.expansion.release))].map(release=>[release,expansion.filter(record=>record.expansion.release===release).length])));
 assert.deepEqual(validateRecords(all),[]);
 assert.deepEqual(auditExpansion(expansion,manifest,all),[]);
});

test('all new stories retain bilingual review limits and inspected historical evidence beyond donor attribution',()=>{
 assert.equal(manifest.addition.release,10);assert.equal(manifest.addition.edition,'v16');
 for(const record of fresh){
  assert.equal(record.expansion.release,10,record.id);assert.equal(record.expansion.edition,'v16',record.id);
  for(const field of ['title','summary','dateNote'])bilingual(record[field],record.id+' '+field);
  bilingual(record.expansion.reviewLimit,record.id+' review limit');
  assert.ok(record.expansion.sourceReview?.trim(),record.id+' review disclosure');
  const sources=historicalSources(record);
  assert.ok(sources.length>0,record.id+' must not rely solely on a donor repository');
  // Offline checks retain the recorded evidence contract; they do not certify a source's historical claims.
  for(const source of sources)inspected(source);
  assert.ok(record.relatedIds.length>=2&&record.relatedIds.every(id=>byId.has(id)&&id!==record.id),record.id+' connected readings');
 }
});

test('the four earlier China stories preserve corrected dates, independent historical sources and donor credit',()=>{
 const expected={
  'china-fengtian-refuge-783':[783,783],
  'china-chu-jingnan-927':[927,928],
  'china-classics-printing-932':[932,953],
  'china-salt-iron-debate-81bce':[-81,-81]
 };
 const revised=read('china-donor-stories.json');
 assert.deepEqual(new Set(revised.map(record=>record.id)),new Set(Object.keys(expected)));
 for(const record of revised){
  assert.deepEqual([record.start,record.end],expected[record.id],record.id);
  bilingual(record.dateNote,record.id+' date meaning');bilingual(record.reviewNote,record.id+' review note');
  const sources=historicalSources(record);assert.ok(sources.length>=2,record.id+' historical evidence');
  for(const source of sources)inspected(source);
  const credit=record.sources.find(source=>source.url==='https://github.com/DeanChensj/jiangshan-map/pull/229');
  assert.ok(credit,record.id+' donor topic credit');
  assert.match(credit.evidenceNote,/not.*independent/i);assert.ok(credit.evidenceNoteZh?.trim());
 }
 const chu=byId.get('china-chu-jingnan-927'),printing=byId.get('china-classics-printing-932');
 for(const lang of ['en','zh']){
  assert.match(chu.summary[lang],/907[\s\S]*927/,'earlier title distinguished from investiture');
  assert.match(printing.summary[lang],/932[\s\S]*953/,'commission distinguished from completion');
 }
 for(const volume of [277,291])assert.ok(printing.sources.some(source=>decodeURIComponent(new URL(source.url).pathname).endsWith('/資治通鑑/卷'+volume)),'dated chronicle passage '+volume);
 assert.doesNotMatch(byId.get('china-fengtian-refuge-783').summary.en,/\bpromised\b/i,'expected reward is not an evidenced promise');
});

test('three new reading identities and episode years resolve through the current catalogue',()=>{
 const expected=['course-objects-world-stories','course-anshi-witnesses','course-books-poems-public-life'];
 assert.equal(studies.length,3);assert.deepEqual(new Set(studies.map(study=>study.id)),new Set(expected));
 const oldCourses=read(prior.coursesFile),oldIds=new Set(oldCourses.map(course=>course.id));
 assert.deepEqual(new Set(courses.filter(course=>!oldIds.has(course.id)).map(course=>course.id)),new Set(expected));
 const paths=buildReadingCatalog(journeys,[...read('courses.json'),...courses],byId);
 for(const study of studies){
  assert.deepEqual(courses.find(course=>course.id===study.id),study,study.id+' generated reading');
  const path=paths.find(item=>item.id===study.id);assert.ok(path,study.id);
  assert.deepEqual(path.stops,study.recordIds);assert.deepEqual(path.routeIds,[]);
  bilingual(study.title,study.id+' title');bilingual(study.activity,study.id+' activity');
  for(const question of study.questions)bilingual(question,study.id+' question');
  for(const id of path.stops){
   const record=byId.get(id),year=path.mapYears[id];assert.ok(record,study.id+' '+id);
   assert.ok(Number.isInteger(year)&&record.start<=year&&year<=record.end,study.id+' valid episode year '+id);
   assert.equal(readingStepYear(path,record,null),year,study.id+' map anchor '+id);
  }
 }
});
