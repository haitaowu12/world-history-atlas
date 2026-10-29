import {assertHistoricalManifestBeforeBoundaryReview} from './map-fixtures.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {defaultState,filterRecords,validYear} from '../dist/core.mjs';
const bytes=f=>fs.readFileSync(new URL('../dist/data/'+f,import.meta.url));
const read=f=>JSON.parse(bytes(f));
const sha=b=>createHash('sha256').update(b).digest('hex');
const manifest=read('content-expansion-v14.json');
const all=['history.json','people.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json',...manifest.files.map(f=>f.file)].flatMap(read);
const rows=read('expansion-early-faiths-v14.json'),by=new Map(all.map(r=>[r.id,r]));
const get=id=>{const row=by.get(id);assert.ok(row,'missing '+id);return row;};

test('published V14 inputs and historical map data remain unchanged',()=>{
 const base=JSON.parse(fs.readFileSync(new URL('../docs/EARLY_FAITHS_BASELINE_2026_10_27.json',import.meta.url)));
 assert.equal(base.records,1896);assert.equal(base.readingPaths,43);assert.equal(rows.length,13);
 for(const old of base.contentFiles){assert.deepEqual(manifest.files.find(f=>f.file===old.file),old);assert.equal(sha(bytes(old.file)),old.sha256);}
 assertHistoricalManifestBeforeBoundaryReview(base.mapManifestSha256,assert);
 for(const r of rows){
  assert.ok(validYear(r.start)&&validYear(r.end)&&r.start<=r.end,r.id);
  assert.equal(r.locationPrecision,'representative');assert.ok(!r.geometry&&!r.route,r.id);
  assert.ok(r.summary.en&&r.summary.zh&&r.dateNote.en&&r.dateNote.zh,r.id);
  assert.ok(r.relatedIds.length>=2&&r.relatedIds.every(id=>by.has(id)),r.id);
  assert.ok(r.sources.length&&r.sources.every(s=>s.url.startsWith('https://')&&s.evidenceNote&&s.checkedAt&&s.retrieval),r.id);
 }
});

test('Jewish communities predate 70 CE and later rabbinic traditions are distinct',()=>{
 const communities=get('jewish-communities-second-temple'),temple=get('jerusalem-second-temple-destruction-70'),rabbis=get('rabbinic-judaism-after-70');
 assert.deepEqual([communities.start,temple.start,rabbis.start,rabbis.end],[-539,70,70,300]);
 assert.equal(temple.regionalAssociation,'omit-broad-point','an ancient Jerusalem reference must not imply a modern administrative jurisdiction');
 assert.match(communities.dateNote.en,/not the start of all Jewish diaspora/);
 assert.match(temple.dateNote.en,/neither the beginning of all diaspora nor the end of Judaism/);
 assert.match(rabbis.summary.en,/historically uncertain/);assert.match(rabbis.dateNote.en,/not the complete period/);
});

test('early Christianity differentiates letters, toleration and council chronology',()=>{
 const early=get('early-christianity-jewish-context'),letters=get('paul-corinth-letters-50s'),milan=get('milan-toleration-313'),council=get('council-of-nicaea-325'),boundaries=get('christian-jewish-communities-late-antiquity');
 assert.deepEqual([early.start,letters.start,letters.end,milan.start,council.start],[1,50,55,313,325]);
 assert.match(early.dateNote.en,/not an exact birth\/death date/);
 assert.match(letters.summary.en,/hard to establish/);assert.match(letters.summary.en,/not a reconstructed journey/);
 assert.match(milan.summary.en,/did the 313 arrangements make Christianity the official religion/);
 assert.match(council.dateNote.en,/not Christianity’s founding/);assert.match(boundaries.dateNote.en,/neither.*universal date of separation/);
});

test('Buddhist, Sikh and living-tradition dates remain qualified',()=>{
 const early=get('early-buddhist-teachings-communities'),pillar=get('lumbini-ashoka-pillar-249-bce'),art=get('buddhist-art-mathura-gandhara'),sikh=get('sikh-gurus-punjab-1469-1708'),khalsa=get('khalsa-anandpur-1699');
 assert.deepEqual([early.start,early.end,pillar.start,art.start,art.end],[-500,-200,-249,-100,200]);
 assert.match(pillar.dateNote.en,/not a settled exact date/);assert.match(pillar.summary.en,/birth year.*debated/s);
 assert.deepEqual([sikh.start,khalsa.start,sikh.end,get('sikh-kingdom-punjab').start],[1469,1699,1708,1799]);
 assert.match(sikh.dateNote.en,/continues beyond/);assert.match(khalsa.dateNote.en,/not the start or end/);
 for(const q of ['Jewish history','Judaism','Christianity','Buddhism','Sikh','犹太','基督教','佛教','锡克'])
  assert.ok(filterRecords(rows,{...defaultState(),mode:'all',query:q}).length,'search: '+q);
});

test('four reading paths preserve chronological anchors and avoid false geography',()=>{
 const guides=read('early-faiths-studies-v14.json'),courses=read(manifest.coursesFile);assert.equal(guides.length,4);
 for(const guide of guides){
  assert.ok(courses.some(c=>c.id===guide.id));let last=-Infinity;
  for(const id of guide.recordIds){const r=get(id),y=guide.mapYears[id];assert.ok(y>=r.start&&y<=r.end,guide.id+': '+id);assert.ok(y>=last,guide.id+': chronology');last=y;}
  assert.ok(guide.questions.every(q=>q.en&&q.zh));
 }
 const excluded=new Set(rows.filter(r=>r.regionalAssociation==='omit-broad-point').map(r=>r.id));
 for(const file of [manifest.regionalHistoryFile,manifest.geographicIndexFile])for(const links of Object.values(read(file).areas))for(const link of links)assert.ok(!excluded.has(link.recordId),link.recordId+' was attached to a modern subdivision');
});
