# A mi ritmo

Aplicación en español con nueve juegos: clasificación, elemento diferente, preguntas con imágenes, puzle de 4 a 12 piezas, construcción de mensajes, secuencias cotidianas, armado de oraciones, frases incompletas y cuentos con preguntas. Incluye un tablero de comunicación disponible sin completar juegos.

## Oraciones y cuentos

- **Armo una oración:** 36 oraciones, 12 por nivel. Desde «El perro duerme» hasta oraciones con causas, negaciones y conectores. Cada palabra se puede arrastrar o colocar con clic o teclado. Las palabras idénticas son intercambiables.
- **La palabra que falta:** 24 ejercicios, 8 por nivel. Vocabulario, verbos, concordancia, ubicación, tiempo y conectores. Incluyen contexto y botones para escuchar las opciones sin responder todavía.
- **Pequeños cuentos:** 9 cuentos, 3 por nivel, con 27 preguntas en total. El texto permanece visible, puede escucharse y no se exige memorizarlo.
- **Construyo mi mensaje:** 14 imágenes y tres inicios («Quiero», «No quiero», «Necesito»). En los niveles superiores se agregan cuándo y dónde: «Necesito ayuda ahora en casa». No se evalúan las preferencias personales.
- «Otra frase» u «Otro cuento» permite cambiar de ejercicio sin tener que acertar primero. Los totales están repartidos por nivel, no son desbloqueos.

## Usar

Abre `dist/index.html` en el navegador. También puedes ejecutar `node server.mjs` y abrir http://127.0.0.1:4173. No requiere instalar dependencias. Las actividades y las imágenes funcionan sin conexión; las fuentes tienen una alternativa local. La voz depende del navegador y de las voces disponibles en el dispositivo.

- El sonido comienza apagado y solo se activa por elección.
- Arrastra con mouse o pantalla táctil. También puedes tocar una imagen y luego su destino, o usar Tab y Enter.
- En frases, tocar una imagen la añade directamente al mensaje. El tablero de comunicación muestra mensajes completos.
- Elige el nivel desde el inicio o dentro de un juego: **Primeros pasos**, **Explorar** o **Un nuevo reto**. Cambiar el nivel reinicia la ronda y propone una cantidad de respuestas y piezas. Puedes personalizarlas en Ajustes.
- Primeros pasos: dos grupos, dos alternativas y secuencias cortas. El diferente mantiene al menos tres imágenes para que exista un grupo mayoritario.
- Explorar: tres grupos, preguntas sobre acciones y relaciones, puzles de seis piezas y mensajes con «ahora» o «después».
- Un nuevo reto: cuatro grupos y doce imágenes; categorías más precisas, preguntas con dos pistas, negaciones y causas; secuencias de cinco o seis pasos; puzles de doce piezas; mensajes con cuándo y dónde.
- Los puzles permiten 4, 6, 8, 9 o 12 piezas. Desde Explorar, las piezas no muestran números; la ayuda sigue disponible.
- Ajusta la voz española y escucha una muestra antes de guardar. La selección automática prioriza nombres de voces naturales y luego el idioma regional; no garantiza una calidad concreta. La lista se actualiza cuando el navegador termina de cargar sus voces. Las voces en línea pueden requerir conexión.
- Con el sonido activado, una fanfarria breve con un acorde final celebra cada actividad completada. Tiene volumen independiente y se puede desactivar sin apagar la voz. Primero suena la fanfarria y después la felicitación y la frase; silenciar, descansar o cambiar de actividad cancela ambos. Las pruebas de voz y melodía son explícitas y se escuchan aun con el sonido general apagado.
- No hay tiempo límite, puntajes ni castigos. «Ver una ayuda» modela una respuesta; una elección personal siempre se acepta.
- Solo se guardan preferencias en el dispositivo. No se recogen datos personales ni resultados del niño.

## Contenido y alcance

Adaptado de *Guía práctica de actividades para familia*, de Javiera Fernanda Salazar Acosta, fonoaudióloga, facilitada por la familia. Incluye las categorías y palabras de la guía y sus sugerencias de lenguaje concreto, ejemplos y espera sin presión. Los puzles, las secuencias y el tablero son complementos. No se publica el PDF ni sus datos de contacto.

Referencias de apoyo: https://www.asha.org/Practice-Portal/Professional-Issues/Augmentative-and-Alternative-Communication/

Las imágenes del vocabulario son emojis con etiquetas; no son un sistema de pictogramas clínicamente validado. La escena del parque es una ilustración generada. Acompaña los símbolos con objetos reales cuando sea útil. Es material educativo de apoyo, no una evaluación ni una terapia ni un sustituto de un sistema de comunicación individualizado.

El niño puede señalar, mirar, hacer gestos o hablar. No se exige repetir, mirar a los ojos o acertar para recibir ayuda. La sección «En familia» ofrece modelos para usar fuera de la pantalla.

## Verificar

## GitHub Pages

El repositorio privado es `LeGreenSide/Estudio`. El flujo `.github/workflows/pages.yml` publica únicamente la carpeta `dist`, después de verificar el contenido y el JavaScript. No publica los archivos de pruebas, la configuración local de Sites ni el PDF de la guía.

Para publicar, primero debe habilitarse Pages con origen **GitHub Actions** en los ajustes del repositorio; después se ejecuta manualmente **Publicar A mi ritmo en GitHub Pages** desde Actions. La configuración por sí sola no activa ni ejecuta la publicación.

GitHub Pages en repositorios privados requiere un plan compatible (por ejemplo, GitHub Pro). La web de Pages será pública aunque este repositorio continúe privado. No se modifica la visibilidad del repositorio para habilitar Pages.

## Pruebas

`node test.cjs`

Comprueba las categorías, respuestas, cantidad de alternativas, secuencias y recursos sin instalar un framework. Para modificar el vocabulario y las preguntas, edita `dist/data.js`.

`node test-ui.cjs` con la vista previa local abierta comprueba los contenidos de los tres niveles, las palabras duplicadas, voces simuladas, tonos reales de Web Audio, cancelación al pausar y diseño adaptable. Utiliza Playwright del runtime local de Codex; se puede indicar otra instalación con `PLAYWRIGHT_PATH`. Las pruebas verifican la reproducción programada; la calidad audible de una voz se elige con «Probar esta voz» en el dispositivo real.

Referencias de implementación de audio: [carga de voces](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event) y [activación de Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices).

Al completar una actividad aparece una felicitación (Excelente, Increíble, Bien hecho, Lo lograste o Muy bien), incluso con el sonido apagado. Puedes seguir jugando, ver tu respuesta o cerrarla con Escape. Cerrar, pausar o cambiar de actividad detiene la fanfarria y la voz pendientes. El modo de colores suaves y la preferencia de movimiento reducido eliminan la animación de entrada.
