import {MIN_YEAR,MAX_YEAR,REGIONS,THEMES,TIME_ANCHORS,normalizeYear,formatYear,formatPeriod,yearFromSlider,sliderFromYear,activeAt,filterRecords,contemporaries,stateFromHash,hashFromState,defaultState,validateRecords,validateNotebook,mergeNotebooks,toOrdinal,fromOrdinal} from './core.mjs';

const $=s=>document.querySelector(s);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const translations={
  en:{explore:'Explore',journeys:'Journeys',notebook:'Notebook',sources:'About & sources',share:'Share view ↗',edition:'A LIVING ATLAS · FIRST EDITION',headline:'History, in perspective.',intro:'Choose a moment. Discover the worlds that existed together.',atYear:'At this time',allTime:'Across all time',region:'Region',theme:'Theme',reset:'Reset filters',worldView:'WORLD VIEW',legendPlace:'Historical place / focus',mapNote:'How to read this map',mapHint:'Drag to explore · Scroll to zoom · Select a place to begin',travelTo:'Travel to',go:'Go',scaleNote:'Uneven time scale · dates are selected historical focus periods',compare:'Compare stories',allRegions:'All regions',allThemes:'All themes',search:'Search a place, idea, or culture…',stories:'stories',story:'story',close:'Close',save:'Save story',saved:'Saved',addCompare:'Add to compare',removeCompare:'In comparison',dateContext:'About these dates',readSources:'Explore the evidence',elsewhere:'Meanwhile, elsewhere',personalNote:'Your note',noteHint:'What surprised you? What would you like to explore next?',noteSaved:'Saved on this device.',noteFailed:'Storage unavailable. Export your notebook to keep your notes.',physical:'Physical geography for orientation. Markers show representative places, not territory.',emptyTitle:'There are more histories to discover.',empty:'No entries in this curated selection match these filters. An empty map does not mean an empty past.',browseAll:'Browse all periods',coverage:'A curated starting collection, not a complete account of world history. Stories and sources can be expanded.',focusPeriod:'Selected historical period',location:'Representative location',outOfTime:'This story is outside the selected year. Choose its period to see its contemporaries.',jumpPeriod:'Go to this period',noElsewhere:'No other entries cover this moment in the current collection.',shareCopied:'View link copied. Personal notes stay on your device.',shareTitle:'Share this view',shareDescription:'This link contains the selected year, story, language, and filters. Your notebook is not included.',copy:'Copy link',notebookIntro:'Saved stories and your notes are stored in this browser. Export a copy to keep them or move them to another device.',emptyNotebook:'No saved stories yet. Open a story and choose “Save story”, or add a note.',export:'Export notebook',import:'Import a notebook JSON file (up to 1 MB)',importHint:'Import adds saved stories and replaces notes for matching entries. Other notes remain.',importSuccess:'Notebook imported.',openStory:'Open story',remove:'Remove bookmark',downloadData:'Download the historical data',notebookEmptyExport:'Your notebook has no saved stories or notes yet.',journeysTitle:'Follow a thread through history.',journeysIntro:'These are reading sequences across sourced places. They are not reconstructed travel routes or claims of direct contact.',begin:'Begin journey →',stop:'Stop journey',previous:'Previous',next:'Next',finish:'Finish',journeyDone:'Journey complete. Explore another place or save your discoveries.',compareTitle:'Put two histories side by side.',compareIntro:'Open any story and choose “Add to compare”. You can compare different regions, periods, or themes.',compareEmpty:'Choose two stories to build a comparison.',compareFull:'Two stories are already selected. Remove one in the comparison to add another.',compareAt:'Their selected periods overlap',compareNotAt:'Their selected periods do not overlap',compareCaution:'A shared date does not establish contact or influence. Use the sources to investigate connections.',removeCompareAction:'Remove from comparison',aboutTitle:'A map for asking better questions.',aboutIntro:'World History Atlas is an independent global companion inspired by Jiangshan Map. It connects a shared timeline with places, source-backed narratives, and comparisons across regions.',collection:'The first collection',method:'Reading the map',mapMethod:'The map uses present-day physical land geometry for orientation. Coastlines and landscapes have changed. Pins are representative sites, not the boundaries of states, cultures, or peoples. Nearby pins may be grouped; select a numbered group to zoom in.',timeMethod:'Dates are inclusive focus intervals. A short event appears at its recorded year; a long story appears across its stated period. BCE and CE have no year zero. The slider uses an uneven scale to leave room for recent centuries.',evidenceMethod:'Narratives are original summaries of the linked institutional sources. Some dates are approximate or selected editorial windows. Read the date note and sources for each entry. Source review is not independent historical peer review.',bordersHeading:'Why no historical borders yet?',bordersMethod:'The reusable historical-basemaps dataset contains chronological and attribution issues in inspected samples. Its polygons are not included. A future border layer must have dated evidence, uncertainty, and a clear distinction between political control and cultural distribution.',scopeHeading:'Scope and next additions',scopeMethod:'Coverage currently favors documented heritage sites and selected political or scientific milestones. Daily life, Indigenous perspectives, social history, women’s histories, migrations, and several regions need deeper coverage. Living peoples do not end when an entry’s focus period ends.',privacyHeading:'Your notebook',privacyMethod:'No account, analytics, or remote database is used by this app. Notes and bookmarks stay in local browser storage. Export them before clearing site data. The hosting service may maintain its own access logs.',credits:'Sources & credits',sourceCatalog:'Entry-by-entry source catalogue',records:'stories',regions:'regions',publishers:'source publishers',copyright:'App code: MIT. Original narratives: CC BY 4.0. Source pages retain their own rights. Natural Earth physical land: public domain. D3: ISC.',keyboard:'Keyboard: / to search; Escape to close a story; + and − to zoom the focused map; arrow keys to pan. All stories are also available in the list.',invalidYear:'Enter a whole year within 13,000 BCE–2026 CE. There is no year zero.',loading:'Loading the atlas…',loadError:'The atlas could not load its local data. Reload the page, or open the data file.',sourceChecked:'Source review: 21 October 2026',savedFilter:'Show saved stories',world:'World',viewPeriod:'Selected year',allMap:'Across all time',cluster:'nearby stories',resetMap:'Reset world view',noteLimit:'3,000 characters maximum',stopPlayback:'Pause timeline',playTimeline:'Play timeline',at:'at',readingPath:'Reading sequence'},
  zh:{explore:'探索',journeys:'主题旅程',notebook:'笔记本',sources:'关于与来源',share:'分享视图 ↗',edition:'持续扩充的历史地图 · 首版',headline:'在地图上，读懂历史。',intro:'选择一个时刻，看看世界各地正在发生什么。',atYear:'此时此刻',allTime:'纵览所有时期',region:'地区',theme:'主题',reset:'重置筛选',worldView:'世界视角',legendPlace:'历史地点／代表位置',mapNote:'如何阅读地图',mapHint:'拖动探索 · 滚动缩放 · 点击地点开始',travelTo:'前往',go:'前往',scaleNote:'非均匀时间刻度 · 日期表示所选历史阶段',compare:'对照历史',allRegions:'所有地区',allThemes:'所有主题',search:'搜索地点、思想或文化……',stories:'条历史',story:'条历史',close:'关闭',save:'收藏故事',saved:'已收藏',addCompare:'加入对照',removeCompare:'已加入对照',dateContext:'这些日期意味着什么',readSources:'查看史料与依据',elsewhere:'与此同时，世界其他地方',personalNote:'你的笔记',noteHint:'什么让你感到意外？接下来想了解什么？',noteSaved:'已保存在此设备。',noteFailed:'无法使用本地存储，请导出笔记以免丢失。',physical:'地形仅供定位，标记表示代表地点，不代表领土。',emptyTitle:'还有更多历史等待探索。',empty:'当前精选条目中没有符合筛选的内容。地图空白不代表当时无人生活。',browseAll:'浏览所有时期',coverage:'这是持续扩充的精选内容，不是世界历史全貌。',focusPeriod:'所选历史阶段',location:'代表位置',outOfTime:'这条历史不在当前年份范围内。前往它的时期，可查看同时代的其他故事。',jumpPeriod:'前往这个时期',noElsewhere:'当前资料集中没有其他覆盖此时刻的条目。',shareCopied:'视图链接已复制。个人笔记仍留在此设备。',shareTitle:'分享此视图',shareDescription:'链接包含年份、条目、语言和筛选条件，不包含个人笔记。',copy:'复制链接',notebookIntro:'收藏与笔记保存在此浏览器。导出备份，可长期保留或在另一台设备上使用。',emptyNotebook:'还没有收藏。打开一条历史，点击「收藏故事」或添加笔记。',export:'导出笔记本',import:'导入笔记本 JSON 文件（不超过 1 MB）',importHint:'导入会添加收藏，并替换相同条目的笔记；其他笔记保留。',importSuccess:'笔记本已导入。',openStory:'打开故事',remove:'取消收藏',downloadData:'下载历史数据',notebookEmptyExport:'笔记本中尚无收藏或笔记。',journeysTitle:'沿着一条线索，走进历史。',journeysIntro:'这些是串联有据可查地点的阅读顺序，不是复原的旅行路线，也不代表各地点之间必然存在直接联系。',begin:'开始旅程 →',stop:'结束旅程',previous:'上一步',next:'下一步',finish:'完成',journeyDone:'旅程完成。继续探索，或收藏你的发现。',compareTitle:'把两段历史，放在一起看。',compareIntro:'打开故事，点击「加入对照」，即可比较不同地区、时期或主题。',compareEmpty:'请选择两条历史进行对照。',compareFull:'已选择两条历史。先在对照中移除一条，再添加新条目。',compareAt:'两条历史的所选时期存在重叠',compareNotAt:'两条历史的所选时期没有重叠',compareCaution:'处于同一时代不代表有接触或影响。请通过来源进一步考察它们的联系。',removeCompareAction:'从对照中移除',aboutTitle:'用一张地图，提出更好的问题。',aboutIntro:'寰宇时序是受「江山时序」启发而独立开发的世界历史伴侣，以统一时间轴连接不同地区的地点、历史叙事与资料来源。',collection:'首批内容',method:'阅读地图',mapMethod:'地图使用当代陆地轮廓辅助定位。海岸线与自然环境曾随时间变化。标记表示代表地点，不是国家、文化或民族的疆界。距离较近的标记可能合并，点击数字可放大。',timeMethod:'日期是包含起止年份的历史关注区间。单年事件只在该年出现，较长故事在其所述阶段内出现。公元前与公元之间没有零年。时间轴使用非均匀刻度，为近代时期保留空间。',evidenceMethod:'叙事是依据所链接机构资料撰写的原创概述。部分日期为约数或编辑选取的时间窗口。请阅读每条的日期说明与来源。来源核查不等同于独立历史学同行评审。',bordersHeading:'为何暂不显示历史疆界？',bordersMethod:'在抽查的可复用历史疆界资料中，发现了年代与归属问题，因此首版未纳入这些多边形。未来的疆界图层需要注明时间依据、不确定性，并区分政治控制与文化分布。',scopeHeading:'覆盖范围与待补充内容',scopeMethod:'当前内容较多来自文物遗产与部分政治、科学事件。日常生活、原住民视角、社会史、女性史、迁徙及部分地区仍需扩充。条目结束年份并不表示相关民族或文化消失。',privacyHeading:'你的笔记本',privacyMethod:'应用本身不使用账号、分析追踪或远程数据库。笔记和收藏留在浏览器本地存储中。清除网站数据前请先导出。托管服务可能保留访问日志。',credits:'来源与致谢',sourceCatalog:'逐条来源目录',records:'条历史',regions:'个地区',publishers:'家来源机构',copyright:'代码：MIT；原创叙事：CC BY 4.0；来源页面保留各自权利；Natural Earth 地形：公有领域；D3：ISC。',keyboard:'键盘操作：/ 搜索；Esc 关闭故事；聚焦地图后用 +、− 缩放，方向键平移。所有故事也可通过列表浏览。',invalidYear:'请输入公元前 13,000 年至公元 2026 年之间的整数年份，不存在零年。',loading:'正在加载历史地图……',loadError:'无法加载本地历史数据。请刷新页面或打开数据文件。',sourceChecked:'来源核查：2026年10月21日',savedFilter:'仅看收藏',world:'世界',viewPeriod:'所选年份',allMap:'纵览所有时期',cluster:'条邻近历史',resetMap:'恢复世界视图',noteLimit:'最多 3,000 字符',stopPlayback:'暂停时间轴',playTimeline:'播放时间轴',at:'于',readingPath:'阅读顺序'}
};
const regions={africa:['Africa','非洲'],'west-central-asia':['West & Central Asia','西亚与中亚'],europe:['Europe','欧洲'],'south-asia':['South Asia','南亚'],'east-asia':['East Asia','东亚'],'southeast-asia':['Southeast Asia','东南亚'],'north-america':['North America','北美洲'],'latin-america':['Latin America','拉丁美洲'],oceania:['Oceania','大洋洲']};
const themes={cities:['Cities & daily life','城市与生活'],states:['States & power','国家与权力'],exchange:['Trade & connections','贸易与交流'],knowledge:['Knowledge & invention','知识与发明'],culture:['Art & living cultures','艺术与文化']};
const colors={cities:'#ac583b',states:'#68618b',exchange:'#3b827c',knowledge:'#a18033',culture:'#9b5d76'};
let records=[],land,state=defaultState(),notebook={version:1,saved:[],notes:{}},storageOK=true,visible=[],selected=null;
let map,root,projection,path,zoom,width=900,height=600,transform,markerLayer,labelsLayer,timer=null,toastTimer=null,journey=null,journeyIndex=0;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const t=key=>translations[state.lang][key]||key;
const localized=value=>typeof value==='object'?value[state.lang]||value.en:value;
const regionName=id=>regions[id]?.[state.lang==='zh'?1:0]||id;
const themeName=id=>themes[id]?.[state.lang==='zh'?1:0]||id;
const byId=id=>records.find(r=>r.id===id);
const midpoint=r=>fromOrdinal(Math.round((toOrdinal(r.start)+toOrdinal(r.end))/2));
const sourceLink=s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.publisher)}</small>`;

function toast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{$('#toast').hidden=true;},4500);}
function persist(){try{localStorage.setItem('world-history-atlas-notebook-v1',JSON.stringify(notebook));storageOK=true;}catch{storageOK=false;}return storageOK;}
function updateURL(){history.replaceState(null,'',hashFromState(state));}
function setActiveNav(id){document.querySelectorAll('.nav-button').forEach(el=>el.classList.toggle('active',el.id===id));}
function openDialog(html){stopPlayback();$('#dialog-content').innerHTML=`<div class="dialog-inner"><button class="dialog-close" aria-label="${t('close')}" data-action="close-dialog">×</button>${html}</div>`;if(!$('#dialog').open)$('#dialog').showModal();}
function closeDialog(){$('#dialog').close();setActiveNav('explore-nav');}
function applyLanguage(){
  document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';
  document.title=state.lang==='zh'?'寰宇时序 · World History Atlas':'World History Atlas · 寰宇时序';
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
  $('#language').textContent=state.lang==='en'?'中文':'EN';$('#language').lang=state.lang==='en'?'zh':'en';$('#language').setAttribute('aria-label',state.lang==='en'?'Switch to Chinese':'Switch to English');
  $('#search').placeholder=t('search');$('#search').setAttribute('aria-label',t('search'));
  $('#region').innerHTML=`<option value="all">${t('allRegions')}</option>`+REGIONS.map(id=>`<option value="${id}">${regionName(id)}</option>`).join('');
  $('#theme').innerHTML=`<option value="all">${t('allThemes')}</option>`+THEMES.map(id=>`<option value="${id}">${themeName(id)}</option>`).join('');
  $('#coverage-note').textContent=t('coverage');
  $('#timeline-ticks').innerHTML=TIME_ANCHORS.map((year,i)=>`<button style="left:${i*12.5}%" data-action="year" data-year="${year}">${esc(formatYear(year,state.lang))}</button>`).join('');
  $('#year-input').setAttribute('aria-label',state.lang==='zh'?'年份':'Year');
  $('#timeline-slider').setAttribute('aria-label',state.lang==='zh'?'历史年份':'Historical year');
  $('#world-map').setAttribute('aria-label',state.lang==='zh'?'世界地形与历史地点交互地图':'Interactive physical world map with historical places');
  $('#region').setAttribute('aria-label',state.lang==='zh'?'按地区筛选':'Filter by region');$('#theme').setAttribute('aria-label',state.lang==='zh'?'按主题筛选':'Filter by theme');
  $('#zoom-in').setAttribute('aria-label',state.lang==='zh'?'放大':'Zoom in');$('#zoom-out').setAttribute('aria-label',state.lang==='zh'?'缩小':'Zoom out');$('#zoom-reset').setAttribute('aria-label',t('resetMap'));
}

function render(){
  visible=filterRecords(records,state,notebook.saved);
  if(state.entry&&!visible.some(r=>r.id===state.entry))state.entry='';
  selected=byId(state.entry)||null;
  $('#search').value=state.query;$('#region').value=state.region;$('#theme').value=state.theme;
  $('#mode-year').classList.toggle('selected',state.mode==='year');$('#mode-year').setAttribute('aria-pressed',String(state.mode==='year'));
  $('#mode-all').classList.toggle('selected',state.mode==='all');$('#mode-all').setAttribute('aria-pressed',String(state.mode==='all'));
  $('#map-date').textContent=state.mode==='all'?t('allMap'):formatYear(state.year,state.lang);
  $('#map-header-note').textContent=t('physical');
  $('#results-heading').textContent=`${visible.length} ${t(visible.length===1?'story':'stories')}${state.savedOnly?' · '+t('saved'):''}`;
  $('#timeline-label').textContent=state.mode==='all'?(state.lang==='en'?'Showing every period': '显示所有时期'):`${visible.length} ${t('stories')} · ${formatYear(state.year,state.lang)}`;
  $('#timeline-slider').value=sliderFromYear(state.year);$('#timeline-slider').setAttribute('aria-valuetext',formatYear(state.year,state.lang));
  $('#year-input').value=Math.abs(state.year);$('#year-input').max=state.year<0?String(-MIN_YEAR):String(MAX_YEAR);$('#era').value=state.year<0?'bce':'ce';
  $('#atlas-count').textContent=`${records.length} ${t('records')} · ${new Set(records.map(r=>r.region)).size} ${t('regions')}`;
  $('#compare-button').textContent=`${t('compare')}${state.compare.length?' ('+state.compare.length+'/2)':''}`;
  $('#stories').innerHTML=visible.length?visible.map((r,i)=>`<button class="story-button ${r.id===state.entry?'selected':''}" data-action="select" data-id="${r.id}" aria-label="${esc(localized(r.title))}, ${esc(formatPeriod(r,state.lang))}" ${r.id===state.entry?'aria-current="true"':''}><span class="story-number">${String(i+1).padStart(2,'0')}</span><span><strong class="story-title">${esc(localized(r.title))}</strong><span class="story-period">${esc(formatPeriod(r,state.lang))}</span><span class="story-region"><i class="theme-dot" style="background:${colors[r.theme]}"></i>${esc(regionName(r.region))} · ${esc(themeName(r.theme))}</span></span><span class="story-arrow" aria-hidden="true">↗</span></button>`).join(''):`<div class="empty-state"><strong>${t('emptyTitle')}</strong>${t('empty')}<br><button data-action="browse-all">${t('browseAll')}</button></div>`;
  renderMarkers();renderDetail();renderJourney();updateURL();
}

function renderDetail(){
  const panel=$('#detail');panel.hidden=!selected;
  if(!selected)return;
  const r=selected, inTime=activeAt(r,state.year), related=contemporaries(records,r,state.year,4);
  panel.innerHTML=`<button class="detail-close" aria-label="${t('close')}" data-action="close-detail">×</button><div class="detail-region">${esc(regionName(r.region))} · ${esc(themeName(r.theme))}</div><h2 tabindex="-1">${esc(localized(r.title))}</h2><p class="detail-period">${esc(formatPeriod(r,state.lang))}</p><span class="focus-badge">${t('focusPeriod')}</span>${!inTime?`<div class="selected-outside">${t('outOfTime')} <button class="text-button" data-action="jump-period" data-id="${r.id}">${t('jumpPeriod')}</button></div>`:''}<p class="detail-body">${esc(localized(r.summary))}</p><div class="detail-note"><strong>${t('dateContext')}</strong>${esc(localized(r.dateNote))}</div><div class="detail-actions"><button data-action="save" data-id="${r.id}" aria-pressed="${notebook.saved.includes(r.id)}">${notebook.saved.includes(r.id)?'✓ '+t('saved'):'＋ '+t('save')}</button><button data-action="compare-add" data-id="${r.id}" aria-pressed="${state.compare.includes(r.id)}">${state.compare.includes(r.id)?'✓ '+t('removeCompare'):t('addCompare')}</button></div><section class="detail-section"><h3>${t('readSources')}</h3><ol class="detail-sources">${r.sources.map(s=>`<li>${sourceLink(s)}</li>`).join('')}</ol><p class="location-caption">${t('location')}: ${esc(r.location.label)} · ${Math.abs(r.location.lat).toFixed(1)}°${r.location.lat>=0?'N':'S'}, ${Math.abs(r.location.lon).toFixed(1)}°${r.location.lon>=0?'E':'W'}<br>${t('sourceChecked')}</p></section><section class="detail-section"><h3>${t('elsewhere')} · ${esc(formatYear(state.year,state.lang))}</h3>${related.length?related.map(x=>`<button class="elsewhere-card" data-action="select-contemporary" data-id="${x.id}"><span><strong>${esc(localized(x.title))}</strong><small>${esc(regionName(x.region))}</small></span><span aria-hidden="true">↗</span></button>`).join(''):`<p class="location-caption">${t('noElsewhere')}</p>`}</section><section class="detail-section"><label class="note-label" for="story-note">${t('personalNote')} · ${t('noteLimit')}</label><textarea class="note-input" id="story-note" maxlength="3000" data-id="${r.id}" placeholder="${esc(t('noteHint'))}">${esc(notebook.notes[r.id]||'')}</textarea><span class="note-state" id="note-state">${storageOK?t('noteSaved'):t('noteFailed')}</span></section>`;
}

function selectStory(id,{jump=false,focus=true}={}){
  const record=byId(id);if(!record)return;stopPlayback();
  if(!filterRecords(records,{...state,mode:'all'},notebook.saved).some(r=>r.id===id)){
    state.region='all';state.theme='all';state.query='';state.savedOnly=false;
  }
  if(jump||!activeAt(record,state.year)){state.year=midpoint(record);}
  state.entry=id;
  // A story reached through all-time search stays in all-time mode; its selected year still anchors comparisons.
  render();
  if(focus)focusLocation(record.location,2.4);
  $('#detail').scrollTop=0;
  if(window.matchMedia('(max-width:650px)').matches)$('.map-stage').scrollIntoView({block:'start',behavior:reducedMotion?'instant':'smooth'});
  $('#detail h2')?.focus({preventScroll:true});
}
function setYear(year,{fromPlayback=false}={}){
  if(!fromPlayback)stopPlayback();
  state.year=normalizeYear(year,state.year);state.mode='year';
  if(state.entry&&!activeAt(byId(state.entry),state.year))state.entry='';
  if(!fromPlayback)journey=null;
  render();
}
function resetFilters(){state.region='all';state.theme='all';state.query='';state.savedOnly=false;render();resetMap();}
function toggleSave(id){notebook.saved=notebook.saved.includes(id)?notebook.saved.filter(x=>x!==id):[...notebook.saved,id];persist();render();if(!storageOK)toast(t('noteFailed'));}
function toggleCompare(id){
  if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);
  else if(state.compare.length<2)state.compare.push(id);
  else {toast(t('compareFull'));showCompare();return;}
  render();if(state.compare.length===2)showCompare();
}

function initializeMap(){
  map=d3.select('#world-map');root=map.append('g');
  root.append('path').attr('class','ocean-sphere');root.append('path').attr('class','graticule');
  root.append('g').attr('class','land-layer');labelsLayer=root.append('g').attr('aria-hidden','true');markerLayer=root.append('g');
  projection=d3.geoEqualEarth();path=d3.geoPath(projection);transform=d3.zoomIdentity;
  zoom=d3.zoom().scaleExtent([1,14]).on('zoom',event=>{transform=event.transform;root.attr('transform',transform);renderMarkers();});
  map.call(zoom).on('dblclick.zoom',null);
  new ResizeObserver(()=>resizeMap()).observe($('#map-wrap'));
  map.on('keydown',event=>{
    if(event.target!==map.node())return;
    const steps={ArrowLeft:[60,0],ArrowRight:[-60,0],ArrowUp:[0,60],ArrowDown:[0,-60]};
    if(steps[event.key]){event.preventDefault();map.call(zoom.translateBy,steps[event.key][0]/transform.k,steps[event.key][1]/transform.k);}
    else if(event.key==='+'||event.key==='='){event.preventDefault();zoomBy(1.5);}
    else if(event.key==='-'){event.preventDefault();zoomBy(1/1.5);}
    else if(event.key==='Home'){event.preventDefault();resetMap();}
  });
  resizeMap();
}
function resizeMap(){
  const rect=$('#map-wrap').getBoundingClientRect();width=rect.width;height=rect.height;if(!width||!height)return;
  map.attr('viewBox',`0 0 ${width} ${height}`);
  projection.fitExtent([[24,Math.max(90,height*.17)],[width-24,height-65]],{type:'Sphere'});
  root.select('.ocean-sphere').attr('d',path({type:'Sphere'}));root.select('.graticule').attr('d',path(d3.geoGraticule10()));
  root.select('.land-layer').selectAll('path').data(land.features).join('path').attr('class','land').attr('d',path).attr('aria-hidden','true');
  zoom.extent([[0,0],[width,height]]).translateExtent([[-width*.5,-height*.5],[width*1.5,height*1.5]]);
  renderGeographicLabels();map.call(zoom.transform,d3.zoomIdentity);renderMarkers();
}
function renderGeographicLabels(){
  const labels=[{en:'NORTH AMERICA',zh:'北美洲',lon:-108,lat:46},{en:'SOUTH AMERICA',zh:'南美洲',lon:-63,lat:-23},{en:'AFRICA',zh:'非洲',lon:16,lat:3},{en:'EUROPE',zh:'欧洲',lon:25,lat:55},{en:'ASIA',zh:'亚洲',lon:83,lat:47},{en:'OCEANIA',zh:'大洋洲',lon:139,lat:-22}];
  labelsLayer.selectAll('text').data(labels).join('text').attr('class','continent-label').attr('x',d=>projection([d.lon,d.lat])[0]).attr('y',d=>projection([d.lon,d.lat])[1]).text(d=>d[state.lang]);
}
function renderMarkers(){
  if(!markerLayer)return;
  renderGeographicLabels();
  const k=transform.k||1;
  const groups=[];
  const mapRecords=[...visible];if(selected&&!mapRecords.some(r=>r.id===selected.id))mapRecords.push(selected);
  for(const r of mapRecords){
    const [x,y]=projection([r.location.lon,r.location.lat]);
    const match=groups.find(g=>Math.hypot(g.x-x,g.y-y)*k<25 && !g.records.some(q=>q.id===state.entry) && r.id!==state.entry);
    if(match)match.records.push(r);else groups.push({x,y,records:[r]});
  }
  const markers=markerLayer.selectAll('g.marker').data(groups,g=>g.records.map(r=>r.id).sort().join('|')).join(enter=>{const g=enter.append('g').attr('class','marker').attr('role','button').attr('tabindex',0);g.append('circle').attr('class','marker-halo');g.append('circle').attr('class','marker-core');g.append('text').attr('class','cluster-count');g.append('text').attr('class','marker-label');return g;});
  markers.attr('transform',g=>`translate(${g.x},${g.y}) scale(${1/k})`).classed('selected',g=>g.records[0].id===state.entry).attr('aria-label',g=>g.records.length>1?`${g.records.length} ${t('cluster')}: ${g.records.map(r=>localized(r.title)).join(', ')}`:localized(g.records[0].title)).on('click',(event,g)=>{event.stopPropagation();activateMarker(g);}).on('keydown',(event,g)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activateMarker(g);}}).on('mouseenter',(event,g)=>showTooltip(event,g)).on('mousemove',(event,g)=>showTooltip(event,g)).on('mouseleave',()=>{$('#map-tooltip').hidden=true;});
  markers.select('.marker-halo').attr('r',g=>g.records.length>1?17:g.records[0].id===state.entry?18:13).attr('fill',g=>colors[g.records[0].theme]);
  markers.select('.marker-core').attr('r',g=>g.records.length>1?11:g.records[0].id===state.entry?7:5).style('fill',g=>g.records.length>1?'#365d4f':g.records[0].id===state.entry?'#243b35':colors[g.records[0].theme]);
  markers.select('.cluster-count').text(g=>g.records.length>1?g.records.length:'');
  const labelBoxes=[];
  markers.select('.marker-label').attr('x',11).attr('y',3).text(g=>{
    if(g.records.length>1)return '';
    const r=g.records[0];if(k<1.4 && r.id!==state.entry)return '';
    const title=localized(r.title), label=title.length>28?title.slice(0,27)+'…':title;
    const [sx,sy]=transform.apply([g.x,g.y]), box={x:sx+9,y:sy-10,w:label.length*(state.lang==='zh'?9:5.2),h:18};
    if(labelBoxes.some(b=>box.x<b.x+b.w && box.x+box.w>b.x && box.y<b.y+b.h && box.y+box.h>b.y)&&r.id!==state.entry)return '';
    labelBoxes.push(box);return label;
  });
}
function activateMarker(group){
  $('#map-tooltip').hidden=true;
  if(group.records.length===1)selectStory(group.records[0].id);
  else if(transform.k<10){
    const target=d3.zoomIdentity.translate(width*.5,height*.5).scale(Math.min(14,transform.k*2.2)).translate(-group.x,-group.y);
    map.transition().duration(reducedMotion?0:450).call(zoom.transform,target);
  } else {
    openDialog(`<h2>${group.records.length} ${t('cluster')}</h2><div class="notebook-list">${group.records.map(r=>`<div class="notebook-row"><div><strong>${esc(localized(r.title))}</strong><small>${esc(formatPeriod(r,state.lang))}</small></div><button class="secondary-button" data-action="open-dialog-story" data-id="${r.id}">${t('openStory')}</button></div>`).join('')}</div>`);
  }
}
function showTooltip(event,group){const el=$('#map-tooltip'),rect=$('#map-wrap').getBoundingClientRect();el.textContent=group.records.length>1?`${group.records.length} ${t('cluster')}`:localized(group.records[0].title);el.hidden=false;el.style.left=Math.min(rect.width-190,Math.max(8,event.clientX-rect.left+13))+'px';el.style.top=Math.min(rect.height-55,Math.max(8,event.clientY-rect.top+12))+'px';}
function zoomBy(factor){if(map)map.transition().duration(reducedMotion?0:250).call(zoom.scaleBy,factor);}
function resetMap(){if(map)map.transition().duration(reducedMotion?0:400).call(zoom.transform,d3.zoomIdentity);}
function focusLocation(location,scale=2.4){if(!map)return;const [x,y]=projection([location.lon,location.lat]);const usable=width>700?width-365:width;const target=d3.zoomIdentity.translate(usable*.5,height*.48).scale(Math.max(transform.k,scale)).translate(-x,-y);map.transition().duration(reducedMotion?0:500).call(zoom.transform,target);}

function stopPlayback(){if(timer){clearInterval(timer);timer=null;}$('#play').textContent='▶';$('#play').setAttribute('aria-label',t('playTimeline'));}
function historicalMoments(){return [...new Set([MIN_YEAR,MAX_YEAR,...records.flatMap(r=>[r.start,r.end,midpoint(r)])])].sort((a,b)=>a-b);}
function stepTime(direction,fromPlayback=false){const moments=historicalMoments(),next=direction>0?moments.find(x=>x>state.year):moments.toReversed().find(x=>x<state.year);if(next===undefined){stopPlayback();return false;}setYear(next,{fromPlayback});return true;}
function playTimeline(){if(timer){stopPlayback();return;}journey=null;state.entry='';state.mode='year';if(state.year===MAX_YEAR)state.year=MIN_YEAR;render();$('#play').textContent='Ⅱ';$('#play').setAttribute('aria-label',t('stopPlayback'));timer=setInterval(()=>stepTime(1,true),2200);}

const journeys=[
  {id:'world-1200',title:{en:'One world, around 1200',zh:'公元1200年的世界'},description:{en:'Cities, scholarship, and living landscapes across six regions. What can we see when we hold the year still?',zh:'在同一个年份，看看六个地区的城市、学术与生活景观。'},year:1200,stops:['cahokia','great-zimbabwe','angkor','nalanda','quanzhou','nan-madol']},
  {id:'city-making',title:{en:'How people made cities',zh:'人们怎样建造城市'},description:{en:'From the Andes to the Indus, then to Mesoamerica and southern Africa: different answers to living together.',zh:'从安第斯与印度河流域，到中美洲与非洲南部，看看共同生活的不同方式。'},stops:['caral','mohenjo-daro','teotihuacan','angkor','great-zimbabwe']},
  {id:'knowledge',title:{en:'Keeping and sharing knowledge',zh:'知识如何保存与传播'},description:{en:'Writing, learning communities, manuscript culture, industry, and a network for sharing information.',zh:'从文字、学习社群与手稿文化，到工业和信息共享网络。'},stops:['uruk-writing','nalanda','mogao','timbuktu','ironbridge','world-wide-web']},
  {id:'connections',title:{en:'A world of exchange',zh:'交流织成的世界'},description:{en:'Ports, caravan networks, and roads. Compare connections across land and sea without assuming one universal route.',zh:'港口、商路与道路：比较陆地和海上的联系，不把历史简化成一条路线。'},stops:['aksum','silk-roads-changan','quanzhou','kilwa','venice-maritime','qhapaq-nan']},
  {id:'living-landscapes',title:{en:'Living with land and water',zh:'与土地和水共生'},description:{en:'Settled foragers, wetland cultivators, aquaculture, and oceanic cultural landscapes. Living traditions continue.',zh:'定居采集者、湿地耕作者、水产养殖与海洋文化景观：延续至今的生活传统。'},stops:['jomon-northern-japan','kuk','budj-bim','nan-madol','rapa-nui','taputapuatea']},
  {id:'participation',title:{en:'Who gets a voice?',zh:'谁拥有发言权？'},description:{en:'Voting rights, independence, diplomacy, and democratic participation through selected modern milestones.',zh:'通过现代史中的若干节点，探索投票权、独立、外交与民主参与。'},stops:['nz-womens-suffrage','un-charter','south-asia-independence-partition','bandung-conference','ghana-independence','south-africa-election']}
];

function showJourneys(){
  setActiveNav('journeys-nav');
  openDialog(`<p class="eyebrow">${t('readingPath')}</p><h2>${t('journeysTitle')}</h2><p>${t('journeysIntro')}</p><div class="journey-grid">${journeys.map((j,i)=>`<button class="journey-card" data-action="start-journey" data-id="${j.id}"><span class="number">${String(i+1).padStart(2,'0')}</span><strong>${esc(localized(j.title))}</strong><p>${esc(localized(j.description))}</p><small>${j.stops.length} ${t('stories')} · ${t('begin')}</small></button>`).join('')}</div>`);
}
function startJourney(id){
  const chosen=journeys.find(j=>j.id===id);if(!chosen)return;
  closeDialog();journey=chosen;journeyIndex=0;state.region='all';state.theme='all';state.query='';state.savedOnly=false;state.mode='year';visitJourneyStop();
}
function visitJourneyStop(){
  const r=byId(journey.stops[journeyIndex]);if(!r){toast('This journey stop is unavailable.');return;}
  state.year=journey.year??midpoint(r);state.mode='year';selectStory(r.id);
}
function renderJourney(){
  const el=$('#journey-strip');el.hidden=!journey;$('.map-stage').classList.toggle('has-journey',!!journey);
  if(!journey)return;
  el.innerHTML=`<p class="eyebrow">${t('readingPath')}</p><h3>${esc(localized(journey.title))}</h3><div class="journey-controls"><button data-action="journey-prev" ${journeyIndex===0?'disabled':''}>‹ ${t('previous')}</button><span>${journeyIndex+1} / ${journey.stops.length}</span><button data-action="journey-next">${journeyIndex===journey.stops.length-1?t('finish'):t('next')+' ›'}</button><button data-action="journey-stop" aria-label="${t('stop')}">×</button></div>`;
}
function advanceJourney(delta){
  if(!journey)return;
  const n=journeyIndex+delta;if(n>=journey.stops.length){journey=null;renderJourney();toast(t('journeyDone'));return;}
  journeyIndex=Math.max(0,n);visitJourneyStop();
}
function showCompare(){
  const choices=state.compare.map(byId).filter(Boolean);
  let overlap='';
  if(choices.length===2){const start=Math.max(...choices.map(r=>r.start)),end=Math.min(...choices.map(r=>r.end));overlap=`<p class="comparison-note">${start<=end?`${t('compareAt')}: ${esc(formatPeriod({start,end},state.lang))}.`:t('compareNotAt')+'.'} ${t('compareCaution')}</p>`;}
  openDialog(`<h2>${t('compareTitle')}</h2><p>${t('compareIntro')}</p>${overlap}<div class="compare-grid">${choices.map(r=>`<section class="compare-column"><p class="eyebrow">${esc(regionName(r.region))}</p><h3>${esc(localized(r.title))}</h3><p class="comparison-year">${esc(formatPeriod(r,state.lang))}</p><p>${esc(localized(r.summary))}</p><p><strong>${t('dateContext')}</strong><br>${esc(localized(r.dateNote))}</p><ol class="detail-sources">${r.sources.map(s=>`<li>${sourceLink(s)}</li>`).join('')}</ol><button class="text-button" data-action="compare-remove-dialog" data-id="${r.id}">${t('removeCompareAction')}</button></section>`).join('')}${choices.length<2?`<section class="compare-column"><p>${t('compareEmpty')}</p><button class="primary-button" data-action="close-dialog">${t('explore')}</button></section>`:''}</div>`);
}
function showNotebook(){
  setActiveNav('notebook-nav');
  const ids=[...new Set([...notebook.saved,...Object.keys(notebook.notes).filter(k=>notebook.notes[k].trim())])];
  const entries=ids.map(byId).filter(Boolean);
  openDialog(`<h2>${t('notebook')}</h2><p>${t('notebookIntro')}</p><div class="button-row"><button class="primary-button" data-action="export-notebook">${t('export')}</button><button class="secondary-button" data-action="saved-filter">${t('savedFilter')}</button></div><div class="notebook-list">${entries.length?entries.map(r=>`<div class="notebook-row"><div><strong>${esc(localized(r.title))}</strong><small>${esc(formatPeriod(r,state.lang))}</small>${notebook.notes[r.id]?`<p>${esc(notebook.notes[r.id])}</p>`:''}</div><button class="secondary-button" data-action="open-dialog-story" data-id="${r.id}">${t('openStory')}</button></div>`).join(''):`<p>${t('emptyNotebook')}</p>`}</div><label class="import-label">${t('import')}<input id="notebook-import" type="file" accept=".json,application/json"></label><p>${t('importHint')}</p>`);
  $('#notebook-import').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try{if(file.size>1024*1024)throw new Error(state.lang==='en'?'The notebook exceeds 1 MB.':'笔记本超过1 MB。');const incoming=validateNotebook(JSON.parse(await file.text()),records);notebook=mergeNotebooks(notebook,incoming);persist();render();showNotebook();toast(storageOK?t('importSuccess'):t('noteFailed'));}
    catch(error){toast((state.lang==='en'?'Import failed: ':'导入失败：')+error.message);event.target.value='';}
  });
}
function downloadJSON(name,data){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportNotebook(){downloadJSON('world-history-notebook.json',notebook);}
function showAbout(){
  setActiveNav('about-nav');
  const publishers=new Set(records.flatMap(r=>r.sources.map(s=>s.publisher)));
  openDialog(`<p class="eyebrow">WORLD HISTORY ATLAS · 寰宇时序</p><h2>${t('aboutTitle')}</h2><p>${t('aboutIntro')}</p><div class="source-counts"><div><strong>${records.length}</strong><span>${t('records')}</span></div><div><strong>${new Set(records.map(r=>r.region)).size}</strong><span>${t('regions')}</span></div><div><strong>${publishers.size}</strong><span>${t('publishers')}</span></div></div><h3>${t('method')}</h3><p>${t('mapMethod')}</p><p>${t('timeMethod')}</p><p>${t('evidenceMethod')}</p><p>${t('keyboard')}</p><h3>${t('bordersHeading')}</h3><p>${t('bordersMethod')}</p><h3>${t('scopeHeading')}</h3><p>${t('scopeMethod')}</p><table class="coverage-table"><thead><tr><th>${t('region')}</th><th>${t('records')}</th></tr></thead><tbody>${REGIONS.map(id=>`<tr><td>${regionName(id)}</td><td>${records.filter(r=>r.region===id).length}</td></tr>`).join('')}</tbody></table><h3>${t('privacyHeading')}</h3><p>${t('privacyMethod')}</p><h3>${t('credits')}</h3><ul><li><a href="https://github.com/haitaowu12/jiangshan-map" target="_blank" rel="noopener noreferrer">Jiangshan Map / 江山时序 ↗</a> — ${state.lang==='en'?'interaction inspiration; this is an independent implementation.':'交互灵感来源；本应用为独立实现。'}</li><li><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth ↗</a> — ${state.lang==='en'?'physical land geometry, public domain.':'地形数据，公有领域。'}</li><li><a href="https://d3js.org/" target="_blank" rel="noopener noreferrer">D3 7.9.0 ↗</a> — ${state.lang==='en'?'Equal Earth projection and map interactions.':'Equal Earth 投影与地图交互。'}</li></ul><p>${t('copyright')}</p><div class="button-row"><a class="secondary-button" href="./data/history.json" download="world-history-data.json">${t('downloadData')}</a></div><h3>${t('sourceCatalog')}</h3><p>${t('sourceChecked')}</p>${records.map(r=>`<details class="source-catalog"><summary>${esc(localized(r.title))} · ${esc(formatPeriod(r,state.lang))}</summary><p>${esc(localized(r.dateNote))}</p><ul>${r.sources.map(s=>`<li>${sourceLink(s)}</li>`).join('')}</ul></details>`).join('')}`);
}
async function shareView(){
  // A saved-only filter is device-specific and deliberately not part of a public URL.
  const url=location.origin+location.pathname+hashFromState({...state,savedOnly:false});
  try{await navigator.clipboard.writeText(url);toast(t('shareCopied'));}
  catch{openDialog(`<h2>${t('shareTitle')}</h2><p>${t('shareDescription')}</p><input class="clipboard-field" id="share-url" aria-label="View URL" readonly value="${esc(url)}">`);$('#share-url').select();}
}

function wireEvents(){
  $('#search').addEventListener('input',event=>{stopPlayback();state.query=event.target.value;render();});
  $('#region').addEventListener('change',event=>{stopPlayback();state.region=event.target.value;render();resetMap();});
  $('#theme').addEventListener('change',event=>{stopPlayback();state.theme=event.target.value;render();resetMap();});
  $('#mode-year').addEventListener('click',()=>{stopPlayback();state.mode='year';render();});
  $('#mode-all').addEventListener('click',()=>{stopPlayback();state.mode='all';render();});
  $('#reset-filters').addEventListener('click',resetFilters);
  $('#timeline-slider').addEventListener('input',event=>setYear(yearFromSlider(event.target.value)));
  $('#year-form').addEventListener('submit',event=>{event.preventDefault();const raw=$('#year-input').value.trim(),magnitude=Number(raw),year=$('#era').value==='bce'?-magnitude:magnitude;if(!/^\d+$/.test(raw)||magnitude<=0||year<MIN_YEAR||year>MAX_YEAR){toast(t('invalidYear'));return;}setYear(year);});
  $('#year-input').addEventListener('input',()=>{$('#year-input').setCustomValidity('');});
  $('#era').addEventListener('change',()=>{$('#year-input').max=$('#era').value==='ce'?String(MAX_YEAR):String(-MIN_YEAR);});
  $('#play').addEventListener('click',playTimeline);$('#previous-time').addEventListener('click',()=>stepTime(-1));$('#next-time').addEventListener('click',()=>stepTime(1));
  $('#language').addEventListener('click',()=>{stopPlayback();state.lang=state.lang==='en'?'zh':'en';applyLanguage();render();});
  $('#zoom-in').addEventListener('click',()=>zoomBy(1.5));$('#zoom-out').addEventListener('click',()=>zoomBy(1/1.5));$('#zoom-reset').addEventListener('click',resetMap);
  $('#explore-nav').addEventListener('click',()=>{if($('#dialog').open)closeDialog();$('#search').focus();});$('#journeys-nav').addEventListener('click',showJourneys);$('#notebook-nav').addEventListener('click',showNotebook);$('#about-nav').addEventListener('click',showAbout);$('#map-method').addEventListener('click',showAbout);$('#compare-button').addEventListener('click',showCompare);$('#share').addEventListener('click',shareView);
  $('#brand-home').addEventListener('click',event=>{event.preventDefault();stopPlayback();journey=null;state={...defaultState(),lang:state.lang};applyLanguage();render();resetMap();});
  $('.skip').addEventListener('click',event=>{event.preventDefault();$('#stories').focus();$('#stories').scrollIntoView({block:'start',behavior:'instant'});});
  $('#dialog').addEventListener('close',()=>setActiveNav('explore-nav'));
  $('#dialog').addEventListener('click',event=>{if(event.target===$('#dialog')){const r=$('#dialog').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');if(!button)return;const id=button.dataset.id;
    switch(button.dataset.action){
      case 'select':journey=null;selectStory(id);break;
      case 'select-contemporary':journey=null;selectStory(id);break;
      case 'open-dialog-story':closeDialog();journey=null;state.region='all';state.theme='all';state.query='';state.savedOnly=false;selectStory(id,{jump:true});break;
      case 'close-detail':{const old=state.entry;state.entry='';journey=null;render();$(`#stories [data-id="${old}"]`)?.focus({preventScroll:true});break;}
      case 'close-dialog':closeDialog();break;
      case 'browse-all':state.mode='all';resetFilters();break;
      case 'year':setYear(Number(button.dataset.year));break;
      case 'jump-period':state.mode='year';setYear(midpoint(byId(id)));selectStory(id);break;
      case 'save':toggleSave(id);break;
      case 'compare-add':toggleCompare(id);break;
      case 'compare-remove-dialog':state.compare=state.compare.filter(x=>x!==id);render();showCompare();break;
      case 'start-journey':startJourney(id);break;
      case 'journey-prev':advanceJourney(-1);break;
      case 'journey-next':advanceJourney(1);break;
      case 'journey-stop':journey=null;renderJourney();break;
      case 'export-notebook':exportNotebook();break;
      case 'saved-filter':closeDialog();state.savedOnly=true;state.mode='all';state.region='all';state.theme='all';state.query='';render();resetMap();break;
    }
  });
  document.addEventListener('input',event=>{if(event.target.id==='story-note'){const id=event.target.dataset.id;notebook.notes[id]=event.target.value;persist();$('#note-state').textContent=storageOK?t('noteSaved'):t('noteFailed');}});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!$('#dialog').open&&state.entry){const old=state.entry;state.entry='';journey=null;render();$(`#stories [data-id="${old}"]`)?.focus({preventScroll:true});}
    if(event.key==='/'&&!$('#dialog').open&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){event.preventDefault();$('#search').focus();}
  });
  window.addEventListener('hashchange',()=>{stopPlayback();journey=null;state=stateFromHash(location.hash,records);applyLanguage();render();resetMap();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlayback();});
}

