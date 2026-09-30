// Compara duas versões do tokens.json (export do Tokens Studio) e resume o que
// mudou, token a token, por set.
//
// Uso: node tokens-diff.mjs <base.json> <head.json> [saida.json]
//
// A saída (padrão: tokens-diff.json) é usada por dois workflows:
// - design-tokens-notifications.yml: `summary`, `themesChanged` e `blocks`
//   (elementos de Adaptive Card para o Teams);
// - tokens-studio-pr.yml: `markdown` (seção gerada do corpo da PR).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const MAX_CARD_ITEMS = 5;
const MAX_PR_ITEMS = 50;

// Categorias do template de tokens, a partir do $type. Breakpoints são
// dimensões comuns, identificadas pelo caminho (breakpoint.*).
const CATEGORY_BY_TYPE = {
  color: 'Color',
  typography: 'Typography',
  fontFamilies: 'Typography',
  fontSizes: 'Typography',
  fontWeights: 'Typography',
  lineHeights: 'Typography',
  letterSpacing: 'Typography',
  spacing: 'Spacing',
  sizing: 'Size',
  dimension: 'Size',
  borderWidth: 'Border',
  boxShadow: 'Shadow',
  borderRadius: 'Border Radius',
  opacity: 'Opacity',
};
const CATEGORIES = ['Color', 'Typography', 'Spacing', 'Size', 'Border', 'Shadow', 'Border Radius', 'Breakpoint', 'Opacity', 'Outro'];

// Camadas da arquitetura de tokens, pelo prefixo do set. Todo set fora de
// global/ é de marca ou produto (ex.: pas/base/colors, pas/cockpit).
const LAYERS = [
  ['global/primitives', 'Primitive'],
  ['global/foundations', 'Foundation'],
  ['global/mode', 'Mode'],
  ['global/platform', 'Platform'],
];

// Token no formato W3C DTCG ($value/$type) ou no formato antigo do Tokens
// Studio (value/type), normalizado para { type, value, legacy }.
export function asToken(node) {
  if ('$value' in node) return { type: node.$type, value: node.$value, legacy: false };
  if ('value' in node && ('type' in node || typeof node.value !== 'object')) {
    return { type: node.type, value: node.value, legacy: true };
  }
  return null;
}

// Sets do Tokens Studio: chaves que não começam com "$" ($themes,
// $metadata). Cada set vira um Map "caminho.do.token" -> token.
export function tokenSets(file) {
  const sets = new Map();
  const walk = (out, node, segments) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    const token = asToken(node);
    if (token) return out.set(segments.join('.'), token);
    for (const [key, child] of Object.entries(node)) walk(out, child, [...segments, key]);
  };
  for (const [set, tree] of Object.entries(file)) {
    if (set.startsWith('$')) continue;
    const tokens = new Map();
    walk(tokens, tree, []);
    sets.set(set, tokens);
  }
  return sets;
}

export function diffTokens(base, head) {
  const before = tokenSets(base);
  const after = tokenSets(head);
  const signature = (token) => JSON.stringify([token.type, token.value]);

  // Sets criados/apagados (ou renomeados) aparecem como sets, não token a
  // token.
  const setsAdded = [...after.keys()].filter((set) => !before.has(set));
  const setsRemoved = [...before.keys()].filter((set) => !after.has(set));

  const added = [];
  const removed = [];
  const changed = [];
  for (const [set, tokens] of after) {
    const old = before.get(set);
    if (!old) continue;
    for (const [path, token] of tokens) {
      if (!old.has(path)) added.push({ set, path, token });
      else if (signature(old.get(path)) !== signature(token)) changed.push({ set, path, token, old: old.get(path) });
    }
    for (const [path, token] of old) {
      if (!tokens.has(path)) removed.push({ set, path, token });
    }
  }

  // O nome da variável gerada vem do caminho do token, não do set: só quebra
  // quem consome se o caminho sumir de todos os sets.
  const pathsIn = (sets) => new Set([...sets.values()].flatMap((tokens) => [...tokens.keys()]));
  const pathsAfter = pathsIn(after);
  const vanished = [...pathsIn(before)].filter((path) => !pathsAfter.has(path));

  // O build.mjs só lê W3C DTCG: tokens no formato antigo quebram o build.
  const legacyCount = [...after.values()].reduce(
    (count, tokens) => count + [...tokens.values()].filter((token) => token.legacy).length, 0);

  const themesChanged = JSON.stringify(base.$themes ?? null) !== JSON.stringify(head.$themes ?? null);

  return { before, after, added, removed, changed, setsAdded, setsRemoved, vanished, legacyCount, themesChanged };
}

// ---------------------------------------------------------------------------
// Resumo e card do Teams
// ---------------------------------------------------------------------------

const short = (value) => (typeof value === 'string' && value.length <= 40 ? value : null);
const key = ({ set, path }) => `${set} › ${path}`;

function describeChange(change) {
  const [from, to] = [short(change.old.value), short(change.token.value)];
  return from && to ? `${key(change)}: ${from} → ${to}` : key(change);
}

