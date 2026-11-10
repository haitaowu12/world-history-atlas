import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {filterRecords,defaultState} from '../dist/core.mjs';
import {searchLibrary} from '../dist/china-library.mjs';
import {buildDiscoveryIndex,searchDiscovery} from '../dist/discovery.mjs';
import {buildReadingCatalog,filterReadings} from '../dist/reading-catalog.mjs';

const read=file=>JSON.parse(readFileSync(new URL('../dist/data/'+file,import.meta.url),'utf8'));
const profiles=read('china-library.json').profiles;
const profile=profiles.find(p=>p.id==='china-person-libai');
const record={...read('people.json')[0],id:profile.id,sourceProfileId:profile.id,name:profile.name,title:profile.name};
const directory=buildDiscoveryIndex({records:[record],people:[record],library:{profiles:[profile]}});
const course={id:'pinyin-reading',title:{en:'Li Bai and poetry',zh:'李白与诗歌'},summary:{en:'A literary reading',zh:'文学阅读'},recordIds:[record.id],estimatedMinutes:5};
const readings=buildReadingCatalog([],[course],new Map([[record.id,record]]));

test('tone marks, compatibility width and extra spaces find the same person across search surfaces',()=>{
  for(const query of ['Li Bai','Lǐ Bái','Ｌｉ　Ｂａｉ','  Li   Bai  ','李白']){
    assert.ok(filterRecords([record],{...defaultState(),mode:'all',query}).some(r=>r.id===record.id),'map '+query);
    assert.ok(searchLibrary([profile],query).some(r=>r.id===profile.id),'source reference '+query);
    assert.ok(searchDiscovery(directory,query,{kind:'person'}).some(r=>r.id===record.id),'people '+query);
    assert.equal(filterReadings(readings,{query}).length,1,'readings '+query);
  }
});

test('accent-insensitive searching leaves historical identity comparisons and displayed names intact',()=>{
  const a={...record,id:'person-accented',name:{en:'Āpirana Ngata',zh:'阿皮拉纳·恩加塔'}};
  const b={...record,id:'person-distinct',name:{en:'Apirana Ngata',zh:'另一位人物'}};
  delete a.sourceProfileId;delete b.sourceProfileId;
  const index=buildDiscoveryIndex({records:[a,b],people:[a,b]});
  const found=searchDiscovery(index,'Apirana Ngata',{kind:'person'});
  assert.equal(found.length,2,'a search key is not an identity merge');
  assert.equal(index.personById.get(a.id).name.en,'Āpirana Ngata');
  assert.notEqual(index.personById.get(a.id),index.personById.get(b.id));
});
