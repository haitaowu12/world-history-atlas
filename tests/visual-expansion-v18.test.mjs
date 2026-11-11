import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {imageDimensions} from '../scripts/lib/image-dimensions.mjs';
import {CONTENT_MANIFEST} from '../dist/content-expansion.mjs';
import {visualCoverage,createVisualLibrary} from '../dist/visual-library.mjs';
const root=new URL('../',import.meta.url),hash=b=>createHash('sha256').update(b).digest('hex');
const manifest=readAtlasData(CONTENT_MANIFEST),catalog=readAtlasData(manifest.mediaFile),receipt=readAtlasData(manifest.visualExpansion.coverageFile);
const {records}=loadAtlasRecords();
test('V18 activates a separate visual manifest and preserves frozen narrative/media inputs',()=>{
 assert.equal(CONTENT_MANIFEST,'content-expansion-v18.json');assert.equal(manifest.version,'0.24.0');
 for(const [file,expected] of Object.entries({'content-expansion-v17.json':'8adb915f1105d17492316c3179fd21c24c67bde70227e772e1ae9e075352ec30','history-media-v17.json':'050f7679fc60746de7c436df613461ffbeba501078bf14f75876d741a87f4fbf'}))assert.equal(hash(fs.readFileSync(new URL('dist/data/'+file,root))),expected,file);
 assert.deepEqual(manifest.files,readAtlasData('content-expansion-v17.json').files);
 for(const item of readAtlasData('history-media-v17.json').items){const {metadataI18n,...source}=catalog.items.find(row=>row.id===item.id);assert.deepEqual(source,item);if(metadataI18n)for(const key of ['date','creator','institution'])assert.equal(metadataI18n[key].en,item[key]);}
});
test('the coverage receipt is reproducible from unique assembled entries and shipped associations',()=>{
 const actual=visualCoverage(catalog,records);
 for(const key of ['total','covered','assets','percent','coveredIds','uncoveredIds'])assert.deepEqual(receipt[key],actual[key],key);
 assert.equal(receipt.target,Math.ceil(records.length/2));assert.equal(receipt.targetMet,actual.covered>=receipt.target);
 assert.equal(new Set([...receipt.coveredIds,...receipt.uncoveredIds]).size,records.length);
 assert.equal(Object.values(receipt.regions).reduce((n,r)=>n+r.total,0),records.length);
 assert.equal(Object.values(receipt.regions).reduce((n,r)=>n+r.covered,0),actual.covered);
});
test('every image has matching encoded dimensions, bytes and hash',()=>{
 for(const item of catalog.items){const bytes=fs.readFileSync(new URL('dist/'+item.file,root)),size=imageDimensions(bytes);assert.equal(size.width,item.width,item.id);assert.equal(size.height,item.height,item.id);assert.equal(bytes.length,item.bytes,item.id);assert.equal(hash(bytes),item.sha256,item.id);}
 assert.throws(()=>imageDimensions(Buffer.from('<html>not an image</html>')),/Unsupported/);
});
test('each admitted source shard has a durable byte receipt',()=>{
 for(const entry of manifest.visualExpansion.shards){const bytes=fs.readFileSync(new URL('dist/data/'+entry.file,root)),shard=JSON.parse(bytes);assert.equal(bytes.length,entry.bytes);assert.equal(hash(bytes),entry.sha256);assert.equal(shard.items.length,entry.assets);assert.equal(shard.associations.length,entry.associations);}
});
test('the target command cannot silently pass an under-half catalogue',()=>{
 const run=spawnSync(process.execPath,['scripts/build-visual-expansion-v18.mjs','--require-target'],{cwd:root,encoding:'utf8'});
 assert.equal(run.status,receipt.targetMet?0:1);if(!receipt.targetMet)assert.match(run.stderr,/Visual target unmet/);
});
test('image-only expansion preserves all reviewed geographic associations',()=>{
 const before=readAtlasData('content-expansion-v17.json');
 for(const key of ['geographicIndexFile','regionalHistoryFile']){const previous=readAtlasData(before[key]),current=readAtlasData(manifest[key]);assert.deepEqual(current,{...previous,contentVersion:manifest.version});}
});
test('show more moves keyboard focus to the first newly revealed image',()=>{
 const original=globalThis.document,originalCSS=globalThis.CSS;let selector;
 const rows=Array.from({length:25},(_,n)=>({...catalog.items[0],id:'test-'+n,recordIds:[records[0].id]}));
 globalThis.document={querySelector:value=>{if(value==='#visual-results')return {set innerHTML(value){}};if(value==='[data-action="visual-compare"]')return null;selector=value;return {focus(){}};}};globalThis.CSS={escape:x=>x};
 try{const view=createVisualLibrary({catalog:{items:rows},records,getLanguage:()=> 'en',regions:[],regionName:x=>x,openDialog(){},openStory(){},escape:String});assert.equal(view.handle('visual-more'),true);assert.equal(selector,'.visual-open[data-id="test-24"]');}finally{globalThis.document=original;globalThis.CSS=originalCSS;}
});
