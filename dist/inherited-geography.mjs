import {validYear} from './core.mjs';

// The pinned source uses [appear, vanish) for water and inclusive corridor spans.
// These are inherited display windows, not independently verified formation dates.
export function hydroVisible(item,year) {
  return validYear(year)&&(item.appear===undefined||year>=item.appear)&&(item.vanish===undefined||year<item.vanish);
}

export function waterFeatures(data,year) {
  return [
    ...(data.rivers||[]).filter(item=>hydroVisible(item,year)).map(item=>({type:'Feature',properties:{...item,waterKind:'river'},geometry:{type:'MultiLineString',coordinates:item.lines}})),
    ...(data.lakes||[]).filter(item=>hydroVisible(item,year)).map(item=>({type:'Feature',properties:{...item,waterKind:'lake'},geometry:{type:'MultiLineString',coordinates:item.rings.map(r=>r.length&&JSON.stringify(r[0])!==JSON.stringify(r.at(-1))?[...r,r[0]]:r)}}))
  ];
}

export function corridorFeatures(corridors,year) {
  if(!validYear(year))return [];
  return (corridors||[]).filter(c=>year>=c.start&&year<=c.end).map(c=>({type:'Feature',properties:c,geometry:{type:'MultiLineString',coordinates:c.segments}}));
}
