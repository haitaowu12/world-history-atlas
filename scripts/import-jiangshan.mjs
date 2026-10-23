#!/usr/bin/env node
// Reproducible, non-executing import of the frozen reference data. This checks
// structure and provenance; it does not certify inherited historical assertions.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = process.argv[process.argv.indexOf('--source-dir') + 1];
if (!process.argv.includes('--source-dir') || !SOURCE_DIR) {
  throw new Error('Usage: node scripts/import-jiangshan.mjs --source-dir /absolute/directory (map_data.js, lore_data.js, i18n_dict.js, LICENSE, README.md from the pinned commit)');
}
const COMMIT = 'fcd6484d06d3c581241fc24adbab288cf3a4a2ea';
const REPOSITORY = 'https://github.com/haitaowu12/jiangshan-map';
const UPSTREAM = 'https://github.com/DeanChensj/jiangshan-map';
const CHECKED_AT = '2026-10-23';
const LIMIT = 440000;
const EXPECTED = {
  'map_data.js': { path: 'js/map_data.js', gitBlobSha: '70e049066702919ac3fbcb791fc0371ce5513475', sha256: 'e2c19a04461d27bd510e8a18e95beb8dea4a142cb530939df57525a832054c5e' },
  'lore_data.js': { path: 'js/lore_data.js', gitBlobSha: 'c394bb341d0d6f1d19051de80ed7fb77879d6630', sha256: '57e82424efbc0837e080ea08337c0b481e5b62b8e2615a48756015dee50e49e1' },
  'i18n_dict.js': { path: 'js/i18n_dict.js', gitBlobSha: 'e172cc7c505127ddebba465fc1193f90539d9414', sha256: '85a37b2c0ededd2963e49100612d79f8b8127f0c53425c1e2a4e8548b7964095' },
  'LICENSE': { path: 'LICENSE', gitBlobSha: '870ac73489dc0e5a7e9f6c8589d619ea65fd37c8', sha256: '403c74e31445c215cde7e84a108610c8d182737db2fa2f46174d25ec9c1e6f25' },
  'README.md': { path: 'README.md', gitBlobSha: '4d749ab1e4d193ce4b2f0e1085db688909b8abd7', sha256: '817696426dd94d948b9bc41d0fe55d0349f57429562081fbb8658a03cf371724' }
};
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const bytesByFile = new Map();
const sourceFiles = [];
for (const [name, expected] of Object.entries(EXPECTED)) {
  const bytes = fs.readFileSync(path.resolve(SOURCE_DIR, name));
  const gitBlobSha = crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if (digest(bytes) !== expected.sha256 || gitBlobSha !== expected.gitBlobSha) throw new Error(`Pinned source mismatch: ${name}`);
  bytesByFile.set(name, bytes);
  sourceFiles.push({ ...expected, bytes: bytes.length, url: `${REPOSITORY}/blob/${COMMIT}/${expected.path}` });
}
// Every input is a JSON literal assigned to a window property. JSON.parse avoids
// running code from a third-party repository or depending on its application.
function assignments(filename) {
  const text = bytesByFile.get(filename).toString('utf8');
  const matches = [...text.matchAll(/window\.([A-Z_]+)\s*=\s*/g)];
  return Object.fromEntries(matches.map((match, i) => {
    const from = match.index + match[0].length;
    const to = i + 1 < matches.length ? matches[i + 1].index : text.length;
    return [match[1], JSON.parse(text.slice(from, to).trim().replace(/;\s*$/, ''))];
  }));
}
const { DYNASTY_DATA: dynasties, CORRIDOR_DATA: corridors } = assignments('map_data.js');
const { ATLAS_LORE_DATA: lore } = assignments('lore_data.js');
const { EN_LOCALE: english } = assignments('i18n_dict.js');
const bi = (zh, en) => ({ en: en || zh || '', zh: zh || en || '' });
const translate = text => english.dict[text] || text;
const ref = (file, pointer, index) => ({ file, path: pointer, index });
const pad = n => String(n + 1).padStart(3, '0');
const validYear = y => Number.isInteger(y) && y !== 0 && y >= -13000 && y <= 2026;
const previousYear = y => y === 1 ? -1 : y - 1;
const point = (coord, label) => ({ lon: coord[0], lat: coord[1], label });
const issue = (code, zh, en) => ({ code, note: bi(zh, en) });
const reviewNote = bi('继承自《江山时序》的记录；已核对导入结构和出处，尚未逐条独立核实历史论断。', 'Inherited from Chronicles of the Realm. Import structure and provenance were checked; historical assertions have not each been independently corroborated.');
const dateNote = bi('按来源条目中的公元纪年显示；单一年份仅是该条目的时间锚点。点位为来源的示意位置，不保证人物当年亲自到达此处。', 'Uses the civil year supplied by the source. A single year anchors this entry; its schematic point does not establish a person’s presence there in that year.');
const source = {
  dataset: 'jiangshan', repository: REPOSITORY, upstreamRepository: UPSTREAM,
  commit: COMMIT, title: bi('江山时序', 'Chronicles of the Realm'),
  checkedAt: CHECKED_AT, reviewStatus: 'inherited', files: sourceFiles,
  licenseNotice: 'china-upstream.LICENSE.md', note: reviewNote
};
const sourceCitation = file => ({
  title: `Chronicles of the Realm — ${file} (frozen source dataset)`,
  url: `${REPOSITORY}/blob/${COMMIT}/${file}`, publisher: 'DeanChensj / Chronicles of the Realm',
  evidenceNote: 'Dataset provenance, not independent corroboration of the historical claim.', checkedAt: CHECKED_AT
});
const sourceRecordCounts = {
  milestones: dynasties.reduce((n, d) => n + d.milestones.length, 0),
  landmarkEvents: lore.PLACE_LANDMARK_EVENTS.length,
  profiles: lore.PERSON_PROFILES.length,
  journeys: lore.HISTORICAL_JOURNEYS.length,
  journeyStops: lore.HISTORICAL_JOURNEYS.reduce((n, j) => n + j.stops.length, 0),
  cityLore: lore.CITY_LORE.length, gazetteer: lore.PLACE_GAZETTEER.length,
  settlements: dynasties.reduce((n, d) => n + d.settlements.length, 0),
  passes: lore.STRATEGIC_PASSES.length, eras: dynasties.length,
  eraNames: lore.CHINESE_ERA_SPANS.length, phaseRules: dynasties.reduce((n, d) => n + (d.phases || []).length, 0),
  corridors: corridors.length, audioTracks: lore.GUQIN_TRACKS.length
};
const imported = [], merged = [], held = [], amendments = [];
const seen = new Map();
function theme(text) {
  if (/诗|词|赋|书法|画|文学|兰亭|赤壁赋|赤壁怀古/.test(text)) return 'culture';
  if (/印刷|造纸|科学|数学|天文|本草|农书|著成|编纂|书院|讲学|学宫|历法|水利|运河/.test(text)) return 'knowledge';
  if (/使者|出使|贸易|商贸|丝路|丝绸|西洋|港|开海|通商/.test(text)) return 'exchange';
  if (/迁都|建都|筑城|建城|城墙/.test(text)) return 'cities';
  return 'states';
}
function region([lon, lat]) {
  if (lon < 75) return 'west-central-asia';
  if (lat < 23 && lon < 109) return 'southeast-asia';
  return 'east-asia';
}
function addEvent({ id, year, coord, title, site, periodId, sourceRecord }) {
  if (!validYear(year) || coord.length !== 2 || coord.some(x => !Number.isFinite(x)) || Math.abs(coord[0]) > 180 || Math.abs(coord[1]) > 90) throw new Error(`Invalid source event ${id}`);
  const key = JSON.stringify([year, title.zh, coord]);
  if (seen.has(key)) {
    const kept = seen.get(key);
    kept.provenance.sourceRecords.push(sourceRecord);
    if (!kept.provenance.periodIds.includes(periodId)) kept.provenance.periodIds.push(periodId);
    merged.push({ sourceId: id, retainedId: kept.id, reason: 'Identical civil year, Chinese event wording, and coordinate pair.', sourceRecord });
    return;
  }
  const record = {
    id, title, start: year, end: year, location: point(coord, site.en || site.zh),
    region: region(coord), theme: theme(title.zh), kind: 'event', importance: 1,
    summary: { ...title }, dateNote: { ...dateNote }, locationPrecision: 'representative',
    sources: [sourceCitation(sourceRecord.file)],
    aliases: [site.zh, site.en].filter(Boolean),
    provenance: { dataset: 'jiangshan', status: 'inherited', sourceCommit: COMMIT,
      periodId, periodIds: [periodId], sourceRecords: [sourceRecord], note: { ...reviewNote } }
  };
  seen.set(key, record);
  const cautions = [];
  const amend = (code, newTitle, note) => {
    record.provenance.originalText ??= { title: { ...record.title }, summary: { ...record.summary } };
    record.title = { ...newTitle }; record.summary = { ...newTitle };
    cautions.push({ code, note });
    amendments.push({ id, code, originalTitle: record.provenance.originalText.title, displayedTitle: { ...newTitle }, reason: note });
  };
  if (year === 230 && /夷洲/.test(title.zh)) {
    amend('place-identification-disputed', bi('230年：来源纪事中的夷洲远征；地点认定存在争议', '230: an expedition to Yizhou in the reference chronicle; identification disputed'), bi('来源把夷洲直接等同于台湾；本图不采纳这一未独立核实的认定。保留原文及来源点位仅供查考。', 'The source identifies Yizhou with Taiwan. This uncorroborated identification is not adopted. Original wording and source point are retained for inspection.'));
    record.location.label = 'Yizhou — disputed identification; source point is one interpretation';
  }
  if (year === 751 && /怛[罗罗斯]+|造纸/.test(title.zh)) {
    amend('causal-link-unverified', bi('751年：怛罗斯之战', '751: the Battle of Talas'), bi('省去“此战使造纸术西传”的直接因果论断；这需要另行核实传播史。', 'The direct claim that this battle transmitted papermaking westward is omitted pending a separate review of its transmission history.'));
  }
  if (year === 1945 && /台湾|光复/.test(title.zh)) {
    amend('sovereignty-framing-neutralized', bi('1945年：台湾的战时行政转变', '1945: Taiwan’s wartime administrative transition'), bi('采用中性检索标题。来源使用“收回／光复”的表述；该表述不作为本图对主权或法律地位的结论，事件细节待独立复核。', 'Neutral discovery wording replaces the source’s recovery/retrocession framing. This entry makes no conclusion about sovereignty or legal status; event details await independent review.'));
  }
  if (year === 1951 && /十七条|西藏/.test(title.zh)) {
    amend('political-framing-neutralized', bi('1951年：《十七条协议》', '1951: the Seventeen Point Agreement'), bi('省去来源“和平解放”的政治定性；保留协议名称作为中性检索主题。', 'The source’s political characterization as peaceful liberation is omitted; the agreement’s name is retained as a neutral discovery topic.'));
  }
  if (year === -138 && coord[0] < 75) cautions.push(issue('mission-anchor-not-departure', '来源在使命起始年份使用中亚代表点，不能理解为张骞在该年已经到达此地。', 'The source uses a Central Asian reference point for the mission’s starting year. It does not establish that Zhang Qian had reached this location in that year.'));
  if (year === 166 && /大秦|中罗/.test(title.zh)) cautions.push(issue('envoy-identification-unreviewed', '使团身份及“首次直接往来”的说法继承自来源，尚未独立核实。', 'The envoy attribution and claimed first direct contact are inherited assertions that have not been independently reviewed.'));
  if (/收复|光复|和平解放|纳入中央|正式收回|一统|世界最早|首次/.test(title.zh) && !cautions.length) cautions.push(issue('framing-or-priority-claim-unreviewed', '来源中的政治表述、统一叙事或“最早／首次”论断尚未独立核实，不等于本图采纳该判断。', 'Political framing, unification narratives, or first/earliest claims in the inherited wording have not been independently verified and are not adopted as atlas conclusions.'));
  if (cautions.length) record.provenance.reviewIssues = cautions;
  if (sourceRecord.file === 'js/lore_data.js' && sourceRecord.index === 411) {
    held.push({ id, reason: bi('叙事涉及满剌加与斯里兰卡，但来源点位在越南占城海岸；暂不将该记录放到地图上，等待拆分事件及核对地点。', 'The narrative concerns Malacca and Sri Lanka, but the source point is on the Champa coast of Vietnam. Withheld from the map pending event separation and location review.'), record });
    return;
  }
  imported.push(record);
}
dynasties.forEach((d, di) => d.milestones.forEach((m, i) => {
  const translation = english.milestones[`${d.key}:${m.year}`];
  if (!translation?.[0] || !translation?.[1]) throw new Error(`Missing milestone translation ${d.key}:${m.year}`);
  addEvent({ id: `china-event-${d.key}-${pad(i)}`, year: m.year, coord: m.coord,
    title: bi(m.headline, translation[0]), site: bi(m.site, translation[1]), periodId: d.key,
    sourceRecord: ref('js/map_data.js', `/DYNASTY_DATA/${di}/milestones/${i}`, i) });
}));
lore.PLACE_LANDMARK_EVENTS.forEach((m, i) => addEvent({
  id: `china-landmark-${pad(i)}`, year: m.year, coord: m.coord,
  title: bi(m.zh, m.en), site: bi(m.site, m.siteEn), periodId: m.dynastyKey,
  sourceRecord: ref('js/lore_data.js', `/ATLAS_LORE_DATA/PLACE_LANDMARK_EVENTS/${i}`, i)
}));
imported.sort((a, b) => a.start - b.start || a.id.localeCompare(b.id));

