// Build separately licensed, reviewed map references after the earlier builders.
// Usage: node scripts/build-later-map-gaps.mjs /path/to/pinned/historical-basemaps/geojson
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {inflateSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)), data=path.join(root,'dist/data'), sourceDir=process.argv[2];
if(!sourceDir)throw Error('Supply the pinned historical-basemaps input directory');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex'),read=file=>JSON.parse(fs.readFileSync(path.join(data,file),'utf8'));
const date='2026-10-26', meta=read('map-snapshots.json'), ctx={};
vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const refs={
 1890:{hash:'b9e6d91556e9716ddc84f034dfd7101d7817eb09cf044bb597d806ddcb39c1e0',x12:262,x16:512,y12:266,start:1886,end:1892,phase:'kanemi',en:'Borno · al-Kanemi court regional core',zh:'博尔努 · 卡内米宫廷区域核心'},
 1893:{hash:'115bc8efe560d9e981b5aa1294e4c6976c3fd59f2dd2b20db6214983152b7cf1',x12:266,x16:516,y12:260,start:1893,end:1894,phase:'invasion',en:'Borno · invasion and court transition',zh:'博尔努 · 入侵与宫廷过渡'},
 1898:{hash:'93cbed1aacc8326098fc0e8246b4beb70b7a9c730fc58f9a3a1e944b9d870860',x12:254,x16:504,y12:266,start:1895,end:1899,phase:'rabih',en:'Borno region · Rabih period',zh:'博尔努地区 · 拉比赫时期'}
};
const mapPage='https://vincenthiribarren.com/borno/maps/index.html';
const article='https://books.openedition.org/cfee/1252?lang=en';
const smithsonian='https://publications.asia.si.edu/publications/seaceramics/time/chronologies.php';
const harvard='https://timelinesouthasianhistory.hsites.harvard.edu/gupta-v%C4%81k%C4%81%E1%B9%ADaka-age-c-300-%E2%80%93-550-ce';
const gupta350='https://commons.wikimedia.org/wiki/File:India_in_350_CE_Joppen.jpg';
const gupta500='https://timemaps.com/history/south-asia-500ad/';
const charter='https://siddham.network/inscription/in00044/?section=metadata';
const src=(title,url,publisher,evidenceNote)=>({title,url,publisher,evidenceNote,checkedAt:date});

// Decode only the retained 8-bit RGB PNGs. No browser or runtime dependency.
function pngRGB(buf){
 if(!buf.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('Not a PNG');
 let pos=8,width,height,depth,color,interlace,compressed=[];
 while(pos<buf.length){const len=buf.readUInt32BE(pos),kind=buf.toString('ascii',pos+4,pos+8),chunk=buf.subarray(pos+8,pos+8+len);pos+=len+12;
  if(kind==='IHDR'){width=chunk.readUInt32BE(0);height=chunk.readUInt32BE(4);depth=chunk[8];color=chunk[9];interlace=chunk[12];}
  if(kind==='IDAT')compressed.push(chunk);if(kind==='IEND')break;
 }
 if(depth!==8||color!==2||interlace!==0)throw Error('Unexpected PNG encoding');
 const raw=inflateSync(Buffer.concat(compressed)),stride=width*3,out=Buffer.alloc(width*height*3);if(raw.length!==(stride+1)*height)throw Error('Unexpected PNG length');
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<height;y++){const filter=raw[y*(stride+1)],offset=y*stride;for(let x=0;x<stride;x++){
  const v=raw[y*(stride+1)+1+x],a=x>=3?out[offset+x-3]:0,b=y?out[offset-stride+x]:0,c=y&&x>=3?out[offset-stride+x-3]:0;
  const predictor=filter===0?0:filter===1?a:filter===2?b:filter===3?Math.floor((a+b)/2):filter===4?paeth(a,b,c):NaN;
  if(!Number.isFinite(predictor))throw Error('Unsupported PNG filter');out[offset+x]=(v+predictor)&255;
 }}return{width,height,pixels:out};
}
function morph(mask,w,h,op){const out=new Uint8Array(mask.length);for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
 const i=y*w+x,vals=[mask[i],mask[i-1],mask[i+1],mask[i-w],mask[i+w]];out[i]=op==='dilate'?Number(vals.some(Boolean)):Number(vals.every(Boolean));
 }return out;}
