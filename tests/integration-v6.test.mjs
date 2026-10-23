import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaultState,filterRecords,stateFromHash,hashFromState,relatedRecords} from '../dist/core.mjs';
import {applyChinaReviews,linkChinaContext} from '../dist/china-review.mjs';

const read=name=>JSON.parse(readFileSync(new URL('../dist/data/'+name,import.meta.url),'utf8'));
const manifest=read('china-import-manifest.json'),history=read('history.json'),people=read('people.json');
const reviewed=applyChinaReviews(manifest.eventFiles.flatMap(file=>read(file.path)),read('china-library.json'),read('china-reviews.json'));
const imported=linkChinaContext(reviewed.events,[...history,...people]);
const records=[...history,...people,...imported],ids=rows=>rows.map(row=>row.id);

test('legacy source filters cannot silently remove history from the shared atlas',()=>{
  const state={...defaultState(),mode:'all'};
  const all=filterRecords(records,state);
  assert.equal(all.length,1317);
  assert.ok(all.some(r=>r.id==='northern-song'));
  assert.ok(all.some(r=>r.id==='china-landmark-497'));
  for(const collection of ['jiangshan','atlas']){
    assert.deepEqual(ids(filterRecords(records,{...state,collection})),ids(all),collection);
  }
});

test('old source-specific shares migrate while retaining user-selected history and geography',()=>{
  for(const collection of ['jiangshan','atlas']){
    const old='#year=1047&lang=zh&mode=all&region=east-asia&theme=knowledge&collection='+collection+'&q=Bi+Sheng&entry=china-landmark-497&compare=china-landmark-497,diamond-sutra-868';
    const state=stateFromHash(old,records);
    assert.equal(state.collection,undefined);
    assert.equal(state.year,1047);
    assert.equal(state.lang,'zh');
    assert.equal(state.mode,'all');
    assert.equal(state.region,'east-asia');
    assert.equal(state.theme,'knowledge');
    assert.equal(state.query,'Bi Sheng');
    assert.equal(state.entry,'china-landmark-497');
    assert.deepEqual(state.compare,['china-landmark-497','diamond-sutra-868']);
    const share=hashFromState({...state,collection});
    assert.equal(new URLSearchParams(share.slice(1)).has('collection'),false);
    assert.deepEqual(stateFromHash(share,records),state);
  }
});

test('removing source segregation preserves chronology, region, theme, text and notebook filters',()=>{
  const sourceStates=['jiangshan','atlas'].map(collection=>({...defaultState(),collection,year:1047,region:'east-asia',theme:'knowledge',query:'Bi Sheng'}));
  for(const state of sourceStates){
    const rows=filterRecords(records,state);
    assert.ok(rows.some(r=>r.id==='china-landmark-497'));
    assert.ok(rows.every(r=>r.start<=1047&&r.end>=1047&&r.region==='east-asia'&&r.theme==='knowledge'));
    assert.deepEqual(filterRecords(records,{...state,savedOnly:true},[]),[]);
    assert.deepEqual(ids(filterRecords(records,{...state,savedOnly:true},['china-landmark-497'])),['china-landmark-497']);
    assert.deepEqual(filterRecords(records,{...state,region:'europe'}),[]);
    assert.ok(!filterRecords(records,{...state,year:2026}).some(r=>r.id==='china-landmark-497'));
  }
});

test('a period essay exposes the imported events that link to it',()=>{
  const selected=records.find(r=>r.id==='northern-song');
  const linked=relatedRecords(records,selected);
  const expected=imported.filter(r=>r.relatedIds?.includes(selected.id));
  assert.equal(expected.length,74);
  assert.ok(linked.some(r=>r.id==='china-landmark-497'));
  for(const event of expected)assert.ok(linked.some(r=>r.id===event.id),event.id);
  assert.equal(new Set(ids(linked)).size,linked.length);
  assert.ok(!linked.some(r=>r.id===selected.id));
  assert.ok(linked.every(r=>records.includes(r)));
});

test('reciprocal related reading preserves explicit priority without inventing transitive links',()=>{
  const selected={id:'subject',relatedIds:['explicit-b','missing','subject','explicit-b','explicit-a']};
  const explicitA={id:'explicit-a',relatedIds:[]};
  const explicitB={id:'explicit-b',relatedIds:['subject']};
  const inbound={id:'inbound',relatedIds:['subject','subject']};
  const unrelated={id:'unrelated',relatedIds:['explicit-a']};
  const rows=[selected,unrelated,inbound,explicitA,explicitB],before=JSON.stringify(rows);
  const linked=relatedRecords(rows,selected);
  assert.deepEqual(ids(linked),['explicit-b','explicit-a','inbound']);
  assert.equal(JSON.stringify(rows),before);
  assert.ok(!linked.includes(unrelated));
});
