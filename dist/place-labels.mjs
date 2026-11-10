// Display translations preserve the source label and every coordinate/date.
// The frozen Jiangshan importer records aliases as [site.zh, site.en]. Only an
// exact surviving English match may reuse that pair; amended labels fail closed.
const amendedSourceLabels=[
  {recordId:'china-landmark-089',en:'Dujiangyan waterworks, Sichuan · 都江堰水利工程',zh:'四川都江堰水利工程'},
  {recordId:'china-landmark-228',en:'Luoyang; representative Eastern Han court location, not Cai Lun’s birthplace',zh:'洛阳；东汉宫廷的代表性地点，并非蔡伦出生地'},
  {recordId:'china-event-sanguo-008',en:'Yizhou — disputed identification; source point is one interpretation',zh:'夷洲——地望有争议；来源点位仅代表一种解释'},
  {recordId:'china-landmark-497',en:'Northern Song context near Kaifeng; workshop location unverified · 北宋区域参照，作坊地点未核实',zh:'开封附近的北宋背景代表点；作坊地点未经核实'},
  {recordId:'china-landmark-414',en:'Kozhikode/Calicut; representative final-voyage port, not a verified death or burial site',zh:'科泽科德（卡利卡特）；最后一次航行的代表性港口，并非经核实的去世或埋葬地点'}
];
export function auditPlaceLabelTranslations(catalog,records) {
  const errors=[],byId=new Map(records.map(record=>[record.id,record])),seen=new Set();
  if(catalog?.schemaVersion!==1||!Array.isArray(catalog?.items))return ['Invalid place-label catalogue'];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(catalog.checkedAt||''))errors.push('Place labels need a review date');
  if(!catalog.method?.en?.trim()||!catalog.method?.zh?.trim())errors.push('Place labels need a bilingual method');
  for(const item of catalog.items){
    const record=byId.get(item.recordId);
    if(seen.has(item.recordId))errors.push(item.recordId+': duplicate place translation');
    seen.add(item.recordId);
    if(!record)errors.push(item.recordId+': unknown place-translation record');
    if(typeof item.en!=='string'||!item.en.trim()||typeof item.zh!=='string'||!/[\u3400-\u9fff]/u.test(item.zh))errors.push(item.recordId+': incomplete place translation');
    if(record&&item.en!==record.location?.label)errors.push(item.recordId+': place translation does not match the current English label');
    if(record?.location?.labelI18n?.zh&&record.location.labelI18n.zh!==item.zh)errors.push(item.recordId+': place translation would replace an authored label');
  }
  return errors;
}

export function applyPlaceLabelTranslations(records,catalog={items:[]}) {
  const reviewed=new Map((catalog.items||[]).map(item=>[item.recordId,item]));
  const amended=new Map(amendedSourceLabels.map(item=>[item.recordId,item]));
  return records.map(record=>{
    const location=record.location;
    if(!location?.label||location.labelI18n?.zh)return record;
    const item=reviewed.get(record.id);
    let zh,method;
    if(item?.en===location.label&&typeof item.zh==='string'&&item.zh.trim()){
      zh=item.zh;method='reviewed-display-translation';
    }else if(record.provenance?.dataset==='jiangshan'&&amended.get(record.id)?.en===location.label){
      zh=amended.get(record.id).zh;method='reviewed-amended-source-label';
    }else if(record.provenance?.dataset==='jiangshan'&&record.aliases?.[1]===location.label&&typeof record.aliases?.[0]==='string'&&/[\u3400-\u9fff]/u.test(record.aliases[0])){
      zh=record.aliases[0];method='inherited-source-place-pair';
    }
    return zh?{...record,location:{...location,labelI18n:{en:location.label,zh},labelProvenance:method}}:record;
  });
}
