import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const records=new Map(loadAtlasRecords().records.map(r=>[r.id,r])),s=readAtlasData('visual-assets-exact-links-10-v18.json'),get=id=>records.get(id);
test('five associations reuse four images only after three held narratives are repaired',()=>{
 assert.equal(s.items.length,0);assert.equal(s.associations.length,5);assert.equal(new Set(s.associations.map(a=>a.assetId)).size,4);
 for(const id of ['china-landmark-455','china-event-dongjin-012','china-landmark-416']){assert.equal(get(id).provenance.status,'reviewed');assert.ok(get(id).sources.some(x=>x.url.includes('wikisource')));assert.ok(s.associations.some(a=>a.recordId===id));}
});
test('attributed primary histories remove numerical headlines and distinguish the two Xie An games',()=>{
 const l=get('china-landmark-455');assert.match(l.summary.en,/Sanguozhi tells/);assert.doesNotMatch(l.title.en,/150/);assert.match(l.provenance.originalText.title.en,/150/);
 const f=get('china-event-dongjin-012');assert.match(f.summary.en,/before the campaign and a separate game/);assert.doesNotMatch(f.title.zh,/八万/);assert.match(s.associations.find(a=>a.recordId===f.id).context.en,/pre-campaign episode/);
 const q=get('china-landmark-416');assert.match(q.summary.en,/Jinhua and Yiwu/);assert.doesNotMatch(q.title.en,/miners|nine battles/);assert.match(q.summary.en,/later Japanese edition/);
});
test('Maling no longer makes Sun Bin personally kill Pang Juan or combines unrelated Wei events',()=>{
 const r=get('china-event-zhanguo-007');assert.equal(r.start,-341);assert.equal(r.provenance.originalRecord.start,-341);assert.match(r.summary.en,/Sima Qian’s account says Pang Juan took his own life/);assert.match(r.summary.zh,/并非孙膑亲手/);assert.doesNotMatch(r.title.en,/Shang Yang|Daliang|slays/);assert.match(r.provenance.originalText.title.en,/slays Pang Juan/);
});
test('Imjin transmission has its own scholarly source while the shown edition remains Japanese and later',()=>{
 const r=get('imjin-war');assert.ok(r.sources.some(x=>x.url.includes('097-114_Torck.pdf')));
 const a=s.associations.find(a=>a.recordId==='imjin-war');assert.match(a.context.en,/1798 Japanese edition/);assert.match(a.context.en,/neither a wartime Korean copy/);
});
test('two exact object images retain existing source identity and reject royal-portrait confusion',()=>{
 const items=readAtlasData('visual-assets-exact-11-v18.json').items;assert.equal(items.length,2);
 for(const a of items){assert.equal(a.kind,'object');assert.ok(get(a.recordIds[0]).sources.some(x=>x.url===a.sourceUrl));}
 assert.match(get('person-jayavarman-vii').summary.en,/represents the Buddha, not a portrait of the king/);
 assert.match(get('ainu-attus-making').summary.en,/shown here from the back/);
 assert.ok(!readAtlasData('evidence-followups-v18.json').some(x=>['person-jayavarman-vii','ainu-attus-making'].includes(x.recordId)));
});
