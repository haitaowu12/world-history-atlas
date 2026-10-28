// V14 preserves the published V13 checkpoint and adds reviewed regional sequences.
import fs from 'node:fs';
import vm from 'node:vm';
import {buildAreaHistoryIndex} from '../dist/us-canada-reference.mjs';
import {createHash} from 'node:crypto';
import {auditExpansion,expansionCoverage,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,value)=>fs.writeFileSync(new URL(p,root),JSON.stringify(value,null,2)+'\n');
const baseline=read('dist/data/content-expansion-v13.json');
const newFiles=['expansion-early-china-v14.json','expansion-gupta-toungoo-v14.json','expansion-cross-regional-v14.json'];
const files=[...baseline.files.map(f=>f.file),...newFiles].map(file=>{
  const bytes=fs.readFileSync(new URL('dist/data/'+file,root));
  if(bytes.length>450000)throw Error(file+': split this content file before publication');
  return {file,records:JSON.parse(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
const publishedV14=read('docs/CROSS_REGIONAL_BASELINE_2026_10_27.json');
for(const frozen of publishedV14.contentFiles) {
  const actual=files.find(f=>f.file===frozen.file);
  if(JSON.stringify(actual)!==JSON.stringify(frozen))throw Error(frozen.file+': published V14 baseline changed');
}
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const delta=newFiles.flatMap(file=>read('dist/data/'+file));
if(delta.some(r=>r.expansion?.release!==8||r.expansion?.edition!=='v14'))throw Error('Every V14 input needs release 8 and edition v14');
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
const shortStudies=[...read('dist/data/early-china-study-v14.json'),...read('dist/data/cross-regional-studies-v14.json')];
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
const output={schemaVersion:1,version:'0.15.0',preparedAt:'2026-10-27',
  baseline:{manifest:'content-expansion-v13.json',localCommit:'0eacba4456273a99423dbde38d42b4bb6385220e',records:1871},
  files,evidenceReviewsFile:'evidence-followups-v11.json',coursesFile:'expansion-courses-v14.json',geographicReferenceFile:'us-canada-reference.json',geographicAssociationsFile:'us-canada-area-links-v12.json',geographicIndexFile:'us-canada-history-index-v14.json',regionalHistoryFile:'regional-history-v14.json',earlyChinaGuideFile:'early-china-guide-v14.json',workstreams:baseline.workstreams,
  counts:{...counts(rows),readingPaths:courses.length,releases:Object.fromEntries([1,2,3,4,5,6,7,8].map(n=>[n,rows.filter(r=>r.expansion.release===n).length]))},
  addition:{edition:'v14',release:8,files:newFiles,...counts(delta),recordIds:delta.map(r=>r.id),
    regions:Object.fromEntries([...new Set(delta.map(r=>r.region))].map(region=>[region,counts(delta.filter(r=>r.region===region))]))},
  researchService:{...baseline.researchService,followup:{method:'Early-China and Gupta/Toungoo source texts were inspected in the in-app browser. Cross-regional continuation sources were inspected in Chrome by the dedicated Codex browser agent and integrated with their access limits; earlier releases retain their own disclosures.',checkedAt:'2026-10-27'}},
  method:{en:'V14 adds early China evidence distinctions and one short study, dated Gupta and Toungoo–Ayutthaya evidence, and new cross-regional histories of the Cold War, Atlantic exchange, and African and Pacific migrations. Yu/Shun is an undated received tradition; Xia remains unconfirmed, Erlitou archaeological and Shang supported by royal-center evidence. No territorial boundaries are inferred from narrative dates. Prior inputs remain frozen.',zh:'V14新增早期中国证据区分、一条简短阅读，笈多和东吁—阿瑜陀耶证据，以及冷战、大西洋交流和非洲与太平洋迁徙的跨区域历史。虞舜作为未确立绝对纪年的传世叙述；夏的身份未证实，二里头为考古地点，商有王室中心材料。叙事年代不推导疆界；冻结既有输入。'},
  coverage:coverage.map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length}))};
// Write derived outputs only after every input has passed the audit.
write('dist/data/expansion-courses-v14.json',courses);
const geographicManifest=read('dist/data/us-canada-reference.json');
const geographicFeatures=geographicManifest.layers.flatMap(layer=>read('dist/data/'+layer.file).features);
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const areas=buildAreaHistoryIndex(all.filter(r=>r.regionalAssociation!=='omit-broad-point'),geographicFeatures,context.d3.geoContains,read('dist/data/'+output.geographicAssociationsFile));
write('dist/data/us-canada-history-index-v14.json',{schemaVersion:1,contentVersion:output.version,referenceRelease:geographicManifest.sourceRelease,areas});
// New links are a small additive index; the pinned 2022 geometry stays frozen.
const regional=read('dist/data/regional-reference.json');
const regionalAreas=structuredClone(read('dist/data/regional-history-v13.json').areas);
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
write('dist/data/regional-history-v14.json',{schemaVersion:1,contentVersion:output.version,sourceRelease:regional.sourceRelease,areas:regionalAreas});
write('dist/data/content-expansion-v14.json',output);
console.log(JSON.stringify({totalRecords:all.length,addition:counts(delta),cumulative:output.counts},null,2));
