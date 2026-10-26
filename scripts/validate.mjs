#!/usr/bin/env node
// Structural checks only. Passing this script does not verify historical claims.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {CONTENT_MANIFEST,auditExpansion,partitionExpansion,applyEvidenceReviews} from '../dist/content-expansion.mjs';
import { journeys } from '../dist/journeys.mjs';
import { fileURLToPath } from 'node:url';
import { REGIONS, validYear, activeAt, safeSourceURL, validateRecords } from '../dist/core.mjs';
import { chinaRoutes } from '../dist/china-library.mjs';
import { applyChinaReviews, linkChinaContext } from '../dist/china-review.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// This inventory belongs to the pinned source release. It is deliberately
// independent of the generated manifest so a dropped row cannot redefine success.
const CHINA_SOURCE_COMMIT = 'fcd6484d06d3c581241fc24adbab288cf3a4a2ea';
const CHINA_COUNTS = {
  milestones:442, landmarkEvents:536, profiles:104, journeys:7, journeyStops:68,
  cityLore:87, gazetteer:185, settlements:1387, passes:20, eras:18,
  eraNames:342, phaseRules:165, corridors:16, audioTracks:5
};
const MILESTONES_BY_PERIOD = [29,11,29,29,16,9,23,27,12,48,18,30,24,17,40,49,19,12];
const SETTLEMENTS_BY_PERIOD = [38,39,61,47,40,37,45,47,43,100,50,87,70,59,116,132,184,192];

