import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion,partitionExpansion,applyEvidenceReviews} from '../dist/content-expansion.mjs';
import {buildDiscoveryIndex,searchDiscovery} from '../dist/discovery.mjs';
import {defaultState,filterRecords,relatedRecords,stateFromHash,hashFromState} from '../dist/core.mjs';
import {politicalTimelineRecords} from '../dist/political-timeline.mjs';
import {applyChinaReviews,linkChinaContext} from '../dist/china-review.mjs';
import {buildAreaHistoryIndex,areaHistory} from '../dist/us-canada-reference.mjs';

const dataRoot=new URL('../dist/data/',import.meta.url);
const bytes=file=>fs.readFileSync(new URL(file,dataRoot));
const read=file=>JSON.parse(bytes(file));
const sha256=value=>createHash('sha256').update(value).digest('hex');
const prior=read('content-expansion-v11.json'),manifest=read('content-expansion-v12.json');
const expansion=manifest.files.flatMap(file=>read(file.file));
const fresh=expansion.filter(record=>record.expansion?.edition==='v12');
const biographies=partitionExpansion(fresh).people;
const historyFiles=['history.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'];
const baseHistories=historyFiles.flatMap(read),basePeople=read('people.json');
const imported=read('china-import-manifest.json').eventFiles.flatMap(file=>read(file.path));
const base=[...baseHistories,...basePeople,...imported];
const all=[...base,...expansion],byId=new Map(all.map(record=>[record.id,record]));

// Frozen V11 receipts are independent of the generated V12 manifest.
const frozen={
 'content-expansion-v11.json':'57ea3fe76cad60b5011a7c6a5146ddae6e55524eb346412088c5db6d8686d3ed',
 'expansion-courses-v11.json':'8a895a680c2752b49951238a22947fc3905bcb5d71db826df8233dc11397f84f',
 'evidence-followups-v11.json':'b384895cc88989d50a3f1e502b5035c3e3d6b95f6962e206b7fa23dd9c7f8cb5'
};

test('V12 selects the current manifest and preserves frozen V11 files and descriptors',()=>{
 assert.equal(manifest.version,'0.11.0');
 assert.deepEqual(manifest.baseline,{manifest:'content-expansion-v11.json',localCommit:'b762e906cfaf7450c95e90e9eb2275485d69f3f6',records:1837});
 for(const [file,hash]of Object.entries(frozen))assert.equal(sha256(bytes(file)),hash,file+' frozen V11 bytes');
 for(const file of prior.files)assert.deepEqual(manifest.files.find(item=>item.file===file.file),file,file.file+' prior descriptor');
 for(const file of manifest.files){
  const content=bytes(file.file),rows=JSON.parse(content);
  assert.equal(sha256(content),file.sha256,file.file+' hash');
  assert.equal(content.length,file.bytes,file.file+' bytes');
  assert.equal(rows.length,file.records,file.file+' records');
  assert.ok(content.length<450000,file.file+' shard budget');
 }
 assert.equal(manifest.evidenceReviewsFile,prior.evidenceReviewsFile,'source overlays remain inherited');
});

test('V12 adds exactly 26 North American records, 12 biographies and 57 milestones after the sourced Carver follow-up',()=>{
 assert.equal(manifest.addition.edition,'v12');assert.equal(manifest.addition.release,6);
 assert.deepEqual(manifest.addition.files,[
  'expansion-us-foundations-v12.json','expansion-canada-foundations-v12.json',
  'expansion-north-america-regions-v12.json','expansion-canada-coasts-v12.json'
 ]);
 assert.deepEqual(manifest.files.filter(file=>!prior.files.some(old=>old.file===file.file)).map(file=>file.file),manifest.addition.files);
 assert.deepEqual(manifest.addition.files.map(file=>read(file).length),[8,8,8,2]);
 assert.equal(fresh.length,26);assert.equal(manifest.addition.records,26);
 assert.equal(biographies.length,12);assert.equal(manifest.addition.biographies,12);
 assert.equal(fresh.reduce((n,row)=>n+(row.milestones?.length||0),0),57);
 assert.equal(manifest.addition.biographyMilestones,57);
 assert.equal(new Set(fresh.flatMap(row=>row.sources.map(source=>source.url))).size,37);
 assert.equal(manifest.addition.sourceURLs,37);
 assert.deepEqual(new Set(fresh.map(row=>row.region)),new Set(['north-america']));
 assert.deepEqual(new Set(fresh.map(row=>row.id)),new Set(manifest.addition.recordIds));
 assert.equal(byId.size,all.length,'no duplicate stable IDs across the corpus');
 assert.equal(all.length,1863);assert.equal(all.length,manifest.baseline.records+fresh.length);
 assert.ok(fresh.every(row=>row.expansion.release===6));
 assert.deepEqual(auditExpansion(expansion,manifest,all),[]);
});

