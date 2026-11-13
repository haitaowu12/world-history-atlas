// Presentation-only reductions. Historical qualifications and frozen source records remain intact.
const local=(value,lang)=>typeof value==='string'?value:value?.[lang]||value?.en||'';
const genericDate={en:'Uses the civil year supplied by the source. A single year anchors this entry; its schematic point does not establish a person’s presence there in that year.',zh:'按来源条目中的公元纪年显示；单一年份仅是该条目的时间锚点。点位为来源的示意位置，不保证人物当年亲自到达此处。'};
export function readerDateNote(record,lang){const note=local(record.dateNote,lang);return note===genericDate[lang]?(lang==='zh'?'年份沿用来源；地图点位为示意位置。':'Year from the source; the map point is schematic.'):note;}
const comparable=value=>String(value||'').trim().replace(/[。.!！?？]+$/u,'').replace(/\s+/g,' ');
export function readerFactLines(record,lang){
 const facts=local(record.keyFacts,lang);if(!Array.isArray(facts))return [];
 const summary=local(record.summary,lang);
 const sentences=[...new Intl.Segmenter(lang==='zh'?'zh':'en',{granularity:'sentence'}).segment(summary)].map(row=>comparable(row.segment));
 const seen=new Set([comparable(summary),comparable(local(record.title,lang)),...sentences]);
 return facts.filter(line=>{const value=comparable(line);if(!value||seen.has(value))return false;seen.add(value);return true;});
}
export function isDatasetCredit(source){return /^https:\/\/github\.com\/(?:DeanChensj|haitaowu12)\/jiangshan-map(?:[/?#]|$)/i.test(source?.url||'');}
export function readerSourceGroups(record){const reading=[],credits=[];for(const source of record.sources||[])(isDatasetCredit(source)?credits:reading).push(source);return {reading,credits};}
export function readerSourceListHTML(record,lang,renderSource){
 const {reading,credits}=readerSourceGroups(record);
 const list=rows=>`<ol class="detail-sources">${rows.map(source=>`<li>${renderSource(source)}</li>`).join('')}</ol>`;
 return (reading.length?list(reading):'')+(credits.length?`<details class="dataset-credits"><summary>${lang==='zh'?'资料集与选题出处':'Dataset and topic credits'}</summary>${list(credits)}</details>`:'');
}

const reviewCopy=new Map([
 ['This synthesis combines inspected institutional text with indexed scholarly material. Source-level retrieval notes identify access limits; a second URL is not always independent corroboration.',{en:'Sources include institutional texts and indexed scholarship; linked pages may share evidence.',zh:'来源包括机构正文与学术索引材料；不同网页可能沿用同一证据。'}],
 ['The marker represents an attested setting, not a reconstructed journey. Ancient speeches and anecdotes are treated as transmitted narrative.',{en:'The map marks a documented setting. Ancient speeches and anecdotes are transmitted narratives.',zh:'地图标示有文献依据的场景；古代言辞与轶事属于传世叙事。'}],
 ['Selected career episodes; the mapped points represent named cities or regions, not exact buildings or a reconstructed itinerary.',{en:'Mapped cities and regions locate selected life episodes.',zh:'地图以所述城市和地区定位选取的生平片段。'}],
 ['A bounded synthesis of the cited material. Source notes identify the claims reviewed and any access limits; the record does not establish territorial borders or a continuous personal itinerary.',{en:'Evidence and access limits appear with each source. Map points mark historical settings.',zh:'证据及访问限制见各则来源；地图点位标示历史场景。'}],
 ['Relevant linked source passages inspected; original bilingual synthesis, without independent specialist review. Coordinates are representative anchors.',{en:'Coordinates mark representative locations.',zh:'坐标标示代表性地点。'}],
 ['A bounded synthesis of the inspected sources, not independent specialist review. Institutional accounts may share commemorative traditions. Dates and representative points do not reconstruct a continuous itinerary or establish territorial geometry.',{en:'Institutional accounts may share commemorative traditions. Map points mark selected settings.',zh:'机构记述可能共享纪念传统；地图点位标示选取的场景。'}]
]);
const reviewedChinese=[
 '本综合结合已阅读的机构正文与学术索引材料。各来源的取得说明列出限制；第二个网址并不总是独立佐证。',
 '地图点代表有文献依据的历史场景，不是复原行程。古代言辞与轶事按传世叙事处理。',
 '选取仕途与创作片段；地图点代表所述城市或地区，并非确切建筑或复原行程。',
 '对所引材料的有限综合。来源说明列出核查论点与访问限制；条目不确立疆界或连续个人行程。',
 '已查阅链接来源中的相关段落，并作原创双语综合；未经独立领域专家审阅。坐标为代表性参照。',
 '对已查阅来源的有限综合，未经独立专家审阅。机构叙述可能共享纪念传统。日期及代表性点位不构成连续行程或疆域依据。'
];
const reviewOriginalZh=new Map([...reviewCopy.keys()].map((key,index)=>[key,reviewedChinese[index]]));
const objectReviewBoilerplate=[
 {en:'The collection record supports the specific object paragraph and retains its uncertain attribution or identification. Political chronology follows the existing sources.',zh:'馆藏记录支持具体器物段落，并保留归属或身份判断的不确定性。政治年表仍依据原有来源。'},
 {en:'The new collection record supports the specific artifact paragraph; it retains the museum’s attribution and identification limits. Other historical claims follow the existing sources.',zh:'新增馆藏记录支持具体器物段落，并保留馆方在归属及身份判断上的限制；其他历史论断仍依据原有来源。'}
];
export function readerReviewLimit(record,lang){const note=record.expansion?.reviewLimit;if(objectReviewBoilerplate.some(value=>note?.en===value.en&&note?.zh===value.zh))return '';return local(note&&note.zh===reviewOriginalZh.get(note.en)?reviewCopy.get(note.en):note,lang);}