export function auditChinaImport(repoRoot = root, {readFile = filename => fs.readFileSync(filename)} = {}) {
  const errors = [], files = new Map();
  const fail = message => errors.push('China import: '+message);
  const readData = name => readFile(path.join(repoRoot,'dist/data',name));
  const bilingual = value => !!value && ['en','zh'].every(lang => typeof value[lang] === 'string' && value[lang].trim());
  const coordinate = value => Array.isArray(value) && value.length === 2 && value.every(Number.isFinite) && Math.abs(value[0]) <= 180 && Math.abs(value[1]) <= 90;
  const interval = value => validYear(value?.start) && validYear(value?.end) && value.start <= value.end;
  const safeFilename = value => typeof value === 'string' && /^[A-Za-z0-9.-]+$/.test(value) && !value.includes('..');
  const pointer = value => value?.file+':'+value?.path;
  let manifest;
  try { manifest = JSON.parse(readData('china-import-manifest.json')); }
  catch (error) { return {errors:['China import: cannot read manifest: '+error.message],events:[],library:{},settlements:[],manifest:{}}; }
  if (manifest.schemaVersion !== 1 || manifest.source?.commit !== CHINA_SOURCE_COMMIT) fail('unexpected schema or source release');
  if (manifest.source?.reviewStatus !== 'inherited' || !bilingual(manifest.source?.note)) fail('missing inherited evidence disclosure');
  for (const [key,count] of Object.entries(CHINA_COUNTS)) {
    if (manifest.sourceCounts?.[key] !== count || manifest.counts?.[key] !== count) fail('source inventory mismatch: '+key);
  }
  for (const [key,count] of Object.entries({sourceEventRows:978, importedEvents:975, mergedDuplicateRows:2, heldEvents:1, distinctSourceEvents:976})) {
    if (manifest.counts?.[key] !== count) fail('accounting mismatch: '+key);
  }
  const sourceFiles = new Map((manifest.source?.files || []).map(f => [f.path,f]));
  for (const name of ['js/map_data.js','js/lore_data.js','js/i18n_dict.js','LICENSE','README.md']) {
    const source = sourceFiles.get(name);
    if (!source || !/^[a-f0-9]{40}$/.test(source.gitBlobSha || '') || !/^[a-f0-9]{64}$/.test(source.sha256 || '') || source.url !== `${manifest.source.repository}/blob/${CHINA_SOURCE_COMMIT}/${name}`) fail('missing pinned provenance: '+name);
  }
  if (!safeFilename(manifest.source?.licenseNotice)) fail('invalid license notice path');
  else {
    try { const notice = String(readData(manifest.source.licenseNotice)); if (!notice.includes('MIT') || !/GPL|General Public License/.test(notice) || !notice.includes('DeanChensj')) fail('license notice must preserve both upstream notices and attribution'); }
    catch (error) { fail('missing license notice: '+error.message); }
  }
  function loadDescriptor(file) {
    if (!safeFilename(file?.path)) { fail('unsafe chunk path'); return null; }
    if (files.has(file.path)) { fail('duplicate chunk descriptor: '+file.path); return files.get(file.path).data; }
    try {
      const bytes = Buffer.from(readData(file.path));
      if (bytes.length !== file.bytes || crypto.createHash('sha256').update(bytes).digest('hex') !== file.sha256) fail(file.path+': checksum or byte-size mismatch');
      if (bytes.length >= 450000) fail(file.path+': exceeds chunk size limit');
      const data = JSON.parse(bytes);
      if (file.count !== undefined && (!Array.isArray(data) || data.length !== file.count)) fail(file.path+': row-count mismatch');
      files.set(file.path,{file,data});
      return data;
    } catch (error) { fail(file.path+': '+error.message); return null; }
  }
  const events = (manifest.eventFiles || []).flatMap(file => {
    const data = loadDescriptor(file); if (data && !Array.isArray(data)) fail(file.path+': expected event array'); return Array.isArray(data)?data:[];
  });
  for (const file of manifest.libraryFiles || []) loadDescriptor(file);
  const library = structuredClone(files.get('china-library.json')?.data || {});
  if (library.schemaVersion !== 1 || library.source?.commit !== CHINA_SOURCE_COMMIT) fail('library source/schema differs from manifest');
  function dependency(file) {
    const loaded = files.get(file?.path);
    if (!loaded || loaded.file.sha256 !== file.sha256 || loaded.file.bytes !== file.bytes || loaded.file.count !== file.count) fail('library dependency not covered by manifest: '+file?.path);
    return loaded?.data;
  }
  for (const file of library.placeFiles || []) {
    const data = dependency(file);
    if (data && !Array.isArray(data)) Object.assign(library,data); else fail('invalid place directory: '+file.path);
  }
  const settlements = (library.settlementFiles || []).flatMap(file => {
    const data = dependency(file); if (!Array.isArray(data)) fail('invalid settlement chunk: '+file.path); return Array.isArray(data)?data:[];
  });
  if (events.length !== 975) fail('mapped event total must be 975');
  errors.push(...validateRecords(events).map(message => 'China import: '+message));
  const eventById = new Map(events.map(r => [r.id,r])), sourcePointers = new Set();
  const milestonePointers = new Set(), landmarkPointers = new Set();
  for (const record of [...events,...(manifest.held || []).map(item => item.record)]) {
    if (!record?.provenance) { fail('event missing provenance'); continue; }
    const provenance = record.provenance;
    if (provenance.dataset !== 'jiangshan' || provenance.status !== 'inherited' || provenance.sourceCommit !== CHINA_SOURCE_COMMIT) fail(record.id+': inherited identity lost');
    if (!bilingual(provenance.note) || !Array.isArray(provenance.sourceRecords) || !provenance.sourceRecords.length) fail(record.id+': missing source disclosure or pointer');
    for (const source of record.sources || []) if (!source.url.includes('/blob/'+CHINA_SOURCE_COMMIT+'/')) fail(record.id+': raw import source is not frozen');
    for (const p of provenance.sourceRecords || []) {
      const key = pointer(p);
      if (sourcePointers.has(key)) fail('source row is represented twice: '+key);
      sourcePointers.add(key);
      if (p.file === 'js/map_data.js' && /^\/DYNASTY_DATA\/\d+\/milestones\/\d+$/.test(p.path)) milestonePointers.add(p.path);
      else if (p.file === 'js/lore_data.js' && /^\/ATLAS_LORE_DATA\/PLACE_LANDMARK_EVENTS\/\d+$/.test(p.path)) landmarkPointers.add(p.path);
      else fail(record.id+': unexpected event source pointer '+key);
      if (Number(p.path?.split('/').at(-1)) !== p.index) fail(record.id+': source index differs from pointer');
    }
  }
  if (sourcePointers.size !== 978 || milestonePointers.size !== 442 || landmarkPointers.size !== 536) fail('source-row accounting is incomplete');
  MILESTONES_BY_PERIOD.forEach((count,period) => { for (let i=0;i<count;i++) if (!milestonePointers.has(`/DYNASTY_DATA/${period}/milestones/${i}`)) fail(`missing milestone source row ${period}/${i}`); });
  for (let i=0;i<536;i++) if (!landmarkPointers.has('/ATLAS_LORE_DATA/PLACE_LANDMARK_EVENTS/'+i)) fail('missing landmark source row '+i);
  const duplicatePointers = new Set();
  if (manifest.merged?.length !== 2) fail('duplicate ledger must account for two rows');
  for (const duplicate of manifest.merged || []) {
    const retained = eventById.get(duplicate.retainedId), key = pointer(duplicate.sourceRecord);
    if (!retained || eventById.has(duplicate.sourceId) || !retained.provenance.sourceRecords.some(p => pointer(p) === key) || !duplicate.reason || duplicatePointers.has(key)) fail('invalid duplicate ledger pointer: '+duplicate.sourceId);
    duplicatePointers.add(key);
  }
  if (events.reduce((n,r) => n+(r.provenance?.sourceRecords?.length || 0)-1,0) !== duplicatePointers.size) fail('unexplained merged source rows');
  if (manifest.held?.length !== 1) fail('held ledger must retain one row');
  for (const held of manifest.held || []) if (!held.record || held.id !== held.record.id || eventById.has(held.id) || !bilingual(held.reason)) fail('invalid held event: '+held.id);
  for (const amendment of manifest.amendments || []) {
    const record = eventById.get(amendment.id);
    if (!record || JSON.stringify(record.title) !== JSON.stringify(amendment.displayedTitle) || JSON.stringify(record.provenance.originalText?.title) !== JSON.stringify(amendment.originalTitle) || !bilingual(amendment.reason)) fail('amendment lost its original or displayed text: '+amendment.id);
  }
  const uniqueIds = new Set(events.map(r => r.id));
  function directory(rows,name) {
    if (!Array.isArray(rows) || rows.length !== CHINA_COUNTS[name]) { fail('directory total mismatch: '+name); return; }
    for (const row of rows) {
      if (!row?.id || uniqueIds.has(row.id)) fail('duplicate or missing directory ID: '+row?.id);
      uniqueIds.add(row?.id);
    }
  }
  for (const name of ['profiles','journeys','cityLore','gazetteer','passes','eras','eraNames','corridors']) directory(library[name],name);
  directory(settlements,'settlements');
  const eraIds = new Set((library.eras || []).map(era => era.id)), journeyIds = new Set((library.journeys || []).map(j => j.id));
  for (const profile of library.profiles || []) {
    if (!bilingual(profile.name) || !bilingual(profile.subtitle) || !Array.isArray(profile.aliases) || profile.aliases.some(a => typeof a !== 'string')) fail(profile.id+': invalid searchable profile');
    if (!Array.isArray(profile.span) || profile.span.length !== 2 || !profile.span.every(validYear) || profile.span[0] > profile.span[1]) fail(profile.id+': invalid profile lifespan');
    if (!eraIds.has(profile.periodId) || !Array.isArray(profile.eventIds) || profile.eventIds.some(id => !eventById.has(id)) || (profile.journeyId && !journeyIds.has(profile.journeyId))) fail(profile.id+': broken directory reference');
    if (profile.reviewStatus !== 'inherited' || !profile.linkMeaning || !profile.sourceRecord) fail(profile.id+': missing profile evidence limitation');
  }
  let stopCount = 0;
  for (const journey of library.journeys || []) {
    if (!interval(journey) || !bilingual(journey.title) || journey.reviewStatus !== 'inherited' || journey.geometryPrecision !== 'schematic') fail(journey.id+': invalid source chronicle metadata');
    if (!Array.isArray(journey.stops) || journey.stops.length < 2) fail(journey.id+': chronicle requires stops');
    for (const stop of journey.stops || []) {
      stopCount++;
      if (uniqueIds.has(stop.id) || !stop.id) fail('duplicate or missing chronicle stop ID: '+stop.id); uniqueIds.add(stop.id);
      if (!validYear(stop.year) || !coordinate([stop.location?.lon,stop.location?.lat]) || !bilingual(stop.place) || !bilingual(stop.title) || !bilingual(stop.description) || !bilingual(stop.quotation)) fail(stop.id+': incomplete dated chronicle stop');
      if (stop.personalPresenceVerified !== false) fail(stop.id+': inherited sequence must not assert verified personal travel');
    }
  }
  if (stopCount !== 68) fail('chronicle stop total must be 68');
  for (const name of ['cityLore','gazetteer','passes']) for (const place of library[name] || []) {
    if (!bilingual(place.name) || !coordinate(place.coord) || place.reviewStatus !== 'inherited' || !place.sourceRecord) fail(place.id+': invalid place directory row');
    if (place.aliases !== undefined && (!Array.isArray(place.aliases) || place.aliases.some(alias => typeof alias !== 'string'))) fail(place.id+': invalid place aliases');
  }
  const settlementPointers = new Set();
  for (const place of settlements) {
    if (!interval(place) || !coordinate(place.coord) || !bilingual(place.name) || !eraIds.has(place.periodId)) fail(place.id+': invalid era-place interval or coordinate');
    const provenance = place.provenance, key = pointer(provenance?.sourceRecord);
    if (provenance?.status !== 'inherited' || !provenance.dateMeaning || settlementPointers.has(key)) fail(place.id+': missing display-window disclosure or duplicate pointer');
    settlementPointers.add(key);
  }
  SETTLEMENTS_BY_PERIOD.forEach((count,period) => { for (let i=0;i<count;i++) if (!settlementPointers.has(`js/map_data.js:/DYNASTY_DATA/${period}/settlements/${i}`)) fail(`missing era-place source row ${period}/${i}`); });
  for (const era of library.eras || []) if (!interval(era) || !bilingual(era.name) || era.intervalMeaning !== 'reference-display-window') fail(era.id+': invalid display period');
  if ((library.eras || []).reduce((n,era) => n+(era.phases?.length || 0),0) !== 165) fail('phase-rule total must be 165');
  for (const era of library.eraNames || []) if (!interval(era) || !era.name || !bilingual(era.ruler) || !era.meaning) fail(era.id+': invalid reign convention');
  for (const corridor of library.corridors || []) {
    if (!interval(corridor) || corridor.geometryPrecision !== 'schematic' || corridor.reviewStatus !== 'inherited') fail(corridor.id+': invalid schematic corridor');
    if (!Array.isArray(corridor.segments) || corridor.segments.some(segment => !Array.isArray(segment) || segment.length < 2 || segment.some(point => !coordinate(point)))) fail(corridor.id+': invalid corridor coordinates');
  }
  return {errors,manifest,events,library,settlements,chunksChecked:files.size,sourcePointers:sourcePointers.size};
}