function flood(mask,w,h,seeds,target){const seen=new Uint8Array(mask.length),queue=new Int32Array(mask.length);let a=0,b=0;
 for(const i of seeds)if(i>=0&&i<mask.length&&!seen[i]&&mask[i]===target){seen[i]=1;queue[b++]=i;}
 while(a<b){const i=queue[a++],x=i%w,y=Math.floor(i/w);for(const j of [x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])if(j>=0&&!seen[j]&&mask[j]===target){seen[j]=1;queue[b++]=j;}}
 return{seen,size:b};}
function mainMask(img){const {width:w,height:h,pixels}=img;let m=new Uint8Array(w*h);for(let i=0;i<m.length;i++)m[i]=Number(pixels[i*3]===176&&pixels[i*3+1]===176&&pixels[i*3+2]===183);
 m=morph(morph(m,w,h,'dilate'),w,h,'erode');const edges=[];for(let x=0;x<w;x++)edges.push(x,(h-1)*w+x);for(let y=0;y<h;y++)edges.push(y*w,y*w+w-1);
 const outside=flood(m,w,h,edges,0).seen;for(let i=0;i<m.length;i++)m[i]=Number(!outside[i]);
 let largest=null,seen=new Uint8Array(m.length);for(let i=0;i<m.length;i++)if(m[i]&&!seen[i]){let f=flood(m,w,h,[i],1);for(let j=0;j<m.length;j++)if(f.seen[j])seen[j]=1;if(!largest||f.size>largest.size)largest=f;}
 if(!largest||largest.size<20000||largest.size>30000)throw Error('Unexpected Borno mask');return{mask:largest.seen,count:largest.size};
}
// Trace pixel edges with the shaded interior on the right; at corner contacts,
// prefer right turns. Only the largest exterior is retained after hole filling.
function traceExterior(m,w,h){const edges=new Map();const key=(x,y)=>`${x},${y}`;
 const add=(x1,y1,x2,y2)=>{let k=key(x1,y1);if(!edges.has(k))edges.set(k,[]);edges.get(k).push([x2,y2]);};
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;if(!m[i])continue;
  if(!m[i-w])add(x,y,x+1,y);if(!m[i+1])add(x+1,y,x+1,y+1);if(!m[i+w])add(x+1,y+1,x,y+1);if(!m[i-1])add(x,y+1,x,y);
 }
 const rings=[];while(edges.size){const start=edges.keys().next().value.split(',').map(Number),ring=[start];let cur=start,previous=[start[0]-1,start[1]];
  for(let n=0;n<w*h;n++){const k=key(...cur),options=edges.get(k);if(!options?.length)throw Error('Open pixel contour');const dx=cur[0]-previous[0],dy=cur[1]-previous[1];
   const rank=p=>{const nx=p[0]-cur[0],ny=p[1]-cur[1],cross=dx*ny-dy*nx,dot=dx*nx+dy*ny;return cross>0?0:dot>0?1:cross<0?2:3;};options.sort((a,b)=>rank(a)-rank(b));const next=options.shift();if(!options.length)edges.delete(k);ring.push(next);previous=cur;cur=next;if(cur[0]===start[0]&&cur[1]===start[1])break;
  }if(cur[0]!==start[0]||cur[1]!==start[1])throw Error('Contour did not close');rings.push(ring);
 }
 const area=r=>Math.abs(r.slice(0,-1).reduce((sum,p,i)=>sum+p[0]*r[i+1][1]-r[i+1][0]*p[1],0)/2);
 rings.sort((a,b)=>area(b)-area(a));const r=rings[0];if(!r||area(r)<20000)throw Error('Unexpected source contour');
 // Drop collinear pixel edges, preserving every direction change.
 return r.filter((p,i)=>{if(i===0||i===r.length-1)return true;const a=r[i-1],b=r[i+1];return (p[0]-a[0])*(b[1]-p[1])!==(p[1]-a[1])*(b[0]-p[0]);});
}
function bornuFeature(year,c){const file=path.join(root,'references/borno-hiribarren',`${year}.png`),bytes=fs.readFileSync(file);if(sha(bytes)!==c.hash)throw Error('Borno source hash mismatch '+year);
 const img=pngRGB(bytes),{mask,count}=mainMask(img),pixels=traceExterior(mask,img.width,img.height);
 const coords=pixels.map(([x,y])=>{const x12=c.x12-.005*(y-c.y12),x16=c.x16+.005*(y-c.y12);const lon=12+4*(x-x12)/(x16-x12),lat=12+(c.y12-y)/(y<c.y12?63.25:62.5);return[+lon.toFixed(4),+lat.toFixed(4)];});
 const geometry=normalizePolygonGeometry({type:'Polygon',coordinates:[coords]},d3.geoArea);
 const note={en:`${year} source depiction of the dark Borno core, shown for ${c.start}–${c.end} as regional context. The historian describes these maps as approximate reconstructions of European geographical views, not surveyed borders. The shaded core omits surrounding districts and does not trace Rabih’s military frontier. Rabih’s conquest is dated to 1893–1894 in the cited scholarship. Colonial treaty claims and actual local rule differed; an annual colonial unit can overlap this reference.`,zh:`以${year}年原图的深色博尔努核心区，作为${c.start}—${c.end}年的区域参照。作者说明这些地图是对欧洲地理观念的近似重建，并非实测边界。深色核心区不包括周围地区，也不描绘拉比赫的军事疆界。所引研究将拉比赫的征服记为1893—1894年。殖民条约主张与地方实际统治并不相同，年度殖民单元可能与此参照重叠。`};
 const props={id:`later-borno-${year}-${c.phase}`,polityId:'bornu',year,sourceYear:year,name:{en:c.en,zh:c.zh},color:'#a6b7c8',kind:'polity',region:'africa',sourceDataset:'hiribarren-borno-regional-context',geometrySource:mapPage,sourceImage:`${year}.png`,sourceSha256:c.hash,sourceTreatment:'dark-grey core traced from raster; retained source graticule approximately aligned',license:'CC-BY-4.0',attribution:'Vincent Hiribarren; adapted by World History Atlas from the Borno territorial evolution map.',countryPeriodSupplement:true,displayAboveAnnual:true,visualTreatment:'historical-overlap',statusPhase:c.phase,note,
  sources:[src(`Borno: Territorial Evolution · ${year} map`,mapPage,'Vincent Hiribarren','Inspected the map, page and author’s warning: approximate reconstructions of European views, not accurate surveyed borders. Only the dark Borno core is traced; lighter surrounding districts and treaty lines are omitted.'),src('“Our delight is for the amir of the English”: a Bornoan history of the First World War',article,'Rémi Dewière and Vincent Hiribarren / Centre français des études éthiopiennes','Inspected sections on Borno, colonial treaty claims, the 1893–1894 Rabih invasion and the later split; the article uses both 1893 and 1894 for the conquest.')],
  contextValidity:{start:c.start,end:c.end,backwardReviewed:c.start<year,reviewedAt:date,evidence:[mapPage,article],note},pixelTrace:{maskedPixels:count,grid12Pixel:[c.x12,c.y12],grid16X:c.x16,latitudePixelsPerDegree:[63.25,62.5]}};
 if(!(d3.geoArea({type:'Feature',properties:props,geometry})>0&&d3.geoArea({type:'Feature',properties:props,geometry})<2*Math.PI))throw Error('Invalid Borno geometry');return{type:'Feature',properties:props,geometry};}
