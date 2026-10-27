// An explicitly unfilled, cropped 1580 sphere-of-influence reference, not direct occupation.
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import {inflateSync} from 'node:zlib';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';
import {normalizePolygonGeometry} from '../dist/map-geometry.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),data=path.join(root,'dist/data'),read=f=>JSON.parse(fs.readFileSync(path.join(data,f),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex');
const meta=read('map-snapshots.json'),ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
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
const sourceHash='de7ab082e0dcce5f97704ae8ebacb5566e6c336b62c2a44a49ab458af3001b5b',file='territories-toungoo-sphere-1580.geojson',original=fs.readFileSync(path.join(root,'references/toungoo-1580/Map_of_Taungoo_Empire_1580.png'));
if(sha(original)!==sourceHash)throw Error('Toungoo image checksum mismatch');
const {width:w,height:h,pixels}=pngRGB(original);if(w!==950||h!==1121)throw Error('Unexpected source image size');
let mask=new Uint8Array(w*h);for(let i=0;i<mask.length;i++){const r=pixels[3*i],g=pixels[3*i+1],b=pixels[3*i+2];mask[i]=Number(g-r>42&&g-b>23&&g>65);}
for(let i=0;i<4;i++)mask=morph(mask,w,h,'dilate');for(let i=0;i<4;i++)mask=morph(mask,w,h,'erode');
const edges=[];for(let x=0;x<w;x++)edges.push(x,(h-1)*w+x);for(let y=0;y<h;y++)edges.push(y*w,y*w+w-1);
const outside=flood(mask,w,h,edges,0).seen;for(let i=0;i<mask.length;i++)mask[i]=Number(!outside[i]);
// Single-pass connected components; retain only the largest filled area.
let seen=new Uint8Array(mask.length),queue=new Int32Array(mask.length),largest=[];
for(let i=0;i<mask.length;i++){if(!mask[i]||seen[i])continue;let a=0,b=0;queue[b++]=i;seen[i]=1;while(a<b){const j=queue[a++],x=j%w,y=(j/w)|0;for(const k of [x?j-1:-1,x<w-1?j+1:-1,y?j-w:-1,y<h-1?j+w:-1])if(k>=0&&mask[k]&&!seen[k]){seen[k]=1;queue[b++]=k;}}if(b>largest.length)largest=Array.from(queue.subarray(0,b));}
if(largest.length<300000||largest.length>340000)throw Error('Unexpected 1580 sphere mask size '+largest.length);mask=new Uint8Array(mask.length);for(const i of largest)mask[i]=1;
const contour=traceExterior(mask,w,h),cutoff=h-8;
// Never draw the bottom image crop as a historical boundary. Split there.
let runs=[],run=[];for(let i=0;i<contour.length-1;i++){const a=contour[i],b=contour[i+1];if(a[1]<cutoff&&b[1]<cutoff){if(!run.length)run.push(a);run.push(b);}else if(run.length){runs.push(run);run=[];}}if(run.length)runs.push(run);
if(runs.length>1&&JSON.stringify(runs[0][0])===JSON.stringify(runs.at(-1).at(-1))){runs[0]=[...runs.at(-1),...runs[0].slice(1)];runs.pop();}
// Ramer-Douglas-Peucker simplification at 2 source pixels (~4 km), substantially
// below the source georegistration uncertainty. Keep the crop endpoints intact.
function simplify(pts,tol=2){if(pts.length<=2)return pts;const [a,b]=[pts[0],pts.at(-1)],vx=b[0]-a[0],vy=b[1]-a[1],den=vx*vx+vy*vy;let max=0,index=0;for(let i=1;i<pts.length-1;i++){const p=pts[i],t=den?Math.max(0,Math.min(1,((p[0]-a[0])*vx+(p[1]-a[1])*vy)/den)):0,dist=Math.hypot(p[0]-(a[0]+t*vx),p[1]-(a[1]+t*vy));if(dist>max){max=dist;index=i;}}if(max<=tol)return[a,b];return[...simplify(pts.slice(0,index+1),tol).slice(0,-1),...simplify(pts.slice(index),tol)];}
const affine=[[0.02162574381059904,0.0014712537748429236],[-0.001304235810811884,-0.020906780588866778],[90.72800534584067,29.2275231947552]],project=([x,y])=>[+(x*affine[0][0]+y*affine[1][0]+affine[2][0]).toFixed(4),+(x*affine[0][1]+y*affine[1][1]+affine[2][1]).toFixed(4)];
const openBoundary=runs.filter(r=>r.length>=2).map(r=>simplify(r)).filter(r=>r.reduce((n,p,i)=>i?n+Math.hypot(p[0]-r[i-1][0],p[1]-r[i-1][1]):0,0)>10).map(r=>r.map(project));if(!openBoundary.length||openBoundary.some(r=>r.length<2))throw Error('No open boundary');
// The closed polygon is machine-readable source geometry only. The app draws
// openBoundary as unfilled linework; the artificial image-crop closure stays hidden.
const closed=simplify(contour).map(project),geometry=normalizePolygonGeometry({type:'Polygon',coordinates:[closed]},d3.geoArea);
const mapURL='https://commons.wikimedia.org/wiki/File:Map_of_Taungoo_Empire_(1580).png',paper='https://thesiamsociety.org/wp-content/uploads/2005/03/JSS_093_0c_PamareeSurakiat_ThaiBurmeseWarfareDuring16thCentu.pdf';
const note={en:'A fixed reference from one 1580 illustration, shown during 1569–1580 for comparison with Ayutthaya’s subordinate-court period. It is not an annual boundary or an outline of direct military occupation. The author warns that borders were not demarcated; one color combines different dependencies. Scholarly analysis distinguishes tributary Ayutthaya and Lan Xang from more direct rule near Pegu. The source is cropped to the south, so that edge is intentionally open. Alignment to fourteen modern city references has median residual about 26 km and maximum about 80 km; historical uncertainty is greater.',zh:'以一幅1580年示意图的固定范围，在1569—1580年间供比较阿瑜陀耶的附属宫廷时期。这不是逐年边界，也不是直接军事占领区轮廓。作者提醒当时并无划定的边界；同一种颜色合并了不同依附关系。学术研究区分阿瑜陀耶、澜沧的朝贡地位与勃固附近较直接的统治。原图南侧被裁切，因此此处故意留开。与14个现代城市参照点对齐的残差中位数约26公里，最大约80公里；历史不确定性更大。'};
const f={type:'Feature',properties:{id:'toungoo-sphere-reference-1580',polityId:'toungoo-sphere-reference',year:1580,sourceYear:1580,name:{en:'1580 Toungoo sphere · comparison only',zh:'1580年东吁势力范围 · 仅供比较'},color:'#896c83',kind:'polity',region:'southeast-asia',sourceDataset:'soewinhan-toungoo-sphere',geometrySource:mapURL,sourceSha256:sourceHash,license:'CC-BY-SA-3.0',attribution:'Soewinhan; adapted from Map of Taungoo Empire (1580), Wikimedia Commons.',review:'illustrative-tributary-sphere-not-occupation',visualTreatment:'influence-sphere',hideMapLabel:true,openBoundary,note,
 sources:[{title:'Map of Taungoo Empire (1580)',url:mapURL,publisher:'Soewinhan / Wikimedia Commons',checkedAt:'2026-10-27',evidenceNote:'Inspected source image and warning about undemarcated, approximate borders; green area combines dependencies and the image is cropped in the south. Source bibliography was not independently verified for the outline.'},{title:'Thai-Burmese Warfare During the Sixteenth Century and the Growth of the First Toungoo Empire',url:paper,publisher:'Pamaree Surakiat / Journal of the Siam Society',checkedAt:'2026-10-27',evidenceNote:'Inspected pp.91–92 and 95–97. Treats Ayutthaya and Lan Xang as tributaries, alongside more direct control near Pegu; does not validate the traced sphere perimeter.'}],
 contextValidity:{start:1569,end:1580,backwardReviewed:true,reviewedAt:'2026-10-27',evidence:[mapURL,paper],note},pixelTrace:{maskedPixels:largest.length,closingPixels:4,cutoffRow:cutoff,simplificationPixels:2,affine,controlPoints:14,medianResidualKm:26,maximumResidualKm:80}},geometry};
