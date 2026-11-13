import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {IMAGE_TIME_LAYERS} from '../dist/image-time-layers.mjs';
const getty=readAtlasData('visual-assets-getty-images-04-v18.json'),nara=readAtlasData('visual-assets-us-archives-03-v18.json'),pacific=readAtlasData('visual-assets-pacific-archives-01-v18.json');
test('thirteen archive images have exact source rights and bilingual metadata',()=>{
 const items=[...getty.items,...nara.items,...pacific.items];assert.equal(items.length,13);assert.equal(new Set(items.map(a=>a.id)).size,13);
 for(const a of items){assert.ok(a.bytes<=750000);assert.ok(a.width<=3000&&a.height<=3000);assert.ok(a.rightsSourceUrl);assert.ok(a.metadataI18n.creator.zh);assert.ok(a.metadataI18n.date.zh);assert.ok(a.metadataI18n.institution.zh);}
 assert.ok(getty.items.every(a=>a.rights.label==='CC0'));assert.ok([...nara.items,...pacific.items].every(a=>a.rights.label==='Public domain'));
});
test('Getty separates medieval Hannibal imagery and recomposed Punic-Etruscan jewelry',()=>{
 const [hannibal,pendant]=getty.items;assert.equal(hannibal.representation,'manuscript-detail');assert.match(hannibal.interpretation.en,/sixteen centuries/);
 assert.match(pendant.interpretation.en,/probable Carthaginian origin/);assert.match(pendant.interpretation.en,/older Etruscan gold beads/);assert.match(pendant.interpretation.en,/probably a modern recomposition/);
});
test('U.S. archive captions preserve government claims and post-agreement chronology',()=>{
 const [truman,tonkin,guadalcanal,paris,tet]=nara.items;
 assert.match(truman.date,/1947/);assert.match(tonkin.date,/7 August.*10 August/);assert.match(tonkin.interpretation.en,/government’s claim.*not independent confirmation/);
 assert.match(guadalcanal.date,/10 December 1942/);assert.match(paris.interpretation.en,/27 January.*12 February/);assert.match(paris.interpretation.en,/fighting elsewhere in Vietnam continued/);assert.match(tet.interpretation.en,/medical care.*Huế/);
});
test('Pacific images keep item dates and specific human contexts',()=>{
 const [kokoda,hiroshima,bikini,singapore,guadalcanal,japan]=pacific.items;
 assert.match(kokoda.interpretation.en,/documented conscription/);assert.match(hiroshima.date,/1946/);assert.match(hiroshima.interpretation.en,/year after the bombing/);assert.doesNotMatch(hiroshima.interpretation.en,/recover(?:ed|y)/);
 assert.match(bikini.date,/25 July 1946/);assert.match(bikini.interpretation.en,/Marshallese communities displaced/);assert.match(singapore.date,/20 September 1945/);assert.match(singapore.interpretation.en,/leaves the women unnamed/);
 assert.match(guadalcanal.caption.en,/October 1942 according to/);assert.match(japan.interpretation.en,/promulgation in 1946.*3 May 1947/);
 assert.equal(singapore.contextSources.length,1);assert.equal(japan.contextSources.length,3);
});
test('Guadalcanal gains two perspectives without double-counting coverage',()=>{
 const media=readAtlasData('history-media-v18.json'),coverage=readAtlasData('visual-coverage-v18.json');
 const pair=media.items.filter(a=>a.recordIds.includes('guadalcanal-island-war'));
 assert.equal(pair.length,2);assert.deepEqual(new Set(pair.map(a=>a.id)),new Set(['us-archives-03-guadalcanal','pacific-awm-043648']));
 assert.equal(coverage.assets,545);assert.equal(coverage.covered,1012);assert.equal(coverage.total,2087);assert.equal(coverage.targetMet,false);
});
test('Japanese constitution sequence distinguishes photograph year from legal commencement',()=>{
 const layer=IMAGE_TIME_LAYERS.find(a=>a.assetId==='pacific-awm-c250563');assert.ok(layer);assert.equal(layer.stages.length,2);
 assert.equal(layer.stages[0].date.en,'1946');assert.match(layer.stages[0].note.en,/3 November.*without specifying its day/);assert.equal(layer.stages[1].date.en,'3 May 1947');
});
