// Verifica se o tokens.json está no formato que o build.mjs lê (W3C DTCG,
// $value/$type). Sai com código 1 se houver tokens no formato antigo do
// Tokens Studio (value/type) ou se nenhum token for encontrado.
//
// Uso: node tokens-check.mjs <tokens.json>
import { readFileSync } from 'node:fs';
import { tokenSets } from './tokens-diff.mjs';

const file = process.argv[2];
if (!file) {
  console.error('Uso: node tokens-check.mjs <tokens.json>');
  process.exit(2);
}

const sets = tokenSets(JSON.parse(readFileSync(file, 'utf8')));
let dtcg = 0;
const legacyBySet = new Map();
for (const [set, tokens] of sets) {
  for (const token of tokens.values()) {
    if (token.legacy) legacyBySet.set(set, (legacyBySet.get(set) ?? 0) + 1);
    else dtcg += 1;
  }
}

const legacy = [...legacyBySet.values()].reduce((sum, count) => sum + count, 0);
if (legacy > 0) {
  console.log(`::error file=${file}::${legacy} token(s) no formato antigo do Tokens Studio (value/type). O build espera W3C DTCG ($value/$type): no Tokens Studio, converta para W3C DTCG e faça push de novo.`);
  for (const [set, count] of legacyBySet) console.log(`  ${set}: ${count}`);
  process.exit(1);
}
if (dtcg === 0) {
  console.log(`::error file=${file}::Nenhum token encontrado em ${file}.`);
  process.exit(1);
}
console.log(`OK: ${dtcg} tokens em W3C DTCG, em ${sets.size} sets.`);
