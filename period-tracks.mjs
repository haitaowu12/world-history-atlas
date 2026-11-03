// These are reading periods, not territorial claims. At transitions the
// incoming period owns the display year; the linked readings give exact dates.
const china = [
 ['shang',-1600,-1047,'Shang','商','shang-kingship-and-evidence'],
 ['western-zhou',-1046,-771,'Western Zhou','西周','zhou-dynasty'],
 ['eastern-zhou',-770,-404,'Eastern Zhou','东周','zhou-dynasty'],
 ['warring',-403,-222,'Warring States','战国','zhou-dynasty'],
 ['qin',-221,-207,'Qin','秦','qin-unification'],
 ['qin-han',-206,-203,'Qin–Han transition','秦汉之际','qin-unification','han-dynasty'],
 ['western-han',-202,8,'Western Han','西汉','han-dynasty','china-salt-iron-debate-81bce'],
 ['xin',9,23,'Xin','新','han-dynasty'],
 ['han-restoration',24,24,'Han restoration','汉室恢复','han-dynasty'],
 ['eastern-han',25,219,'Eastern Han','东汉','han-dynasty'],
 ['three-kingdoms',220,264,'Three Kingdoms','三国','western-jin-dynasty'],
 ['western-jin',265,316,'Western Jin','西晋','western-jin-dynasty'],
 ['eastern-jin',317,419,'Eastern Jin & northern kingdoms','东晋与北方诸国','eastern-jin-dynasty','northern-wei-dynasty'],
 ['north-south',420,580,'Northern & Southern Dynasties','南北朝','liu-song-dynasty','northern-wei-dynasty','chen-dynasty'],
 ['sui',581,617,'Sui','隋','sui-reunification','chen-dynasty'],
 ['early-tang',618,689,'Tang','唐','tang-dynasty'],
 ['wu-zhou',690,704,'Wu Zhou','武周','wu-zhou-dynasty'],
 ['later-tang',705,906,'Tang restored','唐朝恢复','tang-dynasty','wu-zhou-dynasty','china-fengtian-refuge-783'],
 ['five-dynasties',907,959,'Five Dynasties & Ten Kingdoms','五代十国','liao-dynasty','china-chu-jingnan-927','china-classics-printing-932'],
 ['northern-song',960,1126,'Northern Song','北宋','northern-song','liao-dynasty','western-xia-dynasty'],
 ['southern-song',1127,1278,'Southern Song','南宋','southern-song','jurchen-jin-dynasty','western-xia-dynasty'],
 ['yuan',1279,1367,'Yuan','元','yuan-dynasty','southern-song'],
 ['ming',1368,1643,'Ming','明','ming-dynasty'],
 ['qing',1644,1911,'Qing','清','qing-dynasty','ming-dynasty'],
 ['republican',1912,1948,'Republican era','民国时期','qing-dynasty','second-world-war'],
 ['prc',1949,2026,'People’s Republic of China','中华人民共和国','prc-political-period']
];
export const chinaPeriods = china.map(([id,start,end,en,zh,...relatedIds])=>({
 id:'period-china-'+id,start,end,title:{en,zh},region:'east-asia',kind:'reading-period',relatedIds
}));

// Explicit associations prevent a modern place label from implying succession.
export const periodTracks = [
 {id:'china',region:'east-asia',name:{en:'China',zh:'中国'},periods:chinaPeriods},
 {id:'korea',region:'east-asia',name:{en:'Korea',zh:'朝鲜半岛'},ids:['goguryeo-consolidated-kingdom','baekje-regional-kingdom','silla-early-kingdom','later-silla-political-phase','goryeo-kingdom','joseon-kingdom']},
 {id:'japan',region:'east-asia',name:{en:'Japan',zh:'日本'},ids:['yamato-kofun-court','asuka-court-buddhist-institutions','nara-court-government','kamakura-shogunate','muromachi-shogunate','tokugawa-shogunate-political-order','japan-postwar-polity']},
 {id:'france',region:'europe',name:{en:'France',zh:'法国'},ids:['merovingian-dynasty','carolingian-dynasty','capetian-dynasty','france-fifth-republic']},
 {id:'india',region:'south-asia',name:{en:'India',zh:'印度'},ids:['maurya-empire','gupta-period','delhi-sultanate','mughal-empire','india-independent-polity']},
 {id:'usa',region:'north-america',name:{en:'United States',zh:'美国'},ids:['united-states-polity']},
 {id:'canada',region:'north-america',name:{en:'Canada',zh:'加拿大'},ids:['canada-polity']},
 {id:'brazil',region:'latin-america',name:{en:'Brazil',zh:'巴西'},ids:['brazil-independent-polity']},
 {id:'ghana',region:'africa',name:{en:'Ghana',zh:'加纳'},ids:['ghana-independent-polity']}
];

