import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {historicalContextFeatures} from '../dist/atlas-model.mjs';
import {mapDisplayPalette} from '../dist/map-palette.mjs';
import {historicalCollection,historicalMetadata} from './map-fixtures.mjs';

const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
const byDataset=name=>historicalCollection.features.filter(f=>f.properties.sourceDataset===name);
const song=byDataset('kiu-song-jin-1141'),ming=byDataset('herrmann-ming-1415');
const chosen=(features,year)=>historicalContextFeatures(features,year);
const ids=rows=>rows.map(f=>f.properties.polityId).sort();
const find=(rows,id)=>rows.find(f=>f.properties.polityId===id);

test('the 1141 illustration is selected only within its separately reviewed periods',()=>{
 for(const [year,expected] of [[1140,[]],[1141,['song','jin-jurchen','western-xia']],[1160,['song','jin-jurchen','western-xia']],[1161,[]],[1164,[]],[1165,['song','jin-jurchen','western-xia']],[1200,['song','jin-jurchen','western-xia']],[1204,['song','jin-jurchen','western-xia']],[1205,['song','jin-jurchen']],[1206,[]]])assert.deepEqual(ids(chosen(song,year)),expected.sort(),String(year));
 assert.ok(song.every(f=>f.properties.year===1141&&f.properties.sourceYear===1141&&!f.properties.contextValidity.backwardReviewed));
 assert.ok(song.filter(f=>f.properties.polityId==='jin-jurchen').every(f=>f.properties.sourceExtentClipped&&f.properties.note.en.includes('cuts off')));
});
test('independently recognized capitals and islands align with the three 1141 regions',()=>{
 const rows=chosen(song,1200);for(const [region,point] of [['song',[120.155,30.275]],['song',[104.067,30.658]],['song',[109.8,19.2]],['jin-jurchen',[116.407,39.904]],['jin-jurchen',[114.307,34.797]],['western-xia',[106.23,38.49]]])assert.ok(d3.geoContains(find(rows,region),point),region+' / '+point);
 for(const feature of rows)assert.ok(!d3.geoContains(feature,[121.03,23.63]),'Taiwan is outside the source illustrations');
 const p=mapDisplayPalette(rows,{scheme:'mineral'});assert.equal(new Set(rows.map(f=>p.get(f.properties.id))).size,3,'adjacent regions have distinct colors');
});
test('the 1415 Ming illustration and occupied northern Dai Viet stop before the 1418 resistance',()=>{
 assert.deepEqual(ids(chosen(ming,1414)),[]);for(const year of [1415,1417])assert.deepEqual(ids(chosen(ming,year)),['ming']);for(const year of [1418,1427,1600])assert.deepEqual(ids(chosen(ming,year)),[]);
 const f=ming[0];for(const p of [[118.78,32.06],[116.4,39.9],[105.85,21.03],[109.8,19.2]])assert.ok(d3.geoContains(f,p),p.join(','));
 for(const p of [[121.5,25],[100.5,13.75],[107.6,16.5]])assert.equal(d3.geoContains(f,p),false,p.join(','));
 const global=chosen(historicalCollection.features,1415).filter(f=>f.properties.polityId==='ming');assert.equal(global.length,1);assert.equal(global[0].properties.id,'herrmann-1415-ming');
 assert.ok(chosen(historicalCollection.features,1418).every(f=>f.properties.id!=='herrmann-1415-ming'));
});
test('each new reference carries its pinned source, license and bilingual limitations',()=>{
 for(const [file,source,expected] of [['china-open-song-jin-1141-v18.geojson','../references/china-song-1141/ian-kiu-1141-original-2007.png','e8530c4c9203ae3f9c779db718782b2df647b5e106f34a2ca934560455aa4eb4'],['china-open-ming-1415-v18.geojson','../references/china-ming-1415/herrmann-ming-1415.jpg','b37627340c49d28ffba1a45b7c75e87e0dda408a6b5e0ead59c7e82faadb3180']]){
  const src=fs.readFileSync(new URL(source,import.meta.url)),output=fs.readFileSync(new URL('../dist/data/'+file,import.meta.url)),layer=historicalMetadata.layers.find(l=>l.file===file);assert.equal(createHash('sha256').update(src).digest('hex'),expected);assert.equal(createHash('sha256').update(output).digest('hex'),layer.outputSha256);assert.ok(output.length<450000);assert.ok(fs.readFileSync(new URL('../dist/data/'+layer.licenseFile,import.meta.url),'utf8').length>100);
 }
 for(const f of [...song,...ming]){let p=f.properties;assert.ok(p.name.en&&p.name.zh&&p.note.en&&p.note.zh&&p.sources.length>=2&&p.attribution&&p.geometrySource);assert.match(p.note.en,/not an annual reconstruction/);assert.ok(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI);}
 assert.ok(song.every(f=>f.properties.license==='CC-BY-3.0'&&f.properties.licenseURL==='https://creativecommons.org/licenses/by/3.0/'));assert.equal(ming[0].properties.license,'Public-Domain-US');
});
