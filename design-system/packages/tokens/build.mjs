import { readFile, mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';
import { fileHeader, formattedVariables, getReferences } from 'style-dictionary/utils';
import { register, expandTypesMap } from '@tokens-studio/sd-transforms';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = path.join(__dirname, 'src/tokens-studio');
const SOURCE_FILE = path.join(TOKENS_DIR, 'tokens.json');
const DIST_DIR = path.join(__dirname, 'dist');

register(StyleDictionary);

// ---------------------------------------------------------------------------
// Theme dimensions
// ---------------------------------------------------------------------------

// The Tokens Studio export defines three independent theme dimensions as
// $themes groups, meant to be combined (one product + one mode + one
// platform). If a group is renamed in Figma, update it here.
const THEME_GROUPS = {
  product: 'Marca · Produto',
  mode: 'Mode',
  platform: 'Plataforma',
};

// Mobile/desktop platform values are switched with a media query at this
// breakpoint token, so the CSS stays responsive without extra attributes.
const MOBILE_BREAKPOINT_TOKEN = 'breakpoint.md';

// Composite types that are split into one custom property per field. Shadows
// are left out on purpose: they read better as a single `box-shadow`
// shorthand, which is what sd-transforms produces for them.
const EXPANDED_TYPES = ['typography'];

// References to tokens that don't exist anywhere in tokens.json are logged
// instead of failing the build; the affected custom properties are left out
// of the output until the source is fixed. Grep the build log for "which is
// not defined" to see the current list.
//
// Warnings are disabled because the two Style Dictionary emits here are
// inherent to this layering: "token collisions" (brand sets overriding the
// foundation palette on purpose) and "filtered out token references" (files
// pointing at custom properties defined in another file, or at primitives
// that get resolved). Set warnings to 'warn' and verbosity to 'verbose' to
// inspect them.
const LOG_CONFIG = { warnings: 'disabled', errors: { brokenReferences: 'console' } };

// ---------------------------------------------------------------------------
// Transforms / formats
// ---------------------------------------------------------------------------

// Figma variables store line heights as unitless pixel numbers ("48"), but in
// CSS a unitless line-height is a multiplier of the font size, so they need
// an explicit unit. Percentages are already handled by ts/size/lineheight.
StyleDictionary.registerTransform({
  name: 'ds/line-height/px',
  type: 'value',
  transitive: true,
  filter: (token) => ['lineHeight', 'lineHeights'].includes(token.$type ?? token.type),
  transform: (token) => {
    const value = token.$value ?? token.value;
    return /^-?\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : value;
  },
});

// Native platforms get sizes in their own units, treating one Figma pixel as
// one dp/pt: text-related sizes become sp on Android (so they follow the
// user's font scale), everything else dp; on iOS every size is a CGFloat.
const SIZE_TYPES = ['dimension', 'fontSize', 'lineHeight', 'letterSpacing'];
const TEXT_SIZE_TYPES = ['fontSize', 'lineHeight', 'letterSpacing'];

// Expanding a typography token types its font size as a plain `dimension`,
// so the field name is checked too.
function isTextSize(token) {
  return TEXT_SIZE_TYPES.includes(token.$type ?? token.type) || /^font-?size$/i.test(token.path.at(-1));
}

function sizeTransform(name, toNative) {
  StyleDictionary.registerTransform({
    name,
    type: 'value',
    transitive: true,
    filter: (token) => SIZE_TYPES.includes(token.$type ?? token.type),
    transform: (token) => {
      const value = token.$value ?? token.value;
      const number = parseFloat(value);
      return Number.isNaN(number) ? value : toNative(number, token);
    },
  });
}

sizeTransform('ds/size/android', (number, token) => `${number}${isTextSize(token) ? 'sp' : 'dp'}`);
sizeTransform('ds/size/swift', (number) => `CGFloat(${number})`);

StyleDictionary.registerTransform({
  name: 'ds/font-family/swift',
  type: 'value',
  filter: (token) => (token.$type ?? token.type) === 'fontFamily',
  transform: (token) => JSON.stringify(String(token.$value ?? token.value)),
});

// Every file is scoped by its own selector (and media query, for
// platforms), with enough specificity that import order never matters:
// `:root` for defaults, `:root.dark` / `:root[data-product="..."]` for the
// variants that override them.
StyleDictionary.registerFormat({
  name: 'css/scoped-variables',
  async format({ dictionary, file, options }) {
    const header = await fileHeader({ file, options });
    const declarations = formattedVariables({
      format: 'css',
      dictionary,
      outputReferences: options.outputReferences,
      usesDtcg: options.usesDtcg,
    });
    const block = `${file.options.selector} {\n${declarations}\n}\n`;
    return header + (file.options.media ? `@media ${file.options.media} {\n${block}}\n` : block);
  },
});

// Maps a token's category (its first path segment) to the Tailwind theme key
// it should be exposed under. Categories not listed here still get included
// (see resolveTailwindEntry's fallback), so a rename in Figma can't silently
// drop tokens from the preset.
const CATEGORY_TO_THEME_KEY = {
  color: 'colors',
  font: 'fontFamily',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'letter-spacing': 'letterSpacing',
  'line-height': 'lineHeight',
  radius: 'borderRadius',
  'border-width': 'borderWidth',
  opacity: 'opacity',
  blur: 'blur',
  shadow: 'boxShadow',
  spacing: 'spacing',
};

function toCamelCase(value) {
  return value.replace(/[-_](\w)/g, (_, char) => char.toUpperCase());
}

function resolveTailwindEntry(token) {
  const [top, ...rest] = token.path;
  const themeKey = CATEGORY_TO_THEME_KEY[top] ?? toCamelCase(top);
  const tokenKey = rest.join('-') || top;
  return { themeKey, tokenKey };
}

// Points every token at its CSS custom property instead of a resolved value,
// so the preset stays valid across products, modes and platforms (those swap
// which custom property values are active, not this file).
StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format({ dictionary }) {
    const theme = {};
    for (const token of dictionary.allTokens) {
      const { themeKey, tokenKey } = resolveTailwindEntry(token);
      theme[themeKey] ??= {};
      theme[themeKey][tokenKey] = `var(--${token.name})`;
    }
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\nmodule.exports = {\n  theme: {\n    extend: ${JSON.stringify(theme, null, 2)},\n  },\n};\n`;
  },
});

// Every exported token as a typed reference to its CSS custom property, for
// inline styles and CSS-in-JS that should keep following the active product,
// mode and platform instead of freezing one theme's values.
StyleDictionary.registerFormat({
  name: 'javascript/css-vars',
  async format({ dictionary, file, options }) {
    const header = await fileHeader({ file, options });
    const lines = dictionary.allTokens.map((token) => `export const ${toCamelCase(token.name)} = 'var(--${token.name})';`);
    return `${header}${lines.join('\n')}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/css-vars-declarations',
  async format({ dictionary, file, options }) {
    const header = await fileHeader({ file, options });
    const lines = dictionary.allTokens.map((token) => `export const ${toCamelCase(token.name)}: 'var(--${token.name})';`);
    return `${header}${lines.join('\n')}\n`;
  },
});

