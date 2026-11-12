// Original teaching schematics. These are not counted as historical-image evidence.
const b=(en,zh)=>({en,zh});
export const KNOWLEDGE_GRAPHICS=[
 {recordId:'human-genome-project-completion',type:'genome',source:'https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project',sourceTitle:b('NHGRI · Human Genome Project','NHGRI · 人类基因组计划'),title:b('What did “complete” mean in 2003?','2003年的“完成”意味着什么？'),description:b('About 92% of the genome was sequenced. Sequence gaps and the diversity of the reference are separate questions.','当时测得约92%的基因组序列。序列缺口与参考人群的多样性是两个不同问题。'),steps:[
  {title:b('The project reached its goals','计划达成目标'),text:b('The 2003 reference greatly improved the earlier draft and became a shared research resource.','2003年参考序列大幅改进早期草稿，成为共享研究资源。')},
  {title:b('Some sequence gaps remained','序列仍有缺口'),text:b('Complex and repetitive regions were difficult to read with the available methods. Later sequencing filled these gaps.','复杂、重复的区域难以用当时的方法读取，后续测序逐步补齐缺口。')},
  {title:b('Whose variation does a reference represent?','参考序列涵盖了谁的差异？'),text:b('The reference combined DNA from a small group of donors. Filling sequence gaps is different from representing variation across people.','参考序列组合了少数捐献者的DNA。补齐序列缺口，与涵盖人群之间的差异并不是同一件事。')} ]},
 {recordId:'athenian-assembly-citizenship',type:'assembly',source:'https://www.ime.gr/chronos/05/en/politics/321assembly.html',sourceTitle:b('Foundation of the Hellenic World · Assembly','希腊世界基金会 · 公民大会'),title:b('Who could take part? Who could get there?','谁有资格，谁能到场？'),description:b('Classical Athens: political eligibility and practical attendance were different limits on participation.','古典雅典：政治资格与实际到场，是参与政治的两种不同限制。'),steps:[
  {title:b('Eligibility depended on civic status','参会资格取决于公民身份'),text:b('Adult male citizens needed full civic rights. The 451 BCE rule required citizen parentage on both sides; some offences could remove civic rights.','成年男性公民须具备完整公民权。前451年的规则要求父母双方具有公民身份，某些违法行为也会导致公民权丧失。')},
  {title:b('A right did not guarantee attendance','有资格未必能到场'),text:b('Campaign service and travel from the countryside could keep citizens from meetings.','出征服役与从乡间赶往会场的路程，会妨碍公民参会。')},
  {title:b('The assembly made public decisions','大会作出公共决策'),text:b('Participants considered war, peace, alliances and other public affairs. Women, resident foreigners and enslaved people remained excluded.','参会者讨论战争、和平、联盟及其他公共事务。妇女、外来定居者与被奴役者仍被排除。')} ]}
];
export function knowledgeGraphicFor(record){
 const item=KNOWLEDGE_GRAPHICS.find(x=>x.recordId===record?.id);
 return item&&record.sources?.some(s=>s.url===item.source)?item:null;
}
export function renderKnowledgeGraphic(record,language,escape){
 const item=knowledgeGraphicFor(record);if(!item)return '';
 const lang=language==='zh'?'zh':'en',L=v=>escape(v[lang]),t=(en,zh)=>escape(lang==='zh'?zh:en);
 let visual='';
 if(item.type==='genome')visual=`<figure class="knowledge-figure"><div class="genome-grid" aria-hidden="true">${Array.from({length:100},(_,i)=>`<span class="${i<92?'genome-covered':'genome-gap'}"></span>`).join('')}</div><figcaption><strong>${t('≈92% sequenced','约92%已测序')}</strong><span>${t('≈8% remaining','约8%仍待完成')}</span></figcaption><p class="knowledge-scale">${t('Approximate coverage, not chromosome positions.','覆盖率示意，非染色体位置图。')}</p></figure>`;
 if(item.type==='assembly')visual=`<div class="assembly-schematic"><div class="assembly-status"><div class="assembly-path"><div class="assembly-eligible"><strong>${t('Adult male citizens','成年男性公民')}</strong><span>${t('Full civic rights','完整公民权')}</span></div><div class="assembly-route"><span aria-hidden="true">↓</span><strong>${t('Can attend this meeting?','能否参加这次会议？')}</strong><span>${t('Travel and military service affected attendance','路程与服役影响到场')}</span><span aria-hidden="true">↓</span><strong>${t('Deliberation and decisions','讨论与决策')}</strong></div></div><div class="assembly-excluded"><strong>${t('Outside the franchise','无参会资格')}</strong><span>${t('Women · resident foreigners · enslaved people','妇女 · 外来定居者 · 被奴役者')}</span></div></div><p class="knowledge-scale">${t('Categories are not population proportions.','分类示意，不表示人口比例。')}</p></div>`;
 return `<section class="knowledge-graphic knowledge-${item.type}" aria-label="${L(item.title)}"><p class="knowledge-badge">${t('Modern explanatory graphic','现代说明图')}</p><h3>${L(item.title)}</h3><p>${L(item.description)}</p>${visual}<div class="knowledge-questions">${item.steps.map(s=>`<details><summary>${L(s.title)}</summary><p>${L(s.text)}</p></details>`).join('')}</div><a class="knowledge-source" href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">${L(item.sourceTitle)} ↗</a></section>`;
}
