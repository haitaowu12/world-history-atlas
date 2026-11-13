import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r])),s=readAtlasData('visual-assets-exact-links-09-v18.json'),media=readAtlasData('history-media-v18.json');
test('eighteen exact links reuse seventeen admitted images and hold three unresolved historical claims',()=>{
 assert.equal(s.items.length,0);assert.equal(s.associations.length,18);assert.equal(new Set(s.associations.map(a=>a.recordId)).size,18);assert.equal(new Set(s.associations.map(a=>a.assetId)).size,17);
 for(const a of s.associations){assert.ok(records.has(a.recordId));assert.ok(media.items.some(i=>i.id===a.assetId));assert.ok(a.context.en&&a.context.zh&&a.evidenceUrl);}
 for(const id of ['china-landmark-455','china-event-dongjin-012','china-landmark-416'])assert.ok(!s.associations.some(a=>a.recordId===id));
});
test('Guandu, Guan Yu and Sui corrections retain original chronology and documentary provenance',()=>{
 const g=records.get('china-event-donghan-023');assert.equal(g.start,200);assert.match(g.title.en,/defeats Yuan Shao/);assert.match(g.summary.en,/207/);assert.match(g.provenance.originalText.title.en,/unifies northern China/);assert.ok(g.sources.some(s=>s.url.includes('brillonline')));
 const y=records.get('china-landmark-102');assert.equal(y.start,219);assert.match(y.summary.en,/Sun Quan’s army attacked from behind/);assert.doesNotMatch(y.title.en,/floods/);assert.match(y.provenance.originalText.title.en,/floods/);
 const sui=records.get('china-event-sui-001');assert.equal(sui.start,581);assert.equal(sui.end,581);assert.match(sui.summary.en,/reunification came in 589/);assert.doesNotMatch(sui.title.en,/Daxing/);assert.ok(sui.sources.some(s=>s.url.includes('cambridge.org')));
});
test('Canadian negotiation and Suez construction links retain the gap from their later event',()=>{
 const context=id=>s.associations.find(a=>a.recordId===id).context.en;
 assert.match(context('canada-polity'),/1864 Charlottetown/);assert.match(context('canada-polity'),/not.*four provinces of the 1867 federation/);
 assert.match(context('suez-crisis-1956'),/1864, not the 1956 fighting/);
 const flags=JSON.parse(fs.readFileSync(new URL('../docs/v18-history-quality-backlog-2026-11-13.json',import.meta.url)));assert.equal(flags.length,10);assert.ok(flags.every(x=>x.status.includes('not independently disproven')));
});
test('Marshallese chart is an authentic archival drawing with the provider’s actual rights label',()=>{
 const a=readAtlasData('visual-assets-exact-10-v18.json').items[0];assert.equal(a.kind,'artwork');assert.equal(a.representation,'historical-artwork');assert.equal(a.rights.label,'No Known Copyright Restrictions');assert.match(a.rights.note.en,/New Zealand law/);assert.match(a.rights.note.en,/not a CC0/);
 assert.match(a.interpretation.en,/studied charts ashore/);assert.match(a.interpretation.en,/not the navigational object itself/);
 const r=records.get('marshallese-navigation-charts');assert.match(r.summary.en,/Ethel Richardson/);assert.match(r.summary.en,/Waan Aelõñ in Majel/);assert.ok(r.sources.some(s=>s.url==='https://collections.tepapa.govt.nz/object/240379'));
});