test('V12 bilingual biographies are discoverable and connected histories resolve in both directions',()=>{
 const people=all.filter(row=>row.kind==='person');
 const index=buildDiscoveryIndex({records:all,people,library:read('china-library.json')});
 assert.equal(index.people.length,259+12);
 for(const person of biographies){
  for(const name of [person.name.en,person.name.zh,...(person.aliases||[])]){
   assert.ok(searchDiscovery(index,name,{kind:'person'}).some(row=>row.id===person.id),person.id+' discovery '+name);
   assert.ok(filterRecords(all,{...defaultState(),mode:'all',query:name}).some(row=>row.id===person.id),person.id+' atlas '+name);
  }
  assert.ok(fresh.some(row=>row.kind!=='person'&&person.relatedIds.includes(row.id)),person.id+' new contextual reading');
 }
 for(const row of fresh){
  for(const field of ['title','summary'])for(const lang of ['en','zh'])assert.ok(row[field]?.[lang]?.trim(),row.id+' '+field+' '+lang);
  assert.ok(row.relatedIds.length>=2,row.id+' connected reading');
  assert.ok(row.relatedIds.some(id=>!fresh.some(other=>other.id===id)),row.id+' connection to prior editions');
  for(const id of row.relatedIds){
   assert.ok(byId.has(id),row.id+' resolves '+id);
   assert.ok(relatedRecords(all,byId.get(id)).some(other=>other.id===row.id),row.id+' reverse reading');
  }
 }
});

test('V12 retains prior reading paths, stops and bilingual questions while adding current source exercises',()=>{
 const oldCourses=read(prior.coursesFile),courses=read(manifest.coursesFile);
 assert.deepEqual(courses.map(course=>course.id),oldCourses.map(course=>course.id));
 for(const old of oldCourses){
  const course=courses.find(item=>item.id===old.id);
  assert.equal(course.workstream,old.workstream);
  for(const id of old.recordIds)assert.ok(course.recordIds.includes(id),old.id+' lost stop '+id);
  for(const question of old.questions)assert.ok(course.questions.some(q=>q.en===question.en&&q.zh===question.zh),old.id+' lost bilingual question');
 }
 for(const row of fresh)for(const stream of row.expansion.workstreams){
  const course=courses.find(item=>item.workstream===stream);
  assert.ok(course?.recordIds.includes(row.id),row.id+' reading path '+stream);
  if(row.kind==='person')assert.ok(course.questions.some(q=>q.en.includes(row.title.en)&&q.zh.includes(row.title.zh)),row.id+' bilingual source exercise '+stream);
 }
});

test('V12 share links preserve selected focus and milestone years without adding political timelines',()=>{
 for(const row of fresh)for(const lang of ['en','zh']){
  for(const year of new Set([row.start,row.end,...(row.milestones||[]).map(m=>m.year)])){
   const restored=stateFromHash(hashFromState({...defaultState(),mode:'all',year,entry:row.id,lang}),all);
   assert.equal(restored.entry,row.id);assert.equal(restored.year,year);assert.equal(restored.lang,lang);
  }
 }
 assert.equal(manifest.addition.politicalOverviews,0);
 assert.ok(fresh.every(row=>row.kind!=='polity'&&!row.timeline));
 const oldRows=[...base,...prior.files.flatMap(file=>read(file.file))];
 assert.deepEqual(politicalTimelineRecords(all,{scope:'all'}).map(row=>row.id),politicalTimelineRecords(oldRows,{scope:'all'}).map(row=>row.id));
});

