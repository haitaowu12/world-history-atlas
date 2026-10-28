import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {installSourceNoteTranslations,localizedSourceNote,sourceNoteHTML} from '../dist/source-notes.mjs';
import {chinaRoutes} from '../dist/china-library.mjs';
import {translationWarnings} from '../scripts/audit-source-notes-zh.mjs';

const data=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist/data');
const read=file=>JSON.parse(fs.readFileSync(path.join(data,file),'utf8'));
const manifest=read('source-notes-zh-manifest.json');
const chunks=manifest.files.map(file=>read(file.path));
const notes=Object.assign({},...chunks);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

test('source descriptions are fully covered without changing the original data',()=>{
  const original=new Set();let occurrences=0;
  function collect(value){
    if(!value||typeof value!=='object')return;
    if(typeof value.evidenceNote==='string'&&value.evidenceNote.trim()){
      occurrences++;original.add(value.evidenceNote);
    }
    for(const child of Object.values(value))collect(child);
  }
  for(const file of fs.readdirSync(data))
    if(/\.(?:json|geojson)$/.test(file)&&!/^source-notes-zh-/.test(file))collect(read(file));
  assert.equal(original.size,manifest.coverage.uniqueDataNotes);
  assert.equal(occurrences,manifest.coverage.dataOccurrences);
  for(const source of original){
    assert.match(notes[source]||'',/[\u3400-\u9fff]/u,source);
    assert.doesNotMatch(notes[source],/中文译文仍在生成/,source);
  }
  assert.equal(Object.keys(notes).length,manifest.coverage.translations);
  for(const file of manifest.files){
    const bytes=fs.readFileSync(path.join(data,file.path));
    assert.equal(bytes.length,file.bytes);assert.ok(bytes.length<450000);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256);
    assert.equal(Object.keys(read(file.path)).length,file.records);
  }
});

test('Chinese and English views preserve the original with honest machine disclosure',()=>{
  const count=installSourceNoteTranslations(chunks);assert.equal(count,manifest.coverage.translations);
  const en='Dataset provenance, not independent corroboration of the historical claim.';
  const source={evidenceNote:en};
  assert.equal(localizedSourceNote(source,'en').text,en);
  assert.equal(localizedSourceNote(source,'zh').text,'数据集的出处说明，并非对历史论断的独立佐证。');
  assert.match(sourceNoteHTML(source,'zh',esc),/机器辅助翻译 · 查看英文原文/);
  assert.match(sourceNoteHTML(source,'zh',esc),/not independent corroboration/);
  assert.doesNotMatch(sourceNoteHTML(source,'en',esc),/机器辅助|数据集的出处/);
});

test('existing Chinese notes, missing translations, and unsafe text behave safely',()=>{
  const native={evidenceNote:'English <source>',evidenceNoteZh:'人工中文译文'};
  const html=sourceNoteHTML(native,'zh',esc);
  assert.match(html,/人工中文译文/);assert.match(html,/查看英文原文/);
  assert.doesNotMatch(html,/机器辅助/);assert.match(html,/English &lt;source&gt;/);
  assert.match(sourceNoteHTML({evidenceNote:'New <untranslated> note'},'zh',esc),/暂无中文译文/);
  assert.match(sourceNoteHTML({evidenceNote:'New <untranslated> note'},'zh',esc),/&lt;untranslated&gt;/);
  assert.equal(sourceNoteHTML({evidenceNote:'已有中文说明'},'zh',esc),'<small class="source-evidence-note" lang="zh">已有中文说明</small>');
  installSourceNoteTranslations([{'English source mentioning 北京':'提及北京的中文译文'}]);
  assert.equal(localizedSourceNote({evidenceNote:'English source mentioning 北京'},'zh').text,'提及北京的中文译文');
  assert.equal(sourceNoteHTML({},'zh',esc),'');
  assert.throws(()=>installSourceNoteTranslations([{x:' '}]));
  assert.throws(()=>installSourceNoteTranslations([{x:'甲'},{x:'乙'}]));
});

