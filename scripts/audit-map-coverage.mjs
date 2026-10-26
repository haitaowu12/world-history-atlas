import {CONTENT_MANIFEST} from '../dist/content-expansion.mjs';
// A geographic witness audit, not validation of historical borders or sovereignty.
import fs from 'node:fs';import vm from 'node:vm';
import {historicalContextFeatures,contemporaryFeaturesAt} from '../dist/atlas-model.mjs';
import {createChinaContextLoader} from '../dist/china-period-context.mjs';
import {composeHistoricalFeatures} from '../dist/map-composition.mjs';
import {selectCshapesAt,CSHAPES_RANGE} from '../dist/cshapes-history.mjs';
import {composeCountryPeriodContext} from '../dist/regional-country-context.mjs';
import {createAmericasLoader,composeAmericasFeatures} from '../dist/americas-history.mjs';
import {normalizeMapCollection} from '../dist/map-geometry.mjs';
const root=new URL('../dist/data/',import.meta.url),read=n=>JSON.parse(fs.readFileSync(new URL(n,root)));
const ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3;
const norm=c=>normalizeMapCollection(c,d3.geoArea),meta=read('map-snapshots.json'),historic=meta.layers.flatMap(l=>norm(read(l.file)).features);
const china=createChinaContextLoader(read('china-context-index-v7.json'),async name=>norm(read(name)));
const american=createAmericasLoader(read('americas-history.json'),async name=>norm(read(name)));
const annual=norm(read('cshapes-periods-v7.geojson')),modernMeta=read('contemporary-world.json'),modern=modernMeta.layers.filter(l=>l.role==='countries').flatMap(l=>norm(read(l.file)).features);
const content=read(CONTENT_MANIFEST),records=['history.json','china-depth-v7.json','world-depth-v7.json','modern-continuity-v7.json',...content.files.map(f=>f.file)].flatMap(read).filter(r=>r.kind==='polity');
const years=[-2600,-2500,-2000,-1600,-1500,-1200,-1046,-1000,-800,-771,-770,-700,-600,-500,-476,-475,-404,-403,-400,-399,-350,-323,-300,-221,-200,-100,-1,1,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1750,1800,1815,1850,1867,1878,1885,1886,1900,1914,1939,1945,1960,1990,2000,2010,2019,2020,2026];
const rows=[];
for(const year of years){
 let selected;
 if(year>=CSHAPES_RANGE.start&&year<=CSHAPES_RANGE.end)selected=composeCountryPeriodContext(selectCshapesAt(annual,year),historic,year);
 else if(year>=2020)selected=contemporaryFeaturesAt(modern,historic,year,modernMeta);
 else selected=composeHistoricalFeatures(historicalContextFeatures(historic,year),(await china.load(year)).features);
 await american.load(year);selected=composeAmericasFeatures(selected,year,american.covered(year),american.peek(year));
 const witnesses=records.filter(r=>r.start<=year&&year<=r.end).map(r=>({id:r.id,region:r.region,title:r.title,point:[r.location.lon,r.location.lat],covered:selected.some(f=>d3.geoContains(f,[r.location.lon,r.location.lat]))}));
 rows.push({year,features:selected.length,regions:Object.fromEntries([...new Set(records.map(r=>r.region))].map(region=>{const r=witnesses.filter(w=>w.region===region);return [region,{activeOverviews:r.length,coveredWitnesses:r.filter(w=>w.covered).length,uncovered:r.filter(w=>!w.covered).map(w=>w.id)}]})),witnesses});
}
const output={schemaVersion:1,reviewedAt:'2026-10-26',method:'Selected source composition at 64 checkpoint/transition years; active narrative polity representative points are geographic witnesses. A hit does not establish the correct polity or borders; a miss can reflect coastal generalization or editorial coverage. Modern gray reference outlines are excluded.',rows};
if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(rows.filter(r=>[-1000,-500,-399,200,700,1200,1600,1867,1886,2026].includes(r.year)).map(r=>({year:r.year,features:r.features,missing:r.witnesses.filter(w=>!w.covered).map(w=>w.id)})),null,2));
