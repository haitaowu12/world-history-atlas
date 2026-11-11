import {safeSourceURL} from './core.mjs';

const bilingual = value => value && ['en','zh'].every(lang => typeof value[lang] === 'string' && value[lang].trim());
const assetPath = value => typeof value === 'string' && /^assets\/history-media\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/.test(value);
const text = (value, lang) => typeof value === 'object' ? value?.[lang] || value?.en || '' : value || '';

// Translations never replace source strings, dates, identities or image bytes.
export function applyMediaLocalization(catalog, translations) {
  if (translations?.version !== 1 || translations.language !== 'zh' || !Array.isArray(translations.items)) throw Error('Media: invalid localization layer');
  const assets = new Map((catalog.items || []).map(item => [item.id, item])), seen = new Set(), localized = new Map();
  for (const row of translations.items) {
    const item = assets.get(row.assetId);
    if (!item || seen.has(row.assetId)) throw Error('Media: unknown or duplicate localization '+row.assetId);
    seen.add(row.assetId);
    const metadataI18n = {};
    for (const key of ['date','creator','institution']) {
      if (!bilingual(row[key]) || row[key].en !== item[key]) throw Error('Media: stale or incomplete localization '+row.assetId+' '+key);
      metadataI18n[key] = {en:row[key].en,zh:row[key].zh};
    }
    localized.set(item.id,{...item,metadataI18n});
  }
  return {...catalog,items:catalog.items.map(item=>localized.get(item.id)||item)};
}
export function mediaMetadata(item,key,lang) {
  const translated=item.metadataI18n?.[key];
  return bilingual(translated) && translated.en===item[key] ? text(translated,lang) : item[key]||'';
}

