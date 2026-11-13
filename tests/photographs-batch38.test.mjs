import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {readAtlasData,loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
const getty=readAtlasData('visual-assets-getty-images-07-v18.json'),archive=readAtlasData('visual-assets-us-archives-05-v18.json');
const by=new Map([...getty.items,...archive.items].map(a=>[a.id,a]));
const get=id=>by.get('getty-images-07-'+id),ar=id=>by.get(id);
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r]));
test('fourteen source images connect seventeen exact records with fourteen first-image additions',()=>{
 assert.equal(getty.items.length,7);assert.equal(archive.items.length,7);
 assert.equal(new Set(getty.items.flatMap(a=>a.recordIds)).size,9);assert.equal(new Set(archive.items.flatMap(a=>a.recordIds)).size,8);
 const evidence=JSON.parse(fs.readFileSync(new URL('../docs/v18-us-archives-05-evidence.json',import.meta.url)));
 assert.equal(evidence.fullOriginalTargets.length,8);
 const coverage=readAtlasData('visual-coverage-v18.json');assert.equal(coverage.assets,528);assert.equal(coverage.covered,952);assert.equal(coverage.remaining,92);
 for(const a of by.values())for(const id of a.recordIds)assert.ok(records.has(id));
});
test('all new sources retain item identity, rights, dates and bilingual maker metadata',()=>{
 for(const a of by.values()){
  assert.ok(a.bytes<=750000);assert.ok(a.width<=1200&&a.height<=1200);assert.ok(a.rightsSourceUrl);
  for(const k of ['creator','date','institution']){assert.equal(a.metadataI18n[k].en,a[k]);assert.ok(a.metadataI18n[k].zh);}
 }
 for(const a of getty.items){assert.equal(a.rights.label,'CC0');assert.equal(a.rightsSourceUrl,a.sourceUrl);}
 for(const a of archive.items)assert.equal(a.rights.label,'Public domain');
});
test('Xinyou corrections distinguish removal of eight regents from three deaths',()=>{
 for(const id of ['china-event-qing-037','china-landmark-066']){
  const r=records.get(id);assert.equal(r.start,1861);assert.equal(r.end,1861);assert.match(r.title.zh,/罢黜/);assert.doesNotMatch(r.title.zh,/诛肃顺等八大臣/);
  assert.match(r.summary.en,/Sushun was executed, Zaiyuan and Duanhua were forced to kill themselves/);assert.match(r.summary.zh,/其余辅政大臣被革职/);
  assert.match(r.provenance.originalText.title.zh,/诛肃顺等八大臣/);assert.ok(r.sources.some(s=>s.url==='https://www.dpm.org.cn/court/event/156213.html'));
 }
 assert.deepEqual(get('kung').recordIds,['china-event-qing-037','china-landmark-066']);assert.equal(get('kung').date,'November 2, 1860');
});
test('Victoria City retains separate land-sale, cession and official naming dates',()=>{
 const r=records.get('china-landmark-266');assert.equal(r.start,1842);assert.equal(r.end,1842);
 assert.match(r.summary.en,/June 1841.*29 June 1843/);assert.match(r.summary.zh,/1842.*1841.*1843/);assert.match(r.provenance.originalText.title.en,/Victoria City is founded/);
 assert.match(get('hongkong').date,/1870s/);assert.match(get('hongkong').interpretation.en,/several decades after/);assert.ok(!get('hongkong').contextSources);
});
test('Japanese site views retain later dates, qualified attribution and specific context',()=>{
 assert.match(get('ieyasu').creator,/Attributed to Adolfo Farsari or/);assert.match(get('ieyasu').interpretation.en,/after the shogunate ended/);assert.doesNotMatch(get('ieyasu').interpretation.en,/long after/);
 assert.deepEqual(get('edo').recordIds,['japan-tokugawa-domains','tokugawa-shogunate-political-order']);
 assert.match(get('kinkaku').caption.en,/destroyed in 1950.*1955/);assert.doesNotMatch(get('kinkaku').interpretation.en,/exchange with Ming/);
 assert.equal(get('ainu').date,'1908');assert.doesNotMatch(get('ainu').title.zh,/夫妇/);assert.match(get('ainu').caption.en,/names are not recorded/);
 assert.ok(!getty.items.some(a=>['109C3K','108QBA'].some(id=>a.sourceUrl.endsWith(id))));
});
test('archive descriptions resolve age, viewer direction and Chinese name consistency',()=>{
 assert.match(ar('ida-wells-baker-family-appeal-1898').caption.en,/young daughter/);assert.doesNotMatch(ar('ida-wells-baker-family-appeal-1898').caption.en,/infant|Senator/);
 assert.match(ar('ida-wells-baker-family-appeal-1898').title.zh,/威尔斯/);
 assert.match(ar('liliuokalani-crown-lands-memorial-1898').title.zh,/莉莉乌奥卡拉尼/);
 assert.match(ar('dolores-huerta-chavez-office-2012').alt.en,/viewer’s right of Obama/);
 assert.match(ar('lincoln-civil-war-portrait-nara').interpretation.en,/Civil War-era portrait/);assert.match(ar('lincoln-civil-war-portrait-nara').creator,/unidentified/);
});
test('documents retain diplomatic viewpoint, page extent and distinct judicial dates',()=>{
 assert.match(ar('ho-chi-minh-truman-letter-1946').caption.en,/First page of a three-page.*18 January 1946/);
 const bus=ar('rosa-parks-bus-diagram-browder-1956');assert.match(bus.caption.en,/5 June 1956.*22 February 1956/);assert.match(bus.interpretation.en,/separate federal lawsuit/);
 assert.deepEqual(ar('german-unity-bush-proclamation-1990').recordIds,['german-reunification','germany-reunified-period']);assert.match(ar('german-unity-bush-proclamation-1990').interpretation.en,/perspective of a U.S. ally/);
});
test('German proclamation format conversion preserves one-frame decoded pixels',()=>{
 const proof=JSON.parse(fs.readFileSync(new URL('../docs/v18-us-archives-05-evidence.json',import.meta.url))).conversionProof;
 assert.equal(proof.frames,1);assert.equal(proof.equal,true);assert.equal(proof.gifDecodedPixelSha256,proof.pngDecodedPixelSha256);
 const a=ar('german-unity-bush-proclamation-1990');assert.match(a.file,/\.png$/);assert.match(a.transformation.en,/GIF converted losslessly to PNG/);
});