test('recent faith entries retain key dates and caveats in reviewed Chinese descriptions',()=>{
  installSourceNoteTranslations(chunks);
  const byId=new Map(read('expansion-early-faiths-v14.json').map(row=>[row.id,row]));
  const note=(id,index=0)=>localizedSourceNote(byId.get(id).sources[index],'zh').text;
  assert.match(note('lumbini-ashoka-pillar-249-bce'),/公元前249年/);
  assert.match(note('lumbini-ashoka-pillar-249-bce'),/公元前623年.*有争议/);
  assert.match(note('sikh-gurus-punjab-1469-1708'),/1469年.*1699年.*1708年/);
  assert.match(note('milan-toleration-313'),/第48章/);
  assert.match(note('milan-toleration-313'),/不能证明.*一致执行/);
  assert.match(note('jerusalem-second-temple-destruction-70'),/明确质疑/);
  assert.match(note('early-christianity-jewish-context'),/并非普遍认同/);
  assert.match(note('council-of-nicaea-325'),/313年.*325年/);
});

test('recent regional evidence notes retain chronology and geographic limits',()=>{
  installSourceNoteTranslations(chunks);
  const regional=new Map(read('expansion-cross-regional-v14.json').map(row=>[row.id,row]));
  const indus=read('expansion-indus-religions-indigenous-v14.json').find(row=>row.id==='indus-civilization-urban-networks');
  const route=read('routes.json').find(row=>row.id==='route-forced-atlantic');
  const note=(row,index)=>localizedSourceNote(row.sources[index],'zh').text;
  assert.match(note(indus,0),/公元前2600—1900年.*公元前1900年之后/);
  assert.match(note(indus,0),/并未划定一个统一国家的边界/);
  assert.match(note(regional.get('vietnam-war-1954-1975'),2),/7月22日.*不是永久政治边界/);
  assert.match(note(regional.get('transatlantic-slave-trade-1514-1866'),0),/1514—1866年.*并非奴隶制的全部历史/);
  assert.match(note(route,2),/不能将个人的原居地等同于沿海出发地点/);
  const ada=read('expansion-europe-v10.json').find(row=>row.id==='person-ada-lovelace');
  assert.match(note(ada,0),/1833年会面/);
});

test('runtime map notes and Jiangshan chronicle notes have Chinese descriptions',()=>{
  installSourceNoteTranslations(chunks);
  for(const en of [
    'Selected political identity transitions and historical labels; geometry and period validity remain CShapes source coding.',
    'Name-change and state-succession notes; not evidence of every historical frontier.',
    'Union of the Democratic Republic of Viet-Nam and Republic of South Viet-Nam on 2 July 1976; not a reconstruction of interim borders.',
    'Inspected agreement Articles 1–2 and entry-into-force clause: provisional military line, regrouping period and 22 July effective date; not source-geometry verification.',
    'Key Events: complete Chola conquest circa1017; Vijayabahu expels Cholas circa1070; independent Polonnaruwa phase1070–1200. Dates are approximate; no northern frontier for993–1016 is inferred.',
    'Key Events: Soso absorbs much of Ghana circa1180–1230, followed by Mali emergence circa1230–1235. A regional transition, not a proven single conquest or total disappearance.',
    'Zhou690–705 and restoration of Tang; name correction only.',
  ])assert.equal(localizedSourceNote({evidenceNote:en},'zh').missing,false,en);
  const routes=chinaRoutes({journeys:[{id:'test',title:{en:'Test',zh:'测试'},stops:[{year:100},{year:101}]}]}, {source:{commit:'abc',checkedAt:'2026-10-27'}});
  assert.match(routes[0].sources[0].evidenceNoteZh,/尚未全部独立核实/);
  assert.doesNotMatch(sourceNoteHTML(routes[0].sources[0],'zh',esc),/机器辅助/);
});

test('translation triage flags altered numbers, missing BCE and possible lost negation',()=>{
  assert.deepEqual(translationWarnings('1959 debut, 2008 death.','1959年出生，1959年首演，2008年去世。'),['numeric-detail']);
  assert.deepEqual(translationWarnings('The date is not established.','该日期已经确定。'),['possible-lost-qualification']);
  assert.deepEqual(translationWarnings('249 BCE.','公元249年。'),['possible-lost-bce']);
  assert.deepEqual(translationWarnings('1922–99 and 30,000 signatures.','1922年至1999年及3万个签名。'),[]);
  assert.deepEqual(translationWarnings('The $24.17 million chronology.','2,417万美元的年代说法。'),[]);
  assert.deepEqual(translationWarnings('Reviewed on 2026-10-24.','于2026年10月24日查阅。'),[]);
  assert.deepEqual(translationWarnings('Taíno terminology.','泰诺术语。'),[]);
});
