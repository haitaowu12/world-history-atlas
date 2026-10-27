// Derived CC BY-SA regional schematics, not reconstructed frontiers.
// The two source SVGs are retained in references/gupta-map-sources/.
import fs from 'node:fs';import crypto from 'node:crypto';import path from 'node:path';import vm from 'node:vm';import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),data=path.join(root,'dist/data'),sources=path.join(root,'references/gupta-map-sources');
const date='2026-10-26',prefix='territories-gupta-schematic-',sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=n=>JSON.parse(fs.readFileSync(path.join(data,n)));
const meta=read('map-snapshots.json'),ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
// Eight city markers fitted in local SVG layer coordinates. The 450 basemap is
// the same author map shifted by the measured constant below. See review for
// residuals, source's outlying Vidisha marker, independent coast check and limits.
const affine=[[0.021240305065824486,0.00023860264228201891],[0.0009174678717018712,-0.019978621850902607],[65.77802735158748,42.83170753683861]];
const configs=[
 {year:375,start:375,end:449,sha256:'b7825f1f66b8143ad5de591dd398b9396b4eed2229ea44bf57cafb7c57931b25',license:'CC-BY-SA-3.0',licenseFile:'gupta-schematic-375.LICENSE',offset:[0,0],url:'https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD375_EN.svg'},
 {year:450,start:450,end:479,sha256:'50c1e11a8d2bc651644492265f6d4ca6b2e16eb0ad9b6816f4b1bb2df9492904',license:'CC-BY-SA-4.0',licenseFile:'gupta-schematic-450.LICENSE',offset:[38.21654,16.25961],url:'https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD450_EN.svg'}
];
const subjects=[{id:'gupta-core',pathId:'path4529',en:'Gupta · approximate core schematic',zh:'笈多 · 近似核心区示意',expectedFill:'#d77ddc'},
 {id:'vakataka-core',pathId:'path4541',en:'Vakataka · approximate core schematic',zh:'伐迦陀迦 · 近似核心区示意',expectedFill:'#785fff'}];
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
const old=meta.layers.filter(l=>l.file.startsWith(prefix)),oldIds=new Set(old.flatMap(l=>read(l.file).features.map(f=>f.properties.id)));
const all=[],layers=[];
for(const c of configs){const filename=`South_Asia_historical_AD${c.year}_EN.svg`,bytes=fs.readFileSync(path.join(sources,filename));if(sha(bytes)!==c.sha256)throw Error('SVG source hash mismatch '+filename);const svg=bytes.toString('utf8');
 const features=subjects.map(s=>{
  const note={en:`Around ${c.year} CE, the source artist depicts this core with diffuse edges. The atlas reproduces the source's colored core only; campaigns and dependent regions are not mapped as direct control. Display eligibility ${c.start}–${c.end} is an editorial context window, not an annual boundary. The illustration was approximately aligned using modern reference locations; the source's Vidisha marker is displaced by about 180 km, and actual historical frontiers are not established.`,zh:`原图以模糊边缘描绘约公元${c.year}年的核心区。此处只复现原图着色的核心区，不将远征和附属地区标为直接管治。${c.start}—${c.end}年是编辑选择的背景窗口，并非逐年边界。原图依据现代参照地点作近似定位；图中韦迪沙地点约偏移180公里，实际历史疆界并未确定。`};
  const geometry=normalizePolygonGeometry({type:'Polygon',coordinates:[sampledCurve(pathOf(svg,s.pathId,s.expectedFill),c.offset)]},d3.geoArea);
  const feature={type:'Feature',properties:{id:`gupta-schematic-${c.year}-${s.id}`,polityId:s.id,year:c.year,sourceYear:c.year,name:{en:s.en,zh:s.zh},color:'#a6b7c8',kind:'polity',region:'south-asia',sourceDataset:'woudloper-gupta-schematic',geometrySource:c.url,sourceSha256:c.sha256,sourcePathId:s.pathId,license:c.license,attribution:'Woudloper; adapted from the cited South Asia historical SVG map.',review:'approximate-dated-schematic-core',visualTreatment:'diffuse-schematic',displayDistinctFrom:[s.id==='gupta-core'?'vakataka-core':'gupta-core'],geometryReview:'SVG curve sampling and approximate affine georegistration; original map uses blurred regions, not surveyed frontiers',note,
   sources:[{title:`South Asia historical AD${c.year} EN.svg`,url:c.url,publisher:'Woudloper / Wikimedia Commons',checkedAt:date,evidenceNote:'Original diffuse core path, identified by SVG ID and source color. See review for its cited historical books, license, sampling and georegistration uncertainty.'},{title:'Gupta-Vakataka Age, c.300–550 CE',url:'https://timelinesouthasianhistory.hsites.harvard.edu/gupta-v%C4%81k%C4%81%E1%B9%ADaka-age-c-300-%E2%80%93-550-ce',publisher:'Harvard University',checkedAt:date,evidenceNote:'Inspected dynasty and ruler tables; it distinguishes northern Gupta and Deccan Vakataka phases. It does not validate the illustrated frontier.'},...(c.year===375?[{title:'Extent of the Gupta Empire, 375 CE',url:'https://www.worldhistory.org/image/10134/extent-of-the-gupta-empire-375-ce/',publisher:'World History Encyclopedia / Woudloper',checkedAt:date,evidenceNote:'Describes the map as a circa375/380 interpretation distinguishing core, conquests and suzerainty.'}]:[])],
   contextValidity:{start:c.start,end:c.end,backwardReviewed:false,reviewedAt:date,evidence:[c.url,'https://timelinesouthasianhistory.hsites.harvard.edu/gupta-v%C4%81k%C4%81%E1%B9%ADaka-age-c-300-%E2%80%93-550-ce'],note}} ,geometry};
  if(!(d3.geoArea(feature)>0&&d3.geoArea(feature)<2*Math.PI))throw Error('Invalid geometry '+feature.properties.id);all.push(feature);return feature;
 });
 const file=prefix+c.year+'.geojson',content=JSON.stringify({type:'FeatureCollection',name:`Approximate ${c.year} South Asian core schematics`,license:c.license,features});fs.writeFileSync(path.join(data,file),content);layers.push({file,license:c.license,licenseFile:c.licenseFile,featureCount:features.length,outputSha256:sha(content),attribution:'Woudloper / Wikimedia Commons; map adapted and approximately georegistered by World History Atlas'});
 if(!meta.snapshots.some(s=>s.year===c.year))meta.snapshots.push({year:c.year,label:{en:`${c.year} CE`,zh:`公元${c.year}年`},title:{en:'Gupta and Vakataka core schematics',zh:'笈多与伐迦陀迦核心区示意'},featureIds:[],featureCount:0,file,sourceSha256:c.sha256});
}
meta.snapshots.sort((a,b)=>a.year-b.year);{const ordered=[];let inserted=false;for(const layer of meta.layers){if(layer.file.startsWith(prefix)){if(!inserted){ordered.push(...layers);inserted=true;}}else ordered.push(layer);}if(!inserted)ordered.push(...layers);meta.layers=ordered;}for(const s of meta.snapshots){s.featureIds=s.featureIds.filter(id=>!oldIds.has(id));s.featureIds.push(...all.filter(f=>f.properties.year===s.year).map(f=>f.properties.id));s.featureCount=s.featureIds.length;}
meta.guptaSchematicReview={reviewedAt:date,documentation:'docs/THREE_REGIONS_REVIEW.md',sources:configs.map(({year,sha256,license,url})=>({year,sha256,license,url})),featureCount:all.length};
fs.writeFileSync(path.join(data,'map-snapshots.json'),JSON.stringify(meta,null,2)+'\n');console.log(JSON.stringify({features:all.length,layers:layers.length}));
