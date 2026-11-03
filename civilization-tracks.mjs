const museum=(path,title)=>({
 title,publisher:'The Metropolitan Museum of Art',
 url:'https://www.metmuseum.org/toah/ht/'+path+'.html'
});
const egyptEarly=museum('02/afe','Egypt, 8000–2000 B.C.');
const egyptBronze=museum('03/afe','Egypt, 2000–1000 B.C.');
const egyptLate=museum('04/afe','Egypt, 1000 B.C.–1 A.D.');
const egyptThird={title:'Egypt in the Third Intermediate Period',publisher:'The Metropolitan Museum of Art',url:'https://www.metmuseum.org/essays/egypt-in-the-third-intermediate-period-1070-712-b-c'};
const mesoEarly=museum('02/wam','Mesopotamia, 8000–2000 B.C.');
const mesoBronze=museum('03/wam','Mesopotamia, 2000–1000 B.C.');
const mesoLate=museum('04/wam','Mesopotamia, 1000 B.C.–1 A.D.');
const japanEarly=museum('06/eaj','Japan, 500–1000 A.D.');
const japanMedieval=museum('07/eaj','Japan, 1000–1400 A.D.');
const japanWarring=museum('08/eaj','Japan, 1400–1600 A.D.');
const japanEdo=museum('09/eaj','Japan, 1600–1800 A.D.');

function track(id,region,en,zh,approximate,rows){
 return {id,region,name:{en,zh},periods:rows.map(([slug,start,end,en,zh,source,...relatedIds])=>({
  id:'period-'+id+'-'+slug,region,start,end,title:{en,zh},kind:'reading-period',source,approximate,relatedIds
 }))};
}
export const civilizationTracks=[
 track('egypt','africa','Ancient Egypt','古埃及',true,[
  ['old-kingdom',-2649,-2151,'Old Kingdom','古王国',egyptEarly],
  ['first-intermediate',-2150,-2031,'First Intermediate Period','第一中间期',egyptEarly,'egypt-theban-reunification'],
  ['middle-kingdom',-2030,-1641,'Middle Kingdom','中王国',egyptBronze,'egypt-middle-kingdom','egypt-theban-reunification'],
  ['second-intermediate',-1640,-1551,'Second Intermediate Period','第二中间期',egyptBronze,'egypt-ahmose-reunification'],
  ['new-kingdom',-1550,-1071,'New Kingdom','新王国',egyptBronze,'egypt-new-kingdom','egypt-ahmose-reunification'],
  ['third-intermediate',-1070,-664,'Third Intermediate Period','第三中间期',egyptThird,'egypt-piye-campaign'],
  ['late-period',-663,-333,'Late Period','晚期',egyptLate],
  ['macedonian',-332,-306,'Macedonian rule','马其顿统治',egyptLate,'ptolemaic-egypt'],
  ['ptolemaic',-305,-30,'Ptolemaic Egypt','托勒密埃及',egyptLate,'ptolemaic-egypt']
 ]),
 track('mesopotamia','west-central-asia','Ancient Mesopotamia','古代美索不达米亚',true,[
  ['city-states',-2900,-2351,'Early city-states','早期城邦',mesoEarly,'mesopotamia-city-rivalry'],
  ['akkad',-2350,-2151,'Akkadian Empire','阿卡德帝国',mesoEarly,'akkadian-empire','mesopotamia-city-rivalry'],
  ['post-akkad',-2150,-2113,'After Akkad','阿卡德之后',mesoEarly,'akkadian-empire'],
  ['ur-iii',-2112,-2005,'Third Dynasty of Ur','乌尔第三王朝',mesoEarly],
  ['amorite-kingdoms',-2004,-1793,'Regional kingdoms','地区诸王国',mesoBronze,'mesopotamia-babylon-assur'],
  ['babylon-assyria',-1792,-1596,'Old Babylon and Assyria','古巴比伦与古亚述',mesoBronze,'old-babylon','mesopotamia-babylon-assur'],
  ['late-bronze',-1595,-1201,'Late Bronze Age kingdoms','青铜时代晚期诸王国',mesoBronze],
  ['iron-transition',-1200,-912,'Transition to the Iron Age','向铁器时代过渡',mesoBronze],
  ['neo-assyria',-911,-627,'Neo-Assyrian expansion','新亚述扩张',mesoLate,'neo-assyria'],
  ['neo-babylon',-626,-539,'Neo-Babylonian ascendancy','新巴比伦崛起',mesoLate,'neo-babylonian-empire','neo-assyria','cyrus-babylon-cylinder']
 ]),
 track('japan','east-asia','Japan','日本',false,[
  ['asuka',538,709,'Asuka','飞鸟时代',japanEarly,'asuka-court-buddhist-institutions'],
  ['nara',710,793,'Nara','奈良时代',japanEarly,'nara-court-government','nara-heijo-capital'],
  ['heian',794,1184,'Heian','平安时代',japanMedieval,'heian-court'],
  ['kamakura',1185,1332,'Kamakura','镰仓时代',japanMedieval,'kamakura-shogunate'],
  ['kenmu',1333,1335,'Kenmu transition','建武过渡期',japanMedieval,'kamakura-shogunate','muromachi-shogunate'],
  ['muromachi',1336,1572,'Muromachi','室町时代',japanWarring,'muromachi-shogunate','japan-onin-war'],
  ['momoyama',1573,1602,'Azuchi–Momoyama','安土桃山时代',japanWarring,'japan-onin-war','japan-tokugawa-domains'],
  ['edo',1603,1867,'Edo','江户时代',japanEdo,'tokugawa-shogunate-political-order','japan-tokugawa-domains','meiji-restoration'],
  ['meiji-to-war',1868,1946,'Meiji to early Shōwa','明治至昭和前期',museum('10/eaj','Japan, 1800–1900 A.D.'),'meiji-restoration','second-world-war','japan-postwar-constitution'],
  ['postwar',1947,2026,'Postwar constitutional era','战后宪政时期',null,'japan-postwar-polity','japan-postwar-constitution']
 ])
];

