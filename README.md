# Max estudia

Juegos en español para explorar el lenguaje, construir oraciones y practicar razonamiento. Sin dependencias, sin cronómetro y con ayuda disponible en todas las actividades.

## Actividades

- **Armo una oración:** 48 oraciones, 12 por nivel; arrastre, toque o teclado. Las palabras idénticas son intercambiables.
- **La palabra que falta:** 32 frases con contexto y opciones que se pueden escuchar.
- **Pequeños cuentos:** 12 cuentos y 36 preguntas. El relato permanece visible.
- **Construyo mi mensaje:** 14 imágenes con «Quiero», «No quiero» o «Necesito»; permite añadir cuándo y dónde. Las preferencias personales no se califican.
- Clasificación, elemento diferente, comprensión de preguntas, secuencias y puzle de 4, 6, 8, 9, 12 o 16 piezas.
- **Razonamiento:** ¿Qué sigue?, Detective de pistas y Pienso una solución. Cada juego tiene seis retos por nivel: 72 en total. Incluyen patrones, deducciones, condiciones, causas y planificación cotidiana.

Cuatro niveles, disponibles desde el inicio:

1. **Primeros pasos:** dos alternativas, vocabulario concreto y secuencias cortas.
2. **Explorar:** relaciones, ubicación, acciones y oraciones más largas.
3. **Un nuevo reto:** causas, negaciones, conectores, secuencias de cinco o seis pasos y doce piezas.
4. **Conecto mis ideas:** condiciones, inferencias, referencias, oraciones con «si», «aunque» y «mientras», secuencias de siete pasos y dieciséis piezas.

El nivel se puede cambiar desde el catálogo o el juego. Ajustes permite personalizar alternativas, piezas, voz y volumen; cambiar el nivel reinicia la ronda.

## Entrada y sonido

Al abrir la página aparece **Iniciar**. Tras pulsarlo se entra y se escucha **Hola Max**; se puede desmarcar «Entrar con sonido» antes de comenzar. Se recuerda la elección de sonido. Los enlaces directos a juegos también pasan por la entrada.

Las victorias muestran Excelente, Increíble, Bien hecho, Lo lograste o Muy bien. La fanfarria precede a la voz, tiene volumen independiente (Suave, Medio y Alto) y puede desactivarse. El volumen predeterminado aumentó; los antiguos valores bajos se migran a Medio. Cerrar la felicitación, descansar o navegar cancela la reproducción pendiente.

Las voces dependen del navegador y del dispositivo. La selección automática prioriza voces en español marcadas como naturales, seguidas del idioma regional. Se puede elegir y probar una voz en Ajustes; las voces en línea requieren conexión. La calidad audible se comprueba en el dispositivo real.

## Uso local

Abre `dist/index.html`, o ejecuta `node server.mjs` y visita http://127.0.0.1:4173. Las actividades y la imagen funcionan sin conexión cuando los archivos están guardados en el dispositivo. Las fuentes web tienen alternativas locales.

Arrastra con mouse o pantalla táctil, toca primero una pieza y luego su destino, o usa Tab y Enter. «Ver una ayuda» ofrece un modelo. Se puede descansar en cualquier momento. La sección «Quiero decir» y su barra inferior fueron retiradas; se conserva el juego de construir mensajes.

Solo se guardan preferencias en el navegador. No se guardan respuestas ni resultados del niño.

## Contenido y alcance

Adaptado de *Guía práctica de actividades para familia*, de Javiera Fernanda Salazar Acosta, fonoaudióloga, facilitada por la familia. Los puzles, las secuencias, los cuentos y el razonamiento son complementos. No se publica el PDF ni sus datos de contacto.

El niño puede señalar, hacer gestos o hablar; no se exige repetir, mirar a los ojos o acertar para recibir ayuda. «En familia» ofrece modelos para acompañar. Las imágenes del vocabulario son emojis con etiquetas; no son pictogramas clínicamente validados. La escena del parque es una ilustración generada. Material educativo de apoyo, no evaluación ni sustituto de un sistema de comunicación personalizado.

Referencia de apoyo: [ASHA: comunicación aumentativa y alternativa](https://www.asha.org/Practice-Portal/Professional-Issues/Augmentative-and-Alternative-Communication/).

## GitHub Pages

Repositorio público: [LeGreenSide/Estudio](https://github.com/LeGreenSide/Estudio).

Web: [Max estudia](https://legreenside.github.io/Estudio/).

El flujo `.github/workflows/pages.yml`, **Publicar Max estudia en GitHub Pages**, verifica el contenido y publica únicamente `dist`. Para actualizar la web después de subir cambios, ejecuta ese flujo manualmente desde Actions. Pages usa GitHub Actions como origen. Los archivos de pruebas y la configuración local no forman parte del sitio.

## Verificación

`node test.cjs` comprueba bancos de los cuatro niveles, opciones, respuestas, clasificación, secuencias y geometría del puzle.

`node test-ui.cjs`, con la vista previa abierta, comprueba entrada, saludo, juegos, oraciones duplicadas, fanfarria Web Audio, voces simuladas, cancelación y diseño adaptable. Usa Playwright del runtime local; `PLAYWRIGHT_PATH` permite indicar otra instalación. `TEST_LEVELS=4` limita las rondas al cuarto nivel; `TEST_URL` cambia el servidor. La prueba de voz verifica la programación, no su calidad audible.
