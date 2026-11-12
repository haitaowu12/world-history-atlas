import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {IMAGE_TIME_LAYERS,imageTimeLayers,renderImageTimeLayers} from '../dist/image-time-layers.mjs';
import {createVisualLibrary,visualCoverage} from '../dist/visual-library.mjs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const {manifest,records}=loadAtlasRecords(),catalog=readAtlasData(manifest.mediaFile);
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

test('ten date sequences refer only to admitted objects with unchanged source dates',()=>{
 assert.equal(IMAGE_TIME_LAYERS.length,10);
 assert.equal(new Set(IMAGE_TIME_LAYERS.map(row=>row.assetId)).size,10);
 for(const sequence of IMAGE_TIME_LAYERS){
  const item=catalog.items.find(item=>item.id===sequence.assetId);
  assert.ok(item);assert.equal(item.date,sequence.expectedDate);assert.equal(imageTimeLayers(item),sequence);
  assert.equal(sequence.stages.length,sequence.assetId==='world-batch-16-christine'?3:2);
  for(const lang of ['en','zh']){assert.ok(sequence.question[lang]);for(const stage of sequence.stages)for(const key of ['date','title','note'])assert.ok(stage[key][lang].trim());}
 }
});
test('date sequences never convert an unknown, approximate or lunar date into a precise Gregorian date',()=>{
 const byId=new Map(IMAGE_TIME_LAYERS.map(row=>[row.assetId,row]));
 assert.match(byId.get('china-batch-10-qin-measure-rubbing').stages[1].date.en,/unrecorded/);
 assert.match(byId.get('charles-darwin').stages[0].date.en,/About/);
 assert.match(byId.get('china-batch-10-wenzhengming-drunken-pavilion').stages[1].date.en,/lunar/);
 assert.equal(byId.get('china-batch-10-guoxi-early-spring').stages[0].date.en,'1072');
 assert.equal(byId.get('china-batch-10-guoxi-early-spring').stages[1].date.en,'1759');
 assert.equal(byId.get('world-batch-10-w6up2kpv').stages[0].date.en,'1865');
 assert.equal(byId.get('world-batch-10-w6up2kpv').stages[1].date.en,'1981');
});
test('unknown objects and changed source dates cannot show a stale curated sequence',()=>{
 assert.equal(imageTimeLayers(null),null);assert.equal(renderImageTimeLayers({id:'unknown'},'en',escape),'');
 const item=catalog.items.find(item=>item.id===IMAGE_TIME_LAYERS[0].assetId);
 assert.equal(renderImageTimeLayers({...item,date:'changed source date'},'en',escape),'');
 assert.equal(imageTimeLayers({...item,id:'another-object'}),null);
});
test('bilingual stages use native keyboard disclosures and preserve escaped text',()=>{
 const item=catalog.items.find(item=>item.id===IMAGE_TIME_LAYERS[0].assetId);
 for(const lang of ['en','zh']){
  const html=renderImageTimeLayers(item,lang,escape);
  assert.match(html,/<ol><li><details><summary>/);assert.equal((html.match(/<details>/g)||[]).length,2);
  assert.doesNotMatch(html,/<details open|onclick=|tabindex="-1"/);
  for(const stage of IMAGE_TIME_LAYERS[0].stages)for(const key of ['date','title','note'])assert.ok(html.includes(escape(stage[key][lang])));
 }
 assert.ok(renderImageTimeLayers(item,'en',value=>'escaped:'+value).includes('escaped:1072'));
});
test('image inspector integrates date layers without changing story coverage or losing source links',()=>{
 const original=globalThis.document;let html='',language='en';
 globalThis.document={querySelector(){return {addEventListener(){}};}};
 try{
  const before=visualCoverage(catalog,records),snapshot=JSON.stringify(catalog);
  const view=createVisualLibrary({catalog,records,getLanguage:()=>language,regions:[],regionName:String,openDialog:value=>{html=value;},openStory(){},escape});
  for(const lang of ['en','zh']){language=lang;for(const sequence of IMAGE_TIME_LAYERS){
   view.inspect(sequence.assetId);const item=catalog.items.find(item=>item.id===sequence.assetId);
   assert.ok(html.includes(escape(sequence.question[lang])));assert.ok(html.includes(escape(item.sourceUrl)));assert.ok(html.includes(escape(item.rights.url)));
   assert.ok(html.indexOf('class="image-time-layers"')<html.indexOf('class="visual-stories"'));
  }}
  assert.equal(JSON.stringify(catalog),snapshot);assert.deepEqual(visualCoverage(catalog,records),before);
 }finally{globalThis.document=original;}
});
test('date-layer styling keeps text wrapping and visible keyboard focus without animation',()=>{
 const css=fs.readFileSync(new URL('../dist/styles.css',import.meta.url),'utf8');
 assert.match(css,/\.image-time-layers summary\{[^}]*min-height:44px[^}]*overflow-wrap:anywhere/);
 assert.match(css,/\.image-time-layers summary:focus-visible\{[^}]*outline:2px/);
 const fragment=css.slice(css.indexOf('/* Dates belong to an object'));
 assert.doesNotMatch(fragment,/animation:|transition:/);
});

test('Getty date layers preserve composition, copying and later reception as separate stages',()=>{
 const by=new Map(IMAGE_TIME_LAYERS.map(x=>[x.assetId,x]));
 const christine=by.get('world-batch-16-christine');assert.equal(christine.stages.length,3);
 assert.match(christine.stages[0].date.en,/About 1404–1405/);assert.match(christine.stages[1].date.en,/About 1470/);assert.match(christine.stages[2].date.en,/About 1515–1520/);
 assert.equal(by.get('getty-images-02-charlemagne').stages[0].date.en,'800');assert.equal(by.get('getty-images-02-charlemagne').stages[1].date.en,'1840');
 assert.match(by.get('getty-images-02-plague').stages[1].date.en,/About 1735/);
});
