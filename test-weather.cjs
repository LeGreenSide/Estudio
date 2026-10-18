const assert=require('node:assert/strict');
const W=require('./dist/weather.js');
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
assert.equal(W.games.length,5);
assert.equal(new Set(W.games.map(g=>g.id)).size,5);
assert.equal(W.exercise('missing',1,0),undefined);
assert.equal(W.visual({},escapeHTML),'');
for(const g of W.games)for(let l=1;l<=5;l++){
 const questions=[];
 assert.equal(g.group,'ciencias');assert.equal(g.exam,'octubre-nuevo');
 for(let r=0;r<12;r++){
  const q=W.exercise(g.key,l,r),label=`${g.key}, nivel ${l}, reto ${r+1}`;questions.push(q);
  assert(q.prompt&&q.help&&q.clue,label);assert(['choice','input','order'].includes(q.type),label);
  assert.deepEqual(W.exercise(g.key,l,r+12),q,label+' se repite después de 12');
  if(q.type==='choice'){
   assert(q.options.includes(q.answer),label);assert.equal(new Set(q.options).size,q.options.length,label+' opciones únicas');
   assert(q.options.length>=2,label);if(l===1)assert.equal(q.options.length,2,label+' inicio con dos opciones');
  }
  if(q.type==='order'){assert(q.tokens.length>=3,label);assert.equal(new Set(q.tokens).size,q.tokens.length,label+' piezas inequívocas');assert.equal(q.help,q.tokens.join(' '),label);}
  if(q.type==='input')assert(Number.isInteger(Number(q.answer))&&Number(q.answer)>=0,label);
  if(q.weather){const html=W.visual(q,escapeHTML);assert(html.includes('weather-visual'),label);assert(html.includes('aria-label='),label);}
  if(q.weather?.kind==='forecast'){
   const rows=q.weather.rows;rows.forEach(d=>assert(d.min<d.max&&d.min>=0&&d.max<40,label));
   assert(q.clue.includes('Pronóstico de práctica'),label);assert.equal(new Set(rows.map(d=>d.min)).size,rows.length,label);assert.equal(new Set(rows.map(d=>d.max)).size,rows.length,label);
   if(g.key==='pronostico'){
    const field=r%2?'max':'min';
    const target=(r+Math.floor(r/3))%3;
    if(l===1||l===2)assert.equal(q.answer,rows[l===1?0:target][field]+' °C',label);
    if(l===3){const expected=(field==='max'?Math.max:Math.min)(...rows.map(d=>d[field]));assert.equal(q.answer,rows.find(d=>d[field]===expected).day,label);}
    if(l===4)assert.equal(Number(q.answer),rows[target].max-rows[target].min,label);
    if(l===5){const dry=rows.filter(d=>d.symbol!=='rain'),expected=(field==='max'?Math.max:Math.min)(...dry.map(d=>d[field]));assert.equal(q.answer,dry.find(d=>d[field]===expected).day,label);}
   }
  }
 }
 assert.equal(new Set(questions.map(q=>JSON.stringify(q))).size,12,`${g.key}, nivel ${l}: doce retos distintos`);
 if(l>1)assert.notDeepEqual(questions,Array.from({length:12},(_,r)=>W.exercise(g.key,l-1,r)),g.key+' debe avanzar de nivel');
}
assert.equal(W.exercise('precipitacion',1,1).answer,'Sí','La nieve también es precipitación');
assert.equal(W.exercise('precipitacion',1,2).answer,'Sí','El granizo también es precipitación');
assert.equal(W.exercise('precipitacion',1,3).answer,'No','El riego no es precipitación');
assert.equal(W.exercise('instrumentos',3,1).answer,'Norte');
assert.equal(W.exercise('instrumentos',3,4).answer,'Este');
assert.equal(W.exercise('instrumentos',3,7).answer,'Sur');
assert.equal(W.exercise('instrumentos',3,10).answer,'Oeste');
assert(W.exercise('instrumentos',5,10).answer.includes('no permite saber la velocidad'));
const html=W.visual({weather:{kind:'symbols',items:[{key:'sun',label:'<script>alert(1)</script>'}]}},escapeHTML);
assert(!html.includes('<script>'));
console.log('OK: 5 juegos del tiempo, 300 retos, cinco niveles, pronósticos coherentes, instrumentos y precipitación.');
