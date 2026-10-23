import test from 'node:test';
import assert from 'node:assert/strict';
import {historicalContextFeatures, mapCoverage} from '../dist/atlas-model.mjs';
import {MIN_YEAR, MAX_YEAR} from '../dist/core.mjs';

// These are synthetic selection fixtures, not historical assertions. The actual
// collection is checked separately in temporal-coverage.test.mjs.
const validity = (start, end, backwardReviewed = false) => ({
  start, end, backwardReviewed,
  note: {en: 'Synthetic reviewed phase', zh: '测试阶段'},
  evidence: ['https://example.test/reviewed-phase'],
});
const feature = (polityId, year, contextValidity, suffix = '') => ({
  type: 'Feature',
  geometry: {type: 'Polygon', coordinates: [[[0, 0], [0, 1], [1, 1], [0, 0]]]},
  properties: {
    id: `${year}-${polityId}${suffix}`, polityId, year, sourceYear: year,
    name: {en: polityId, zh: polityId},
    ...(contextValidity === undefined ? {} : {contextValidity}),
  },
});
const ids = features => features.map(item => item.properties.id).sort();
const sourceYears = coverage => [...coverage.sourceYears].sort((a, b) => a - b);

test('a feature without a reviewed context interval is eligible only at its source year', () => {
  const exactOnly = feature('exact-only', 1200);
  assert.deepEqual(historicalContextFeatures([exactOnly], 1199), []);
  assert.strictEqual(historicalContextFeatures([exactOnly], 1200)[0], exactOnly);
  assert.deepEqual(historicalContextFeatures([exactOnly], 1201), []);
  assert.deepEqual(historicalContextFeatures([exactOnly], 2026), []);
});

test('a reviewed forward phase includes both endpoints and expires immediately afterward', () => {
  const bounded = feature('bounded', 1200, validity(1200, 1299));
  for (const year of [1200, 1250, 1299]) {
    assert.deepEqual(historicalContextFeatures([bounded], year), [bounded], String(year));
  }
  for (const year of [1199, 1300, MAX_YEAR]) {
    assert.deepEqual(historicalContextFeatures([bounded], year), [], String(year));
  }
});

test('backward context requires an explicit boolean review, not merely an interval containing the year', () => {
  const future = feature('future', 1300, validity(1250, 1350));
  assert.deepEqual(historicalContextFeatures([future], 1275), []);
  future.properties.contextValidity.backwardReviewed = 'true';
  assert.deepEqual(historicalContextFeatures([future], 1275), []);
  future.properties.contextValidity.backwardReviewed = true;
  assert.deepEqual(historicalContextFeatures([future], 1250), [future]);
  assert.deepEqual(historicalContextFeatures([future], 1275), [future]);
  assert.deepEqual(historicalContextFeatures([future], 1249), []);
});

test('a polity has one selected phase: newest eligible prior wins over any reviewed future', () => {
  const old = feature('one-state', 1100, validity(1100, 1350));
  const newestPrior = feature('one-state', 1200, validity(1200, 1350));
  const nearFuture = feature('one-state', 1300, validity(1250, 1350, true));
  const other = feature('other-state', 1250, validity(1250, 1280));
  const input = [nearFuture, old, other, newestPrior];
  assert.deepEqual(ids(historicalContextFeatures(input, 1275)), ids([newestPrior, other]));
  assert.deepEqual(ids(historicalContextFeatures([...input].reverse(), 1275)), ids([newestPrior, other]));
  assert.strictEqual(historicalContextFeatures(input, 1300).find(item => item.properties.polityId === 'one-state'), nearFuture);
});

test('the earliest reviewed future phase is used only when no prior phase is eligible', () => {
  const expired = feature('state', 1200, validity(1200, 1249));
  const earliestFuture = feature('state', 1300, validity(1250, 1400, true));
  const laterFuture = feature('state', 1350, validity(1250, 1400, true));
  assert.deepEqual(historicalContextFeatures([laterFuture, expired, earliestFuture], 1275), [earliestFuture]);
  assert.deepEqual(historicalContextFeatures([expired], 1275), []);
});

test('source dates, geometry, and metadata remain unchanged when context is selected', () => {
  const input = [feature('state', 1200, validity(1200, 1300))];
  const before = structuredClone(input);
  const chosen = historicalContextFeatures(input, 1275);
  assert.strictEqual(chosen[0], input[0]);
  assert.strictEqual(chosen[0].geometry, input[0].geometry);
  assert.equal(chosen[0].properties.year, 1200);
  assert.equal(chosen[0].properties.sourceYear, 1200);
  assert.deepEqual(input, before, 'the selected year must never replace the source year');
});

