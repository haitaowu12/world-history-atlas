// V13 preserves the published V12 checkpoint and adds reviewed regional sequences.
import fs from 'node:fs';
import vm from 'node:vm';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v12.json');
const newFiles=['expansion-regional-sequences-v13.json'];
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': V12 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==7||r.expansion?.edition!=='v13'))throw Error('Every V13 input needs release 7 and edition v13');
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
const shortStudies=read('dist/data/regional-studies-v13.json');
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
courses.push(...shortStudies);
const counts=records=>({records:records.length,biographies:records.filter(r=>r.kind==='person').length,
  biographyMilestones:records.reduce((n,r)=>n+(r.milestones?.length||0),0),
  politicalOverviews:records.filter(r=>r.kind==='polity').length,
  sourceURLs:new Set(records.flatMap(r=>r.sources.map(s=>s.url))).size});
const output={schemaVersion:1,version:'0.14.0',preparedAt:'2026-10-26',
  baseline:{manifest:'content-expansion-v12.json',localCommit:'f91e3228d6833a52a3aedb59622d2f3800cf3dd4',records:1863},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v13.json',geographicReferenceFile:'us-canada-reference.json',geographicAssociationsFile:'us-canada-area-links-v12.json',geographicIndexFile:'us-canada-history-index-v13.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5,6,7].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v13',release:7,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  researchService:{...baseline.researchService,followup:{method:'Root inspection of institutional, community and primary-text pages through the in-app browser; GPT Pro and Gemini Argon High used for bounded research/review leads, not corpus certification.',checkedAt:'2026-10-26'}},
  method:{en:'V13 connects four selected North American biographies and regional contexts with short source-comparison studies. V12 inputs and earlier editions remain frozen. Dated administrative geometry and modern reference units retain separate meanings. Review covers the disclosed claims and source conflicts, not complete historical accuracy.',zh:'V13将四位精选北美人物与区域背景连接为简短的来源比较阅读。冻结V12及更早输入；历史行政参照与现代参照单元保持不同含义。核查仅覆盖明确说明的论断和来源分歧，不等于历史事实的全面认证。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v13.json',courses);
const geographicManifest=read('dist/data/us-canada-reference.json');
const geographicFeatures=geographicManifest.layers.flatMap(layer=>read('dist/data/'+layer.file).features);
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const areas=buildAreaHistoryIndex(all,geographicFeatures,context.d3.geoContains,read('dist/data/'+output.geographicAssociationsFile));
write('dist/data/us-canada-history-index-v13.json',{schemaVersion:1,contentVersion:output.version,referenceRelease:geographicManifest.sourceRelease,areas});
// New links are a small additive index; the pinned 2022 geometry stays frozen.
const regional=read('dist/data/regional-reference.json');
const regionalFeatures=regional.countries.filter(c=>['USA','CAN'].includes(c.code)).flatMap(c=>c.layers.flatMap(l=>read('dist/data/'+l.file).features));
const regionalAreas=buildAreaHistoryIndex(delta,regionalFeatures,context.d3.geoContains,read('dist/data/regional-area-links-v13.json'));
write('dist/data/regional-history-v13.json',{schemaVersion:1,contentVersion:output.version,sourceRelease:regional.sourceRelease,areas:Object.fromEntries(Object.entries(regionalAreas).filter(([,links])=>links.length))});
write('dist/data/content-expansion-v13.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
