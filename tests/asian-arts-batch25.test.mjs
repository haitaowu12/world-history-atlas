import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const s=readAtlasData('visual-assets-world-batch-14-v18.json');
test('Goryeo painting and Ayyubid ceramics preserve three specific CC0 images',()=>{
 assert.equal(s.items.length,3);assert.equal(s.associations.length,3);
 assert.deepEqual([...new Set(s.items.flatMap(a=>a.recordIds))],['goryeo-kingdom','ayyubid-dynasty']);
 for(const a of s.items){assert.equal(a.rights.label,'CC0');assert.ok(a.rightsSourceUrl.includes('smithsonian-open-access'));assert.ok(a.downloadedFrom.includes('_screen'));assert.ok(a.width<=1200&&a.height<=1200);assert.deepEqual(s.associations.find(x=>x.assetId===a.id).context,a.interpretation);}
 assert.match(s.items[0].caption.en,/fourteenth century/);assert.match(s.items[0].interpretation.en,/Kshitigarbha/);
 assert.match(s.items[1].interpretation.en,/Six projecting spouts/);assert.match(s.items[2].caption.en,/waster/);assert.match(s.items[2].interpretation.en,/excavation context is unrecorded/);
});
test('second prose pass preserves important archaeological and political qualifications',()=>{
 const edits=readAtlasData('summary-edits-v18.json');assert.equal(edits.items.length,154);
 const by=new Map(edits.items.map(x=>[x.recordId,x.after]));
 assert.match(by.get('gobekli-tepe').en,/purposes remain/);assert.match(by.get('akkadian-empire').en,/not been securely located/);
 assert.match(by.get('poverty-point').en,/remain incompletely understood/);assert.match(by.get('wari-imperial-world').en,/causes remain debated/);
 assert.match(by.get('black-death').en,/consequences were not identical/);assert.match(by.get('southern-song').en,/governed by different states/);
 assert.match(by.get('timurid-dynasty').en,/imperial violence/);assert.match(by.get('timurid-dynasty').zh,/帝国暴力/);
});
