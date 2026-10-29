import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {journeys} from '../dist/journeys.mjs';
import {CONTENT_MANIFEST} from '../dist/content-expansion.mjs';
import {buildReadingCatalog,filterReadings,chaptersFor,readingRange,READING_EDITS,READING_CHAPTERS,RECOMMENDED_READINGS} from '../dist/reading-catalog.mjs';
const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url)));
const manifest=read(CONTENT_MANIFEST),courses=[...read('courses.json'),...read(manifest.coursesFile)];
const records=[...['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read),...read('china-import-manifest.json').eventFiles.flatMap(f=>read(f.path)),...manifest.files.flatMap(f=>read(f.file))];
const byId=new Map(records.map(r=>[r.id,r])),before=JSON.stringify(courses),paths=buildReadingCatalog(journeys,courses,byId);

test('catalogue preserves every legacy identity, stop and map anchor without mutating inputs',()=>{
 assert.equal(paths.length,70);assert.equal(new Set(paths.map(p=>p.id)).size,70);
 for(const source of [...journeys,...courses]){
  const actual=paths.find(p=>p.id===source.id);assert.ok(actual);
  assert.deepEqual(actual.stops,source.stops||source.recordIds);
  assert.deepEqual(actual.mapYears,source.mapYears);
  for(const id of actual.stops)assert.ok(byId.has(id),id);
 }
 assert.equal(JSON.stringify(courses),before);
 for(const id of [...Object.keys(READING_EDITS),...Object.keys(READING_CHAPTERS),...RECOMMENDED_READINGS])assert.ok(paths.some(p=>p.id===id),id);
});
test('chapters cover each long course exactly once and retain absolute shared-link positions',()=>{
 for(const path of paths.filter(p=>p.estimatedMinutes>=90)){
  assert.ok(path.chapters.length>=4,path.id);
  const collected=path.chapters.flatMap(c=>path.stops.slice(c.start,c.end));
  assert.deepEqual(collected,path.stops);assert.equal(new Set(path.chapters.map(c=>c.id)).size,path.chapters.length);
  for(const c of path.chapters){assert.ok(c.estimatedMinutes<=35);assert.ok(c.title.en&&c.title.zh);assert.deepEqual(readingRange(path,c.id),c);}
  assert.deepEqual(readingRange(path,'unknown'),{id:'',start:0,end:path.stops.length});
 }
 const na=paths.find(p=>p.id==='course-expansion-na3');
 assert.equal(readingRange(na,'work').start,19);assert.equal(readingRange(na,'work').end,26);
 assert.equal(na.stops[19],'canadian-national-policy-tariffs-land');
 assert.throws(()=>chaptersFor({...na,stops:[],recordIds:[]}),/Invalid reading chapter/);
});
test('search combines bilingual names and stop titles with region, theme and time constraints',()=>{
 const short=filterReadings(paths,{region:'north-america',minutes:'20'});
 assert.ok(short.some(p=>p.id==='course-regional-pacific-cultural-work'));
 assert.ok(!short.some(p=>p.id==='course-expansion-na3'));
 assert.ok(short.every(p=>p.estimatedMinutes<=20&&p.regions.includes('north-america')));
 assert.ok(filterReadings(paths,{query:'Mungo Martin'}).some(p=>p.id==='course-regional-pacific-cultural-work'));
 assert.ok(filterReadings(paths,{query:'太平洋'}).length);
 const theme=filterReadings(paths,{theme:'knowledge',region:'east-asia'});
 assert.ok(theme.length);assert.ok(theme.every(p=>p.themes.includes('knowledge')&&p.regions.includes('east-asia')));
 assert.equal(filterReadings(paths,{query:'no-such-reading-2917'}).length,0);
 assert.equal(filterReadings(paths).length,70);
 const missingDuration=[{...paths[0],estimatedMinutes:undefined}];assert.deepEqual(filterReadings(missingDuration,{minutes:'20'}),[]);
 assert.ok(filterReadings(paths,{query:'Sei Shonagon'}).some(p=>p.id==='course-expansion-ea2'));
});
