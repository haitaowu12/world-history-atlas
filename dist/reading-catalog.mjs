// Presentation only: stable course IDs, source records and stop order are retained.
const pair=(en,zh)=>({en,zh});
export const RECOMMENDED_READINGS=['course-regional-pacific-cultural-work','course-early-china-evidence','course-modern-map'];
export const READING_EDITS={
 'course-expansion-na3':{title:pair('United States and Canada: lives, work and rights','美国与加拿大：人生、劳动与权利'),summary:pair('Explore waterfront work, education, migration, public policy and community action in eight chapters. Read individual lives alongside the institutions and collective work around them.','分八章探索港口劳动、教育、迁徙、公共政策与社区行动，将个人经历与周围的制度及集体工作联系起来。')},
 'course-expansion-na2':{title:pair('North America: colonization, land and forced movement','北美：殖民、土地与强迫迁移'),summary:pair('Connect exchange and colonial claims with slavery, dispossession, education, treaties and cultural continuity. Compare the perspectives and limits of the surviving records.','将交流与殖民诉求同奴役、土地剥夺、教育、条约及文化延续联系起来，比较现存记录的视角与局限。')},
 'course-expansion-af4':{title:pair('Africa: colonial rule, liberation and public life','非洲：殖民统治、解放与公共生活'),summary:pair('Read resistance, land, citizenship, writing and development through selected African lives and communities, then examine conflict and peace-making.','通过精选的非洲人物与社群，阅读抵抗、土地、公民权、写作与发展，再考察冲突与和平建设。')},
 'course-expansion-oc3':{title:pair('Pacific societies: colonial power and self-government','太平洋社会：殖民权力与自治'),summary:pair('Follow labour, displacement, cultural work and political organizing across selected Pacific societies. Compare wartime experiences, land claims and paths to self-government.','阅读精选太平洋社会中的劳动、迁移、文化工作与政治组织，比较战时经历、土地诉求及走向自治的不同道路。')},
 'course-expansion-ea2':{title:pair('Japan: farming, courts and overseas exchange','日本：农业、宫廷与海外交流'),summary:pair('Follow Yayoi farming, early courts, Sei Shōnagon and Tokugawa exchange controls, with a comparison to Korean academies.','从弥生农业、早期宫廷、清少纳言读到德川时期的交流管制，并与朝鲜书院作比较。')},
 'course-expansion-ch1':{title:pair('China: archaeology, scholars and written evidence','中国：考古、学者与文字证据'),summary:pair('Compare material remains, biographies, inscriptions and later accounts. Ask what each kind of source can establish.','比较遗存、传记、碑铭与后世记述，考察不同来源各能支持哪些论断。')},
 'course-expansion-ch2':{title:pair('China: work, learning and regional lives','中国：劳作、学习与地方生活'),summary:pair('Read canals, Song households and markets, regional institutions and modern learning through the people and places in this collection.','通过本集中收录的人物与地点，阅读运河、宋代家庭与市场、地方制度及近现代学习生活。')},
 'course-expansion-ch3':{title:pair('China: water, infrastructure and historical accounts','中国：水利、设施与历史记述'),summary:pair('Compare inherited accounts with canals, capital water systems and cultivated landscapes. Distinguish a source display period from a construction date.','结合沿用的历史记述，比较运河、都城水系与耕作景观，区分来源显示时段与工程建造年代。')},
 'course-expansion-sa3':{title:pair('South Asia: education, livelihoods and public life','南亚：教育、生计与公共生活'),summary:pair('Connect educational and literary lives with plantation labour, water, citizenship and constitutional change across selected South Asian societies.','将教育与文学人生同种植园劳动、水资源、公民权及宪制变迁联系起来，阅读精选的南亚社会历史。')},
 'course-expansion-eu1':{title:pair('Europe: ancient societies and medieval connections','欧洲：古代社会与中世纪联系'),summary:pair('Move from citizenship and Roman rule to Christian communities, trading towns, pilgrimage, learning and later dynastic politics.','从公民参与与罗马统治，读到基督徒社群、贸易城镇、朝圣、学术与后来的王朝政治。')},
 'course-expansion-eu3':{title:pair('Modern Europe: work, rights, war and dissent','近现代欧洲：劳动、权利、战争与异议'),summary:pair('Read industrial labour, writing, scientific work, wartime networks and political movements alongside Europe’s wider global connections.','结合欧洲与世界的联系，阅读工业劳动、写作、科学工作、战时网络与政治运动。')}
};

