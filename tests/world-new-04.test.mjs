import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const shard=readAtlasData('visual-assets-world-new-04-v18.json'),records=new Map(loadAtlasRecords().records.map(x=>[x.id,x]));
test('five new official public-domain objects carry exact identities, rights and bytes',()=>{
 assert.equal(shard.items.length,5);assert.equal(shard.associations.length,0);
 for(const a of shard.items){assert.match(a.rights.label,/Public Domain/);assert.equal(a.rightsSourceUrl,a.sourceUrl);assert.match(a.sourceUrl,/metmuseum.org\/art\/collection\/search\//);const b=fs.readFileSync(new URL('../dist/'+a.file,import.meta.url));assert.equal(b.length,a.bytes);assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);assert.equal(a.recordIds.length,1);}
 assert.deepEqual(shard.items.flatMap(x=>x.recordIds),['akkadian-empire','hittite-hattusha','satavahana-dynasty','ghaznavid-dynasty','champa-kingdoms']);
});
test('object labels preserve modern impressions and uncertain identifications',()=>{
 const a=id=>shard.items.find(x=>x.id.endsWith(id));
 assert.match(a('326970').date,/modern impression/);assert.match(a('326970').caption.en,/not the cylinder itself/);
 assert.match(a('326717').interpretation.en,/not a findspot at the capital/);
 assert.match(a('65014').interpretation.en,/sitter is unnamed/);
 assert.match(a('455306').caption.en,/Abu Nasr al-Naqqash.*probably Ghazni/);
 assert.match(a('38314').caption.en,/Shiva or a temple guardian/);assert.match(a('38314').interpretation.en,/does not establish a My Son findspot/);
});
test('three material-culture additions add visible record sources without mutating the frozen follow-up',()=>{
 const m=readAtlasData('content-expansion-v18.json'),e=readAtlasData(m.evidenceReviewsFile);assert.equal(e.length,45);assert.deepEqual(e[0],readAtlasData('evidence-followups-v11.json')[0]);
 for(const [id,obj] of [['hittite-hattusha','326717'],['satavahana-dynasty','65014'],['ghaznavid-dynasty','455306']]){const r=records.get(id);assert.ok(r.sources.some(s=>s.url.endsWith('/'+obj)));assert.ok(r.evidenceReviews.some(x=>x.checkedAt==='2026-11-13'));}
 assert.match(records.get('satavahana-dynasty').summary.en,/unnamed male bust/);assert.match(records.get('ghaznavid-dynasty').summary.en,/Abu Nasr al-Naqqash/);
});
test('capital migration and memorial sculpture have different explicit periods',()=>{
 const r=records.get('china-landmark-035');assert.equal(r.start,493);assert.equal(r.end,494);assert.equal(r.provenance.originalRecord.end,493);assert.match(r.summary.en,/522–523.*after his death/);assert.equal(r.location.lon,112.45);assert.equal(r.location.lat,34.62);
});
test('Jingdezhen is an explicit thematic span rather than an invented exact foundation date',()=>{
 const r=records.get('china-landmark-153');assert.equal(r.start,1368);assert.equal(r.end,1487);assert.equal(r.provenance.originalRecord.start,1402);assert.match(r.dateNote.en,/thematic span.*not an asserted founding interval/);for(const d of ['1369','1402','Xuande'])assert.ok(r.dateNote.en.includes(d));assert.ok(r.sources.some(s=>s.url.includes('dpm.org.cn')));
 const s=readAtlasData('visual-assets-china-repairs-04-v18.json');assert.equal(s.associations.length,2);assert.ok(!s.associations.some(x=>x.recordId==='china-landmark-455'));
});
