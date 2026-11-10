import {mediaFigures} from './history-media.mjs';
import {normalizeSearch} from './search-text.mjs';

export const REPRESENTATIONS={
 'historical-photograph':{en:'Historical photograph',zh:'历史照片'},
 'lifetime-portrait':{en:'Lifetime portrait',zh:'在世时的肖像'},
 'ancient-royal-image':{en:'Ancient royal image',zh:'古代王室图像'},
 'later-depiction':{en:'Later portrayal',zh:'后世描绘'},
 'modern-memorial':{en:'Modern memorial',zh:'现代纪念像'},
 'object-photograph':{en:'Historical object',zh:'历史文物'},
 'manuscript-detail':{en:'Manuscript',zh:'手稿'},
 'site-photograph':{en:'Site photograph',zh:'遗址照片'},
 'historical-artwork':{en:'Historical artwork',zh:'历史艺术作品'},
 'historical-map':{en:'Historical map',zh:'历史地图'}
};
const loc=(v,l)=>typeof v==='object'?v?.[l]||v?.en||'':v||'';
export function visualRows(catalog,records){
 const byId=new Map(records.map(r=>[r.id,r]));
 return (catalog.items||[]).map(item=>{
  const ids=[...new Set([...(item.recordIds||[]),...(catalog.associations||[]).filter(link=>link.assetId===item.id).map(link=>link.recordId)])];
  const linked=ids.map(id=>byId.get(id)).filter(Boolean);
  return {...item,linked,regions:[...new Set(linked.map(r=>r.region))],search:normalizeSearch([loc(item.title,'en'),loc(item.title,'zh'),item.creator,item.institution,...linked.flatMap(r=>[r.title.en,r.title.zh])].join(' '))};
 });
}
export function filterVisualRows(rows,{query='',region='all',type='all'}={}){
 const needle=normalizeSearch(query);
 return rows.filter(r=>(!needle||r.search.includes(needle))&&(region==='all'||r.regions.includes(region))&&(type==='all'||r.representation===type));
}
export function visualCoverage(catalog,records){
 const rows=visualRows(catalog,records),ids=[...new Set(rows.flatMap(r=>r.linked.map(r=>r.id)))];
 return {total:records.length,covered:ids.length,assets:rows.length,percent:records.length?100*ids.length/records.length:0,coveredIds:ids.sort(),uncoveredIds:records.filter(r=>!ids.includes(r.id)).map(r=>r.id)};
}

