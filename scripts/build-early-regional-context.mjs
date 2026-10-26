// Additive selected references. Re-run after V4 and regional-continuity builders.
// node scripts/build-early-regional-context.mjs /path/to/pinned/geojson
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),out=path.join(root,'dist/data'),input=process.argv[2];
if(!input)throw Error('Supply pinned historical-basemaps geojson directory');
const commit='da7a4b735ecef70aebdc9c73e409d8a2500d50f3',date='2026-10-26',prefix='territories-early-regional-';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=n=>JSON.parse(fs.readFileSync(path.join(out,n)));
const meta=read('map-snapshots.json'),ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const S=(title,url,publisher='The Metropolitan Museum of Art')=>({title,url,publisher,checkedAt:date,evidenceNote:'Inspected institutional account for the stated regional meaning and chronology; not independent validation of every source boundary vertex.'});
const evidence={
 zhou:S('Shang and Zhou Dynasties: The Bronze Age of China','https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china'),
 greek:S('Greek Art in the Archaic Period','https://www.metmuseum.org/essays/greek-art-in-the-archaic-period'),
 classical:S('The Art of Classical Greece (ca.480–323 BCE)','https://www.metmuseum.org/essays/the-art-of-classical-greece-ca-480-323-b-c'),
 olmec:S('Olmec Art','https://www.metmuseum.org/essays/olmec-art'),
 paracas:S('Border fragment, figures with staves · Paracas','https://www.metmuseum.org/art/collection/search/308078'),
 maya:S('Ancient Maya Sculpture','https://www.metmuseum.org/essays/ancient-maya-sculpture'),
 korea:S('Korea, 1000–1400 CE','https://www.metmuseum.org/toah/ht/07/eak.html'),
 japan:S('Kamakura and Nanbokucho Periods (1185–1392)','https://www.metmuseum.org/essays/kamakura-and-nanbokucho-periods-1185-1392'),
 chola:S('Great Living Chola Temples','https://whc.unesco.org/en/list/250/','UNESCO World Heritage Centre'),
 sea:S('Southeast Asia, 500–1000 CE','https://www.metmuseum.org/toah/ht/06/sse.html'),
 seaLater:S('Southeast Asia, 1000–1400 CE','https://www.metmuseum.org/toah/ht/07/sse.html'),
 wari:S('Wari Imperial Art','https://www.metmuseum.org/essays/wari-imperial-art'),
 tiwanaku:S('Tiwanaku: Spiritual and Political Centre','https://whc.unesco.org/en/list/567/','UNESCO World Heritage Centre'),
 chimu:S('Chan Chan Archaeological Zone','https://whc.unesco.org/en/list/366/','UNESCO World Heritage Centre'),
 kushan:S('Kushan Empire · regional context','https://www.metmuseum.org/essays/kushan-empire-ca-second-century-b-c-third-century-a-d'),
};
// source year, exact source name(s), identity, EN, ZH, kind, finite window, evidence.
const rows=[
 [-1000,['Zhoa'],'zhou-regional','Western Zhou · dated regional reference','西周 · 有年代的区域参照','polity',-1046,-771,['zhou']],
 [-700,['Zhoa'],'zhou-regional','Eastern Zhou states · collective reference','东周列国 · 集体区域参照','culture',-770,-501,['zhou']],
 [-500,['Zhou states'],'zhou-regional','Eastern Zhou states · collective reference','东周列国 · 集体区域参照','culture',-500,-404,['zhou']],
 [-700,['Greek city-states'],'greek-regions','Greek city-state regions','希腊城邦地区','culture',-700,-501,['greek']],
 [-500,['Greek city-states'],'greek-regions','Greek city-state regions','希腊城邦地区','culture',-500,-401,['greek','classical']],
 [-400,['Greek city-states','Greek colonies'],'greek-regions','Greek city-state regions','希腊城邦地区','culture',-400,-324,['classical']],
 [-1000,['Olmec'],'olmec-region','Olmec Gulf Coast region','奥尔梅克湾岸地区','culture',-1200,-501,['olmec']],
 [-500,['Olmec'],'olmec-region','Olmec Gulf Coast region','奥尔梅克湾岸地区','culture',-500,-400,['olmec']],
 [-323,['Paracas'],'paracas-region','Paracas · selected coastal region','帕拉卡斯 · 精选沿海区域','culture',-500,200,['paracas']],
 [-323,['Maya chiefdoms and states'],'maya-region','Preclassic Maya regions','前古典期玛雅地区','culture',-500,249,['maya']],
 [500,['Maya states'],'maya-region','Classic Maya city-state regions','古典期玛雅城邦地区','culture',250,799,['maya']],
 [800,['Maya city-states'],'maya-region','Classic Maya city-state regions','古典期玛雅城邦地区','culture',800,899,['maya']],
 [100,['Kushan Empire'],'kushan-northern','Kushan · selected northern reference','贵霜 · 精选北部参照','polity',100,199,['kushan']],
 [1000,['Korea'],'goryeo','Goryeo · dated regional reference','高丽 · 有年代的区域参照','polity',918,1099,['korea']],
 [1100,['Korea'],'goryeo','Goryeo · dated regional reference','高丽 · 有年代的区域参照','polity',1100,1199,['korea']],
 [1200,['Goryeo'],'goryeo','Goryeo · dated regional reference','高丽 · 有年代的区域参照','polity',1200,1391,['korea']],
 [1300,['Shogun Japan (Kamakura)'],'japan-kamakura','Kamakura Japan · court and warrior government','镰仓时代日本 · 朝廷与武家政府','polity',1185,1332,['japan']],
 [1100,['Cholas'],'chola','Chola · dated southern reference','朱罗 · 有年代的南部参照','polity',1071,1199,['chola','seaLater']],
 [1200,['Chola Empire'],'chola','Chola · dated southern reference','朱罗 · 有年代的南部参照','polity',1200,1279,['chola','seaLater']],
 [800,['Srivijaya Empire'],'srivijaya','Srivijaya maritime sphere','室利佛逝海域网络','polity',750,999,['sea']],
 [1000,['Srivijaya Empire'],'srivijaya','Srivijaya maritime sphere','室利佛逝海域网络','polity',1000,1024,['sea','seaLater']],
 [1100,['Srivijaya Empire'],'srivijaya','Srivijaya · post-raid regional reference','室利佛逝 · 袭击后的区域参照','polity',1025,1199,['seaLater']],
 [1200,['Srivijaya Empire'],'srivijaya','Srivijaya maritime sphere','室利佛逝海域网络','polity',1200,1299,['seaLater']],
 [700,['Huari Empire'],'wari-region','Wari · dated regional sphere','瓦里 · 有年代的区域网络','culture',600,799,['wari']],
 [800,['Huari Empire'],'wari-region','Wari · dated regional sphere','瓦里 · 有年代的区域网络','culture',800,999,['wari']],
 [700,['Tiahuanaco Empire'],'tiwanaku-region','Tiwanaku · dated regional sphere','蒂瓦纳库 · 有年代的区域网络','culture',600,799,['wari','tiwanaku']],
 [800,['Tiahuanaco Empire'],'tiwanaku-region','Tiwanaku · dated regional sphere','蒂瓦纳库 · 有年代的区域网络','culture',800,999,['wari','tiwanaku']],
 [1400,['Chimú Empire'],'chimu','Chimú · dated coastal reference','奇穆 · 有年代的沿海参照','polity',1350,1469,['chimu']],
];
const raw=new Map(),inputs=[];
for(const year of new Set(rows.map(r=>r[0]))){const file=`world_${year<0?'bc'+-year:year}.geojson`,bytes=fs.readFileSync(path.join(input,file));const pin=[...(meta.sourceFiles||[]),...(meta.contextSourceFiles||[])].find(s=>(s.file||s.filename)===file);
 if(pin&&(pin.sourceSha256||pin.sha256)&&sha(bytes)!==(pin.sourceSha256||pin.sha256))throw Error('Input pin mismatch '+file);
 raw.set(year,JSON.parse(bytes));inputs.push({year,file,sourceCommit:commit,sourceSha256:sha(bytes),url:`https://github.com/aourednik/historical-basemaps/blob/${commit}/geojson/${file}`});}
