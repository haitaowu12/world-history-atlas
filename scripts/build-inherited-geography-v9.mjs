import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';

const input=process.argv[2];
if(!input)throw Error('Pass the pinned js/china_geo_data.js source path.');
const bytes=fs.readFileSync(input), blob=createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex');
// apply_patch can normalize the final newline; allow only the pinned Git blob.
const expected='ea79fbdf09f9e841852e8eccec2f78ca33d332ba';
let original=bytes;
if(blob!==expected){const trimmed=Buffer.from(bytes.toString().replace(/\n$/,''));const sha=createHash('sha1').update(Buffer.from(`blob ${trimmed.length}\0`)).update(trimmed).digest('hex');if(sha!==expected)throw Error('Source Git blob differs from pinned source');original=trimmed;}
const context={window:{}};vm.runInNewContext(original.toString(),context,{timeout:5000});
const data=JSON.parse(JSON.stringify(context.window.HYDRO_DATA));
for(const [kind,items]of Object.entries(data))for(const [i,item]of items.entries())item.id=`china-water-${kind}-${i+1}`;
data.schemaVersion=1;
data.source={repository:'https://github.com/haitaowu12/jiangshan-map',commit:'fcd6484d06d3c581241fc24adbab288cf3a4a2ea',file:'js/china_geo_data.js',gitBlobSha:expected,sha256:createHash('sha256').update(original).digest('hex'),url:'https://github.com/haitaowu12/jiangshan-map/blob/fcd6484d06d3c581241fc24adbab288cf3a4a2ea/js/china_geo_data.js',licenseNotice:'china-context-v7.LICENSE.md'};
data.reviewStatus='inherited-schematic';
data.note={en:'Waterways and lake edges inherited from the pinned Jiangshan source. Undated lines are geographic reference, not reconstructions for every year. Appearance/disappearance values are source display windows, not independently verified formation or engineering dates. Lake edges are drawn as lines to avoid implying reviewed historical lake areas. Historical labels can use older names. The Yellow River window starting in 11 CE is not the date of Wang Jing’s later engineering works.',zh:'水道与湖岸线继承自固定版本的《江山时序》。未注明年代的线条用于地理参照，不代表每一年的复原。出现、消失数值属于来源显示窗口，并非独立核实的形成或工程年代。湖岸只画线，不表示已核实历年湖面。历史标签可能使用旧名；公元11年开始的黄河窗口不是王景后来治河的施工年份。'};
const output=new URL('../dist/data/china-waterways-v9.json',import.meta.url);fs.writeFileSync(output,JSON.stringify(data)+'\n');
console.log(JSON.stringify({rivers:data.rivers.length,lakes:data.lakes.length,labels:data.labels.length,sourceBlob:expected}));
