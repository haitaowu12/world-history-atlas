import test from 'node:test';
import assert from 'node:assert/strict';
import {VISUAL_STUDIES,availableVisualStudies,matchingVisualStudy} from '../dist/visual-studies.mjs';
import {createVisualLibrary} from '../dist/visual-library.mjs';
import {entryMediaFigures} from '../dist/history-media.mjs';
import {loadAtlasRecords,readAtlasData} from '../scripts/lib/atlas-records.mjs';
const {manifest,records}=loadAtlasRecords(),catalog=readAtlasData(manifest.mediaFile);
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
test('twenty source-specific studies require their actual two admitted images',()=>{
 assert.equal(availableVisualStudies(catalog.items).length,20);
 for(const study of VISUAL_STUDIES){assert.equal(new Set(study.assets).size,2);assert.equal(matchingVisualStudy([...study.assets].reverse()),study);assert.equal(availableVisualStudies(catalog.items.filter(i=>i.id!==study.assets[0])).includes(study),false);for(const lang of ['en','zh']){assert.ok(study.title[lang]);assert.ok(study.question[lang]);assert.ok(study.observations.length>=2);assert.ok(study.observations.every(o=>o[lang].length>30));}}
 assert.equal(matchingVisualStudy([VISUAL_STUDIES[0].assets[0],VISUAL_STUDIES[0].assets[0]]),null);assert.equal(matchingVisualStudy(['missing','unknown']),null);
});
test('study buttons and reversed direct pairs open the same sourced comparison in either language',()=>{
 let html='';let language='en';const view=createVisualLibrary({catalog,records,getLanguage:()=>language,regions:[],regionName:String,openDialog:value=>{html=value;},openStory(){},escape});
 for(const lang of ['en','zh']){language=lang;for(const study of VISUAL_STUDIES){view.handle('visual-study',study.id);assert.ok(html.includes(escape(study.title[lang])));assert.ok(html.includes(escape(study.question[lang])));for(const observation of study.observations)assert.ok(html.includes(escape(observation[lang])));for(const id of study.assets){const item=catalog.items.find(i=>i.id===id);assert.ok(html.includes(escape(item.sourceUrl)));assert.ok(html.includes(escape(item.rights.url)));}assert.match(html,/<details><summary>/);view.handle('visual-pair',[...study.assets].reverse().join(','));assert.ok(html.includes(escape(study.title[lang])));}}
 const previous=html;for(const id of ['missing,unknown',VISUAL_STUDIES[0].assets[0],VISUAL_STUDIES[0].assets[0]+','+VISUAL_STUDIES[0].assets[0],'a,b,c']){view.handle('visual-pair',id);assert.equal(html,previous);}
 view.handle('visual-study','unknown');assert.equal(html,previous);
});
test('entry media uses one lead image and an accessible disclosure without losing credits',()=>{
 const items=VISUAL_STUDIES[1].assets.map(id=>catalog.items.find(i=>i.id===id));
 assert.equal(entryMediaFigures([],'en',escape),'');
 for(const lang of ['en','zh']){const html=entryMediaFigures(items,lang,escape);assert.match(html,/data-action="visual-pair"/);assert.match(html,/<details class="entry-more-images"><summary>/);assert.ok(html.indexOf(items[0].file)<html.indexOf('entry-more-images'));assert.ok(html.indexOf(items[1].file)>html.indexOf('entry-more-images'));for(const item of items)assert.ok(html.includes(escape(item.sourceUrl)));}
 assert.doesNotMatch(entryMediaFigures(items.slice(0,1),'en',escape),/visual-pair|entry-more-images/);
});
