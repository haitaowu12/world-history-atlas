import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {VISUAL_STUDIES} from '../dist/visual-studies.mjs';
const s=readAtlasData('visual-assets-world-batch-10-v18.json');
test('nine world images cover seven specific histories with item-level rights',()=>{
 assert.equal(s.items.length,9);assert.equal(new Set(s.associations.map(x=>x.recordId)).size,7);
 for(const a of s.items){assert.ok(a.width<=1000&&a.height<=1000);assert.ok(a.bytes<600000);assert.ok(a.sourceUrl.startsWith('https://wellcomecollection.org/works/'));assert.ok(a.rights.url.includes('creativecommons.org'));}
 const sugar=s.items.find(a=>a.id==='world-batch-10-ezqx6c7n');assert.equal(sugar.rights.url,'https://creativecommons.org/licenses/by/4.0/');assert.match(sugar.date,/1683.*1671/);
 const bangkok=s.items.find(a=>a.id==='world-batch-10-w6up2kpv');assert.match(bangkok.date,/1865.*1981/);assert.match(bangkok.caption.zh,/1865.*1981/);
 const tonga=s.items.find(a=>a.id==='world-batch-10-p342kq5t');assert.match(tonga.date,/probably/);assert.match(tonga.caption.zh,/暂/);
 assert.ok(!s.items.some(a=>a.id.endsWith('d5kz6wfn')));
});
test('Panama pair retains distinct places and communities',()=>{
 const p=VISUAL_STUDIES.find(s=>s.id==='panama-work-and-households');assert.equal(p.assets.length,2);assert.match(p.observations[0].en,/Culebra.*American and European/);assert.match(p.observations[1].en,/West Indian and Panamanian.*Cristóbal/);
});
test('three existing world links preserve the named person or author and distinguish Belmont from Starr',()=>{
 const x=readAtlasData('visual-assets-existing-world-links-07-v18.json');assert.equal(x.items.length,0);assert.equal(x.associations.length,3);
 assert.deepEqual(x.associations.map(a=>a.recordId),['roman-republic','heian-court','hull-house-immigrant-neighborhood']);assert.match(x.associations[1].context.en,/nineteenth-century/);assert.match(x.associations[2].context.en,/Belmont.*not be mistaken for Starr/s);
});
