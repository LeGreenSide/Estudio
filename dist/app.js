'use strict';
const main=document.getElementById('main');
const dialog=document.getElementById('dialog');
const victoryPopup=document.getElementById('victory-popup');
let victoryCount=0;
function hideVictory(){victoryPopup.hidden=true;}
const {words,categories,activities,intruders,questions,sequences,shuffle,choices,classifyRound,levels,questionBank,intruderBank,longSequences,puzzleGrid,chooseVoice,sentenceBank,completionBank,storyBank,reasoningBank,advancedSequences}=LEARNING;
const defaults={sound:true,level:2,choices:4,pieces:6,calm:false,rate:.95,voice:'',victory:true,victoryVolume:.65};
let settings={...defaults};
try{const s=JSON.parse(localStorage.getItem('a-mi-ritmo-preferences'))||{};settings={sound:s.sound!==false,level:[1,2,3,4].includes(s.level)?s.level:2,choices:s.level&&[2,3,4].includes(s.choices)?s.choices:4,pieces:s.level&&[4,6,8,9,12,16].includes(s.pieces)?s.pieces:6,calm:s.calm===true,rate:[.7,.85,.95,1].includes(s.rate)?s.rate:.95,voice:typeof s.voice==='string'?s.voice:'',victory:s.victory!==false,victoryVolume:[.25,.65,1].includes(s.victoryVolume)?s.victoryVolume:.65};}catch{}
let started=false;
const reasoningGames=activities.filter(a=>a.section==='razonar').map(a=>a.id);
const answerGames=['intruso','preguntas','completar','historias',...reasoningGames];
let route='inicio', round=0, state={}, drag=null, ignoreClick=false;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const messageWords=['agua','comer','jugar','dormir','manzana','pelota','ayuda','bano','abrazo','silencio','descanso','cuento','pasear','musica'];
const phraseWord=id=>({manzana:'una manzana',pelota:'una pelota'}[id]||words[id][1].toLowerCase());
function announce(text){document.getElementById('announcement').textContent=text;}
function feedback(text,success=false){const box=document.getElementById('feedback');if(box){box.textContent=text;box.classList.toggle('success',success);}announce(text);}
let audioContext, tones=[], speechTimer, audioEpoch=0;
function audioNotice(text){
 const box=document.getElementById(dialog.open?'voice-status':'audio-status');if(box){box.hidden=false;box.textContent=text;}announce(text);
}
function speak(text,options=settings){
  if(!options.sound)return;
  stopSpeech();
  if(!('speechSynthesis' in window)){audioNotice('Este navegador no tiene voz. Puedes seguir usando las imágenes y el texto.');return;}
  const utterance=new SpeechSynthesisUtterance(text);
  const voice=chooseVoice(speechSynthesis.getVoices(),options.voice);
  utterance.lang=voice?.lang||'es-CL';utterance.rate=options.rate;utterance.pitch=1;utterance.volume=.85;
  if(voice)utterance.voice=voice;
  utterance.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))audioNotice('No se pudo reproducir la voz. Prueba otra voz en Ajustes para mí; el mensaje sigue escrito.');};
  speechSynthesis.speak(utterance);
}
function stopSpeech(){
 audioEpoch++;clearTimeout(speechTimer);
 if('speechSynthesis' in window)speechSynthesis.cancel();
 tones.forEach(t=>{try{t.stop();}catch{}});tones=[];
}
function celebrate(text,options=settings){
 stopSpeech();
 if(text){
  const praise=['¡Excelente!','¡Increíble!','¡Bien hecho!','¡Lo lograste!','¡Muy bien!'][victoryCount++%5];
  document.getElementById('victory-title').textContent=praise;
  document.getElementById('victory-message').textContent=text;
  victoryPopup.hidden=false;text=praise+' '+text;announce(text);
 }
 if(!options.sound)return;
 if(!options.victory){if(text)speak(text,options);return;}
 const epoch=audioEpoch;
 try{
  const Context=window.AudioContext||window.webkitAudioContext;
  if(!Context)throw new Error('Audio unavailable');
  audioContext??=new Context();
  Promise.resolve(audioContext.resume()).then(()=>{
   if(epoch!==audioEpoch)return;
   const start=audioContext.currentTime+.02;
   // Short repeated brass-like notes, rising phrase, then a sustained major chord.
   [[523.25,0,.12],[523.25,.17,.12],[523.25,.34,.12],[659.25,.52,.19],[783.99,.77,.22],
    [523.25,1.03,.55],[659.25,1.03,.55],[783.99,1.03,.55],[1046.5,1.03,.55]].forEach(([frequency,offset,duration])=>{
    const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
    const at=start+offset;oscillator.type='triangle';oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.18*options.victoryVolume,at+.015);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
    oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(at);oscillator.stop(at+duration+.02);tones.push(oscillator);
    oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();tones=tones.filter(t=>t!==oscillator);};
   });
   if(text)speechTimer=setTimeout(()=>{if(epoch===audioEpoch)speak(text,options);},1750);
  }).catch(()=>{if(epoch===audioEpoch){audioNotice('El sonido de victoria no está disponible en este navegador.');if(text)speak(text,options);}});
 }catch{audioNotice('El sonido de victoria no está disponible en este navegador.');if(text)speak(text,options);}
}
function voiceOptions(selected){
 const voices='speechSynthesis' in window?speechSynthesis.getVoices().filter(v=>/^es(?:[-_]|$)/i.test(v.lang)):[];
 return `<option value="">Automática · español</option>${voices.map(v=>`<option value="${escapeHTML(v.voiceURI)}" ${v.voiceURI===selected?'selected':''}>${escapeHTML(v.name)} · ${escapeHTML(v.lang)}${v.localService?'':' · en línea'}</option>`).join('')}${selected&&!voices.some(v=>v.voiceURI===selected)?`<option value="${escapeHTML(selected)}" selected>Voz guardada no disponible · se usará automática</option>`:''}`;
}
if('speechSynthesis' in window){speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',()=>{const select=document.getElementById('voice-select');if(select)select.innerHTML=voiceOptions(select.value);});}
function levelPicker(id){return `<label class="level-picker" for="${id}">Nivel<select id="${id}" data-level>${Object.entries(levels).map(([n,l])=>`<option value="${n}" ${settings.level===Number(n)?'selected':''}>${n} · ${l.name}</option>`).join('')}</select></label>`;}
function applySettings(){
 document.body.classList.toggle('calm',settings.calm);
 const toggle=document.getElementById('sound-toggle');toggle.textContent=`Sonido: ${settings.sound?'encendido':'apagado'}`;toggle.setAttribute('aria-pressed',String(settings.sound));
 try{localStorage.setItem('a-mi-ritmo-preferences',JSON.stringify(settings));}catch{}
}
function tile(id,{piece=false}={}){const w=words[id];return `<button class="tile" ${piece?`data-piece="${id}" aria-pressed="false"`:`data-answer="${id}"`} aria-label="${w[1]}"><span class="emoji" aria-hidden="true">${w[0]}</span><span>${w[1]}</span></button>`;}
function openDialog(content){hideVictory();stopSpeech();dialog.innerHTML=content;if(!dialog.open)dialog.showModal();}
function showSettings(){
 openDialog(`<h2 id="dialog-title">Ajustes para mí</h2><p>Más retos, a tu ritmo. Guardar reinicia la actividad actual.</p><form id="settings-form">
 <label for="settings-level">Dificultad</label><select id="settings-level" name="level">${Object.entries(levels).map(([n,l])=>`<option value="${n}" ${settings.level===Number(n)?'selected':''}>${n} · ${l.name}</option>`).join('')}</select>
 <p class="settings-help">Primeros pasos: 2 grupos y consignas simples. Explorar: 3 grupos y preguntas sobre acciones. Un nuevo reto: 4 grupos, dos pistas, negaciones y secuencias de 5 o 6 pasos. Conecto mis ideas: inferencias, condiciones, oraciones complejas, 7 pasos y 16 piezas.</p>
 <label for="choice-count">Máximo de respuestas para elegir</label><p class="settings-help">El juego del diferente usa al menos tres imágenes para que se reconozca el grupo.</p><select id="choice-count" name="choices">${[2,3,4].map(n=>`<option value="${n}" ${settings.choices===n?'selected':''}>${n} imágenes</option>`).join('')}</select>
 <label for="piece-count">Piezas del puzle</label><select id="piece-count" name="pieces">${[4,6,8,9,12,16].map(n=>`<option value="${n}" ${settings.pieces===n?'selected':''}>${n} piezas</option>`).join('')}</select>
 <label class="check-line"><input name="sound" type="checkbox" ${settings.sound?'checked':''}> Activar sonido</label>
 <label for="voice-select">Voz en español</label><select id="voice-select" name="voice">${voiceOptions(settings.voice)}</select><p class="settings-help">Automática prioriza voces marcadas como naturales y el español de Chile o Latinoamérica, si están disponibles. Las voces en línea necesitan conexión.</p>
 <label for="speech-rate">Velocidad de la voz</label><select id="speech-rate" name="rate">${[[.7,'Muy pausada'],[.85,'Pausada'],[.95,'Conversación tranquila'],[1,'Normal']].map(([n,l])=>`<option value="${n}" ${settings.rate===n?'selected':''}>${l}</option>`).join('')}</select>
 <button type="button" class="secondary audio-preview" data-action="preview-voice">Probar esta voz</button><p id="voice-status" class="settings-help" role="status">La prueba se escucha aunque el sonido general esté apagado.</p>
 <label class="check-line"><input name="victory" type="checkbox" ${settings.victory?'checked':''}> Fanfarria al completar una actividad</label>
 <label for="victory-volume">Volumen de la fanfarria</label><select id="victory-volume" name="victoryVolume">${[[.25,'Suave'],[.65,'Medio'],[1,'Alto']].map(([n,l])=>`<option value="${n}" ${settings.victoryVolume===n?'selected':''}>${l}</option>`).join('')}</select>
 <button type="button" class="secondary audio-preview" data-action="preview-victory">Probar fanfarria</button>
 <label class="check-line"><input name="calm" type="checkbox" ${settings.calm?'checked':''}> Colores más suaves</label><div class="dialog-actions"><button type="button" class="secondary" data-action="close">Cancelar</button><button class="primary" type="submit">Guardar ajustes</button></div></form>`);
}
function pause(){openDialog(`<div class="pause-dialog"><div class="pause-symbol" aria-hidden="true">🌿</div><h2 id="dialog-title">Podemos descansar</h2><p>No hay apuro.<br>Tu actividad te espera aquí.</p><div class="dialog-actions"><button class="secondary" data-action="home">Ir al inicio</button><button class="primary" data-action="close">Quiero seguir</button></div></div>`);}
function activityCards(list){return `<div class="activity-grid">${list.map(a=>`<a class="activity-card" href="#${a.id}"><div class="card-art ${a.color}"><span aria-hidden="true">${a.icon}</span></div><div class="tag">${a.tag}</div><h3>${a.title}</h3><p>${a.subtitle}</p><div class="card-footer"><span>${a.type}</span><span class="card-arrow" aria-hidden="true">↗</span></div></a>`).join('')}</div>`;}
function home(){
 main.innerHTML=`<div class="page-heading"><div><div class="eyebrow">MAX ESTUDIA · A TU RITMO</div><h1>Hola Max, ¿a qué jugamos?</h1><p>Un espacio para descubrir, pensar y contar tus ideas.</p></div><span class="pace-label">◷ Sin prisa, sin cronómetro</span></div><section class="welcome-strip"><span class="strip-icon" aria-hidden="true">🌱</span><div class="welcome-copy"><h2>Una oración para empezar</h2><p>${settings.level===1?'Quién hace qué: juntamos palabras sencillas.':settings.level===2?'Contamos qué pasa, dónde y con qué.':settings.level===3?'Unimos ideas con «porque», «antes» y «después».':'Conectamos ideas con «si», «aunque» y «mientras».'}</p></div><a class="primary" href="#ordenar">Armar una oración <span aria-hidden="true">→</span></a></section><div class="section-heading"><h2>Mis actividades</h2>${levelPicker('home-level')}</div><p class="catalog-note">12 juegos · 48 oraciones · 32 frases · 12 cuentos · 4 niveles</p>${activityCards(['ordenar','completar','frases','historias','preguntas','clasificar','intruso','puzle','secuencia'].map(id=>activities.find(a=>a.id===id)))}<section class="reasoning-section" aria-labelledby="reasoning-heading"><div class="section-heading"><div><div class="eyebrow">PENSAR PASO A PASO</div><h2 id="reasoning-heading">Mi rincón de razonamiento</h2></div><a class="secondary" href="#razonar">Explorar</a></div><p class="catalog-note">72 retos para descubrir patrones, unir pistas y buscar soluciones.</p>${activityCards(activities.filter(a=>a.section==='razonar'))}</section><p class="home-note"><span aria-hidden="true">♡</span><span><strong>Cada intento cuenta.</strong> Puedes tocar, escuchar o jugar acompañado.</span></p>`;
}
function reasoningHome(){
 main.innerHTML=`<a class="back" href="#inicio">← Mis actividades</a><div class="page-heading"><div><div class="eyebrow">MI RINCÓN DE RAZONAMIENTO</div><h1>Observo, pienso y descubro</h1><p>Una pista a la vez. Puedes escuchar y pedir ayuda.</p></div>${levelPicker('reasoning-level')}</div><section class="welcome-strip"><span class="strip-icon" aria-hidden="true">💡</span><div class="welcome-copy"><h2>Hay tiempo para pensar</h2><p>Mira las pistas, prueba una respuesta y descubre por qué encaja.</p></div></section>${activityCards(activities.filter(a=>a.section==='razonar'))}<p class="home-note">6 retos por juego y nivel · 72 en total · Sin tiempo límite</p>`;
}
function family(){main.innerHTML=`<div class="eyebrow">ACOMPAÑAR SIN APURAR</div><h1>Las palabras crecen en familia</h1><p class="family-intro">Un juego es una invitación a compartir. Mirar, señalar, hacer un gesto, elegir una imagen o hablar son maneras de participar.</p><div class="family-grid"><article class="family-card"><h2>Un momento juntos</h2><ol><li><strong>Sigue su interés.</strong> Deja que elija una actividad o un objeto que le guste.</li><li><strong>Muestra un ejemplo.</strong> Señala una imagen y di una frase corta: «Quiero agua».</li><li><strong>Espera.</strong> Dale tiempo, sin repetir la pregunta una y otra vez.</li><li><strong>Responde a su mensaje.</strong> Reconoce también un gesto o una elección. Respeta «no quiero» y «descanso».</li></ol></article><article class="family-card"><h2>Menos examen, más conversación</h2><p>Alterna preguntas con comentarios sobre lo que ven. Si no responde, ofrece un modelo y vuelve a intentarlo en otro momento.</p><blockquote>«Veo un perro. El perro está en el parque.»</blockquote><p>No hace falta pedirle que repita ni exigir contacto visual. La ayuda y las necesidades básicas no dependen de acertar un juego.</p></article><article class="family-card"><h2>Del juego a la vida diaria</h2><ul><li><strong>En la cocina:</strong> muestra una cuchara. «Sirve para comer». Modela «mezclar», «servir» y «caliente» sin tocar objetos calientes.</li><li><strong>Al vestirse:</strong> ofrece dos prendas. «¿Cuál quieres?». Acepta su elección.</li><li><strong>En el parque:</strong> comenta «el pájaro vuela» o «la pelota está aquí».</li><li><strong>Con un cuento:</strong> miren una imagen y exploren una sola pregunta a la vez.</li></ul></article><article class="family-card"><h2>Encuentra su punto de partida</h2><p>En <strong>Ajustes para mí</strong>, puedes elegir cuatro niveles, hasta dieciséis piezas, una voz en español y una fanfarria de victoria. Al pulsar Iniciar se escucha «Hola Max». Puedes entrar sin sonido y cambiarlo después.</p><p style="margin-top:14px">Si arrastrar cuesta, toca primero una imagen y luego su lugar. También puedes usar Tab y Enter. Si el símbolo no es claro, acompáñalo con el objeto real.</p><button class="secondary" style="margin-top:20px" data-action="settings">Ajustar las actividades</button></article></div><div class="source-note"><p><strong>Basado en tu guía:</strong> <em>Guía práctica de actividades para familia</em>, Javiera Fernanda Salazar Acosta, fonoaudióloga. Se adaptaron vocabulario, clasificación, el intruso, juego cotidiano e interrogativos. Los puzles, las secuencias y el razonamiento son actividades complementarias.</p><p>Apoyo de diseño: <a href="https://www.asha.org/Practice-Portal/Professional-Issues/Augmentative-and-Alternative-Communication/" target="_blank" rel="noopener noreferrer">ASHA: comunicación aumentativa y alternativa</a>. La aplicación es un material de apoyo y no reemplaza un sistema de comunicación personalizado ni la orientación de su fonoaudióloga/o.</p><p>Solo se guardan ajustes en este navegador. No se guardan respuestas ni datos del niño. Las ilustraciones son orientativas; los símbolos pueden verse distintos según el dispositivo.</p></div>`;}
function setupRound(){
 hideVictory();
 stopSpeech();
 state={placed:{},selected:null,done:false,helped:false};
 if(route==='clasificar'){Object.assign(state,classifyRound(round,settings.choices,settings.level));}
 if(route==='intruso'){const bank=intruderBank(settings.level);state.question=bank[round%bank.length];state.ids=choices(state.question.ids,state.question.answer,Math.max(3,settings.choices));}
 if(route==='preguntas'){
  const bank=questionBank(settings.level);state.question=bank[round%bank.length];const q=state.question;
  const ids=q.ids||q.options.map(o=>o[1]);state.ids=q.preference?ids.slice(0,settings.choices):choices(ids,q.answer,settings.choices);
 }
 if(route==='puzle'){state.ids=shuffle(Array.from({length:settings.pieces},(_,i)=>String(i)));}
 if(route==='secuencia'){
  const bank=settings.level===4?advancedSequences:settings.level===3?longSequences:sequences;const seq=bank[round%bank.length];state.title=seq.title;state.steps=settings.level===1?seq.short:seq.steps;
  state.ids=shuffle(state.steps.map((_,i)=>String(i)));
 }
 if(route==='frases'){state.prefix='Quiero';state.message=[];state.detail='';state.place='';}
 if(route==='ordenar'){
  const bank=sentenceBank(settings.level);state.sentence=bank[round%bank.length];state.ids=shuffle(state.sentence.tokens.map((_,i)=>String(i)));
 }
 if(route==='completar'){
  const bank=completionBank(settings.level);state.question=bank[round%bank.length];
  state.question={...state.question,model:state.question.sentence.replace('___',state.question.answer).replace(' .','.')};
  state.ids=choices(state.question.options,state.question.answer,settings.choices);
 }
 if(reasoningGames.includes(route)){const bank=reasoningBank(route,settings.level);state.question=bank[round%bank.length];state.ids=choices(state.question.options,state.question.answer,settings.choices);}
 if(route==='historias'){
  const bank=storyBank(settings.level);state.story=bank[Math.floor(round/3)%bank.length];const q=state.story.questions[round%3];
  state.question={text:q[0],answer:q[1],model:q[1]+'.'};state.ids=choices(q.slice(1),q[1],settings.choices);
 }
}
function gameHeader(){
 const a=activities.find(x=>x.id===route);const total=reasoningGames.includes(route)?reasoningBank(route,settings.level).length:route==='preguntas'?questionBank(settings.level).length:route==='intruso'?intruderBank(settings.level).length:route==='secuencia'?sequences.length:route==='clasificar'?4:route==='ordenar'?sentenceBank(settings.level).length:route==='completar'?completionBank(settings.level).length:route==='historias'?storyBank(settings.level).length*3:0;
 return `<a class="back" href="#${reasoningGames.includes(route)?'razonar':'inicio'}">← ${reasoningGames.includes(route)?'Razonamiento':'Mis actividades'}</a><div class="activity-header"><div><div class="eyebrow">${a.tag}</div><h1>${a.title}</h1><p>${a.subtitle}</p></div><div class="activity-tools">${levelPicker('game-level')}${total?`<span class="round-label">Actividad ${round%total+1} de ${total}</span>`:`<button class="quiet-btn" data-action="settings">⚙ Ajustes</button>`}</div></div>`;
}
function instruction(text,detail='Puedes arrastrar o tocar la imagen y después su lugar.'){
 state.instruction=text;return `<div class="instruction"><div><h2>${text}</h2><p>${detail}</p></div><button class="quiet-btn" data-action="listen">Escuchar</button></div>`;
}
function controls(){return `<div id="feedback" class="game-feedback ${state.done?'success':''}" role="status" aria-live="polite">${state.feedback||'Puedes tomarte todo el tiempo que necesites.'}</div><div class="game-actions"><div><button class="secondary" data-action="hint">Ver una ayuda</button><button class="quiet-btn" data-action="reset">Volver a empezar</button>${['ordenar','completar','historias'].includes(route)?`<button class="quiet-btn" data-action="skip">${route==='historias'?'Otro cuento':'Otra frase'}</button>`:''}</div>${state.done?`<button class="primary" data-action="next">${route==='puzle'?'Armar otra vez':route==='frases'?'Otro mensaje':'Seguir'} <span aria-hidden="true">→</span></button>`:''}</div>`;}
function textAnswers(){return `<div class="tiles">${state.ids.map(id=>`<div class="answer-option"><button class="tile text-tile" data-answer="${escapeHTML(id)}">${escapeHTML(id)}</button><button class="quiet-btn" data-speak="${escapeHTML(id)}" aria-label="Escuchar: ${escapeHTML(id)}">♪ Escuchar</button></div>`).join('')}</div>`;}
function renderGame(){
 hideVictory();
 stopSpeech();
 let body='';
 if(route==='clasificar'){
  body=instruction('Lleva cada imagen a su grupo.')+`<div class="tiles">${state.ids.filter(id=>!state.placed[id]).map(id=>tile(id,{piece:true})).join('')||'<p>Todos encontraron su lugar.</p>'}</div><div class="dropzones">${state.cats.map(cat=>`<button class="dropzone" data-target="${cat}" aria-label="Poner en ${categories[cat][1]}"><span aria-hidden="true">${categories[cat][0]}</span><strong>${categories[cat][1]}</strong><div class="placed-items">${state.ids.filter(id=>state.placed[id]===cat).map(id=>`<span class="placed-chip">${words[id][0]} ${words[id][1]}</span>`).join('')}</div></button>`).join('')}</div>`;
 }else if(route==='intruso'){
  body=instruction(state.question.rule||'¿Cuál es de otro grupo?','Toca una imagen. Si necesitas un ejemplo, pide una ayuda.')+`<div class="tiles">${state.ids.map(id=>tile(id)).join('')}</div>`;
 }else if(route==='preguntas'){
  const q=state.question;
  body=instruction(q.text,'Mira, escucha si quieres y elige una imagen.')+`<span class="question-kind">${q.kind}</span>${q.context?`<div class="context-card">${q.context}</div>`:'<img class="scene" src="assets/parque.png" alt="En el parque, un niño come una manzana roja sentado en una manta. A su lado hay un perro marrón y una pelota roja; se ven un árbol y el sol.">'}<div class="tiles">${state.ids.map(id=>q.ids?tile(id):`<button class="tile" data-answer="${id}"><span class="emoji" aria-hidden="true">${q.options.find(o=>o[1]===id)[0]}</span><span>${id}</span></button>`).join('')}</div>`;
 }else if(route==='puzle'){
  const {cols,rows}=puzzleGrid(settings.pieces);
  const style=i=>`--cols:${cols};--rows:${rows};--px:${(i%cols)/(cols-1)*100}%;--py:${Math.floor(i/cols)/(rows-1)*100}%;--ratio:${1.5*rows/cols}`;
  body=instruction('Arma la imagen del parque.')+`<details class="puzzle-reference"><summary>Ver imagen completa</summary><img src="assets/parque.png" alt="Modelo del puzle: picnic en el parque."></details><div class="puzzle-layout"><div class="puzzle-board" style="--cols:${cols};--rows:${rows}" aria-label="Tablero del puzle">${Array.from({length:settings.pieces},(_,i)=>`<button class="puzzle-slot ${state.placed[i]!==undefined?'puzzle-piece':''}" style="${style(i)}" data-target="${i}" aria-label="Lugar ${i+1}${state.placed[i]!==undefined?', pieza colocada':''}" ${state.placed[i]!==undefined?'disabled':''}>${settings.level===1?i+1:''}</button>`).join('')}</div><div class="puzzle-tray" style="--tray-cols:${settings.pieces>=8?3:2}">${state.ids.filter(id=>state.placed[id]===undefined).map(id=>`<button class="tile puzzle-piece" data-piece="${id}" aria-pressed="false" style="${style(Number(id))}" aria-label="Pieza ${Number(id)+1}">${settings.level===1?`<span>${Number(id)+1}</span>`:''}</button>`).join('')}</div></div>`;
 }else if(route==='secuencia'){
  body=instruction(state.title,'Coloca los pasos en orden. Toca una imagen y después un espacio.')+`<div class="tiles">${state.ids.filter(id=>state.placed[id]===undefined).map(id=>`<button class="tile" data-piece="${id}" aria-pressed="false"><span class="emoji" aria-hidden="true">${state.steps[id][0]}</span><span>${state.steps[id][1]}</span></button>`).join('')}</div><div class="dropzones sequence-zones" style="--steps:${state.steps.length}">${state.steps.map((s,i)=>`<button class="dropzone" data-target="${i}" data-filled="${state.placed[i]!==undefined}" ${state.placed[i]!==undefined?'disabled':''} aria-label="Paso ${i+1}${i===0?', primero':', después'}"><small>${i===0?'Primero':i===state.steps.length-1?'Al final':'Después'} · ${i+1}</small><span aria-hidden="true">${state.placed[i]!==undefined?s[0]:'+'}</span><strong>${state.placed[i]!==undefined?s[1]:'Pon aquí una imagen'}</strong></button>`).join('')}</div>`;
 }else if(route==='ordenar'){
  body=instruction('Ordena las palabras para contar qué pasa.','Empieza por la palabra con mayúscula. Arrastra o toca una palabra y después su espacio.')+`<div class="sentence-scene" role="img" aria-label="Pistas de la oración">${state.sentence.scene}</div><div class="word-slots" aria-label="Tu oración">${state.sentence.tokens.map((_,i)=>{const entry=Object.entries(state.placed).find(([,target])=>target===String(i));return `<button class="word-slot" data-target="${i}" ${entry?'disabled':''} aria-label="Palabra ${i+1}${entry?', '+state.sentence.tokens[entry[0]]:''}"><small>${i+1}</small>${entry?escapeHTML(state.sentence.tokens[entry[0]]):'…'}</button>`;}).join('')}<span class="sentence-period" aria-hidden="true">.</span></div><div class="tiles word-tray">${state.ids.filter(id=>state.placed[id]===undefined).map(id=>`<button class="tile text-tile" data-piece="${id}" aria-pressed="false">${escapeHTML(state.sentence.tokens[id])}</button>`).join('')}</div>`;
 }else if(route==='completar'){
  const q=state.question;
  body=instruction('Elige la palabra que completa la oración.','Puedes escuchar la pista y cada opción antes de elegir.')+`<div class="sentence-scene" aria-hidden="true">${q.scene}</div><p class="story-clue">${q.context}</p><div class="sentence-prompt">${q.sentence.replace('___',state.done?`<strong>${q.answer}</strong>`:'<span class="blank-word" aria-label="palabra que falta">…</span>').replace(' .','.')}</div>${textAnswers()}`;
  state.instruction=q.context+' '+q.sentence.replace('___','¿qué palabra falta?');
 }else if(route==='historias'){
  const story=state.story;
  body=instruction(story.title,'Escucha o lean juntos. El cuento permanece visible mientras respondes.')+`<article class="story-sheet"><div class="sentence-scene" aria-hidden="true">${story.scene}</div>${story.lines.map(line=>`<p>${escapeHTML(line)}</p>`).join('')}</article><div class="story-question"><span class="question-kind">PREGUNTA ${round%3+1} DE 3</span><h2>${state.question.text}</h2></div>${textAnswers()}`;
  state.instruction=story.lines.join(' ')+' '+state.question.text;
 }else if(reasoningGames.includes(route)){
  const q=state.question;
  body=instruction(q.text,'Lee o escucha las pistas. Puedes pedir una ayuda.')+`<div class="reasoning-clue ${route==='patrones'?'pattern-clue':''}">${escapeHTML(q.context)}</div>${textAnswers()}`;
  state.instruction=q.context+' '+q.text;
 }else if(route==='frases'){
  body=instruction('¿Qué quieres decir?','Elige cómo empezar y añade lo que quieres comunicar.')+`<div class="tiles"><button class="secondary" data-prefix="Quiero" aria-pressed="${state.prefix==='Quiero'}">👍 Quiero</button><button class="secondary" data-prefix="No quiero" aria-pressed="${state.prefix==='No quiero'}">✋ No quiero</button><button class="secondary" data-prefix="Necesito" aria-pressed="${state.prefix==='Necesito'}">🤝 Necesito</button></div><div class="sentence-strip" data-target="message"><span class="word-chip">${state.prefix}</span>${state.message.length?state.message.map(id=>`<span class="word-chip">${words[id][0]} ${phraseWord(id)}</span>`).join(''):'<span class="placeholder">Toca o trae una imagen aquí…</span>'}${state.message.length?[state.detail,state.place].filter(Boolean).map(d=>`<span class="word-chip">${d}</span>`).join(''):''}</div><div class="tiles">${messageWords.map(id=>tile(id,{piece:true})).join('')}</div>${settings.level>1?`<div class="sentence-details"><p>Añade cuándo${settings.level>=3?' o dónde':''}, si quieres.</p><div class="tiles">${['ahora','después',...(settings.level>=3?['en casa','en el parque']:[])].map(d=>`<button class="secondary" data-detail="${d}" aria-pressed="${[state.detail,state.place].includes(d)}">${d}</button>`).join('')}</div></div>`:''}<div class="game-actions"><button class="secondary" data-action="clear-message">Borrar imagen</button><button class="primary" data-action="say-sentence" ${state.message.length?'':'disabled'}>Mostrar mi mensaje</button></div>`;
 }
 main.innerHTML=gameHeader()+`<section class="game-panel">${body}${controls()}</section>`;
 if(state.done&&answerGames.includes(route))main.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);
}
function select(id){
 if(!state.ids?.includes(id)&&route!=='frases')return;
 if(route==='frases'){place(id,'message');return;}
 state.selected=state.selected===id?null:id;
 main.querySelectorAll('[data-piece]').forEach(b=>{const selected=b.dataset.piece===state.selected;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 const label=route==='ordenar'?state.sentence.tokens[id]:route==='secuencia'?state.steps[id][1]:words[id]?.[1]||`Pieza ${Number(id)+1}`;
 feedback(state.selected?`${label}. Ahora elige su lugar.`:'Puedes elegir otra imagen.');
 speak(label);
}
function afterRenderFocus(){
 if(!victoryPopup.hidden){victoryPopup.querySelector('[data-action="victory-next"]').focus({preventScroll:true});return;}
 const next=main.querySelector(state.done?'[data-action="next"]':'[data-piece], [data-answer]');next?.focus({preventScroll:true});
}
function place(id,target){
 if(route==='frases'){
  if(target!=='message'||!messageWords.includes(id))return;
  state.message=[id];state.done=false;state.feedback='Tu mensaje está listo. Puedes mostrarlo o cambiarlo.';renderGame();main.querySelector('[data-action="say-sentence"]').focus({preventScroll:true});return;
 }
 if(!state.ids?.includes(id)||state.placed[id]!==undefined||state.done)return;
 const correct=route==='clasificar'?words[id][2]===target:route==='ordenar'?state.sentence.tokens[id]===state.sentence.tokens[target]:id===target;
 if(!correct){feedback(route==='clasificar'?'Probemos otro grupo. Puedes pedir una ayuda.':'Esta imagen va en otro lugar. Podemos probar de nuevo.');return;}
 if(route!=='clasificar'&&Object.values(state.placed).includes(target))return;
 state.placed[id]=target;state.selected=null;
 state.done=Object.keys(state.placed).length===state.ids.length;
 state.feedback=state.done?(route==='ordenar'?state.sentence.text+'.':route==='puzle'?'¡La imagen está completa! Veo un niño y un perro. ¿Qué ves tú?':route==='secuencia'?'La secuencia está lista. Pueden contar los pasos juntos.':'¡Cada cosa en su lugar! Puedes señalar o nombrar las imágenes.'):(route==='clasificar'?`${words[id][1]} va con ${categories[target][1].toLowerCase()}.`:route==='ordenar'?'La palabra está en su lugar. Sigue construyendo.':'La imagen encontró su lugar.');
 renderGame();announce(state.feedback);if(state.done)celebrate(state.feedback);else speak(state.feedback);afterRenderFocus();
}
function answer(id){
 if(state.done||!state.ids.includes(id))return;
 const q=state.question;
 if(id!==q.answer&&!q.preference){feedback('Miremos otra vez. Puedes probar otra imagen o ver una ayuda.');return;}
 state.done=true;state.feedback=q.preference?`Elegiste ${words[id][1].toLowerCase()}. Tu elección cuenta.`:q.model||q.why;
 renderGame();announce(state.feedback);celebrate(state.feedback);afterRenderFocus();
}
function hint(){
 if(state.done){feedback(state.feedback,true);speak(state.feedback);return;}
 state.helped=true;
 if(route==='frases'){feedback('Un ejemplo: «Quiero agua». Tú puedes elegir otro mensaje.');speak('Un ejemplo: quiero agua.');return;}
 if(route==='preguntas'&&state.question.preference){feedback(state.question.model);speak(state.question.model);return;}
 let text='',button;
 if(answerGames.includes(route)){
  const q=state.question;text=q.model||q.why;button=Array.from(main.querySelectorAll('[data-answer]')).find(b=>b.dataset.answer===q.answer);
 }else{
  const id=state.ids.find(id=>state.placed[id]===undefined);
  if(id===undefined)return;
  const target=route==='clasificar'?words[id][2]:route==='ordenar'?String(state.sentence.tokens.findIndex((word,i)=>word===state.sentence.tokens[id]&&!Object.values(state.placed).includes(String(i)))):id;
  state.selected=id;main.querySelectorAll('[data-piece]').forEach(b=>{b.classList.toggle('selected',b.dataset.piece===id);b.setAttribute('aria-pressed',String(b.dataset.piece===id));});
  button=Array.from(main.querySelectorAll('[data-target]')).find(b=>b.dataset.target===target);
  text=route==='clasificar'?`${words[id][1]} va con ${categories[target][1].toLowerCase()}. Toca ese grupo.`:route==='secuencia'?`${state.steps[id][1]} va en el paso ${Number(id)+1}.`:route==='ordenar'?`${state.sentence.text}. «${state.sentence.tokens[id]}» va en el espacio ${Number(target)+1}.`:'He elegido una pieza. Toca el espacio resaltado.';
 }
 button?.classList.add('hint');button?.focus({preventScroll:true});feedback(text);speak(text);
}
function navigate(){
 if(!started)return;
 stopSpeech();route=location.hash.slice(1)||'inicio';
 if(!['inicio','familia','razonar',...activities.map(a=>a.id)].includes(route))route='inicio';
 round=0;setupRound();
 document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===route||(a.dataset.nav==='inicio'&&activities.some(x=>x.id===route&&!x.section))||(a.dataset.nav==='razonar'&&reasoningGames.includes(route));a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(route==='inicio')home();else if(route==='familia')family();else if(route==='razonar')reasoningHome();else renderGame();
 document.title=`${activities.find(a=>a.id===route)?.title||({inicio:'Jugar y aprender',familia:'En familia',razonar:'Razonamiento'}[route])} · Max estudia`;
 main.focus({preventScroll:true});window.scrollTo(0,0);
}
document.addEventListener('click',event=>{
 if(ignoreClick){event.preventDefault();ignoreClick=false;return;}
 const b=event.target.closest('button');if(!b||b.disabled)return;
 if(b.dataset.speak){if(!settings.sound){announce('El sonido está apagado. Puedes encenderlo con el botón Sonido.');return;}speak(b.dataset.speak);return;}
 if(b.dataset.piece!==undefined){select(b.dataset.piece);return;}
 if(b.dataset.target!==undefined){if(state.selected!==null)place(state.selected,b.dataset.target);else feedback('Primero elige una imagen.');return;}
 if(b.dataset.answer!==undefined){answer(b.dataset.answer);return;}
 if(b.dataset.detail){const key=b.dataset.detail.startsWith('en ')?'place':'detail';state[key]=state[key]===b.dataset.detail?'':b.dataset.detail;state.done=false;state.feedback='Puedes completar tu mensaje.';renderGame();main.querySelector(`[data-detail="${b.dataset.detail}"]`).focus({preventScroll:true});return;}
 if(b.dataset.prefix){state.prefix=b.dataset.prefix;state.done=false;state.feedback='Puedes mostrar tu mensaje o cambiarlo.';renderGame();main.querySelector(`[data-prefix="${state.prefix}"]`).focus({preventScroll:true});return;}
 switch(b.dataset.action){
  case 'start':if(!started){started=true;settings.sound=document.getElementById('start-sound').checked;document.getElementById('entry').hidden=true;document.getElementById('app-shell').hidden=false;applySettings();navigate();if(settings.sound)speak('Hola Max');}break;
  case 'settings':showSettings();break;
  case 'preview-voice':speak('Hola. Vamos a jugar juntos. Puedes hacerlo a tu ritmo.',{...settings,sound:true,voice:document.getElementById('voice-select').value,rate:Number(document.getElementById('speech-rate').value)});break;
  case 'preview-victory':celebrate('',{...settings,sound:true,victory:true,victoryVolume:Number(document.getElementById('victory-volume').value)});break;
  case 'sound':settings.sound=!settings.sound;applySettings();if(settings.sound)speak('Sonido encendido');else stopSpeech();break;
  case 'pause':pause();break;
  case 'close':dialog.close();break;
  case 'home':dialog.close();location.hash='inicio';break;
  case 'listen':if(!settings.sound){feedback('El sonido está apagado. Puedes encenderlo arriba.');}else speak(state.instruction);break;
  case 'hint':hint();break;
  case 'reset':setupRound();renderGame();afterRenderFocus();break;
  case 'skip':round+=route==='historias'?3-round%3:1;setupRound();renderGame();main.focus();window.scrollTo(0,0);break;
  case 'victory-close':hideVictory();stopSpeech();afterRenderFocus();break;
  case 'victory-next':
  case 'next':round++;setupRound();renderGame();main.focus();window.scrollTo(0,0);break;
  case 'clear-message':state.message=[];state.detail='';state.place='';state.done=false;state.feedback='Puedes elegir otra imagen.';renderGame();afterRenderFocus();break;
  case 'say-sentence':{const wasDone=state.done;const message=state.prefix+' '+state.message.map(phraseWord).join(' ')+([state.detail,state.place].filter(Boolean).length?' '+[state.detail,state.place].filter(Boolean).join(' '):'');state.done=true;state.feedback=message;renderGame();feedback(message,true);if(wasDone)speak(message);else celebrate(message);afterRenderFocus();break;}
 }
});
document.addEventListener('change',event=>{
 if(event.target.id==='settings-level'){
  const level=levels[Number(event.target.value)];if(!level)return;
  document.getElementById('choice-count').value=level.choices;document.getElementById('piece-count').value=level.pieces;
 }else if(event.target.matches('[data-level]')){
  const number=Number(event.target.value);if(!levels[number])return;
  settings={...settings,level:number,choices:levels[number].choices,pieces:levels[number].pieces};applySettings();round=0;setupRound();
  if(route==='inicio')home();else if(route==='razonar')reasoningHome();else renderGame();main.querySelector('[data-level]').focus({preventScroll:true});announce('Nivel '+levels[number].name);
 }
});
dialog.addEventListener('close',stopSpeech);
dialog.addEventListener('submit',event=>{
 if(event.target.id!=='settings-form')return;
 event.preventDefault();const data=new FormData(event.target);
 settings={level:Number(data.get('level')),choices:Number(data.get('choices')),pieces:Number(data.get('pieces')),rate:Number(data.get('rate')),voice:data.get('voice'),sound:data.has('sound'),calm:data.has('calm'),victory:data.has('victory'),victoryVolume:Number(data.get('victoryVolume'))};applySettings();dialog.close();navigate();announce('Ajustes guardados.');
});
// Pointer events cover mouse, pen and touch. The same place() handles click/keyboard.
function trackDrag(){
 if(!drag?.ghost)return;
 const bottom=innerHeight;
 if(drag.y>bottom-45)window.scrollBy(0,9);else if(drag.y<55)window.scrollBy(0,-9);
 const target=document.elementFromPoint(drag.x,drag.y)?.closest('[data-target]');
 if(drag.target!==target){drag.target?.classList.remove('drop-hover');target?.classList.add('drop-hover');drag.target=target;}
 requestAnimationFrame(trackDrag);
}
document.addEventListener('pointerdown',event=>{
 const piece=event.target.closest('[data-piece]');if(!piece||event.button!==0||piece.disabled)return;
 ignoreClick=false;drag={id:piece.dataset.piece,node:piece,x:event.clientX,y:event.clientY,pointerId:event.pointerId,ghost:null,target:null};
 piece.setPointerCapture(event.pointerId);
});
document.addEventListener('pointermove',event=>{
 if(!drag||drag.pointerId!==event.pointerId)return;
 if(!drag.ghost&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<8)return;
 if(!drag.ghost){drag.ghost=drag.node.cloneNode(true);drag.ghost.removeAttribute('data-piece');drag.ghost.classList.add('drag-ghost');drag.ghost.setAttribute('aria-hidden','true');drag.ghost.tabIndex=-1;document.body.append(drag.ghost);drag.node.classList.add('dragging');requestAnimationFrame(trackDrag);}
 drag.x=event.clientX;drag.y=event.clientY;
 drag.ghost.style.left=event.clientX+'px';drag.ghost.style.top=event.clientY+'px';
 const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-target]');
 if(drag.target!==target){drag.target?.classList.remove('drop-hover');target?.classList.add('drop-hover');drag.target=target;}
});
function endDrag(event,canceled=false){
 if(!drag||drag.pointerId!==event.pointerId)return;
 const current=drag;drag=null;current.node.classList.remove('dragging');current.target?.classList.remove('drop-hover');
 if(current.ghost){current.ghost.remove();ignoreClick=true;setTimeout(()=>{ignoreClick=false;},0);if(!canceled&&current.target&&!current.target.disabled)place(current.id,current.target.dataset.target);}
}
document.addEventListener('pointerup',event=>endDrag(event));
document.addEventListener('pointercancel',event=>endDrag(event,true));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!victoryPopup.hidden){hideVictory();stopSpeech();afterRenderFocus();}if(event.key==='Escape'&&drag){const d=drag;d.ghost?.remove();d.node.classList.remove('dragging');d.target?.classList.remove('drop-hover');drag=null;}});
window.addEventListener('hashchange',navigate);
applySettings();
document.getElementById('start-sound').checked=settings.sound;
document.querySelector('[data-action="start"]').focus({preventScroll:true});
// Optional browser agent support uses the same navigation as the visible cards.
if(document.modelContext?.registerTool){
 try{Promise.resolve(document.modelContext.registerTool({name:'start_learning_activity',description:'Open one learning activity. This starts an activity; it does not answer or complete it.',inputSchema:{type:'object',properties:{activity:{type:'string',enum:activities.map(a=>a.id)}},required:['activity'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!started)return {started:false,message:'Pulsa Iniciar para entrar.'};if(!input||Object.keys(input).length!==1||!activities.some(a=>a.id===input.activity))throw new Error('Unknown activity');history.replaceState(null,'','#'+input.activity);navigate();return {activity:route,started:true};}})).catch(()=>{});}catch{}
}
