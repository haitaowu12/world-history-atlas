import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {contemporaries,validYear,validateRecords} from '../dist/core.mjs';
import {journeys} from '../dist/journeys.mjs';
import {buildReadingCatalog} from '../dist/reading-catalog.mjs';

const {manifest,records}=loadAtlasRecords();
const byId=new Map(records.map(r=>[r.id,r]));
const globalStories=readAtlasData('stories-global-journeys-v18.json');
const coverage=readAtlasData('visual-coverage-v18.json');
const media=readAtlasData('history-media-v18.json');

test('twenty global V18 stories populate deep origins and multi-stop human journeys across regions',()=>{
 assert.equal(globalStories.length,20);
 assert.deepEqual(validateRecords(globalStories),[]);
 const ancient=globalStories.filter(r=>r.start<=-3000);
 const people=globalStories.filter(r=>r.kind==='person');
 assert.equal(ancient.length,8,'eight super-ancient turning points populate the early timeline');
 assert.equal(people.length,12,'twelve character-driven global biographies');
 assert.ok(new Set(ancient.map(r=>r.region)).size>=6,'super-ancient stories span at least six world regions');
 let totalMilestones=0;
 for(const person of people){
  assert.ok(Array.isArray(person.milestones)&&person.milestones.length>=4,person.id+' has multi-stop milestones');
  totalMilestones+=person.milestones.length;
  for(let i=1;i<person.milestones.length;i++){
   assert.ok(person.milestones[i-1].year<=person.milestones[i].year,person.id+' milestones are chronological');
  }
  for(const m of person.milestones){
   assert.ok(person.start<=m.year&&m.year<=person.end,person.id+' milestone within life bounds');
   assert.ok(m.title?.en&&m.title?.zh&&m.description?.en&&m.description?.zh,person.id+' bilingual milestone');
  }
 }
 assert.equal(totalMilestones,50);
});

test('three new guided journeys connect deep origins, medieval oceans, and freedom struggles cleanly',()=>{
 assert.equal(journeys.length,10);
 const newIds=['origins-before-cities','across-eurasia-travellers','voices-against-empire'];
 const courses=[...readAtlasData('courses.json'),...readAtlasData(manifest.coursesFile)];
 const paths=buildReadingCatalog(journeys,courses,byId);
 assert.equal(paths.length,106);
 for(const id of newIds){
  const j=journeys.find(x=>x.id===id),path=paths.find(x=>x.id===id);
  assert.ok(j&&path,id+' exists in journeys and reading catalog');
  assert.ok(path.stops.length>=5,id+' has at least five stops');
  for(const stopId of path.stops){
   const r=byId.get(stopId);
   assert.ok(r,id+' resolves stop '+stopId);
   assert.ok(validYear(r.start)&&validYear(r.end)&&r.start<=r.end,id+' valid span for '+stopId);
  }
 }
});

test('V18 visual coverage exceeds the 50 percent milestone and eliminates anti-slop disclaimers',()=>{
 assert.equal(coverage.total,2107);
 assert.equal(coverage.covered,1081);
 assert.equal(coverage.assets,605);
 assert.equal(coverage.targetMet,true);
 assert.equal(coverage.remaining,0);
 assert.ok(coverage.percent>50);
 const globalShard=readAtlasData('visual-assets-global-stories-27-v18.json');
 assert.equal(globalShard.items.length,52);
 for(const item of globalShard.items){
  assert.ok(fs.existsSync(new URL('../dist/'+item.file,import.meta.url)),item.file+' exists locally');
  const runtimeItem=media.items.find(a=>a.id===item.id);
  assert.ok(runtimeItem?.metadataI18n?.creator?.zh&&runtimeItem?.metadataI18n?.date?.zh&&runtimeItem?.metadataI18n?.institution?.zh,item.id+' localized');
 }
 for(const r of records){
  assert.doesNotMatch(r.summary.en,/This entry should not be|Original text retained pending independent source review/i,r.id+' free of defensive boilerplate');
  if(r.provenance?.note?.en){
   assert.doesNotMatch(r.provenance.note.en,/Original text retained pending independent source review/i,r.id+' provenance reviewed');
  }
 }
});

test('contemporaries supports rich story prioritization while preserving default sort compatibility',()=>{
 const target=byId.get('person-rabban-bar-sauma');
 assert.ok(target);
 const standard=contemporaries(records,target,1287,6);
 const rich=contemporaries(records,target,1287,6,{preferRich:true,hasMedia:id=>id==='marco-polo-book-1298'||id==='person-marco-polo'});
 assert.equal(standard.length,6);
 assert.equal(rich.length,6);
 assert.ok(rich.every(r=>r.region!==target.region&&r.id!==target.id));
});

test('interactive cartographic lenses, sparkline, surprise button, and chronology deep-origins guard exist in app shell',()=>{
 const html=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 const app=fs.readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');
 assert.match(html,/id="map-lenses"/);
 assert.match(html,/id="surprise-story"/);
 assert.match(html,/id="timeline-sparkline"/);
 assert.match(html,/id="regional-collapse-toggle"/);
 assert.match(app,/-3200/);
 assert.match(app,/deep-origins/);
});