const old=meta.layers.filter(l=>l.file.startsWith(prefix)),oldIds=new Set(old.flatMap(l=>read(l.file).features.map(f=>f.properties.id))),base=meta.layers.filter(l=>!l.file.startsWith(prefix));
const round=c=>typeof c[0]==='number'?c.slice(0,2).map(n=>+n.toFixed(4)):c.map(round);
const features=rows.map(([year,names,id,en,zh,kind,start,end,keys])=>{
 const source=inputs.find(s=>s.year===year),originals=raw.get(year).features.filter(f=>names.includes(f.properties.NAME));if(!originals.length)throw Error('Missing source '+year+' '+names);
 const polygons=originals.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates);if(!polygons.length)throw Error('No polygon');
 const geometry=normalizePolygonGeometry({type:'MultiPolygon',coordinates:round(polygons)},d3.geoArea);
 const note={en:`Selected ${year<0?-year+' BCE':year+' CE'} source outline, eligible only within ${start}–${end}. This is dated regional context, not an annual frontier or uniform territorial control. The interval is editorial source eligibility, not a founding or disappearance date.`,zh:`选取${year<0?'公元前'+-year:'公元'+year}年的来源轮廓，仅在${start}—${end}年间作为有年代的区域背景，不表示逐年疆界或均匀领土控制。此区间是编辑选择的资料适用窗口，并非建立或消失年代。`};
 const add=(a,b)=>{note.en+=' '+a;note.zh+=' '+b;};
 if(id==='zhou-regional')add('Original alias “Zhoa” is retained in provenance. Eastern Zhou fill groups competing states; it is not a unified Chinese empire. At403 BCE the existing detailed source stages replace this aggregate. No Shang or Xia border is inferred.','保留原资料“Zhoa”名称供溯源。东周着色合并呈现相互竞争的列国，并非统一帝国；公元前403年起改用已有的详细分期，不据此推断商或夏的疆域。');
 if(id==='greek-regions')add('This cultural grouping includes separate city-states and settlements. Shared color does not create a Greek empire or indicate Athenian, Spartan, Persian or Macedonian control.','此文化分组包含独立城邦和聚落。同色不表示一个希腊帝国，也不判定雅典、斯巴达、波斯或马其顿的控制范围。');
 if(['olmec-region','maya-region','paracas-region','wari-region','tiwanaku-region'].includes(id))add('A selected cultural or interaction region, not one sovereign state. The source does not resolve settlement, dynasty, influence or administrative boundaries; communities and traditions continue beyond the display window.','精选文化或交往区域，并非单一主权国家；来源不能区分聚落、王朝、影响与行政界限。社群与传统不因显示窗口结束而消失。');
 if(id==='kushan-northern')add('Only the northern source portion is available. It does not cover the Peshawar or Mathura capitals or represent the full Kushan realm in India; those omissions remain unresolved.','只选取来源中的北部区域，不涵盖白沙瓦、马图拉两处都城，也不代表贵霜在印度的全部范围；这些缺口仍待解决。');
 if(id==='goryeo')add('Later eligibility includes the period of Mongol overlordship; the fill does not assert continuous independence or reconstruct changing northern frontiers.','较晚适用窗口包含蒙古支配时期；着色不表示始终独立，也不重建北部边界变化。');
 if(id==='japan-kamakura')add('Court and military authority coexisted. This source does not fill Hokkaido or establish complete uniform shogunal administration. It stops before the1333 regime transition; the source’s misdated1400 repetition is not adopted.','朝廷与武家权力并存；不着色北海道，也不表示幕府全面均匀管治。在1333年政权转折前截止，不采用来源误置于1400年的同名轮廓。');
 if(id==='srivijaya')add('Maritime connections and dependent centers are not continuous land administration. The1025 handoff switches to a separately dated1100 reference after the documented Chola raid; it does not reconstruct the raid’s exact territorial consequences.','海上联系与附属中心不等于连续陆地行政。1025年交接在有记录的朱罗袭击后，改用另有年代的1100年参照，并非重建袭击的确切领土后果。');
 if(id==='chola')add('The southern source does not map overseas raids as permanent sovereignty. The1300/1400 donor repetitions are not used after the reviewed dynasty context.','南部来源不将海外袭击视为永久主权；不在复核的王朝背景期后继续采用原资料1300／1400年的重复同名轮廓。');
 const p={id:`early-${year}-${id}`,polityId:id,year,sourceYear:year,name:{en,zh},color:'#a6b7c8',kind,sourceNames:names,sourceAuthorities:[...new Set(originals.map(f=>f.properties.SUBJECTO).filter(Boolean))],sourceFeatureIndices:originals.map(f=>raw.get(year).features.indexOf(f)),geometrySource:source.url,sourceDataset:'historical-basemaps-early-regional',sourceCommit:commit,license:'GPL-3.0-only',review:'bounded-chronology-and-regional-context',geometryReview:'dated-source-outline-with-explicit-coverage-limits',note,
 sources:[{title:'Historical Basemaps · '+source.file,url:source.url,publisher:'André Ourednik and contributors',checkedAt:date,evidenceNote:'Pinned source features; all polygon components retained, four-decimal rounding and D3 winding normalization only.'},...keys.map(k=>evidence[k])],
 contextValidity:{start,end,backwardReviewed:year>start,reviewedAt:date,evidence:keys.map(k=>evidence[k].url),note}};
 const f={type:'Feature',properties:p,geometry};if(!(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI))throw Error('Invalid area '+p.id);return f;
});
const collection=features=>({type:'FeatureCollection',name:'Selected early and medieval regional context',license:'GPL-3.0-only',sourceCommit:commit,features});
const parts=[];let chunk=[];for(const f of features){if(chunk.length&&Buffer.byteLength(JSON.stringify(collection([...chunk,f])))>=450000){parts.push(chunk);chunk=[];}chunk.push(f);}if(chunk.length)parts.push(chunk);
const layers=parts.map((part,i)=>{const file=prefix+String(i+1).padStart(2,'0')+'.geojson',text=JSON.stringify(collection(part));if(Buffer.byteLength(text)>=450000)throw Error('Oversized shard');fs.writeFileSync(path.join(out,file),text);return{file,license:'GPL-3.0-only',licenseFile:'territories.LICENSE',sourceCommit:commit,featureCount:part.length,outputSha256:sha(text),attribution:'André Ourednik and contributors; bounded Atlas regional context selection'};});
for(const l of old)if(!layers.some(n=>n.file===l.file))fs.unlinkSync(path.join(out,l.file));
meta.layers=[...base,...layers];for(const snapshot of meta.snapshots){snapshot.featureIds=snapshot.featureIds.filter(id=>!oldIds.has(id));snapshot.featureIds.push(...features.filter(f=>f.properties.year===snapshot.year).map(f=>f.properties.id));snapshot.featureCount=snapshot.featureIds.length;}
meta.earlyRegionalReview={reviewedAt:date,documentation:'docs/EARLY_REGIONAL_MAP_REVIEW.md',sourceCommit:commit,inputs,featureCount:features.length};
fs.writeFileSync(path.join(out,'map-snapshots.json'),JSON.stringify(meta,null,2)+'\n');console.log(JSON.stringify({features:features.length,shards:layers.length,bytes:layers.reduce((n,l)=>n+fs.statSync(path.join(out,l.file)).size,0)},null,2));
