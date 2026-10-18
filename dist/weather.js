'use strict';
// Scope: https://www.curriculumnacional.cl/docente/629/w3-article-21005.html (CN02 OA 12, 13).
// Definitions: https://climatologia.meteochile.gob.cl/publicaciones/documentosGenerales/GlosarioReportesCiudadanos.pdf
// All forecasts below are invented practice data, not current weather information.
const WEATHER=(()=>{
 const games=[
  ['simbolos-tiempo','Detective del cielo','Reconoce símbolos y describe lo que observas.','🌤️'],
  ['pronostico','Leo el pronóstico','Descubre mínimas, máximas y compara días.','🌡️'],
  ['instrumentos','Mi estación del tiempo','Usa el termómetro, la veleta y el pluviómetro.','🧪'],
  ['precipitacion','¿Qué cae de las nubes?','Distingue lluvia, nieve y granizo.','🌧️'],
  ['reportero-tiempo','Reportero del tiempo','Arma oraciones para contar el pronóstico.','🎙️']
 ].map(([key,title,subtitle,icon])=>({id:'estudio-'+key,key,group:'ciencias',title,subtitle,icon,exam:'octubre-nuevo',oa:'CN02 OA 12, 13'}));
 const choice=(prompt,answer,wrong,help,extra={})=>({type:'choice',prompt,answer:String(answer),options:[answer,...wrong].map(String),help,...extra});
 const input=(prompt,answer,help,extra={})=>({type:'input',prompt,answer:String(answer),numeric:true,help,...extra});
 const order=(prompt,tokens,help,extra={})=>({type:'order',prompt,tokens,help,...extra});
 const symbols={
  sun:{name:'Despejado',description:'Un sol sin nubes'},
  cloud:{name:'Nublado',description:'Nubes que cubren el cielo'},
  partly:{name:'Parcialmente nublado',description:'Un sol asomándose detrás de una nube'},
  rain:{name:'Lluvia',description:'Una nube con gotas de agua'},
  snow:{name:'Nieve',description:'Una nube con copos de nieve'},
  hail:{name:'Granizo',description:'Una nube con bolitas de hielo'},
  wind:{name:'Viento',description:'Líneas curvas que representan aire en movimiento'}
 };
 const scenes=[
  ['sun','Desde la ventana vemos el cielo sin nubes.','El cielo está despejado.'],
  ['cloud','En el patio vemos el cielo cubierto de nubes.','El cielo está nublado.'],
  ['rain','Caen gotas de agua desde las nubes sobre el techo.','Está lloviendo.'],
  ['snow','En la montaña caen copos blancos desde las nubes.','Está nevando.'],
  ['hail','Del cielo caen bolitas duras de hielo.','Está granizando.'],
  ['wind','Las banderas se mueven por el aire.','Hay viento.'],
  ['partly','En el paseo vemos nubes y también una parte del cielo despejada.','El cielo está parcialmente nublado.'],
  ['rain','En la plaza caen gotas de las nubes y se forman charcos.','Cae lluvia en la plaza.'],
  ['snow','Sobre el campo caen copos de cristales de hielo.','Cae nieve en el campo.'],
  ['hail','Bolitas de hielo caen de una nube y golpean el patio.','Cae granizo en el patio.'],
  ['wind','Una cinta se mueve porque el aire la empuja.','El aire en movimiento es viento.'],
  ['partly','Unas nubes pasan y dejan ver el sol entre ellas.','Hay sol y nubes en el cielo.']
 ];
 const days=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
 const instruments=[
  {key:'thermometer',name:'Termómetro',target:'la temperatura del aire',unit:'grados Celsius',description:'Un tubo con una columna roja y una escala en grados Celsius'},
  {key:'vane',name:'Veleta',target:'la dirección de donde viene el viento',unit:'dirección',description:'Una flecha que gira sobre un eje, con los puntos norte, este, sur y oeste'},
  {key:'rain-gauge',name:'Pluviómetro',target:'la cantidad de lluvia caída',unit:'milímetros',description:'Un recipiente abierto por arriba que recoge la lluvia, con una escala en milímetros'}
 ];
 const directions=['Norte','Este','Sur','Oeste'];
 const precipitation=[
  ['rain','Gotas de agua caen de las nubes sobre el patio.','Lluvia','Líquida'],
  ['snow','Copos de cristales de hielo caen de una nube.','Nieve','Sólida'],
  ['hail','Bolitas de hielo caen de las nubes al suelo.','Granizo','Sólida'],
  [null,'Una persona riega las flores con una manguera.','No es precipitación','No es precipitación'],
  ['rain','La lluvia moja el techo al caer desde las nubes.','Lluvia','Líquida'],
  ['snow','En la montaña caen copos de nieve desde el cielo.','Nieve','Sólida'],
  ['hail','Una granizada deja bolitas de hielo en la plaza.','Granizo','Sólida'],
  [null,'Una fuente lanza agua hacia arriba y luego cae.','No es precipitación','No es precipitación'],
  ['rain','Gotas de lluvia caen sobre los árboles.','Lluvia','Líquida'],
  [null,'El viento mueve las hojas, pero no cae agua del cielo.','No es precipitación','No es precipitación'],
  [null,'Hay nubes en el cielo, pero no cae lluvia, nieve ni granizo.','No es precipitación','No es precipitación'],
  [null,'Una llave abierta deja caer agua en un lavamanos.','No es precipitación','No es precipitación']
 ];
 const precipTypes=[
  ['rain','Caen gotas líquidas desde una nube.'],['snow','Caen copos suaves de cristales de hielo.'],['hail','Caen bolitas duras de hielo.'],
  ['snow','Desde las nubes caen copos sobre las montañas.'],['hail','Pequeñas bolas de hielo golpean el techo al caer del cielo.'],['rain','Las gotas que caen del cielo mojan el paraguas.'],
  ['hail','En el patio rebotan bolitas de hielo que caen de una nube.'],['rain','El agua líquida de las nubes cae sobre la tierra.'],['snow','Copos formados por cristales de hielo caen sobre los árboles.'],
  ['rain','En la ventana vemos gotas líquidas que vienen de las nubes.'],['hail','Una nube deja caer granos de hielo sobre el campo.'],['snow','Los copos blancos caen del cielo y cubren los cerros.']
 ];
 const instrumentReasons=[
  ['Quieres comparar la temperatura de la mañana y de la tarde.','Leer el mismo termómetro en el mismo lugar a ambas horas','Leer la veleta por la mañana y el pluviómetro por la tarde','Comparar con el termómetro siempre permite usar la misma unidad.'],
  ['Quieres saber de dónde viene el viento.','Observar la punta de la flecha de la veleta','Medir los milímetros del pluviómetro','La punta de la veleta señala la dirección de donde viene el viento.'],
  ['Quieres recoger la lluvia del patio.','Poner el pluviómetro en un espacio abierto, con ayuda de un adulto','Poner el pluviómetro bajo un techo','Un techo impediría que la lluvia entrara al recipiente.'],
  ['Quieres medir la temperatura del aire, sin calentar el instrumento al sol.','Usar un termómetro ambiental protegido del sol directo y con aire alrededor','Apoyar el termómetro sobre una estufa encendida','El sol directo y una estufa pueden calentar el instrumento y alterar la medición del aire.'],
  ['Una veleta está atada y no puede girar. ¿Qué debe revisar un adulto?','Que la flecha pueda girar libremente','Que el recipiente tenga más agua','La veleta debe poder girar para indicar de dónde viene el viento.'],
  ['Quieres medir solo la lluvia que cae hoy.','Comenzar con el pluviómetro vacío y registrar al terminar','Agregar agua con una botella antes de empezar','Agregar agua cambia el registro y ya no muestra solo la lluvia caída.'],
  ['El termómetro marca 10 grados y después marca 17 grados.','La temperatura subió','Cambió la dirección del viento','Diecisiete es mayor que diez: la temperatura subió.'],
  ['La veleta pasó de señalar el norte a señalar el sur.','Cambió la dirección de donde viene el viento','Sabemos cuántos milímetros llovió','La veleta indica dirección. No mide la cantidad de lluvia.'],
  ['El pluviómetro registró 4 milímetros ayer y 9 hoy.','Hoy cayó más lluvia que ayer','Hoy la temperatura fue de 9 grados','Nueve milímetros es una mayor cantidad de lluvia que cuatro milímetros.'],
  ['Dos estudiantes quieren comparar temperaturas. Uno anota grados y otro no anota unidad.','Anotar el número y la unidad en ambos registros','Borrar todos los números y guardar solo dibujos','La unidad permite entender qué se midió y comparar los registros.'],
  ['Una veleta señala el oeste. Alguien dice que el viento corre a 20 kilómetros por hora.','La veleta sola no permite saber la velocidad','La flecha siempre significa 20 kilómetros por hora','La veleta muestra dirección; para medir velocidad se necesita otro instrumento.'],
  ['Dos pluviómetros recogieron lluvia durante tiempos distintos.','Usar el mismo período para comparar las cantidades de lluvia','Suponer que ambos recogieron lluvia durante el mismo tiempo','Para comparar, registramos el lugar, la cantidad y el período de medición.']
 ];
 const precipitationReasons=[
  ['Un niño dice: «La nieve no es precipitación porque no es líquida».','La nieve sí es precipitación: cae de las nubes como cristales de hielo','Solo la lluvia puede ser precipitación','La precipitación puede llegar como agua líquida o sólida.'],
  ['Hay granizo en el patio. ¿Qué explica su origen?','Cayeron bolitas de hielo desde una nube','El viento se convirtió en piedras','El granizo es una forma sólida de precipitación.'],
  ['El suelo está mojado porque regaron con una manguera.','Ese suelo mojado no demuestra que haya llovido','Todo suelo mojado demuestra que llovió','El agua puede llegar al suelo por distintas causas. Aquí vino de una manguera.'],
  ['El cielo está nublado, pero no cae agua ni hielo.','Hay nubes, pero no se observa precipitación','Todas las nubes producen lluvia todo el tiempo','Para observar precipitación debe caer agua líquida o sólida desde las nubes.'],
  ['En un lugar cae lluvia y en otro cae nieve.','En ambos lugares hay precipitación','Solo donde llueve hay precipitación','La lluvia es líquida y la nieve es sólida. Ambas son precipitación.'],
  ['El aire mueve una bandera sin que caiga agua.','Se observa viento, no precipitación','El movimiento de la bandera es lluvia','El viento es aire en movimiento; por sí solo no es precipitación.'],
  ['Una nube deja caer agua en forma de gotas.','Es lluvia y el agua está en estado líquido','Es granizo y el agua está en estado sólido','Las gotas líquidas que caen de las nubes forman lluvia.'],
  ['Caen copos blancos de las nubes. ¿Qué diferencia la nieve de la lluvia?','La nieve es sólida y la lluvia es líquida','La nieve siempre viene de una manguera','La nieve está formada por cristales de hielo.'],
  ['En un día cae granizo y después lluvia.','Hubo precipitación sólida y luego líquida','Solo hubo viento durante todo el día','El granizo es hielo; la lluvia está formada por gotas líquidas.'],
  ['Una fuente moja el suelo y el cielo está despejado.','El agua de la fuente no es precipitación atmosférica','Toda agua que cae es precipitación atmosférica','La precipitación atmosférica cae de las nubes y llega al suelo.'],
  ['Un pronóstico anuncia lluvia para mañana.','Se espera precipitación líquida, pero el pronóstico puede cambiar','Es una medición de lluvia que ya cayó mañana','Un pronóstico indica lo que se espera. La observación permite saber qué ocurrió.'],
  ['Vemos copos de nieve y también gotas de lluvia cayendo.','Se observan dos formas de precipitación','No hay precipitación porque aparecen juntas','Las gotas y los copos pueden caer al mismo tiempo; ambos son precipitación.']
 ];
 function forecast(r){
  const offsets=[[0,2,5],[5,0,3],[3,6,0],[2,0,4]][r%4],rainIndex=r%3;
  return offsets.map((offset,i)=>({day:days[(r+i)%7],min:3+r%6+offset,max:13+r%5+offset*2+i,symbol:i===rainIndex?'rain':i===(rainIndex+1)%3?'sun':'cloud'}));
 }
 const forecastClue=rows=>'Pronóstico de práctica. '+rows.map(d=>`${d.day}: ${symbols[d.symbol].name.toLowerCase()}, mínima ${d.min} grados Celsius y máxima ${d.max} grados Celsius.`).join(' ');
 const forecastExtra=rows=>({weather:{kind:'forecast',rows},clue:forecastClue(rows),note:'Son datos inventados para practicar. Mínima: la temperatura más baja esperada. Máxima: la más alta esperada.'});
 const symbolExtra=(keys,labels)=>({weather:{kind:'symbols',items:keys.map((key,i)=>({key,label:labels?labels[i]:''}))},clue:keys.map((key,i)=>(labels?labels[i]+': ':'')+symbols[key].description+'.').join(' ')});
 function exercise(key,level,index){
  if(!games.some(g=>g.key===key))return;
  const l=Math.max(1,Math.min(5,Math.floor(Number(level)||1))),r=((index%12)+12)%12;
  const [symbol,scene,sentence]=scenes[r];
  if(key==='simbolos-tiempo'){
   if(l===1){
    if(r<7)return choice('¿Qué significa este símbolo?',symbols[symbol].name,[symbols[['cloud','sun','snow','rain','wind','hail','sun'][r]].name],`${symbols[symbol].name}. ${symbols[symbol].description}.`,symbolExtra([symbol]));
    const other=['sun','cloud','rain','snow','hail'][r-7],keys=r%2?[symbol,other]:[other,symbol],answer=keys.indexOf(symbol)===0?'A':'B';
    return choice(`¿Qué símbolo representa ${symbols[symbol].name.toLowerCase()}?`,answer,[answer==='A'?'B':'A'],`El símbolo ${answer} representa ${symbols[symbol].name.toLowerCase()}.`,symbolExtra(keys,['A','B']));
   }
   if(l===2)return choice('¿Qué condición del tiempo observamos?',symbols[symbol].name,Object.keys(symbols).filter(k=>k!==symbol).slice(r%4,r%4+2).map(k=>symbols[k].name),`${sentence} ${symbols[symbol].description} representa esa condición.`,{clue:scene});
   if(l===3){const other=['sun','rain','wind','cloud','snow','partly','hail'][(r+2)%7],a=symbol,b=other===a?'sun':other,answer=symbols[a].name+' y '+symbols[b].name.toLowerCase();return choice('Lee los dos símbolos de este registro. ¿Qué condiciones aparecen?',answer,[symbols[a].name+' y '+symbols[Object.keys(symbols).find(k=>k!==a&&k!==b)].name.toLowerCase(),'Solo '+symbols[a].name.toLowerCase()],`El primer símbolo indica ${symbols[a].name.toLowerCase()} y el segundo, ${symbols[b].name.toLowerCase()}.`,symbolExtra([a,b],['Registro 1','Registro 2']));}
   if(l===4){const keys=[symbol,'sun','rain'];if(symbol==='sun')keys[1]='cloud';if(symbol==='rain')keys[2]='snow';const labels=['Mañana','Tarde','Noche'],target=r%3;return choice(`¿Qué condición muestra el registro de la ${labels[target].toLowerCase()}?`,symbols[keys[target]].name,keys.filter((_,i)=>i!==target).map(k=>symbols[k].name),`En la ${labels[target].toLowerCase()}, el registro muestra ${symbols[keys[target]].name.toLowerCase()}.`,symbolExtra(keys,labels));}
   const reasoning=[
    ['Vemos un símbolo de sol, sin una temperatura escrita.','Sabemos que estará despejado; no sabemos la temperatura exacta','El sol significa siempre 30 grados','Despejado describe las nubes del cielo; la temperatura se muestra con otro dato.'],
    ['El símbolo tiene nubes, pero no dibuja gotas.','Indica cielo nublado, sin anunciar lluvia con ese símbolo','Toda nube significa lluvia segura','El símbolo de nublado es diferente del símbolo de lluvia.'],
    ['El símbolo dibuja una nube con gotas.','Representa lluvia, una forma de precipitación','Representa solo viento','Las gotas que salen de una nube representan lluvia.'],
    ['El símbolo tiene copos debajo de una nube.','Representa nieve, que es agua en estado sólido','Representa un día sin precipitación','Los copos indican nieve. La nieve es una forma de precipitación.'],
    ['El símbolo dibuja bolitas de hielo bajo una nube.','Representa granizo','Representa lluvia líquida','El granizo está formado por bolitas de hielo.'],
    ['Un registro muestra viento y otro muestra lluvia.','Describen condiciones diferentes del tiempo','Los dos significan exactamente lo mismo','El viento es aire en movimiento y la lluvia son gotas que caen de las nubes.'],
    ['Un sol aparece parcialmente tapado por una nube.','Representa cielo parcialmente nublado','Representa cielo completamente despejado','Este símbolo combina partes con nubes y partes despejadas.'],
    ['Por la mañana hay sol y por la tarde aparece lluvia.','El tiempo puede cambiar durante el día','Un día nunca puede tener cambios del tiempo','Las condiciones del tiempo se observan en cada momento y pueden cambiar.'],
    ['Un pronóstico muestra nieve para el viernes.','Se espera que caiga nieve el viernes','Asegura cuántos copos exactos van a caer','Los símbolos muestran una condición esperada, no una cuenta de copos.'],
    ['Hay una nube con bolitas de hielo y otra con gotas.','Una indica granizo y la otra indica lluvia','Las dos indican solo cielo despejado','El símbolo distingue precipitación sólida y líquida.'],
    ['El símbolo indica viento, pero no incluye un número.','No permite saber la velocidad exacta del viento','Siempre significa un viento de 10 kilómetros por hora','Para conocer una velocidad exacta necesitamos una medición o un dato numérico.'],
    ['Un reporte dice: «Hoy hay sol entre nubes y viento en el patio».','Describe el tiempo atmosférico de un lugar en un momento','Describe el tiempo de todos los lugares durante todo el año','El tiempo atmosférico describe cómo está la atmósfera en un lugar y momento: su temperatura, viento, nubes y precipitaciones.']
   ][r];
   return choice('¿Qué conclusión sí podemos sacar?',reasoning[1],[reasoning[2],'No se puede saber nada del tiempo'],reasoning[3],{clue:reasoning[0],weather:symbolExtra([symbol]).weather});
  }
  if(key==='pronostico'){
   const rows=forecast(r),day=rows[(r+Math.floor(r/3))%3],maximum=r%2===1,field=maximum?'max':'min',word=maximum?'máxima':'mínima';
   if(l===1)return choice(`¿Cuál es la temperatura ${word} del ${day.day.toLowerCase()}?`,day[field]+' °C',[day[maximum?'min':'max']+' °C'],`La ${word} es ${day[field]} grados Celsius. Es la temperatura ${maximum?'más alta':'más baja'} esperada para ese día.`,forecastExtra([day]));
   if(l===2)return choice(`Busca el ${day.day.toLowerCase()}. ¿Cuál es su temperatura ${word}?`,day[field]+' °C',rows.filter(d=>d!==day).map(d=>d[field]+' °C'),`El ${day.day.toLowerCase()}, la ${word} esperada es ${day[field]} grados Celsius.`,forecastExtra(rows));
   if(l===3){const value=maximum?Math.max(...rows.map(d=>d.max)):Math.min(...rows.map(d=>d.min)),best=rows.find(d=>d[field]===value);return choice(`¿Qué día tiene la ${maximum?'máxima más alta':'mínima más baja'}?`,best.day,rows.filter(d=>d!==best).map(d=>d.day),`${best.day}: ${value} grados Celsius. Compara solo la columna de ${word}.`,forecastExtra(rows));}
   if(l===4)return input(`El ${day.day.toLowerCase()}, ¿cuántos grados de diferencia hay entre la mínima y la máxima?`,day.max-day.min,`${day.max} menos ${day.min} es ${day.max-day.min}. La diferencia es de ${day.max-day.min} grados.`,forecastExtra(rows));
   const dry=rows.filter(d=>d.symbol!=='rain'),best=maximum?dry.reduce((a,b)=>a.max>b.max?a:b):dry.reduce((a,b)=>a.min<b.min?a:b);
   return choice(`Primero descarta el día con lluvia. Entre los otros días, ¿cuál tiene la ${maximum?'máxima más alta':'mínima más baja'}?`,best.day,rows.filter(d=>d!==best).map(d=>d.day),`Sin el día de lluvia quedan ${dry.map(d=>d.day).join(' y ')}. ${best.day} tiene la ${word} ${maximum?'más alta':'más baja'}: ${best[field]} grados Celsius.`,forecastExtra(rows));
  }
  if(key==='instrumentos'){
   const ins=instruments[r%3],value=r%3===0?5+Math.floor(r/3)*5:r%3===2?5+Math.floor(r/3)*5:directions[Math.floor(r/3)],extra={weather:{kind:'instrument',instrument:ins.key,value},clue:ins.description+'.'};
   if(l===1)return choice('¿Cómo se llama este instrumento?',ins.name,[instruments[(r+1)%3].name],`${ins.name}: sirve para observar ${ins.target}.`,extra);
   if(l===2)return choice(`Queremos conocer ${ins.target}. ¿Qué instrumento elegimos?`,ins.name,instruments.filter(x=>x!==ins).map(x=>x.name),`El ${ins.name.toLowerCase()} permite conocer ${ins.target}.`,{clue:['La estación de la escuela está lista para medir.','El curso registrará cómo está el tiempo.','Vamos a elegir una herramienta para observar el tiempo.','Queremos completar el registro de hoy.'][Math.floor(r/3)]});
   if(l===3){const answer=ins.key==='vane'?value:value+' '+ins.unit,wrong=ins.key==='vane'?directions.filter(d=>d!==value).slice(0,2):[value+5,value-5].map(n=>n+' '+ins.unit);return choice(ins.key==='vane'?'La punta de la veleta indica de dónde viene el viento. ¿Qué dirección señala?':`Lee el ${ins.name.toLowerCase()}. ¿Qué valor muestra?`,answer,wrong,ins.key==='vane'?`La flecha apunta al ${value.toLowerCase()}: el viento viene de esa dirección.`:`La marca llega a ${answer}.`,{...extra,clue:ins.key==='vane'?`La flecha apunta al ${value.toLowerCase()}.`:`La marca llega a ${answer}.`});}
   if(l===4){const measure=ins.key==='vane'?`Viento que viene del ${value.toLowerCase()}`:ins.key==='thermometer'?`Temperatura del aire: ${value} grados Celsius`:`Lluvia caída: ${value} milímetros`,wrong=ins.key==='vane'?[`Lluvia caída: ${5+Math.floor(r/3)*5} milímetros`,'Velocidad del viento: 20 kilómetros por hora']:[`El viento viene del ${directions[Math.floor(r/3)].toLowerCase()}`,ins.key==='thermometer'?`Lluvia caída: ${value} milímetros`:`Temperatura del aire: ${value} grados Celsius`];return choice('¿Qué anotación corresponde al instrumento y su lectura?',measure,wrong,`${ins.name}: ${measure.toLowerCase()}.`,{...extra,clue:ins.key==='vane'?`${ins.name}: la flecha apunta al ${value.toLowerCase()}.`:`${ins.name}: marca ${value} ${ins.unit}.`});}
   const reason=instrumentReasons[r];return choice('¿Qué conclusión o acción es correcta?',reason[1],[reason[2],'No hace falta observar ni registrar'],reason[3],{clue:reason[0]});
  }
  if(key==='precipitacion'){
   const [kind,description,name,state]=precipitation[r],extra={clue:description};
   if(l===1)return choice('¿Se observa precipitación que cae de las nubes?',kind?'Sí':'No',[kind?'No':'Sí'],kind?`${name} es precipitación: cae de las nubes.`:'No se observa agua ni hielo cayendo de las nubes.',extra);
   if(l===2){const [form,clue]=precipTypes[r],answer=symbols[form].name;return choice('¿Qué forma de precipitación se describe?',answer,['Lluvia','Nieve','Granizo'].filter(x=>x!==answer),`${answer}. ${clue}`,{clue,weather:symbolExtra([form]).weather});}
   if(l===3)return choice('¿Cómo clasificarías esta observación?',state,['Líquida','Sólida','No es precipitación'].filter(x=>x!==state),kind?`${name} es precipitación ${state.toLowerCase()}.`:'Esta situación no muestra agua ni hielo cayendo de las nubes.',extra);
   if(l===4){const pair=precipitation[(r+3)%12],a=kind?'Sí':'No',b=pair[0]?'Sí':'No',answer=`A: ${a.toLowerCase()}. B: ${b.toLowerCase()}.`;return choice('¿En cuáles observaciones hay precipitación?',answer,[`A: ${a==='Sí'?'no':'sí'}. B: ${b.toLowerCase()}.`,`A: ${a.toLowerCase()}. B: ${b==='Sí'?'no':'sí'}.`],`A: ${kind?name+' cae de las nubes':'no hay precipitación'}. B: ${pair[0]?pair[2]+' cae de las nubes':'no hay precipitación'}.`,{clue:`Observación A: ${description} Observación B: ${pair[1]}`});}
   const reason=precipitationReasons[r];return choice('¿Qué explicación es correcta?',reason[1],[reason[2],'La precipitación no tiene relación con las nubes'],reason[3],{clue:reason[0]});
  }
  if(key==='reportero-tiempo'){
   const rows=forecast(r),day=rows[(r+Math.floor(r/3))%3],extra=forecastExtra(l<=3?[day]:rows);
   if(l===1)return choice('Elige la oración que cuenta lo que ocurre.',sentence,[scenes[(r+2)%12][2]],sentence,{clue:scene,weather:symbolExtra([symbol]).weather});
   if(l===2){const words=[['El cielo','está','despejado.'],['El cielo','está','nublado.'],['La lluvia','cae','de las nubes.'],['La nieve','cae','en copos.'],['El granizo','cae','en bolitas de hielo.'],['El viento','mueve','las banderas.'],['El sol','asoma','entre las nubes.'],['Las gotas','mojan','la plaza.'],['Los copos','caen','sobre el campo.'],['Las bolitas de hielo','golpean','el patio.'],['El aire','empuja','una cinta.'],['Las nubes','dejan ver','parte del cielo.']][r];return order('Arma la oración: primero de qué hablamos, después qué ocurre.',words,words.join(' '),{clue:scene,note:`Comienza por «${words[0]}».`,weather:symbolExtra([symbol]).weather});}
   if(l===3){const tokens=[`El ${day.day.toLowerCase()},`,'la mínima será de',`${day.min} grados` ,`y la máxima, de ${day.max} grados.`];return order('Arma el reporte: día, mínima y máxima.',tokens,tokens.join(' '),extra);}
   if(l===4){const first=rows[0],second=rows[1],describe=d=>(d.symbol==='rain'?'':'cielo ')+symbols[d.symbol].name.toLowerCase(),tokens=[`El ${first.day.toLowerCase()},`,`se espera ${describe(first)}.`,`El ${second.day.toLowerCase()},`,`se espera ${describe(second)}.`];return order(`Cuenta primero el pronóstico del ${first.day.toLowerCase()} y después el del ${second.day.toLowerCase()}.`,tokens,tokens.join(' '),extra);}
   const answer=`${day.day}: ${symbols[day.symbol].name.toLowerCase()}, mínima ${day.min} y máxima ${day.max} grados.`,other=rows[(rows.indexOf(day)+1)%3];
   return choice(`Revisa cielo y temperaturas. ¿Qué reporte del ${day.day.toLowerCase()} es correcto?`,answer,[`${day.day}: ${symbols[day.symbol].name.toLowerCase()}, mínima ${day.max} y máxima ${day.min} grados.`,`${day.day}: ${symbols[other.symbol].name.toLowerCase()}, mínima ${day.min} y máxima ${day.max} grados.`],answer,extra);
  }
 }
 function symbolSvg(key,label,escapeHTML){
  const cloud='<path d="M37 68 C17 68 17 39 39 39 C40 17 75 17 81 39 C105 31 118 66 92 68Z" fill="#dce7f1" stroke="#334e68" stroke-width="4"/>';
  const sun='<g stroke="#bc6900" stroke-width="4" stroke-linecap="round"><circle cx="64" cy="46" r="21" fill="#ffd45e"/><path d="M64 14V6 M64 78V86 M32 46H24 M96 46H104 M41 23L35 17 M87 69L93 75 M87 23L93 17 M41 69L35 75"/></g>';
  let drawing='';
  if(key==='sun')drawing=sun;
  if(key==='cloud')drawing=cloud;
  if(key==='partly')drawing='<g transform="translate(-13,-8) scale(.83)">'+sun+'</g>'+cloud;
  if(key==='rain')drawing=cloud+'<path d="M42 78L37 91 M64 78L59 91 M86 78L81 91" stroke="#1765ad" stroke-width="5" stroke-linecap="round"/>';
  if(key==='snow')drawing=cloud+[41,65,89].map(x=>`<path d="M${x} 77V95 M${x-8} 81L${x+8} 91 M${x-8} 91L${x+8} 81" stroke="#1765ad" stroke-width="3"/>`).join('');
  if(key==='hail')drawing=cloud+[41,65,89].map(x=>`<circle cx="${x}" cy="86" r="6" fill="#9ed3f5" stroke="#1765ad" stroke-width="3"/>`).join('');
  if(key==='wind')drawing='<path d="M18 34H85 C110 34 109 10 92 16 M18 50H102 C124 50 121 77 103 72 M18 66H67 C88 66 84 89 70 83" fill="none" stroke="#19766a" stroke-width="6" stroke-linecap="round"/>';
  return `<svg class="weather-icon" viewBox="0 0 128 104" role="img" aria-label="${escapeHTML(label||symbols[key].description)}">${drawing}</svg>`;
 }
 function visual(q,escapeHTML){
  const w=q.weather;if(!w)return '';
  if(w.kind==='symbols')return `<div class="weather-visual weather-symbols">${w.items.map(item=>`<figure class="weather-symbol-card">${symbolSvg(item.key,'',escapeHTML)}${item.label?`<figcaption>${escapeHTML(item.label)}</figcaption>`:''}</figure>`).join('')}</div>`;
  if(w.kind==='forecast')return `<div class="weather-visual weather-forecast"><table><caption>Pronóstico para practicar</caption><thead><tr><th scope="col">Día</th><th scope="col">Cielo</th><th scope="col">Mínima</th><th scope="col">Máxima</th></tr></thead><tbody>${w.rows.map(d=>`<tr><th scope="row">${escapeHTML(d.day)}</th><td>${symbolSvg(d.symbol,symbols[d.symbol].name,escapeHTML)}<span>${escapeHTML(symbols[d.symbol].name)}</span></td><td>${d.min} °C</td><td>${d.max} °C</td></tr>`).join('')}</tbody></table></div>`;
  if(w.kind==='instrument'){
   let drawing='';
   if(w.instrument==='thermometer')drawing=`<rect x="66" y="22" width="28" height="140" rx="14" fill="#fff" stroke="#334e68" stroke-width="4"/><circle cx="80" cy="169" r="22" fill="#e64755" stroke="#334e68" stroke-width="4"/><rect x="73.5" y="${150-w.value*4}" width="13" height="${19+w.value*4}" fill="#e64755"/>${[0,5,10,15,20,25,30].map(n=>`<path d="M98 ${150-n*4}H110" stroke="#334e68" stroke-width="3"/><text x="118" y="${156-n*4}">${n}</text>`).join('')}<text x="116" y="185">°C</text>`;
   if(w.instrument==='rain-gauge')drawing=`<path d="M47 30V180H113V30" fill="#fff" stroke="#334e68" stroke-width="4"/><path d="M49 ${174-w.value*6}H111V178H49Z" fill="#70c5f2"/>${[0,5,10,15,20].map(n=>`<path d="M96 ${174-n*6}H114" stroke="#334e68" stroke-width="3"/><text x="123" y="${180-n*6}">${n}</text>`).join('')}<text x="48" y="207">milímetros</text><path d="M59 8L55 20 M84 7L80 19 M104 8L100 20" stroke="#1765ad" stroke-width="4" stroke-linecap="round"/>`;
   if(w.instrument==='vane')drawing=`<circle cx="105" cy="106" r="62" fill="#edf7f6" stroke="#9abbb5" stroke-width="3"/><path d="M105 47V166 M46 106H164" stroke="#9abbb5" stroke-width="2"/><text x="99" y="30">N</text><text x="182" y="113">E</text><text x="100" y="194">S</text><text x="13" y="113">O</text><g transform="rotate(${directions.indexOf(w.value)*90} 105 106)"><path d="M105 62V147" stroke="#19766a" stroke-width="7"/><path d="M105 52L91 77H119Z" fill="#19766a"/><path d="M95 132H115V150H95Z" fill="#ffd45e" stroke="#334e68" stroke-width="2"/></g><circle cx="105" cy="106" r="7" fill="#334e68"/>`;
   return `<figure class="weather-visual weather-instrument"><svg viewBox="0 0 210 220" role="img" aria-label="${escapeHTML(q.clue)}">${drawing}</svg><figcaption>${w.instrument==='vane'?'N: norte · E: este · S: sur · O: oeste':w.instrument==='thermometer'?'Escala en grados Celsius':'Escala en milímetros de lluvia'}</figcaption></figure>`;
  }
  return '';
 }
 return {games,exercise,visual};
})();
if(typeof module!=='undefined')module.exports=WEATHER;
