import {filterReadings,RECOMMENDED_READINGS} from './reading-catalog.mjs?v=1';

export function createReadingBrowser({paths,getLanguage,openDialog,escape:esc,regionName,regions,themeNames,mapPreview=()=>''}){
 const filters={query:'',region:'all',theme:'all',minutes:'all'};
 let savedScroll=0,selectedId='';
 const text=(en,zh)=>getLanguage()==='zh'?zh:en;
 const local=value=>value[getLanguage()];
 const shortThemes={cities:['Cities & daily life','城市与生活'],states:['Power','权力'],exchange:['Exchange','交流'],knowledge:['Knowledge','知识'],culture:['Culture','文化']};
 const dialog=()=>document.querySelector('#dialog');
 function remember(id){
  if(!document.querySelector('#reading-catalog'))return;
  savedScroll=dialog().scrollTop;selectedId=id;
 }
 function card(p,preview=false){return `<button class="journey-card reading-card" data-action="${p.questions?'open-course':'start-journey'}" data-id="${esc(p.id)}">${preview?mapPreview(p):''}<strong>${esc(local(p.title))}</strong><p>${esc(local(p.description))}</p><small>${p.stops.length} ${text('entries','条记录')}${p.estimatedMinutes?' · '+text('about '+p.estimatedMinutes+' min','约'+p.estimatedMinutes+'分钟'):''}${p.chapters.length?' · '+p.chapters.length+text(' chapters','章'):''} · ${text(p.questions?'View study →':'Begin reading →',p.questions?'查看导读 →':'开始阅读 →')}</small></button>`;}
 function renderResults(){
  const all=paths(),matching=filterReadings(all,filters),unfiltered=!filters.query.trim()&&filters.region==='all'&&filters.theme==='all'&&filters.minutes==='all';
  const recommended=unfiltered?RECOMMENDED_READINGS.map(id=>matching.find(p=>p.id===id)).filter(Boolean):[];
  const rest=matching.filter(p=>!recommended.includes(p));
  document.querySelector('#reading-reset').hidden=unfiltered;
  document.querySelector('#reading-count').textContent=text(`${matching.length} of ${all.length} readings`,`${all.length}篇中显示${matching.length}篇`);
  document.querySelector('#reading-results').innerHTML=matching.length?
   `${recommended.length?`<section aria-labelledby="reading-start"><h3 id="reading-start">${text('Start here','从这里开始')}</h3><div class="journey-grid reading-featured">${recommended.map(p=>card(p,true)).join('')}</div></section><h3>${text('Explore the collection','探索全部阅读')}</h3>`:''}<div class="journey-grid">${rest.map(p=>card(p)).join('')}</div>`:
   `<p class="reading-empty">${text('No readings match these filters. Try a different topic or a longer reading time.','没有符合筛选的阅读。可尝试其他主题或更长的阅读时间。')}</p>`;
 }
 function show(tabs){
  openDialog(`<div id="reading-catalog"><p class="eyebrow">${text('Guided reading','主题阅读')}</p><h2>${text('Find your next reading.','找到下一段阅读。')}</h2><p>${text('Short studies and longer sequences, grounded in sources.','从短篇导读到分章阅读，循着来源探索历史。')}</p>${tabs}<form class="reading-filters" role="search" aria-label="${text('Find guided readings','查找主题阅读')}"><label class="reading-search">${text('Search readings','搜索阅读')}<input id="reading-query" type="search" value="${esc(filters.query)}" placeholder="${text('Topic, place or person','主题、地点或人物')}" autocomplete="off"></label><label>${text('Region','地区')}<select id="reading-region"><option value="all">${text('All regions','所有地区')}</option>${regions.map(id=>`<option value="${id}" ${filters.region===id?'selected':''}>${esc(regionName(id))}</option>`).join('')}</select></label><label>${text('Theme','主题')}<select id="reading-theme"><option value="all">${text('All themes','所有主题')}</option>${Object.entries(themeNames).map(([id,names])=>`<option value="${id}" ${filters.theme===id?'selected':''}>${esc((shortThemes[id]||names)[getLanguage()==='zh'?1:0])}</option>`).join('')}</select></label><label>${text('Reading time','阅读时长')}<select id="reading-minutes">${[['all','Any length','不限'],['20','Up to 20 min','20分钟以内'],['40','Up to 40 min','40分钟以内']].map(([value,en,zh])=>`<option value="${value}" ${filters.minutes===value?'selected':''}>${text(en,zh)}</option>`).join('')}</select></label></form><div class="reading-result-bar"><p id="reading-count" class="reading-count" role="status" aria-live="polite"></p><button type="button" class="secondary-button" id="reading-reset">${text('Reset filters','重置筛选')}</button></div><div id="reading-results"></div></div>`,{nav:'journeys-nav'});
  const form=document.querySelector('.reading-filters');
  form.addEventListener('submit',event=>event.preventDefault());
  const update=()=>{filters.query=document.querySelector('#reading-query').value;filters.region=document.querySelector('#reading-region').value;filters.theme=document.querySelector('#reading-theme').value;filters.minutes=document.querySelector('#reading-minutes').value;savedScroll=0;selectedId='';renderResults();};
  document.querySelector('#reading-query').addEventListener('input',update);
  form.addEventListener('change',update);
  document.querySelector('#reading-reset').addEventListener('click',()=>{
   document.querySelector('#reading-query').value='';for(const id of ['region','theme','minutes'])document.querySelector('#reading-'+id).value='all';update();dialog().scrollTop=0;document.querySelector('#reading-query').focus({preventScroll:true});
  });
  renderResults();
  if(selectedId){
   const button=[...document.querySelectorAll('#reading-results [data-id]')].find(el=>el.dataset.id===selectedId);
   button?.focus({preventScroll:true});dialog().scrollTop=savedScroll;
   if(button){const row=button.getBoundingClientRect(),bounds=dialog().getBoundingClientRect();if(row.top<bounds.top||row.bottom>bounds.bottom)button.scrollIntoView({block:'nearest',behavior:'instant'});}
  }
 }
 return {show,remember};
}
