# Drink Cards 🍸

Projeto simples com React e Vite: 19 receitas com ingredientes e método de preparo, busca sem distinção de acentos, filtros e sorteio entre os resultados visíveis. O sorteio destaca o card e evita repetir a última escolha quando possível. Interface responsiva em português.

## Executar

Requer Node.js 20.19+ e npm.

```sh
npm install
npm run dev
```

Abra http://localhost:5173 (ou a porta indicada pelo Vite).

- `npm run build`: gera a versão de produção em `dist/`.
- `npm run preview`: serve o build localmente.
- `npm test`: verifica busca, filtros e sorteio.

Edite as receitas em `src/cards.js`. Ilustrações SVG são locais; fontes do Google Fonts têm fallback para fontes do sistema.

## Paleta

Violeta profundo `#3B146B`, roxo `#7B208F`, magenta `#C9349B`, rosa coral `#F36A78`, coral `#F87572`, laranja `#FF9B55` e amarelo quente `#FFB458`. As cores estão centralizadas em variáveis CSS em `src/style.css`.