const settlements = dynasties.flatMap((d, di) => d.settlements.map((s, i) => ({
  id: `china-place-${d.key}-${pad(i)}`, periodId: d.key,
  name: bi(s.ancient, translate(s.ancient)), modern: bi(s.modern, translate(s.modern)),
  coord: s.coord, location: point(s.coord, translate(s.ancient)),
  start: Math.max(d.fromYear, s.appear ?? d.fromYear), end: Math.min(2026, d.toYear, s.vanish ?? d.toYear),
  appear: s.appear ?? null, vanish: s.vanish ?? null,
  remark: bi(s.remark || '', translate(s.remark || '')), isCapital: Boolean(s.isCapital), tier: s.tier ?? 1,
  provenance: { status: 'inherited', sourceRecord: ref('js/map_data.js', `/DYNASTY_DATA/${di}/settlements/${i}`, i),
    dateMeaning: 'Reference display window; neither a founding/abandonment date nor proof of continuous capital status.' }
})));
const library = {
  schemaVersion: 1, source, counts: sourceRecordCounts,
  notes: {
    scope: bi('原项目的中国及周边地区资料目录；原文与来源译文有明确出处，但并非全部经过独立历史核实。', 'A directory of the reference project’s China and neighboring-area material. Original wording and source translations are attributed, but not every assertion has independent historical review.'),
    periods: bi('时期是原项目的显示分段，不等于王朝建国、灭亡或地方持续统治的精确区间。', 'Periods are the reference project’s display segments, not precise dynasty lifespans or proof of continuous local rule.'),
    profiles: bi('人物目录保留姓名、别名与来源年代；相关事件只是词语匹配，并非已核实的人物传记或亲历路线。', 'Profiles retain names, aliases and source dates. Related events are literal name matches, not verified biographies or proof of personal travel.'),
    journeys: bi('人物纪事按时间串联地点；军事行动、诗歌意象与代表点不得当作本人实际行程。原文引句及英译继承自来源，未逐一校勘。', 'Chronicles connect places through time. Campaign locations, poetic settings and representative points do not establish personal travel. Quotations and English translations are inherited and have not each been textually verified.'),
    settlements: bi('同一地点在不同时期可有多行。起讫年是来源的显示约束；首都标记是时期层级描述，不保证整个时期持续为都。', 'A location may have multiple period rows. Date limits control source display; a capital flag is a period-level description and does not establish capital status throughout that interval.')
  },
  eras: dynasties.map((d, i) => ({ id: d.key, name: bi(d.title, english.dynasties[d.key]?.name),
    start: d.fromYear, end: Math.min(2026, d.toYear), sourceEnd: d.toYear, focusYear: d.focusYear,
    capital: bi(d.seat, english.dynasties[d.key]?.capital), summary: bi(d.summary, english.dynasties[d.key]?.desc),
    phases: d.phases || [], intervalMeaning: 'reference-display-window',
    sourceRecord: ref('js/map_data.js', `/DYNASTY_DATA/${i}`, i) })),
  profiles: lore.PERSON_PROFILES.map((p, i) => {
    // Related mentions are deliberately separated from verified itineraries.
    const names = [p.zh, ...(p.aliases || []).filter(x => /[\u3400-\u9fff]/.test(x) && x.length >= 2)];
    const eventIds = imported.filter(e => e.start >= p.span[0] && e.end <= p.span[1] && names.some(n => (e.provenance.originalText?.title.zh || e.title.zh).includes(n))).map(e => e.id);
    return { id: `china-person-${p.key.replaceAll('_', '-')}`, key: p.key, name: bi(p.zh, p.en), subtitle: bi(p.courtesyZh || '', p.courtesyEn || ''), span: p.span,
      aliases: [...new Set([p.key, ...(p.aliases || [])])], periodId: p.dynastyKey, eventIds,
      journeyId: p.journeyKey ? `china-journey-${p.journeyKey}` : null,
      linkMeaning: 'literal name matches within the source lifespan; related mentions, not verified itinerary',
      sourceRecord: ref('js/lore_data.js', `/ATLAS_LORE_DATA/PERSON_PROFILES/${i}`, i), reviewStatus: 'inherited' };
  }),
  journeys: lore.HISTORICAL_JOURNEYS.map((j, i) => ({
    id: `china-journey-${j.key}`, key: j.key, title: bi(j.titleZh, j.titleEn), name: bi(j.shortZh, j.shortEn),
    periodId: j.dynastyKey, spanLabel: bi(j.spanZh, j.spanEn), start: j.stops[0].year, end: j.stops.at(-1).year,
    geometryPrecision: 'schematic', chronicleKind: ['qinshihuang', 'zhugeliang'].includes(j.key) ? 'campaign-chronicle' : 'biographical-chronicle',
    reviewStatus: 'inherited',
    sourceRecord: ref('js/lore_data.js', `/ATLAS_LORE_DATA/HISTORICAL_JOURNEYS/${i}`, i),
    stops: j.stops.map((s, si) => ({ id: `china-stop-${j.key}-${pad(si)}`, year: s.year,
      title: bi(s.titleZh, s.titleEn), description: bi(s.descZh, s.descEn), quotation: bi(s.quoteZh || '', s.quoteEn || ''),
      location: point(s.coord, s.ancientEn || s.ancientZh), place: { ...bi(s.ancientZh, s.ancientEn), ancient: bi(s.ancientZh, s.ancientEn), modern: bi(s.modernZh, s.modernEn) },
      era: s.eraZh || '', coord: s.coord, fromCoord: s.fromCoord || null, via: s.via || [], sourceIndex: si,
      personalPresenceVerified: false }))
  })),
  cityLore: lore.CITY_LORE.map((x, i) => ({ id: `china-city-${pad(i)}`, name: bi(x.modern, translate(x.modern)), coord: x.coord,
    title: bi(x.tagZh, x.tagEn), description: bi(x.descZh, x.descEn), reviewStatus: 'inherited',
    sourceRecord: ref('js/lore_data.js', `/ATLAS_LORE_DATA/CITY_LORE/${i}`, i) })),
  gazetteer: lore.PLACE_GAZETTEER.map((x, i) => ({ id: `china-gazetteer-${pad(i)}`, name: bi(x.name, translate(x.name)),
    aliases: x.aliases || [], modern: bi(x.modern, translate(x.modern)), coord: x.coord, reviewStatus: 'inherited',
    sourceRecord: ref('js/lore_data.js', `/ATLAS_LORE_DATA/PLACE_GAZETTEER/${i}`, i) })),
  passes: lore.STRATEGIC_PASSES.map((x, i) => ({ id: `china-pass-${x.key}`, key: x.key, name: bi(x.ancientZh, x.ancientEn),
    modern: bi(x.modernZh, x.modernEn), coord: x.coord, start: x.appear, end: Math.min(2026, x.vanish), focusYear: x.focusYear,
    range: bi(x.rangeZh, x.rangeEn), description: bi(x.chokepointZh, x.chokepointEn), reviewStatus: 'inherited',
    sourceRecord: ref('js/lore_data.js', `/ATLAS_LORE_DATA/STRATEGIC_PASSES/${i}`, i) })),
  eraNames: lore.CHINESE_ERA_SPANS.map((x, i) => ({ id: `china-era-name-${pad(i)}`, start: x[0],
    end: i + 1 < lore.CHINESE_ERA_SPANS.length ? previousYear(lore.CHINESE_ERA_SPANS[i + 1][0]) : 2026,
    name: x[1], eraYearAtStart: x[2], monarch: bi(x[3], x[4]), ruler: bi(x[3], x[4]), sourceIndex: i,
    meaning: 'Selected ruler/era convention inherited from source; not an exhaustive list of simultaneous regimes.' })),
  corridors: corridors.map((x, i) => ({ id: `china-corridor-${x.key.replaceAll('_', '-')}`, key: x.key, kind: x.kind,
    title: bi(x.title, english.corridors[x.key]?.[0] || translate(x.title)),
    summary: bi(x.summary, english.corridors[x.key]?.[1] || translate(x.summary)),
    start: x.span[0], end: Math.min(2026, x.span[1]), sourceSpan: x.span, segments: x.segments,
    geometryPrecision: 'schematic', reviewStatus: 'inherited',
    sourceRecord: ref('js/map_data.js', `/CORRIDOR_DATA/${i}`, i) }))
};
// The source's last era row is an historical ROC convention, not a live
// assertion that a single reign/era applies to every location today.
library.eraNames.at(-1).end = 1949;
library.eraNames.at(-1).note = bi('仅作为来源中国史分段中的民国纪年记录展示；此1949显示截止不是关于中华民国是否继续存在的判断。', 'Shown only within the source’s mainland-China period sequence. This 1949 display cutoff makes no assertion about the continued existence of the Republic of China.');

