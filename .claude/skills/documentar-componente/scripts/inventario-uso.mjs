#!/usr/bin/env node
// Inventário de uso de um componente do @grupoitss/prizm-ui: o que o código e as stories
// dizem que existe e é usado hoje (variantes, tamanhos, combinações, props, estados) e,
// com --figma, a paridade com o component set do Figma.
//
// Os componentes do prizm-ui vieram do @pas/ui (Azure) e mostram como o time de
// desenvolvimento usa cada componente hoje. É contexto para as decisões sobre o shadcn e o
// Figma (a referência), não fonte da verdade: mostra o que o Figma não cobre e o que uma
// decisão obriga a migrar.
//
// Uso (na raiz do checkout, depois de `git fetch origin` e do `pnpm install` do design-system):
//   node inventario-uso.mjs <nome> [--ref origin/main] [--figma props.json]
//                          [--storybook <url> | --sem-storybook] [--out inventario.json]
//
//   <nome>        pasta em design-system/packages/ui/src/components/ (badge, button, input…)
//   --ref         de onde ler (padrão origin/main). Lê com `git show`, não do disco.
//   --figma       JSON do scripts/propriedades-figma.js (componentPropertyDefinitions do set)
//   --storybook   Storybook publicado (padrão https://grupoitss.github.io/PRIZM-Design-System/)
//   --out         grava o inventário completo em JSON (para o <nome>-doc-state.json)
//
// Precisa do pacote typescript do repositório (design-system/packages/ui/node_modules).
// Imprime em Markdown: cva (variantes, padrões, combinações), props, estados no CSS,
// stories, valores usados em JSX no repositório, uso dentro de outros componentes e,
// com --figma, a tabela de paridade.
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { writeFileSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const flag = k => { const i = args.indexOf(k); if (i < 0) return false; args.splice(i, 1); return true; };
const ref = opt('--ref', 'origin/main');
const figmaFile = opt('--figma');
const out = opt('--out');
const semStorybook = flag('--sem-storybook');
const storybook = (opt('--storybook', 'https://grupoitss.github.io/PRIZM-Design-System/') || '').replace(/\/?$/, '/');
const nome = args[0];
if (!nome) { console.error('Uso: node inventario-uso.mjs <nome> [--ref origin/main] [--figma props.json] [--out x.json]'); process.exit(1); }

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 << 20 });
const root = git('rev-parse', '--show-toplevel').trim();
const DS = 'design-system';
const COMP = `${DS}/packages/ui/src/components`;
const STORIES = `${DS}/apps/docs/stories`;

const req = createRequire(join(root, DS, 'packages/ui/package.json'));
let ts;
try { ts = req('typescript'); } catch {
  console.error('typescript não encontrado. Rode `pnpm install` em design-system/ (ver references/codigo.md).');
  process.exit(1);
}

const ls = dir => git('ls-tree', '-r', '--name-only', ref, '--', dir).split('\n').filter(Boolean);
const show = p => git('show', `${ref}:${p}`);
const parse = (p, txt) => ts.createSourceFile(p, txt ?? show(p), ts.ScriptTarget.Latest, true, p.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
const walk = (n, f) => { f(n); ts.forEachChild(n, c => walk(c, f)); };
const lit = n => n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) ? n.text : null;
const keyOf = p => p.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) ? p.name.text : null;
const strings = n => { const s = []; walk(n, x => { const t = lit(x); if (t) s.push(t); }); return s.join(' '); };

// ---------- 1. Código do componente ----------
const arquivos = ls(`${COMP}/${nome}/`);
if (!arquivos.length) { console.error(`Nada em ${COMP}/${nome}/ no ${ref}. Confira o nome da pasta.`); process.exit(1); }
const fontes = arquivos.filter(p => /\.(ts|tsx)$/.test(p) && !/\.test\.|\.stories\./.test(p));

const cvas = [];      // { nome, arquivo, variants:{prop:[op]}, defaults, compounds:[{prop:val}], base }
const props = [];     // { tipo, nome, opcional, tipoTexto, padrao, doc }
const defaultsParam = {};
const exportados = new Set();
const atributos = new Set(); // aria-*, data-* e role definidos no JSX do componente
let classes = '';

