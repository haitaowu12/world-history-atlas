// Acceptance uses the real static app, local media and the runner's Chrome.
// No test library or image host is added to the application runtime.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {CONTENT_MANIFEST} from '../dist/content-expansion.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.resolve(process.env.ATLAS_BROWSER_OUTPUT||path.join(root,'browser-evidence'));
fs.mkdirSync(output,{recursive:true});
const modulePath=process.env.ATLAS_PLAYWRIGHT_PATH;
const {chromium}=await import(modulePath?pathToFileURL(modulePath).href:'playwright-core');
const server=spawn('python3',['scripts/serve.py','--port','8080'],{cwd:root,stdio:['ignore','ignore','pipe']});
let serverError='';server.stderr.on('data',data=>{serverError+=data;});
const base='http://127.0.0.1:8080/';
let browser;
const evidence={startedAt:new Date().toISOString(),checks:[],browser:null};
const read=file=>JSON.parse(fs.readFileSync(path.join(root,'dist/data',file),'utf8'));
const manifest=read(CONTENT_MANIFEST);
const media=read(manifest.mediaFile||'history-media.json');
const priorCourses=new Set(read(read(manifest.baseline.manifest).coursesFile).map(course=>course.id));
const readings=read(manifest.coursesFile).filter(course=>!priorCourses.has(course.id));
const personIds=new Set(['people.json',...manifest.files.map(file=>file.file)].flatMap(read).filter(record=>record.kind==='person').map(record=>record.id));
const mark=(name,details={})=>{evidence.checks.push({name,status:'passed',...details});console.log('PASS '+name);};

