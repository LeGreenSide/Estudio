const assert=require('node:assert/strict');
const {chromium,webkit}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/Lester/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await(process.env.TEST_BROWSER==='webkit'?webkit:chromium).launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:375,height:667},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],cancel(){},speak(){}},configurable:true});});
  const base=(process.env.TEST_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
  await page.goto(base+'/#estudio');await page.locator('#start-sound').uncheck();await page.locator('[data-action="start"]').tap();
  assert.equal(await page.locator('.study-subject .activity-card').count(),await page.evaluate(()=>STUDY.games.length));
  await page.locator('[href="#estudio/numeros"]').tap();assert(await page.locator('#study-numeros').isVisible());assert(page.url().endsWith('#estudio/numeros'));
  assert.equal(await page.locator('.study-subject').count(),1);
  await page.locator('[data-level]').selectOption('5');await page.reload();await page.locator('[data-action="start"]').tap();
  assert.equal(await page.locator('[data-level]').inputValue(),'5');assert.equal(await page.evaluate(()=>settings.level),5);
  await page.locator('[href="#estudio-abaco"]').tap();await page.locator('[data-level]').selectOption('4');
  await page.locator('[data-study="check-abacus"]').tap();assert(await page.locator('#victory-popup').isHidden());
  for(let i=0;i<5;i++)await page.locator('[data-bead="0"][data-delta="1"]').tap();
  assert(await page.locator('[data-bead="0"][data-delta="1"]').isDisabled());
  await page.locator('[data-study="check-abacus"]').tap();assert(await page.locator('#victory-popup').isVisible());
  await page.locator('[data-action="victory-next"]').tap();assert.equal(await page.locator('#abacus-total').textContent(),'0');
  await page.evaluate(()=>location.hash='estudio-cifras');await page.locator('#study-answer').fill('1');await page.locator('#study-answer-form button').tap();assert(await page.locator('#victory-popup').isHidden());
  await page.locator('#study-answer').fill('500');await page.locator('#study-answer-form button').tap();assert(await page.locator('#victory-popup').isVisible());assert.equal(await page.locator('#study-answer').inputValue(),'500');
  await page.evaluate(()=>location.hash='estudio-oraciones');
  await page.locator('[data-piece]').first().waitFor();
  const count=await page.evaluate(()=>state.q.tokens.length);
  for(let i=0;i<count;i++){await page.locator(`[data-piece="${i}"]`).tap();await page.locator(`[data-target="${i}"]`).tap();}
  assert(await page.locator('#victory-popup').isVisible());
  await page.evaluate(()=>location.hash='estudio-escribir');await page.locator('[data-study="finish-writing"]').tap();assert(await page.locator('#victory-popup').isHidden());
  await page.locator('#study-writing').fill('El gato juega.');for(let i=0;i<3;i++)await page.locator(`[data-review="${i}"]`).check();await page.locator('[data-study="finish-writing"]').tap();
  assert(await page.locator('#victory-popup').isVisible());assert.equal(await page.locator('#study-writing').inputValue(),'El gato juega.');
  await page.evaluate(()=>location.hash='estudio-nombre');await page.locator('#name-model').fill('<Max & familia>');assert.equal(await page.locator('#name-example').textContent(),'<Max & familia>');
  await page.locator('#name-pad').scrollIntoViewIfNeeded();const c=await page.locator('#name-pad').boundingBox();await page.mouse.move(c.x+20,c.y+30);await page.mouse.down();await page.mouse.move(c.x+90,c.y+90,{steps:8});await page.mouse.up();
  assert(await page.locator('#name-pad').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(x=>x!==0)));
  await page.locator('[data-study="clear-pad"]').tap();assert(await page.locator('#name-pad').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.every(x=>x===0)));
  assert(!await page.evaluate(()=>JSON.stringify(localStorage).includes('<Max')));
  // Exercise every lesson/level through the shared game lifecycle, without network audio.
  const failures=await page.evaluate(()=>{
   const failures=[];settings.sound=false;
   for(const g of STUDY.games)for(const level of [1,2,3,4,5])for(let i=0;i<STUDY.total;i++){
    route=g.id;round=i;settings.level=level;setupRound();renderGame();const q=state.q;
    if(document.documentElement.scrollWidth>innerWidth+1)failures.push(g.key+' overflow');
    if(q.type==='choice')answer(q.answer);
    else if(q.type==='order'){for(const id of [...state.ids])place(id,id);}
    else if(q.type==='input')STUDY.check(q.answer);
    else if(q.type==='abacus'){state.beads=[Math.floor(q.n/100),Math.floor(q.n/10)%10,q.n%10];STUDY.click(main.querySelector('[data-study="check-abacus"]'));}
    else continue;
    if(!state.done||victoryPopup.hidden)failures.push(g.key+' not complete');
   }
   document.documentElement.style.fontSize='200%';
   for(const g of STUDY.games){route=g.id;setupRound();renderGame();if(document.documentElement.scrollWidth>innerWidth+1)failures.push(g.key+' text 200%');}
   document.documentElement.style.fontSize='';
   return [...new Set(failures)];
  });
  assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
  await page.goto(base+'/#estudio');await page.reload();await page.locator('[data-action="start"]').tap();
  await page.screenshot({path:'../tmp/study-mobile.png',fullPage:true});
  for(const key of ['datos','planos','lectura','reloj','medir']){
   await page.evaluate(key=>{settings.level=key==='medir'?3:5;location.hash='estudio-'+key;},key);
   await page.waitForFunction(key=>route==='estudio-'+key,key);
   if(key==='medir')assert(await page.evaluate(()=>{
    const pencil=document.querySelector('.ruler-object').getBoundingClientRect(),marks=document.querySelectorAll('.ruler-ticks span');
    const at=i=>{const r=marks[i].getBoundingClientRect();return r.x+r.width/2;};
    return Math.abs(pencil.left-at(state.q.ruler.start))<1.5&&Math.abs(pencil.right-at(state.q.ruler.end))<1.5;
   }),'El objeto debe comenzar y terminar en las marcas correctas de la regla');
   await page.screenshot({path:'../tmp/school-'+key+'.png',fullPage:true});
  }
  await page.evaluate(()=>location.hash='estudio-nombre');await page.waitForFunction(()=>route==='estudio-nombre');await page.locator('[data-level]').selectOption('5');
  assert(!await page.locator('#name-model').isVisible());await page.locator('summary').tap();assert(await page.locator('#name-model').isVisible());
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/#inicio');await page.screenshot({path:'../tmp/school-home.png',fullPage:true});
  console.log('OK: entrada Safari antiguo, todos los juegos y cinco niveles, respuestas incorrectas/correctas, escritura, privacidad, dibujo y móvil.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
