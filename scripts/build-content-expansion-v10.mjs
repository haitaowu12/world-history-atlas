// Build the current shared collection without rewriting the frozen V9 release.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v9.json');
const newFiles=['africa-west-asia','americas-oceania','asia','europe'].map(name=>`expansion-${name}-v10.json`);
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
for(const frozen of baseline.files) {
  const actual=files.find(f=>f.file===frozen.file);
  if(actual.sha256!==frozen.sha256||actual.bytes!==frozen.bytes)throw Error(frozen.file+': V9 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
const base=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(file=>read('dist/data/'+file));
const china=read('dist/data/china-import-manifest.json');
base.push(...china.eventFiles.flatMap(f=>read('dist/data/'+f.path)));
const all=[...base,...rows], byId=new Map(all.map(r=>[r.id,r]));
if(byId.size!==all.length)throw Error('Duplicate ID in the combined atlas');
const errors=auditExpansion(rows,baseline,all);
if(errors.length)throw Error(errors.join('\n'));

const coverage=expansionCoverage(rows,baseline.workstreams);
const oldCourses=read('dist/data/'+baseline.coursesFile);
const courses=coverage.map(stream=>{
  const prior=oldCourses.find(c=>c.workstream===stream.id);
  if(!prior)throw Error('Missing stable reading path '+stream.id);
  const recordIds=[...new Set([...prior.recordIds,...stream.recordIds])]
    .sort((a,b)=>byId.get(a).start-byId.get(b).start||a.localeCompare(b));
  return {...prior,recordIds,estimatedMinutes:Math.max(15,recordIds.length*3)};
});
write('dist/data/expansion-courses-v10.json',courses);
const counts=records=>({records:records.length,biographies:records.filter(r=>r.kind==='person').length,
  biographyMilestones:records.reduce((n,r)=>n+(r.milestones?.length||0),0),
  politicalOverviews:records.filter(r=>r.kind==='polity').length,
  sourceURLs:new Set(records.flatMap(r=>r.sources.map(s=>s.url))).size});
const output={schemaVersion:1,version:'0.9.0',preparedAt:'2026-10-23',
  baseline:{manifest:'content-expansion-v9.json',githubCommit:'2dbb2ab4b87f326946562325801499886dca14a8',records:1713},
  files,coursesFile:'expansion-courses-v10.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v10',release:4,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  researchService:{...baseline.researchService,followup:{method:'Direct research of public historical sources and regional editorial synthesis; no external deep-research report imported.',checkedAt:'2026-10-23'}},
  method:{en:'V10 adds connected regional histories and biographies to the shared collection. V9 source files remain frozen. Reading paths include both editions; counts describe the published inventory and do not establish regional completeness, historical certainty or territorial geometry.',zh:'V10在共享资料中加入相互联系的区域史和人物生平，保留V9来源文件。阅读路径同时包含两版内容；数量说明收录规模，不代表区域史已完整、史实已确定或疆域已有依据。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
write('dist/data/content-expansion-v10.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
