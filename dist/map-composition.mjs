// Combine independently dated sources without letting a sparse global snapshot
// erase the richer China phase map, or treating phases as annual border surveys.
const CHINA_GLOBAL_IDS=new Set(['liao','western-xia','xia','nanzhao','dali','qin','han','xin','sui','tang','song','southern-song','jin-jurchen','yuan','ming','qing','china-republic','china-roc','china-modern','china-prc']);
export function reviewSchematicName(feature,year){
 const p=feature.properties;
 if(p.periodId!=='tang'||p.role!=='main'||year<690||year>705)return feature;
 const name=year===705?{en:'Wu Zhou / Tang restoration',zh:'武周／唐复辟'}:{en:'Wu Zhou',zh:'武周'};
 return {...feature,properties:{...p,sourceName:p.name,name,reviewNote:{en:'The inherited source labels this shape Tang. The atlas labels the 690–705 Wu Zhou interregnum separately; 705 is a transition year. This name correction does not independently verify the source geometry.',zh:'原资料把此轮廓标为唐。本图另标690—705年的武周时期；705年为复辟转折年。名称修订不表示已独立核实来源轮廓。'},sources:[...p.sources,{title:'Wu Zetian',url:'https://www.cuhk.edu.hk/rct/renditions/authors/wuzt.html',publisher:'Chinese University of Hong Kong, Research Centre for Translation',evidenceNote:'Zhou690–705 and restoration of Tang; name correction only.'}]}};
}
export function composeHistoricalFeatures(globalFeatures,chinaFeatures=[]){
  if(!chinaFeatures.length)return globalFeatures;
  const sourceNames=new Set(chinaFeatures.flatMap(f=>[f.properties.name?.en,f.properties.name?.zh]).filter(Boolean));
  return [...globalFeatures.filter(f=>!CHINA_GLOBAL_IDS.has(f.properties.polityId)&&
    !sourceNames.has(f.properties.name?.en)&&!sourceNames.has(f.properties.name?.zh)),...chinaFeatures];
}

export function outlineCaption(feature,lang='en',formatYear){
  const p=feature.properties;
  if(p.role==='division')return `${lang==='zh'?'行政来源阶段':'Administrative source stage'}: ${formatYear(p.start,lang)} – ${formatYear(p.end,lang)}`;
  if(p.schematic&&p.sourcePhase){
    const start=formatYear(p.sourcePhase.start,lang),end=formatYear(p.sourcePhase.end,lang);
    return `${lang==='zh'?'参考示意阶段':'Reference schematic stage'}: ${start} – ${end}`;
  }
  if(p.sourceDataset==='cshapes-2.0')return `${lang==='zh'?'年末边界参考':'Year-end boundary reference'}: ${p.selectedDate}`;
  return `${lang==='zh'?'轮廓来源':'Outline source'}: ${p.sourceYearApproximate?(lang==='zh'?'约':'c. '):''}${formatYear(p.sourceYear??p.year,lang)}`;
}
