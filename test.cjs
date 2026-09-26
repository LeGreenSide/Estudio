'use strict';
const assert=require('node:assert/strict');
const {readFileSync,existsSync}=require('node:fs');
const {words,activities,intruders,questions,sequences,shuffle,choices,classifyRound,levels,questionBank,intruderBank,longSequences,advancedSequences,puzzleGrid,chooseVoice,sentenceBank,completionBank,storyBank,reasoningBank}=require('./dist/data.js');
assert.equal(new Set(activities.map(a=>a.id)).size,12);
for(const count of [2,3,4]) {
 for(let r=0;r<20;r++) {
  const {cats,ids}=classifyRound(r,count);
  assert.equal(cats.length,2);
  assert.equal(new Set(ids).size,ids.length);
  for(const cat of cats)assert(ids.some(id=>words[id][2]===cat));
  for(const id of ids)assert(cats.includes(words[id][2]));
 }
 for(const q of intruders){
  const selected=choices(q.ids,q.answer,count);
  assert.equal(selected.length,count);assert(selected.includes(q.answer));
  const group=words[q.ids.find(id=>id!==q.answer)][2];
  assert(q.ids.filter(id=>id!==q.answer).every(id=>words[id][2]===group));
  assert.notEqual(words[q.answer][2],group);
 }
 for(const q of questions){
  const ids=q.ids||q.options.map(o=>o[1]);
  if(q.ids)q.ids.forEach(id=>assert(words[id]));
  if(!q.preference){assert(ids.includes(q.answer));assert(choices(ids,q.answer,count).includes(q.answer));}
 }
}
const original=[0,1,2,3,4,5];const shuffled=shuffle(original,()=>.25);
assert.notDeepEqual(new Set(classifyRound(0,3).ids),new Set(classifyRound(4,3).ids));
assert.deepEqual(original,[0,1,2,3,4,5]);assert.deepEqual([...shuffled].sort(),original);
assert.notDeepEqual(shuffled,original);
for(const s of sequences){assert(s.steps.length>=3);assert.equal(s.short.length,2);}
for(const n of [4,6,8,9,12,16]){
 const {cols,rows}=puzzleGrid(n);assert.equal(cols*rows,n);
 const positions=Array.from({length:n},(_,i)=>`${i%cols}/${Math.floor(i/cols)}`);
 assert.equal(new Set(positions).size,n);
}
for(const level of [1,2,3,4]){
 for(const game of ['patrones','pistas','soluciones']){
  const bank=reasoningBank(game,level);assert.equal(bank.length,6);
  bank.forEach(q=>{assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.answer));assert(q.context&&q.text&&q.model);});
 }
 const sentences=sentenceBank(level);assert.equal(sentences.length,12);
 sentences.forEach(s=>{assert.equal(s.tokens.join(' '),s.text);assert(s.tokens.length>=3);});
 assert.equal(completionBank(level).length,8);
 completionBank(level).forEach(q=>{assert.equal(q.sentence.split('___').length,2);assert(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);});
 assert.equal(storyBank(level).length,3);
 storyBank(level).forEach(story=>{assert.equal(story.questions.length,3);story.questions.forEach(q=>assert.equal(new Set(q.slice(1)).size,q.length-1));});
 for(let round=0;round<8;round++){
  const {ids,cats}=classifyRound(round,levels[level].choices,level);
  assert.equal(cats.length,Math.min(level+1,4));assert.equal(new Set(ids).size,ids.length);
  assert.equal(ids.length,level===1?2:level===2?6:level===3?12:16);
  ids.forEach(id=>assert(cats.includes(words[id][2])));
 }
 for(const q of [...questionBank(level),...intruderBank(level)]){
  const ids=q.ids||q.options.map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length);
  if(q.ids)q.ids.forEach(id=>assert(words[id]));
  if(!q.preference){assert(ids.includes(q.answer));assert(choices(ids,q.answer,levels[level].choices).includes(q.answer));}
 }
}
longSequences.forEach(seq=>assert([5,6].includes(seq.steps.length)));
advancedSequences.forEach(seq=>assert.equal(seq.steps.length,7));
const voices=[{name:'English natural',lang:'en-US',voiceURI:'en'},{name:'Chile',lang:'es-CL',voiceURI:'cl'},{name:'Mexico Natural',lang:'es-MX',voiceURI:'mx'}];
assert.equal(chooseVoice(voices).voiceURI,'mx');
assert.equal(chooseVoice(voices,'cl').voiceURI,'cl');
assert.equal(chooseVoice(voices,'missing').voiceURI,'mx');
assert.equal(chooseVoice([voices[0]]),undefined);assert.equal(chooseVoice([]),undefined);
assert.equal(chooseVoice([{name:'Chile',lang:'es_CL',voiceURI:'cl'}]).voiceURI,'cl');
const html=readFileSync('./dist/index.html','utf8');
for(const path of ['app.js','data.js','style.css','assets/parque.png'])assert(existsSync('./dist/'+path));
assert(html.includes('lang="es-CL"'));
console.log('OK: categorías, respuestas, opciones, secuencias, puzles y recursos.');
