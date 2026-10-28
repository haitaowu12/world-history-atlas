// One map purpose, independent optional detail. Source dates are never changed.
export const DEFAULT_LAYERS=Object.freeze({view:'history',territories:true,modern:false,
  rivers:true,labels:true,markers:true,ghost:false,administrative:true,waterways:true,corridors:false,regions:true,occupations:true});

export function selectMapView(layers,view){
  if(!['history','reference'].includes(view))return {...layers};
  return {...layers,view,territories:view==='history',modern:view==='reference'};
}

export function restoreMapLayers(saved={}){
  const result={...DEFAULT_LAYERS};
  for(const key of Object.keys(result))if(typeof result[key]==='boolean'&&typeof saved[key]==='boolean')result[key]=saved[key];
  return selectMapView(result,saved.view==='reference'||(!saved.view&&saved.modern===true&&saved.territories===false)?'reference':'history');
}
