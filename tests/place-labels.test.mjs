import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {applyPlaceLabelTranslations,auditPlaceLabelTranslations} from '../dist/place-labels.mjs';
import {CONTENT_MANIFEST,applyEvidenceReviews} from '../dist/content-expansion.mjs';

const read=file=>JSON.parse(fs.readFileSync(new URL('../dist/data/'+file,import.meta.url)));
const imported=read('china-import-manifest.json').eventFiles.flatMap(file=>read(file.path));

test('frozen imported place pairs supply Chinese captions without changing evidence, labels or geometry',()=>{
 const before=JSON.stringify(imported),translated=applyPlaceLabelTranslations(imported);
 assert.equal(translated.filter(r=>r.location.labelProvenance==='inherited-source-place-pair').length,974);
 for(const [i,record] of translated.entries()){
  assert.equal(record.location.label,imported[i].location.label);
  assert.equal(record.location.lon,imported[i].location.lon);assert.equal(record.location.lat,imported[i].location.lat);
  assert.strictEqual(record.provenance,imported[i].provenance);
  assert.strictEqual(record.sources,imported[i].sources);
 }
 assert.equal(JSON.stringify(imported),before,'frozen input objects are not mutated');
 const disputed=translated.find(r=>r.id==='china-event-sanguo-008');
 assert.match(disputed.location.label,/disputed identification/);
 assert.match(disputed.location.labelI18n.zh,/地望有争议/);
 assert.doesNotMatch(disputed.location.labelI18n.zh,/台湾/,'an amended Yizhou label must not revert to the inherited Taiwan identification');
 assert.equal(disputed.location.labelProvenance,'reviewed-amended-source-label');
});

test('reviewed captions match the exact record and English text and never overwrite an authored translation',()=>{
 const record={id:'place-a',location:{lon:12,lat:34,label:'Findspot; workshop unknown'}};
 const catalog={schemaVersion:1,checkedAt:'2026-11-09',method:{en:'Display translation',zh:'显示译文'},items:[{recordId:record.id,en:record.location.label,zh:'出土地；工坊地点不详'}]};
 assert.deepEqual(auditPlaceLabelTranslations(catalog,[record]),[]);
 const result=applyPlaceLabelTranslations([record],catalog)[0];
 assert.deepEqual(result.location.labelI18n,{en:record.location.label,zh:'出土地；工坊地点不详'});
 assert.equal(record.location.labelI18n,undefined);
 const changed={...record,location:{...record.location,label:'Another place'}};
 assert.ok(auditPlaceLabelTranslations(catalog,[changed]).length);
 assert.strictEqual(applyPlaceLabelTranslations([changed],catalog)[0],changed);
 const authored={...record,location:{...record.location,labelI18n:{en:record.location.label,zh:'已有核定地点'}}};
 assert.strictEqual(applyPlaceLabelTranslations([authored],catalog)[0],authored);
 assert.ok(auditPlaceLabelTranslations(catalog,[authored]).length);
 assert.ok(auditPlaceLabelTranslations({...catalog,items:[...catalog.items,...catalog.items]},[record]).length);
});

test('every older record directly linked from a V17 or V18 story or reading has a Chinese place caption',()=>{
 const manifest=read(CONTENT_MANIFEST),catalog=read(manifest.placeLabelsFile);
 const base=['history.json','people.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(read);
 const records=applyEvidenceReviews([...base,...imported,...manifest.files.flatMap(file=>read(file.file))],read(manifest.evidenceReviewsFile));
 assert.equal(catalog.items.length,151);
 for(const frozen of read('place-labels-reviewed-v17.json').items)assert.deepEqual(catalog.items.find(item=>item.recordId===frozen.recordId),frozen);
 assert.deepEqual(auditPlaceLabelTranslations(catalog,records),[]);
 const translated=applyPlaceLabelTranslations(records,catalog),byId=new Map(translated.map(record=>[record.id,record]));
 const fresh=[...read('content-expansion-v17.json').addition.files,...manifest.addition.files].flatMap(read),linked=new Set(fresh.flatMap(record=>record.relatedIds));
 for(const file of ['story-readings-africa-west-europe-v17.json','story-readings-asia-v17.json','story-readings-americas-pacific-v17.json'])for(const course of read(file))for(const id of course.recordIds)linked.add(id);
 for(const id of linked)assert.match(byId.get(id)?.location?.labelI18n?.zh||'',/[\u3400-\u9fff]/u,id+' Chinese caption');
});