// Selected donor transitions are inherited chronology, not imported shapes.
export const chinaTransitionSource = {
 title:'Jiangshan: selected historical milestones',
 publisher:'Jiangshan / 江山',
 url:'https://github.com/DeanChensj/jiangshan-map/tree/f3bf25ac19c024d3c9e11eaa9810aa7b03076b8a'
};
export const chinaTransitions = {
 'period-china-qin':[
  [-209,'Uprisings challenged Qin rule and rival courts reappeared.','起事动摇秦朝统治，多个对立政权重新出现。'],
  [-207,'The battle of Julu was a turning point in the collapse of Qin power.','巨鹿之战是秦朝权力瓦解的转折点。']
 ],
 'period-china-qin-han':[
  [-206,'After Qin fell, Xiang Yu and Liu Bang competed for power.','秦朝覆亡后，项羽与刘邦争夺天下。'],
  [-202,'Liu Bang prevailed and established the Western Han imperial court.','刘邦获胜，建立西汉朝廷。']
 ],
 'period-china-han-restoration':[
  [23,'Liu Xuan, the Gengshi Emperor, was acclaimed by the Lülin forces amid the collapse of Xin.','新朝瓦解之际，绿林军拥立刘玄为更始帝。'],
  [24,'Liu Xiu built a separate military base north of the Yellow River.','刘秀在黄河以北发展独立的军事力量。'],
  [25,'Liu Xiu founded Eastern Han.','刘秀建立东汉。']
 ],
 'period-china-later-tang':[
  [783,'A military mutiny forced Emperor Dezong to flee Chang’an and take refuge at Fengtian.','泾原兵变迫使唐德宗离开长安，避往奉天。']
 ],
 'period-china-five-dynasties':[
  [907,'Later Liang replaced Tang in the north. Several other states governed in the south.','后梁在北方取代唐朝，南方则有多个政权并立。'],
  [927,'Ma Yin was invested as King of Chu. Chu and Jingnan occupied distinct positions along the middle Yangtze trade network.','马殷受封楚王。楚与荆南在长江中游的贸易网络中各居一方。'],
  [960,'The Song court succeeded Later Zhou in the north; the consolidation of other states took longer.','宋在北方取代后周，其他政权的归并则经历了更长时间。']
 ],
 'period-china-qing':[
  [1901,'The Boxer Protocol imposed an indemnity and other conditions on the Qing government.','《辛丑条约》规定清政府承担赔款及其他义务。']
 ],
 'period-china-republican':[
  [1912,'The Republic was inaugurated in January; the Qing emperor abdicated in February.','中华民国于一月成立，清帝于二月退位。']
 ],
 'period-china-western-han':[
  [-111,'Han forces conquered Nanyue.','汉军征服南越。'],
  [-110,'The donor chronology distinguishes Minyue and Hainan from the preceding year’s changes.','江山的分期将闽越与海南的变化与前一年区分开来。'],
  [-109,'The donor chronology marks the establishment of Yizhou Commandery in the southwest.','江山的分期将西南地区设置益州郡列为这一年的变化。'],
  [-108,'Han defeated Wiman Joseon and established commanderies.','汉朝击败卫满朝鲜并设置郡县。']
 ]
};

const dividedChinaCourts = {
 source: {
  title:'China, 500–1000 A.D.',
  publisher:'The Metropolitan Museum of Art',
  url:'https://www.metmuseum.org/toah/ht/06/eac.html'
 },
 rows: [
  {title:{en:'Northern courts',zh:'北朝'},periods:[
   [386,534,'Northern Wei','北魏'],[534,550,'Eastern Wei','东魏'],
   [535,557,'Western Wei','西魏'],[550,577,'Northern Qi','北齐'],
   [557,581,'Northern Zhou','北周'],[581,618,'Sui','隋']
  ]},
  {title:{en:'Southern courts',zh:'南朝'},periods:[
   [420,479,'Liu Song','刘宋'],[479,502,'Southern Qi','南齐'],
   [502,557,'Liang','梁'],[557,589,'Chen','陈']
  ]}
 ]
};

export const chinaCourtSequences = {
 'period-china-eastern-jin':dividedChinaCourts,
 'period-china-north-south':dividedChinaCourts,
 'period-china-sui':dividedChinaCourts,
 'period-china-five-dynasties':{
  source:chinaTransitionSource,
  rows:[{title:{en:'Northern succession',zh:'北方五代'},periods:[
   [907,922,'Later Liang','后梁'],[923,935,'Later Tang','后唐'],
   [936,946,'Later Jin','后晋'],[947,950,'Later Han','后汉'],[951,959,'Later Zhou','后周']
  ]}]
 }
};
