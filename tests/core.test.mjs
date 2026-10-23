import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MIN_YEAR, MAX_YEAR, REGIONS, THEMES, TIME_ANCHORS,
  toOrdinal, fromOrdinal, validYear, normalizeYear, addYears, formatYear,
  formatPeriod, yearFromSlider, sliderFromYear, activeAt, filterRecords,
  contemporaries, defaultState, stateFromHash, hashFromState, safeSourceURL,
  validateRecords, validateNotebook, mergeNotebooks
} from '../dist/core.mjs';

const record = (id = 'sample-entry', patch = {}) => ({
  id,
  title: { en: 'Han exchange', zh: '汉代交流' },
  start: -20, end: 20,
  location: { lat: 34.3, lon: 108.9, label: 'Chang’an / 长安' },
  region: 'east-asia', theme: 'exchange',
  summary: { en: 'A selected period of regional trade.', zh: '区域贸易的一个选定时期。' },
  dateNote: { en: 'Selected period; the culture continues.', zh: '选定时期，并非文化终结。' },
  locationPrecision: 'representative',
  sources: [{ title: 'Evidence page', publisher: 'Museum Name', url: 'https://example.org/evidence' }],
  ...patch
});

test('alias search and shared URLs span the whole atlas', () => {
  const rows = [record('atlas-entry'),record('china-entry',{
    aliases:['汴京','Bianjing'],provenance:{dataset:'jiangshan',status:'inherited'}
  })];
  const all = {...defaultState(),mode:'all'};
  assert.equal(filterRecords(rows,all).length,2);
  assert.deepEqual(filterRecords(rows,{...all,collection:'atlas'}).map(r=>r.id),['atlas-entry','china-entry']);
  assert.deepEqual(filterRecords(rows,{...all,collection:'jiangshan',query:'Ｂｉａｎｊｉｎｇ'}).map(r=>r.id),['china-entry']);
  assert.deepEqual(filterRecords(rows,{...all,query:'汴京'}).map(r=>r.id),['china-entry']);
  assert.deepEqual(filterRecords(rows,{...all,collection:'atlas',query:'汴京'}).map(r=>r.id),['china-entry']);
  const state={...all,collection:'jiangshan',entry:'china-entry',query:'汴京'};
  const restored=stateFromHash(hashFromState(state),rows);
  assert.equal(restored.collection,undefined);assert.equal(restored.query,'汴京');assert.equal(restored.entry,'china-entry');
  assert.equal(stateFromHash('#collection=untrusted',rows).collection,undefined);
});

test('civil chronology is contiguous across 1 BCE / 1 CE without year zero', () => {
  assert.equal(toOrdinal(-1), -1);
  assert.equal(toOrdinal(1), 0);
  assert.equal(addYears(-1, 1), 1);
  assert.equal(addYears(1, -1), -1);
  assert.equal(addYears(-2, 3), 2);
  assert.equal(addYears(2, -3), -2);
  for (const year of [MIN_YEAR, -1000, -2, -1, 1, 2, 1000, MAX_YEAR]) {
    assert.equal(fromOrdinal(toOrdinal(year)), year);
    assert.ok(validYear(year));
  }
  assert.equal(validYear(0), false);
  assert.equal(validYear(1.5), false);
  assert.equal(validYear('1200'), false);
});

test('year stepping clamps to coverage and cannot introduce fractional dates', () => {
  assert.equal(addYears(MIN_YEAR, -1), MIN_YEAR);
  assert.equal(addYears(MAX_YEAR, 1), MAX_YEAR);
  assert.equal(addYears(1, -1e9), MIN_YEAR);
  assert.equal(addYears(-1, 1e9), MAX_YEAR);
  assert.equal(addYears(1200, 0.9), 1200);
  assert.equal(addYears(1200, -0.9), 1200);
  assert.equal(addYears(1200, Number.NaN), 1200);
});

test('year input accepts decimal civil years and rejects coercion surprises', () => {
  assert.equal(normalizeYear('-500'), -500);
  assert.equal(normalizeYear(' 1200 '), 1200);
  for (const value of [0, '0', null, undefined, true, false, '', '1e3', '0x10', '1.5', Infinity, MIN_YEAR - 1, MAX_YEAR + 1]) {
    assert.equal(normalizeYear(value), 1200, String(value));
  }
  assert.equal(normalizeYear('bad', 1500), 1500);
  assert.equal(normalizeYear('bad', 0), 1200);
});

test('year labels and periods display the no-zero convention in both languages', () => {
  assert.equal(formatYear(-1), '1 BCE');
  assert.equal(formatYear(1), '1 CE');
  assert.equal(formatYear(1200), '1200 CE');
  assert.equal(formatYear(-13000), '13,000 BCE');
  for (const invalid of [0, 1.5, NaN]) assert.throws(() => formatYear(invalid), RangeError);
  assert.equal(formatYear(-1, 'zh'), '公元前1年');
  assert.equal(formatPeriod(record('one', { start: 1, end: 1 })), '1 CE');
  assert.equal(formatPeriod(record('cross', { start: -1, end: 1 })), '1 BCE – 1 CE');
});

