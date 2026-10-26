import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion} from '../dist/content-expansion.mjs';
import {defaultState,filterRecords} from '../dist/core.mjs';
import {appendRegionalHistory,referenceHistory} from '../dist/regional-reference.mjs';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {readingStepYear} from '../dist/americas-history.mjs';
const bytes=file=>fs.readFileSync(new URL('../dist/data/'+file,import.meta.url));
const read=file=>JSON.parse(bytes(file)),manifest=read(CONTENT_MANIFEST),prior=read('content-expansion-v12.json');
const fresh=read('expansion-regional-sequences-v13.json'),all=[...['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read),...read('china-import-manifest.json').eventFiles.flatMap(f=>read(f.path)),...manifest.files.flatMap(f=>read(f.file))];
const by=new Map(all.map(r=>[r.id,r]));
const courses=read(manifest.coursesFile),addition=read('regional-history-v13.json'),meta=read('regional-reference.json');
const features=meta.countries.filter(c=>['USA','CAN'].includes(c.code)).flatMap(c=>c.layers.flatMap(l=>read(l.file).features));
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);
test('V13 adds four connected lives without rewriting the V12 narrative checkpoint',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v13.json');assert.equal(manifest.version,'0.14.0');
 assert.equal(all.length,1871);assert.equal(by.size,1871);assert.equal(all.filter(r=>r.kind==='person').length,174);
 assert.equal(all.reduce((n,r)=>n+(r.milestones?.length||0),0),552);
 assert.equal(fresh.length,8);assert.equal(fresh.filter(r=>r.kind==='person').length,4);
 for(const f of prior.files){assert.deepEqual(manifest.files.find(x=>x.file===f.file),f);assert.equal(createHash('sha256').update(bytes(f.file)).digest('hex'),f.sha256);}
 assert.deepEqual(auditExpansion(manifest.files.flatMap(f=>read(f.file)),manifest,all),[]);
 for(const r of fresh){assert.ok(r.relatedIds.some(id=>!fresh.some(n=>n.id===id)));for(const lang of ['en','zh'])assert.ok(filterRecords(all,{...defaultState(),mode:'all',query:r.name?.[lang]||r.title[lang]}).some(n=>n.id===r.id));}
});
test('source disagreements survive in bilingual dates and milestones without invented routes',()=>{
 for(const id of ['person-rose-fortune','person-shingwaukonse','person-mungo-martin','person-susie-king-taylor']){
  const r=by.get(id);for(const lang of ['en','zh'])assert.ok(r.dateNote[lang].length>40);
  assert.equal(r.route,undefined);for(const m of r.milestones)assert.ok(m.location.labelI18n.zh&&m.location.labelI18n.en);
 }
 assert.match(by.get('person-rose-fortune').dateNote.en,/1867/);
 assert.match(by.get('person-shingwaukonse').milestones[2].description.en,/1832/);
 assert.match(by.get('person-mungo-martin').dateNote.en,/1881/);
 assert.match(by.get('person-susie-king-taylor').milestones.find(m=>m.year===1874).description.en,/return/i);
});
test('four short studies retain previous paths and validate episode map years',()=>{
 const short=read('regional-studies-v13.json');assert.equal(short.length,4);assert.equal(courses.length,36);
 for(const old of read(prior.coursesFile)){const n=courses.find(c=>c.id===old.id);for(const id of old.recordIds)assert.ok(n.recordIds.includes(id));for(const q of old.questions)assert.ok(n.questions.some(x=>x.en===q.en&&x.zh===q.zh));}
 for(const c of short){assert.ok(c.recordIds.length<=5);for(const id of c.recordIds){const r=by.get(id),year=c.mapYears[id];assert.ok(r);assert.ok(r.start<=year&&year<=r.end);assert.equal(readingStepYear(c,r,1931),year);}}
});
test('new regional navigation derives from unchanged geometry with explicit coastal associations',()=>{
 const expected=buildAreaHistoryIndex(fresh,features,ctx.d3.geoContains,read('regional-area-links-v13.json'));
 assert.deepEqual(addition.areas,Object.fromEntries(Object.entries(expected).filter(([,v])=>v.length)));
 const before=JSON.stringify(features),merged=appendRegionalHistory(features,addition);assert.equal(JSON.stringify(features),before);
 const ids=area=>referenceHistory(merged.find(f=>f.properties.id===area),all).map(r=>r.id);
 assert.ok(ids('CA-NS').includes('person-rose-fortune'));assert.ok(ids('CA-ON').includes('shingwauk-teaching-vision-institutions'));assert.ok(ids('CA-BC').includes('person-mungo-martin'));assert.ok(ids('US-SC').includes('camp-saxton-freedom-community'));
 assert.equal(addition.areas['US-MI'],undefined,'Canadian Sault town context does not become a Michigan pin');
 assert.ok(addition.areas['CA-BC'].find(l=>l.recordId==='person-mungo-martin').roles.includes('editorial'));
 assert.throws(()=>appendRegionalHistory(merged,addition),/Duplicate/);
});
