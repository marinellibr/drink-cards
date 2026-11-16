import test from 'node:test';
import assert from 'node:assert/strict';
import { cards } from './cards.js';
import { filterCards, randomCard } from './helpers.js';
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
