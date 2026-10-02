# Referencias curriculares de Max estudia

Revisión: 2 de octubre de 2026. Las actividades son originales, con referencia a objetivos de las Bases Curriculares de **2° básico de Chile**, consultados en Currículum Nacional del Ministerio de Educación. Son ejercicios de refuerzo con **cobertura parcial**: no sustituyen el trabajo del curso ni constituyen una evaluación de todos sus objetivos.

## Doce juegos incorporados

| Juego | Objetivos de referencia | Qué se practica |
| --- | --- | --- |
| Leo y descubro | LE02 OA 05 y 07 | Información explícita, secuencias, inferencias y búsqueda de evidencia en narraciones, notas e instrucciones breves. |
| Taller de palabras | LE02 OA 01, 17 y 21 | Combinaciones de letras, r/rr/nr, mayúscula inicial, punto y signos de pregunta; revisión conjunta de una oración. |
| Resuelvo problemas | MA02 OA 09 y 10 | Sumas y restas hasta 100, elección de operación, parte desconocida y dos acciones consecutivas. |
| Grupos iguales | MA02 OA 11 | Grupos, suma reiterada, tablas del 2, 5 y 10, factor desconocido por agrupación y aplicación en situaciones cotidianas. |
| La hora de mi día | MA02 OA 18 | Lectura digital de horas y medias horas, inicio, final y duración en tramos de media hora. |
| Mido y comparo | MA02 OA 19 | Selección de cm o m, distancia entre dos marcas, comparación y combinación de longitudes. |
| Detective de datos | MA02 OA 22 | Lectura de pictogramas con escalas 1, 2 y 5; cantidades, empates, diferencias y totales. |
| Animales y hábitats | CN02 OA 01, 02, 03, 04 y 06 | Clasificación, características, ciclos de vida, condiciones del hábitat y consecuencias de sus cambios. |
| El viaje del agua | CN02 OA 09, 10 y 11 | Estados, cambios, disolución, recorrido del agua, cuidado y evidencia observable. |
| Observo el tiempo | CN02 OA 12 y 13 | Condiciones atmosféricas, instrumentos, registros y decisiones basadas en el tiempo observado. |
| Exploro Chile | HI02 OA 05, 08 y 09 | Zonas norte, centro y sur, vocabulario de paisajes, elementos humanos y cuidado del patrimonio natural y cultural. |
| Sigo el plano | HI02 OA 06 y MA02 OA 14 | Referencias, posición relativa, orientación convencional del plano y recorridos. |

Cada juego tiene 12 retos por nivel. El nivel 1 presenta reconocimiento y apoyo directo; el 2 pide distinguir y representar; el 3 relaciona, ordena o interpreta; el 4 aplica; el 5 exige integrar pistas, justificar mediante evidencias o resolver más de un paso. Los niveles son una progresión propia de esta aplicación, no niveles oficiales del Ministerio.

El nivel 5 conserva los contenidos del curso. En los nuevos problemas de cálculo, resultados y cantidades se mantienen hasta 100; las sumas y restas planteadas para cálculo escrito evitan reserva/canje. Las tablas son exclusivamente 2, 5 y 10. Los problemas de longitud y duración son aplicaciones guiadas de las unidades ya presentadas.

## Fuentes oficiales consultadas

- [Lenguaje y Comunicación, 2° básico](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/lenguaje-comunicacion/2-basico): comprensión, lectura y escritura. [LE02 OA 07](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/lenguaje-comunicacion/2-basico/le02-oa-07) especifica comprensión de textos no literarios. [Ficha con LE02 OA 17 y 21](https://www.curriculumnacional.cl/docentes/Educacion-General/Lenguaje-y-comunicacion-Lengua-y-literatura/Lenguaje-y-comunicacion-2-basico/217302%3ALE02-OA-17-A5) detalla revisión y ortografía.
- [Matemática, 2° básico](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/matematica/2-basico): OA 09–11, 14, 18–19 y 22. La práctica de adición/sustracción se circunscribe a 0–100 y la multiplicación a las tablas 2, 5 y 10. El OA 18 se refiere a relojes digitales.
- [Ciencias Naturales, 2° básico](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/ciencias-naturales/2-basico) y [ficha oficial del texto con los OA de Ciencias](https://www.curriculumnacional.cl/docente/629/w3-article-145409.html): seres vivos, agua y tiempo atmosférico. Las preguntas digitales preparan para observar; no reemplazan las experiencias de exploración y medición que también exigen estos objetivos.
- Historia: [HI02 OA 05, patrimonio cultural](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/historia-geografia-ciencias-sociales/2-basico/hi02-oa-05); [HI02 OA 06, planos](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/historia-geografia-ciencias-sociales/2-basico/hi02-oa-06); [HI02 OA 08, paisajes](https://www.curriculumnacional.cl/curriculum/1o-6o-basico/historia-geografia-ciencias-sociales/2-basico/hi02-oa-08); [HI02 OA 09, patrimonio natural](https://www.curriculumnacional.cl/docente/629/w3-article-18092.html).

## Alcance del contenido que ya existía

El banco previo de números **hasta 599**, la práctica de centenas, las fechas de pruebas, sustantivos, tiempos verbales y ángulo recto proceden del **temario entregado por la familia**. Se conservan como refuerzo del curso concreto. No se presentan como el alcance literal de cada OA de 2° básico: por ejemplo, MA02 OA 13 trabaja igualdad/desigualdad en un ámbito menor, y OA 09 acota adición/sustracción a 100.

La aplicación aún no cubre todo el currículum: por ejemplo, producción extensa de textos, conversación y fluidez evaluadas por una persona, experimentos reales, construcción de figuras 3D, calendario, historia de pueblos originarios y las demás asignaturas requieren actividades adicionales. El juego del tiempo no desarrolla todavía en profundidad la relación entre estaciones y seres vivos del OA 14. Las referencias a OA describen conexiones de contenido, no certificación ni cobertura completa de cada objetivo.

## Verificación

`node test-curriculum.cjs` recorre los 720 retos nuevos. Verifica opciones válidas y distintas, respuestas numéricas, operaciones y límites, cálculo de horas y longitudes, escalas de pictogramas, recorridos, secuencias y diferencias del nivel 5 frente al 4. Los audios leen la escala y el recuento de símbolos del pictograma sin anticipar la cantidad resuelta.
