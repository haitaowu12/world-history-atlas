import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {featureLabelAnchor} from '../dist/map-labels.mjs';
import {normalizeMapCollection} from '../dist/map-geometry.mjs';
import {selectCshapesAt} from '../dist/cshapes-history.mjs';

const context={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),context);const d3=context.d3;
const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const normalized=features=>normalizeMapCollection({type:'FeatureCollection',features},d3.geoArea).features;

test('Spain in 1822 uses its Iberian component rather than an Atlantic centroid',()=>{
 const manifest=read('map-snapshots.json');const original=manifest.layers.flatMap(layer=>read(layer.file).features).find(f=>f.properties.id==='1815-spain');
 const [spain]=normalized([original]),before=JSON.stringify(spain),centroid=d3.geoCentroid(spain);
 assert.ok(centroid[0]<-15&&!d3.geoContains(spain,centroid),'negative control: source centroid is in the Atlantic');
 const point=featureLabelAnchor(spain,d3);assert.ok(d3.geoContains(spain,point));assert.ok(point[0]>-10&&point[0]<5&&point[1]>35&&point[1]<45);
 assert.equal(JSON.stringify(spain),before,'source geometry and metadata remain unchanged');
});

test('invalid explicit anchors and centroids in holes do not place labels off land',()=>{
 const feature={type:'Feature',properties:{id:'donut',labelPoint:[25,25]},geometry:{type:'Polygon',coordinates:[
  [[0,0],[0,10],[10,10],[10,0],[0,0]],[[3,3],[7,3],[7,7],[3,7],[3,3]]
 ]}};
 const [shape]=normalized([feature]),center=d3.geoCentroid(shape);assert.equal(d3.geoContains(shape,center),false);
 const point=featureLabelAnchor(shape,d3);assert.ok(point&&d3.geoContains(shape,point));assert.notDeepEqual(point,[25,25]);
 const explicit=[1,1],withValid={...shape,properties:{...shape.properties,labelPoint:explicit}};assert.deepEqual(featureLabelAnchor(withValid,d3),explicit);
});

test('representative labels for selected historical country units remain inside their source outlines',()=>{
 const data=normalizeMapCollection(read('cshapes-periods-v7.geojson'),d3.geoArea);
 for(const year of [1916,1921,1942,1945])for(const code of [200,210,211,220,290,385,390]){
  const feature=selectCshapesAt(data,year).find(f=>f.properties.gwcode===code);if(!feature)continue;
  const anchor=featureLabelAnchor(feature,d3);assert.ok(anchor&&d3.geoContains(feature,anchor),`${year}: ${code}`);
 }
});