// ---------------------------------------------------------------------------
// Manifest — themes and sets are derived from the Tokens Studio export itself
// ($themes[].selectedTokenSets), never hardcoded.
// ---------------------------------------------------------------------------

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && !('$value' in value) && isPlainObject(target[key])) {
      deepMerge(target[key], value);
    } else {
      target[key] = structuredClone(value);
    }
  }
  return target;
}

function readTokenValue(sets, dottedPath) {
  for (const set of Object.values(sets)) {
    const node = dottedPath.split('.').reduce((acc, key) => acc?.[key], set);
    if (node && '$value' in node) return node.$value;
  }
  return undefined;
}

function themesOf(themes, group) {
  const matches = themes.filter((theme) => theme.group === group);
  if (matches.length === 0) {
    throw new Error(
      `No theme with group "${group}" found in $themes. Update THEME_GROUPS in build.mjs to match the groups defined in Tokens Studio.`,
    );
  }
  return matches.map((theme) => {
    const entries = Object.entries(theme.selectedTokenSets ?? {});
    return {
      name: theme.name,
      slug: slugify(theme.name),
      enabled: entries.filter(([, status]) => status === 'enabled').map(([key]) => key),
      source: entries.filter(([, status]) => status === 'source').map(([key]) => key),
    };
  });
}

