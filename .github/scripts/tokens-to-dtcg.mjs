// Converte o tokens.json do formato antigo do Tokens Studio (value/type/
// description) para W3C DTCG ($value/$type/$description), no próprio arquivo.
//
// Só as chaves do nível do token são renomeadas: o conteúdo de value fica
// intacto (ex.: o "type": "dropShadow" dentro de uma sombra continua igual).
// A ordem das chaves e a formatação seguem o que o Tokens Studio grava em
// DTCG ($type, $value, $description, depois o resto; 2 espaços; sem quebra de
// linha no fim), para o arquivo convertido ser igual ao que o plugin geraria.
//
// Uso: node tokens-to-dtcg.mjs <tokens.json>
// Imprime quantos tokens foram convertidos (0 se o arquivo já está em DTCG).
import { readFileSync, writeFileSync } from 'node:fs';
import { asToken } from './tokens-diff.mjs';

const RENAMED = { type: '$type', value: '$value', description: '$description' };
const DTCG_ORDER = ['$type', '$value', '$description'];

let converted = 0;

function convertToken(node) {
  const renamed = Object.fromEntries(Object.entries(node).map(([key, value]) => [RENAMED[key] ?? key, value]));
  const ordered = {};
  for (const key of DTCG_ORDER) if (key in renamed) ordered[key] = renamed[key];
  for (const [key, value] of Object.entries(renamed)) if (!(key in ordered)) ordered[key] = value;
  converted += 1;
  return ordered;
}

function convert(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return node;
  const token = asToken(node);
  if (token) return token.legacy ? convertToken(node) : node;
  return Object.fromEntries(Object.entries(node).map(([key, child]) => [key, convert(child)]));
}

const file = process.argv[2];
if (!file) {
  console.error('Uso: node tokens-to-dtcg.mjs <tokens.json>');
  process.exit(2);
}

const tokens = JSON.parse(readFileSync(file, 'utf8'));
// $themes e $metadata não são sets de tokens e ficam como estão.
const result = Object.fromEntries(Object.entries(tokens).map(([key, value]) => [key, key.startsWith('$') ? value : convert(value)]));

if (converted > 0) writeFileSync(file, JSON.stringify(result, null, 2));
console.log(converted);
