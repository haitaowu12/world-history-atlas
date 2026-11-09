import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditHistoryMedia,createHistoryMedia,mediaFigures,handleHistoryImageError} from '../dist/history-media.mjs';

const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const manifest=read('content-expansion-v16.json');
const records=['history.json','people.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json',...manifest.files.map(f=>f.file)].flatMap(read);
const catalog=read('history-media.json');
const ids=records.map(r=>r.id);

test('every published image has a real local asset, linked record, bilingual interpretation and reusable source',()=>{
  assert.deepEqual(auditHistoryMedia(catalog,ids),[]);
  for(const item of catalog.items){
    const bytes=fs.readFileSync(new URL('../dist/'+item.file,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256,item.id);
  }
});

test('image admission rejects broken attribution, identities, dimensions and local paths',()=>{
  for(const change of [
    item=>{item.rights.url='javascript:alert(1)';},
    item=>{item.recordIds=['missing-person'];},
    item=>{item.file='assets/history-media/../../private.jpg';},
    item=>{item.sourceUrl='https://user:pass@example.org';},
    item=>{item.interpretation.zh='';},
    item=>{item.transformation.en='';},
    item=>{item.representation='unlabeled-reconstruction';},
    item=>{item.rightsSourceUrl='';},
    item=>{item.bytes=0;},
    item=>{item.width=0;}
  ]){
    const copy=structuredClone(catalog);change(copy.items[0]);
    assert.ok(auditHistoryMedia(copy,ids).length);
  }
  const duplicate=structuredClone(catalog);duplicate.items.push(duplicate.items[0]);
  assert.match(auditHistoryMedia(duplicate,ids).join('\n'),/duplicate/);
});

test('the public image caption retains credit, rights and later-depiction context in both languages',()=>{
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const index=createHistoryMedia(catalog);
  for(const item of catalog.items){
    for(const id of item.recordIds)assert.ok(index.forRecord(id).some(image=>image.id===item.id));
    for(const lang of ['en','zh']){
      const html=mediaFigures([item],lang,escape);
      for(const value of [item.sourceUrl,item.rights.url,item.interpretation[lang],item.caption[lang],item.alt[lang]])assert.ok(html.includes(escape(value)));
      assert.match(html,/loading="lazy"/);
    }
  }
});

test('broken images keep their caption available and expose a readable fallback',()=>{
  const fallback={hidden:true},attributes={};
  const link={querySelector:()=>fallback,dataset:{historySource:'https://example.org/object/1',historySourceLabel:'Open collection record: portrait'},setAttribute:(key,value)=>{attributes[key]=value;}};
  const image={hidden:false,hasAttribute:name=>name==='data-history-image',parentElement:link};
  handleHistoryImageError({target:image});
  assert.equal(image.hidden,true);assert.equal(fallback.hidden,false);
  assert.equal(attributes.href,'https://example.org/object/1');
  assert.equal(attributes['aria-label'],'Open collection record: portrait');
  assert.doesNotThrow(()=>handleHistoryImageError({target:{}}));
});