// Each boundary names an existing stop, rather than a position that could drift.
// These are editorial chapters, not new historical periods or reconstructed routes.
const chapter=(id,start,en,zh)=>({id,start,title:pair(en,zh)});
export const READING_CHAPTERS={
 'course-expansion-na3':[
  chapter('communities','indigenous-north-america-nations-continuity','Communities, waterfronts and revolution','社群、港口与革命'),
  chapter('freedom','person-abraham-lincoln','Freedom, print and public testimony','自由、出版与公共见证'),
  chapter('education','camp-saxton-freedom-community','Emancipation, education and citizenship','解放、教育与公民权'),
  chapter('work','canadian-national-policy-tariffs-land','Migration, work and household livelihoods','迁徙、劳动与家庭生计'),
  chapter('knowledge','person-mungo-martin','Cultural work, science and public service','文化工作、科学与公共服务'),
  chapter('organizing','african-american-great-migration','Mobility, rights and collective action','流动、权利与集体行动'),
  chapter('state','new-deal-social-state','Public policy, wartime exclusion and rights','公共政策、战时排斥与权利'),
  chapter('continuities','person-terry-fox','Community action and living traditions','社区行动与延续的传统')],
 'course-expansion-af4':[
  chapter('empire','freetown-atlantic-resettlement','Freedom, empire and resistance','自由、帝国与抵抗'),
  chapter('participation','person-leopold-senghor','Land, citizenship and decolonization','土地、公民权与非殖民化'),
  chapter('voices','person-desmond-tutu','Testimony, writing and public participation','见证、写作与公共参与'),
  chapter('futures','suez-crisis-1956','Development, conflict and peace','发展、冲突与和平')],
 'course-expansion-na2':[
  chapter('encounters','indigenous-north-america-nations-continuity','Exchange, alliances and colonial claims','交流、联盟与殖民诉求'),
  chapter('displacement','metacom-war-survival','Displacement, slavery and survival','迁徙、奴役与生存'),
  chapter('voice','person-john-a-macdonald','Print, education and political voice','出版、教育与政治表达'),
  chapter('land','navajo-long-walk-return','Land, treaties and coercive policy','土地、条约与强制政策'),
  chapter('continuity','kwakwakawakw-potlatch-repatriation','Cultural continuity, labour and exclusion','文化延续、劳动与排斥')],
 'course-expansion-oc3':[
  chapter('labour','queensland-south-sea-labour','Labour, land and island authority','劳动、土地与岛屿权威'),
  chapter('community','australia-federal-polity','Government, community work and colonial responsibility','政府、社区工作与殖民责任'),
  chapter('war','guadalcanal-island-war','War, cooperation and rights organizing','战争、合作与权利组织'),
  chapter('country','yirrkala-bark-petitions-v9','Country, language and public authority','土地、语言与公共权威'),
  chapter('self-government','person-michael-somare','Self-government, cultural institutions and regional futures','自治、文化机构与区域未来')],
 'course-expansion-eu3':[
  chapter('work','liverpool-slavery-port-infrastructure','Labour, rights and scientific work','劳动、权利与科学工作'),
  chapter('politics','frankfurt-national-assembly-1848','Political participation, empire and print','政治参与、帝国与出版'),
  chapter('war','person-lise-meitner','Knowledge, care and wartime networks','知识、关怀与战时网络'),
  chapter('cold-war','cold-war-world-history','Cold War connections, migration and dissent','冷战联系、迁徙与异议')]
};

export function chaptersFor(course){
 const definitions=READING_CHAPTERS[course.id]||[],stops=course.recordIds||course.stops;
 return definitions.map((c,i)=>{const start=stops.indexOf(c.start),end=i+1<definitions.length?stops.indexOf(definitions[i+1].start):stops.length;
  if(start<0||end<=start||(i===0&&start!==0))throw Error('Invalid reading chapter: '+course.id+'/'+c.id);
  return {...c,start,end,estimatedMinutes:Math.max(1,Math.ceil((course.estimatedMinutes||stops.length*3)*(end-start)/stops.length))};
 });
}
export function readingRange(path,chapterId=''){
 const chapter=chaptersFor(path).find(c=>c.id===chapterId);
 return chapter||{id:'',start:0,end:(path.stops||path.recordIds).length};
}
const normalize=value=>String(value).normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
export function buildReadingCatalog(journeys,courses,byId){
 return [...journeys,...courses.map(c=>({...c,description:c.summary,stops:c.recordIds}))].map(path=>{
  const edit=READING_EDITS[path.id],reading={...path,...edit,description:edit?.summary||path.description};
  const rows=reading.stops.map(id=>byId.get(id)).filter(Boolean);
  return {...reading,chapters:chaptersFor(reading),regions:[...new Set(rows.map(r=>r.region))],themes:[...new Set(rows.map(r=>r.theme))],
   searchText:normalize([path.title.en,path.title.zh,reading.title.en,reading.title.zh,reading.description.en,reading.description.zh,...rows.flatMap(r=>[r.title.en,r.title.zh])].join(' '))};
 });
}
export function filterReadings(paths,{query='',region='all',theme='all',minutes='all'}={}){
 const terms=normalize(query).trim().split(/\s+/).filter(Boolean),limit=Number(minutes);
 return paths.filter(p=>(region==='all'||p.regions.includes(region))&&(theme==='all'||p.themes.includes(theme))&&
  (minutes==='all'||(p.estimatedMinutes>0&&p.estimatedMinutes<=limit))&&terms.every(term=>p.searchText.includes(term)));
}
