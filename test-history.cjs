'use strict';
const assert=require('node:assert/strict');
const H=require('./dist/history.js');
assert.equal(H.games.length,5);
assert.equal(new Set(H.games.map(g=>g.id)).size,5);
assert.equal(H.exercise('inexistente',1,0),undefined);
const all=[];
for(const g of H.games){
 assert.equal(g.group,'historia');assert.equal(g.exam,'octubre-nuevo');
 const levels=[];
 for(let l=1;l<=5;l++){
  const rows=[];
  for(let r=0;r<12;r++){
   const q=H.exercise(g.key,l,r),label=`${g.key}, nivel ${l}, reto ${r+1}`;all.push(q);rows.push(q);
   assert(q.prompt&&q.help,label);
   assert.deepEqual(H.exercise(g.key,l,r+12),q,label+' repite a los 12 retos');
   if(q.type==='choice'){
    assert(q.options.includes(q.answer),label);assert(q.options.length>=2&&q.options.length<=3,label);
    assert.equal(new Set(q.options).size,q.options.length,label);
    if(l===1)assert.equal(q.options.length,2,label);
   }else{
    assert.equal(q.type,'order',label);assert(q.tokens.length>=3&&q.tokens.length<=5,label);
    assert.equal(new Set(q.tokens).size,q.tokens.length,label);
    assert.equal(q.help,q.tokens.join(' ')+'.',label);
   }
  }
  assert.equal(new Set(rows.map(q=>JSON.stringify(q))).size,12,g.key+' tiene 12 retos por nivel');
  levels.push(rows);
 }
 for(let l=1;l<5;l++)assert.notDeepEqual(levels[l],levels[l-1],g.key+' progresa entre niveles');
}
assert.equal(all.length,300);
assert.equal(H.exercise('naves',1,10).answer,'Nao');
assert.equal(H.exercise('personajes',1,0).answer,'Cristóbal Colón');
assert.equal(H.exercise('personajes',1,1).answer,'Pedro de Valdivia');
assert.equal(H.exercise('personajes',1,4).answer,'1492');
assert.equal(H.exercise('personajes',1,5).answer,'1541');
assert(H.exercise('personajes',5,6).answer.includes('pueblos'));
assert(H.exercise('inmigrantes',5,8).answer.includes('dominar'));
const foodOrigin={Maíz:true,Papa:true,Tomate:true,Poroto:true,Ají:true,Zapallo:true,Trigo:false,Arroz:false,Cebolla:false,Ajo:false,Uva:false,Lenteja:false};
for(let r=0;r<12;r++){
 const q=H.exercise('alimentos-origen',5,r),correct=q.answer.split(' y ');
 assert.notEqual(foodOrigin[correct[0]],foodOrigin[correct[1]]);
 for(const wrong of q.options.filter(x=>x!==q.answer)){const pair=wrong.split(' y ');assert.equal(foodOrigin[pair[0]],foodOrigin[pair[1]]);}
}
console.log('OK: Historia, 5 juegos × 5 niveles × 12 retos; opciones únicas, progresión y hechos históricos esenciales.');
