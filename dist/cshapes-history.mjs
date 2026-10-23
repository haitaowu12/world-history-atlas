// Geometry derivative license: CC BY-NC-SA-4.0; see data/cshapes-v7.LICENSE.md.
// Source time-zone strings are deliberately ignored: exact numeric source
// date components were converted to YYYYMMDD keys by the reproducible builder.
export const CSHAPES_RANGE={start:1886,end:2019};
export const CSHAPES_ANNUAL_DATE='12-31';
const UN='https://research.un.org/en/unmembers/currentmembers';
const RUSSIA='https://history.state.gov/milestones/1989-1992/collapse-soviet-union';
const NAMES='https://www.gov.uk/government/publications/country-names/timeline-of-country-name-changes-in-hmg-use-1919-to-present';
const TREATIES='https://treaties.un.org/pages/historicalinfo.aspx';
const GERMANY='https://www.bundesregierung.de/breg-en/service/archive/archive/the-chancellor-who-reunited-germany-413888';
const name=(en,zh)=>({en,zh});
// These corrections concern labels, never geometry validity. The original alias
// remains in sourceName. A short geographical label does not imply independence.
export function cshapesNameAt(feature,year){
 const p=feature.properties,c=p.gwcode;
 switch(c){
  case 365:return year<1917?name('Russian Empire','俄罗斯帝国'):year<1922?name('Russia · civil-war period','俄国 · 内战时期'):year<1991?name('Soviet Union','苏联'):name('Russia','俄罗斯');
  case 325:return name('Italy','意大利');
  case 255:return year<1919?name('German Empire','德意志帝国'):name('Germany','德国');
  case 260:return year<1949?name('Western occupation zones of Germany','德国西部占领区'):year<1990?name('West Germany','西德'):name('Germany','德国');
  case 265:return year<1949?name('Soviet occupation zone of Germany','德国苏占区'):name('East Germany','东德');
  case 345:return year<1929?name('Kingdom of Serbs, Croats and Slovenes','塞尔维亚人、克罗地亚人和斯洛文尼亚人王国'):year<1945?name('Kingdom of Yugoslavia','南斯拉夫王国'):year<1992?name('Socialist Yugoslavia','社会主义南斯拉夫'):year<2003?name('Federal Republic of Yugoslavia','南斯拉夫联盟共和国'):name('Serbia and Montenegro','塞尔维亚和黑山');
  case 710:return year<1912?name('Qing dynasty','清朝'):year<1949?name('Republic of China','中华民国'):name('People’s Republic of China','中华人民共和国');
  case 640:return year<1923?name('Ottoman Empire','奥斯曼帝国'):name('Turkey','土耳其');
  case 730:return year<1897?name('Joseon Korea','朝鲜王朝'):year<1910?name('Korean Empire','大韩帝国'):name('Korea under Japanese rule','日本殖民统治下的朝鲜');
  case 731:return year<1948?name('Northern Korea · Soviet occupation zone','朝鲜北部 · 苏联占领区'):name('North Korea','朝鲜');
  case 732:return year<1948?name('Southern Korea · US occupation zone','朝鲜南部 · 美国占领区'):name('South Korea','韩国');
  case 750:return year<1947?name('British India','英属印度'):name('India','印度');
  case 820:return year<1948?name('Malayan Union','马来亚联邦（Malayan Union）'):year<1963?name('Federation of Malaya','马来亚联合邦'):name('Malaysia','马来西亚');
  case 780:return year<1972?name('Ceylon','锡兰'):name('Sri Lanka','斯里兰卡');
  case 775:return year<1989?name('Burma','缅甸'):name('Myanmar','缅甸');
  case 800:return year<1939||(year>=1945&&year<=1948)?name('Siam','暹罗'):name('Thailand','泰国');
  case 816:return year<1975?name('North Vietnam','北越'):name('Vietnam','越南');
  case 817:return name('South Vietnam','南越');
  case 815:return name('Vietnam · French colonial units','越南 · 法国殖民地单元');
  case 432:return year<1960?name('French Sudan','法属苏丹'):name('Mali','马里');
  case 452:return year<1957?name('Gold Coast','黄金海岸'):name('Ghana','加纳');
  case 434:return year<1975?name('Dahomey','达荷美'):name('Benin','贝宁');
  case 439:return year<1984?name('Upper Volta','上沃尔特'):name('Burkina Faso','布基纳法索');
  case 490:return year<1908?name('Congo Free State','刚果自由邦'):year<1960?name('Belgian Congo','比属刚果'):year<1971?name('Congo · Léopoldville/Kinshasa','刚果（利奥波德维尔／金沙萨）'):year<1997?name('Zaire','扎伊尔'):name('Democratic Republic of the Congo','刚果民主共和国');
  case 510:return year<1919?name('German East Africa','德属东非'):year<1964?name('Tanganyika','坦噶尼喀'):name('Tanzania','坦桑尼亚');
  case 551:return year<1964?name('Northern Rhodesia','北罗得西亚'):name('Zambia','赞比亚');
  case 552:return year<1965?name('Southern Rhodesia','南罗得西亚'):year<1979?name('Rhodesia','罗得西亚'):year===1979?name('Rhodesia · transition year','罗得西亚 · 政权转折年'):name('Zimbabwe','津巴布韦');
  case 553:return year<1964?name('Nyasaland','尼亚萨兰'):name('Malawi','马拉维');
  case 565:return year<1968?name('South West Africa','西南非洲'):name('Namibia','纳米比亚');
  case 570:return year<1966?name('Basutoland','巴苏陀兰'):name('Lesotho','莱索托');
  case 571:return year<1966?name('Bechuanaland','贝专纳'):name('Botswana','博茨瓦纳');
  case 572:return year<2018?name('Swaziland','斯威士兰'):name('Eswatini','埃斯瓦蒂尼');
  case 625:return year<1956?name('Anglo-Egyptian Sudan','英埃苏丹'):name('Sudan','苏丹');
  case 630:return year<1935?name('Persia','波斯'):name('Iran','伊朗');
  case 678:return year<1990?name('North Yemen','北也门'):name('Yemen','也门');
  case 680:return name('South Yemen','南也门');
  case 343:return year<1993?name('Macedonia','马其顿'):year<2019?name('Macedonia · UN provisional name FYROM','马其顿 · 联合国暂称“前南斯拉夫马其顿共和国”'):name('North Macedonia','北马其顿');
  default:return p.name;
 }
}
const cached=new WeakMap();
export function selectCshapesAt(data,year){
 if(!Number.isInteger(year)||year<CSHAPES_RANGE.start||year>CSHAPES_RANGE.end||!Array.isArray(data?.features))return [];
 let years=cached.get(data);if(!years){years=new Map();cached.set(data,years);}if(years.has(year))return years.get(year);
 const key=year*10000+1231,selected=[];
 for(const f of data.features){const p=f.properties;if(p.validFromKey>key||p.validToKey<key)continue;
  const extra=p.gwcode===365?RUSSIA:[255,260,265].includes(p.gwcode)?GERMANY:NAMES;
  selected.push({...f,properties:{...p,name:cshapesNameAt(f,year),selectedDate:`${year}-12-31`,annualConvention:'December 31',sources:[...p.sources,{title:'Historical identity and name chronology',url:extra,publisher:extra===NAMES?'UK Permanent Committee on Geographical Names':extra===RUSSIA?'US Department of State':'German Federal Government',checkedAt:'2026-10-23',evidenceNote:'Selected political identity transitions and historical labels; geometry and period validity remain CShapes source coding.'},{title:'UN Treaty Collection: historical names and state succession',url:TREATIES,publisher:'United Nations',checkedAt:'2026-10-23',evidenceNote:'Name-change and state-succession notes; not evidence of every historical frontier.'}]}});
 }
 years.set(year,selected);return selected;
}
export function cshapesReadout(year,lang='en'){
 return lang==='zh'?`${year}年12月31日 · CShapes法理边界参考（含属地）`:`31 Dec ${year} · CShapes de jure boundary reference (including dependencies)`;
}