for (const p of fontes) {
  const sf = parse(p);
  walk(sf, n => {
    // export function X / export const X / export { X }
    if ((ts.isFunctionDeclaration(n) || ts.isVariableStatement(n)) && n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      if (n.name) exportados.add(n.name.text);
      n.declarationList?.declarations.forEach(d => ts.isIdentifier(d.name) && exportados.add(d.name.text));
    }
    if (ts.isExportSpecifier(n)) exportados.add(n.name.text);
    // cva(base, { variants, defaultVariants, compoundVariants })
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === 'cva') {
      const decl = n.parent && ts.isVariableDeclaration(n.parent) ? n.parent.name.getText(sf) : '(anônimo)';
      const cfg = n.arguments[1];
      const item = { nome: decl, arquivo: basename(p), variants: {}, defaults: {}, compounds: [], base: n.arguments[0] ? strings(n.arguments[0]) : '' };
      classes += ' ' + item.base;
      if (cfg && ts.isObjectLiteralExpression(cfg)) for (const prop of cfg.properties) {
        const k = keyOf(prop);
        if (!ts.isPropertyAssignment(prop)) continue;
        if (k === 'variants' && ts.isObjectLiteralExpression(prop.initializer))
          for (const v of prop.initializer.properties) if (ts.isPropertyAssignment(v) && ts.isObjectLiteralExpression(v.initializer)) {
            item.variants[keyOf(v)] = v.initializer.properties.map(keyOf).filter(Boolean);
            classes += ' ' + strings(v.initializer);
          }
        if (k === 'defaultVariants' && ts.isObjectLiteralExpression(prop.initializer))
          for (const v of prop.initializer.properties) if (ts.isPropertyAssignment(v)) item.defaults[keyOf(v)] = lit(v.initializer) ?? v.initializer.getText(sf);
        if (k === 'compoundVariants' && ts.isArrayLiteralExpression(prop.initializer))
          for (const el of prop.initializer.elements) if (ts.isObjectLiteralExpression(el)) {
            const combo = {};
            for (const v of el.properties) if (ts.isPropertyAssignment(v) && !['class', 'className'].includes(keyOf(v)))
              combo[keyOf(v)] = ts.isArrayLiteralExpression(v.initializer) ? v.initializer.elements.map(lit).join('|') : (lit(v.initializer) ?? v.initializer.getText(sf));
            item.compounds.push(combo);
            classes += ' ' + strings(el);
          }
      }
      cvas.push(item);
    }
    // interface XProps { … } e type XProps = { … }
    const membros = ts.isInterfaceDeclaration(n) ? n.members : ts.isTypeAliasDeclaration(n) && ts.isTypeLiteralNode(n.type) ? n.type.members : null;
    if (membros && /Props$/.test(n.name.text)) {
      const herda = n.heritageClauses?.flatMap(h => h.types.map(t => t.getText(sf))) ?? [];
      if (herda.length) props.push({ tipo: n.name.text, nome: '(herda)', opcional: true, tipoTexto: herda.join(', '), padrao: '', doc: '' });
      for (const m of membros) if (ts.isPropertySignature(m)) {
        const docs = ts.getJSDocCommentsAndTags(m).filter(ts.isJSDoc);
        const doc = docs.map(d => typeof d.comment === 'string' ? d.comment : '').join(' ').replace(/\s+/g, ' ').trim();
        const padrao = docs.flatMap(d => d.tags ?? []).find(t => t.tagName.text === 'default');
        props.push({ tipo: n.name.text, nome: m.name.getText(sf), opcional: !!m.questionToken, tipoTexto: m.type?.getText(sf).replace(/\s+/g, ' ') ?? '', padrao: padrao ? String(padrao.comment ?? '') : '', doc });
      }
    }
    // valores padrão na desestruturação das props: ({ size = "md", loading = false })
    if (ts.isBindingElement(n) && n.initializer && ts.isIdentifier(n.name) && ts.isObjectBindingPattern(n.parent) && ts.isParameter(n.parent.parent))
      defaultsParam[n.name.text] = n.initializer.getText(sf);
    if (ts.isJsxAttribute(n)) {
      const a = n.name.getText(sf);
      if (/^(aria-|data-|role$)/.test(a)) atributos.add(a);
    }
    if (ts.isJsxAttribute(n) && n.name.getText(sf) === 'className' && n.initializer) classes += ' ' + strings(n.initializer);
  });
}

