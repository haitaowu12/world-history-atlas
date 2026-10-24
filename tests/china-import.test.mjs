import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditChinaImport, validateAtlas } from '../scripts/validate.mjs';
import { chinaRoutes } from '../dist/china-library.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = name => path.join(root,'dist/data',name);
const raw = name => fs.readFileSync(dataPath(name));
const json = name => JSON.parse(raw(name));
const actual = auditChinaImport(root);

function withChangedFile(name,change) {
  const original = raw(name);
  const changed = change(original);
  return auditChinaImport(root,{readFile:filename => path.resolve(filename) === dataPath(name) ? Buffer.from(changed) : fs.readFileSync(filename)});
}

test('the pinned China release is completely accounted for without promoting inherited claims', () => {
  assert.deepEqual(actual.errors,[]);
  assert.equal(actual.events.length,975);
  assert.equal(actual.sourcePointers,978);
  assert.equal(actual.manifest.merged.length,2);
  assert.equal(actual.manifest.held.length,1);
  assert.equal(actual.events.length+actual.manifest.merged.length+actual.manifest.held.length,978);
  assert.ok(actual.events.every(event => event.provenance.status === 'inherited'));
  assert.equal(actual.manifest.held[0].id,'china-landmark-412');
  assert.ok(!actual.events.some(event => event.id === 'china-landmark-412'));
});

test('the complete directories and all chronicle stops survive the application route adapter', () => {
  const library = actual.library;
  assert.deepEqual({profiles:library.profiles.length,chronicles:library.journeys.length,stops:library.journeys.reduce((n,j)=>n+j.stops.length,0),cityLore:library.cityLore.length,gazetteer:library.gazetteer.length,passes:library.passes.length,eraPlaceRows:actual.settlements.length,periods:library.eras.length,reigns:library.eraNames.length,corridors:library.corridors.length},
    {profiles:104,chronicles:7,stops:68,cityLore:87,gazetteer:185,passes:20,eraPlaceRows:1387,periods:18,reigns:342,corridors:16});
  const routes = chinaRoutes(library,actual.manifest);
  assert.equal(routes.length,7);
  assert.equal(routes.reduce((n,route)=>n+route.stops.length,0),68);
  for (const route of routes) {
    const source = library.journeys.find(j=>j.id === route.id);
    assert.deepEqual(route.stops.map(s=>s.id),source.stops.map(s=>s.id));
    assert.equal(route.geometryPrecision,'schematic');
    assert.equal(route.provenance.status,'inherited');
    assert.ok(route.caveat.en && route.caveat.zh);
    assert.ok(route.stops.every(s=>s.label.en && s.label.zh));
  }
});

test('chunk bytes are checked rather than trusting the generated inventory', () => {
  const result = withChangedFile('china-events-01.json',bytes=>Buffer.concat([bytes,Buffer.from('\n')]));
  assert.ok(result.errors.some(error=>error.includes('china-events-01.json: checksum or byte-size mismatch')));
});

test('replacing a source pointer cannot hide a missing input row behind an unchanged row count', () => {
  const result = withChangedFile('china-events-01.json',bytes=>{
    const events = JSON.parse(bytes);
    events[1].provenance.sourceRecords[0] = events[0].provenance.sourceRecords[0];
    return JSON.stringify(events);
  });
  assert.ok(result.errors.some(error=>error.includes('source row is represented twice')));
  assert.ok(result.errors.some(error=>/missing (milestone|landmark) source row/.test(error)));
});

test('duplicate and profile links must resolve to records that are actually imported', () => {
  const duplicate = withChangedFile('china-import-manifest.json',bytes=>{
    const manifest = JSON.parse(bytes);
    manifest.merged[0].retainedId = 'absent-event';
    return JSON.stringify(manifest);
  });
  assert.ok(duplicate.errors.some(error=>error.includes('invalid duplicate ledger pointer')));
  const profile = withChangedFile('china-library.json',bytes=>{
    const library = JSON.parse(bytes);
    library.profiles[0].eventIds.push('absent-event');
    return JSON.stringify(library);
  });
  assert.ok(profile.errors.some(error=>error.includes('broken directory reference')));
});

test('neutralized source claims retain their original text and an explicit amendment record', () => {
  const ids = ['china-event-sanguo-008','china-event-tang-030','china-event-roc-016','china-event-prc-002'];
  assert.deepEqual(actual.manifest.amendments.map(a=>a.id),ids);
  for (const id of ids) {
    const event = actual.events.find(e=>e.id === id), amendment = actual.manifest.amendments.find(a=>a.id === id);
    assert.deepEqual(event.provenance.originalText.title,amendment.originalTitle);
    assert.deepEqual(event.title,amendment.displayedTitle);
    assert.notDeepEqual(event.title,amendment.originalTitle);
    assert.ok(event.provenance.reviewIssues?.length);
  }
});

test('the actual full-atlas validator includes imported events, adapted routes and review overlays', () => {
  const {errors,report} = validateAtlas(root,{quiet:true});
  assert.deepEqual(errors,[]);
  const reviews = json('china-reviews.json');
  const additions=['china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(json);
  const expansion = json('content-expansion-v10.json').files.flatMap(item => json(item.file));
  assert.equal(report.records,json('history.json').length+additions.length+json('people.json').length+975+expansion.length);
  assert.equal(report.routes,json('routes.json').length+7);
  assert.equal(report.chinaImport.sourceRows,978);
  assert.equal(report.chinaImport.chunksChecked,actual.manifest.eventFiles.length+actual.manifest.libraryFiles.length);
  assert.equal(report.chinaImport.reviewedEvents,reviews.eventReviews.length);
  assert.equal(report.chinaImport.annotatedChronicleStops,reviews.chronicleReviews.length);
});
