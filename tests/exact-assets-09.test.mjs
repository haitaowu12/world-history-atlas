import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const items=readAtlasData('visual-assets-exact-09-v18.json').items,records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));const asset=n=>items.find(a=>a.id.endsWith('-'+n));
test('four exact witnesses retain item-specific reuse permissions and visible sources',()=>{
 assert.equal(items.length,4);assert.equal(new Set(items.flatMap(a=>a.recordIds)).size,4);
 for(const a of items){assert.ok(records.get(a.recordIds[0]).sources.some(s=>s.url===a.sourceUrl));assert.equal(a.rightsSourceUrl,a.sourceUrl);assert.match(a.transformation.en,/saved unchanged/);}
 for(const id of ['157367','12679']){assert.equal(asset(id).rights.label,'CC0');assert.match(asset(id).rights.note.en,/Wien Museum/);assert.doesNotMatch(asset(id).rights.note.en,/Met API/);assert.match(asset(id).file,/\.webp$/);assert.equal(asset(id).width,992);}
});
test('later image dates remain distinct from Vienna diplomacy, Safavid building and early translation',()=>{
 assert.equal(asset('157367').date,'1819');assert.match(asset('157367').interpretation.en,/after the 1814–1815 negotiations/);
 assert.equal(asset('271267').date,'1858');assert.match(asset('271267').interpretation.en,/more than two centuries after/);
 assert.match(asset('451400').caption.en,/621 AH\/1224 CE, attributed to Baghdad/);assert.match(records.get('arabic-translation-collaboration').summary.en,/not an original translator’s manuscript/);
 assert.match(asset('12679').caption.en,/1848; coloured lithograph/);
});
