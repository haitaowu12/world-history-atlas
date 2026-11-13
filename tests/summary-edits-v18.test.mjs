import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {applySummaryEdits} from '../dist/content-expansion.mjs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const manifest=readAtlasData('content-expansion-v18.json'),edits=readAtlasData(manifest.summaryEditsFile);
const original=loadAtlasRecords({...manifest,summaryEditsFile:null}).records;
const revised=loadAtlasRecords(manifest).records;
test('reviewed summary edits preserve every historical field and source',()=>{
 assert.equal(edits.items.length,194);assert.deepEqual(revised.map(r=>r.id),original.map(r=>r.id));
 const targets=new Set(edits.items.map(e=>e.recordId));
 for(let i=0;i<original.length;i++){
  const before=original[i],after=revised[i];
  if(!targets.has(before.id)){assert.deepEqual(after,before);continue;}
  const {summary,editorialRevision,...rest}=after;const {summary:priorSummary,...priorRest}=before;
  assert.deepEqual(rest,priorRest);assert.deepEqual(editorialRevision.previousSummary,priorSummary);
  assert.equal(editorialRevision.scope,'summary-only');assert.ok(summary.en&&summary.zh);
 }
 assert.equal(manifest.summaryEdits.sha256,createHash('sha256').update(fs.readFileSync(new URL('../dist/data/'+manifest.summaryEditsFile,import.meta.url))).digest('hex'));
});
test('editorial overlays reject stale text, unknown identities and non-summary changes',()=>{
 const edit=structuredClone(edits.items[0]);
 const run=e=>applySummaryEdits(original,{...edits,items:[e]});
 assert.throws(()=>run({...edit,recordId:'missing'}),/Unknown/);
 assert.throws(()=>run({...edit,start:1999}),/other fields/);
 assert.throws(()=>run({...edit,before:{...edit.before,en:'stale'}}),/changed since/);
 assert.throws(()=>run({...edit,after:{...edit.after,zh:''}}),/bilingual/);
 assert.throws(()=>applySummaryEdits(original,{...edits,items:[edit,edit]}),/duplicate/);
 const frozen=structuredClone(original);run(edit);assert.deepEqual(original,frozen);
});
test('edited prose retains meaningful chronology and image limits',()=>{
 const byId=new Map(revised.map(r=>[r.id,r]));
 assert.match(byId.get('early-chakri-monarchy').summary.en,/did not end the dynasty/);
 assert.ok(!byId.get('early-chakri-monarchy').summary.en.includes('prevents the bar'));
 assert.match(byId.get('sardis-early-coinage').summary.en,/precise date.*disputed/);
 assert.match(byId.get('toltec-tula-state').summary.en,/extent.*unresolved/);
 assert.match(byId.get('china-song-money-networks').summary.en,/Ming/);
 assert.match(byId.get('china-song-textile-households').summary.en,/carefully composed image/);
 assert.ok(!byId.get('petra-caravan-water').summary.en.includes('network that also included Palmyra'));
});
test('browser and command-line assembly share the same summary-only overlay',()=>{
 const app=fs.readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');
 const node=fs.readFileSync(new URL('../scripts/lib/atlas-records.mjs',import.meta.url),'utf8');
 for(const source of [app,node]){assert.match(source,/applySummaryEdits\(applyPlaceLabelTranslations/);assert.match(source,/summaryEditsFile/);}
});
test('fourth prose pass retains material caveats and specific historical distinctions',()=>{
 const byId=new Map(revised.map(r=>[r.id,r]));
 const get=id=>byId.get(id).summary;
 assert.match(get('lapita-teouma-community').en,/probably arrived/);assert.match(get('lapita-teouma-community').en,/marine foods affect/);
 assert.match(get('samarkand-observatory').en,/1424/);assert.match(get('samarkand-observatory').en,/1437/);assert.match(get('samarkand-observatory').en,/Qadi Zada, al-Kashi and Ulugh Beg/);
 assert.match(get('singapore-trading-post-treaty').en,/Sultan Hussein Shah and Temenggong Abdul Rahman/);assert.match(get('singapore-trading-post-treaty').en,/1824.*unequal conditions/);
 assert.match(get('hangul-promulgation').en,/1443.*1446/);assert.match(get('hangul-promulgation').en,/did not instantly replace/);assert.doesNotMatch(get('hangul-promulgation').en,/script widened/);
 assert.match(get('indonesian-independence').en,/experiences varied across the archipelago/);assert.match(get('indonesian-independence').zh,/群岛各地经历各异/);
 assert.match(get('vietnam-hoi-an-ceramic-cargo').en,/not a proven itinerary/);assert.match(get('vietnam-hoi-an-ceramic-cargo').en,/do not establish a single exact sinking year/);
 assert.match(get('vanuatu-sand-drawing-knowledge').en,/possible returns/);
});
test('sixth prose pass preserves Indigenous authority, coercion and separate political dates',()=>{
 const byId=new Map(revised.map(r=>[r.id,r]));const get=id=>byId.get(id).summary;
 assert.match(get('wairau-bar-settlement').en,/Research accompanied the return/);
 assert.match(get('wairau-bar-settlement').en,/Descendant communities’ authority/);
 assert.match(get('brewarrina-ngunnhu-engineering').en,/does not establish a secure construction year/);
 assert.match(get('kokoda-papuan-labour').en,/conscription.*poor conditions.*compensation/);
 assert.match(get('kokoda-papuan-labour').zh,/征发.*恶劣条件.*补偿/);
 assert.match(get('niue-free-association').en,/when requested by Niue’s government/);
 assert.match(get('japan-postwar-constitution').en,/3 November 1946.*3 May 1947/);
 assert.match(get('japan-postwar-constitution').zh,/1946年11月3日.*1947年5月3日/);
 assert.match(get('australia-1967-referendum').en,/did not first grant citizenship or voting rights/);
 assert.match(get('ceylon-tea-plantation-labour').en,/same formal indenture contract/);
 assert.match(get('tuskegee-mobile-agricultural-education').en,/does not establish who attended/);
});
