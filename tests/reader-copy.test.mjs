import test from 'node:test';
import assert from 'node:assert/strict';
import {readerDateNote,readerFactLines,readerSourceGroups,readerSourceListHTML,isDatasetCredit,readerReviewLimit} from '../dist/reader-copy.mjs';
import {conciseSourceNote,sourceNoteHTML} from '../dist/source-notes.mjs';
import {loadAtlasRecords} from '../scripts/lib/atlas-records.mjs';
const {records}=loadAtlasRecords();
test('only the exact inherited generic date note is shortened; specific chronology stays intact',()=>{
 const generic=records.filter(r=>r.dateNote?.en?.startsWith('Uses the civil year supplied by the source.'));
 assert.ok(generic.length>0,'exercise remaining inherited generic notes as reviews replace them');for(const r of generic){assert.equal(readerDateNote(r,'en'),'Year from the source; the map point is schematic.');assert.equal(readerDateNote(r,'zh'),'年份沿用来源；地图点位为示意位置。');}
 for(const r of records.filter(r=>!generic.includes(r)))for(const lang of ['en','zh'])assert.equal(readerDateNote(r,lang),typeof r.dateNote==='string'?r.dateNote:r.dateNote?.[lang]||r.dateNote?.en||'');
});
test('facts repeated verbatim from titles or summaries disappear without erasing distinct facts',()=>{
 const r={title:{en:'A title',zh:'标题'},summary:{en:'A claim.',zh:'一则主张。'},keyFacts:{en:['A claim','A title','Specific limitation.','Specific limitation.'],zh:['一则主张','标题','特定限制。']}};
 assert.deepEqual(readerFactLines(r,'en'),['Specific limitation.']);assert.deepEqual(readerFactLines(r,'zh'),['特定限制。']);assert.equal(r.keyFacts.en.length,4);
 // Synthetic duplicates exercise the rule; do not claim current data contains them.
});
test('only known dataset repositories are grouped as provenance; historical references stay',()=>{
 const sources=[{url:'https://github.com/DeanChensj/jiangshan-map/blob/main/data.json'},{url:'https://github.com/haitaowu12/jiangshan-map/pull/1'},{url:'https://www.metmuseum.org/art/collection/search/1'},{url:'https://github.com/other/historical-source'}];
 const groups=readerSourceGroups({sources});assert.deepEqual(groups.credits,sources.slice(0,2));assert.deepEqual(groups.reading,sources.slice(2));assert.equal(isDatasetCredit({url:'https://github.com/DeanChensj/jiangshan-map-unrelated'}),false);
 const html=readerSourceListHTML({sources},'en',s=>s.url);assert.ok(html.indexOf(sources[2].url)<html.indexOf('dataset-credits'));assert.ok(html.indexOf(sources[0].url)>html.indexOf('dataset-credits'));for(const s of sources)assert.ok(html.includes(s.url));
});
test('source disclosures remove successful access narration but keep uncertainty and text identity',()=>{
 assert.equal(conciseSourceNote('Approximate date; authorship disputed. Retrieval: page text inspected.'),'Approximate date; authorship disputed.');
 assert.equal(conciseSourceNote('The Codex Mendoza records tribute. Access: opened page extract.'),'The Codex Mendoza records tribute.');
 assert.equal(conciseSourceNote('Only an indexed excerpt was available; full text was not accessed.'),'Only an indexed excerpt was available; full text was not accessed.');
 const html=sourceNoteHTML({evidenceNote:'Directly inspected the treaty. Territorial extent is disputed.'},'en',String);assert.match(html,/<details class="source-scope"><summary>What this source covers<\/summary>/);assert.match(html,/Territorial extent is disputed/);assert.doesNotMatch(html,/Directly inspected/);
});

test('review-copy changes are exact and preserve historical source qualifications',()=>{
 const historical={expansion:{reviewLimit:{en:'The dynastic history is a retrospective account. Its moral judgments, speeches and army totals are not adopted as independently verified facts.',zh:'正史属于事后编纂的叙述；其中道德评价、人物对话和军队总数不直接视为独立核实的事实。'}}};
 for(const lang of ['en','zh'])assert.equal(readerReviewLimit(historical,lang),historical.expansion.reviewLimit[lang]);
 const source={expansion:{reviewLimit:{en:'This synthesis combines inspected institutional text with indexed scholarly material. Source-level retrieval notes identify access limits; a second URL is not always independent corroboration.',zh:'本综合结合已阅读的机构正文与学术索引材料。各来源的取得说明列出限制；第二个网址并不总是独立佐证。'}}};
 assert.match(readerReviewLimit(source,'en'),/indexed scholarship.*may share evidence/);assert.match(readerReviewLimit(source,'zh'),/学术索引.*同一证据/);assert.match(source.expansion.reviewLimit.zh,/本综合/);source.expansion.reviewLimit.zh='New specific qualification';assert.equal(readerReviewLimit(source,'zh'),'New specific qualification');
 assert.equal(readerReviewLimit({},'en'),'');
});

test('facts already stated as whole summary sentences are not repeated as separate takeaways',()=>{
 const r={title:{en:'Title',zh:'标题'},summary:{en:'The first claim is clear. A second claim follows.\n\nA third claim adds context.',zh:'第一项主张明确。第二项主张接续。\n\n第三项主张补充背景。'},keyFacts:{en:['The first claim is clear.','A third claim adds context.','A distinct qualification.'],zh:['第一项主张明确。','第三项主张补充背景。','另有特定限制。']}};
 assert.deepEqual(readerFactLines(r,'en'),['A distinct qualification.']);assert.deepEqual(readerFactLines(r,'zh'),['另有特定限制。']);assert.equal(r.keyFacts.en.length,3);
});
test('exact object-review process boilerplate is hidden but a specific qualification survives',()=>{
 const r=records.find(r=>r.id==='taino-caribbean-societies');for(const lang of ['en','zh'])assert.equal(readerReviewLimit(r,lang),'');assert.ok(r.expansion.reviewLimit.en);
 const changed=structuredClone(r);changed.expansion.reviewLimit.zh='器物来源地仍有争议。';assert.equal(readerReviewLimit(changed,'zh'),'器物来源地仍有争议。');
});
