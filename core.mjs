// Civil chronology: negative years are BCE; positive years are CE. There is no year zero.
export const MIN_YEAR = -13000;
export const MAX_YEAR = 2026;
export const REGIONS = ['africa','west-central-asia','europe','south-asia','east-asia','southeast-asia','north-america','latin-america','oceania'];
export const THEMES = ['cities','states','exchange','knowledge','culture'];
export const TIME_ANCHORS = [-13000,-3000,-1000,1,500,1000,1500,1800,2026];
export const toOrdinal = year => year > 0 ? year - 1 : year;
export const fromOrdinal = n => n >= 0 ? n + 1 : n;
export function validYear(year) { return Number.isInteger(year) && year !== 0 && year >= MIN_YEAR && year <= MAX_YEAR; }
export function normalizeYear(value, fallback = 1200) {
  const accepted = typeof value === 'number' || (typeof value === 'string' && /^-?\d+$/.test(value.trim()));
  const year = accepted ? Number(value) : NaN;
  return validYear(year) ? year : (validYear(fallback) ? fallback : 1200);
}
export function addYears(year, delta) {
  const step = Number.isFinite(Number(delta)) ? Math.trunc(Number(delta)) : 0;
  return fromOrdinal(Math.max(toOrdinal(MIN_YEAR), Math.min(toOrdinal(MAX_YEAR), toOrdinal(normalizeYear(year)) + step)));
}
export function formatYear(year, lang = 'en') {
  if (!validYear(year)) throw new RangeError('Expected a supported integer civil year; there is no year zero.');
  const number = Math.abs(year).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {useGrouping: Math.abs(year) >= 10000});
  return lang === 'zh' ? `${year < 0 ? '公元前' : '公元'}${number}年` : `${number} ${year < 0 ? 'BCE' : 'CE'}`;
}
export function formatPeriod(record, lang = 'en') {
  return record.start === record.end ? formatYear(record.start,lang) : `${formatYear(record.start,lang)} – ${formatYear(record.end,lang)}`;
}
export function yearFromSlider(position) {
  const p = Math.max(0, Math.min(8000, Number(position) || 0));
  const i = Math.min(7, Math.floor(p / 1000));
  const a = toOrdinal(TIME_ANCHORS[i]), b = toOrdinal(TIME_ANCHORS[i+1]);
  return fromOrdinal(Math.round(a + (b-a) * (p-i*1000)/1000));
}
export function sliderFromYear(year) {
  const y = toOrdinal(normalizeYear(year));
  let i = 0;
  while(i < 7 && y > toOrdinal(TIME_ANCHORS[i+1])) i++;
  const a = toOrdinal(TIME_ANCHORS[i]), b = toOrdinal(TIME_ANCHORS[i+1]);
  return i*1000 + (y-a)/(b-a)*1000;
}
export const activeAt = (record, year) => validYear(year) && validYear(record?.start) && validYear(record?.end) && record.start <= year && record.end >= year;
const searchTextCache = new WeakMap();
export function recordSearchText(record) {
  if (!searchTextCache.has(record)) searchTextCache.set(record, [record.id,record.title?.en,record.title?.zh,record.summary?.en,record.summary?.zh,record.location?.label,record.name?.en,record.name?.zh,...(record.aliases||[])].filter(Boolean).join(' ').normalize('NFKC').toLocaleLowerCase());
  return searchTextCache.get(record);
}
export function filterRecords(records, state, saved = []) {
  const q = (state.query || '').trim().normalize('NFKC').toLocaleLowerCase();
  return records.filter(r =>
    (state.mode === 'all' || activeAt(r, state.year)) &&
    (!state.region || state.region === 'all' || r.region === state.region) &&
    (!state.theme || state.theme === 'all' || r.theme === state.theme) &&
    (!state.savedOnly || saved.includes(r.id)) &&
    (!q || recordSearchText(r).includes(q))
  ).sort((a,b) => a.start-b.start || a.id.localeCompare(b.id));
}
const relationshipCache = new WeakMap();
export function relatedRecords(records, record) {
  if (!record) return [];
  if (!relationshipCache.has(records)) {
    const byId = new Map(records.map(r => [r.id,r])), reverse = new Map();
    for (const row of records) for (const id of new Set(row.relatedIds || [])) {
      if (!byId.has(id) || id === row.id) continue;
      if (!reverse.has(id)) reverse.set(id,[]);
      reverse.get(id).push(row);
    }
    for (const rows of reverse.values()) rows.sort((a,b) => a.start-b.start || a.id.localeCompare(b.id));
    relationshipCache.set(records,{byId,reverse});
  }
  const {byId,reverse} = relationshipCache.get(records), seen = new Set([record.id]);
  return [...(record.relatedIds || []).map(id => byId.get(id)),...(reverse.get(record.id) || [])]
    .filter(row => row && !seen.has(row.id) && (seen.add(row.id),true));
}
export function contemporaries(records, selected, year, limit = 6) {
  const max = Number.isFinite(Number(limit)) ? Math.max(0, Math.trunc(Number(limit))) : 6;
  const list=records.filter(r=>r.id!==selected?.id && activeAt(r,year));
  const regionOrder = [...new Set(list.map(r=>r.region))].sort((a,b)=>(a===selected?.region)-(b===selected?.region) || a.localeCompare(b));
  const result=[];
  for(const region of regionOrder) {
    const candidates=list.filter(r=>r.region===region).sort((a,b)=>a.id.localeCompare(b.id));
    if(candidates[0]) result.push(candidates[0]);
  }
  const picked = new Set(result.map(r=>r.id));
  const remaining = list.filter(r=>!picked.has(r.id)).sort((a,b)=>(a.region===selected?.region)-(b.region===selected?.region) || a.id.localeCompare(b.id));
  return [...result,...remaining].slice(0,max);
}
export function defaultState() {
  return {year:1200,lang:'en',mode:'year',region:'all',theme:'all',query:'',entry:'',compare:[],savedOnly:false};
}
export function stateFromHash(hash, records) {
  const p=new URLSearchParams(hash.replace(/^#/,'')), s=defaultState();
  const ids=new Set(records.map(r=>r.id));
  s.year=normalizeYear(p.get('year') ?? 1200);
  s.lang=p.get('lang')==='zh'?'zh':'en';
  s.mode=p.get('mode')==='all'?'all':'year';
  s.region=REGIONS.includes(p.get('region'))?p.get('region'):'all';
  s.theme=THEMES.includes(p.get('theme'))?p.get('theme'):'all';
  s.query=(p.get('q')||'').slice(0,200);
  s.entry=ids.has(p.get('entry'))?p.get('entry'):'';
  s.compare=[...new Set((p.get('compare')||'').split(',').filter(id=>ids.has(id)))].slice(0,2);
  return s;
}
export function hashFromState(s) {
  const p=new URLSearchParams({year:String(s.year),lang:s.lang,mode:s.mode});
  if(s.region!=='all')p.set('region',s.region);
  if(s.theme!=='all')p.set('theme',s.theme);
  if(s.query)p.set('q',s.query);
  if(s.entry)p.set('entry',s.entry);
  if(s.compare?.length)p.set('compare',s.compare.join(','));
  return '#'+p.toString();
}
export function safeSourceURL(value) {
  try {const u=new URL(value); return u.protocol==='https:' && !u.username && !u.password;} catch {return false;}
}
export function validateRecords(records) {
  if(!Array.isArray(records)||!records.length)return ['Dataset must be a nonempty array.'];
  const errors=[], ids=new Set();
  for(const r of records) {
    if(!r || typeof r!=='object' || Array.isArray(r)) {errors.push('(invalid record): expected an object');continue;}
    const id=r?.id || '(missing id)';
    if(typeof r?.id!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))errors.push(`${id}: invalid ID`);
    if(ids.has(id))errors.push(`${id}: duplicate ID`); ids.add(id);
    if(!validYear(r.start)||!validYear(r.end)||r.start>r.end)errors.push(`${id}: invalid civil interval`);
    for(const field of ['title','summary','dateNote'])for(const lang of ['en','zh'])if(typeof r[field]?.[lang]!=='string'||!r[field][lang].trim())errors.push(`${id}: missing ${field}.${lang}`);
    if(!REGIONS.includes(r.region))errors.push(`${id}: unknown region ${r.region}`);
    if(!THEMES.includes(r.theme))errors.push(`${id}: unknown theme ${r.theme}`);
    if(!Number.isFinite(r.location?.lat)||r.location.lat < -90 || r.location.lat > 90 || !Number.isFinite(r.location?.lon)||r.location.lon < -180 || r.location.lon > 180)errors.push(`${id}: invalid coordinate`);
    if(typeof r.location?.label!=='string'||!r.location.label.trim())errors.push(`${id}: missing location label`);
    if(r.locationPrecision!=='representative')errors.push(`${id}: unsupported location precision`);
    if(!Array.isArray(r.sources)||!r.sources.length)errors.push(`${id}: no sources`);
    for(const source of Array.isArray(r.sources)?r.sources:[]) {
      if(!source || typeof source!=='object' || typeof source.url!=='string' || !safeSourceURL(source.url) || typeof source.title!=='string' || !source.title.trim() || typeof source.publisher!=='string' || !source.publisher.trim())errors.push(`${id}: invalid source`);
    }
  }
  return errors;
}
export function validateNotebook(raw, records) {
  if(!raw || typeof raw!=='object' || Array.isArray(raw) || raw.version!==1 || !Array.isArray(raw.saved) || !raw.notes || typeof raw.notes!=='object' || Array.isArray(raw.notes))throw new Error('Invalid notebook format.');
  if(raw.saved.length>1000 || Object.keys(raw.notes).length>1000)throw new Error('Notebook is too large.');
  const ids=new Set(records.map(r=>r.id)), notes=Object.create(null);
  for(const id of raw.saved)if(typeof id!=='string'||!ids.has(id))throw new Error('Notebook contains unknown entries.');
  for(const [id,value] of Object.entries(raw.notes)) {
    if(!ids.has(id)||typeof value!=='string'||value.length>3000)throw new Error('Notebook contains an invalid note.');
    notes[id]=value;
  }
  return {version:1,saved:[...new Set(raw.saved)],notes};
}
export function mergeNotebooks(current, incoming) {
  return {version:1,saved:[...new Set([...current.saved,...incoming.saved])],notes:{...current.notes,...incoming.notes}};
}
