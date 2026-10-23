import test from 'node:test';
import assert from 'node:assert/strict';
import {contemporaryFeaturesAt, featureNameAt, featureCategoryAt} from '../dist/atlas-model.mjs';
import {MIN_YEAR, MAX_YEAR} from '../dist/core.mjs';

const interval = (start, end, backwardReviewed = true) => ({start, end, backwardReviewed});
const geometry = x => ({type: 'Polygon', coordinates: [[[x, 0], [x, 1], [x + 1, 1], [x, 0]]]});
const modernFeature = (code, start = 2011) => ({
  type: 'Feature', geometry: geometry(code.charCodeAt(0)),
  properties: {
    id: `contemporary-${code.toLowerCase()}`, code, year: 2026, sourceYear: 2022,
    reviewedYear: 2026, name: {en: `Current ${code}`, zh: `当代 ${code}`},
    contextValidity: interval(start, 2026), category: 'country', color: '#123456',
    license: 'Public domain', sources: [{url: 'https://example.test/modern'}],
  },
});
const historicalFeature = (polityId, x) => ({
  type: 'Feature', geometry: geometry(x),
  properties: {
    id: `2010-${polityId}`, polityId, year: 2010, sourceYear: 2010,
    name: {en: `Historical ${polityId}`, zh: `历史 ${polityId}`},
    contextValidity: interval(2010, 2013, false),
    license: 'GPL-3.0-only', geometrySource: `https://example.test/2010/${polityId}`,
    sources: [{url: 'https://example.test/historical'}],
    note: {en: 'The original historical geometry note', zh: '原始历史几何说明'},
  },
});
function fixture() {
  const features = [modernFeature('RUS', 2014), modernFeature('UKR', 2014), modernFeature('DEU')];
  const historical = [historicalFeature('russia-modern', 10), historicalFeature('ukraine', 20)];
  const metadata = {
    reviewedYear: 2026, geometryVintage: 2022, contextValidity: interval(2011, 2026),
    historicalFallbacks: [
      {code: 'RUS', polityId: 'russia-modern', start: 2011, end: 2013},
      {code: 'UKR', polityId: 'ukraine', start: 2011, end: 2013},
    ],
  };
  return {features, historical, metadata};
}

test('2011 and 2013 use one reviewed historical fallback for each of Russia and Ukraine', () => {
  const {features, historical, metadata} = fixture();
  for (const year of [2011, 2013]) {
    const selected = contemporaryFeaturesAt(features, historical, year, metadata);
    assert.equal(selected.length, 3);
    assert.equal(new Set(selected.map(item => item.properties.code)).size, 3);
    for (const [code, polityId] of [['RUS', 'russia-modern'], ['UKR', 'ukraine']]) {
      const result = selected.find(item => item.properties.code === code);
      const original = historical.find(item => item.properties.polityId === polityId);
      assert.ok(result, `${year}: ${code} must remain visible`);
      assert.strictEqual(result.geometry, original.geometry, `${year}: retain the reviewed historical outline`);
      assert.equal(result.properties.sourceYear, 2010);
      assert.equal(result.properties.year, 2010);
      assert.equal(result.properties.referenceFallback, true);
      assert.equal(result.properties.contemporary, true);
    }
  }
});

test('mapping historical geometry to a contemporary identity retains its provenance without mutating inputs', () => {
  const {features, historical, metadata} = fixture();
  const before = structuredClone({features, historical, metadata});
  const selected = contemporaryFeaturesAt(features, historical, 2012, metadata);
  const result = selected.find(item => item.properties.code === 'RUS');
  const original = historical[0];
  assert.equal(result.properties.license, original.properties.license);
  assert.equal(result.properties.geometrySource, original.properties.geometrySource);
  assert.deepEqual(result.properties.sources, original.properties.sources);
  assert.deepEqual(result.properties.note, original.properties.note);
  assert.equal(result.properties.id, original.properties.id);
  assert.deepEqual(result.properties.name, features[0].properties.name);
  assert.equal(result.properties.category, features[0].properties.category);
  assert.deepEqual({features, historical, metadata}, before);
});

