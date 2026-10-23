import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {expansionCoverage} from '../dist/content-expansion.mjs';
const root=new URL('../',import.meta.url),read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const workstreams=read('scripts/content-workstreams-v9.json');
const researchService=read('scripts/research-service-v9.json');
const files=['africa','east-southeast','south-west-asia','americas','oceania','europe','china','china-corrections'].map(region=>{
 const file=`expansion-${region}-v9.json`,bytes=fs.readFileSync(new URL('dist/data/'+file,root)),records=JSON.parse(bytes);
 return {file,records:records.length,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
});
const rows=files.flatMap(f=>read('dist/data/'+f.file));
const base=[...['history.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json','people.json'].flatMap(f=>read('dist/data/'+f))];
const manifest=read('dist/data/china-import-manifest.json');base.push(...manifest.eventFiles.flatMap(f=>read('dist/data/'+f.path)));
const ids=new Set([...base,...rows].map(r=>r.id));
for(const row of rows)for(const id of row.relatedIds||[])if(!ids.has(id))throw Error(row.id+': unknown related ID '+id);
const coverage=expansionCoverage(rows,workstreams);
const chinaAnchors={CH1:['china-landmark-497','china-landmark-228'],CH2:['grand-canal-network','quanzhou'],CH3:['grand-canal-network','china-landmark-089','china-event-qin-003']};
const courses=coverage.map(w=>{
 const recordIds=[...new Set([...w.recordIds,...(chinaAnchors[w.id]||[])])].sort((a,b)=>[...base,...rows].find(r=>r.id===a).start-[...base,...rows].find(r=>r.id===b).start||a.localeCompare(b));
 if(recordIds.length<2)throw Error(w.id+': insufficient reading path entries');
 return {id:'course-expansion-'+w.id.toLowerCase(),title:w.title,summary:{en:`Read connected histories of ${w.title.en.toLowerCase()}. Compare political change, everyday experience and the evidence behind each account. Dates describe each entry’s stated focus.`,zh:`沿相互联系的条目探索「${w.title.zh}」，比较政治变化、日常经验及其证据。年代表示各条目注明的关注范围。`},recordIds,routeIds:[],questions:w.questions||[{en:'Which changes connect these places and communities, and which developments occurred at the same time?',zh:'哪些变化把这些地点与社群联系起来？哪些进程发生在同一时期？'},{en:'How do the surviving sources shape this account? Identify an uncertain date or a perspective that needs additional evidence.',zh:'留存来源如何塑造这些叙述？找出一个不确定年代，或一种仍需补充证据的视角。'}],activity:{en:'Choose two linked entries. Compare authority, work or exchange, then explain one claim using a cited source and state its limits.',zh:'选择两个相关条目，比较权威、劳动或交换，利用所引来源解释一项论断，并说明证据局限。'},kind:'reading-course',estimatedMinutes:Math.max(15,recordIds.length*3),workstream:w.id,evidencePolicy:'Linked records supply historical evidence. Questions and activities are editorial prompts, not independently sourced historical claims.'};
});
fs.writeFileSync(new URL('dist/data/expansion-courses-v9.json',root),JSON.stringify(courses,null,2)+'\n');
const output={schemaVersion:1,version:'0.8.0',preparedAt:'2026-10-23',files,coursesFile:'expansion-courses-v9.json',workstreams,counts:{records:rows.length,biographies:rows.filter(r=>r.kind==='person').length,politicalOverviews:rows.filter(r=>r.kind==='polity').length,sourceURLs:new Set(rows.flatMap(r=>r.sources.map(s=>s.url))).size,readingPaths:courses.length,releases:Object.fromEntries([1,2,3].map(n=>[n,rows.filter(r=>r.expansion?.release===n).length]))},researchService,method:{en:'All three planned editorial releases are represented by selected regional, social and biographical batches. This records published scope, not exhaustive coverage or independent verification of the full inherited collection. Political dates do not authorize boundary geometry. Source notes distinguish full-page inspection from indexed evidence where retrieval failed.',zh:'以精选区域史、社会史与人物批次覆盖三个计划编辑阶段；记录实际发布范围，不表示完整覆盖或已独立核实全部继承资料。政治年代不构成疆界依据。来源说明在读取失败时区分全文检查与索引证据。'},coverage:coverage.map(({sourceURLs,...w})=>({...w,sourceCount:sourceURLs.length}))};
fs.writeFileSync(new URL('dist/data/content-expansion-v9.json',root),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output.counts));
