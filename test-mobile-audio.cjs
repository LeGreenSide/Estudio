const assert=require('node:assert/strict');
const {chromium,webkit}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/Lester/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await (process.env.TEST_BROWSER==='webkit'?webkit:chromium).launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:375,height:667},isMobile:true,hasTouch:true});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(legacy=>{
   // Safari 15 exposes speech methods, but no EventTarget/voiceschanged support.
   if(legacy)Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
    getVoices:()=>[{name:'Español Chile',lang:'es-CL',voiceURI:'cl',localService:true}],cancel(){},speak(){}
   }});
   // Model the reported case: media voice works, but the separate Web Audio path cannot start.
   window.AudioContext=window.webkitAudioContext=class{constructor(){throw Error('Web Audio blocked');}};
   window.audioPlayers=new Set();window.playLog=[];window.endedAudio=[];
   const play=HTMLMediaElement.prototype.play;
   HTMLMediaElement.prototype.play=function(){if(!audioPlayers.has(this))this.addEventListener('ended',()=>endedAudio.push(this.getAttribute('src')),true);audioPlayers.add(this);playLog.push(this.getAttribute('src'));return play.call(this);};
  },process.env.LEGACY_SPEECH==='1');
  const url=(process.env.TEST_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
  await page.goto(url+'/#ordenar');assert.deepEqual(errors,[],'La carga debe terminar antes de pulsar Iniciar');
  await page.locator('[data-action="start"]').tap();assert(await page.locator('#entry').isHidden());
  await page.waitForFunction(()=>narrationAudio?.currentTime>0);
  await page.locator('[data-level]').selectOption('1');
  await page.locator('[data-piece="0"]').tap();
  await page.waitForFunction(()=>endedAudio.includes('assets/ui-pick.wav'));
  await page.waitForFunction(()=>narrationAudio.currentSrc.endsWith(RECORDED_VOICE.files.el));
  await page.locator('[data-target="0"]').tap();
  await page.waitForFunction(()=>endedAudio.includes('assets/ui-place.wav'));
  for(let i=1;i<3;i++){
   await page.locator(`[data-piece="${i}"]`).tap();await page.locator(`[data-target="${i}"]`).tap();
  }
  await page.waitForFunction(()=>narrationAudio?.currentSrc.includes('fanfare-65.wav')&&narrationAudio.currentTime>0,{},{timeout:2500});
  assert.equal(await page.evaluate(()=>audioPlayers.size),1);
  await page.waitForFunction(()=>narrationAudio.currentSrc.endsWith(RECORDED_VOICE.files['el perro duerme'])&&narrationAudio.currentTime>0);
  await page.locator('[data-action="victory-close"]').first().tap();
  await page.locator('[data-action="settings"]:visible').tap();
  if(process.env.LEGACY_SPEECH==='1')assert.equal(await page.locator('#voice-select option[value="cl"]').count(),1);
  for(const [value,file] of [['0.25','25'],['0.65','65'],['1','100']]){
   await page.selectOption('#victory-volume',value);await page.locator('[data-action="preview-victory"]').tap();
   await page.waitForFunction(file=>narrationAudio.currentSrc.includes('fanfare-'+file+'.wav')&&narrationAudio.currentTime>0,file);
  }
  await page.locator('[data-action="close"]').tap();
  await page.waitForFunction(()=>narrationAudio.paused);
  await page.locator('[data-action="next"]').tap();
  for(let i=0;i<3;i++){await page.locator(`[data-piece="${i}"]`).tap();await page.locator(`[data-target="${i}"]`).tap();}
  await page.waitForFunction(()=>narrationAudio.currentSrc.includes('fanfare-')&&narrationAudio.currentTime>0);
  await page.locator('#sound-toggle').tap();const count=await page.evaluate(()=>playLog.length);
  await page.waitForTimeout(1900);assert.equal(await page.evaluate(()=>playLog.length),count);assert(await page.evaluate(()=>narrationAudio.paused));
  await page.goto(url+'/#inicio');await page.reload();assert.equal(await page.locator('#start-sound').isChecked(),false);
  await page.locator('[data-action="start"]').tap();assert(await page.locator('#entry').isHidden());
  assert.equal(await page.locator('.activity-card').count(),12);assert.equal(await page.evaluate(()=>playLog.length),0);
  await page.locator('[data-action="settings"]:visible').tap();await page.locator('[name="effects"]').uncheck();await page.getByRole('button',{name:'Guardar ajustes'}).tap();
  await page.reload();assert.equal(await page.evaluate(()=>settings.effects),false);
  const silentModes=await page.evaluate(()=>{
   settings.sound=true;playEffect('tick');const disabled=playLog.length;
   settings.effects=true;settings.calm=true;playEffect('tick');const calm=playLog.length;
   settings.calm=false;settings.sound=false;playEffect('tick');return [disabled,calm,playLog.length];
  });assert.deepEqual(silentModes,[0,0,0]);
  assert.deepEqual(errors,[]);
  console.log('OK: celebración táctil sin Web Audio, mismo reproductor, tres volúmenes, voz posterior y silencio sin reanudación.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
