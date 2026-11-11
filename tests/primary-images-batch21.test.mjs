import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {VISUAL_STUDIES} from '../dist/visual-studies.mjs';
const china=readAtlasData('visual-assets-china-batch-10-v18.json'),world=readAtlasData('visual-assets-world-batch-12-v18.json');
test('twelve Chinese objects retain exact image identities and bounded chronology',()=>{
 assert.equal(china.items.length,12);assert.equal(china.associations.length,12);
 const find=tail=>china.items.find(i=>i.id==='china-batch-10-'+tail);
 for(const item of china.items){assert.equal(item.rights.label,'CC BY 4.0');assert.ok(item.sourceUrl.startsWith('https://digitalarchive.npm.gov.tw/Collection/Detail/'));assert.ok(Math.max(item.width,item.height)<=1400);assert.ok(item.bytes<600000);}
 assert.match(find('guoxi-early-spring').date,/1072.*1759/);
 assert.match(find('qin-measure-rubbing').date,/Rubbing undated.*221 BCE/);
 assert.match(find('wenzhengming-drunken-pavilion').date,/1551.*lunar.*1046/);
 assert.match(find('altishahr-commemoration').downloadedFrom,/PAA/);
 assert.match(find('mayuan-spring-path').downloadedFrom,/PAB/);
 assert.match(find('altishahr-commemoration').date,/undated/);
 assert.ok(readAtlasData('china-visual-reviews-v18.json').eventReviews.some(r=>r.id==='china-event-qing-020'));
});
test('six Pacific and Ethiopian images retain exact rights and distinct historical dates',()=>{
 assert.equal(world.items.length,6);assert.equal(new Set(world.associations.map(a=>a.recordId)).size,5);
 for(const i of world.items){assert.ok(Math.max(i.width,i.height)<=1200);assert.ok(i.bytes<600000);assert.ok(i.rights.note.en&&i.rights.note.zh);}
 const find=tail=>world.items.find(i=>i.id==='world-batch-12-'+tail);
 assert.equal(find('waitangi-account').date,'1890');assert.equal(find('tupou-portrait').date,'26 July 1884');assert.equal(find('mau-leaflet').date,'10 February 1930');
 for(const tail of ['ethiopian-cross','ethiopian-manuscript']){assert.equal(find(tail).rights.label,'CC0');assert.match(find(tail).rights.note.en,/image-specific CC0/);}
 assert.match(find('ethiopian-manuscript').caption.en,/King David/);assert.match(find('ethiopian-manuscript').interpretation.en,/not a portrait of a Solomonic/);
});
test('Song comparison distinguishes painting dates from imperial additions',()=>{
 const study=VISUAL_STUDIES.find(s=>s.id==='two-song-mountain-worlds');assert.ok(study);assert.equal(study.observations.length,2);
 assert.match(study.observations[0].en,/1072.*1759/);assert.match(study.observations[1].en,/undated.*Dong Qichang/);
});
