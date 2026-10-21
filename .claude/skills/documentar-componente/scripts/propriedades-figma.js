// use_figma (só leitura): propriedades do component set, no formato que o
// scripts/inventario-uso.mjs lê em --figma.
//
// Placeholder: __SET__ = id do component set.
// Devolve { "<Propriedade>": { type, defaultValue, variantOptions? } }. Copie o resultado
// para <nome>-figma-props.json no scratchpad e rode o inventário com --figma.
const __pageOf = async id => { let p = await figma.getNodeByIdAsync(id); while (p && p.type !== 'PAGE') p = p.parent; if (p) await figma.setCurrentPageAsync(p); };
await __pageOf('__SET__');
const set = await figma.getNodeByIdAsync('__SET__');
if (!set || set.type !== 'COMPONENT_SET') return { erro: `__SET__ não é um component set (${set?.type})` };
const out = {};
for (const [k, d] of Object.entries(set.componentPropertyDefinitions)) {
  out[k] = { type: d.type, defaultValue: d.defaultValue };
  if (d.variantOptions) out[k].variantOptions = d.variantOptions;
}
return { set: set.name, variantes: set.children.length, propriedades: out };
