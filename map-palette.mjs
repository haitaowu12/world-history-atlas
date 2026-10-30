// Display palette only. Source identities, geometry, dates and evidence remain
// attached to their original units; shared colour does not merge records.
const isTaiwan=p=>p.code==='TWN'||p.isoCode==='TWN'||p.gwcode===713||
  p.polityId==='taiwan'||p.name?.en==='Taiwan';
const isMainland=p=>p.code==='CHN'||p.isoCode==='CHN'||p.gwcode===710||
  ['china-modern','china-prc','china-republic','china-roc','qing','ming'].includes(p.polityId);

const mineral=['#89b4d8','#ceab79','#91b9a9','#b09bc7','#d69b95','#8abdc5','#b5bd87','#b9a6a2'];
const identities={'zhou-regional':4,'greek-regions':0,'olmec-region':2,'paracas-region':1,'maya-region':6,'kushan-northern':3,goryeo:0,'japan-kamakura':4,chola:1,srivijaya:5,'wari-region':2,'tiwanaku-region':3,chimu:4,usa:0,canada:1,mexico:2,russian:3,uk:4,spain:1,france:0,newspain:1,
  asante:1,sokoto:0,buganda:2,bunyoro:4,lunda:1,luba:3,kuba:7,merina:5,
  'cshapes-2':0,'cshapes-3':0,'cshapes-4':0,'cshapes-20':1,'cshapes-70':2,'cshapes-365':3,'cshapes-200':4,
  USA:0,CAN:1,MEX:2,RUS:3,GBR:4,CHN:6,TWN:6,
  'british-north-america':4,newfoundland:5,'oregon-joint':6,'texas-republic':2,'vermont-republic':7,'usa-claim':7,'canada-claim':7};
export function displayColor(properties){
  const key=properties.code in identities?properties.code:properties.polityId;
  const index=identities[key]??[...(properties.color||key||properties.id||'')].reduce((n,c)=>n+c.charCodeAt(0),0)%mineral.length;
  return mineral[index];
}

// Colour only: boundary proximity does not establish a border or sovereignty.
// Geocentric cells handle the antimeridian and poles without planar bbox errors.
export const NEIGHBOR_DISTANCE_KM=250;
const earthRadius=6371,angle=NEIGHBOR_DISTANCE_KM/earthRadius,cell=2*Math.sin(angle/2),minDot=Math.cos(angle);
const geometrySamples=new WeakMap(),geometryIds=new WeakMap(),paletteCache=new Map();let nextGeometryId=1;
const fallback=['#d0c386','#a3a0d2','#cc9c71','#79aaa7'];
const pool=[...mineral,...fallback];
const distinctFrom=p=>Array.isArray(p.displayDistinctFrom)?p.displayDistinctFrom.filter(x=>typeof x==='string'):[];
function vector([lon,lat]){const a=lon*Math.PI/180,b=lat*Math.PI/180,c=Math.cos(b);return [c*Math.cos(a),c*Math.sin(a),Math.sin(b)];}
function samples(geometry){
 if(!geometry||!['Polygon','MultiPolygon'].includes(geometry.type))return [];
 if(geometrySamples.has(geometry))return geometrySamples.get(geometry);
 const rings=geometry.type==='Polygon'?geometry.coordinates:geometry.coordinates.flat(),result=[];
 for(const ring of rings){if(!ring.length)continue;let a=vector(ring.at(-1));
  for(const coordinate of ring){const b=vector(coordinate),dot=Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])),arc=Math.acos(dot),steps=Math.max(1,Math.ceil(arc/(100/earthRadius))),sin=Math.sin(arc);
   for(let i=1;i<=steps;i++){const t=i/steps;if(arc<1e-8||Math.abs(sin)<1e-8)result.push(b);else{const u=Math.sin((1-t)*arc)/sin,v=Math.sin(t*arc)/sin;result.push([a[0]*u+b[0]*v,a[1]*u+b[1]*v,a[2]*u+b[2]*v]);}}
   a=b;
  }
 }
 // Retain one boundary sample per ~25 km 3D cell; source geometry stays intact.
 const unique=new Map();for(const point of result){const key=point.map(v=>Math.floor(v/(cell/10))).join(',');if(!unique.has(key))unique.set(key,point);}
 const compact=[...unique.values()];geometrySamples.set(geometry,compact);return compact;
}
function identity(p,sharedChina){
 if(sharedChina&&(isMainland(p)||isTaiwan(p)))return 'display:china-taiwan';
 // Administrative source pieces retain one national fill, with separate borders.
 if(p.role==='division'&&p.parent)return 'parent:'+p.parent;
 return p.polityId||p.code||p.id;
}
function nodesFor(features){
 const sharedChina=features.some(f=>isMainland(f.properties))&&features.some(f=>isTaiwan(f.properties)),groups=new Map();
 for(const f of features){const key=identity(f.properties,sharedChina);if(!groups.has(key))groups.set(key,{key,features:[],neighbors:new Set()});groups.get(key).features.push(f);}
 return [...groups.values()].sort((a,b)=>a.key.localeCompare(b.key,'en'));
}
function connect(nodes){
 const cells=new Map();
 for(const n of nodes)for(const f of n.features)for(const point of samples(f.geometry)){
  const xyz=point.map(v=>Math.floor(v/cell));
  for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){
   const bucket=cells.get(`${xyz[0]+x},${xyz[1]+y},${xyz[2]+z}`);if(!bucket)continue;
   for(const [other,points] of bucket)if(other!==n&&!n.neighbors.has(other)&&points.some(p=>point[0]*p[0]+point[1]*p[1]+point[2]*p[2]>=minDot)){n.neighbors.add(other);other.neighbors.add(n);}
  }
  const k=xyz.join(',');if(!cells.has(k))cells.set(k,new Map());const bucket=cells.get(k);if(!bucket.has(n))bucket.set(n,[]);bucket.get(n).push(point);
 }
 // Some reviewed, visually neighboring schematic cores have fuzzy gaps
 // larger than the sampled proximity threshold, but need distinct fills.
 const byKey=new Map(nodes.map(n=>[n.key,n]));
 for(const n of nodes)for(const f of n.features)for(const key of distinctFrom(f.properties)){const other=byKey.get(key);if(other&&other!==n){n.neighbors.add(other);other.neighbors.add(n);}}
 return nodes;
}
// CIELAB distance favours visibly separated neighbouring shades within the theme.
function lab(hex){const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4),[r,g,b]=rgb;
 const f=v=>v>.008856?Math.cbrt(v):7.787*v+16/116,x=f((r*.4124564+g*.3575761+b*.1804375)/.95047),y=f(r*.2126729+g*.7151522+b*.072175),z=f((r*.0193339+g*.119192+b*.9503041)/1.08883);return [116*y-16,500*(x-y),200*(y-z)];}
