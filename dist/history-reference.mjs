import {formatPeriod, formatYear, validYear, safeSourceURL} from './core.mjs';
import {inferKind, REGIONAL} from './atlas-model.mjs';

const norm = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase();
const words = value => typeof value === 'string' ? value : Array.isArray(value) ? value.map(words).join(' ') : value && typeof value === 'object' ? Object.values(value).map(words).join(' ') : String(value ?? '');
const copyTitle = value => typeof value === 'string' ? {en:value,zh:value} : value;
const byDate = (a,b) => a.start-b.start || a.end-b.end || a.id.localeCompare(b.id);
const routeRegions = {
  'route-silk-roads':['east-asia','west-central-asia'],
  'route-indian-ocean':['east-asia','southeast-asia','south-asia','west-central-asia','africa'],
  'route-ibn-battuta-hajj':['africa','west-central-asia'],
  'route-zheng-he':['east-asia','southeast-asia','south-asia','west-central-asia','africa'],
  'route-tupaia':['oceania'],
  'route-beagle':['europe','latin-america','oceania','africa'],
  'route-forced-atlantic':['africa','north-america','latin-america','europe'],
  'route-salt-march':['south-asia'],
  'china-journey-qinshihuang':['east-asia'],
  'china-journey-zhangqian':['east-asia','west-central-asia'],
  'china-journey-zhugeliang':['east-asia'],
  'china-journey-xuanzang':['east-asia','west-central-asia','south-asia'],
  'china-journey-libai':['east-asia'],
  'china-journey-sushi':['east-asia'],
  'china-journey-wangyangming':['east-asia']
};

/** Reference indexes retain the meaning of each interval; they do not create new map records. */
export function buildReferenceIndex({library={},records=[],routes=[],eras=[]}={}) {
  const periodRows = [
    ...eras.map(e=>({id:`reference-era-${e.id}`,name:e.name,title:e.name,kind:'period',periodType:'editorial',region:'all',regions:Object.keys(REGIONAL),start:e.start,end:e.end,year:e.year,summary:e.question,original:e})),
    ...records.filter(r=>inferKind(r)==='polity').map(r=>({id:`reference-polity-${r.id}`,name:r.name||r.title,title:r.title,kind:'period',periodType:'article',region:r.region,regions:[r.region],start:r.start,end:r.end,year:r.start,summary:r.summary,recordId:r.id,original:r})),
    ...(library.eras||[]).map(e=>({id:`reference-window-${e.id}`,name:e.name,title:e.name,kind:'period',periodType:'reference',region:'east-asia',regions:['east-asia'],start:e.start,end:e.end,year:e.focusYear,summary:e.summary,originalId:e.id,original:e}))
  ].sort(byDate);
  const calendarRows=(library.eraNames||[]).map(e=>({id:e.id,name:copyTitle(e.name),title:copyTitle(e.name),kind:'calendar',region:'east-asia',regions:['east-asia'],start:e.start,end:e.end,year:e.start,ruler:e.ruler||e.monarch,original:e})).sort(byDate);
  const corridorRows=[
    ...routes.map(r=>{const regions=r.regions||routeRegions[r.id]||(r.region?[r.region]:[]);return {id:`reference-route-${r.id}`,name:r.title,title:r.title,kind:'route',region:regions.length===1?regions[0]:'all',regions,start:r.start,end:r.end,year:r.start,summary:r.summary||r.description,routeId:r.id,original:r};}),
    ...(library.corridors||[]).map(r=>({id:r.id,name:r.title,title:r.title,kind:'corridor',region:'east-asia',regions:['east-asia'],start:r.start,end:r.end,year:r.start,summary:r.summary,original:r}))
  ].sort(byDate);
  const all=[...periodRows,...calendarRows,...corridorRows].map(r=>({...r,action:'reference-open',searchText:norm(words([r.name,r.title,r.summary,r.ruler,r.original.aliases,r.original.eraYearAtStart,r.start,r.end]))}));
  const byId=new Map(all.map(r=>[r.id,r]));
  return {periods:periodRows.map(r=>byId.get(r.id)),calendars:calendarRows.map(r=>byId.get(r.id)),corridors:corridorRows.map(r=>byId.get(r.id)),all,byId};
}

