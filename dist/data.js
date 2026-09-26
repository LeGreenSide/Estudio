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
  const levels={1:{name:'Primeros pasos',choices:2,pieces:4},2:{name:'Explorar',choices:4,pieces:6},3:{name:'Un nuevo reto',choices:4,pieces:12}};
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
  function questionBank(level){return level===3?[...challengeQuestions,...moreQuestions]:level===2?[...questions,...moreQuestions]:questions;}
  function intruderBank(level){return level===3?trickyIntruders:intruders;}
  function puzzleGrid(pieces){return {cols:pieces===4?2:pieces===6||pieces===9?3:4,rows:pieces===9||pieces===12?3:2};}
  function chooseVoice(voices,uri=''){
    const spanish=voices.filter(v=>/^es(?:[-_]|$)/i.test(v.lang));
    const score=v=>(/natural|neural|premium|enhanced/i.test(v.name)?20:0)+(/^es[-_]CL$/i.test(v.lang)?8:/^es[-_](MX|AR|US)$/i.test(v.lang)?5:0)+(v.default?1:0);
    return spanish.find(v=>v.voiceURI===uri)||spanish.sort((a,b)=>score(b)-score(a))[0];
  }
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
      const vocabulary=Object.keys(words).filter(id=>words[id][2]===cat);
      const start=Math.floor(index/groups.length);
      return Array.from({length:level===3?3:count===2?1:2},(_,i)=>vocabulary[(start+i)%vocabulary.length]);
    });
    return {cats,ids:shuffle(ids)};
  }
  return {words,categories,activities,intruders,questions,sequences,shuffle,choices,classifyRound,levels,questionBank,intruderBank,longSequences,puzzleGrid,chooseVoice,sentenceBank,completionBank,storyBank};
})();
if (typeof module !== 'undefined') module.exports=LEARNING;
