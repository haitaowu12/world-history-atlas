// Normalize editorial English only. Never run this on IDs, paths or URLs.
const english=value=>typeof value==='string'?value.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/([A-Za-z])(\d)/g,'$1 $2').replace(/(\d)([A-Za-z])/g,'$1 $2'):value;
const localized=value=>{if(value?.en)value.en=english(value.en);};
function sourceText(s){s.title=english(s.title);if(s.evidenceNote)s.evidenceNote=english(s.evidenceNote);}
function featureText(f){const p=f.properties;for(const field of ['note','scopeNote'])localized(p[field]);localized(p.contextValidity?.note);for(const period of [...(p.namePeriods||[]),...(p.categoryPeriods||[])])localized(period.note);for(const s of p.sources||[])sourceText(s);}
module.exports={english,localized,sourceText,featureText};
