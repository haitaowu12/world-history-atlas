import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import{createHash}from'node:crypto';
import{applyChronologyEdits}from'../dist/content-expansion.mjs';import{loadAtlasRecords,readAtlasData}from'../scripts/lib/atlas-records.mjs';
const edits=readAtlasData('chronology-edits-v18.json'),manifest=readAtlasData('content-expansion-v18.json');
const row={id:'sample',start:1875,end:1925,dateNote:{en:'Old object date',zh:'原器物定年'},summary:{en:'Unchanged',zh:'未改'},sources:[{url:'https://www.clevelandart.org/art/1971.149'}]};
const edit={recordId:'sample',before:{start:1875,end:1925,dateNote:row.dateNote},after:{start:1800,end:1899,dateNote:{en:'New object date',zh:'新器物定年'}},note:{en:'New exact object',zh:'新的对应器物'},sourceURLs:[row.sources[0].url]};
const wrap=e=>({editedAt:'2026-11-13',items:[e]});
test('chronology edits preserve source records and retain previous dates',()=>{
 const prior=structuredClone(row),result=applyChronologyEdits([row],wrap(edit))[0];assert.deepEqual(row,prior);assert.equal(result.start,1800);assert.equal(result.end,1899);assert.deepEqual(result.chronologyRevision.previous,edit.before);assert.deepEqual(result.summary,row.summary);assert.deepEqual(result.sources,row.sources);result.dateNote.en='changed';assert.equal(edit.after.dateNote.en,'New object date');
});
test('chronology layer rejects stale anchors, unknown targets and duplicate edits',()=>{
 assert.throws(()=>applyChronologyEdits([row],wrap({...edit,before:{...edit.before,start:1900}})),/dates changed/);assert.throws(()=>applyChronologyEdits([row],wrap({...edit,recordId:'missing'})),/Unknown or duplicate/);assert.throws(()=>applyChronologyEdits([row],{editedAt:'2026-11-13',items:[edit,edit]}),/Unknown or duplicate/);
});
test('chronology layer rejects invalid ranges, missing provenance and non-chronology fields',()=>{
 for(const after of [{...edit.after,start:0},{...edit.after,start:1900},{...edit.after,end:1899.5},{...edit.after,dateNote:{en:'Only English'}},{...edit.after,summary:{en:'other'}}])assert.throws(()=>applyChronologyEdits([row],wrap({...edit,after})),/invalid reviewed chronology|unsupported chronology/);
 assert.throws(()=>applyChronologyEdits([row],wrap({...edit,sourceURLs:[]})),/source is missing/);assert.throws(()=>applyChronologyEdits([row],wrap({...edit,sourceURLs:['https://example.org/']})),/source is missing/);assert.throws(()=>applyChronologyEdits([row],wrap({...edit,note:{en:'Only English'}})),/missing chronology provenance/);assert.throws(()=>applyChronologyEdits([row],wrap({...edit,summary:'other'})),/cannot change other fields/);
});
test('Malagan chronology has a digest receipt and changes only its illustrated material anchor',()=>{
 assert.equal(edits.items.length,1);assert.equal(edits.items[0].recordId,'new-ireland-malagan-memory');const bytes=fs.readFileSync(new URL('../dist/data/'+manifest.chronologyEditsFile,import.meta.url));assert.equal(bytes.length,manifest.chronologyEdits.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.chronologyEdits.sha256);assert.equal(manifest.chronologyEdits.records,1);
 const old=loadAtlasRecords('content-expansion-v17.json').records.find(r=>r.id==='new-ireland-malagan-memory'),now=loadAtlasRecords().records.find(r=>r.id===old.id);assert.deepEqual([old.start,old.end],[1875,1925]);assert.deepEqual([now.start,now.end],[1800,1899]);assert.deepEqual(now.chronologyRevision.previous,{start:old.start,end:old.end,dateNote:old.dateNote});assert.deepEqual(now.location,old.location);assert.deepEqual(now.relatedIds,old.relatedIds);assert.match(now.dateNote.en,/not the lifespan/);assert.ok(now.sources.some(s=>s.url===edits.items[0].sourceURLs[0]));
});
