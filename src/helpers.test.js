import test from 'node:test';
import assert from 'node:assert/strict';
import { cards } from './cards.js';
import { filterCards, randomCard, wheelRotation } from './helpers.js';
test('busca ignora acentos, caixa e espaços',()=>{
 assert.deepEqual(filterCards(cards,' CAIPIRINHA siciliana ').map(c=>c.id),['01']);
 assert.ok(filterCards(cards,'limao').length>0);
 assert.ok(filterCards(cards,'JAGERMEISTER').some(c=>c.id==='04'));
});
test('combina ingredientes com preparo e permite lista vazia',()=>{
 assert.deepEqual(filterCards(cards,'tequila','BATIDO').map(c=>c.id),['19']);
 assert.equal(filterCards(cards,'inexistente').length,0);
 assert.equal(filterCards(cards,'').length,19);
});
test('sorteio respeita candidatos e evita repetir quando possível',()=>{
 assert.equal(randomCard([]),null);
 assert.equal(randomCard([cards[0]],'01'),cards[0]);
 assert.equal(randomCard(cards.slice(0,2),'01'),cards[1]);
});

test('roleta para com o segmento vencedor sob o ponteiro',()=>{
 for (const count of [1, 2, 7, 19]) {
  for (let index = 0; index < count; index++) {
   const rotation = wheelRotation(count, index);
   const center = (index + .5) * 360 / count;
   assert.ok(rotation >= 5 * 360);
   assert.ok(Math.abs((rotation + center) % 360) < .000001);
  }
 }
 assert.throws(()=>wheelRotation(0,0),RangeError);
 assert.throws(()=>wheelRotation(19,19),RangeError);
});
