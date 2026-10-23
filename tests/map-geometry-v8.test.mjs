import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {normalizePolygonGeometry,normalizeMapCollection} from '../dist/map-geometry.mjs';
import {mapDisplayPalette} from '../dist/map-palette.mjs';
import {selectCshapesAt} from '../dist/cshapes-history.mjs';
const base=new URL('../dist/data/',import.meta.url),read=file=>JSON.parse(fs.readFileSync(new URL(file,base),'utf8'));
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
const files=fs.readdirSync(base).filter(f=>/\.geojson$|^china-(?:context|administrative).*\.json$/.test(f));
const collections=files.map(file=>({file,collection:read(file)})).filter(x=>x.collection.features);

test('every shipped territory and administrative ring fills its intended side of the globe',()=>{
 let features=0,rings=0;
 for(const {file,collection} of collections)for(const feature of collection.features){
  const g=feature.geometry;if(!['Polygon','MultiPolygon'].includes(g?.type))continue;
  features++;const area=d3.geoArea(feature),label=file+':'+feature.properties.id;
  assert.ok(Number.isFinite(area)&&area>0&&area<2*Math.PI,label+' must not fill a globe complement');
  const bounds=d3.geoBounds(feature);assert.ok(bounds[1][1]-bounds[0][1]<178,label+' must not span both poles');
  for(const polygon of g.type==='Polygon'?[g.coordinates]:g.coordinates)for(const [i,ring]of polygon.entries()){
   rings++;assert.deepEqual(ring[0],ring.at(-1),label+' closed ring');
   const a=d3.geoArea({type:'Polygon',coordinates:[ring]});
   assert.ok(i?a>2*Math.PI:a<2*Math.PI,label+':'+i+' exterior/hole orientation');
  }
 }
 assert.ok(features>5000&&rings>17000,'must cover the China layers as well as modern datasets');
});

test('mixed winding repair preserves a hole and islands without changing source coordinates',()=>{
 const outer=[[100,20],[120,20],[120,40],[100,40],[100,20]];
 const hole=[[105,25],[105,30],[110,30],[110,25],[105,25]];
 const geometry={type:'MultiPolygon',coordinates:[[outer,hole],[[[125,20],[127,20],[127,22],[125,22],[125,20]]]]};
 const before=JSON.stringify(geometry),fixed=normalizePolygonGeometry(geometry,d3.geoArea);
 assert.equal(JSON.stringify(geometry),before,'source input remains unchanged');
 assert.equal(fixed.coordinates.length,2);assert.equal(fixed.coordinates[0].length,2);
 assert.ok(d3.geoContains(fixed,[102,22]),'mainland interior remains filled');
 assert.ok(!d3.geoContains(fixed,[107,27]),'hole remains empty');
 assert.ok(d3.geoContains(fixed,[126,21]),'island remains filled');
 assert.ok(!d3.geoContains(fixed,[-70,-20]),'unrelated continent remains outside');
 assert.strictEqual(normalizePolygonGeometry(fixed,d3.geoArea),fixed,'normalization is idempotent');
 for(let p=0;p<geometry.coordinates.length;p++)for(let r=0;r<geometry.coordinates[p].length;r++)
  assert.deepEqual([...fixed.coordinates[p][r]].map(JSON.stringify).sort(),[...geometry.coordinates[p][r]].map(JSON.stringify).sort(),'same vertices');
});

test('known affected Warring States snapshots stay inside regional projected bounds',()=>{
 const data=read('china-context-zhanguo-01-v7.json'),projection=d3.geoEqualEarth().scale(150).translate([0,0]),path=d3.geoPath(projection);
 const globe=path.bounds({type:'Sphere'}),worldWidth=globe[1][0]-globe[0][0],worldHeight=globe[1][1]-globe[0][1];
 for(const f of data.features){const b=path.bounds(f);assert.ok(b[1][0]-b[0][0]<worldWidth*.6,f.properties.id);assert.ok(b[1][1]-b[0][1]<worldHeight*.6,f.properties.id);}
});

test('open source rings are closed before winding is measured without dropping vertices',()=>{
 const g={type:'Polygon',coordinates:[[[105,30],[115,30],[115,40],[105,40]]]},before=JSON.stringify(g);
 const fixed=normalizePolygonGeometry(g,d3.geoArea);
 assert.equal(fixed.coordinates[0].length,5);
 assert.deepEqual(fixed.coordinates[0][0],fixed.coordinates[0].at(-1));
 assert.ok(d3.geoContains(fixed,[110,35]));
 assert.equal(JSON.stringify(g),before);
});

test('Taiwan shares the mainland display shade in modern dated maps without changing source records',()=>{
 const data=read('cshapes-periods-v7.geojson');
 for(const year of [1900,1950,1960,1992,2005,2019]){
  const features=selectCshapesAt(data,year),mainland=features.find(f=>f.properties.gwcode===710),taiwan=features.find(f=>f.properties.gwcode===713),before=JSON.stringify(taiwan.properties);
  assert.ok(mainland&&taiwan,String(year));const palette=mapDisplayPalette(features);
  assert.equal(palette.get(taiwan.properties.id),palette.get(mainland.properties.id),String(year));
  assert.equal(JSON.stringify(taiwan.properties),before,'source identity, dates and colours are unchanged');
 }
});

test('contemporary display palette also matches Taiwan and preserves unrelated colours',()=>{
 const features=[{properties:{id:'cn',code:'CHN',color:'#123456'}},{properties:{id:'tw',code:'TWN',color:'#654321'}},{properties:{id:'jp',code:'JPN',color:'#999999'}}];
 const palette=mapDisplayPalette(features);assert.equal(palette.get('tw'),'#123456');assert.equal(palette.get('jp'),'#999999');assert.equal(features[1].properties.color,'#654321');
 assert.equal(mapDisplayPalette([features[1]]).get('tw'),'#654321','no missing-partner error');
 const point={type:'FeatureCollection',features:[{geometry:{type:'Point',coordinates:[1,2]},properties:{id:'point'}}]};
 assert.strictEqual(normalizeMapCollection(point,d3.geoArea).features[0],point.features[0]);
});
