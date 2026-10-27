// Transition-year neighbor colors use the same actual map composition as the UI.
import {mapDisplayPalette,neighboringDisplayGroups} from '../dist/map-palette.mjs';
import {historicalContextFeatures} from '../dist/atlas-model.mjs';
import {createChinaContextLoader} from '../dist/china-period-context.mjs';
import {composeHistoricalFeatures} from '../dist/map-composition.mjs';
import {createAmericasLoader,composeAmericasFeatures} from '../dist/americas-history.mjs';
import {normalizeMapCollection} from '../dist/map-geometry.mjs';
import fs from 'node:fs';import vm from 'node:vm';import {performance} from 'node:perf_hooks';
const root=new URL('../dist/data/',import.meta.url),read=n=>JSON.parse(fs.readFileSync(new URL(n,root))),ctx={};vm.runInNewContext(fs.readFileSync(new URL('../dist/assets/d3.v7.9.0.min.js',import.meta.url),'utf8'),ctx);const d3=ctx.d3,norm=c=>normalizeMapCollection(c,d3.geoArea),meta=read('map-snapshots.json'),historic=meta.layers.flatMap(l=>norm(read(l.file)).features);
const china=createChinaContextLoader(read('china-context-index-v7.json'),async n=>norm(read(n))),americas=createAmericasLoader(read('americas-history.json'),async n=>norm(read(n)));
const years=[374,375,400,449,450,479,480,1299,1300,1379,1380,1459,1460,1500,1568,1569,1580,1581,1583,1584,1599,1600,1699,1700,1807,1808,1809,1814,1815,1845,1846,1885];
const rows=[];for(const year of years){let selected=composeHistoricalFeatures(historicalContextFeatures(historic,year),(await china.load(year)).features);await americas.load(year);selected=composeAmericasFeatures(selected,year,americas.covered(year),americas.peek(year));const begin=performance.now(),palette=mapDisplayPalette(selected,{scheme:'mineral'}),coldMs=performance.now()-begin,edges=neighboringDisplayGroups(selected),conflicts=edges.filter(e=>palette.get(e.a[0])===palette.get(e.b[0]));rows.push({year,features:selected.length,nearbyPairs:edges.length,conflicts:conflicts.length,coldMs});}
const report={checkedAt:'2026-10-26',method:'Actual map composition at 32 selected source and transition years; 250 km sampled boundary proximity and reviewed explicit separation pairs detect nearby display groups, not historical-border truth.',rows};if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({views:rows.length,nearbyPairs:rows.reduce((n,r)=>n+r.nearbyPairs,0),conflicts:rows.reduce((n,r)=>n+r.conflicts,0),maxColdMs:Math.max(...rows.map(r=>r.coldMs))},null,2));if(rows.some(r=>r.conflicts))process.exitCode=1;