export function createVisualLibrary({catalog,records,getLanguage,regions,regionName,openDialog,openStory,escape:esc}){
 const rows=visualRows(catalog,records),coverage=visualCoverage(catalog,records);
 const filters={query:'',region:'all',type:'all'};let limit=24,selected=[];
 const lang=()=>getLanguage(),txt=(en,zh)=>lang()==='zh'?zh:en,L=v=>loc(v,lang());
 const badge=item=>L(REPRESENTATIONS[item.representation])||item.representation;
 function image(item){return `<img src="./${esc(item.file)}" width="${item.width}" height="${item.height}" alt="${esc(L(item.alt))}" loading="lazy" decoding="async" data-history-image><span class="history-image-fallback" hidden>${txt('Image unavailable','图像暂时不可用')}</span>`;}
 function renderResults(){
  const filtered=filterVisualRows(rows,filters);
  return `<p class="visual-result-count" role="status">${filtered.length} ${txt('images','幅图像')}</p><div class="visual-grid">${filtered.slice(0,limit).map(item=>`<article class="visual-card"><button class="visual-open" data-action="visual-inspect" data-id="${esc(item.id)}"><span class="visual-card-image">${image(item)}</span><span class="visual-card-copy"><small>${esc(badge(item))}</small><strong>${esc(L(item.title))}</strong><span>${esc(item.date)}</span></span></button><button class="visual-pick" data-action="visual-pick" data-id="${esc(item.id)}" aria-pressed="${selected.includes(item.id)}">${selected.includes(item.id)?'✓ ':''}${txt('Compare','对照')}<span class="sr-only"> ${esc(L(item.title))}</span></button></article>`).join('')}</div>${!filtered.length?`<p>${txt('No matching images. Try another name, region or image type.','没有符合条件的图像。请尝试其他名称、地区或图像类型。')}</p>`:''}${filtered.length>limit?`<button class="secondary-button" data-action="visual-more">${txt('Show more','显示更多')} · ${limit} / ${filtered.length}</button>`:''}`;
 }
 function updateResults(){const target=document.querySelector('#visual-results');if(target)target.innerHTML=renderResults();updateCompare();}
 function updateCompare(){const button=document.querySelector('[data-action="visual-compare"]');if(button){button.disabled=selected.length!==2;button.textContent=txt('Compare selected','对照已选图像')+` (${selected.length}/2)`;}}
 function browse(){
  openDialog(`<section class="visual-library"><p class="eyebrow">${txt('THE VISUAL ATLAS','图像中的历史')}</p><h2>${txt('Look closely. Follow the story.','细看图像，追寻故事。')}</h2><p class="visual-intro">${txt('Explore portraits, objects and surviving places. Open an image to see its date, source and connection to the history.','探索肖像、文物与留存至今的地点。打开图像，查看年代、来源及其与历史条目的联系。')}</p><p class="visual-coverage">${coverage.assets} ${txt('images','幅图像')} · ${coverage.covered} / ${coverage.total} ${txt('entries illustrated','条目配图')} (${coverage.percent.toFixed(1)}%)</p><div class="visual-controls"><label>${txt('Find an image','搜索图像')}<input id="visual-search" type="search" maxlength="200" value="${esc(filters.query)}" placeholder="${txt('People, objects, collections…','人物、文物、馆藏……')}"></label><label>${txt('Region','地区')}<select id="visual-region"><option value="all">${txt('All regions','所有地区')}</option>${regions.map(id=>`<option value="${id}" ${filters.region===id?'selected':''}>${esc(regionName(id))}</option>`).join('')}</select></label><label>${txt('Image type','图像类型')}<select id="visual-type"><option value="all">${txt('All types','所有类型')}</option>${Object.entries(REPRESENTATIONS).filter(([key])=>rows.some(r=>r.representation===key)).map(([key,value])=>`<option value="${key}" ${filters.type===key?'selected':''}>${esc(L(value))}</option>`).join('')}</select></label></div><div class="visual-compare-bar"><p>${txt('Choose two images to compare their materials, purpose and point of view.','选择两幅图像，对照材质、用途与表达角度。')}</p><button class="secondary-button" data-action="visual-compare" ${selected.length!==2?'disabled':''}>${txt('Compare selected','对照已选图像')} (${selected.length}/2)</button></div><div id="visual-results">${renderResults()}</div></section>`,{wide:true,nav:'visuals-nav'});
  document.querySelector('#visual-search').addEventListener('input',event=>{filters.query=event.target.value;limit=24;updateResults();});
  for(const [id,key] of [['visual-region','region'],['visual-type','type']])document.querySelector('#'+id).addEventListener('change',event=>{filters[key]=event.target.value;limit=24;updateResults();});
 }
 function inspect(id){
  const item=rows.find(row=>row.id===id);if(!item)return;
  openDialog(`<section class="visual-inspector"><button class="text-button" data-action="visual-browse">← ${txt('Image collection','图像目录')}</button><p class="eyebrow">${esc(badge(item))}</p><h2>${esc(L(item.title))}</h2><div class="visual-inspect-layout"><div><div class="visual-zoom" tabindex="0" aria-label="${txt('Image inspection area; scroll to explore a magnified image','图像细看区域；放大后可滚动查看')}">${image(item)}</div><label class="visual-zoom-control">${txt('Magnification','放大倍率')} <input id="visual-zoom" type="range" min="100" max="250" step="25" value="100"><output id="visual-zoom-value">100%</output></label></div><div class="visual-inspect-caption">${mediaFigures([item],lang(),esc).replace(/<a class="history-image-link"[\s\S]*?<\/a>/,'').replace(/<button class="text-button" data-action="visual-inspect"[\s\S]*?<\/button>/,'')}<h3>${txt('Stories behind this image','图像背后的故事')}</h3><ol class="visual-stories">${item.linked.map(record=>{const link=(catalog.associations||[]).find(link=>link.assetId===id&&link.recordId===record.id);return `<li><button data-action="visual-story" data-id="${esc(record.id)}">${esc(L(record.title))} ↗</button>${link?`<p>${esc(L(link.context))}</p>`:''}</li>`;}).join('')}</ol></div></div></section>`,{wide:true,nav:'visuals-nav'});
  document.querySelector('#visual-zoom').addEventListener('input',event=>{const value=Number(event.target.value);document.querySelector('.visual-zoom img').style.width=value+'%';document.querySelector('#visual-zoom-value').value=value+'%';});
 }
 function compare(){
  const pair=selected.map(id=>rows.find(r=>r.id===id)).filter(Boolean);if(pair.length!==2)return;
  openDialog(`<section class="visual-comparison"><button class="text-button" data-action="visual-browse">← ${txt('Image collection','图像目录')}</button><h2>${txt('Two images, two points of view','两幅图像，两种视角')}</h2><p>${txt('What can each image tell you about its maker and audience? Compare the image dates with the periods of the linked stories.','每幅图像透露了哪些关于制作者和受众的信息？比较图像制作年代与关联条目的历史时期。')}</p><div class="visual-compare-grid">${pair.map(item=>`<section><p class="eyebrow">${esc(badge(item))}</p>${mediaFigures([item],lang(),esc)}<button class="secondary-button" data-action="visual-inspect" data-id="${esc(item.id)}">${txt('Explore the image and its stories','探索图像与相关故事')} ↗</button></section>`).join('')}</div><details class="visual-prompts"><summary>${txt('Questions for a closer look','细看图像的几个问题')}</summary><ul><li>${txt('Which details are visible, and which claims need a written source?','哪些细节在图中可见，哪些判断需要文字来源？')}</li><li>${txt('Who commissioned, made or preserved the image?','谁委托制作、创作或保存了图像？')}</li><li>${txt('How do the material, composition and date change what you notice?','材质、构图与年代如何影响你注意到的内容？')}</li></ul></details></section>`,{wide:true,nav:'visuals-nav'});
 }
 return {browse,inspect,handle(action,id){
  if(action==='visual-browse')browse();else if(action==='visual-inspect')inspect(id);else if(action==='visual-story')openStory(id);
  else if(action==='visual-pick'){selected=selected.includes(id)?selected.filter(x=>x!==id):selected.length<2?[...selected,id]:[selected[1],id];updateResults();document.querySelector(`.visual-pick[data-id="${CSS.escape(id)}"]`)?.focus();}
  else if(action==='visual-more'){limit+=24;updateResults();}
  else if(action==='visual-compare')compare();else return false;return true;
 }};
}
