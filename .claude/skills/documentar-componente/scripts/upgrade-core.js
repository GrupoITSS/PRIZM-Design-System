// use_figma: move ligações presas a uma versão antiga do [PRIZM] Design Tokens_Core para a versão atual.
//
// Depois de publicar o Core, "aceitar atualização da biblioteca" NÃO move as ligações: a variável
// remota tem id `VariableID:<key>/<versão>` e os nós continuam na cópia antiga. Este script troca
// cada ligação cuja key é do Core e cujo id é de outra versão.
//
// Placeholders, trocar antes de enviar:
//   __ROOTS__  lista de ids dos nós a varrer (ex.: ['25003:8948', '25019:4489'])
//   __ONLY__   nomes das variáveis cujo VALOR mudou (ex.: ['color/destructive-weak']); [] = todas.
//              Prefira sempre a lista: religar tudo regrava paints e pode perder opacidades.
//   __DRY__    true para só contar, false para gravar
//
// Paints com mais de um fill e nós de instância aninhada (id "I…;…") NÃO são regravados:
// a opacidade do segundo fill vira 100% e override aninhado não chega ao arquivo.
// Eles voltam em `manual` para alguém corrigir à mão no Figma.
const ROOTS = __ROOTS__;
// A página do nó precisa estar carregada antes de varrer (páginas carregam sob demanda).
const __pageOf = async id => { let p = await figma.getNodeByIdAsync(id); while (p && p.type !== 'PAGE') p = p.parent; if (p) await figma.setCurrentPageAsync(p); };
await __pageOf(ROOTS[0]);
const ONLY = new Set(__ONLY__);
const DRY = __DRY__;
const lib = (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter(c => c.libraryName === '[PRIZM] Design Tokens_Core');
const keyOfVar = id => (/^VariableID:([0-9a-f]+)\//.exec(id) || [])[1];
const keyOfColl = id => (/^VariableCollectionId:([0-9a-f]+)\//.exec(id) || [])[1];
const libVarKeys = new Map(); // key -> nome
const collKeys = new Set(lib.map(c => c.key));
for (const c of lib) for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) libVarKeys.set(v.key, v.name);
const cur = {};
const current = async key => cur[key] || (cur[key] = await figma.variables.importVariableByKeyAsync(key));
const target = async id => {
  const k = keyOfVar(id);
  if (!k || !libVarKeys.has(k)) return null;
  if (ONLY.size && !ONLY.has(libVarKeys.get(k))) return null;
  const v = await current(k);
  return v.id === id ? null : v;
};
const curColl = {};
for (const c of lib) {
  const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key);
  if (vs.length) { const v = await current(vs[0].key); curColl[c.key] = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); }
}
// Paint literal com boundVariables explícito: é o único formato em que a opacidade grava.
const literal = (p, v) => ({ type: 'SOLID', visible: p.visible !== false, opacity: p.opacity ?? 1, blendMode: p.blendMode || 'NORMAL', color: p.color, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } });
const fontsLoaded = new Set();
const stats = { nodeBind: 0, paints: 0, effects: 0, modes: 0, manual: [], errors: [] };
for (const rid of ROOTS) {
  const root = await figma.getNodeByIdAsync(rid);
  if (!root) { stats.errors.push(rid + ': não encontrado'); continue; }
  for (const n of [root, ...(root.findAll ? root.findAll(() => true) : [])]) {
    try {
      const aninhado = n.id.startsWith('I');
      if (n.explicitVariableModes) for (const [cid, mid] of Object.entries(n.explicitVariableModes)) {
        const k = keyOfColl(cid); if (!k || !collKeys.has(k) || !curColl[k] || curColl[k].id === cid) continue;
        if (!DRY) n.setExplicitVariableModeForCollection(curColl[k], mid); stats.modes++;
      }
      if (n.type === 'TEXT' && n.boundVariables && Object.keys(n.boundVariables).length && !DRY) for (const s of n.getStyledTextSegments(['fontName'])) {
        const k = JSON.stringify(s.fontName); if (!fontsLoaded.has(k)) { try { await figma.loadFontAsync(s.fontName); } catch (e) {} fontsLoaded.add(k); }
      }
      for (const [field, val] of Object.entries(n.boundVariables || {})) {
        if (['fills', 'strokes', 'effects', 'componentProperties', 'textRangeFills', 'layoutGrids'].includes(field)) continue;
        for (const a of (Array.isArray(val) ? val : [val])) { if (!a || !a.id) continue; const t = await target(a.id); if (t) { if (!DRY) n.setBoundVariable(field, t); stats.nodeBind++; } }
      }
      for (const key of ['fills', 'strokes']) {
        if (!(key in n) || !Array.isArray(n[key])) continue;
        const alvos = [];
        for (const p of n[key]) { const b = p.boundVariables && p.boundVariables.color; alvos.push(b ? await target(b.id) : null); }
        if (!alvos.some(Boolean)) continue;
        if (n[key].length > 1 || aninhado) { stats.manual.push(`${n.id} ${n.name} (${key}: ${aninhado ? 'instância aninhada' : n[key].length + ' fills'})`); continue; }
        if (!DRY) n[key] = n[key].map((p, i) => (alvos[i] ? literal(p, alvos[i]) : p));
        stats.paints++;
      }
      if ('effects' in n && n.effects.length && !(typeof n.effectStyleId === 'string' && n.effectStyleId)) {
        let ch = false; const ne = [];
        for (const e of n.effects) { let o = e; for (const [f, b] of Object.entries(e.boundVariables || {})) { const t = await target(b.id); if (t) { o = figma.variables.setBoundVariableForEffect(o, f, t); ch = true; } } ne.push(o); }
        if (ch) { if (!DRY) n.effects = ne; stats.effects++; }
      }
    } catch (e) { if (stats.errors.length < 10) stats.errors.push(n.id + ' ' + n.name + ': ' + e.message); }
  }
}
return stats;
