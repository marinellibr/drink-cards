const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
export function filterCards(cards, query, method = 'TODOS') {
 return cards.filter(card => (method === 'TODOS' || card.preparo === method) && normalize([card.nome, ...card.ingredientes, card.preparo].join(' ')).includes(normalize(query.trim())));
}
export function randomCard(cards, previousId) {
 const choices = cards.length > 1 ? cards.filter(card => card.id !== previousId) : cards;
 return choices[Math.floor(Math.random() * choices.length)] ?? null;
}

// Segment centers start at 12 o'clock, matching the CSS conic gradient.
export function wheelRotation(count, winnerIndex) {
 if (!Number.isInteger(count) || count < 1 || !Number.isInteger(winnerIndex) || winnerIndex < 0 || winnerIndex >= count) throw new RangeError('Segmento inválido');
 return 6 * 360 - (winnerIndex + .5) * (360 / count);
}