test('malformed context intervals fail closed instead of creating unbounded carry-forward', () => {
  const badIntervals = [
    null, {}, validity(1300, 1200), validity('1200', 1300), validity(1200, '1300'),
    validity(0, 1300), validity(1200, 0), validity(NaN, 1300), validity(1200, Infinity),
    validity(MIN_YEAR - 1, 1300), validity(1200, MAX_YEAR + 1),
  ];
  for (const context of badIntervals) {
    const item = feature('invalid-phase', 1200, context);
    assert.deepEqual(historicalContextFeatures([item], 1250), [], JSON.stringify(context));
    assert.deepEqual(historicalContextFeatures([item], 1200), [item], 'bad context does not erase a valid source-year map');
  }
});

test('context selection rejects invalid civil years and crosses BCE to CE without year zero', () => {
  const crossing = feature('cross-era', -1, validity(-1, 1));
  assert.deepEqual(historicalContextFeatures([crossing], -1), [crossing]);
  assert.deepEqual(historicalContextFeatures([crossing], 1), [crossing]);
  assert.deepEqual(historicalContextFeatures([crossing], 2), []);
  for (const year of [0, NaN, Infinity, '1', MIN_YEAR - 1, MAX_YEAR + 1]) {
    assert.deepEqual(historicalContextFeatures([crossing], year), [], String(year));
  }
  assert.deepEqual(historicalContextFeatures(null, 1), []);
});

test('an intermediate map exposes its context source years without inventing an exact snapshot', () => {
  const snapshots = [{year: 1400}, {year: 1000}, {year: 1200}];
  const earlier = feature('alpha', 1200, validity(1200, 1300));
  const backwardReviewed = feature('beta', 1400, validity(1250, 1450, true));
  const coverage = mapCoverage(snapshots, 1275, {}, [earlier, backwardReviewed]);
  assert.equal(coverage.mode, 'context');
  assert.equal(coverage.snapshot, null);
  assert.strictEqual(coverage.before, snapshots[2]);
  assert.strictEqual(coverage.after, snapshots[0]);
  assert.deepEqual(ids(coverage.contextFeatures), ids([earlier, backwardReviewed]));
  assert.deepEqual(sourceYears(coverage), [1200, 1400]);
});

test('an exact map checkpoint retains eligible regional context and clearly reports mixed source years', () => {
  const anchor = {year: 1200};
  const exact = feature('alpha', 1200);
  const regionalContext = feature('beta', 1100, validity(1100, 1250));
  const coverage = mapCoverage([anchor], 1200, {}, [exact, regionalContext]);
  assert.equal(coverage.mode, 'context', 'mixed-year geometry must not be described as a single-year historical map');
  assert.strictEqual(coverage.snapshot, anchor, 'the exact source checkpoint remains available as provenance');
  assert.deepEqual(ids(coverage.contextFeatures), ids([exact, regionalContext]));
  assert.deepEqual(sourceYears(coverage), [1100, 1200]);
});

test('an exact map containing only that source year is historical, not mixed context', () => {
  const anchor = {year: 1200};
  const exact = feature('alpha', 1200);
  const coverage = mapCoverage([anchor], 1200, {}, [exact]);
  assert.equal(coverage.mode, 'historical');
  assert.strictEqual(coverage.snapshot, anchor);
  assert.deepEqual(coverage.contextFeatures, [exact]);
  assert.deepEqual(sourceYears(coverage), [1200]);
});

test('exhausted context becomes a coverage gap with useful source-date navigation', () => {
  const earlier = {year: 1200}, later = {year: 1400};
  const expired = feature('alpha', 1200, validity(1200, 1299));
  const unreviewedFuture = feature('beta', 1400);
  const coverage = mapCoverage([later, earlier], 1300, {}, [expired, unreviewedFuture]);
  assert.equal(coverage.mode, 'gap');
  assert.equal(coverage.snapshot, null);
  assert.strictEqual(coverage.before, earlier);
  assert.strictEqual(coverage.after, later);
  assert.deepEqual(coverage.contextFeatures, []);
  assert.deepEqual(coverage.sourceYears, []);
});

test('contemporary context requires an explicit bounded review and supersedes old historical context', () => {
  const metadata = {reviewedYear: 2026, contextValidity: validity(2011, 2026)};
  const old = feature('historical-reference', 2000, validity(2000, 2026));
  assert.equal(mapCoverage([], 2010, metadata, []).mode, 'gap');
  for (const year of [2011, 2020, 2025, 2026]) {
    const coverage = mapCoverage([], year, metadata, [old]);
    assert.equal(coverage.mode, 'contemporary', String(year));
    assert.equal(coverage.snapshot, null);
    assert.deepEqual(coverage.contextFeatures, [], 'the renderer must not mix the old historical bundle into the contemporary map');
  }
  assert.equal(mapCoverage([], 2025, {reviewedYear: 2026}, []).mode, 'gap');
  assert.equal(mapCoverage([], 2025, {reviewedYear: 2026, contextValidity: validity('2011', 2026)}, []).mode, 'gap');
});
