// Reproduce only from the pinned Natural Earth 5.1.1 GeoJSON input.
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {normalizeMapCollection} from '../dist/map-geometry.mjs';
const root=new URL('../',import.meta.url),input=process.argv[2];
if(!input)throw Error('Supply ne_50m_admin_1_states_provinces.geojson from Natural Earth tag v5.1.1');
const bytes=fs.readFileSync(input),hash=value=>createHash('sha256').update(value).digest('hex');
if(hash(bytes)!=='69a0e06e640b2d505858ae1cb63034e4677f3000b35a98e16312932b98c426b9')throw Error('Input differs from pinned Natural Earth 5.1.1 source');
const context={};vm.runInNewContext(fs.readFileSync(new URL('dist/assets/d3.v7.9.0.min.js',root),'utf8'),context);
const raw=JSON.parse(bytes),commit='9380cca83db5f9aef52d5e762765100745f84b27';
const round=value=>Array.isArray(value)?value.map(round):Number(value.toFixed(4));
const layers=[];
for(const country of ['USA','CAN']){
 const features=raw.features.filter(f=>f.properties.adm0_a3===country).map(f=>{
  const p=f.properties;
  return {type:'Feature',properties:{id:p.iso_3166_2,country,name:{en:p.name_en||p.name,zh:p.name_zh||p.name},
   abbreviation:p.iso_3166_2.split('-')[1],type:p.type_en,labelPoint:[p.longitude,p.latitude],
   role:'modern-administrative-reference',sourceRelease:'5.1.1',license:'public-domain'},
   geometry:{type:f.geometry.type,coordinates:round(f.geometry.coordinates)}};
 });
 if(features.length!==(country==='USA'?51:13))throw Error(country+': incomplete selected administrative inventory');
 const collection=normalizeMapCollection({type:'FeatureCollection',features},context.d3.geoArea);
 for(const f of collection.features)if(!(context.d3.geoArea(f)>0&&context.d3.geoArea(f)<2*Math.PI))throw Error(f.properties.id+': invalid spherical polygon side');
 const file='us-canada-reference-'+country.toLowerCase()+'.geojson',output=JSON.stringify(collection)+'\n';
 if(Buffer.byteLength(output)>450000)throw Error(file+': split oversized geographic chunk');
 fs.writeFileSync(new URL('dist/data/'+file,root),output);
 layers.push({file,country,features:features.length,bytes:Buffer.byteLength(output),sha256:hash(output)});
}
const sources=[
 {title:'Admin 1 – States, provinces (1:50 million)',publisher:'Natural Earth',url:'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-1-states-provinces/',checkedAt:'2026-10-24',evidenceNote:'Dataset description and version 5.1.1 inspected. Generalized modern first-order administrative reference; not historical annual borders, cadastral geometry or Indigenous territorial extent.'},
 {title:'Natural Earth terms of use',publisher:'Natural Earth',url:'https://www.naturalearthdata.com/about/terms-of-use/',checkedAt:'2026-10-24',evidenceNote:'Public-domain reuse terms inspected. Attribution retained voluntarily; external historical sources retain their own rights.'},
 {title:'Pinned Natural Earth 5.1.1 source GeoJSON',publisher:'Natural Earth contributors',url:`https://github.com/nvkelso/natural-earth-vector/blob/${commit}/geojson/ne_50m_admin_1_states_provinces.geojson`,checkedAt:'2026-10-24',evidenceNote:'Repository asset acquired via Git at the pinned release. Selection is 51 US units (50 states and DC) and 13 Canadian provinces/territories; other source features are omitted.'}
];
const manifest={schemaVersion:1,role:'modern-reference',sourceRelease:'5.1.1',sourceReleaseYear:2022,reviewedAt:'2026-10-24',
 sourceCommit:commit,sourceFile:'geojson/ne_50m_admin_1_states_provinces.geojson',sourceSHA256:hash(bytes),license:'public-domain',licenseFile:'us-canada-reference.LICENSE.md',
 transformations:['Select USA and CAN administrative units only','Keep source bilingual names and label anchors','Round coordinates to four decimal places','Close/reverse ring traversal for D3 spherical winding without adding geographic vertices'],
 scope:{en:'Modern state, province and territory outlines from Natural Earth release 5.1.1 (2022), shown only as an optional geographic reference. They do not reconstruct the selected historical year, Indigenous territories, treaty areas or continuous personal residence. US overseas territories are outside this layer.',zh:'Natural Earth 5.1.1版（2022年）的现代州、省及地区轮廓，仅作为可选地理参照；不重建所选历史年份、原住民族疆域、条约地区或个人持续居住情况。本层不含美国海外属地。'},
 layers,sources};
fs.writeFileSync(new URL('dist/data/us-canada-reference.json',root),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({layers,inputSHA256:manifest.sourceSHA256},null,2));
