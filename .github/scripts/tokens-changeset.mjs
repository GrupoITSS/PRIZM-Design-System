// Gera o changeset de @grupoitss/prizm-tokens quando o tokens.json mudou desde
// a última versão publicada. Os syncs do Tokens Studio não criam changesets,
// então sem isto os tokens nunca ganhariam versão nova.
//
// Uso (na raiz do repositório, antes do changesets/action): node .github/scripts/tokens-changeset.mjs
//
// O tipo da versão vem do diff (tokens-diff.mjs):
// - major: algum token deixou de existir em todos os sets (quebra quem usa a variável);
// - minor: token, set ou tema novo;
// - patch: só valores alterados.
//
// Não gera nada quando:
// - a versão atual do package.json ainda não foi publicada (a PR de versão
//   acabou de entrar e a publicação vem em seguida);
// - já existe um changeset pendente para o pacote (escrito à mão ou por uma
//   execução anterior que ainda está na PR de versão).
// Rodar de novo é seguro: o changeset é recalculado a partir da última tag.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { diffTokens, summarize } from './tokens-diff.mjs';

const PACKAGE = '@grupoitss/prizm-tokens';
const TOKENS_FILE = 'design-system/packages/tokens/src/tokens-studio/tokens.json';
const PACKAGE_JSON = 'design-system/packages/tokens/package.json';
const CHANGESET_DIR = 'design-system/.changeset';
const CHANGESET_FILE = path.join(CHANGESET_DIR, 'tokens-figma.md');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

const { version } = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
const tag = `${PACKAGE}@${version}`;

if (!git('tag', '--list', tag)) {
  console.log(`${tag} ainda não foi publicada: nada a gerar.`);
  process.exit(0);
}

const pending = readdirSync(CHANGESET_DIR)
  .filter((file) => file.endsWith('.md') && file !== 'README.md')
  .some((file) => readFileSync(path.join(CHANGESET_DIR, file), 'utf8').includes(`"${PACKAGE}"`));
if (pending) {
  console.log(`Já existe um changeset pendente para ${PACKAGE}.`);
  process.exit(0);
}

// Primitivos nunca vão para a saída (só resolvem valores): renomear ou apagar
// um primitivo não quebra quem consome. Ficam fora do diff; se a troca mudar
// um valor emitido, isso aparece no token que o referencia.
const PRIMITIVES_SET = 'global/primitives';
const withoutPrimitives = (file) => {
  const { [PRIMITIVES_SET]: _primitives, ...rest } = file;
  return rest;
};
const base = withoutPrimitives(JSON.parse(git('show', `${tag}:${TOKENS_FILE}`)));
const head = withoutPrimitives(JSON.parse(readFileSync(TOKENS_FILE, 'utf8')));
const diff = diffTokens(base, head);

const hasChanges =
  diff.added.length + diff.changed.length + diff.removed.length + diff.setsAdded.length + diff.setsRemoved.length > 0 ||
  diff.themesChanged;
if (!hasChanges) {
  console.log(`tokens.json igual ao de ${tag}: nada a gerar.`);
  process.exit(0);
}

const bump =
  diff.vanished.length > 0 ? 'major' : diff.added.length + diff.setsAdded.length > 0 || diff.themesChanged ? 'minor' : 'patch';
const summary = summarize(diff);
const notes = [
  diff.vanished.length > 0 ? `Tokens que deixaram de existir: ${diff.vanished.join(', ')}.` : null,
  diff.themesChanged ? 'Temas ($themes) alterados.' : null,
].filter(Boolean);

writeFileSync(
  CHANGESET_FILE,
  `---\n"${PACKAGE}": ${bump}\n---\n\nTokens sincronizados do Figma desde ${version}: ${summary}.${notes.length ? `\n\n${notes.join('\n')}` : ''}\n`,
);
console.log(`Changeset ${bump} gerado em ${CHANGESET_FILE}: ${summary}`);