const bornu=Object.entries(refs).map(([year,c])=>bornuFeature(Number(year),c));
const aftermath=bornuFeature(1898,{...refs[1898],start:1900,end:1901,phase:'aftermath',en:'Borno region · warfare and disputed succession',zh:'博尔努地区 · 战争与继承争夺'});
aftermath.properties.note.en+=' After Rabih’s death, his son and returning Kanemi claimants competed amid French and British intervention; British and German occupations followed by 1902. The article gives conflicting 1900/1901 dates for the battle, so no exact death year is asserted here.';
aftermath.properties.note.zh+=' 拉比赫身亡后，其子与返回的卡内米家族争夺权力，法国和英国亦介入；英德占领到1902年形成。文章对战役写有1900和1901两种年代，此处不断言确切死亡年份。';
aftermath.properties.contextValidity.note=aftermath.properties.note;bornu.push(aftermath);

// The new Gupta windows retain the existing 375 illustration rather than
// claiming either source provides an annual border.
const guptaBytes=fs.readFileSync(path.join(data,'territories-gupta-schematic-375.geojson'));
if(sha(guptaBytes)!=='e11cf797c1dcface97ab069413b93a7659867aa9f55fc46e6285ea36986f5e81')throw Error('Gupta source layer changed');
const guptaOriginal=JSON.parse(guptaBytes).features.find(f=>f.properties.polityId==='gupta-core');
const guptaRows=[
 {id:'early',start:350,end:374,en:'Gupta · later core reference for Samudragupta',zh:'笈多 · 用于三摩陀罗笈多时期的较晚核心区参照',extra:src('India in 350 CE · Joppen (1907)',gupta350,'Charles Joppen / Justus Perthes, via Wikimedia Commons','Inspected the 350 CE historical illustration, which labels a northern Gupta area and separately marks protected tribes and a southern campaign. It is an old interpretation, not independent verification of this 375 source shape.')},
 {id:'late',start:480,end:500,en:'Gupta · earlier core reference in the later fifth century',zh:'笈多 · 五世纪后期的较早核心区参照',extra:src('India and South Asia, 500 CE',gupta500,'TimeMaps','Inspected the 500 CE map and account: Gupta rule remains in northern India, separate from the Vakataka, amid decline. No TimeMaps geometry was copied; it does not validate the 375 source contour.')}
];
const gupta=guptaRows.map(r=>{const note={en:`This is the source’s approximately aligned 375 CE Gupta core illustration, reused for ${r.start}–${r.end} as partial regional context. It is not a reconstruction of that period’s borders or a claim of unchanged control. The 350 and 500 comparison maps depict different, broader areas; a 482–484 charter names Budhagupta and an administrator in Pundravardhana, outside this source’s partial core. The original map’s Vidisha marker is displaced by about 180 km.`,zh:`此处复用近似定位的公元375年笈多核心区示意，作为${r.start}—${r.end}年的部分区域背景；它并不重建当时疆界，也不表示统治范围未变。350及500年的对照地图范围不同且更广；482—484年的铜版诏书提及佛陀笈多和奔荼罗伐弹那的行政官，地点在此部分核心区之外。原图韦迪沙标记约偏移180公里。`};
 return {...guptaOriginal,properties:{...guptaOriginal.properties,id:`later-gupta-375-${r.id}`,name:{en:r.en,zh:r.zh},sourceDataset:'woudloper-gupta-schematic-later-gaps',note,contextValidity:{start:r.start,end:r.end,backwardReviewed:r.start<375,reviewedAt:date,evidence:[harvard,gupta350,gupta500,charter],note},sources:[...guptaOriginal.properties.sources,r.extra,src('Damodarpur Charter 1 (GE 163) of Budhagupta',charter,'Siddham: The Asian Inscription Database','Inspected metadata and translated edition: dates 482–484 and names Budhagupta and the Pundravardhana administrator. An inscription is not a frontier survey.')]}};});

