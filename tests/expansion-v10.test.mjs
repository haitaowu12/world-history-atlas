import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion,partitionExpansion} from '../dist/content-expansion.mjs';
import {filterRecords,defaultState,relatedRecords,stateFromHash,hashFromState} from '../dist/core.mjs';
import {buildDiscoveryIndex,searchDiscovery} from '../dist/discovery.mjs';
import {politicalTimelineRecords} from '../dist/political-timeline.mjs';

const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const prior=read('content-expansion-v9.json'),manifest=read(CONTENT_MANIFEST);
const expansion=manifest.files.flatMap(file=>read(file.file));
const additions=expansion.filter(record=>record.expansion?.edition==='v10');
const base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read);
base.push(...read('china-import-manifest.json').eventFiles.flatMap(file=>read(file.path)));
const all=[...base,...expansion],byId=new Map(all.map(record=>[record.id,record]));

test('V10 current manifest preserves every V9 file and accounts for the new inventory',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v10.json');
 for(const file of prior.files)assert.deepEqual(manifest.files.find(item=>item.file===file.file),file);
 for(const file of manifest.files){
  const bytes=fs.readFileSync(new URL('../dist/data/'+file.file,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256,file.file);
  assert.equal(bytes.length,file.bytes);assert.equal(JSON.parse(bytes).length,file.records);
  assert.ok(bytes.length<450000);
 }
 assert.equal(byId.size,all.length);
 assert.equal(all.length,manifest.baseline.records+manifest.addition.records);
 assert.deepEqual(new Set(additions.map(record=>record.id)),new Set(manifest.addition.recordIds));
 assert.deepEqual(new Set(additions.map(record=>record.region)),new Set(['africa','west-central-asia','europe','south-asia','east-asia','southeast-asia','north-america','latin-america','oceania']));
 assert.deepEqual(auditExpansion(expansion,manifest,all),[]);
});

test('new biographies are found in both languages and preserve inherited People identities',()=>{
 const people=all.filter(record=>record.kind==='person');
 const index=buildDiscoveryIndex({records:all,people,library:read('china-library.json')});
 const fresh=partitionExpansion(additions).people;
 assert.equal(fresh.length,manifest.addition.biographies);
 assert.equal(index.people.length,206+fresh.length);
 for(const person of fresh)for(const lang of ['en','zh']){
  assert.ok(searchDiscovery(index,person.name[lang],{kind:'person'}).some(row=>row.id===person.id),person.id+' '+lang);
  assert.ok(filterRecords(all,{...defaultState(),mode:'all',query:person.name[lang]}).some(row=>row.id===person.id));
 }
 for(const person of fresh){
  for(const id of person.relatedIds)assert.ok(index.personById.get(person.id).recordIds.includes(id),person.id+' curated reading');
  for(const alias of person.aliases||[])assert.ok(searchDiscovery(index,alias,{kind:'person'}).some(row=>row.id===person.id),person.id+' alias '+alias);
 }
 assert.equal(index.personById.get('china-person-liqingzhao'),index.personById.get('china-person-li-qingzhao'));
 assert.equal(index.personById.get('china-person-xuanzang'),index.personById.get('person-xuanzang'));
});

test('new reading links work in both directions and biography shares retain their focus year',()=>{
 for(const record of additions){
  for(const id of record.relatedIds){
   assert.ok(byId.has(id),id);
   assert.ok(relatedRecords(all,byId.get(id)).some(row=>row.id===record.id),id+' reverse link');
  }
  for(const lang of ['en','zh']){
   const state={...defaultState(),year:record.start,mode:'all',lang,entry:record.id};
   const restored=stateFromHash(hashFromState(state),all);
   assert.equal(restored.entry,record.id);assert.equal(restored.year,record.start);assert.equal(restored.lang,lang);
  }
 }
 const oldCourses=read(prior.coursesFile),courses=read(manifest.coursesFile);
 assert.deepEqual(courses.map(course=>course.id),oldCourses.map(course=>course.id));
 for(const old of oldCourses){
  const updated=courses.find(course=>course.id===old.id);
  for(const id of old.recordIds)assert.ok(updated.recordIds.includes(id),old.id+' lost '+id);
 }
 for(const record of additions)for(const stream of record.expansion.workstreams)
  assert.ok(courses.find(course=>course.workstream===stream)?.recordIds.includes(record.id),record.id+' reading path');
});

test('biographical and social detail cannot add political timeline bars',()=>{
 const priorRows=prior.files.flatMap(file=>read(file.file));
 const expected=politicalTimelineRecords([...base,...priorRows],{scope:'all'}).map(row=>row.id);
 const addedPolities=additions.filter(record=>record.kind==='polity');
 const actual=politicalTimelineRecords(all,{scope:'all'});
 assert.ok(actual.every(record=>record.kind==='polity'));
 assert.deepEqual(new Set(actual.map(row=>row.id)),new Set([...expected,...politicalTimelineRecords(addedPolities,{scope:'all'}).map(row=>row.id)]));
 for(const record of additions.filter(record=>record.kind!=='polity'))assert.ok(!actual.some(row=>row.id===record.id));
});

test('V10 audit rejects missing evidence disclosure and invalid biography sequencing',()=>{
 const person=additions.find(record=>record.kind==='person');
 const check=change=>{
  const changed=structuredClone(expansion),row=changed.find(record=>record.id===person.id);change(row);
  return auditExpansion(changed,manifest,all);
 };
 assert.ok(check(row=>delete row.expansion.reviewLimit.zh).some(error=>error.includes('bilingual review scope')));
 assert.ok(check(row=>delete row.sources[0].retrieval).some(error=>error.includes('source access')));
 assert.ok(check(row=>row.milestones[0].year=row.end+1).some(error=>error.includes('outside focus or out of order')));
 assert.ok(check(row=>delete row.milestones[0].location.label).some(error=>error.includes('place meaning')));
 assert.ok(check(row=>row.relatedIds=['missing-entry','missing-entry-two']).some(error=>error.includes('broken related')));
 assert.ok(check(row=>row.timeline={level:'major'}).some(error=>error.includes('only political')));
});
