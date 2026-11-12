import test from 'node:test';import assert from 'node:assert/strict';import {readAtlasData} from '../scripts/lib/atlas-records.mjs';import {createHistoryMedia} from '../dist/history-media.mjs';
const shard=readAtlasData('visual-assets-us-archives-04-v18.json'),by=new Map(shard.items.map(a=>[a.id,a]));
const get=id=>by.get('us-archives-04-'+id);
test('eight archival images add eight exact subjects with complete bilingual provenance',()=>{
 assert.equal(shard.items.length,8);assert.equal(new Set(shard.items.flatMap(a=>a.recordIds)).size,8);
 for(const a of shard.items){assert.equal(a.rights.label,'Public domain');assert.equal(a.recordIds.length,1);for(const k of ['creator','date','institution']){assert.equal(a.metadataI18n[k].en,a[k]);assert.ok(a.metadataI18n[k].zh);}assert.ok(a.bytes<=750000);}
 assert.equal(shard.items.reduce((n,a)=>n+a.bytes,0),620139);
});
test('Apollo and Berlin dates identify the pictured moment rather than conflate nearby events',()=>{
 assert.match(get('apollo').imageUrl,/5903-alt/);assert.match(get('apollo').caption.en,/Neil Armstrong.*Buzz.*Aldrin/);
 assert.match(get('apollo').interpretation.en,/launch site on Earth/);assert.match(get('apollo').interpretation.en,/Michael Collins/);
 assert.match(get('berlin').date,/14 November 1989/);assert.match(get('berlin').interpretation.en,/9 November 1989.*1990/);
});
test('recognition, labour and civil-rights images retain the limits specific to their sources',()=>{
 assert.match(get('israel').interpretation.en,/U.S. diplomatic decision/);assert.match(get('israel').interpretation.en,/Palestinian displacement and dispossession/);
 assert.match(get('bracero').interpretation.en,/does not name the family/);assert.match(get('bracero').interpretation.zh,/合约身份/);
 assert.match(get('mlk').date,/28 August 1963/);assert.match(get('mlk').rights.note.en,/not the speech/);assert.doesNotMatch(get('mlk').interpretation.en,/copyright/);
});
test('photographic portraits and supplied small renditions remain identifiable and disclosed',()=>{
 assert.equal(createHistoryMedia(shard).portrait('person-rachel-carson').id,get('carson').id);assert.match(get('carson').date,/Circa 1944/);
 assert.match(get('havel').transformation.en,/server-generated card/);assert.equal(get('havel').width,500);
 assert.deepEqual([get('bracero').width,get('bracero').height],[298,196]);assert.deepEqual([get('mlk').width,get('mlk').height],[250,250]);
 for(const id of ['bracero','mlk'])assert.match(get(id).transformation.en,/fine detail is limited/);
});
