// Additive after V4 -> regional-continuity -> early-regional. Each builder owns its prefix.
// node scripts/build-regional-gap-context.mjs /path/to/pinned/geojson
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),out=path.join(root,'dist/data'),input=process.argv[2];
if(!input)throw Error('Supply the pinned historical-basemaps geojson directory');
const config=JSON.parse(fs.readFileSync(new URL('./regional-gap-selection.json',import.meta.url))),{sourceCommit:commit,reviewedAt:date}=config,prefix='territories-regional-gaps-';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=n=>JSON.parse(fs.readFileSync(path.join(out,n))),meta=read('map-snapshots.json');
const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const raw=new Map(),inputs=[];
// A retained checksum receipt makes subsequent builds refuse changed donor bytes.
const receipt=meta.regionalGapsReview;
for(const year of new Set(config.rows.map(r=>r.year))){
 const file=`world_${year}.geojson`,bytes=fs.readFileSync(path.join(input,file));
 const previous=[...(receipt?.inputs||[]),...(meta.sourceFiles||[]),...(meta.contextSourceFiles||[])].find(s=>(s.file||s.filename)===file);
 if(previous&&(previous.sourceSha256||previous.sha256)&&sha(bytes)!==(previous.sourceSha256||previous.sha256))throw Error('Input pin mismatch '+file);
 raw.set(year,JSON.parse(bytes));inputs.push({year,file,sourceCommit:commit,sourceSha256:sha(bytes),url:`https://github.com/aourednik/historical-basemaps/blob/${commit}/geojson/${file}`});
}
const round=c=>typeof c[0]==='number'?c.slice(0,2).map(n=>+n.toFixed(4)):c.map(round);
const features=config.rows.map(r=>{
 const {year,polityId,indices,sourceNames,componentIndices}=r,source=inputs.find(s=>s.year===year),originals=indices.map(i=>raw.get(year).features[i]);
 if(originals.some((f,i)=>!f||f.properties.NAME!==sourceNames[i]))throw Error('Source pointer/name mismatch '+year+' '+polityId);
 let polygons=originals.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates);
 if(componentIndices){if(originals.length!==1)throw Error('Ambiguous component source');polygons=componentIndices.map(i=>polygons[i]);if(polygons.some(p=>!p))throw Error('Missing component');}
 const geometry=normalizePolygonGeometry({type:'MultiPolygon',coordinates:round(polygons)},d3.geoArea);
 const scope=config.notes[polityId];if(!scope)throw Error('Missing scope note');
 const note={en:`Selected ${year} CE source outline, eligible only within ${r.start}–${r.end}. Dated regional context, not an annual frontier or uniform territorial control. The interval is editorial source eligibility, not a founding or disappearance date. ${scope.en}`,zh:`选取公元${year}年的来源轮廓，仅在${r.start}—${r.end}年间作为有年代的区域背景，不表示逐年疆界或均匀领土控制。此区间是编辑选择的资料适用窗口，并非建立或消失年代。${scope.zh}`};
 const evidence=r.evidence.map(k=>({...config.evidence[k],checkedAt:date,evidenceNote:'Inspected institutional/scholarly account supports the stated chronology and regional interpretation; it does not independently validate each boundary vertex.'}));
 const p={id:`gaps-${year}-${polityId}`,polityId,year,sourceYear:year,name:r.name,color:'#a6b7c8',kind:r.kind,region:r.region,sourceNames,sourceAuthorities:[...new Set(originals.map(f=>f.properties.SUBJECTO).filter(Boolean))],sourceFeatureIndices:indices,geometrySource:source.url,sourceDataset:'historical-basemaps-regional-gaps',sourceCommit:commit,license:'GPL-3.0-only',review:'bounded-chronology-and-regional-context',geometryReview:'dated-source-outline-with-explicit-coverage-limits',note,
  sources:[{title:'Historical Basemaps · '+source.file,url:source.url,publisher:'André Ourednik and contributors',checkedAt:date,evidenceNote:componentIndices?'Explicitly selected original island component; no new boundary vertices. See scope note for post-independence reassignment.':'All selected source polygon components retained; four-decimal rounding and D3 winding normalization only.'},...evidence],contextValidity:{start:r.start,end:r.end,backwardReviewed:year>r.start,reviewedAt:date,evidence:evidence.map(s=>s.url),note}};
 if(componentIndices)p.sourceComponentIndices=componentIndices;
 if(polityId==='polonnaruwa')p.geometryAmendment={type:'reviewed-component-reassignment',sourcePolity:'Chola Empire',sourceYear:year,retainedComponents:componentIndices,reviewedAt:date};
 if(polityId==='bagan'&&year===1200)p.sourceCorrection={type:'reviewed-source-component-composite',originalNames:sourceNames,reviewedAt:date,note:scope,evidence:evidence.map(s=>s.url)};
 const f={type:'Feature',properties:p,geometry};if(!(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI))throw Error('Invalid spherical area '+p.id);return f;
});
const old=meta.layers.filter(l=>l.file.startsWith(prefix)),oldIds=new Set(old.flatMap(l=>read(l.file).features.map(f=>f.properties.id))),base=meta.layers.filter(l=>!l.file.startsWith(prefix));
const collection=features=>({type:'FeatureCollection',name:'Selected South Asian, African and Southeast Asian references',license:'GPL-3.0-only',sourceCommit:commit,features});
const parts=[];let chunk=[];for(const f of features){if(chunk.length&&Buffer.byteLength(JSON.stringify(collection([...chunk,f])))>=450000){parts.push(chunk);chunk=[];}chunk.push(f);}if(chunk.length)parts.push(chunk);
const layers=parts.map((part,i)=>{const file=prefix+String(i+1).padStart(2,'0')+'.geojson',text=JSON.stringify(collection(part));if(Buffer.byteLength(text)>=450000)throw Error('Oversized shard');fs.writeFileSync(path.join(out,file),text);return{file,license:'GPL-3.0-only',licenseFile:'territories.LICENSE',sourceCommit:commit,featureCount:part.length,outputSha256:sha(text),attribution:'André Ourednik and contributors; bounded Atlas regional context selection'};});
for(const l of old)if(!layers.some(n=>n.file===l.file))fs.unlinkSync(path.join(out,l.file));
meta.layers=[...base,...layers];
for(const source of inputs)if(!meta.snapshots.some(s=>s.year===source.year))meta.snapshots.push({year:source.year,label:{en:source.year+' CE',zh:'公元'+source.year+'年'},title:{en:'Selected regional source checkpoint',zh:'精选区域来源节点'},featureIds:[],featureCount:0,file:source.file,sourceSha256:source.sourceSha256});
meta.snapshots.sort((a,b)=>a.year-b.year);
for(const snapshot of meta.snapshots){snapshot.featureIds=snapshot.featureIds.filter(id=>!oldIds.has(id));snapshot.featureIds.push(...features.filter(f=>f.properties.year===snapshot.year).map(f=>f.properties.id));snapshot.featureCount=snapshot.featureIds.length;}
meta.regionalGapsReview={reviewedAt:date,documentation:'docs/REGIONAL_GAPS_REVIEW.md',selection:'scripts/regional-gap-selection.json',sourceCommit:commit,inputs,featureCount:features.length,regions:Object.fromEntries([...new Set(config.rows.map(r=>r.region))].map(region=>[region,config.rows.filter(r=>r.region===region).length]))};
fs.writeFileSync(path.join(out,'map-snapshots.json'),JSON.stringify(meta,null,2)+'\n');console.log(JSON.stringify({features:features.length,identities:new Set(features.map(f=>f.properties.polityId)).size,shards:layers.length,bytes:layers.reduce((n,l)=>n+fs.statSync(path.join(out,l.file)).size,0)},null,2));