export function validateAtlas(repoRoot = root, {quiet = false} = {}) {
const root = repoRoot;
const errors = [];
const fail = message => errors.push(message);
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
let histories = ['history.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(file=>JSON.parse(read('dist/data/'+file)));
const expansionManifest=JSON.parse(read('dist/data/'+CONTENT_MANIFEST));
for(const file of expansionManifest.files) {
  const bytes=fs.readFileSync(path.join(root,'dist/data',file.file));
  if(bytes.length!==file.bytes||crypto.createHash('sha256').update(bytes).digest('hex')!==file.sha256)fail(file.file+': content manifest checksum mismatch');
  if(bytes.length>450000)fail(file.file+': content chunk exceeds 450 KB');
  if(JSON.parse(bytes).length!==file.records)fail(file.file+': manifest record count mismatch');
}
const expansionRecords=expansionManifest.files.flatMap(f=>JSON.parse(read('dist/data/'+f.file)));
const additions=partitionExpansion(expansionRecords);histories.push(...additions.histories);
let people = [...JSON.parse(read('dist/data/people.json')),...additions.people];
if(expansionManifest.evidenceReviewsFile) {
  try {
    const reviewedNarratives=new Map(applyEvidenceReviews([...histories,...people],JSON.parse(read('dist/data/'+expansionManifest.evidenceReviewsFile))).map(r=>[r.id,r]));
    histories=histories.map(r=>reviewedNarratives.get(r.id));people=people.map(r=>reviewedNarratives.get(r.id));
  } catch(error) { fail('Editorial evidence follow-up: '+error.message); }
}
const chinaImport = auditChinaImport(root);
errors.push(...chinaImport.errors);
const chinaReviews = JSON.parse(read('dist/data/china-reviews.json'));
let reviewedChina = {events:chinaImport.events,library:chinaImport.library};
try { reviewedChina = applyChinaReviews(chinaImport.events,chinaImport.library,chinaReviews); }
catch (error) { fail('China review overlay: '+error.message); }
for (const review of [...(chinaReviews.eventReviews || []),...(chinaReviews.chronicleReviews || [])]) {
  if (!review.note?.en || !review.note?.zh || !review.sources?.length || review.sources.some(source => !safeSourceURL(source.url) || !source.title || !source.publisher || !source.evidenceNote)) fail('China review overlay: missing claim-specific note or evidence');
}
const records = [...histories,...people,...linkChinaContext(reviewedChina.events,[...histories,...people])];
const routes = [...JSON.parse(read('dist/data/routes.json')),...chinaRoutes(reviewedChina.library,chinaImport.manifest)];
const courses = [...JSON.parse(read('dist/data/courses.json')),...JSON.parse(read('dist/data/'+expansionManifest.coursesFile))];
errors.push(...auditExpansion(expansionRecords,expansionManifest,records));
errors.push(...validateRecords(records));
const ids = new Set(Array.isArray(records) ? records.map(r => r?.id) : []);
const sourcePages = new Set();
let usCanadaReferenceUnits=0;
try {
 const metadata=JSON.parse(read('dist/data/'+expansionManifest.geographicReferenceFile));
 const lookup=JSON.parse(read('dist/data/'+expansionManifest.geographicIndexFile));
 if(metadata.role!=='modern-reference'||metadata.sourceRelease!=='5.1.1'||metadata.sourceReleaseYear!==2022||metadata.license!=='public-domain')fail('US/Canada: invalid reference meaning or source release');
 if(!read('dist/data/'+metadata.licenseFile).includes('public domain'))fail('US/Canada: missing public-domain notice');
 if(lookup.schemaVersion!==1||lookup.contentVersion!==expansionManifest.version||lookup.referenceRelease!==metadata.sourceRelease)fail('US/Canada: stale geographic history index');
 const areaIds=new Set();
 for(const layer of metadata.layers||[]){
  if(!/^[a-z0-9.-]+$/.test(layer.file||'')){fail('US/Canada: unsafe layer filename');continue;}
  const bytes=fs.readFileSync(path.join(root,'dist/data',layer.file)),geo=JSON.parse(bytes);
  if(bytes.length!==layer.bytes||bytes.length>450000||crypto.createHash('sha256').update(bytes).digest('hex')!==layer.sha256)fail(layer.file+': geographic reference checksum/size mismatch');
  if(geo.type!=='FeatureCollection'||geo.features?.length!==layer.features||layer.features!==(layer.country==='USA'?51:13))fail(layer.file+': geographic reference inventory mismatch');
  for(const feature of geo.features||[]){
   const p=feature.properties;
   if(areaIds.has(p.id)||p.country!==layer.country||p.role!=='modern-administrative-reference'||p.sourceRelease!==metadata.sourceRelease||!p.name?.en||!p.name?.zh)fail('US/Canada: invalid/duplicate reference unit '+p.id);
   if(['sourceYear','start','end','contextValidity'].some(key=>p[key]!==undefined))fail(p.id+': reference must not claim historical date validity');
   areaIds.add(p.id);
  }
 }
 usCanadaReferenceUnits=areaIds.size;
 if(areaIds.size!==64||Object.keys(lookup.areas||{}).length!==64)fail('US/Canada: expected exactly64 administrative units');
 const recordById=new Map(records.map(r=>[r.id,r]));
 const associations=JSON.parse(read('dist/data/'+expansionManifest.geographicAssociationsFile));
 const associationKeys=new Set();
 for(const association of associations){
  const key=association.areaId+':'+association.recordId,link=lookup.areas[association.areaId]?.find(item=>item.recordId===association.recordId);
  const {place,note,sources,checkedAt}=association;
  if(associationKeys.has(key)||!link?.roles.includes('editorial')||JSON.stringify(link.locationAssociation)!==JSON.stringify({place,note,sources,checkedAt})||!place?.en||!place?.zh||!note?.en||!note?.zh||!sources?.length||sources.some(s=>!safeSourceURL(s.url)||!s.evidenceNote||!s.checkedAt))fail('US/Canada: incomplete named-place association '+key);
  associationKeys.add(key);
  for(const source of sources||[])if(safeSourceURL(source.url)){const url=new URL(source.url);url.hash='';sourcePages.add(url.href);}
 }
 for(const [areaId,links]of Object.entries(lookup.areas||{})){
  if(!areaIds.has(areaId)||!Array.isArray(links)){fail('US/Canada: unknown or malformed area '+areaId);continue;}
  const linkedIds=new Set();
  for(const link of links){
   const record=recordById.get(link.recordId);
   if(!record||record.region!=='north-america'||linkedIds.has(link.recordId)||!link.roles?.length||link.roles.some(role=>!['representative','milestone','editorial'].includes(role))||!Array.isArray(link.milestoneYears)||link.milestoneYears.some(year=>!validYear(year)||!record.milestones?.some(m=>m.year===year)))fail(areaId+': invalid linked history '+link.recordId);
   if(link.roles?.includes('editorial')&&!associationKeys.has(areaId+':'+link.recordId))fail('US/Canada: undeclared editorial link '+link.recordId);
   linkedIds.add(link.recordId);
  }
 }
 for(const source of metadata.sources||[]){if(!safeSourceURL(source.url)||!source.evidenceNote||!source.checkedAt)fail('US/Canada: incomplete geographic source');else{const url=new URL(source.url);url.hash='';sourcePages.add(url.href);}}
}catch(error){fail('US/Canada reference: '+error.message);}
const counts = Object.fromEntries(REGIONS.map(region => [region, 0]));
function checkContext(interval,label) {
  if(!interval||!validYear(interval.start)||!validYear(interval.end)||interval.start>interval.end) { fail(label+': invalid reviewed display interval'); return; }
  if(typeof interval.backwardReviewed!=='boolean')fail(label+': missing backward-review decision');
  if(!interval.note?.en||!interval.note?.zh)fail(label+': missing bilingual context note');
  if(!Array.isArray(interval.evidence)||!interval.evidence.length||interval.evidence.some(url=>!safeSourceURL(url)))fail(label+': missing context evidence');
  for(const url of interval.evidence||[])if(safeSourceURL(url)){const u=new URL(url);u.hash='';sourcePages.add(u.href);}
}

for (const r of Array.isArray(records) ? records : []) {
  if (!r || typeof r !== 'object') continue;
  if (counts[r.region] !== undefined) counts[r.region]++;
  if(r.relatedIds!==undefined&&(!Array.isArray(r.relatedIds)||r.relatedIds.some(id=>!ids.has(id)||id===r.id)))fail(r.id+': invalid related reading references');
  if(r.keyFacts!==undefined&&['en','zh'].some(lang=>!Array.isArray(r.keyFacts[lang])||r.keyFacts[lang].some(fact=>typeof fact!=='string'||!fact.trim())))fail(r.id+': invalid bilingual key facts');
  const localSources = new Set();
  for (const source of Array.isArray(r.sources) ? r.sources : []) {
    if (!source || !safeSourceURL(source.url)) continue;
    const url = new URL(source.url);
    if (localSources.has(url.href)) fail(r.id + ': duplicate source URL ' + url.href);
    localSources.add(url.href);
    url.hash = '';
    sourcePages.add(url.href);
  }
}
for (const region of REGIONS) if (!counts[region]) fail('Missing regional coverage: ' + region);

const journeyIds = new Set();
for (const journey of journeys) {
  if (journeyIds.has(journey.id)) fail('Duplicate journey ID: ' + journey.id);
  journeyIds.add(journey.id);
  if (journey.stops.length < 2) fail(journey.id + ': fewer than two stops');
  if (journey.year !== undefined && !validYear(journey.year)) fail(journey.id + ': invalid fixed year');
  for (const id of journey.stops) {
    if (!ids.has(id)) { fail(journey.id + ': unknown stop ' + id); continue; }
    if (journey.year !== undefined && !activeAt(records.find(r => r.id === id), journey.year)) {
      fail(journey.id + ': stop ' + id + ' does not cover its fixed year');
    }
  }
}
for (const name of ['world-1200','city-making','knowledge','connections','living-landscapes','participation']) {
  if (!journeyIds.has(name)) fail('Missing named journey: ' + name);
}
const fixedJourney = journeys.find(j => j.id === 'world-1200');
if (fixedJourney && fixedJourney.year !== 1200) fail('world-1200 must retain the exact year 1200.');
if (fixedJourney) {
  const regions = new Set(fixedJourney.stops.map(id => records.find(r => r.id === id)?.region));
  if (regions.size !== 9) fail('world-1200 must cover all nine regions.');
}

const provenance = JSON.parse(read('dist/assets/PROVENANCE.json'));
if (!Array.isArray(provenance.assets) || !provenance.assets.length) fail('Asset provenance is empty.');
for (const asset of provenance.assets || []) {
  if (!asset || !/^[A-Za-z0-9._-]+$/.test(asset.file || '') || !/^[A-Za-z0-9._-]+$/.test(asset.licenseFile || '')) {
    fail('Asset provenance has an invalid local filename.');
    continue;
  }
  if (!/^[a-f0-9]{64}$/.test(asset.sha256 || '')) fail(asset.file + ': missing SHA-256');
  if (!/^[a-f0-9]{40}$/.test(asset.sourceCommit || '')) fail(asset.file + ': missing pinned source commit');
  if (!safeSourceURL(asset.sourceRepository)) fail(asset.file + ': invalid source repository URL');
  if (typeof asset.license !== 'string' || !asset.license.trim()) fail(asset.file + ': missing license');
  try {
    const bytes = fs.readFileSync(path.join(root, 'dist/assets', asset.file));
    const digest = crypto.createHash('sha256').update(bytes).digest('hex');
    if (digest !== asset.sha256) fail(asset.file + ': checksum mismatch; review the replacement and update provenance');
    if (!read('dist/assets/' + asset.licenseFile).trim()) fail(asset.file + ': empty license file');
  } catch (error) { fail(asset.file + ': ' + error.message); }
}
for (const filename of ['land.geojson','d3.v7.9.0.min.js','countries.geojson','rivers.geojson']) {
  if (!provenance.assets?.some(a => a.file === filename)) fail('Missing asset provenance: ' + filename);
}
const land = JSON.parse(read('dist/assets/land.geojson'));
if (land.type !== 'FeatureCollection' || !Array.isArray(land.features) || !land.features.length) {
  fail('Physical land geometry is missing.');
}


// Validate interactive historical layers without treating structural checks as fact review.
for (const person of people) {
  if (person.kind !== 'person') fail(person.id + ': biography needs person kind');
  if (!Array.isArray(person.milestones) || person.milestones.length < 2) fail(person.id + ': insufficient milestones');
  for (const m of person.milestones || []) {
    if (!validYear(m.year)) fail(person.id + ': invalid milestone year');
    if (!m.title?.en || !m.title?.zh || !m.description?.en || !m.description?.zh) fail(person.id + ': incomplete bilingual milestone');
    if (!Number.isFinite(m.location?.lat) || Math.abs(m.location.lat) > 90 || !Number.isFinite(m.location?.lon) || Math.abs(m.location.lon) > 180) fail(person.id + ': invalid milestone coordinate');
  }
}
const routeIds=new Set();
for (const route of routes) {
  if (routeIds.has(route.id)) fail('Duplicate route ID: '+route.id); routeIds.add(route.id);
  if (!validYear(route.start)||!validYear(route.end)||route.start>route.end) fail(route.id+': invalid route dates');
  for(const key of ['title','summary']) if(!route[key]?.en||!route[key]?.zh) fail(route.id+': missing bilingual '+key);
  if (!['journey','network'].includes(route.kind)) fail(route.id+': invalid route kind');
  if (!route.sources?.length||route.sources.some(s=>!safeSourceURL(s.url))) fail(route.id+': invalid sources');
  const stopIds = new Set((route.stops||[]).map(s=>s.id));
  if (stopIds.size !== route.stops?.length || stopIds.size < 2) fail(route.id+': invalid stops');
  for(const s of route.stops||[]) {
    if (!Number.isFinite(s.lat)||Math.abs(s.lat)>90||!Number.isFinite(s.lon)||Math.abs(s.lon)>180) fail(route.id+': invalid stop coordinates');
    if (s.year !== undefined && s.year !== null && !validYear(s.year)) fail(route.id+': invalid stop date');
    if (!s.label?.en || !s.label?.zh) fail(route.id+': missing bilingual stop');
  }
  if (route.kind==='network'&&!Array.isArray(route.legs)) fail(route.id+': networks need explicit sourced legs');
  for(const leg of route.legs||[]) if(!stopIds.has(leg.from)||!stopIds.has(leg.to)||leg.from===leg.to) fail(route.id+': invalid route leg');
}
const snapshots=JSON.parse(read('dist/data/map-snapshots.json'));
const historicalGeo={type:'FeatureCollection',features:[]};
for(const layer of snapshots.layers||[]) {
 if(!/^[a-z0-9.-]+$/.test(layer.file||'')||!/^[a-zA-Z0-9.-]+$/.test(layer.licenseFile||'')){fail('Invalid map layer path');continue;}
 try {
  const bytes=fs.readFileSync(path.join(root,'dist/data',layer.file));
  if(crypto.createHash('sha256').update(bytes).digest('hex')!==layer.outputSha256)fail(layer.file+': map checksum mismatch');
  const data=JSON.parse(bytes);
  if(data.type!=='FeatureCollection'||!Array.isArray(data.features))fail(layer.file+': invalid collection');
  else {historicalGeo.features.push(...data.features);if(data.features.length!==layer.featureCount)fail(layer.file+': feature count mismatch');}
  if(!read('dist/data/'+layer.licenseFile).trim())fail(layer.file+': missing notice');
 } catch(error){fail(layer.file+': '+error.message);}
}
if(!historicalGeo.features.length)fail('No historical map layers.');
const featureIds=new Set();
for (const f of historicalGeo.features || []) {
 const p=f.properties||{};
 if(featureIds.has(p.id))fail('Duplicate territory ID: '+p.id);featureIds.add(p.id);
 if(!validYear(p.year))fail(p.id+': invalid snapshot date');
 if(p.sourceYear!==undefined&&p.sourceYear!==p.year)fail(p.id+': source year differs from the documented snapshot');
 if(p.contextValidity)checkContext(p.contextValidity,p.id);
 if(!p.name?.en||!p.name?.zh||!p.sources?.length)fail(p.id+': missing territory evidence');
 for(const s of p.sources||[])if(!safeSourceURL(s.url))fail(p.id+': unsafe source URL');
 if(!/^#[0-9a-f]{6}$/i.test(p.color||''))fail(p.id+': invalid color');
 if(!['Polygon','MultiPolygon'].includes(f.geometry?.type))fail(p.id+': invalid geometry');
 function coordinates(value){if(typeof value?.[0]==='number'){if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||Math.abs(value[0])>180.001||Math.abs(value[1])>90.001)fail(p.id+': invalid geometry coordinate');}else if(Array.isArray(value))value.forEach(coordinates);else fail(p.id+': malformed coordinates');}
 coordinates(f.geometry?.coordinates);
}
const snapshotYears=new Set(),snapshotMembers=new Set();
for(const s of snapshots.snapshots||[]){
 if(!validYear(s.year)||snapshotYears.has(s.year))fail('Invalid or duplicate snapshot year');snapshotYears.add(s.year);
 if(s.featureIds?.length!==s.featureCount)fail(s.year+': snapshot count mismatch');
 for(const id of s.featureIds||[]){
  const feature=historicalGeo.features.find(f=>f.properties.id===id);
  if(!feature)fail('Missing snapshot feature '+id);
  else if(feature.properties.year!==s.year)fail(id+': snapshot year mismatch');
  if(snapshotMembers.has(id))fail(id+': repeated snapshot membership');snapshotMembers.add(id);
 }
}
for(const id of featureIds)if(!snapshotMembers.has(id))fail(id+': unlisted snapshot feature');
const contemporaryMeta=JSON.parse(read('dist/data/contemporary-world.json'));
const contemporaryGeo={type:'FeatureCollection',features:[]};
if(!validYear(contemporaryMeta.reviewedYear)||!Number.isInteger(contemporaryMeta.geometryVintage)||contemporaryMeta.geometryVintage>contemporaryMeta.reviewedYear)fail('Invalid contemporary review/source dates');
if(contemporaryMeta.mode!=='contemporary-reference')fail('Contemporary geometry must be explicitly identified as reference geography');
if(contemporaryMeta.contextValidity)checkContext(contemporaryMeta.contextValidity,'Contemporary collection');
else if(JSON.stringify(contemporaryMeta.automaticSelectionYears)!==JSON.stringify([contemporaryMeta.reviewedYear]))fail('Contemporary reference needs an explicit reviewed display period');
if(!read('dist/data/'+contemporaryMeta.licenseFile).trim())fail('Missing contemporary data notice');
for(const layer of contemporaryMeta.layers||[]){
 if(!/^[a-z0-9.-]+$/.test(layer.file||'')){fail('Invalid contemporary layer path');continue;}
 const bytes=fs.readFileSync(path.join(root,'dist/data',layer.file));
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==layer.outputSha256)fail(layer.file+': contemporary checksum mismatch');
 const geo=JSON.parse(bytes);
 if(geo.type!=='FeatureCollection'||geo.features?.length!==layer.featureCount)fail(layer.file+': contemporary feature count mismatch');
 if(layer.role==='countries'||layer.file.startsWith('contemporary-world'))contemporaryGeo.features.push(...(geo.features||[]));
 else for(const feature of geo.features||[])if(feature.properties?.contextValidity)checkContext(feature.properties.contextValidity,feature.properties.id||layer.file);
}
if(!contemporaryGeo.features.length)fail('No contemporary country layers.');
const contemporaryIds=new Set(),contemporaryCodes=new Set(),countryCategories={};
for(const f of contemporaryGeo.features||[]){
 const p=f.properties;
 if(contemporaryIds.has(p.id)||contemporaryCodes.has(p.code))fail(p.id+': duplicate contemporary identifier');
 contemporaryIds.add(p.id);contemporaryCodes.add(p.code);
 if(!p.name?.en||!p.name?.zh||!['country','dependency','observer-state','disputed','other'].includes(p.category))fail(p.id+': incomplete country metadata');
 if(p.reviewedYear!==contemporaryMeta.reviewedYear||p.geometryVintage!==contemporaryMeta.geometryVintage)fail(p.id+': contemporary dates do not match metadata');
 if(p.contextValidity)checkContext(p.contextValidity,p.id);
 for(const period of p.namePeriods||[])if(!validYear(period.start)||!validYear(period.end)||period.start>period.end||!period.name?.en||!period.name?.zh)fail(p.id+': invalid historical name period');
 for(const period of p.categoryPeriods||[])if(!validYear(period.start)||!validYear(period.end)||period.start>period.end||!['country','dependency','observer-state','disputed','other'].includes(period.category))fail(p.id+': invalid historical category period');
 if(!Array.isArray(p.labelPoint)||p.labelPoint.length!==2||!p.labelPoint.every(Number.isFinite)||Math.abs(p.labelPoint[0])>180||Math.abs(p.labelPoint[1])>90)fail(p.id+': invalid label point');
 if(!['Polygon','MultiPolygon'].includes(f.geometry?.type))fail(p.id+': invalid contemporary geometry');
 if(!p.sources?.length||p.sources.some(s=>!safeSourceURL(s.url)))fail(p.id+': missing country evidence');
 countryCategories[p.category]=(countryCategories[p.category]||0)+1;
}
for(const [category,count] of Object.entries(contemporaryMeta.categories||{}))if(countryCategories[category]!==count)fail('Contemporary category count mismatch: '+category);
for(const source of contemporaryMeta.sources||[]){if(!safeSourceURL(source.url))fail('Invalid contemporary source URL');else{const u=new URL(source.url);u.hash='';sourcePages.add(u.href);}}
const courseIds=new Set();
for(const c of courses){
 if(courseIds.has(c.id))fail('Duplicate course ID: '+c.id);courseIds.add(c.id);
 for(const key of ['title','summary','activity'])if(!c[key]?.en||!c[key]?.zh)fail(c.id+': missing bilingual '+key);
 if(!Array.isArray(c.recordIds)||c.recordIds.length<2||c.recordIds.some(id=>!ids.has(id)))fail(c.id+': invalid reading references');
 if(!Array.isArray(c.routeIds)||c.routeIds.some(id=>!routeIds.has(id)))fail(c.id+': invalid route references');
 if(!c.questions?.length||c.questions.some(q=>!q.en||!q.zh))fail(c.id+': incomplete teaching prompts');
}
for(const r of [...routes,...historicalGeo.features.map(f=>f.properties)])for(const source of r.sources||[]){
 if(!safeSourceURL(source.url))continue;const u=new URL(source.url);u.hash='';sourcePages.add(u.href);
}
for(const file of ['countries.geojson','rivers.geojson']){const geo=JSON.parse(read('dist/assets/'+file));if(geo.type!=='FeatureCollection'||!geo.features?.length)fail(file+': empty reference layer');}

let regionalReferenceUnits=0,regionalReferenceGroups=0;
try {
 const meta=JSON.parse(read('dist/data/regional-reference.json')),units=[];
 if(meta.role!=='modern-reference'||meta.sourceRelease!=='5.1.1'||meta.sourceReleaseYear!==2022||meta.contentVersion!=='0.11.0')fail('Worldwide regional reference: source/content version mismatch');
 const addition=JSON.parse(read('dist/data/'+(expansionManifest.regionalHistoryFile||'regional-history-v13.json')));
 if(addition.contentVersion!==expansionManifest.version||addition.sourceRelease!==meta.sourceRelease)fail('Worldwide regional history addition is stale');
 if(!read('dist/data/'+meta.licenseFile).includes('public domain'))fail('Worldwide regional reference: missing source notice');
 const regions=new Set(),sourceIds=new Set();
 for(const country of meta.countries||[]){
  const group=[];if(!country.name?.en||!country.name?.zh||!country.code||!country.layers?.length)fail('Invalid source administrative group');
  for(const layer of country.layers||[]){
   if(!/^regional-[a-z]{3}-[0-9]+\.geojson$/.test(layer.file||'')){fail('Unsafe regional shard filename');continue;}
   const bytes=fs.readFileSync(path.join(root,'dist/data',layer.file)),geo=JSON.parse(bytes);
   if(bytes.length!==layer.bytes||bytes.length>450000||crypto.createHash('sha256').update(bytes).digest('hex')!==layer.sha256||geo.features?.length!==layer.features)fail(layer.file+': regional shard contract mismatch');
   group.push(...(geo.features||[]));
  }
  if(group.length!==country.count)fail(country.code+': regional count mismatch');
  for(const f of group){const p=f.properties;if(regions.has(p.id)||sourceIds.has(p.sourceId)||p.country!==country.code||p.role!=='modern-administrative-reference'||p.sourceRelease!==meta.sourceRelease||!p.name?.en||!p.name?.zh||!Array.isArray(p.historyLinks))fail('Invalid regional unit '+p.id);regions.add(p.id);sourceIds.add(p.sourceId);
   if(['year','sourceYear','start','end','contextValidity'].some(k=>p[k]!==undefined))fail(p.id+': modern reference must not claim historical validity');
   const linked=new Set();for(const link of p.historyLinks||[]){if(!ids.has(link.recordId)||linked.has(link.recordId)||!link.roles?.length||link.roles.some(r=>!['representative','milestone','editorial'].includes(r))||!Array.isArray(link.milestoneYears)||link.milestoneYears.some(y=>!validYear(y)))fail(p.id+': invalid regional history link');linked.add(link.recordId);}
  }units.push(...group);
 }
 regionalReferenceUnits=units.length;regionalReferenceGroups=meta.countries.length;
 if(regionalReferenceUnits!==4596||regionalReferenceGroups!==251||meta.counts.features!==regionalReferenceUnits)fail('Worldwide regional reference source inventory mismatch');
 for(const source of meta.sources||[])if(safeSourceURL(source.url)){const url=new URL(source.url);url.hash='';sourcePages.add(url.href);}else fail('Unsafe regional source URL');
}catch(error){fail('Worldwide regional reference: '+error.message);}
const report = {
    records: records.length,
    regions: Object.keys(counts).length,
    regionCounts: counts,
    uniqueSourcePages: sourcePages.size,
    journeys: journeys.length,
    fixedYear1200Stops: fixedJourney?.stops.length,
    people: people.length,
    peopleMilestones: people.reduce((n,r)=>n+(r.milestones?.length||0),0),
    routes: routes.length,
    routeStops: routes.reduce((n,r)=>n+r.stops.length,0),
    studyGuides: courses.length,
    mapSnapshots: snapshots.snapshots.length,
    historicalTerritories: historicalGeo.features.length,
    historicalPolities: new Set(historicalGeo.features.map(f=>f.properties.polityId)).size,
    regionalReferenceUnits,regionalReferenceGroups,
    usCanadaReferenceUnits,
    contemporaryMapUnits: contemporaryGeo.features.length,
    contemporaryReferenceYear: contemporaryMeta.reviewedYear,
    contemporaryGeometryVintage: contemporaryMeta.geometryVintage,
    vendoredAssetsChecked: provenance.assets.length,
    chinaImport: {
      sourceRows:chinaImport.sourcePointers,
      mappedEvents:chinaImport.events.length,
      mergedDuplicateRows:chinaImport.manifest.merged?.length,
      heldEvents:chinaImport.manifest.held?.length,
      profiles:chinaImport.library.profiles?.length,
      chronicles:chinaImport.library.journeys?.length,
      chronicleStops:chinaImport.library.journeys?.reduce((n,j) => n+j.stops.length,0),
      eraPlaceRows:chinaImport.settlements.length,
      reignRows:chinaImport.library.eraNames?.length,
      chunksChecked:chinaImport.chunksChecked,
      reviewedEvents:chinaReviews.eventReviews?.length || 0,
      annotatedChronicleStops:chinaReviews.chronicleReviews?.length || 0
    }
};
if (errors.length) {
  if (!quiet) console.error('Structural validation failed (' + errors.length + '):\n' + errors.map(e => '- ' + e).join('\n'));
} else if (!quiet) {
  console.log('Structural validation passed.');
  console.log(JSON.stringify(report, null, 2));
  console.log('Scope: schema, IDs, coverage presence, links, journey references/time matching and asset integrity.');
  console.log('Not established: factual accuracy, source-to-claim fit, representative coverage, browser usability or deployment.');
}
return {errors,report};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (validateAtlas().errors.length) process.exitCode = 1;
}