const labs=new Map(pool.map(c=>[c,lab(c)]));
const distance=(a,b)=>{if(!labs.has(a))labs.set(a,lab(a));if(!labs.has(b))labs.set(b,lab(b));return Math.hypot(...labs.get(a).map((v,i)=>v-labs.get(b)[i]));};
function chooseColor(preferred,used){
 if(!used.size)return preferred;
 let candidates=mineral.filter(c=>!used.has(c));if(!candidates.length)candidates=pool.filter(c=>!used.has(c));
 // Dense overlapping or colonial networks need more colours than a planar map.
 // Deterministic overflow never silently reuses a neighbour's exact shade.
 for(let i=0;!candidates.length;i++){const h=(i*137.508)%360,s=32,l=60+(i%3)*8,a=s*Math.min(l,100-l)/100,k=n=>(n+h/30)%12,channel=n=>Math.round(255*(l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1)))/100).toString(16).padStart(2,'0'),c='#'+channel(0)+channel(8)+channel(4);if(!used.has(c))candidates.push(c);}
 return candidates.map(c=>({c,score:Math.min(...[...used].map(u=>distance(c,u)))-(c===preferred?0:8)})).sort((a,b)=>b.score-a.score||pool.indexOf(a.c)-pool.indexOf(b.c))[0].c;
}
function assign(nodes){
 const remaining=new Set(nodes),assigned=new Map();
 while(remaining.size){
  const saturation=n=>new Set([...n.neighbors].map(v=>assigned.get(v)).filter(Boolean)).size;
  const n=[...remaining].sort((a,b)=>saturation(b)-saturation(a)||b.neighbors.size-a.neighbors.size||a.key.localeCompare(b.key,'en'))[0];
  const preferredFeature=n.features.find(f=>isMainland(f.properties))||[...n.features].sort((a,b)=>a.properties.id.localeCompare(b.properties.id,'en'))[0];
  assigned.set(n,chooseColor(displayColor(preferredFeature.properties),new Set([...n.neighbors].map(v=>assigned.get(v)).filter(Boolean))));remaining.delete(n);
 }
 return new Map(nodes.flatMap(n=>n.features.map(f=>[f.properties.id,assigned.get(n)])));
}
function cacheKey(features){return features.map(f=>{const g=f.geometry;if(g&&!geometryIds.has(g))geometryIds.set(g,nextGeometryId++);const p=f.properties;return [p.id,p.polityId,p.code,p.parent,p.role,p.gwcode,p.isoCode,p.name?.en,p.color,distinctFrom(p).join(','),geometryIds.get(g)||0].join(':');}).sort().join('|');}
export function neighboringDisplayGroups(features){
 const nodes=connect(nodesFor(features));return nodes.flatMap(n=>[...n.neighbors].filter(other=>n.key<other.key).map(other=>({a:n.features.map(f=>f.properties.id),b:other.features.map(f=>f.properties.id)})));
}

export function mapDisplayPalette(features,{scheme='source'}={}){
  if(scheme==='mineral'){const key=cacheKey(features);if(!paletteCache.has(key)){paletteCache.set(key,assign(connect(nodesFor(features))));if(paletteCache.size>64)paletteCache.delete(paletteCache.keys().next().value);}return new Map(paletteCache.get(key));}
  const palette=new Map(features.map(f=>[f.properties.id,f.properties.color||'#a5bba5']));
  const mainland=features.find(f=>isMainland(f.properties));
  if(mainland)for(const feature of features)if(isTaiwan(feature.properties))
    palette.set(feature.properties.id,palette.get(mainland.properties.id));
  return palette;
}
