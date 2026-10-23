import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {addMapLanguage} from '../dist/map-language.mjs';
import {historicalContextFeatures, reviewedIntervalContains} from '../dist/atlas-model.mjs';
import {
 contemporaryCollection as contemporary, contemporaryMetadata as metadata,
 historicalCollection as modern, disputedAreas as areas, disputedLines as lines,
} from './map-fixtures.mjs';

const context={};
vm.runInNewContext(readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),context);
const d3=context.d3;
const byISO=iso=>contemporary.features.find(f=>f.properties.isoCode===iso);

test('contemporary reference contains the fifteen former Soviet republics separately',()=>{
 const codes=['RUS','UKR','BLR','EST','LVA','LTU','MDA','ARM','AZE','GEO','KAZ','KGZ','TJK','TKM','UZB'];
 const units=codes.map(byISO);
 assert.ok(units.every(Boolean));
 assert.equal(new Set(units.map(f=>f.properties.id)).size,15);
 assert.ok(d3.geoContains(byISO('RUS'),[37.6173,55.7558]),'Russia includes Moscow');
 for(const [name,point] of [['Kyiv',[30.5234,50.4501]],['Almaty',[76.9286,43.2567]],['Riga',[24.1052,56.9496]]]){
  assert.equal(d3.geoContains(byISO('RUS'),point),false,`The Russia geometry must not be an old Soviet outline containing ${name}`);
 }
});

test('modern state transitions are represented by distinct contemporary geometries',()=>{
 for(const code of ['DEU','CZE','SVK','SVN','HRV','BIH','SRB','MNE','MKD','ERI','ETH','TLS','IDN','SDN','SSD','BGD','PAK','NAM'])assert.ok(byISO(code),code);
 assert.ok(d3.geoContains(byISO('SSD'),[31.5825,4.8594]),'South Sudan includes Juba');
 assert.equal(d3.geoContains(byISO('SDN'),[31.5825,4.8594]),false,'Sudan must not retain pre-2011 South Sudan');
 assert.ok(d3.geoContains(byISO('BGD'),[90.4125,23.8103]),'Bangladesh includes Dhaka');
 assert.equal(d3.geoContains(byISO('PAK'),[90.4125,23.8103]),false,'Pakistan must not retain East Pakistan');
});

test('retired imperial and Cold War names are not contemporary map labels',()=>{
 const forbidden=/\b(Soviet Union|USSR|Czechoslovakia|Yugoslavia|East Germany|West Germany|Rhodesia|Zaire|East Pakistan|Qing Empire|Russian Empire)\b/i;
 for(const f of contemporary.features)assert.equal(forbidden.test(f.properties.name.en),false,f.properties.name.en);
});

test('source vintage and review year remain separate throughout contemporary data',()=>{
 assert.equal(metadata.reviewedYear,2026);
 assert.equal(metadata.geometryVintage,2022);
 for(const f of contemporary.features){assert.equal(f.properties.reviewedYear,2026);assert.equal(f.properties.geometryVintage,2022);}
 assert.equal(contemporary.features.length,Object.values(metadata.categories).reduce((n,x)=>n+x,0));
 assert.ok(contemporary.features.some(f=>f.properties.category==='dependency'));
 assert.ok(contemporary.features.some(f=>f.properties.category==='disputed'));
});

test('Palestine uses its sourced UN observer State status instead of the imported dependency category',()=>{
 const p=byISO('PSE').properties;
 assert.equal(p.category,'observer-state');
 assert.notEqual(p.category,'dependency');
 assert.match(p.note.en,/UN non-member observer State/);
 assert.match(p.note.zh,/联合国非会员观察员国/);
 assert.ok(p.sources.some(s=>s.url==='https://research.un.org/en/unmembers/observers'
   &&s.publisher==='United Nations Dag Hammarskjöld Library'
   &&/Palestine is currently a non-member observer State/.test(s.evidenceNote)),
   'The editorial category must have independent UN status evidence, not only geometry provenance');
 assert.equal(metadata.categories['observer-state'],1);
 const translations={en:{},zh:{}};
 addMapLanguage(translations);
 assert.equal(translations.en[p.category],'UN observer State');
 assert.equal(translations.zh[p.category],'联合国观察员国');
});

