import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import {createHash} from 'node:crypto';
import {historicalContextFeatures} from '../dist/atlas-model.mjs';
import {historicalCollection,historicalMetadata} from './map-fixtures.mjs';
import {CONTENT_MANIFEST,auditExpansion} from '../dist/content-expansion.mjs';
const bytes=f=>fs.readFileSync(new URL('../dist/data/'+f,import.meta.url));const read=f=>JSON.parse(bytes(f));
const all=historicalCollection.features.filter(f=>!['historical-basemaps-china-review','remsen-warring-250','kiu-song-jin-1141','herrmann-ming-1415','historical-basemaps-regional-gaps','historical-basemaps-three-region-transitions','woudloper-gupta-schematic','woudloper-gupta-schematic-later-gaps','historical-basemaps-later-gaps','hiribarren-borno-regional-context','woudloper-gupta-successor-schematic','soewinhan-toungoo-sphere'].includes(f.properties.sourceDataset)),newRows=all.filter(f=>f.properties.sourceDataset==='historical-basemaps-early-regional');
const at=y=>historicalContextFeatures(all,y),find=(y,id)=>at(y).find(f=>f.properties.polityId===id);
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
test('the early China omission is fixed without inventing Xia or Shang geometry',()=>{
 assert.equal(newRows.length,28);assert.equal(all.length,564);
 for(let y=-1046;y<=-404;y++){const f=find(y,'zhou-regional');assert.ok(f,`${y}: Zhou missing`);assert.ok(d3.geoContains(f,[112.45,34.62]),`${y}: Luoyang missing`);}
 assert.equal(find(-1047,'zhou-regional'),undefined);assert.equal(find(-403,'zhou-regional'),undefined);
 const before=historicalContextFeatures(all.filter(f=>!newRows.includes(f)),-700);assert.equal(before.some(f=>d3.geoContains(f,[112.45,34.62])),false,'baseline negative control reproduces China gap');
 assert.equal(find(-771,'zhou-regional').properties.sourceYear,-1000);assert.equal(find(-770,'zhou-regional').properties.sourceYear,-700);
 assert.ok(newRows.every(f=>!['Xia','Shang'].includes(f.properties.polityId)));
});
test('selected medieval references respect regime and raid transitions',()=>{
 for(const [id,start,end,point] of [['goryeo',918,1391,[126.56,37.97]],['japan-kamakura',1185,1332,[139.55,35.32]],['chola',1071,1279,[79.14,10.79]],['srivijaya',750,1299,[104.75,-2.99]]]){
  for(let y=start;y<=end;y++)assert.ok(find(y,id),`${id}: ${y}`);
  assert.equal(historicalContextFeatures(newRows,start-1).some(f=>f.properties.polityId===id),false);assert.equal(historicalContextFeatures(newRows,end+1).some(f=>f.properties.polityId===id),false);assert.ok(d3.geoContains(find(Math.floor((start+end)/2),id),point),id);
 }
 assert.equal(find(1024,'srivijaya').properties.sourceYear,1000);assert.equal(find(1025,'srivijaya').properties.sourceYear,1100);
 assert.equal(d3.geoContains(find(1300,'japan-kamakura'),[141.35,43.06]),false,'no Hokkaido fill');
});
test('regional witnesses cannot pass through a European fill and partial Kushan stays explicit',()=>{
 for(const [y,id,point] of [[700,'wari-region',[-74.22,-13.16]],[700,'tiwanaku-region',[-68.67,-16.55]],[-500,'olmec-region',[-94.82,17.76]],[1400,'chimu',[-79.07,-8.11]]]){const f=find(y,id);assert.ok(f);assert.ok(d3.geoContains(f,point),id);}
 for(const id of ['greek-regions','maya-region','olmec-region','paracas-region','wari-region','tiwanaku-region'])assert.ok(newRows.filter(f=>f.properties.polityId===id).every(f=>f.properties.kind==='culture'));
 const k=find(150,'kushan-northern');assert.ok(k);assert.match(k.properties.note.en,/northern.*portion/);assert.equal(d3.geoContains(k,[71.58,34.02]),false);assert.equal(find(200,'kushan-northern'),undefined);
});
test('new source instances retain pins, finite windows and transport budgets',()=>{
 for(const l of historicalMetadata.layers){const b=bytes(l.file);assert.ok(b.length<=450000);assert.equal(createHash('sha256').update(b).digest('hex'),l.outputSha256||l.sha256);}
 for(const f of newRows){const p=f.properties;assert.equal(p.sourceCommit,'da7a4b735ecef70aebdc9c73e409d8a2500d50f3');assert.equal(p.license,'GPL-3.0-only');assert.ok(Number.isInteger(p.contextValidity.start)&&Number.isInteger(p.contextValidity.end));assert.ok(p.sourceFeatureIndices.length);assert.match(p.note.en,/not an annual frontier/);assert.ok(Number.isFinite(d3.geoArea(f)));}
});
test('V14 preserves prior content and separates undated tradition from archaeological dates',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v15.json');const m=read('content-expansion-v14.json'),prior=read('content-expansion-v13.json'),fresh=read('expansion-early-china-v14.json');assert.equal(m.version,'0.15.0');assert.equal(fresh.length,3);
 for(const f of prior.files){assert.deepEqual(m.files.find(x=>x.file===f.file),f);assert.equal(createHash('sha256').update(bytes(f.file)).digest('hex'),f.sha256);}
 const rows=m.files.flatMap(f=>read(f.file)),guide=read(m.earlyChinaGuideFile),yu=guide.items.find(i=>i.id==='yu-shun');assert.equal(yu.calendarRange,null);assert.equal(yu.recordId,undefined);assert.equal(yu.mapYear,undefined);assert.match(yu.summary.zh,/与“大禹”的“禹”分开/);
 assert.match(fresh.find(r=>r.id.startsWith('xia-')).dateNote.en,/unconfirmed/);assert.equal(fresh.find(r=>r.id.startsWith('xia-')).kind,'idea');
 const courses=read(m.coursesFile);assert.equal(courses.length,47);for(const old of read(prior.coursesFile)){const n=courses.find(c=>c.id===old.id);for(const id of old.recordIds)assert.ok(n.recordIds.includes(id));for(const q of old.questions)assert.ok(n.questions.some(x=>x.en===q.en&&x.zh===q.zh));}
 const study=courses.find(c=>c.id==='course-early-china-evidence');for(const id of study.recordIds){const r=[...rows,...read('history.json'),...read('china-depth-v7.json')].find(r=>r.id===id);assert.ok(r);assert.ok(r.start<=study.mapYears[id]&&study.mapYears[id]<=r.end);}
 const addition=read(m.regionalHistoryFile);for(const [area,links]of Object.entries(read('regional-history-v13.json').areas))assert.deepEqual(addition.areas[area],links);
 assert.ok(Object.values(addition.areas).some(links=>links.some(l=>l.recordId==='erlitou-urban-bronze-centre')));
});

test('all 539 pre-existing source instances and their layers remain frozen',()=>{const receipt=JSON.parse(fs.readFileSync(new URL('../docs/EARLY_MAP_BASELINE.json',import.meta.url)));for(const old of receipt.layers){if(old.descriptor.file==='territories-jiangshan.geojson'){assert.ok(!historicalMetadata.layers.some(x=>x.file===old.descriptor.file));continue;}assert.deepEqual(historicalMetadata.layers.find(l=>l.file===old.descriptor.file),old.descriptor);assert.equal(createHash('sha256').update(bytes(old.descriptor.file)).digest('hex'),old.sha256);}assert.equal(all.filter(f=>!newRows.includes(f)).length,536);});
