import test from 'node:test';
import assert from 'node:assert/strict';
import {createAtlasMotion} from '../dist/ui-motion.mjs';

function fixture(matches=false){
 let change;const preference={matches,addEventListener:(_,fn)=>change=fn},calls=[];
 const element={animate(frames,options){const animation={cancelled:false,cancel(){this.cancelled=true;},finished:new Promise(()=>{})};calls.push({frames,options,animation});return animation;}};
 return {preference,element,calls,change(value){preference.matches=value;change();}};
}
test('year cues run only for a changed year, without animating initial load or unrelated renders',()=>{
 const f=fixture(),motion=createAtlasMotion(f.preference);
 motion.update(f.element,1200,'year');motion.update(f.element,1200,'year');assert.equal(f.calls.length,0);
 motion.update(f.element,1415,'year');assert.equal(f.calls.length,1);assert.equal(f.calls[0].options.duration,180);
 motion.update(f.element,1415,'year');assert.equal(f.calls.length,1);
 motion.update(f.element,1500,'year');assert.equal(f.calls.length,2);assert.ok(f.calls[0].animation.cancelled);
});
test('reduced-motion preference prevents cues and cancels in-flight motion when changed',()=>{
 const f=fixture(true),motion=createAtlasMotion(f.preference);
 motion.reveal(f.element);assert.equal(f.calls.length,0);
 f.change(false);motion.reveal(f.element,'dialog');assert.equal(f.calls.length,1);
 f.change(true);assert.ok(f.calls[0].animation.cancelled);
 motion.reveal(f.element);assert.equal(f.calls.length,1);
});
test('reopened panels receive a fresh cue; browsers without animation keep usable static content',()=>{
 const f=fixture(),motion=createAtlasMotion(f.preference);
 motion.update(f.element,'entry-a','detail',{first:true});assert.equal(f.calls.length,1);
 motion.update(f.element,'entry-a','detail',{first:true});assert.equal(f.calls.length,1);
 motion.forget(f.element);motion.update(f.element,'entry-a','detail',{first:true});assert.equal(f.calls.length,2);
 assert.doesNotThrow(()=>motion.reveal({}));assert.doesNotThrow(()=>motion.reveal({hidden:true}));
});
