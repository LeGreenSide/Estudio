'use strict';
// School notice, November 2026; official scope and limits are documented in CURRICULUM.md.
const NOVEMBER=(()=>{
 const games=[
  ['genero-numero','lenguaje','Palabras que concuerdan','Combina género, número y artículos.','🧩'],
  ['sinonimos','lenguaje','Otra palabra, una idea','Encuentra palabras de significado parecido.','💬'],
  ['diminutivos','lenguaje','Palabras pequeñitas','Relaciona palabras y sus diminutivos.','🐣'],
  ['manuscrita','lenguaje','Del texto a mi mano','Copia palabras y oraciones a mano.','✍️'],
  ['dictado799','numeros','Escucho y escribo','Dictado de números hasta el 799.','🎧'],
  ['palabras799','numeros','Números en palabras','Escribe el nombre de cada número.','🔤'],
  ['orden799','numeros','La escalera hasta 799','Ordena números de menor a mayor y al revés.','🪜'],
  ['comparar799','numeros','¿Mayor, menor o igual?','Compara números variados hasta 799.','⚖️'],
  ['abaco799','numeros','Construyo hasta 799','Representa centenas, decenas y unidades.','🧮'],
  ['componer799','numeros','Armo el número','Junta centenas, decenas y unidades.','🧱'],
  ['descomponer799','numeros','Desarmo el número','Encuentra el valor de cada cifra.','🔎'],
  ['sumas','numeros','Sumo y hago canjes','Suma con y sin reserva, paso a paso.','➕'],
  ['restas','numeros','Quito y comparo','Resta y descubre cuánto queda o falta.','➖'],
  ['problemas799','numeros','Resuelvo una situación','Lee, elige una operación y resuelve.','🛒'],
  ['estaciones','ciencias','El año cambia','Relaciona estaciones, seres vivos y tiempo.','🍂'],
  ['patrimonio','historia','Tesoros de Chile','Clasifica patrimonio natural y cultural.','🏞️'],
  ['tradiciones','historia','Costumbres que compartimos','Reconoce y cuida tradiciones y relatos.','🧶'],
  ['comunidad','historia','¿Quién nos ayuda?','Relaciona servicios e instituciones con su labor.','🏛️'],
  ['normas','historia','Cuidamos lo que es de todos','Elige y explica acuerdos para convivir.','🤝']
 ].map(([key,group,title,subtitle,icon])=>({id:'estudio-'+key,key,group,title,subtitle,icon,exam:'noviembre'}));
 const choice=(prompt,answer,wrong,help,extra={})=>({type:'choice',prompt,answer:String(answer),options:[answer,...wrong].map(String),help,...extra});
 const input=(prompt,answer,help,extra={})=>({type:'input',prompt,answer:String(answer),numeric:true,help,...extra});
 const order=(prompt,tokens,help,extra={})=>({type:'order',prompt,tokens,help,...extra});
 const numbers=[
  [8,15,26,30,47,52,69,70,84,91,99,10],
  [105,120,203,219,300,346,407,450,500,526,580,599],
  [600,601,615,628,640,657,670,688,690,699,604,650],
  [700,701,715,728,740,757,770,788,790,799,704,750],
  [706,670,709,790,608,680,507,750,609,799,600,700]
 ];
 const nounForms=[
  ['gato','gatos','El','Los','negro','negros'],['casa','casas','La','Las','pequeña','pequeñas'],
  ['perro','perros','El','Los','blanco','blancos'],['flor','flores','La','Las','roja','rojas'],
  ['libro','libros','El','Los','nuevo','nuevos'],['pelota','pelotas','La','Las','redonda','redondas'],
  ['árbol','árboles','El','Los','alto','altos'],['mochila','mochilas','La','Las','azul','azules'],
  ['zapato','zapatos','El','Los','limpio','limpios'],['mesa','mesas','La','Las','larga','largas'],
  ['conejo','conejos','El','Los','blanco','blancos'],['niña','niñas','La','Las','alegre','alegres']
 ];
 const synonyms=[
  ['feliz','contento','triste','El niño está feliz.'],['rápido','veloz','lento','El corredor es rápido.'],
  ['bonita','hermosa','fea','La flor es bonita.'],['grande','enorme','pequeño','El árbol es grande.'],
  ['pequeño','chico','enorme','El gato es pequeño.'],['iniciar','comenzar','terminar','Vamos a iniciar el juego.'],
  ['terminar','acabar','empezar','Debemos terminar el dibujo.'],['mirar','observar','esconder','Voy a mirar el paisaje.'],
  ['saltar','brincar','dormir','El conejo puede saltar.'],['camino','sendero','pared','Seguimos el camino.'],
  ['regalo','obsequio','castigo','Recibí un regalo.'],['cuidar','proteger','dañar','Vamos a cuidar el bosque.']
 ];
 const diminutives=[['casa','casita'],['gato','gatito'],['perro','perrito'],['mesa','mesita'],['libro','librito'],['pato','patito'],['flor','florecita'],['pan','panecito'],['pez','pececito'],['luz','lucecita'],['taza','tacita'],['zapato','zapatito']];
 const copies=[
  ['Sol','El sol brilla.','El sol ilumina mi ventana.'],['Luna','La luna sale.','La luna aparece sobre el cerro.'],
  ['Casa','Mi casa es roja.','Mi casa tiene una puerta roja.'],['Gato','El gato duerme.','El gato pequeño duerme en su cama.'],
  ['Flor','La flor crece.','La flor amarilla crece en el jardín.'],['Libro','Leo un libro.','Leo un libro con mi familia.'],
  ['Árbol','El árbol es alto.','El árbol del patio tiene hojas verdes.'],['Niña','La niña canta.','La niña alegre canta una canción.'],
  ['Agua','Cuido el agua.','Cierro la llave para cuidar el agua.'],['Plaza','Voy a la plaza.','Voy a la plaza y cuido sus plantas.'],
  ['Amigo','Juego con mi amigo.','Mi amigo y yo respetamos los turnos.'],['Escuela','Voy a la escuela.','En la escuela aprendemos cosas nuevas.']
 ];
 const seasons=['Verano','Otoño','Invierno','Primavera'];
 const seasonalCases=[
  ['En Chile central suelen aumentar las temperaturas y hay días largos.','Verano','☀️'],
  ['Muchos árboles de hoja caduca pierden sus hojas en Chile central.','Otoño','🍂'],
  ['En Chile central suele hacer más frío y llover más.','Invierno','🌧️'],
  ['En muchos jardines de Chile central aparecen brotes y flores.','Primavera','🌱'],
  ['En un día de mucho calor buscamos sombra y bebemos agua.','Verano','🌳'],
  ['Las hojas de un árbol caduco cambian de color antes de caer.','Otoño','🍁'],
  ['En un lugar frío usamos ropa que conserva el calor corporal.','Invierno','🧥'],
  ['Un árbol caduco comienza a formar hojas nuevas después del invierno.','Primavera','🌿'],
  ['En Chile, enero y febrero están dentro de esta estación.','Verano','📅'],
  ['La estación que sigue al verano en el ciclo anual.','Otoño','🍂'],
  ['En Chile, julio está dentro de esta estación.','Invierno','📅'],
  ['En Chile, octubre y noviembre están dentro de esta estación.','Primavera','🌼']
 ];
 const seasonReasons=[
  ['Hoy llueve en verano. ¿Puede ocurrir?','Sí, el tiempo puede variar dentro de una estación','No, todos los días del verano son iguales','Una estación tiene tendencias; el tiempo de un día puede ser distinto.'],
  ['Un árbol pierde hojas en otoño. ¿Todos los árboles lo hacen?','No, los de hoja perenne conservan hojas','Sí, todos quedan sin hojas','Hay árboles de hoja caduca y otros de hoja perenne.'],
  ['¿En todo Chile nieva cada invierno?','No, depende del lugar y sus condiciones','Sí, nieva en todas las ciudades','Chile tiene lugares con condiciones distintas; no todos reciben nieve.'],
  ['Hay más flores y algunos insectos las visitan. ¿Qué relación observas?','Los cambios de las plantas afectan a otros seres vivos','Las estaciones no se relacionan con los seres vivos','Flores e insectos pueden relacionarse; los cambios del ambiente influyen en sus actividades.'],
  ['Hace calor y la tierra de una maceta está seca. ¿Qué conviene hacer?','Revisar si la planta necesita agua y regar lo necesario','Regar sin parar todo el día','Las plantas necesitan agua, pero hay que evitar malgastarla.'],
  ['Queremos saber si un otoño fue más lluvioso que otro. ¿Qué sirve?','Comparar registros de lluvia de ambos otoños','Adivinar por una sola foto','Los registros de períodos comparables permiten fundamentar una conclusión.'],
  ['En un día frío, un ave busca refugio. ¿Qué muestra?','El tiempo puede influir en el comportamiento de los animales','El ave cambió el nombre de la estación','Los seres vivos responden a condiciones del ambiente.'],
  ['¿Una flor basta para conocer con certeza la estación?','No, necesitamos más datos y el lugar','Sí, cualquier flor significa primavera','Puede haber flores en otros momentos. Es importante considerar el lugar y más observaciones.'],
  ['Max viajará. ¿Basta saber que es verano para elegir toda su ropa?','No, también conviene revisar el pronóstico del lugar','Sí, nunca hay cambios del tiempo','El pronóstico local ayuda a prepararse para las condiciones esperadas.'],
  ['En otoño caen hojas en un parque. ¿Qué acción cuida ese lugar?','Respetar las indicaciones de cuidado del parque','Romper las ramas para que caigan más','Los cambios naturales se observan sin dañar los seres vivos.'],
  ['Dos ciudades tienen temperaturas diferentes el mismo día. ¿Es posible?','Sí, el tiempo puede ser distinto según el lugar','No, todo Chile tiene la misma temperatura','El tiempo se describe para un lugar y un momento.'],
  ['Un niño dice que el invierno es una nube. ¿Qué corriges?','Invierno es una estación; nube es algo que observamos en el cielo','Invierno y nube significan lo mismo','Una estación es una parte del ciclo del año; una nube es un elemento del tiempo observado.']
 ];
 const heritage=[
  ['La cueca','Cultural','Un baile que se aprende y se transmite.','🎶'],['La araucaria','Natural','Un árbol nativo que forma parte de nuestra naturaleza.','🌲'],
  ['Un relato tradicional de la comunidad','Cultural','Una historia transmitida entre generaciones.','📖'],['El cóndor','Natural','Un ave característica de nuestra fauna.','🦅'],
  ['La cerámica de Pomaire','Cultural','Una artesanía hecha y enseñada por personas.','🏺'],['El desierto de Atacama','Natural','Un paisaje natural del norte de Chile.','🏜️'],
  ['Una iglesia histórica de Chiloé','Cultural','Una construcción con historia y valor para la comunidad.','⛪'],['El huemul','Natural','Un animal nativo de Chile.','🦌'],
  ['Una receta tradicional de la familia','Cultural','Un conocimiento culinario que se comparte.','🥣'],['Un bosque nativo','Natural','Un conjunto de seres vivos y su ambiente.','🌳'],
  ['Una fiesta tradicional de la localidad','Cultural','Una celebración compartida por una comunidad.','🎉'],['Un paisaje de Torres del Paine','Natural','Un paisaje con montañas y otros elementos naturales.','🏔️']
 ];
 const traditions=[
  ['Una abuela enseña una receta a su nieto.','Una costumbre familiar','Una medición de temperatura','Las recetas pueden transmitirse entre generaciones.'],
  ['En una comunidad cuentan una leyenda de su localidad.','Una tradición oral','Una cuenta matemática','Los relatos que se cuentan y transmiten son parte de la tradición oral.'],
  ['Un grupo practica pasos de cueca.','Una expresión cultural','Una especie de árbol','Los bailes son expresiones culturales que se aprenden y comparten.'],
  ['Una artesana enseña a modelar greda.','Un conocimiento artesanal','Un pronóstico','La artesanía reúne conocimientos y técnicas transmitidas por personas.'],
  ['En una localidad preparan una fiesta que celebran cada año.','Una celebración tradicional','Un paisaje sin personas','Las comunidades pueden mantener y transformar sus celebraciones.'],
  ['Dos familias celebran de maneras diferentes.','Ambas merecen respeto','Solo una puede tener costumbres','No todas las familias tienen las mismas tradiciones.'],
  ['Un niño graba, con permiso, un relato de su abuelo.','Ayuda a conservar una historia','Demuestra que todos los relatos son hechos comprobados','Registrar un relato permite compartirlo; una leyenda no es igual a un hecho histórico comprobado.'],
  ['Una receta antigua se adapta a ingredientes disponibles.','Las tradiciones pueden cambiar','Toda tradición debe ser idéntica para siempre','Las costumbres pueden mantenerse y también transformarse con el tiempo.'],
  ['Una familia prepara una comida para recordar a sus mayores.','Relaciona pasado y presente','Cambia las estaciones','Las costumbres pueden ayudar a recordar historias familiares.'],
  ['Queremos aprender una costumbre de otra comunidad.','Preguntamos y escuchamos con respeto','Nos burlamos de lo diferente','Escuchar permite conocer otras formas de vivir y celebrar.'],
  ['Una persona no participa en una celebración.','Respetamos su decisión','La obligamos a participar','Respetar las tradiciones también implica respetar las decisiones de las personas.'],
  ['En clase comparamos una foto antigua y una actual de una fiesta.','Buscamos qué cambió y qué se mantuvo','Suponemos que todo es igual sin mirar','Las fuentes permiten observar cambios y continuidades.']
 ];
 const services=[
  ['Museo','Conserva y presenta objetos y relatos del patrimonio','🏛️'],['Biblioteca','Facilita libros y acceso a información','📚'],
  ['Guardaparques','Ayudan a cuidar áreas naturales y orientan a visitantes','🌲'],['Consejo de Monumentos Nacionales','Contribuye a la protección de monumentos del país','🏛️'],
  ['Transporte público','Permite trasladarse de un lugar a otro','🚌'],['Radio','Comunica información y noticias mediante sonido','📻'],
  ['Mercado','Permite comprar y vender productos','🥕'],['Bomberos','Ayudan a enfrentar incendios y otras emergencias','🚒'],
  ['Municipalidad','Atiende asuntos y servicios de la comuna','🏢'],['Correos','Lleva cartas y paquetes a sus destinos','✉️'],
  ['Centro de salud','Atiende necesidades de salud de las personas','🏥'],['Escuela','Organiza oportunidades para aprender y convivir','🏫']
 ];
 const communityCases=[
  ['Queremos conocer y observar objetos antiguos conservados.','Museo'],['Queremos pedir un libro para leer.','Biblioteca'],
  ['Visitamos un parque protegido y necesitamos orientación.','Guardaparques'],['Buscamos información sobre la protección de monumentos.','Consejo de Monumentos Nacionales'],
  ['Necesitamos viajar por la ciudad sin auto particular.','Transporte público'],['Queremos escuchar noticias de nuestra localidad.','Radio'],
  ['Necesitamos comprar frutas y verduras.','Mercado'],['Un adulto pide ayuda ante un incendio.','Bomberos'],
  ['Un adulto consulta por el cuidado de una plaza de la comuna.','Municipalidad'],['Queremos enviar una carta a otra ciudad.','Correos'],
  ['Una familia busca atención por un problema de salud.','Centro de salud'],['Queremos aprender y compartir en un curso.','Escuela']
 ];
 const norms=[
  ['Hay un sendero señalizado en el parque.','Caminar por el sendero','Arrancar plantas para abrir otro camino','Protege las plantas y ayuda a cuidarnos.','🌳'],
  ['En el museo hay una pieza que no se puede tocar.','Observar sin tocar','Golpearla para ver de qué está hecha','Ayuda a conservar un objeto que otras personas también conocerán.','🏺'],
  ['Esperamos para usar un juego de la plaza.','Respetar los turnos','Empujar para pasar primero','Permite que todos participen sin dañarse.','🛝'],
  ['Terminamos una colación en el patio.','Guardar la basura en el lugar indicado','Dejar envoltorios en el suelo','Mantiene limpio un espacio que usamos en común.','🧃'],
  ['Una compañera necesita pasar por una rampa.','Mantener la rampa libre','Dejar mochilas bloqueándola','La accesibilidad permite que todos puedan desplazarse.','♿'],
  ['Encontramos un objeto de otra persona.','Entregarlo a un adulto responsable para devolverlo','Quedárnoslo sin avisar','Respetamos las pertenencias de los demás y actuamos con honestidad.','🎒'],
  ['La biblioteca tiene una zona de lectura silenciosa.','Conversar en voz baja en esa zona','Gritar junto a quienes leen','Respetamos la actividad y la concentración de otras personas.','📚'],
  ['En la playa vemos animales silvestres.','Observarlos a distancia sin alimentarlos','Perseguirlos para tomarlos','Evitamos dañarlos y alterar su forma de alimentarse.','🐦'],
  ['El curso decide cómo cuidar los materiales comunes.','Proponer acuerdos y escuchar a los demás','Decidir sin dejar hablar a nadie','Los acuerdos funcionan mejor cuando comprendemos su propósito.','✏️'],
  ['Una amiga tiene una costumbre distinta.','Escucharla con respeto','Burlarse de su familia','Las personas merecen respeto aunque tengan costumbres diferentes.','🤝'],
  ['Durante un juego cometemos un error.','Reconocerlo y seguir las reglas','Hacer trampa para ocultarlo','La honestidad permite confiar y disfrutar del juego.','🎲'],
  ['Vemos basura peligrosa o vidrios en la plaza.','Avisar a un adulto y mantener distancia','Recoger vidrios con las manos','Podemos cuidar el espacio sin exponernos a un daño.','⚠️']
 ];
 function exercise(key,level,index,numberName){
  const r=index%12,l=Math.max(1,Math.min(5,level)),n=numbers[l-1][r];
  if(key==='genero-numero'){
   const [one,many,article,plural,adj,adjs]=nounForms[r],female=article==='La';
   if(l===1)return choice('¿Qué género gramatical tiene esta palabra?',female?'Femenino':'Masculino',[female?'Masculino':'Femenino'],`${article.toLowerCase()} ${one}: género ${female?'femenino':'masculino'}.`,{clue:one});
   if(l===2){const multiple=r%3!==0;return choice('¿Está en singular o en plural?',multiple?'Plural':'Singular',[multiple?'Singular':'Plural'],multiple?'Plural: nombra más de uno.':'Singular: nombra uno.',{clue:multiple?many:one});}
   if(l===3){const multiple=r%2===0,answer=multiple?plural:article;return choice('Elige el artículo que concuerda.',answer,['El','La','Los','Las'].filter(x=>x!==answer).slice(0,2),`${answer} ${multiple?many:one}. Coinciden el género y el número.`,{clue:`___ ${multiple?many:one}`});}
   if(l===4)return order('Arma el grupo de palabras: artículo, sustantivo y adjetivo.',[plural,many,adjs],`${plural} ${many} ${adjs}. Las tres palabras concuerdan.`,{clue:'Más de uno: usa el plural.'});
   return choice('¿Qué grupo de palabras concuerda?',`${plural} ${many} ${adjs}`,[`${article} ${many} ${adj}`,`${plural} ${one} ${adj}`],`${plural} ${many} ${adjs}: artículo, sustantivo y adjetivo están en plural.`,{clue:`Transforma al plural: ${article} ${one} ${adj}.`});
  }
  if(key==='sinonimos'){
   const [word,same,opposite,sentence]=synonyms[r],wrong=[opposite,'ayer'].slice(0,l===1?1:2);
   if(l===1)return choice('¿Qué palabra tiene un significado parecido?',same,wrong,`${word} y ${same} tienen significados parecidos en este ejemplo.`,{clue:word});
   if(l===2)return choice(`¿Qué palabra puede reemplazar «${word}»?`,same,wrong,sentence.replace(word,same),{clue:sentence});
   if(l===3)return order('Arma la relación: palabra, enlace y sinónimo.',[word,'se parece en significado a',same],`${word} se parece en significado a ${same}.`,{clue:sentence});
   if(l===4)return choice('¿Qué oración mantiene una idea parecida?',sentence.replace(word,same),[sentence.replace(word,opposite),sentence.replace(word,'ayer')],`Usar «${same}» mantiene una idea parecida en esta oración.`,{clue:sentence});
   return choice('Una revisión cambió la palabra y cambió la idea. ¿Qué palabra recupera un sentido parecido al original?',same,[opposite,word==='camino'?'cocina':'nunca'],`En este contexto, «${same}» puede reemplazar a «${word}». Los sinónimos dependen del contexto.`,{clue:`Original: ${sentence} Cambio: ${sentence.replace(word,opposite)}`});
  }
  if(key==='diminutivos'){
   const [base,small]=diminutives[r],other=diminutives[(r+1)%12];
   if(l===1)return choice('Elige el diminutivo.',small,[other[1]],`${small} es un diminutivo de ${base}.`,{clue:base});
   if(l===2)return choice(`¿De qué palabra viene «${small}»?`,base,[other[0],diminutives[(r+4)%12][0]],`${base} → ${small}.`,{clue:'Un diminutivo puede expresar tamaño pequeño o cariño.'});
   if(l===3)return order('Arma la relación: palabra, enlace y diminutivo.',[base,'puede cambiar a',small],`${base} puede cambiar a ${small}.`,{clue:'Busca la palabra y su forma diminutiva.'});
   if(l===4)return choice('¿Qué pareja relaciona una palabra con su diminutivo?',`${base} → ${small}`,[`${base} → ${other[1]}`,`${other[0]} → ${small}`],`${base} y ${small} conservan una relación de significado.`,{clue:'No basta con que una palabra sea corta.'});
   return {type:'input',prompt:`Escribe el diminutivo indicado: «${base}» usando la terminación «${small.endsWith('cita')?'cita':small.endsWith('cito')?'cito':small.endsWith('ita')?'ita':'ito'}».`,answer:small,help:`Una forma correcta para esta actividad es ${small}. Hay palabras que admiten más de un diminutivo.`,clue:`Completa el modelo: ${small.slice(0,Math.max(1,small.length-3))}___`};
  }
  if(key==='manuscrita'){
   const c=copies[r],model=l===1?c[0]:l===2?c[1]:l===3?c[2]:l===4?c[2]+' '+c[1]:c[2]+' ¿Puedes leerlo?';
   return {type:'copy',prompt:'Transcribe el texto con letra manuscrita.',model,help:'Compara letra por letra con el modelo. Revisa mayúsculas, espacios y signos con un adulto.',clue:model};
  }
  if(key==='dictado799')return input('Escucha el número y escríbelo con cifras.',n,`${numberName(n)} se escribe ${n}.`,{audioText:numberName(n)});
  if(key==='palabras799')return {type:'input',prompt:'Escribe el número con palabras.',clue:String(n),answer:numberName(n),help:`${n} se escribe ${numberName(n)}.`};
  if(key==='abaco799')return {type:'abacus',prompt:`Representa ${n} en el ábaco.`,n,maxHundreds:7,help:`${n}: ${Math.floor(n/100)} centenas, ${Math.floor(n/10)%10} decenas y ${n%10} unidades.`};
  if(key==='comparar799'){
   const a=n,b=r%3===2?a:l===5?[670,706,709,709,680,608,750,507,699,609,700,600][r]:(n+(l===1?33:130+l*43))%[100,600,700,800][l-1],answer=a===b?'=':a<b?'<':'>';
   return choice('Elige el signo correcto.',['<','>','='].find(x=>x===answer),['<','>','='].filter(x=>x!==answer),`${a} es ${answer==='='?'igual a':answer==='<'?'menor que':'mayor que'} ${b}.`,{clue:`${a} □ ${b}`,signs:true});
  }
  if(key==='orden799'){
   const values=Array.from({length:Math.min(6,l+2)},(_,i)=>(n+i*(l===1?17:l===5?11:97))%[100,600,700,800,800][l-1]).sort((a,b)=>r%2?b-a:a-b);
   return order(`Ordena de ${r%2?'mayor a menor':'menor a mayor'}.`,values.map(String),'El orden es: '+values.join(', ')+'.');
  }
  const parts=[Math.floor(n/100)*100,Math.floor(n/10)%10*10,n%10];
  if(key==='componer799'){const terms=l===5?[parts[2],parts[0],parts[1]]:parts;return input('Junta las partes y escribe el número.',n,`${terms.join(' más ')} es ${n}.`,{clue:terms.join(' + ')});}
  if(key==='descomponer799')return choice(`¿Cómo se descompone ${n}?`,parts.join(' + '),[[parts[0],parts[1],(parts[2]+1)%10].join(' + '),[parts[0],(parts[1]+10)%100,parts[2]].join(' + ')],`${n} es ${parts.join(' más ')}.`,{clue:String(n)});
  if(key==='sumas'||key==='restas'){
   const plus=key==='sumas';let a,b;
   if(l===1){a=3+r%4;b=1+r%3;if(!plus)a+=b;}
   else if(l===2){a=21+(r%6)*10+r%3;b=11+(r%4)*10+r%3;if(!plus)a+=b;}
   else if(l===3){a=18+r*2;b=7+r%8;if(!plus){b=3+r%7;a=42+r*3;}}
   else if(l===4){a=126+r*11;b=115+r*7;if(!plus)a+=b;}
   else {a=248+r*19;b=137+r*9;if(!plus){a=700-r*11;b=125+r*13;}}
   const result=plus?a+b:a-b,units=(a%10)+(b%10),tens=Math.floor(a/10)%10+Math.floor(b/10)%10+Math.floor(units/10);
   const why=plus?(units>=10?`${units} unidades: cambiamos 10 unidades por 1 decena y quedan ${units%10} unidades. `:'Sumamos las unidades. ')+(tens>=10?`Ahora hay ${tens} decenas: cambiamos 10 decenas por 1 centena. `:''):'Restar permite encontrar lo que queda o la diferencia. ';
   return input(plus?'Resuelve la suma.':'Resuelve la resta.',result,`${a} ${plus?'más':'menos'} ${b} es ${result}. ${why}`,{clue:`${a} ${plus?'+':'−'} ${b}`,calculation:{a,b,op:plus?'+':'−'},note:plus?'Suma unidades, después decenas y centenas. Si juntas 10, cambia por una del orden siguiente.':'Puedes usar dibujos, separar el número o comprobar sumando el resultado y lo que quitaste.'});
  }
  if(key==='problemas799'){
   const a=[12,24,47,125,306][l-1]+r,b=[3,12,18,24,137][l-1]+r%4,plus=r%2===0,result=plus?a+b:a-b;
   const clue=plus?`En la biblioteca había ${a} libros. Llegaron ${b} libros más. ¿Cuántos hay ahora?`:`En una caja había ${a} lápices. Se entregaron ${b}. ¿Cuántos quedan?`;
   if(l===1)return choice('¿Qué operación resuelve el problema?',plus?'Sumar':'Restar',[plus?'Restar':'Sumar'],plus?'Al llegar más, sumamos.':'Al entregar una parte, restamos.',{clue});
   if(l===5){const c=5+r%6;return input('Resuelve las dos acciones. ¿Cuántos libros quedan?',a+b-c,`${a} más ${b} es ${a+b}. Después, ${a+b} menos ${c} es ${a+b-c}.`,{clue:`Había ${a} libros. Llegaron ${b} y luego prestaron ${c}.`,calculation:{a,b,c,op:'two'}});}
   return input('Lee el problema y escribe la cantidad final.',result,`${a} ${plus?'más':'menos'} ${b} es ${result}.`,{clue,calculation:{a,b,op:plus?'+':'−'}});
  }
  if(key==='estaciones'){
   const [clue,season,icon]=seasonalCases[r],i=seasons.indexOf(season);
   if(l===1)return choice('¿Qué estación corresponde a esta pista?',season,[seasons[(i+2)%4]],`${season}. ${clue}`,{clue,sceneIcon:icon});
   if(l===2)return choice(`Después de ${season.toLowerCase()}, ¿qué estación viene?`,seasons[(i+1)%4],[season,seasons[(i+3)%4]],`El ciclo es verano, otoño, invierno, primavera y vuelve a comenzar.`,{clue:'Piensa en el ciclo anual de las estaciones.',sceneIcon:icon});
   if(l===3){const tokens=Array.from({length:4},(_,j)=>seasons[(i+j)%4]);return order(`Ordena el ciclo comenzando en ${season.toLowerCase()}.`,tokens,tokens.join(', ')+'. Después el ciclo vuelve a comenzar.',{sceneIcon:icon});}
   const row=seasonReasons[(r+(l===5?4:0))%12];return choice(l===4?'Relaciona el tiempo y el ambiente.':'Revisa la afirmación. ¿Qué conclusión está mejor apoyada?',row[1],[row[2],l===5?'Un solo día permite asegurar cómo será todo el año':'No hace falta observar el lugar'],row[3],{clue:row[0],sceneIcon:icon});
  }
  if(key==='patrimonio'){
   const [name,type,why,icon]=heritage[r],other=type==='Natural'?'Cultural':'Natural';
   if(l===1)return choice('¿Es patrimonio natural o cultural?',type,[other],`${type}: ${why}`,{clue:name,sceneIcon:icon});
   if(l===2)return choice(`¿Cuál es un ejemplo de patrimonio ${type.toLowerCase()}?`,name,[heritage[(r+1)%12][0],heritage[(r+3)%12][0]],why,{clue:'Natural: naturaleza. Cultural: obras, saberes y prácticas de las personas.'});
   if(l===3)return order('Ordena: ejemplo, clasificación y explicación.',[name,`es patrimonio ${type.toLowerCase()}`,type==='Natural'?'porque forma parte de la naturaleza':'porque expresa la cultura de las personas'],why,{sceneIcon:icon});
   if(l===4)return choice('¿Qué acción ayuda a cuidar este patrimonio?',type==='Natural'?'Observar sin dañar y respetar las indicaciones':'Aprender su historia y conservarlo con respeto',[type==='Natural'?'Arrancar o perseguir lo que encontremos':'Dañarlo para llevar un recuerdo','Suponer que no importa para nadie'],`Cuidar ${name.toLowerCase()} permite que otras personas también lo conozcan.`,{clue:name,sceneIcon:icon});
   return choice('¿Qué razón explica su clasificación?',why,[heritage[(r+1)%12][2],'Es patrimonio solo porque aparece en una foto'],`${name}: patrimonio ${type.toLowerCase()}. ${why}`,{clue:`Una ficha clasifica «${name}» como ${type.toLowerCase()}.`,sceneIcon:icon});
  }
  if(key==='tradiciones'){
   const row=traditions[r];
   if(l<=2)return choice(l===1?'¿Qué describe esta situación?':'¿Qué aprendemos sobre esta costumbre?',row[1],[row[2],...(l===2?['Todas las personas deben hacer exactamente lo mismo']:[])],row[3],{clue:row[0],sceneIcon:'🧶'});
   if(l===3){const tokens=[['Las recetas','pueden pasar','de una generación a otra'],['Los relatos orales','se transmiten','al contarlos'],['La cueca','es','una expresión cultural'],['La artesanía','reúne','conocimientos y técnicas'],['Una celebración','puede ser','parte de una tradición'],['Las familias','pueden tener','costumbres diferentes'],['Grabar un relato con permiso','ayuda a','conservarlo'],['Las tradiciones','también pueden','transformarse'],['Las costumbres','relacionan','pasado y presente'],['Podemos aprender','escuchando','con respeto'],['Cada persona','puede decidir','si participa'],['Las fotos','ayudan a observar','cambios y continuidades']][r];return order('Arma una idea para conocer las tradiciones.',tokens,tokens.join(' ')+'.',{clue:row[0]});}
   if(l===4)return choice('¿Qué explicación corresponde a la situación?',row[3],[traditions[(r+3)%12][3],'Todas las tradiciones son iguales y nunca cambian'],row[3],{clue:row[0]});
   return choice('¿Qué conclusión respeta lo que sabemos?',row[1],[row[2],'Una sola familia representa las costumbres de todas'],row[3],{clue:`Piensa en la diversidad y en la transmisión de costumbres. ${row[0]}`});
  }
  if(key==='comunidad'){
   const [name,task,icon]=services[r],others=[services[(r+1)%12][0],services[(r+5)%12][0]];
   if(l===1)return choice('¿Quién cumple esta labor?',name,others.slice(0,1),`${name}: ${task.toLowerCase()}.`,{clue:task,sceneIcon:icon});
   if(l===2)return choice('¿Qué servicio o institución necesitamos?',communityCases[r][1],others,`${name}: ${task.toLowerCase()}.`,{clue:communityCases[r][0]});
   if(l===3)return order('Relaciona el servicio con su aporte.',[name,'ayuda a la comunidad:',task.toLowerCase()],`${name}: ${task.toLowerCase()}.`,{sceneIcon:icon});
   if(l===4)return choice(`¿Qué labor corresponde a ${name.toLowerCase()}?`,task,[services[(r+2)%12][1],services[(r+4)%12][1]],`${name}: ${task.toLowerCase()}.`,{clue:'Compara las funciones de los servicios.',sceneIcon:icon});
   return choice('¿Qué relación está bien construida?',`${name}: ${task.toLowerCase()}`,[`${name}: ${services[(r+1)%12][1].toLowerCase()}`,`${services[(r+1)%12][0]}: ${task.toLowerCase()}`],`Las instituciones y servicios tienen labores diferentes. ${name}: ${task.toLowerCase()}.`,{clue:communityCases[r][0]});
  }
  if(key==='normas'){
   const [scene,good,bad,why,icon]=norms[r];
   if(l===1)return choice('¿Qué acción cuida a las personas o al lugar?',good,[bad],why,{clue:scene,sceneIcon:icon});
   if(l===2)return choice('Elige un acuerdo adecuado.',good,[bad,'Hacer lo que quiera sin considerar a nadie'],why,{clue:scene,sceneIcon:icon});
   if(l===3)return order('Arma el acuerdo: acción y razón.',[good,'es importante porque',why[0].toLowerCase()+why.slice(1)],why,{clue:scene});
   if(l===4)return choice('¿Por qué es importante este acuerdo?',why,[norms[(r+2)%12][3],'Porque solo importa quien llega primero'],why,{clue:`${scene} Acuerdo: ${good.toLowerCase()}.`});
   return choice('Evalúa la propuesta. ¿Qué cambio conviene hacer?',good,[bad,'Mantener la propuesta aunque perjudique a otros'],why,{clue:`${scene} Alguien propone: ${bad.toLowerCase()}.`,sceneIcon:icon});
  }
  throw Error('Actividad de noviembre desconocida: '+key);
 }
 return {games,exercise,numbers};
})();
if(typeof module!=='undefined')module.exports=NOVEMBER;
