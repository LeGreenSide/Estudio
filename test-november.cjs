const assert=require('node:assert/strict');
const S=require('./dist/study.js'),N=require('./dist/november.js');
assert.equal(N.games.length,19);assert.equal(S.games.length,63);
assert.deepEqual(S.examPlans.map(p=>p.date),['16 de noviembre','20 de noviembre','23 de noviembre','25 de noviembre']);
assert.deepEqual(S.examPlans.map(p=>p.keys.length),[12,11,6,4]);
assert.equal(S.pastExams.reduce((n,p)=>n+p.keys.length,0),32);
for(const p of [...S.examPlans,...S.pastExams])for(const key of p.keys)assert(S.games.some(g=>g.key===key&&g.group===p.id),key);
for(const [n,word] of [[600,'seiscientos'],[601,'seiscientos uno'],[699,'seiscientos noventa y nueve'],[700,'setecientos'],[799,'setecientos noventa y nueve']])assert.equal(S.numberName(n),word);
for(const g of N.games)for(let l=1;l<=5;l++){
 const qs=Array.from({length:12},(_,r)=>S.exercise(g.key,l,r));
 for(const [r,q] of qs.entries()){
  const label=`${g.key}, nivel ${l}, reto ${r+1}`;
  assert(q.prompt&&q.help,label);
  if(q.type==='choice'){assert(q.options.includes(q.answer),label);assert.equal(new Set(q.options).size,q.options.length,label);}
  if(q.type==='order')assert(q.tokens.length>=3,label);
  if(q.numeric)assert(Number.isInteger(Number(q.answer))&&Number(q.answer)>=0&&Number(q.answer)<=799,label);
  if(q.calculation){const {a,b,c=0,op}=q.calculation;assert.equal(Number(q.answer),op==='−'?a-b:a+b-c,label);}
  if(g.key==='sumas'){
   const {a,b}=q.calculation,carry=a%10+b%10>=10;
   if(l<=2)assert(!carry,label+' sin reserva');
   if(l===5)assert(q.help.includes('unidades'),label);
  }
  if(g.key==='dictado799'){assert(q.audioText&&q.clue===undefined,label);assert.equal(q.audioText,S.numberName(Number(q.answer)),label);}
  if(g.key==='palabras799')assert.equal(q.answer,S.numberName(Number(q.clue)),label);
  if(g.key==='abaco799')assert(q.n<=799&&q.maxHundreds===7,label);
  if(g.key==='comparar799'){const [a,b]=q.clue.split(' □ ').map(Number);assert.equal(q.answer,a===b?'=':a<b?'<':'>',label);}
  if(g.key==='orden799'){const ns=q.tokens.map(Number);assert(ns.every(n=>n>=0&&n<=799));assert.deepEqual(ns,[...ns].sort((a,b)=>r%2?b-a:a-b),label);}
  if(g.key==='componer799')assert.equal(Number(q.answer),q.clue.split(' + ').map(Number).reduce((a,b)=>a+b),label);
  if(g.key==='descomponer799')assert.equal(Number(q.clue),q.answer.split(' + ').map(Number).reduce((a,b)=>a+b),label);
  if(g.key==='manuscrita')assert(q.type==='copy'&&q.model,label);
 }
 if(l>1)assert.notDeepEqual(qs,Array.from({length:12},(_,r)=>S.exercise(g.key,l-1,r)),g.key+' progresión');
}
assert(S.examPlans.find(p=>p.id==='historia').note.includes('puede organizarse'));
assert(S.exercise('abaco799',4,9).n===799);
console.log('OK: 19 juegos de noviembre, 1140 retos, cobertura del temario, cálculo hasta 799, dictado y cinco niveles.');
