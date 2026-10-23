/* Build the v4 dated context layers and explicit temporal eligibility registry.
 * Usage: node scripts/build-temporal-context.cjs /path/to/pinned/historical-basemaps
 * Existing GPL, AWMC and Jiangshan geometries retain their separate licenses.
 * New polygons come only from explicitly selected source-year files.
 */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist/data');
const input=path.resolve(process.argv[2]||path.join(root,'../research/historical-basemaps-source'));
const c=require('./map-context-curation.cjs');
const {english,localized,sourceText,featureText}=require('./map-text.cjs');
const commit='da7a4b735ecef70aebdc9c73e409d8a2500d50f3',checkedAt='2026-10-23';
const obsoleteSourceURLs=new Set([
 'https://www.metmuseum.org/essays/the-art-of-the-seljuqs-of-iran-ca-1040-1196',
 'https://www.metmuseum.org/essays/the-art-of-the-samanids-of-central-asia',
 'https://www.metmuseum.org/essays/liao-dynasty-907-1125',
 'https://www.metmuseum.org/toah/ht/09/euw.html',
 'https://www.nationalarchives.gov.uk/education/resources/indian-independence/',
 'https://www.austria.org/overview',
 'https://www.mfa.gov.tr/turkiye.en.mfa',
]);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const metaPath=path.join(out,'map-snapshots.json'),meta=JSON.parse(fs.readFileSync(metaPath));
const bases=meta.layers.filter(l=>!l.file.startsWith('territories-context-'));
const baseData=bases.map(l=>({layer:l,data:JSON.parse(fs.readFileSync(path.join(out,l.file)))}));
const originalFeatures=baseData.flatMap(x=>x.data.features);
const examples=new Map();for(const f of originalFeatures)if(!examples.has(f.properties.polityId))examples.set(f.properties.polityId,f.properties);
const palette=['#b06c61','#82975a','#a88c48','#6c8f9c','#a77c9a','#7e9b82','#b08b66','#8b85aa','#709e98','#ad7782','#8a9665','#8b8e90'];
function color(id){let n=0;for(const x of id)n=(n*31+x.charCodeAt(0))>>>0;return palette[n%palette.length];}
const stats={removedZeroAreaComponents:0,removedZeroAreaHoles:0,outerReversals:0,holeReversals:0};
function normalize(geometries){
 const output=[];
 for(const geometry of geometries){
  if(!['Polygon','MultiPolygon'].includes(geometry?.type))throw Error('Non-polygon source');
  for(const poly of geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates){
   const rings=[];
   for(let i=0;i<poly.length;i++){
    const ring=poly[i].map(p=>p.slice(0,2).map(n=>+n.toFixed(4)));
    if(JSON.stringify(ring[0])!==JSON.stringify(ring.at(-1)))ring.push([...ring[0]]);
    const area=d3.geoArea({type:'Polygon',coordinates:[ring]});
    if(Math.min(area,Math.PI*4-area)<=1e-12){if(!i){stats.removedZeroAreaComponents++;break;}stats.removedZeroAreaHoles++;continue;}
    if(!i&&area>Math.PI*2){ring.reverse();stats.outerReversals++;}if(i&&area<Math.PI*2){ring.reverse();stats.holeReversals++;}
    rings.push(ring);
   }
   if(rings.length)output.push(rings);
  }
 }
 if(!output.length)throw Error('Empty selected geometry');
 return {type:'MultiPolygon',coordinates:output};
}
const existingIds=new Set(originalFeatures.map(f=>f.properties.id));
const newFeatures=[],sourceFiles=[];
for(const [ys,rows] of Object.entries(c.selection)){
 const year=+ys,file=year<0?`world_bc${-year}.geojson`:`world_${year}.geojson`;
 const bytes=fs.readFileSync(path.join(input,file)),raw=JSON.parse(bytes);
 const url=`https://github.com/aourednik/historical-basemaps/blob/${commit}/geojson/${file}`;
 sourceFiles.push({year,file,url,sourceSha256:sha(bytes),bytes:bytes.length});
 for(const [namesArg,id,en,zh] of rows){
  if(existingIds.has(`${year}-${id}`))throw Error(`Duplicate pre-existing selection ${year}-${id}`);
  const names=Array.isArray(namesArg)?namesArg:[namesArg];
  const originals=names.flatMap(name=>{const fs=raw.features.filter(f=>f.properties.NAME===name);if(!fs.length)throw Error(`No ${name} in${file}`);return fs;});
  const def=c.defs[id],base=examples.get(id);
  if(!def&&!base)throw Error(`No definition for ${id}`);
  const keys=[...new Set([...(def?.[4]||[]),...(c.phases[id]||[])])];
  const historicalSources=(base?.sources||[]).filter(s=>!s.url.includes('/geojson/'));
  const sources=[{title:`Historical Basemaps: ${year}`,url,publisher:'André Ourednik and contributors',checkedAt,evidenceNote:'Actual source-year geometry. Only the named components are selected; coordinate rounding and spherical winding are normalized.'},...keys.map(k=>c.sources[k]),...historicalSources];
  const uniqueSources=[...new Map(sources.map(s=>[s.url,s])).values()];
  const kind=def?.[5]||'polity';
  const note=kind==='culture'?{
   en:'Approximate archaeological and cultural region. Political borders and the number of governing authorities are unknown. This is not a claim of a unified sovereign state, and its display interval does not imply that its people disappeared.',
   zh:'考古文化区域的概略示意。政治边界及统治主体数量无法确定，不表示统一主权国家；显示时段结束不代表其居民或文化消失。'
  }:{
   en:'Approximate outline from the stated source year, used as dated political context. It is not a reconstruction of every annual frontier, contested claim, occupation or wartime front line.',
   zh:'标明来源年份的概略轮廓，用作有日期的政治背景，不表示逐年的精确边界、争议主张、占领范围或战时前线。'
  };
  if(['newspain','newgranada','peru-viceroyalty-early','brazil-portuguese'].includes(id)){
   note.en+=' Colonial administration or claims are not equivalent to uniform control; Indigenous peoples and independent communities continued within these broad outlines.';
   note.zh+=' 殖民行政区或主张范围不等于全境控制；广阔轮廓内仍存在原住民社会和独立共同体。';
  }
  if(year===1960&&id==='china-modern'){
   note.en+=' This source polygon omits the separately drawn Tibet region. The omitted area is a source-coverage gap, not a sovereignty assertion. The1949–1951 civil-war and incorporation transitions are not drawn as front lines.';
   note.zh+=' 此来源图形不包含另行绘制的西藏地区。缺色表示来源覆盖缺口，不表达主权判断，也不描绘1949—1951年的内战或管辖变化前线。';
  }
  if(['egypt-new-kingdom','egypt-divided','assyria','babylonia','babylonia-kassite'].includes(id)){
   note.en+=' The selected polygon represents the source’s core region, not the full extent of imperial conquests or a single unchanging administration.';
   note.zh+=' 所选图形仅表示来源中的核心地区，不是全部帝国征服范围，也不表示始终由单一政权统治。';
  }
  if(year===1938&&id==='ussr'){
   note.en+=' This is the pre-1939 Soviet outline; later wartime annexations and occupations are not inferred from it.';
   note.zh+=' 这是1939年以前的苏联轮廓，不据此推断随后战争期间的兼并或占领。';
  }
  if(year===1715&&id==='russian'){
   note.en+=' This pre-1783 reference excludes Crimea. It retains the 1715 outline across the 1721 change of imperial title; later frontier expansion is not reconstructed.';
   note.zh+=' 此1783年以前的参考轮廓不包括克里米亚。1721年帝国称号变更前后仍使用1715年的轮廓，不据此重建后来的疆域扩张。';
  }
  if(year===1783&&id==='russian'){
   note.en+=' This source includes Crimea after the Russian annexation of 1783 and is not eligible at earlier selected years.';
   note.zh+=' 此来源包含1783年俄国兼并后的克里米亚，不能用于更早的所选年份。';
  }
  const f={type:'Feature',properties:{
   id:`${year}-${id}`,polityId:id,year,sourceYear:year,name:{en:en||def?.[0]||base.name.en,zh:zh||def?.[1]||base.name.zh},
   color:base?.color||color(id),kind,sourceNames:names,sourceAuthorities:[...new Set(originals.map(f=>f.properties.SUBJECTO).filter(Boolean))],
   geometrySource:url,sourceDataset:'historical-basemaps-v4-reviewed',sourceCommit:commit,license:'GPL-3.0-only',
   review:'chronology-and-source-geography',geometryReview:'dated-source-outline-with-explicit-coverage-limits',note,sources:uniqueSources,
  },geometry:normalize(originals.map(f=>f.geometry))};
  newFeatures.push(f);existingIds.add(f.properties.id);
 }
}
const allFeatures=[...originalFeatures,...newFeatures];
const grouped=new Map();for(const f of allFeatures){const id=f.properties.polityId;if(!grouped.has(id))grouped.set(id,[]);grouped.get(id).push(f);}
for(const [id,features] of grouped){
 features.sort((a,b)=>a.properties.year-b.properties.year);
 const def=c.defs[id],range=c.ranges[id]||def?.slice(2,4);
 if(!range)throw Error(`Unreviewed context range ${id}`);
 for(let i=0;i<features.length;i++){
  const f=features[i],p=f.properties,year=p.year;p.sourceYear=year;
  let start=i?year:range[0],end=Math.min(range[1],i+1<features.length?features[i+1].properties.year-1:range[1]);
  // A source snapshot is always eligible at its own original date. Context
  // outside that date requires the explicit interval registry above.
  const explicit=c.overrides[p.id];if(explicit)[start,end]=explicit;
  if(year===0||start===0||end===0||start>year||end<year)throw Error(`Invalid context for ${p.id}: ${start}..${end}`);
  const extra=(c.phases[id]||[]).map(k=>c.sources[k]);
  p.sources=[...new Map([...(p.sources||[]),...extra].filter(s=>!obsoleteSourceURLs.has(s.url)).map(s=>[s.url,s])).values()];
  const evidence=p.sources.filter(s=>!s.url.includes('/geojson/')&&!s.url.includes('/assets/')).map(s=>s.url);
  if(!evidence.length)throw Error(`No temporal evidence for ${p.id}`);
  p.contextValidity={start,end,backwardReviewed:start<year,reviewedAt:checkedAt,evidence,
   note:{en:'The named society or state is eligible as context within this reviewed interval. The geometry remains dated to its source year; boundaries are not interpolated.',zh:'在本次复核时段内，可将该社会或国家用作背景。几何轮廓仍属于标明的来源年份，不进行逐年边界插值。'}};
  p.scopeNote={en:'A dated reference outline may remain visible between checkpoints only within its reviewed context interval. Its presence does not certify the selected year’s borders. Uncolored regions are coverage gaps.',zh:'有日期的参考轮廓仅可在已复核的时段内保留显示，不保证所选年份的具体边界；未着色地区表示覆盖缺口。'};
 }
}
// Single reference identities with period-appropriate names.
for(const f of allFeatures){const p=f.properties;if(p.polityId==='ireland')p.namePeriods=[{start:1923,end:1936,name:{en:'Irish Free State',zh:'爱尔兰自由邦'}},{start:1937,end:2010,name:{en:'Ireland',zh:'爱尔兰'}}];}
for(const f of allFeatures){const p=f.properties;if(p.id==='1715-russian')p.namePeriods=[{start:1715,end:1720,name:{en:'Tsardom of Russia',zh:'俄罗斯沙皇国'}},{start:1721,end:1782,name:{en:'Russian Empire',zh:'俄罗斯帝国'}}];}
for(const f of allFeatures)featureText(f);
// Verify every new geometry in the three map projections actually used.
for(const f of newFeatures){
 const area=d3.geoArea(f);if(!Number.isFinite(area)||area<=0||area>Math.PI*2)throw Error(`Invalid area ${f.properties.id}`);
 for(const make of [d3.geoEqualEarth,d3.geoNaturalEarth1,d3.geoEquirectangular]){const p=d3.geoPath(make().fitSize([1000,500],{type:'Sphere'}))(f);if(!p||/NaN|Infinity/.test(p))throw Error(`Invalid projection ${f.properties.id}`);}
}
const written=[],finalBaseLayers=[],baseGroups=new Map();
const prefix='territories-context-',maxBytes=450000,collections=[];let part=[];
for(const item of baseData){
 const file=item.layer.file;
 const key=file==='territories.geojson'||file.startsWith('territories-legacy-')?'territories-legacy':file.startsWith('territories-modern-history')?'territories-modern-history':file;
 if(!baseGroups.has(key))baseGroups.set(key,{layer:item.layer,data:item.data,features:[]});
 baseGroups.get(key).features.push(...item.data.features);
}
for(const [key,group] of baseGroups){
 const make=features=>({...group.data,features}),parts=[];let current=[];
 for(const f of group.features){if(current.length&&Buffer.byteLength(JSON.stringify(make([...current,f])))>maxBytes){parts.push(current);current=[];}current.push(f);}if(current.length)parts.push(current);
 for(let i=0;i<parts.length;i++){
  const file=key.endsWith('.geojson')?key:`${key}-${String(i+1).padStart(2,'0')}.geojson`,data=make(parts[i]),text=JSON.stringify(data);
  if(Buffer.byteLength(text)>maxBytes)throw Error(`Base shard exceeds target ${file}`);
  fs.writeFileSync(path.join(out,file),text);
  finalBaseLayers.push({...group.layer,file,outputSha256:sha(text),featureCount:data.features.length});
  written.push({file,bytes:Buffer.byteLength(text),featureCount:data.features.length,sha256:sha(text)});
 }
}
for(const item of baseData)if(!finalBaseLayers.some(l=>l.file===item.layer.file))fs.unlinkSync(path.join(out,item.layer.file));
// Remove superseded generated artifacts even if an earlier script recreated
// an unsplit file after the manifest had already moved to shards.
for(const file of fs.readdirSync(out).filter(f=>f==='territories.geojson'||f==='territories-modern-history.geojson'||/^territories-(legacy|modern-history)-\d+\.geojson$/.test(f)))if(!finalBaseLayers.some(l=>l.file===file))fs.unlinkSync(path.join(out,file));
// Each new or pre-existing shard stays below450KB for connector upload.
function collection(features){return {type:'FeatureCollection',name:'Reviewed dated historical map context',sourceCommit:commit,license:'GPL-3.0-only',features};}
for(const feature of newFeatures){if(part.length&&Buffer.byteLength(JSON.stringify(collection([...part,feature])))>maxBytes){collections.push(part);part=[];}part.push(feature);}if(part.length)collections.push(part);
const layers=[];
for(let i=0;i<collections.length;i++){
 const features=collections[i],file=`${prefix}${String(i+1).padStart(2,'0')}.geojson`,text=JSON.stringify(collection(features));
 if(Buffer.byteLength(text)>maxBytes)throw Error(`Shard exceeds target: ${file}`);
 fs.writeFileSync(path.join(out,file),text);
 layers.push({file,license:'GPL-3.0-only',featureCount:features.length,attribution:'André Ourednik and historical-basemaps contributors; atlas temporal context curation',sourceCommit:commit,outputSha256:sha(text),licenseFile:'territories.LICENSE'});
 written.push({file,bytes:Buffer.byteLength(text),featureCount:features.length,sha256:sha(text)});
}
for(const file of fs.readdirSync(out).filter(f=>f.startsWith(prefix)&&f.endsWith('.geojson')))if(!layers.some(l=>l.file===file))fs.unlinkSync(path.join(out,file));
const oldSnapshots=new Map(meta.snapshots.map(s=>[s.year,s]));
const perYear=new Map();for(const f of allFeatures){const year=f.properties.year;if(!perYear.has(year))perYear.set(year,[]);perYear.get(year).push(f.properties.id);}
meta.snapshots=[...perYear].sort((a,b)=>a[0]-b[0]).map(([year,ids])=>{
 const prior=oldSnapshots.get(year),source=sourceFiles.find(s=>s.year===year);
 return {...(prior||{}),year,label:{en:`${Math.abs(year)} ${year<0?'BCE':'CE'}`,zh:year<0?`公元前${-year}年`:`公元${year}年`},title:prior?.title||{en:'Reviewed historical source checkpoint',zh:'已复核的历史来源节点'},featureIds:ids,featureCount:ids.length,...(source?{file:source.file,sourceSha256:source.sourceSha256}:{})};
});
meta.version=4;meta.layers=[...finalBaseLayers,...layers];meta.reviewDate=checkedAt;
meta.selectionPolicy='Newest eligible prior source per polity, inside an explicit inclusive contextValidity interval; otherwise earliest explicitly backward-reviewed source. Missing metadata means exact source year only. Original source years and licenses are preserved; never interpolate borders or extend expired identities.';
meta.contextSchema={version:1,field:'contextValidity',bounds:'inclusive civil years; no year zero',sourceYear:'the original dated outline; unchanged when rendered in another year',backwardReviewed:'a future-dated outline is eligible only when true and the selected year is in the stated interval',unreviewed:'exact source-year display only',selection:'one newest eligible prior source per polityId, otherwise earliest explicitly reviewed future source',precision:'dated-reference, not annual-frontier reconstruction'};
meta.method={en:'Actual source-year polygons plus independently bounded political and cultural context intervals. Names and outlines remain dated; later outlines are used only when backward review is explicit. A culture is not presented as a sovereign state.',zh:'使用真实来源年份的图形，并分别复核政治与文化背景的适用时段。名称和轮廓保留日期；只有明确复核后才可参考较晚轮廓。文化区域不视为主权国家。'};
meta.coverage='Selected societies and states, with dated context at every civil year from2600BCE to2010CE and reviewed contemporary references through2026. Geographic coverage is partial; no annual border reconstruction or exhaustive world map is claimed.';
const priorExclusions=meta.exclusions.filter(e=>e.reviewVersion!==4);
meta.exclusions=[...priorExclusions,...c.exclusions.map(([year,name,reason])=>({year,name,reason,reviewVersion:4}))];
meta.sources=[...new Map([...meta.sources,...Object.values(c.sources)].filter(s=>!obsoleteSourceURLs.has(s.url)).map(s=>[s.url,s])).values()];
for(const s of meta.sources)sourceText(s);for(const e of meta.exclusions)e.reason=english(e.reason);localized(meta.method);meta.coverage=english(meta.coverage);
meta.contextSourceFiles=sourceFiles;
fs.writeFileSync(metaPath,JSON.stringify(meta,null,2)+'\n');
const report={reviewedAt:checkedAt,sourceCommit:commit,featureCount:allFeatures.length,addedFeatureCount:newFeatures.length,polityCount:grouped.size,snapshotCount:meta.snapshots.length,shards:layers.length,written,normalization:stats,contexts:allFeatures.map(f=>({id:f.properties.id,polityId:f.properties.polityId,kind:f.properties.kind,sourceYear:f.properties.sourceYear,start:f.properties.contextValidity.start,end:f.properties.contextValidity.end,backwardReviewed:f.properties.contextValidity.backwardReviewed})),sourceFiles,limits:'Intervals support named-state/cultural context, not the exactness of selected-year frontiers. Source outlines are not interpolated. Civil-war and contested-control transitions remain partial. No CShapes geometry redistributed.'};
const uncovered=[];let reviewedYears=0;for(let y=-2600;y<=2010;y++){if(!y)continue;reviewedYears++;if(!allFeatures.some(f=>{const p=f.properties,c=p.contextValidity;return p.year===y||(c.start<=y&&c.end>=y&&(p.sourceYear<=y||c.backwardReviewed));}))uncovered.push(y);}
report.temporalCoverage={firstYear:-2600,lastYear:2010,reviewedCivilYears:reviewedYears,yearsWithoutAnyContext:uncovered,interpretation:'Presence of at least one reviewed society/state reference; not complete global geography.'};
fs.writeFileSync(path.join(root,'docs/MAP_CONTEXT_V4_VALIDATION.json'),JSON.stringify(report,null,2)+'\n');
const modernReportPath=path.join(root,'docs/MODERN_MAP_VALIDATION.json');if(fs.existsSync(modernReportPath)){const modernReport=JSON.parse(fs.readFileSync(modernReportPath));modernReport.artifactNote='The original validation applies to the dated source geometries. V4 adds bounded context metadata and shards the same selected geometries; original output hashes below are a historical build record.';modernReport.currentArtifacts=finalBaseLayers.filter(l=>l.file.startsWith('territories-modern-history')).map(l=>({file:l.file,featureCount:l.featureCount,outputSha256:l.outputSha256}));fs.writeFileSync(modernReportPath,JSON.stringify(modernReport,null,2)+'\n');}
console.log(JSON.stringify({features:report.featureCount,added:report.addedFeatureCount,polities:report.polityCount,snapshots:report.snapshotCount,shards:report.shards,newBytes:written.filter(x=>x.file.startsWith(prefix)).reduce((n,x)=>n+x.bytes,0),normalization:stats},null,2));