async function init(){
  try{
    const responses=await Promise.all([fetch('./data/history.json'),fetch('./assets/land.geojson')]);
    if(responses.some(r=>!r.ok))throw new Error('A local data file was not found.');
    [records,land]=await Promise.all(responses.map(r=>r.json()));
    const errors=validateRecords(records);if(errors.length)throw new Error(errors.slice(0,3).join('; '));
    for(const journey of journeys){
      for(const id of journey.stops){const r=records.find(r=>r.id===id);if(!r||journey.year&&!activeAt(r,journey.year))throw new Error(`Invalid journey stop: ${journey.id}/${id}`);}
    }
    if(!window.d3||land.type!=='FeatureCollection'||!Array.isArray(land.features))throw new Error('The map renderer or land geometry is unavailable.');
    state=stateFromHash(location.hash,records);
    try{const raw=localStorage.getItem('world-history-atlas-notebook-v1');if(raw)notebook=validateNotebook(JSON.parse(raw),records);}catch{storageOK=false;}
    applyLanguage();initializeMap();wireEvents();render();
    if(selected)focusLocation(selected.location);
  }catch(error){
    console.error('Atlas initialization failed:',error);
    $('#stories').innerHTML=`<div class="fatal"><strong>${t('loadError')}</strong><p>${esc(error.message)}</p><a href="./data/history.json">history.json</a><br><button class="secondary-button" id="retry-load">Reload</button></div>`;
    $('#retry-load').addEventListener('click',()=>location.reload());
    $('#map-date').textContent=state.lang==='zh'?'数据暂不可用':'Data unavailable';
    $('#map-header-note').textContent=state.lang==='zh'?'这不是历史空白。':'This is a loading error, not a historical absence.';
    document.querySelectorAll('.timeline button,.timeline input,.timeline select').forEach(el=>el.disabled=true);
  }
}

init();
