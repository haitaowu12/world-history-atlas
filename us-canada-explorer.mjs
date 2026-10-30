import {areaHistory,searchAreas} from './us-canada-reference.mjs';

export function createUsCanadaExplorer({records,getState,getRoot,getProjection,getTransform,getViewport,isChallenge,
 enabled,setEnabled,loadJSON,manifestFile,indexFile,contentVersion,openDialog,closeDialog,focusLocation,render,cachedPath,esc,sourceLink,formatPeriod,showTooltip,hideTooltip}){
 let manifest,features=[],index={},pending,loadError,paths,labels,currentArea='',onlyYear=false;
 const zh=()=>getState().lang==='zh',loc=value=>value?.[getState().lang]||value?.en||value;
 const text=(en,cn)=>zh()?cn:en;
 const entries=count=>text(count===1?'linked entry':'linked entries','条关联记录');
 const areaName=feature=>feature.properties.id==='US-DC'?text('District of Columbia','哥伦比亚特区'):loc(feature.properties.name);
 async function load(){
  if(manifest)return;
  if(!pending){loadError=null;pending=(async()=>{
   const [metadata,lookup]=await Promise.all([loadJSON('data/'+manifestFile),loadJSON('data/'+indexFile)]);
   if(metadata.role!=='modern-reference'||lookup.contentVersion!==contentVersion)throw Error('Geographic reference does not match this content edition');
   const collections=await Promise.all(metadata.layers.map(layer=>loadJSON('data/'+layer.file)));
   features=collections.flatMap(c=>c.features);index=lookup.areas;manifest=metadata;
  })().catch(error=>{pending=null;loadError=error;throw error;});}
  await pending;
 }
 function sources(areaId){
  const associations=[...new Map((index[areaId]||[]).filter(link=>link.locationAssociation).map(link=>[JSON.stringify(link.locationAssociation),link.locationAssociation])).values()];
  const reviewed=associations.length?`<h3>${text('Reviewed coastal place links','已核对的沿海地名关联')}</h3><ul>${associations.map(item=>`<li><strong>${esc(loc(item.place))}</strong><p>${esc(loc(item.note))}</p>${item.sources.map(source=>sourceLink(source)).join(' · ')}</li>`).join('')}</ul>`:'';
  return `<p class="collection-note">${esc(loc(manifest.scope))}</p><details><summary>${text('Map source and method','地图来源与方法')}</summary><ol class="detail-sources">${manifest.sources.map(s=>`<li>${sourceLink(s)}</li>`).join('')}</ol><p>${text('Links use representative points and dated life milestones inside generalized modern outlines, plus reviewed named-place associations for omitted coastal locations. They do not establish historical jurisdiction, Indigenous territory or continuous residence.','关联依据是概略现代轮廓内的代表点及有日期的生平节点，并补充已核对、但被概略海岸轮廓遗漏的地名关联。这些关联不表示历史管辖、原住民族疆域或持续居住。')}</p>${reviewed}</details>`;}
 function cards(rows){return rows.map(r=>`<button class="elsewhere-card" data-action="open-dialog-story" data-id="${esc(r.id)}"><span><strong>${esc(loc(r.title))}</strong><small>${esc(formatPeriod(r,getState().lang))}</small></span>↗</button>`).join('');}
 async function showBrowser(){
  await load();renderMap();let query='',country='all';
  openDialog(`<p class="eyebrow">${text('MODERN GEOGRAPHIC REFERENCE','现代地理参照')}</p><h2>${text('US & Canada, region by region','按地区探索美国与加拿大')}</h2>${sources()}<div class="discovery-controls library-search"><label class="sr-only" for="area-search">${text('Search states and provinces','搜索州、省与地区')}</label><input id="area-search" type="search" maxlength="120" placeholder="${text('State, province or territory…','州、省或地区……')}"><label class="sr-only" for="area-country">${text('Country reference','国家参照')}</label><select id="area-country"><option value="all">${text('US & Canada','美国与加拿大')}</option><option value="USA">${text('United States','美国')}</option><option value="CAN">${text('Canada','加拿大')}</option></select></div><div id="area-results"></div>`,{wide:true});
  const paint=()=>{
   const matches=searchAreas(features,query,country);
   document.querySelector('#area-results').innerHTML=`<p role="status">${matches.length} ${text(matches.length===1?'reference area':'reference areas','个参照地区')}</p><div class="country-grid">${matches.map(f=>`<button class="country-card" data-action="reference-area" data-id="${esc(f.properties.id)}"><strong>${esc(areaName(f))}</strong><small>${esc(f.properties.id)} · ${(index[f.properties.id]||[]).length} ${entries((index[f.properties.id]||[]).length)}</small><span>↗</span></button>`).join('')}</div>`;
  };
  document.querySelector('#area-search').addEventListener('input',event=>{query=event.target.value;paint();});
  document.querySelector('#area-country').addEventListener('change',event=>{country=event.target.value;paint();});paint();
 }
 async function showArea(id){
  await load();renderMap();const feature=features.find(f=>f.properties.id===id);if(!feature)return;
  currentArea=id;const state=getState(),rows=areaHistory(id,index,records,{year:onlyYear?state.year:null});
  openDialog(`<button class="text-button" data-action="reference-browse">← ${text('States & provinces','州、省与地区')}</button><p class="eyebrow">${text('MODERN REFERENCE · NATURAL EARTH 5.1.1 / 2022','现代参照 · NATURAL EARTH 5.1.1 / 2022')}</p><h2>${esc(areaName(feature))}</h2><div class="button-row"><button class="primary-button" data-action="reference-map" data-id="${esc(id)}">${text('Explore on the map','在地图上探索')} ↗</button><button class="secondary-button" data-action="reference-time" data-id="${esc(id)}" aria-pressed="${onlyYear}">${onlyYear?text('Show all dates','显示所有年代'):text('At selected year: ','仅看所选年份：')+formatPeriod({start:state.year,end:state.year},state.lang)}</button></div>${sources(id)}<h3>${text('Linked history','关联历史')} · ${rows.length}</h3><p class="location-caption">${onlyYear?text('A representative or reviewed named-place record active in the selected year, or a life milestone dated to that year.','代表点或已核对地名关联记录的关注时段包含所选年份，或生平节点标于该年。'):text('All recorded dates. Each entry retains its own time and location meaning.','显示所有收录年代；各条目保留自身的时间及位置含义。')}</p>${rows.length?cards(rows):`<p>${text('No linked entries with this time filter yet. Explore all dates or search the wider atlas. An empty list describes this collection, not the region’s history.','当前时间条件下尚无关联条目。可查看所有年代或搜索全图；空白说明收录缺口，并非当地没有历史。')}</p>`}`,{wide:true});
 }
 async function showMap(id){
  await load();renderMap();const feature=features.find(f=>f.properties.id===id);if(!feature)return;
  currentArea=id;setEnabled(true);closeDialog();render();
  const point=feature.properties.labelPoint;focusLocation({lon:point[0],lat:point[1]},id==='US-AK'||id==='CA-NU'?3.8:5);
 }
 function updateStatus(active){
  let button=document.querySelector('#reference-status');
  if(!active){button?.remove();return;}
  if(!button){button=document.createElement('button');button.id='reference-status';button.className='map-status-link reference-status';button.dataset.action='reference-browse';document.querySelector('.map-bottomline').insertBefore(button,document.querySelector('#map-method'));}
  button.textContent=loadError?text('Reference unavailable · retry ↗','参照暂不可用 · 重试 ↗'):text('Modern states/provinces · 2022 reference ↗','现代州／省轮廓 · 2022年参照 ↗');
 }
 function renderMap(){
  const root=getRoot();if(!root)return;
  const active=enabled()&&!isChallenge();
  updateStatus(active);
  if(active&&!manifest){if(!loadError)load().then(render).catch(()=>render());return;}
  if(!paths){paths=root.insert('g','.disputed-area-layer').attr('class','us-canada-reference');labels=root.insert('g','.settlement-layer').attr('class','us-canada-labels').attr('aria-hidden','true');}
  const visible=active?features:[];
  paths.selectAll('path').data(visible,f=>f.properties.id).join('path').attr('class',f=>'reference-area'+(f.properties.id===currentArea?' reference-selected':''))
   .attr('d',cachedPath).attr('data-reference-area',f=>f.properties.id).attr('data-reference-release','5.1.1').attr('role','button').attr('tabindex',0)
   .attr('aria-label',f=>`${areaName(f)} · ${text('modern geographic reference','现代地理参照')}`)
   .on('click',(event,f)=>{event.stopPropagation();onlyYear=false;showArea(f.properties.id);})
   .on('keydown',(event,f)=>{if(['Enter',' '].includes(event.key)){event.preventDefault();onlyYear=false;showArea(f.properties.id);}})
   .on('mouseenter',(event,f)=>showTooltip(event,`${areaName(f)} · ${text('Modern 2022 source reference','现代参照／2022年来源')} · ${(index[f.properties.id]||[]).length} ${entries((index[f.properties.id]||[]).length)}`)).on('mouseleave',hideTooltip);
  const transform=getTransform(),projection=getProjection(),viewport=getViewport(),boxes=[];
  const labelRows=transform.k>=3?visible.filter(f=>{
   const [x,y]=transform.apply(projection(f.properties.labelPoint));
   if(x<15||x>viewport.width-15||y<15||y>viewport.height-15||boxes.some(b=>Math.abs(x-b[0])<25&&Math.abs(y-b[1])<19))return false;
   boxes.push([x,y]);return true;
  }):[];
  labels.selectAll('text').data(labelRows,f=>f.properties.id).join('text').attr('class','reference-area-label')
   .attr('transform',f=>{const p=projection(f.properties.labelPoint);return `translate(${p[0]},${p[1]}) scale(${1/transform.k})`;}).text(f=>f.properties.abbreviation);
 }
 function handle(action,id){
  if(!action.startsWith('reference-'))return false;
  const attempt=promise=>promise.catch(error=>openDialog(`<h2>${text('Reference unavailable','参照资料暂不可用')}</h2><p>${esc(error.message)}</p><button data-action="reference-browse">${text('Retry','重试')}</button>`));
  if(action==='reference-browse')attempt(showBrowser());
  else if(action==='reference-area'){onlyYear=false;attempt(showArea(id));}
  else if(action==='reference-time'){onlyYear=!onlyYear;attempt(showArea(id));}
  else if(action==='reference-map')attempt(showMap(id));
  return true;
 }
 return {render:renderMap,handle,showBrowser};
}
