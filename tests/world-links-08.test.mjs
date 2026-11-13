import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const s=readAtlasData('visual-assets-existing-world-links-08-v18.json'),get=id=>s.associations.find(a=>a.recordId===id);
test('six world contexts use named subjects and explicit comparisons, not broad regional matches',()=>{
 assert.equal(s.items.length,0);assert.equal(s.associations.length,6);assert.equal(new Set(s.associations.map(a=>a.recordId)).size,6);
 assert.deepEqual(s.associations.map(a=>a.recordId),['south-africa-election','delano-grape-strike','canadian-national-policy-tariffs-land','mesopotamia-babylon-assur','early-christianity-jewish-context','baghdad-foundation']);
 for(const a of s.associations){assert.ok(a.context.en&&a.context.zh);assert.ok(readAtlasData('visual-coverage-v18.json').coveredIds.includes(a.recordId));}
});
test('world links preserve photographic dates, later reception and actual excavation places',()=>{
 assert.match(get('south-africa-election').context.en,/October 1994.*not an election-day/s);
 assert.match(get('delano-grape-strike').context.en,/2012.*multiethnic/s);
 assert.match(get('canadian-national-policy-tariffs-land').context.en,/1891.*sitting date is unknown/s);
 assert.match(get('mesopotamia-babylon-assur').context.en,/1904.*found at Susa/s);
 assert.match(get('early-christianity-jewish-context').context.en,/1280–1290.*not a first-century/s);
 assert.match(get('baghdad-foundation').context.en,/Samarra.*not pieces excavated from Baghdad/s);
});
