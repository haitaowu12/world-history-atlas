import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('war controls reset opposing edges above detail and responsive theme specificity',()=>{
 const period=readFileSync(new URL('../dist/period-tracks.css',import.meta.url),'utf8');
 const theme=readFileSync(new URL('../dist/theme.css',import.meta.url),'utf8');
 assert.match(period,/\.map-stage\.war-map-active \.map-controls\s*\{\s*inset:74px 14px auto auto\s*;?\s*\}/);
 assert.ok(theme.includes('.map-controls,.detail-open .map-controls'),'regression guards the later detail override');
 // Three class selectors outrank the two-class detail selector at every media breakpoint.
 assert.doesNotMatch(theme,/\.war-map-active[^{}]*\.map-controls\s*\{/);
});
