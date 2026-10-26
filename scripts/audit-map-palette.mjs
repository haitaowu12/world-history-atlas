import {mapDisplayPalette,neighboringDisplayGroups,displayColor} from '../dist/map-palette.mjs';
import {performance} from 'node:perf_hooks';
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
// Preserve the current renderer’s modern preferred-colour preparation.
const colors=['#b6c5a6','#b6c8bd','#c5ba96','#a7bdbe','#d0b6a3','#b9b4c2','#bac09e','#a6beb1','#c5b99f'];
for(const f of modern)f.properties={...f.properties,color:f.properties.category==='disputed'?'#b6ada1':colors[Array.from(f.properties.code).reduce((n,c)=>n+c.charCodeAt(0),0)%colors.length]};
const years=[-2600,-2500,-2000,-1600,-1500,-1200,-1046,-1000,-800,-771,-770,-700,-600,-500,-476,-475,-404,-403,-400,-399,-350,-323,-300,-221,-200,-100,-1,1,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1750,1800,1815,1850,1867,1878,1885,1886,1900,1914,1939,1945,1960,1990,2000,2010,2019,2020,2026];
const rows=[];
for(const year of years){
 let selected;
 if(year>=CSHAPES_RANGE.start&&year<=CSHAPES_RANGE.end)selected=composeCountryPeriodContext(selectCshapesAt(annual,year),historic,year);
 else if(year>=2020)selected=contemporaryFeaturesAt(modern,historic,year,modernMeta);
 else selected=composeHistoricalFeatures(historicalContextFeatures(historic,year),(await china.load(year)).features);
 await american.load(year);selected=composeAmericasFeatures(selected,year,american.covered(year),american.peek(year));
 const start=performance.now(),palette=mapDisplayPalette(selected,{scheme:'mineral'}),coldMs=performance.now()-start;
 const before=mapDisplayPalette(selected.map(f=>({...f,properties:{...f.properties,color:displayColor(f.properties)}})));
 const edges=neighboringDisplayGroups(selected),priorConflicts=edges.filter(e=>before.get(e.a[0])===before.get(e.b[0])).length,conflicts=edges.filter(e=>palette.get(e.a[0])===palette.get(e.b[0]));
 const warmStart=performance.now();mapDisplayPalette([...selected],{scheme:'mineral'});const warmMs=performance.now()-warmStart;
 rows.push({year,features:selected.length,nearbyPairs:edges.length,priorConflicts,conflicts:conflicts.length,coldMs,warmMs});
}
const output={schemaVersion:1,checkedAt:'2026-10-26',method:'64 selected-year compositions; 250 km sampled boundary proximity for display grouping, not border validation. Explicit shared identities are grouped before testing. Modern gray administrative reference outlines are excluded.',rows};
if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({views:rows.length,nearbyPairs:rows.reduce((n,r)=>n+r.nearbyPairs,0),priorConflicts:rows.reduce((n,r)=>n+r.priorConflicts,0),conflicts:rows.reduce((n,r)=>n+r.conflicts,0),maxColdMs:Math.max(...rows.map(r=>r.coldMs)),maxWarmMs:Math.max(...rows.map(r=>r.warmMs))},null,2));
if(rows.some(r=>r.conflicts))process.exitCode=1;
