import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
import {matchingVisualStudy} from '../dist/visual-studies.mjs';
const s=readAtlasData('visual-assets-china-batch-12-v18.json');
test('four regime coins retain item-level photograph rights and exact focal links',()=>{
 assert.equal(s.items.length,4);assert.deepEqual(s.associations,[]);
 assert.deepEqual(s.items.flatMap(a=>a.recordIds),['china-person-hongxiuquan','china-person-lizicheng','china-landmark-194','china-landmark-235']);
 for(const a of s.items){assert.equal(a.kind,'object');assert.equal(a.representation,'object-photograph');assert.equal(a.rights.label,'CC BY 3.0 TW');assert.match(a.rightsSourceUrl,/tcmb.culture.tw/);assert.match(a.transformation.en,/watermark/);assert.equal(a.width,426);assert.equal(a.height,640);}
 assert.match(s.items[0].alt.en,/reverse/);assert.match(s.items[1].caption.en,/five-cash/);
 assert.match(s.items[2].caption.en,/1355/);assert.match(s.items[3].caption.en,/1647/);
 assert.ok(matchingVisualStudy([s.items[2].id,s.items[3].id]));
});
