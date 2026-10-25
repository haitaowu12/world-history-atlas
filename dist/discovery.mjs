import {REGIONS,activeAt,formatPeriod,formatYear,recordSearchText,relatedRecords,safeSourceURL,validYear} from './core.mjs';
import {libraryLocation,nearLibraryPlace} from './china-library.mjs';

const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().trim();
const strings = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(strings) : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
const unique = values => [...new Set(values.filter(Boolean))];
const localize = (value,lang='en') => typeof value === 'string' ? value : value?.[lang] || value?.en || value?.zh || '';
const validInterval = row => validYear(row?.start) && validYear(row?.end) && row.start <= row.end;
const profileInterval = row => row.span?.length === 2 && validInterval({start:row.span[0],end:row.span[1]}) ? {start:row.span[0],end:row.span[1],meaning:'source-profile-span'} : null;

// These are identified people in the two existing datasets. A matching name alone
// is never used to merge another person, and their date assertions remain separate.
export const PERSON_PROFILE_LINKS = Object.freeze({
  'china-person-xuanzang':'person-xuanzang',
  'china-person-zhenghe':'person-zheng-he',
  'china-person-liqingzhao':'china-person-li-qingzhao'
});

function exactPersonLink(profile,peopleById) {
  const target=peopleById.get(PERSON_PROFILE_LINKS[profile.id]);
  return target && ['en','zh'].every(lang=>normalize(target.name?.[lang])===normalize(profile.name?.[lang])) ? target : null;
}

