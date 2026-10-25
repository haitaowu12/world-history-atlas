// V11 is additive: the V10 manifest, regional files and reading paths stay reproducible.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v10.json');
const newFiles=['africa-west-asia','americas-oceania','asia','europe'].map(name=>`expansion-${name}-v11.json`);
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': V10 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==5||r.expansion?.edition!=='v11'))throw Error('Every V11 input needs release 5 and edition v11');
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
const output={schemaVersion:1,version:'0.10.0',preparedAt:'2026-10-24',
  baseline:{manifest:'content-expansion-v10.json',githubCommit:'921288bef93822f1be74c6a0d66e0bf62b778480',records:1809},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v11.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v11',release:5,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  researchService:{...baseline.researchService,followup:{method:'Direct inspection of institutional and scholarly sources, original bilingual synthesis, and bounded rechecks of prior evidence limitations. No external deep-research report imported.',checkedAt:'2026-10-24'}},
  method:{en:'V11 connects selected life stories with local publishing, education, civic and cultural institutions. V9 and V10 input files remain frozen. Reading paths retain prior stops and add source-comparison questions. Source notes distinguish inspected claims, disagreements and access limits. Counts do not establish completeness, specialist acceptance, historical certainty or territorial geometry.',zh:'V11将精选人物生平与地方出版、教育、公民及文化机构相连，保留V9及V10输入文件。阅读路径保留原有条目，并加入来源比较问题。来源说明区分已查论断、分歧与访问局限；数量不代表完整覆盖、专家认可、史实确定或疆域依据。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v11.json',courses);
write('dist/data/content-expansion-v11.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