test('nonlinear slider anchors and civil-year round trips remain precise', () => {
  TIME_ANCHORS.forEach((year, i) => {
    assert.equal(yearFromSlider(i * 1000), year);
    assert.equal(sliderFromYear(year), i * 1000);
  });
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    if (year === 0) continue;
    assert.equal(yearFromSlider(sliderFromYear(year)), year, String(year));
  }
  assert.equal(yearFromSlider(-100), MIN_YEAR);
  assert.equal(yearFromSlider(9000), MAX_YEAR);
  assert.equal(yearFromSlider(Number.NaN), MIN_YEAR);
});

test('integer slider quantization stays within half of each segment step', () => {
  for (let year = MIN_YEAR; year <= MAX_YEAR; year += 17) {
    if (year === 0) continue;
    const position = sliderFromYear(year);
    const i = Math.min(7, Math.floor(position / 1000));
    const maxError = Math.ceil((toOrdinal(TIME_ANCHORS[i + 1]) - toOrdinal(TIME_ANCHORS[i])) / 2000);
    assert.ok(Math.abs(toOrdinal(yearFromSlider(Math.round(position))) - toOrdinal(year)) <= maxError);
  }
});

test('focus intervals are inclusive; a point event appears only in its year', () => {
  const r = record('phase', { start: -1, end: 1 });
  assert.equal(activeAt(r, -1), true);
  assert.equal(activeAt(r, 1), true);
  for (const year of [-2, 0, 2, 0.5, NaN]) assert.equal(activeAt(r, year), false);
  const e = record('event', { start: 1919, end: 1919 });
  assert.equal(activeAt(e, 1918), false);
  assert.equal(activeAt(e, 1919), true);
  assert.equal(activeAt(e, 1920), false);
  assert.equal(activeAt(null, 1919), false);
});

test('filters combine time, region, theme, saved state and bilingual visible content', () => {
  const rows = [
    record('b-entry', { start: 1000, end: 1200 }),
    record('a-entry', { start: 1000, end: 1200 }),
    record('africa-entry', { start: 1000, end: 1400, region: 'africa', theme: 'cities' }),
    record('later-entry', { start: 1300, end: 1400 })
  ];
  const s = { ...defaultState(), year: 1200 };
  assert.deepEqual(filterRecords(rows, s).map(r => r.id), ['a-entry', 'africa-entry', 'b-entry']);
  assert.deepEqual(filterRecords(rows, { ...s, region: 'africa', theme: 'cities' }).map(r => r.id), ['africa-entry']);
  assert.deepEqual(filterRecords(rows, { ...s, savedOnly: true }, ['b-entry']).map(r => r.id), ['b-entry']);
  assert.equal(filterRecords(rows, { ...s, query: '汉代' }).length, 3);
  assert.equal(filterRecords(rows, { ...s, query: 'ＨＡＮ' }).length, 3);
  assert.equal(filterRecords(rows, { ...s, query: '长安' }).length, 3);
  assert.equal(filterRecords(rows, { ...s, query: 'Museum Name' }).length, 0, 'source metadata is not part of visible-content search');
  assert.equal(filterRecords(rows, { ...s, mode: 'all', query: 'HAN' }).length, 4);
  assert.equal(filterRecords(rows, { ...s, query: 'no match' }).length, 0);
});

test('contemporaries prefer regional spread, fill spare capacity and exclude selection', () => {
  const selected = record('selected', { region: 'east-asia' });
  const rows = [
    selected, record('east-two'), record('east-one'),
    record('africa-two', { region: 'africa' }), record('africa-one', { region: 'africa' }),
    record('europe-one', { region: 'europe' }),
    record('future', { start: 500, end: 501, region: 'oceania' })
  ];
  const result = contemporaries(rows, selected, 1, 5);
  assert.equal(result.length, 5);
  assert.equal(new Set(result.map(r => r.id)).size, 5);
  assert.deepEqual(result.slice(0, 3).map(r => r.region), ['africa', 'europe', 'east-asia']);
  assert.equal(result.some(r => r.id === 'selected' || r.id === 'future'), false);
  assert.deepEqual(contemporaries(rows, selected, 1, 0), []);
  assert.deepEqual(contemporaries(rows, selected, 1, -1), []);
});

test('URL parser rejects unknown identities, enums and invalid years', () => {
  const rows = [record('entry-a'), record('entry-b')];
  const s = stateFromHash('#year=0&lang=fr&mode=evil&region=__proto__&theme=war&entry=unknown&compare=entry-a,unknown,entry-a,entry-b,entry-c', rows);
  assert.equal(s.year, 1200);
  assert.equal(s.lang, 'en');
  assert.equal(s.mode, 'year');
  assert.equal(s.region, 'all');
  assert.equal(s.theme, 'all');
  assert.equal(s.entry, '');
  assert.deepEqual(s.compare, ['entry-a', 'entry-b']);
  assert.equal(stateFromHash('#year=-1', rows).year, -1);
  assert.equal(stateFromHash('#year=1e3', rows).year, 1200);
  assert.equal(stateFromHash('#q=' + 'a'.repeat(500), rows).query.length, 200);
});

