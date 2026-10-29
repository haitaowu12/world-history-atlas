// Bounded editorial corrections applied to copies, preserving frozen source files.
const CHOLA_IDS=new Set(['1000-chola','early-1100-chola','early-1200-chola']);
const southSource={title:'South Asia, South, 1000–1400',url:'https://www.metmuseum.org/toah/ht/07/sss.html',publisher:'The Metropolitan Museum of Art',checkedAt:'2026-10-26',evidenceNote:'Key Events: complete Chola conquest circa1017; Vijayabahu expels Cholas circa1070; independent Polonnaruwa phase1070–1200. Dates are approximate; no northern frontier for993–1016 is inferred.'};
const sudanSource={title:'West and Central Sudan, 1000–1400',url:'https://www.metmuseum.org/toah/ht/07/afu',publisher:'The Metropolitan Museum of Art',checkedAt:'2026-10-26',evidenceNote:'Key Events: Soso absorbs much of Ghana circa1180–1230, followed by Mali emergence circa1230–1235. A regional transition, not a proven single conquest or total disappearance.'};
const cholaCache=new WeakMap(),ghanaCache=new WeakMap(),zhouCache=new WeakMap();
const append=(note,extra)=>({en:(note?.en||'')+' '+extra.en,zh:(note?.zh||'')+extra.zh});
export function reviewedRegionalFeature(feature){
 if(feature?.properties?.polityId==='zhou-regional'){
  if(zhouCache.has(feature))return zhouCache.get(feature);
  const p=feature.properties,revise=n=>n?{en:n.en.replace('At403 BCE the existing detailed source stages replace this aggregate.','At 403 BCE a separately sourced collective Warring States reference replaces this aggregate.'),zh:n.zh.replace('公元前403年起改用已有的详细分期','公元前403年起改用另有来源的列国区域参照')}:n;
  const copy={...feature,properties:{...p,note:revise(p.note),contextValidity:{...p.contextValidity,note:revise(p.contextValidity?.note)}}};zhouCache.set(feature,copy);return copy;
 }
 if(feature?.properties?.id!=='1100-ghana')return feature;
 if(ghanaCache.has(feature))return ghanaCache.get(feature);
 const p=feature.properties,note=append(p.note,{en:'Reviewed correction: this Ghana reference stops at1179. From1180 the map uses a separately labeled Wagadu/Soso regional transition rather than carrying an independent Ghana empire into Mali’s emergence. The cutoff is approximate editorial eligibility.',zh:'复核修订：此加纳参照在1179年截止。1180年起改用另标的瓦加杜／索索区域转变，不把独立加纳帝国延续至马里兴起。此截止为近似的编辑适用界限。'});
 const amended={...feature,properties:{...p,note,sources:[...(p.sources||[]),sudanSource],contextValidity:{...p.contextValidity,end:1179,reviewedAt:'2026-10-26',evidence:[...(p.contextValidity?.evidence||[]),sudanSource.url],note},chronologyAmendment:{reviewedAt:'2026-10-26',originalEnd:p.contextValidity.end,reviewedEnd:1179}}};
 ghanaCache.set(feature,amended);return amended;
}
function withoutSriLanka(feature){
 if(cholaCache.has(feature))return cholaCache.get(feature);
 const g=feature.geometry,p=feature.properties;
 if(g?.type!=='MultiPolygon'||g.coordinates.length!==2)throw Error('Reviewed Chola component layout changed: '+p.id);
 const island=g.coordinates[0],points=island.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 if(Math.min(...xs)<79.6||Math.max(...xs)>82||Math.min(...ys)<5.8||Math.max(...ys)>9.8)throw Error('Reviewed Sri Lanka component bounds changed: '+p.id);
 const note=append(p.note,{en:'Chronology correction: the source’s whole Sri Lanka island component is withheld before circa1017 and from circa1070, when the Cholas were expelled. The mainland component is retained unchanged. The partial northern conquest beginning993 is not reconstructed; from1070–1199 an independent Polonnaruwa island reference is shown separately.',zh:'时序修订：在约1017年前及约1070年朱罗被逐出后，隐藏来源中整座斯里兰卡岛的组件，原样保留大陆组件。不重建始于993年的北部局部征服；1070—1199年另显示独立波隆纳鲁沃的岛屿参照。'});
 const amended={...feature,geometry:{...g,coordinates:g.coordinates.slice(1)},properties:{...p,note,sources:[...(p.sources||[]),southSource],geometryAmendment:{reviewedAt:'2026-10-26',type:'dated-component-removal',removedComponents:[0],fullIslandEligible:{start:1017,end:1069},evidence:[southSource.url],reason:'Whole-island Chola fill withheld before complete conquest and after independent Polonnaruwa recovery; mainland source vertices retained.'}}};
 cholaCache.set(feature,amended);return amended;
}
export function amendRegionalChronology(features,year){
 return features.map(f=>CHOLA_IDS.has(f.properties?.id)&&(year<1017||year>=1070)?withoutSriLanka(f):f);
}
