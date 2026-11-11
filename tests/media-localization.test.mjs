import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {applyMediaLocalization,mediaMetadata,mediaFigures,auditHistoryMedia} from '../dist/history-media.mjs';
import {visualRows,filterVisualRows} from '../dist/visual-library.mjs';
const data=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url)));
const original=data('history-media-v17.json').items[0];
const catalog={version:2,reviewedAt:'2026-11-11',items:[original]};
const row={assetId:original.id,date:{en:original.date,zh:'约1868年拍摄；1875年印制'},creator:{en:original.creator,zh:'朱莉娅·玛格丽特·卡梅伦'},institution:{en:original.institution,zh:'芝加哥艺术博物馆，阿尔弗雷德·施蒂格利茨收藏'}};
const layer={version:1,language:'zh',items:[row]};
test('media localization preserves source dates, credits, IDs and bytes without mutating its inputs',()=>{
 const before=JSON.stringify(catalog),localized=applyMediaLocalization(catalog,layer).items[0];
 assert.equal(JSON.stringify(catalog),before);for(const key of Object.keys(original))assert.deepEqual(localized[key],original[key]);
 for(const key of ['date','creator','institution']){assert.equal(mediaMetadata(localized,key,'en'),original[key]);assert.equal(mediaMetadata(localized,key,'zh'),row[key].zh);}
 assert.deepEqual(auditHistoryMedia({...catalog,items:[localized]},original.recordIds),[]);
});
test('localization rejects unknown IDs, duplicates, missing translations and stale source strings',()=>{
 for(const invalid of [{...layer,language:'en'},{...layer,items:[row,row]},{...layer,items:[{...row,assetId:'missing'}]},{...layer,items:[{...row,date:{en:'new date',zh:'译文'}}]},{...layer,items:[{...row,creator:{en:original.creator,zh:''}}]}])assert.throws(()=>applyMediaLocalization(catalog,invalid));
 const localized=applyMediaLocalization(catalog,layer).items[0];localized.date='Changed date';assert.equal(mediaMetadata(localized,'date','zh'),'Changed date');assert.ok(auditHistoryMedia({...catalog,items:[localized]},original.recordIds).some(error=>error.includes('stale')));
 assert.equal(mediaMetadata(original,'creator','zh'),original.creator);
});
test('Chinese metadata appears in captions and collection search while English remains unchanged',()=>{
 const localized=applyMediaLocalization(catalog,layer),item=localized.items[0],zh=mediaFigures([item],'zh',String),en=mediaFigures([item],'en',String);
 for(const key of ['date','creator','institution']){assert.ok(zh.includes(row[key].zh));assert.ok(en.includes(row[key].en));}
 const rows=visualRows(localized,[]);assert.equal(filterVisualRows(rows,{query:'卡梅伦'}).length,1);assert.equal(filterVisualRows(rows,{query:'芝加哥'}).length,1);
});
test('delivered localization has complete current coverage and a manifest receipt',()=>{
 const manifest=data('content-expansion-v18.json'),receipt=manifest.mediaLocalization,bytes=fs.readFileSync(new URL('../dist/data/'+receipt.file,import.meta.url));
 assert.equal(bytes.length,receipt.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),receipt.sha256);
 const layer=JSON.parse(bytes),media=data(manifest.mediaFile);assert.equal(layer.items.length,receipt.assets);assert.equal(layer.items.length,media.items.length);
 assert.deepEqual(applyMediaLocalization(media,layer),media);for(const item of media.items)for(const key of ['date','creator','institution'])assert.ok(item.metadataI18n[key].zh.trim());
 const sima=media.items.find(i=>i.id==='china-batch-04-simaguang');assert.match(mediaMetadata(sima,'date','zh'),/后加肖像/);assert.match(mediaMetadata(sima,'date','zh'),/年代未定/);
 const borobudur=media.items.find(i=>i.id==='world-batch-03-borobudur');assert.match(mediaMetadata(borobudur,'date','zh'),/上传/);assert.match(mediaMetadata(borobudur,'date','zh'),/拍摄日期未载/);
});

test('downloadable image credit notice includes every current image and its rights source',()=>{
 const media=data('history-media-v18.json'),notice=fs.readFileSync(new URL('../dist/assets/history-media/NOTICE.md',import.meta.url),'utf8');
 for(const item of media.items){for(const value of [item.file.split('/').at(-1),item.creator,item.sourceUrl,item.rightsSourceUrl,item.rights.url,item.rights.note.en,item.transformation.en])assert.ok(notice.includes(value),item.id+': missing notice credit');}
});
