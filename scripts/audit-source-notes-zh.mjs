// Heuristic triage for machine-translated evidence notes. Passing these checks
// does not establish that a translation preserves every historical meaning.
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

function numbers(text){
  return text.replace(/(?<=\d),(?=\d{3}(?:\D|$))/g,'')
    .replace(/(?<!\d)(\d{4})[–-](\d{2})(?![\d-])/g,(_,start,end)=>`${start}–${start.slice(0,2)}${end}`)
    .replace(/(\d+(?:\.\d+)?)\s*million\b/gi,(_,n)=>String(Math.round(Number(n)*1000000)))
    .replace(/(\d+)万/g,(_,n)=>String(Number(n)*10000))
    .match(/(?<!\d)\d{3,}(?!\d)/g)?.sort()||[];
}
export function translationWarnings(en,zh){
  const warnings=[];
  if(JSON.stringify(numbers(en))!==JSON.stringify(numbers(zh)))warnings.push('numeric-detail');
  if(/(?<![\p{L}\p{N}_])(?:not|no|neither|nor|without|never)(?![\p{L}\p{N}_])/iu.test(en)&&!/[不未无非否难缺没仅限争议存疑排除避免谨慎]/u.test(zh))warnings.push('possible-lost-qualification');
  if(/(?:\bBCE\b|\bB\.C\.)/i.test(en)&&!/(?:公元前|西元前|紀元前|纪元前)/u.test(zh))warnings.push('possible-lost-bce');
  return warnings;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const translations=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  const flagged=Object.entries(translations).flatMap(([en,zh])=>{
    const warnings=translationWarnings(en,zh);
    return warnings.length?[{warnings,en,zh}]:[];
  });
  console.log(JSON.stringify({total:Object.keys(translations).length,flagged},null,2));
}
