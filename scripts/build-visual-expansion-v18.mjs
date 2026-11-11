// Assemble reviewed images and a separate correction layer; frozen V17 source bytes stay intact.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadAtlasRecords,readAtlasData} from './lib/atlas-records.mjs';
import {imageDimensions} from './lib/image-dimensions.mjs';
import {auditHistoryMedia,applyMediaLocalization} from '../dist/history-media.mjs';
import {visualCoverage} from '../dist/visual-library.mjs';
const root=new URL('../',import.meta.url),data=new URL('dist/data/',root);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const write=(file,value)=>fs.writeFileSync(new URL(file,root),JSON.stringify(value,null,2)+'\n');
const baseline=readAtlasData('content-expansion-v17.json');
const chinaReviewsFile='china-visual-reviews-v18.json';
const reviewBytes=fs.readFileSync(new URL(chinaReviewsFile,data));
const {records}=loadAtlasRecords('content-expansion-v17.json',{chinaReviewsFile});
const shards=fs.readdirSync(data).filter(f=>/^visual-assets-.*-v18\.json$/.test(f)).sort();
let catalog={...readAtlasData('history-media-v17.json'),version:2,reviewedAt:'2026-11-11',associations:[]};
const receipts=[];
for(const file of shards){
 const bytes=fs.readFileSync(new URL(file,data)),shard=JSON.parse(bytes);
 if(!Array.isArray(shard.items)||!Array.isArray(shard.associations))throw Error(file+': expected items and associations');
 catalog.items.push(...shard.items);catalog.associations.push(...shard.associations);
 receipts.push({file,bytes:bytes.length,sha256:sha(bytes),assets:shard.items.length,associations:shard.associations.length});
}
const localizationFile='history-media-localization-zh-v18.json';
const localizationBytes=fs.readFileSync(new URL(localizationFile,data));
catalog=applyMediaLocalization(catalog,JSON.parse(localizationBytes));
const errors=auditHistoryMedia(catalog,records.map(r=>r.id));
for(const item of catalog.items){
 try{
  const bytes=fs.readFileSync(new URL('dist/'+item.file,root)),size=imageDimensions(bytes);
  if(sha(bytes)!==item.sha256)errors.push(item.id+': checksum mismatch');
  if(bytes.length!==item.bytes)errors.push(item.id+': byte count mismatch');
  if(size.width!==item.width||size.height!==item.height)errors.push(item.id+': encoded dimensions mismatch');
 }catch(error){errors.push(item.id+': '+error.message);}
}
if(errors.length)throw Error(errors.join('\n'));
const coverage=visualCoverage(catalog,records),target=Math.ceil(coverage.total/2);
const summary={schemaVersion:1,reviewedAt:catalog.reviewedAt,baselineManifest:'content-expansion-v17.json',...coverage,target,targetMet:coverage.covered>=target,remaining:Math.max(0,target-coverage.covered),
 regions:Object.fromEntries([...new Set(records.map(r=>r.region))].sort().map(region=>{const rows=records.filter(r=>r.region===region),covered=rows.filter(r=>coverage.coveredIds.includes(r.id)).length;return [region,{total:rows.length,covered}];})),
 types:Object.fromEntries([...new Set(catalog.items.map(i=>i.representation))].sort().map(type=>[type,catalog.items.filter(i=>i.representation===type).length])),
 shards:receipts,assetBytes:catalog.items.reduce((n,item)=>n+item.bytes,0),
 verification:'All admitted files match their SHA-256, byte count and encoded dimensions. Source identity, reuse rights, pixel review and entry relevance require the individual editorial records; structural validation does not establish those facts.'};
if(process.argv.includes('--require-target')&&!summary.targetMet)throw Error(`Visual target unmet: ${summary.covered}/${summary.total}; need ${target}`);
const manifest={...baseline,version:'0.24.0',preparedAt:'2026-11-11',mediaFile:'history-media-v18.json',chinaReviewsFile,chinaVisualReviews:{bytes:reviewBytes.length,sha256:sha(reviewBytes),records:JSON.parse(reviewBytes).eventReviews.length},geographicIndexFile:'us-canada-history-index-v18.json',regionalHistoryFile:'regional-history-v18.json',mediaLocalization:{file:localizationFile,bytes:localizationBytes.length,sha256:sha(localizationBytes),assets:JSON.parse(localizationBytes).items.length},visualExpansion:{baselineManifest:'content-expansion-v17.json',shards:receipts,coverageFile:'visual-coverage-v18.json',assets:summary.assets,covered:summary.covered,total:summary.total,target}};
// The correction layer preserves coordinates. Keep existing geography-index associations.
for(const [key,file] of [['geographicIndexFile',manifest.geographicIndexFile],['regionalHistoryFile',manifest.regionalHistoryFile]]){
 const index=readAtlasData(baseline[key]);
 write('dist/data/'+file,{...index,contentVersion:manifest.version});
}
const notice=['# Historical images: credits and reuse','',`Reviewed ${catalog.reviewedAt}. ${catalog.items.length} images. Image-specific rights are separate from the atlas application and text licenses. Dates describe the depicted artwork, object, photograph or publication as indicated.`, '', 'Historical artifacts, surviving places and later depictions retain their source identities. No generated reconstructions are included in this catalogue.',''];
for(const item of catalog.items)notice.push(`## ${item.title.en} / ${item.title.zh}`,'',`- File: ${item.file.split('/').at(-1)}`,`- Creator: ${item.creator}`,`- Date: ${item.date}`,`- Collection: ${item.institution}`,`- Source: ${item.sourceUrl}`,`- Rights: ${item.rights.label} (${item.rights.url})`,`- Rights evidence: ${item.rightsSourceUrl}`,'',item.rights.note.en,'',item.transformation.en,'');
fs.writeFileSync(new URL('dist/assets/history-media/NOTICE.md',root),notice.join('\n'));
write('dist/data/history-media-v18.json',catalog);
write('dist/data/visual-coverage-v18.json',summary);
write('dist/data/content-expansion-v18.json',manifest);
console.log(JSON.stringify({assets:summary.assets,covered:summary.covered,total:summary.total,percent:summary.percent,target,targetMet:summary.targetMet,shards:shards.length},null,2));
