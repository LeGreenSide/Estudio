'use strict';
const STUDY=(()=>{
 const school=typeof SCHOOL!=='undefined'?SCHOOL:typeof module!=='undefined'?require('./curriculum.js'):null;
 const groups=[
  {id:'lenguaje',name:'Lenguaje',date:'5 de octubre',icon:'📚',color:'mint',intro:'Letras, palabras y oraciones para contar tus ideas.'},
  {id:'numeros',name:'Números hasta el 599',date:'7 de octubre',icon:'🧮',color:'blue',intro:'Construye, compara y descubre cómo funcionan los números.'},
  {id:'geometria',name:'Geometría',date:'9 de octubre',icon:'🔷',color:'lilac',intro:'Observa figuras, cuenta sus partes y encuentra esquinas rectas.'},
  {id:'ciencias',name:'Ciencias Naturales',date:'2° básico',icon:'🌱',color:'mint',intro:'Investiga los seres vivos, tu cuerpo y el mundo que te rodea.'},
  {id:'historia',name:'Historia y Geografía',date:'2° básico',icon:'🗺️',color:'peach',intro:'Conoce Chile, sus paisajes y cómo convivimos en comunidad.'}
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
 ].map(([id,group,title,subtitle,icon])=>({id:'estudio-'+id,key:id,group,title,subtitle,icon})).concat(school?school.games:[]);
 const total=12, alphabet=Array.from('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
 const small=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
 function numberName(n){
  if(n<30)return small[n];
  if(n<100)return ['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'][Math.floor(n/10)]+(n%10?' y '+small[n%10]:'');
  if(n===100)return 'cien';
  return ['','ciento','doscientos','trescientos','cuatrocientos','quinientos'][Math.floor(n/100)]+(n%100?' '+numberName(n%100):'');
 }
 const normalize=s=>String(s).trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
 const numbers=[ [3,8,12,20,25,31,46,50,63,72,88,99], [100,104,119,130,145,170,199,200,205,221,260,299], [300,302,319,340,365,399,400,409,425,460,478,499], [500,501,509,510,521,536,548,560,575,589,598,599], [105,230,407,89,500,316,70,598,201,460,99,540] ];
 const comparisons=[
  [[8,35],[62,20],[14,14],[90,45],[27,70],[50,50],[3,81],[99,99],[76,31],[40,88],[65,65],[58,12]],
  [[100,235],[280,125],[160,160],[45,210],[299,80],[205,205],[170,60],[120,260],[99,99],[245,110],[75,198],[290,290]],
  [[125,346],[480,215],[302,302],[399,140],[86,420],[250,250],[190,365],[499,72],[408,408],[310,155],[230,470],[99,99]],
  [[100,235],[346,125],[509,509],[580,240],[75,420],[360,360],[190,599],[500,85],[128,128],[455,210],[265,540],[599,599]],
  [[105,407],[598,230],[70,70],[89,316],[540,201],[460,460],[99,500],[407,105],[598,598],[316,70],[230,540],[201,201]]
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
 const closeWords=[['cama','camino','campo','canto','capa','casa'],['pala','palma','pan','papel','parque','pato'],['mesa','meta','miel','mina','mochila','mono'],['saco','sal','salto','sapo','seda','silla'],['bala','balde','balón','barco','barrio','bota'],['tapa','tarde','taza','techo','tela','tigre'],['lago','lana','lápiz','leche','león','lobo'],['rana','rata','ratón','remo','risa','rosa'],['dedo','delfín','día','diente','disco','dos'],['gallo','gato','goma','gorra','gota','grano'],['abeja','abrazo','agua','ala','amigo','avión'],['faro','fecha','fila','flan','flor','foco']];
 const challengeSentences=[
  ['La niña pequeña lee un cuento en su cama','👧 📖 🛏️'],['Mi perro blanco corre por el parque al amanecer','🐕 🌳 ☀️'],['El gato negro duerme sobre la silla de madera','🐈 🪑 💤'],['Los niños alegres juegan con una pelota en el patio','🧒 ⚽ 🏡'],
  ['La abuela prepara una sopa caliente para el almuerzo','👵 🥣'],['Un pájaro amarillo construye su nido sobre el árbol','🐦 🪺 🌳'],['Mi hermana guarda los lápices azules en su mochila','👧 ✏️ 🎒'],['El jardinero riega las flores rojas durante la mañana','🧑‍🌾 🌷 💧'],
  ['La profesora escribe una oración larga en la pizarra','👩‍🏫 ✏️'],['Los amigos comparten una rica merienda después del colegio','🧒 🍎 🏫'],['Una mariposa pequeña vuela entre las flores del jardín','🦋 🌷'],['Mi familia visita la biblioteca para buscar libros nuevos','👨‍👩‍👦 📚']
 ];
 const contextNouns=[['Ana cuida su planta.','Ana','planta','cuida'],['Max ordena sus libros.','Max','libros','ordena'],['Chile tiene muchos paisajes.','Chile','paisajes','tiene'],['Valentina lee un cuento.','Valentina','cuento','lee'],['Pedro visita el museo.','Pedro','museo','visita'],['Sofía dibuja un árbol.','Sofía','árbol','dibuja'],['Santiago tiene parques.','Santiago','parques','tiene'],['Tomás alimenta al conejo.','Tomás','conejo','alimenta'],['Camila prepara una ensalada.','Camila','ensalada','prepara'],['Diego pinta su barco.','Diego','barco','pinta'],['Antofagasta tiene playas.','Antofagasta','playas','tiene'],['Lucía observa una estrella.','Lucía','estrella','observa']];
 const agreements=[['Las flores son…','rojas','roja','rojo'],['El gato es…','pequeño','pequeña','pequeños'],['Los árboles son…','altos','alto','alta'],['La sopa está…','caliente','calientes','calentados'],['Las niñas están…','contentas','contenta','contentos'],['El cielo está…','despejado','despejada','despejados'],['Los zapatos son…','nuevos','nuevo','nueva'],['La mochila es…','azul','azules','azulados'],['Las mesas son…','redondas','redonda','redondos'],['El pan está…','tostado','tostada','tostados'],['Los osos son…','grandes','grande','grandota'],['La pelota es…','liviana','liviano','livianas']];
 const contextVerbs=[['El perro pequeño corrió hacia su casa.','corrió','perro','pequeño'],['Las niñas pintan una casa amarilla.','pintan','niñas','amarilla'],['Mi hermano preparará una rica sopa.','preparará','hermano','rica'],['El pájaro amarillo construyó su nido.','construyó','pájaro','amarillo'],['Los gatos negros duermen bajo la mesa.','duermen','gatos','negros'],['La profesora escribirá un cuento breve.','escribirá','profesora','breve'],['Mi abuela compró un libro nuevo.','compró','abuela','nuevo'],['Los vecinos riegan las plantas pequeñas.','riegan','vecinos','pequeñas'],['El conejo blanco saltará por el patio.','saltará','conejo','blanco'],['Las amigas compartieron una rica merienda.','compartieron','amigas','rica'],['Mi familia visita la biblioteca grande.','visita','familia','grande'],['La niña llevará su mochila roja.','llevará','niña','roja']];
 const shapes=[['Cuadrado',4,'40,30 160,30 160,150 40,150'],['Rectángulo',4,'20,50 180,50 180,140 20,140'],['Triángulo',3,'100,25 180,150 20,150'],['Círculo',0,''],['Pentágono',5,'100,20 180,78 150,165 50,165 20,78'],['Hexágono',6,'60,25 140,25 180,95 140,165 60,165 20,95']];
 const signNames={'<':'Menor que','>':'Mayor que','=':'Igual a'};
 function question(prompt,options,answer,help,extra={}){return {type:'choice',prompt,options:options.map(String),answer:String(answer),help,...extra};}
 function exercise(key,level,index){
  if(school&&school.games.some(g=>g.key===key))return school.exercise(key,level,index);
  const r=index%total,n=numbers[level-1][r],s=level===5?challengeSentences[r]:sentences[(r+2*(level-1))%sentences.length],d=level===5?contextVerbs[r]:descriptions[r];
  if(key==='letras'){
   if(level===5){const at=(r*2+3)%24,answer=alphabet[at+1]+' y '+alphabet[at+2];return question('¿Qué dos letras faltan?', [answer,alphabet[at+2]+' y '+alphabet[at+1],alphabet[(at+5)%27]+' y '+alphabet[(at+6)%27]],answer,`El orden es ${alphabet.slice(at,at+4).join(', ')}.`,{clue:`${alphabet[at]} · … · … · ${alphabet[at+3]}`,alphabet:true});}
   const at=(r*2+level)%25+1,answer=alphabet[at];
   return question('¿Qué letra falta?', [answer,alphabet[(at+3)%27],alphabet[(at+7)%27]],answer,`${alphabet[at-1]}, ${answer}, ${alphabet[at+1]}. La letra que falta es ${answer}.`,{clue:`${alphabet[at-1]} · … · ${alphabet[at+1]}`,alphabet:true});
  }
  if(key==='alfabeto'){
   const tokens=level===5?closeWords[r].slice().sort(new Intl.Collator('es',{sensitivity:'base'}).compare):wordSets[r].slice(0,level+2);
   return {type:'order',prompt:'Ordena las palabras alfabéticamente.',tokens,help:'El orden es: '+tokens.join(', ')+'. Compara la primera letra; si se repite, mira la siguiente.',alphabet:true};
  }
  if(key==='sustantivos'){if(level===5){const [clue,proper,common,verb]=contextNouns[r],own=r%2===0,answer=own?proper:common;return question(`Encuentra el sustantivo ${own?'propio':'común'} en la oración.`,[proper,common,verb],answer,`${answer} es un sustantivo ${own?'propio: es un nombre particular':'común: nombra una clase de seres, lugares o cosas'}.`,{clue});}const [word,answer,why]=nouns[r];return question('¿Es un sustantivo propio o común?',['Propio','Común'],answer,`${word}: sustantivo ${answer.toLowerCase()}. ${why}`,{clue:word,note:'Propio: un nombre particular, como Ana. Común: una clase de personas, animales, lugares o cosas, como niña.'});}
  if(key==='adjetivos'&&level===5){const [clue,answer,...others]=agreements[r];return question('Completa con el adjetivo que concuerda.',[answer,...others],answer,clue.replace('…',answer)+'. El adjetivo debe concordar con el sustantivo.',{clue});}
  if(key==='verbos'&&level===5)return question('Encuentra la acción en la oración.',d.slice(1),d[1],`${d[1]} es el verbo: indica la acción.`,{clue:d[0]});
  if(key==='adjetivos'||key==='verbos')return question(key==='adjetivos'?'¿Qué palabra dice cómo es?':'¿Qué palabra indica la acción?',d.slice(1),key==='adjetivos'?d[1]:d[3],key==='adjetivos'?`${d[1]} es el adjetivo: describe cómo es ${d[0].startsWith('La')?'la':'el'} ${d[2]}.`:`${d[3]} es el verbo: indica la acción.`,{clue:d[0]});
  if(key==='tiempos'){const [clue,answer]=level===5?[contextVerbs[r][0],['Pasado','Presente','Futuro'][r%3]]:tenses[(r+level-1)%12];return question('¿Cuándo ocurre la acción?',['Pasado','Presente','Futuro'],answer,`${answer}: ${answer==='Pasado'?'ya ocurrió':answer==='Presente'?'ocurre ahora':'ocurrirá después'}. ${clue}`,{clue,note:level===5?'Observa cómo termina el verbo para reconocer el tiempo.':'Ayer: pasado · Hoy / ahora: presente · Mañana / después: futuro'});}
  if(key==='oraciones')return {type:'order',prompt:'Ordena las palabras para formar una oración.',tokens:s[0].split(' '),help:s[0]+'.',clue:s[1],sentence:true};
  if(key==='escribir')return {type:'writing',prompt:level===5?'Escribe una oración: cuenta quién aparece, qué hace y cómo es.':'Escribe una oración sobre la imagen.',clue:s[1],help:'Un ejemplo: '+s[0]+'. Tu oración puede ser diferente.'};
  if(key==='nombre')return {type:'name',prompt:level===5?'Escribe tu nombre completo de memoria y después revisa el modelo.':'Practica tu nombre completo a mano.',help:level===5?'Escribe tus nombres y apellidos. Comprueba las mayúsculas iniciales, el orden de las letras y los espacios.':'Observa el modelo. Escribe despacio, una letra a la vez. También puedes practicar en una hoja.',memory:level===5};
  if(key==='vecinos'){
   const before=r%2===1||n===599,answer=before?n-1:n+1;
   return question(`¿Cuál es el ${before?'antecesor':'sucesor'} de ${n}?`,[answer,n,before?(n===599?n-2:n+1):n-1],answer,`${before?'Restamos':'Sumamos'} uno. El ${before?'antecesor':'sucesor'} de ${n} es ${answer}.`,{clue:before?`… ← ${n}`:`${n} → …`});
  }
  if(key==='comparar'){const [a,b]=comparisons[level-1][r],answer=a===b?'=':a<b?'<':'>';return question('Elige el signo correcto.',['<','>','='],answer,`${a} es ${signNames[answer].toLowerCase()} ${b}.`,{clue:`${a} □ ${b}`,signs:true,note:'La parte abierta del signo mira al número mayor.'});}
  if(key==='orden'){
   const start=Math.min(n,[99,299,499,599,599][level-1]-(level+1)*(level+2));
   const values=(level===5?Array.from({length:6},(_,i)=>(n+i*83)%600):Array.from({length:level+2},(_,i)=>start+i*(level+2))).sort((a,b)=>r%2?b-a:a-b);
   return {type:'order',prompt:`Ordena de ${r%2?'mayor a menor':'menor a mayor'}.`,tokens:values.map(String),help:'El orden es: '+values.join(', ')+'.'};
  }
  if(key==='abaco')return {type:'abacus',prompt:`Representa ${n} en el ábaco.`,n,help:`${n} tiene ${Math.floor(n/100)} centenas, ${Math.floor(n/10)%10} decenas y ${n%10} unidades.`};
  if(key==='cifras')return {type:'input',prompt:'Escribe el número con cifras.',clue:numberName(n),answer:String(n),numeric:true,help:`${numberName(n)} se escribe ${n}.`};
  if(key==='palabras')return {type:'input',prompt:'Escribe el número con palabras.',clue:String(n),answer:numberName(n),help:`${n} se escribe ${numberName(n)}.`};
  const parts=[Math.floor(n/100)*100,Math.floor(n/10)%10*10,n%10];
  if(key==='componer'){const terms=level===5?[parts[2],parts[0],parts[1]]:parts;return {type:'input',prompt:'Junta las partes y escribe el número.',clue:terms.join(' + '),answer:String(n),numeric:true,help:terms.join(' más ')+` es igual a ${n}.`};}
  if(key==='descomponer')return question(`¿Cómo se descompone ${n}?`,[parts.join(' + '),[parts[0],parts[1],(parts[2]+1)%10].join(' + '),[parts[0],(parts[1]+10)%100,parts[2]].join(' + ')],parts.join(' + '),`${n} es ${parts.join(' más ')}.`,{clue:String(n)});
  if(key==='patron'){
   const step=(level===5?[2,5,10,100]:[1,2,5,10])[(r+level-1)%4],down=r%2===1,start=down?Math.max(4*step,n):Math.min([99,299,499,599,599][level-1]-4*step,n),seq=Array.from({length:5},(_,i)=>start+(down?-1:1)*i*step),hole=level===5?1+r%3:4,answer=seq[hole];
   return question(level===5?'¿Qué número falta?':'¿Qué número sigue?',[answer,answer===599?answer-1:answer+1,answer>=2?answer-2:answer+2],answer,`${down?'Restamos':'Sumamos'} ${step} cada vez. ${level===5?'Falta':'Sigue'} el ${answer}.`,{clue:seq.map((value,i)=>i===hole?'…':value).join(' → ')});
  }
  if(key==='doble'){const value=level===5?[12,14,16,18,21,23,25,30,32,34,40,45][r]:level===1?r+1:level===2?10+r*3:level===3?50+r*7:150+r*13;return {type:'input',prompt:level===5?'Lee el problema y escribe cuántos hay en total.':`¿Cuál es el doble de ${value}?`,clue:level===5?`Hay ${value} lápices en una caja y la misma cantidad en otra caja. ¿Cuántos lápices hay entre las dos?`:`${value} + ${value}`,answer:String(value*2),numeric:true,help:`El doble de ${value} es ${value*2}: sumamos ${value} dos veces.`,dots:level===1?value:0};}
  if(key==='figuras'||key==='partes'){
   const shape=shapes[(r+level-1)%shapes.length];
   if(level===5){
    if(key==='figuras'){const clues=['Tengo cuatro lados iguales y cuatro ángulos rectos.','Tengo cuatro ángulos rectos: dos lados largos y dos cortos.','Tengo tres lados rectos y tres vértices.','Tengo un borde curvo y ningún vértice.','Tengo cinco lados rectos y cinco vértices.','Tengo seis lados rectos y seis vértices.','Tengo cuatro lados iguales y mis esquinas son como las de una hoja.','Mi forma tiene cuatro lados: los opuestos son iguales, dos largos y dos cortos.','Soy un polígono con un lado menos que un cuadrado.','Mi borde es redondo: no tengo lados rectos.','Tengo un lado más que un cuadrado.','Tengo un lado más que un pentágono.'],answer=shapes[r%6][0];return question('Lee las pistas y descubre la figura.',shapes.map(x=>x[0]),answer,`Es un ${answer.toLowerCase()}. ${clues[r]}`,{clue:clues[r]});}
    const first=shapes[r%6],second=shapes[(r+2+(r>=6?1:0))%6],corners=r%2===1,answer=first[1]+second[1];return question(`¿Cuántos ${corners?'vértices':'lados rectos'} tienen en total estas dos figuras?`,[answer,answer+1,answer+2,Math.max(0,answer-1)],answer,`El ${first[0].toLowerCase()} tiene ${first[1]} y el ${second[0].toLowerCase()} tiene ${second[1]}. En total: ${first[1]} más ${second[1]} es ${answer}.`,{clue:`${first[0]} + ${second[0]}`});
   }
   if(key==='figuras')return question('¿Cómo se llama esta figura?',shapes.map(x=>x[0]),shape[0],`Es un ${shape[0].toLowerCase()}.`,{shape});
   const corners=r%2===1,answer=shape[1];return question(`¿Cuántos ${corners?'vértices':'lados rectos'} tiene?`,[answer,...[0,3,4,5,6].filter(x=>x!==answer).slice(0,3)],answer,`El ${shape[0].toLowerCase()} tiene ${answer} ${corners?'vértices':'lados rectos'}. ${corners?'Los vértices son las esquinas donde se unen dos lados.':'Recorre su borde para contar.'}`,{shape});
  }
  if(key==='angulos'){
   if(level===5){const examples=[['Una hoja rectangular tiene cuatro esquinas. ¿Cuántas son ángulos rectos?','4'],['Un cuadrado tiene cuatro esquinas. ¿Cuántas son ángulos rectos?','4'],['Un círculo no tiene esquinas. ¿Cuántos ángulos rectos tiene?','0'],['Juntas dos hojas rectangulares sin tapar sus esquinas. ¿Cuántos ángulos rectos cuentan entre las dos?','8'],['Giras una hoja rectangular. ¿Cuántos ángulos rectos tiene ahora?','4'],['Giras un cuadrado para apoyar una punta hacia abajo. ¿Cuántos ángulos rectos conserva?','4'],['Miras solo una esquina de una hoja rectangular. ¿Cuántos ángulos rectos estás mirando?','1'],['Miras dos esquinas de una puerta rectangular. ¿Cuántos ángulos rectos ves?','2'],['Un aro circular no tiene esquinas. ¿Cuántos ángulos rectos tiene?','0'],['Hay dos cuadrados separados. ¿Cuántos ángulos rectos tienen en total?','8'],['Observas tres esquinas de un cuaderno rectangular. ¿Cuántos ángulos rectos estás contando?','3'],['Tapas una esquina de un cuadrado. ¿Cuántos ángulos rectos quedan visibles?','3']],[clue,answer]=examples[r];return question('Aplica lo que sabes de los ángulos rectos.',[answer,...['0','1','2','3','4','8'].filter(x=>x!==answer).slice(r%2,3+r%2)],answer,`La respuesta es ${answer}. Cada esquina de un cuadrado o rectángulo forma un ángulo recto, aunque gires la figura. Un círculo no tiene esquinas.`,{clue});}
   return question('¿Cuál es un ángulo recto?',['A','B','C'],['A','B','C'][r%3],`El ángulo ${['A','B','C'][r%3]} es recto. Tiene una abertura de noventa grados, como la esquina de una hoja.`,{angles:r%3});
  }
  throw Error('Actividad de estudio desconocida');
 }
 const active=()=>games.find(g=>g.id===route);
 function setup(){
  state.q=exercise(active().key,settings.level,round);state.ids=state.q.tokens?shuffle(state.q.tokens.map((_,i)=>String(i))):shuffle(state.q.options||[]);state.beads=[0,0,0];
 }
 function home(){
  const visible=studySubject?groups.filter(g=>g.id===studySubject):groups;
  main.innerHTML=`<a class="back" href="#inicio">← Inicio</a><div class="page-heading"><div><div class="eyebrow">2.º BÁSICO · CHILE</div><h1>Mis materias</h1><p>Elige qué practicar. Cada respuesta incluye una explicación.</p></div>${levelPicker('study-level')}</div>${subjectLinks()}${studySubject?'<a class="back" href="#estudio">Ver todas las materias →</a>':''}<p class="catalog-note">Nivel 5 · Aplico lo aprendido: interpreta, resuelve y combina pistas.</p>${visible.map(g=>`<section class="study-subject" id="study-${g.id}"><div class="section-heading"><div><div class="eyebrow">${g.id==='geometria'?'MATEMÁTICA':'APRENDER Y PRACTICAR'}</div><h2>${g.icon} ${g.id==='numeros'?'Matemática':g.name}</h2><p>${g.intro}</p></div></div><div class="activity-grid">${games.filter(a=>a.group===g.id).sort((a,b)=>Number(!!b.oa)-Number(!!a.oa)).map(a=>`<a class="activity-card" href="#${a.id}"><div class="card-art ${g.color}"><span aria-hidden="true">${a.icon}</span></div>${a.oa?'<div class="tag">REFUERZO · 2.º BÁSICO</div>':'<div class="tag">PRÁCTICA DEL COLEGIO</div>'}<h3>${a.title}</h3><p>${a.subtitle}</p><div class="card-footer"><span>${a.key==='nombre'?'Práctica de escritura':'12 retos · 5 niveles'}</span><span aria-hidden="true">→</span></div></a>`).join('')}</div></section>`).join('')}<p class="curriculum-note">Selección de aprendizajes del <a href="https://www.curriculumnacional.cl/614/w3-propertyvalue-49411.html" target="_blank" rel="noopener noreferrer">currículum de 2.º básico de MINEDUC</a>. Incluye además el temario del colegio con números hasta 599. Para letra manuscrita, practica también en tu cuaderno.</p>`;
 }
 function learningVisual(q){
  if(q.clock)return `<div class="visual-clock" aria-label="Reloj digital: ${escapeHTML(q.clock)}">${escapeHTML(q.clock)}</div>`;
  if(q.dataRows)return `<table class="pictogram"><caption>${escapeHTML(q.note||'Cada círculo representa '+q.dataScale)}</caption><tbody>${q.dataRows.map(row=>`<tr><th scope="row">${escapeHTML(row.label)}</th><td><span aria-hidden="true">${'● '.repeat(row.count)}</span><span class="sr-only">${row.count} símbolos: ${row.count*q.dataScale} en total</span></td></tr>`).join('')}</tbody></table>`;
  if(q.ruler)return `<div class="study-ruler" role="img" aria-label="${escapeHTML(q.clue)}"><div class="ruler-object" style="margin-left:${q.ruler.start/q.ruler.max*100}%;width:${(q.ruler.end-q.ruler.start)/q.ruler.max*100}%">Lápiz</div><div class="ruler-ticks">${Array.from({length:q.ruler.max+1},(_,i)=>`<span style="left:${i/q.ruler.max*100}%">${i}</span>`).join('')}</div><p>Centímetros · dibujo de una regla</p></div>`;
  if(q.mapGrid)return `<div class="study-map"><p>↑ Norte</p><div class="map-cells" role="img" aria-label="Plano. ${escapeHTML(q.clue)}">${q.mapGrid.flat().map(name=>`<div>${escapeHTML(name)}</div>`).join('')}</div><p class="map-legend">Oeste ← · → Este · ↓ Sur</p></div>`;
  return '';
 }
 function shapeSvg(shape){return `<svg class="study-shape" viewBox="0 0 200 190" role="img" aria-label="Figura para observar">${shape[2]?`<polygon points="${shape[2]}"/>`:'<circle cx="100" cy="95" r="70"/>'}</svg>`;}
 function angleSvg(right,variant){const end=right?'60,20':variant?'20,35':'115,30';return `<svg class="study-angle" viewBox="0 0 160 120" role="img" aria-label="Ángulo"><path d="M145 95 L60 95 L${end}"/>${right?'<path class="angle-mark" d="M60 75 H80 V95"/>':''}</svg>`;}
 function render(){
  hideVictory();stopSpeech();const q=state.q,g=active(),subject=groups.find(x=>x.id===g.group);
  let body=instruction(q.prompt,q.type==='order'?'Arrastra o toca una pieza y después su espacio.':q.type==='input'?'Escribe tu respuesta y pulsa Comprobar.':'Lee o escucha y toca tu respuesta.');
  state.instruction=q.prompt+(q.clue?' '+q.clue:'');
  if(q.alphabet)body+=`<details class="alphabet-help"><summary>Ver el abecedario</summary><p>${alphabet.join(' · ')}</p></details>`;
  if(q.note&&!q.dataRows)body+=`<p class="study-note">${escapeHTML(q.note)}</p>`;
  body+=learningVisual(q);
  if(q.clock||q.dataRows||q.mapGrid||q.ruler)body+=`<details class="study-visual-description"><summary>Leer la información del dibujo</summary><p>${escapeHTML(q.clue)}</p></details>`;
  else if(q.clue)body+=`<div class="study-clue ${q.clue.length>55?'reading-clue':''}">${escapeHTML(q.clue)}</div>`;
  if(q.shape)body+=shapeSvg(q.shape);
  if(q.dots)body+=`<div class="double-dots" aria-label="Dos grupos de ${q.dots}">${[0,1].map(()=>`<span>${'● '.repeat(q.dots)}</span>`).join('<b>+</b>')}</div>`;
  if(q.type==='choice')body+=`<div class="tiles study-answers">${state.ids.map(id=>`<div class="answer-option"><button class="tile text-tile" data-answer="${escapeHTML(id)}" ${state.done?'disabled':''}>${q.angles!==undefined?angleSvg(id===q.answer,id==='A'||id==='C'):''}${escapeHTML(id)}${q.signs?`<small>${signNames[id]}</small>`:''}</button><button class="quiet-btn" data-speak="${escapeHTML(signNames[id]||id)}" aria-label="Escuchar ${escapeHTML(signNames[id]||id)}">♪ Escuchar</button></div>`).join('')}</div>`;
  if(q.type==='order')body+=`<div class="word-slots">${q.tokens.map((_,i)=>{const entry=Object.entries(state.placed).find(([,target])=>target===String(i));return `<button class="word-slot" data-target="${i}" ${entry?'disabled':''} aria-label="Lugar ${i+1}"><small>${i+1}</small>${entry?escapeHTML(q.tokens[entry[0]]):'…'}</button>`;}).join('')}${q.sentence?'<span class="sentence-period">.</span>':''}</div><div class="tiles word-tray">${state.ids.filter(id=>state.placed[id]===undefined).map(id=>`<button class="tile text-tile" data-piece="${id}" aria-pressed="false">${escapeHTML(q.tokens[id])}</button>`).join('')}</div>`;
  if(q.type==='input')body+=`<form id="study-answer-form" class="study-form"><label for="study-answer">Tu respuesta</label><input id="study-answer" maxlength="90" autocomplete="off" value="${state.done?escapeHTML(q.answer):''}" ${q.numeric?'inputmode="numeric" pattern="[0-9]+"':'autocapitalize="off"'} required ${state.done?'disabled':''}><button class="primary" ${state.done?'disabled':''}>Comprobar</button></form>`;
  if(q.type==='abacus')body+=`<div class="abacus" aria-label="Ábaco de centenas, decenas y unidades">${['Centenas','Decenas','Unidades'].map((name,i)=>`<div class="abacus-column"><h3>${name}</h3><small>Cada cuenta vale ${[100,10,1][i]}</small><button class="secondary" data-bead="${i}" data-delta="1" aria-label="Añadir una ${['centena','decena','unidad'][i]}">+</button><div class="abacus-rod" id="rod-${i}" aria-hidden="true"></div><output id="beads-${i}">0</output><button class="secondary" data-bead="${i}" data-delta="-1" aria-label="Quitar una ${['centena','decena','unidad'][i]}">−</button></div>`).join('')}</div><p class="abacus-total" role="status">Mi número: <strong id="abacus-total">0</strong></p><button class="primary" data-study="check-abacus">Comprobar mi ábaco</button>`;
  if(q.type==='writing')body+=`<div class="study-form"><label for="study-writing">Mi oración</label><textarea id="study-writing" rows="3" maxlength="240" placeholder="¿Quién aparece? ¿Qué hace?"></textarea><details><summary>Ver una oración de ejemplo</summary><p>${escapeHTML(q.help)}</p></details><fieldset class="writing-checks"><legend>La revisamos juntos</legend>${['Empieza con mayúscula.','Cuenta una idea que se entiende.','Termina con un punto.'].map((label,i)=>`<label><input type="checkbox" data-review="${i}"> ${label}</label>`).join('')}</fieldset><p class="study-note">Tu oración puede ser distinta del ejemplo. La revisas con un adulto; la página no califica automáticamente lo que escribes.</p><button class="primary" data-study="finish-writing">Ya la revisamos</button></div>`;
  if(q.type==='name')body+=`<div class="study-form">${q.memory?'<details><summary>Ver el modelo y revisar mi nombre</summary>':''}<label for="name-model">Un adulto puede escribir aquí tu nombre completo</label><input id="name-model" value="Max" maxlength="70" autocomplete="off" spellcheck="false"><p class="study-note">Este nombre queda solo en esta pantalla. No se guarda, no se envía y no se lee en voz alta. Usa el modelo de letra manuscrita de tu curso.</p><p id="name-example" class="name-example">Max</p>${q.memory?'</details>':''}<label for="name-pad">Traza con tu dedo o lápiz digital</label><canvas id="name-pad" width="900" height="300" tabindex="0" aria-label="Espacio para practicar el nombre a mano. También puedes escribirlo en papel."></canvas><div class="game-actions"><button class="secondary" data-study="clear-pad">Borrar trazos</button><button class="primary" data-study="finish-name">Practiqué mi nombre</button></div><p class="study-note">Si prefieres, copia el nombre en una hoja. No se evalúa la caligrafía automáticamente.</p></div>`;
  main.innerHTML=`<a class="back" href="#estudio/${g.group}">← ${g.group==='numeros'?'Matemática':subject.name}</a><div class="activity-header"><div><div class="eyebrow">${(g.group==='numeros'?'Matemática':subject.name).toUpperCase()} · 2.º BÁSICO</div><h1>${g.title}</h1><p>${g.subtitle}</p></div><div class="activity-tools">${levelPicker('study-game-level')}${q.type==='name'?'<span class="round-label">Práctica de escritura</span>':''}</div></div><section class="game-panel">${q.type!=='name'?`<div class="lesson-progress"><span>Reto ${round%total+1} de ${total}</span><progress value="${round%total+(state.done?1:0)}" max="${total}" aria-label="Avance en el recorrido de retos"></progress></div>`:''}${body}${controls()}${!state.done&&q.type!=='name'?'<button class="quiet-btn study-skip" data-action="skip">Otro reto</button>':''}</section>`;
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