export function summarize(diff) {
  const { added, changed, removed, setsAdded, setsRemoved } = diff;
  const parts = [];
  if (added.length + changed.length + removed.length > 0) {
    parts.push(`+${added.length} adicionados · ~${changed.length} alterados · −${removed.length} removidos`);
  }
  if (setsAdded.length + setsRemoved.length > 0) {
    parts.push(`sets: +${setsAdded.length} / −${setsRemoved.length}`);
  }
  return parts.length > 0 ? parts.join(' · ') : 'nenhum valor alterado';
}

const LEGACY_WARNING = (count) =>
  `tokens.json está no formato antigo do Tokens Studio (value/type) em ${count} token(s), e o build espera W3C DTCG ($value/$type). No Tokens Studio, converta para W3C DTCG e faça push de novo.`;
const VANISHED_WARNING = (count) =>
  `${count} token(s) deixaram de existir em todos os sets: isso pode quebrar quem usa as variáveis geradas.`;

// A lista de tokens que deixaram de existir só acrescenta algo quando difere
// dos removidos (ex.: token removido de um set, mas mantido em outro; ou set
// inteiro removido). Quando os dois têm os mesmos tokens, fica só "Removidos"
// e o aviso.
const vanishedToList = ({ vanished, removed }) => {
  const removedPaths = new Set(removed.map(({ path }) => path));
  const sameTokens = vanished.length === removedPaths.size && vanished.every((path) => removedPaths.has(path));
  return sameTokens ? [] : vanished;
};

export function cardBlocks(diff) {
  const section = (title, items, color) => items.length === 0 ? [] : [
    { type: 'TextBlock', text: `${title} (${items.length})`, weight: 'Bolder', color, wrap: true, spacing: 'Medium' },
    ...items.slice(0, MAX_CARD_ITEMS).map((text) => ({ type: 'TextBlock', text, fontType: 'Monospace', size: 'Small', wrap: true, spacing: 'None' })),
    ...(items.length > MAX_CARD_ITEMS
      ? [{ type: 'TextBlock', text: `… e mais ${items.length - MAX_CARD_ITEMS}`, size: 'Small', isSubtle: true, spacing: 'None' }]
      : []),
  ];
  const warning = (text) => ({ type: 'TextBlock', text: `⚠️ ${text}`, color: 'Attention', weight: 'Bolder', wrap: true, spacing: 'Medium' });

  return [
    ...(diff.legacyCount > 0 ? [warning(LEGACY_WARNING(diff.legacyCount))] : []),
    ...(diff.vanished.length > 0 ? [warning(VANISHED_WARNING(diff.vanished.length))] : []),
    ...section('Tokens que deixaram de existir', vanishedToList(diff), 'Attention'),
    ...section('Sets criados', diff.setsAdded, 'Good'),
    ...section('Sets removidos', diff.setsRemoved, 'Warning'),
    ...section('Adicionados', diff.added.map(key), 'Good'),
    ...section('Alterados', diff.changed.map(describeChange), 'Accent'),
    ...section('Removidos', diff.removed.map(key), 'Warning'),
  ];
}

// ---------------------------------------------------------------------------
// Seção gerada da PR (template de tokens)
// ---------------------------------------------------------------------------

const categoryOf = ({ path, token }) =>
  /^breakpoint(\.|$)/.test(path) ? 'Breakpoint' : (CATEGORY_BY_TYPE[token.type] ?? 'Outro');

const layerOf = (set) =>
  LAYERS.find(([prefix]) => set.startsWith(prefix))?.[1] ?? (set.startsWith('global/') ? 'Outro' : 'Marca · Produto');

const checkbox = (checked, label) => `- [${checked ? 'x' : ' '}] ${label}`;

// Valor em uma célula de tabela: objetos (typography, shadow) viram JSON
// curto; "|" e quebras de linha escapados.
function cell(value) {
  if (value === undefined) return '';
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  const clipped = text.length > 80 ? `${text.slice(0, 77)}…` : text;
  return `\`${clipped.replace(/\|/g, '\\|').replace(/\n/g, ' ')}\``;
}

function table(title, rows, header, toRow) {
  if (rows.length === 0) return [];
  const lines = rows.slice(0, MAX_PR_ITEMS).map((row) => `| ${toRow(row).join(' | ')} |`);
  const more = rows.length > MAX_PR_ITEMS ? [``, `… e mais ${rows.length - MAX_PR_ITEMS}.`] : [];
  return [
    `<details${rows.length <= 10 ? ' open' : ''}><summary><b>${title} (${rows.length})</b></summary>`,
    '',
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...lines,
    ...more,
    '',
    '</details>',
    '',
  ];
}