async function loadManifest() {
  const content = JSON.parse(await readFile(SOURCE_FILE, 'utf-8'));
  const sets = Object.fromEntries(Object.entries(content).filter(([key]) => !key.startsWith('$')));
  const themes = content.$themes ?? [];

  const products = themesOf(themes, THEME_GROUPS.product);
  const modes = themesOf(themes, THEME_GROUPS.mode);
  const platforms = themesOf(themes, THEME_GROUPS.platform);

  // "source" sets hold the primitives. Which of them reach the output is
  // decided per token by isExportedToken.
  const sourceSetKeys = [...new Set([...products, ...modes, ...platforms].flatMap((t) => t.source))];
  const referencedPrimitives = referencedPrimitivePaths(sets, sourceSetKeys);

  // Sets enabled in every product are the shared foundations; everything else
  // a product enables is its own brand/product layer.
  const sharedSetKeys = products[0].enabled.filter((key) => products.every((p) => p.enabled.includes(key)));
  for (const product of products) {
    product.setKeys = product.enabled.filter((key) => !sharedSetKeys.includes(key));
  }
  for (const theme of [...modes, ...platforms]) {
    theme.setKeys = theme.enabled;
  }

  // Modes and platforms reference brand tokens (e.g. palette.primary.light),
  // whose *values* differ per product but whose *names* are the same. Merging
  // every product layer into one set gives those references something to
  // resolve against; the values never reach the output, since references to
  // exported tokens are written as var(--...) (see referencesExportedOnly).
  const productUnion = {};
  for (const product of products) {
    for (const key of product.setKeys) deepMerge(productUnion, sets[key]);
  }

  const breakpoint = parseFloat(readTokenValue(sets, MOBILE_BREAKPOINT_TOKEN));
  if (Number.isNaN(breakpoint)) {
    throw new Error(`Token "${MOBILE_BREAKPOINT_TOKEN}" (MOBILE_BREAKPOINT_TOKEN in build.mjs) not found or not numeric.`);
  }

  return { sets, sourceSetKeys, referencedPrimitives, sharedSetKeys, products, modes, platforms, productUnion, breakpoint };
}

function flattenTokens(node, pathSegments = [], out = []) {
  if (!isPlainObject(node)) return out;
  if ('$value' in node) {
    out.push([pathSegments.join('.'), node]);
    return out;
  }
  for (const [key, value] of Object.entries(node)) flattenTokens(value, [...pathSegments, key], out);
  return out;
}

