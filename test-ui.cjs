// Run with the local preview open. Uses the bundled Playwright, no installation.
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/Lester/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {words,sentenceBank,completionBank,questionBank,intruderBank,storyBank,reasoningBank}=require('./dist/data.js');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   if(!localStorage.getItem('a-mi-ritmo-preferences'))localStorage.setItem('a-mi-ritmo-preferences',JSON.stringify({voice:'',voiceVersion:1}));
   window.speechLog=[];window.fakeVoices=[{name:'Español Chile',lang:'es-CL',voiceURI:'cl',localService:true},{name:'Español Natural',lang:'es-MX',voiceURI:'mx',localService:false},{name:'English',lang:'en-US',voiceURI:'en'}];
   window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
   const synth=new EventTarget();synth.getVoices=()=>window.fakeVoices;synth.cancel=()=>{};synth.speak=u=>window.speechLog.push({text:u.text,voice:u.voice?.voiceURI,lang:u.lang,rate:u.rate});
   Object.defineProperty(window,'speechSynthesis',{value:synth,configurable:true});
  });
  const go=async(route,level)=>{const url=(process.env.TEST_URL||'http://127.0.0.1:4173')+'/#'+route;if(page.url()===url)await page.reload();else await page.goto(url);if(await page.locator('#entry').isVisible())await page.locator('[data-action="start"]').click();if(level)await page.locator('[data-level]').selectOption(String(level));};
  const answer=async id=>page.locator(`[data-answer="${id}"]`).click();
  await page.goto((process.env.TEST_URL||'http://127.0.0.1:4173')+'/#comunicar');
  assert(await page.locator('#app-shell').isHidden());assert.equal(await page.evaluate(()=>speechLog.length),0);
  await page.screenshot({path:'../tmp/max-entry.png',fullPage:true});
  await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>speechLog.at(-1).text),'Hola Max');
  assert(await page.locator('#entry').isHidden());assert.equal(await page.locator('.activity-card').count(),12);
  assert.equal(await page.locator('[href="#comunicar"]').count(),0);assert((await page.title()).includes('Max estudia'));
  await page.locator('#sound-toggle').click();
  await go('inicio');assert.equal(await page.locator('.activity-card').count(),12);
  assert.equal(await page.evaluate(()=>settings.victoryVolume),.65);
  await go('razonar',4);assert.equal(await page.locator('.activity-card').count(),3);
  console.log('OK: entrada obligatoria, saludo por clic, nombre, nivel 4 y sección de razonamiento');
  await go('completar',1);
  await answer('zapatos');assert(await page.locator('#victory-popup').isHidden());
  await answer('agua');assert.equal(await page.locator('#victory-title').textContent(),'¡Excelente!');assert(await page.locator('#victory-popup').isVisible());
  assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'victory-next');
  await page.screenshot({path:'../tmp/victoria.png',fullPage:false,animations:'disabled'});
  await page.locator('[data-action="victory-next"]').click();assert(await page.locator('#victory-popup').isHidden());
  await answer('duerme');assert.equal(await page.locator('#victory-title').textContent(),'¡Increíble!');
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'../tmp/victoria-mobile.png',fullPage:false,animations:'disabled'});
  assert(await page.evaluate(()=>{const r=document.getElementById('victory-popup').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight;}));
  await page.keyboard.press('Escape');assert(await page.locator('#victory-popup').isHidden());assert(await page.locator('[data-action="next"]').isVisible());
  await page.setViewportSize({width:1440,height:1000});
  console.log('OK: felicitaciones variadas, silencio, foco, Escape y popup móvil');
  if(process.env.VICTORY_ONLY==='1')return;
  for(const level of (process.env.TEST_LEVELS==='none'?[]:(process.env.TEST_LEVELS||'1,2,3,4').split(',').map(Number))){
   await go('clasificar',level);assert.equal(await page.locator('[data-piece]').count(),level===1?2:level===2?6:level===3?12:16);
   assert.equal(await page.locator('[data-target]').count(),Math.min(level+1,4));
   await go('secuencia',level);assert.equal(await page.locator('[data-piece]').count(),level===1?2:level===2?4:level===3?5:7);
   if(level===4){
    for(let i=0;i<7;i++){await page.locator(`[data-piece="${i}"]`).click();await page.locator(`[data-target="${i}"]`).click();}
    assert(await page.locator('#victory-popup').isVisible());
    await go('puzle',4);assert.equal(await page.locator('[data-piece]').count(),16);
    for(let i=0;i<16;i++){await page.locator(`[data-piece="${i}"]`).click();await page.locator(`[data-target="${i}"]`).click();}
    assert(await page.locator('#victory-popup').isVisible());
   }
   for(const game of ['patrones','pistas','soluciones']){
    await go(game,level);
    for(const q of reasoningBank(game,level)){
     const wrong=await page.locator('[data-answer]').evaluateAll((nodes,correct)=>nodes.find(n=>n.dataset.answer!==correct).dataset.answer,q.answer);
     await answer(wrong);assert(await page.locator('#victory-popup').isHidden());
     await page.locator('[data-action="hint"]').click();await answer(q.answer);
     assert.equal(await page.locator('#feedback').textContent(),q.model);await page.locator('[data-action="victory-next"]').click();
    }
   }
   await go('ordenar',level);
   for(const sentence of sentenceBank(level)){
    for(let target=0;target<sentence.tokens.length;target++){
     const ids=await page.locator('[data-piece]').evaluateAll(nodes=>nodes.map(n=>n.dataset.piece));
     // Choose the last matching duplicate so identical words can swap positions.
     const id=ids.filter(id=>sentence.tokens[id]===sentence.tokens[target]).at(-1);
     await page.locator(`[data-piece="${id}"]`).click();await page.locator(`[data-target="${target}"]`).click();
    }
    assert.equal(await page.locator('#feedback').textContent(),sentence.text+'.');
    await page.locator('[data-action="victory-next"]').click();
   }
   await go('completar',level);
   for(const q of completionBank(level)){
    const wrong=await page.locator('[data-answer]').evaluateAll((nodes,correct)=>nodes.find(n=>n.dataset.answer!==correct).dataset.answer,q.answer);
    await page.locator(`[data-answer="${wrong}"]`).click();assert.equal(await page.locator('[data-action="next"]').count(),0);
    await page.locator('[data-action="hint"]').click();await answer(q.answer);await page.locator('[data-action="victory-next"]').click();
   }
   await go('historias',level);
   for(const story of storyBank(level))for(const q of story.questions){assert(await page.getByRole('heading',{name:story.title,exact:true}).isVisible());await answer(q[1]);await page.locator('[data-action="victory-next"]').click();}
   await go('intruso',level);for(const q of intruderBank(level)){await page.locator(`[data-answer="${q.answer}"]`).click();await page.locator('[data-action="victory-next"]').click();}
   await go('preguntas',level);for(const q of questionBank(level)){await page.locator(`[data-answer="${q.preference?q.ids[0]:q.answer}"]`).click();await page.locator('[data-action="victory-next"]').click();}
   console.log('OK: nivel '+level+', todas las oraciones, frases, cuentos y preguntas');
  }
  await go('frases',3);await page.locator('[data-prefix="Necesito"]').click();await page.locator('[data-piece="ayuda"]').click();
  await page.locator('[data-detail="ahora"]').click();await page.locator('[data-detail="en casa"]').click();await page.locator('[data-action="say-sentence"]').click();
  assert.equal(await page.locator('#feedback').textContent(),'Necesito ayuda ahora en casa');
  await go('puzle',3);assert.equal(await page.locator('[data-piece]').count(),12);assert.equal(await page.locator('.puzzle-tray .tile span').count(),0);
  await page.locator('#sound-toggle').click();
  for(let i=0;i<12;i++){await page.locator(`[data-piece="${i}"]`).click();await page.locator(`[data-target="${i}"]`).click();}
  await page.waitForFunction(()=>narrationAudio?.currentSrc.includes('fanfare-')&&narrationAudio.currentTime>0);
  await page.waitForFunction(()=>speechLog.at(-1)?.text.includes('¡La imagen está completa!'));
  assert.equal(await page.evaluate(()=>speechLog.at(-1).voice),'mx');
  console.log('OK: 12 piezas, fanfarria grabada y voz posterior');
  await page.locator('[data-action="settings"]').first().click();
  await page.selectOption('#voice-select','cl');await page.selectOption('#speech-rate','0.95');
  await page.locator('[data-action="preview-voice"]').click();assert.equal(await page.evaluate(()=>speechLog.at(-1).voice),'cl');assert.equal(await page.evaluate(()=>speechLog.at(-1).rate),.95);
  await page.evaluate(()=>{fakeVoices.push({name:'Nueva',lang:'es-ES',voiceURI:'new',localService:true});speechSynthesis.dispatchEvent(new Event('voiceschanged'));});
  assert.equal(await page.locator('#voice-select').inputValue(),'cl');assert.equal(await page.locator('#voice-select option[value="new"]').count(),1);
  await page.locator('[name="victory"]').uncheck();await page.getByRole('button',{name:'Guardar ajustes'}).click();
  await go('completar');await answer(completionBank(3)[0].answer);assert(await page.evaluate(()=>!narrationAudio||narrationAudio.paused));assert.equal(await page.evaluate(()=>speechLog.at(-1).voice),'cl');
  // Enabling celebrations again, then pausing, must cancel pending speech.
  await page.locator('[data-action="settings"]').first().click();await page.locator('[name="victory"]').check();await page.getByRole('button',{name:'Guardar ajustes'}).click();
  await page.evaluate(()=>speechLog.length=0);await answer(completionBank(3)[0].answer);await page.locator('[data-action="pause"]').first().click();
  await page.waitForTimeout(1900);assert.equal(await page.evaluate(()=>speechLog.length),0);assert(await page.evaluate(()=>!narrationAudio||narrationAudio.paused));await page.keyboard.press('Escape');
  await page.locator('#sound-toggle').click();await go('completar');await page.evaluate(()=>speechLog.length=0);await answer(completionBank(3)[0].answer);
  assert(await page.evaluate(()=>!narrationAudio||narrationAudio.paused));assert.equal(await page.evaluate(()=>speechLog.length),0);
  console.log('OK: selección de voz, carga tardía, silencio, desactivar victoria y pausa');
  for(const width of [390,768,1440]){
   await page.setViewportSize({width,height:950});
   for(const route of ['inicio','ordenar','completar','historias','puzle','frases','razonar','patrones','pistas','soluciones']){await go(route,4);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+route+' '+width);}
  }
  await page.setViewportSize({width:390,height:844});await go('ordenar',3);await page.screenshot({path:'../tmp/oraciones-mobile.png',fullPage:true});
  for(const route of ['ordenar','completar','historias','frases']){await go(route,3);await page.evaluate(()=>document.documentElement.style.fontSize='200%');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'texto ampliado '+route);}
  await page.setViewportSize({width:1440,height:1000});await go('inicio');await page.evaluate(()=>document.documentElement.style.fontSize='');await page.screenshot({path:'../tmp/new-home.png',fullPage:true});await go('puzle',3);await page.screenshot({path:'../tmp/puzzle12.png',fullPage:true});
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const touch=await context.newPage();
  await touch.goto((process.env.TEST_URL||'http://127.0.0.1:4173')+'/#ordenar');assert(await touch.locator('#app-shell').isHidden());await touch.locator('#start-sound').uncheck();await touch.locator('[data-action="start"]').click();await touch.locator('[data-level]').selectOption('1');
  await touch.locator('.word-slots').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-170));
  const from=await touch.locator('[data-piece="0"]').boundingBox(),to=await touch.locator('[data-target="0"]').boundingBox();const cdp=await context.newCDPSession(touch);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:from.x+from.width/2,y:from.y+from.height/2}]});
  for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:from.x+from.width/2+(to.x+to.width/2-from.x-from.width/2)*i/8,y:from.y+from.height/2+(to.y+to.height/2-from.y-from.height/2)*i/8}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.equal(await touch.locator('[data-piece="0"]').count(),0);
  console.log('OK: arrastre táctil de palabras y texto al 200 %');
  await page.evaluate(()=>localStorage.setItem('a-mi-ritmo-preferences',JSON.stringify({level:3,sound:false,victoryVolume:.35})));
  await page.reload();assert(await page.locator('#entry').isVisible());
  assert.equal(await page.evaluate(()=>settings.victoryVolume),.65);assert.equal(await page.locator('#start-sound').isChecked(),false);
  await page.locator('[data-action="start"]').click();
  await page.locator('[data-action="settings"]').first().click();await page.selectOption('#victory-volume','1');await page.getByRole('button',{name:'Guardar ajustes'}).click();
  await page.reload();assert.equal(await page.evaluate(()=>settings.victoryVolume),1);
  console.log('OK: volumen anterior actualizado, silencio conservado y volumen Alto persistente');
  assert.deepEqual(errors,[]);console.log('OK: mensajes largos, móvil, recursos y cero errores de ejecución');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