// Temas (Marca · Produto, Mode, Plataforma) que usam algum dos sets
// alterados, conforme o $themes do export. As dimensões são combinadas entre
// si: se nenhum tema de um grupo usa os sets alterados (ex.: uma mudança só
// em global/mode/dark não aparece nos temas de marca), a mudança vale para
// todas as opções desse grupo.
function scope(head, changedSets) {
  const groups = new Map();
  for (const theme of head.$themes ?? []) {
    const uses = Object.entries(theme.selectedTokenSets ?? {})
      .some(([set, status]) => status !== 'disabled' && changedSets.has(set));
    if (!groups.has(theme.group)) groups.set(theme.group, []);
    groups.get(theme.group).push({ name: theme.name, uses });
  }
  for (const [group, themes] of groups) {
    const independent = changedSets.size > 0 && !themes.some(({ uses }) => uses);
    groups.set(group, { independent, themes: themes.map((theme) => ({ ...theme, uses: theme.uses || independent })) });
  }
  return groups;
}

export function prMarkdown(diff, head) {
  const { added, changed, removed, setsAdded, setsRemoved, vanished, legacyCount } = diff;
  const tokenChanges = [...added, ...changed, ...removed];
  const changedSets = new Set([...tokenChanges.map(({ set }) => set), ...setsAdded, ...setsRemoved]);
  const categories = new Set(tokenChanges.map(categoryOf));
  for (const set of [...setsAdded, ...setsRemoved]) {
    const tokens = (setsAdded.includes(set) ? diff.after : diff.before).get(set) ?? new Map();
    for (const [path, token] of tokens) categories.add(categoryOf({ path, token }));
  }

  const lines = [`**${summarize(diff)}**`, ''];
  if (legacyCount > 0) lines.push(`> [!CAUTION]`, `> ${LEGACY_WARNING(legacyCount)}`, '');
  if (vanished.length > 0) lines.push(`> [!WARNING]`, `> ${VANISHED_WARNING(vanished.length)}`, '');

  lines.push(
    '### Tipo de solicitação (inferido)',
    checkbox(added.length + setsAdded.length > 0, 'Novo token'),
    checkbox(changed.length > 0, 'Modificação'),
    checkbox(false, 'Depreciação _(marque manualmente se for o caso)_'),
    checkbox(removed.length + setsRemoved.length > 0, 'Remoção'),
    '',
    '### Categoria (inferida pelo `$type`)',
    ...CATEGORIES.filter((category) => category !== 'Outro' || categories.has('Outro'))
      .map((category) => checkbox(categories.has(category), category)),
    '',
    '### Escopo (inferido pelos temas que usam os sets alterados)',
  );
  for (const [group, { independent, themes }] of scope(head, changedSets)) {
    lines.push(
      `**${group}:**${independent ? ' _(todas: os sets alterados valem para qualquer opção deste grupo)_' : ''}`,
      ...themes.map(({ name, uses }) => checkbox(uses, name)),
      '',
    );
  }

  const byLayer = new Map();
  for (const set of [...changedSets].sort()) {
    const layer = layerOf(set);
    if (!byLayer.has(layer)) byLayer.set(layer, []);
    byLayer.get(layer).push(`\`${set}\``);
  }
  lines.push('### Camada (set)');
  if (byLayer.size === 0) lines.push('_Nenhum set alterado._');
  for (const [layer, sets] of byLayer) lines.push(`- **${layer}:** ${sets.join(', ')}`);
  lines.push('', '### Tokens', '');

  lines.push(
    ...table('Tokens que deixaram de existir em todos os sets', vanishedToList(diff), ['Token'], (path) => [`\`${path}\``]),
    ...table('Sets criados', setsAdded, ['Set'], (set) => [`\`${set}\``]),
    ...table('Sets removidos', setsRemoved, ['Set'], (set) => [`\`${set}\``]),
    ...table('Adicionados', added, ['Token', 'Set', 'Tipo', 'Valor'],
      ({ path, set, token }) => [`\`${path}\``, `\`${set}\``, token.type ?? '', cell(token.value)]),
    ...table('Alterados', changed, ['Token', 'Set', 'Antes', 'Depois'],
      ({ path, set, token, old }) => [`\`${path}\``, `\`${set}\``, cell(old.value), cell(token.value)]),
    ...table('Removidos', removed, ['Token', 'Set', 'Valor'],
      ({ path, set, token }) => [`\`${path}\``, `\`${set}\``, cell(token.value)]),
  );
  if (tokenChanges.length + setsAdded.length + setsRemoved.length === 0) lines.push('_Nenhum token alterado._', '');

  return lines.join('\n').trimEnd();
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [basePath, headPath, outPath = 'tokens-diff.json'] = process.argv.slice(2);
  if (!basePath || !headPath) {
    console.error('Uso: node tokens-diff.mjs <base.json> <head.json> [saida.json]');
    process.exit(2);
  }
  const read = (file) => JSON.parse(readFileSync(file, 'utf8'));
  const base = read(basePath);
  const head = read(headPath);
  const diff = diffTokens(base, head);
  const summary = summarize(diff);

  writeFileSync(outPath, JSON.stringify({
    summary,
    themesChanged: diff.themesChanged,
    legacyCount: diff.legacyCount,
    vanished: diff.vanished,
    blocks: cardBlocks(diff),
    markdown: prMarkdown(diff, head),
  }));
  console.log(summary
    + (diff.themesChanged ? ' · $themes alterado' : '')
    + (diff.legacyCount ? ` · ${diff.legacyCount} tokens no formato antigo` : ''));
}
