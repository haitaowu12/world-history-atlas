// Source administrative units are modern orientation, independent of historical years.
export const REGIONAL_ZOOM=1.8;
export function boundsContain(bounds,[lon,lat]){const [[w,s],[e,n]]=bounds;return lat>=s&&lat<=n&&(w<=e?lon>=w&&lon<=e:lon>=w||lon<=e);}
export function referenceAreaName(feature,lang='en'){const p=feature.properties;return p.id==='US-DC'?(lang==='zh'?'哥伦比亚特区':'District of Columbia'):(p.name[lang]||p.name.en);}
export function searchRegionalUnits(features,query='',lang='en'){
 const q=query.trim().normalize('NFKC').toLocaleLowerCase();
 return features.filter(f=>!q||[f.properties.id,f.properties.sourceId,f.properties.isoCode,referenceAreaName(f,lang),f.properties.name.en,f.properties.name.zh,...(f.properties.id==='US-DC'?['Washington DC','华盛顿哥伦比亚特区']:[])].some(s=>s?.normalize('NFKC').toLocaleLowerCase().includes(q)));
}
export function referenceHistory(feature,records,year=null){const links=new Map(feature.properties.historyLinks.map(link=>[link.recordId,link]));return records.filter(row=>{
 const link=links.get(row.id);return link&&(year===null||((link.roles.includes('representative')||link.roles.includes('editorial'))&&row.start<=year&&row.end>=year)||link.milestoneYears.includes(year));
}).sort((a,b)=>a.start-b.start||a.id.localeCompare(b.id));}
export function projectedReferenceBounds(bounds,projection,transform){
 const [[w,s],[e,n]]=bounds,spans=w<=e?[[w,e]]:[[-180,e],[w,180]];
 return spans.map(([a,b])=>{const points=[[a,s],[a,n],[b,s],[b,n],[(a+b)/2,s],[(a+b)/2,n]].map(p=>transform.apply(projection(p)));return [[Math.min(...points.map(p=>p[0])),Math.min(...points.map(p=>p[1]))],[Math.max(...points.map(p=>p[0])),Math.max(...points.map(p=>p[1]))]];});
}
export function visibleReferenceCountries(countries,projection,transform,viewport){
 if(transform.k<REGIONAL_ZOOM)return [];
 return countries.filter(country=>projectedReferenceBounds(country.bounds,projection,transform).some(([[x0,y0],[x1,y1]])=>x1>=-20&&y1>=-20&&x0<=viewport.width+20&&y0<=viewport.height+20&&(x1-x0>=24||y1-y0>=24)));
}

export function regionalCountryFromHash(hash,countries){const code=new URLSearchParams(hash.replace(/^#/,'' )).get('regions');return countries.some(country=>country.code===code)?code:'';}
export function regionalLabelCandidates(features,selectedCountry=''){
 if(!selectedCountry)return features;
 const codes=new Set(['USA','CAN'].includes(selectedCountry)?['USA','CAN']:[selectedCountry]);
 return features.filter(f=>codes.has(f.properties.country)).sort((a,b)=>Number(b.properties.country===selectedCountry)-Number(a.properties.country===selectedCountry));
}