function mentionMatches(record,names) {
  const text=recordSearchText(record);
  return names.some(name=>{
    const key=normalize(name);if(key.length<2)return false;
    const at=text.indexOf(key);if(at<0)return false;
    if(/[^\u0000-\u007f]/.test(key))return true;
    // English aliases must match words: "Li" must not match "Delhi".
    const escaped=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`,'u').test(text);
  });
}

function referenceRegion(row,records) {
  if(REGIONS.includes(row.region))return row.region;
  // The directory's few Central Asian references are explicitly identified.
  const names=normalize(strings([row.name,row.aliases]).join(' '));
  if(/suyab|issyk|balkhash/.test(names))return 'west-central-asia';
  const close=records.find(record=>nearLibraryPlace(row,record,2));
  return close?.region || 'east-asia';
}

function personEntry(record) {
  return {id:record.id,kind:'person',action:'discovery-person',name:record.name||record.title,title:record.title,
    region:record.region,recordId:record.id,recordIds:[record.id],profileIds:[],profiles:[],journeyIds:[],
    aliases:unique(strings([record.name,record.aliases])),intervals:validInterval(record)?[{start:record.start,end:record.end,meaning:'biography-focus'}]:[],
    location:libraryLocation(record),summary:record.summary,dateNote:record.dateNote,sourceIds:[record.id]};
}

/** Build navigation indexes without changing any source record or adding claims. */
export function buildDiscoveryIndex({records=[],people=[],library={},settlements=[]}={}) {
  const recordById=new Map(records.map(record=>[record.id,record]));
  const biographies=people.length?people:records.filter(record=>record.kind==='person');
  const biographyById=new Map(biographies.map(record=>[record.id,record]));
  const personRows=biographies.map(personEntry),personById=new Map(personRows.map(row=>[row.id,row]));
  for(const profile of library.profiles||[]){
    const linked=exactPersonLink(profile,biographyById);
    let row=linked?personById.get(linked.id):null;
    if(!row){row={id:profile.id,kind:'person',action:'discovery-person',name:profile.name,title:profile.name,
      region:'east-asia',recordIds:[],profileIds:[],profiles:[],journeyIds:[],aliases:[],intervals:[],
      summary:profile.subtitle,sourceIds:[]};personRows.push(row);personById.set(row.id,row);}
    row.profiles.push(profile);row.profileIds.push(profile.id);row.sourceIds.push(profile.id);
    row.aliases=unique([...row.aliases,...strings([profile.name,profile.aliases])]);
    row.recordIds=unique([...row.recordIds,...(profile.eventIds||[]).filter(id=>recordById.has(id))]);
    if(profile.journeyId)row.journeyIds.push(profile.journeyId);
    const interval=profileInterval(profile);if(interval)row.intervals.push({...interval,sourceId:profile.id});
    personById.set(profile.id,row);
  }
  for(const row of personRows){
    const names=unique([...strings(row.name),...row.aliases]);
    const mentions=records.filter(record=>mentionMatches(record,names)).map(record=>record.id);
    const biography=biographyById.get(row.recordId);
    const connected=biography?relatedRecords(records,biography).map(record=>record.id):[];
    row.recordIds=unique([...row.recordIds,...connected,...mentions]);
    row.journeyIds=unique(row.journeyIds);
    row.start=row.intervals.length?Math.min(...row.intervals.map(interval=>interval.start)):null;
    row.end=row.intervals.length?Math.max(...row.intervals.map(interval=>interval.end)):null;
    row.searchText=normalize(strings([row.name,row.title,row.summary,row.aliases]).join(' '));
  }

  const placeRows=[],placeById=new Map(),pointGroups=new Map();
  function addPlace(input,{record=null,reference=null}={}) {
    const location=libraryLocation(input);if(!location)return;
    const name=reference?(reference.name||reference.title||reference.modern):{en:location.label,zh:location.label};
    const label=normalize(localize(name,'en'));
    // This groups identical representative point/name references only. Nearby
    // settlements, name variants and political succession are never inferred.
    const key=`${location.lon}|${location.lat}|${label}`;
    let row=pointGroups.get(key);
    if(!row){row={id:reference?.id||`location-${record.id}`,kind:'place',action:'discovery-place',name,title:name,
      region:record?.region||referenceRegion(input,records),regions:[],location:{...location},
      recordId:record?.id,recordIds:[],referenceIds:[],references:[],aliases:[],intervals:[],sourceIds:[]};
      placeRows.push(row);pointGroups.set(key,row);placeById.set(row.id,row);}
    const sourceId=record?.id||reference.id;row.sourceIds.push(sourceId);placeById.set(sourceId,row);
    row.regions=unique([...row.regions,record?.region||referenceRegion(input,records)]);
    if(record){row.recordIds.push(record.id);row.aliases.push(...strings([record.title,record.name,record.aliases,record.location?.label]));
      if(validInterval(record))row.intervals.push({start:record.start,end:record.end,meaning:'entry-focus',sourceId:record.id});}
    if(reference){row.references.push(reference);row.referenceIds.push(reference.id);
      row.aliases.push(...strings([reference.name,reference.title,reference.aliases,reference.modern]));
      // A pass's dated source window can be searched, but undated gazetteer rows
      // are not assigned a lifetime using nearby events or settlement rows.
      if(validInterval(reference))row.intervals.push({start:reference.start,end:reference.end,meaning:'source-display-window',sourceId:reference.id});}
  }
  for(const record of records)addPlace(record,{record});
  const referencePlaces=[...(library.gazetteer||[]).map(row=>({...row,directoryType:'gazetteer'})),
    ...(library.cityLore||[]).map(row=>({...row,directoryType:'city'})),...(library.passes||[]).map(row=>({...row,directoryType:'pass'}))];
  for(const reference of referencePlaces)addPlace(reference,{reference});
  for(const row of placeRows){
    row.recordIds=unique(row.recordIds);row.aliases=unique(row.aliases);row.sourceIds=unique(row.sourceIds);
    // If the named directory supplies a Chinese name for this exact point/name,
    // use it without translating or inferring a new name.
    const translated=row.references.find(reference=>reference.name?.zh);if(translated)row.name={en:localize(row.name,'en'),zh:translated.name.zh};
    row.start=row.intervals.length?Math.min(...row.intervals.map(interval=>interval.start)):null;
    row.end=row.intervals.length?Math.max(...row.intervals.map(interval=>interval.end)):null;
    row.searchText=normalize(strings([row.name,row.aliases,row.references.map(reference=>[reference.description,reference.summary])]).join(' '));
  }
  return {people:personRows,places:placeRows,personById,placeById,recordById,settlements,referencePlaces};
}

function score(row,query) {
  if(!query)return 0;
  const primary=strings(row.name).map(normalize);if(primary.includes(query))return 4;
  const names=[...primary,...row.aliases.map(normalize)];
  if(names.includes(query))return 3;
  if(names.some(name=>name.startsWith(query)))return 2;
  return 1;
}

/** Undated place references stay discoverable; no occupancy dates are invented. */
export function searchDiscovery(index,query='',{kind,region='all',year,limit,sort='regions',lang='en'}={}) {
  if(kind&&!['all','person','place'].includes(kind))return [];
  const q=normalize(query),rows=kind==='person'?index.people:kind==='place'?index.places:[...index.people,...index.places];
  let matches=rows.filter(row=>(!region||region==='all'||row.region===region) &&
    (!validYear(year)||!row.intervals.length||row.intervals.some(interval=>activeAt(interval,year))) && (!q||row.searchText.includes(q)));
  const alphabetic=(a,b)=>localize(a.name,lang).localeCompare(localize(b.name,lang),lang==='zh'?'zh-CN':'en')||a.id.localeCompare(b.id);
  const chronological=(a,b)=>(a.start??Infinity)-(b.start??Infinity)||alphabetic(a,b);
  matches.sort((a,b)=>score(b,q)-score(a,q)||(sort==='chronological'?chronological(a,b):alphabetic(a,b)));
  if(sort==='regions'&&!q&&(!region||region==='all')){
    const buckets=REGIONS.map(id=>matches.filter(row=>row.region===id)),balanced=[];
    for(let n=0;buckets.some(bucket=>bucket.length>n);n++)for(const bucket of buckets)if(bucket[n])balanced.push(bucket[n]);
    matches=balanced.concat(matches.filter(row=>!REGIONS.includes(row.region)));
  }
  return Number.isFinite(limit)?matches.slice(0,Math.max(0,Math.trunc(limit))):matches;
}

export function nearbyDiscoveryRecords(index,place,km=20) {
  return [...index.recordById.values()].filter(record=>nearLibraryPlace(place,record,km)).sort((a,b)=>a.start-b.start||a.id.localeCompare(b.id));
}

export function createDiscovery({records=[],people=[],library={},manifest={},settlements=[],regions={},byId,getState,
  openDialog,openStory,openRoute,openPlace,onNavigate,escape:esc}={}) {
  const index=buildDiscoveryIndex({records,people,library,settlements}),getRecord=byId||((id)=>index.recordById.get(id));
  let mode='person',query='',region='all',sort='regions',yearFilter=null,limit=48;
  const lang=()=>getState?.().lang||'en',txt=(en,zh)=>lang()==='zh'?zh:en,loc=value=>localize(value,lang());
  const regionName=id=>loc(regions[id]?.name||regions[id]||id);
  const formatSpan=row=>validInterval(row)?formatPeriod(row,lang()):txt('Undated reference','未标年代的地点参照');
  const sourceURL=file=>manifest.source?.commit?`https://github.com/haitaowu12/jiangshan-map/blob/${manifest.source.commit}/${file}`:'';
  const sourceLink=source=>safeSourceURL(source.url)?`<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ↗</a><small>${esc(source.publisher||'')}</small>${source.evidenceNote?`<small>${esc(source.evidenceNote)}</small>`:''}</li>`:'';
  const importedSources=rows=>unique(rows.map(row=>row.sourceRecord?.file||row.provenance?.sourceRecord?.file||'js/lore_data.js')).map(file=>({url:sourceURL(file),title:txt('Jiangshan Map · source directory','江山时序 · 原始目录')+' · '+file,publisher:'DeanChensj and contributors'}));
  function evidence({sources=[],references=[],note='',profileSpans=[]}={}) {
    const all=[...sources,...importedSources(references),...references.filter(row=>row.aliasSource).map(row=>({title:txt('Jiangshan search aliases · 2026 update','江山时序搜索别名 · 2026年更新'),publisher:row.aliasSource.attribution,url:row.aliasSource.repository+'/blob/'+row.aliasSource.commit+'/'+row.aliasSource.file,evidenceNote:txt('Discovery strings only; historical identities not independently reviewed. GPL-3.0.','仅供搜索发现；历史身份未经独立核查。GPL-3.0。')}))].filter((source,i,list)=>source.url&&list.findIndex(other=>other.url===source.url)===i);
    if(!all.length&&!note)return '';
    return `<details class="discovery-evidence"><summary>${txt('Sources and interpretation','资料来源与解读')}</summary>${note?`<p>${esc(note)}</p>`:''}${references.length?`<p>${txt('Directory wording and date spans come from the cited reference. Independent review is incomplete. The original source identities are preserved.','目录文字与年代范围来自所列参考资料，独立核查尚未完成；保留了原始记录身份。')}</p>`:''}${profileSpans.length?`<ul>${profileSpans.map(profile=>`<li>${txt('Reference span','参考年代')} · ${esc(loc(profile.name))}: ${formatPeriod({start:profile.span[0],end:profile.span[1]},lang())}</li>`).join('')}</ul>`:''}<ol class="detail-sources">${all.map(sourceLink).join('')}</ol></details>`;
  }
  function eventCards(ids) {
    return unique(ids).map(getRecord).filter(Boolean).sort((a,b)=>a.start-b.start||a.id.localeCompare(b.id)).map(record=>
      `<button class="library-event" data-action="open-dialog-story" data-id="${esc(record.id)}"><time>${formatPeriod(record,lang())}</time><span><strong>${esc(loc(record.title))}</strong><small>${esc(regionName(record.region))} · ${esc(record.location.label)}</small></span><b>↗</b></button>`).join('');
  }
  function card(row) {
    const primary=row.recordId?getRecord(row.recordId):null,biography=primary?.kind==='person'?primary:null;
    const caption=row.kind==='person'?(biography?txt('Biography and related history','生平与相关历史'):txt('Person and related history','人物与相关历史')):txt('Place and nearby history','地点与周边历史');
    const context=row.kind==='person'?loc(row.summary):row.recordIds.length?loc(getRecord(row.recordIds[0])?.title):loc(row.references[0]?.modern||row.references[0]?.description);
    return `<button class="library-card discovery-card" data-action="${row.action}" data-id="${esc(row.id)}"><span class="eyebrow">${esc(regionName(row.region))}</span><strong>${esc(loc(row.name))}</strong>${context?`<span class="discovery-card-context">${esc(context.length>170?context.slice(0,169)+'…':context)}</span>`:''}<small class="discovery-card-meta">${caption} · ${row.recordIds.length} ${row.recordIds.length===1?txt('linked entry','条关联记录'):txt('linked entries','条关联记录')}</small>${row.kind==='person'?`<small>${biography?txt('Biography focus','生平文章关注时期'):txt('Reference span','参考年代')}: ${formatSpan(biography||row)}</small>`:''}</button>`;
  }
  function results() {
    const matches=searchDiscovery(index,query,{kind:mode,region,year:yearFilter,sort,lang:lang()});
    return `<p class="library-result-count" role="status">${matches.length} ${mode==='person'?txt(matches.length===1?'person':'people','位人物'):txt(matches.length===1?'place reference':'place references','条地点参照')}${validYear(yearFilter)?` · ${formatYear(yearFilter,lang())}`:''}</p>${matches.length?`<div class="library-grid discovery-grid">${matches.slice(0,limit).map(card).join('')}</div>`:`<p class="collection-note">${txt('No matches with these filters. Try another name or select all regions and all history.','当前条件下没有匹配结果。请尝试其他名称，或选择所有地区与所有时期。')}</p>`}${matches.length>limit?`<button class="secondary-button library-more" data-action="discovery-more">${txt('Show more','显示更多')} · ${limit} / ${matches.length}</button>`:''}`;
  }
  function paintResults(){const element=document.querySelector('#discovery-results');if(element)element.innerHTML=results();}
  function showDirectory(next,options={}) {
    mode=next;query=options.query??'';region=REGIONS.includes(options.region)?options.region:'all';sort=options.sort||'regions';
    yearFilter=validYear(options.year)?options.year:null;limit=48;
    const isPerson=mode==='person',title=isPerson?txt('History, through human lives.','通过人生，走进历史。'):txt('Every place has many histories.','每一处地方，都有多重历史。');
    const intro=isPerson?txt('Explore biographies, dated episodes and related reading across the world. Search a name or an alias, or follow a region through time.','在同一个目录中探索世界各地的人物生平、年代节点与相关历史。搜索姓名和别名，或按地区与年代浏览。'):txt('Explore named places and the representative locations of historical entries. Open a place to read its history alongside other records nearby.','探索历史地名与各类历史条目的代表地点。打开一处地点，将其历史与附近其他记录一起阅读。');
    openDialog(`<section class="discovery-directory"><p class="eyebrow">${isPerson?txt('People','人物'):txt('Places','地点')}</p><h2>${title}</h2><p>${intro}</p><div class="discovery-controls library-search"><label class="sr-only" for="discovery-search">${isPerson?txt('Search people','搜索人物'):txt('Search places','搜索地点')}</label><input id="discovery-search" type="search" maxlength="200" value="${esc(query)}" placeholder="${isPerson?txt('Names and aliases…','姓名与别名……'):txt('Places and historical names…','地点与历史地名……')}"><label class="sr-only" for="discovery-region">${txt('Directory region','目录地区')}</label><select id="discovery-region"><option value="all">${txt('All regions','所有地区')}</option>${REGIONS.map(id=>`<option value="${id}" ${region===id?'selected':''}>${esc(regionName(id))}</option>`).join('')}</select><label class="sr-only" for="discovery-sort">${txt('Browse order','浏览顺序')}</label><select id="discovery-sort">${[['regions','Across regions','跨地区浏览'],['chronological','Chronological','按年代'],['alphabetical','Alphabetical','按名称']].map(([id,en,zh])=>`<option value="${id}" ${sort===id?'selected':''}>${txt(en,zh)}</option>`).join('')}</select></div><div class="discovery-time-filter"><button class="secondary-button" data-action="discovery-time" aria-pressed="${validYear(yearFilter)}">${validYear(yearFilter)?txt('At this time','此时此刻')+' · '+formatYear(yearFilter,lang()):txt('All history','所有时期')}</button>${validYear(yearFilter)&&!isPerson?`<small>${txt('Undated place references remain available. Dates describe entry focus periods, not continuous occupation.','未标年代的地点参照仍可检索。年代表示条目关注范围，不代表连续居住。')}</small>`:''}</div><div id="discovery-results">${results()}</div></section>`,{wide:true,nav:isPerson?'people-nav':'places-nav'});
    document.querySelector('#discovery-search')?.addEventListener('input',event=>{query=event.target.value;limit=48;paintResults();});
    document.querySelector('#discovery-region')?.addEventListener('change',event=>{region=event.target.value;limit=48;paintResults();});
    document.querySelector('#discovery-sort')?.addEventListener('change',event=>{sort=event.target.value;limit=48;paintResults();});
  }
  function backButton(next){return `<button class="text-button" data-action="discovery-back" data-id="${next}">← ${next==='person'?txt('People','人物'):txt('Places','地点')}</button>`;}
  function person(id) {
    const row=index.personById.get(id);if(!row)return false;
    const biography=row.recordId?getRecord(row.recordId):null,related=row.recordIds.filter(recordId=>recordId!==row.recordId);
    const scope=biography?loc(biography.dateNote):txt('This person index links related texts. Its recorded span is inherited, and name-based associations do not establish personal presence at each location.','人物索引用于连接相关文字，所列年代沿用参考资料。姓名关联不能证明人物亲历了每个地点。');
    openDialog(`${backButton('person')}<p class="eyebrow">${txt('Person','人物')} · ${esc(regionName(row.region))}</p><h2>${esc(loc(row.name))}</h2><p>${biography?txt('Biography focus','生平文章关注时期'):txt('Reference span','参考年代')}: ${formatSpan(biography||row)}</p>${row.summary?`<p>${esc(loc(row.summary))}</p>`:''}<p class="collection-note">${esc(scope)}</p><div class="button-row">${biography?`<button class="primary-button" data-action="open-dialog-story" data-id="${esc(biography.id)}">${txt('Read the biography','阅读生平')} ↗</button>`:''}${row.journeyIds.map(journeyId=>`<button class="secondary-button" data-action="open-route" data-id="${esc(journeyId)}">${txt('Follow the journey','沿地图探索行程')} ↗</button>`).join('')}</div>${row.aliases.length?`<p class="location-caption">${txt('Names and aliases','姓名与别名')}: ${esc(row.aliases.join(' · '))}</p>`:''}<h3>${txt('Related history and mentions','相关历史与文字提及')} · ${related.length}</h3>${related.length?eventCards(related):`<p>${txt('No additional linked entry is recorded yet.','目前尚无其他关联条目。')}</p>`}${evidence({sources:biography?.sources||[],references:row.profiles,profileSpans:row.profiles.filter(profile=>profileInterval(profile)),note:row.profiles.length?txt('Related mentions come from the whole atlas. A source profile interval and a biography focus interval retain their separate meanings.','相关文字检索覆盖整个地图。原资料人物年代与生平文章的关注区间保留各自含义。'):''})}`,{wide:true,nav:'people-nav'});
    onNavigate?.({kind:'person',id:row.id});
    return true;
  }
  function place(id) {
    const row=index.placeById.get(id);if(!row)return false;
    const nearby=nearbyDiscoveryRecords(index,row),names=settlements.filter(reference=>nearLibraryPlace(row,reference,20)).sort((a,b)=>a.start-b.start||a.id.localeCompare(b.id));
    const references=index.referencePlaces.filter(reference=>nearLibraryPlace(row,reference,20)),notes=references.filter(reference=>reference.description||reference.summary);
    const sources=row.recordIds.flatMap(recordId=>getRecord(recordId)?.sources||[]);
    openDialog(`${backButton('place')}<p class="eyebrow">${txt('Place','地点')} · ${esc(regionName(row.region))}</p><h2>${esc(loc(row.name))}</h2><p class="collection-note">${txt('The map uses a representative point. Nearby records within 20 km may describe different sites or periods; proximity does not establish continuous settlement or political succession.','地图使用代表点。20公里内的附近记录可能描述不同遗址或时期；距离相近不能证明聚落连续或政治继承。')}</p><div class="button-row"><button class="primary-button" data-action="discovery-locate" data-id="${esc(row.id)}">${txt('Explore on the map','在地图上探索')} ↗</button></div>${row.recordIds.length?`<h3>${txt('History at this reference point','此代表点关联的历史')}</h3>${eventCards(row.recordIds)}`:''}${notes.length?`<h3>${txt('Place descriptions','地点记述')}</h3>${notes.map(note=>`<p><strong>${esc(loc(note.name))}</strong> · ${esc(loc(note.description||note.summary))}</p>`).join('')}`:''}${names.length?`<h3>${txt('Historical names nearby','附近的历史地名')} · ${names.length}</h3><p class="collection-note">${txt('These dated names follow source display windows, not verified founding or abandonment dates. The 20 km search can include distinct nearby settlements.','所列地名年代为原资料展示窗口，并非已经核实的建城或废弃日期。20公里范围也可能包括不同的邻近聚落。')}</p><div class="library-place-history">${names.map(name=>`<div><time>${formatSpan(name)}</time><strong>${esc(loc(name.name))}</strong><span>${esc(loc(name.remark))}</span></div>`).join('')}</div>`:''}<h3>${txt('Nearby history across the atlas','全地图中的附近历史')} · ${nearby.length}</h3>${nearby.length?eventCards(nearby.map(record=>record.id)):`<p>${txt('No nearby entry is recorded yet.','目前尚无附近条目。')}</p>`}${evidence({sources,references:[...references,...names],note:txt('Each linked historical entry preserves its own chronology, location qualifications and citations. Directory descriptions are reproduced from their attributed source.','每条关联历史记录保留自身的年代、地点说明与引文；目录描述保留原始出处。')})}`,{wide:true,nav:'places-nav'});
    onNavigate?.({kind:'place',id:row.id});
    return true;
  }
  function handle(action,id){
    switch(action){
      case 'discovery-people':showDirectory('person');break;
      case 'discovery-places':showDirectory('place');break;
      case 'discovery-person':return person(id);
      case 'discovery-place':return place(id);
      case 'discovery-back':showDirectory(id==='person'?'person':'place',{query,region,sort,year:yearFilter});break;
      case 'discovery-more':limit+=48;paintResults();break;
      case 'discovery-time':showDirectory(mode,{query,region,sort,year:validYear(yearFilter)?null:getState().year});break;
      case 'discovery-locate':{const row=index.placeById.get(id);if(!row)return false;openPlace({...row.location,label:loc(row.name)});break;}
      default:return false;
    }return true;
  }
  return {index,showPeople:options=>showDirectory('person',options),showPlaces:options=>showDirectory('place',options),person,place,handle,
    search:(q,options={})=>searchDiscovery(index,q,{lang:lang(),...options}),
    searchPeople:(q,options={})=>searchDiscovery(index,q,{lang:lang(),...options,kind:'person'}),
    searchPlaces:(q,options={})=>searchDiscovery(index,q,{lang:lang(),...options,kind:'place'}),
    card,nearby:(id,km=20)=>{const row=index.placeById.get(id);return row?nearbyDiscoveryRecords(index,row,km):[];}};
}
