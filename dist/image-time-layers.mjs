// Selected objects whose creation, copying or later additions have distinct dates.
// Every stage comes from the already reviewed item caption, not inferred image content.
const b=(en,zh)=>({en,zh});
export const IMAGE_TIME_LAYERS=[
 {assetId:'china-batch-10-guoxi-early-spring',expectedDate:'1072; imperial poem added in 1759',question:b('Which parts of this object belong to the Song dynasty?','这件作品的哪些部分属于宋代？'),stages:[
  {date:b('1072','1072年'),title:b('Guo Xi paints Early Spring','郭熙画《早春图》'),note:b('The painter signs and dates the landscape. Follow the paths, trees and mist into his mountain world.','画家为山水署款纪年。循着路径、树木与烟岚，进入他营造的山间世界。')},
  {date:b('1759','1759年'),title:b('Qianlong adds a poem','乾隆加题御诗'),note:b('The writing at upper right belongs to a Qing imperial reader, centuries after the painting. One surface preserves more than one period.','右上的文字出自数百年后清代帝王的观看与题咏。同一画面保留了不同时代的痕迹。')}]},
 {assetId:'china-batch-10-wenzhengming-drunken-pavilion',expectedDate:'1551, seventh lunar month, day 24; copies an essay of 1046',question:b('When was the text written, and when was this copy made?','文章何时写成，这份抄本又出自何时？'),stages:[
  {date:b('1046','1046年'),title:b('Ouyang Xiu writes the essay','欧阳修作《醉翁亭记》'),note:b('The Drunken Pavilion essay belongs to Ouyang Xiu’s time in Chuzhou. Its words continued to circulate long after that local setting changed.','《醉翁亭记》出于欧阳修任职滁州之时。此后，文章随着阅读与抄写持续流传。')},
  {date:b('1551 · lunar month 7, day 24','1551年 · 农历七月二十四日'),title:b('Wen Zhengming copies it','文徵明书写抄本'),note:b('The displayed calligraphy is Wen’s dated transcription. It lets us study a Ming reader’s encounter with a Song text.','图中的书法是文徵明署有日期的抄本，可由此观察明代读者如何书写宋代文章。')}]},
 {assetId:'world-batch-12-waitangi-account',expectedDate:'1890',question:b('How much later was this account published?','这份记述比签署晚了多久？'),stages:[
  {date:b('1840','1840年'),title:b('The Treaty of Waitangi is signed','怀唐伊条约签署'),note:b('The linked story compares the Māori and English texts and the differing understandings of authority.','关联条目对照毛利文与英文文本，并讨论对权威的不同理解。')},
  {date:b('1890','1890年'),title:b('Colenso publishes his account','科伦索出版记述'),note:b('Fifty years later, this cover announces Colenso’s history and its treaty texts. Read the account as a later publication with its own perspective.','五十年后，这张封面宣告科伦索的历史记述及所附条约文本出版。阅读时也可考察这一后来出版物自身的立场。')}]},
 {assetId:'world-batch-10-w6up2kpv',expectedDate:'Negative 1865; print 1981',question:b('Which date belongs to the city view?','哪一个日期对应镜头中的城市？'),stages:[
  {date:b('1865','1865年'),title:b('Thomson makes the negative','汤姆森拍摄底片'),note:b('The river and temple roofs record the Bangkok seen by the camera in 1865.','河流与寺院屋顶记录的是1865年镜头中的曼谷。')},
  {date:b('1981','1981年'),title:b('This photographic print is made','此件照片印制'),note:b('The collection’s later print reproduces the earlier negative. Its printing date does not move the photographed scene into the twentieth century.','馆藏的这件后印照片复制早年底片；印制日期与镜头所见景象的年代并不相同。')}]},
 {assetId:'charles-darwin',expectedDate:'Photograph c. 1868; print 1875',question:b('What is dated: the sitting or the surviving print?','日期指拍摄，还是留存下来的照片印件？'),stages:[
  {date:b('About 1868','约1868年'),title:b('Cameron photographs Darwin','卡梅伦为达尔文拍摄肖像'),note:b('The sitting is dated approximately. Darwin’s pose and appearance belong to this photographic encounter.','拍摄时间为约数。达尔文的姿态与面貌来自这一次肖像拍摄。')},
  {date:b('1875','1875年'),title:b('The carbon print is made','制作碳素照片'),note:b('The collection dates this print to 1875. A photograph can have separate histories of exposure and printing.','馆藏将这件印品定为1875年。照片的曝光拍摄与印制，可以有各自的时间。')}]},
 {assetId:'china-batch-10-qin-measure-rubbing',expectedDate:'Rubbing undated; reproduces an edict of 221 BCE',question:b('Which date is known, and which remains unrecorded?','哪一个日期已知，哪一个尚未记载？'),stages:[
  {date:b('221 BCE','公元前221年'),title:b('An edict unifies measures','诏书统一度量衡'),note:b('The forty-character inscription orders inconsistent measures to be unified. This is the dated text reproduced by the rubbing.','四十字铭文命令统一不一致的度量衡。这是拓片所复制的、有纪年的文字。')},
  {date:b('Date unrecorded','拓制年代未载'),title:b('The inscription is copied onto paper','铭文拓印到纸上'),note:b('The surviving paper impression carries the inscription and vessel outline. Its making is not dated to 221 BCE by the museum.','留存的纸本拓影呈现铭文及量器轮廓。博物馆并未将拓片的制作年代定为公元前221年。')}]},
 {assetId:'world-batch-12-tupou-portrait',expectedDate:'26 July 1884',question:b('Does the portrait show the moment of constitutional change?','这幅肖像拍摄于颁布宪法之时吗？'),stages:[
  {date:b('1875','1875年'),title:b('Tonga adopts a constitution','汤加颁布宪法'),note:b('The linked story explores how constitutional institutions reshaped government under George Tupou I.','关联条目讨论宪法制度如何改造乔治·图普一世统治下的治理方式。')},
  {date:b('26 July 1884','1884年7月26日'),title:b('Burton photographs the king','伯顿为国王拍摄肖像'),note:b('The later portrait shows the same ruler. The chair, cane and formal coat belong to this photographic sitting rather than a pictured proclamation ceremony.','这幅后来的照片呈现同一位君主。椅子、手杖与正式外衣属于此次拍摄场景，并不是所摄的颁宪仪式。')}]}
];
IMAGE_TIME_LAYERS.push(
 {assetId:'world-batch-16-christine',expectedDate:'Text, frames and initials c. 1470; frames and miniatures c. 1515–1520',question:b('When were the words composed, copied and illuminated?','文章何时写成，何时抄录，又何时绘饰？'),stages:[
  {date:b('About 1404–1405','约1404—1405年'),title:b('Christine composes The City of Ladies','克里斯蒂娜创作《女性之城》'),note:b('The work answers hostile representations of women through an allegorical city populated by exemplary figures.','作品通过由典范人物组成的寓言城市，回应对女性的敌意描写。')},
  {date:b('About 1470','约1470年'),title:b('The surviving copy takes shape','留存至今的抄本形成'),note:b('The manuscript combines works by Boccaccio and Christine. Its text, early frames and initials belong to this copying stage.','手稿合编薄伽丘与克里斯蒂娜的作品，文字、早期边框与首字母属于这一抄写阶段。')},
  {date:b('About 1515–1520','约1515—1520年'),title:b('Artists add the miniatures','画家增添小画'),note:b('Étienne Colaud and the Master of François de Rohan supply the later illumination. The image of a reader and three women belongs to the book’s sixteenth-century life.','艾蒂安·科洛与弗朗索瓦·德·罗昂大师提供后添绘饰。读者与三位女子的图像，属于这部书在十六世纪的新阶段。')}]},
 {assetId:'getty-images-02-charlemagne',expectedDate:'1840',question:b('Which date belongs to the coronation, and which to its image?','哪个年份属于加冕，哪个属于这幅画？'),stages:[
  {date:b('800','800年'),title:b('Charlemagne is crowned in Rome','查理曼在罗马加冕'),note:b('Pope Leo III crowns Charlemagne emperor. The linked story follows the political claims surrounding this ceremony.','教宗利奥三世为查理曼加冕为皇帝。关联故事讨论这一仪式所涉及的政治主张。')},
  {date:b('1840','1840年'),title:b('Schnorr prepares a royal-palace fresco','施诺尔为王宫壁画作预备画'),note:b('This drawing was made for a commission by Ludwig I of Bavaria. The medieval event becomes a subject for nineteenth-century royal patronage.','此画为巴伐利亚路德维希一世的委托而作。中世纪事件成为十九世纪王室赞助的绘画题材。')}]},
 {assetId:'getty-images-02-plague',expectedDate:'about 1735',question:b('How does a later painting remember an epidemic?','后来的绘画如何追忆一场疫病？'),stages:[
  {date:b('1348','1348年'),title:b('Tolomei cares for people in Siena','托洛梅伊在锡耶纳照护病患'),note:b('The museum recounts his return to Siena during the Black Death and his death in the same year.','博物馆记述他在黑死病期间返回锡耶纳，并于同年去世。')},
  {date:b('About 1735','约1735年'),title:b('Crespi paints the devotional scene','克雷斯皮绘制宗教画'),note:b('The copper-panel painting gives the earlier crisis a dramatic arrangement of light, bodies and religious care. Its date follows the museum’s approximate catalogue attribution.','铜板画通过光线、人物身体与宗教照护，将早年的灾难组织为戏剧性场景。年代采用博物馆目录的约略断代。')}]}
);