// "{a.b.c}" references anywhere in a value, including inside composite values
// (typography, shadows). Quotes are excluded so object JSON isn't mistaken for
// a reference.
function referencesIn(value) {
  return [...JSON.stringify(value).matchAll(/\{([^{}"]+)\}/g)].map((match) => match[1]);
}

// Dotted paths of every primitive that some other token references — any
// token, including another primitive (e.g. min-width.xs -> container.xs).
function referencedPrimitivePaths(sets, sourceSetKeys) {
  const primitivePaths = new Set(sourceSetKeys.flatMap((key) => flattenTokens(sets[key]).map(([tokenPath]) => tokenPath)));
  const references = Object.values(sets).flatMap((set) => flattenTokens(set).flatMap(([, token]) => referencesIn(token.$value)));
  return new Set(references.filter((ref) => primitivePaths.has(ref)));
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

const PRODUCT_UNION_FILE = '__product-union.json';

// Each set is written to its own temp file, so Style Dictionary's normal
// multi-source merge flattens them into one token tree and tags every token
// with the originating file — which is how output files are later filtered
// back down to just their own set(s), and how references are classified.
async function materializeSets(tmpDir, sets, productUnion) {
  const fileForSet = new Map();
  for (const [key, value] of Object.entries(sets)) {
    const fileName = `${slugify(key)}.json`;
    await writeFile(path.join(tmpDir, fileName), JSON.stringify(value));
    fileForSet.set(key, fileName);
  }
  await writeFile(path.join(tmpDir, PRODUCT_UNION_FILE), JSON.stringify(productUnion));
  return fileForSet;
}

// A token whose reference couldn't be resolved (see LOG_CONFIG) keeps its
// literal "{a.b.c}" value, which would produce broken CSS, so every output
// filters these out until the source reference is fixed.
function isResolved(token) {
  // On a broken reference, resolution never completes: `token.value` is left
  // undefined and only `token.$value` still holds the raw "{a.b.c}" string.
  const candidate = token.value ?? token.$value;
  const raw = typeof candidate === 'string' ? candidate : JSON.stringify(candidate ?? '');
  return !/\{[^{}]+\}/.test(raw);
}

function fromFiles(fileNames) {
  const names = new Set(fileNames);
  return (token) => names.has(path.basename(token.filePath ?? '')) && isResolved(token);
}

// Which primitives reach the output, so that every value has exactly one
// token to use and a change in Figma can't leave code on a stale alternative:
//
// - A primitive that another token references is left out; the referencing
//   token carries the resolved value instead (there's --color-primary, not
//   --color-blue-600; --container-padding-x, not --spacing-6).
// - Raw colors are left out entirely, so colors are only used through
//   semantic tokens.
// - Every other primitive (sizes, type, opacity, shadows... that nothing
//   references) is exposed, so there's a token for those values too.
function isExportedToken(sourceFileNames, referencedPrimitives) {
  const sourceFiles = new Set(sourceFileNames);
  return (token) =>
    !sourceFiles.has(path.basename(token.filePath ?? '')) ||
    (!isColor(token) && !referencedPrimitives.has(token.path.join('.')));
}

// A reference is kept as var(--...) only when every token it points at is
// exported somewhere (so the custom property is guaranteed to exist); any
// other value is resolved instead.
function referencesExportedOnly(isExported) {
  return (token, { dictionary, usesDtcg }) => {
    const original = usesDtcg ? token.original.$value : token.original.value;
    const refs = getReferences(original, dictionary.unfilteredTokens ?? dictionary.tokens, {
      usesDtcg,
      warnImmediately: false,
    });
    return refs.length > 0 && refs.every(isExported);
  };
}

const isColor = (token) => (token.$type ?? token.type) === 'color';
const isNotColor = (token) => !isColor(token);
// Composite values (e.g. shadows) have no single-value equivalent in native
// resources, so they're left to the web outputs.
const isScalar = (token) => typeof (token.$value ?? token.value) !== 'object';

// Transforms applied to every native platform before its own unit, color and
// naming transforms. They're the value-level parts of the tokens-studio group,
// without its CSS-specific ones (quoted font families, px units, rgba()).
const NATIVE_BASE_TRANSFORMS = [
  'ts/descriptionToComment',
  'ts/resolveMath',
  'ts/opacity',
  'ts/typography/fontWeight',
  'ts/color/modifiers',
];

const PLATFORM_CONFIG = {
  css: { transformGroup: 'tokens-studio', transforms: ['name/kebab', 'ds/line-height/px'] },
  ts: { transformGroup: 'tokens-studio', transforms: ['name/camel', 'ds/line-height/px'] },
  android: {
    transforms: [...NATIVE_BASE_TRANSFORMS, 'ds/size/android', 'color/hex8android', 'name/snake'],
  },
  ios: {
    transforms: [...NATIVE_BASE_TRANSFORMS, 'ds/size/swift', 'ds/font-family/swift', 'color/ColorSwiftUI', 'name/camel'],
  },
};

const ANDROID_RESOURCE_MAP = {
  color: 'color',
  dimension: 'dimen',
  fontSize: 'dimen',
  lineHeight: 'dimen',
  letterSpacing: 'dimen',
  fontWeight: 'integer',
  fontFamily: 'string',
  number: 'float',
  opacity: 'float',
};

function escapeXml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Same shape as Style Dictionary's android/resources, plus decimal values
// (e.g. opacity), which Android only accepts as a float-formatted <item>.
StyleDictionary.registerFormat({
  name: 'android/ds-resources',
  async format({ dictionary, file, options }) {
    const header = await fileHeader({ file, options, commentStyle: 'xml' });
    const resources = dictionary.allTokens.map((token) => {
      const resource = ANDROID_RESOURCE_MAP[token.$type ?? token.type] ?? 'string';
      const value = escapeXml(token.$value ?? token.value);
      return resource === 'float'
        ? `  <item name="${token.name}" format="float" type="dimen">${value}</item>`
        : `  <${resource} name="${token.name}">${value}</${resource}>`;
    });
    return `<?xml version="1.0" encoding="UTF-8"?>\n${header}<resources>\n${resources.join('\n')}\n</resources>\n`;
  },
});

function createBuilder(tmpDir, fileForSet, sourceSetKeys, isExported) {
  const toFiles = (setKeys) => setKeys.map((key) => (key === PRODUCT_UNION_FILE ? key : fileForSet.get(key)));

  // `platforms` maps a PLATFORM_CONFIG key to the files it writes. Each file
  // only gets tokens from `outputSetKeys`, further narrowed by its own filter.
  return async function buildLayer({ setKeys, outputSetKeys, platforms }) {
    const sourceFiles = toFiles([...sourceSetKeys, ...setKeys]);
    const baseFilter = fromFiles(toFiles(outputSetKeys));

    const sd = new StyleDictionary({
      source: sourceFiles.map((file) => path.join(tmpDir, file).replace(/\\/g, '/')),
      preprocessors: ['tokens-studio'],
      expand: { typesMap: expandTypesMap, include: EXPANDED_TYPES },
      log: LOG_CONFIG,
      platforms: Object.fromEntries(
        Object.entries(platforms).map(([platform, files]) => [
          platform,
          {
            ...PLATFORM_CONFIG[platform],
            buildPath: `${DIST_DIR.replace(/\\/g, '/')}/`,
            options: { outputReferences: platform === 'css' ? referencesExportedOnly(isExported) : false },
            files: files.map(({ filter, ...file }) => ({
              ...file,
              filter: filter ? (token, options) => baseFilter(token) && filter(token, options) : baseFilter,
            })),
          },
        ]),
      ),
    });

    await sd.buildAllPlatforms();
  };
}

function cssFile(destination, selector, media) {
  return { destination, format: 'css/scoped-variables', options: { selector, media } };
}

function tsFiles(basePath) {
  return [
    { destination: `${basePath}.js`, format: 'javascript/es6' },
    { destination: `${basePath}.d.ts`, format: 'typescript/es6-declarations' },
  ];
}

function androidFile(destination, filter) {
  return {
    destination,
    format: 'android/ds-resources',
    filter: (token) => isScalar(token) && (!filter || filter(token)),
  };
}

function swiftFile(destination, className, filter) {
  return {
    destination,
    format: 'ios-swift/any.swift',
    filter: (token) => isScalar(token) && (!filter || filter(token)),
    options: { className, objectType: 'enum', accessControl: 'public', import: ['SwiftUI'] },
  };
}

function toPascalCase(slug) {
  return slug.replace(/(^|-)(\w)/g, (_, __, char) => char.toUpperCase());
}

// Android switches resources by configuration qualifier, so dark mode maps to
// values-night and desktop to a minimum-width qualifier at the same breakpoint
// the CSS uses — the OS picks the right file with no code.
const ANDROID_MODE_QUALIFIER = { dark: 'night' };

function androidModeDir(mode, isDefault) {
  if (isDefault) return 'values';
  const qualifier = ANDROID_MODE_QUALIFIER[mode.slug];
  if (!qualifier) {
    throw new Error(`No Android resource qualifier for mode "${mode.name}". Add it to ANDROID_MODE_QUALIFIER in build.mjs.`);
  }
  return `values-${qualifier}`;
}

// Resolved values for one product: one layer per mode (everything the product
// shows in that mode) and one per platform (just the platform tokens), mirroring
// how the CSS layers stack.
function resolvedOutputs({ product, sharedSetKeys, modes, platforms, breakpoint }) {
  const base = [...sharedSetKeys, ...product.setKeys];
  const className = toPascalCase(product.slug);

  return [
    ...modes.map((mode, index) => {
      const isDefault = index === 0;
      const valuesDir = `android/${product.slug}/${androidModeDir(mode, isDefault)}`;
      return {
        setKeys: [...base, ...mode.setKeys],
        outputSetKeys: [...base, ...mode.setKeys],
        platforms: {
          ts: tsFiles(`ts/${product.slug}/${mode.slug}`),
          // Non-color tokens are the same in every mode, so only the default
          // mode writes them; other modes only override colors.
          android: isDefault
            ? [androidFile(`${valuesDir}/colors.xml`, isColor), androidFile(`${valuesDir}/tokens.xml`, isNotColor)]
            : [androidFile(`${valuesDir}/colors.xml`, isColor)],
          ios: [swiftFile(`ios/${product.slug}/${className}${toPascalCase(mode.slug)}.swift`, `${className}${toPascalCase(mode.slug)}`)],
        },
      };
    }),
    ...platforms.map((platform) => {
      const valuesDir = /mobile/i.test(platform.name) ? 'values' : `values-w${breakpoint}dp`;
      return {
        setKeys: [...base, ...platform.setKeys],
        outputSetKeys: platform.setKeys,
        platforms: {
          ts: tsFiles(`ts/${product.slug}/${platform.slug}`),
          android: [androidFile(`android/${product.slug}/${valuesDir}/platform.xml`)],
          ios: [swiftFile(`ios/${product.slug}/${className}${toPascalCase(platform.slug)}.swift`, `${className}${toPascalCase(platform.slug)}`)],
        },
      };
    }),
  ];
}

async function writeGenerated(relativePath, body) {
  const target = path.join(DIST_DIR, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `/**\n * Do not edit directly, this file was auto-generated.\n */\n${body}`);
}

async function build() {
  const manifest = await loadManifest();
  const { sets, sourceSetKeys, referencedPrimitives, sharedSetKeys, products, modes, platforms, productUnion, breakpoint } =
    manifest;

  // Cleaned once up front instead of per Style Dictionary instance: the
  // builds below run in parallel and share dist/, so a per-instance
  // cleanAllPlatforms() can delete files/dirs another build is writing.
  // Retries cover Windows briefly locking a file that an editor or file
  // watcher has open (EBUSY/EPERM), which otherwise fails the build at random.
  await rm(DIST_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });

  const tmpDir = await mkdtemp(path.join(tmpdir(), 'ds-tokens-'));
  try {
    const fileForSet = await materializeSets(tmpDir, sets, productUnion);
    const isExported = isExportedToken(
      sourceSetKeys.map((key) => fileForSet.get(key)),
      referencedPrimitives,
    );
    const buildLayer = createBuilder(tmpDir, fileForSet, sourceSetKeys, isExported);
    const withProducts = [...sharedSetKeys, PRODUCT_UNION_FILE];

    const [defaultMode] = modes;
    const platformMedia = (platform) =>
      /mobile/i.test(platform.name) ? `(width < ${breakpoint}px)` : `(width >= ${breakpoint}px)`;

    const cssOutputs = [
      {
        setKeys: [],
        outputSetKeys: sourceSetKeys,
        platforms: { css: [{ ...cssFile('css/primitives.css', ':root'), filter: isExported }] },
      },
      {
        setKeys: sharedSetKeys,
        outputSetKeys: sharedSetKeys,
        platforms: { css: [cssFile('css/foundations.css', ':root')] },
      },
      ...products.map((product) => ({
        setKeys: [...sharedSetKeys, ...product.setKeys],
        outputSetKeys: product.setKeys,
        platforms: { css: [cssFile(`css/products/${product.slug}.css`, `:root[data-product="${product.slug}"]`)] },
      })),
      ...modes.map((mode) => ({
        setKeys: [...withProducts, ...mode.setKeys],
        outputSetKeys: mode.setKeys,
        platforms: { css: [cssFile(`css/modes/${mode.slug}.css`, mode === defaultMode ? ':root' : `:root.${mode.slug}`)] },
      })),
      ...platforms.map((platform) => ({
        setKeys: [...withProducts, ...platform.setKeys],
        outputSetKeys: platform.setKeys,
        platforms: { css: [cssFile(`css/platforms/${platform.slug}.css`, ':root', platformMedia(platform))] },
      })),
    ];

    const outputs = [
      ...cssOutputs,
      // Token *names* are the same across modes and platforms, so the default
      // of each is enough to enumerate every name for the preset and vars.
      {
        setKeys: [...withProducts, ...defaultMode.setKeys, ...platforms[0].setKeys],
        outputSetKeys: [...sourceSetKeys, ...withProducts, ...defaultMode.setKeys, ...platforms[0].setKeys],
        platforms: {
          css: [
            { destination: 'tailwind/preset.cjs', format: 'tailwind/preset', filter: isExported },
            { destination: 'ts/vars.js', format: 'javascript/css-vars', filter: isExported },
            { destination: 'ts/vars.d.ts', format: 'typescript/css-vars-declarations', filter: isExported },
          ],
        },
      },
      // Primitives are the same for every product, so TS and Swift get one
      // shared module; Android gets a copy in each product folder, since that
      // folder is meant to be dropped into res/ as a whole.
      {
        setKeys: [],
        outputSetKeys: sourceSetKeys,
        platforms: {
          ts: tsFiles('ts/primitives').map((file) => ({ ...file, filter: isExported })),
          android: products.map((product) => androidFile(`android/${product.slug}/values/primitives.xml`, isExported)),
          ios: [swiftFile('ios/Primitives.swift', 'Primitives', isExported)],
        },
      },
      ...products.flatMap((product) => resolvedOutputs({ product, sharedSetKeys, modes, platforms, breakpoint })),
    ];

    await Promise.all(outputs.map(buildLayer));

    const cssFiles = cssOutputs.flatMap((output) => output.platforms.css.map((file) => file.destination.replace(/^css\//, './')));
    await writeGenerated('css/index.css', `${cssFiles.map((file) => `@import "${file}";`).join('\n')}\n`);

    // One entry point per product: `import { light, desktop } from '.../ts/pas-cockpit'`.
    const layerSlugs = [...modes, ...platforms].map((layer) => layer.slug);
    const reExports = `${layerSlugs.map((slug) => `export * as ${toCamelCase(slug)} from './${slug}.js';`).join('\n')}\n`;
    for (const product of products) {
      await writeGenerated(`ts/${product.slug}/index.js`, reExports);
      await writeGenerated(`ts/${product.slug}/index.d.ts`, reExports);
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }

  console.log(
    `[tokens] built primitives, foundations, ${products.length} product(s) (${products.map((p) => p.slug).join(', ')}), ` +
      `${modes.length} mode(s) (${modes.map((m) => m.slug).join(', ')}), ` +
      `${platforms.length} platform(s) (${platforms.map((p) => p.slug).join(', ')}) for css, tailwind, ts, android and ios`,
  );
}

async function main() {
  await build();

  if (process.argv.includes('--watch')) {
    console.log('[tokens] watching src/tokens-studio for changes...');
    watch(TOKENS_DIR, { recursive: true }, async (_event, filename) => {
      try {
        console.log(`[tokens] ${filename} changed, rebuilding...`);
        await build();
      } catch (error) {
        console.error('[tokens] build failed:', error);
      }
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