const raw1500=fs.readFileSync(path.join(sourceDir,'world_1500.geojson'));if(sha(raw1500)!=='d01ffc9b80629787f13d2b1c2f881f005bc0164433548e30f5c058ddee0bfc7b')throw Error('Pinned world_1500 source mismatch');
const pegu=JSON.parse(raw1500).features[79];if(pegu?.properties?.NAME!=='Pegu')throw Error('Pegu source pointer changed');
const round=a=>typeof a[0]==='number'?a.slice(0,2).map(x=>+x.toFixed(4)):a.map(round);
const pgeom=normalizePolygonGeometry({...pegu.geometry,coordinates:round(pegu.geometry.coordinates)},d3.geoArea);
const pnote={en:'The older 1500 Pegu outline is reused in 1569–1598 only to orient the lower-Burma court region of the Toungoo dynasty. The Smithsonian dates the capital’s move to Pegu to 1539 and its occupation by Arakan to 1599. This is not the full Toungoo empire, an occupation boundary in Siam, or proof of uniform rule. Ayutthaya is separately shown as a subordinate court, with its own older source outline and disputed restoration dates.',zh:'复用较早的1500年勃固轮廓，仅为1569—1598年东吁王朝下缅甸宫廷地区提供定位。史密森将迁都勃固定于1539年，并将阿拉干占领勃固定于1599年。此轮廓并非完整东吁帝国、暹罗境内的占领边界或均匀统治的证据。阿瑜陀耶宫廷另行表示，并保留较早来源轮廓及复国年代争议。'};
const peguFeature={type:'Feature',geometry:pgeom,properties:{id:'later-pegu-1500-toungoo-court',polityId:'toungoo-pegu-core',year:1500,sourceYear:1500,name:{en:'Toungoo · Pegu court regional reference',zh:'东吁 · 勃固宫廷区域参照'},color:'#a6b7c8',kind:'polity',region:'southeast-asia',sourceDataset:'historical-basemaps-later-gaps',sourceNames:['Pegu'],sourceFeatureIndices:[79],sourceCommit:'da7a4b735ecef70aebdc9c73e409d8a2500d50f3',geometrySource:'https://github.com/aourednik/historical-basemaps/blob/da7a4b735ecef70aebdc9c73e409d8a2500d50f3/geojson/world_1500.geojson',license:'GPL-3.0-only',displayDistinctFrom:['ayutthaya'],note:pnote,
 sources:[src('Historical Basemaps · world_1500.geojson','https://github.com/aourednik/historical-basemaps/blob/da7a4b735ecef70aebdc9c73e409d8a2500d50f3/geojson/world_1500.geojson','André Ourednik and contributors','The earlier Pegu source outline is retained as regional context only; it is not a reconstruction of the later empire.'),src('Mainland Southeast Asia: historical chronologies',smithsonian,'Smithsonian National Museum of Asian Art','Inspected the Burma and Thailand tables for 1539 capital transfer, 1569 occupation and 1599 Pegu occupation; not a source of boundary vertices.')],
 contextValidity:{start:1569,end:1598,backwardReviewed:false,reviewedAt:date,evidence:[smithsonian],note:pnote}}};
