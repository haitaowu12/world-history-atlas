import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {timelineStep,playbackDelay} from '../dist/timeline-playback.mjs';

test('next/previous controls expose the actual nonuniform historical jump',()=>{
 const moments=[1500,1200,1206,1258,1206];
 const result=timelineStep(1200,moments);
 assert.equal(result.previous,undefined);
 assert.equal(result.next,1206);
 assert.equal(result.gap,6);
 assert.match(result.nextLabel,/1206 CE/);
 assert.match(result.detail,/6 years forward/);
 assert.deepEqual(moments,[1500,1200,1206,1258,1206]);
 assert.equal(timelineStep(1230,moments).previous,1206);
 assert.equal(timelineStep(1230,moments).next,1258);
});
test('civil chronology crosses from 1 BCE to 1 CE with one elapsed year and never visits zero',()=>{
 const result=timelineStep(-1,[-1,0,1,NaN,2027]);
 assert.equal(result.next,1);
 assert.equal(result.gap,1);
 assert.match(result.detail,/1 year forward/);
});
test('Chinese context and endpoint recovery retain dates and a useful next action',()=>{
 assert.equal(timelineStep(-10,[-10,1,2026],'zh').hint,'下一时点 · 公元1年 · +10年');
 const end=timelineStep(2026,[1,2026],'zh');
 assert.equal(end.next,undefined);
 assert.equal(end.previous,1);
 assert.match(end.detail,/较早年份/);
});
test('production playback stops and reconciles the controls on arrival at the final moment',()=>{
 const source=readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');
 const controls=new Map();let callback,cleared=0;
 const $=selector=>{if(!controls.has(selector))controls.set(selector,{textContent:'',value:'10',attributes:{},setAttribute(key,value){this.attributes[key]=value;}});return controls.get(selector);};
 const context=vm.createContext({$,timelineStep,playbackDelay,state:{year:2025,lang:'en'},timer:null,challenge:null,MIN_YEAR:1,MAX_YEAR:2026,snapshotData:{snapshots:[{year:2025}]},records:[],inferKind:()=>'',t:key=>key,clearPaths:()=>{},clearSelection:()=>{},setInterval:fn=>{callback=fn;return 1;},clearInterval:()=>{cleared++;}});
 vm.runInContext(source.slice(source.indexOf('function refreshPlaybackControls()'),source.indexOf('function routeStops(')),context);
 vm.runInContext('function render(){refreshPlaybackControls();} function setYear(year){state.year=year;render();} playTimeline();',context);
 assert.equal($('#play').textContent,'Pause');
 callback();
 assert.equal(context.state.year,2026);
 assert.equal(context.timer,null);
 assert.equal(cleared,1);
 assert.equal($('#play').textContent,'Play');
 assert.equal($('#play').attributes['aria-pressed'],'false');
 assert.equal($('#next-time').disabled,true);
 assert.equal($('#timeline-label').textContent,'Last moment');
});
test('the elapsed-time cue is visible and described by the timeline controls in both languages',()=>{
 assert.match(timelineStep(1206,[1206,1258]).hint,/1258 CE · \+52 yr/);
 assert.match(timelineStep(1206,[1206,1258],'zh').hint,/公元1258年 · \+52年/);
 const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 for(const id of ['previous-time','next-time','timeline-slider'])assert.match(html,new RegExp(`id="${id}"[^>]*aria-describedby="timeline-label timeline-scale-note"`));
 assert.match(html,/<span id="timeline-scale-note">Uneven time steps<\/span>/);
});
test('reading pace accepts the offered durations and rejects invalid timer values',()=>{
 assert.equal(playbackDelay('3'),3000);
 assert.equal(playbackDelay('6'),6000);
 assert.equal(playbackDelay('10'),10000);
 for(const value of [0,-1,'',null,NaN,'fast',Infinity,100])assert.equal(playbackDelay(value),6000);
});
