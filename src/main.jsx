import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cards } from './cards';
import { filterCards, randomCard } from './helpers';
import './style.css';
function Glass({martini=false}) {
 return <svg viewBox="0 0 100 110" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{martini ? <><path d="M15 27h70L50 65 15 27ZM50 65v33M33 98h34M25 39h50M62 34l19-26"/><circle cx="77" cy="26" r="12"/></> : <><path d="M25 25h50l-7 73H32l-7-73ZM28 51h44M59 50l12-41"/><circle cx="28" cy="26" r="15"/><path d="M28 12v28M14 26h28m-5 37 13-3 3 13-13 3Zm20 17 9 2-2 9-9-2"/></>}</g></svg>;
}
function App() {
 const [query,setQuery] = useState('');
 const [method,setMethod] = useState('TODOS');
 const [chosen,setChosen] = useState(null);
 const visible = filterCards(cards,query,method);
 function choose() {
  const card = randomCard(visible,chosen?.id);
  if (!card) return;
  setChosen(card);
  requestAnimationFrame(() => {
   const el = document.getElementById(`drink-${card.id}`);
   el?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
   el?.focus({preventScroll:true});
  });
 }
 return <><header><a className="brand" href="./"><span>✳</span> drink cards.</a><span className="top-note">BONS DRINKS, BOAS HISTÓRIAS.</span></header><main>
 <section className="hero"><div><p className="eyebrow">— SEU BAR EM 19 RECEITAS</p><h1>Um card.<br/>Um novo <em>brinde.</em></h1><p className="intro">Dos clássicos aos seus novos favoritos.<br/>Encontre uma receita, separe o gelo e aproveite.</p><button className="random" onClick={choose} disabled={!visible.length}><span>⚄</span> Escolher aleatório <span>↗</span></button><p className="note">Deixe a próxima escolha por nossa conta.</p></div><div className="hero-art" aria-hidden="true"><span className="spark">✧</span><Glass martini/><span className="art-note">A vida pede um brinde.</span></div></section>
 <section className="collection" aria-labelledby="collection-title"><div className="heading"><div><p className="eyebrow">O MENU ESTÁ NA MESA</p><h2 id="collection-title">Explore os drinks<span>.</span></h2></div><span className="total">19 receitas, muitas possibilidades</span></div>
 <div className="controls"><label className="search"><span aria-hidden="true">⌕</span><span className="sr-only">Buscar por nome ou ingrediente</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busque um drink ou ingrediente…"/>{query && <button aria-label="Limpar busca" onClick={()=>setQuery('')}>×</button>}</label><div className="filters" aria-label="Filtrar por preparo">{['TODOS','MONTADO','BATIDO','MACERADO','LIQUIDIFICADO'].map(m=><button key={m} aria-pressed={m===method} onClick={()=>setMethod(m)} className={m===method?'active':''}>{m==='TODOS'?'Todos':m[0]+m.slice(1).toLowerCase()}</button>)}</div></div>
 <div className="results" role="status"><span>{visible.length} {visible.length===1?'drink encontrado':'drinks encontrados'}</span>{chosen && <span>Seu sorteio: {chosen.nome}</span>}</div>
 {visible.length ? <div className="grid">{visible.map(card=><article key={card.id} id={`drink-${card.id}`} tabIndex={-1} className={`card ${chosen?.id===card.id?'selected':''}`}><div className={`card-art color-${Number(card.id)%5}`}><span className="number">NO. {card.id}</span><Glass martini={card.preparo==='BATIDO'}/>{chosen?.id===card.id && <span className="chosen">Sorteado ✦</span>}</div><div className="card-body"><span className={`badge ${card.preparo.toLowerCase()}`}>{card.preparo}</span><h3>{card.nome}</h3><p className="ingredients-label">INGREDIENTES</p><ul>{card.ingredientes.map(i=><li key={i}>{i}</li>)}</ul></div></article>)}</div> : <div className="empty"><h3>Nenhum drink por aqui.</h3><p>Tente outro ingrediente ou explore todas as receitas.</p><button onClick={()=>{setQuery('');setMethod('TODOS')}}>Ver todos os drinks</button></div>}</section>
 </main><footer><a className="brand" href="./">drink cards.</a><span>Feito para escolher, preparar e brindar.</span><span>Aprecie com moderação.</span></footer></>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
