// Run with the local preview open. Covers the recorded voice and browser fallback.
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/Lester/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.speechLog=[];
   window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
   const synth=new EventTarget();synth.getVoices=()=>[];synth.cancel=()=>{};synth.speak=u=>speechLog.push(u.text);
   Object.defineProperty(window,'speechSynthesis',{value:synth,configurable:true});
  });
  const url=process.env.TEST_URL||'http://127.0.0.1:4173';
  await page.goto(url);
  assert.equal(await page.evaluate(()=>settings.voice),'recorded:catalina');
  await page.locator('[data-action="start"]').click();
  await page.waitForFunction(()=>narrationAudio?.currentTime>0);
  assert.equal(await page.evaluate(()=>speechLog.length),0);
  assert.equal(await page.evaluate(()=>narrationAudio.playbackRate),1);
  assert.equal(await page.evaluate(()=>narrationAudio.preservesPitch),true);
  await page.locator('[data-action="pause"]').click();
  assert(await page.evaluate(()=>narrationAudio.paused&&!narrationAudio.getAttribute('src')));
  await page.keyboard.press('Escape');
  await page.evaluate(()=>{settings.level=4;settings.choices=4;location.hash='historias';});
  await page.locator('[data-action="listen"]').click();await page.waitForFunction(()=>narrationAudio?.currentTime>0);
  await page.evaluate(()=>{location.hash='inicio';});
  await page.waitForFunction(()=>route==='inicio');assert(await page.evaluate(()=>narrationAudio.paused));
  await page.locator('[data-action="settings"]').first().click();
  assert.equal(await page.locator('#voice-select').inputValue(),'recorded:catalina');
  await page.selectOption('#speech-rate','0.85');await page.locator('[data-action="preview-voice"]').click();
  await page.waitForFunction(()=>narrationAudio?.currentTime>0);
  assert(Math.abs(await page.evaluate(()=>narrationAudio.playbackRate)-.85/.95)<.001);
  await page.getByRole('button',{name:'Guardar ajustes'}).click();
  await page.reload();assert.equal(await page.evaluate(()=>settings.voice),'recorded:catalina');
  await page.locator('[data-action="start"]').click();
  // A celebration must play its recorded praise followed by the full answer.
  await page.evaluate(()=>{settings.rate=.95;settings.victory=true;celebrate('El perro duerme.');});
  await page.waitForFunction(()=>narrationAudio?.currentSrc.endsWith(RECORDED_VOICE.files[LEARNING.voiceKey('El perro duerme')])&&narrationAudio.currentTime>0);
  assert.equal(await page.evaluate(()=>speechLog.length),0);
  await page.evaluate(()=>stopSpeech());
  console.log('OK: MP3 real, saludo, cuento, pausa, navegación, velocidad y felicitación encadenada');
  // Exercise the real renderers and hint functions: every reachable utterance needs a clip.
  const missing=await page.evaluate(()=>{
   const absent=new Set();speak=text=>{if(!RECORDED_VOICE.files[LEARNING.voiceKey(text)])absent.add(text);};celebrate=speak;
   for(const level of [1,2,3,4])for(const activity of activities.filter(a=>a.id!=='frases')){
    settings.level=level;settings.choices=levels[level].choices;settings.pieces=levels[level].pieces;route=activity.id;
    const total=route==='historias'?storyBank(level).length*3:route==='ordenar'?sentenceBank(level).length:route==='completar'?completionBank(level).length:route==='preguntas'?questionBank(level).length:route==='intruso'?intruderBank(level).length:reasoningGames.includes(route)?reasoningBank(route,level).length:route==='secuencia'?3:1;
    for(round=0;round<total;round++){
     setupRound();renderGame();speak(state.instruction);
     main.querySelectorAll('[data-speak]').forEach(b=>speak(b.dataset.speak));
     if(answerGames.includes(route)){hint();answer(state.question.preference?state.ids[0]:state.question.answer);}
     else for(const id of [...state.ids]){select(id);hint();place(id,route==='clasificar'?words[id][2]:id);}
    }
   }
   for(const game of STUDY.games)for(const level of [1,2,3,4])for(let i=0;i<STUDY.total;i++){
    route=game.id;round=i;settings.level=level;setupRound();renderGame();speak(state.instruction);hint();
    main.querySelectorAll('[data-speak]').forEach(b=>speak(b.dataset.speak));
    const q=state.q;
    if(q.type==='order')for(const id of [...state.ids]){select(id);place(id,id);}
    else if(q.type==='choice')answer(q.answer);
    else if(q.type==='input')STUDY.check(q.answer);
   }
   return [...absent];
  });
  assert.deepEqual(missing,[]);console.log('OK: cobertura de instrucciones, palabras, pistas y respuestas de los cuatro niveles');
  // A delayed, failed download must not resurrect speech after the user pauses.
  await page.route('**/assets/voice/*.mp3',async request=>{await new Promise(r=>setTimeout(r,300));await request.abort();});
  await page.reload();await page.locator('[data-action="start"]').click();
  await page.locator('[data-action="pause"]').click();await page.waitForTimeout(600);
  assert.equal(await page.evaluate(()=>speechLog.length),0);
  await page.keyboard.press('Escape');
  await page.evaluate(()=>speak('Hola Max'));
  await page.waitForFunction(()=>speechLog.length===1);assert.equal(await page.evaluate(()=>speechLog[0]),'Hola Max');
  console.log('OK: respaldo al fallar una descarga y cancelación sin voz tardía');
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
