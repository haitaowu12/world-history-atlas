import {toOrdinal,recordSearchText} from './core.mjs';
export function nearbyTurningPoints(records,year,{region='all',query='',limit=6,maxDistance=100}={}){
  const q=query.trim().normalize('NFKC').toLocaleLowerCase();
  const candidates=records.filter(r=>r.kind==='event'&&(region==='all'||r.region===region)&&
    (!q||recordSearchText(r).includes(q))&&Math.abs(toOrdinal(r.start)-toOrdinal(year))<=maxDistance)
    .sort((a,b)=>Math.abs(toOrdinal(a.start)-toOrdinal(year))-Math.abs(toOrdinal(b.start)-toOrdinal(year))||
      (b.importance??3)-(a.importance??3)||a.start-b.start||a.id.localeCompare(b.id));
  const picked=[],usedRegions=new Set(),usedMoments=new Set();
  const add=r=>{const key=`${r.region}/${r.start}`;if(usedMoments.has(key))return false;usedMoments.add(key);picked.push(r);return true;};
  // A large imported collection must not drown out every other region.
  if(region==='all')for(const r of candidates){if(usedRegions.has(r.region))continue;if(add(r))usedRegions.add(r.region);if(picked.length>=limit)return picked;}
  for(const r of candidates){if(picked.includes(r))continue;add(r);if(picked.length>=limit)break;}
  return picked;
}
