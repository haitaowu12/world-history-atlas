import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validYear, toOrdinal, validateRecords, safeSourceURL} from '../dist/core.mjs';
import {applyChinaReviews,linkChinaContext} from '../dist/china-review.mjs';
import {chinaRoutes} from '../dist/china-library.mjs';

const readData = async name => JSON.parse(await readFile(new URL(`../dist/data/${name}.json`, import.meta.url), 'utf8'));
const [history, people, routes, courses] = await Promise.all(['history', 'people', 'routes', 'courses'].map(readData));
const [manifest,library,reviews] = await Promise.all(['china-import-manifest','china-library','china-reviews'].map(readData));
const chunks = await Promise.all(manifest.eventFiles.map(f=>readData(f.path.replace(/\.json$/,''))));
const reviewed = applyChinaReviews(chunks.flat(),library,reviews);
routes.push(...chinaRoutes(reviewed.library,manifest));
const records = [...history, ...people, ...linkChinaContext(reviewed.events,[...history,...people])];
const recordIds = new Set(records.map(record => record.id));
const personIds = new Set(people.map(person => person.id));
const routeIds = new Set(routes.map(route => route.id));

function bilingual(value, context) {
  for (const lang of ['en', 'zh']) {
    assert.equal(typeof value?.[lang], 'string', `${context}.${lang} must be text`);
    assert.ok(value[lang].trim(), `${context}.${lang} must not be blank`);
  }
}

function coordinates(value, context) {
  assert.ok(Number.isFinite(value?.lat) && Math.abs(value.lat) <= 90, `${context}: invalid latitude`);
  assert.ok(Number.isFinite(value?.lon) && Math.abs(value.lon) <= 180, `${context}: invalid longitude`);
}

