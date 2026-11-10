// Reproducible denominator and candidates for source research. No automatic admission.
import fs from 'node:fs';
import {loadAtlasRecords} from './lib/atlas-records.mjs';
const {records}=loadAtlasRecords();
fs.mkdirSync('research/v18',{recursive:true});
fs.writeFileSync('research/v18/inventory.json',JSON.stringify(records,null,2)+'\n');
console.log(JSON.stringify({records:records.length,target:Math.ceil(records.length/2),regions:Object.fromEntries(Object.entries(Object.groupBy(records,r=>r.region)).map(([key,value])=>[key,value.length]))},null,2));