test('V12 rejects incomplete source access, bilingual review scope and unsupported life chronology',()=>{
 for(const person of biographies){
  const rejects=(change,pattern)=>{
   const changed=structuredClone(expansion),row=changed.find(item=>item.id===person.id);change(row);
   assert.ok(auditExpansion(changed,manifest,all).some(message=>message.startsWith(person.id+':')&&pattern.test(message)),person.id+' '+pattern);
  };
  rejects(row=>row.expansion.edition='v11',/missing V12 edition/);
  for(const lang of ['en','zh'])rejects(row=>delete row.expansion.reviewLimit[lang],/bilingual review scope/);
  rejects(row=>delete row.sources[0].retrieval,/source access/);
  rejects(row=>row.sources[0].retrieval='',/source access/);
  rejects(row=>delete row.sources[0].evidenceNote,/source evidence\/date/);
  rejects(row=>delete row.sources[0].checkedAt,/source evidence\/date/);
  rejects(row=>row.relatedIds=[row.relatedIds[0]],/connected reading/);
  rejects(row=>row.milestones[0].year=row.end+1,/outside focus or out of order/);
  rejects(row=>delete row.milestones[0].location.label,/place meaning/);
  rejects(row=>row.timeline={level:'major'},/only political/);
 }
});

test('V12 generated 64-area index matches runtime geometry and disclosed named-place associations',()=>{
 assert.equal(manifest.geographicReferenceFile,'us-canada-reference.json');
 assert.equal(manifest.geographicIndexFile,'us-canada-history-index-v12.json');
 assert.equal(manifest.geographicAssociationsFile,'us-canada-area-links-v12.json');
 const reference=read(manifest.geographicReferenceFile),generated=read(manifest.geographicIndexFile);
 const associations=read(manifest.geographicAssociationsFile);
 assert.equal(reference.role,'modern-reference');
 assert.equal(generated.schemaVersion,1);assert.equal(generated.contentVersion,manifest.version);
 assert.equal(generated.referenceRelease,reference.sourceRelease);
 const features=reference.layers.flatMap(layer=>read(layer.file).features);
 const split=partitionExpansion(expansion);
 const atlas=applyEvidenceReviews([...baseHistories,...split.histories,...basePeople,...split.people],read(manifest.evidenceReviewsFile));
 const reviewed=applyChinaReviews(imported,read('china-library.json'),read('china-reviews.json'));
 const runtime=[...atlas,...linkChinaContext(reviewed.events,atlas)];
 assert.equal(runtime.length,1863);
 const context={};
 vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),context);
 const expected=buildAreaHistoryIndex(runtime,features,context.d3.geoContains,associations);
 assert.equal(Object.keys(generated.areas).length,64);
 assert.deepEqual(Object.keys(generated.areas).sort(),features.map(feature=>feature.properties.id).sort());
 // Runtime groups histories and people separately; membership is independent
 // of that presentation order. Retain roles and dated milestone distinctions.
 const canonical=areas=>Object.fromEntries(Object.entries(areas).sort(([a],[b])=>a.localeCompare(b)).map(([id,links])=>[
  id,[...links].sort((a,b)=>a.recordId.localeCompare(b.recordId))
 ]));
 assert.deepEqual(canonical(generated.areas),canonical(expected));
 const runtimeById=new Map(runtime.map(row=>[row.id,row]));
 assert.equal(associations.length,22,'bounded reviewed coastal/island associations');
 assert.equal(new Set(associations.map(link=>link.recordId+'/'+link.areaId)).size,associations.length);
 for(const association of associations){
  assert.ok(runtimeById.has(association.recordId),association.recordId+' reviewed association target');
  assert.ok(features.some(feature=>feature.properties.id===association.areaId));
  for(const field of ['place','note'])for(const lang of ['en','zh'])assert.ok(association[field]?.[lang]?.trim(),association.recordId+' '+field+' '+lang);
  assert.match(association.checkedAt,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(association.sources.length>0,association.recordId+' association evidence');
  for(const source of association.sources){
   assert.equal(new URL(source.url).protocol,'https:');
   for(const field of ['title','publisher','checkedAt','evidenceNote'])assert.ok(source[field]?.trim(),association.recordId+' source '+field);
  }
  const link=generated.areas[association.areaId].find(item=>item.recordId===association.recordId);
  assert.ok(link?.roles.includes('editorial'),association.recordId+' explicit method');
  assert.deepEqual(link.locationAssociation,{place:association.place,note:association.note,sources:association.sources,checkedAt:association.checkedAt});
 }
 for(const [areaId,links]of Object.entries(generated.areas)){
  assert.equal(new Set(links.map(link=>link.recordId)).size,links.length,areaId+' unique membership');
  const feature=features.find(item=>item.properties.id===areaId);
  for(const link of links){
   const row=runtimeById.get(link.recordId);
   assert.equal(row?.region,'north-america',areaId+' record exists in the regional corpus');
   assert.ok(link.roles.every(role=>['representative','milestone','editorial'].includes(role)));
   if(link.roles.includes('editorial'))assert.ok(associations.some(association=>association.recordId===row.id&&association.areaId===areaId),row.id+' named-place provenance');
   else assert.equal(link.locationAssociation,undefined,row.id+' geometry alone does not assert editorial evidence');
   if(link.roles.includes('representative'))assert.ok(context.d3.geoContains(feature,[row.location.lon,row.location.lat]));
   for(const year of link.milestoneYears)assert.ok(row.milestones?.some(m=>m.year===year&&context.d3.geoContains(feature,[m.location.lon,m.location.lat])),areaId+' supported milestone '+year);
  }
 }
});

