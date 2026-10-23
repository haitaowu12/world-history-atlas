import test from 'node:test';
import assert from 'node:assert/strict';
import {
  contemporaryFeaturesAt, featureNameAt, featureCategoryAt, historicalContextFeatures, mapCoverage,
} from '../dist/atlas-model.mjs';
import {MAX_YEAR, validYear} from '../dist/core.mjs';
import {
  historicalMetadata as metadata, historicalCollection, contemporaryMetadata, contemporaryCollection,
} from './map-fixtures.mjs';

const historical = historicalCollection.features;
// The raw reference file records vintage and review separately. Supply the same
// documented feature fields used when the application loads that reference.
const contemporary = contemporaryCollection.features.map(item => ({
  ...item,
  properties: {
    ...item.properties, contemporary: true,
    sourceYear: item.properties.sourceYear ?? item.properties.geometryVintage ?? contemporaryMetadata.geometryVintage,
    year: item.properties.year ?? item.properties.reviewedYear ?? contemporaryMetadata.reviewedYear,
  },
}));

const selectedHistorical = new Map();
function historicalAt(year) {
  if (!selectedHistorical.has(year)) selectedHistorical.set(year, historicalContextFeatures(historical, year));
  return selectedHistorical.get(year);
}
function modernAt(year) {
  return contemporaryFeaturesAt(contemporary, historical, year, contemporaryMetadata);
}

