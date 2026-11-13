import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
const manuscript=readAtlasData('visual-assets-world-batch-16-v18.json'),objects=readAtlasData('visual-assets-getty-images-02-v18.json');
test('five Getty images preserve specific subjects, CC0 and conforming source derivatives',()=>{
 const items=[...manuscript.items,...objects.items];assert.equal(items.length,5);
 assert.deepEqual(items.map(a=>a.recordIds[0]),['person-christine-pizan','charlemagne-coronation','black-death','roman-principate','hellenistic-kingdoms']);
 for(const a of items){assert.equal(a.rights.label,'CC0');assert.match(a.sourceUrl,/getty.edu\/art\/collection\/object\//);assert.match(a.downloadedFrom,/media.getty.edu\/iiif\/image\//);assert.ok(a.bytes<=750000);assert.ok(a.width<=3000&&a.height<=3000);assert.ok(a.metadataI18n.creator.zh);}
 assert.equal(manuscript.items[0].kind,'manuscript');assert.equal(manuscript.items[0].representation,'manuscript-detail');assert.equal(manuscript.items[0].bytes,530443);
});
test('Getty captions distinguish source dates from depicted lives and events',()=>{
 const [christine]=manuscript.items,[charlemagne,plague,augustus,berenike]=objects.items;
 assert.match(christine.caption.en,/1470.*1515–1520/);assert.match(christine.interpretation.en,/later manuscript illustration/);
 assert.match(charlemagne.caption.en,/1840.*800/s);assert.match(charlemagne.interpretation.en,/nineteenth-century interpretation/);
 assert.match(plague.caption.en,/1735.*1348/s);assert.match(plague.interpretation.en,/centuries after/);assert.doesNotMatch(plague.interpretation.en,/Cambridge/);
 assert.match(augustus.interpretation.en,/idealized portrait/);assert.match(berenike.interpretation.en,/extends beyond her lifetime/);
});
test('Getty batch counts five distinct images and unique entry coverage',()=>{
 const evidence=readAtlasData('visual-coverage-v18.json'),media=readAtlasData('history-media-v18.json');
 assert.equal(evidence.assets,494);assert.equal(evidence.covered,900);assert.equal(evidence.total,2087);
 assert.equal(new Set(media.items.map(a=>a.id)).size,494);
});
test('fifth prose pass retains political exclusions, living communities and unfinished settlements',()=>{
 const by=new Map(loadAtlasRecords().records.map(x=>[x.id,x.summary]));
 assert.match(by.get('us-constitution').en,/compromises protecting slavery/);
 assert.match(by.get('rapa-nui').en,/living culture disappeared/);assert.match(by.get('first-fleet-colonization').en,/Eora peoples/);
 assert.match(by.get('korean-war-armistice').en,/not a peace treaty/);assert.match(by.get('nunavut-creation').en,/Inuit treaty rights/);
 assert.match(by.get('hawaiian-unification').en,/rather than through the successful invasion/);
 assert.match(by.get('un-charter').en,/26 June 1945.*24 October/s);assert.doesNotMatch(by.get('un-charter').en,/map marker/);
 assert.match(by.get('nalanda').en,/can predate/);
});
