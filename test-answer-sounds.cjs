const assert=require('node:assert/strict');
const {chromium,webkit}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/Lester/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await(process.env.TEST_BROWSER==='webkit'?webkit:chromium).launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:375,height:667},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[],cancel(){},speak(){}}});
   window.playLog=[];window.endedAudio=[];window.players=new Set();const play=HTMLMediaElement.prototype.play;
   HTMLMediaElement.prototype.play=function(){if(!players.has(this))this.addEventListener('ended',()=>endedAudio.push(this.getAttribute('src')),true);players.add(this);playLog.push(this.getAttribute('src'));return play.call(this);};
  });
  const url=(process.env.TEST_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
  await page.goto(url+'/#completar');await page.locator('[data-action="start"]').tap();await page.locator('[data-level]').selectOption('1');
  const go=async id=>{if(await page.evaluate(id=>route===id,id))await page.locator('[data-action="reset"]').tap();else{await page.evaluate(id=>{location.hash=id;},id);await page.waitForFunction(id=>route===id,id);}await page.evaluate(()=>{stopSpeech();playLog=[];endedAudio=[];});};
  const tapAnswer=async id=>page.locator(`[data-answer=${JSON.stringify(id)}]`).tap();
  for(const id of ['completar','estudio-sustantivos']){
   await go(id);const answers=await page.evaluate(()=>{const q=state.q||state.question;return {right:q.answer,wrong:state.ids.find(id=>id!==q.answer)};});
   await tapAnswer(answers.wrong);await page.waitForFunction(()=>endedAudio.includes('assets/ui-retry.wav'));
   assert.deepEqual(await page.evaluate(()=>playLog),['assets/ui-option.wav','assets/ui-retry.wav']);assert.equal(await page.evaluate(()=>state.done),false);
   await page.evaluate(()=>{playLog=[];endedAudio=[];});await tapAnswer(answers.right);
   await page.waitForFunction(()=>playLog.some(src=>src.includes('fanfare-')));
   assert.deepEqual(await page.evaluate(()=>playLog.slice(0,3)),['assets/ui-option.wav','assets/ui-correct.wav','assets/fanfare-65.wav']);
  }
  await go('estudio-cifras');await page.locator('#study-answer').fill('999');await page.locator('#study-answer-form button').tap();await page.waitForFunction(()=>endedAudio.includes('assets/ui-retry.wav'));
  await go('estudio-abaco');await page.locator('[data-study="check-abacus"]').tap();await page.waitForFunction(()=>endedAudio.includes('assets/ui-retry.wav'));
  await go('estudio-oraciones');await page.locator('[data-piece="0"]').tap();await page.locator('[data-target="1"]').tap();await page.waitForFunction(()=>endedAudio.includes('assets/ui-retry.wav'));
  await page.locator('[data-action="hint"]').tap();await page.waitForFunction(()=>endedAudio.includes('assets/ui-hint.wav'));
  await page.locator('[data-action="reset"]').tap();await page.waitForFunction(()=>endedAudio.includes('assets/ui-clear.wav'));
  // Turning off the fanfare keeps the short success effect; silence cancels the entire chain.
  await go('estudio-sustantivos');await page.evaluate(()=>{settings.victory=false;});await tapAnswer(await page.evaluate(()=>state.q.answer));
  await page.waitForFunction(()=>endedAudio.includes('assets/ui-correct.wav'));assert(!await page.evaluate(()=>playLog.some(src=>src.includes('fanfare-'))));
  await page.locator('#sound-toggle').tap();const count=await page.evaluate(()=>playLog.length);await page.waitForTimeout(2500);assert.equal(await page.evaluate(()=>playLog.length),count);
  for(const mode of ['mute','effects','calm']){
   await go('estudio-sustantivos');await page.evaluate(mode=>{settings.sound=mode!=='mute';settings.effects=mode!=='effects';settings.calm=mode==='calm';},mode);
   await tapAnswer(await page.evaluate(()=>state.ids.find(id=>id!==state.q.answer)));assert.equal(await page.evaluate(()=>playLog.length),0);
  }
  assert.equal(await page.evaluate(()=>players.size),1);assert.deepEqual(errors,[]);
  console.log('OK: opciones, aciertos, reintentos en ambos catálogos, escritura, ábaco, orden, ayuda, borrar, silencio y reproductor único.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