test('post-Soviet historical checkpoints never contain the USSR or divided Germany',()=>{
 for(const year of [1994,2000,2010]){
  const features=modern.features.filter(f=>f.properties.year===year);
  assert.ok(features.length>=40,String(year));
  const names=features.map(f=>f.properties.name.en);
  assert.ok(names.some(name=>/Russia/.test(name)),String(year));
  assert.ok(names.includes('Ukraine'),String(year));
  assert.ok(names.some(name=>/Germany/.test(name)),String(year));
  assert.ok(names.every(name=>!/Soviet|East Germany|West Germany|Czechoslovakia/i.test(name)),String(year));
  assert.ok(names.every(name=>!/South Sudan/.test(name)),`${year}: no independent South Sudan before2011`);
 }
});

test('the 2010 Russia and Ukraine fallbacks preserve the pre-2014 assignment of Crimea',()=>{
 const russia=modern.features.find(f=>f.properties.year===2010&&f.properties.polityId==='russia-modern');
 const ukraine=modern.features.find(f=>f.properties.year===2010&&f.properties.polityId==='ukraine');
 const simferopol=[34.102,44.957];
 assert.ok(russia&&ukraine,'Both historical fallback outlines are shipped');
 assert.equal(d3.geoContains(russia,simferopol),false,'The 2010 Russian outline must not import the later source convention for Crimea');
 assert.equal(d3.geoContains(ukraine,simferopol),true,'The 2010 Ukrainian outline retains Simferopol');
 assert.equal(d3.geoContains(russia,[37.6173,55.7558]),true,'Russia retains Moscow');
 assert.equal(d3.geoContains(ukraine,[30.5234,50.4501]),true,'Ukraine retains Kyiv');
});

test('1750 Russian context cannot borrow the Crimean territory present in the 1783 outline',()=>{
 const later=modern.features.find(f=>f.properties.id==='1783-russian');
 assert.ok(later,'The dated 1783 Russian reference remains available');
 assert.ok(later.properties.contextValidity?.start>=1783,'The 1783 outline must not be reviewed backward into pre-annexation years');
 const earlier=historicalContextFeatures(modern.features,1750).filter(f=>/^(?:russia|russian)(?:-|$)/.test(f.properties.polityId));
 for(const f of earlier){
  assert.equal(d3.geoContains(f,[34.1,44.95]),false,`${f.properties.id}: 1750 context must exclude Simferopol`);
 }
});

test('post-1922 UK context does not retain the Irish Free State inside an old all-Ireland outline',()=>{
 // The upstream 1930 UK polygon contains central Ireland incorrectly. Use the
 // separately dated, reviewed replacement; evidence is in V4_TEMPORAL_REVIEW.md.
 for(const year of [1923,1930,1938,1945]){
  const uk=historicalContextFeatures(modern.features,year).find(f=>f.properties.polityId==='uk');
  assert.ok(uk,`${year}: reviewed UK context is available`);
  assert.equal(d3.geoContains(uk,[-7.94,53.42]),false,`${year}: Athlone is outside the UK outline`);
  assert.equal(d3.geoContains(uk,[-5.93,54.60]),true,`${year}: Belfast remains inside the UK outline`);
  assert.equal(d3.geoContains(uk,[-.1276,51.5072]),true,`${year}: London remains inside the UK outline`);
 }
});

test('selected dispute geometry marks Crimea and excludes obsolete breakaway control outlines',()=>{
 assert.ok(areas.features.some(f=>/Crimea/i.test(f.properties.name.en)),'Crimea has a visible dispute overlay');
 for(const f of [...areas.features,...lines.features])assert.equal(/Nagorno.?Karabakh|Artsakh|Donetsk|Donestsk|Donblass|Luhansk/i.test(f.properties.name.en),false,f.properties.name.en);
});

test('the Crimea reference overlay cannot appear before its reviewed 2014 start',()=>{
 const crimea=areas.features.filter(f=>/Crimea/i.test(f.properties.name.en));
 assert.ok(crimea.length);
 for(const f of crimea){
  assert.equal(reviewedIntervalContains(f.properties.contextValidity,2013),false);
  assert.equal(reviewedIntervalContains(f.properties.contextValidity,2014),true);
  assert.equal(reviewedIntervalContains(f.properties.contextValidity,2026),true);
 }
});
