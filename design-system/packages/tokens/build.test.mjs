// Acceptance test for the layered build (arquitetura.md at the repository
// root). Run after the build (`pnpm test` does both):
//
// 1. For every theme combination from $themes (brand/product × mode ×
//    platform), the CSS layers in dist/css, applied in cascade order with every
//    var() resolved, must give exactly the values of the flattened Tokens
//    Studio export (permutateThemes) built with the same transforms.
// 2. A product set must only hold overrides: a token with the same value as
//    its base is a repetition and fails.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { permutateThemes } from '@tokens-studio/sd-transforms';
import { loadManifest, cssLayers, slugify, PLATFORM_CONFIG, STYLE_DICTIONARY_OPTIONS, THEME_GROUPS } from './build.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const SEPARATOR = '|';
const PRIMITIVES_SET = 'global/primitives';

// "--name: value; /** comment */" declarations of one CSS file.
async function readDeclarations(relativeFile) {
  const css = await readFile(path.join(DIST_DIR, relativeFile), 'utf-8');
  const declarations = new Map();
  for (const match of css.matchAll(/^\s*--([\w-]+):\s*(.*?);(?:\s*\/\*\*.*\*\/)?\s*$/gm)) {
    declarations.set(match[1], match[2]);
  }
  return declarations;
}

// Replaces every var(--x) with x's value from the same cascade, recursively.
function resolveVars(declarations) {
  const resolved = new Map();
  const resolve = (name, seen = new Set()) => {
    if (resolved.has(name)) return resolved.get(name);
    if (seen.has(name)) throw new Error(`Cyclic var(--${name})`);
    const raw = declarations.get(name);
    if (raw === undefined) return undefined;
    seen.add(name);
    const value = raw.replace(/var\(--([\w-]+)\)/g, (whole, ref) => resolve(ref, seen) ?? whole);
    resolved.set(name, value);
    return value;
  };
  for (const name of declarations.keys()) resolve(name);
  return resolved;
}

// Flattened reference: every non-primitive token of the combination's sets,
// merged in order and resolved, through the same CSS transforms as the build.
async function flattenedReference(sets, setKeys, tmpDir) {
  const files = [];
  for (const key of setKeys) {
    const file = path.join(tmpDir, `${slugify(key)}.json`);
    await writeFile(file, JSON.stringify(sets[key]));
    files.push(file.split(path.sep).join('/'));
  }
  const primitivesFile = `${slugify(PRIMITIVES_SET)}.json`;
  const sd = new StyleDictionary({
    ...STYLE_DICTIONARY_OPTIONS,
    source: files,
    platforms: {
      css: {
        ...PLATFORM_CONFIG.css,
        files: [
          {
            destination: 'reference.css',
            format: 'css/variables',
            filter: (token) => path.basename(token.filePath ?? '') !== primitivesFile,
            options: { outputReferences: false },
          },
        ],
      },
    },
  });
  const [{ output }] = await sd.formatPlatform('css');
  const declarations = new Map();
  for (const match of output.matchAll(/^\s*--([\w-]+):\s*(.*?);(?:\s*\/\*\*.*\*\/)?\s*$/gm)) {
    declarations.set(match[1], match[2]);
  }
  return declarations;
}

const manifest = await loadManifest();
const layers = cssLayers(manifest);
const content = JSON.parse(await readFile(path.join(__dirname, 'src/tokens-studio/tokens.json'), 'utf-8'));
// Only the brand/product, mode and platform groups combine; the Primitives and
// Foundations groups exist just for the Figma export.
const themeGroups = Object.values(THEME_GROUPS).flat();
const combinations = permutateThemes(
  content.$themes.filter((theme) => themeGroups.includes(theme.group)),
  { separator: SEPARATOR },
);

test('every theme combination matches the flattened Tokens Studio export', async (t) => {
  const tmpDir = await mkdtemp(path.join(tmpdir(), 'ds-tokens-test-'));
  try {
    for (const [name, setKeys] of Object.entries(combinations)) {
      await t.test(name, async () => {
        const [brandName, modeName, platformName] = name.split(SEPARATOR);
        const theme = manifest.products.find((product) => product.name === brandName);
        const mode = manifest.modes.find((item) => item.name === modeName);
        const platform = manifest.platforms.find((item) => item.name === platformName);
        assert.ok(theme && mode && platform, `Combination "${name}" doesn't map to a brand, mode and platform.`);

        // The CSS layers this combination activates, in cascade order:
        // <html data-brand data-product data-mode data-platform>.
        const active = layers.filter(
          (layer) =>
            layer.kind === 'foundations' ||
            (layer.kind === 'brand' && layer.brand === theme.brand) ||
            (layer.kind === 'product' && layer.brand === theme.brand && layer.product === theme.product) ||
            (layer.kind === 'mode' && layer.mode === mode.slug) ||
            (layer.kind === 'platform' && layer.platform === platform.slug),
        );
        const cascade = new Map();
        for (const layer of active) {
          for (const [key, value] of await readDeclarations(layer.file.replace(/^css\//, 'css/'))) cascade.set(key, value);
        }
        const layered = resolveVars(cascade);

        const reference = await flattenedReference(manifest.sets, setKeys, tmpDir);
        const differences = [];
        for (const [key, expected] of reference) {
          const actual = layered.get(key);
          if (actual !== expected) differences.push(`--${key}: esperado "${expected}", camadas deram "${actual}"`);
        }
        assert.equal(differences.length, 0, `${differences.length} diferença(s):\n${differences.slice(0, 20).join('\n')}`);
      });
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
});

test('product sets only hold overrides (no value repeated from the base)', () => {
  const tokensOf = (node, prefix = [], out = new Map()) => {
    if (!node || typeof node !== 'object') return out;
    if ('$value' in node) return out.set(prefix.join('.'), JSON.stringify([node.$type, node.$value]));
    for (const [key, child] of Object.entries(node)) tokensOf(child, [...prefix, key], out);
    return out;
  };

  const repeated = [];
  for (const { brand, setKey } of manifest.productLayers.values()) {
    const base = new Map();
    for (const key of manifest.brands.get(brand)) for (const [p, v] of tokensOf(manifest.sets[key])) base.set(p, v);
    for (const [tokenPath, signature] of tokensOf(manifest.sets[setKey])) {
      if (base.get(tokenPath) === signature) repeated.push(`${setKey} › ${tokenPath}`);
    }
  }
  assert.equal(repeated.length, 0, `Tokens repetidos da base (não são sobrescrita):\n${repeated.join('\n')}`);
});
