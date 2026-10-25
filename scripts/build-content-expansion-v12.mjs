// V12 keeps every released content file intact and adds regional navigation.
import fs from 'node:fs';
import vm from 'node:vm';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v11.json');
const newFiles=['us-foundations','canada-foundations','north-america-regions','canada-coasts'].map(name=>`expansion-${name}-v12.json`);
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': V11 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==6||r.expansion?.edition!=='v12'))throw Error('Every V12 input needs release 6 and edition v12');
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
  return {...prior,recordIds,questions,estimatedMinutes:Math.max(prior.estimatedMinutes,recordIds.length*3)};
});
const counts=records=>({records:records.length,biographies:records.filter(r=>r.kind==='person').length,
  biographyMilestones:records.reduce((n,r)=>n+(r.milestones?.length||0),0),
  politicalOverviews:records.filter(r=>r.kind==='polity').length,
  sourceURLs:new Set(records.flatMap(r=>r.sources.map(s=>s.url))).size});
const output={schemaVersion:1,version:'0.11.0',preparedAt:'2026-10-24',
  baseline:{manifest:'content-expansion-v11.json',localCommit:'b762e906cfaf7450c95e90e9eb2275485d69f3f6',records:1837},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v12.json',geographicReferenceFile:'us-canada-reference.json',geographicAssociationsFile:'us-canada-area-links-v12.json',geographicIndexFile:'us-canada-history-index-v12.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5,6].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v12',release:6,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  researchService:{...baseline.researchService,followup:{method:'Institutional and scholarly page text inspected through the root in-app browser and read by regional authors from central captures; original bilingual synthesis and bounded geographic/named-place review. No external deep-research report imported.',checkedAt:'2026-10-24'}},
  method:{en:'V12 deepens selected US and Canadian histories and life stories. Optional Natural Earth states/provinces are a modern geographic navigation reference, never reconstructed historical borders. Earlier editions and existing reading-path IDs/stops remain intact. Sources disclose conflicts and access limits; counts do not establish completeness or specialist acceptance.',zh:'V12深化美国与加拿大精选历史及人物生平。可选Natural Earth州、省图层是现代地理导航参照，不是重建的历史疆界。保留早期版本及原有阅读路径编号和条目；来源说明分歧与访问局限，数量不代表完整覆盖或专家认可。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v12.json',courses);
const geographicManifest=read('dist/data/us-canada-reference.json');
const geographicFeatures=geographicManifest.layers.flatMap(layer=>read('dist/data/'+layer.file).features);
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const areas=buildAreaHistoryIndex(all,geographicFeatures,context.d3.geoContains,read('dist/data/'+output.geographicAssociationsFile));
write('dist/data/us-canada-history-index-v12.json',{schemaVersion:1,contentVersion:output.version,referenceRelease:geographicManifest.sourceRelease,areas});
write('dist/data/content-expansion-v12.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
