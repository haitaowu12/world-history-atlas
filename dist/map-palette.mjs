// Display palette only. Source identities, geometry, dates and evidence remain
// attached to their original units; shared colour does not merge records.
const isTaiwan=p=>p.code==='TWN'||p.isoCode==='TWN'||p.gwcode===713||
  p.polityId==='taiwan'||p.name?.en==='Taiwan';
const isMainland=p=>p.code==='CHN'||p.isoCode==='CHN'||p.gwcode===710||
  ['china-modern','china-prc','china-republic','china-roc','qing','ming'].includes(p.polityId);

const mineral=['#89b4d8','#ceab79','#91b9a9','#b09bc7','#d69b95','#8abdc5','#b5bd87','#b9a6a2'];
const identities={usa:0,canada:1,mexico:2,russian:3,uk:4,spain:1,france:0,newspain:1,
  'cshapes-2':0,'cshapes-3':0,'cshapes-4':0,'cshapes-20':1,'cshapes-70':2,'cshapes-365':3,'cshapes-200':4,
  USA:0,CAN:1,MEX:2,RUS:3,GBR:4,CHN:6,TWN:6,
  'british-north-america':4,newfoundland:5,'oregon-joint':6,'texas-republic':2,'vermont-republic':7,'usa-claim':7,'canada-claim':7};
export function displayColor(properties){
  const key=properties.code in identities?properties.code:properties.polityId;
  const index=identities[key]??[...(properties.color||key||properties.id||'')].reduce((n,c)=>n+c.charCodeAt(0),0)%mineral.length;
  return mineral[index];
}

export function mapDisplayPalette(features,{scheme='source'}={}){
  const palette=new Map(features.map(f=>[f.properties.id,scheme==='mineral'?displayColor(f.properties):f.properties.color||'#a5bba5']));
  const mainland=features.find(f=>isMainland(f.properties));
  if(mainland)for(const feature of features)if(isTaiwan(feature.properties))
    palette.set(feature.properties.id,palette.get(mainland.properties.id));
  return palette;
}
