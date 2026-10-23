import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildReferenceIndex,searchReferences,recordsInReferencePeriod,createHistoryReferences} from '../dist/history-reference.mjs';
import {ERAS,REGIONAL,inferKind} from '../dist/atlas-model.mjs';
import {chinaRoutes} from '../dist/china-library.mjs';
import {applyChinaReviews} from '../dist/china-review.mjs';

const read=name=>JSON.parse(readFileSync(new URL('../dist/data/'+name,import.meta.url)));
const manifest=read('china-import-manifest.json');
const reviewed=applyChinaReviews(manifest.eventFiles.flatMap(file=>read(file.path)),read('china-library.json'),read('china-reviews.json'));
const library=reviewed.library;
const records=[...read('history.json'),...read('people.json'),...reviewed.events];
const routes=[...read('routes.json'),...chinaRoutes(library,manifest)];
const index=buildReferenceIndex({library,records,routes,eras:ERAS});

test('shared period references retain global eras, all polity articles, and every source display window',()=>{
  assert.equal(index.periods.filter(r=>r.periodType==='editorial').length,ERAS.length);
  assert.equal(index.periods.filter(r=>r.periodType==='article').length,records.filter(r=>inferKind(r)==='polity').length);
  assert.equal(index.periods.filter(r=>r.periodType==='reference').length,18);
  assert.deepEqual(new Set(index.periods.filter(r=>r.periodType==='article').map(r=>r.region)),new Set(records.filter(r=>inferKind(r)==='polity').map(r=>r.region)));
  for(const source of library.eras){
    const row=index.byId.get('reference-window-'+source.id);
    assert.equal(row.start,source.start);
    assert.equal(row.end,source.end);
    assert.equal(row.periodType,'reference');
  }
  assert.equal(index.byId.get('reference-window-qin').end,-202,'source display boundary is preserved as a source window');
});

test('all calendar entries remain searchable without redefining their interval semantics',()=>{
  assert.equal(index.calendars.length,342);
  assert(searchReferences(index,'King Weilie',{kind:'calendar'}).some(r=>r.original.name==='周威烈王'));
  assert(searchReferences(index,'民国',{kind:'calendar'}).some(r=>r.original.note?.en.includes('no assertion')));
  const atYear=searchReferences(index,'',{kind:'calendar',year:1200});
  assert(atYear.length>0);
  assert(atYear.every(r=>r.start<=1200&&r.end>=1200));
  assert.equal(searchReferences(index,'',{kind:'calendar',region:'africa'}).length,0);
});

test('connection references mix all mapped routes and corridor descriptions while retaining different kinds',()=>{
  assert.equal(index.corridors.length,31);
  assert.deepEqual(new Set(index.corridors.filter(r=>r.kind==='route').map(r=>r.routeId)),new Set(routes.map(r=>r.id)));
  assert.deepEqual(new Set(index.corridors.filter(r=>r.kind==='corridor').map(r=>r.id)),new Set(library.corridors.map(r=>r.id)));
  assert(index.corridors.every((r,i,a)=>i===0||a[i-1].start<=r.start));
  assert(searchReferences(index,'',{region:'south-asia',kind:'route'}).some(r=>r.routeId==='china-journey-xuanzang'));
  assert(searchReferences(index,'',{region:'south-asia',kind:'route'}).some(r=>r.routeId==='route-salt-march'));
});

test('a Chinese source window discovers intersecting histories from every source and region',()=>{
  const window=index.byId.get('reference-window-beisong');
  const matches=recordsInReferencePeriod(records,window);
  assert(matches.some(r=>r.provenance?.dataset==='jiangshan'));
  assert(matches.some(r=>r.provenance?.dataset!=='jiangshan'&&r.region==='east-asia'));
  assert(matches.some(r=>r.region==='africa'));
  assert(matches.some(r=>r.region==='europe'));
  assert(matches.some(r=>r.region==='latin-america'));
  assert(matches.every(r=>r.start<=window.end&&r.end>=window.start));
  assert(recordsInReferencePeriod(records,window,'europe').every(r=>r.region==='europe'));
});

test('search combines name, semantic type, year and region without source-origin filtering',()=>{
  const matches=searchReferences(index,'Qin',{kind:'period',region:'east-asia',year:-214});
  assert(matches.some(r=>r.periodType==='reference'));
  assert(matches.every(r=>r.regions.includes('east-asia')&&r.start<=-214&&r.end>=-214));
  assert.equal(searchReferences(index,'Qin',{kind:'calendar',region:'africa'}).length,0);
  assert.equal(searchReferences(index,'',{limit:3}).length,3);
  assert.equal(searchReferences(index,'',{limit:0}).length,0);
  assert(searchReferences(index,'Classical',{region:'africa',kind:'period'}).some(r=>r.periodType==='editorial'));
});

test('reference map navigation joins the whole atlas and mapped routes retain their original IDs',()=>{
  let navigation,selectedRoute;
  const references=createHistoryReferences({library,manifest,records,routes,eras:ERAS,regions:REGIONAL,getState:()=>({lang:'en',region:'east-asia',collection:'jiangshan'}),openDialog:()=>{},escape:String,browsePeriod:value=>{navigation=value;},openRoute:id=>{selectedRoute=id;}});
  assert.equal(references.handle('reference-browse','reference-window-beisong'),true);
  assert.equal(navigation.region,'all');
  assert.deepEqual([navigation.start,navigation.end,navigation.year],[960,1127,1100]);
  assert.equal(references.handle('reference-open','reference-route-china-journey-sushi'),true);
  assert.equal(selectedRoute,'china-journey-sushi');
  assert.equal(references.handle('unknown-action','anything'),false);
});
