import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cards } from './cards';
import { filterCards, randomCard, wheelRotation } from './helpers';
import './style.css';
function Glass({martini=false}) {
 return <svg viewBox="0 0 100 110" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{martini ? <><path d="M15 27h70L50 65 15 27ZM50 65v33M33 98h34M25 39h50M62 34l19-26"/><circle cx="77" cy="26" r="12"/></> : <><path d="M25 25h50l-7 73H32l-7-73ZM28 51h44M59 50l12-41"/><circle cx="28" cy="26" r="15"/><path d="M28 12v28M14 26h28m-5 37 13-3 3 13-13 3Zm20 17 9 2-2 9-9-2"/></>}</g></svg>;
}
function Roulette({ entries, winner, onFinish, onClose, onView }) {
 const dialog = useRef(null);
 const [rotation, setRotation] = useState(0);
 const [done, setDone] = useState(false);
 const reducedMotion = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches).current;
 const colors = ['#C9349B', '#F36A78', '#F87572', '#FF9B55', '#FFB458'];
 const segment = 360 / entries.length;
 const gradient = entries.length === 1 ? colors[0] : `conic-gradient(${entries.map((_, i) => `${colors[i % colors.length]} ${i * segment}deg ${(i + 1) * segment}deg`).join(',')})`;
 useEffect(() => {
  dialog.current.showModal();
  const start = setTimeout(() => setRotation(wheelRotation(entries.length, entries.findIndex(card => card.id === winner.id))), 60);
  const finish = setTimeout(() => { setDone(true); onFinish(winner); }, reducedMotion ? 160 : 4360);
  return () => { clearTimeout(start); clearTimeout(finish); };
 }, [entries, winner, onFinish, reducedMotion]);
 return <dialog ref={dialog} className="roulette-dialog" aria-labelledby="roulette-title" onCancel={onClose} onClick={event => { const bounds = dialog.current.getBoundingClientRect(); if (event.target === dialog.current && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) onClose(); }}>
  <div className="roulette-top"><p className="eyebrow">DEIXE A SORTE ESCOLHER</p><button className="roulette-close" onClick={onClose}>Fechar</button></div>
  <h2 id="roulette-title">{done ? 'Seu próximo brinde.' : 'A roleta está girando.'}</h2>
  <p className="roulette-description">{entries.length} {entries.length === 1 ? 'drink na seleção atual' : 'drinks na seleção atual'}</p>
  <div className="wheel-wrap" aria-hidden="true"><div className="wheel-pointer"/><div className={`wheel ${reducedMotion ? 'no-motion' : ''}`} style={{background: gradient, transform: `rotate(${rotation}deg)`}}>{entries.map((card, index) => <span className="wheel-label" key={card.id} style={{transform: `rotate(${(index + .5) * segment}deg) translateY(calc(var(--wheel-size) * -.39)) rotate(90deg)`}}>{card.id}</span>)}</div><div className="wheel-hub">{done ? winner.id : 'DC'}</div></div>
  <div className="roulette-result" role="status" aria-live="polite"><p className="eyebrow">{done ? 'DRINK SORTEADO' : 'PREPARANDO SEU PRÓXIMO BRINDE'}</p><h3>{done ? winner.nome : 'Quem vai ser o escolhido?'}</h3></div>
  <button className="random roulette-view" disabled={!done} onClick={onView}>Ver receita</button>
  <details className="wheel-legend"><summary>Drinks na roleta</summary><ol>{entries.map(card => <li key={card.id}><span>{card.id}</span> {card.nome}</li>)}</ol></details>
 </dialog>;
}
function App() {
 const [query,setQuery] = useState('');
 const [method,setMethod] = useState('TODOS');
 const [chosen,setChosen] = useState(null);
 const [roulette,setRoulette] = useState(null);
 const visible = filterCards(cards,query,method);
 function choose() {
  const winner = randomCard(visible,chosen?.id);
  if (winner) setRoulette({ entries: [...visible], winner });
 }
 function viewRecipe() {
  const id = roulette.winner.id;
  setRoulette(null);
  requestAnimationFrame(() => {
   const el = document.getElementById(`drink-${id}`);
   el?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
   el?.focus({preventScroll:true});
  });
 }
 return <><header><a className="brand" href="./">drink cards.</a><span className="top-note">BONS DRINKS, BOAS HISTÓRIAS.</span></header><main>
 <section className="hero"><div><p className="eyebrow">— SEU BAR EM 19 RECEITAS</p><h1>Um card.<br/>Um novo <em>brinde.</em></h1><p className="intro">Dos clássicos aos seus novos favoritos.<br/>Encontre uma receita, separe o gelo e aproveite.</p><button className="random" onClick={choose} disabled={!visible.length}>Girar a roleta</button><p className="note">Gire a roleta e descubra seu próximo drink.</p></div><div className="hero-art" aria-hidden="true"><Glass martini/><span className="art-note">A vida pede um brinde.</span></div></section>
 <section className="collection" aria-labelledby="collection-title"><div className="heading"><div><p className="eyebrow">O MENU ESTÁ NA MESA</p><h2 id="collection-title">Explore os drinks<span>.</span></h2></div><span className="total">19 receitas, muitas possibilidades</span></div>
 <div className="controls"><label className="search"><span className="sr-only">Buscar por nome ou ingrediente</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busque um drink ou ingrediente…"/>{query && <button aria-label="Limpar busca" onClick={()=>setQuery('')}>Limpar</button>}</label><div className="filters" aria-label="Filtrar por preparo">{['TODOS','MONTADO','BATIDO','MACERADO','LIQUIDIFICADO'].map(m=><button key={m} aria-pressed={m===method} onClick={()=>setMethod(m)} className={m===method?'active':''}>{m==='TODOS'?'Todos':m[0]+m.slice(1).toLowerCase()}</button>)}</div></div>
 <div className="results" role="status"><span>{visible.length} {visible.length===1?'drink encontrado':'drinks encontrados'}</span>{chosen && <span>Seu sorteio: {chosen.nome}</span>}</div>
 {visible.length ? <div className="grid">{visible.map(card=><article key={card.id} id={`drink-${card.id}`} tabIndex={-1} className={`card ${chosen?.id===card.id?'selected':''}`}><div className={`card-art color-${Number(card.id)%5}`}><span className="number">NO. {card.id}</span><Glass martini={card.preparo==='BATIDO'}/>{chosen?.id===card.id && <span className="chosen">Sorteado</span>}</div><div className="card-body"><span className={`badge ${card.preparo.toLowerCase()}`}>{card.preparo}</span><h3>{card.nome}</h3><p className="ingredients-label">INGREDIENTES</p><ul>{card.ingredientes.map(i=><li key={i}>{i}</li>)}</ul></div></article>)}</div> : <div className="empty"><h3>Nenhum drink por aqui.</h3><p>Tente outro ingrediente ou explore todas as receitas.</p><button onClick={()=>{setQuery('');setMethod('TODOS')}}>Ver todos os drinks</button></div>}</section>
 </main><footer><a className="brand" href="./">drink cards.</a><span>Feito para escolher, preparar e brindar.</span><span>Aprecie com moderação.</span></footer>{roulette && <Roulette entries={roulette.entries} winner={roulette.winner} onFinish={setChosen} onClose={() => setRoulette(null)} onView={viewRecipe}/>}</>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
