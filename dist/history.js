'use strict';
// Temario familiar de octubre. Casos cotidianos inventados; hechos históricos contrastados con fuentes oficiales.
const HISTORY=(()=>{
 const games=[
  ['legados','Huellas del pasado','Descubre qué son el legado y el mestizaje.','🧶','HI02 OA 01, 03'],
  ['inmigrantes','Historias de viaje','Distingue visitar, mudarse y aportar a una comunidad.','🧳','HI02 OA 04'],
  ['personajes','¿Quién hizo qué?','Relaciona a Colón, Valdivia e Isabel y Fernando.','📜','HI02 OA 03'],
  ['naves','Las tres naves','Aprende sus nombres y reconstruye el viaje de 1492.','⛵','HI02 OA 03'],
  ['alimentos-origen','La cocina de la historia','Clasifica alimentos americanos y traídos por los españoles.','🌽','HI02 OA 03']
 ].map(([key,title,subtitle,icon,oa])=>({id:'estudio-'+key,key,group:'historia',title,subtitle,icon,oa,exam:'octubre-nuevo'}));
 const choice=(prompt,answer,wrong,help,clue)=>({type:'choice',prompt,answer,options:[answer,...wrong],help,...(clue?{clue}:{})});
 const rowChoice=(row,easy=false)=>choice(row[0],row[1],row.slice(2,easy?3:4),row[4],row[5]);
 const order=(tokens,clue)=>({type:'order',prompt:'Arma la oración para explicar lo aprendido.',tokens,help:tokens.join(' ')+'.',clue,sentence:true});
 const terms=['Legado','Mestizaje','Inmigrante'];
 const concepts=[
  ['Legado','Algo del pasado que recibimos y conservamos.','Una abuela enseña a su nieta un tejido aprendido de sus mayores.',['Un legado','une','el pasado','con el presente']],
  ['Mestizaje','Mezcla de ascendencias y de culturas a lo largo del tiempo.','Una familia tiene antepasados indígenas y españoles.',['El mestizaje','incluye','ascendencias','de distintos pueblos']],
  ['Inmigrante','Persona que llega desde otro país para vivir en él.','Una familia deja Italia y se establece en Chile.',['Una persona inmigrante','llega','a otro país','para vivir allí']],
  ['Legado','Una enseñanza que pasa de una generación a otra.','Un abuelo comparte una canción que aprendió cuando era pequeño.',['Las canciones','pueden ser','un legado','de nuestros mayores']],
  ['Mestizaje','Encuentro y mezcla de elementos de distintas culturas.','Una receta combina maíz americano y trigo traído por españoles.',['La cocina','puede combinar','ingredientes','de distintas culturas']],
  ['Inmigrante','Alguien que se establece en un país distinto del que venía.','Una persona sale de China y comienza una nueva vida en Chile.',['Quien llega','a vivir','a otro país','es inmigrante allí']],
  ['Legado','Una costumbre del pasado que continúa en el presente.','En una comunidad se sigue contando un relato muy antiguo.',['Los relatos','transmiten','la memoria','de una comunidad']],
  ['Mestizaje','Proceso en el que se combinan herencias de distintos pueblos.','En Chile se han combinado aportes indígenas y españoles.',['La historia de Chile','incluye','aportes indígenas','y españoles']],
  ['Inmigrante','Persona que se muda a vivir a otro país.','Una familia llega desde Palestina y se queda a vivir en Chile.',['Las personas inmigrantes','pueden compartir','sus conocimientos','con la comunidad']],
  ['Legado','Una obra del pasado que otras generaciones reciben.','Una comunidad cuida una antigua construcción para conservar su historia.',['Cuidar','una construcción antigua','ayuda a conservar','su historia']],
  ['Mestizaje','Mezcla cultural que puede verse en prácticas cotidianas.','Una preparación reúne técnicas e ingredientes de distintos pueblos.',['El mestizaje cultural','puede observarse','en algunas','preparaciones de comida']],
  ['Inmigrante','Quien llega de otro país para establecer su hogar.','Una familia deja Alemania y hace su hogar en Chile.',['Cada familia inmigrante','tiene','su propia','historia de vida']]
 ];
 const legacyReasons=[
  ['Una niña aprende el tejido de su abuela. ¿Qué se transmite?','Un conocimiento entre generaciones','Solo la edad de la abuela','El tiempo de mañana','El tejido aprendido de los mayores es un ejemplo de legado.'],
  ['Una receta junta maíz y trigo. ¿Qué muestra?','Ingredientes de distintas procedencias','Que ambos nacieron en España','Que el maíz llegó de Europa','El maíz es americano. El trigo fue introducido por los españoles; combinarlos muestra un intercambio cultural.'],
  ['Una familia se establece en otro país. ¿Qué palabra corresponde?','Inmigración','Pronóstico','Evaporación','La inmigración es la llegada de personas a un país para vivir en él.'],
  ['¿Por qué grabar un relato antiguo de la familia?','Para que otros puedan conocerlo','Para cambiar la lluvia','Para borrar el pasado','Registrar un relato ayuda a transmitirlo a nuevas generaciones.'],
  ['Hay antepasados de distintos pueblos en una familia. ¿Con qué se relaciona?','Con el mestizaje','Con el termómetro','Con la dirección del viento','El mestizaje incluye la mezcla de ascendencias de distintos pueblos. No indica que una cultura valga más que otra.'],
  ['Una persona llegó de otro país hace años. ¿Qué dato explica que sea inmigrante?','Se trasladó a ese país para vivir','Su comida favorita','Su color favorito','Lo que importa es haberse trasladado de un país a otro para vivir, no los gustos personales.'],
  ['¿Cómo mantener viva una canción antigua?','Aprendiéndola y compartiéndola','Olvidando todas sus palabras','Cambiando el nombre del mes','Compartir una canción permite transmitir ese legado.'],
  ['Una comunidad adapta una receta al conocer nuevos ingredientes. ¿Qué ocurrió?','Un intercambio cultural','La desaparición de todas sus costumbres','Un cambio de estación','Las culturas pueden compartir y adaptar elementos sin perder todas sus costumbres.'],
  ['¿Qué puede compartir una familia inmigrante con sus vecinos?','Relatos y conocimientos','La misma historia que todas las familias','Solo una única costumbre','Cada familia tiene experiencias propias y puede compartirlas con otras.'],
  ['¿Qué ayuda a conocer una construcción antigua?','Investigar quiénes la usaron','Inventar una fecha sin comprobar','Mirar solo su color','Conocer las personas y los usos del lugar ayuda a comprender su historia.'],
  ['Una receta tiene ingredientes americanos y traídos de otros lugares. ¿Cómo describirla?','Combina diferentes aportes','Tiene un solo origen cultural','No tiene ninguna historia','La combinación de aportes puede ser un ejemplo de mestizaje cultural.'],
  ['¿Qué pregunta permite conocer un legado familiar?','¿Qué aprendiste de tus mayores?','¿Cuánto marca el termómetro?','¿Cuál es la máxima de mañana?','Preguntar por aprendizajes recibidos ayuda a conocer los legados de una familia.']
 ];
 const legacyChallenges=[
  ['Una receta antigua se enseña a una nieta. ¿Qué prueba que es un legado?','Se transmite entre generaciones','Tiene un plato redondo','Se prepara un martes','La transmisión entre generaciones permite reconocer el legado.'],
  ['¿Qué ejemplo muestra mestizaje cultural?','Combinar aportes indígenas y españoles','Guardar dos cucharas iguales','Ordenar números de menor a mayor','El mestizaje cultural combina elementos de distintas culturas.'],
  ['Ana visita otro país; Luis se muda a vivir allí. ¿Quién es inmigrante en ese país?','Luis','Ana','Ambos, por salir de paseo','Luis se establece para vivir; una visita turística no es lo mismo que inmigrar.'],
  ['Un juego antiguo sigue practicándose. ¿El legado siempre es un objeto?','No, también puede ser una costumbre','Sí, siempre es una caja','Sí, solo puede ser una casa','También heredamos juegos, relatos, conocimientos y costumbres.'],
  ['Un niño dice que mezclar culturas hace que una valga menos. ¿Cómo corregirlo?','Las culturas tienen igual dignidad','Una cultura siempre vale más','Solo se respeta una cultura','El mestizaje no establece una jerarquía entre culturas. Todas las personas merecen respeto.'],
  ['¿Basta mirar a alguien para saber si inmigró?','No, hay que conocer su historia','Sí, basta su ropa','Sí, basta su peinado','La apariencia no cuenta dónde vivió una persona ni si se mudó de país.'],
  ['Una niña aprende una canción antigua y la enseña. ¿Qué mantiene vivo?','Un legado cultural','Una temperatura','Una ruta del viento','Aprender y enseñar una canción permite mantener ese legado.'],
  ['¿Qué afirmación reconoce el mestizaje sin borrar a los pueblos?','Hay mezclas y culturas que siguen vivas','Todas las culturas desaparecieron','Todos tienen una historia idéntica','El mestizaje no significa que los pueblos originarios o sus culturas hayan desaparecido.'],
  ['Dos familias vienen del mismo país. ¿Tienen necesariamente las mismas costumbres?','No, cada familia tiene su historia','Sí, deben ser idénticas','No pueden compartir ninguna','Un lugar de origen común no hace que todas las personas sean iguales.'],
  ['Un edificio antiguo se dañó. ¿Qué decisión ayuda a cuidar el legado?','Pedir ayuda para conservarlo','Romper lo que queda','Inventar su historia','Conservar un lugar y estudiar su historia ayuda a cuidar el patrimonio.'],
  ['Una receta se transmite y combina aportes de dos culturas. ¿Qué conceptos se relacionan?','Legado y mestizaje','Temperatura y precipitación','Antecesor y sucesor','Es legado porque se transmite; muestra mestizaje porque combina aportes culturales.'],
  ['Una familia llega a Chile y enseña una receta que recibió de sus abuelos. ¿Qué comparte?','Un legado de su familia','Una costumbre de todas las personas del mundo','La prueba de que todos son iguales','Una familia inmigrante puede compartir un legado recibido de generaciones anteriores.']
 ];
 const moves=[
  ['Ana','Perú','Chile','se queda a vivir',true],['Luis','Chile','Argentina','va de vacaciones y vuelve',false],
  ['Mei','China','Chile','se establece con su familia',true],['Sol','Chile','Perú','visita un museo y vuelve',false],
  ['Lina','Italia','Chile','forma su nuevo hogar',true],['Nico','Chile','Brasil','pasa una semana de vacaciones',false],
  ['Mara','Alemania','Chile','llega para vivir y trabajar',true],['Diego','Chile','Uruguay','visita a un amigo por tres días',false],
  ['Sara','Palestina','Chile','se muda con su familia',true],['Julia','Chile','Argentina','hace un paseo y regresa',false],
  ['Tomás','Argentina','Chile','comienza una nueva vida',true],['Elena','Chile','Perú','viaja por un fin de semana',false]
 ];
 const origins=[['italiana','Italia'],['palestina','Palestina'],['china','China'],['alemana','Alemania']];
 const migrantCases=[
  ['Una familia llegó desde Italia y ahora vive en Chile. ¿Cuál es el país de llegada?','Chile','Italia','China','Italia es el lugar de origen; Chile es el país donde la familia se estableció.'],
  ['Una carta dice: «Dejamos Palestina para vivir en Chile». ¿Cuál es el lugar de origen?','Palestina','Chile','Italia','La familia salió de Palestina y se estableció en Chile.'],
  ['Un registro antiguo cuenta que una persona llegó de China a vivir en Chile. ¿Qué muestra?','Inmigración del pasado','Un pronóstico del tiempo','Una visita al cine','Los registros antiguos permiten conocer historias de inmigrantes del pasado.'],
  ['Una familia alemana se estableció en Chile hace muchas décadas. ¿Inmigrar ocurre solo hoy?','No, también ocurrió en el pasado','Sí, comenzó hoy','Solo ocurre en los cuentos','Chile ha recibido inmigrantes en distintas épocas, incluidas familias alemanas.'],
  ['Una persona viaja para reunirse y vivir con su familia. ¿Qué motivo tiene?','Reunirse con su familia','Ir solo a una excursión','Cambiar el nombre del país','Las personas pueden migrar por distintos motivos, como reunirse con su familia.'],
  ['Una familia busca un lugar seguro para vivir. ¿Por qué se traslada?','Para vivir con mayor seguridad','Para cambiar de estación','Para medir la lluvia','Algunas personas dejan un lugar por razones de seguridad. Cada historia es diferente.'],
  ['Una persona se muda a otro país para trabajar. ¿Qué busca en este caso?','Una oportunidad de trabajo','Un paseo de una tarde','Un termómetro','Buscar trabajo es uno de los posibles motivos para migrar.'],
  ['Un abuelo llegó de otro país; su nieta nació en Chile. ¿Quién sabemos que inmigró?','El abuelo','La nieta, solo por su apellido','Los dos, sin saber su historia','Sabemos que el abuelo se mudó de país. El origen familiar no prueba que la nieta haya inmigrado.'],
  ['Una compañera llega desde otro país para vivir aquí. ¿Cómo conocer su historia?','Escuchar lo que quiera compartir','Adivinarla por su apariencia','Suponer que todas son iguales','Escuchar a la persona permite conocer su experiencia sin suposiciones.'],
  ['La familia conserva una carta de su llegada en 1910. ¿Qué podemos investigar?','Una historia de inmigración del pasado','La máxima de mañana','Los nombres de todos los países','Una carta fechada puede aportar información sobre una migración del pasado.'],
  ['Una familia chilena se muda a vivir a Italia. ¿Dónde es inmigrante al llegar?','En Italia','En Chile por permanecer allí','En todos los países que visita','Desde el punto de vista del país de llegada, la familia es inmigrante en Italia.'],
  ['Una familia comparte una canción que trajo consigo. ¿Qué puede aportar?','Un conocimiento cultural','Una costumbre obligatoria para todos','Una prueba de que todos cantan igual','Las personas pueden compartir conocimientos y costumbres; cada una decide qué practicar.']
 ];
 const migrantChallenges=[
  ['Una carta dice que una familia vino de Italia a Chile para vivir. ¿Qué dato demuestra inmigración?','Cambió de país para establecerse','La carta está en una caja','La carta tiene dibujos','El cambio de país para vivir permite distinguir inmigración de una simple visita.'],
  ['Dos personas vienen de Palestina. ¿Podemos conocer sus trabajos solo por su origen?','No, necesitamos conocer sus historias','Sí, todas tienen el mismo trabajo','Sí, todas venden lo mismo','El origen no determina el oficio ni las costumbres de cada persona.'],
  ['¿Qué ayuda a estudiar la llegada de inmigrantes chinos del pasado?','Documentos antiguos de sus viajes','Un dibujo inventado de mañana','Un pronóstico semanal','Los documentos de la época aportan evidencias sobre las migraciones del pasado.'],
  ['Una familia se mudó de Alemania a Chile; otra fue de vacaciones. ¿Cuál inmigró a Chile?','La que se mudó para vivir','La que visitó una semana','Ninguna, porque ambas viajaron','Viajar y migrar no significan lo mismo: aquí importa establecerse para vivir.'],
  ['Un niño habla español. ¿Eso prueba que nunca inmigró?','No, el idioma no cuenta toda su historia','Sí, solo se habla español en Chile','Sí, nadie aprende otro idioma','Se habla español en varios países y las personas pueden aprender idiomas. Hay que conocer su historia.'],
  ['Una familia vive en otro país para estar segura. ¿Es igual que un paseo?','No, busca establecer su vida allí','Sí, siempre es por diversión','Sí, todos los viajes duran lo mismo','Migrar para vivir en seguridad es distinto de hacer un paseo.'],
  ['Llegan personas por trabajo, familia y seguridad. ¿Qué podemos concluir?','Hay distintos motivos para migrar','Todas llegan por el mismo motivo','Nadie cambia de país para vivir','Las historias de migración pueden tener motivos diferentes.'],
  ['Una niña nació y siempre vivió en Chile; su abuelo inmigró. ¿Qué afirmación es segura?','Su familia tiene una historia migratoria','Ella también inmigró necesariamente','Su apariencia decide si inmigró','Tener antepasados inmigrantes no significa que la persona misma haya migrado.'],
  ['¿Qué diferencia a un conquistador de una familia que hoy migra?','La conquista buscó dominar territorios y pueblos','Toda migración es una conquista','Ninguna persona vivía en América','La conquista española implicó dominio y violencia sobre pueblos que ya habitaban América. No equivale a la inmigración actual.'],
  ['Tenemos una foto antigua sin fecha y una carta fechada. ¿Qué ayuda más a saber cuándo llegó la familia?','La carta que dice la fecha de llegada','Solo el color de la ropa','Una fecha que inventemos','Una fuente con fecha de llegada ayuda a ubicar el hecho en el tiempo.'],
  ['Una persona sale de Chile y vive en Perú. ¿Qué perspectiva usa la palabra inmigrante?','La del país al que llega: Perú','La del mar que cruzó','La de cualquier país que visita','Inmigrante nombra a quien llega a vivir a un país desde otro.'],
  ['Una familia enseña una receta y aprende otra local. ¿Qué muestra?','Intercambio cultural entre personas','Que una cultura vale menos','Que deben olvidar todo su pasado','Las personas pueden compartir y aprender sin dejar de merecer el mismo respeto.']
 ];
 const peopleBasics=[
  ['¿Quién dirigió el viaje que llegó a América en 1492?','Cristóbal Colón','Pedro de Valdivia','Fernando de Aragón','Cristóbal Colón dirigió ese viaje. América ya estaba habitada por muchos pueblos.'],
  ['¿Quién fundó Santiago en 1541?','Pedro de Valdivia','Cristóbal Colón','Isabel de Castilla','El conquistador Pedro de Valdivia fundó Santiago en 1541, en un territorio ya habitado.'],
  ['¿Cómo se llamaba la reina de Castilla que apoyó el viaje de Colón?','Isabel de Castilla','Santa María','La Niña','Isabel de Castilla fue una de las monarcas que apoyaron el proyecto de Colón.'],
  ['¿Cómo se llamaba el rey de Aragón que apoyó el proyecto de Colón?','Fernando de Aragón','Pedro de Valdivia','Cristóbal Colón','Fernando de Aragón e Isabel de Castilla apoyaron el proyecto de Colón.'],
  ['¿En qué año llegó el primer viaje de Colón a América?','1492','1541','2026','El primer viaje de Colón llegó a América en 1492.'],
  ['¿En qué año fundó Santiago Pedro de Valdivia?','1541','1492','2026','La fundación española de Santiago ocurrió en 1541.'],
  ['¿Quiénes vivían en América antes de la llegada de Colón?','Muchos pueblos originarios','Nadie','Solo los reyes de Castilla','América estaba habitada por diversos pueblos desde mucho antes de 1492.'],
  ['¿Qué ciudad fundó Pedro de Valdivia en 1541?','Santiago','Madrid','Roma','Pedro de Valdivia fundó Santiago en el valle del Mapocho.'],
  ['¿Cómo se conoce a Isabel y Fernando?','Los Reyes Católicos','Las tres carabelas','Los hermanos Valdivia','Isabel de Castilla y Fernando de Aragón son conocidos como los Reyes Católicos.'],
  ['¿Qué océano cruzó el viaje de Colón de 1492?','Atlántico','Pacífico','Índico','La expedición de Colón cruzó el océano Atlántico hacia América.'],
  ['¿Qué describe a Pedro de Valdivia?','Conquistador español','Rey de Aragón','Nave de Colón','Valdivia fue un conquistador español. La conquista buscó dominar territorios que ya tenían habitantes.'],
  ['¿Qué buscaba Colón al iniciar su viaje hacia el oeste?','Una ruta hacia Asia','Fundar Santiago en 1541','Llegar a la Luna','Colón buscaba llegar a Asia navegando hacia el oeste y llegó a tierras americanas.']
 ];
 const peopleClues=[
  ['Viajó por el Atlántico en 1492.','Cristóbal Colón'],['Fundó Santiago en el valle del Mapocho.','Pedro de Valdivia'],['Era reina de Castilla.','Isabel de Castilla'],['Era rey de Aragón.','Fernando de Aragón'],
  ['Su expedición incluía la Niña y la Pinta.','Cristóbal Colón'],['Fue un conquistador español en Chile.','Pedro de Valdivia'],['Apoyó el proyecto de Colón junto a Fernando.','Isabel de Castilla'],['Apoyó el proyecto de Colón junto a Isabel.','Fernando de Aragón'],
  ['Buscaba una ruta hacia Asia por el oeste.','Cristóbal Colón'],['Su fundación de Santiago ocurrió en 1541.','Pedro de Valdivia'],['Su nombre era Isabel y gobernaba Castilla.','Isabel de Castilla'],['Su nombre era Fernando y gobernaba Aragón.','Fernando de Aragón']
 ];
 const peopleSentences=[
  ['Cristóbal Colón','llegó a América','en','1492'],['Pedro de Valdivia','fundó Santiago','en','1541'],['Isabel','era','reina de','Castilla'],['Fernando','era','rey de','Aragón'],
  ['Los Reyes Católicos','apoyaron','el proyecto','de Colón'],['Antes de Colón','América','ya estaba','habitada'],['El viaje de Colón','cruzó','el océano','Atlántico'],['La fundación española de Santiago','ocurrió','en un territorio','ya habitado'],
  ['Colón','buscaba','una ruta','hacia Asia'],['Pedro de Valdivia','fue','un conquistador','español'],['Isabel y Fernando','son conocidos','como','los Reyes Católicos'],['El viaje de 1492','ocurrió','antes de','la fundación de Santiago de 1541']
 ];
 const peopleApplications=[
  ['Una tarjeta dice: «Viaje a América en 1492». ¿A quién corresponde?','Cristóbal Colón','Pedro de Valdivia','Isabel de Castilla','La fecha 1492 y el viaje atlántico corresponden a Colón.'],
  ['Una tarjeta dice: «Santiago, 1541». ¿A quién corresponde?','Pedro de Valdivia','Cristóbal Colón','Fernando de Aragón','Valdivia fundó Santiago en 1541.'],
  ['Falta una palabra: «Isabel de ___».','Castilla','Aragón','Santiago','Isabel gobernaba Castilla; Fernando, Aragón.'],
  ['Falta una palabra: «Fernando de ___».','Aragón','Castilla','América','Fernando era rey de Aragón.'],
  ['¿Qué ocurrió primero?','El viaje de Colón en 1492','La fundación de Santiago en 1541','Los dos el mismo año','1492 es anterior a 1541: el viaje de Colón ocurrió primero.'],
  ['¿Qué ocurrió después del viaje de Colón de 1492?','La fundación de Santiago en 1541','La llegada de los primeros habitantes de América','El inicio de todas las culturas americanas','América ya estaba habitada. La fundación española de Santiago ocurrió después, en 1541.'],
  ['Un dibujo muestra América vacía antes de 1492. ¿Qué falta?','Los pueblos que ya la habitaban','La llegada de Valdivia en 1492','Una ciudad llamada Castilla','En América ya vivían muchos pueblos antes de la llegada de Colón.'],
  ['Colón y Valdivia aparecen en el mismo cuaderno. ¿Son la misma persona?','No, participaron en hechos distintos','Sí, son dos nombres de la misma persona','Sí, ambos eran reyes','Colón dirigió el viaje de 1492; Valdivia fundó Santiago en 1541.'],
  ['¿Qué pareja corresponde a los Reyes Católicos?','Isabel y Fernando','Colón y Valdivia','Niña y Pinta','Isabel de Castilla y Fernando de Aragón eran los Reyes Católicos.'],
  ['Una flecha va de España a América en 1492. ¿Qué mar representa?','El océano Atlántico','El río Mapocho','El océano Índico','El viaje de 1492 atravesó el océano Atlántico.'],
  ['¿Qué dato evita confundir la conquista con unas vacaciones?','Buscaba dominar territorios y pueblos','Todos viajaban para jugar','No había personas en América','La conquista implicó dominio y violencia; no fue una visita turística.'],
  ['Colón buscaba Asia y llegó a América. ¿Qué frase es correcta?','El destino alcanzado fue distinto del buscado','Colón fundó Santiago ese día','América no tenía habitantes','Colón buscaba una ruta a Asia, pero llegó a tierras americanas ya habitadas.']
 ];
 const peopleChallenges=[
  ['«Valdivia dirigió las naves de 1492». ¿Cómo corregirlo?','Las dirigió Cristóbal Colón','Las dirigió Isabel en persona','Fue en 2026','Colón dirigió la expedición de 1492. Valdivia pertenece a otro episodio histórico.'],
  ['«Colón fundó Santiago en 1541». ¿Qué nombre debe ir?','Pedro de Valdivia','Fernando de Aragón','Isabel de Castilla','La fundación española de Santiago en 1541 corresponde a Pedro de Valdivia.'],
  ['¿Qué pareja de nombres y lugares es correcta?','Isabel: Castilla; Fernando: Aragón','Isabel: Aragón; Fernando: Castilla','Isabel: Chile; Fernando: América','Isabel era reina de Castilla y Fernando era rey de Aragón.'],
  ['Un museo agrupa a Isabel y Fernando. ¿Qué título corresponde?','Reyes Católicos','Naves de Colón','Fundadores de Santiago','La pareja de monarcas es conocida como los Reyes Católicos.'],
  ['Ordena mentalmente: 1541 y 1492. ¿Qué hecho va primero?','Colón llega a América','Valdivia funda Santiago','Los dos son simultáneos','1492 va antes de 1541. Son hechos distintos y de años diferentes.'],
  ['¿Qué afirmación reconoce a los habitantes de Santiago antes de 1541?','El valle ya tenía población indígena','Valdivia fue su primer habitante','No vivía nadie junto al Mapocho','La fundación española ocurrió en un valle donde ya vivían comunidades indígenas.'],
  ['«Colón fue la primera persona que llegó a América». ¿Qué sabemos?','Ya vivían numerosos pueblos allí','América estaba vacía','Valdivia llegó con él','La llegada de Colón no fue el comienzo de la vida humana en América.'],
  ['Una tarjeta une «Valdivia, Santiago, 1492». ¿Qué dato debes cambiar?','El año: fue 1541','La ciudad: fue Madrid','El nombre: fue Fernando','Valdivia y Santiago corresponden; el año correcto es 1541.'],
  ['Una tarjeta une «Colón, Atlántico, 1541». ¿Qué dato debes cambiar?','El año: el primer viaje fue en 1492','El océano: fue el Índico','El nombre: fue Valdivia','La travesía de Colón de la que estudiamos sus tres naves ocurrió en 1492.'],
  ['¿Qué diferencia bien los papeles en el viaje de 1492?','Colón dirigió; los reyes apoyaron el proyecto','Los reyes eran las naves','Valdivia era rey de Castilla','Colón dirigió la expedición. Isabel y Fernando apoyaron el proyecto desde la monarquía.'],
  ['¿Por qué no llamar a la conquista una simple visita?','Hubo dominio y violencia sobre pueblos','Porque no usaban maletas modernas','Porque todos vivían en el mismo lugar','La conquista alteró la vida de pueblos que ya habitaban el territorio e implicó dominio y violencia.'],
  ['¿Qué resumen respeta los hechos estudiados?','Colón: 1492; Santiago: 1541; América ya habitada','Colón y Valdivia eran la misma persona','América empezó a tener habitantes en 1492','Distinguir personas, fechas y habitantes previos permite comprender mejor estos hechos.']
 ];
 const shipNames=['La Niña','La Pinta','La Santa María'];
 const shipBasics=[
  ['Completa el nombre: «La ___». Su nombre es Niña.','Niña','Luna','Estrella','Una de las naves del viaje de 1492 se llamaba la Niña.'],
  ['Completa el nombre: «La ___». Su nombre es Pinta.','Pinta','Pluma','Pelota','Otra de las naves se llamaba la Pinta.'],
  ['Completa el nombre: «La Santa ___».','María','Isabel','Elena','La Santa María fue la nao de la expedición.'],
  ['¿Cuántas naves partieron en el viaje de Colón de 1492?','Tres','Dos','Cinco','Partieron tres naves: la Niña, la Pinta y la Santa María.'],
  ['¿Cuál de estos nombres es una nave del viaje?','La Niña','La Nube','La Montaña','La Niña participó en la expedición de 1492.'],
  ['¿Cuál de estos nombres pertenece a una nave de Colón?','La Pinta','La Luna','La Gota','La Pinta fue una de las dos carabelas.'],
  ['¿Qué nombre completa «Niña, Pinta y…»?','Santa María','Santa Clara de Santiago','Santa Teresa','La lista estudiada es Niña, Pinta y Santa María.'],
  ['¿Qué usaban estas naves para aprovechar el viento?','Velas','Motores eléctricos','Ruedas','Las naves de vela aprovechan la fuerza del viento.'],
  ['¿Qué tipo de nave era la Niña?','Carabela','Nao','Tren','La Niña y la Pinta eran carabelas.'],
  ['¿Qué tipo de nave era la Pinta?','Carabela','Nao','Avión','La Pinta era una carabela, al igual que la Niña.'],
  ['¿Qué tipo de nave era la Santa María?','Nao','Carabela','Submarino','La Santa María era una nao; las otras dos eran carabelas.'],
  ['¿Quién dirigió la expedición de estas tres naves?','Cristóbal Colón','Pedro de Valdivia','Fernando de Aragón','Cristóbal Colón dirigió el viaje de 1492.']
 ];
 const shipPairs=[[0,1,2],[0,2,1],[1,2,0]];
 const shipClassify=[
  ['¿Cuál de estas naves era una nao?','La Santa María','La Niña','La Pinta','La Santa María era la nao; la Niña y la Pinta eran carabelas.'],
  ['¿Qué pareja reúne las dos carabelas?','Niña y Pinta','Pinta y Santa María','Niña y Santa María','Las dos carabelas se llamaban la Niña y la Pinta.'],
  ['En «Niña, Pinta, Luna», ¿qué nombre debe reemplazar a Luna?','Santa María','Santa Isabel','Santa Elena','La tercera nave era la Santa María.'],
  ['Una maqueta tiene dos carabelas. ¿Qué falta para representar las tres naves?','Una nao','Un avión','Un tren','La expedición tenía dos carabelas y una nao, la Santa María.'],
  ['¿En qué grupo pondrías a la Niña?','Carabelas','Reyes','Ciudades','La Niña era una carabela de la expedición.'],
  ['¿En qué grupo pondrías a la Pinta?','Carabelas','Conquistadores','Ciudades','La Pinta era una carabela.'],
  ['¿En qué grupo pondrías a la Santa María?','Naos','Reinas','Océanos','Santa María es el nombre de la nao.'],
  ['¿Qué lista tiene solo nombres de naves?','Niña, Pinta, Santa María','Isabel, Fernando, Colón','Santiago, Castilla, Aragón','Niña, Pinta y Santa María son los nombres de las tres naves.'],
  ['¿Qué nombre debe ir en una tarjeta de persona?','Cristóbal Colón','La Niña','La Pinta','Colón es la persona que dirigió la expedición; Niña y Pinta son naves.'],
  ['¿Qué océano cruzaron las naves para llegar a América en 1492?','Atlántico','Pacífico','Índico','La expedición cruzó el océano Atlántico.'],
  ['¿Qué viaje representa una maqueta con Niña, Pinta y Santa María?','La expedición de 1492','La fundación de Santiago de 1541','Un viaje a la Luna','Las tres naves corresponden al primer viaje de Colón a América, en 1492.'],
  ['Dos carabelas más una nao. ¿Cuántas naves hay?','Tres','Una','Cuatro','Dos carabelas y una nao suman tres naves.']
 ];
 const shipSentences=[
  ['Las tres naves','se llamaban','Niña, Pinta','y Santa María'],['La Niña','era','una','carabela'],['La Pinta','también era','una','carabela'],['La Santa María','era','una','nao'],
  ['Colón','dirigió','la expedición','de 1492'],['Las naves','cruzaron','el océano','Atlántico'],['La Niña y la Pinta','eran','las dos','carabelas'],['Dos carabelas','y una nao','formaban','la expedición'],
  ['Las velas','aprovechan','la fuerza','del viento'],['Las tres naves','llegaron a tierras','que ya estaban','habitadas'],['La Santa María','formó parte','del viaje','de Colón'],['El viaje de 1492','salió de España','y cruzó el Atlántico','hacia América']
 ];
 const shipChallenges=[
  ['Un cartel dice «las tres carabelas». ¿Qué descripción es más precisa?','Dos carabelas y una nao','Tres naos','Dos aviones y una nao','Aunque suele hablarse de tres carabelas, la Santa María era una nao.'],
  ['Una lista dice «Niña, Pinta y Fernando». ¿Qué nombre sobra?','Fernando','Niña','Pinta','Fernando era un rey; la tercera nave se llamaba Santa María.'],
  ['Tienes etiquetas «Niña: nao» y «Santa María: carabela». ¿Qué haces?','Intercambiar los tipos de nave','Dejarlas como están','Cambiar ambas por avión','Niña corresponde a carabela y Santa María a nao.'],
  ['¿Qué maqueta representa la flota completa de 1492?','Niña, Pinta y Santa María','Solo Niña y Pinta','Tres naves llamadas Niña','La flota tenía tres naves con nombres diferentes.'],
  ['Una ficha dice «Pinta: carabela del viaje de 1492». ¿Cómo la evalúas?','Es correcta','El año debe ser 1541','La Pinta era un rey','La Pinta era una carabela de la expedición de 1492.'],
  ['¿Qué frase distingue una persona de una nave?','Colón dirigió y la Niña navegó','La Niña era reina','Colón era una carabela','Cristóbal Colón era el navegante; la Niña era una de las naves.'],
  ['Faltan nombres en «___ y Pinta: carabelas; ___: nao».','Niña y Santa María','Santa María y Niña','Colón y Fernando','La Niña completa el grupo de carabelas; Santa María es la nao.'],
  ['¿Qué dato permite agrupar Niña y Pinta?','Ambas eran carabelas','Ambas eran reinas','Ambas eran ciudades','Comparten el tipo de nave: carabela.'],
  ['Un dibujo pone motores eléctricos a las naves de 1492. ¿Qué debes revisar?','Se movían a vela, no con esos motores','Las naves viajaban por el aire','No existía el viento','Las tres naves eran embarcaciones de vela. Los motores eléctricos no corresponden a ese viaje.'],
  ['Una ruta del viaje de 1492 cruza el Pacífico desde España. ¿Qué debe corregirse?','El océano: cruzaron el Atlántico','El año: debe ser 2026','El destino: era la Luna','El viaje que estudiamos cruzó el Atlántico hacia América.'],
  ['¿Qué frase evita presentar América como un lugar vacío?','Las naves llegaron a tierras ya habitadas','Las naves llevaron a los primeros humanos','Nadie vivía allí antes de 1492','En América vivían muchos pueblos antes de la llegada de las naves.'],
  ['¿Cuál es el resumen correcto?','Colón, 1492, dos carabelas y una nao','Valdivia, 1541, tres aviones','Fernando, 2026, tres carabelas','Colón dirigió el viaje de 1492 con la Niña, la Pinta y la Santa María.']
 ];
 const foods=[
  ['Maíz','🌽',true],['Trigo','🌾',false],['Papa','🥔',true],['Arroz','🍚',false],['Tomate','🍅',true],['Cebolla','🧅',false],
  ['Poroto','🫘',true],['Ajo','🧄',false],['Ají','🌶️',true],['Uva','🍇',false],['Zapallo','🎃',true],['Lenteja','🥣',false]
 ];
 const foodOrigin=f=>f[2]?'Originario de América':'Traído por los españoles';
 const foodHelp=f=>f[2]?`${f[0]}: alimento americano que ya se conocía antes de la llegada de los españoles.`:`${f[0]}: fue introducido por los españoles en América. Eso no significa que se haya originado en España.`;
 const foodRecipes=[
  ['Una preparación lleva maíz y trigo.','Maíz','Trigo'],['Una sopa lleva papa y arroz.','Papa','Arroz'],['Una ensalada lleva tomate y cebolla.','Tomate','Cebolla'],['Un guiso lleva poroto y ajo.','Poroto','Ajo'],
  ['Una salsa lleva ají y cebolla.','Ají','Cebolla'],['Una sopa lleva zapallo y arroz.','Zapallo','Arroz'],['Una tortilla combina papa y harina de trigo.','Papa','Trigo'],['Una ensalada combina tomate y uva.','Tomate','Uva'],
  ['Un guiso lleva poroto y cebolla.','Poroto','Cebolla'],['Una preparación lleva maíz y ajo.','Maíz','Ajo'],['Un guiso combina zapallo y lenteja.','Zapallo','Lenteja'],['Una salsa combina ají y ajo.','Ají','Ajo']
 ];
 function exercise(key,level,index){
  const l=Math.max(1,Math.min(5,Number(level)||1)),r=((Number(index)||0)%12+12)%12;
  if(key==='legados'){
   const c=concepts[r],wrong=terms.filter(x=>x!==c[0]);
   if(l===1)return choice('¿Qué palabra corresponde?',c[0],wrong.slice(0,1),`${c[0]}: ${c[1]}`,c[1]);
   if(l===2)return choice('¿Qué concepto muestra este ejemplo?',c[0],wrong,`${c[0]}. ${c[1]}`,c[2]);
   if(l===3)return order(c[3],c[2]);
   return rowChoice((l===4?legacyReasons:legacyChallenges)[r]);
  }
  if(key==='inmigrantes'){
   const m=moves[r],o=origins[r%4],clue=`${m[0]} viaja de ${m[1]} a ${m[2]}: ${m[3]}.`;
   if(l===1)return choice(`¿${m[0]} llega como inmigrante a ${m[2]}?`,m[4]?'Sí, llega para vivir':'No, hace una visita',[m[4]?'No, hace una visita':'Sí, llega para vivir'],m[4]?'Se establece en otro país para vivir.':'En este caso visita por un tiempo y vuelve; no se muda a vivir.',clue);
   if(l===2){const cases=['Una familia','Una persona','Una comunidad'][Math.floor(r/4)],wrong=origins.filter(x=>x!==o).map(x=>x[1]).slice(0,2);return choice('¿De qué lugar venía este grupo de inmigrantes?',o[1],wrong,`La inmigración ${o[0]} provenía de ${o[1]}. En Chile hay historias de estos inmigrantes del pasado.`,`${cases} ${o[0]} llegó a vivir a Chile hace muchas décadas.`);}
   if(l===3){const actions=['y se estableció','y formó su nuevo hogar','y comenzó una nueva vida'][Math.floor(r/4)];return order(['Una familia',`llegó desde ${o[1]}`,actions,'en Chile'],`Caso para practicar: una familia cambia de país para vivir.`);}
   return rowChoice((l===4?migrantCases:migrantChallenges)[r]);
  }
  if(key==='personajes'){
   if(l===1)return rowChoice(peopleBasics[r],true);
   if(l===2){const c=peopleClues[r],names=['Cristóbal Colón','Pedro de Valdivia','Isabel de Castilla','Fernando de Aragón'];return choice('¿Qué personaje corresponde a la pista?',c[1],names.filter(x=>x!==c[1]).slice(r%2,r%2+2),`${c[1]}. ${c[0]}`,c[0]);}
   if(l===3)return order(peopleSentences[r],'Relaciona la persona, el lugar o la fecha.');
   return rowChoice((l===4?peopleApplications:peopleChallenges)[r]);
  }
  if(key==='naves'){
   if(l===1)return rowChoice(shipBasics[r],true);
   if(l===2){const p=shipPairs[r%3],known=[shipNames[p[0]],shipNames[p[1]]];return choice('¿Qué nave falta en esta lista?',shipNames[p[2]],known,`Las tres naves fueron ${shipNames.join(', ')}.`,`${['Lista del viaje','Tarjetas de naves','Nombres de la maqueta','Cuaderno de historia'][Math.floor(r/3)]}: ${known.join(' y ')}.`);}
   if(l===3)return rowChoice(shipClassify[r]);
   if(l===4)return order(shipSentences[r],'Piensa en el viaje y en los tipos de nave.');
   return rowChoice(shipChallenges[r]);
  }
  if(key==='alimentos-origen'){
   const f=foods[r],origin=foodOrigin(f),help=foodHelp(f);
   if(l===1)return choice('¿En qué canasto va este alimento?',origin,[f[2]?'Traído por los españoles':'Originario de América'],help,`${f[1]} ${f[0]}`);
   if(l===2)return choice(`¿Cuál es ${f[2]?'un alimento originario de América':'un alimento traído por los españoles a América'}?`,f[0],foods.filter(x=>x[2]!==f[2]).slice(Math.floor(r/2)%5,Math.floor(r/2)%5+2).map(x=>x[0]),help,'Clasifica los alimentos por su historia.');
   if(l===3){const recipe=foodRecipes[r],american=r%2===0,answer=recipe[american?1:2],wrong=recipe[american?2:1];return choice(`¿Qué ingrediente ${american?'es americano':'fue traído por los españoles'}?`,answer,[wrong],foodHelp(foods.find(x=>x[0]===answer)),recipe[0]);}
   if(l===4)return order(f[2]?[f[0],'es','un alimento','originario de América']:[f[0],'fue introducido','en América','por los españoles'],`${f[1]} ${f[0]}. Piensa en su historia.`);
   const american=foods.filter(x=>x[2]),introduced=foods.filter(x=>!x[2]),a=american[r%6],b=introduced[(r+Math.floor(r/6)+1)%6];
   return choice('¿Qué pareja reúne un alimento americano y uno traído por los españoles?',`${a[0]} y ${b[0]}`,[`${a[0]} y ${american[(r+1)%6][0]}`,`${b[0]} y ${introduced[(r+Math.floor(r/6)+2)%6][0]}`],`${a[0]} es americano. ${b[0]} fue traído por los españoles; no significa que se originara en España.`,r%2?'Compara las dos procedencias de cada pareja.':'Busca una pareja que combine ambos grupos.');
  }
 }
 return {games,exercise};
})();
if(typeof module!=='undefined')module.exports=HISTORY;
