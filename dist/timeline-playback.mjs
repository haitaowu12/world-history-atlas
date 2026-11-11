import {validYear,formatYear,toOrdinal} from './core.mjs';

// Playback visits discrete source dates. It does not interpolate years or borders.
export function timelineStep(year, moments, language='en') {
 const ordered=[...new Set(moments.filter(validYear))].sort((a,b)=>a-b);
 const previous=ordered.findLast(moment=>moment<year);
 const next=ordered.find(moment=>moment>year);
 const zh=language==='zh';
 const gap=next===undefined?null:toOrdinal(next)-toOrdinal(year);
 return {
  previous,next,gap,
  previousLabel:previous===undefined?(zh?'已到最早时点':'At the first moment'):(zh?'上一时点：':'Previous moment: ')+formatYear(previous,language),
  nextLabel:next===undefined?(zh?'已到最后时点':'At the last moment'):(zh?'下一时点：':'Next moment: ')+formatYear(next,language),
  hint:next===undefined?(zh?'已到最后时点':'Last moment'):(zh?'下一时点 · ':'Next · ')+formatYear(next,language)+(zh?` · +${gap}年`:` · +${gap} yr`),
  detail:next===undefined?(zh?'选择较早年份以继续探索。':'Choose an earlier year to explore again.'):(zh?`前进${gap}年。播放依次访问精选地图日期与重要事件。`:`${gap} year${gap===1?'':'s'} forward. Playback visits selected map dates and major events.`)
 };
}

export function playbackDelay(value) {
 const seconds=Number(value);
 return [3,6,10].includes(seconds)?seconds*1000:6000;
}
