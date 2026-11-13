import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r])),get=id=>records.get(id),s=readAtlasData('visual-assets-exact-12-v18.json'),links=readAtlasData('visual-assets-exact-links-11-v18.json');
test('Wellcome textual witnesses preserve distinct item-specific licences and later dates',()=>{
 assert.equal(s.items.length,2);assert.deepEqual(s.items.map(a=>a.rights.label),['Public Domain Mark','CC BY 4.0']);
 assert.ok(s.items.every(a=>a.credit==='Wellcome Collection'&&a.sourceUrl.startsWith('https://wellcomecollection.org/works/')));
 const h=s.items[0],l=s.items[1];assert.match(h.date,/14th century/);assert.match(h.interpretation.en,/not his handwriting/);assert.match(l.caption.en,/1883/);assert.match(l.interpretation.en,/1596/);assert.match(l.rights.note.en,/CC BY 4.0/);
});
test('Hunayn reader replaces generic caveats with an attributed manuscript and keeps the translation network',()=>{
 const h=get('person-hunayn-ibn-ishaq');assert.match(h.summary.en,/pupils and associates/);assert.match(h.summary.en,/Wellcome MS.390/);assert.doesNotMatch(h.summary.en,/without implying that social relations|Linking this biography/);assert.ok(h.sources.some(x=>x.url===s.items[0].sourceUrl));
 assert.match(get('china-landmark-504').summary.en,/1883 edition/);
});
test('paired portraits, era coin and funerary memorial add only three direct associations',()=>{
 assert.equal(links.items.length,0);assert.equal(links.associations.length,3);assert.equal(new Set(links.associations.map(a=>a.recordId)).size,3);
 assert.match(links.associations[0].context.en,/Han Xin with Xiao He/);assert.match(links.associations[1].context.en,/not an image of the 1643 conquest/);assert.match(links.associations[2].context.en,/1914/);
});
test('Han Xin and Shun narratives are repaired while the earlier reviewed Huo account stays intact',()=>{
 const h=get('china-landmark-292'),l=get('china-landmark-025'),q=get('china-event-xihan-010');
 assert.match(h.summary.en,/The Shiji recounts/);assert.doesNotMatch(h.title.en,/moonlit/i);assert.match(h.provenance.originalText.title.en,/moonlight/i);assert.equal(h.start,-206);
 assert.match(l.summary.en,/1643.*following year/s);assert.match(l.dateNote.en,/1644/);assert.equal(l.start,1643);assert.ok(l.sources.some(x=>x.url.includes('卷309')));
 assert.match(q.summary.en,/121 BCE/);assert.equal(q.provenance.status,'reviewed');
});
