const assert=require('node:assert/strict');
const {chromium,webkit}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/Lester/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await (process.env.TEST_BROWSER==='webkit'?webkit:chromium).launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   // Model the reported case: media voice works, but the separate Web Audio path cannot start.
   window.AudioContext=window.webkitAudioContext=class{constructor(){throw Error('Web Audio blocked');}};
   window.audioPlayers=new Set();window.playLog=[];
   const play=HTMLMediaElement.prototype.play;
   HTMLMediaElement.prototype.play=function(){audioPlayers.add(this);playLog.push(this.getAttribute('src'));return play.call(this);};
  });
  const url=(process.env.TEST_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
  await page.goto(url+'/#ordenar');await page.locator('[data-action="start"]').tap();
  await page.waitForFunction(()=>narrationAudio?.currentTime>0);
  await page.locator('[data-level]').selectOption('1');
  for(let i=0;i<3;i++){
   await page.locator(`[data-piece="${i}"]`).tap();await page.locator(`[data-target="${i}"]`).tap();
  }
  await page.waitForFunction(()=>narrationAudio?.currentSrc.includes('fanfare-65.wav')&&narrationAudio.currentTime>0,{},{timeout:2500});
  assert.equal(await page.evaluate(()=>audioPlayers.size),1);
  await page.waitForFunction(()=>narrationAudio.currentSrc.endsWith(RECORDED_VOICE.files['el perro duerme'])&&narrationAudio.currentTime>0);
  await page.locator('[data-action="victory-close"]').first().tap();
  await page.locator('[data-action="settings"]:visible').tap();
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
  assert.deepEqual(errors,[]);
  console.log('OK: celebración táctil sin Web Audio, mismo reproductor, tres volúmenes, voz posterior y silencio sin reanudación.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