test('reviewed named-place associations filter by focus year, preserve inputs and reject ambiguous targets',()=>{
 const associations=read(manifest.geographicAssociationsFile);
 const association=associations.find(item=>item.recordId==='kinngait-cooperative-printmaking'&&item.areaId==='CA-NU');
 assert.ok(association,'Kinngait has a reviewed Nunavut named-place association');
 const records=[byId.get(association.recordId)];
 const reference=read(manifest.geographicReferenceFile);
 const features=reference.layers.flatMap(layer=>read(layer.file).features).filter(feature=>feature.properties.id===association.areaId);
 const input=[association],snapshot=JSON.stringify({records,features,input});
 const context={};
 vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),context);
 const index=buildAreaHistoryIndex(records,features,context.d3.geoContains,input);
 assert.deepEqual(index['CA-NU'][0].roles,['editorial'],'generalized coast omission remains distinguished from geometry');
 assert.deepEqual(index['CA-NU'][0].milestoneYears,[]);
 const record=records[0],ids=year=>areaHistory('CA-NU',index,records,{year}).map(row=>row.id);
 assert.deepEqual(ids(null),[record.id]);
 assert.deepEqual(ids(record.start),[record.id]);assert.deepEqual(ids(record.end),[record.id]);
 assert.deepEqual(ids(record.start-1),[]);assert.deepEqual(ids(record.end+1),[]);
 assert.equal(JSON.stringify({records,features,input}),snapshot,'association indexing preserves every source input');
 assert.throws(()=>buildAreaHistoryIndex(records,features,context.d3.geoContains,[{...association,recordId:'absent-record'}]));
 assert.throws(()=>buildAreaHistoryIndex(records,features,context.d3.geoContains,[{...association,areaId:'absent-area'}]));
 assert.throws(()=>buildAreaHistoryIndex(records,features,context.d3.geoContains,[association,association]));
});
