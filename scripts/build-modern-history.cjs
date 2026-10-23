/* Curated exact-year modern history layers. No modern polygons are backdated.
 * node scripts/build-modern-history.cjs /absolute/path/to/pinned-inputs
 * Inputs: world_1994.geojson, world_2000.geojson, world_2010.geojson from the
 * historical-basemaps commit in the generated manifest. Independent CShapes
 * checks are read-only; no CShapes geometry or properties are redistributed.
 */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const input=path.resolve(process.argv[2] || path.join(root,'../research/v3-modern-map'));
const out=path.join(root,'dist/data');
const commit='da7a4b735ecef70aebdc9c73e409d8a2500d50f3';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/assets/d3.v7.9.0.min.js'),'utf8'),ctx);const d3=ctx.d3;
const src=(title,url,publisher,evidenceNote)=>({title,url,publisher,evidenceNote,checkedAt:'2026-10-22'});
const evidence={
  membership:src('UN member-state chronology and former-state notes','https://research.un.org/en/unmembers/currentmembers','United Nations Dag Hammarskjöld Library','Independent evidence of state identities and membership chronology; not proof of every border vertex.'),
  soviet:src('The collapse of the Soviet Union','https://history.state.gov/milestones/1989-1992/collapse-soviet-union','U.S. Department of State, Office of the Historian','Chronology of the 1991 dissolution; the subsequent maps must show separate successor states.'),
  czech:src('Czechoslovakia and its successor States','https://www.un.org/en/about-us/member-states/czechoslovakia','United Nations','The federation ceased to exist on 31 December 1992; Czech and Slovak States are separate in every included snapshot.'),
  germany:src('The Chancellor who reunited Germany','https://www.bundesregierung.de/breg-en/service/archive/archive/the-chancellor-who-reunited-germany-413888','German Federal Government','German reunification on 3 October 1990; separate East/West Germany would be wrong in 1994 and later.'),
  eritrea:src('Independence celebrations in Eritrea, 24 May 1993','https://digitallibrary.un.org/record/218378?ln=en','United Nations Secretary-General','Confirms independence before the 1994 snapshot.'),
  sudan:src('South Sudan independence ceremony','https://press.un.org/en/2011/sgsm13696.doc.htm','United Nations Secretary-General','Independence on 9 July 2011; the 1994, 2000 and 2010 Sudan layers include the south.'),
  yugoslavia:src('Yugoslavia and successor States','https://www.un.org/en/about-us/member-states/yugoslavia','United Nations','State succession and the 2006 separation of Serbia and Montenegro. Unsupported source authority labels are excluded.'),
  timor:src('East Timor becomes independent, 20 May 2002','https://press.un.org/en/2002/sc7403.doc.htm','United Nations Security Council','Confirms the transition; the upstream files do not offer a reviewed separate Timor-Leste polygon, so none is fabricated.'),
  cshapes:src('CShapes 2.0','https://icr.ethz.ch/data/cshapes/','ETH Zürich International Conflict Research','Independent broad-geography and state-existence comparison. No CShapes geometry is distributed.'),
};
// input name, persistent atlas ID, English label, Chinese label, Natural Earth code,
// optional transition evidence, CShapes source name where different.
const selected=[
 ['Russia','russia-modern','Russia','俄罗斯','RUS','soviet','Russia (Soviet Union)'],
 ['Ukraine','ukraine','Ukraine','乌克兰','UKR','soviet'],
 ['Byelarus','belarus','Belarus','白俄罗斯','BLR','soviet','Belarus (Byelorussia)'],
 ['Estonia','estonia','Estonia','爱沙尼亚','EST','soviet'],
 ['Latvia','latvia','Latvia','拉脱维亚','LVA','soviet'],
 ['Lithuania','lithuania','Lithuania','立陶宛','LTU','soviet'],
 ['Moldova','moldova','Moldova','摩尔多瓦','MDA','soviet'],
 ['Georgia','georgia','Georgia','格鲁吉亚','GEO','soviet'],
 ['Armenia','armenia','Armenia','亚美尼亚','ARM','soviet'],
 ['Azerbaijan','azerbaijan','Azerbaijan','阿塞拜疆','AZE','soviet'],
 ['Kazakhstan','kazakhstan','Kazakhstan','哈萨克斯坦','KAZ','soviet'],
 ['Uzbekistan','uzbekistan','Uzbekistan','乌兹别克斯坦','UZB','soviet'],
 ['Kyrgyzstan','kyrgyzstan','Kyrgyzstan','吉尔吉斯斯坦','KGZ','soviet','Kyrgyz Republic'],
 ['Tajikistan','tajikistan','Tajikistan','塔吉克斯坦','TJK','soviet'],
 ['Turkmenistan','turkmenistan','Turkmenistan','土库曼斯坦','TKM','soviet'],
 ['Germany','germany','Germany','德国','DEU','germany','German Federal Republic'],
 ['Czech Republic','czech-republic','Czech Republic','捷克共和国','CZE','czech'],
 ['Slovakia','slovakia','Slovakia','斯洛伐克','SVK','czech'],
 ['France','france-modern','France','法国','FRA'],
 ['United Kingdom','uk','United Kingdom','英国','GBR'],
 ['Poland','poland','Poland','波兰','POL'],
 ['Eritrea','eritrea','Eritrea','厄立特里亚','ERI','eritrea'],
 ['Ethiopia','ethiopia','Ethiopia','埃塞俄比亚','ETH','eritrea'],
 ['Sudan','sudan','Sudan','苏丹','SDN','sudan'],
 ['South Africa','south-africa','South Africa','南非','ZAF'],
 ['Namibia','namibia','Namibia','纳米比亚','NAM'],
 ['Nigeria','nigeria','Nigeria','尼日利亚','NGA'],
 ['Ghana','ghana-modern','Ghana','加纳','GHA'],
 ['United States','usa','United States','美国','USA',null,'United States of America'],
 ['Canada','canada','Canada','加拿大','CAN'],
 ['Mexico','mexico','Mexico','墨西哥','MEX'],
 ['Brazil','brazil','Brazil','巴西','BRA'],
 ['Argentina','argentina','Argentina','阿根廷','ARG'],
 ['China','china-modern','China','中国','CHN'],
 ['Japan','japan','Japan','日本','JPN'],
 ['India','india','India','印度','IND'],
 ['Pakistan','pakistan','Pakistan','巴基斯坦','PAK'],
 ['Bangladesh','bangladesh','Bangladesh','孟加拉国','BGD'],
 ['Thailand','thailand','Thailand','泰国','THA'],
 ['Vietnam','vietnam','Vietnam','越南','VNM',null,'Vietnam, Democratic Republic of'],
 ['Australia','australia','Australia','澳大利亚','AUS'],
 ['New Zealand','newzealand','New Zealand','新西兰','NZL'],
 ['Papua New Guinea','papua-new-guinea','Papua New Guinea','巴布亚新几内亚','PNG'],
 ['Slovenia','slovenia','Slovenia','斯洛文尼亚','SVN','yugoslavia'],
 ['Croatia','croatia','Croatia','克罗地亚','HRV','yugoslavia'],
 ['Bosnia and Herzegovina','bosnia-herzegovina','Bosnia and Herzegovina','波斯尼亚和黑塞哥维那','BIH','yugoslavia','Bosnia-Herzegovina'],
 ['Macedonia','macedonia','Macedonia (UN provisional name: FYROM)','马其顿（联合国暂称“前南斯拉夫马其顿共和国”）','MKD','yugoslavia','Macedonia (FYROM/North Macedonia)'],
];
const palette=['#b06c61','#82975a','#a88c48','#6c8f9c','#a77c9a','#7e9b82','#b08b66','#8b85aa','#709e98','#ad7782','#8a9665','#8b8e90'];
function color(id){let n=0;for(const c of id)n=(n*31+c.charCodeAt(0))>>>0;return palette[n%palette.length];}
const existing=JSON.parse(fs.readFileSync(path.join(out,'map-snapshots.json'))).layers.flatMap(l=>JSON.parse(fs.readFileSync(path.join(out,l.file))).features);
const existingColors=new Map(existing.map(f=>[f.properties.polityId,f.properties.color]));
const stats={removedZeroAreaComponents:0,removedZeroAreaHoles:0,outerReversals:0,holeReversals:0};
function normalize(geometries){
 const output=[];
 for(const geometry of geometries) for(const poly of geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates){
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
 if(!output.length)throw Error('Empty historical geometry');
 return {type:'MultiPolygon',coordinates:output};
}
const ne=JSON.parse(fs.readFileSync(path.join(input,'ne_50m_admin_0_countries.geojson'))).features;
const labels=new Map(ne.map(f=>[f.properties.ADM0_A3,[f.properties.LABEL_X,f.properties.LABEL_Y]]));
// Interior spot checks avoid boundary-adjacent capitals such as Bratislava.
labels.set('FRA',[2.4,47]);labels.set('RUS',[55,56]);labels.set('SDN',[32.5,15]);labels.set('NZL',[176,-38.5]);
const features=[],snapshots=[],checks=[];
let cshapes=null;
const cshapeFile=path.join(root,'../research/historical-basemaps-source/CShapes-2.0.geojson');
if(fs.existsSync(cshapeFile)){
 cshapes=JSON.parse(fs.readFileSync(cshapeFile)).features;
 for(const f of cshapes){
  const polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
  for(const poly of polys)poly.forEach((ring,i)=>{const area=d3.geoArea({type:'Polygon',coordinates:[ring]});if(i===0?area>Math.PI*2:area<Math.PI*2)ring.reverse();});
 }
}
const excluded=[];
for(const year of [1994,2000,2010]){
 const file=`world_${year}.geojson`,rawBytes=fs.readFileSync(path.join(input,file)),raw=JSON.parse(rawBytes);
 const geometrySource=`https://github.com/aourednik/historical-basemaps/blob/${commit}/geojson/${file}`;
 const geometryEvidence=src(`Historical Basemaps: ${year}`,geometrySource,'André Ourednik and contributors','Imported source geometry explicitly dated to this snapshot year; rounded to 4 decimal places and winding normalized.');
 const yearRows=[...selected];
 if(year===2010)yearRows.push(['Montenegro','montenegro','Montenegro','黑山','MNE','yugoslavia']);
 const ids=[];
 for(const [inputName,id,en,zh,code,extra,cshapeName] of yearRows){
  const originals=raw.features.filter(f=>f.properties.NAME===inputName);
  if(!originals.length)throw Error(`Missing ${inputName} at ${year}`);
  if(originals.some(f=>f.properties.SUBJECTO!==inputName))throw Error(`Unexpected authority for ${inputName}`);
  const f={type:'Feature',properties:{id:`${year}-${id}`,polityId:id,year,name:{en,zh},color:existingColors.get(id)||color(id),kind:'polity',sourceNames:[inputName],sourceAuthorities:[...new Set(originals.map(f=>f.properties.SUBJECTO))],geometrySource,
   sourceDataset:'historical-basemaps-modern-reviewed',sourceCommit:commit,license:'GPL-3.0-only',
   review:'chronology-and-broad-location',geometryReview:'dated-source-with-independent-interior-check',
   note:{en:'Approximate state outline in the stated source year. The outline describes a selected political unit, not uniform control, recognition of every claimed border, or a map of wartime front lines.',zh:'对应来源年份的国家概略轮廓。图形表示所选政治单元，不表示全境控制、对所有主张边界的认可或战时前线。'},
   scopeNote:{en:'This is an exact dated snapshot. It must not be carried into another year. Uncolored areas lack a reviewed polygon in this selected layer.',zh:'本图是明确标年的快照，不得延用到其他年份。未着色地区仅表示未纳入本图层的已复核轮廓。'},
   sources:[geometryEvidence,evidence.membership,...(extra?[evidence[extra]]:[]),evidence.cshapes],
  },geometry:normalize(originals.map(f=>f.geometry))};
  if(id==='sudan')f.properties.note={en:'Sudan before the 9 July 2011 independence of South Sudan. The whole state outline does not imply uniform control during the civil war or settle disputed boundaries.',zh:'2011年7月9日南苏丹独立之前的苏丹。国家外轮廓不表示内战期间的全境控制，也不裁定争议边界。'};
  if(id==='bosnia-herzegovina'&&year===1994)f.properties.note={en:'The internationally recognized state outline during the Bosnian War. It does not show the divided military control, displacement or front lines of 1994.',zh:'波斯尼亚战争期间获国际承认的国家外轮廓，不表示1994年的军事控制划分、人口流离失所或前线。'};
  if(id==='byelarus')f.properties.name.en='Belarus';
  const point=labels.get(code);
  const sourceContainsPoint=d3.geoContains(f,point);
  let comparison=[];
  if(cshapes){
   const date=year*10000+101;
   comparison=cshapes.filter(g=>{const p=g.properties;return p.cntry_name===(cshapeName||inputName)&&p.gwsyear*10000+p.gwsmonth*100+p.gwsday<=date&&p.gweyear*10000+p.gwemonth*100+p.gweday>=date;});
  }
  const check={id:f.properties.id,sourceName:inputName,sourceContainsInteriorPoint:sourceContainsPoint,independentPolityExists:cshapes?comparison.length>0:null};
  if(!sourceContainsPoint)throw Error('Interior point outside source: '+JSON.stringify(check));
  if(cshapes && !comparison.length)throw Error('Polity missing from independent chronology: '+JSON.stringify(check));
  // Broad interior point comparison only; no CShapes coordinates are exported.
  check.independentContainsInteriorPoint=cshapes?comparison.some(g=>d3.geoContains(g,point)):null;
  if(cshapes&&!check.independentContainsInteriorPoint)throw Error('Independent interior check failed: '+JSON.stringify(check));
  for(const make of [d3.geoEqualEarth,d3.geoNaturalEarth1,d3.geoEquirectangular]){const p=d3.geoPath(make().fitSize([1000,500],{type:'Sphere'}))(f);if(!p||/NaN|Infinity/.test(p))throw Error('Invalid projection');}
  features.push(f);ids.push(f.properties.id);checks.push(check);
 }
 snapshots.push({year,label:{en:`${year} CE`,zh:`公元${year}年`},title:{en:year===1994?'After the Soviet and Czechoslovak dissolutions':year===2000?'States at the turn of the millennium':'Before South Sudan’s independence',zh:year===1994?'苏联与捷克斯洛伐克解体之后':year===2000?'世纪之交的各国':'南苏丹独立之前'},featureIds:ids,featureCount:ids.length,file,sourceSha256:hash(rawBytes)});
 const add=(name,reason)=>excluded.push({year,name,reason});
 if(year<2006)add('Serbia and Montenegro as separate sovereign authorities','The source labels both as separate authorities before the 2006 dissolution of their federation. They are not silently relabeled or merged.');
 if(year===2010)add('Serbia / Kosovo','Source has no separate reviewed Kosovo control/status model for 2010. Omitted pending a model that distinguishes sovereignty claims and administration.');
 if(year===2000)add('Hong Kong','Source still gives the United Kingdom as authority after the 1997 handover.');
 if(year>=2000)add('Zaire','Source retains the former state name after its 1997 change to Democratic Republic of the Congo. Geometry not adopted without a fuller authority review.');
 add('Timor-Leste / East Timor','No named, separately reviewed polygon in the source snapshot; no modern polygon is backdated. Transition is covered in sourced historical entries.');
 add('Other unselected source entities','This pass reviews the named selected set; remaining upstream features are not assumed correct merely because they have a dated filename.');
}
const data={type:'FeatureCollection',name:'Selected modern historical states in 1994, 2000 and 2010',sourceCommit:commit,license:'GPL-3.0-only',features};
const text=JSON.stringify(data),filename='territories-modern-history.geojson';fs.writeFileSync(path.join(out,filename),text);
const metadataPath=path.join(out,'map-snapshots.json'),meta=JSON.parse(fs.readFileSync(metadataPath));
meta.snapshots=meta.snapshots.filter(s=>![1994,2000,2010].includes(s.year)).concat(snapshots).sort((a,b)=>a.year-b.year);
const replacedModernLayers=meta.layers.filter(l=>l.file.startsWith('territories-modern-history'));
meta.layers=meta.layers.filter(l=>!l.file.startsWith('territories-modern-history')).concat({file:filename,license:'GPL-3.0-only',featureCount:features.length,attribution:'André Ourednik and historical-basemaps contributors',sourceCommit:commit,outputSha256:hash(text),licenseFile:'territories-modern-history.LICENSE.md'});
for(const layer of replacedModernLayers)if(layer.file!==filename&&fs.existsSync(path.join(out,layer.file)))fs.unlinkSync(path.join(out,layer.file));
const sourceKeys=new Set(meta.sources.map(s=>s.url));for(const s of Object.values(evidence))if(!sourceKeys.has(s.url)){meta.sources.push(s);sourceKeys.add(s.url);}
meta.exclusions=meta.exclusions.filter(e=>![1994,2000,2010].includes(e.year)).concat(excluded);
meta.reviewDate='2026-10-22';
fs.writeFileSync(metadataPath,JSON.stringify(meta,null,2)+'\n');
const report={reviewedAt:'2026-10-22',sourceCommit:commit,file:filename,outputSha256:hash(text),bytes:Buffer.byteLength(text),featureCount:features.length,snapshots:snapshots.map(s=>({year:s.year,featureCount:s.featureCount})),validation:{...stats,projections:['EqualEarth','NaturalEarth1','Equirectangular'],checks},limits:'State existence and broad interior location checks do not certify every boundary, enclave, island, disputed claim, or wartime control line. No CShapes geometry redistributed.',exclusions:excluded};
fs.writeFileSync(path.join(root,'docs/MODERN_MAP_VALIDATION.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({file:filename,bytes:report.bytes,features:features.length,snapshots:report.snapshots,checks:checks.length,geometry:stats},null,2));