test('shipped historical context preserves dated provenance and supplies evidence for every extended interval', () => {
  for (const feature of historical) {
    const p = feature.properties;
    assert.ok(validYear(p.year), `${p.id}: source year`);
    assert.equal(p.sourceYear, p.year, `${p.id}: sourceYear must not relabel the original geometry`);
    const interval = p.contextValidity;
    if (!interval) continue;
    assert.ok(validYear(interval.start) && validYear(interval.end) && interval.start <= interval.end, `${p.id}: valid inclusive phase`);
    assert.equal(typeof interval.backwardReviewed, 'boolean', `${p.id}: explicit backward-review decision`);
    assert.ok(interval.note?.en?.trim() && interval.note?.zh?.trim(), `${p.id}: bilingual display-period note`);
    assert.ok(Array.isArray(interval.evidence) && interval.evidence.length, `${p.id}: display-period evidence`);
    for (const url of interval.evidence) assert.match(url, /^https:\/\//, `${p.id}: evidence URL`);
  }
});

test('every civil year from 2500 BCE through 2026 retains reviewed map context', () => {
  // This guarantees temporal continuity, not complete worldwide territory coverage.
  for (let year = -2500; year <= MAX_YEAR; year++) {
    if (!year) continue;
    const coverage = mapCoverage(metadata.snapshots, year, contemporaryMetadata, historical);
    assert.notEqual(coverage.mode, 'gap', `${year}: the map must retain reviewed context`);
    const selected = coverage.mode === 'contemporary' ? modernAt(year) : coverage.contextFeatures;
    assert.ok(selected.length, `${year}: an empty map must not be advertised as covered`);
    if (coverage.mode !== 'contemporary') {
      const ids = selected.map(feature => feature.properties.polityId);
      assert.equal(new Set(ids).size, ids.length, `${year}: no duplicate polity phases`);
      if (coverage.mode === 'historical') {
        assert.ok(selected.every(feature => feature.properties.sourceYear === year), `${year}: a mixed-source map must be identified as context`);
      }
    }
  }
});

test('ended imperial and Cold War phases never survive their reviewed cutoffs', () => {
  const ends = [
    ['ussr', 1991], ['westgermany', 1989], ['eastgermany', 1989],
    ['ming', 1644], ['qing', 1911], ['russian', 1916],
    ['yugoslavia-kingdom', 1940], ['yugoslavia-sfr', 1990],
  ];
  for (const [polityId, lastYear] of ends) {
    for (let year = lastYear + 1; year <= MAX_YEAR; year++) {
      assert.ok(!historicalAt(year).some(feature => feature.properties.polityId === polityId), `${polityId} must not appear at ${year}`);
    }
  }
  assert.ok(!modernAt(2026).some(feature => /Soviet Union|Yugoslavia|East Germany|West Germany/i.test(featureNameAt(feature, 2026)?.en || '')));
});

test('source maps cannot backdate the Soviet Union or blur the separate Yugoslav phases', () => {
  const soviet = historical.filter(feature => feature.properties.polityId === 'ussr');
  assert.ok(soviet.length, 'a reviewed Soviet phase remains available for its actual historical period');
  for (const feature of soviet) {
    assert.ok(feature.properties.sourceYear >= 1922, `${feature.properties.id}: the source name must not predate the state`);
    if (feature.properties.contextValidity) assert.ok(feature.properties.contextValidity.start >= 1922, `${feature.properties.id}: no Soviet context before formation`);
  }
  for (const year of [1919, 1920, 1921]) {
    assert.ok(!historicalAt(year).some(feature => feature.properties.polityId === 'ussr'), String(year));
  }
  for (const feature of historical.filter(item => /yugoslavia/i.test(item.properties.name?.en || ''))) {
    assert.ok(['yugoslavia-kingdom', 'yugoslavia-sfr'].includes(feature.properties.polityId), `${feature.properties.id}: a Yugoslav outline needs an explicit reviewed phase`);
  }
});

test('the shipped 2011–2013 reference has Russia and Ukraine exactly once, using their reviewed 2010 outlines', () => {
  for (const year of [2011, 2012, 2013]) {
    const selected = modernAt(year);
    for (const [code, polityId] of [['RUS', 'russia-modern'], ['UKR', 'ukraine']]) {
      const found = selected.filter(feature => feature.properties.code === code);
      assert.equal(found.length, 1, `${year}: ${code}`);
      const original = historical.find(feature => feature.properties.polityId === polityId && feature.properties.sourceYear === 2010);
      assert.ok(original, `${year}: the actual historical fallback is shipped`);
      assert.strictEqual(found[0].geometry, original.geometry);
      assert.equal(found[0].properties.sourceYear, 2010);
      assert.equal(found[0].properties.license, original.properties.license);
      assert.equal(found[0].properties.referenceFallback, true);
    }
  }
  for (const code of ['RUS', 'UKR']) {
    const found = modernAt(2014).filter(feature => feature.properties.code === code);
    assert.equal(found.length, 1, `2014: ${code}`);
    assert.equal(found[0].properties.sourceYear, 2022);
    assert.ok(!found[0].properties.referenceFallback);
  }
});

test('the shipped country names respect their reviewed annual changes', () => {
  for (const [code, oldName, newName, cutoff] of [
    ['TUR', 'Turkey', 'Türkiye', 2022],
    ['CZE', 'Czech Republic', 'Czechia', 2016],
    ['SWZ', 'Swaziland', 'Eswatini', 2018],
    ['MKD', 'Macedonia (FYROM)', 'North Macedonia', 2019],
  ]) {
    const feature = contemporary.find(item => item.properties.code === code);
    assert.ok(feature, code);
    assert.equal(featureNameAt(feature, cutoff - 1)?.en, oldName, `${code}: before the annual cutoff`);
    assert.equal(featureNameAt(feature, cutoff)?.en, newName, `${code}: at the annual cutoff`);
    assert.equal(featureNameAt(feature, 2026)?.en, newName, `${code}: current name`);
  }
});

test('the shipped Palestinian status does not backdate the 2012 UN observer State category', () => {
  for (const [year, expected] of [[2011, 'other'], [2012, 'observer-state'], [2026, 'observer-state']]) {
    const palestine = modernAt(year).find(feature => feature.properties.isoCode === 'PSE');
    assert.ok(palestine, `Palestine remains available at ${year}`);
    assert.equal(featureCategoryAt(palestine, year), expected, String(year));
  }
});