// Estados que o CSS trata (prefixos das classes), para cruzar com a propriedade State do Figma.
const estados = {};
for (const c of classes.split(/\s+/)) {
  const m = c.match(/^((?:[a-z-]+(?:-\[[^\]]+\])?:)+)/);
  if (!m) continue;
  for (const pre of m[1].split(':').filter(Boolean)) {
    if (/^(sm|md|lg|xl|2xl|dark|print|rtl|ltr|motion-safe|motion-reduce)$/.test(pre)) continue;
    estados[pre] = (estados[pre] || 0) + 1;
  }
}
// Componentes exportados com nome em PascalCase: são as tags procuradas no JSX.
const tags = [...exportados].filter(x => /^[A-Z]/.test(x) && !/Variants$|Props$|Styles$/.test(x));

// ---------- 2. Stories e uso no repositório ----------
const historias = [];
const usos = {};      // tag -> prop -> valor -> { n, arquivos:Set }
const dentroDe = {};  // outro componente que usa este -> arquivos
const nomeTag = t => t.getText();
const registra = (tag, prop, valor, arq) => {
  const u = ((usos[tag] ??= {})[prop] ??= {});
  (u[valor] ??= { n: 0, arquivos: new Set() }).n++;
  u[valor].arquivos.add(arq);
};
const alvo = [...ls(`${STORIES}/`).filter(p => p.endsWith('.stories.tsx')), ...ls(`${COMP}/`).filter(p => p.endsWith('.tsx') && !p.startsWith(`${COMP}/${nome}/`) && !/\.test\./.test(p))];
const reImport = new RegExp(`(components/${nome}|prizm-ui/${nome})['"/]`);
for (const p of alvo) {
  const txt = show(p);
  const ehStoryPropria = p.endsWith(`/${nome}.stories.tsx`);
  if (!ehStoryPropria && !reImport.test(txt) && !tags.some(t => txt.includes(`<${t}`))) continue;
  const sf = parse(p, txt);
  if (p.startsWith(COMP)) (dentroDe[p.split('/')[5]] ??= new Set()).add(basename(p));
  let meta = null;
  const nomesStory = [];
  // const VARIANTS = ["a", "b"] as const: os controles do Storybook costumam apontar para eles
  const arrays = {};
  const semAs = e => (ts.isAsExpression(e) || (ts.isSatisfiesExpression && ts.isSatisfiesExpression(e))) ? semAs(e.expression) : e;
  walk(sf, n => { if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && ts.isArrayLiteralExpression(semAs(n.initializer))) arrays[n.name.text] = semAs(n.initializer); });
  const valores = e => { e = e && semAs(e); if (!e) return null; if (ts.isIdentifier(e)) return arrays[e.text] ? valores(arrays[e.text]) : null; if (!ts.isArrayLiteralExpression(e)) return null; const r = []; for (const el of e.elements) { if (ts.isSpreadElement(el)) { const v = valores(el.expression); if (!v) return null; r.push(...v); } else { const t = lit(el); if (t == null) return null; r.push(t); } } return r; };
  walk(sf, n => {
    if ((ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) && tags.includes(nomeTag(n.tagName))) {
      const tag = nomeTag(n.tagName);
      for (const a of n.attributes.properties) {
        if (!ts.isJsxAttribute(a) || ['className', 'children', 'key', 'ref'].includes(a.name.getText(sf))) continue;
        let v = '(expressão)';
        if (!a.initializer) v = 'true';
        else if (ts.isStringLiteral(a.initializer)) v = a.initializer.text;
        else if (ts.isJsxExpression(a.initializer) && a.initializer.expression) {
          const e = a.initializer.expression;
          v = lit(e) ?? (e.kind === ts.SyntaxKind.TrueKeyword ? 'true' : e.kind === ts.SyntaxKind.FalseKeyword ? 'false' : ts.isNumericLiteral(e) ? e.text : '(expressão)');
        }
        registra(tag, a.name.getText(sf), v, basename(p));
      }
    }
    if (ehStoryPropria && ts.isVariableDeclaration(n) && n.name.getText(sf) === 'meta' && n.initializer) {
      const o = ts.isObjectLiteralExpression(n.initializer) ? n.initializer : ts.isSatisfiesExpression?.(n.initializer) || ts.isAsExpression(n.initializer) ? n.initializer.expression : null;
      if (o && ts.isObjectLiteralExpression(o)) {
        meta = { titulo: '', argTypes: {}, args: {} };
        for (const pr of o.properties) if (ts.isPropertyAssignment(pr)) {
          const k = keyOf(pr);
          if (k === 'title') meta.titulo = lit(pr.initializer) ?? '';
          if (k === 'argTypes' && ts.isObjectLiteralExpression(pr.initializer))
            for (const at of pr.initializer.properties) if (ts.isPropertyAssignment(at) && ts.isObjectLiteralExpression(at.initializer)) {
              const ops = at.initializer.properties.find(x => keyOf(x) === 'options');
              meta.argTypes[keyOf(at)] = ops ? (valores(ops.initializer) ?? '(não resolvido: ' + ops.initializer.getText(sf).slice(0, 60) + ')') : '(sem options)';
            }
          if (k === 'args' && ts.isObjectLiteralExpression(pr.initializer))
            for (const a of pr.initializer.properties) if (ts.isPropertyAssignment(a)) meta.args[keyOf(a)] = lit(a.initializer) ?? a.initializer.getText(sf);
        }
      }
    }
    if (ehStoryPropria && ts.isVariableStatement(n) && n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))
      n.declarationList.declarations.forEach(d => nomesStory.push(d.name.getText(sf)));
  });
  if (ehStoryPropria) historias.push({ arquivo: basename(p), ...(meta ?? { titulo: '', argTypes: {}, args: {} }), stories: nomesStory });
}

