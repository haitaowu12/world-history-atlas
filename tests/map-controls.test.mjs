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

test('expanded occupation legend reserves zoom and bottom-action space in every map mode',()=>{
 const css=readFileSync(new URL('../dist/period-tracks.css',import.meta.url),'utf8');
 assert.match(css,/\.map-stage:has\(\.occupation-key\[open\]\) \.map-controls\{inset:74px 14px auto auto\}/);
 assert.match(css,/\.map-stage:has\(\.occupation-key\[open\]\) \.map-snapshot\{bottom:64px;max-height:calc\(100% - 150px\);overflow:auto;overscroll-behavior:contain\}/);
});