try{
  let ready=false;
  for(let attempt=0;attempt<100;attempt++){
    try{if((await fetch(base)).ok){ready=true;break;}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  assert.ok(ready,'Static server failed: '+serverError.slice(-1000));
  browser=await chromium.launch(process.env.ATLAS_CHROME_EXECUTABLE?{executablePath:process.env.ATLAS_CHROME_EXECUTABLE}:{channel:'chrome'});
  evidence.browser=await browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await context.tracing.start({screenshots:true,snapshots:true,sources:true});
  const page=await context.newPage(),errors=[],unexpected=[];
  page.on('pageerror',error=>errors.push(String(error)));
  page.on('response',response=>{if(response.status()>=400)unexpected.push({url:response.url(),status:response.status()});});
  const loaded=()=>page.waitForFunction(()=>!!window.atlasAPI,{},{timeout:90000});
  const goto=async hash=>{
    if(await page.locator('#dialog[open]').count())await page.locator('#dialog [data-action="close-dialog"]').click();
    const query=new URLSearchParams(hash.slice(1));
    const reading=readings.find(row=>row.id===query.get('reading'));
    const id=query.get('entry')||reading?.recordIds[Number(query.get('step')||0)]||null;
    await page.goto(base+hash);await loaded();
    await page.waitForFunction(({lang,id,year})=>document.documentElement.lang===lang&&(!id||document.querySelector('#detail [data-action="save"]')?.dataset.id===id)&&(!year||window.atlasAPI.inspect().year===year),{lang:query.get('lang')==='zh'?'zh-CN':'en',id,year:reading?null:Number(query.get('year'))});
  };
  const imageLoaded=async selector=>{
    const element=page.locator(selector).first();await element.scrollIntoViewIfNeeded();
    await page.waitForFunction(selector=>{const image=document.querySelector(selector);return image?.complete&&image.naturalWidth>0;},selector);
  };

  let resumeInitialLoad;
  const initialLoad=new Promise(resolve=>{resumeInitialLoad=resolve;});
  await page.route('**/data/history.json?*',async route=>{
    await initialLoad;
    await route.continue();
  },{times:1});
  await page.goto(base+'#year=1200&lang=en',{waitUntil:'domcontentloaded'});
  try{
    assert.equal(await page.locator('#atlas-load-status').isVisible(),true);
    const readingsNav=page.locator('#journeys-nav');
    const bounds=await readingsNav.boundingBox();
    await page.mouse.click(bounds.x+bounds.width/2,bounds.y+bounds.height/2);
    assert.equal(await page.locator('#dialog').isVisible(),false);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('id'),'project-author');
  }finally{resumeInitialLoad();}
  await loaded();
  assert.equal(await page.locator('#atlas-load-status').isVisible(),false);
  assert.equal(await page.getByRole('button',{name:'Readings',exact:true}).isVisible(),true);
  assert.equal(await page.evaluate(()=>window.atlasAPI.version),manifest.version);
  assert.equal(await page.locator('.fatal').count(),0);
  mark('Application starts with the selected content release',{version:manifest.version});

  // Decode every distributed file; a successful HTTP response is insufficient.
  const imageResults=await page.evaluate(async items=>Promise.all(items.map(item=>new Promise(resolve=>{
    const image=new Image();image.onload=()=>resolve({id:item.id,width:image.naturalWidth,height:image.naturalHeight});
    image.onerror=()=>resolve({id:item.id,error:true});image.src='./'+item.file;
  }))),media.items);
  for(const item of media.items){const result=imageResults.find(row=>row.id===item.id);assert.deepEqual([result.width,result.height],[item.width,item.height],item.id+' decodes at declared dimensions');}
  mark('Every local historical image decodes at its declared dimensions',{images:imageResults.length});

  await page.locator('#people-nav').click();
  await page.locator('#discovery-portraits').focus();await page.keyboard.press('Space');
  assert.equal(await page.locator('#discovery-portraits').isChecked(),true);
  const portraitCount=new Set(media.items.filter(item=>item.kind==='portrait').flatMap(item=>item.recordIds).filter(id=>personIds.has(id))).size;
  assert.equal(await page.locator('.discovery-card').count(),portraitCount);
  assert.ok(await page.locator('.media-catalogue-note').innerText().then(text=>text.includes('later')));
  await page.screenshot({path:path.join(output,'desktop-people.png')});
  await page.locator('[data-action="discovery-person"][data-id="person-harriet-tubman"]').click();
  await imageLoaded('#dialog-content .history-figure img');
  const tubman=media.items.find(item=>item.id==='harriet-tubman');
  assert.equal(await page.locator('#dialog-content .history-image-credit a').first().getAttribute('href'),tubman.sourceUrl);
  assert.ok((await page.locator('#dialog-content').innerText()).includes(tubman.creator));
  await page.locator('[data-action="discovery-back"]').click();
  assert.equal(await page.locator('#discovery-portraits').isChecked(),true);
  assert.equal(await page.locator('.discovery-card').count(),portraitCount);
  mark('Keyboard portrait filter, credited profile and return state work',{portraits:portraitCount});

  await page.locator('#discovery-portraits').uncheck();
  const directoryCards=page.locator('#discovery-results .discovery-card');
  const firstBatch=await directoryCards.count();
  await page.locator('[data-action="discovery-more"]').click();
  const card=directoryCards.nth(firstBatch+4);
  const cardId=await card.getAttribute('data-id');
  const expandedCount=await directoryCards.count();
  await card.scrollIntoViewIfNeeded();
  const directoryScroll=()=>page.locator('#dialog').evaluate(dialog=>dialog.scrollTop);
  const savedScroll=await directoryScroll();
  await card.click();
  await page.locator('[data-action="discovery-back"]').click();
  assert.equal(await directoryCards.count(),expandedCount);
  assert.equal(await page.locator('#discovery-results :focus').getAttribute('data-id'),cardId);
  assert.ok(Math.abs(await directoryScroll()-savedScroll)<2);
  mark('Returning from an expanded directory profile restores the card and scroll position');

  // Read a Chinese manuscript as a story, with its image date separate from 1082.
  await goto('#year=1082&entry=china-su-shi-cold-food-1082&lang=en');
  await imageLoaded('#detail .history-figure img');
  assert.match(await page.locator('#detail h2').innerText(),/Cold Food/);
  assert.match(await page.locator('#detail .history-image-interpretation').innerText(),/1082|later|after/i);
  await page.locator('#detail').screenshot({path:path.join(output,'desktop-manuscript.png')});
  await page.locator('#language').click();
  await page.waitForFunction(()=>document.documentElement.lang==='zh-CN'&&!document.querySelector('#language').disabled);
  assert.match(await page.locator('#detail h2').innerText(),/寒食/);
  const chineseAlt=await page.locator('#detail .history-figure img').getAttribute('alt');assert.match(chineseAlt,/[\u3400-\u9fff]/);
  assert.match(await page.locator('#detail .history-image-credit').innerText(),/馆藏|来源/);
  mark('Story image, chronology caveat and source credits switch between English and Chinese');

  // Discover the new story using a reader-facing search, then preserve notebook data.
  await goto('#year=1200&lang=en');
  await page.evaluate(()=>localStorage.setItem('world-history-atlas-notebook-v1',JSON.stringify({version:1,saved:['tang-dynasty'],notes:{'tang-dynasty':'Existing reader note'}})));
  await page.reload();await loaded();
  await page.locator('#browse-stories').click();await page.locator('#mode-all').click();
  await page.locator('#search').fill('copper deal');
  await page.locator('#stories [data-id="ur-copper-complaint-tablet"]').click();
  assert.match(await page.locator('#detail h2').innerText(),/copper deal/i);
  await page.locator('#detail [data-action="save"]').click();
  const notebook=await page.evaluate(()=>JSON.parse(localStorage.getItem('world-history-atlas-notebook-v1')));
  assert.ok(notebook.saved.includes('tang-dynasty'));assert.ok(notebook.saved.includes('ur-copper-complaint-tablet'));assert.equal(notebook.notes['tang-dynasty'],'Existing reader note');
  await page.reload();await loaded();assert.match(await page.locator('#detail h2').innerText(),/copper deal/i);
  mark('New story search, saved-entry preservation and shared-link reload work');

  // Follow every stop added by the selected release through its public URL.
  for(const reading of readings){
    for(const [step,id] of reading.recordIds.entries()){
      await goto('#lang=en&reading='+reading.id+'&step='+step);
      assert.equal(await page.locator('#detail [data-action="save"]').getAttribute('data-id'),id,reading.id+'/'+step);
      const query=new URLSearchParams(new URL(page.url()).hash.slice(1));assert.equal(query.get('reading'),reading.id);
    }
  }
  await page.locator('#journeys-nav').click();await page.locator('#reading-query').fill('surviving words');
  assert.equal(await page.locator('#reading-results [data-id="course-anshi-witnesses"]').count(),1);
  mark('All new guided-reading stops and the reading search resolve',{readings:readings.length,stops:readings.reduce((sum,r)=>sum+r.recordIds.length,0)});

  await page.setViewportSize({width:375,height:812});
  await page.locator('#reading-results [data-id="course-anshi-witnesses"]').click();
  await page.locator('#dialog [data-action="start-journey"]').click();
  const next=page.locator('#journey-strip [data-action="journey-next"]');
  await next.focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#journey-strip [aria-current="step"]').getAttribute('data-index'),'1');
  assert.equal(await page.locator('#journey-strip :focus').getAttribute('data-action'),'journey-next');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#detail [data-action="save"]').getAttribute('data-id'),'china-du-fu-spring-view-757');
  mark('A filtered reading opens on the first click and supports consecutive keyboard steps on a phone');

  await goto('#year=1082&entry=china-su-shi-cold-food-1082&lang=zh');
  await imageLoaded('#detail .history-figure img');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Mobile page must not overflow horizontally');
  const bounds=await page.locator('#detail .history-figure').boundingBox();assert.ok(bounds.width<=375&&bounds.x>=-1&&bounds.x+bounds.width<=376);
  await page.locator('#detail .history-figure').screenshot({path:path.join(output,'mobile-manuscript.png')});
  await goto('#year=1450&entry=inka-imperial-tunic-story&lang=en');
  await imageLoaded('#detail .history-figure img');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
  await page.locator('#detail').screenshot({path:path.join(output,'mobile-object-story.png')});
  mark('Narrow bilingual manuscript and object stories fit a 375px viewport');
  assert.deepEqual(errors,[]);assert.deepEqual(unexpected,[]);
  mark('Normal browsing has no page exceptions or failed HTTP responses');
  await context.tracing.stop({path:path.join(output,'normal-browsing-trace.zip')});
  await context.close();

  const failureContext=await browser.newContext({viewport:{width:375,height:812},reducedMotion:'reduce'});
  const failurePage=await failureContext.newPage();
  await failurePage.route('**/'+tubman.file,route=>route.abort());
  await failurePage.goto(base+'#year=1863&entry=person-harriet-tubman&lang=en');
  await failurePage.waitForFunction(()=>!!window.atlasAPI,{},{timeout:90000});
  await failurePage.locator('#detail .history-image-link').scrollIntoViewIfNeeded();
  await failurePage.locator('#detail .history-image-fallback').waitFor({state:'visible'});
  assert.match(await failurePage.locator('#detail h2').innerText(),/Tubman/);
  assert.equal(await failurePage.locator('#detail .history-image-credit a').first().getAttribute('href'),tubman.sourceUrl);
  assert.equal(await failurePage.locator('#detail .history-image-link').getAttribute('href'),tubman.sourceUrl);
  assert.match(await failurePage.locator('#detail .history-image-link').getAttribute('aria-label'),/collection record/);
  assert.ok(await failurePage.locator('#detail .detail-body').innerText().then(text=>text.length>50));
  await failurePage.locator('#detail .history-figure').screenshot({path:path.join(output,'mobile-image-fallback.png')});
  mark('A failed image leaves the biography, caption and attribution accessible');
  await failureContext.close();

  const missingContext=await browser.newContext();const missingPage=await missingContext.newPage();
  await missingPage.route(url=>url.pathname==='/data/history-media.json',route=>route.fulfill({status:503,body:'Unavailable'}));
  await missingPage.goto(base+'#year=755&lang=en');await missingPage.waitForFunction(()=>!!window.atlasAPI,{},{timeout:90000});
  await missingPage.locator('#people-nav').click();
  assert.match(await missingPage.locator('.media-catalogue-note').innerText(),/could not load/);
  assert.equal(await missingPage.locator('#discovery-portraits').isDisabled(),true);
  assert.ok(await missingPage.locator('.discovery-card').count()>0);
  mark('An unavailable image catalogue does not prevent reading the atlas');

  await missingPage.route('**/data/history.json?*',route=>route.abort(),{times:1});
  await missingPage.reload();
  const retry=missingPage.locator('#retry-load');
  await retry.waitFor({state:'visible'});
  assert.match(await missingPage.locator('#atlas-load-status').innerText(),/Unable to load/);
  await retry.click();
  await missingPage.waitForFunction(()=>!!window.atlasAPI,{},{timeout:90000});
  assert.equal(await retry.isVisible(),false);
  mark('A failed startup exposes a reload action and recovers when the data is available');
  await missingContext.close();
  evidence.status='passed';
}catch(error){
  evidence.status='failed';evidence.error=String(error.stack||error);console.error(error);
  if(browser)for(const [i,context] of browser.contexts().entries())for(const [j,page] of context.pages().entries()){
    await page.screenshot({path:path.join(output,`failure-${i}-${j}.png`)}).catch(()=>{});
    fs.writeFileSync(path.join(output,`failure-${i}-${j}.html`),await page.content().catch(()=>''));
  }
  process.exitCode=1;
}finally{
  evidence.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(output,'acceptance.json'),JSON.stringify(evidence,null,2)+'\n');
  await browser?.close();server.kill();
}
