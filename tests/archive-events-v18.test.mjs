import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
test('two archive photographs connect only their specific histories with item rights',()=>{
 const s=readAtlasData('visual-assets-archive-events-01-v18.json');assert.equal(s.items.length,2);assert.deepEqual(s.associations,[]);
 assert.deepEqual(s.items.map(x=>x.recordIds),[['indonesian-independence'],['holocaust']]);
 for(const a of s.items){assert.equal(a.rights.label,'Public domain');assert.match(a.sourceUrl,/awm.gov.au/);assert.match(a.transformation.en,/unchanged/);assert.ok(a.width<=640);}
 assert.match(s.items[0].date,/catalogue date/);assert.match(s.items[0].interpretation.en,/1949/);assert.match(s.items[0].creator,/Life/);
 assert.match(s.items[1].caption.en,/exact photograph date is not supplied/);assert.match(s.items[1].interpretation.en,/names and individual stories unrecorded/);
 assert.doesNotMatch(s.items[1].caption.en,/all.*Jewish/);
});
test('Edo prose retains concrete cultural and diplomatic facts without the generic concluding lesson',()=>{
 const r=loadAtlasRecords().records.find(x=>x.id==='edo-urban-culture');
 assert.match(r.summary.en,/Kabuki theatre, woodblock prints/);assert.match(r.summary.en,/Nagasaki/);assert.match(r.summary.zh,/长崎/);assert.doesNotMatch(r.summary.en,/useful way to explore/);assert.equal(readAtlasData('summary-edits-v18.json').items.length,86);
});
