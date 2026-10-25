import {REGIONAL_ZOOM,referenceAreaName,searchRegionalUnits,referenceHistory,visibleReferenceCountries,projectedReferenceBounds,regionalCountryFromHash} from './regional-reference.mjs?v=13';

export function createRegionalExplorer({records,getState,getRoot,getProjection,getTransform,getViewport,isChallenge,enabled,setEnabled,loadJSON,openDialog,closeDialog,focusLocation,prepareMap,onNavigate,cachedPath,esc,sourceLink,formatPeriod,showTooltip,hideTooltip}){
 let metadata,metadataPending,metadataError,paths,labels,currentArea='',yearOnly=false,paintFrame=0,activeRequests=0;
 let selectedCountry=/^[A-Z]{3}$/.test(new URLSearchParams(location.hash.slice(1)).get('regions')||'')?new URLSearchParams(location.hash.slice(1)).get('regions'):'';
 const loaded=new Map(),pending=new Map(),failures=new Map(),jobs=[],zh=()=>getState().lang==='zh',text=(en,cn)=>zh()?cn:en,loc=v=>v?.[getState().lang]||v?.en||v;
 const countryByCode=code=>metadata.countries.find(c=>c.code===code),unitById=id=>[...loaded.values()].flat().find(f=>f.properties.id===id),name=f=>referenceAreaName(f,getState().lang);
 const schedule=()=>{if(!paintFrame)paintFrame=requestAnimationFrame(()=>{paintFrame=0;renderMap();});};
 async function loadMetadata(){
  if(metadata)return metadata;
  if(!metadataPending){metadataError=null;metadataPending=loadJSON('data/regional-reference.json').then(data=>{if(data.role!=='modern-reference'||data.sourceRelease!=='5.1.1')throw Error('Unsupported regional reference');metadata=data;return data;}).catch(error=>{metadataPending=null;metadataError=error;throw error;});}
  return metadataPending;
 }
 function drain(){while(activeRequests<4&&jobs.length){const job=jobs.shift();activeRequests++;Promise.all(job.country.layers.map(l=>loadJSON('data/'+l.file))).then(collections=>{const features=collections.flatMap(c=>c.features);loaded.set(job.country.code,features);failures.delete(job.country.code);job.resolve(features);}).catch(error=>{pending.delete(job.country.code);failures.set(job.country.code,error);job.reject(error);}).finally(()=>{activeRequests--;drain();schedule();});}}
 async function loadCountry(code,{retry=false}={}){
  await loadMetadata();if(loaded.has(code))return loaded.get(code);if(pending.has(code))return pending.get(code);
  if(failures.has(code)&&!retry)throw failures.get(code);
  const country=countryByCode(code);if(!country)throw Error('Unknown reference area');
  const promise=new Promise((resolve,reject)=>{jobs.push({country,resolve,reject});});pending.set(code,promise);drain();return promise;
 }
 function sourceDetails(){return `<details class="regional-method"><summary>${text('Source and boundary meaning','来源与边界含义')}</summary><p>${esc(loc(metadata.scope))}</p><p>${text('Administrative levels vary: France uses departments; some source groups include dependencies, islands or disputed areas. Names, types and arrangements retain the 2022 source, which may differ from present administration. Gray outlines do not establish historical control, Indigenous territories or sovereignty.','行政级别并不统一：法国采用省级单元；部分来源分组含属地、岛屿或争议地区。名称、类别与分组保留2022年资料，可能不同于现行制度。灰色轮廓不表示历史控制、原住民族疆域或主权归属。')}</p><ol class="detail-sources">${metadata.sources.map(s=>`<li>${sourceLink(s)}</li>`).join('')}</ol></details>`;}
 function intro(){return `<p class="eyebrow">${text('MODERN REFERENCE · NATURAL EARTH / 2022','现代参照 · NATURAL EARTH / 2022')}</p>`;}
 async function showBrowser(){
  await loadMetadata();document.querySelector('#layer-menu').hidden=true;document.querySelector('#layer-menu-button').setAttribute('aria-expanded','false');failures.clear();schedule();let query='';
  openDialog(`${intro()}<h2>${text('States, provinces & regions','州、省与各地行政单元')}</h2><p>${text('Choose a country or area. Subdivision boundaries appear automatically as you zoom into the map.','选择国家或地区；放大地图时会自动显示内部行政边界。')}</p>${sourceDetails()}<div class="library-search"><label class="sr-only" for="regional-country-search">${text('Search countries and areas','搜索国家与地区')}</label><input id="regional-country-search" type="search" maxlength="100" placeholder="${text('Canada, United States, China, India…','加拿大、美国、中国、印度……')}"></div><div id="regional-country-results"></div>`,{wide:true});
  const paint=()=>{const q=query.trim().normalize('NFKC').toLocaleLowerCase(),countries=metadata.countries.filter(c=>!q||[c.code,c.name.en,c.name.zh].some(s=>s?.normalize('NFKC').toLocaleLowerCase().includes(q))).sort((a,b)=>{const priority=c=>['USA','CAN'].indexOf(c.code);return (priority(a)<0?2:priority(a))-(priority(b)<0?2:priority(b))||loc(a.name).localeCompare(loc(b.name));});document.querySelector('#regional-country-results').innerHTML=`<p role="status">${countries.length} ${text('source countries and areas','个来源国家／地区')}</p><div class="country-grid">${countries.map(c=>`<button class="country-card" data-action="regions-country" data-id="${esc(c.code)}"><strong>${esc(loc(c.name))}</strong><small>${c.count} ${text('mapped units','个地图单元')}</small><span>↗</span></button>`).join('')}</div>`;};document.querySelector('#regional-country-search').addEventListener('input',event=>{query=event.target.value;paint();});paint();
 }
 async function showCountry(code){
  const units=await loadCountry(code,{retry:true}),country=countryByCode(code);let query='';
  openDialog(`<button class="text-button" data-action="regions-browse">← ${text('Countries & areas','国家与地区')}</button>${intro()}<h2>${esc(loc(country.name))}</h2><div class="button-row"><button class="primary-button" data-action="regions-country-map" data-id="${esc(code)}">${text('Show on map','在地图上显示')} ↗</button></div>${sourceDetails()}<div class="library-search"><label class="sr-only" for="regional-unit-search">${text('Search states, provinces and regions','搜索州、省与地区')}</label><input id="regional-unit-search" type="search" maxlength="100" placeholder="${text('Search a regional name…','搜索地区名称……')}"></div><div id="regional-unit-results"></div>`,{wide:true});
  const paint=()=>{const found=searchRegionalUnits(units,query,getState().lang);document.querySelector('#regional-unit-results').innerHTML=`<p role="status">${found.length} ${text('mapped units','个地图单元')}</p><div class="country-grid">${found.sort((a,b)=>name(a).localeCompare(name(b))).map(f=>`<button class="country-card" data-action="regions-area" data-id="${esc(f.properties.id)}"><strong>${esc(name(f))}</strong><small>${f.properties.historyLinks.length} ${text('linked histories','条关联历史')}</small><span>↗</span></button>`).join('')}</div>`;};document.querySelector('#regional-unit-search').addEventListener('input',event=>{query=event.target.value;paint();});paint();
 }
 async function showArea(id){
  const feature=unitById(id);if(!feature)return;currentArea=id;const country=countryByCode(feature.properties.country),state=getState(),rows=referenceHistory(feature,records,yearOnly?state.year:null);
  openDialog(`<button class="text-button" data-action="regions-country" data-id="${esc(country.code)}">← ${esc(loc(country.name))}</button>${intro()}<h2>${esc(name(feature))}</h2><div class="button-row"><button class="primary-button" data-action="regions-map" data-id="${esc(id)}">${text('Show on map','在地图上显示')} ↗</button><button class="secondary-button" data-action="regions-time" data-id="${esc(id)}" aria-pressed="${yearOnly}">${yearOnly?text('Show all dates','显示所有年代'):text('At selected year: ','仅看所选年份：')+formatPeriod({start:state.year,end:state.year},state.lang)}</button></div>${sourceDetails()}<h3>${text('Linked history','关联历史')} · ${rows.length}</h3><p class="location-caption">${text('Links use representative places, dated life milestones and reviewed named-place associations. They do not establish continuous residence or historical jurisdiction.','关联依据为代表地点、有日期的生平节点及已核对的地名，不表示持续居住或历史管辖。')}</p>${rows.length?rows.map(r=>`<button class="elsewhere-card" data-action="open-dialog-story" data-id="${esc(r.id)}"><span><strong>${esc(loc(r.title))}</strong><small>${esc(formatPeriod(r,state.lang))}</small></span>↗</button>`).join(''):`<p>${text('No linked history in this selection yet. The boundary remains available; this is a collection gap, not an absence of regional history.','当前选择下尚无关联历史，边界仍可查看。空白是收录缺口，并非当地没有历史。')}</p>`}`,{wide:true});
 }
 async function showMap(id,isCountry=false){
  let center,scale;
  if(isCountry){await loadCountry(id,{retry:true});selectedCountry=id;const c=countryByCode(id);center=c.center;const [[w,s],[e,n]]=c.bounds,span=w<=e?e-w:360-w+e;scale=['USA','CAN'].includes(id)?3.3:['FRA','GBR','NLD','DNK'].includes(id)?5.5:Math.max(3.2,Math.min(7,Math.min(125/Math.max(span,1),70/Math.max(n-s,1))));}
  else{const f=unitById(id);if(!f)return;selectedCountry=f.properties.country;currentArea=id;center=f.properties.labelPoint;const [[w,s],[e,n]]=f.properties.bounds,span=w<=e?e-w:360-w+e;scale=Math.max(2.5,Math.min(9,Math.min(100/Math.max(span,1),55/Math.max(n-s,1))));}
  setEnabled(true);closeDialog();prepareMap();onNavigate();focusLocation({lon:center[0],lat:center[1]},scale);schedule();
 }
 function updateStatus(){
  let button=document.querySelector('#regional-reference-status');if(!enabled()||isChallenge()){button?.remove();return;}
  if(!button){button=document.createElement('button');button.id='regional-reference-status';button.className='map-status-link reference-status';button.dataset.action='regions-browse';document.querySelector('.map-bottomline').insertBefore(button,document.querySelector('#map-method'));}
  const failure=metadataError||failures.size;
  button.textContent=failure?text('Regional data unavailable · retry ↗','地区资料暂不可用 · 重试 ↗'):getTransform().k<REGIONAL_ZOOM?text('States & provinces · zoom in ↗','州与省区 · 放大查看 ↗'):text('Modern subdivisions · 2022 reference ↗','现代行政边界 · 2022年参照 ↗');
 }
 function renderMap(){
  const root=getRoot();if(!root)return;document.querySelector('.map-stage').classList.toggle('regional-focus',!!selectedCountry&&enabled()&&!isChallenge());updateStatus();
  if(!metadata){if(!metadataError)loadMetadata().then(schedule).catch(schedule);return;}
  const countries=enabled()&&!isChallenge()?visibleReferenceCountries(metadata.countries,getProjection(),getTransform(),getViewport()):[];
  for(const c of countries)if(!loaded.has(c.code)&&!pending.has(c.code)&&!failures.has(c.code))loadCountry(c.code).catch(()=>{});
  const codes=new Set(countries.map(c=>c.code)),projection=getProjection(),transform=getTransform(),viewport=getViewport();
  const visible=[...loaded].filter(([code])=>codes.has(code)).flatMap(([,units])=>units).filter(f=>projectedReferenceBounds(f.properties.bounds,projection,transform).some(([[x0,y0],[x1,y1]])=>x1>=0&&y1>=0&&x0<=viewport.width&&y0<=viewport.height));
  if(!paths){paths=root.insert('g','.disputed-area-layer').attr('class','regional-reference');labels=root.insert('g','.settlement-layer').attr('class','regional-reference-labels').attr('aria-hidden','true');}
  paths.selectAll('path').data(visible,f=>f.properties.id).join('path').attr('class',f=>'reference-area'+(f.properties.id===currentArea?' reference-selected':''))
   .attr('d',cachedPath).attr('data-regional-area',f=>f.properties.id).attr('data-reference-release','5.1.1').attr('role','button').attr('tabindex',0).attr('aria-label',f=>`${name(f)} · ${text('modern regional reference','现代行政区参照')}`)
   .on('click',(event,f)=>{event.stopPropagation();yearOnly=false;showArea(f.properties.id);}).on('keydown',(event,f)=>{if(['Enter',' '].includes(event.key)){event.preventDefault();yearOnly=false;showArea(f.properties.id);}})
   .on('mouseenter',(event,f)=>showTooltip(event,`${name(f)} · ${text('2022 modern reference','2022年现代参照')}`)).on('mouseleave',hideTooltip);
  const boxes=[],labelRows=transform.k>=2.8?visible.filter(f=>{const [x,y]=transform.apply(projection(f.properties.labelPoint));const label=name(f),width=Math.min(130,Math.max(22,(zh()?label.length*9:label.length*5.5)));if(x<12||x>viewport.width-12||y<12||y>viewport.height-12||boxes.some(b=>Math.abs(x-b.x)<(width+b.width)/2+5&&Math.abs(y-b.y)<18))return false;boxes.push({x,y,width});return true;}):[];
  labels.selectAll('text').data(labelRows,f=>f.properties.id).join('text').attr('class','reference-area-label').attr('transform',f=>{const p=projection(f.properties.labelPoint);return `translate(${p[0]},${p[1]}) scale(${1/transform.k})`;}).text(f=>name(f));
 }
 function handle(action,id){
  if(!action.startsWith('regions-')&&!action.startsWith('reference-'))return false;
  const attempt=p=>p.catch(error=>openDialog(`<h2>${text('Regional data unavailable','地区资料暂不可用')}</h2><p>${esc(error.message)}</p><button data-action="regions-browse">${text('Retry','重试')}</button>`));
  if(action==='regions-browse'||action==='reference-browse')attempt(showBrowser());
  else if(action==='regions-country')attempt(showCountry(id));
  else if(action==='regions-area'){yearOnly=false;attempt(showArea(id));}
  else if(action==='regions-time'){yearOnly=!yearOnly;attempt(showArea(id));}
  else if(action==='regions-map')attempt(showMap(id));
  else if(action==='regions-country-map')attempt(showMap(id,true));
  return true;
 }
 function restoreFromURL(hash=location.hash){const requested=new URLSearchParams(hash.slice(1)).get('regions')||'';selectedCountry=requested;loadMetadata().then(()=>{const code=regionalCountryFromHash(hash,metadata.countries);if(code)return showMap(code,true);selectedCountry='';onNavigate();}).catch(()=>{});}
 if(selectedCountry)Promise.resolve().then(restoreFromURL);
 return {render:renderMap,handle,showBrowser,restoreFromURL,selection:()=>selectedCountry,clearMapSelection:()=>{selectedCountry='';onNavigate();}};
}
