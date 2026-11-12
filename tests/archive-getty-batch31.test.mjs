import test from 'node:test';
import assert from 'node:assert/strict';
import {readAtlasData} from '../scripts/lib/atlas-records.mjs';
const nara=readAtlasData('visual-assets-us-archives-02-v18.json'),getty=readAtlasData('visual-assets-getty-images-03-v18.json'),china=readAtlasData('visual-assets-china-batch-14-v18.json');
test('nine newly admitted images match specific subjects with source-specific reuse and translations',()=>{
 const items=[...nara.items,...getty.items,...china.items];assert.equal(items.length,9);
 assert.equal(new Set(items.flatMap(a=>a.recordIds)).size,9);
 for(const a of items){assert.ok(a.bytes<=750000);assert.ok(a.metadataI18n.creator.zh);assert.ok(a.metadataI18n.date.zh);assert.ok(a.metadataI18n.institution.zh);assert.ok(a.rightsSourceUrl);}
 assert.equal(nara.items.length,4);assert.ok(nara.items.every(a=>a.rights.label==='Public domain'&&a.sourceUrl.startsWith('https://www.archives.gov/milestone-documents/')));
 assert.ok(getty.items.every(a=>a.rights.label==='CC0'));assert.equal(china.items[0].rights.label,'CC BY 4.0');
});
test('official documents distinguish signing, exclusion and the still-pending peaceful settlement',()=>{
 const [treaty,order,armistice,cuba]=nara.items;
 assert.match(treaty.date,/exchange copy/);assert.match(treaty.interpretation.en,/2 February.*30 May 1848/);assert.match(treaty.interpretation.zh,/5月30日/);
 assert.match(order.interpretation.en,/did not name Japanese Americans.*forced removal and incarceration/);
 assert.match(armistice.interpretation.en,/not a peace treaty/);assert.match(cuba.interpretation.en,/identifications of U.S. intelligence analysts/);
 assert.equal(new Set(nara.items.map(a=>a.rights.note.zh)).size,4);
});
test('European art preserves manuscript origin and later commemoration instead of implying eyewitness scenes',()=>{
 const [florence,paul,law,isabella]=getty.items;
 assert.match(florence.interpretation.en,/probably.*Medici/);assert.match(florence.interpretation.en,/cut out and replaced/);
 assert.match(paul.interpretation.en,/Philippians, rather than Corinthians/);assert.match(paul.interpretation.en,/twelve centuries later/);assert.equal(paul.representation,'manuscript-detail');
 assert.equal(law.representation,'manuscript-detail');assert.match(law.interpretation.en,/French copy/);assert.match(law.interpretation.en,/marginal annotations/);
 assert.match(isabella.interpretation.en,/two centuries after/);assert.match(isabella.interpretation.en,/scale and shaded bracket/);
});
test('Shi Kefa portrait remains an undated Qing copy rather than a 1645 likeness',()=>{
 const a=china.items[0];assert.deepEqual(a.recordIds,['china-landmark-111']);assert.equal(a.representation,'later-depiction');
 assert.match(a.date,/Qing dynasty; portrait undated/);assert.match(a.interpretation.en,/respectful copy/);assert.match(a.caption.en,/1645 dates.*not this painting/);
});