test('shareable state round-trips Unicode, punctuation and encoded hostile text as data', () => {
  const rows = [record('entry-a'), record('entry-b')];
  const s = { ...defaultState(), year: -1, lang: 'zh', mode: 'all', region: 'east-asia', theme: 'exchange',
    query: '长安 & <img src=x onerror=alert(1)> # + %', entry: 'entry-a', compare: ['entry-a', 'entry-b'] };
  const hash = hashFromState(s);
  assert.ok(!hash.includes('<img'));
  assert.deepEqual(stateFromHash(hash, rows), s);
  assert.equal(hashFromState(stateFromHash(hash, rows)), hash);
});

test('source links allow credential-free HTTPS only', () => {
  assert.equal(safeSourceURL('https://example.org/history?q=汉#section'), true);
  for (const value of ['http://example.org', 'javascript:alert(1)', 'data:text/html,test', 'file:///tmp/x',
    '//example.org', '/relative', 'https://name:password@example.org', 'https://name@example.org', '', null]) {
    assert.equal(safeSourceURL(value), false, String(value));
  }
});

test('record validation checks content structure and reports malformed records without throwing', () => {
  assert.deepEqual(validateRecords([record()]), []);
  for (const bad of [[], null, {}, 'text']) assert.ok(validateRecords(bad).length);
  const badRecords = [null, undefined, 1, 'text', [], {}, record('bad id'), record('sample-entry', { sources: {} }),
    record('source-null', { sources: [null] }), record('source-title', { sources: [{url:'https://example.org',title:{},publisher:7}] })];
  for (const bad of badRecords) {
    assert.doesNotThrow(() => validateRecords([bad]));
    assert.ok(validateRecords([bad]).length, JSON.stringify(bad));
  }
  assert.match(validateRecords([record(), record()]).join(';'), /duplicate/);
  for (const patch of [
    {start:0}, {start:2,end:1}, {start:MAX_YEAR+1}, {region:'nowhere'}, {theme:'unknown'},
    {title:{en:' ',zh:'标题'}}, {location:{lat:91,lon:0,label:'place'}},
    {location:{lat:0,lon:181,label:'place'}}, {locationPrecision:'exact'},
    {sources:[]}, {sources:[{title:'x',publisher:'y',url:'http://example.org'}]}
  ]) assert.ok(validateRecords([record('bad-entry',patch)]).length);
});

test('notebook validation preserves text as inert data and removes duplicate saved IDs', () => {
  const rows = [record('entry-a'), record('entry-b')];
  const text = '<script>alert(1)</script> 汉字';
  const validated = validateNotebook({ version:1, saved:['entry-a','entry-a'], notes:{'entry-b':text} }, rows);
  assert.deepEqual(validated.saved, ['entry-a']);
  assert.equal(validated.notes['entry-b'], text);
  assert.equal(Object.getPrototypeOf(validated.notes), null);
});

test('notebook validation rejects incomplete, hostile, unknown and over-budget input', () => {
  const rows = [record('entry-a')];
  const cases = [
    null, {}, {version:2,saved:[],notes:{}}, {version:1,saved:[],notes:[]},
    {version:1,saved:['unknown'],notes:{}}, {version:1,saved:[1],notes:{}},
    {version:1,saved:[],notes:{unknown:'note'}}, {version:1,saved:[],notes:{'entry-a':12}},
    {version:1,saved:[],notes:{'entry-a':'x'.repeat(3001)}},
    {version:1,saved:Array(1001).fill('entry-a'),notes:{}},
    JSON.parse('{"version":1,"saved":[],"notes":{"__proto__":{"polluted":true}}}'),
    JSON.parse('{"version":1,"saved":[],"notes":{"constructor":"attack"}}')
  ];
  for (const value of cases) assert.throws(() => validateNotebook(value, rows));
  assert.doesNotThrow(() => validateNotebook({version:1,saved:[],notes:{'entry-a':'x'.repeat(3000)}}, rows));
  assert.equal({}.polluted, undefined);
});

test('merging notebooks unions saved entries and gives explicit imported notes precedence', () => {
  const current={version:1,saved:['entry-a'],notes:{'entry-a':'old','entry-b':'preserved'}};
  const incoming={version:1,saved:['entry-a','entry-b'],notes:{'entry-a':'new'}};
  const merged=mergeNotebooks(current,incoming);
  assert.deepEqual(merged,{version:1,saved:['entry-a','entry-b'],notes:{'entry-a':'new','entry-b':'preserved'}});
  assert.equal(current.notes['entry-a'],'old','merge must not mutate current notes');
  assert.deepEqual(incoming.saved,['entry-a','entry-b']);
});

test('published region and theme enumerations are unique stable tokens', () => {
  for (const values of [REGIONS, THEMES]) {
    assert.equal(values.length, new Set(values).size);
    values.forEach(v => assert.match(v,/^[a-z]+(?:-[a-z]+)*$/));
  }
});

