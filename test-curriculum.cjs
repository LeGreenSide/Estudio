const assert=require('node:assert/strict');
const S=require('./dist/curriculum.js');
assert.equal(S.games.length,12);
assert.equal(new Set(S.games.map(g=>g.id)).size,12);
assert.equal(S.exercise('actividad-inexistente',5,0),undefined);
const digits=s=>[...s.matchAll(/\d+/g)].map(m=>Number(m[0]));
for(const g of S.games)for(let level=1;level<=5;level++)for(let r=0;r<12;r++){
 const q=S.exercise(g.key,level,r),label=`${g.key} nivel ${level} reto ${r+1}`;
 assert(q.prompt&&q.help,label);assert(g.oa,label);
 assert.deepEqual(S.exercise(g.key,level,r+12),q,'El banco repite después del reto 12');
 if(q.type==='choice'){assert(q.options.length>=2,label);assert(q.options.includes(q.answer),label);assert.equal(new Set(q.options).size,q.options.length,label);}
 if(q.type==='order'){assert(q.tokens.length>=3,label);assert.equal(new Set(q.tokens).size,q.tokens.length,label);}
 if(q.numeric)assert(Number.isInteger(Number(q.answer))&&Number(q.answer)>=0&&Number(q.answer)<=100,label);
 if(g.key==='problemas'){
  const [a,b,c]=digits(q.prompt),answer=Number(q.answer);
  assert.equal(answer,level===5?a+b-c:level===4?a-b:r%2?a-b:a+b,label);
  if(level>=2&&level<=3){if(r%2)assert(a%10>=b%10,'Resta sin canje');else assert(a%10+b%10<10,'Suma sin reserva');}
 }
 if(g.key==='multiplicar'){
  const [a,b,c]=digits(q.prompt);
  assert.equal(Number(q.answer),level===5?(a+b)*c:level===4?b/a:a*b,label);
  assert([2,5,10].includes(level===5?c:level===4?a:b),'Solo tablas de 2, 5 y 10');
 }
 if(g.key==='medir'&&level>1){const [a,b,c]=digits(q.prompt);assert.equal(Number(q.answer),level<4?b-a:level===4?a-b:a+b-c,label);if(q.ruler)assert(q.ruler.start>=0&&q.ruler.end<=q.ruler.max,label);}
 if(g.key==='reloj'){
  if(q.clock)assert(/^\d{2}:(00|30)$/.test(q.clock),label);
  const minutes=s=>s.split(':').map(Number).reduce((h,m)=>h*60+m);
  if(level===4)assert.equal(minutes(q.answer)-minutes(q.clock),30,label);
  if(level===5){const clocks=q.prompt.match(/\d{2}:\d{2}/g);assert.equal(Number(q.answer),minutes(clocks[1])-minutes(clocks[0]),label);}
 }
 if(g.key==='datos'){
  const values=q.dataRows.map(row=>row.count*q.dataScale);
  assert(q.clue.includes(`Cada círculo representa ${q.dataScale}`),'La escala también debe estar en el texto hablado');
  if(level===1)assert.equal(q.answer,q.dataRows.filter((_,i)=>values[i]===Math.max(...values)).map(row=>row.label).join(' y '),label);
  else assert.equal(Number(q.answer),level<4?values[r%3]:level===4?Math.abs(values[0]-values[1]):values[0]+values[1],label);
 }
 if(g.key==='planos'){
  const cells=q.mapGrid.flat();assert.equal(new Set(cells).size,9,label);
  if(level<=3)assert(cells.includes(q.answer),label);
  if(level===3)assert.equal(q.answer,cells[[0,2,6,8][r%4]],label);
  if(level===5){assert(q.prompt.includes(cells[r%2?2:0]));assert(q.prompt.includes(cells[r%2?6:8]));assert(q.answer.includes(r%2?'izquierda':'derecha'));}
 }
}
for(const g of S.games)assert.notDeepEqual(Array.from({length:12},(_,r)=>S.exercise(g.key,5,r)),Array.from({length:12},(_,r)=>S.exercise(g.key,4,r)),g.key+' debe avanzar en nivel 5');
for(const key of ['lectura','agua'])assert.equal(new Set(Array.from({length:12},(_,r)=>S.exercise(key,3,r).tokens.join('|'))).size,12,'Doce secuencias distintas');
const butterfly=S.exercise('animales',3,11);assert(!butterfly.options.includes('salen de huevos'),'Evitar un distractor también verdadero para la mariposa');
assert(S.exercise('chile',2,2).answer==='altiplano','Altiplano es una meseta alta, no sinónimo de cordillera');
console.log('OK: 12 juegos, 720 retos; operaciones hasta 100 sin reserva, tablas 2/5/10, horas, longitudes, escalas, planos y progresión al nivel 5.');
