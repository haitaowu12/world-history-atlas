import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
import {createVisualLibrary,visualRows,filterVisualRows} from '../dist/visual-library.mjs';
import {auditHistoryMedia,mediaFigures} from '../dist/history-media.mjs';
const shard=readAtlasData('visual-assets-world-batch-05-v18.json');
const byId=new Map(shard.items.map(i=>[i.id.replace('world-batch-05-',''),i]));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
test('site photos keep distinct photograph dates, historical periods and photographer rights',()=>{
 assert.equal(shard.items.length,31);assert.equal(shard.associations.length,31);
 for(const item of shard.items){assert.equal(item.representation,'site-photograph');assert.match(item.date,/^Photograph: \d{4}(-\d\d)?(-\d\d)?$/);assert.ok(item.creator);assert.ok(item.rightsSourceUrl);assert.match(item.rights.url,/creativecommons.org\/licenses\//);for(const lang of ['en','zh']){const html=mediaFigures([item],lang,escape);assert.ok(html.includes(escape(item.historicalPeriod[lang])));assert.ok(html.includes(escape(item.creator)));assert.ok(html.includes(escape(item.rights.url)));}}
});
test('historical context preserves restoration, living landscapes and dating uncertainty',()=>{
 assert.match(byId.get('rapa-nui').caption.en,/re-erected.*restoration/);assert.match(byId.get('rapa-nui').historicalPeriod.en,/1990s/);
 assert.match(byId.get('ifugao-rice-landscape').historicalPeriod.en,/seventeenth century/);
 assert.match(byId.get('plain-jars-dating-reuse').interpretation.en,/do not automatically date every visible jar/);
 assert.match(byId.get('brewarrina-ngunnhu-engineering').historicalPeriod.en,/uncertain construction date/);
 assert.match(byId.get('cusco-imperial-city').caption.en,/colonial Santo Domingo/);
 assert.match(byId.get('jantar-mantar-jaipur').caption.en,/detail of the Brihat Samrat Yantra/);
 for(const id of ['taputapuatea','kuk','pulemelei-settlement-landscape'])assert.ok(!byId.has(id),'held site must remain excluded: '+id);
});
test('optional historical-period metadata requires both languages and safely escapes rendering',()=>{
 const item=structuredClone(shard.items[0]);delete item.historicalPeriod.zh;
 assert.ok(auditHistoryMedia({version:2,reviewedAt:"2026-11-11",items:[item]},loadAtlasRecords().records.map(r=>r.id)).some(e=>e.includes('incomplete historical period')));
 item.historicalPeriod={en:'<script>not markup</script>',zh:'<script>不是标记</script>'};
 for(const lang of ['en','zh']){const html=mediaFigures([item],lang,escape);assert.ok(html.includes(escape(item.historicalPeriod[lang])));assert.ok(!html.includes('<script>'));}
});

test('an identical image relationship and observation is printed only once',()=>{
 const item=structuredClone(shard.items[0]);item.association={context:item.interpretation};
 for(const lang of ['en','zh']){const html=mediaFigures([item],lang,escape);assert.equal(html.split(escape(item.interpretation[lang])).length-1,1);assert.ok(!html.includes('class="image-connection"'));}
 item.association.context={en:'A distinct relationship to the entry.',zh:'与条目不同的关联说明。'};
 assert.ok(mediaFigures([item],'en',escape).includes('class="image-connection"'));
});

test('image inspector retains story navigation without repeating the same observation',()=>{
 const original=globalThis.document;let html='';
 globalThis.document={querySelector(){return {addEventListener(){}};}};
 try{for(const lang of ['en','zh']){const catalog={...shard,items:shard.items},records=loadAtlasRecords().records;const view=createVisualLibrary({catalog,records,getLanguage:()=>lang,regions:[],regionName:String,openDialog:value=>{html=value;},openStory(){},escape});const item=byId.get('rapa-nui');view.inspect(item.id);assert.equal(html.split(escape(item.interpretation[lang])).length-1,1);assert.ok(html.includes('data-action="visual-story" data-id="rapa-nui"'));}}
 finally{globalThis.document=original;}
});

test('image search includes named places in captions and historical context',()=>{
 const rows=visualRows(shard,loadAtlasRecords().records);
 for(const query of ['Brewarrina','布雷瓦里纳'])assert.ok(filterVisualRows(rows,{query}).some(i=>i.id==='world-batch-05-brewarrina-ngunnhu-engineering'));
 assert.ok(filterVisualRows(rows,{query:'seventeenth century'}).some(i=>i.id==='world-batch-05-ifugao-rice-landscape'));
 assert.equal(filterVisualRows(rows,{query:'zzzz-no-such-image'}).length,0);
});

test('inspector links keep entry navigation without repeating a matching caption',()=>{
 const original=globalThis.document;let html='';
 globalThis.document={querySelector(){return {addEventListener(){}};}};
 try{for(const lang of ['en','zh']){const catalog=readAtlasData('visual-assets-world-batch-07-v18.json'),records=loadAtlasRecords().records;const view=createVisualLibrary({catalog,records,getLanguage:()=>lang,regions:[],regionName:String,openDialog:value=>{html=value;},openStory(){},escape});const item=catalog.items.find(i=>i.id==='world07-met-29616');view.inspect(item.id);assert.equal(html.split(escape(item.caption[lang])).length-1,1);assert.equal(html.split(escape(item.interpretation[lang])).length-1,1);assert.ok(html.includes('data-action="visual-story" data-id="mysore-hyder-tipu-phase"'));}}
 finally{globalThis.document=original;}
});