const content=JSON.stringify({type:'FeatureCollection',name:'1580 Toungoo illustrative sphere: open line only',license:'CC-BY-SA-3.0',features:[f]});fs.writeFileSync(path.join(data,file),content);
const old=meta.layers.find(l=>l.file===file),oldIds=old?new Set(read(file).features.map(x=>x.properties.id)):new Set();meta.layers=meta.layers.filter(l=>l.file!==file);meta.layers.push({file,license:'CC-BY-SA-3.0',licenseFile:'toungoo-sphere-1580.LICENSE',featureCount:1,outputSha256:sha(content),attribution:'Soewinhan / Wikimedia Commons; source sphere adapted and approximately georegistered by World History Atlas'});
if(!meta.snapshots.some(s=>s.year===1580))meta.snapshots.push({year:1580,label:{en:'1580 CE',zh:'公元1580年'},title:{en:'Toungoo sphere comparison',zh:'东吁势力范围比较'},featureIds:[],featureCount:0,file,sourceSha256:sourceHash});
for(const s of meta.snapshots){s.featureIds=s.featureIds.filter(id=>!oldIds.has(id));if(s.year===1580)s.featureIds.push(f.properties.id);s.featureCount=s.featureIds.length;}meta.snapshots.sort((a,b)=>a.year-b.year);
meta.toungooSphereReview={reviewedAt:'2026-10-27',documentation:'docs/GUPTA_AYUTTHAYA_REVIEW_2026_10_27.md',source:{url:mapURL,sha256:sourceHash,license:'CC-BY-SA-3.0'},featureCount:1};fs.writeFileSync(path.join(data,'map-snapshots.json'),JSON.stringify(meta,null,2)+'\n');
console.log(JSON.stringify({pixels:largest.length,contour:contour.length,openRuns:openBoundary.length,points:openBoundary.map(r=>r.length)}));