export function searchReferences(index,query='',{region='all',kind='all',year,limit=Infinity}={}) {
  const q=norm(query).trim();
  const rows=(Array.isArray(index)?index:index.all).filter(r=>(!q||r.searchText.includes(q))&&
    (region==='all'||!region||r.regions.includes(region))&&
    (kind==='all'||!kind||r.kind===kind||(kind==='polity'&&r.periodType==='article'))&&
    (!validYear(year)||(r.start<=year&&r.end>=year)));
  return rows.slice(0,Number.isFinite(limit)?Math.max(0,Math.trunc(limit)):rows.length);
}

/** All event sources are eligible; a period guide never restricts records by provenance. */
export function recordsInReferencePeriod(records,period,region='all') {
  return records.filter(r=>r.start<=period.end&&r.end>=period.start&&(!region||region==='all'||r.region===region)).sort(byDate);
}

export function createHistoryReferences({library,manifest,records,routes,eras,regions=REGIONAL,getState,openDialog,escape:esc,browsePeriod,openRoute}) {
  const index=buildReferenceIndex({library,records,routes,eras});
  let view='periods',query='',region='all',limit=48,detailId='';
  const lang=()=>getState().lang;
  const txt=(en,zh)=>lang()==='zh'?zh:en;
  const loc=value=>typeof value==='string'?value:value?.[lang()]||value?.en||value?.zh||'';
  const regionIds=Array.isArray(regions)?regions:Object.keys(regions);
  const regionName=id=>loc((Array.isArray(regions)?REGIONAL:regions)[id]?.name)||id;
  const names=row=>row.periodType==='editorial'||!row.regions.length?txt('Across regions','跨地区'):row.regions.map(regionName).join(' · ');
  const sourceURL=file=>`${manifest.source.repository}/blob/${manifest.source.commit}/${file}`;
  const originalSource=file=>`<a href="${esc(sourceURL(file))}" target="_blank" rel="noopener noreferrer">${txt('Original reference','原始参考资料')} ↗</a>`;
  const range=row=>validYear(row.start)&&validYear(row.end)?formatPeriod(row,lang()):'';
  const meaning=row=>row.kind==='calendar'?txt('Calendar sequence interval','纪年序列区间'):row.kind==='corridor'||row.periodType==='reference'?txt('Reference display window','参考展示窗口'):row.periodType==='editorial'?txt('Editorial time window','编辑选取时段'):row.periodType==='article'?txt('Article focus period','文章关注时期'):row.original.provenance?txt('Chronicle','纪事'):row.original.kind==='network'?txt('Mapped network','地图网络'):txt('Mapped journey','地图旅程');
  const nav=()=>view==='corridors'?'journeys-nav':'chronology-nav';
  const tabs=()=>`<div class="dialog-tabs"><button data-action="${view==='corridors'?'route-library':'chronology-library'}">← ${view==='corridors'?txt('Journeys','旅程'):txt('Timeline','时间线')}</button><button data-action="reference-periods" class="${view==='periods'?'active':''}">${txt('Period guides','时期导读')}</button><button data-action="reference-calendars" class="${view==='calendars'?'active':''}">${txt('Calendars & reign names','历法与纪年')}</button><button data-action="reference-corridors" class="${view==='corridors'?'active':''}">${txt('Roads & waterways','道路与水路')}</button></div>`;
  const empty=()=>`<p class="collection-note">${txt('No reference matches these filters. Try a different name or region.','当前筛选条件下没有参考记录，请尝试其他名称或地区。')}</p>`;
  const evidence=row=>{
    if(row.periodType==='editorial')return `<p class="collection-note">${txt('This is an editorial time window for comparing histories. It does not assign the same stages of development to every society.','这是为比较历史而选取的编辑时段，不表示所有社会经历相同的发展阶段。')}</p>`;
    const r=row.original;
    if(row.periodType==='article')return `<div class="collection-note">${esc(loc(r.dateNote))}</div><ol class="detail-sources">${(r.sources||[]).filter(s=>safeSourceURL(s.url)).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.publisher||'')}</small>${s.evidenceNote?`<small>${esc(s.evidenceNote)}</small>`:''}</li>`).join('')}</ol>`;
    const file=row.kind==='calendar'?'js/lore_data.js':'js/map_data.js';
    return `<details class="source-catalog"><summary>${txt('Source & dating notes','出处与年代说明')}</summary><p>${txt('This reference is retained from Jiangshan Map. Its source wording and sequence have not all been independently corroborated.','此参考记录引自《江山时序》，原文与序列尚未全部经过独立核实。')}</p>${row.kind!=='calendar'?`<p>${txt('The displayed interval organizes the source material. It is not a verified lifespan, construction interval or abandonment date.','展示区间用于组织原资料，并非已核实的存续、建造或废弃年代。')}</p>`:`<p>${txt('This is a selected sequence, not a complete register of simultaneous rulers. It is not a lunar-calendar or exact-date converter.','此处为选取的纪年序列，并非并立君主的完整名录，也不提供农历或精确日期换算。')}</p>`}${r.note?`<p>${esc(loc(r.note))}</p>`:''}${row.periodType==='reference'&&row.summary?`<details><summary>${txt('Original period overview','原始时期概述')}</summary><p>${esc(loc(row.summary))}</p></details>`:''}<p>${originalSource(file)} · <a href="./data/china-upstream.LICENSE.md" target="_blank" rel="noopener noreferrer">${txt('Attribution & notices','署名与许可声明')} ↗</a></p></details>`;
  };
  function cards(rows){return rows.slice(0,limit).map(row=>`<button class="library-card" data-action="reference-open" data-id="${esc(row.id)}"><span class="eyebrow">${meaning(row)}</span><strong>${esc(loc(row.title))}</strong><span>${range(row)}</span><small>${esc(row.kind==='calendar'?loc(row.ruler):names(row))}</small>${row.kind==='route'?`<small>${row.original.stops.length} ${txt('mapped stops','个地图节点')} ↗</small>`:row.kind==='corridor'?`<small>${txt('Read description','阅读说明')} ↗</small>`:`<small>${txt('Explore this period','探索此时期')} ↗</small>`}</button>`).join('');}
  function currentRows(){const rows=view==='calendars'?index.calendars:view==='corridors'?index.corridors:index.periods;return searchReferences(rows,query,{region});}
  function resultHTML(){const rows=currentRows();return `<p class="library-result-count" role="status">${rows.length} ${txt('references','条参考记录')}</p>${rows.length?`<div class="library-grid">${cards(rows)}</div>${rows.length>limit?`<button class="secondary-button library-more" data-action="reference-more">${txt('Show more','显示更多')} · ${Math.min(limit,rows.length)} / ${rows.length}</button>`:''}`:empty()}`;}
  function repaint(){const el=document.querySelector('#reference-results');if(el)el.innerHTML=resultHTML();}
  function show(next,options={}){
    view=next;detailId='';query=options.query||'';region=regionIds.includes(options.region)?options.region:'all';limit=48;
    const title=view==='calendars'?txt('Read dates in their historical context.','把年代放回历史语境。'):view==='corridors'?txt('Connections across land and water.','陆路与水路上的连接。'):txt('Explore periods across the world.','并读世界各地的历史时期。');
    const intro=view==='calendars'?txt(`Compare historical date conventions with the atlas timeline. The available reference currently contains ${index.calendars.length} Chinese ruler and reign-name change points. Coverage will grow within this shared calendar reference.`,`将历史纪年与地图时间线对照。现有资料包含${index.calendars.length}个中国君主与年号转换节点，后续纪年资料将在这一共享参考中扩充。`):view==='corridors'?txt('Browse mapped journeys and networks alongside descriptions of roads, walls and waterways. A description does not supply a reconstructed route.','在同一目录浏览已入图的旅程与网络，以及道路、长城和水路的文字说明。文字说明不等于重建路线。'):txt('Compare editorial eras, historical articles and regional reference windows. Each card states what its dates describe. Open a window to read histories from every region within it.','比较编辑时段、历史文章与区域参考窗口。每张卡片注明年代的含义，打开一个窗口即可并读其中世界各地的历史。');
    openDialog(`<p class="eyebrow">${view==='corridors'?txt('Journeys & connections','旅程与连接'):txt('Timeline reference','时间线参考')}</p><h2>${title}</h2><p>${intro}</p>${tabs()}<div class="library-search discovery-controls"><label class="sr-only" for="reference-search">${txt('Search references','搜索参考资料')}</label><input id="reference-search" type="search" maxlength="120" value="${esc(query)}" placeholder="${txt('Periods, rulers, roads…','时期、君主、道路……')}"><select id="reference-region" aria-label="${txt('Reference region','参考资料地区')}"><option value="all">${txt('All regions','所有地区')}</option>${regionIds.map(id=>`<option value="${esc(id)}" ${region===id?'selected':''}>${esc(regionName(id))}</option>`).join('')}</select></div><div id="reference-results">${resultHTML()}</div>`,{wide:true,nav:nav()});
    document.querySelector('#reference-search')?.addEventListener('input',event=>{query=event.target.value;limit=48;repaint();});
    document.querySelector('#reference-region')?.addEventListener('change',event=>{region=event.target.value;limit=48;repaint();});
  }
  function historyHTML(items){return items.map(r=>`<button class="library-event" data-action="open-dialog-story" data-id="${esc(r.id)}"><time>${range(r)}</time><span><strong>${esc(loc(r.title))}</strong><small>${esc(regionName(r.region))} · ${esc(r.location?.label||'')}</small></span><b>↗</b></button>`).join('');}
  function open(id){const row=index.byId.get(id);if(!row)return;
    if(row.kind==='route'){openRoute(row.routeId);return;}
    detailId=id;limit=48;view=row.kind==='corridor'?'corridors':row.kind==='calendar'?'calendars':'periods';
    const matching=recordsInReferencePeriod(records,row),regionsPresent=new Set(matching.map(r=>r.region));
    const periodContent=()=>`<h3>${txt('Histories in this window','此时间窗口中的历史')} · ${matching.length}</h3><p class="location-caption">${txt('Includes intersecting focus periods from every source and region. An overlapping article does not imply continuous occupation or unchanged rule.','汇集所有来源和地区中与本时段相交的文章。区间重叠不表示持续占领或统治不变。')} ${regionsPresent.size} ${txt('regions represented','个地区有记录')}.</p><div class="library-events">${historyHTML(matching.slice(0,48))}</div>${matching.length>48?`<button class="secondary-button" data-action="reference-detail-more" data-id="${esc(id)}">${txt('Show more histories','显示更多历史')} · 48 / ${matching.length}</button>`:''}`;
    const subtitle=row.kind==='calendar'?`${esc(loc(row.ruler))}${Number.isInteger(row.original.eraYearAtStart)?` · ${txt('Sequence begins in ruler/era year','序列开始于君主／年号纪年')} ${row.original.eraYearAtStart}`:''}`:esc(names(row));
    const body=row.kind==='corridor'?`<p>${txt('This entry describes a corridor. Its source includes schematic segments; this atlas does not display them as independently reconstructed paths.','本条目提供通道说明。原资料含示意线段，本地图不将其作为独立重建的路线展示。')}</p>`:periodContent();
    openDialog(`<button class="text-button" data-action="reference-${view}">← ${view==='corridors'?txt('Roads & waterways','道路与水路'):view==='calendars'?txt('Calendars & reign names','历法与纪年'):txt('Period guides','时期导读')}</button><p class="eyebrow">${meaning(row)}</p><h2>${esc(loc(row.title))}</h2><p>${range(row)}</p><p>${subtitle}</p>${row.summary&&row.periodType!=='reference'?`<p>${esc(loc(row.summary))}</p>`:''}${row.periodType==='reference'?`<p class="collection-note">${txt('These are source display bounds, not a dynasty lifespan. All atlas histories in the same time window can be explored below.','这些年代为来源展示边界，并非王朝存续年代。下方可探索同一时段内全部地图资料。')}</p>`:''}${row.kind==='calendar'&&row.original.note?`<p class="collection-note">${esc(loc(row.original.note))}</p>`:''}<div class="button-row"><button class="primary-button" data-action="reference-browse" data-id="${esc(id)}">${txt('Explore this time on the map','在地图上探索此时')} ↗</button>${row.recordId?`<button class="secondary-button" data-action="open-dialog-story" data-id="${esc(row.recordId)}">${txt('Read the historical article','阅读历史文章')} ↗</button>`:''}</div>${body}<section class="detail-section"><h3>${txt('Evidence & interpretation','依据与解释')}</h3>${evidence(row)}</section>`,{wide:true,nav:nav()});
  }
  function moreDetail(){const row=index.byId.get(detailId);if(!row)return;limit+=48;const matching=recordsInReferencePeriod(records,row),el=document.querySelector('.library-events');if(el)el.innerHTML=historyHTML(matching.slice(0,limit));const button=document.querySelector('[data-action="reference-detail-more"]');if(button){if(limit>=matching.length)button.remove();else button.textContent=`${txt('Show more histories','显示更多历史')} · ${limit} / ${matching.length}`;}}
  function showSources(){
    const imported=records.filter(r=>r.provenance?.dataset==='jiangshan'),reviewed=imported.filter(r=>r.provenance?.status==='reviewed').length,annotations=(library.journeys||[]).flatMap(j=>j.stops||[]).filter(s=>s.review).length;
    openDialog(`<p class="eyebrow">${txt('Sources & method','来源与方法')}</p><h2>${txt('One atlas, traceable evidence.','同一张地图，可追溯的依据。')}</h2><p>${txt('Histories are browsed together by time, place, people and subject. Source records stay separate behind the scenes so authorship, licenses and later corrections remain traceable.','历史按时间、地点、人物与主题共同浏览。底层保留来源记录，以便追溯作者、许可及后续修订。')}</p><h3>${txt('Reference project accounting','参考项目资料核对')}</h3><p>${txt('The Jiangshan reference release contributes event narratives, place names, person indexes and chronicles. Its import ledger accounts for every source event; original text does not imply independent corroboration.','《江山时序》参考版本提供事件叙事、地名、人物索引与纪事。引入清单逐条记录原始事件的处理结果，保留原文不等于获得独立佐证。')}</p><div class="source-counts"><div><strong>${imported.length}</strong><span>${txt('mapped records','已入图记录')}</span></div><div><strong>${manifest.merged?.length||0}</strong><span>${txt('duplicate rows merged','合并的重复行')}</span></div><div><strong>${manifest.held?.length||0}</strong><span>${txt('held for review','待审记录')}</span></div></div><p>${reviewed} ${txt('event revisions','项事件修订')} · ${annotations} ${txt('chronicle annotations','项纪事注释')}. ${txt('Review status is retained in each entry’s evidence section.','核查状态保留在各条目的依据部分。')}</p><p>${txt('Pinned reference version','固定参考版本')}: <code>${esc(manifest.source.commit)}</code></p><div class="button-row"><a class="secondary-button" href="${esc(manifest.source.repository+'/tree/'+manifest.source.commit)}" target="_blank" rel="noopener noreferrer">${txt('Original project','原项目')} ↗</a><a class="secondary-button" href="./data/china-import-manifest.json" download>${txt('Import ledger','引入清单')} JSON</a><a class="secondary-button" href="./data/china-reviews.json" download>${txt('Correction record','修订记录')} JSON</a><a class="secondary-button" href="./data/china-upstream.LICENSE.md" target="_blank" rel="noopener noreferrer">${txt('Attribution & notices','署名与许可声明')} ↗</a></div>${(manifest.held||[]).length?`<h3>${txt('Held records','待审记录')}</h3>${manifest.held.map(r=>`<p class="collection-note">${esc(loc(r.reason)||words(r.reason))}</p>`).join('')}`:''}<h3>${txt('How to read the evidence','如何阅读依据')}</h3><p>${txt('Independent essays cite their evidence at the relevant entry. Reference profiles remain indexes; geographic proximity is a discovery aid; period windows organize material; route lines are schematic. None of these changes a source’s review status or license.','独立文章在相应条目中列出依据。参考人物条目仍为索引；地理邻近用于发现关联；时期窗口用于组织资料；路线连线为示意。这些呈现方式不会改变来源的核查状态或许可。')}</p>`,{wide:true});
  }
  function handle(action,id){switch(action){
    case 'reference-periods':show('periods');break;
    case 'reference-calendars':show('calendars');break;
    case 'reference-corridors':show('corridors');break;
    case 'reference-sources':showSources();break;
    case 'reference-open':open(id);break;
    case 'reference-more':limit+=48;repaint();break;
    case 'reference-detail-more':moreDetail();break;
    case 'reference-browse':{const row=index.byId.get(id);if(row)browsePeriod({start:row.start,end:row.end,year:validYear(row.year)?row.year:row.start,region:'all',title:row.title});break;}
    default:return false;
  }return true;}
  return {index,showPeriods:options=>show('periods',options),showCalendars:options=>show('calendars',options),showCorridors:options=>show('corridors',options),showSources,search:(q,options)=>searchReferences(index,q,options),handle,open};
}
