// use_figma (só leitura): inventário das ligações de um component set, para saber se ele já
// está no [PRIZM] Design Tokens_Core e montar o mapa local -> Core.
//
// Placeholder: __ROOT__ = id do component set (ou de qualquer nó raiz).
// Devolve, por origem (core | local | outra biblioteca | sem ligação), as variáveis usadas
// com a contagem e o campo, mais os estilos locais de texto e efeito e as cores soltas.
// A página do nó precisa estar carregada antes de varrer (páginas carregam sob demanda).
const __pageOf = async id => { let p = await figma.getNodeByIdAsync(id); while (p && p.type !== 'PAGE') p = p.parent; if (p) await figma.setCurrentPageAsync(p); };
await __pageOf('__ROOT__');
const root = await figma.getNodeByIdAsync('__ROOT__');
const coreKeys = new Set();
for (const c of (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter(c => c.libraryName === '[PRIZM] Design Tokens_Core'))
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) coreKeys.add(v.key);
const cache = {};
const info = async id => {
  if (cache[id]) return cache[id];
  const v = await figma.variables.getVariableByIdAsync(id);
  const o = !v ? { nome: id, origem: 'desconhecida' } : { nome: v.name, origem: !v.remote ? 'local' : coreKeys.has(v.key) ? 'core' : 'outra biblioteca' };
  return (cache[id] = o);
};
const out = { core: {}, local: {}, 'outra biblioteca': {}, desconhecida: {}, estilosLocais: {}, coresSoltas: {} };
const conta = (grupo, chave) => { out[grupo][chave] = (out[grupo][chave] || 0) + 1; };
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
for (const n of [root, ...root.findAll(() => true)]) {
  for (const [field, val] of Object.entries(n.boundVariables || {})) {
    if (['fills', 'strokes', 'componentProperties'].includes(field)) continue;
    for (const a of (Array.isArray(val) ? val : [val])) if (a && a.id) { const i = await info(a.id); conta(i.origem, `${i.nome} @${field}`); }
  }
  for (const key of ['fills', 'strokes']) {
    if (!(key in n) || !Array.isArray(n[key])) continue;
    for (const p of n[key]) {
      const b = p.boundVariables && p.boundVariables.color;
      if (b) { const i = await info(b.id); conta(i.origem, `${i.nome} @${key}${p.opacity !== undefined && p.opacity < 1 ? ' ' + Math.round(p.opacity * 100) + '%' : ''}`); }
      else if (p.type === 'SOLID' && p.visible !== false) conta('coresSoltas', `${hex(p.color)} @${key} (${n.name})`);
    }
  }
  for (const k of ['textStyleId', 'effectStyleId']) {
    if (typeof n[k] === 'string' && n[k]) { const s = await figma.getStyleByIdAsync(n[k]); if (s && !s.remote) conta('estilosLocais', `${s.name} @${k}`); }
  }
}
return out;
