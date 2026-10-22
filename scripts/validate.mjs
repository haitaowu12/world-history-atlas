#!/usr/bin/env node
// Structural checks only. Passing this script does not verify historical claims.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { REGIONS, validYear, activeAt, safeSourceURL, validateRecords } from '../dist/core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = message => errors.push(message);
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const records = JSON.parse(read('dist/data/history.json'));
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

// Read only a restricted literal declaration. No eval or JS execution.
// If journeys become generated/dynamic, move their data into JSON and update this parser.
const app = read('dist/app.mjs');
const block = app.match(/const journeys\s*=\s*\[([\s\S]*?)\n\];/);
const journeys = [];
if (!block) {
  fail('Could not locate the restricted journeys declaration.');
} else {
  const lines = block[1].split('\n').filter(line => line.trim());
  for (const line of lines) {
    const id = line.match(/^\s*\{id:'([a-z0-9]+(?:-[a-z0-9]+)*)',/);
    const stops = line.match(/stops:\[([^\]]*)\]\s*\},?\s*$/);
    const year = line.match(/\byear:(-?\d+),stops:/);
    if (!id || !stops || !/^\s*'[a-z0-9]+(?:-[a-z0-9]+)*'(?:\s*,\s*'[a-z0-9]+(?:-[a-z0-9]+)*')*\s*$/.test(stops[1])) {
      fail('Journey declaration must use a single-line literal ID and literal stop IDs.');
      continue;
    }
    const entry = { id:id[1], stops:[...stops[1].matchAll(/'([^']+)'/g)].map(m => m[1]) };
    if (year) entry.year = Number(year[1]);
    journeys.push(entry);
  }
}
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
  if (regions.size < 6) fail('world-1200 description promises six regions.');
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
for (const filename of ['land.geojson','d3.v7.9.0.min.js']) {
  if (!provenance.assets?.some(a => a.file === filename)) fail('Missing asset provenance: ' + filename);
}
const land = JSON.parse(read('dist/assets/land.geojson'));
if (land.type !== 'FeatureCollection' || !Array.isArray(land.features) || !land.features.length) {
  fail('Physical land geometry is missing.');
}

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
    fixedYear1200Stops: fixedJourney.stops.length,
    vendoredAssetsChecked: provenance.assets.length
  }, null, 2));
  console.log('Scope: schema, IDs, coverage presence, links, journey references/time matching and asset integrity.');
  console.log('Not established: factual accuracy, source-to-claim fit, representative coverage, browser usability or deployment.');
}