IMAGE_TIME_LAYERS.push({assetId:'pacific-awm-c250563',expectedDate:'1946 (catalogue date; promulgation celebration)',question:b('What changed between promulgation and entry into force?','从公布到施行，宪法经历了哪些阶段？'),stages:[
 {date:b('1946','1946年'),title:b('A constitution is promulgated and celebrated','宪法公布与庆祝'),note:b('Japan’s constitution was promulgated on 3 November. The museum dates this photograph of the celebration to 1946 without specifying its day.','日本宪法于11月3日公布。博物馆将这幅庆祝活动照片标为1946年，未注明具体日期。')},
 {date:b('3 May 1947','1947年5月3日'),title:b('The constitution comes into force','宪法生效'),note:b('Elections and related laws prepared the new institutions. Popular sovereignty, fundamental rights and the emperor’s symbolic role now formed the constitutional framework.','选举与配套法律为新制度作准备。人民主权、基本权利及天皇的象征地位构成新的宪法框架。')}]
});

export function imageTimeLayers(item){
 const sequence=IMAGE_TIME_LAYERS.find(row=>row.assetId===item?.id);
 return sequence&&sequence.expectedDate===item.date?sequence:null;
}
export function renderImageTimeLayers(item,language,escape){
 const sequence=imageTimeLayers(item);if(!sequence)return '';
 const lang=language==='zh'?'zh':'en',label=(en,zh)=>lang==='zh'?zh:en;
 return `<section class="image-time-layers" aria-label="${label('Dates behind this image','图像背后的年代')}"><h3>${label('Dates behind this image','图像背后的年代')}</h3><p>${escape(sequence.question[lang])}</p><ol>${sequence.stages.map(stage=>`<li><details><summary><span class="image-time-date">${escape(stage.date[lang])}</span><strong>${escape(stage.title[lang])}</strong></summary><p>${escape(stage.note[lang])}</p></details></li>`).join('')}</ol></section>`;
}
