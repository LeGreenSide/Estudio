'use strict';
const STUDY=(()=>{
 const groups=[
  {id:'lenguaje',name:'Lenguaje',date:'5 de octubre',icon:'📚',color:'mint',intro:'Letras, palabras y oraciones para contar tus ideas.'},
  {id:'numeros',name:'Números hasta el 599',date:'7 de octubre',icon:'🧮',color:'blue',intro:'Construye, compara y descubre cómo funcionan los números.'},
  {id:'geometria',name:'Geometría',date:'9 de octubre',icon:'🔷',color:'lilac',intro:'Observa figuras, cuenta sus partes y encuentra esquinas rectas.'}
 ];
 const games=[
  ['letras','lenguaje','El abecedario','Encuentra la letra que falta.','🔤'],
  ['alfabeto','lenguaje','Palabras en fila','Ordena palabras alfabéticamente.','🔡'],
  ['sustantivos','lenguaje','Nombres de cada cosa','Distingue sustantivos propios y comunes.','🏷️'],
  ['adjetivos','lenguaje','¿Cómo es?','Descubre adjetivos que describen.','🎨'],
  ['verbos','lenguaje','Palabras en acción','Encuentra el verbo en una oración.','🏃'],
  ['tiempos','lenguaje','Ayer, hoy y mañana','Reconoce pasado, presente y futuro.','📅'],
  ['oraciones','lenguaje','Ordeno y cuento','Arma oraciones con palabras móviles.','🧩'],
  ['escribir','lenguaje','Escribo una oración','Crea una idea y revísala con ayuda.','✏️'],
  ['nombre','lenguaje','Mi nombre a mano','Observa, traza y practica en papel.','🖍️'],
  ['vecinos','numeros','Vecinos del número','Busca el antecesor y el sucesor.','🏘️'],
  ['comparar','numeros','Mayor, menor o igual','Elige el signo que corresponde.','⚖️'],
  ['orden','numeros','Escalera de números','Ordena de menor a mayor y al revés.','🪜'],
  ['abaco','numeros','Construyo en el ábaco','Añade centenas, decenas y unidades.','🧮'],
  ['cifras','numeros','De palabras a números','Escucha o lee y escribe las cifras.','🔢'],
  ['palabras','numeros','Números con palabras','Escribe cómo se llama cada número.','📝'],
  ['componer','numeros','Junto las partes','Compón un número desde su descomposición.','🧱'],
  ['descomponer','numeros','Separo un número','Encuentra sus centenas, decenas y unidades.','🔎'],
  ['patron','numeros','El número que sigue','Descubre patrones y completa series.','🚂'],
  ['doble','numeros','Dos veces lo mismo','Suma dos cantidades iguales.','🍒'],
  ['figuras','geometria','Detective de figuras','Reconoce figuras de dos dimensiones.','🔷'],
  ['partes','geometria','Lados y vértices','Cuenta lados rectos y esquinas.','📐'],
  ['angulos','geometria','Encuentro el ángulo recto','Busca una esquina como la de una hoja.','📏']
 ].map(([id,group,title,subtitle,icon])=>({id:'estudio-'+id,key:id,group,title,subtitle,icon}));
 const total=12, alphabet=Array.from('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
 const small=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
 function numberName(n){
  if(n<30)return small[n];
  if(n<100)return ['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'][Math.floor(n/10)]+(n%10?' y '+small[n%10]:'');
  if(n===100)return 'cien';
  return ['','ciento','doscientos','trescientos','cuatrocientos','quinientos'][Math.floor(n/100)]+(n%100?' '+numberName(n%100):'');
 }
 const normalize=s=>String(s).trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
 const numbers=[ [3,8,12,20,25,31,46,50,63,72,88,99], [100,104,119,130,145,170,199,200,205,221,260,299], [300,302,319,340,365,399,400,409,425,460,478,499], [500,501,509,510,521,536,548,560,575,589,598,599] ];
 const comparisons=[
  [[8,35],[62,20],[14,14],[90,45],[27,70],[50,50],[3,81],[99,99],[76,31],[40,88],[65,65],[58,12]],
  [[100,235],[280,125],[160,160],[45,210],[299,80],[205,205],[170,60],[120,260],[99,99],[245,110],[75,198],[290,290]],
  [[125,346],[480,215],[302,302],[399,140],[86,420],[250,250],[190,365],[499,72],[408,408],[310,155],[230,470],[99,99]],
  [[100,235],[346,125],[509,509],[580,240],[75,420],[360,360],[190,599],[500,85],[128,128],[455,210],[265,540],[599,599]]
 ];
 const sentences=[
  ['El gato duerme','🐈 💤'],['La niña canta','👧 🎵'],['Mi perro juega','🐕 ⚽'],['El sol brilla','☀️'],
  ['La pelota roja rebota','🔴 ⚽'],['Ana lee un cuento','👧 📖'],['El pájaro vuela alto','🐦 ☁️'],['Mi mamá cocina sopa','🥣'],
  ['Ayer planté una flor','🌱 🌼'],['Hoy ordeno todos mis libros','📚'],['Mañana iré al parque','🌳'],['El perro pequeño corre por el jardín','🐕 🌷']
 ];
 const nouns=[['Max','Propio','Es el nombre de una persona.'],['perro','Común','Nombra un tipo de animal.'],['Chile','Propio','Es el nombre de un país.'],['ciudad','Común','Nombra un tipo de lugar.'],['Ana','Propio','Es el nombre de una persona.'],['escuela','Común','Nombra un tipo de lugar.'],['Santiago','Propio','Es el nombre de una ciudad.'],['pelota','Común','Nombra un tipo de objeto.'],['Valentina','Propio','Es el nombre de una persona.'],['río','Común','Nombra un tipo de lugar.'],['Valparaíso','Propio','Es el nombre de una ciudad.'],['libro','Común','Nombra un tipo de objeto.']];
 const descriptions=[['La pelota roja rebota.','roja','pelota','rebota'],['El perro pequeño corre.','pequeño','perro','corre'],['La sopa caliente humea.','caliente','sopa','humea'],['El árbol alto crece.','alto','árbol','crece'],['La niña alegre canta.','alegre','niña','canta'],['El auto azul avanza.','azul','auto','avanza'],['El pan crujiente suena.','crujiente','pan','suena'],['La tortuga lenta camina.','lenta','tortuga','camina'],['El libro nuevo brilla.','nuevo','libro','brilla'],['La flor amarilla crece.','amarilla','flor','crece'],['El gato suave duerme.','suave','gato','duerme'],['La mesa redonda gira.','redonda','mesa','gira']];
 const tenses=[['Ayer jugué en casa.','Pasado'],['Hoy juego en casa.','Presente'],['Mañana jugaré en casa.','Futuro'],['Antes comí una manzana.','Pasado'],['Ahora como una manzana.','Presente'],['Después comeré una manzana.','Futuro'],['Ayer leí un cuento.','Pasado'],['Ahora leo un cuento.','Presente'],['Mañana leeré un cuento.','Futuro'],['Antes corrí por el patio.','Pasado'],['Ahora corro por el patio.','Presente'],['Después correré por el patio.','Futuro']];
 const wordSets=[['árbol','barco','casa','dedo','flor','gato'],['luna','mesa','nube','ñandú','oso','pato'],['sol','taza','uva','vaca','yate','zapato'],['abeja','avión','ballena','bota','cama','conejo'],['dado','delfín','foca','fuego','gallina','gorra'],['lana','león','mano','mono','nido','noche'],['oso','oveja','pato','pez','rana','rosa'],['sapo','silla','taza','tigre','uva','vaca'],['ala','aro','boca','búho','casa','cuna'],['flan','flor','gato','goma','hilo','hoja'],['mapa','mesa','nube','ñandú','ojo','oso'],['pan','pera','ratón','ropa','sapo','sopa']];
 const shapes=[['Cuadrado',4,'40,30 160,30 160,150 40,150'],['Rectángulo',4,'20,50 180,50 180,140 20,140'],['Triángulo',3,'100,25 180,150 20,150'],['Círculo',0,''],['Pentágono',5,'100,20 180,78 150,165 50,165 20,78'],['Hexágono',6,'60,25 140,25 180,95 140,165 60,165 20,95']];
 const signNames={'<':'Menor que','>':'Mayor que','=':'Igual a'};
 function question(prompt,options,answer,help,extra={}){return {type:'choice',prompt,options:options.map(String),answer:String(answer),help,...extra};}
 function exercise(key,level,index){
  const r=index%total,n=numbers[level-1][r],s=sentences[(r+2*(level-1))%sentences.length],d=descriptions[r];
  if(key==='letras'){
   const at=(r*2+level)%25+1,answer=alphabet[at];
   return question('¿Qué letra falta?', [answer,alphabet[(at+3)%27],alphabet[(at+7)%27]],answer,`${alphabet[at-1]}, ${answer}, ${alphabet[at+1]}. La letra que falta es ${answer}.`,{clue:`${alphabet[at-1]} · … · ${alphabet[at+1]}`,alphabet:true});
  }
  if(key==='alfabeto'){
   const tokens=wordSets[r].slice(0,level+2);
   return {type:'order',prompt:'Ordena las palabras alfabéticamente.',tokens,help:'El orden es: '+tokens.join(', ')+'. Compara la primera letra; si se repite, mira la siguiente.',alphabet:true};
  }
  if(key==='sustantivos'){const [word,answer,why]=nouns[r];return question('¿Es un sustantivo propio o común?',['Propio','Común'],answer,`${word}: sustantivo ${answer.toLowerCase()}. ${why}`,{clue:word,note:'Propio: un nombre particular, como Ana. Común: una clase de personas, animales, lugares o cosas, como niña.'});}
  if(key==='adjetivos'||key==='verbos')return question(key==='adjetivos'?'¿Qué palabra dice cómo es?':'¿Qué palabra indica la acción?',d.slice(1),key==='adjetivos'?d[1]:d[3],key==='adjetivos'?`${d[1]} es el adjetivo: describe cómo es ${d[0].startsWith('La')?'la':'el'} ${d[2]}.`:`${d[3]} es el verbo: indica la acción.`,{clue:d[0]});
  if(key==='tiempos'){const [clue,answer]=tenses[(r+level-1)%12];return question('¿Cuándo ocurre la acción?',['Pasado','Presente','Futuro'],answer,`${answer}: ${answer==='Pasado'?'ya ocurrió':answer==='Presente'?'ocurre ahora':'ocurrirá después'}. ${clue}`,{clue,note:'Ayer: pasado · Hoy / ahora: presente · Mañana / después: futuro'});}
  if(key==='oraciones')return {type:'order',prompt:'Ordena las palabras para formar una oración.',tokens:s[0].split(' '),help:s[0]+'.',clue:s[1],sentence:true};
  if(key==='escribir')return {type:'writing',prompt:'Escribe una oración sobre la imagen.',clue:s[1],help:'Un ejemplo: '+s[0]+'. Tu oración puede ser diferente.'};
  if(key==='nombre')return {type:'name',prompt:'Practica tu nombre completo a mano.',help:'Observa el modelo. Escribe despacio, una letra a la vez. También puedes practicar en una hoja.'};
  if(key==='vecinos'){
   const before=r%2===1||n===599,answer=before?n-1:n+1;
   return question(`¿Cuál es el ${before?'antecesor':'sucesor'} de ${n}?`,[answer,n,before?(n===599?n-2:n+1):n-1],answer,`${before?'Restamos':'Sumamos'} uno. El ${before?'antecesor':'sucesor'} de ${n} es ${answer}.`,{clue:before?`… ← ${n}`:`${n} → …`});
  }
  if(key==='comparar'){const [a,b]=comparisons[level-1][r],answer=a===b?'=':a<b?'<':'>';return question('Elige el signo correcto.',['<','>','='],answer,`${a} es ${signNames[answer].toLowerCase()} ${b}.`,{clue:`${a} □ ${b}`,signs:true,note:'La parte abierta del signo mira al número mayor.'});}
  if(key==='orden'){
   const start=Math.min(n,[99,299,499,599][level-1]-(level+1)*(level+2));
   const values=Array.from({length:level+2},(_,i)=>start+i*(level+2)).sort((a,b)=>r%2?b-a:a-b);
   return {type:'order',prompt:`Ordena de ${r%2?'mayor a menor':'menor a mayor'}.`,tokens:values.map(String),help:'El orden es: '+values.join(', ')+'.'};
  }
  if(key==='abaco')return {type:'abacus',prompt:`Representa ${n} en el ábaco.`,n,help:`${n} tiene ${Math.floor(n/100)} centenas, ${Math.floor(n/10)%10} decenas y ${n%10} unidades.`};
  if(key==='cifras')return {type:'input',prompt:'Escribe el número con cifras.',clue:numberName(n),answer:String(n),numeric:true,help:`${numberName(n)} se escribe ${n}.`};
  if(key==='palabras')return {type:'input',prompt:'Escribe el número con palabras.',clue:String(n),answer:numberName(n),help:`${n} se escribe ${numberName(n)}.`};
  const parts=[Math.floor(n/100)*100,Math.floor(n/10)%10*10,n%10];
  if(key==='componer')return {type:'input',prompt:'Junta las partes y escribe el número.',clue:parts.join(' + '),answer:String(n),numeric:true,help:parts.join(' más ')+` es igual a ${n}.`};
  if(key==='descomponer')return question(`¿Cómo se descompone ${n}?`,[parts.join(' + '),[parts[0],parts[1],(parts[2]+1)%10].join(' + '),[parts[0],(parts[1]+10)%100,parts[2]].join(' + ')],parts.join(' + '),`${n} es ${parts.join(' más ')}.`,{clue:String(n)});
  if(key==='patron'){
   const step=[1,2,5,10][(r+level-1)%4],down=r%2===1,start=down?Math.max(4*step,n):Math.min([99,299,499,599][level-1]-4*step,n),seq=Array.from({length:5},(_,i)=>start+(down?-1:1)*i*step),answer=seq[4];
   return question('¿Qué número sigue?',[answer,answer===599?answer-1:answer+1,answer>=2?answer-2:answer+2],answer,`${down?'Restamos':'Sumamos'} ${step} cada vez. Sigue el ${answer}.`,{clue:seq.slice(0,4).join(' → ')+' → …'});
  }
  if(key==='doble'){const value=level===1?r+1:level===2?10+r*3:level===3?50+r*7:150+r*13;return {type:'input',prompt:`¿Cuál es el doble de ${value}?`,clue:`${value} + ${value}`,answer:String(value*2),numeric:true,help:`El doble de ${value} es ${value*2}: sumamos ${value} dos veces.`,dots:level===1?value:0};}
  if(key==='figuras'||key==='partes'){
   const shape=shapes[(r+level-1)%shapes.length];
   if(key==='figuras')return question('¿Cómo se llama esta figura?',shapes.map(x=>x[0]),shape[0],`Es un ${shape[0].toLowerCase()}.`,{shape});
   const corners=r%2===1,answer=shape[1];return question(`¿Cuántos ${corners?'vértices':'lados rectos'} tiene?`,[answer,...[0,3,4,5,6].filter(x=>x!==answer).slice(0,3)],answer,`El ${shape[0].toLowerCase()} tiene ${answer} ${corners?'vértices':'lados rectos'}. ${corners?'Los vértices son las esquinas donde se unen dos lados.':'Recorre su borde para contar.'}`,{shape});
  }
  if(key==='angulos')return question('¿Cuál es un ángulo recto?',['A','B','C'],['A','B','C'][r%3],`El ángulo ${['A','B','C'][r%3]} es recto. Tiene una abertura de noventa grados, como la esquina de una hoja.`,{angles:r%3});
  throw Error('Actividad de estudio desconocida');
 }
 const active=()=>games.find(g=>g.id===route);
 function setup(){
  state.q=exercise(active().key,settings.level,round);state.ids=state.q.tokens?shuffle(state.q.tokens.map((_,i)=>String(i))):shuffle(state.q.options||[]);state.beads=[0,0,0];
 }
 function home(){
  main.innerHTML=`<a class="back" href="#inicio">← Mis actividades</a><div class="page-heading"><div><div class="eyebrow">PASO A PASO · SIN PRISA</div><h1>Estudio para mis pruebas</h1><p>Elige una materia. Puedes escuchar, pedir ayuda y repetir.</p></div>${levelPicker('study-level')}</div><div class="study-plan">${groups.map(g=>`<button data-study-section="${g.id}" class="study-date"><span aria-hidden="true">${g.icon}</span><strong>${g.name}</strong><small>${g.date}</small></button>`).join('')}</div><p class="catalog-note">Los cuatro niveles están disponibles. En números: hasta 99, 299, 499 y 599. El nivel 4 reúne el rango completo del temario.</p>${groups.map(g=>`<section class="study-subject" id="study-${g.id}"><div class="section-heading"><div><div class="eyebrow">PRUEBA · ${g.date.toUpperCase()}</div><h2>${g.icon} ${g.name}</h2><p>${g.intro}</p></div></div><div class="activity-grid">${games.filter(a=>a.group===g.id).map(a=>`<a class="activity-card" href="#${a.id}"><div class="card-art ${g.color}"><span aria-hidden="true">${a.icon}</span></div><h3>${a.title}</h3><p>${a.subtitle}</p><div class="card-footer"><span>${a.key==='nombre'?'Práctica libre':a.key==='escribir'?'12 propuestas':'12 retos por nivel'}</span><span aria-hidden="true">→</span></div></a>`).join('')}</div></section>`).join('')}<p class="home-note">Basado en el temario que compartió la familia. Para la letra manuscrita, acompaña la práctica con lápiz y papel y el modelo que usan en su curso.</p>`;
 }
 function shapeSvg(shape){return `<svg class="study-shape" viewBox="0 0 200 190" role="img" aria-label="Figura para observar">${shape[2]?`<polygon points="${shape[2]}"/>`:'<circle cx="100" cy="95" r="70"/>'}</svg>`;}
 function angleSvg(right,variant){const end=right?'60,20':variant?'20,35':'115,30';return `<svg class="study-angle" viewBox="0 0 160 120" role="img" aria-label="Ángulo"><path d="M145 95 L60 95 L${end}"/>${right?'<path class="angle-mark" d="M60 75 H80 V95"/>':''}</svg>`;}
 function render(){
  hideVictory();stopSpeech();const q=state.q,g=active(),subject=groups.find(x=>x.id===g.group);
  let body=instruction(q.prompt,q.type==='order'?'Arrastra o toca una pieza y después su espacio.':'Puedes escuchar la consigna o pedir una ayuda.');
  state.instruction=q.prompt+(q.clue?' '+q.clue:'');
  if(q.alphabet)body+=`<details class="alphabet-help"><summary>Ver el abecedario</summary><p>${alphabet.join(' · ')}</p></details>`;
  if(q.note)body+=`<p class="study-note">${escapeHTML(q.note)}</p>`;
  if(q.clue)body+=`<div class="study-clue">${escapeHTML(q.clue)}</div>`;
  if(q.shape)body+=shapeSvg(q.shape);
  if(q.dots)body+=`<div class="double-dots" aria-label="Dos grupos de ${q.dots}">${[0,1].map(()=>`<span>${'● '.repeat(q.dots)}</span>`).join('<b>+</b>')}</div>`;
  if(q.type==='choice')body+=`<div class="tiles study-answers">${state.ids.map(id=>`<div class="answer-option"><button class="tile text-tile" data-answer="${escapeHTML(id)}" ${state.done?'disabled':''}>${q.angles!==undefined?angleSvg(id===q.answer,id==='A'||id==='C'):''}${escapeHTML(id)}${q.signs?`<small>${signNames[id]}</small>`:''}</button><button class="quiet-btn" data-speak="${escapeHTML(signNames[id]||id)}" aria-label="Escuchar ${escapeHTML(signNames[id]||id)}">♪ Escuchar</button></div>`).join('')}</div>`;
  if(q.type==='order')body+=`<div class="word-slots">${q.tokens.map((_,i)=>{const entry=Object.entries(state.placed).find(([,target])=>target===String(i));return `<button class="word-slot" data-target="${i}" ${entry?'disabled':''} aria-label="Lugar ${i+1}"><small>${i+1}</small>${entry?escapeHTML(q.tokens[entry[0]]):'…'}</button>`;}).join('')}${q.sentence?'<span class="sentence-period">.</span>':''}</div><div class="tiles word-tray">${state.ids.filter(id=>state.placed[id]===undefined).map(id=>`<button class="tile text-tile" data-piece="${id}" aria-pressed="false">${escapeHTML(q.tokens[id])}</button>`).join('')}</div>`;
  if(q.type==='input')body+=`<form id="study-answer-form" class="study-form"><label for="study-answer">Tu respuesta</label><input id="study-answer" maxlength="90" autocomplete="off" value="${state.done?escapeHTML(q.answer):''}" ${q.numeric?'inputmode="numeric" pattern="[0-9]+"':'autocapitalize="off"'} required ${state.done?'disabled':''}><button class="primary" ${state.done?'disabled':''}>Comprobar</button></form>`;
  if(q.type==='abacus')body+=`<div class="abacus" aria-label="Ábaco de centenas, decenas y unidades">${['Centenas','Decenas','Unidades'].map((name,i)=>`<div class="abacus-column"><h3>${name}</h3><small>Cada cuenta vale ${[100,10,1][i]}</small><button class="secondary" data-bead="${i}" data-delta="1" aria-label="Añadir una ${['centena','decena','unidad'][i]}">+</button><div class="abacus-rod" id="rod-${i}" aria-hidden="true"></div><output id="beads-${i}">0</output><button class="secondary" data-bead="${i}" data-delta="-1" aria-label="Quitar una ${['centena','decena','unidad'][i]}">−</button></div>`).join('')}</div><p class="abacus-total" role="status">Mi número: <strong id="abacus-total">0</strong></p><button class="primary" data-study="check-abacus">Comprobar mi ábaco</button>`;
  if(q.type==='writing')body+=`<div class="study-form"><label for="study-writing">Mi oración</label><textarea id="study-writing" rows="3" maxlength="240" placeholder="¿Quién aparece? ¿Qué hace?"></textarea><details><summary>Ver una oración de ejemplo</summary><p>${escapeHTML(q.help)}</p></details><fieldset class="writing-checks"><legend>La revisamos juntos</legend>${['Empieza con mayúscula.','Cuenta una idea que se entiende.','Termina con un punto.'].map((label,i)=>`<label><input type="checkbox" data-review="${i}"> ${label}</label>`).join('')}</fieldset><p class="study-note">Tu oración puede ser distinta del ejemplo. La revisas con un adulto; la página no califica automáticamente lo que escribes.</p><button class="primary" data-study="finish-writing">Ya la revisamos</button></div>`;
  if(q.type==='name')body+=`<div class="study-form"><label for="name-model">Un adulto puede escribir aquí tu nombre completo</label><input id="name-model" value="Max" maxlength="70" autocomplete="off" spellcheck="false"><p class="study-note">Este nombre queda solo en esta pantalla. No se guarda, no se envía y no se lee en voz alta. Usa el modelo de letra manuscrita de tu curso.</p><p id="name-example" class="name-example">Max</p><label for="name-pad">Traza con tu dedo o lápiz digital</label><canvas id="name-pad" width="900" height="300" tabindex="0" aria-label="Espacio para practicar el nombre a mano. También puedes escribirlo en papel."></canvas><div class="game-actions"><button class="secondary" data-study="clear-pad">Borrar trazos</button><button class="primary" data-study="finish-name">Practiqué mi nombre</button></div><p class="study-note">Si prefieres, copia el nombre en una hoja. No se evalúa la caligrafía automáticamente.</p></div>`;
  main.innerHTML=`<a class="back" href="#estudio">← Estudio para mis pruebas</a><div class="activity-header"><div><div class="eyebrow">${subject.name.toUpperCase()} · ${subject.date.toUpperCase()}</div><h1>${g.title}</h1><p>${g.subtitle}</p></div><div class="activity-tools">${levelPicker('study-game-level')}<span class="round-label">${q.type==='name'?'Práctica libre':`Actividad ${round%total+1} de ${total}`}</span></div></div><section class="game-panel">${body}${controls()}${!state.done&&q.type!=='name'?'<button class="quiet-btn study-skip" data-action="skip">Otro reto</button>':''}</section>`;
  if(q.type==='abacus')updateAbacus();if(q.type==='name')initPad();
 }
 function finish(message=state.q.help,effects=['correct']){state.done=true;state.feedback=message;render();feedback(message,true);celebrate(message,settings,effects);afterRenderFocus();}
 function answer(id){if(state.done||!state.ids.includes(id))return;if(id!==state.q.answer){retryFeedback('Probemos otra vez. Puedes pedir una ayuda.',true);return;}finish(state.q.help,['option','correct']);}
 function select(id){if(state.done||!state.ids.includes(id))return;state.selected=state.selected===id?null:id;main.querySelectorAll('[data-piece]').forEach(b=>{b.classList.toggle('selected',b.dataset.piece===state.selected);b.setAttribute('aria-pressed',String(b.dataset.piece===state.selected));});feedback('Ahora toca el espacio donde va.');playEffect('pick',state.q.tokens[id]);}
 function place(id,target){
  const q=state.q;if(state.done||!q.tokens||!state.ids.includes(id)||state.placed[id]!==undefined||Object.values(state.placed).includes(target))return;
  if(q.tokens[id]!==q.tokens[Number(target)]){retryFeedback('Esta pieza va en otro lugar. Puedes pedir una ayuda.');return;}
  state.placed[id]=target;state.selected=null;
  if(Object.keys(state.placed).length===q.tokens.length)finish();else{render();feedback('La palabra está en su lugar. Sigue construyendo.');playEffect('place');afterRenderFocus();}
 }
 function hint(){feedback(state.q.help);playEffect('hint',state.q.help);}
 function check(value){
  const q=state.q;if(state.done)return;
  if(normalize(value)!==normalize(q.answer)){retryFeedback('Revisa tu respuesta. Puedes ver una ayuda y volver a intentar.');return;}
  finish();
 }
 function updateAbacus(){
  state.beads.forEach((n,i)=>{document.getElementById('rod-'+i).innerHTML='<span></span>'.repeat(n);document.getElementById('beads-'+i).textContent=n;main.querySelector(`[data-bead="${i}"][data-delta="-1"]`).disabled=n===0||state.done;main.querySelector(`[data-bead="${i}"][data-delta="1"]`).disabled=n===(i===0?5:9)||state.done;});
  document.getElementById('abacus-total').textContent=state.beads[0]*100+state.beads[1]*10+state.beads[2];
 }
 function initPad(){
  const canvas=document.getElementById('name-pad'),ctx=canvas.getContext('2d');let pointer=null;
  function point(e){const b=canvas.getBoundingClientRect();return [(e.clientX-b.left)*canvas.width/b.width,(e.clientY-b.top)*canvas.height/b.height];}
  ctx.lineWidth=5;ctx.lineCap='round';ctx.strokeStyle='#14695f';
  canvas.addEventListener('pointerdown',e=>{if(pointer!==null)return;pointer=e.pointerId;canvas.setPointerCapture(pointer);ctx.beginPath();ctx.moveTo(...point(e));e.preventDefault();});
  canvas.addEventListener('pointermove',e=>{if(e.pointerId!==pointer)return;ctx.lineTo(...point(e));ctx.stroke();});
  const end=e=>{if(e.pointerId===pointer)pointer=null;};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);
  document.getElementById('name-model').addEventListener('input',e=>{document.getElementById('name-example').textContent=e.target.value;});
 }
 function click(b){
  if(state.done&&b.dataset.study!=='clear-pad')return;
  if(b.dataset.bead!==undefined){if(state.done)return;const i=Number(b.dataset.bead);state.beads[i]=Math.max(0,Math.min(i===0?5:9,state.beads[i]+Number(b.dataset.delta)));updateAbacus();playEffect('tick');}
  if(b.dataset.study==='check-abacus'){if(state.beads[0]*100+state.beads[1]*10+state.beads[2]===state.q.n)finish();else retryFeedback('Mira cuántas centenas, decenas y unidades necesitas. Puedes pedir una ayuda.');}
  if(b.dataset.study==='clear-pad'){const c=document.getElementById('name-pad');c.getContext('2d').clearRect(0,0,c.width,c.height);playEffect('clear');}
  if(b.dataset.study==='finish-name'||b.dataset.study==='finish-writing'){
   if(state.done)return;
   if(b.dataset.study==='finish-writing'&&(!document.getElementById('study-writing').value.trim()||main.querySelectorAll('[data-review]:checked').length!==3)){feedback('Escribe tu idea y revisa las tres pistas con un adulto.');return;}
   // Keep the child's writing on screen; never store it or send it to speech generation.
   state.done=true;state.feedback='¡Terminaste tu práctica! Cada intento cuenta.';feedback(state.feedback,true);celebrate(state.feedback);afterRenderFocus();
  }
 }
 return {groups,games,total,alphabet,numberName,normalize,exercise,active,setup,home,render,answer,select,place,hint,check,click,signNames};
})();
if(typeof module!=='undefined')module.exports=STUDY;