// Images are historical sources with their own identities and reuse terms.
// A portrait caption must say when an image is a later depiction.
export function auditHistoryMedia(catalog, recordIds) {
  const errors = [], seen = new Set(), files = new Set(), records = new Set(recordIds);
  if (![1,2].includes(catalog?.version) || !/^\d{4}-\d{2}-\d{2}$/.test(catalog?.reviewedAt || '') || !Array.isArray(catalog?.items)) return ['Media: invalid catalogue'];
  for (const item of catalog.items) {
    const fail = message => errors.push(`Media ${item.id || '(unnamed)'}: ${message}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id || '') || seen.has(item.id)) fail('invalid or duplicate identity');
    seen.add(item.id);
    if (!['portrait','object','manuscript','site','artwork','map','document','photograph'].includes(item.kind)) fail('unknown image kind');
    const representations={portrait:['historical-photograph','lifetime-portrait','ancient-royal-image','later-depiction','modern-memorial'],object:['object-photograph'],manuscript:['manuscript-detail'],site:['site-photograph'],artwork:['historical-artwork'],map:['historical-map'],document:['document-facsimile'],photograph:['historical-photograph']};
    if (!representations[item.kind]?.includes(item.representation)) fail('missing or mismatched representation type');
    if (!Array.isArray(item.recordIds) || !item.recordIds.length || new Set(item.recordIds).size !== item.recordIds.length || item.recordIds.some(id => !records.has(id))) fail('unknown or duplicate record link');
    if (!assetPath(item.file) || files.has(item.file)) fail('invalid or duplicate local asset');
    files.add(item.file);
    if (!Number.isInteger(item.width) || !Number.isInteger(item.height) || item.width < 1 || item.height < 1 || item.width > 3000 || item.height > 3000) fail('invalid image dimensions');
    if (!/^[a-f0-9]{64}$/.test(item.sha256 || '')) fail('missing image checksum');
    if (!Number.isInteger(item.bytes) || item.bytes < 1 || item.bytes > 750000) fail('invalid image byte count');
    for (const key of ['title','alt','caption','interpretation','transformation']) if (!bilingual(item[key])) fail(`missing bilingual ${key}`);
    for (const key of ['creator','date','institution']) if (typeof item[key] !== 'string' || !item[key].trim()) fail(`missing ${key}`);
    if (item.metadataI18n) for (const key of ['creator','date','institution']) if (!bilingual(item.metadataI18n[key]) || item.metadataI18n[key].en !== item[key]) fail(`stale or incomplete localized ${key}`);
    for (const key of ['sourceUrl','imageUrl','downloadedFrom','rightsSourceUrl']) if (!safeSourceURL(item[key])) fail(`invalid ${key}`);
    if (!item.rights?.label?.trim() || !safeSourceURL(item.rights?.url) || !bilingual(item.rights?.note)) fail('incomplete rights evidence');
    if (item.contextSources && (!Array.isArray(item.contextSources) || item.contextSources.some(source=>!bilingual(source.title)||!safeSourceURL(source.url)))) fail('invalid image context source');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.checkedAt || '')) fail('missing source inspection date');
  }
  const assetIds=new Set((catalog.items||[]).map(item=>item.id)),links=new Set();
  for(const link of catalog.associations||[]) {
    const key=link.assetId+'|'+link.recordId;
    if(links.has(key)||!assetIds.has(link.assetId)||!records.has(link.recordId))errors.push('Media: invalid or duplicate association '+key);
    links.add(key);
    if(!['depicts-subject','named-person','related-work','named-site','historical-context'].includes(link.role)||!bilingual(link.context)||!safeSourceURL(link.evidenceUrl)||!/^\d{4}-\d{2}-\d{2}$/.test(link.checkedAt||''))errors.push('Media: incomplete association '+key);
  }
  return errors;
}

export function createHistoryMedia(catalog = {items:[]}) {
  const byRecord = new Map();
  for (const item of catalog.items || []) {
    if (!assetPath(item.file) || !safeSourceURL(item.sourceUrl) || !safeSourceURL(item.rights?.url)) continue;
    for (const id of item.recordIds || []) byRecord.set(id, [...(byRecord.get(id) || []), item]);
  }
  const byAsset=new Map((catalog.items||[]).map(item=>[item.id,item]));
  for(const link of catalog.associations||[]) {
    const item=byAsset.get(link.assetId);
    if(!item||!assetPath(item.file)||!safeSourceURL(link.evidenceUrl)||!bilingual(link.context))continue;
    const items=(byRecord.get(link.recordId)||[]).filter(existing=>existing.id!==item.id);
    byRecord.set(link.recordId,[...items,{...item,association:link}]);
  }
  return {
    items:()=>catalog.items||[],
    coveredIds:()=>[...byRecord.keys()],
    primary:id=>(byRecord.get(id)||[])[0]||null,
    forRecord: id => byRecord.get(id) || [],
    hasPortrait: id => (byRecord.get(id) || []).some(item => item.kind === 'portrait'),
    portrait: id => (byRecord.get(id) || []).find(item => item.kind === 'portrait') || null
  };
}

export function mediaThumbnail(item, lang, escape) {
  if (!item || !assetPath(item.file)) return '';
  return `<span class="history-thumbnail"><img src="./${escape(item.file)}" width="${item.width}" height="${item.height}" alt="${escape(text(item.alt,lang))}" loading="lazy" decoding="async" data-history-image><span class="history-image-fallback history-thumbnail-fallback" role="img" aria-label="${lang==='zh'?'图像暂时不可用':'Image unavailable'}" hidden>▧</span></span>`;
}

export function mediaFigures(items, lang, escape) {
  const label = (en,zh) => lang === 'zh' ? zh : en;
  return items.map(item => `<figure class="history-figure history-figure-${item.kind}">
    <a class="history-image-link" href="./${escape(item.file)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(label('Open full image: ','打开完整图像：')+text(item.title,lang))}" data-history-source="${escape(item.sourceUrl)}" data-history-source-label="${escape(label('Open collection record: ','打开馆藏记录：')+text(item.title,lang))}"><img src="./${escape(item.file)}" width="${item.width}" height="${item.height}" alt="${escape(text(item.alt,lang))}" loading="lazy" decoding="async" data-history-image><span class="history-image-fallback" hidden>${label('Image unavailable. Open the collection record; the caption remains below.','图像暂时不可用。可打开馆藏记录，说明仍保留在下方。')}</span></a>
    <figcaption>${item.association?`<p class="image-connection"><strong>${label('In this story','与本条目的联系')}</strong> ${escape(text(item.association.context,lang))}</p>`:''}<strong>${escape(text(item.title,lang))}</strong><p>${escape(text(item.caption,lang))}</p><p class="history-image-interpretation">${escape(text(item.interpretation,lang))}</p><small>${escape(mediaMetadata(item,'creator',lang))} · ${escape(mediaMetadata(item,'date',lang))} · ${escape(mediaMetadata(item,'institution',lang))}</small><div class="history-image-credit"><button class="text-button" data-action="visual-inspect" data-id="${escape(item.id)}">${label('Look closer','细看图像')} ↗</button><a href="${escape(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">${label('Collection record & credit','馆藏记录与图像来源')} ↗</a><a href="${escape(item.rights.url)}" target="_blank" rel="noopener noreferrer">${escape(item.rights.label)} ↗</a>${(item.contextSources||[]).filter(source=>safeSourceURL(source.url)).map(source=>`<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(text(source.title,lang))} ↗</a>`).join('')}</div><details><summary>${label('Image reuse and interpretation','图像使用与解读说明')}</summary><p>${escape(text(item.rights.note,lang))}</p>${item.transformation?`<p>${escape(text(item.transformation,lang))}</p>`:''}<small>${label('Source inspected','来源查阅日期')}: ${escape(item.checkedAt)}</small></details></figcaption>
  </figure>`).join('');
}

// Keep the caption and provenance readable when an image fails to load.
export function handleHistoryImageError(event) {
  const image = event.target;
  if (!image?.hasAttribute?.('data-history-image')) return;
  image.hidden = true;
  const fallback = image.parentElement?.querySelector('.history-image-fallback');
  if (fallback) fallback.hidden = false;
  const link=image.parentElement;
  if (safeSourceURL(link?.dataset?.historySource)) {
    link.setAttribute('href',link.dataset.historySource);
    link.setAttribute('aria-label',link.dataset.historySourceLabel);
  }
}

export function entryMediaFigures(items,lang,escape){
 if(!items.length)return '';
 const pair=items.length===2?`<button class="secondary-button" data-action="visual-pair" data-id="${escape(items.map(item=>item.id).join(','))}">${lang==='zh'?'并排对读这两幅图像':'Read these two images side by side'} ↗</button>`:'';
 return mediaFigures(items.slice(0,1),lang,escape)+pair+(items.length>1?`<details class="entry-more-images"><summary>${lang==='zh'?'更多相关图像':'More images for this story'} (${items.length-1})</summary>${mediaFigures(items.slice(1),lang,escape)}</details>`:'');
}
