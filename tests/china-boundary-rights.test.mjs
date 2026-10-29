import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {historicalContextFeatures} from '../dist/atlas-model.mjs';
import {historicalCollection,historicalMetadata} from './map-fixtures.mjs';
const data=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const ledger=JSON.parse(fs.readFileSync(new URL('../docs/JIANGSHAN_BOUNDARY_RIGHTS_AUDIT_2026_10_28.json',import.meta.url),'utf8'));
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
const replacements=historicalCollection.features.filter(f=>['historical-basemaps-china-review','remsen-warring-250'].includes(f.properties.sourceDataset));
const at=year=>historicalContextFeatures(replacements,year);

test('rights ledger accounts for every retired polygon and none of its geometry files ships',()=>{
 assert.deepEqual(ledger.counts,{political:377,administrative:3211,snapshot:3});
 assert.equal(ledger.features.length,3591);assert.equal(ledger.files.length,45);
 assert.equal(new Set(ledger.features.map(f=>f.id)).size,ledger.features.length);
 for(const entry of ledger.files){assert.match(entry.sha256,/^[0-9a-f]{64}$/);assert.equal(fs.existsSync(new URL('../dist/data/'+entry.file,import.meta.url)),false,entry.file);}
 for(const entry of ledger.features){assert.match(entry.geometrySha256,/^[0-9a-f]{64}$/);assert.match(entry.decision,/withheld/);}
 assert.ok(!historicalMetadata.layers.some(l=>l.file==='territories-jiangshan.geojson'));
});
test('selected source-year references hand off without extending discarded dynasties',()=>{
 for(const [year,ids] of [[-404,[]],[-403,['warring-regional']],[-301,['warring-regional']],[-300,['qin-warring','warring-regional']],[-251,['qin-warring','warring-regional']],[-250,['qin-warring','zhao-warring','yan-warring','chu-warring','han-warring','qi-warring','wei-warring']],[-231,['qin-warring','zhao-warring','yan-warring','chu-warring','han-warring','qi-warring','wei-warring']],[-230,[]],[300,['western-jin']],[303,['western-jin']],[304,[]],[400,['sixteen-kingdoms-region']],[500,['northern-wei']],[1200,[]],[1600,[]]])
  assert.deepEqual(at(year).map(f=>f.properties.polityId).sort(),ids.sort(),String(year));
});
test('new layers have explicit provenance, checksum, bilingual limits, and regional geometry',()=>{
 assert.equal(replacements.length,13);
 for(const layer of historicalMetadata.layers.filter(l=>l.file.startsWith('china-open-'))){const bytes=fs.readFileSync(new URL('../dist/data/'+layer.file,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),layer.outputSha256);assert.ok(bytes.length<450000);}
 for(const f of replacements){const p=f.properties;assert.ok(p.name.en&&p.name.zh&&p.contextValidity.note.en&&p.contextValidity.note.zh);assert.ok(p.attribution&&p.geometrySource&&p.sources.length>=2);assert.ok(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI);assert.match(p.note.en,/not an annual/);}
 const states=data('china-open-warring-v17.geojson').features;
 assert.equal(states.length,7);assert.ok(states.every(f=>f.properties.license==='CC0-1.0'&&f.properties.sourceYearApproximate));
 for(const [polity,point] of [['qin-warring',[108.71,34.33]],['zhao-warring',[114.49,36.60]],['yan-warring',[116.4,39.9]],['chu-warring',[114.88,33.73]],['han-warring',[113.74,34.40]],['qi-warring',[118.30,36.8]]])assert.ok(d3.geoContains(states.find(f=>f.properties.polityId===polity),point),polity);
});
