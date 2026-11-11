import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const {records}=loadAtlasRecords(),byId=new Map(records.map(r=>[r.id,r]));
const china=readAtlasData('visual-assets-china-batch-11-v18.json'),world=readAtlasData('visual-assets-world-batch-13-v18.json');
test('eight new images preserve their exact sources and eleven distinct target connections',()=>{
 assert.equal(china.items.length,4);assert.equal(world.items.length,4);
 assert.equal(new Set([...china.associations,...world.associations].map(a=>a.recordId)).size,11);
 for(const item of [...china.items,...world.items]){assert.ok(item.bytes<600000);assert.ok(Math.max(item.width,item.height)<=1400);for(const lang of ['en','zh'])assert.notEqual(item.caption[lang],item.interpretation[lang]);}
 assert.ok(china.items.every(i=>i.rights.label==='CC BY 4.0'));
 assert.equal(world.items.filter(i=>i.rights.label==='Public Domain Mark').length,3);
 assert.match(world.items.find(i=>i.id.endsWith('a4n7r9v4')).rights.url,/licenses\/by\/4.0/);
});
test('later documents and paintings do not acquire the dates or likenesses of their historical subjects',()=>{
 const get=id=>china.items.find(i=>i.id===id);
 assert.match(get('china-batch-11-lvbu-halberd').date,/Ming dynasty/);assert.match(get('china-batch-11-lvbu-halberd').caption.en,/catalogued under Dai Jin/);
 const road=get('china-batch-11-baoxie-road-rubbing');assert.match(road.caption.en,/1195/);assert.match(road.caption.en,/1194/);assert.match(road.date,/undated/);
 const ode=get('china-batch-11-tang-restoration-ode');for(const year of ['1859','761','771'])assert.ok(ode.date.includes(year));assert.match(ode.downloadedFrom,/000003PAA/);
 assert.match(get('china-batch-11-caishi-later-commentary').caption.en,/letter concerns illness and gifts/);assert.match(get('china-batch-11-caishi-later-commentary').downloadedFrom,/000007PAA/);
 assert.ok(!china.associations.some(a=>a.recordId==='china-landmark-455'));
});
test('world images show later use, colonial self-presentation and allegory with useful reading links',()=>{
 const get=suffix=>world.items.find(i=>i.id.endsWith(suffix));
 assert.match(get('amj4m7pg').caption.en,/around 1875/);assert.match(get('pkfqsqnh').caption.en,/1830 mezzotint/);
 assert.match(get('jyukn8gt').caption.en,/exact year is unrecorded/);assert.match(get('jyukn8gt').interpretation.en,/Indian soldiers, Mir Jafar and bankers/);
 assert.match(get('a4n7r9v4').caption.en,/Bacon had died before/);assert.match(get('a4n7r9v4').interpretation.en,/symbolic/);
 assert.ok(world.items.every(i=>i.contextSources.length===1));assert.ok(!world.items.some(i=>i.recordIds.includes('carthaginian-power')||i.recordIds.includes('black-death')));
});
test('five narrow chronology corrections preserve appointments while separating literary traditions and deployments',()=>{
 assert.match(byId.get('china-landmark-378').summary.en,/Lianzhou in 815/);assert.match(byId.get('china-landmark-378').summary.en,/Jianping/);
 assert.match(byId.get('china-landmark-379').summary.en,/authorship and place of composition have been debated/);
 assert.match(byId.get('china-landmark-383').summary.en,/1040/);assert.match(byId.get('china-landmark-383').summary.en,/1042/);
 assert.match(byId.get('china-landmark-480').summary.en,/including interruptions for mourning/);
 assert.match(byId.get('china-landmark-481').summary.en,/220,000 troops deployed outside the city’s nine gates/);
 const links=readAtlasData('visual-assets-corrected-links-05-v18.json');assert.equal(links.items.length,0);assert.equal(links.associations.length,5);
 for(const link of links.associations){const row=byId.get(link.recordId);assert.equal(link.role,'named-person');assert.equal(row.provenance.status,'reviewed');assert.equal(row.start,row.provenance.originalRecord.start);assert.equal(row.end,row.provenance.originalRecord.end);assert.equal(row.location.lat,row.provenance.originalRecord.location.lat);assert.equal(row.location.lon,row.provenance.originalRecord.location.lon);}
 assert.ok(!links.associations.some(a=>a.recordId==='china-landmark-446'));
});
