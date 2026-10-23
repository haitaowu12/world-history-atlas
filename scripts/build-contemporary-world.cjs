/* Rebuild the contemporary reference layer from pinned public-domain inputs.
 * Usage: node scripts/build-contemporary-world.cjs /absolute/path/to/raw-inputs
 * Raw files are downloaded from the exact URLs in contemporary-world.json.
 * No dependencies beyond Node and the repository's pinned D3 browser bundle.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const {english,localized,sourceText,featureText}=require('./map-text.cjs');
const root = path.resolve(__dirname, '..');
const input = path.resolve(process.argv[2] || path.join(root, '../research/v3-modern-map'));
const out = path.join(root, 'dist/data');
const commit = 'ca96624a56bd078437bca8184e78163e5039ad19';
const base = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/${commit}/geojson/`;
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const context = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'dist/assets/d3.v7.9.0.min.js'), 'utf8'), context);
const d3 = context.d3;
const source = (title, url, publisher, evidenceNote) => ({title, url, publisher, evidenceNote, checkedAt: '2026-10-22'});
const sources = [
  source('Natural Earth: Admin 0 countries, 1:50m', 'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/', 'Natural Earth', 'Generalized reference geography. This is not an independently surveyed map of control in 2026.'),
  source('Natural Earth terms of use', 'https://www.naturalearthdata.com/about/terms-of-use/', 'Natural Earth', 'Public-domain permission for all map data.'),
  source('Natural Earth disputed boundaries policy', 'https://www.naturalearthdata.com/about/disputed-boundaries-policy/', 'Natural Earth', 'The source uses a de facto cartographic convention and supplies separate claim boundaries. Display does not endorse a sovereignty claim.'),
  source('Natural Earth v5.1.2 release', 'https://github.com/nvkelso/natural-earth-vector/releases/tag/v5.1.2', 'Natural Earth', 'Latest published release checked on the review date; the 50m countries file was last changed in May 2022.'),
  source('Türkiye name change at the United Nations', 'https://turkiye.un.org/en/184798-turkeys-name-changed-t%C3%BCrkiye', 'United Nations in Türkiye', 'The display name is updated from the input file’s Turkey to Türkiye. Geometry is unchanged.'),
  source('Czechia at the United Nations', 'https://www.un.org/en/about-us/member-states/czechia', 'United Nations', 'Current short display name; the older source name Czech Republic is retained as an alias.'),
  source('International Law and the Chagos Archipelago', 'https://commonslibrary.parliament.uk/research-briefings/cbp-10512/', 'UK House of Commons Library', '8 October 2026 review: the 2025 UK–Mauritius treaty had not entered into force. The map does not infer sovereignty transfer from signature alone.'),
  source('What is happening in Nagorno-Karabakh?', 'https://commonslibrary.parliament.uk/research-briefings/cbp-9862/', 'UK House of Commons Library', 'The 2023 change in control makes the source’s old breakaway lines unsuitable for a contemporary overlay.'),
  source('Territorial integrity of Ukraine', 'https://digitallibrary.un.org/record/767565', 'United Nations General Assembly', 'Resolution 68/262 affirms Ukraine’s territorial integrity. The source’s de facto geometry must not be read as UN recognition of annexation.'),
  source('Territorial integrity of Ukraine: defending the principles of the Charter of the United Nations', 'https://digitallibrary.un.org/record/3990400', 'United Nations General Assembly', 'Resolution ES-11/4 rejects attempted annexations. Old source control lines are not a present-day military map.'),
  source('Non-member states at the United Nations', 'https://www.un.org/en/about-us/non-member-states', 'United Nations', 'Palestine and the Holy See have non-member observer State status; map-unit counts are not UN member counts.'),
  source('Cook Islands and New Zealand', 'https://www.mfat.govt.nz/en/countries-and-regions/australia-and-pacific/cook-islands', 'New Zealand Ministry of Foreign Affairs and Trade', 'Self-government in free association with New Zealand; not a simple colonial dependency classification.'),
  source('Niue and New Zealand', 'https://www.mfat.govt.nz/en/countries-and-regions/australia-and-pacific/niue', 'New Zealand Ministry of Foreign Affairs and Trade', 'Self-government in free association with New Zealand.'),
  source('The Antarctic Treaty, Article IV', 'https://documents.ats.aq/atcm43/ww/atcm43_ww005_e.pdf', 'Antarctic Treaty Secretariat', 'Preserves parties’ positions on territorial claims; Antarctica is not one sovereign country.'),
  source('Non-Self-Governing Territories', 'https://www.un.org/dppa/decolonization/en/nsgt', 'United Nations', 'Western Sahara remains on the UN decolonization agenda.'),
  source('Non-member observer State resources: State of Palestine', 'https://research.un.org/en/unmembers/observers', 'United Nations Dag Hammarskjöld Library', 'The State of Palestine is currently a non-member observer State of the UN General Assembly. This independently establishes the editorial status label; the source geometry’s dependency classification is not adopted.'),
];
const membershipSource=source('UN current membership and historical name notes','https://research.un.org/en/unmembers/currentmembers','United Nations Dag Hammarskjöld Library','State identities and naming chronology; this is not evidence of every boundary vertex.');
const periodSources={
 CZE:source('Czechia short name notification, 17 May 2016','https://ask.un.org/faq/75046','United Nations Dag Hammarskjöld Library','The formal name remains Czech Republic; the short English display name changes in2016.'),
 SWZ:source('Swaziland / Eswatini name authority record','https://digitallibrary.un.org/record/874164','United Nations Dag Hammarskjöld Library','The country name changed effective19April2018.'),
 MKD:source('UN membership chronology: North Macedonia','https://research.un.org/en/unmembers/currentmembers','United Nations Dag Hammarskjöld Library','The2019 notification changes the display name to NorthMacedonia; prior years retain Macedonia/FYROM.'),
 PSX:source('Status of Palestine in the United Nations, A/RES/67/19','https://digitallibrary.un.org/record/739031?ln=en','United Nations General Assembly','Non-member observer State status was granted on29November2012, not in2011.'),
 SDS:source('South Sudan independence ceremony, 9 July 2011','https://press.un.org/en/2011/sgsm13696.doc.htm','United Nations Secretary-General','A separate SouthSudan reference begins in2011; the preceding historical Sudan outline ends2010.'),
};
sources.push(membershipSource,...Object.values(periodSources));
const periodNames={
 TUR:[{start:2011,end:2021,name:{en:'Turkey',zh:'土耳其'}},{start:2022,end:2026,name:{en:'Türkiye',zh:'土耳其'}}],
 CZE:[{start:2011,end:2015,name:{en:'Czech Republic',zh:'捷克共和国'}},{start:2016,end:2026,name:{en:'Czechia',zh:'捷克'}}],
 SWZ:[{start:2011,end:2017,name:{en:'Swaziland',zh:'斯威士兰'}},{start:2018,end:2026,name:{en:'Eswatini',zh:'斯威士兰'}}],
 MKD:[{start:2011,end:2018,name:{en:'Macedonia (FYROM)',zh:'马其顿（前南斯拉夫马其顿共和国）'}},{start:2019,end:2026,name:{en:'North Macedonia',zh:'北马其顿'}}],
};
const contextValidity=(start,evidence=[membershipSource.url])=>({start,end:2026,backwardReviewed:start<2022,reviewedAt:'2026-10-23',evidence,
 note:{en:'Reviewed as dated reference context for this interval. The2022 source geometry is not a reconstruction of annual borders or military control.',zh:'在本时段内作为有日期的参考背景使用。2022版来源几何不是逐年边界或军事控制范围的重建。'}});
const stats = {outerReversals: 0, holeReversals: 0, closedRings: 0, removedZeroAreaComponents: 0, removedZeroAreaHoles: 0};
function normalized(geometry) {
  const polys = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  const output = [];
  for (const poly of polys) {
    const rings = [];
    for (let i=0; i<poly.length; i++) {
      const ring = poly[i].map(p => p.slice(0,2));
      if (JSON.stringify(ring[0]) !== JSON.stringify(ring.at(-1))) {ring.push([...ring[0]]); stats.closedRings++;}
      const area = d3.geoArea({type:'Polygon',coordinates:[ring]});
      if (Math.min(area, Math.PI*4-area) <= 1e-12) {
        if (!i) {stats.removedZeroAreaComponents++; break;}
        stats.removedZeroAreaHoles++; continue;
      }
      if (!i && area > Math.PI*2) {ring.reverse(); stats.outerReversals++;}
      if (i && area < Math.PI*2) {ring.reverse(); stats.holeReversals++;}
      rings.push(ring);
    }
    if(rings.length) output.push(rings);
  }
  if (!output.length) throw Error('Empty country geometry');
  return {type:'MultiPolygon',coordinates:output};
}
const countryFile = 'ne_50m_admin_0_countries.geojson';
const lineFile = 'ne_50m_admin_0_boundary_lines_disputed_areas.geojson';
const areaFile = 'ne_50m_admin_0_breakaway_disputed_areas.geojson';
const rawCountries = fs.readFileSync(path.join(input,countryFile));
const rawLines = fs.readFileSync(path.join(input,lineFile));
const rawAreas = fs.readFileSync(path.join(input,areaFile));
const raw = JSON.parse(rawCountries);
const nameOverrides = {
  TUR: ['Türkiye','土耳其'], CZE: ['Czechia','捷克'], TLS: ['Timor-Leste','东帝汶'],
  TWN: ['Taiwan','台湾'], CYN: ['Northern Cyprus','北塞浦路斯'], PSX: ['Palestine','巴勒斯坦'],
  SWZ: ['Eswatini','斯威士兰'], IOT: ['Chagos Archipelago / British Indian Ocean Territory','查戈斯群岛／英属印度洋领地'],
};
const specialNotes = {
  RUS: ['This reference geometry follows Natural Earth’s 2022 cartographic convention, including its treatment of Crimea. It does not endorse annexation or show military control in 2026. UN resolutions affirm Ukraine’s territorial integrity.', '本参考图沿用Natural Earth 2022版制图约定，包括其对克里米亚的处理；不表示认可吞并，也不表示2026年的军事控制线。联合国决议确认乌克兰的领土完整。'],
  UKR: ['The source’s de facto outline differs from Ukraine’s internationally recognized borders. UN resolutions affirm Ukraine’s territorial integrity. This is not a current map of front lines or occupation.', '来源采用的实际控制制图轮廓与乌克兰获国际承认的边界不同。联合国决议确认乌克兰的领土完整。本图不是当前战线或占领范围图。'],
  PSX: ['Palestine received UN non-member observer State status on29November2012. The source’s2022 map-unit outline and authority field do not describe present-day control or settle sovereignty or final borders.', '巴勒斯坦于2012年11月29日获得联合国非会员观察员国地位。来源2022版的地图单元轮廓与管辖字段，不表示当前控制状况，也不裁定主权或最终边界。'],
  ISR: ['Israel is a UN member State. The source’s disputed-area classification concerns its cartographic treatment of territorial claims; this dated outline does not represent current front lines or settle disputed borders.', '以色列是联合国会员国。来源中的争议地区分类涉及其对领土主张的制图处理；本版轮廓不表示当前战线，也不裁定争议边界。'],
  IOT: ['The UK and Mauritius signed a Chagos treaty in May 2025, but it had not entered into force in the 8 October 2026 parliamentary review. This layer preserves source geometry and does not equate a signed treaty with a completed transfer.', '英国与毛里求斯于2025年5月签署查戈斯条约；据2026年10月8日英国议会研究，该条约尚未生效。本图保留来源几何，不把条约签署视为已完成移交。'],
  TWN: ['Taiwan is shown as a separate map unit in the source. Separate coloring is a cartographic convention and does not resolve competing political claims or imply diplomatic recognition.', '来源将台湾作为独立地图单元显示。单独着色属于制图约定，不裁定相互竞争的政治主张，也不表示外交承认。'],
  CYN: ['The source distinguishes Northern Cyprus as a map unit. Separate display does not imply international recognition or resolve the Cyprus dispute.', '来源将北塞浦路斯区分为地图单元。单独显示不表示国际承认，也不裁定塞浦路斯争端。'],
  SOL: ['The source displays Somaliland separately from Somalia. Its political status and territorial claims remain distinct questions from a dated reference outline.', '来源将索马里兰与索马里分别显示。其政治地位与领土主张，不能由本参考轮廓决定。'],
  SAH: ['Western Sahara is a disputed territory on the UN decolonization agenda. The source outline does not settle sovereignty or show current military control.', '西撒哈拉是联合国非殖民化议程上的争议领土。来源轮廓不裁定主权，也不表示当前军事控制。'],
  COK: ['The Cook Islands are self-governing in free association with New Zealand. The input labels them Dependency; that source classification is preserved separately, not adopted as a statement of constitutional status.', '库克群岛是与新西兰自由联系的自治实体。输入数据将其标为Dependency；此来源分类被单独保留，不作为对其宪制地位的判断。'],
  NIU: ['Niue is self-governing in free association with New Zealand. The input labels it Dependency; that source classification is preserved separately, not adopted as a statement of constitutional status.', '纽埃是与新西兰自由联系的自治实体。输入数据将其标为Dependency；此来源分类被单独保留，不作为对其宪制地位的判断。'],
  ATA: ['Antarctica is not a sovereign country. The Antarctic Treaty holds territorial claims in abeyance; this feature is a geographic reference.', '南极洲不是主权国家。《南极条约》将领土主张问题搁置；该图形仅作为地理参考。'],
};
const disputedCodes = new Set(['KOS','CYN','TWN','SOL','SAH','KAS','IOT','FLK']);
const relatedSourceIndexes = {TUR:[4],CZE:[5],IOT:[6],RUS:[8,9],UKR:[8,9],PSX:[10,15],COK:[11],NIU:[12],ATA:[13],SAH:[14]};
const countries = raw.features.map(feature => {
  const p=feature.properties, code=p.ADM0_A3;
  const names=nameOverrides[code] || [p.NAME_EN || p.NAME_LONG || p.NAME, p.NAME_ZH || p.NAME_EN];
  let category = p.TYPE==='Dependency' || p.FCLASS_ISO==='Admin-0 dependency' || ['JEY','GGY','IMN'].includes(code) ? 'dependency':'country';
  if (disputedCodes.has(code)) category='disputed';
  if (['ATA','COK','NIU'].includes(code)) category='other';
  if (code==='PSX') category='observer-state';
  const note=specialNotes[code] || ['Generalized reference outline from Natural Earth’s 2022 release. Boundaries and status may be disputed; this is not a live map of control in 2026.', '来自Natural Earth 2022版的概略参考轮廓。边界与地位可能存在争议；本图不是2026年实时控制范围图。'];
  return {type:'Feature',properties:{
    id:`contemporary-${code.toLowerCase()}`,code,isoCode:p.ISO_A3_EH,
    name:{en:names[0],zh:names[1]},aliases:[...new Set([p.NAME,p.NAME_LONG,p.NAME_EN,p.ADMIN].filter(Boolean))],
    category,sovereign: ['PSX','TWN','CYN','SOL','KOS','SAH','KAS','IOT','ATA'].includes(code) ? null : p.SOVEREIGNT,
    sourceSovereign:p.SOVEREIGNT,sourceType:p.TYPE,sourceClassification:p.FCLASS_ISO,
    region:p.CONTINENT,subregion:p.SUBREGION,labelPoint:[p.LABEL_X,p.LABEL_Y],
    sourceName:p.NAME_LONG || p.NAME,sourceId:p.NE_ID,sourceCode:p.ADM0_A3,
    sourceNote:p.NOTE_BRK,sourceDataset:'natural-earth-50m',sourceCommit:commit,
    geometryVintage:2022,sourceYear:2022,reviewedYear:2026,license:'Public domain',geometrySource:base+countryFile,note:{en:note[0],zh:note[1]},
    contextValidity:contextValidity(['RUS','UKR'].includes(code)?2014:2011,[membershipSource.url,...(['RUS','UKR'].includes(code)?[sources[8].url]:[]),...(periodSources[code]?[periodSources[code].url]:[])]),
    ...(periodNames[code]?{namePeriods:periodNames[code]}:{}),
    ...(code==='PSX'?{categoryPeriods:[{start:2011,end:2011,category:'other',note:{en:'In2011 Palestine had not yet received the UN non-member observer State status granted on29November2012. This dated map-unit outline does not settle sovereignty, borders or effective control.',zh:'2011年时，巴勒斯坦尚未获得2012年11月29日授予的联合国非会员观察员国地位。此有日期的地图单元轮廓不裁定主权、边界或实际控制。'}},{start:2012,end:2026,category:'observer-state',note:{en:note[0],zh:note[1]}}]}:{}),
    sources:[sources[0],sources[2],membershipSource,...(relatedSourceIndexes[code]||[]).map(i=>sources[i]),...(periodSources[code]?[periodSources[code]]:[])],
  },geometry:normalized(feature.geometry)};
});
// Do not promote obsolete armed-control lines to a 2026 map. Other source claim
// lines remain explicitly identified as source-vintage reference geometry.
const excludedLines=[];
const lines=JSON.parse(rawLines).features.filter(f=>{
  const p=f.properties;
  if(/Nagorno-Karabakh|Donestsk|Donblass|Luhansk/.test(p.BRK_NAME || '')) {
    excludedLines.push({sourceId:p.NE_ID,name:p.BRK_NAME,reason:'Old breakaway/control outline is unsuitable for contemporary display.'}); return false;
  }
  return true;
}).map((f,i)=>({type:'Feature',properties:{id:`contemporary-dispute-${f.properties.NE_ID || i}`,name:{en:f.properties.BRK_NAME || 'Disputed boundary',zh:'争议边界'},sourceType:f.properties.FEATURECLA,sourceNote:f.properties.NOTE,geometryVintage:2022},geometry:f.geometry}));
const excludedAreas=[];
const areas=JSON.parse(rawAreas).features.filter(f=>{
  const p=f.properties;
  if(/Artsakh|Donetsk|Luhansk/.test(p.BRK_NAME || '')) {
    excludedAreas.push({sourceId:p.NE_ID,name:p.BRK_NAME,reason:'Old breakaway/control area is unsuitable for contemporary display.'});return false;
  }
  return true;
}).map(f=>({type:'Feature',properties:{
  id:`contemporary-disputed-area-${f.properties.BRK_A3.toLowerCase()}`,
  code:f.properties.BRK_A3,name:{en:f.properties.NAME_EN || f.properties.BRK_NAME,zh:f.properties.NAME_ZH || f.properties.BRK_NAME},
  sourceName:f.properties.BRK_NAME,sourceId:f.properties.NE_ID,sourceType:f.properties.featurecla,
  sourceNote:f.properties.NOTE_BRK,geometryVintage:2022,reviewedYear:2026,
  note:{en:'Selected disputed or claimed area in the source’s 2022 reference geography. The neutral hatch marks a qualification; it does not assign sovereignty or indicate current military control.',zh:'来源2022版参考地理中的部分争议或领土主张地区。中性阴影用于提示限定，不划定主权，也不表示当前军事控制。'},
  sources:f.properties.BRK_NAME==='Crimea'?[sources[2],sources[8],sources[9]]:[sources[2]],
},geometry:normalized(f.geometry)}));
for(const f of [...lines,...areas]){
 const p=f.properties;p.sourceYear=2022;
 const name=p.name.en;
 const start=/Crime/i.test(name)?2014:name==='Disputed boundary'?2022:2011;
 p.contextValidity=contextValidity(start,[sources[2].url,...(/Crime/i.test(name)?[sources[8].url]:[])]);
}
const write=(filename,data)=>{const text=JSON.stringify(data);fs.writeFileSync(path.join(out,filename),text);return {file:filename,outputSha256:hash(text),featureCount:data.features.length,bytes:Buffer.byteLength(text)};};
for(const f of [...countries,...lines,...areas])featureText(f);for(const s of sources)sourceText(s);
for(const f of [...countries,...areas]) {
  if(!f.properties.name.en || !f.properties.name.zh || (f.properties.labelPoint || []).some(v=>!Number.isFinite(v))) throw Error('Missing localized name or focus point');
  const area=d3.geoArea(f);
  if(!(area>0 && area<Math.PI*2)) throw Error('Invalid spherical area '+f.properties.id);
  for(const make of [d3.geoEqualEarth,d3.geoNaturalEarth1,d3.geoEquirectangular]) {
    const value=d3.geoPath(make().fitSize([1000,500],{type:'Sphere'}))(f);
    if(!value || /NaN|Infinity/.test(value)) throw Error('Invalid projected path '+f.properties.id);
  }
}
const countryOutputs=[];let countryPart=[];
const countryCollection=features=>({type:'FeatureCollection',name:'Contemporary world reference',license:'Public domain',features});
function flushCountries(){if(!countryPart.length)return;const file=`contemporary-world-${String(countryOutputs.length+1).padStart(2,'0')}.geojson`;countryOutputs.push(write(file,countryCollection(countryPart)));countryPart=[];}
for(const f of countries){if(countryPart.length&&Buffer.byteLength(JSON.stringify(countryCollection([...countryPart,f])))>450000)flushCountries();countryPart.push(f);}flushCountries();
for(const file of fs.readdirSync(out).filter(f=>/^contemporary-world(?:-\d+)?\.geojson$/.test(f)))if(!countryOutputs.some(l=>l.file===file))fs.unlinkSync(path.join(out,file));
const lineOutput=write('disputed-lines.geojson',{type:'FeatureCollection',name:'Selected disputed/claim boundaries from Natural Earth 2022',license:'Public domain',features:lines});
const areaOutput=write('disputed-areas.geojson',{type:'FeatureCollection',name:'Selected disputed/claim areas from Natural Earth 2022',license:'Public domain',features:areas});
const metadata={
  version:2,reviewedYear:2026,reviewedAt:'2026-10-23',geometryVintage:2022,geometryLastChanged:'2022-05-13',
  mode:'contemporary-reference',automaticSelectionYears:Array.from({length:16},(_,i)=>2011+i),contextValidity:contextValidity(2011),
  historicalFallbacks:[{code:'RUS',polityId:'russia-modern',start:2011,end:2013},{code:'UKR',polityId:'ukraine',start:2011,end:2013}],
  title:{en:'Contemporary reference',zh:'当代地理参考'},
  coverage:{en:'242 mapped countries and territories at 1:50 million scale; this is not a count of sovereign states. Selected claim lines and 25 neutral hatched claim areas are shown separately. Small features and claims are generalized.',zh:'1:5000万比例尺的242个国家与地区地图单元，并非主权国家数量。部分领土主张线与25个中性阴影提示的主张地区单独显示。细小地区与主张经过概化。'},
  method:{en:'Natural Earth geometry released in2022, explicitly reviewed as reference context for2011–2026. Russia/Ukraine use separately licensed2010 historical outlines through2013; the2022 convention is eligible only from2014. Period names and categories are explicit. These are dated references, not annual border or military-control reconstructions.',zh:'Natural Earth于2022年发布的几何轮廓，经明确复核后用作2011—2026年的参考背景。俄罗斯与乌克兰在2013年及以前使用另有许可的2010年历史轮廓；2022版制图约定仅从2014年起适用。各时期的名称与分类单独规定。这些是有日期的参考图，不是逐年边界或军事控制重建。'},
  sourceRepository:'https://github.com/nvkelso/natural-earth-vector',sourceCommit:commit,sourceRelease:'v5.1.2',countryDatasetVersion:'5.1.1',license:'Public domain',licenseFile:'contemporary-world.LICENSE.md',
  layers:[...countryOutputs.map(l=>({...l,role:'countries',sourceFile:countryFile,sourceURL:base+countryFile,sourceSha256:hash(rawCountries)})),{...lineOutput,role:'disputed-lines',sourceFile:lineFile,sourceURL:base+lineFile,sourceSha256:hash(rawLines)},{...areaOutput,role:'disputed-areas',sourceFile:areaFile,sourceURL:base+areaFile,sourceSha256:hash(rawAreas)}],
  categories:Object.fromEntries(['country','dependency','observer-state','disputed','other'].map(k=>[k,countries.filter(f=>f.properties.category===k).length])),
  excludedLines,excludedAreas,knownLimits:[
    'No attempt to redraw current fighting fronts, occupied territories, or every sovereignty claim.',
    'The 2022 source convention differs from internationally recognized boundaries in several places, including Crimea. Country panels explicitly qualify this.',
    'Five obsolete breakaway/control line features for Nagorno-Karabakh and eastern Ukraine are excluded.',
    'Three obsolete breakaway/control area features for Artsakh, Donetsk and Luhansk are excluded. The remaining neutral hatches mark source claim areas, not present-day control.',
    'Country and territory names are translated by Natural Earth, with explicit display-name overrides recorded by the build script.',
    'Not all small territories survive 1:50m cartographic generalization. Map units are not a sovereign-state census.',
    'Earlier eligibility is an explicit dated-reference review, not proof that all2022 vertices applied in2011. SouthSudan is allowed from2011; earlier Sudan is a historical feature. Russia/Ukraine use separately licensed2010 fallback geometry through2013.',
    'Name periods cover Turkey/Türkiye2022, CzechRepublic/Czechia2016, Swaziland/Eswatini2018 and Macedonia/NorthMacedonia2019. Palestine’s observer-State category begins2012; in2011 it is labelled as a geographic/reference entity.',
  ],sources,
  validation:{...stats,projections:['EqualEarth','NaturalEarth1','Equirectangular'],finitePaths:true,interpretation:'Structural and display checks; not a survey of border accuracy.'},
};
localized(metadata.method);localized(metadata.contextValidity.note);metadata.knownLimits=metadata.knownLimits.map(english);
fs.writeFileSync(path.join(out,'contemporary-world.json'),JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify({countries:countryOutputs,disputedLines:lineOutput,disputedAreas:areaOutput,categories:metadata.categories,validation:metadata.validation},null,2));
