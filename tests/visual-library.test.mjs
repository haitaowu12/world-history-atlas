import test from 'node:test';
import assert from 'node:assert/strict';
import {visualRows,filterVisualRows,visualCoverage,orderVisualRows,visualNeighbors} from '../dist/visual-library.mjs';
import {auditHistoryMedia,createHistoryMedia,mediaFigures} from '../dist/history-media.mjs';
import fs from 'node:fs';
const base=JSON.parse(fs.readFileSync(new URL('../dist/data/history-media-v17.json',import.meta.url)));
const item=base.items[0],id=item.recordIds[0];
const records=[{id,region:'europe',title:{en:'Charles Darwin',zh:'达尔文'}},{id:'beagle',region:'latin-america',title:{en:'Beagle voyage',zh:'小猎犬号航行'}},{id:'uncovered',region:'africa',title:{en:'Uncovered',zh:'无图'}}];
const association={assetId:item.id,recordId:'beagle',role:'named-person',context:{en:'A portrait of Charles Darwin, a participant in this story.',zh:'条目参与者查尔斯·达尔文的肖像。'},evidenceUrl:'https://example.org/beagle',checkedAt:'2026-11-10'};
const catalog={...base,version:2,items:[item],associations:[association]};
test('coverage counts unique existing entry IDs, not links or duplicate image use',()=>{
 const c={...catalog,associations:[association,association,{...association,recordId:'missing'}]};
 assert.deepEqual(visualCoverage(c,records),{total:3,covered:2,assets:1,percent:200/3,coveredIds:['beagle',id].sort(),uncoveredIds:['uncovered']});
});
test('visual filters search names, institutions and bilingual linked stories',()=>{
 const rows=visualRows(catalog,records);
 assert.equal(filterVisualRows(rows,{query:'BEAGLE'}).length,1);
 assert.equal(filterVisualRows(rows,{query:'达尔文',region:'europe'}).length,1);
 assert.equal(filterVisualRows(rows,{region:'africa'}).length,0);
 assert.equal(filterVisualRows(rows,{type:'later-depiction'}).length,0);
});
test('association admission requires real asset and record identities, bilingual context and safe evidence',()=>{
 assert.deepEqual(auditHistoryMedia(catalog,records.map(r=>r.id)),[]);
 for(const change of [{assetId:'missing'},{recordId:'missing'},{role:'decoration'},{context:{en:'Only English'}},{evidenceUrl:'javascript:alert(1)'}]){
  assert.ok(auditHistoryMedia({...catalog,associations:[{...association,...change}]},records.map(r=>r.id)).length);
 }
 assert.ok(auditHistoryMedia({...catalog,associations:[association,association]},records.map(r=>r.id)).length);
});
test('entry images retain association context without relabeling the underlying portrait',()=>{
 const media=createHistoryMedia(catalog),linked=media.forRecord('beagle');
 assert.equal(linked.length,1);assert.equal(linked[0].representation,item.representation);
 assert.equal(media.primary('beagle').id,item.id);assert.deepEqual(media.coveredIds().sort(),['beagle',id].sort());
 assert.ok(mediaFigures(linked,'en',String).includes(association.context.en));
 assert.ok(mediaFigures(linked,'zh',String).includes(association.context.zh));
 assert.equal(media.forRecord('uncovered').length,0);
});

test('the collection mixes media kinds without dropping, repeating or shuffling within each kind',()=>{
 const rows=[{id:'p1',kind:'portrait'},{id:'p2',kind:'portrait'},{id:'d1',kind:'document'},{id:'o1',kind:'object'},{id:'d2',kind:'document'},{id:'p3',kind:'portrait'}];
 assert.deepEqual(orderVisualRows(rows).map(r=>r.id),['o1','d1','p1','d2','p2','p3']);assert.equal(new Set(orderVisualRows(rows)).size,rows.length);assert.equal(rows[0].id,'p1');assert.deepEqual(orderVisualRows([]),[]);
});

test('image navigation follows filters, respects endpoints and supports stories outside the filter',()=>{
 const rows=[{id:'a',search:'one',regions:['europe'],representation:'historical-map'},{id:'b',search:'two',regions:['asia'],representation:'historical-map'},{id:'c',search:'one',regions:['europe'],representation:'manuscript-detail'}];
 assert.deepEqual(visualNeighbors(rows,{query:'one'},'a'),{index:0,total:2,previous:null,next:'c'});
 assert.deepEqual(visualNeighbors(rows,{query:'one'},'c'),{index:1,total:2,previous:'a',next:null});
 assert.deepEqual(visualNeighbors(rows,{query:'one'},'b'),{index:1,total:3,previous:'a',next:'c'});
 assert.deepEqual(visualNeighbors(rows,{type:'manuscript-detail'},'c'),{index:0,total:1,previous:null,next:null});
 assert.equal(visualNeighbors(rows,{},'missing'),null);assert.equal(visualNeighbors([],{},'missing'),null);
 assert.deepEqual(rows.map(r=>r.id),['a','b','c']);
});