if(!d3.geoContains(peguFeature,[96.48,17.33]))throw Error('Pegu reference misses Bago vicinity');

const groups=[
 {file:'territories-later-gupta-context.geojson',features:gupta,license:'CC-BY-SA-3.0',licenseFile:'gupta-schematic-375.LICENSE',attribution:'Woudloper / Wikimedia Commons; approximately georegistered by World History Atlas'},
 {file:'territories-later-pegu-context.geojson',features:[peguFeature],license:'GPL-3.0-only',licenseFile:'territories.LICENSE',attribution:'André Ourednik and contributors; Pegu regional context'},
 {file:'territories-later-borno-context.geojson',features:bornu,license:'CC-BY-4.0',licenseFile:'borno-hiribarren.LICENSE',attribution:'Vincent Hiribarren; raster core traced and approximately georeferenced by World History Atlas'}
];
const files=new Set(groups.map(g=>g.file));const old=meta.layers.filter(l=>files.has(l.file)),oldIds=new Set(old.flatMap(l=>read(l.file).features.map(f=>f.properties.id)));
for(const group of groups){const content=JSON.stringify({type:'FeatureCollection',name:'Reviewed later map-gap references',license:group.license,features:group.features});if(Buffer.byteLength(content)>450000)throw Error('Layer too large');fs.writeFileSync(path.join(data,group.file),content);group.descriptor={file:group.file,license:group.license,licenseFile:group.licenseFile,featureCount:group.features.length,outputSha256:sha(content),attribution:group.attribution};}
meta.layers=[...meta.layers.filter(l=>!files.has(l.file)),...groups.map(g=>g.descriptor)];const features=groups.flatMap(g=>g.features);
for(const s of meta.snapshots){s.featureIds=s.featureIds.filter(id=>!oldIds.has(id));s.featureIds.push(...features.filter(f=>f.properties.year===s.year).map(f=>f.properties.id));s.featureCount=s.featureIds.length;}
for(const f of bornu){const y=f.properties.year;if(!meta.snapshots.some(s=>s.year===y)){const sameYear=bornu.filter(b=>b.properties.year===y);meta.snapshots.push({year:y,label:{en:`${y} CE`,zh:`公元${y}年`},title:{en:'Borno regional source illustration',zh:'博尔努区域来源示意'},featureIds:sameYear.map(b=>b.properties.id),featureCount:sameYear.length,file:`${y}.png`,sourceSha256:f.properties.sourceSha256});}}
meta.snapshots.sort((a,b)=>a.year-b.year);meta.laterMapGapsReview={reviewedAt:date,documentation:'docs/LATER_MAP_GAPS_REVIEW.md',featureCount:features.length,sourceImages:Object.entries(refs).map(([year,v])=>({year:Number(year),file:`${year}.png`,sha256:v.hash})),peguSourceSha256:sha(raw1500),guptaLayerSha256:sha(guptaBytes)};
fs.writeFileSync(path.join(data,'map-snapshots.json'),JSON.stringify(meta,null,2)+'\n');console.log(JSON.stringify({features:features.length,counts:groups.map(g=>[g.file,g.features.length]),bornu:bornu.map(f=>({id:f.properties.id,pixels:f.properties.pixelTrace.maskedPixels,vertices:f.geometry.coordinates[0].length}))}));
