// Short, cancellable cues. Content is always visible without animation support.
export function createAtlasMotion(preference){
 const keys=new WeakMap(),active=new Set();
 const reduced=()=>preference.matches;
 function reveal(element,kind='detail'){
  if(!element||element.hidden||reduced()||typeof element.animate!=='function')return;
  for(const item of active)if(item.element===element)item.animation.cancel();
  const from=kind==='year'?{opacity:.45,transform:'translateY(4px)'}:kind==='detail'?{opacity:.65,transform:'translateX(10px)'}:{opacity:.65,transform:'translateY(8px)'};
  const animation=element.animate([from,{opacity:1,transform:'none'}],{duration:kind==='year'?180:220,easing:'cubic-bezier(.2,.7,.2,1)'});
  const item={element,animation};active.add(item);
  animation.finished.catch(()=>{}).finally(()=>active.delete(item));
 }
 preference.addEventListener('change',()=>{if(reduced())for(const item of active)item.animation.cancel();});
 return {reveal,forget:element=>keys.delete(element),update(element,key,kind,options={}){
  const had=keys.has(element),previous=keys.get(element);keys.set(element,key);
  if((had&&previous!==key)||(!had&&options.first))reveal(element,kind);
 }};
}