const outputDir = path.join(ROOT, 'dist/data');
function writeJSON(filename, value) {
  const content = JSON.stringify(value) + '\n';
  if (Buffer.byteLength(content) >= 450000) throw new Error(`${filename} exceeds the delivery chunk limit`);
  fs.writeFileSync(path.join(outputDir, filename), content);
  return { path: filename, bytes: Buffer.byteLength(content), sha256: digest(content), ...(Array.isArray(value) ? { count: value.length } : {}) };
}
function writeChunks(stem, rows) {
  const files = []; let chunk = [];
  for (const row of rows) {
    if (chunk.length && Buffer.byteLength(JSON.stringify([...chunk, row])) > LIMIT) {
      files.push(writeJSON(`${stem}-${String(files.length + 1).padStart(2, '0')}.json`, chunk)); chunk = [];
    }
    chunk.push(row);
  }
  if (chunk.length) files.push(writeJSON(`${stem}-${String(files.length + 1).padStart(2, '0')}.json`, chunk));
  return files;
}
library.settlementFiles = writeChunks('china-library-settlements', settlements);
// Library sections stay together unless the whole normalized directory is too
// large; only the large city/place arrays need separate files in this snapshot.
const placeSections = { cityLore: library.cityLore, gazetteer: library.gazetteer, passes: library.passes };
const placeFile = writeJSON('china-library-places.json', placeSections);
delete library.cityLore; delete library.gazetteer; delete library.passes;
library.placeFiles = [placeFile];
const libraryFile = writeJSON('china-library.json', library);
const eventFiles = writeChunks('china-events', imported);
const manifest = {
  schemaVersion: 1, source, sourceCounts: sourceRecordCounts,
  counts: { sourceEventRows: sourceRecordCounts.milestones + sourceRecordCounts.landmarkEvents,
    importedEvents: imported.length, mergedDuplicateRows: merged.length, heldEvents: held.length,
    distinctSourceEvents: imported.length + held.length, ...sourceRecordCounts },
  eventFiles, libraryFiles: [libraryFile, placeFile, ...library.settlementFiles], merged, held, amendments,
  omitted: [
    { collection: 'GUQIN_TRACKS', count: lore.GUQIN_TRACKS.length, reason: 'Background audio assets are not historical records; not copied in this content import.' },
    { collection: 'atlas_snapshots.js geometry', reason: 'This is a narrative/place import. Existing atlas boundary layers retain their separate source review; phase metadata is included, extra raw boundary polygons are not imported.' }
  ],
  invariants: [
    'Every source milestone and landmark row is represented by a mapped event, a duplicate ledger pointer, or a held record.',
    `${sourceRecordCounts.milestones + sourceRecordCounts.landmarkEvents} source event rows = ${imported.length} mapped events + ${merged.length} identical duplicate rows + ${held.length} held location mismatch.`,
    'All 104 profiles, 7 chronicles/68 stops, 87 city notes, 185 gazetteer entries, 20 passes, 1387 era-place rows, 342 era names and 16 corridors are preserved.',
    'Inherited does not mean independently fact-checked. Profile mentions do not establish personal travel. Display periods do not establish dynasty lifespans or continuous city/capital status.'
  ]
};
writeJSON('china-import-manifest.json', manifest);
fs.writeFileSync(path.join(outputDir, 'china-upstream.LICENSE.md'), `# Chronicles of the Realm content import\n\nAuthor: DeanChensj, 2026. Source project: ${UPSTREAM}.\nFrozen fork commit: [${COMMIT}](${REPOSITORY}/tree/${COMMIT}).\n\n## Scope and attribution\n\nThe china-events and china-library datasets adapt the event wording, bilingual dictionary, person/profile records, place notes, historical chronicles, era-name list, and schematic corridor records from js/map_data.js, js/lore_data.js and js/i18n_dict.js at this exact commit. Original Chinese wording and source English translations are inherited except for the explicitly documented neutral display amendments in china-import-manifest.json. Programmatic normalization and the importer are authored for this atlas.\n\n## Source notice mismatch retained\n\nThe pinned LICENSE file contains the MIT notice reproduced below, while the pinned README credits the project as GPL-3.0 and names additional cartographic sources. Both statements are preserved; this import does not claim that the README statement, third-party datasets, or their notices have been superseded. The inherited content is not included in this atlas's blanket license for newly authored narrative text. No new raw boundary polygons or media recordings are copied by this importer.\n\nPinned [LICENSE](${REPOSITORY}/blob/${COMMIT}/LICENSE) and [README](${REPOSITORY}/blob/${COMMIT}/README.md). GPL-3.0 text is included elsewhere in this distribution as territories.LICENSE and is available at https://www.gnu.org/licenses/gpl-3.0.html .\n\n## Original LICENSE text\n\n${bytesByFile.get('LICENSE').toString('utf8')}\n\n## Historical evidence\n\nThe original project's README names Tan Qixiang's Historical Atlas of China, CHGIS (Harvard-Yenching Institute and Fudan University), Robert M. Hartwell datasets, and aourednik/historical-basemaps. These are collection-level acknowledgements, not item-level corroborating citations for every imported narrative. An inherited entry is therefore presented as a reference-project record pending independent claim review. Classical quotations and the source English translations are preserved as licensed upstream material; they have not each been checked against critical editions.\n`);
console.log(JSON.stringify({ eventFiles, libraryFiles: manifest.libraryFiles, counts: manifest.counts, amendments: amendments.length, output: outputDir }, null, 2));
