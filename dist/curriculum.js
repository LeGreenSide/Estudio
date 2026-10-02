'use strict';
// Original practice questions. The OA references and scope are documented in CURRICULUM.md.
const SCHOOL=(()=>{
 const games=[
  ['lectura','lenguaje','Leo y descubro','Busca pistas, ordena historias y explica lo que ocurre.','📖','LE02 OA 05, 07'],
  ['ortografia','lenguaje','Taller de palabras','Completa palabras y revisa oraciones.','✍️','LE02 OA 01, 17, 21'],
  ['problemas','numeros','Resuelvo problemas','Decide cuándo sumar o restar, hasta 100.','🧠','MA02 OA 09, 10'],
  ['multiplicar','numeros','Grupos iguales','Descubre las tablas del 2, del 5 y del 10.','🧺','MA02 OA 11'],
  ['reloj','numeros','La hora de mi día','Lee horas y medias horas en un reloj digital.','⏰','MA02 OA 18'],
  ['medir','numeros','Mido y comparo','Usa centímetros y metros para resolver retos.','📏','MA02 OA 19'],
  ['datos','numeros','Detective de datos','Lee pictogramas y compara cantidades.','📊','MA02 OA 22'],
  ['animales','ciencias','Animales y hábitats','Clasifica animales y usa pistas de su ambiente.','🐸','CN02 OA 01, 02, 03, 04, 06'],
  ['agua','ciencias','El viaje del agua','Explora sus estados, cambios y cuidado.','💧','CN02 OA 09, 10, 11'],
  ['tiempo','ciencias','Observo el tiempo','Lee registros y elige cómo comprobar una idea.','🌦️','CN02 OA 12, 13'],
  ['chile','historia','Exploro Chile','Reconoce paisajes y cuida nuestro patrimonio.','🇨🇱','HI02 OA 05, 08, 09'],
  ['planos','historia','Sigo el plano','Ubica lugares y sigue recorridos.','🗺️','HI02 OA 06; MA02 OA 14']
 ].map(([key,group,title,subtitle,icon,oa])=>({id:'estudio-'+key,key,group,title,subtitle,icon,oa}));
 const choice=(prompt,answer,wrong,help,extra={})=>({type:'choice',prompt,options:[answer,...wrong].map(String),answer:String(answer),help,...extra});
 const input=(prompt,answer,help,extra={})=>({type:'input',prompt,answer:String(answer),numeric:true,help,...extra});
 const order=(prompt,tokens,help,extra={})=>({type:'order',prompt,tokens,help,...extra});
 const stories=[
  ['Ana puso una semilla en una maceta. Cada mañana la regó. Un día apareció un brote.', ['¿Quién plantó una semilla?','Ana','Su vecino','Un gato'],['¿Dónde puso la semilla?','En una maceta','En una mochila','En una caja de zapatos'],['Plantar la semilla','Regar cada mañana','Ver el brote'],['¿Por qué apareció un brote?','La semilla recibió agua y pudo crecer','Ana pintó la maceta','La mochila estaba abierta'],['¿Qué muestra que la planta comenzó a crecer?','Apareció un brote','Ana tenía una maceta','Era de mañana']],
  ['Tomás salió con su cometa. Las hojas de los árboles se movían. Corrió y la cometa subió al cielo.', ['¿Quién salió con una cometa?','Tomás','Ana','La profesora'],['¿Qué se movía en los árboles?','Las hojas','Las raíces','Las piedras'],['Salir con la cometa','Ver las hojas moverse','Hacer subir la cometa'],['¿Cómo estaba el tiempo?','Había viento','Nevaba mucho','No había aire en movimiento'],['¿Qué pista indica que había viento?','Las hojas se movían','Tomás tenía una cometa','Tomás estaba afuera']],
  ['Sofía llevaba libros a la biblioteca. La bolsa se rompió y los libros cayeron. Pedro la ayudó a recogerlos.', ['¿Quién llevaba los libros?','Sofía','Pedro','El bibliotecario'],['¿Adónde iba Sofía?','A la biblioteca','A la piscina','Al mercado'],['Llevar los libros','Romperse la bolsa','Recoger los libros'],['¿Por qué Pedro recogió los libros?','Para ayudar a Sofía','Para tirarlos al suelo','Para romper la bolsa'],['¿Qué demuestra que Pedro fue colaborador?','Ayudó a recoger los libros','Vio una bolsa','Conocía la biblioteca']],
  ['Diego preparó su mochila por la noche. Guardó el cuaderno y el estuche. Al despertar, ya tenía todo listo para la escuela.', ['¿Quién preparó la mochila?','Diego','Su abuelo','La directora'],['¿Cuándo preparó la mochila?','Por la noche','En el recreo','Después de clases del día siguiente'],['Preparar la mochila','Guardar los útiles','Despertar con todo listo'],['¿Para qué preparó sus útiles antes de dormir?','Para tenerlos listos al salir','Para dejar de ir a la escuela','Para esconderlos'],['¿Qué parte muestra el resultado de prepararse?','Al despertar tenía todo listo','Tenía un estuche','Era de noche']],
  ['La pelota de Julia quedó debajo del banco. Julia no la alcanzaba con la mano. Usó un palo largo y logró acercarla.', ['¿De quién era la pelota?','De Julia','De Diego','De Pedro'],['¿Dónde quedó la pelota?','Debajo del banco','Encima del árbol','Dentro del estuche'],['La pelota queda bajo el banco','Julia usa un palo','Julia acerca la pelota'],['¿Por qué Julia usó un palo?','Su mano no llegaba a la pelota','Quería golpear el banco','No quería recuperar la pelota'],['¿Qué pista explica que necesitara una herramienta?','No alcanzaba con la mano','La pelota era suya','Había un banco']],
  ['El curso preparó una ensalada de frutas. Primero lavó las frutas. Después las cortó con ayuda de un adulto y las mezcló.', ['¿Quién preparó la ensalada?','El curso','Un equipo de fútbol','Un perro'],['¿Qué hicieron antes de cortar?','Lavar las frutas','Comer toda la ensalada','Guardar los platos'],['Lavar las frutas','Cortarlas con ayuda','Mezclarlas'],['¿Qué pasaría si mezclaran antes de cortar?','Quedarían frutas enteras en el recipiente','Las frutas se lavarían solas','Desaparecerían las frutas'],['¿Qué instrucción muestra colaboración?','Cortar con ayuda de un adulto','Usar frutas','Preparar una ensalada']],
  ['Martina oyó un trueno. Cerró la ventana y entró la ropa que estaba afuera. Poco después comenzó a llover.', ['¿Quién oyó un trueno?','Martina','Julia','Sofía'],['¿Qué entró Martina?','La ropa','Un árbol','Una bicicleta rota'],['Oír el trueno','Entrar la ropa','Ver empezar la lluvia'],['¿Por qué entró la ropa?','Para evitar que se mojara','Para que recibiera más lluvia','Para secar el patio'],['¿Qué pista le avisó que podía llover?','Oyó un trueno','Había ropa','Tenía una ventana']],
  ['Benjamín buscó su lápiz en el estuche y no lo encontró. Miró debajo de la mesa. Allí estaba, junto a una goma.', ['¿Qué buscaba Benjamín?','Su lápiz','Su pelota','Su abrigo'],['¿Dónde encontró el lápiz?','Debajo de la mesa','Dentro de un zapato','En el patio'],['Buscar en el estuche','Mirar bajo la mesa','Encontrar el lápiz'],['¿Qué pudo haber pasado con el lápiz?','Pudo caer de la mesa','Se transformó en una goma','Fue guardado en el estuche que ya revisó'],['¿Qué confirma que lo encontró?','Allí estaba, junto a una goma','Buscó en el estuche','Había una mesa']],
  ['La biblioteca dejó una nota: «Mañana abrimos a las nueve. Devuelve los libros en la caja azul». Elena dejó su libro en esa caja.', ['¿Quién dejó un libro?','Elena','Martina','Benjamín'],['¿A qué hora abrirá la biblioteca?','A las nueve','A las seis','A las doce'],['Leer la nota','Buscar la caja azul','Dejar el libro'],['¿Para qué sirve la caja azul?','Para devolver libros','Para guardar comida','Para cambiar la hora'],['¿Qué parte de la nota siguió Elena?','Devuelve los libros en la caja azul','Mañana abrimos a las nueve','La biblioteca dejó una nota']],
  ['El letrero del huerto decía: «Camina por el sendero». Lucas siguió ese camino y no pisó las plantas pequeñas.', ['¿Quién caminó por el sendero?','Lucas','Elena','Tomás'],['¿Qué decía el letrero?','Camina por el sendero','Pisa las plantas','Corre entre las flores'],['Leer el letrero','Seguir el sendero','Pasar sin pisar plantas'],['¿Para qué estaba ese letrero?','Para proteger las plantas','Para regar el huerto','Para impedir que crezcan flores'],['¿Qué muestra que Lucas respetó la indicación?','No pisó las plantas pequeñas','Había un huerto','Las plantas eran pequeñas']],
  ['Un aviso decía: «Trae una botella con agua para la salida». Camila la llenó antes de partir. Cuando tuvo sed, bebió de su botella.', ['¿Quién llenó la botella?','Camila','Lucas','Ana'],['¿Qué debía llevar a la salida?','Una botella con agua','Una maceta vacía','Un cuadro'],['Leer el aviso','Llenar la botella','Beber cuando tuvo sed'],['¿Por qué fue útil seguir el aviso?','Camila tuvo agua cuando sintió sed','La salida terminó antes','La botella caminó sola'],['¿Qué prueba que la botella fue útil?','Bebió cuando tuvo sed','Había un aviso','Camila salió']],
  ['En un libro, Nico leyó: «Las raíces toman agua del suelo». Observó las raíces de una planta en un vaso transparente. Luego dibujó lo que vio.', ['¿Quién observó las raíces?','Nico','Camila','Pedro'],['¿De dónde toman agua las raíces?','Del suelo','De los lápices','De las piedras secas'],['Leer sobre las raíces','Observar la planta','Dibujar lo observado'],['¿Por qué usó un vaso transparente?','Para poder ver las raíces','Para ocultar la planta','Para que no entrara luz nunca'],['¿Qué acción ayuda a recordar su observación?','Dibujar lo que vio','Cerrar el libro sin mirar','Esconder el vaso']]
 ];
 const spelling=[
  ['queso','que','__so','keso','qeso','El queso está en la mesa.','Antes de e usamos qu para este sonido.'],
  ['quince','qui','__nce','qince','kinse','Tengo quince lápices.','Antes de i usamos qu para este sonido.'],
  ['cereza','ce','__reza','sereza','zereza','La cereza es roja.','Cereza empieza con ce.'],
  ['cine','ci','__ne','sine','zine','Ana va al cine.','Cine empieza con ci.'],
  ['girasol','gi','__rasol','jirasol','guirasol','El girasol creció.','Girasol empieza con gi.'],
  ['gemelo','ge','__melo','jemelo','guemelo','Mi hermano es mi gemelo.','Gemelo empieza con ge.'],
  ['guitarra','gui','__tarra','gitarra','güitarra','Toco la guitarra.','En gui, la u no se pronuncia.'],
  ['manguera','gue','man__ra','mangera','mangüera','Guardo la manguera.','En gue, la u no se pronuncia.'],
  ['pingüino','güi','pin__no','pinguino','pingino','El pingüino nada.','En güi, la diéresis indica que suena la u.'],
  ['cigüeña','güe','ci__ña','cigueña','cigeña','La cigüeña vuela.','En güe, la diéresis indica que suena la u.'],
  ['perro','rr','pe__o','pero','perrro','El perro corre.','Entre vocales, el sonido fuerte se escribe rr.'],
  ['enredo','r','en__edo','enrredo','enrrredo','Deshago el enredo.','Después de n se escribe una sola r, aunque suene fuerte.']
 ];
 const animalRows=[
  ['perro','Mamífero','pelo','nacen de su madre y toman leche','un ambiente terrestre con agua y alimento'],
  ['ballena','Mamífero','piel casi sin pelo','nacen de su madre y toman leche','el mar, con espacio para nadar y salir a respirar'],
  ['gato','Mamífero','pelo','nacen de su madre y toman leche','un ambiente terrestre con agua y alimento'],
  ['cóndor','Ave','plumas','salen de huevos','zonas con rocas altas donde pueda anidar'],
  ['pingüino','Ave','plumas','salen de huevos','costas con alimento en el mar y lugares para anidar'],
  ['gallina','Ave','plumas','salen de huevos','un ambiente terrestre donde pueda caminar y alimentarse'],
  ['lagartija','Reptil','escamas secas','salen de huevos','un ambiente con refugios y lugares donde calentarse al sol'],
  ['tortuga terrestre','Reptil','escamas y caparazón','salen de huevos','tierra con refugio, agua y alimento'],
  ['rana','Anfibio','piel húmeda','salen de huevos y pasan por una etapa de renacuajo','un lugar húmedo cerca de agua'],
  ['sapo','Anfibio','piel sin plumas ni pelo','salen de huevos y pasan por una etapa de renacuajo','un ambiente con refugios húmedos y agua para reproducirse'],
  ['salmón','Pez','escamas','salen de huevos','agua con condiciones apropiadas para respirar por branquias'],
  ['mariposa','Insecto','un cuerpo con seis patas','pasan de huevo a oruga, luego a pupa y mariposa','un lugar con plantas para las orugas y alimento para los adultos']
 ];
 const animalChallenges=[
  ['Un perro y una gallina viven en tierra. ¿Qué característica permite distinguirlos?','El perro tiene pelo y la gallina tiene plumas','Los dos necesitan agua','Los dos se desplazan','Vivir en tierra no basta para clasificar. La cubierta corporal permite distinguir estos grupos.'],
  ['La ballena vive en el agua. ¿Por qué se clasifica como mamífero y no como pez?','Sus crías toman leche y respira aire con pulmones','Tiene aletas y puede nadar','Su cuerpo es grande','El lugar donde vive no decide su grupo. La leche y la respiración son pistas de que es mamífero.'],
  ['Un gato y un lagarto toman sol. ¿Qué dato indica que el gato es mamífero?','Sus crías toman leche','Ambos se calientan al sol','Ambos tienen patas','Las crías de los mamíferos se alimentan de leche. Tomar sol no distingue estos dos grupos.'],
  ['Un cóndor y una mariposa vuelan. ¿Cómo distinguir el ave del insecto?','El cóndor tiene plumas; la mariposa tiene seis patas','Ambos tienen alas','Los dos se pueden mover','Volar no basta para clasificar: hay aves e insectos que vuelan. Sus cuerpos aportan otras pistas.'],
  ['El pingüino no vuela. ¿Qué característica permite reconocerlo como ave?','Tiene plumas y sus crías salen de huevos','Nada para buscar alimento','Camina por la costa','Las plumas caracterizan a las aves. No todas las aves vuelan.'],
  ['Una gallina y una tortuga ponen huevos. ¿Qué pista distingue al ave?','La gallina tiene plumas','Las dos ponen huevos','Las dos pueden vivir en tierra','Poner huevos no basta para distinguir aves de reptiles. Las plumas permiten reconocer al ave.'],
  ['Una lagartija usa las grietas de unas rocas como refugio. ¿Qué puede ocurrir si se retiran esas rocas?','Pierde lugares donde esconderse','Obtiene más grietas para esconderse','Deja de necesitar refugio','Cambiar un hábitat puede quitar refugios, incluso cuando el animal no es tocado.'],
  ['Una tortuga terrestre y un pez tienen escamas. ¿Qué dato permite elegir un lugar adecuado para la tortuga?','Es terrestre y necesita respirar aire','Ambos animales tienen escamas','El pez nada muy bien','No basta con comparar la cubierta: también hay que saber dónde vive y cómo respira.'],
  ['En una poza hay renacuajos. ¿Qué podría pasar si la poza se seca antes de que cambien?','Los renacuajos pierden el agua que necesitan','Todos se vuelven adultos de inmediato','Ya no necesitan respirar','Los renacuajos necesitan agua durante esa etapa de su ciclo de vida.'],
  ['Un sapo se refugia bajo hojas húmedas. ¿Qué cambio puede afectar ese refugio?','Retirar todas las hojas y secar el suelo','Mantener las hojas húmedas en su lugar','Observar desde lejos sin tocar','Las hojas ayudan a conservar la humedad y ofrecen refugio. Quitarlas modifica esas condiciones.'],
  ['Un salmón respira en el agua por branquias. ¿Qué explica que no pueda vivir en una caja seca?','Fuera del agua no tiene las condiciones que necesita','La caja no tiene dibujos de peces','El salmón tiene escamas','Su hábitat debe permitir la respiración y las demás funciones necesarias para vivir.'],
  ['En un jardín se eliminan todas las plantas que comen las orugas. ¿Cómo puede afectar a las mariposas?','Sus crías tendrán menos alimento','Las orugas pasarán a comer piedras','Todas las mariposas cambiarán a otro grupo animal','El cuidado del hábitat incluye las necesidades de las distintas etapas del ciclo de vida.']
 ];
 const waterBasics=[
  ['Un cubo de hielo conserva su forma.','Sólido','Líquido','Gaseoso','El hielo es agua en estado sólido.'],
  ['El agua de una jarra se puede verter.','Líquido','Sólido','Gaseoso','El agua líquida fluye y toma la forma del recipiente.'],
  ['El vapor de agua es un gas invisible presente en el aire.','Gaseoso','Sólido','Líquido','El vapor de agua es agua en estado gaseoso; no es la nube blanca de gotitas.'],
  ['La nieve está formada por pequeños cristales de hielo.','Sólido','Gaseoso','Líquido','Los cristales de hielo son sólidos.'],
  ['La lluvia cae en forma de gotas de agua.','Líquido','Sólido','Gaseoso','Las gotas de lluvia son líquidas.'],
  ['El granizo cae como bolitas de hielo.','Sólido','Líquido','Gaseoso','El granizo es agua congelada.'],
  ['En un vaso hay agua que se mueve al inclinarlo.','Líquido','Gaseoso','Sólido','El agua líquida se mueve y toma la forma del vaso.'],
  ['Una paleta hecha solo con agua se congeló.','Sólido','Gaseoso','Líquido','Al congelarse, el agua pasa a estado sólido.'],
  ['Un charco contiene agua que puede escurrir.','Líquido','Sólido','Gaseoso','El agua líquida puede escurrir.'],
  ['Parte del agua de una ropa mojada pasa al aire como vapor.','Gaseoso','Sólido','Líquido','Al evaporarse pasa al estado gaseoso.'],
  ['Sobre una ventana hay pequeñas gotas de agua.','Líquido','Gaseoso','Sólido','Las gotas visibles son agua líquida.'],
  ['La escarcha está formada por cristales de hielo.','Sólido','Líquido','Gaseoso','La escarcha contiene agua sólida.']
 ];
 const waterCases=[
  ['Dejamos un cubo de hielo en un plato a temperatura templada.','Se convierte en agua líquida','Se convierte en una piedra','Aumenta sin límite','El hielo recibe calor y se derrite.','El hielo disminuye y aparece agua en el plato'],
  ['Ponemos agua en un recipiente dentro del congelador.','Se convierte en hielo','Se convierte en arena','Desaparece de inmediato','Al enfriarse lo suficiente, el agua se congela.','El agua deja de fluir y conserva una forma sólida'],
  ['Un charco al sol se hace más pequeño durante el día.','Parte del agua se evapora','El agua se convierte en tierra','El sol empuja el agua bajo una mesa','Parte del agua líquida pasa al aire como vapor.','El charco tiene menos agua aunque no la sacamos'],
  ['En el exterior de un vaso muy frío aparecen gotas.','Vapor del aire se vuelve líquido','El vidrio se transforma en agua','El vaso fabrica hielo afuera','El vapor del aire puede condensarse en una superficie fría.','Aparecen gotas por fuera de un vaso que no tiene una fuga'],
  ['Echamos agua de una botella a una taza.','Toma la forma de la taza','Mantiene la forma de la botella','Se vuelve sólida al cambiar de recipiente','El agua líquida se adapta al recipiente.','El agua ocupa el fondo y los lados de la taza'],
  ['Un adulto mezcla sal en un vaso de agua.','La sal puede disolverse','La sal siempre flota como una piedra','El agua se convierte en leche','La sal puede disolverse en el agua aunque ya no veamos sus granos.','Los granos dejan de verse al revolver'],
  ['Se forman gotas en las nubes y caen al suelo.','Ocurre una precipitación','El suelo está hirviendo','Se forma vidrio','La lluvia es una forma de precipitación del agua.','Las gotas caen desde las nubes'],
  ['La lluvia llega a un río que corre hacia el mar.','El agua continúa su recorrido','El río se convierte en una nube de inmediato','Toda el agua queda inmóvil','El agua puede desplazarse por ríos hacia el mar.','Se observa el agua moverse por el cauce'],
  ['Una llave queda goteando después de lavarse las manos.','Cerrarla bien y avisar si sigue goteando','Dejarla correr todo el día','Abrir otra llave','Cerrar la llave evita desperdiciar agua.','Las gotas dejan de caer al cerrar bien la llave'],
  ['Un papel limpio cae cerca de un río.','Recogerlo y ponerlo en un basurero','Empujarlo hacia el agua','Cubrirlo con más basura','Evitar basura en el agua ayuda a cuidar el ambiente.','El papel queda fuera del río y en el basurero'],
  ['Para cepillarse los dientes, alguien deja la llave abierta.','Cerrar la llave mientras se cepilla','Abrirla más','Llenar el piso de agua','Usar solo el agua necesaria evita desperdiciarla.','La llave permanece cerrada durante el cepillado'],
  ['Dos paños están mojados; uno queda extendido y otro doblado.','Comparar cuánto se secan en el mismo lugar','Cambiar también el lugar y el tiempo','Afirmar el resultado sin observar','Para comparar una condición, mantenemos iguales las otras.','Se observa ambos paños después del mismo tiempo']
 ];
 const waterEvidence=[
  ['El plato ahora contiene agua líquida','El plato es redondo','El hielo era transparente'],
  ['El agua ahora conserva una forma sólida','El recipiente estaba limpio','El congelador tiene una puerta'],
  ['Se observa menos agua sin haberla retirado','El charco está en el suelo','Hay árboles cerca'],
  ['Hay gotas afuera, aunque el vaso no tiene una fuga','El vaso tiene una forma redonda','La mesa es de madera'],
  ['La misma agua ocupa la forma de la taza','La taza tiene un asa','La botella está vacía antes de llenarla'],
  ['Dejan de verse los granos después de revolver','El vaso tiene un borde','La cuchara es de metal'],
  ['Se ven gotas que caen de las nubes','Hay montañas cerca','Es de mañana'],
  ['Una hoja flotante se desplaza por el cauce','Hay piedras junto al río','El cielo se ve azul'],
  ['Dejan de caer gotas después de cerrar','La llave es brillante','El lavamanos es blanco'],
  ['El papel queda en el basurero y no en el río','El papel es rectangular','El río es largo'],
  ['La llave deja de correr durante el cepillado','El cepillo es nuevo','El espejo está limpio'],
  ['Se compara cuánto se secó cada paño en el mismo tiempo','Solo se mira el color de los paños','Se pregunta cuál paño gusta más']
 ];
 const waterSequences=[
  ['El agua del lago se evapora','El vapor se enfría y forma gotas en nubes','El agua cae como lluvia'],
  ['Llenar un molde con agua','Dejarlo en el congelador','Sacar el hielo formado'],
  ['Sacar hielo del congelador','Dejarlo en un plato templado','Observar que se transforma en agua líquida'],
  ['Lavar un paño con agua','Tender el paño mojado','Parte del agua se evapora y el paño se seca'],
  ['Tener agua en una botella','Verterla en una taza','Observar que toma la forma de la taza'],
  ['Poner agua en un vaso','Añadir sal y revolver','Observar que la sal se disuelve'],
  ['Se forman gotas en las nubes','Cae lluvia sobre la tierra','Parte del agua llega a los ríos'],
  ['La lluvia alimenta el río','El río lleva agua hacia el mar','Parte del agua del mar se evapora'],
  ['Notar que una llave gotea','Cerrar bien la llave','Comprobar que ya no caen gotas'],
  ['Encontrar un papel limpio junto al río','Recoger el papel','Depositarlo en el basurero'],
  ['Mojar el cepillo de dientes','Cerrar la llave al cepillarse','Abrirla solo cuando se necesite enjuagar'],
  ['Mojar por igual dos paños','Dejar uno extendido y otro doblado en el mismo lugar','Comparar después del mismo tiempo cuánto se secaron']
 ];
 const weather=[
  ['Las gotas caen de las nubes.','Lluvia','Nieve','Viento'],['Pequeños cristales blancos caen del cielo.','Nieve','Lluvia','Viento'],['Las ramas y una bandera se mueven por el aire.','Viento','Granizo','Niebla'],['Caen bolitas de hielo.','Granizo','Lluvia','Calor'],
  ['El termómetro marca 30 °C.','Temperatura alta','Nieve segura','Temperatura de congelación'],['El termómetro marca 3 °C.','Temperatura baja','Calor intenso','Treinta grados'],['Las nubes cubren casi todo el cielo.','Cielo nublado','Cielo despejado','Suelo nevado'],['No se observan nubes en el cielo.','Cielo despejado','Cielo cubierto de nubes','Granizo'],
  ['Hay muchas gotitas suspendidas cerca del suelo y cuesta ver lejos.','Niebla','Granizo','Cielo despejado'],['El suelo tiene charcos después de una precipitación de gotas.','Lluvia','Solo viento','Solo calor'],['Una veleta gira cuando cambia la dirección del aire.','Viento','Nieve','Lluvia'],['El cielo está parcialmente cubierto por nubes.','Algunas nubes','Ninguna nube','Suelo congelado']
 ];
 const landscapes=[
  ['Desierto de Atacama','Norte','En este paisaje hay grandes zonas muy secas y escasa vegetación.','desierto','Un terreno muy seco con poca vegetación'],
  ['Valle de Elqui','Norte','Un río recorre un valle del norte donde se cultiva con agua disponible.','valle','Un terreno más bajo entre montañas'],
  ['Altiplano del norte','Norte','Es un paisaje de gran altura con sectores amplios y relativamente planos.','altiplano','Una extensa meseta situada a gran altura'],
  ['Costa de Antofagasta','Norte','En este paisaje del norte, el terreno llega al océano Pacífico.','costa','La zona donde la tierra se encuentra con el mar'],
  ['Valle central','Centro','Entre cordilleras hay campos de cultivo y ciudades de la zona central.','valle','Un terreno más bajo entre montañas'],
  ['Costa de Valparaíso','Centro','Esta costa de la zona central tiene cerros, mar y construcciones humanas.','costa','La zona donde la tierra se encuentra con el mar'],
  ['Río Maule','Centro','El agua de este río de la zona central corre por su cauce.','río','Una corriente de agua que fluye por un cauce'],
  ['Cordillera cerca de Santiago','Centro','Al este de Santiago se ven altas montañas de la cordillera de los Andes.','cordillera','Un conjunto de montañas'],
  ['Lago Llanquihue','Sur','En este paisaje del sur hay un gran lago rodeado de tierra.','lago','Una gran extensión de agua rodeada de tierra'],
  ['Archipiélago de Chiloé','Sur','En este paisaje del sur hay muchas islas, además de pueblos y bosques.','archipiélago','Un conjunto de islas'],
  ['Volcán Villarrica','Sur','Este paisaje del sur incluye una montaña volcánica, lagos y bosques cercanos.','volcán','Una abertura de la Tierra por donde puede salir lava'],
  ['Bosque valdiviano','Sur','En este bosque del sur llueve con frecuencia y crece abundante vegetación.','bosque','Un lugar con abundantes árboles']
 ];
 const heritage=[
  ['Encuentras dibujos antiguos sobre una roca. ¿Cómo conocerlos sin dañarlos?','Observarlos y leer la información del lugar','Marcar tu nombre al lado','Tocar la roca con pintura','Las huellas del pasado se pueden conocer y cuidar sin modificarlas.'],
  ['Una artesana cuenta cómo aprendió su oficio. ¿Qué ayuda a valorar ese saber?','Escuchar y preguntar con respeto','Decir que todos los oficios son iguales','Cambiar su explicación sin escucharla','Los saberes y oficios forman parte del patrimonio cultural.'],
  ['Ves animales silvestres durante una excursión. ¿Cómo observarlos?','Mantener distancia y evitar molestarlos','Darles cualquier comida','Llevarse uno a casa','Respetar su espacio y su alimentación ayuda a cuidar la fauna.'],
  ['En la costa hay un letrero que protege una zona de nidos. ¿Qué haces?','Respetar el límite y observar desde afuera','Acercarte por dentro para ver mejor','Mover los nidos para despejar el paso','La señal ayuda a proteger a los animales y sus lugares de reproducción.'],
  ['Tu familia prepara una receta que pasó de una generación a otra. ¿Cómo conservar ese conocimiento?','Escribir la receta y preguntar su historia','Botar la receta después de cocinar','Suponer que todas las familias cocinan igual','Registrar recetas y relatos ayuda a transmitir el patrimonio cultural.'],
  ['Visitas un edificio histórico. ¿Qué acción permite cuidarlo?','Seguir las indicaciones y no rayar sus muros','Dejar una firma en una pared','Sacar una pieza de recuerdo','Conservar las construcciones permite que otras personas también las conozcan.'],
  ['Un curso quiere cuidar la orilla de un río. ¿Qué propuesta sirve?','Organizar con adultos la recolección segura de basura','Empujar los residuos al agua','Tapar la basura con ramas','Retirar residuos de forma segura ayuda a cuidar el agua y el paisaje.'],
  ['Una persona mayor relata una historia de su comunidad. ¿Cómo aprender de ella?','Escuchar y preguntar qué recuerda del lugar','Interrumpir para inventar otro final','Decir que los relatos no enseñan nada','Los relatos permiten conocer experiencias y tradiciones de una comunidad.'],
  ['Ves una flor nativa en un área protegida. ¿Cómo guardar un recuerdo?','Hacer un dibujo o una fotografía sin arrancarla','Arrancarla con su raíz','Cortar todas las flores cercanas','Un dibujo o fotografía conserva el recuerdo sin quitar la planta de su hábitat.'],
  ['En una celebración local se comparte música tradicional. ¿Qué muestra respeto?','Escuchar y aprender sobre su significado','Burlarse porque es diferente','Tapar la música para que nadie la escuche','Conocer distintas expresiones culturales ayuda a valorarlas.'],
  ['En una excursión hay senderos señalados. ¿Por qué seguirlos?','Para evitar dañar la vegetación fuera del camino','Para poder cortar todas las plantas del borde','Porque fuera del sendero no vive nada','Los senderos permiten recorrer un lugar reduciendo el daño a su ambiente.'],
  ['El curso prepara una muestra de tradiciones de distintas familias. ¿Qué acuerdo ayuda?','Dar espacio a todas y preguntar con respeto','Mostrar solo la tradición más conocida','Decidir que todas deben ser iguales','El patrimonio cultural es diverso. Compartirlo con respeto permite aprender de otros.']
 ];
 const mapPlaces=['Escuela','Plaza','Biblioteca','Casa','Fuente','Tienda','Cancha','Parque','Museo'];
 function exercise(key,level,index){
  if(!games.some(g=>g.key===key))return;
  const l=Math.max(1,Math.min(5,Math.floor(Number(level)||1))),r=((index%12)+12)%12;
  if(key==='lectura'){
   const s=stories[r],extra={clue:s[0],note:l>=4?'Usa las pistas del texto para decidir.':'Lee o escucha el texto y responde.'};
   if(l===3)return order('Ordena lo que ocurrió primero, después y al final.',s[3],'Primero '+s[3][0].toLowerCase()+', después '+s[3][1].toLowerCase()+' y al final '+s[3][2].toLowerCase()+'.',extra);
   const q=s[l===1?1:l===2?2:l===4?4:5];return choice(q[0],q[1],q.slice(2),'La respuesta es: '+q[1]+'. Vuelve a buscar esa pista en el texto.',extra);
  }
  if(key==='ortografia'){
   const [word,part,gap,wrong1,wrong2,sentence,rule]=spelling[r];
   if(l===1){const parts=['ce','ci','que','qui','ge','gi','gue','gui','güe','güi','r','rr'];return choice(`Completa la palabra «${word}».`,part,parts.filter(x=>x!==part).slice((r%3)*2,(r%3)*2+2),`${word}. ${rule}`,{clue:gap});}
   if(l===2)return choice('¿Qué palabra está escrita correctamente?',word,[wrong1,wrong2],`${word}. ${rule}`,{clue:sentence.replace(word,'_____')});
   if(l===3)return choice('Elige la oración con mayúscula inicial y punto final.',sentence,[sentence[0].toLowerCase()+sentence.slice(1),sentence.slice(0,-1)],'La oración empieza con mayúscula y termina con punto.',{clue:sentence.slice(0,-1).toLowerCase()});
   if(l===4){const question=`¿Cómo se escribe ${word}?`;return choice('Elige la pregunta con los dos signos de interrogación.',question,[question.slice(1),question.slice(0,-1)+'.'],'Las preguntas llevan un signo de apertura y otro de cierre.',{clue:'Para preguntar usamos ¿ y ?.'});}
   return choice('Revisa la palabra, la mayúscula y el punto. ¿Qué oración está lista?',sentence,[sentence.replace(word,wrong1),sentence[0].toLowerCase()+sentence.slice(1,-1)],`${sentence} ${rule} También lleva mayúscula inicial y punto final.`,{clue:'Editor de oraciones: encuentra la versión correcta.'});
  }
  if(key==='problemas'){
   const a=l===1?5+r%5:l===2?24+r%3:40+(r%4)*10+4,b=l===1?1+r%4:10+r%4,subtract=r%2===1;
   if(l<=3){const answer=subtract?a-b:a+b;return input(subtract?`Había ${a} lápices. Se usaron ${b}. ¿Cuántos quedan?`:`Había ${a} lápices y llegaron ${b} más. ¿Cuántos hay ahora?`,answer,`${a} ${subtract?'menos':'más'} ${b} es ${answer}.`,{clue:l===1?`${a} ${subtract?'−':'+'} ${b} = ?`:undefined,note:l===2?'Decide si se juntan cantidades o se quita una parte.':undefined});}
   if(l===4)return input(`Había ${a} libros. Después de un préstamo quedaron ${a-b}. ¿Cuántos libros se prestaron?`,b,`Buscamos la parte que falta: ${a} menos ${a-b} es ${b}. Comprueba: ${a-b} más ${b} es ${a}.`);
   const c=2+r%3,answer=a+b-c;return input(`En una caja hay ${a} fichas. Agregan ${b} y después sacan ${c}. ¿Cuántas quedan?`,answer,`Primero: ${a} más ${b} es ${a+b}. Después: ${a+b} menos ${c} es ${answer}.`,{note:'Resuelve las dos acciones en el orden en que ocurren.'});
  }
  if(key==='multiplicar'){
   const table=l<=3?[2,5,10][l-1]:[2,5,10][r%3],groups=l===1?1+r%6:1+r%10,total=table*groups;
   if(l===1)return input(`Hay ${groups} grupos de ${table} fichas. ¿Cuántas fichas hay?`,total,`${groups} grupos de ${table} hacen ${total}.`,{clue:Array.from({length:groups},()=> '● ●').join('  |  ')});
   if(l<=3)return input(`Hay ${groups} cajas con ${table} lápices en cada una. ¿Cuántos lápices hay en total?`,total,`${groups} por ${table} es ${total}. Puedes sumar ${table} cada vez.`,{clue:`${groups} × ${table} = ?`});
   if(l===4)return input(`Cada bolsa tiene ${table} semillas. Hay ${total} semillas en total. ¿Cuántas bolsas completas hay?`,groups,`${groups} grupos de ${table} forman ${total}. Comprueba con ${groups} por ${table}.`);
   const first=1+r%5,more=1+r%3,answer=(first+more)*table;return input(`Hay ${first} mesas y llegan ${more} más. En cada mesa se ponen ${table} vasos. ¿Cuántos vasos se necesitan en total?`,answer,`Primero hay ${first+more} mesas. Luego: ${first+more} por ${table} es ${answer}.`);
  }
  if(key==='reloj'){
   const hour=1+r%12,time=(h,m)=>String(h).padStart(2,'0')+':'+(m?'30':'00');
   if(l<=2){const half=l===2;return choice('¿Qué hora muestra el reloj?',`${hour}${half?' y media':' en punto'}`,[`${hour}${half?' en punto':' y media'}`,`${hour===12?1:hour+1}${half?' y media':' en punto'}`],`El reloj muestra ${hour===1?'la':'las'} ${hour}${half?' y media':' en punto'}.`,{clock:time(hour,half),clue:time(hour,half),note:half?'Los minutos 30 indican media hora.':'Los minutos 00 indican una hora en punto.'});}
   const start=7+r%5,half=r%2===1;
   if(l===3){const answer=time(start,half);return choice(`El taller empieza a las ${start}${half?' y media':' en punto'}. ¿Qué reloj indica su inicio?`,answer,[time(start,!half),time(start+1,half)],`Empieza a las ${answer}.`);}
   if(l===4){const answer=time(half?start+1:start,!half);return choice('La lectura dura media hora. ¿A qué hora termina?',answer,[time(start,half),time(start+1,half)],`Media hora después de ${time(start,half)} son las ${answer}.`,{clock:time(start,half),clue:'La lectura comienza a las '+time(start,half)});}
   const steps=1+r%3,endMinutes=start*60+(half?30:0)+steps*30,end=String(Math.floor(endMinutes/60)).padStart(2,'0')+':'+String(endMinutes%60).padStart(2,'0');
   return input(`Un juego empieza a las ${time(start,half)} y termina a las ${end}. ¿Cuántos minutos dura?`,steps*30,`Cuenta ${steps} tramo${steps===1?'':'s'} de media hora: ${steps*30} minutos.`,{clue:`Inicio ${time(start,half)} → Fin ${end}`,note:'Cada media hora equivale a 30 minutos.'});
  }
  if(key==='medir'){
   const objects=['un lápiz','el largo de una cancha','una goma','el largo de una sala','un sacapuntas','la altura de un árbol','una cuchara','el largo de un patio','una llave','el largo de un pasillo','un clip','el largo de un bus'];
   if(l===1)return choice(`¿Qué unidad conviene más para medir ${objects[r]}?`,r%2?'Metros':'Centímetros',[r%2?'Centímetros':'Metros'],`${r%2?'Los metros sirven para longitudes grandes':'Los centímetros sirven para objetos pequeños'}, como ${objects[r]}.`);
   const start=l===2?0:1+r%5,end=start+3+r%9,length=end-start;
   if(l===2||l===3)return input(`Un lápiz empieza en la marca ${start} cm de una regla y termina en ${end} cm. ¿Cuánto mide en centímetros?`,length,`La longitud es la distancia entre las marcas: ${end} menos ${start} es ${length} cm.`,{clue:`Inicio: ${start} cm → Fin: ${end} cm`,ruler:{start,end,max:20}});
   const a=20+r,b=10+r%5;
   if(l===4)return input(`Una cinta mide ${a} cm y otra ${b} cm. ¿Cuántos centímetros más mide la primera?`,a-b,`Comparamos las longitudes: ${a} menos ${b} es ${a-b} cm.`);
   const cut=2+r%4;return input(`Unes una cinta de ${a} cm y otra de ${b} cm, sin superponerlas. Luego cortas ${cut} cm. ¿Cuántos centímetros quedan?`,a+b-cut,`Las cintas juntas miden ${a+b} cm. Al quitar ${cut} cm quedan ${a+b-cut} cm.`,{note:'Primero junta las longitudes. Después quita la parte cortada.'});
  }
  if(key==='datos'){
   const counts=[1+r%4,2+r%3,1+(r*2)%5],names=['Manzanas','Peras','Uvas'],scale=l<=2?1:l<=4?2:5,rows=names.map((label,i)=>({label,count:counts[i]})),values=counts.map(n=>n*scale),clue=`Cada círculo representa ${scale} fruta${scale===1?'':'s'}. `+rows.map(row=>`${row.label}: ${row.count} círculo${row.count===1?'':'s'}.`).join(' '),extra={clue,dataRows:rows,dataScale:scale,note:`Cada círculo representa ${scale} fruta${scale===1?'':'s'}.`};
   if(l===1){const best=Math.max(...values),winners=names.filter((_,i)=>values[i]===best),answer=winners.join(' y ');return choice('¿Qué fruta o frutas tienen la mayor cantidad?',answer,[...names.filter(n=>!winners.includes(n)),'Todas tienen la misma cantidad'].filter(x=>x!==answer).slice(0,2),`La mayor cantidad es ${best}: ${answer}.`,extra);}
   if(l===2||l===3){const at=r%3;return input(`¿Cuántas ${names[at].toLowerCase()} representa el pictograma?`,values[at],`${counts[at]} círculos por ${scale} representan ${values[at]} ${names[at].toLowerCase()}.`,extra);}
   if(l===4){const big=values[0]>=values[1]?0:1,small=1-big;return input(`¿Cuántas ${names[big].toLowerCase()} más que ${names[small].toLowerCase()} hay?`,values[big]-values[small],`${values[big]} menos ${values[small]} es ${values[big]-values[small]}. Si son iguales, la diferencia es cero.`,extra);}
   return input('¿Cuántas frutas hay entre las manzanas y las peras?',values[0]+values[1],`Hay ${values[0]} manzanas y ${values[1]} peras: en total ${values[0]+values[1]} frutas.`,extra);
  }
  if(key==='animales'){
   const [name,group,cover,young,habitat]=animalRows[r],groups=['Mamífero','Ave','Reptil','Anfibio','Pez','Insecto'];
   if(l===1)return choice(`¿A qué grupo pertenece ${name==='ballena'||name==='rana'||name==='gallina'||name==='lagartija'||name==='tortuga terrestre'||name==='mariposa'?'la':'el'} ${name}?`,group,groups.filter(x=>x!==group).slice(0,2),`El animal es del grupo ${group.toLowerCase()}.`,{clue:name,note:`Pista: tiene ${cover}.`});
   if(l===2)return choice(`¿Qué característica corresponde a ${name}?`,cover,['plumas','pelo','escamas secas','seis patas'].filter(x=>x!==cover&&!cover.includes(x)).slice(0,2),`${name}: tiene ${cover}.`,{clue:`Grupo: ${group}`});
   if(l===3){const cycles=['nacen de su madre y toman leche','salen de huevos','salen de huevos y pasan por una etapa de renacuajo','pasan de huevo a oruga, luego a pupa y mariposa'];return choice(`¿Qué descripción corresponde al ciclo de vida de ${name}?`,young,cycles.filter(x=>x!==young&&!(young.includes('huevo')&&x==='salen de huevos')).slice(-2),`Las crías de ${name} ${young}.`,{clue:name});}
   if(l===4)return choice(`¿Qué ambiente necesita ${name}?`,habitat,['un lugar sin agua ni alimento','un sitio sin las condiciones de su especie'],`${name} necesita ${habitat}. El hábitat debe ofrecer alimento, agua y condiciones apropiadas.`,{clue:name});
   const challenge=animalChallenges[r];return choice(challenge[0],challenge[1],challenge.slice(2,4),challenge[4]);
  }
  if(key==='agua'){
   if(l===1){const [clue,answer,a,b,help]=waterBasics[r];return choice('¿En qué estado está el agua del ejemplo?',answer,[a,b],help,{clue});}
   const c=waterCases[r];
   if(l===2)return choice('¿Qué ocurre o qué acción corresponde?',c[1],c.slice(2,4),c[4],{clue:c[0]});
   if(l===3){const seq=waterSequences[r];return order('Ordena el proceso o la acción de cuidado del agua.',seq,seq.join('. ')+'.',{note:'Ordena las etapas descritas en las piezas.'});}
   if(l===4)return choice('¿Qué explicación o decisión corresponde a esta observación?',c[1],c.slice(2,4),c[4],{clue:c[5]});
   const evidence=waterEvidence[r];return choice('¿Qué observación permite comprobar lo ocurrido?',evidence[0],evidence.slice(1),`${evidence[0]}. ${c[4]}`,{clue:c[0],note:'Elige una evidencia relacionada con el cambio o la acción.'});
  }
  if(key==='tiempo'){
   if(l===1){const [clue,answer,a,b]=weather[r];return choice('¿Qué condición del tiempo se describe?',answer,[a,b],`${answer}. ${clue}`,{clue});}
   const instruments=[['la temperatura','Termómetro','marca grados Celsius'],['cuánta lluvia cayó','Pluviómetro','permite medir la cantidad de lluvia'],['la dirección del viento','Veleta','indica desde qué dirección viene el viento']],ins=instruments[r%3];
   if(l===2)return choice(`¿Qué instrumento usamos para observar ${ins[0]}?`,ins[1],instruments.map(x=>x[1]).filter(x=>x!==ins[1]),`${ins[1]}: ${ins[2]}.`);
   const patterns=[[0,3,1],[3,1,0],[1,0,3],[0,1,3],[1,1,1]],rotated=patterns[r%5].map(n=>8+r+n),days=['Lunes','Martes','Miércoles'],record=days.map((day,i)=>`${day}: ${rotated[i]} °C`).join(' · ');
   if(l===3){const best=r%5===4?'Los tres tuvieron la misma temperatura':days[rotated.indexOf(Math.max(...rotated))];return choice('¿Qué opción describe la temperatura más alta?',best,days.filter(x=>x!==best).slice(0,2),r%5===4?`Los tres días registraron ${rotated[0]} °C.`:`${best} registró ${Math.max(...rotated)} °C, la mayor temperatura de estos tres días.`,{clue:record});}
   if(l===4){const rainy=r%2===0;return choice('¿Qué decisión se relaciona con este pronóstico?',rainy?'Llevar impermeable para la lluvia':'Llevar agua y usar ropa apropiada para el calor',rainy?['Llevar solo ropa para mucho calor','Afirmar que no puede llover']:['Ponerse ropa gruesa para nieve','Dejar toda el agua en casa'],rainy?'El impermeable ayuda a mantener la ropa seca cuando llueve.':'En un día caluroso conviene llevar agua y ropa apropiada.',{clue:rainy?`Pronóstico: lluvia y ${8+r} °C.`:`Pronóstico: cielo despejado y ${25+r%6} °C.`});}
   const trends=['Subió el martes y bajó el miércoles','Bajó el martes y volvió a bajar el miércoles','Bajó el martes y subió el miércoles','Aumentó todos los días','Los tres días tuvieron igual temperatura'],trend=trends[r%5];
   return choice('¿Qué conclusión coincide con los tres registros?',trend,trends.filter(x=>x!==trend).slice(-2),`Las temperaturas fueron ${rotated.join(', ')} grados. ${trend}.`,{clue:record,note:'Compara los tres datos antes de elegir.'});
  }
  if(key==='chile'){
   const [name,zone,description,form,definition]=landscapes[r],extra={clue:`${name}. ${description}`};
   if(l===1)return choice('¿En qué zona de Chile se ubica este paisaje?',zone,['Norte','Centro','Sur'].filter(x=>x!==zone),`${name} está en la zona ${zone.toLowerCase()} de Chile.`,extra);
   if(l===2)return choice('¿Qué palabra geográfica corresponde a esta descripción?',form,['río','costa','valle','lago','desierto'].filter(x=>x!==form).slice(r%3,r%3+2),`${form}: ${definition.toLowerCase()}.`,{clue:definition});
   if(l===3){const human=['Una carretera','Un canal de riego','Un refugio construido','Un puerto','Una casa','Un edificio','Un puente','Un túnel construido','Un embarcadero','Una iglesia','Un sendero construido','Una pasarela'][r];return choice(`En un paseo por ${name}, ¿qué elemento fue construido por personas?`,human,['Una montaña','Una roca'],`${human} es una construcción humana. Las montañas y las rocas son elementos naturales.`,extra);}
   if(l===4)return choice(`¿Qué descripción ayuda a reconocer ${name}?`,description,[landscapes[(r+4)%12][2],landscapes[(r+8)%12][2]],`${name}: ${description}`,{clue:`Zona ${zone.toLowerCase()} · ${definition}`});
   const h=heritage[r];return choice(h[0],h[1],h.slice(2,4),h[4],extra);
  }
  if(key==='planos'){
   const names=mapPlaces.map((_,i)=>mapPlaces[((r>=9?8-i:i)+r)%9]),grid=[names.slice(0,3),names.slice(3,6),names.slice(6,9)],clue=grid.map((row,i)=>`Fila ${i+1}: ${row.join(' · ')}`).join('\n'),extra={mapGrid:grid,clue,note:'Mira el plano de frente: arriba es norte; abajo, sur; derecha, este; izquierda, oeste.'};
   if(l===1){const at=r%3;return choice(`¿Qué lugar está en la fila de arriba, ${['a la izquierda','al centro','a la derecha'][at]}?`,names[at],[names[at+3],names[at+6]],`${names[at]} está en esa posición.`,extra);}
   const directions=[['arriba',1],['abajo',7],['a la izquierda',3],['a la derecha',5]],dir=directions[r%4];
   if(l===2)return choice(`Estás en ${names[4]}. ¿Qué lugar está justo ${dir[0]}?`,names[dir[1]],directions.filter(x=>x!==dir).slice(0,2).map(x=>names[x[1]]),`Desde ${names[4]}, ${dir[0]} está ${names[dir[1]]}.`,extra);
   if(l===3){const corner=[0,2,6,8][r%4],vertical=corner<3?'arriba':'abajo',horizontal=corner%3===0?'izquierda':'derecha';return choice(`Desde ${names[4]}, avanza un casillero hacia ${vertical} y uno hacia la ${horizontal}. ¿Adónde llegas?`,names[corner],[names[4],names[8-corner]],`Llegas a ${names[corner]} siguiendo las dos indicaciones.`,extra);}
   if(l===4){const answer=['Norte','Sur','Oeste','Este'][r%4];return choice(`Desde ${names[4]}, ¿en qué dirección queda ${names[dir[1]]}?`,answer,['Norte','Sur','Oeste','Este'].filter(x=>x!==answer),`${names[dir[1]]} queda al ${answer.toLowerCase()} de ${names[4]}.`,extra);}
   const fromLeft=r%2===0,start=fromLeft?0:2,end=fromLeft?8:6,side=fromLeft?'derecha':'izquierda',answer=`Dos casilleros a la ${side} y dos hacia abajo`;
   return choice(`Vas de ${names[start]} a ${names[end]}. ¿Qué recorrido llega al destino?`,answer,[`Un casillero a la ${side} y uno hacia abajo`,'Dos casilleros hacia abajo'],`Sigue cuatro pasos: dos a la ${side} y dos hacia abajo. Terminas en ${names[end]}.`,extra);
  }
 }
 return {games,exercise};
})();
if(typeof module!=='undefined')module.exports=SCHOOL;
