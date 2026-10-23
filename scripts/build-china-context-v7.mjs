import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {createHash} from 'node:crypto';
// Reproducible extraction of inherited schematic phases. No geometry is
// interpolated, and source display windows are not independently verified borders.
const d3Context={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),d3Context);
const [upstream,translations,output] = process.argv.slice(2);
if(!upstream||!translations||!output)throw Error('Usage: node scripts/build-china-context-v7.mjs <original-source-directory> <extracted-i18n.json> <dist/data>');
const context={window:{}};vm.createContext(context);
for(const f of ['map_data.js','atlas_snapshots.js'])vm.runInContext(fs.readFileSync(path.join(upstream,'js',f),'utf8'),context);
const all=context.window.ATLAS_SNAPSHOTS,eras=context.window.DYNASTY_DATA,tr=JSON.parse(fs.readFileSync(translations,'utf8'));
const root='https://github.com/haitaowu12/jiangshan-map/blob/fcd6484d06d3c581241fc24adbab288cf3a4a2ea/';
const index={schemaVersion:1,reviewStatus:'inherited-schematic',source:{repository:'https://github.com/haitaowu12/jiangshan-map',upstreamRepository:'https://github.com/DeanChensj/jiangshan-map',commit:'fcd6484d06d3c581241fc24adbab288cf3a4a2ea',files:['js/map_data.js','js/atlas_snapshots.js'],licenseNotice:'china-context-v7.LICENSE.md'},method:{en:'Source-defined historical stages from Jiangshan Map. These are inherited reference schematics, not independently reconstructed or annually verified borders. Only main and rival political features are included; static neighbor templates are excluded because their names are reused across dates. Empty modern snapshots use the shared global map, not an invented outline.',zh:'采用《江山时序》原有历史分段；属于继承的参考示意图，并非独立重建或逐年核实的边界。仅保留主体与并立政权，排除跨年代复用名称的固定邻国模板。现代空白阶段使用世界地图共有图层，不补造轮廓。'},periods:[]};
let count=0,phaseCount=0,administrativeCount=0;
for(let ei=0;ei<eras.length;ei++){
 const era=eras[ei],next=eras[ei+1],end=next?next.fromYear-1:Math.min(2026,era.toYear-1),period={id:era.key,start:era.fromYear,end,name:{en:tr.dynasties[era.key]?.name||era.title,zh:era.title},color:era.tint,phases:[],file:`china-context-${era.key}-v7.json`};
 const featureMap=new Map(),features=[],administrativeMap=new Map(),administrative=[];let start=era.fromYear;
 const phases=era.phases||[{until:era.toYear,snap:'s_'+era.key,overview:''}];
 for(let pi=0;pi<phases.length;pi++){
  const phase=phases[pi],snapshot=all[phase.snap],last=pi===phases.length-1,phaseEnd=last?end:Math.min(end,phase.until-1);
  if(!snapshot||start>phaseEnd)continue;
  const out={id:phase.snap,start,end:phaseEnd,periodId:era.key,caption:{zh:phase.overview||snapshot.caption||era.title,en:`${period.name.en} · source stage ${pi+1}/${phases.length}`},sourceUntilExclusive:phase.until,featureIds:[],administrativeIds:[]};
  for(const f of snapshot.polities||[]){
   if(!['main','rival'].includes(f.role)||!f.shape||!['Polygon','MultiPolygon'].includes(f.shape.type))continue;
   const serialized=JSON.stringify([f.title,f.tint,f.anchor,f.shape]),hash=createHash('sha256').update(serialized).digest('hex').slice(0,16);let id=featureMap.get(hash);
   if(!id){id=`china-schematic-${era.key}-${features.length+1}`;featureMap.set(hash,id);features.push({type:'Feature',properties:{id,polityId:`china-schematic-${era.key}-${f.title}`,name:{en:tr.dict[f.title]||f.title,zh:f.title},color:f.tint||era.tint||'#ad7862',labelAnchor:f.anchor,role:f.role,periodId:era.key,category:'polity',license:'See china-context-v7.LICENSE.md; GPL-3.0 README and MIT copyright notice retained',sourceDataset:'jiangshan-phase-schematic',review:'inherited-schematic-not-independently-verified',geometrySource:root+'js/atlas_snapshots.js',sources:[{title:'Jiangshan Map: original stage geometry',url:root+'js/atlas_snapshots.js',publisher:'DeanChensj; haitaowu12 fork',evidenceNote:'Inherited source schematic; no independent boundary reconstruction is claimed.'},{title:'Jiangshan Map: original display intervals',url:root+'js/map_data.js',publisher:'DeanChensj; haitaowu12 fork'}],note:index.method},geometry:normalizePolygonGeometry(f.shape,d3Context.d3.geoArea)});}
   out.featureIds.push(id);count++;
  }
  // Administrative divisions are optional, separate lazy files: they must not
  // crowd the world map and source prefRef/regionRef chains must remain explicit.
  function referenced(field,refField){let current=snapshot,seen=new Set();while((!current[field]||!current[field].length)&&current[refField]&&!seen.has(current[refField])){seen.add(current[refField]);current=all[current[refField]]||{};}return current[field]||[];}
  for(const f of [...referenced('regions','regionRef'),...referenced('prefectures','prefRef')]){
   if(!f.shape||!['Polygon','MultiPolygon'].includes(f.shape.type))continue;
   const hash=createHash('sha256').update(JSON.stringify([f.title,f.category,f.anchor,f.shape])).digest('hex').slice(0,16);let id=administrativeMap.get(hash);
   if(!id){id=`china-admin-${era.key}-${administrative.length+1}`;administrativeMap.set(hash,id);administrative.push({type:'Feature',properties:{id,name:{en:tr.dict[f.title]||f.title,zh:f.title},category:f.category||'source-administrative',labelAnchor:f.anchor,periodId:era.key,review:'inherited-schematic-not-independependently-verified',license:'See china-context-v7.LICENSE.md; GPL-3.0 README and MIT copyright notice retained',sourceDataset:'jiangshan-administrative-schematic',geometrySource:root+'js/atlas_snapshots.js'},geometry:normalizePolygonGeometry(f.shape,d3Context.d3.geoArea)});}out.administrativeIds.push(Number(id.split('-').at(-1))-1);administrativeCount++;
  }
  period.phases.push(out);phaseCount++;start=phase.until;if(start===0)start=1;
 }
 function writeChunks(items,prefix){const chunks=[];let part=[],bytes=0;for(const f of items){const n=Buffer.byteLength(JSON.stringify(f));if(bytes+n>390000&&part.length){chunks.push(part);part=[];bytes=0;}part.push(f);bytes+=n;}if(part.length)chunks.push(part);return chunks.map((features,i)=>{const file=`${prefix}-${String(i+1).padStart(2,'0')}-v7.json`;fs.writeFileSync(path.join(output,file),JSON.stringify({type:'FeatureCollection',periodId:era.key,features}));return file;});}
 period.files=writeChunks(features,`china-context-${era.key}`);delete period.file;period.featureCount=features.length;
 period.administrativeFiles=writeChunks(administrative,`china-administrative-${era.key}`);period.administrativeFeatureCount=administrative.length;
 index.periods.push(period);
}
index.counts={periods:index.periods.length,phases:phaseCount,politicalFeatureOccurrences:count,uniquePoliticalFeatures:index.periods.reduce((n,p)=>n+(p.featureCount||0),0),administrativeFeatureOccurrences:administrativeCount,uniqueAdministrativeFeatures:index.periods.reduce((n,p)=>n+(p.administrativeFeatureCount||0),0)};
index.geometryNormalization={renderer:'D3 spherical geometry',exteriors:'clockwise for sub-hemisphere polygons',holes:'opposite winding',openRings:'closed by repeating the first vertex',scope:'Traversal order and ring closure only; source geographic coordinates and historical interpretation are preserved.'};
fs.writeFileSync(path.join(output,'china-context-index-v7.json'),JSON.stringify(index)+'\n');
console.log(JSON.stringify(index.counts));
