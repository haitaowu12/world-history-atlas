// Assemble reviewed images and a separate correction layer; frozen V17 source bytes stay intact.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadAtlasRecords,readAtlasData} from './lib/atlas-records.mjs';
import {imageDimensions} from './lib/image-dimensions.mjs';
import {auditHistoryMedia,applyMediaLocalization} from '../dist/history-media.mjs';
import {auditExpansion,expansionCoverage} from '../dist/content-expansion.mjs';
import {visualCoverage} from '../dist/visual-library.mjs';
const root=new URL('../',import.meta.url),data=new URL('dist/data/',root);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const write=(file,value)=>fs.writeFileSync(new URL(file,root),JSON.stringify(value,null,2)+'\n');
const baseline=readAtlasData('content-expansion-v17.json');
const chinaReviewsFile='china-visual-reviews-v18.json';
const reviewBytes=fs.readFileSync(new URL(chinaReviewsFile,data));
const storyFile='artifact-stories-v18.json',storyBytes=fs.readFileSync(new URL(storyFile,data));
const stories=JSON.parse(storyBytes);
const files=[...baseline.files,{file:storyFile,records:stories.length,sha256:sha(storyBytes),bytes:storyBytes.length}];
const placeLabelsFile='place-labels-reviewed-v18.json',placeLabelBytes=fs.readFileSync(new URL(placeLabelsFile,data));
const summaryEditsFile='summary-edits-v18.json',summaryEditBytes=fs.readFileSync(new URL(summaryEditsFile,data));
const {records}=loadAtlasRecords({...baseline,files,placeLabelsFile,summaryEditsFile},{chinaReviewsFile});
const expansion=files.flatMap(row=>readAtlasData(row.file));
const narrativeErrors=auditExpansion(expansion,baseline,records);
if(stories.some(row=>row.expansion?.release!==12||row.expansion?.edition!=='v18'))narrativeErrors.push('Every V18 story needs release 12 and edition v18');
if(narrativeErrors.length)throw Error(narrativeErrors.join('\n'));
const counts=rows=>({records:rows.length,biographies:rows.filter(r=>r.kind==='person').length,biographyMilestones:rows.reduce((n,r)=>n+(r.milestones?.length||0),0),politicalOverviews:rows.filter(r=>r.kind==='polity').length,sourceURLs:new Set(rows.flatMap(r=>r.sources.map(s=>s.url))).size});
const shards=fs.readdirSync(data).filter(f=>/^visual-assets-.*-v18\.json$/.test(f)).sort();
let catalog={...readAtlasData('history-media-v17.json'),version:2,reviewedAt:'2026-11-13',associations:[]};
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
const manifest={...baseline,files,placeLabelsFile,summaryEditsFile,summaryEdits:{bytes:summaryEditBytes.length,sha256:sha(summaryEditBytes),records:JSON.parse(summaryEditBytes).items.length},placeLabelTranslations:{records:JSON.parse(placeLabelBytes).items.length,bytes:placeLabelBytes.length,sha256:sha(placeLabelBytes)},baseline:{manifest:'content-expansion-v17.json',records:records.length-stories.length},
 counts:{...baseline.counts,...counts(expansion),releases:Object.fromEntries([...new Set(expansion.map(r=>r.expansion.release))].map(n=>[n,expansion.filter(r=>r.expansion.release===n).length]))},
 runtimeCounts:{...baseline.runtimeCounts,records:records.length},
 addition:{edition:'v18',release:12,files:[storyFile],...counts(stories),recordIds:stories.map(r=>r.id),regions:Object.fromEntries([...new Set(stories.map(r=>r.region))].map(region=>[region,counts(stories.filter(r=>r.region===region))]))},
 coverage:expansionCoverage(expansion,baseline.workstreams).map(({sourceURLs,...stream})=>({...stream,sourceCount:sourceURLs.length})),
 method:{en:'V18 connects historical images with their stories, adds object-centered readings and side-by-side looking exercises, and preserves released narratives with separate source-backed corrections.',zh:'V18把历史图像与故事连接起来，新增以文物为中心的阅读与图像对照，并以独立、有据可查的校订层保留已发布叙事。'},version:'0.24.0',preparedAt:'2026-11-13',mediaFile:'history-media-v18.json',chinaReviewsFile,chinaVisualReviews:{bytes:reviewBytes.length,sha256:sha(reviewBytes),records:JSON.parse(reviewBytes).eventReviews.length},geographicIndexFile:'us-canada-history-index-v18.json',regionalHistoryFile:'regional-history-v18.json',mediaLocalization:{file:localizationFile,bytes:localizationBytes.length,sha256:sha(localizationBytes),assets:JSON.parse(localizationBytes).items.length},visualExpansion:{baselineManifest:'content-expansion-v17.json',shards:receipts,coverageFile:'visual-coverage-v18.json',assets:summary.assets,covered:summary.covered,total:summary.total,target}};
// Preserve existing associations. New object stories use explicitly broad/contextual points, not inferred modern-area membership.
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