export const civilizationOverlaps={
 'period-egypt-third-intermediate':{
  source:egyptThird,
  note:{en:'Dynasty numbers can conceal concurrent centers of power. Kush expanded from Napata while multiple Egyptian rulers governed parts of the Nile valley and Delta.',zh:'王朝编号容易掩盖多个权力中心并立的局面。库施自纳帕塔向北扩张之际，埃及各地统治者仍掌管尼罗河谷和三角洲的部分地区。'},
  rows:[
   {title:{en:'Egyptian courts',zh:'埃及诸政权'},periods:[[-830,-730,'Delta and Theban rivals','三角洲与底比斯政权']]},
   {title:{en:'Kush',zh:'库施'},periods:[[-750,-663,'Kushite expansion and rule in Egypt','库施在埃及的扩张与统治']]}
  ]
 },
 'period-egypt-second-intermediate':{
  source:egyptBronze,
  note:{en:'The Fifteenth Dynasty ruled from the eastern Delta while Theban rulers held power in the south. The Kerma kingdom was a separate Nubian power.',zh:'第十五王朝以尼罗河三角洲东部为中心，底比斯统治者则掌握南方。努比亚的科尔马王国是独立的政治力量。'},
  rows:[
   {title:{en:'Egypt',zh:'埃及'},periods:[[-1640,-1550,'Competing Delta and Theban courts','三角洲与底比斯诸政权']]},
   {title:{en:'Nubia',zh:'努比亚'},periods:[[-2050,-1500,'Middle and Classical Kerma','科尔马中期与古典期']]}
  ]
 },
 'period-mesopotamia-babylon-assyria':{
  source:mesoBronze,
  rows:[
   {title:{en:'Northern Mesopotamia',zh:'美索不达米亚北部'},periods:[[-2000,-1600,'Old Assyrian period','古亚述时期']]},
   {title:{en:'Southern Mesopotamia',zh:'美索不达米亚南部'},periods:[[-2000,-1600,'Old Babylonian period','古巴比伦时期']]}
  ]
 },
 'period-mesopotamia-neo-babylon':{
  source:mesoLate,
  note:{en:'The Babylonian rise overlapped the last years of Assyrian rule. The fall of Nineveh in 612 BCE and the end of Assyrian resistance were separate events.',zh:'巴比伦的兴起与亚述统治的最后几年重叠。公元前612年尼尼微陷落，亚述的抵抗在其后才告终。'},
  rows:[
   {title:{en:'Assyria',zh:'亚述'},periods:[[-911,-609,'Neo-Assyrian period','新亚述时期']]},
   {title:{en:'Babylonia',zh:'巴比伦尼亚'},periods:[[-626,-539,'Neo-Babylonian Empire','新巴比伦帝国']]}
  ]
 },
 'period-japan-muromachi':{
  source:japanWarring,
  note:{en:'Ashikaga shoguns remained in office as regional warlords competed for power. The Sengoku era began within the Muromachi period.',zh:'地方大名争夺权力时，足利将军仍在位。战国时代始于室町时代之内。'},
  rows:[
   {title:{en:'Shogunate',zh:'幕府'},periods:[[1336,1573,'Ashikaga shogunate','足利幕府']]},
   {title:{en:'Regional conflict',zh:'地方冲突'},periods:[[1467,1573,'Sengoku begins under the Ashikaga','足利幕府时期进入战国时代']]}
  ]
 }
};
civilizationOverlaps['period-egypt-new-kingdom']=civilizationOverlaps['period-egypt-second-intermediate'];
