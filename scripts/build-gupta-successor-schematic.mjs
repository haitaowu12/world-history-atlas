// Source-dated, approximate sixth-century South Asian regional cores.
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),data=path.join(root,'dist/data'),sources=path.join(root,'references/gupta-sixth-century');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=n=>JSON.parse(fs.readFileSync(path.join(data,n)));
const meta=read('map-snapshots.json'),ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const affine=[[0.021240305065824486,0.00023860264228201891],[0.0009174678717018712,-0.019978621850902607],[65.77802735158748,42.83170753683861]];
const round=n=>+n.toFixed(4);
function pathOf(svg,id,fill){const tag=svg.match(new RegExp(`<path\\b[^>]*\\bid="${id}"[^>]*>`));if(!tag)throw Error('Missing path '+id);if(!tag[0].includes('fill:'+fill)||!tag[0].includes('filter:url(#filter'))throw Error('Unexpected source painting '+id);const m=tag[0].match(/\bd="([^"]+)"/);if(!m)throw Error('Missing path data '+id);return m[1];}
// These four retained path data strings use only relative moveto, cubic Bézier
// and closepath. Sample curves at <=5 source pixels per control-polygon length.
function sampledCurve(d,offset){const tokens=d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g);let i=0,x=0,y=0,start,cmd,points=[];
 const n=()=>{const t=tokens[i++];if(t===undefined||!Number.isFinite(Number(t)))throw Error('Invalid path number '+t);return Number(t);};
 const project=(x,y)=>{x-=offset[0];y-=offset[1];return [round(x*affine[0][0]+y*affine[1][0]+affine[2][0]),round(x*affine[0][1]+y*affine[1][1]+affine[2][1])];};
 while(i<tokens.length){if(/^[A-Za-z]$/.test(tokens[i]))cmd=tokens[i++];
  if(cmd==='m'){x+=n();y+=n();start=[x,y];points.push(project(x,y));cmd='l';}
  else if(cmd==='c'){const x0=x,y0=y,c1=[x+n(),y+n()],c2=[x+n(),y+n()],end=[x+n(),y+n()];const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);const steps=Math.max(4,Math.ceil((dist([x,y],c1)+dist(c1,c2)+dist(c2,end))/5));for(let j=1;j<=steps;j++){const t=j/steps,u=1-t;points.push(project(u*u*u*x0+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*end[0],u*u*u*y0+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*end[1]));} [x,y]=end;}
  else if(cmd==='z'){if(!start)throw Error('Close before start');points.push(points[0]);cmd=undefined;}
  else throw Error('Unsupported SVG path command '+cmd);
 }
 if(points.length<4||JSON.stringify(points[0])!==JSON.stringify(points.at(-1)))throw Error('Unclosed path');return points;}
