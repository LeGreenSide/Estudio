// Run from the project root. This catalog contains only the app's authored text.
const {writeFileSync}=require('node:fs');
const {createHash}=require('node:crypto');
const L=require('../dist/data.js');
const texts=new Map();
function add(text){if(!text)return;const key=L.voiceKey(text);if(key&&!texts.has(key))texts.set(key,{key,text,file:createHash('sha256').update(key).digest('hex').slice(0,20)+'.mp3'});}
[
 'Hola Max','Hola. Vamos a jugar juntos. Puedes hacerlo a tu ritmo.','Sonido encendido',
 '¡Excelente!','¡Increíble!','¡Bien hecho!','¡Lo lograste!','¡Muy bien!',
 'Lleva cada imagen a su grupo.','¿Cuál es de otro grupo?','Arma la imagen del parque.',
 'Ordena las palabras para contar qué pasa.','¿Qué quieres decir?',
 'La palabra está en su lugar. Sigue construyendo.','La imagen encontró su lugar.',
 '¡La imagen está completa! Veo un niño y un perro. ¿Qué ves tú?',
 'La secuencia está lista. Pueden contar los pasos juntos.',
 '¡Cada cosa en su lugar! Puedes señalar o nombrar las imágenes.',
 'Un ejemplo: quiero agua.','He elegido una pieza. Toca el espacio resaltado.'
].forEach(add);
for(let i=1;i<=16;i++)add('Pieza '+i);
for(const [,label,category] of Object.values(L.words)){
 add(label);
 if(L.categories[category]){const message=`${label} va con ${L.categories[category][1].toLowerCase()}.`;add(message);add(message+' Toca ese grupo.');}
}
for(const level of [1,2,3,4]){
 for(const q of [...L.questionBank(level),...L.intruderBank(level)]){
  add(q.text||q.rule||'¿Cuál es de otro grupo?');add(q.model||q.why);
  if(q.preference)for(const id of q.ids)add(`Elegiste ${L.words[id][1].toLowerCase()}. Tu elección cuenta.`);
 }
 for(const s of L.sentenceBank(level)){
  add(s.text);
  s.tokens.forEach((word,i)=>{add(word);add(`${s.text}. «${word}» va en el espacio ${i+1}.`);});
 }
 for(const q of L.completionBank(level)){
  add(q.context+' '+q.sentence.replace('___','¿qué palabra falta?'));
  add(q.sentence.replace('___',q.answer).replace(' .','.'));q.options.forEach(add);
 }
 for(const story of L.storyBank(level))for(const q of story.questions){add(story.lines.join(' ')+' '+q[0]);q.slice(1).forEach(add);}
 for(const game of ['patrones','pistas','soluciones'])for(const q of L.reasoningBank(game,level)){
  add(q.context+' '+q.text);add(q.model);q.options.forEach(add);
 }
}
for(const seq of [...L.sequences,...L.longSequences,...L.advancedSequences]){
 add(seq.title);
 for(const steps of [seq.steps,seq.short].filter(Boolean))steps.forEach(([,label],i)=>{add(label);add(`${label} va en el paso ${i+1}.`);});
}
const messageWords=['agua','comer','jugar','dormir','manzana','pelota','ayuda','bano','abrazo','silencio','descanso','cuento','pasear','musica'];
for(const prefix of ['Quiero','No quiero','Necesito'])for(const id of messageWords){
 const label={manzana:'una manzana',pelota:'una pelota'}[id]||L.words[id][1].toLowerCase();
 for(const when of ['', 'ahora','después'])for(const where of ['','en casa','en el parque'])add([prefix,label,when,where].filter(Boolean).join(' '));
}
const catalog=[...texts.values()];
if(require.main===module){writeFileSync(process.argv[2]||'voice-catalog.json',JSON.stringify(catalog,null,2));console.log(`${catalog.length} textos; ${catalog.reduce((n,x)=>n+x.text.length,0)} caracteres.`);}
module.exports=catalog;
