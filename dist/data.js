'use strict';
const LEARNING = (() => {
  const words = {
    perro: ['🐕', 'Perro', 'animales'], gato: ['🐈', 'Gato', 'animales'], vaca: ['🐄', 'Vaca', 'animales'], pajaro: ['🐦', 'Pájaro', 'animales'],
    manzana: ['🍎', 'Manzana', 'alimentos'], platano: ['🍌', 'Plátano', 'alimentos'], pan: ['🍞', 'Pan', 'alimentos'], leche: ['🥛', 'Leche', 'alimentos'], zanahoria: ['🥕', 'Zanahoria', 'alimentos'],
    polera: ['👕', 'Polera', 'ropa'], pantalon: ['👖', 'Pantalón', 'ropa'], zapatos: ['👟', 'Zapatos', 'ropa'], gorro: ['🧢', 'Gorro', 'ropa'],
    auto: ['🚗', 'Auto', 'transportes'], bus: ['🚌', 'Bus', 'transportes'], bicicleta: ['🚲', 'Bicicleta', 'transportes'], avion: ['✈️', 'Avión', 'transportes'],
    pelota: ['⚽', 'Pelota', 'juguetes'], oso: ['🧸', 'Osito', 'juguetes'], agua: ['💧', 'Agua', 'necesidades'], parque: ['🌳', 'Parque', 'lugares'], casa: ['🏠', 'Casa', 'lugares'], nino: ['🧒', 'Niño', 'personas'],
    comer: ['🍽️', 'Comer', 'acciones'], jugar: ['🧩', 'Jugar', 'acciones'], dormir: ['🛏️', 'Dormir', 'acciones'], cuchara: ['🥄', 'Cuchara', 'objetos'], sopa: ['🍲', 'Sopa', 'alimentos'], pera:['🍐','Pera','alimentos'], camion:['🚚','Camión','transportes'],
    bano:['🚽','Ir al baño','necesidades'],abrazo:['🫂','Un abrazo','necesidades'],silencio:['🤫','Silencio','necesidades'],descanso:['🌿','Un descanso','necesidades'],cuento:['📖','Un cuento','objetos'],pasear:['🚶','Pasear','acciones'],musica:['🎵','Música','objetos'],ayuda:['🤝','Ayuda','necesidades']
  };
  const categories = { animales: ['🐾', 'Animales'], alimentos: ['🍎', 'Alimentos'], ropa: ['👕', 'Ropa'], transportes: ['🚌', 'Transportes'] };
  const activities = [
    { id: 'clasificar', title: 'Cada cosa en su lugar', subtitle: 'Junta lo que va en el mismo grupo.', tag: 'VOCABULARIO', icon: '🧺', color: 'mint', type: 'Arrastrar y soltar' },
    { id: 'intruso', title: 'Encuentra el diferente', subtitle: 'Descubre cuál es de otro grupo.', tag: 'ASOCIACIONES', icon: '🔎', color: 'peach', type: 'Elegir una imagen' },
    { id: 'preguntas', title: 'Mira y descubre', subtitle: '¿Qué? ¿Quién? ¿Dónde? Exploremos.', tag: 'COMPRENSIÓN', icon: '🌳', color: 'blue', type: 'Preguntas con imágenes' },
    { id: 'puzle', title: 'Pieza a pieza', subtitle: 'Arma la imagen y cuenta qué ves.', tag: 'OBSERVAR Y CONVERSAR', icon: '🧩', color: 'lilac', type: 'Puzle de 4 a 12 piezas' },
    { id: 'frases', title: 'Construyo mi mensaje', subtitle: 'Elige palabras para decir lo que quieres.', tag: 'COMUNICACIÓN', icon: '💬', color: 'yellow', type: 'Palabras que se unen' },
    { id: 'secuencia', title: 'Primero… después', subtitle: 'Ordena los pasos de cada día.', tag: 'LENGUAJE COTIDIANO', icon: '🪴', color: 'rose', type: 'Ordenar imágenes' },
    { id: 'ordenar', title: 'Armo una oración', subtitle: 'Une palabras y cuenta lo que pasa.', tag: 'ARMADO DE ORACIONES', icon: '🧱', color: 'blue', type: '36 oraciones para ordenar' },
    { id: 'completar', title: 'La palabra que falta', subtitle: 'Completa cada frase con sentido.', tag: 'PALABRAS EN CONTEXTO', icon: '✏️', color: 'yellow', type: '24 frases para completar' },
    { id: 'historias', title: 'Pequeños cuentos', subtitle: 'Escucha, imagina y descubre.', tag: 'COMPRENDER Y CONTAR', icon: '📖', color: 'peach', type: '9 cuentos · 27 preguntas' }
  ];
  const groups = [ ['animales', 'alimentos'], ['ropa', 'transportes'], ['animales', 'ropa'], ['alimentos', 'transportes'] ];
  const intruders = [
    { ids: ['manzana', 'platano', 'zanahoria', 'pelota'], answer: 'pelota', why: 'La pelota es un juguete. Los demás son alimentos.' },
    { ids: ['perro', 'gato', 'auto', 'vaca'], answer: 'auto', why: 'El auto es un transporte. Los demás son animales.' },
    { ids: ['polera', 'pantalon', 'pan', 'zapatos'], answer: 'pan', why: 'El pan es un alimento. Los demás son ropa.' },
    { ids: ['bus', 'bicicleta', 'pajaro', 'auto'], answer: 'pajaro', why: 'El pájaro es un animal. Los demás son transportes.' }
  ];
  const questions = [
    { kind:'¿QUÉ?', text:'¿Qué come el niño?', ids:['manzana','pan','platano','sopa'], answer:'manzana', model:'El niño come una manzana.' },
    { kind:'¿QUIÉN?', text:'¿Quién come la manzana?', ids:['nino','perro','gato','vaca'], answer:'nino', model:'El niño come la manzana.' },
    { kind:'¿DÓNDE?', text:'¿Dónde está el niño?', ids:['parque','casa'], answer:'parque', model:'El niño está en el parque.' },
    { kind:'¿CÓMO?', text:'¿Cómo es la manzana? Mira su color.', options:[['🔴','Roja'],['🔵','Azul'],['🟡','Amarilla']], answer:'Roja', model:'La manzana es roja.' },
    { kind:'¿CUÁL?', text:'¿Cuál elegirías para jugar?', ids:['pelota','oso','bicicleta'], preference:true, model:'Puedes elegir lo que te guste. Todas las respuestas valen.' },
    { kind:'¿CUÁNDO?', text:'Tengo sueño. ¿Cuándo puedo descansar?', options:[['🛏️','Cuando tengo sueño'],['🥤','Cuando tengo sed']], answer:'Cuando tengo sueño', model:'Puedo descansar cuando tengo sueño.', context:'Cuando tengo sueño, mi cuerpo necesita descansar.' },
    { kind:'¿POR QUÉ?', text:'Tengo sed. ¿Por qué bebo agua?', options:[['💧','Porque tengo sed'],['🛏️','Porque tengo sueño']], answer:'Porque tengo sed', model:'Bebo agua porque tengo sed.', context:'Tengo sed. Tomo agua para calmar la sed.' },
    { kind:'¿PARA QUÉ?', text:'¿Para qué sirve una cuchara?', ids:['comer','dormir','jugar'], answer:'comer', model:'Una cuchara sirve para comer.', context:'Con una cuchara puedo comer sopa.' }
  ];
  const sequences = [
    { title:'Lavarse las manos', steps:[['🚰','Mojar las manos'],['🧼','Lavar con jabón'],['💦','Enjuagar'],['👐','Secar las manos']], short:[['🧼','Lavar las manos'],['👐','Secar las manos']] },
    { title:'Comer un plátano', steps:[['🍌','Tomar el plátano'],['🤲','Pelar el plátano'],['😋','Comer el plátano']], short:[['🤲','Pelar el plátano'],['😋','Comer el plátano']] },
    { title:'Salir a jugar', steps:[['👟','Ponerse los zapatos'],['🚪','Salir de casa'],['⚽','Jugar con la pelota']], short:[['👟','Ponerse los zapatos'],['⚽','Jugar con la pelota']] }
  ];
  const levels={1:{name:'Primeros pasos',choices:2,pieces:4},2:{name:'Explorar',choices:4,pieces:6},3:{name:'Un nuevo reto',choices:4,pieces:12},4:{name:'Conecto mis ideas',choices:4,pieces:16},5:{name:'Aplico lo aprendido',choices:4,pieces:16}};
  const sentenceRows=[
    [1,'El perro duerme','🐕 🛏️'],[1,'La niña salta','👧 ⬆️'],[1,'El gato come','🐈 🍽️'],[1,'El bebé ríe','👶 😊'],
    [1,'La vaca camina','🐄 👣'],[1,'El pájaro vuela','🐦 ☁️'],[1,'El niño bebe agua','🧒 🥤 💧'],[1,'La niña come pan','👧 🍽️ 🍞'],
    [1,'Mamá lee un cuento','👩 📖'],[1,'Papá lava la taza','👨 🧼 ☕'],[1,'Yo quiero jugar','🙋 🧩'],[1,'Yo necesito ayuda','🙋 🤝'],
    [2,'El perro duerme en casa','🐕 🛏️ 🏠'],[2,'La niña juega con su pelota','👧 ⚽'],[2,'El niño come una manzana roja','🧒 🍎 🔴'],[2,'Mamá guarda el pan en la bolsa','👩 🍞 🛍️'],
    [2,'Papá lava las manos con jabón','👨 👐 🧼'],[2,'La niña lleva una polera azul','👧 👕 🔵'],[2,'El gato está debajo de la mesa','🐈 ⬇️ 🪑'],[2,'El pájaro está sobre la rama','🐦 🌿'],
    [2,'Yo quiero agua en mi vaso','🙋 💧 🥛'],[2,'Yo no quiero comer ahora','🙋 ✋ 🍽️'],[2,'El niño abre su caja de juguetes','🧒 📦 🧸'],[2,'La niña va al parque en bicicleta','👧 🌳 🚲'],
    [3,'Yo pido ayuda porque no puedo abrir la caja','🙋 🤝 📦'],[3,'El niño bebe agua porque tiene sed','🧒 💧'],[3,'La niña usa gorro porque hace frío','👧 🧢 ❄️'],[3,'Primero lavo la manzana y después la como','🚰 🍎 😋'],
    [3,'Después de jugar guardo los juguetes en su caja','⚽ 🧸 📦'],[3,'Antes de comer me lavo las manos','🍽️ 🚰 👐'],[3,'Quiero jugar contigo después de guardar mis zapatos','🙋 🤝 ⚽ 👟'],[3,'La niña busca su chaqueta para salir al parque','👧 🧥 🌳'],
    [3,'El perro está al lado del niño que come','🐕 🧒 🍎'],[3,'No quiero leche pero sí quiero agua','✋ 🥛 👍 💧'],[3,'Cuando estoy cansado puedo pedir un descanso','😴 🙋 🌿'],[3,'Las niñas leen un cuento antes de dormir','👧 👧 📖 🛏️']
  ];
  const sentenceBank=level=>sentenceRows.filter(r=>r[0]===level).map(([,text,scene])=>({text,scene,tokens:text.split(' ')}));
  const completions=[
    [1,'Para beber, elijo una bebida.','Yo bebo ___ .','agua',['zapatos','pelota','gorro'],'💧 🥤'],
    [1,'El perro está descansando en su cama.','El perro ___ .','duerme',['vuela','lee','cocina'],'🐕 🛏️'],
    [1,'Necesito que alguien me ayude.','Yo necesito ___ .','ayuda',['saltar','azul','grande'],'🙋 🤝'],
    [1,'La manzana es un alimento.','Yo ___ una manzana.','como',['bebo','duermo','vuelo'],'🙋 🍎'],
    [1,'Me visto antes de salir.','Me pongo los ___ .','zapatos',['árboles','autos','pájaros'],'🙋 👟'],
    [1,'El pájaro se mueve por el aire.','El pájaro ___ .','vuela',['cocina','lee','escribe'],'🐦 ☁️'],
    [1,'Ya no quiero seguir jugando.','Quiero un ___ .','descanso',['azul','saltar','debajo'],'🙋 🌿'],
    [1,'Tengo un libro abierto.','Yo ___ un cuento.','leo',['bebo','vuelo','nado'],'🙋 📖'],
    [2,'La pelota está en el suelo y la mesa queda encima.','La pelota está ___ de la mesa.','debajo',['encima','dentro','lejos'],'⚽ ⬇️ 🪑'],
    [2,'El vaso tiene agua. Uso el vaso para beber.','El agua está ___ del vaso.','dentro',['encima','lejos','detrás'],'💧 🥛'],
    [2,'El niño siente sed.','El niño quiere ___ agua.','beber',['dormir','vestir','leer'],'🧒 💧'],
    [2,'La niña termina de lavarse las manos. Aún están mojadas.','Ahora necesita ___ las manos.','secar',['pintar','leer','comer'],'👧 👐'],
    [2,'Hablamos de varios gatos. Completa en plural.','Los gatos ___ .','duermen',['duerme','dormir','dormimos'],'🐈 🐈 🛏️'],
    [2,'Hablamos de una sola niña.','La niña ___ una manzana.','come',['comen','comemos','comer'],'👧 🍎'],
    [2,'Primero guardo el juguete. Luego salgo al parque.','___ de salir, guardo el juguete.','Antes',['Después','Debajo','Dentro'],'🧸 📦 🌳'],
    [2,'No puedo abrir la caja. Se lo digo a otra persona.','¿Me puedes ___ a abrir?','ayudar',['azul','debajo','porque'],'📦 🤝'],
    [3,'Hay una causa: tengo sed.','Bebo agua ___ tengo sed.','porque',['pero','debajo','antes'],'💧 🙋'],
    [3,'Quiero expresar dos preferencias distintas.','No quiero leche, ___ sí quiero agua.','pero',['porque','debajo','cuando'],'✋ 🥛 👍 💧'],
    [3,'Guardar ocurre primero; jugar ocurre luego.','Primero guardo y ___ juego.','después',['antes','dentro','debajo'],'📦 ⚽'],
    [3,'Termino de comer y entonces me lavo los dientes.','Me lavo los dientes ___ de comer.','después',['antes','dentro','encima'],'🍽️ 🪥'],
    [3,'Hablo de mí y de otra persona: nosotros.','Nosotros ___ en el parque.','jugamos',['juega','juegan','jugar'],'🧒 👧 ⚽'],
    [3,'Hablo de lo que hago yo.','Yo ___ ayuda cuando la necesito.','pido',['piden','pide','pedir'],'🙋 🤝'],
    [3,'Quiero decir el propósito de llevar una chaqueta.','Llevo una chaqueta ___ abrigarme.','para',['pero','dentro','después'],'🧥 ❄️'],
    [3,'Se habla de varias niñas.','Las niñas están ___ un cuento.','leyendo',['leer','lee','leemos'],'👧 👧 📖']
  ];
  function completionBank(level){return completions.filter(r=>r[0]===level).map(([,context,sentence,answer,distractors,scene])=>({context,sentence,answer,options:[answer,...distractors],scene}));}
  const stories=[
    {level:1,title:'La colación de Ana',scene:'👧 🍎 💧',lines:['Ana tiene una manzana.','Ana come la manzana.','Después bebe agua.'],questions:[['¿Quién come la manzana?','Ana','El perro','Papá'],['¿Qué come Ana?','Una manzana','Un pan','Una sopa'],['¿Qué bebe después?','Agua','Leche','Sopa']]},
    {level:1,title:'El gato de Leo',scene:'🧒 🐈 🛏️',lines:['Leo tiene un gato.','El gato juega con una pelota.','Después el gato duerme.'],questions:[['¿Qué animal tiene Leo?','Un gato','Un perro','Un pájaro'],['¿Con qué juega el gato?','Con una pelota','Con una cuchara','Con un libro'],['¿Qué hace al final?','Duerme','Come','Vuela']]},
    {level:1,title:'Quiero ayuda',scene:'👧 📦 🤝',lines:['Sofía quiere abrir una caja.','Sofía dice: «Ayúdame».','Su papá la ayuda a abrir.'],questions:[['¿Qué quiere abrir Sofía?','Una caja','Una puerta','Un libro'],['¿Qué dice Sofía?','Ayúdame','Hasta mañana','Tengo sed'],['¿Quién la ayuda?','Su papá','Un perro','Leo']]},
    {level:2,title:'Una tarde en el parque',scene:'🧒 👟 🌳 ⚽',lines:['Tomás se pone los zapatos y sale con su mamá.','En el parque juega con una pelota roja.','Al volver a casa, guarda la pelota en una caja.'],questions:[['¿Qué hace antes de salir?','Se pone los zapatos','Guarda la pelota','Se va a dormir'],['¿Dónde juega?','En el parque','En la cocina','En el baño'],['¿Dónde guarda la pelota?','En una caja','Debajo del árbol','En el vaso']]},
    {level:2,title:'La polera elegida',scene:'👧 👕 🔵',lines:['Emma tiene una polera azul y una amarilla.','Su mamá pregunta: «¿Cuál quieres?».','Emma señala la azul. Su mamá le pasa esa polera.'],questions:[['¿Cuántas poleras tiene para elegir?','Dos','Una','Tres'],['¿Cuál elige Emma?','La azul','La amarilla','La roja'],['¿Cómo comunica su elección?','Señalando','Durmiendo','Corriendo']]},
    {level:2,title:'Preparar la mesa',scene:'👨 🍽️ 🥄 🥛',lines:['Papá pone un plato en la mesa.','Luego deja una cuchara junto al plato.','Al final pone un vaso con agua. Ya pueden comer.'],questions:[['¿Qué pone primero?','Un plato','Un vaso','Una cuchara'],['¿Dónde está la cuchara?','Junto al plato','Dentro del vaso','En el suelo'],['¿Qué hay en el vaso?','Agua','Pan','Una manzana']]},
    {level:3,title:'El picnic y la lluvia',scene:'👧 🧒 🧺 🌧️ 🏠',lines:['Ana y Leo preparan un picnic para ir al parque.','Antes de salir, ven que llueve mucho.','Deciden hacer el picnic en casa para no mojarse.','Después de comer, guardan los platos.'],questions:[['¿Por qué comen en casa?','Porque llueve mucho','Porque no tienen platos','Porque es de noche'],['¿Cuándo ven la lluvia?','Antes de salir','Después de comer','Después de guardar'],['¿Qué hacen después de comer?','Guardan los platos','Van al parque','Preparan la comida']]},
    {level:3,title:'Un mensaje importante',scene:'🧒 🧩 🌿 🤝',lines:['Nico está armando un puzle con su hermana.','Después de un rato se siente cansado.','Dice: «Quiero un descanso». Su hermana guarda las piezas.','Más tarde, Nico elige volver a jugar.'],questions:[['¿Por qué pide un descanso?','Porque está cansado','Porque tiene sed','Porque llueve'],['¿Qué hace su hermana?','Guarda las piezas','Le pide que siga','Esconde el puzle'],['¿Quién elige volver a jugar?','Nico','Su hermana','Su papá']]},
    {level:3,title:'La caja que no abre',scene:'👧 📦 🤝 🧸',lines:['Mila quiere sacar un osito de una caja.','La tapa está apretada y no logra abrirla.','Mila pide ayuda a su abuelo. Juntos abren la caja.','Mila saca el osito y le da un abrazo.'],questions:[['¿Para qué quiere abrir la caja?','Para sacar el osito','Para guardar zapatos','Para beber agua'],['¿Por qué pide ayuda?','Porque la tapa está apretada','Porque el osito duerme','Porque quiere salir'],['¿Qué hace después de abrir?','Abraza al osito','Busca a su abuelo','Cierra la puerta']]}
  ];
  const storyBank=level=>stories.filter(story=>story.level===level);
  const trickyIntruders=[
    {ids:['manzana','platano','pera','zanahoria'],answer:'zanahoria',rule:'Tres son frutas. ¿Cuál no es una fruta?',why:'La zanahoria es una verdura. Manzana, plátano y pera son frutas.'},
    {ids:['auto','bus','camion','avion'],answer:'avion',rule:'Tres transportes van por la calle. ¿Cuál vuela?',why:'El avión vuela. Auto, bus y camión se desplazan por la calle.'},
    {ids:['perro','gato','vaca','pajaro'],answer:'pajaro',rule:'Tres animales tienen pelo. ¿Cuál tiene plumas?',why:'El pájaro tiene plumas. Perro, gato y vaca tienen pelo.'},
    {ids:['pan','manzana','platano','agua'],answer:'agua',rule:'Tres se comen. ¿Cuál se bebe?',why:'El agua se bebe. Pan, manzana y plátano se comen.'}
  ];
  const moreQuestions=[
    {kind:'¿DÓNDE?',text:'¿Dónde está el perro en la imagen?',options:[['🧒','Al lado del niño'],['🌳','Encima del árbol'],['🏠','Dentro de la casa'],['☀️','En el cielo']],answer:'Al lado del niño',model:'El perro está al lado del niño.'},
    {kind:'¿QUÉ?',text:'¿Qué está haciendo el niño?',options:[['🍎','Está comiendo'],['🛏️','Está durmiendo'],['🚲','Está pedaleando'],['🚰','Está lavándose']],answer:'Está comiendo',model:'El niño está comiendo una manzana.'},
    {kind:'¿ANTES O DESPUÉS?',text:'¿Qué hace Ana después de lavarse las manos?',context:'Ana se lava las manos. Después, come una manzana.',options:[['🍎','Come una manzana'],['🚰','Se lava las manos'],['🛏️','Se acuesta'],['⚽','Juega a la pelota']],answer:'Come una manzana',model:'Después de lavarse las manos, Ana come una manzana.'},
    {kind:'¿POR QUÉ?',text:'¿Por qué busca su gorro?',context:'Hace frío. Tomás busca su gorro para abrigarse.',options:[['🧢','Para abrigarse'],['💧','Para beber'],['🍎','Para comer'],['🧼','Para lavarse']],answer:'Para abrigarse',model:'Busca su gorro para abrigarse porque hace frío.'}
  ];
  const challengeQuestions=[
    {kind:'DOS PISTAS',text:'¿Qué es rojo y se puede comer?',ids:['manzana','pelota','platano','polera'],answer:'manzana',model:'La manzana es roja y se puede comer.'},
    {kind:'COMPARAR',text:'¿Quién está al lado del niño y tiene cuatro patas?',ids:['perro','nino','pajaro','gato'],answer:'perro',model:'El perro está al lado del niño y tiene cuatro patas.'},
    {kind:'COMPRENDER «NO»',text:'¿Cuál NO aparece en la imagen?',ids:['bus','perro','nino','manzana'],answer:'bus',model:'El bus no aparece en la imagen.'},
    {kind:'¿ANTES O DESPUÉS?',text:'¿Qué hizo Leo antes de salir?',context:'Leo se puso los zapatos. Luego salió al parque y jugó con su pelota.',options:[['👟','Se puso los zapatos'],['⚽','Jugó con su pelota'],['🛏️','Se fue a dormir'],['🍲','Comió sopa']],answer:'Se puso los zapatos',model:'Antes de salir, Leo se puso los zapatos.'},
    {kind:'DOS PASOS',text:'¿Qué hace Sara después de guardar los juguetes?',context:'Sara juega. Después guarda los juguetes. Al final, lee un cuento.',options:[['📖','Lee un cuento'],['🧸','Juega'],['🚰','Lava sus manos'],['🚌','Sube al bus']],answer:'Lee un cuento',model:'Después de guardar los juguetes, Sara lee un cuento.'},
    {kind:'COMPRENDER «NO»',text:'¿Qué bebida quiere ahora?',context:'Emma dice: «No quiero leche. Quiero agua».',ids:['agua','leche','manzana','sopa'],answer:'agua',model:'Emma quiere agua. Podemos respetar su elección.'},
    {kind:'¿POR QUÉ?',text:'¿Por qué se moja el suelo?',context:'Un vaso con agua se cae. El agua sale del vaso y moja el suelo.',options:[['🥛','Porque se cayó el vaso'],['☀️','Porque salió el sol'],['⚽','Porque hay una pelota'],['📖','Porque alguien lee']],answer:'Porque se cayó el vaso',model:'El suelo se moja porque se cayó el vaso con agua.'},
    {kind:'PEDIR AYUDA',text:'¿Qué puede decir si necesita ayuda?',context:'Nico quiere abrir una caja, pero la tapa está muy apretada.',options:[['🤝','Ayúdame a abrir'],['💧','Quiero agua'],['🛏️','Tengo sueño'],['👋','Hasta mañana']],answer:'Ayúdame a abrir',model:'Puede decir o señalar: «Ayúdame a abrir».'}
  ];
  const longSequences=[
    {title:'Lavarse las manos, paso a paso',steps:[['🚰','Mojar las manos'],['🧼','Poner jabón'],['🤲','Frotar las manos'],['💦','Enjuagar el jabón'],['👐','Secar las manos']]},
    {title:'Preparar y comer un plátano',steps:[['🚰','Lavarse las manos'],['🍌','Tomar el plátano'],['🤲','Pelar el plátano'],['😋','Comer el plátano'],['🗑️','Botar la cáscara']]},
    {title:'Una tarde de juego',steps:[['👟','Ponerse los zapatos'],['🚪','Salir de casa'],['🌳','Llegar al parque'],['⚽','Jugar con la pelota'],['🏠','Volver a casa'],['🚰','Lavarse las manos']]}
  ];
  sentenceRows.push(
    [4,'Aunque está lloviendo podemos jugar dentro de la casa','🌧️ 🏠 🧩'],
    [4,'Si no encuentro mi cuaderno puedo pedir ayuda para buscarlo','📓 🔎 🤝'],
    [4,'La niña que lleva una mochila azul espera el bus','👧 🎒 🔵 🚌'],
    [4,'Mientras mamá prepara la comida yo pongo los platos','👩 🍲 🙋 🍽️'],
    [4,'No llevo la pelota porque hoy prefiero leer un cuento','✋ ⚽ 📖'],
    [4,'Después de regar la planta guardo la regadera en el patio','💧 🪴 🏡'],
    [4,'Antes de salir al parque reviso si tengo mi botella','🌳 🔎 💧'],
    [4,'El perro busca la pelota que quedó debajo de la silla','🐕 🔎 ⚽ 🪑'],
    [4,'Como hace frío me pongo la chaqueta antes de salir','❄️ 🧥 🚪'],
    [4,'Quiero terminar este dibujo y después jugar con mi hermano','🖍️ 🖼️ 🤝 ⚽'],
    [4,'Si el vaso está vacío necesito llenarlo para beber agua','🥛 💧'],
    [4,'Prefiero la manzana verde pero hoy solo hay manzanas rojas','🍏 🍎'],
    [5,'La semilla creció porque recibió agua y luz','🌱 💧 ☀️'],
    [5,'Ayer leí un cuento y hoy escribo su final','📖 ✏️'],
    [5,'Los estudiantes ordenan sus libros antes de salir al recreo','🧒 📚 🏫'],
    [5,'Primero observo el problema y después explico mi respuesta','🔎 💬'],
    [5,'El perro encontró la pelota que estaba detrás del árbol','🐕 ⚽ 🌳'],
    [5,'Camila llevó una chaqueta porque la mañana estaba fría','👧 🧥 ❄️'],
    [5,'Mañana plantaremos semillas para observar cómo crecen','🗓️ 🌱 🔎'],
    [5,'Mi hermano dibuja un paisaje mientras yo escribo un cuento','🖍️ 🏞️ ✏️ 📖'],
    [5,'Las mariposas tienen alas y los peces tienen aletas','🦋 🐟'],
    [5,'Después de medir la mesa anotamos su largo','📏 📝'],
    [5,'Si juntamos dos grupos iguales podemos calcular el doble','🟦 🟦 ➕'],
    [5,'El título nos da una pista sobre el cuento','📖 🔎']
  );
  completions.push(
    [4,'Dos acciones ocurren al mismo tiempo.','Yo dibujo ___ mi hermana lee.','mientras',['después','debajo','para'],'🖍️ 📖'],
    [4,'La lluvia no impide jugar dentro de casa.','___ llueve, jugamos en casa.','Aunque',['Debajo','Encima','Después'],'🌧️ 🏠 🧩'],
    [4,'Es una condición: primero tiene que llover.','___ llueve, usaré paraguas.','Si',['Pero','Para','Dentro'],'🌧️ ☂️'],
    [4,'El libro pertenece a Ana. Hablamos de ella.','Ana guarda ___ libro.','su',['sus','nuestros','mis'],'👧 📖'],
    [4,'Ayer ocurrió la visita. Ya terminó.','Ayer nosotros ___ al parque.','fuimos',['iremos','ir','voy'],'🗓️ 🌳'],
    [4,'Mañana todavía no llega.','Mañana yo ___ un cuento.','leeré',['leí','leyeron','leyendo'],'🗓️ 📖'],
    [4,'Identificamos a la niña que tiene la mochila.','La niña ___ tiene mochila espera el bus.','que',['pero','para','aunque'],'👧 🎒 🚌'],
    [4,'El vaso está vacío. Por esa razón lo lleno.','El vaso está vacío; ___ lo lleno.','por eso',['sin embargo','antes','debajo'],'🥛 💧'],
    [5,'La acción ocurrió ayer. Hablan varias niñas.','Ayer las niñas ___ un cuento.','leyeron',['leerán','leo','leer'],'👧 👧 📖'],
    [5,'La acción será mañana. Hablamos de nosotros.','Mañana nosotros ___ semillas.','plantaremos',['planté','plantaron','plantando'],'🗓️ 🌱'],
    [5,'Son varias mariposas y todas tienen muchos colores.','Las mariposas ___ vuelan sobre las flores.','coloridas',['colorido','colorida','coloridos'],'🦋 🌼'],
    [5,'La lluvia hizo que se mojara el patio.','El patio está mojado ___ llovió.','porque',['pero','aunque','antes'],'🌧️ 🏫'],
    [5,'Buscamos el propósito de usar una regla.','Usamos la regla ___ medir el largo.','para',['pero','aunque','dentro'],'📏 📐'],
    [5,'La instrucción dice: mide y luego anota.','___ de anotar el largo, debes medir.','Antes',['Después','Debajo','Dentro'],'📏 📝'],
    [5,'La biblioteca tiene muchos libros. Habla de todos ellos.','Los libros son interesantes. Me gusta ___ .','leerlos',['leerlo','leerla','leerlas'],'📚 👀'],
    [5,'Hay dos cantidades iguales: Ana tiene cinco y Leo tiene cinco.','Ana tiene tantos lápices ___ Leo.','como',['porque','pero','antes'],'✏️ ✏️']
  );
  stories.push(
    {level:4,title:'El libro que cambió de lugar',scene:'👧 📖 🪑 🗄️',lines:['Luna dejó su libro sobre una silla.','Mientras Luna estaba en el patio, papá puso el libro en un estante.','Cuando volvió, Luna buscó primero en la silla, pero no lo encontró.','Le preguntó a papá y él le mostró el estante.'],questions:[['¿Dónde está el libro al final?','En el estante','En la silla','En el patio'],['¿Por qué Luna busca primero en la silla?','Porque allí lo había dejado','Porque papá se lo dijo','Porque lo vio en el estante'],['¿Qué le permite encontrar el libro?','Preguntarle a papá','Salir al patio','Mirar por la ventana']]},
    {level:4,title:'Dos planes para la tarde',scene:'🧒 🧩 🌳 🌧️',lines:['Max quiere ir al parque después de terminar su puzle.','Acuerda con su papá: si llueve, jugarán con bloques en casa.','Max termina el puzle y mira por la ventana. Está lloviendo.','Saca los bloques y construye una torre con su papá.'],questions:[['¿Qué condición cambia el plan?','Que llueva','Que haya bloques','Que el puzle tenga piezas'],['¿Qué termina antes de jugar con bloques?','El puzle','Una torre','Un dibujo'],['Si no hubiera llovido, ¿cuál era el plan?','Ir al parque','Lavar los bloques','Buscar un libro']]},
    {level:4,title:'Las botellas del paseo',scene:'👧 🧒 💧 🎒',lines:['Eva y Nico preparan un paseo. Cada uno necesita una botella con agua.','Eva tiene su botella llena, pero la de Nico está vacía.','Nico llena su botella y la cierra antes de ponerla en la mochila.','Ahora los dos tienen agua para el camino.'],questions:[['¿De quién era la botella vacía?','De Nico','De Eva','De ambos'],['¿Para qué la cierra antes de guardarla?','Para que no se salga el agua','Para que pese menos','Para vaciarla'],['¿Qué tienen en común al final?','Ambos llevan agua','Ambos tienen botellas vacías','Ambos dejaron las mochilas']]},
    {level:5,title:'El huerto del curso',scene:'🏫 🌱 💧 📝',lines:['El curso de Max plantó porotos en macetas.','Cada día observan las plantas y anotan los cambios en un cuaderno.','Hoy una planta tiene dos hojas nuevas. Max la dibuja y escribe la fecha.','El viernes compararán los dibujos para descubrir cómo creció.'],questions:[['¿Para qué anotan los cambios?','Para comparar cómo crecen las plantas','Para contar las mesas','Para elegir una mochila'],['¿Qué dato muestra un cambio en la planta?','Tiene dos hojas nuevas','Está en una maceta','Pertenece al curso'],['¿Qué título también sirve para este texto?','Observamos el crecimiento de una planta','Un paseo en bicicleta','La receta del pan']]},
    {level:5,title:'La invitación de Elisa',scene:'✉️ 👧 📚 🏫',lines:['Elisa escribe: «Te invito a leer cuentos el viernes en la biblioteca».','Su hermano lee la invitación y pregunta: «¿A qué hora?».','Elisa agrega: «A las cuatro de la tarde».','Ahora sus amigos saben el día, la hora y el lugar del encuentro.'],questions:[['¿Qué información faltaba al principio?','La hora','El lugar','El día'],['¿Para qué escribió Elisa?','Para invitar a leer cuentos','Para explicar una receta','Para describir un animal'],['¿Cuál es el plan completo?','Leer el viernes a las cuatro en la biblioteca','Leer el lunes en el patio','Jugar el viernes en la casa']]},
    {level:5,title:'La solución de Benjamín',scene:'🧒 📏 📄 ✏️',lines:['Benjamín y Antonia quieren comparar el largo de dos hojas.','Benjamín propone medir una con pasos y la otra con una regla.','Antonia dice: «Usemos la misma regla para las dos».','Miden desde el cero: una hoja mide veinte centímetros y la otra treinta.'],questions:[['¿Por qué sirve la idea de Antonia?','Permite comparar usando la misma unidad','Hace que las hojas crezcan','Evita mirar los números'],['¿Qué hoja es más larga?','La de treinta centímetros','La de veinte centímetros','Las dos son iguales'],['¿Qué hicieron antes de comparar los números?','Midieron las dos hojas','Guardaron la regla','Cortaron las hojas']]}
  );
  const advancedSequences=[
    {title:'Del dibujo a la carpeta',steps:[['📄','Tomar una hoja'],['✏️','Dibujar un círculo en la hoja'],['🖍️','Colorear el círculo dibujado'],['📝','Escribir el nombre en el dibujo coloreado'],['📂','Abrir la carpeta'],['🖼️','Poner el dibujo en la carpeta abierta'],['✅','Cerrar la carpeta con el dibujo dentro']]},
    {title:'Preparar una maceta',steps:[['🪴','Tomar una maceta vacía'],['🟤','Poner tierra en la maceta'],['☝️','Hacer un hoyito en la tierra'],['🌱','Colocar una semilla en el hoyito'],['🟤','Cubrir la semilla con tierra'],['💧','Regar la tierra que cubre la semilla'],['☀️','Llevar la maceta regada a la luz']]},
    {title:'Una carta para la abuela',steps:[['📄','Elegir una hoja para la carta'],['✏️','Escribir la carta en la hoja'],['📃','Doblar la carta escrita'],['✉️','Poner la carta doblada en el sobre'],['✅','Cerrar el sobre con la carta dentro'],['📝','Escribir la dirección en el sobre cerrado'],['📮','Llevar el sobre con dirección al correo']]}
  ];
  const applicationSequences=[
    {title:'Revisar y compartir un cuento',steps:[['💡','Elegir una idea para el cuento'],['✏️','Escribir el cuento con esa idea'],['👀','Leer el cuento escrito para revisarlo'],['📝','Corregir lo que encontré al revisar'],['📖','Leer en voz alta el cuento corregido'],['💬','Responder preguntas después de la lectura']]},
    {title:'Construir un gráfico de frutas',steps:[['❓','Preguntar la fruta favorita a cinco personas'],['📝','Anotar las cinco respuestas'],['🔢','Contar cuántas veces aparece cada fruta anotada'],['📊','Dibujar una barra con cada cantidad contada'],['👀','Comparar las barras dibujadas'],['💬','Decir qué fruta fue la más elegida según el gráfico']]},
    {title:'Medir y comparar dos lápices',steps:[['✏️','Elegir dos lápices para comparar'],['📏','Medir el primer lápiz desde el cero de la regla'],['📝','Anotar la primera medida'],['📏','Medir el segundo lápiz con la misma regla'],['📝','Anotar la segunda medida junto a la primera'],['🔎','Comparar las dos medidas anotadas']]}
  ];
  function sequenceBank(level){return level===5?applicationSequences:level===4?advancedSequences:level===3?longSequences:sequences;}
  const applicationWords={
    ballena:['🐋','Ballena','animales'],conejo:['🐇','Conejo','animales'],mariposa:['🦋','Mariposa','animales'],pez:['🐟','Pez','animales'],
    queso:['🧀','Queso','alimentos'],arroz:['🍚','Arroz','alimentos'],porotos:['🫘','Porotos','alimentos'],lechuga:['🥬','Lechuga','alimentos'],
    bufanda:['🧣','Bufanda','ropa'],calcetines:['🧦','Calcetines','ropa'],chaqueta:['🧥','Chaqueta','ropa'],vestido:['👗','Vestido','ropa'],
    tren:['🚆','Tren','transportes'],barco:['🚢','Barco','transportes'],helicoptero:['🚁','Helicóptero','transportes'],velero:['⛵','Velero','transportes']
  };
  Object.assign(words,applicationWords);
  const advancedIntruders=[
    {ids:['manzana','pan','zanahoria','leche'],answer:'leche',rule:'Buscamos alimentos sólidos: ¿cuál queda fuera porque es líquido?',why:'La leche es líquida; manzana, pan y zanahoria son alimentos sólidos.'},
    {ids:['auto','bus','camion','bicicleta'],answer:'bicicleta',rule:'Tres de estos transportes suelen usar motor. ¿Cuál se mueve al pedalear?',why:'La bicicleta se mueve al pedalear. Auto, bus y camión suelen usar motor.'},
    {ids:['gorro','polera','pantalon','zapatos'],answer:'gorro',rule:'Tres prendas se usan por debajo del cuello. ¿Cuál se usa en la cabeza?',why:'El gorro se usa en la cabeza. Polera, pantalón y zapatos se usan por debajo del cuello.'},
    {ids:['comer','dormir','jugar','cuchara'],answer:'cuchara',rule:'Tres palabras nombran acciones. ¿Cuál nombra un objeto?',why:'Cuchara nombra un objeto. Comer, dormir y jugar nombran acciones.'}
  ];
  const applicationIntruders=[
    {ids:['perro','gato','conejo','mariposa'],answer:'mariposa',rule:'Tres animales tienen pelo y cuatro patas. ¿Cuál no cumple esas dos pistas?',why:'La mariposa tiene seis patas y alas. Perro, gato y conejo tienen pelo y cuatro patas.'},
    {ids:['auto','bus','tren','barco'],answer:'barco',rule:'Buscamos transportes que avanzan por tierra y llevan pasajeros. ¿Cuál va por el agua?',why:'El barco avanza por el agua. Auto, bus y tren transportan pasajeros por tierra.'},
    {ids:['manzana','pera','platano','queso'],answer:'queso',rule:'Tres alimentos son frutas que crecen en plantas. ¿Cuál se prepara con leche?',why:'El queso se prepara con leche. Manzana, pera y plátano son frutas.'},
    {ids:['bufanda','gorro','chaqueta','cuchara'],answer:'cuchara',rule:'Para abrigarte eliges prendas de vestir. ¿Cuál no sirve para esa tarea?',why:'La cuchara sirve para comer. Bufanda, gorro y chaqueta son prendas para abrigarse.'}
  ];
  const advancedQuestions=[
    ['Sigue lloviendo cuando termina de guardar.','Ana irá al patio si deja de llover. Mientras llueve, guarda los juguetes.','¿Puede ir al patio según el acuerdo?','Todavía no, porque llueve','Sí, porque guardó','Sí, porque hay juguetes','No, porque es de noche'],
    ['El pronombre «él» se refiere a Mateo.','Mateo tiene un perro. Él prepara agua para su perro.','¿Quién prepara el agua?','Mateo','El perro','Una niña','La abuela'],
    ['Busca la información que falta.','El cuento dice: «Sofía llevó una fruta a la escuela». No dice cuál.','¿Podemos saber qué fruta llevó?','No, falta esa información','Sí, una manzana','Sí, un plátano','Sí, una pera'],
    ['La primera acción ocurrió ayer.','Ayer Leo hizo un dibujo. Hoy se lo muestra a su hermana.','¿Qué hizo antes?','Hizo el dibujo','Mostró el dibujo','Salió al parque','Leyó un libro'],
    ['La descripción tiene tres pistas.','Es un alimento, se bebe y es blanco.','¿De qué hablamos?','Leche','Pan','Agua','Manzana'],
    ['La causa es que el recipiente está vacío.','Max quiere regar la planta. Inclina la regadera, pero no sale agua: está vacía.','¿Qué necesita hacer antes de regar?','Llenar la regadera','Guardar la regadera','Cambiar la planta','Cerrar la ventana'],
    ['«Los dos» significa Eva y su abuelo.','Eva y su abuelo leen un cuento. Los dos se sientan en el sofá.','¿Quiénes se sientan?','Eva y su abuelo','Solo Eva','Solo su abuelo','Eva y su perro'],
    ['Elige la frase que coincide con los dos datos.','La mochila de Tomás es azul. La de Sara es roja.','¿Cuál es la descripción correcta?','Tomás tiene la azul y Sara la roja','Los dos tienen mochila azul','Tomás tiene la roja','Sara tiene la azul']
  ].map(([model,context,text,answer,...wrong])=>({kind:'CONECTAR IDEAS',context,text,answer,model,options:[answer,...wrong].map(label=>['💡',label])}));
  const applicationQuestions=[
    ['La caja azul guarda libros; son los objetos que necesitamos para leer.','En la sala hay una caja azul con libros y una verde con bloques. Max quiere leer un cuento.','¿Qué caja debe abrir y por qué?','La azul, porque tiene libros','La verde, porque tiene bloques','La azul, porque tiene bloques','La verde, porque tiene libros'],
    ['Los dos usan materiales distintos, pero ambos están creando un dibujo.','Antonia dibuja un árbol con lápices. Diego dibuja una casa con plumones.','¿Qué tienen en común?','Ambos dibujan','Ambos dibujan árboles','Ambos usan lápices','Ambos usan plumones'],
    ['La instrucción dice que primero hay que subrayar y luego escribir.','La profesora dice: «Subraya el título y después escribe una oración sobre el cuento».','Max ya subrayó el título. ¿Qué sigue?','Escribir una oración sobre el cuento','Subrayar el título otra vez','Borrar el título','Guardar el cuento sin escribir'],
    ['El aviso dice cuándo y dónde se prestan libros.','El aviso dice: «Préstamo de libros: martes y jueves en la biblioteca». Hoy es jueves.','¿Qué puede hacer Max según el aviso?','Pedir un libro en la biblioteca','Pedir un libro en la cocina','Pedir un libro solo el lunes','Pedir un libro en el patio'],
    ['La regadera permite llevar agua hasta la planta.','El suelo de la maceta está seco. Amanda trae agua en una regadera y se acerca a la planta.','¿Qué hará probablemente?','Regar la planta','Cortar un papel','Leer un libro','Pintar la regadera'],
    ['El texto explica el cuidado de una planta, que es el tema común de las tres acciones.','Una planta necesita luz. También necesita agua. Debemos observar cómo crece.','¿Qué título reúne las tres ideas?','Cómo cuidar una planta','Cómo guardar juguetes','Un viaje en tren','Los colores de una pelota'],
    ['El «ellos» se refiere a los niños que recogieron y separaron los papeles.','Los niños recogieron papeles del patio. Luego ellos los pusieron en una caja para reciclar.','¿Quiénes pusieron los papeles en la caja?','Los niños','Los papeles','Las cajas','Los árboles'],
    ['El texto cuenta la comida de la tortuga, pero no dice su nombre.','En la sala hay una tortuga. Hoy comió una hoja de lechuga.','¿Qué dato no aparece en el texto?','El nombre de la tortuga','Qué comió la tortuga','Dónde está la tortuga','Cuándo comió la tortuga']
  ].map(([model,context,text,answer,...wrong])=>({kind:'APLICAR Y EXPLICAR',context,text,answer,model,options:[answer,...wrong].map(label=>['💡',label])}));
  // Each reasoning row is [level, visible clue, question, correct answer, three alternatives, explanation].
  const reasoningRows={
    patrones:[
      [1,'🔴 🔵 🔴 🔵 🔴 …','Rojo y azul se turnan. ¿Qué sigue?','🔵 Azul',['🔴 Rojo','🟡 Amarillo','🟢 Verde'],'Después de rojo va azul.'],
      [1,'🐕 🐈 🐕 🐈 🐕 …','Perro y gato se turnan. ¿Qué sigue?','🐈 Gato',['🐕 Perro','🐄 Vaca','🐦 Pájaro'],'Después del perro va el gato.'],
      [1,'👏 👣 👏 👣 👏 …','Palmas y pasos se turnan. ¿Qué sigue?','👣 Pasos',['👏 Palmas','🛏️ Dormir','📖 Leer'],'Repetimos palmas, pasos. Ahora van pasos.'],
      [1,'🍎 🍌 🍎 🍌 🍎 …','Manzana y plátano se turnan. ¿Qué sigue?','🍌 Plátano',['🍎 Manzana','🍐 Pera','🍞 Pan'],'Repetimos manzana, plátano. Ahora va plátano.'],
      [1,'☀️ 🌙 ☀️ 🌙 ☀️ …','Sol y luna se turnan. ¿Qué sigue?','🌙 Luna',['☀️ Sol','⭐ Estrella','☁️ Nube'],'Después del sol va la luna.'],
      [1,'▲ ● ▲ ● ▲ …','Triángulo y círculo se turnan. ¿Qué sigue?','● Círculo',['▲ Triángulo','■ Cuadrado','★ Estrella'],'Repetimos triángulo, círculo. Ahora va círculo.'],
      [2,'🔴 🔴 🔵 · 🔴 🔴 🔵 · 🔴 🔴 …','Se repite rojo, rojo, azul. ¿Qué sigue?','🔵 Azul',['🔴 Rojo','🟢 Verde','🟡 Amarillo'],'Tras dos rojos viene un azul.'],
      [2,'🍎 🍌 🍐 · 🍎 🍌 …','Se repiten tres frutas en ese orden. ¿Qué sigue?','🍐 Pera',['🍎 Manzana','🍌 Plátano','🍇 Uvas'],'La unidad es manzana, plátano, pera.'],
      [2,'👏 👣 👣 · 👏 👣 …','Se repiten palmas, paso, paso. ¿Qué sigue?','👣 Paso',['👏 Palmas','🖐️ Saludo','🛏️ Dormir'],'Falta el segundo paso antes de volver a las palmas.'],
      [2,'1 · 2 · 3 · 4 · …','Contamos de uno en uno. ¿Qué sigue?','5',['6','3','8'],'Después de cuatro viene cinco.'],
      [2,'■ ● ▲ · ■ …','Se repite cuadrado, círculo, triángulo. ¿Qué sigue?','● Círculo',['▲ Triángulo','■ Cuadrado','★ Estrella'],'Después del cuadrado va el círculo.'],
      [2,'🐕 🐕 🐈 🐈 · 🐕 🐕 🐈 …','Van dos perros y dos gatos. ¿Qué falta?','🐈 Gato',['🐕 Perro','🐄 Vaca','🐦 Pájaro'],'Falta el segundo gato de la pareja.'],
      [3,'2 · 4 · 6 · 8 · …','Sumamos dos cada vez. ¿Qué sigue?','10',['9','11','12'],'Ocho más dos son diez.'],
      [3,'10 · 9 · 8 · 7 · …','Quitamos uno cada vez. ¿Qué sigue?','6',['5','8','4'],'Siete menos uno son seis.'],
      [3,'🔴 🔵 🔵 · 🔴 🔵 🔵 · 🔴 …','Se repite rojo, azul, azul. ¿Qué sigue?','🔵 Azul',['🔴 Rojo','🟢 Verde','🟡 Amarillo'],'Después de rojo comienzan los dos azules.'],
      [3,'▲ ● ■ · ▲ … ■','Se repite triángulo, círculo, cuadrado. ¿Qué falta en medio?','● Círculo',['▲ Triángulo','■ Cuadrado','★ Estrella'],'Entre triángulo y cuadrado va círculo.'],
      [3,'5 · 10 · 15 · …','Sumamos cinco cada vez. ¿Qué sigue?','20',['16','25','30'],'Quince más cinco son veinte.'],
      [3,'🍎 🍌 🍐 · 🍎 🍌 🍐 · …','La unidad de tres frutas se repite. ¿Cómo empieza otra vez?','🍎 Manzana',['🍌 Plátano','🍐 Pera','🍇 Uvas'],'Después de la pera vuelve la manzana.'],
      [4,'3 · 6 · 9 · 12 · …','Sumamos tres cada vez. ¿Qué sigue?','15',['14','16','18'],'Doce más tres son quince.'],
      [4,'2 · 4 · 8 · 16 · …','Cada número es el doble del anterior. ¿Qué sigue?','32',['18','24','30'],'El doble de dieciséis es treinta y dos.'],
      [4,'1 · 2 · 4 · 5 · 7 · …','Alternamos sumar uno y sumar dos. ¿Qué sigue?','8',['9','10','6'],'Después de sumar dos toca sumar uno: siete más uno.'],
      [4,'20 · 18 · 16 · … · 12','Restamos dos en cada paso. ¿Qué número falta?','14',['15','13','10'],'Dieciséis menos dos son catorce, y luego viene doce.'],
      [4,'▲ ● ● ■ · ▲ ● ● ■ · ▲ ● …','Se repiten triángulo, dos círculos y cuadrado. ¿Qué sigue?','● Círculo',['■ Cuadrado','▲ Triángulo','★ Estrella'],'Falta el segundo círculo antes del cuadrado.'],
      [4,'1 · 3 · 6 · 10 · …','Sumamos dos, luego tres, luego cuatro. Ahora sumamos cinco.','15',['12','14','20'],'Diez más cinco son quince.']
    ],
    pistas:[
      [1,'🐾 Hace «guau».','¿Qué animal es?','Perro',['Gato','Vaca','Pájaro'],'El perro hace guau.'],
      [1,'🍽️ Sirve para tomar sopa.','¿Qué objeto es?','Cuchara',['Zapato','Pelota','Gorro'],'La cuchara sirve para tomar sopa.'],
      [1,'🛏️ Me acuesto aquí para dormir.','¿Qué es?','Cama',['Mesa','Bicicleta','Vaso'],'Puedo acostarme en la cama para dormir.'],
      [1,'👟 Me los pongo en los pies.','¿Qué son?','Zapatos',['Guantes','Gorros','Poleras'],'Los zapatos se usan en los pies.'],
      [1,'📖 Tiene páginas que puedo leer.','¿Qué es?','Libro',['Plato','Auto','Silla'],'Un libro tiene páginas que puedo leer.'],
      [1,'💧 La bebo cuando tengo sed.','¿Qué es?','Agua',['Arena','Papel','Ropa'],'Puedo beber agua cuando tengo sed.'],
      [2,'Es una fruta, es amarilla y se pela.','¿Cuál coincide con las pistas?','Plátano',['Manzana roja','Pan','Leche'],'El plátano es una fruta amarilla que se pela.'],
      [2,'Tiene dos ruedas y pedales.','¿Qué transporte es?','Bicicleta',['Auto','Avión','Bus'],'La bicicleta tiene dos ruedas y pedales.'],
      [2,'Tiene hojas, pero no es una planta. Se puede leer.','¿Qué es?','Libro',['Árbol','Flor','Maceta'],'Las hojas de un libro se pueden leer.'],
      [2,'Es ropa y se usa en la cabeza.','¿Cuál coincide?','Gorro',['Pantalón','Zapatos','Polera'],'El gorro es una prenda para la cabeza.'],
      [2,'Tiene alas y plumas.','¿Cuál coincide con ambas pistas?','Pájaro',['Avión','Perro','Pez'],'El pájaro tiene alas y plumas.'],
      [2,'Es un recipiente; le pongo agua para beber.','¿Qué objeto es?','Vaso',['Zapato','Cuaderno','Pelota'],'Pongo agua en un vaso para beber.'],
      [3,'Puede volar, lleva pasajeros y no es un animal.','¿Qué es?','Avión',['Pájaro','Mariposa','Bus'],'El avión vuela, transporta pasajeros y no es un animal.'],
      [3,'Hay una caja roja con ropa, una azul con libros y una verde con juguetes.','¿Cuál contiene algo para leer?','La azul',['La roja','La verde','Ninguna'],'La caja azul contiene libros para leer.'],
      [3,'Ana está delante de Leo. Leo está delante de Eva.','¿Quién está en medio?','Leo',['Ana','Eva','Nadie'],'Leo queda después de Ana y antes de Eva.'],
      [3,'Busco algo para comer. No quiero fruta ni bebida. Hay pan, pera, agua y leche.','¿Qué cumple todas las pistas?','Pan',['Pera','Agua','Leche'],'El pan se come y no es fruta ni bebida.'],
      [3,'La pelota no está en la caja ni bajo la cama. Solo puede estar en esos lugares o en la bolsa.','¿Dónde está?','En la bolsa',['En la caja','Bajo la cama','En el patio'],'Al descartar caja y cama, queda la bolsa.'],
      [3,'La torre roja es más alta que la azul. La azul es más alta que la verde.','¿Cuál es la más alta?','La roja',['La azul','La verde','Todas iguales'],'La roja es más alta que las otras dos.'],
      [4,'Solo hay tres llaves: roja, azul y verde. La que abre no es roja. La verde está rota y no abre.','¿Qué llave abre?','La azul',['La roja','La verde','Las tres'],'Al descartar roja y verde, queda la azul.'],
      [4,'Eva llegó antes que Leo. Max llegó después de Leo.','¿Quién llegó al final?','Max',['Eva','Leo','No se puede saber'],'El orden es Eva, Leo y Max.'],
      [4,'Ana tiene más lápices que Luis. Luis tiene más que Eva.','¿Quién tiene menos lápices?','Eva',['Ana','Luis','Todos igual'],'Eva tiene menos que Luis, y Luis menos que Ana.'],
      [4,'Cada caja tiene un objeto distinto: libro, pelota o gorro. La roja tiene el libro. La azul no tiene el gorro.','¿Qué hay en la verde?','El gorro',['El libro','La pelota','Los tres objetos'],'La azul tiene la pelota; el gorro queda en la verde.'],
      [4,'Para entrar se necesitan dos cosas: entrada y gorro. Ana tiene ambas. Leo solo tiene gorro. Eva solo tiene entrada.','¿Quién cumple las dos condiciones?','Ana',['Leo','Eva','Los tres'],'Ana es la única que tiene entrada y gorro.'],
      [4,'La bolsa grande pesa menos que la pequeña. La mediana pesa más que la pequeña.','¿Cuál pesa más?','La mediana',['La grande','La pequeña','No se puede saber'],'La mediana pesa más que la pequeña, que pesa más que la grande.']
    ],
    soluciones:[
      [1,'Tengo sed. Hay agua disponible.','¿Qué me ayuda a calmar la sed?','Beber agua',['Ponerme zapatos','Leer','Guardar lápices'],'Beber agua ayuda a calmar la sed.'],
      [1,'Mis manos están mojadas. Quiero secarlas.','¿Qué necesito?','Una toalla',['Una pelota','Un libro','Un gorro'],'Puedo secar mis manos con una toalla.'],
      [1,'El lápiz está dentro de una caja cerrada.','¿Qué hago para sacarlo?','Abrir la caja',['Cerrar la caja','Guardar la caja','Pintar la caja'],'Primero abro la caja para sacar el lápiz.'],
      [1,'Quiero dibujar sobre una hoja.','¿Qué objeto me sirve?','Un lápiz',['Un zapato','Una cuchara','Un vaso'],'Puedo dibujar con un lápiz.'],
      [1,'Necesito ayuda para abrir una tapa.','¿Qué mensaje sirve?','Ayúdame a abrir',['Tengo sed','Hasta mañana','Quiero un cuento'],'Puedo decir o señalar: ayúdame a abrir.'],
      [1,'Quiero llevar varios libros juntos.','¿Qué me sirve para guardarlos y llevarlos?','Una mochila',['Una cuchara','Un plato','Un lápiz'],'Puedo llevar los libros en una mochila.'],
      [2,'Está lloviendo. Quiero salir sin mojarme la cabeza.','¿Qué objeto me ayuda?','Un paraguas',['Una pelota','Un vaso','Un cuaderno'],'El paraguas me protege de la lluvia.'],
      [2,'Se derramó agua sobre la mesa. Quiero dejarla seca.','¿Qué puedo hacer?','Secarla con un paño',['Agregar agua','Poner un libro encima','Soplar una vez'],'Un paño absorbe el agua y ayuda a secar la mesa.'],
      [2,'Quiero armar el puzle, pero la mesa está llena de juguetes.','¿Qué puedo hacer para tener espacio?','Guardar los juguetes',['Traer más juguetes','Poner un vaso','Cerrar los ojos'],'Guardar los juguetes deja espacio para el puzle.'],
      [2,'Mi lápiz no tiene punta. Quiero seguir dibujando.','¿Qué herramienta necesito?','Un sacapuntas',['Una regla','Un vaso','Una pelota'],'Con el sacapuntas puedo hacer una nueva punta.'],
      [2,'El libro está en un estante que no alcanzo.','¿Qué mensaje resuelve el problema?','¿Me pasas el libro?',['Quiero agua','Tengo sueño','¿Qué hora es?'],'Puedo pedir que me pasen el libro.'],
      [2,'No escuché una instrucción y quiero entenderla.','¿Qué puedo pedir?','¿Puedes repetir?',['¿Dónde está el perro?','Quiero pan','Hasta mañana'],'Puedo pedir que repitan la instrucción.'],
      [3,'Quiero hacer una torre azul. La caja está cerrada y los bloques azules están dentro.','¿Qué necesito hacer primero?','Abrir la caja',['Apilar los bloques','Cerrar la caja','Guardar la torre'],'Para sacar los bloques primero necesito abrir la caja.'],
      [3,'La planta necesita agua y la regadera está vacía.','¿Qué secuencia resuelve el problema?','Llenar y después regar',['Regar y después llenar','Guardar y después cerrar','Vaciar y después guardar'],'Primero lleno la regadera; después puedo regar.'],
      [3,'Quiero llevar agua en mi mochila sin que se derrame. La botella está llena y abierta.','¿Qué debo hacer antes de guardarla?','Cerrar bien la botella',['Abrirla más','Inclinarla','Quitarle la tapa'],'Cerrar la botella ayuda a que el agua no se derrame.'],
      [3,'Busco un juguete. Lo usé en el patio y luego lo guardé en la caja.','¿Dónde conviene buscar primero?','En la caja',['En el patio','En el vaso','En el baño'],'El último lugar mencionado es la caja.'],
      [3,'Quiero hacer un dibujo verde, pero mi lápiz verde se terminó. Hay otro en el cajón.','¿Qué opción permite seguir en verde?','Buscar el otro lápiz',['Usar el rojo','Guardar la hoja','Borrar todo'],'Puedo buscar el otro lápiz verde en el cajón.'],
      [3,'Alguien pregunta qué necesito. La tapa no abre y quiero sacar mi juguete.','¿Qué mensaje da más información?','Necesito ayuda para abrir la caja',['Necesito algo','Mira eso','Allí'],'El mensaje explica qué ayuda necesito y para qué.'],
      [4,'Para pintar necesito papel y pincel. Tengo pincel. El papel está en una caja vacía de juguetes junto a la mesa.','¿Qué me falta preparar?','Sacar el papel de la caja',['Buscar otro pincel','Guardar el pincel','Buscar juguetes'],'Ya tengo pincel; falta sacar el papel.'],
      [4,'Si el patio está mojado, jugamos dentro. Está mojado y además hace sol.','¿Dónde jugamos según la regla?','Dentro',['En el patio','En ambos lugares','El sol cambia la regla'],'La condición es que el patio esté mojado, aunque haga sol.'],
      [4,'Quiero prestar un libro cuando termine de leerlo. Aún me falta una página.','¿Qué orden respeta mi plan?','Terminar de leer y luego prestarlo',['Prestarlo y después terminar','Guardarlo sin terminar','Romper la página'],'Primero termino de leer; después puedo prestarlo.'],
      [4,'Hay que llevar una botella y una colación. Max lleva ambas. Eva lleva solo botella.','¿Qué debe añadir Eva para cumplir la lista?','Una colación',['Otra botella','Un juguete','Nada'],'Eva ya lleva botella; le falta la colación.'],
      [4,'El dibujo debe secarse antes de guardarlo. Todavía está húmedo, pero la carpeta ya está abierta.','¿Qué conviene hacer según la instrucción?','Esperar a que se seque',['Guardarlo ahora','Cerrar los ojos','Mojarlo más'],'La carpeta abierta no cambia la necesidad de que el dibujo se seque.'],
      [4,'Pedí la pelota roja y me dieron la azul. Quiero aclarar cuál pedí.','¿Qué mensaje aclara el pedido?','Quería la pelota roja, por favor',['Dame eso','La otra cosa','Ya tengo una pelota'],'Nombrar la pelota y el color aclara cuál quiero.']
    ]
  };
  reasoningRows.patrones.push(
    [5,'25 · 30 · … · 40 · …','El patrón aumenta de cinco en cinco. ¿Qué pareja completa los espacios?','35 y 45',['34 y 44','35 y 50','40 y 45'],'Treinta más cinco son treinta y cinco. Cuarenta más cinco son cuarenta y cinco.'],
    [5,'90 · 80 · … · 60 · …','El patrón disminuye de diez en diez. ¿Qué pareja falta?','70 y 50',['75 y 55','70 y 40','50 y 70'],'Después de ochenta va setenta; después de sesenta va cincuenta.'],
    [5,'12 · 14 · … · 18 · …','El patrón aumenta de dos en dos. ¿Qué pareja falta?','16 y 20',['15 y 19','16 y 19','18 y 22'],'Catorce más dos son dieciséis. Dieciocho más dos son veinte.'],
    [5,'● ▲ ▲ · ● ▲ ▲ · ● … …','La unidad es círculo, triángulo, triángulo. ¿Qué dos figuras faltan?','▲ ▲ Dos triángulos',['● ▲ Círculo y triángulo','▲ ● Triángulo y círculo','● ● Dos círculos'],'Después del círculo van dos triángulos para completar la unidad.'],
    [5,'15 · 20 · 25 · 31 · 35','Queremos avanzar de cinco en cinco. ¿Qué corrección mantiene la regla?','Cambiar 31 por 30',['Cambiar 20 por 21','Cambiar 25 por 26','Cambiar 35 por 36'],'Veinticinco más cinco son treinta. Treinta más cinco son treinta y cinco.'],
    [5,'10 · 20 · 30 · … · …','Los números aumentan de diez en diez. ¿Qué dos números continúan?','40 y 50',['31 y 32','40 y 60','35 y 40'],'Treinta más diez son cuarenta. Cuarenta más diez son cincuenta.']
  );
  reasoningRows.pistas.push(
    [5,'Ana tiene un libro rojo de animales. Leo tiene un libro azul de animales. Eva tiene uno rojo de plantas.','Busco un libro rojo que trate de animales. ¿De quién es?','De Ana',['De Leo','De Eva','De los tres'],'El libro de Ana cumple las dos pistas: es rojo y trata de animales.'],
    [5,'Hay tres cajas: una tiene cuatro lápices, otra seis y otra ocho. Busco más de cinco y menos de siete.','¿Cuántos lápices tiene la caja que busco?','Seis',['Cuatro','Ocho','Siete'],'Seis es mayor que cinco y menor que siete.'],
    [5,'La biblioteca abre lunes y miércoles. El taller de lectura es solo el miércoles.','¿Qué día permite ir a la biblioteca y al taller?','Miércoles',['Lunes','Martes','Jueves'],'El miércoles se cumplen las dos condiciones.'],
    [5,'Hay un cuadrado, un triángulo y un círculo. Mi figura tiene lados rectos y tres vértices.','¿Cuál cumple ambas pistas?','Triángulo',['Cuadrado','Círculo','Las tres'],'El triángulo tiene lados rectos y tres vértices.'],
    [5,'Camila llegó antes que Diego. Antonia llegó después de Camila y antes de Diego.','¿Cuál es el orden de llegada?','Camila, Antonia, Diego',['Camila, Diego, Antonia','Antonia, Camila, Diego','Diego, Antonia, Camila'],'Camila llegó primero, Antonia quedó en medio y Diego al final.'],
    [5,'Un pez tiene aletas y vive en el agua. Una mariposa tiene alas. Un conejo tiene pelo.','¿Qué animal coincide con las pistas «agua» y «aletas»?','Pez',['Mariposa','Conejo','Los tres'],'El pez cumple las dos pistas: vive en el agua y tiene aletas.']
  );
  reasoningRows.soluciones.push(
    [5,'Para preparar una etiqueta debes escribir el nombre de la planta y la fecha. Max ya escribió «poroto».','¿Qué falta para completar la instrucción?','Escribir la fecha',['Escribir poroto otra vez','Dibujar un auto','Borrar el nombre'],'La etiqueta ya tiene el nombre de la planta; falta la fecha.'],
    [5,'Hay doce lápices. Guardas cinco y prestas dos de los que quedaron.','¿Qué operaciones permiten saber cuántos quedan fuera?','Restar cinco y después dos',['Sumar cinco y después dos','Restar cinco y sumar dos','Sumar doce y cinco'],'Guardar cinco y prestar dos quita lápices del grupo inicial: doce menos cinco menos dos.'],
    [5,'Quieres comparar el largo de dos cintas. Tienes una regla y todavía no has medido ninguna.','¿Qué plan permite compararlas?','Medir ambas con la misma regla',['Medir solo una cinta','Comparar solo sus colores','Doblar una sin medir'],'Para comparar los largos, medimos ambas cintas con la misma unidad.'],
    [5,'Escribiste «la niña corre». Te piden revisar el inicio y el final de la oración.','¿Cuál cumple la revisión?','La niña corre.',['la niña corre.','La niña corre','la niña corre'],'Una oración empieza con mayúscula y termina con punto.'],
    [5,'El problema dice: «Ana tiene ocho láminas y recibe cuatro más». Debes explicar cómo sabes el total.','¿Qué respuesta explica el cálculo?','Sumo ocho más cuatro porque recibe más',['Resto cuatro porque recibe más','Elijo ocho porque aparece primero','Elijo cuatro porque es menor'],'Recibir cuatro más aumenta la cantidad; por eso sumamos ocho más cuatro.'],
    [5,'Hay tres votos por manzana y cinco por plátano. Debes mostrar cuál fue más elegido en un gráfico.','¿Qué opción representa los datos?','Manzana con tres marcas y plátano con cinco',['Manzana con cinco y plátano con tres','Ambas frutas con cinco marcas','Solo manzana con ocho marcas'],'Cada marca representa un voto: tres para manzana y cinco para plátano.']
  );
  function reasoningBank(game,level){return (reasoningRows[game]||[]).filter(r=>r[0]===level).map(([,context,text,answer,wrong,model])=>({context,text,answer,options:[answer,...wrong],model}));}
  activities.push(
    {id:'patrones',title:'¿Qué sigue?',subtitle:'Descubre la regla y completa el patrón.',tag:'RAZONAMIENTO · PATRONES',icon:'🔷',color:'blue',type:'30 retos de patrones',section:'razonar'},
    {id:'pistas',title:'Detective de pistas',subtitle:'Une las pistas para encontrar la respuesta.',tag:'RAZONAMIENTO · DEDUCCIÓN',icon:'🕵️',color:'lilac',type:'30 retos de lógica',section:'razonar'},
    {id:'soluciones',title:'Pienso una solución',subtitle:'Comprende el problema y elige qué hacer.',tag:'RAZONAMIENTO · VIDA DIARIA',icon:'💡',color:'yellow',type:'30 situaciones',section:'razonar'}
  );
  activities.find(a=>a.id==='ordenar').type='60 oraciones para ordenar';
  activities.find(a=>a.id==='completar').type='40 frases para completar';
  activities.find(a=>a.id==='historias').type='15 cuentos · 45 preguntas';
  activities.find(a=>a.id==='puzle').type='Puzle de 4 a 16 piezas';
  function questionBank(level){return level===5?applicationQuestions:level===4?advancedQuestions:level===3?[...challengeQuestions,...moreQuestions]:level===2?[...questions,...moreQuestions]:questions;}
  function intruderBank(level){return level===5?applicationIntruders:level===4?advancedIntruders:level===3?trickyIntruders:intruders;}
  function puzzleGrid(pieces){return {cols:pieces===4?2:pieces===6||pieces===9?3:4,rows:pieces===16?4:pieces===9||pieces===12?3:2};}
  function chooseVoice(voices,uri=''){
    const spanish=voices.filter(v=>/^es(?:[-_]|$)/i.test(v.lang));
    const score=v=>(/natural|neural|premium|enhanced/i.test(v.name)?20:0)+(/^es[-_]CL$/i.test(v.lang)?8:/^es[-_](MX|AR|US)$/i.test(v.lang)?5:0)+(v.default?1:0);
    return spanish.find(v=>v.voiceURI===uri)||spanish.sort((a,b)=>score(b)-score(a))[0];
  }
  function voiceKey(text){return String(text).normalize('NFKC').toLocaleLowerCase('es').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();}
  function shuffle(items, random=Math.random) {
    const result=[...items];
    for(let i=result.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
    return result;
  }
  function choices(items, answer, count) { return shuffle([answer,...items.filter(x=>x!==answer).slice(0,count-1)]); }
  function classifyRound(index, count, level=1) {
    const all=Object.keys(categories);
    const cats=level===1?groups[index % groups.length]:Array.from({length:level===2?3:4},(_,i)=>all[(index+i)%all.length]);
    const ids=cats.flatMap(cat=>{
      const vocabulary=Object.keys(words).filter(id=>words[id][2]===cat&&(level===5?!!applicationWords[id]:!applicationWords[id]));
      const start=Math.floor(index/groups.length);
      return Array.from({length:level>=4?4:level===3?3:count===2?1:2},(_,i)=>vocabulary[(start+i)%vocabulary.length]);
    });
    return {cats,ids:shuffle(ids)};
  }
  return {words,categories,activities,intruders,questions,sequences,shuffle,choices,classifyRound,levels,questionBank,intruderBank,longSequences,advancedSequences,sequenceBank,puzzleGrid,chooseVoice,voiceKey,sentenceBank,completionBank,storyBank,reasoningBank};
})();
if (typeof module !== 'undefined') module.exports=LEARNING;
