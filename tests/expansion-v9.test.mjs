import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditExpansion,partitionExpansion,expansionCoverage} from '../dist/content-expansion.mjs';
import {validateRecords,stateFromHash,hashFromState,activeAt} from '../dist/core.mjs';
import {politicalTimelineRecords} from '../dist/political-timeline.mjs';
import {buildDiscoveryIndex} from '../dist/discovery.mjs';
import {hydroVisible,waterFeatures,corridorFeatures} from '../dist/inherited-geography.mjs';
const read=f=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+f,import.meta.url),'utf8'));
const manifest=read('content-expansion-v9.json'),extra=manifest.files.flatMap(f=>read(f.file));
const base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read);
const china=read('china-import-manifest.json');base.push(...china.eventFiles.flatMap(f=>read(f.path)));
const all=[...base,...extra],courses=read(manifest.coursesFile);

test('every planned workstream and release is represented in the published data',()=>{
 const plan=fs.readFileSync(new URL('../docs/CONTENT_EXPANSION_PLAN.md',import.meta.url),'utf8');
 const expected=[...plan.matchAll(/^\| ((?:AF|EA|CH|WA|SA|SE|NA|LA|OC|EU)\d) \|/gm)].map(m=>m[1]);
 assert.equal(expected.length,32);assert.deepEqual(new Set(manifest.workstreams.map(s=>s.id)),new Set(expected));
 assert.deepEqual(auditExpansion(extra,manifest,all),[]);assert.deepEqual(validateRecords(all),[]);
 for(const release of [1,2,3])assert.ok(extra.some(r=>r.expansion.release===release));
 assert.ok(expansionCoverage(extra,manifest.workstreams).every(s=>s.records>0));
});

test('manifest accounts for exact bytes and every expansion record without duplication',()=>{
 for(const f of manifest.files){const bytes=fs.readFileSync(new URL('../dist/data/'+f.file,import.meta.url));assert.equal(bytes.length,f.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),f.sha256);assert.equal(JSON.parse(bytes).length,f.records);assert.ok(bytes.length<450000,'split oversized public data files');}
 assert.equal(new Set(all.map(r=>r.id)).size,all.length);
});

test('biographies reach the shared People collection and event detail stays off the political timeline',()=>{
 const {histories,people}=partitionExpansion(extra);
 assert.ok(people.length>0&&histories.length>0);assert.ok(people.every(r=>r.kind==='person'));
 const sharedPeople=all.filter(r=>r.kind==='person');
 const index=buildDiscoveryIndex({records:all,people:sharedPeople,library:read('china-library.json')});
 for(const person of people)assert.ok(index.personById.has(person.id),person.id);
 assert.equal(index.people.length,206);
 assert.equal(index.personById.get('china-person-liqingzhao'),index.personById.get('china-person-li-qingzhao'));
 assert.ok(index.personById.get('china-person-liqingzhao').intervals.some(i=>i.meaning==='source-profile-span'));
 const timeline=politicalTimelineRecords(extra,{scope:'all'});assert.ok(timeline.every(r=>r.kind==='polity'));
 const secondary={...timeline[0],importance:5,timeline:{level:'secondary'}};
 assert.deepEqual(politicalTimelineRecords([secondary]),[]);assert.equal(politicalTimelineRecords([secondary],{scope:'all'}).length,1);
 const mutated=structuredClone(extra);mutated.find(r=>r.kind==='person').timeline={level:'major'};
 assert.ok(auditExpansion(mutated,manifest,all).some(e=>e.includes('only political')));
});

test('all regional reading paths and new share URLs resolve against the actual combined corpus',()=>{
 const ids=new Set(all.map(r=>r.id));assert.equal(courses.length,32);
 for(const c of courses){assert.ok(c.recordIds.length>=2);for(const id of c.recordIds)assert.ok(ids.has(id),id);assert.ok(c.questions.every(q=>q.en&&q.zh));}
 for(const r of extra){const state=stateFromHash(hashFromState({year:r.start,lang:'zh',mode:'all',region:r.region,theme:'all',entry:r.id,compare:[],savedOnly:false,query:''}),all);assert.equal(state.entry,r.id);assert.equal(state.lang,'zh');assert.ok(activeAt(r,state.year));}
 const bad=structuredClone(extra);bad[0].relatedIds=['missing-world-history-id'];assert.ok(auditExpansion(bad,manifest,all).some(e=>e.includes('broken related')));
});

test('water display boundaries and corridor end years follow their separate pinned source contracts',()=>{
 assert.equal(hydroVisible({appear:11,vanish:1048},11),true);assert.equal(hydroVisible({appear:11,vanish:1048},1048),false);assert.equal(hydroVisible({},0),false);
 const waterways=read('china-waterways-v9.json'),library=read('china-library.json');
 for(const y of [-403,11,69,70,1047,1048,1193,1194,1854,1855,2026]){
  const features=waterFeatures(waterways,y);assert.ok(features.length>0);assert.ok(features.every(f=>f.geometry.type==='MultiLineString'),'lake edges must not produce spherical fills');
  assert.ok(features.every(f=>hydroVisible(f.properties,y)));
 }
 for(const c of library.corridors){assert.ok(corridorFeatures([c],c.start).length);assert.ok(corridorFeatures([c],c.end).length);assert.equal(corridorFeatures([c],c.end+1).length,0);}
});

test('the held conflation resolves to separate supported places while raw import provenance survives',()=>{
 const reviews=read('china-reviews.json'),resolution=reviews.heldResolutions.find(r=>r.sourceId==='china-landmark-412');
 assert.ok(china.held.some(r=>r.id===resolution.sourceId));assert.equal(resolution.replacementIds.length,2);
 const replacements=resolution.replacementIds.map(id=>extra.find(r=>r.id===id));assert.ok(replacements.every(Boolean));
 assert.deepEqual(new Set(replacements.map(r=>r.region)),new Set(['south-asia','southeast-asia']));
 assert.ok(replacements.every(r=>r.location.lon<105),'neither replacement may use the Champa coast point');
 assert.ok(replacements.every(r=>r.sources.some(s=>s.access==='full-page-text')));
});
