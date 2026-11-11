import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
test('Ayusi scroll retains an exact campaign connection and source chronology',()=>{
 const s=readAtlasData('visual-assets-china-batch-13-v18.json');assert.equal(s.items.length,1);assert.equal(s.associations.length,0);
 const a=s.items[0];assert.deepEqual(a.recordIds,['china-event-qing-018']);assert.equal(a.rights.label,'CC BY 4.0');assert.equal(a.width,3000);assert.equal(a.height,412);assert.equal(a.representation,'lifetime-portrait');assert.match(a.date,/1755/);assert.doesNotMatch(a.date,/1775/);assert.match(a.caption.en,/commemorative court portrait/);
});
test('the Ili story distinguishes defeat and capture from the mistranslated destruction of Dawachi',()=>{
 const r=loadAtlasRecords().records.find(x=>x.id==='china-event-qing-018');assert.equal(r.start,1755);assert.equal(r.end,1755);assert.match(r.title.en,/defeated and captured/);assert.match(r.summary.en,/ruler of Ush/);assert.match(r.summary.zh,/乌什城主/);assert.match(r.provenance.originalText.title.en,/destroying/);assert.equal(r.location.lon,81.3);assert.equal(r.location.lat,43.9);assert.match(r.dateNote.en,/not the precise raid/);assert.ok(r.sources.some(x=>x.evidenceNote?.includes('misprints 1775')));
});
test('Hiroshige printing block distinguishes the designer from unidentified production workers',()=>{
 const s=readAtlasData('visual-assets-world-batch-15-v18.json');assert.equal(s.items.length,1);assert.equal(s.associations.length,1);
 const a=s.items[0];assert.deepEqual(a.recordIds,['edo-urban-culture']);assert.equal(a.rights.label,'CC0');assert.match(a.date,/1840.*1842/);assert.match(a.creator,/carver unidentified/);assert.match(a.interpretation.en,/carver and printer remain unidentified/);assert.match(a.interpretation.zh,/刻工与印工的身份未详/);assert.deepEqual(s.associations[0].context,a.interpretation);assert.equal(a.contextSources[0].title.zh,'江户时期的艺术（1615—1868年）');
});
test('Australia civic images keep object, photograph and political-rights dates distinct',()=>{
 const s=readAtlasData('visual-assets-oceania-images-01-v18.json');assert.equal(s.items.length,2);assert.deepEqual(s.associations,[]);
 assert.deepEqual(s.items.map(x=>x.recordIds),[['australian-federation'],['australia-1967-referendum']]);
 assert.equal(s.items[0].rights.label,'Public domain');assert.match(s.items[0].caption.en,/1901/);assert.match(s.items[0].caption.en,/film copy negative/);
 assert.equal(s.items[1].rights.label,'CC BY 4.0');assert.match(s.items[1].creator,/Jon Augier/);assert.match(s.items[1].date,/photograph date not supplied/);assert.match(s.items[1].interpretation.en,/did not first confer citizenship or voting rights/);
});
