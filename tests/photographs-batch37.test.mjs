import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
const getty=readAtlasData('visual-assets-getty-images-06-v18.json'),awm=readAtlasData('visual-assets-awm-images-02-v18.json');
const by=new Map([...getty.items,...awm.items].map(a=>[a.id,a]));
const get=id=>by.get('getty-images-06-'+id),aw=id=>by.get('awm2-'+id);
test('sixteen authenticated photographs connect sixteen unique records without duplicate coverage',()=>{
 assert.equal(getty.items.length,8);assert.equal(awm.items.length,8);
 assert.equal(new Set(getty.items.flatMap(a=>a.recordIds)).size,9);assert.equal(new Set(awm.items.flatMap(a=>a.recordIds)).size,7);
 assert.equal(new Set([...by.values()].flatMap(a=>a.recordIds)).size,16);
 for(const a of by.values()){assert.equal(a.representation,'historical-photograph');assert.ok(a.bytes<=750000);for(const key of ['creator','date','institution']){assert.equal(a.metadataI18n[key].en,a[key]);assert.ok(a.metadataI18n[key].zh);}}
});
test('Getty items preserve CC0 identity, photographer roles and original album dates',()=>{
 for(const a of getty.items){assert.equal(a.rights.label,'CC0');assert.match(a.rightsSourceUrl,/getty.edu\/art\/collection\/object\//);}
 for(const id of ['garibaldi','alexander','franz','pedro']){assert.equal(get(id).date,'Album dated 1866');assert.match(get(id).creator,/Franck.*album text by Justin Lallier/);assert.match(get(id).caption.zh,/图册/);}
 assert.match(get('franz').interpretation.en,/album is dated 1866, before the 1867 Compromise/);assert.doesNotMatch(get('franz').interpretation.en,/by one year|later joint arms/);
});
test('surviving monuments retain later photograph dates and exact place relationships',()=>{
 assert.deepEqual(get('damascus').recordIds,['damascus-umayyad-mosque','umayyad-caliphate']);assert.match(get('cordoba').interpretation.en,/conversion to a cathedral/);
 assert.match(get('monreale').interpretation.en,/nineteenth-century photograph/);assert.doesNotMatch(get('monreale').interpretation.en,/individual stonecutters/);
 assert.match(get('dejima').caption.en,/1863–1868.*closure in 1859/);
 assert.deepEqual(aw('c340230').recordIds,['melaka']);assert.match(aw('c340230').caption.en,/later than/);
});
test('AWM public-domain evidence is item-specific and Banaba counts one entry for two views',()=>{
 for(const a of awm.items){assert.equal(a.rights.label,'Public domain');assert.match(a.rights.note.en,/Copyright expired - public domain/);assert.match(a.rightsSourceUrl,/awm.gov.au\/collection\//);}
 assert.deepEqual(aw('c75584').recordIds,aw('c256662').recordIds);assert.equal(awm.items.reduce((n,a)=>n+a.bytes,0),1700762);
 assert.match(aw('c75584').caption.en,/2 October 1945/);assert.match(aw('c256662').caption.en,/around 1940/);
});
test('war and demonstration scenes preserve exact dates and avoid invented identities',()=>{
 assert.deepEqual(aw('c1006113').recordIds,['egypt-women-nationalism-1919']);assert.match(aw('c1006113').caption.en,/not individually named/);assert.match(aw('c1006113').date,/March 1919/);
 assert.match(aw('c1214833').caption.en,/2 February 1953.*1948/);assert.match(aw('c1214833').interpretation.en,/not the military demarcation line.*July 1953/);
 assert.match(aw('c398839').caption.en,/around 1965.*Konfrontasi/);assert.match(aw('c1097575').interpretation.en,/not a forced relocation/);
});
test('the Malaysia word-space correction preserves all historical wording',()=>{
 const edit=readAtlasData('summary-edits-v18.json').items.find(e=>e.recordId==='malaysia-federation-1963');
 assert.equal(edit.after.en,edit.before.en.replace('Theformation','The formation'));assert.equal(edit.after.zh,edit.before.zh);
 assert.match(loadAtlasRecords().records.find(r=>r.id===edit.recordId).summary.en,/^The formation of Malaysia/);
});
