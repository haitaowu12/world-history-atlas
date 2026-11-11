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

export function imageTimeLayers(item){
 const sequence=IMAGE_TIME_LAYERS.find(row=>row.assetId===item?.id);
 return sequence&&sequence.expectedDate===item.date?sequence:null;
}
export function renderImageTimeLayers(item,language,escape){
 const sequence=imageTimeLayers(item);if(!sequence)return '';
 const lang=language==='zh'?'zh':'en',label=(en,zh)=>lang==='zh'?zh:en;
 return `<section class="image-time-layers" aria-label="${label('Dates behind this image','图像背后的年代')}"><h3>${label('Dates behind this image','图像背后的年代')}</h3><p>${escape(sequence.question[lang])}</p><ol>${sequence.stages.map(stage=>`<li><details><summary><span class="image-time-date">${escape(stage.date[lang])}</span><strong>${escape(stage.title[lang])}</strong></summary><p>${escape(stage.note[lang])}</p></details></li>`).join('')}</ol></section>`;
}
