// Preserve the V16 checkpoint; complete the inspected profile backlog and regional stories.
import fs from 'node:fs';
import vm from 'node:vm';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews,hasReviewedLimitedChronology} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v16.json');
const newFiles=['expansion-people-early-v17.json','expansion-people-medieval-v17.json','expansion-people-later-v17.json','expansion-africa-west-europe-stories-v17.json','expansion-asia-stories-v17.json','expansion-americas-pacific-stories-v17.json'];
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': published V16 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==11||r.expansion?.edition!=='v17'))throw Error('Every V17 input needs release 11 and edition v17');
const base=['history.json','people.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(file=>read('dist/data/'+file));
const china=read('dist/data/china-import-manifest.json');
base.push(...china.eventFiles.flatMap(f=>read('dist/data/'+f.path)));
const all=[...base,...rows],byId=new Map(all.map(r=>[r.id,r]));
if(byId.size!==all.length)throw Error('Duplicate ID in the combined atlas');
const reviewedAll=applyEvidenceReviews(all,read('dist/data/evidence-followups-v11.json'));
const people=delta.filter(r=>r.kind==='person'), stories=delta.filter(r=>r.kind!=='person');
const sourceProfiles=read('dist/data/china-library.json').profiles;
const linkedBefore=new Set(['china-person-xuanzang','china-person-zhenghe','china-person-liqingzhao']);
const expectedProfiles=sourceProfiles.filter(p=>!linkedBefore.has(p.id));
if(people.length!==101||stories.length!==47)throw Error('V17 requires all 101 profile biographies and 47 planned stories');
for(const profile of expectedProfiles){
 const biography=people.find(r=>r.id===profile.id);
 if(!biography||biography.sourceProfileId!==profile.id||['en','zh'].some(lang=>biography.name?.[lang]!==profile.name[lang]))throw Error('Missing or mismatched source-profile identity: '+profile.id);
}
for(const row of delta)for(const location of [row.location,...(row.milestones||[]).map(m=>m.location)])if(!location?.labelI18n?.en||!location?.labelI18n?.zh)throw Error(row.id+': bilingual place label missing');
const errors=auditExpansion(rows,baseline,reviewedAll);
if(errors.length)throw Error(errors.join('\n'));
const coverage=expansionCoverage(rows,baseline.workstreams);
const oldCourses=read('dist/data/'+baseline.coursesFile);
const shortStudies=['story-readings-africa-west-europe-v17.json','story-readings-asia-v17.json','story-readings-americas-pacific-v17.json'].flatMap(file=>read('dist/data/'+file));
if(shortStudies.length!==30)throw Error('V17 requires 30 new thematic readings');
// Old reading URLs encode an absolute step. Keep their ordering, map years,
// questions and duration unchanged; new stories get their own focused paths.
const courses=[...oldCourses,...shortStudies];
if(new Set(courses.map(c=>c.id)).size!==courses.length)throw Error('Duplicate reading identity');
for(const course of shortStudies){
 if(!course.recordIds?.length||course.recordIds.some(id=>!byId.has(id)))throw Error(course.id+': unknown or missing reading stop');
 if(course.recordIds.every(id=>!delta.some(r=>r.id===id)))throw Error(course.id+': reading does not connect a new record');
}
const counts=records=>({records:records.length,biographies:records.filter(r=>r.kind==='person').length,
  biographyMilestones:records.reduce((n,r)=>n+(r.milestones?.length||0),0),
  politicalOverviews:records.filter(r=>r.kind==='polity').length,
  sourceURLs:new Set(records.flatMap(r=>r.sources.map(s=>s.url))).size});
const output={schemaVersion:1,version:'0.23.0',preparedAt:'2026-11-09',
  baseline:{manifest:'content-expansion-v16.json',localCommit:'3849fb809e9340e0a06ffa9329c0cdcdb3f733a0',records:base.length+rows.length-delta.length},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v17.json',geographicReferenceFile:'us-canada-reference.json',geographicAssociationsFile:'us-canada-area-links-v12.json',geographicIndexFile:'us-canada-history-index-v17.json',regionalHistoryFile:'regional-history-v17.json',earlyChinaGuideFile:'early-china-guide-v14.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5,6,7,8,9,10,11].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v17',release:11,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  mediaFile:'history-media.json',
  chronologyExceptions:people.filter(hasReviewedLimitedChronology).map(r=>({recordId:r.id,milestones:r.milestones.length,...r.chronologyReview})),
  researchService:{...baseline.researchService,followup:{method:'Original bilingual biographies and regional stories from inspected historical texts, scholarship and institutional records. Source-profile identities are retained; explicit chronology reviews explain sparse dated evidence. Jiangshan updates are credited as method and topic leads; image rights remain separate.',checkedAt:'2026-11-09'}},
  method:{en:'V17 completes the 101 inherited reference profiles with researched biographies and adds 47 regional stories and 30 readings. It preserves profile identities, older reading URLs and released narrative files. Dates describe supported focus periods, and bilingual labels explain representative map points.',zh:'V17为101则沿用的人物资料补充经查证的生平，新增47篇地区故事及30条阅读路径。人物标识、旧阅读链接与已发布叙事文件保持不变。年代表示有证据支持的关注时段，双语标签说明地图代表点。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v17.json',courses);
const geographicManifest=read('dist/data/us-canada-reference.json');
const geographicFeatures=geographicManifest.layers.flatMap(layer=>read('dist/data/'+layer.file).features);
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const areas=buildAreaHistoryIndex(all.filter(r=>r.regionalAssociation!=='omit-broad-point'),geographicFeatures,context.d3.geoContains,read('dist/data/'+output.geographicAssociationsFile));
write('dist/data/us-canada-history-index-v17.json',{schemaVersion:1,contentVersion:output.version,referenceRelease:geographicManifest.sourceRelease,areas});
// New links are a small additive index; the pinned 2022 geometry stays frozen.
const regional=read('dist/data/regional-reference.json');
const regionalAreas=structuredClone(read('dist/data/'+baseline.regionalHistoryFile).areas);
// Modern administrative areas provide a discoverability link to the chosen
// representative point, never a claim that the historical subject belonged to
// a modern jurisdiction. Load only country groups whose bounding boxes match.
const insideBounds=(country,location)=>{const [[w,s],[e,n]]=country.bounds,[x,y]=[location.lon,location.lat];return y>=s&&y<=n&&(w<=e?x>=w&&x<=e:x>=w||x<=e);};
for(const country of regional.countries){const candidates=delta.filter(r=>r.regionalAssociation!=='omit-broad-point'&&insideBounds(country,r.location));if(!candidates.length)continue;
 for(const f of country.layers.flatMap(l=>read('dist/data/'+l.file).features)){
  const old=regionalAreas[f.properties.id]||[],seen=new Set([...(f.properties.historyLinks||[]),...old].map(link=>link.recordId));
  const links=candidates.filter(r=>!seen.has(r.id)&&context.d3.geoContains(f,[r.location.lon,r.location.lat])).map(r=>({recordId:r.id,roles:['representative'],milestoneYears:[]}));
  if(links.length)regionalAreas[f.properties.id]=[...old,...links];
 }
}
write('dist/data/regional-history-v17.json',{schemaVersion:1,contentVersion:output.version,sourceRelease:regional.sourceRelease,areas:regionalAreas});
write('dist/data/content-expansion-v17.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
