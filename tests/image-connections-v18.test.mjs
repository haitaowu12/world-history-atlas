import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-existing-links-03-v18.json');
const catalog=readAtlasData('history-media-v18.json'),assets=new Map(catalog.items.map(i=>[i.id,i]));
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
test('fifty additional story connections are individually linked to existing named-person images',()=>{
 assert.equal(shard.items.length,0);assert.equal(shard.associations.length,50);assert.equal(new Set(shard.associations.map(a=>a.recordId)).size,50);
 for(const row of shard.associations){assert.equal(row.role,'named-person');assert.ok(records.has(row.recordId));assert.ok(assets.has(row.assetId));assert.equal(row.evidenceUrl,assets.get(row.assetId).sourceUrl);assert.ok(row.context.en.length>35);assert.ok(row.context.zh.length>15);}
});
test('secondary mentions and unresolved narratives remain excluded from this association pass',()=>{
 const ids=new Set(shard.associations.map(a=>a.recordId));
 for(const id of ['china-event-qing-026','china-landmark-226','china-landmark-127','china-landmark-425','china-landmark-482','china-event-donghan-023','china-event-sui-001','china-landmark-039','china-landmark-443','china-landmark-370','china-event-qing-011','china-landmark-423'])assert.ok(!ids.has(id),id);
 assert.ok(!ids.has('china-landmark-119'));assert.ok(!ids.has('china-landmark-505'));
});
test('multi-person albums identify the relevant sitter without inventing clothing dates',()=>{
 const get=id=>shard.associations.find(a=>a.recordId===id).context;
 assert.match(get('china-landmark-004').en,/Xiao He appears alongside Han Xin/);
 assert.match(get('china-landmark-364').en,/right-hand portrait.*Guo Ziyi/);
 assert.match(get('china-landmark-503').en,/Ming portrait of Yue Fei in official robes/);
 assert.ok(!get('china-landmark-503').zh.includes('衣冠采用'));
 assert.match(get('china-event-beisong-024').en,/portrait added/);
});

test('next connection batch admits only distinct new IDs and preserves prior contributor hold',()=>{
 const shard=readAtlasData('visual-assets-existing-links-04-v18.json');assert.equal(shard.items.length,0);assert.equal(shard.associations.length,82);assert.equal(new Set(shard.associations.map(a=>a.recordId)).size,82);
 assert.ok(!shard.associations.some(a=>a.recordId==='china-landmark-226'));
 for(const id of ['china-landmark-372','china-landmark-211','china-landmark-374','china-landmark-380','china-landmark-375']){
  const a=shard.associations.find(a=>a.recordId===id);assert.equal(a.assetId,'china-batch-06-liuzongyuan');assert.match(a.context.en,/Bai Juyi.*left.*Liu Zongyuan.*right/);assert.match(a.context.zh,/左.*白居易/);
 }
 const site=shard.associations.find(a=>a.recordId==='china-event-zhanguo-018');assert.equal(site.role,'named-site');assert.match(site.context.en,/modern photograph.*Li Bing/);const siteAsset=readAtlasData('history-media-v18.json').items.find(i=>i.id===site.assetId);assert.match(siteAsset.date,/2020-05-22/);assert.match(siteAsset.caption.en,/repeatedly modified/);
 assert.equal(shard.associations.find(a=>a.recordId==='tuskegee-mobile-agricultural-education').role,'named-person');
});
