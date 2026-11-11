import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {matchingVisualStudy} from '../dist/visual-studies.mjs';
const shard=readAtlasData('visual-assets-china-culture-12-v18.json');
test('Night Revels replaces exact inherited commission with sourced contextual range',()=>{
 const r=loadAtlasRecords().records.find(r=>r.id==='china-landmark-526');
 assert.equal(r.start,937);assert.equal(r.end,975);assert.equal(r.provenance.originalRecord.start,960);
 assert.equal(r.location.lon,118.79);assert.equal(r.location.lat,32.04);
 assert.match(r.summary.en,/transmitted story/);assert.match(r.dateNote.en,/no established exact year/);
 assert.equal(r.sources.filter(s=>s.url.includes('digitalarchive.npm.gov.tw')).length,2);
 assert.ok(r.sources.filter(s=>s.url.includes('digitalarchive.npm.gov.tw')).every(s=>s.evidenceNoteZh));
});
test('copy and Ming adaptation retain distinct attributions and source rights',()=>{
 assert.equal(shard.items.length,2);assert.deepEqual(shard.associations,[]);
 for(const a of shard.items){assert.deepEqual(a.recordIds,['china-landmark-526']);assert.equal(a.rights.label,'CC BY 4.0');assert.equal(a.representation,'historical-artwork');}
 assert.match(shard.items[0].creator,/Unidentified Ming artist/);assert.match(shard.items[0].caption.en,/another Ming artist/);
 assert.match(shard.items[1].date,/Undated old copy/);assert.match(shard.items[1].caption.en,/not consider this the original/);
 assert.ok(matchingVisualStudy(shard.items.map(a=>a.id)));
});
