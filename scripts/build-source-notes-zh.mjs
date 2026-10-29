// Assemble the static Chinese overlay from a locally translated dictionary.
// Usage: node scripts/build-source-notes-zh.mjs /absolute/path/to/translations.json
//        node scripts/build-source-notes-zh.mjs --from-shards
// The committed shards remain the distributable translation input; the original
// historical records and map geometries are never rewritten.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {reviewed, reviewedFaithNotes, reviewedAdditionalNotes} from './source-notes-zh-reviewed.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=path.join(root,'dist/data');
const input=process.argv[2];
if(!input)throw new Error('Provide the generated translation dictionary as an argument.');
const translations=input==='--from-shards'
  ? Object.assign({},...JSON.parse(fs.readFileSync(path.join(data,'source-notes-zh-manifest.json'),'utf8')).files.map(file=>JSON.parse(fs.readFileSync(path.join(data,file.path),'utf8'))))
  : JSON.parse(fs.readFileSync(input,'utf8'));
// Normalize repeated machine-translation errors in access-status vocabulary.
// The English keys make these replacements conditional on the actual source.
for(const [en,zh] of Object.entries(translations)){
  if(typeof zh!=='string')continue;
  let normalized=/\baccounts?\b/i.test(en)?zh.replace(/账户/g,'记述'):zh;
  const access=en.match(/Access: (opened-page-extract|indexed-excerpt)\.$/);
  if(access){
    const label=access[1]==='opened-page-extract'?'已打开网页的摘录':'索引摘录';
    normalized=normalized.replace(/(?:访问(?:方式|情况|链接|权限)?|获取(?:方式|情况)?|Access)[:：][^。]*[。.]?$/u,`访问情况：${label}。`);
  }
  translations[en]=normalized;
}
const english=new Set();let occurrences=0;
function collect(value){
  if(!value||typeof value!=='object')return;
  if(typeof value.evidenceNote==='string' && value.evidenceNote.trim()){
    english.add(value.evidenceNote);occurrences++;
    if(typeof value.evidenceNoteZh==='string'&&value.evidenceNoteZh.trim()&&!translations[value.evidenceNote])translations[value.evidenceNote]=value.evidenceNoteZh;
  }
  for(const child of Object.values(value))collect(child);
}
for(const file of fs.readdirSync(data)){
  if(!/\.(?:json|geojson)$/.test(file)||/^source-notes-zh-/.test(file))continue;
  collect(JSON.parse(fs.readFileSync(path.join(data,file),'utf8')));
}
const faith=JSON.parse(fs.readFileSync(path.join(data,'expansion-early-faiths-v14.json'),'utf8'));
const byId=new Map(faith.map(row=>[row.id,row]));
for(const [id,index,zh] of reviewedFaithNotes){
  const original=byId.get(id)?.sources?.[index]?.evidenceNote;
  if(!original)throw new Error(`Missing reviewed faith source: ${id}[${index}]`);
  if(reviewed[original] && reviewed[original]!==zh)throw new Error(`Conflicting editorial review: ${id}[${index}]`);
  reviewed[original]=zh;
}
for(const [file,id,index,zh] of reviewedAdditionalNotes){
  const rows=JSON.parse(fs.readFileSync(path.join(data,file),'utf8'));
  const original=rows.find(row=>row.id===id)?.sources?.[index]?.evidenceNote;
  if(!original)throw new Error(`Missing reviewed source: ${file} ${id}[${index}]`);
  if(reviewed[original] && reviewed[original]!==zh)throw new Error(`Conflicting editorial review: ${id}[${index}]`);
  reviewed[original]=zh;
}
Object.assign(translations,reviewed);
const absent=[...english].filter(note=>typeof translations[note]!=='string'||!translations[note].trim());
if(absent.length)throw new Error(`${absent.length} source descriptions have no Chinese translation; first: ${absent[0]}`);
for(const [original,translation] of Object.entries(translations)){
  if(typeof translation!=='string'||!translation.trim()||!/[\u3400-\u9fff]/u.test(translation))
    throw new Error(`Invalid Chinese translation: ${original}`);
  if(!process.argv.includes('--preview')&&translation.includes('中文译文仍在生成'))
    throw new Error(`A preview placeholder cannot be published: ${original}`);
}
// Also retain the reviewed notes assembled in JavaScript at runtime.
const entries=Object.entries(translations).sort(([a],[b])=>a<b?-1:a>b?1:0);
const chunks=[];let chunk={};let count=0;
for(const [original,translation] of entries){
  chunk[original]=translation;count++;
  if(count===450){chunks.push(chunk);chunk={};count=0;}
}
if(count)chunks.push(chunk);
const files=chunks.map((object,index)=>{
  const name=`source-notes-zh-${String(index+1).padStart(2,'0')}.json`;
  const bytes=Buffer.from(JSON.stringify(object,null,2)+'\n');
  if(bytes.length>450000)throw new Error(`${name} exceeds the site's 450 KB data-file budget`);
  fs.writeFileSync(path.join(data,name),bytes);
  return {path:name,records:Object.keys(object).length,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
});
const manifest={schemaVersion:1,language:'zh-Hans',method:'Locally generated machine-assisted translations with selected editorial corrections. English originals remain authoritative.',coverage:{uniqueDataNotes:english.size,dataOccurrences:occurrences,translations:entries.length,reviewedOverrides:Object.keys(reviewed).length},files};
fs.writeFileSync(path.join(data,'source-notes-zh-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));