const date='2026-10-27',prefix='territories-gupta-successors-';
const configs=[
 {year:550,start:550,end:589,offset:[-22.5617,0.78331],sha256:'ba37bcd11d5975d6f94bfb634f4692df95c3d8fadbe470751fa3882c9afa1d96'},
 {year:590,start:590,end:599,offset:[-39.3726,-140.4282],sha256:'6ea5bdcfb6c2e6c138e158ba3080b48f1e064b6890b098a9012c0caf73983175'}
];
const subjects=[
 {id:'later-gupta-court',pathId:'path9019',en:'Later Gupta · regional court area',zh:'后笈多 · 宫廷区域',expectedFill:'#d77ddc'},
 {id:'maukhari-court',pathId:'path9805',en:'Maukhari · regional court area',zh:'摩揭梨 · 宫廷区域',expectedFill:'#eb8c96'},
 {id:'chalukya-badami',pathId:'path3742-1',en:'Chalukya · approximate core',zh:'遮娄其 · 近似核心区',expectedFill:'#ffb928'},
 {id:'pushyabhuti-court',pathId:'path9957',en:'Pushyabhuti · regional court area',zh:'补沙菩提 · 宫廷区域',expectedFill:'#87c8aa',only:590}
];
const old=meta.layers.filter(l=>l.file.startsWith(prefix)),oldIds=new Set(old.flatMap(l=>read(l.file).features.map(f=>f.properties.id)));
const features=[],layers=[];
for(const c of configs){
 const filename=`South_Asia_historical_AD${c.year}_EN.svg`,bytes=fs.readFileSync(path.join(sources,filename));if(sha(bytes)!==c.sha256)throw Error('Source hash mismatch '+filename);
 const url=`https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD${c.year}_EN.svg`,svg=bytes.toString('utf8');
 const current=subjects.filter(s=>!s.only||s.only===c.year).map(s=>{
  const note={en:`The artist's ${c.year} CE map shows this diffuse regional core; its ${c.start}–${c.end} display window is editorial context, not a year-by-year survey. The Later Guptas are a separate later line and are not automatically the surviving imperial Gupta state; their relationship and regional history are debated. Other scholarship places the Maukhari–Later Gupta contest differently, including a possible Maukhari occupation of Magadha. This map is one interpretation, not a resolved boundary. It was approximately aligned to reference cities; an outlying source city marker is displaced about 180 km.`,zh:`原作者的公元${c.year}年地图以模糊形状展示此区域核心；${c.start}—${c.end}年的显示范围只是编辑背景，并非逐年测绘。后笈多是另列的后期王系，不能自动等同于存续的帝国笈多；其关系和区域史仍有争议。其他研究对摩揭梨与后笈多的争夺有不同解释，包括摩揭梨可能占领摩揭陀。本图只是其中一种观点，不是已确定的边界。地图依据参照城市近似对齐；原图一个离群城市标记约偏移180公里。`};
  const geometry=normalizePolygonGeometry({type:'Polygon',coordinates:[sampledCurve(pathOf(svg,s.pathId,s.expectedFill),c.offset)]},d3.geoArea);
  const f={type:'Feature',properties:{id:`gupta-successor-${c.year}-${s.id}`,polityId:s.id,year:c.year,sourceYear:c.year,name:{en:s.en,zh:s.zh},color:'#a6b7c8',kind:'polity',region:'south-asia',sourceDataset:'woudloper-gupta-successor-schematic',geometrySource:url,sourceSha256:c.sha256,sourcePathId:s.pathId,license:'CC-BY-SA-4.0',attribution:'Woudloper; adapted from the source South Asia historical SVG.',review:'approximate-dated-schematic-core',visualTreatment:'diffuse-schematic',displayDistinctFrom:subjects.filter(x=>x.id!==s.id).map(x=>x.id),geometryReview:'Source diffuse curve sampled and approximately georegistered; not a surveyed frontier',note,
   sources:[{title:`South Asia historical AD${c.year} EN.svg`,url,publisher:'Woudloper / Wikimedia Commons',checkedAt:date,evidenceNote:'Inspected the dated map, original diffuse colored core and source bibliography. Bibliographic works named there were not independently inspected for a boundary.'},{title:'Maukhari Dynasty',url:'https://www.worldhistory.org/Maukhari_Dynasty/',publisher:'Avantika Lal / World History Encyclopedia',checkedAt:date,evidenceNote:'Inspected the chronology and competing regional accounts; it describes Maukhari independence around 554, conflict with the Later Guptas and a possible occupation of Magadha, not a precise outline.'},{title:'Gupta-Vakataka Age, c.300–550 CE',url:'https://timelinesouthasianhistory.hsites.harvard.edu/gupta-v%C4%81k%C4%81%E1%B9%ADaka-age-c-300-%E2%80%93-550-ce',publisher:'Harvard University',checkedAt:date,evidenceNote:'Inspected the regional period and ruler tables; does not independently validate the source curves.'}],
   contextValidity:{start:c.start,end:c.end,backwardReviewed:false,reviewedAt:date,evidence:[url,'https://www.worldhistory.org/Maukhari_Dynasty/'],note}},geometry};
  if(!(d3.geoArea(f)>0&&d3.geoArea(f)<2*Math.PI))throw Error('Invalid geometry '+f.properties.id);features.push(f);return f;
 });
 const file=prefix+c.year+'.geojson',content=JSON.stringify({type:'FeatureCollection',name:`${c.year} South Asian successor court schematics`,license:'CC-BY-SA-4.0',features:current});fs.writeFileSync(path.join(data,file),content);
 layers.push({file,license:'CC-BY-SA-4.0',licenseFile:'gupta-successor-schematic.LICENSE',featureCount:current.length,outputSha256:sha(content),attribution:'Woudloper / Wikimedia Commons; map adapted and approximately georegistered by World History Atlas'});
 if(!meta.snapshots.some(s=>s.year===c.year))meta.snapshots.push({year:c.year,label:{en:`${c.year} CE`,zh:`公元${c.year}年`},title:{en:'South Asian successor court schematics',zh:'南亚后继宫廷示意'},featureIds:[],featureCount:0,file,sourceSha256:c.sha256});
}
meta.layers=[...meta.layers.filter(l=>!l.file.startsWith(prefix)),...layers];meta.snapshots.sort((a,b)=>a.year-b.year);
for(const s of meta.snapshots){s.featureIds=s.featureIds.filter(id=>!oldIds.has(id));s.featureIds.push(...features.filter(f=>f.properties.year===s.year).map(f=>f.properties.id));s.featureCount=s.featureIds.length;}
meta.guptaSuccessorReview={reviewedAt:date,documentation:'docs/GUPTA_AYUTTHAYA_REVIEW_2026_10_27.md',sources:configs.map(({year,sha256})=>({year,sha256,license:'CC-BY-SA-4.0',url:`https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD${year}_EN.svg`})),featureCount:features.length};
fs.writeFileSync(path.join(data,'map-snapshots.json'),JSON.stringify(meta,null,2)+'\n');console.log(JSON.stringify({features:features.length,layers:layers.length}));
