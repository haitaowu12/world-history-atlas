// Preserve the V15 checkpoint; add evidence-led China and world object stories.
import fs from 'node:fs';
import vm from 'node:vm';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v15.json');
const newFiles=['expansion-china-stories-v16.json','expansion-world-stories-v16.json'];
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': published V15 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==10||r.expansion?.edition!=='v16'))throw Error('Every V16 input needs release 10 and edition v16');
const base=['history.json','people.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(file=>read('dist/data/'+file));
const china=read('dist/data/china-import-manifest.json');
base.push(...china.eventFiles.flatMap(f=>read('dist/data/'+f.path)));
const all=[...base,...rows],byId=new Map(all.map(r=>[r.id,r]));
if(byId.size!==all.length)throw Error('Duplicate ID in the combined atlas');
applyEvidenceReviews(all,read('dist/data/evidence-followups-v11.json'));
const errors=auditExpansion(rows,baseline,all);
if(errors.length)throw Error(errors.join('\n'));
const coverage=expansionCoverage(rows,baseline.workstreams);
const oldCourses=read('dist/data/'+baseline.coursesFile);
const shortStudies=read('dist/data/story-readings-v16.json');
// Old reading URLs encode an absolute step. Keep their ordering, map years,
// questions and duration unchanged; new stories get their own focused paths.
const courses=[...oldCourses,...shortStudies];
const counts=records=>({records:records.length,biographies:records.filter(r=>r.kind==='person').length,
  biographyMilestones:records.reduce((n,r)=>n+(r.milestones?.length||0),0),
  politicalOverviews:records.filter(r=>r.kind==='polity').length,
  sourceURLs:new Set(records.flatMap(r=>r.sources.map(s=>s.url))).size});
const output={schemaVersion:1,version:'0.22.0',preparedAt:'2026-11-09',
  baseline:{manifest:'content-expansion-v15.json',localCommit:'bae33f3bcbefc8294bfd76805d121d2a16d24020',records:base.length+rows.length-delta.length},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v16.json',geographicReferenceFile:'us-canada-reference.json',geographicAssociationsFile:'us-canada-area-links-v12.json',geographicIndexFile:'us-canada-history-index-v16.json',regionalHistoryFile:'regional-history-v16.json',earlyChinaGuideFile:'early-china-guide-v14.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5,6,7,8,9,10].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v16',release:10,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  mediaFile:'history-media.json',
  researchService:{...baseline.researchService,followup:{method:'Original bilingual stories from inspected historical texts, scholarship and institutional object records. Jiangshan updates are topic leads; images have separate source and rights records.',checkedAt:'2026-11-09'}},
  method:{en:'V16 adds stories about China and objects across world regions, with source-specific limits and local credited images. Earlier expansion records, identifiers and map geometry remain pinned.',zh:'V16新增中国故事与跨地区的实物历史叙事，说明各来源的证据局限，并配本地保存且注明出处的图像。既有扩展条目、标识与地图几何保持原定版本。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v16.json',courses);
const geographicManifest=read('dist/data/us-canada-reference.json');
const geographicFeatures=geographicManifest.layers.flatMap(layer=>read('dist/data/'+layer.file).features);
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const areas=buildAreaHistoryIndex(all.filter(r=>r.regionalAssociation!=='omit-broad-point'),geographicFeatures,context.d3.geoContains,read('dist/data/'+output.geographicAssociationsFile));
write('dist/data/us-canada-history-index-v16.json',{schemaVersion:1,contentVersion:output.version,referenceRelease:geographicManifest.sourceRelease,areas});
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
write('dist/data/regional-history-v16.json',{schemaVersion:1,contentVersion:output.version,sourceRelease:regional.sourceRelease,areas:regionalAreas});
write('dist/data/content-expansion-v16.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
