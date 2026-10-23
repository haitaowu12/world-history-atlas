// Display palette only. Source identities, geometry, dates and evidence remain
// attached to their original units; shared colour does not merge records.
const isTaiwan=p=>p.code==='TWN'||p.isoCode==='TWN'||p.gwcode===713||
  p.polityId==='taiwan'||p.name?.en==='Taiwan';
const isMainland=p=>p.code==='CHN'||p.isoCode==='CHN'||p.gwcode===710||
  ['china-modern','china-prc','china-republic','china-roc','qing','ming'].includes(p.polityId);

export function mapDisplayPalette(features){
  const palette=new Map(features.map(f=>[f.properties.id,f.properties.color||'#a5bba5']));
  const mainland=features.find(f=>isMainland(f.properties));
  if(mainland)for(const feature of features)if(isTaiwan(feature.properties))
    palette.set(feature.properties.id,palette.get(mainland.properties.id));
  return palette;
}
