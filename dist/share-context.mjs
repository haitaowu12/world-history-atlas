// Share only bounded, coarse map coordinates and validated biography indices.
export function traceForHash(place) {
  if(!place || place.inheritedPlace || !Number.isFinite(place.lon) || !Number.isFinite(place.lat) || Math.abs(place.lon)>180 || Math.abs(place.lat)>90)return '';
  return `${place.lon.toFixed(3)},${place.lat.toFixed(3)}`;
}
export function traceFromHash(value) {
  if(typeof value!=='string'||!/^[-]?\d{1,3}(?:\.\d{1,3})?,[-]?\d{1,2}(?:\.\d{1,3})?$/.test(value))return null;
  const [lon,lat]=value.split(',').map(Number);
  return Math.abs(lon)<=180&&Math.abs(lat)<=90?{lon,lat}:null;
}
export function sharedMilestone(record,index,year) {
  const milestones=record?.milestones;
  return Number.isSafeInteger(index)&&index>=0&&index<milestones?.length&&milestones[index].year===year?String(index):'';
}
export function milestoneFromHash(value,record,year,fallback=0) {
  if(typeof value!=='string'||!/^(?:0|[1-9]\d*)$/.test(value))return fallback;
  const index=Number(value);
  return sharedMilestone(record,index,year)===value?index:fallback;
}
