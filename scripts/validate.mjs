#!/usr/bin/env node
// Structural checks only. Passing this script does not verify historical claims.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { journeys } from '../dist/journeys.mjs';
import { fileURLToPath } from 'node:url';
import { REGIONS, validYear, activeAt, safeSourceURL, validateRecords } from '../dist/core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = message => errors.push(message);
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const histories = JSON.parse(read('dist/data/history.json'));
const people = JSON.parse(read('dist/data/people.json'));
const records = [...histories,...people];
const routes = JSON.parse(read('dist/data/routes.json'));
const courses = JSON.parse(read('dist/data/courses.json'));
errors.push(...validateRecords(records));
const ids = new Set(Array.isArray(records) ? records.map(r => r?.id) : []);
const sourcePages = new Set();
const counts = Object.fromEntries(REGIONS.map(region => [region, 0]));

for (const r of Array.isArray(records) ? records : []) {
  if (!r || typeof r !== 'object') continue;
  if (counts[r.region] !== undefined) counts[r.region]++;
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

if (errors.length) {
  console.error('Structural validation failed (' + errors.length + '):\n' + errors.map(e => '- ' + e).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Structural validation passed.');
  console.log(JSON.stringify({
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
    vendoredAssetsChecked: provenance.assets.length
  }, null, 2));
  console.log('Scope: schema, IDs, coverage presence, links, journey references/time matching and asset integrity.');
  console.log('Not established: factual accuracy, source-to-claim fit, representative coverage, browser usability or deployment.');
}

