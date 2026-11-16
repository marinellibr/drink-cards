const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
export function filterCards(cards, query, method = 'TODOS') {
 return cards.filter(card => (method === 'TODOS' || card.preparo === method) && normalize([card.nome, ...card.ingredientes, card.preparo].join(' ')).includes(normalize(query.trim())));
}
export function randomCard(cards, previousId) {
 const choices = cards.length > 1 ? cards.filter(card => card.id !== previousId) : cards;
 return choices[Math.floor(Math.random() * choices.length)] ?? null;
}
