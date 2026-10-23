import test from 'node:test';
import assert from 'node:assert/strict';
import {exactSnapshot, mapCoverage} from '../dist/atlas-model.mjs';
import {MIN_YEAR, MAX_YEAR} from '../dist/core.mjs';
import {historicalMetadata as metadata, historicalCollection} from './map-fixtures.mjs';

const snapshots = metadata.snapshots;
const contemporary = {reviewedYear: 2026, sourceVintage: 'Independent source vintage is not the selected year'};

test('every shipped historical snapshot is available at its actual date without relabeling', () => {
  for (const snapshot of snapshots) {
    assert.strictEqual(exactSnapshot(snapshots, snapshot.year), snapshot);
    const coverage = mapCoverage(snapshots, snapshot.year, contemporary);
    assert.equal(coverage.mode, 'historical', String(snapshot.year));
    assert.strictEqual(coverage.snapshot, snapshot);
    assert.equal(coverage.snapshot.year, snapshot.year);
  }
});

test('the Soviet Union snapshot is historical in 1960 and cannot become the 2026 map', () => {
  assert.equal(mapCoverage(snapshots, 1960, contemporary).snapshot.year, 1960);
  const present = mapCoverage(snapshots, 2026, contemporary);
  assert.equal(present.mode, 'contemporary');
  assert.equal(present.snapshot, null);
  assert.equal(exactSnapshot(snapshots, 2026), null);
});

test('date-only coverage never presents a neighboring checkpoint as an exact-year map', () => {
  // With no feature validity supplied, the compatibility API remains exact-only.
  // The context-aware runtime is covered by the separate phase-selection tests.
  const years = [-329, -300, 250, 700, 950, 1150, 1290, 1390, 1550, 1750, 1949, 1972, 1992];
  for (const year of years) {
    const coverage = mapCoverage(snapshots, year, contemporary);
    const exact = exactSnapshot(snapshots, year);
    assert.equal(coverage.mode, exact ? 'historical' : 'gap', String(year));
    assert.strictEqual(coverage.snapshot, exact, `${year}: neighboring source years must not be relabeled`);
  }
});

test('without reviewed feature intervals, between-snapshot years cannot acquire implicit geometry', () => {
  const knownYears = new Set(snapshots.map(snapshot => snapshot.year));
  const before = structuredClone(snapshots);
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    if (!year || knownYears.has(year) || year === contemporary.reviewedYear) continue;
    const coverage = mapCoverage(snapshots, year, contemporary);
    assert.equal(coverage.mode, 'gap', `${year}: unsupported geometry must not be carried forward`);
    assert.equal(coverage.snapshot, null);
  }
  assert.deepEqual(snapshots, before, 'coverage selection must not alter source dates or membership');
});

test('gap navigation offers actual earlier and later source dates without selecting either', () => {
  const input = [{year: 1200}, {year: -500}, {year: 200}, {year: -1}, {year: 1000}];
  const gap = mapCoverage(input, 1100, null);
  assert.equal(gap.mode, 'gap');
  assert.equal(gap.snapshot, null);
  assert.strictEqual(gap.before, input[4]);
  assert.strictEqual(gap.after, input[0]);
  const earliest = mapCoverage(input, -501, null);
  assert.equal(earliest.before, null);
  assert.strictEqual(earliest.after, input[1]);
  const latest = mapCoverage(input, 1992, null);
  assert.strictEqual(latest.before, input[0]);
  assert.equal(latest.after, null);
});

test('contemporary reference geometry requires a matching explicit review year', () => {
  for (const missingOrStale of [null, undefined, {}, {reviewedYear: 2025}, {reviewedYear: '2026'}]) {
    const coverage = mapCoverage(snapshots, 2026, missingOrStale);
    assert.equal(coverage.mode, 'gap');
    assert.equal(coverage.snapshot, null);
  }
  assert.equal(mapCoverage(snapshots, 2025, contemporary).mode, 'gap');
  assert.equal(mapCoverage(snapshots, 2026, contemporary).mode, 'contemporary');
});

test('exact snapshot matching rejects impossible and malformed civil years', () => {
  const invalidSnapshots = [{year: 0}, {year: NaN}, {year: Infinity}, {year: '1200'}, {year: MAX_YEAR + 1}];
  for (const year of [0, NaN, Infinity, '1200', MIN_YEAR - 1, MAX_YEAR + 1]) {
    assert.equal(exactSnapshot([...snapshots, ...invalidSnapshots], year), null);
  }
  assert.equal(exactSnapshot(null, 1200), null);
  assert.equal(exactSnapshot([], 1200), null);
});

test('the BCE to CE transition has no invented year-zero map', () => {
  const input = [{year: -1}, {year: 1}];
  assert.equal(exactSnapshot(input, -1).year, -1);
  assert.equal(exactSnapshot(input, 1).year, 1);
  assert.equal(exactSnapshot(input, 0), null);
  assert.equal(mapCoverage(input, -2, null).after.year, -1);
  assert.equal(mapCoverage(input, 2, null).before.year, 1);
});

test('known actual-year geometry errors are excluded, not hidden behind a snapshot label', () => {
  const featureIds = new Set(historicalCollection.features.map(feature => feature.properties.id));
  const declaredIds = new Set(snapshots.flatMap(snapshot => snapshot.featureIds));
  // Upper Peru was transferred to Río de la Plata in 1776; the two imported
  // 1800 polygons assign it incorrectly. The 1900 Ethiopian outline omits
  // Harar, incorporated in 1887, by hundreds of kilometres. Evidence is in
  // docs/TEMPORAL_AUDIT_V3.md. Reintroduce only with a reviewed replacement.
  for (const id of ['1800-peru-colonial', '1800-rioplata', '1900-ethiopia']) {
    assert.ok(!featureIds.has(id), `${id}: an acknowledged incorrect outline must not ship`);
    assert.ok(!declaredIds.has(id), `${id}: snapshot metadata must not reference a quarantined outline`);
  }
});
