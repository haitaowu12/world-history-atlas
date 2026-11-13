import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {KNOWLEDGE_GRAPHICS,knowledgeGraphicFor,renderKnowledgeGraphic} from '../dist/knowledge-graphics.mjs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const records=loadAtlasRecords().records,escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
test('two original graphics attach only to their specific entries and retained sources',()=>{
 assert.equal(KNOWLEDGE_GRAPHICS.length,2);for(const g of KNOWLEDGE_GRAPHICS){const r=records.find(r=>r.id===g.recordId);assert.equal(knowledgeGraphicFor(r),g);assert.equal(knowledgeGraphicFor({...r,sources:[]}),null);}
 assert.equal(knowledgeGraphicFor(null),null);assert.equal(renderKnowledgeGraphic({id:'unknown'},'en',escape),'');
});
test('genome diagram represents approximate sequence coverage, not ancestry or chromosome position',()=>{
 const r=records.find(r=>r.id==='human-genome-project-completion'),html=renderKnowledgeGraphic(r,'en',escape);
 assert.equal((html.match(/class="genome-covered"/g)||[]).length,92);assert.equal((html.match(/class="genome-gap"/g)||[]).length,8);
 assert.match(html,/≈92% sequenced/);assert.match(html,/not chromosome positions/);assert.match(html,/different from representing variation across people/);assert.doesNotMatch(html,/92% of people|ancestry percentages/);
});
test('assembly diagram separates excluded categories from the participant path',()=>{
 const r=records.find(r=>r.id==='athenian-assembly-citizenship'),html=renderKnowledgeGraphic(r,'en',escape);
 assert.ok(html.indexOf('class="assembly-route"')<html.indexOf('class="assembly-excluded"'));assert.match(html,/Full civic rights/);assert.match(html,/451 BCE/);assert.match(html,/some offences/);assert.match(html,/not population proportions/);assert.doesNotMatch(html,/probability|%|Assembly fee/);
});
test('both graphics provide bilingual native keyboard disclosures and visible source attribution',()=>{
 for(const g of KNOWLEDGE_GRAPHICS)for(const lang of ['en','zh']){
 const html=renderKnowledgeGraphic(records.find(r=>r.id===g.recordId),lang,escape);assert.equal((html.match(/<details>/g)||[]).length,3);
 assert.match(html,/<details><summary>/);assert.ok(html.includes(escape(g.source)));assert.ok(html.includes(escape(g.title[lang])));
 for(const s of g.steps){assert.ok(html.includes(escape(s.title[lang])));assert.ok(html.includes(escape(s.text[lang])));}
 assert.match(html,lang==='en'?/Modern explanatory graphic/:/现代说明图/);assert.doesNotMatch(html,/onclick=|tabindex="-1"|display:none/);
 }
});
test('editorial graphics never enter the historical image numerator',()=>{
 const media=readAtlasData('history-media-v18.json'),coverage=readAtlasData('visual-coverage-v18.json');
 assert.ok(KNOWLEDGE_GRAPHICS.every(g=>!media.items.some(a=>a.id===g.recordId)));assert.equal(coverage.assets,523);assert.equal(coverage.covered,929);
 const app=fs.readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');assert.match(app,/renderKnowledgeGraphic\(r,state.lang,esc\)/);
});
test('graphic styles preserve touch targets, contrast patterns and static reduced-motion behavior',()=>{
 const css=fs.readFileSync(new URL('../dist/styles.css',import.meta.url),'utf8').split('/* Source-grounded editorial graphics')[1];
 assert.match(css,/min-height:44px/);assert.match(css,/summary:focus-visible/);assert.match(css,/repeating-linear-gradient/);assert.doesNotMatch(css,/animation:|transition:/);assert.match(css,/repeat\(20,minmax\(0,1fr\)\)/);
});
