import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {REGIONS} from '../dist/core.mjs';
import {applyChinaReviews} from '../dist/china-review.mjs';
import {buildDiscoveryIndex,searchDiscovery,nearbyDiscoveryRecords,createDiscovery} from '../dist/discovery.mjs';

const read=file=>JSON.parse(readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const manifest=read('china-import-manifest.json'),rawLibrary=read('china-library.json');
const sourceLibrary={...rawLibrary,...Object.assign({},...rawLibrary.placeFiles.map(file=>read(file.path)))};
const rawEvents=manifest.eventFiles.flatMap(file=>read(file.path));
const reviewed=applyChinaReviews(rawEvents,sourceLibrary,read('china-reviews.json'));
const people=read('people.json'),histories=read('history.json'),records=[...histories,...people,...reviewed.events];
const settlements=rawLibrary.settlementFiles.flatMap(file=>read(file.path)),library=reviewed.library;
const before=JSON.stringify({records,people,library,settlements});
const index=buildDiscoveryIndex({records,people,library,settlements});

test('one people directory retains every biography and source person with explicit identity links',()=>{
  assert.equal(index.people.length,126);
  for(const row of [...people,...library.profiles])assert.ok(index.personById.has(row.id),row.id);
  for(const id of ['person-xuanzang','person-zheng-he'])assert.equal(index.people.filter(row=>row.id===id).length,1);
  assert.equal(index.personById.get('china-person-xuanzang'),index.personById.get('person-xuanzang'));
  assert.equal(index.personById.get('china-person-zhenghe'),index.personById.get('person-zheng-he'));
  assert.equal(JSON.stringify({records,people,library,settlements}),before,'source records must not be rewritten by the index');
});

test('merged people retain independent interval assertions, aliases, journey and record links',()=>{
  const xuanzang=index.personById.get('china-person-xuanzang');
  assert.ok(xuanzang.intervals.some(interval=>interval.meaning==='biography-focus'));
  assert.ok(xuanzang.intervals.some(interval=>interval.meaning==='source-profile-span'&&interval.sourceId==='china-person-xuanzang'));
  assert.ok(xuanzang.recordIds.includes('person-xuanzang'));
  assert.ok(xuanzang.recordIds.includes('china-event-tang-009'));
  assert.ok(xuanzang.journeyIds.includes('china-journey-xuanzang'));
  assert.ok(xuanzang.aliases.includes('唐三藏'));
  const conflicting={...library.profiles.find(row=>row.id==='china-person-xuanzang'),name:{en:'Xuanzang',zh:'同名但未确认人物'}};
  const other=buildDiscoveryIndex({records,people,library:{profiles:[conflicting]}});
  assert.notEqual(other.personById.get(conflicting.id),other.personById.get('person-xuanzang'),'the explicit link still checks bilingual identity');
});

test('the places directory includes every mapped record and every named-place reference in every region',()=>{
  for(const record of records)assert.ok(index.placeById.get(record.id)?.recordIds.includes(record.id),record.id);
  for(const place of [...library.gazetteer,...library.cityLore,...library.passes])assert.ok(index.placeById.get(place.id)?.referenceIds.includes(place.id),place.id);
  assert.deepEqual(new Set(index.places.map(row=>row.region)),new Set(REGIONS));
  assert.ok(searchDiscovery(index,'Angkor',{kind:'place'}).some(row=>row.recordIds.includes('angkor')));
  assert.ok(searchDiscovery(index,'成周',{kind:'place'}).some(row=>row.referenceIds.includes('china-gazetteer-001')));
  assert.ok(searchDiscovery(index,'Tikal',{kind:'place'}).some(row=>row.recordIds.includes('tikal')));
});

test('global discovery applies type, region and known date filters without source collections',()=>{
  for(const region of REGIONS)for(const kind of ['person','place']){
    const matches=searchDiscovery(index,'',{region,kind,year:1200});
    assert.ok(matches.every(row=>row.kind===kind&&row.region===region));
    assert.ok(matches.every(row=>!row.intervals.length||row.intervals.some(span=>span.start<=1200&&span.end>=1200)));
  }
  assert.equal(searchDiscovery(index,'Su Shi',{kind:'person',year:2026}).length,0);
  assert.equal(searchDiscovery(index,'Su Shi',{kind:'person',year:1080}).length,1);
  assert.deepEqual(searchDiscovery(index,'',{kind:'route'}),[],'other entity types must not receive people or place cards');
  const undated=index.places.find(row=>row.references.length&&!row.intervals.length);
  assert.ok(undated);
  assert.ok(searchDiscovery(index,undated.name.en,{kind:'place',year:2026}).includes(undated),'undated references do not receive invented occupancy dates');
  assert.equal(searchDiscovery(index,'',{kind:'person',limit:3}).length,3);
  assert.ok(searchDiscovery(index,'',{kind:'person'}).length>3,'directory search exposes the complete matching set');
});

test('aliases and Unicode-normalized search resolve canonical people in the same directory',()=>{
  assert.equal(searchDiscovery(index,'Ｓｕ Ｓｈｉ',{kind:'person'})[0].id,'china-person-sushi');
  assert.equal(searchDiscovery(index,'苏东坡',{kind:'person'})[0].id,'china-person-sushi');
  assert.equal(searchDiscovery(index,'唐三藏',{kind:'person'})[0].id,'person-xuanzang');
  assert.equal(searchDiscovery(index,'Zheng He',{kind:'person'})[0].id,'person-zheng-he');
  assert.equal(searchDiscovery(index,'Xuanzang')[0].kind,'person','an exact person name precedes a location linked to that person');
});

test('nearby place history crosses original/import source boundaries while preserving identities',()=>{
  const bianjing=index.placeById.get('china-gazetteer-002');
  const nearby=nearbyDiscoveryRecords(index,bianjing);
  assert.ok(nearby.some(row=>row.id==='northern-song'),'full Northern Song essay is included');
  assert.ok(nearby.some(row=>row.id==='china-landmark-497'),'reviewed Bi Sheng entry is included');
  assert.ok(nearby.some(row=>row.provenance?.dataset==='jiangshan'));
  assert.ok(nearby.some(row=>!row.provenance));
  assert.ok(!nearby.some(row=>row.id==='tikal'));
  assert.ok(!index.placeById.has('china-landmark-412'),'held event stays excluded');
});

test('nearby or similarly named locations are not silently merged into one settlement',()=>{
  const base=histories[0];
  const rows=[
    {...base,id:'point-one',location:{lat:30,lon:110,label:'One place'}},
    {...base,id:'point-two',location:{lat:30,lon:110,label:'One place'}},
    {...base,id:'nearby',location:{lat:30.001,lon:110,label:'One place'}},
    {...base,id:'different-name',location:{lat:30,lon:110,label:'Other place'}}
  ];
  const scoped=buildDiscoveryIndex({records:rows});
  assert.equal(scoped.places.length,3);
  assert.equal(scoped.placeById.get('point-one'),scoped.placeById.get('point-two'));
  assert.notEqual(scoped.placeById.get('point-one'),scoped.placeById.get('nearby'));
  assert.notEqual(scoped.placeById.get('point-one'),scoped.placeById.get('different-name'));
  assert.equal(nearbyDiscoveryRecords(scoped,scoped.placeById.get('point-one')).length,4);
});

test('person/place details preserve source evidence and expose stable share identities',()=>{
  const navigations=[],views=[],escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const discovery=createDiscovery({records,people,library,manifest,settlements,regions:{},getState:()=>({lang:'en',year:1200}),
    openDialog:(html,options)=>views.push({html,options}),openPlace:()=>{},onNavigate:target=>navigations.push(target),escape});
  assert.equal(discovery.person('china-person-xuanzang'),true);
  assert.deepEqual(navigations.at(-1),{kind:'person',id:'person-xuanzang'});
  assert.match(views.at(-1).html,/Read the biography/);
  assert.match(views.at(-1).html,/china-journey-xuanzang/);
  assert.match(views.at(-1).html,/Sources and interpretation/);
  assert.doesNotMatch(views.at(-1).html,/China library|JIANGSHAN COLLECTION/);
  assert.equal(discovery.place('china-gazetteer-002'),true);
  assert.equal(navigations.at(-1).kind,'place');
  assert.match(views.at(-1).html,/Nearby history across the atlas/);
  assert.match(views.at(-1).html,/data-id="northern-song"/);
  assert.match(views.at(-1).html,/data-id="china-landmark-497"/);
  assert.match(views.at(-1).html,/source display windows/);
  assert.equal(discovery.person('unknown'),false);
  assert.equal(discovery.place('unknown'),false);
});
