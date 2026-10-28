import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {defaultState,filterRecords,validYear} from '../dist/core.mjs';
const bytes=f=>fs.readFileSync(new URL('../dist/data/'+f,import.meta.url));
const read=f=>JSON.parse(bytes(f));
const sha=b=>createHash('sha256').update(b).digest('hex');
const manifest=read('content-expansion-v14.json');
const all=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json',...manifest.files.map(f=>f.file)].flatMap(read);
const rows=read('expansion-indus-religions-indigenous-v14.json');
const by=new Map(all.map(r=>[r.id,r]));
const get=id=>{const r=by.get(id);assert.ok(r,'missing '+id);return r;};

test('the published narrative inputs and historical map remain frozen',()=>{
 const base=JSON.parse(fs.readFileSync(new URL('../docs/INDUS_RELIGIONS_INDIGENOUS_BASELINE_2026_10_27.json',import.meta.url)));
 assert.equal(base.records,1891);assert.equal(base.readingPaths,40);
 for(const old of base.contentFiles){assert.deepEqual(manifest.files.find(f=>f.file===old.file),old);assert.equal(sha(bytes(old.file)),old.sha256);}
 assert.equal(sha(bytes('map-snapshots.json')),base.mapManifestSha256);
 for(const r of rows){
  assert.ok(validYear(r.start)&&validYear(r.end)&&r.start<=r.end,r.id);
  assert.equal(r.locationPrecision,'representative');
  assert.ok(r.summary.en&&r.summary.zh&&r.dateNote.en&&r.dateNote.zh,r.id);
  assert.ok(r.relatedIds.length>=2&&r.relatedIds.every(id=>by.has(id)),r.id);
  assert.ok(r.sources.length&&r.sources.every(s=>s.url.startsWith('https://')&&s.evidenceNote&&s.checkedAt&&s.retrieval),r.id);
  assert.ok(!r.geometry&&!r.route,'narrative points do not authorize map geometry');
 }
});

test('Indus dates distinguish urbanism and regional post-urban change',()=>{
 const urban=get('indus-civilization-urban-networks'),after=get('indus-post-urban-transformations');
 assert.deepEqual([urban.start,urban.end],[-2600,-1900]);
 assert.deepEqual([after.start,after.end],[-1900,-1600]);
 assert.match(urban.summary.en,/do not prove.*one centrally ruled empire/);
 assert.match(after.summary.en,/settlement did not simply stop/);
 for(const r of [urban,after])assert.equal(r.regionalAssociation,'omit-broad-point');
});

test('broad representative markers do not imply modern subdivision history',()=>{
 const excluded=new Set(rows.filter(r=>r.regionalAssociation==='omit-broad-point').map(r=>r.id));
 for(const filename of [manifest.regionalHistoryFile,manifest.geographicIndexFile]){
  const index=read(filename);
  for(const links of Object.values(index.areas))for(const link of links)assert.ok(!excluded.has(link.recordId),link.recordId+' was assigned to a modern subdivision');
 }
});

test('three reading paths use valid chronological anchors and bilingual prompts',()=>{
 const guides=read('indus-religions-indigenous-studies-v14.json'),courses=read(manifest.coursesFile);
 assert.equal(guides.length,3);
 for(const guide of guides){
  assert.ok(courses.some(c=>c.id===guide.id));let prior=-Infinity;
  for(const id of guide.recordIds){const r=get(id),year=guide.mapYears[id];assert.ok(year>=r.start&&year<=r.end,guide.id+': '+id);assert.ok(year>=prior,guide.id+': order');prior=year;}
  assert.ok(guide.questions.every(q=>q.en&&q.zh));
 }
});

test('Indigenous and Hindu accounts distinguish focus windows from living communities',()=>{
 const arctic=get('sivullirmiut-early-arctic-history'),nations=get('indigenous-north-america-nations-continuity'),hindu=get('hinduism-living-traditions');
 assert.deepEqual([arctic.start,arctic.end],[-3000,-3000]);
 assert.match(arctic.dateNote.en,/approximate.*not a precise/i);
 assert.match(arctic.summary.en,/do not themselves establish encounters/);
 assert.match(nations.dateNote.en,/not a founding date/);
 assert.match(nations.summary.en,/different community histories/);
 assert.match(hindu.dateNote.en,/not the origin or end/);
 assert.match(hindu.summary.en,/not define all Hindu beliefs/);
 for(const q of ['indus civilization','印度河文明','sivullirmiut','西乌利米乌特','indigenous north america','北美原住民','hinduism','印度教'])
  assert.ok(filterRecords(rows,{...defaultState(),mode:'all',query:q}).length,'search: '+q);
 for(const id of ['indigenous-north-america-nations-continuity','hinduism-living-traditions'])
  assert.ok(filterRecords([get(id)],{...defaultState(),mode:'year',year:2025}).length,id+' is not presented as ended');
});
