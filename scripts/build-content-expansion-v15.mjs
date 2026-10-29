// V15 preserves the V14 checkpoint and adds independently reviewed biographies.
import fs from 'node:fs';
import vm from 'node:vm';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v14.json');
const newFiles=['expansion-jiangshan-review-v15.json'];
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': published V14 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==9||r.expansion?.edition!=='v15'))throw Error('Every V15 input needs release 9 and edition v15');
const base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(file=>read('dist/data/'+file));
const china=read('dist/data/china-import-manifest.json');
base.push(...china.eventFiles.flatMap(f=>read('dist/data/'+f.path)));
const all=[...base,...rows],byId=new Map(all.map(r=>[r.id,r]));
if(byId.size!==all.length)throw Error('Duplicate ID in the combined atlas');
applyEvidenceReviews(all,read('dist/data/evidence-followups-v11.json'));
const errors=auditExpansion(rows,baseline,all);
if(errors.length)throw Error(errors.join('\n'));
const coverage=expansionCoverage(rows,baseline.workstreams);
const oldCourses=read('dist/data/'+baseline.coursesFile);
const shortStudies=[];
const episodeYears=Object.fromEntries(shortStudies.flatMap(c=>Object.entries(c.mapYears)).filter(([id])=>delta.some(r=>r.id===id)));
const courses=coverage.map(stream=>{
  const prior=oldCourses.find(c=>c.workstream===stream.id);
  if(!prior)throw Error('Missing stable reading path '+stream.id);
  const recordIds=[...new Set([...prior.recordIds,...stream.recordIds])]
    .sort((a,b)=>byId.get(a).start-byId.get(b).start||a.localeCompare(b));
  const pairs=delta.filter(r=>r.kind==='person'&&r.expansion.workstreams.includes(stream.id)).map(person=>({person,
    context:delta.find(r=>r.kind!=='person'&&person.relatedIds?.includes(r.id)&&r.expansion.workstreams.includes(stream.id))})).filter(pair=>pair.context);
  const questions=[...prior.questions,...pairs.map(({person,context})=>({
    en:`Read “${person.title.en}” with “${context.title.en}”. What does each source support about the person's actions and the surrounding institution or community? Identify one limit or disagreement.`,
    zh:`结合「${person.title.zh}」与「${context.title.zh}」阅读。各来源能支持哪些关于个人行动及其周围机构或社群的论断？指出一项局限或分歧。`
  }))];
  return {...prior,recordIds,questions,mapYears:{...prior.mapYears,...Object.fromEntries(Object.entries(episodeYears).filter(([id])=>recordIds.includes(id)))},estimatedMinutes:Math.max(prior.estimatedMinutes,recordIds.length*3)};
});
courses.push(...oldCourses.filter(c=>!c.workstream),...shortStudies);
const counts=records=>({records:records.length,biographies:records.filter(r=>r.kind==='person').length,
  biographyMilestones:records.reduce((n,r)=>n+(r.milestones?.length||0),0),
  politicalOverviews:records.filter(r=>r.kind==='polity').length,
  sourceURLs:new Set(records.flatMap(r=>r.sources.map(s=>s.url))).size});
const output={schemaVersion:1,version:'0.16.0',preparedAt:'2026-10-28',
  baseline:{manifest:'content-expansion-v14.json',localCommit:'d9084b43025808caadf9b56bddeb5706ca5628b8',records:1909},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v15.json',geographicReferenceFile:'us-canada-reference.json',geographicAssociationsFile:'us-canada-area-links-v12.json',geographicIndexFile:'us-canada-history-index-v15.json',regionalHistoryFile:'regional-history-v15.json',earlyChinaGuideFile:'early-china-guide-v14.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5,6,7,8,9].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v15',release:9,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  researchService:{...baseline.researchService,followup:{method:'Two new biographies were independently written after inspecting the original historical texts and university scholarship in the in-app browser. Upstream profiles were research leads, not copied text or evidence of boundaries.',checkedAt:'2026-10-28'}},
  method:{en:'V15 adds independently reviewed biographies of Zu Chongzhi and Yelü Chucai, preserving earlier material and boundaries. Dates, locations and source disagreements are qualified in each entry.',zh:'V15在保留既有资料和疆界的基础上，新增经独立核查的祖冲之与耶律楚材传记；各条目说明日期、地点和来源分歧的局限。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v15.json',courses);
const geographicManifest=read('dist/data/us-canada-reference.json');
const geographicFeatures=geographicManifest.layers.flatMap(layer=>read('dist/data/'+layer.file).features);
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const areas=buildAreaHistoryIndex(all.filter(r=>r.regionalAssociation!=='omit-broad-point'),geographicFeatures,context.d3.geoContains,read('dist/data/'+output.geographicAssociationsFile));
write('dist/data/us-canada-history-index-v15.json',{schemaVersion:1,contentVersion:output.version,referenceRelease:geographicManifest.sourceRelease,areas});
// New links are a small additive index; the pinned 2022 geometry stays frozen.
const regional=read('dist/data/regional-reference.json');
const regionalAreas=structuredClone(read('dist/data/regional-history-v14.json').areas);
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
write('dist/data/regional-history-v15.json',{schemaVersion:1,contentVersion:output.version,sourceRelease:regional.sourceRelease,areas:regionalAreas});
write('dist/data/content-expansion-v15.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
