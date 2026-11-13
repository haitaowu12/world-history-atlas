import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {createHistoryMedia} from '../dist/history-media.mjs';
const shard=readAtlasData('visual-assets-rebuilt-links-02-v18.json');
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
const link=id=>shard.associations.find(x=>x.recordId===id);
test('ten rebuilt image contexts add nine distinct entries without inventing assets',()=>{
 assert.equal(shard.items.length,0);assert.equal(shard.associations.length,10);assert.equal(new Set(shard.associations.map(x=>x.recordId)).size,9);
 const c=readAtlasData('visual-coverage-v18.json');assert.equal(c.covered,968);assert.equal(c.assets,536);assert.equal(c.remaining,76);
 for(const a of shard.associations){assert.ok(records.has(a.recordId));assert.ok(c.coveredIds.includes(a.recordId));assert.ok(a.context.en&&a.context.zh&&a.evidenceUrl);}
});
test('rebuilt contexts distinguish later artworks, collective scenes and comparison sites',()=>{
 assert.match(link('mali-empire').context.en,/1375.*European/s);
 assert.match(link('northern-wei-dynasty').context.en,/Longmen.*after his death.*distinct from Yungang/s);
 assert.match(link('person-huda-shaarawi').context.en,/speakers are unnamed/);
 assert.match(link('cherokee-phoenix-publication').context.en,/1838.*1828–1834.*not a newspaper page/);
 assert.match(link('china-landmark-356').context.en,/1711.*rather than documenting.*750/s);
 assert.match(shard.associations.find(x=>x.assetId==='world-batch-05-ajanta-cave-workshops').context.en,/later than this entry/);
 const media=createHistoryMedia(readAtlasData('history-media-v18.json'));assert.equal(media.portrait('person-huda-shaarawi'),null);assert.equal(media.portrait('person-faith-bandler'),null);
});
test('Zhang Qian review corrects the mission without changing inherited date or coordinates',()=>{
 const r=records.get('china-event-xihan-006');assert.equal(r.start,-138);assert.equal(r.end,-138);assert.equal(r.location.lon,67.001);assert.equal(r.location.lat,39.701);
 for(const term of ['139–138 BCE','Yuezhi','Xiongnu','126 BCE','visited','reports','existing networks'])assert.ok(r.summary.en.includes(term));
 assert.match(r.dateNote.en,/not the departure location/);assert.equal(r.provenance.status,'reviewed');assert.ok(r.sources.some(s=>s.url.includes('史記')));
});
test('eight concise summaries retain dynasty distinctions and exact referendum effects',()=>{
 const edits=readAtlasData('summary-edits-v18.json');
 for(const id of ['western-jin-dynasty','eastern-jin-dynasty','liu-song-dynasty','southern-qi-dynasty','liang-dynasty','chen-dynasty','northern-wei-dynasty','person-faith-bandler']){const e=edits.items.find(e=>e.recordId===id);assert.ok(e);assert.deepEqual(records.get(id).summary,e.after);}
 assert.match(records.get('person-faith-bandler').summary.en,/did not itself grant citizenship or the vote/);
 assert.match(records.get('chen-dynasty').summary.en,/581.*eight years.*589/s);
 assert.match(records.get('liu-song-dynasty').summary.en,/distinct from the Song founded in 960/);
});
