// use_figma (só leitura): extrai as ligações de cada variante de um component set, para montar
// o <nome>.tokens.json. Não grava nada.
//
// Placeholder: __SET__ = id do component set.
// Devolve, por variante (nome no formato "Variant=Default, State=Hover, Size=Default"):
//   fill, stroke, text (fill do primeiro texto), effects (estilo ou variáveis), bind (height,
//   width, padding, itemSpacing, raio), overlay (camadas absolutas, ex.: "Hover overlay"),
//   foraDoCore (variáveis que não são do [PRIZM] Design Tokens_Core ou fora do padrão de nome).
// Opacidade de paint lida aqui NÃO é confiável (lê 100% em hovers que o render mostra a 80%):
// use a regra de hover conferida pelo render.
// A página do nó precisa estar carregada antes de varrer (páginas carregam sob demanda).
const __pageOf = async id => { let p = await figma.getNodeByIdAsync(id); while (p && p.type !== 'PAGE') p = p.parent; if (p) await figma.setCurrentPageAsync(p); };
await __pageOf('__SET__');
const set = await figma.getNodeByIdAsync('__SET__');
const coreKeys = new Set();
for (const c of (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter(c => c.libraryName === '[PRIZM] Design Tokens_Core'))
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) coreKeys.add(v.key);
const PADRAO = /^(color|spacing|radius|control-height|width|height|border-width|stroke-width|opacity|font|font-weight|text)\//;
const cache = {};
const nome = async id => {
  if (cache[id]) return cache[id];
  const v = await figma.variables.getVariableByIdAsync(id);
  const n = v ? v.name : id;
  return (cache[id] = { n, core: !!(v && v.remote && coreKeys.has(v.key)) && PADRAO.test(n) });
};
const paints = async (arr, fora) => {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const p of arr) {
    if (p.visible === false) continue;
    const b = p.boundVariables && p.boundVariables.color;
    if (b) { const i = await nome(b.id); if (!i.core) fora.add(i.n); out.push(i.n); }
    else if (p.type === 'SOLID') out.push('solto #' + [p.color.r, p.color.g, p.color.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join(''));
  }
  return out;
};
const res = {};
for (const v of set.children) {
  const fora = new Set();
  const r = { fill: await paints(v.fills, fora), stroke: await paints(v.strokes, fora), bind: {} };
  for (const [f, a] of Object.entries(v.boundVariables || {})) {
    if (['fills', 'strokes', 'effects', 'componentProperties'].includes(f)) continue;
    const x = Array.isArray(a) ? a[0] : a; if (!x || !x.id) continue;
    const i = await nome(x.id); if (!i.core) fora.add(i.n); r.bind[f] = i.n;
  }
  if (typeof v.effectStyleId === 'string' && v.effectStyleId) r.effects = (await figma.getStyleByIdAsync(v.effectStyleId) || {}).name;
  else if (v.effects && v.effects.length) {
    r.effects = [];
    for (const e of v.effects) { const c = e.boundVariables && e.boundVariables.color; r.effects.push(e.type + (c ? ' ' + (await nome(c.id)).n : '')); if (c && !(await nome(c.id)).core) fora.add((await nome(c.id)).n); }
  }
  const texto = v.findOne(n => n.type === 'TEXT' && n.visible);
  if (texto) r.text = await paints(texto.fills, fora);
  const overlays = v.findAll(n => n.layoutPositioning === 'ABSOLUTE');
  if (overlays.length) { r.overlay = []; for (const o of overlays) r.overlay.push({ nome: o.name, opacidadeCamada: o.opacity, fill: await paints(o.fills, fora) }); }
  if (fora.size) r.foraDoCore = [...fora];
  res[v.name] = r;
}
return res;
