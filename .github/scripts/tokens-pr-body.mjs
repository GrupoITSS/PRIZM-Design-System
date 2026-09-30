// Monta o corpo da PR de tokens. A seção entre os marcadores AUTO_START e
// AUTO_END é gerada a partir do diff e reescrita a cada sync; todo o resto
// (o que alguém escreveu no template) é preservado.
//
// Uso: node tokens-pr-body.mjs <tokens-diff.json> <template.md> <corpo-atual.md> <contexto>
// Escreve o novo corpo na saída padrão.
import { readFileSync } from 'node:fs';

const AUTO_START = '<!-- tokens-auto:start -->';
const AUTO_END = '<!-- tokens-auto:end -->';

const [diffPath, templatePath, currentPath, context = ''] = process.argv.slice(2);
if (!diffPath || !templatePath || !currentPath) {
  console.error('Uso: node tokens-pr-body.mjs <tokens-diff.json> <template.md> <corpo-atual.md> <contexto>');
  process.exit(2);
}

const { markdown } = JSON.parse(readFileSync(diffPath, 'utf8'));
const current = readFileSync(currentPath, 'utf8');

const auto = [
  AUTO_START,
  '> Seção gerada automaticamente a partir do `tokens.json` a cada sync do Tokens Studio na branch `design`. Ela é reescrita no próximo sync: edite só as seções abaixo dela.',
  '',
  context,
  '',
  markdown,
  AUTO_END,
].join('\n');

const start = current.indexOf(AUTO_START);
const end = current.indexOf(AUTO_END);

let body;
if (start !== -1 && end > start) {
  body = current.slice(0, start) + auto + current.slice(end + AUTO_END.length);
} else {
  const rest = current.trim() || readFileSync(templatePath, 'utf8').trim();
  body = `${auto}\n\n${rest}\n`;
}

process.stdout.write(body);