function uniqueIds(rows, context) {
  const ids = rows.map(row => row.id);
  assert.equal(new Set(ids).size, ids.length, `${context}: duplicate identifiers`);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${context}: URL-unsafe identifier`);
}

test('learning content identities remain unique across the combined atlas', () => {
  for (const [name, rows] of Object.entries({people, routes, courses})) {
    assert.ok(rows.length, `${name} must not be an empty collection`);
  }
  uniqueIds([...records, ...routes, ...courses], 'atlas');
  assert.deepEqual(validateRecords(people), []);
});

test('biography milestones stay chronological and inside their stated life or focus period', () => {
  for (const person of people) {
    assert.equal(person.kind, 'person', person.id);
    assert.equal(person.locationPrecision, 'representative', person.id);
    bilingual(person.name, `${person.id}.name`);
    assert.ok(person.milestones.length >= 2, `${person.id}: a biography needs a sequence`);
    let previous = toOrdinal(person.start);
    for (const [index, milestone] of person.milestones.entries()) {
      const context = `${person.id}.milestones[${index}]`;
      assert.ok(validYear(milestone.year), `${context}: invalid civil year, including year zero`);
      const year = toOrdinal(milestone.year);
      assert.ok(year >= previous && year <= toOrdinal(person.end), `${context}: out of order or outside the focus period`);
      previous = year;
      bilingual(milestone.title, `${context}.title`);
      bilingual(milestone.description, `${context}.description`);
      coordinates(milestone.location, context);
      assert.ok(milestone.location.label?.trim(), `${context}: missing place label`);
      if ('approximate' in milestone) assert.equal(typeof milestone.approximate, 'boolean', context);
    }
  }
});

test('route layers disclose date interpretation and schematic geometry in both languages', () => {
  for (const route of routes) {
    assert.ok(['journey', 'network'].includes(route.kind), route.id);
    assert.ok(validYear(route.start) && validYear(route.end) && route.start <= route.end, `${route.id}: invalid date range`);
    assert.equal(route.geometryPrecision, 'schematic', `${route.id}: route lines must not imply surveyed paths`);
    for (const field of ['title', 'summary', 'dateNote', 'caveat']) bilingual(route[field], `${route.id}.${field}`);
    assert.ok(route.stops.length >= 2, `${route.id}: insufficient stops`);
    uniqueIds(route.stops, route.id);
    for (const stop of route.stops) {
      coordinates(stop, `${route.id}/${stop.id}`);
      bilingual(stop.label, `${route.id}/${stop.id}.label`);
      bilingual(stop.description, `${route.id}/${stop.id}.description`);
      if (stop.dateLabel) bilingual(stop.dateLabel, `${route.id}/${stop.id}.dateLabel`);
    }
  }
});

test('networks remain undated at node level; dated journeys follow civil chronology', () => {
  assert.ok(routes.some(route => route.kind === 'network'));
  assert.ok(routes.some(route => route.kind === 'journey'));
  for (const route of routes) {
    let previous = toOrdinal(route.start);
    for (const stop of route.stops) {
      const context = `${route.id}/${stop.id}`;
      if (route.kind === 'network') {
        assert.equal(stop.year, null, `${context}: a network node must not masquerade as a dated arrival`);
      } else {
        assert.ok(validYear(stop.year), `${context}: journey stop needs a nonzero civil year`);
        const year = toOrdinal(stop.year);
        assert.ok(year >= previous && year <= toOrdinal(route.end), `${context}: journey dates reverse or leave their stated range`);
        previous = year;
      }
    }
  }
});

test('every drawn route leg names real stops and carries an evidence note', () => {
  for (const route of routes) {
    assert.ok(Array.isArray(route.legs) && route.legs.length, `${route.id}: explicit legs are required`);
    const stops = new Map(route.stops.map((stop, index) => [stop.id, index]));
    const seen = new Set();
    for (const leg of route.legs) {
      const context = `${route.id}: ${leg.from} -> ${leg.to}`;
      assert.ok(stops.has(leg.from) && stops.has(leg.to), `${context}: dangling stop reference`);
      assert.notEqual(leg.from, leg.to, `${context}: self-connection`);
      const key = `${leg.from}/${leg.to}`;
      assert.ok(!seen.has(key), `${context}: duplicate connection`);
      seen.add(key);
      assert.equal(typeof leg.evidenceNote, 'string', context);
      assert.ok(leg.evidenceNote.trim(), `${context}: missing evidence note`);
      if (route.kind === 'journey') {
        assert.ok(stops.get(leg.from) < stops.get(leg.to), `${context}: leg reverses the documented itinerary order`);
      }
    }
    if (route.kind === 'journey') {
      for (let index = 1; index < route.stops.length; index++) {
        const key = `${route.stops[index - 1].id}/${route.stops[index].id}`;
        assert.ok(seen.has(key), `${route.id}: navigation advances across a missing itinerary leg ${key}`);
      }
    }
  }
});

test('route associations resolve to the intended biography and history collections', () => {
  for (const route of routes) {
    for (const id of route.personIds || []) assert.ok(personIds.has(id), `${route.id}: missing biography ${id}`);
    for (const id of route.relatedIds || []) assert.ok(recordIds.has(id), `${route.id}: missing related record ${id}`);
  }
});

test('biography and route sources preserve inspectable evidence metadata', () => {
  for (const entry of [...people, ...routes]) {
    assert.ok(entry.sources.length, `${entry.id}: missing sources`);
    for (const source of entry.sources) {
      const context = `${entry.id}: ${source.url}`;
      assert.ok(safeSourceURL(source.url), `${context}: unsafe source URL`);
      for (const field of ['title', 'publisher', 'evidenceNote']) {
        assert.equal(typeof source[field], 'string', `${context}.${field}`);
        assert.ok(source[field].trim(), `${context}: missing ${field}`);
      }
      assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/, `${context}: missing verification date`);
      assert.equal(new Date(`${source.checkedAt}T00:00:00Z`).toISOString().slice(0, 10), source.checkedAt, `${context}: impossible verification date`);
    }
  }
});

test('reading courses have resolvable stops, route references and bilingual learning prompts', () => {
  for (const course of courses) {
    assert.equal(course.kind, 'reading-course', course.id);
    for (const field of ['title', 'summary', 'activity']) bilingual(course[field], `${course.id}.${field}`);
    assert.ok(Number.isInteger(course.estimatedMinutes) && course.estimatedMinutes > 0, course.id);
    assert.ok(course.recordIds.length >= 2, `${course.id}: a course needs multiple records`);
    assert.equal(new Set(course.recordIds).size, course.recordIds.length, `${course.id}: duplicate reading stop`);
    for (const id of course.recordIds) assert.ok(recordIds.has(id), `${course.id}: missing reading stop ${id}`);
    assert.equal(new Set(course.routeIds).size, course.routeIds.length, `${course.id}: duplicate route reference`);
    for (const id of course.routeIds) assert.ok(routeIds.has(id), `${course.id}: missing route ${id}`);
    assert.ok(course.questions.length >= 2, `${course.id}: missing comparison prompts`);
    for (const [index, question] of course.questions.entries()) bilingual(question, `${course.id}.questions[${index}]`);
    assert.ok(course.evidencePolicy?.trim(), `${course.id}: missing distinction between editorial prompts and historical evidence`);
  }
});
