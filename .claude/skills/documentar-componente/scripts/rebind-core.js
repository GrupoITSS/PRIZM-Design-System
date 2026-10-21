// use_figma: religa variáveis LOCAIS (do kit shadcn) ao [PRIZM] Design Tokens_Core, pelo mapa aprovado.
//
// Placeholders, trocar antes de enviar:
//   __ROOTS__   ids dos nós raiz (component set e dependências), ex.: ['25003:8948']
//   __MAP__     { 'nome local': 'nome no Core' } aprovado por quem decide
//   __OPACITY__ { 'nome local': 0.2 } quando o token local carregava alfa que o do Core não tem
//   __DRY__     true para só listar o que mudaria e o que ficou sem mapa
//
// Estilos de texto locais são desligados (a tipografia fica nas variáveis font/*, text/*).
// Paint com opacidade é gravado como objeto literal com boundVariables: é o único jeito que grava.
// Paint em nó com 2+ fills ou instância aninhada volta em `manual` (o plugin não grava a opacidade).
const ROOTS = __ROOTS__;
// A página do nó precisa estar carregada antes de varrer (páginas carregam sob demanda).
const __pageOf = async id => { let p = await figma.getNodeByIdAsync(id); while (p && p.type !== 'PAGE') p = p.parent; if (p) await figma.setCurrentPageAsync(p); };
await __pageOf(ROOTS[0]);
const MAP = __MAP__;
const PAINT_OPACITY = __OPACITY__;
const DRY = __DRY__;
const lib = (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter(c => c.libraryName === '[PRIZM] Design Tokens_Core');
const keys = {};
for (const c of lib) for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) keys[v.name] = v.key;
const coreCache = {};
const core = async n => coreCache[n] || (coreCache[n] = await figma.variables.importVariableByKeyAsync(keys[n]));
const localById = {};
for (const v of await figma.variables.getLocalVariablesAsync()) localById[v.id] = v;
// null = não é variável local (ignorar); undefined = local sem mapa (reportar)
const target = async id => { const lv = localById[id]; if (!lv) return null; const c = MAP[lv.name]; return c && keys[c] ? core(c) : undefined; };
const literal = (p, v, op) => ({ type: 'SOLID', visible: p.visible !== false, opacity: op ?? p.opacity ?? 1, blendMode: p.blendMode || 'NORMAL', color: p.color, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } });
const stats = { nodeBind: 0, paintBind: 0, textDetached: 0, unmapped: {}, manual: [], errors: [] };
for (const rid of ROOTS) {
  const rootNode = await figma.getNodeByIdAsync(rid);
  for (const n of [rootNode, ...rootNode.findAll(() => true)]) {
    try {
      if (n.type === 'TEXT' && !DRY) {
        for (const s of n.getStyledTextSegments(['fontName'])) { try { await figma.loadFontAsync(s.fontName); } catch (e) {} }
        if (typeof n.textStyleId === 'string' && n.textStyleId) { const st = await figma.getStyleByIdAsync(n.textStyleId); if (st && !st.remote) { await n.setTextStyleIdAsync(''); stats.textDetached++; } }
      }
      for (const [field, val] of Object.entries(n.boundVariables || {})) {
        if (['fills', 'strokes', 'effects', 'componentProperties', 'textRangeFills'].includes(field)) continue;
        for (const a of (Array.isArray(val) ? val : [val])) {
          if (!a || !a.id) continue;
          const t = await target(a.id);
          if (t === null) continue;
          if (!t) { stats.unmapped[(localById[a.id] || {}).name + '@' + field] = 1; continue; }
          if (!DRY) n.setBoundVariable(field, t);
          stats.nodeBind++;
        }
      }
      for (const key of ['fills', 'strokes']) {
        if (!(key in n) || !Array.isArray(n[key])) continue;
        const alvos = [];
        for (const p of n[key]) {
          const b = p.boundVariables && p.boundVariables.color;
          const t = b ? await target(b.id) : null;
          if (t === undefined) stats.unmapped[(localById[b.id] || {}).name + '@' + key] = 1;
          alvos.push(t ? { v: t, op: PAINT_OPACITY[localById[b.id].name] } : null);
        }
        if (!alvos.some(Boolean)) continue;
        if (n[key].length > 1 || n.id.startsWith('I')) { stats.manual.push(`${n.id} ${n.name} (${key})`); continue; }
        if (!DRY) n[key] = n[key].map((p, i) => (alvos[i] ? literal(p, alvos[i].v, alvos[i].op) : p));
        stats.paintBind++;
      }
    } catch (e) { stats.errors.push(n.id + ' ' + n.name + ': ' + e.message); }
  }
}
return stats;