// ---------- 3. Storybook publicado ----------
let indice = null;
if (!semStorybook && historias.length) {
  try {
    const r = await fetch(storybook + 'index.json', { signal: AbortSignal.timeout(15000) });
    if (r.ok) indice = (await r.json()).entries;
  } catch { /* sem rede: fica só com o repositório */ }
}
const titulos = new Set(historias.map(h => h.titulo).filter(Boolean));
const publicadas = indice ? Object.values(indice).filter(e => titulos.has(e.title)) : [];

// ---------- 4. Paridade com o Figma ----------
const norm = s => String(s).toLowerCase().replace(/#.*$/, '').replace(/[\s_]+/g, '-').trim();
const ESTADO_CSS = { hover: ['hover'], focus: ['focus-visible', 'focus'], 'focus-visible': ['focus-visible'], pressed: ['active'], active: ['active'], disabled: ['disabled', 'aria-disabled'], loading: ['aria-busy', 'aria-disabled'], error: ['aria-invalid'], invalid: ['aria-invalid'], checked: ['data-[state=checked]'], open: ['data-[state=open]'], selected: ['data-[state=active]', 'aria-selected'] };
let paridade = null;
if (figmaFile) {
  const bruto = JSON.parse(readFileSync(figmaFile, 'utf8'));
  const defs = bruto.propriedades ?? bruto; // saída do propriedades-figma.js ou só as definições
  const codigo = {};
  const rotulo = {};
  for (const c of cvas) for (const [k, v] of Object.entries(c.variants)) { codigo[norm(k)] ??= new Set(v.map(norm)); rotulo[norm(k)] ??= k; }
  for (const pr of props) if (pr.nome !== '(herda)' && (rotulo[norm(pr.nome)] ??= pr.nome)) codigo[norm(pr.nome)] ??= new Set(((pr.tipoTexto.match(/"([^"]+)"/g) ?? []).map(x => norm(x.slice(1, -1)))));
  paridade = [];
  const vistos = new Set();
  for (const [k, d] of Object.entries(defs)) {
    const nk = norm(k);
    const estado = /^(state|estado|states)$/.test(nk);
    if (d.type === 'VARIANT') {
      for (const op of d.variantOptions ?? []) {
        const no = norm(op);
        let noCodigo;
        if (estado) noCodigo = no === 'default' || (ESTADO_CSS[no] ?? [no]).some(e => estados[e] || atributos.has(e) || props.some(p => norm(p.nome) === no)) ? 'sim (CSS ou atributo)' : 'não';
        else noCodigo = codigo[nk] ? (codigo[nk].has(no) ? 'sim' : 'não') : 'propriedade não existe';
        paridade.push({ propriedade: k, valor: op, figma: 'sim', codigo: noCodigo });
      }
      vistos.add(nk);
    } else paridade.push({ propriedade: k, valor: `(${d.type})`, figma: 'sim', codigo: codigo[nk] ? 'sim' : 'conferir à mão' });
  }
  for (const [k, ops] of Object.entries(codigo)) {
    if (!vistos.has(k)) { if (ops.size) for (const o of ops) paridade.push({ propriedade: rotulo[k], valor: o, figma: 'não', codigo: 'sim' }); else paridade.push({ propriedade: rotulo[k], valor: '(prop)', figma: Object.keys(defs).some(d => norm(d).startsWith(k)) ? 'conferir à mão' : 'não', codigo: 'sim' }); continue; }
    const fig = new Set((Object.entries(defs).find(([d]) => norm(d) === k)?.[1].variantOptions ?? []).map(norm));
    for (const o of ops) if (!fig.has(o)) paridade.push({ propriedade: rotulo[k], valor: o, figma: 'não', codigo: 'sim' });
  }
  for (const [e] of Object.entries(estados)) {
    const nomeFigma = Object.entries(ESTADO_CSS).find(([, v]) => v.includes(e))?.[0];
    if (nomeFigma && !paridade.some(p => /^(state|estado)/i.test(p.propriedade) && Object.entries(ESTADO_CSS).some(([f, v]) => norm(p.valor) === f && v.includes(e))))
      paridade.push({ propriedade: 'State', valor: nomeFigma, figma: 'não', codigo: `sim (${e}:)` });
  }
}

// ---------- Saída ----------
const L = [];
const tabela = (cab, linhas) => { L.push(`| ${cab.join(' | ')} |`, `| ${cab.map(() => '---').join(' | ')} |`, ...linhas.map(l => `| ${l.join(' | ')} |`), ''); };
const sha = git('rev-parse', '--short', ref).trim();
L.push(`# Inventário de uso · ${nome}`, '', `Lido de \`${ref}\` (${sha}) em ${new Date().toISOString().slice(0, 10)}. Arquivos: ${fontes.map(f => basename(f)).join(', ')}.`, '');
L.push('## Variantes do código (cva)', '');
if (!cvas.length) L.push('Nenhum `cva` no componente. Confira as props e as classes à mão.', '');
for (const c of cvas) {
  L.push(`### \`${c.nome}\` (${c.arquivo})`, '');
  tabela(['Propriedade', 'Valores', 'Padrão'], Object.entries(c.variants).map(([k, v]) => [`\`${k}\``, v.map(x => `\`${x}\``).join(', '), c.defaults[k] ? `\`${c.defaults[k]}\`` : (defaultsParam[k] ? `\`${defaultsParam[k]}\` (na função)` : '—')]));
  if (c.compounds.length) {
    const eixos = [...new Set(c.compounds.flatMap(Object.keys))];
    L.push(`${c.compounds.length} combinações em \`compoundVariants\`, sobre ${eixos.map(e => `\`${e}\``).join(' × ')}. Cada combinação tem estilo próprio: confira se tem par no Figma ou uma decisão.`, '');
  }
}
L.push('## Props', '');
tabela(['Tipo', 'Prop', 'Tipo TS', 'Padrão', 'Descrição'], props.map(p => [p.tipo, `\`${p.nome}\`${p.opcional ? '' : ' (obrigatória)'}`, `\`${p.tipoTexto.replace(/\|/g, '\\|')}\``, p.padrao || defaultsParam[p.nome] || '', p.doc.slice(0, 120)]));
L.push('## Estados tratados no CSS e atributos', '');
tabela(['Prefixo', 'Classes'], Object.entries(estados).sort((a, b) => b[1] - a[1]).map(([k, v]) => [`\`${k}:\``, String(v)]));
if (atributos.size) L.push(`Atributos no JSX: ${[...atributos].map(a => `\`${a}\``).join(', ')}.`, '');
L.push('## Stories', '');
if (!historias.length) L.push('Nenhuma story própria. O uso vem só do código e dos outros componentes.', '');
for (const h of historias) {
  L.push(`### ${h.titulo || h.arquivo} (\`${h.arquivo}\`)`, '', `Stories: ${h.stories.join(', ') || '—'}.`, '');
  const ctrl = Object.entries(h.argTypes);
  if (ctrl.length) tabela(['Controle', 'Opções no Storybook'], ctrl.map(([k, v]) => [`\`${k}\``, Array.isArray(v) ? v.map(x => `\`${x}\``).join(', ') : v]));
  if (h.arquivo === `${nome}.stories.tsx`) for (const c of cvas) for (const [k, v] of Object.entries(c.variants)) {
    const no = h.argTypes[k];
    if (!no) L.push(`- \`${k}\` não tem controle no Storybook.`);
    else if (Array.isArray(no)) { const falta = v.filter(x => !no.includes(x)); if (falta.length) L.push(`- Controle \`${k}\` sem ${falta.map(x => `\`${x}\``).join(', ')} (existe no código).`); }
  }
  L.push('');
}
if (indice) {
  L.push(`Publicadas em ${storybook} (${publicadas.length}):`, '');
  for (const e of publicadas) L.push(`- ${e.title} › ${e.name} (${e.type}): ${storybook}?path=/${e.type === 'docs' ? 'docs' : 'story'}/${e.id}`);
  L.push('');
} else if (!semStorybook) L.push(`Storybook publicado não respondeu (${storybook}index.json). Inventário feito só do repositório.`, '');
L.push('## Valores usados no repositório (JSX em stories e componentes)', '');
const linhasUso = [];
for (const [tag, ps] of Object.entries(usos)) for (const [p, vs] of Object.entries(ps)) for (const [v, i] of Object.entries(vs)) linhasUso.push([tag, `\`${p}\``, `\`${v}\``, String(i.n), [...i.arquivos].join(', ')]);
if (linhasUso.length) tabela(['Componente', 'Prop', 'Valor', 'Usos', 'Arquivos'], linhasUso); else L.push('Nenhum uso em JSX fora do próprio componente.', '');
const usadosCodigo = new Set(linhasUso.map(l => `${l[1]}=${l[2]}`));
const semUso = cvas.flatMap(c => Object.entries(c.variants).flatMap(([k, v]) => v.filter(x => !usadosCodigo.has(`\`${k}\`=\`${x}\``)).map(x => `\`${k}="${x}"\``)));
if (semUso.length) L.push(`Valores do código sem nenhum uso literal nas stories ou nos componentes: ${semUso.join(', ')}. Podem estar em uso nos produtos: ao decidir remover, conte com a migração.`, '');
if (Object.keys(dentroDe).length) L.push('## Usado dentro de outros componentes', '', ...Object.entries(dentroDe).map(([c, a]) => `- \`${c}\`: ${[...a].join(', ')}`), '');
if (paridade) {
  L.push('## Paridade Figma × código', '');
  const dif = paridade.filter(p => p.figma !== 'sim' || !/^sim/.test(p.codigo));
  tabela(['Propriedade', 'Valor', 'Figma', 'Código'], dif.map(p => [p.propriedade, `\`${p.valor}\``, p.figma, p.codigo]));
  L.push(`${paridade.length - dif.length} valores batem. ${dif.length} diferenças acima.`, '');
}
console.log(L.join('\n'));
if (out) {
  const json = { componente: nome, ref, commit: sha, data: new Date().toISOString().slice(0, 10), cva: cvas, props, padroesNaFuncao: defaultsParam, estados, atributos: [...atributos], historias, storybook: indice ? publicadas.map(e => ({ id: e.id, titulo: e.title, nome: e.name, tipo: e.type })) : null, usos: Object.fromEntries(Object.entries(usos).map(([t, ps]) => [t, Object.fromEntries(Object.entries(ps).map(([p, vs]) => [p, Object.fromEntries(Object.entries(vs).map(([v, i]) => [v, { n: i.n, arquivos: [...i.arquivos] }]))]))])), dentroDe: Object.fromEntries(Object.entries(dentroDe).map(([k, v]) => [k, [...v]])), paridade };
  writeFileSync(out, JSON.stringify(json, null, 2));
  console.error(`Inventário gravado em ${out}`);
}
