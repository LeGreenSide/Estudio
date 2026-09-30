# Max estudia

Juegos en español para explorar el lenguaje, construir oraciones y practicar razonamiento. Sin dependencias, sin cronómetro y con ayuda disponible en todas las actividades.

## Actividades

### Estudio para mis pruebas

Nueva sección basada en el temario escolar facilitado por la familia, con 22 juegos y acceso desde el inicio o **Mis pruebas**:

- **Lenguaje · 5 de octubre:** abecedario español con Ñ, orden alfabético, sustantivos propios y comunes, adjetivos, verbos, tiempos verbales, ordenar y escribir oraciones, y práctica manual del nombre.
- **Números · 7 de octubre:** antecesor/sucesor, comparación, orden ascendente y descendente, ábaco manipulable, cifras y palabras, composición/descomposición, patrones y dobles. Los cuatro niveles trabajan hasta 99, 299, 499 y 599.
- **Geometría · 9 de octubre:** nombres de figuras 2D, lados rectos, vértices y ángulo recto, con dibujos SVG.

Los retos cerrados tienen ayudas, corrección y fanfarria. Las oraciones libres se revisan con una lista junto a un adulto; no se califica automáticamente su significado. El nombre completo se introduce solo en la pantalla de práctica y puede trazarse con dedo o lápiz digital, o copiarse en papel usando el modelo de letra del curso. El nombre, los trazos y la escritura libre no se guardan ni se envían a la voz. No se publica la fotografía del temario.

### Juegos de comunicación

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

La apariencia usa tarjetas de colores, ilustración vectorial propia, botones con relieve y colores por materia. Las celebraciones incluyen confeti breve; se respeta la preferencia de movimiento reducido del dispositivo.

Hay cuatro efectos cortos al elegir una pieza, colocarla, mover el ábaco y avanzar. Usan el mismo reproductor que Catalina y se detienen al silenciar, navegar o descansar. En Ajustes se pueden desactivar los efectos manteniendo la voz y la fanfarria. El modo tranquilo reduce los colores y desactiva animaciones y sonidos de toque; la fanfarria conserva su interruptor independiente. `python tools/generate-fanfare.py` genera también estos cuatro WAV, sin servicios externos.

Al abrir la página aparece **Iniciar**. Tras pulsarlo se entra y se escucha **Hola Max**; se puede desmarcar «Entrar con sonido» antes de comenzar. Se recuerda la elección de sonido. Los enlaces directos a juegos también pasan por la entrada.

Las victorias muestran Excelente, Increíble, Bien hecho, Lo lograste o Muy bien. La fanfarria precede a la voz, tiene volumen independiente (Suave, Medio y Alto) y puede desactivarse. El volumen predeterminado aumentó; los antiguos valores bajos se migran a Medio. Cerrar la felicitación, descansar o navegar cancela la reproducción pendiente.

La fanfarria y Catalina comparten el mismo reproductor de audio para conservar la activación de sonido en móviles. La voz empieza al terminar la música. Los tres volúmenes están grabados en archivos WAV, generados localmente con `python tools/generate-fanfare.py`, para los dispositivos que controlan el volumen desde sus botones.

La voz predeterminada es **Catalina Neural, español de Chile**, una voz sintética neuronal de Microsoft. Los audios de los textos de la app se preparan antes de publicar y se sirven desde este mismo sitio; reproducir estos audios no envía mensajes a un servicio de generación. Solo se descarga el audio solicitado. La velocidad se puede cambiar sin alterar el tono.

En Ajustes puedes probar Catalina o elegir una voz del dispositivo. Si falta un audio o falla su descarga, se usa la voz del navegador como respaldo. Las preferencias antiguas se actualizan una vez a Catalina; después se respeta la voz elegida. La calidad y disponibilidad del respaldo dependen del dispositivo; algunas voces alternativas utilizan servicios en línea.

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

`node test-study.cjs` valida los 22 juegos, cuatro niveles, orden alfabético, opciones y cálculos. `node test-study-ui.cjs` comprueba las respuestas, el ábaco, la escritura y el dibujo; recorre todos los retos en pantalla de 375 × 667, simulando la API de voz de Safari 15. Admite `TEST_BROWSER=webkit` y `TEST_URL` como la prueba móvil de audio.

`node test.cjs` comprueba bancos de los cuatro niveles, opciones, respuestas, clasificación, secuencias y geometría del puzle.

`node test-ui.cjs`, con la vista previa abierta, comprueba entrada, saludo, juegos, oraciones duplicadas, fanfarria grabada, voces simuladas, cancelación y diseño adaptable. Usa Playwright del runtime local; `PLAYWRIGHT_PATH` permite indicar otra instalación. `TEST_LEVELS=4` limita las rondas al cuarto nivel; `TEST_URL` cambia el servidor. La prueba de voz verifica la programación, no su calidad audible.

`node test-mobile-audio.cjs` completa oraciones con controles táctiles y comprueba la fanfarria sin Web Audio, el reproductor compartido, los tres volúmenes y el silencio. `TEST_BROWSER=webkit` usa el motor de Safari; por defecto usa Chromium. Requiere el navegador correspondiente instalado en Playwright; no sustituye una prueba en un iPhone físico.

`LEGACY_SPEECH=1` simula la interfaz de voz de Safari 15, sin `addEventListener`, en una pantalla de 375 × 667. Comprueba que Iniciar funciona con sonido y sin él, los juegos y las voces disponibles. La notificación de nuevas voces es opcional: su ausencia no debe impedir cargar la aplicación.

`node test-voice.cjs` verifica los archivos de voz, la cobertura de los textos de los cuatro niveles, reproducción real de MP3, velocidad, cancelación y respaldo cuando falla una descarga.

## Preparar nuevos audios

Los audios publicados se generaron con `es-CL-CatalinaNeural`, velocidad `-5%`, tras autorización del responsable de la app para enviar los textos públicos (incluido «Hola Max») a Microsoft y publicar los resultados. No se enviaron grabaciones, respuestas ni estadísticas del niño. Referencias: [voz de Microsoft](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support) y [herramienta edge-tts](https://github.com/rany2/edge-tts).

La generación es una tarea de mantenimiento; no se ejecuta en los dispositivos de quienes juegan ni en cada despliegue. Requiere Python con `edge-tts==7.2.8`, Node y conexión al servicio. El sitio publicado reproduce archivos y no requiere claves API ni suscripciones de sus visitantes.

```sh
node tools/voice-catalog.cjs voice-catalog.json
python tools/generate-voice.py voice-catalog.json
node test-voice.cjs
```

El generador reutiliza los archivos existentes, permite reanudar y escribe `dist/voice.js` solo cuando completa el catálogo. Los textos nuevos deben añadirse al catálogo y regenerarse antes de publicar. La prueba de cobertura detecta instrucciones y ayudas sin grabación. El acceso al servicio de generación depende de Microsoft y puede cambiar; los audios ya publicados se siguen reproduciendo desde Pages.
