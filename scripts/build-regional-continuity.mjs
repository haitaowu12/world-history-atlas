// Additive correction to the frozen V4 map selection. Run after the V4 builder:
// node scripts/build-regional-continuity.mjs /path/to/pinned/geojson
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),out=path.join(root,'dist/data');
if(!process.argv[2])throw Error('Supply the pinned historical-basemaps geojson directory');
const input=path.resolve(process.argv[2]),commit='da7a4b735ecef70aebdc9c73e409d8a2500d50f3',checkedAt='2026-10-26';
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const metaPath=path.join(out,'map-snapshots.json'),meta=JSON.parse(fs.readFileSync(metaPath));
const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const sources={
 south:{title:'South America, 1800–1900',publisher:'The Metropolitan Museum of Art',url:'https://www.metmuseum.org/toah/ht/10/sa.html'},
 brazil:{title:'Decree of 10 December 1822',publisher:'Presidência da República, Brazil',url:'https://www.planalto.gov.br/ccivil_03/decreto/historicos/dim/dim-10-12-1822.htm'},
 colombia:{title:'El proyecto grancolombiano',publisher:'Banco de la República, Colombia',url:'https://enciclopedia.banrepcultural.org/index.php/El_proyecto_grancolombiano'},
 asante:{title:'Art of the Asante Kingdom',publisher:'The Metropolitan Museum of Art',url:'https://www.metmuseum.org/essays/art-of-the-asante-kingdom'},
 savanna:{title:'Kingdoms of the Savanna: The Luba and Lunda Empires',publisher:'The Metropolitan Museum of Art',url:'https://www.metmuseum.org/essays/kingdoms-of-the-savanna-the-luba-and-lunda-empires'},
 kuba:{title:'Kingdoms of the Savanna: The Kuba Kingdom',publisher:'The Metropolitan Museum of Art',url:'https://www.metmuseum.org/essays/kingdoms-of-the-savanna-the-kuba-kingdom'},
 lakes:{title:'Vassal and Fief in Three Lacustrine Kingdoms',publisher:'Edward I. Steinhart, Cahiers d’Études africaines / Persée',url:'https://www.persee.fr/doc/cea_0008-0055_1967_num_7_28_3112'},
 merina:{title:'Royal Hill of Ambohimanga',publisher:'UNESCO World Heritage Centre',url:'https://whc.unesco.org/en/list/950/'},
 sokoto:{title:'The Legacies of Jean Boyd and Nana Asma’u Fodio',publisher:'SOAS Special Collections',url:'https://blogs.soas.ac.uk/archives/2022/05/09/the-legacies-of-jean-boyd-1934-2022-and-nana-asmau-fodio-1793-1864/'},
};
// Source year, exact source NAME, stable identity, bilingual label, finite
// context window, independent context sources. These are dated references,
// never an assertion of annually unchanged borders or complete control.
const rows=[
 [1815,'Viceroyalty of Brazil','brazil-portuguese','Brazil under the Portuguese crown','葡萄牙王室统治下的巴西',1815,1821,['south','brazil']],
 [1878,'Kingdom of Brazil','brazil-empire','Empire of Brazil','巴西帝国',1822,1885,['south','brazil']],
 [1878,'Chile','chile','Chile','智利',1831,1885,['south']],
 [1878,'Peru','peru-republic','Peru','秘鲁',1839,1885,['south']],
 [1878,'Bolivia','bolivia','Bolivia','玻利维亚',1839,1885,['south']],
 [1878,'Paraguay','paraguay','Paraguay','巴拉圭',1871,1885,['south']],
 [1878,'Uruguay','uruguay','Uruguay','乌拉圭',1830,1885,['south']],
 [1878,'Colombia','colombia','United States of Colombia','哥伦比亚合众国',1863,1885,['south','colombia']],
 [1878,'Ecuador','ecuador','Ecuador','厄瓜多尔',1832,1885,['south','colombia']],
 [1815,'Asante','asante','Asante','阿桑特',1750,1873,['asante']],
 [1878,'Asante','asante','Asante','阿桑特',1874,1887,['asante']],
 [1815,'Fulani Empire','sokoto','Sokoto Caliphate','索科托哈里发国',1815,1877,['sokoto']],
 [1878,'Sokoto Caliphate','sokoto','Sokoto Caliphate','索科托哈里发国',1878,1898,['sokoto']],
 [1815,'Buganda','buganda','Buganda','布干达',1815,1877,['lakes']],
 [1878,'Buganda','buganda','Buganda','布干达',1878,1890,['lakes']],
 [1815,'Bunyoro','bunyoro','Bunyoro','布尼奥罗',1815,1877,['lakes']],
 [1878,'Bunyoro','bunyoro','Bunyoro','布尼奥罗',1878,1890,['lakes']],
 [1815,'Lunda','lunda','Lunda political network','隆达政治网络',1800,1877,['savanna']],
 [1878,'Lunda','lunda','Lunda political network','隆达政治网络',1878,1885,['savanna']],
 [1878,'Luba','luba','Luba heartland','卢巴腹地',1800,1885,['savanna']],
 [1878,'Kuba','kuba','Kuba kingdom','库巴王国',1800,1885,['kuba']],
 [1815,'Merina Kingdom','merina','Merina kingdom','梅里纳王国',1815,1877,['merina']],
 [1878,'Imerina','merina','Merina kingdom','梅里纳王国',1878,1885,['merina']],
];
const prefix='territories-continuity-',oldLayers=meta.layers.filter(l=>l.file.startsWith(prefix));
const removedIds=new Set(oldLayers.flatMap(l=>JSON.parse(fs.readFileSync(path.join(out,l.file))).features.map(f=>f.properties.id)));
const baseLayers=meta.layers.filter(l=>!l.file.startsWith(prefix));
const originals=baseLayers.flatMap(l=>JSON.parse(fs.readFileSync(path.join(out,l.file))).features);
const existing=new Map(originals.map(f=>[f.properties.polityId,f.properties]));
const palette=['#b06c61','#82975a','#a88c48','#6c8f9c','#a77c9a','#7e9b82','#b08b66','#8b85aa','#709e98','#ad7782'];
const color=id=>{let n=0;for(const ch of id)n=(n*31+ch.charCodeAt(0))>>>0;return existing.get(id)?.color||palette[n%palette.length];};
const rawByYear=new Map();
for(const year of new Set(rows.map(r=>r[0]))){
 const name=`world_${year}.geojson`,bytes=fs.readFileSync(path.join(input,name));
 const recorded=meta.contextSourceFiles.find(s=>s.file===name);
 if(!recorded||recorded.sourceSha256!==sha(bytes))throw Error(`Source does not match pinned manifest: ${name}`);
 rawByYear.set(year,JSON.parse(bytes));
}
const features=rows.map(([year,sourceName,id,en,zh,start,end,keys])=>{
 const selected=rawByYear.get(year).features.filter(f=>f.properties.NAME===sourceName);
 if(selected.length!==1)throw Error(`Expected one ${sourceName} in ${year}`);
 const source=meta.contextSourceFiles.find(s=>s.year===year);
 // Retain all components/holes; round like V4 and normalize only ring traversal.
 const round=coordinates=>typeof coordinates[0]==='number'?coordinates.slice(0,2).map(n=>+n.toFixed(4)):coordinates.map(round);
 const geometry=normalizePolygonGeometry({...selected[0].geometry,coordinates:round(selected[0].geometry.coordinates)},d3.geoArea);
 const scope={
  en:`The ${year} source outline is a dated regional reference within ${start}–${end}, not the selected year’s frontier or a claim of uniform control. Expansion, contested land and wartime changes are not reconstructed.`,
  zh:`${year}年来源轮廓仅在${start}—${end}年间用作有日期的区域参照，不表示所选年份的边界或全境控制；不重建扩张、争议地区及战争期间的变化。`,
 };
 if(['luba','lunda','kuba','sokoto','buganda','bunyoro'].includes(id)){
  scope.en+=' This is a selected heartland or network outline; dependent communities and local authority cannot be reduced to modern territorial sovereignty.';
  scope.zh+=' 仅选取来源中的腹地或网络轮廓，不能将附属共同体和地方权力简化为现代领土主权。';
 }
 if(id==='merina'){scope.en+=' Only the source’s Merina/Imerina region is selected, not the whole island of Madagascar.';scope.zh+=' 只选取来源中的梅里纳／伊梅里纳区域，不将整个马达加斯加岛视为其疆域。';}
 if(id==='brazil-portuguese'){scope.en+=' The source label “Viceroyalty” is retained in provenance; the displayed name covers the Portuguese-crown phase and stops before independence in 1822. Indigenous societies were not uniformly controlled.';scope.zh+=' 来源的“总督辖区”名称保留于溯源字段；显示名称仅指葡萄牙王室统治阶段，在1822年独立前截止，不表示对原住民社会的全面控制。';}
 if(id==='brazil-empire'){scope.en+=' The source’s “Kingdom of Brazil” label is corrected to Empire; its 1878 outline excludes Uruguay and does not reconstruct the earlier Cisplatine occupation or later Acre acquisition.';scope.zh+=' 将来源中的“巴西王国”更正为帝国；1878年轮廓不含乌拉圭，也不重建较早的西斯普拉廷占领或后来的阿克里并入。';}
 if(['peru-republic','bolivia','chile'].includes(id)){scope.en+=' This is the pre-War of the Pacific 1878 reference, including Bolivia’s Pacific access; post-1878 occupation and treaty borders are not asserted.';scope.zh+=' 此为太平洋战争前的1878年参照，包含玻利维亚当时的太平洋通道，不表示1878年以后的占领线或条约边界。';}
 const historicalSources=keys.map(key=>({...sources[key],checkedAt,evidenceNote:key==='lakes'?'Accessible opening page inspected for the three named Great Lakes kingdoms and institutional comparison; no claim to full article inspection or annual boundaries.':'Inspected for named society/state chronology and regional context only, not individual boundary vertices.'}));
 const p={id:`${year}-${id}`,polityId:id,year,sourceYear:year,name:{en,zh},color:color(id),kind:'polity',sourceNames:[sourceName],sourceAuthorities:[selected[0].properties.SUBJECTO].filter(Boolean),geometrySource:source.url,sourceDataset:'historical-basemaps-regional-continuity',sourceCommit:commit,license:'GPL-3.0-only',review:'bounded-chronology-and-regional-context',geometryReview:'dated-source-outline-with-explicit-coverage-limits',note:scope,
  sources:[{title:`Historical Basemaps: ${year}`,url:source.url,publisher:'André Ourednik and contributors',checkedAt,evidenceNote:'Pinned source polygon; original NAME retained. Coordinate rounding and spherical winding only; no invented frontier.'},...historicalSources],
  contextValidity:{start,end,backwardReviewed:start<year,reviewedAt:checkedAt,evidence:historicalSources.map(s=>s.url),note:{en:'Eligible as dated context within this interval. Its endpoints do not establish a state’s founding, disappearance, conquest or unchanged borders.',zh:'仅在本时段内作为有日期的背景参照；起讫年份不表示国家建立、消失、被征服或边界始终不变。'}}};
 if(end>1885){
  p.countryPeriodSupplement=true;
  scope.en+=' After 1885 this supplements a gap in CShapes. Its last display year is a source-layer handoff, not the date the kingdom ceased to exist or was conquered.';
  scope.zh+=' 1885年后仅补充CShapes的覆盖缺口。最后显示年份表示来源图层交接，不是王国消失或被征服的日期。';
 }
 const feature={type:'Feature',properties:p,geometry};
 if(originals.some(f=>f.properties.id===p.id))throw Error(`Duplicate ${p.id}`);
 const area=d3.geoArea(feature);if(!(area>0&&area<2*Math.PI))throw Error(`Invalid spherical area ${p.id}`);
 for(const make of [d3.geoEqualEarth,d3.geoNaturalEarth1,d3.geoEquirectangular])if(/NaN|Infinity/.test(d3.geoPath(make())(feature)))throw Error(`Invalid projection ${p.id}`);
 return feature;
});
const collection=features=>({type:'FeatureCollection',name:'South American and African dated regional context',license:'GPL-3.0-only',sourceCommit:commit,features});
const parts=[];let part=[];
for(const feature of features){if(part.length&&Buffer.byteLength(JSON.stringify(collection([...part,feature])))>=450000){parts.push(part);part=[];}part.push(feature);}if(part.length)parts.push(part);
const layers=parts.map((features,i)=>{
 const file=`${prefix}${String(i+1).padStart(2,'0')}.geojson`,text=JSON.stringify(collection(features));
 if(Buffer.byteLength(text)>=450000)throw Error(`Oversized ${file}`);
 fs.writeFileSync(path.join(out,file),text);
 return {file,license:'GPL-3.0-only',licenseFile:'territories.LICENSE',sourceCommit:commit,featureCount:features.length,attribution:'André Ourednik and historical-basemaps contributors; bounded Atlas regional context selection',outputSha256:sha(text)};
});
for(const layer of oldLayers)if(!layers.some(l=>l.file===layer.file))fs.unlinkSync(path.join(out,layer.file));
meta.layers=[...baseLayers,...layers];
for(const snapshot of meta.snapshots){
 snapshot.featureIds=snapshot.featureIds.filter(id=>!removedIds.has(id));
 snapshot.featureIds.push(...features.filter(f=>f.properties.year===snapshot.year).map(f=>f.properties.id));
 snapshot.featureCount=snapshot.featureIds.length;
}
meta.regionalContinuityReview={reviewedAt:checkedAt,method:'Additive dated context; no annual border interpolation',documentation:'docs/REGIONAL_MAP_CONTINUITY.md',featureCount:features.length};
fs.writeFileSync(metaPath,JSON.stringify(meta,null,2)+'\n');
console.log(JSON.stringify({added:features.length,shards:layers.length,bytes:layers.reduce((n,l)=>n+fs.statSync(path.join(out,l.file)).size,0)},null,2));
