import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildDiscoveryIndex,searchDiscovery} from '../dist/discovery.mjs';
import {hasReviewedLimitedChronology,auditExpansion} from '../dist/content-expansion.mjs';

const read=file=>JSON.parse(readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const sourceProfile=read('china-library.json').profiles.find(row=>row.id==='china-person-sushi');
const template=read('people.json')[0];

test('a completed reference profile becomes one biography without losing its source interval or aliases',()=>{
  const biography={...template,id:sourceProfile.id,sourceProfileId:sourceProfile.id,name:sourceProfile.name,start:1079,end:1101};
  const before=JSON.stringify(sourceProfile);
  const index=buildDiscoveryIndex({records:[biography],people:[biography],library:{profiles:[sourceProfile]}});
  assert.equal(index.people.length,1);
  const person=index.personById.get(sourceProfile.id);
  assert.equal(person.recordId,biography.id);
  assert.deepEqual(person.profileIds,[sourceProfile.id]);
  assert.ok(person.aliases.includes('苏东坡'));
  assert.ok(person.intervals.some(span=>span.meaning==='biography-focus'&&span.start===1079));
  assert.ok(person.intervals.some(span=>span.meaning==='source-profile-span'&&span.start===sourceProfile.span[0]));
  assert.equal(JSON.stringify(sourceProfile),before,'the inherited reference remains intact');
});

test('translated place labels are displayed and searchable without replacing the preserved source label',()=>{
  const record={...template,id:'translated-place',location:{lat:30,lon:110,label:'Source label',labelI18n:{en:'River workshop',zh:'江边作坊'}}};
  const index=buildDiscoveryIndex({records:[record]});
  assert.deepEqual(index.places[0].name,{en:'River workshop',zh:'江边作坊'});
  assert.equal(index.places[0].location.label,'Source label');
  for(const query of ['River workshop','江边作坊','Source label'])assert.equal(searchDiscovery(index,query,{kind:'place'}).length,1,query);
});

test('a short chronology requires a bilingual, dated review tied to the actual historical sources',()=>{
  const record={...template,expansion:{release:11,edition:'v17',workstreams:['CH1'],sourceReview:'Reviewed',reviewLimit:{en:'Selected dated evidence',zh:'所选有年代证据'}},
    milestones:[template.milestones[0]],relatedIds:['related-a','related-b'],
    sources:template.sources.map(source=>({...source,evidenceNote:'Source passage',checkedAt:'2026-11-09',retrieval:'opened-page'})),
    chronologyReview:{status:'limited-dated-evidence',note:{en:'Only one dated episode is supported by these sources.',zh:'这些来源只支持一个有年代的事件。'},sourceURLs:[template.sources[0].url],checkedAt:'2026-11-09'}};
  record.start=record.end=record.milestones[0].year;
  record.milestones[0]={...record.milestones[0],location:{...record.milestones[0].location,label:'Named place'}};
  const manifest={workstreams:[{id:'CH1'}]};
  const errors=row=>auditExpansion([row],manifest,[row,{id:'related-a'},{id:'related-b'}]);
  assert.equal(hasReviewedLimitedChronology(record),true);
  assert.deepEqual(errors(record),[]);
  for(const change of [
    row=>{delete row.chronologyReview;},
    row=>{row.chronologyReview.note.zh='';},
    row=>{row.chronologyReview.sourceURLs=['https://example.org/unrelated'];},
    row=>{row.chronologyReview.checkedAt='';},
    row=>{row.milestones=[];},
    row=>{row.expansion.release=10;row.expansion.edition='v16';}
  ]){
    const copy=structuredClone(record);change(copy);
    assert.equal(hasReviewedLimitedChronology(copy),false);
    assert.ok(errors(copy).length,'the exception must not erase a real evidence gap');
  }
});
