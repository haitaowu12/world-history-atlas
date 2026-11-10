// Node-side assembly for audits and release builders; mirrors the reader's reviews.
import fs from 'node:fs';
import {CONTENT_MANIFEST, partitionExpansion, applyEvidenceReviews} from '../../dist/content-expansion.mjs';
import {applyChinaReviews, linkChinaContext} from '../../dist/china-review.mjs';
import {applySearchUpdate, applyReviewedUpdate} from '../../dist/upstream-intake.mjs';
import {applyPlaceLabelTranslations} from '../../dist/place-labels.mjs';

const root=new URL('../../',import.meta.url);
export const readAtlasData=file=>JSON.parse(fs.readFileSync(new URL('dist/data/'+file,root),'utf8'));
export function loadAtlasRecords(manifestFile=CONTENT_MANIFEST){
 const manifest=readAtlasData(manifestFile),chinaManifest=readAtlasData('china-import-manifest.json');
 let library=readAtlasData('china-library.json');
 for(const file of library.placeFiles||[])Object.assign(library,readAtlasData(file.path||file.file));
 const additions=partitionExpansion(manifest.files.flatMap(file=>readAtlasData(file.file)));
 let histories=['history.json','china-depth-v7.json','china-donor-stories.json','civilization-stories.json','world-depth-v7.json','modern-continuity-v7.json'].flatMap(readAtlasData);
 histories.push(...additions.histories);
 let people=[...readAtlasData('people.json'),...additions.people];
 const evidence=manifest.evidenceReviewsFile?readAtlasData(manifest.evidenceReviewsFile):[];
 const reviewed=new Map(applyEvidenceReviews([...histories,...people],evidence).map(record=>[record.id,record]));
 histories=histories.map(record=>reviewed.get(record.id));people=people.map(record=>reviewed.get(record.id));
 const baseline=applyChinaReviews(chinaManifest.eventFiles.flatMap(file=>readAtlasData(file.path||file.file)),library,readAtlasData('china-reviews.json'));
 let current={events:baseline.events,people,library:applySearchUpdate(baseline.library,readAtlasData('jiangshan-search-update.json'))};
 for(const file of ['jiangshan-reviewed-update.json','jiangshan-followup-v15.json','jiangshan-reviewed-followup-v16.json'])current=applyReviewedUpdate(current.events,current.people,current.library,readAtlasData(file));
 const captions=manifest.placeLabelsFile?readAtlasData(manifest.placeLabelsFile):{items:[]};
 const records=applyPlaceLabelTranslations([...histories,...current.people,...linkChinaContext(current.events,[...histories,...current.people])],captions);
 if(new Set(records.map(record=>record.id)).size!==records.length)throw new Error('Duplicate assembled atlas identity');
 return {manifest,records,people:records.filter(record=>record.kind==='person'),library:current.library,courses:[...readAtlasData('courses.json'),...readAtlasData(manifest.coursesFile)]};
}