test('the modern reference replaces the historical fallback only from its reviewed cutoff', () => {
  const {features, historical, metadata} = fixture();
  for (const year of [2014, 2022, 2026]) {
    const selected = contemporaryFeaturesAt(features, historical, year, metadata);
    for (const code of ['RUS', 'UKR']) {
      const result = selected.find(item => item.properties.code === code);
      assert.strictEqual(result, features.find(item => item.properties.code === code), `${year}: ${code}`);
      assert.equal(result.properties.sourceYear, 2022);
      assert.ok(!result.properties.referenceFallback);
    }
  }
  assert.deepEqual(contemporaryFeaturesAt(features, historical, 2010, metadata), []);
});

test('an absent or expired fallback cannot pull an arbitrary earlier imperial outline into a modern view', () => {
  const {features, historical, metadata} = fixture();
  historical[0].properties.contextValidity.end = 2010;
  const selected = contemporaryFeaturesAt(features, historical, 2011, metadata);
  assert.ok(!selected.some(item => item.properties.code === 'RUS'));
  assert.ok(selected.some(item => item.properties.code === 'UKR'));
  const withoutHistorical = contemporaryFeaturesAt(features, [], 2011, metadata);
  assert.deepEqual(withoutHistorical.map(item => item.properties.code), ['DEU']);
});

test('modern context requires both metadata and individual eligibility, with explicit backward review', () => {
  const metadata = {reviewedYear: 2026, contextValidity: interval(2011, 2026)};
  const reviewed = modernFeature('AAA');
  const unreviewed = modernFeature('BBB');
  delete unreviewed.properties.contextValidity;
  const forwardOnly = modernFeature('CCC');
  forwardOnly.properties.contextValidity.backwardReviewed = false;
  const input = [reviewed, unreviewed, forwardOnly];
  assert.deepEqual(contemporaryFeaturesAt(input, [], 2011, metadata), [reviewed]);
  assert.deepEqual(contemporaryFeaturesAt(input, [], 2011, {reviewedYear: 2026}), []);
  assert.deepEqual(contemporaryFeaturesAt(input, [], 2026, {reviewedYear: 2026}), input, 'the explicitly reviewed current dataset remains available at its review year');
  for (const year of [0, NaN, Infinity, '2011', MIN_YEAR - 1, MAX_YEAR + 1]) {
    assert.deepEqual(contemporaryFeaturesAt(input, [], year, metadata), []);
  }
});

test('country-name periods use the selected year at all four reviewed annual cutovers', () => {
  const cases = [
    ['Turkey', 'Türkiye', 2022],
    ['Czech Republic', 'Czechia', 2016],
    ['Swaziland', 'Eswatini', 2018],
    ['Macedonia', 'North Macedonia', 2019],
  ];
  for (const [beforeName, afterName, cutoff] of cases) {
    const before = {en: beforeName, zh: `${beforeName} 中文`};
    const after = {en: afterName, zh: `${afterName} 中文`};
    const item = modernFeature('AAA');
    item.properties.name = after;
    item.properties.namePeriods = [
      {...interval(2011, cutoff - 1), name: before},
      {...interval(cutoff, 2026), name: after},
    ];
    assert.strictEqual(featureNameAt(item, cutoff - 1), before);
    assert.strictEqual(featureNameAt(item, cutoff), after);
    assert.strictEqual(featureNameAt(item, 2026), after);
  }
});

test('an unrelated or malformed name period does not erase a feature name', () => {
  const item = modernFeature('AAA');
  assert.strictEqual(featureNameAt(item, 2015), item.properties.name);
  item.properties.namePeriods = [{start: 0, end: 2026, name: {en: 'Invalid', zh: '无效'}}];
  assert.strictEqual(featureNameAt(item, 2015), item.properties.name);
});

test('Palestine receives the UN observer State category only from the reviewed 2012 cutoff', () => {
  const item = modernFeature('PSE');
  item.properties.category = 'observer-state';
  item.properties.categoryPeriods = [
    {...interval(2011, 2011), category: 'other'},
    {...interval(2012, 2026), category: 'observer-state'},
  ];
  assert.equal(featureCategoryAt(item, 2011), 'other');
  assert.equal(featureCategoryAt(item, 2012), 'observer-state');
  assert.equal(featureCategoryAt(item, 2026), 'observer-state');
  assert.equal(featureCategoryAt(modernFeature('DEU'), 2011), 'country');
});
