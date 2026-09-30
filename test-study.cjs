const assert=require('node:assert/strict');
const S=require('./dist/study.js');
assert.equal(S.games.length,22);assert.equal(new Set(S.games.map(g=>g.id)).size,22);
assert.equal(S.alphabet.length,27);assert.equal(S.alphabet[14],'Ñ');
for(const [n,name] of [[0,'cero'],[16,'dieciséis'],[22,'veintidós'],[31,'treinta y uno'],[100,'cien'],[101,'ciento uno'],[200,'doscientos'],[500,'quinientos'],[599,'quinientos noventa y nueve']])assert.equal(S.numberName(n),name);
assert.equal(S.normalize('  Veintidós  '),'veintidos');
const collator=new Intl.Collator('es',{sensitivity:'base'});
for(const game of S.games)for(let level=1;level<=4;level++)for(let i=0;i<S.total;i++){
 const q=S.exercise(game.key,level,i);assert(q.prompt&&q.help,game.key);
 if(q.type==='choice'){assert(q.options.includes(q.answer),game.key);assert.equal(new Set(q.options).size,q.options.length,game.key);}
 if(q.type==='order'){
  assert(q.tokens.length>=3);
  if(game.key==='alfabeto')assert.deepEqual(q.tokens,[...q.tokens].sort(collator.compare));
  if(game.key==='orden'){const ns=q.tokens.map(Number);assert(ns.every(n=>n>=0&&n<=[99,299,499,599][level-1]));assert.deepEqual(ns,[...ns].sort((a,b)=>i%2?b-a:a-b));}
 }
 if(q.numeric)assert(Number(q.answer)>=0&&Number(q.answer)<=599);
 if(q.type==='abacus')assert(q.n>=0&&q.n<=599);
 if(game.key==='vecinos'||game.key==='patron')assert(q.options.every(x=>Number(x)>=0&&Number(x)<=599));
 if(game.key==='descomponer')assert.equal(q.answer.split(' + ').reduce((sum,n)=>sum+Number(n),0),Number(q.clue));
 if(game.key==='componer')assert.equal(q.clue.split(' + ').reduce((sum,n)=>sum+Number(n),0),Number(q.answer));
 if(game.key==='comparar'){const [a,b]=q.clue.split(' □ ').map(Number);assert.equal(q.answer,a===b?'=':a<b?'<':'>');}
}
console.log('OK: 22 juegos, cuatro niveles, alfabeto español, números hasta 599, operaciones y opciones.');
