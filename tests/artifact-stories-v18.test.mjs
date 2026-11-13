import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {auditExpansion,expansionCoverage} from '../dist/content-expansion.mjs';
import {validateRecords} from '../dist/core.mjs';
import {createVisualLibrary} from '../dist/visual-library.mjs';
const {manifest,records}=loadAtlasRecords(),prior=readAtlasData('content-expansion-v17.json');
const stories=readAtlasData('artifact-stories-v18.json'),expansion=manifest.files.flatMap(row=>readAtlasData(row.file));
const catalog=readAtlasData(manifest.mediaFile);

test('three illustrated artifact stories extend the frozen corpus with connected reading',()=>{
 assert.equal(stories.length,3);assert.equal(new Set(stories.map(r=>r.id)).size,3);
 assert.deepEqual(validateRecords(stories),[]);assert.deepEqual(auditExpansion(expansion,manifest,records),[]);
 const before=new Set(loadAtlasRecords('content-expansion-v17.json').records.map(r=>r.id));
 for(const story of stories){assert.ok(!before.has(story.id));assert.equal(story.expansion.release,12);assert.equal(story.expansion.edition,'v18');assert.ok(story.relatedIds.length>=2);for(const lang of ['en','zh']){assert.ok(story.summary[lang].length>200);assert.ok(story.location.labelI18n[lang]);assert.ok(story.expansion.reviewLimit[lang]);}assert.equal(story.regionalAssociation,'omit-broad-point');assert.ok(story.sources.every(s=>s.retrieval==='opened-page'&&s.evidenceNote&&s.evidenceNoteZh));}
});
test('V18 receipts and cumulative counts include the new stories exactly once',()=>{
 const bytes=fs.readFileSync(new URL('../dist/data/artifact-stories-v18.json',import.meta.url));
 const receipt=manifest.files.find(r=>r.file==='artifact-stories-v18.json');
 assert.equal(receipt.bytes,bytes.length);assert.equal(receipt.sha256,createHash('sha256').update(bytes).digest('hex'));assert.equal(receipt.records,stories.length);
 assert.deepEqual(manifest.files.filter(r=>!prior.files.some(old=>old.file===r.file)),[receipt]);
 assert.equal(manifest.baseline.records,prior.runtimeCounts.records);assert.equal(manifest.runtimeCounts.records,records.length);assert.equal(records.length,manifest.baseline.records+stories.length);
 assert.equal(manifest.counts.records,expansion.length);assert.equal(manifest.counts.records,prior.counts.records+3);assert.equal(manifest.counts.releases[12],3);
 assert.deepEqual(manifest.addition.recordIds,stories.map(r=>r.id));assert.equal(manifest.addition.sourceURLs,new Set(stories.flatMap(r=>r.sources.map(s=>s.url))).size);
 assert.deepEqual(manifest.coverage,expansionCoverage(expansion,manifest.workstreams).map(({sourceURLs,...row})=>({...row,sourceCount:sourceURLs.length})));
});
test('artifact stories retain specific object identity and attribution limits',()=>{
 const expected={'cao-zhenxiu-famous-women-album':['china-batch-03-ban-zhao','733847'],'chuquibamba-stars-imperial-tunic':['world-batch-02-met-308120','308120'],'majapahit-clay-domestic-architecture':['world-batch-02-met-38577','38577']};
 for(const story of stories){const [asset,object]=expected[story.id];assert.ok(catalog.associations.some(a=>a.recordId===story.id&&a.assetId===asset));assert.ok(story.sources.some(s=>s.url==='https://www.metmuseum.org/art/collection/search/'+object));}
 assert.match(stories[0].expansion.reviewLimit.en,/one Ban Zhao leaf/);
 assert.match(stories[1].expansion.reviewLimit.en,/different garment/);
 assert.match(stories[2].location.label,/not a documented findspot/);
 assert.match(stories[2].sources[1].publisher,/Tentative Lists/);
 assert.equal(stories[1].end,1540);assert.equal(stories[0].start,1799);
});
test('gallery search precedes a collapsed, keyboard-accessible fifteen-study disclosure',()=>{
 const original=globalThis.document;let html='';
 globalThis.document={querySelector(){return {addEventListener(){}};}};
 try{for(const language of ['en','zh']){const view=createVisualLibrary({catalog,records,getLanguage:()=>language,regions:[],regionName:String,openDialog:value=>{html=value;},openStory(){},escape:String});view.browse();assert.ok(html.indexOf('id="visual-search"')<html.indexOf('class="visual-studies"'));assert.match(html,/<details class="visual-studies"><summary>[^<]*19<\/summary>/);assert.equal((html.match(/data-action="visual-study"/g)||[]).length,19);assert.doesNotMatch(html,/<details class="visual-studies"[^>]*open/);}}
 finally{globalThis.document=original;}
});
