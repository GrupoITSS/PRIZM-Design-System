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
// Token tree
// ---------------------------------------------------------------------------

// The Tokens Studio sets form an inheritance tree (see arquitetura.md at the
// repository root). Later layers override earlier ones:
//
//   global/primitives  → never emitted; only resolves values
//   global/foundations → defaults shared by every brand
//   <brand>/base       → the brand's theme
//   <brand>/<product>  → ONLY what the product overrides from the base
//   themes/<mode>      → color.<role> → {palette.<role>.light|dark}
//   platforms/<name>   → platform sizes and text styles
//
// The output mirrors the tree: each layer emits only the tokens it defines,
// and the switch between brands, products, modes and platforms happens by
// cascade, through data-* attributes, like the modes in Figma.
const PRIMITIVES_SET = 'global/primitives';
const FOUNDATIONS_SET = 'global/foundations';
const BASE_LAYER = 'base';

// The $themes groups that combine into one theme (one brand/product + one
// mode + one platform). If a group is renamed in Tokens Studio, update it here.
// Each dimension accepts the English name (naming rule of 01/10) and the
// Portuguese one still in tokens.json, so the rename in Figma/Tokens Studio
// can land in any order; drop the Portuguese names once it has.
// Other groups in $themes (Primitives, Foundations) only exist so the Tokens
// Studio export to Figma creates a variable collection for those sets, which
// the brand collection then aliases; the build ignores them.
export const THEME_GROUPS = {
  product: ['Theme', 'Marca · Produto'],
  mode: ['Mode'],
  platform: ['Platform', 'Plataforma'],
};

// Android has no attribute to switch platforms, so desktop values go to a
// minimum-width resource qualifier at this breakpoint.
const MOBILE_BREAKPOINT_TOKEN = 'breakpoint.md';

// Composite types that are split into one custom property per field. Shadows
// are left out on purpose: they read better as a single `box-shadow`
// shorthand (see shadowFromReferences).
const EXPANDED_TYPES = ['typography'];

// References to tokens that don't exist anywhere in tokens.json are logged
// instead of failing the build; the affected custom properties are left out
// of the output until the source is fixed. Grep the build log for "which is
// not defined" to see the current list (the "Validar tokens" check does).
//
// Warnings are disabled because the two Style Dictionary emits here are
// inherent to this layering: "token collisions" (a product overriding its
// base on purpose) and "filtered out token references" (files pointing at
// custom properties defined in another layer, or at primitives that get
// resolved). Set warnings to 'warn' and verbosity to 'verbose' to inspect them.
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

// Figma font variables hold a single family ('Effra Trial'). On the web, a
// family the browser doesn't have falls back to its default, a serif font,
// so each one gets a generic fallback stack (monospace for mono families).
// Families that already list a fallback are left as they are.
StyleDictionary.registerTransform({
  name: 'ds/font-family/fallback',
  type: 'value',
  filter: (token) => ['fontFamily', 'fontFamilies'].includes(token.$type ?? token.type),
  transform: (token) => {
    const value = String(token.$value ?? token.value);
    if (value.includes(',')) return value;
    const isMono = token.path.some((segment) => /mono/i.test(segment));
    return `${value}, ${isMono ? 'ui-monospace, monospace' : 'ui-sans-serif, system-ui, sans-serif'}`;
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

const SHADOW_FIELDS = [
  ['x', 'offsetX'],
  ['y', 'offsetY'],
  ['blur'],
  ['spread'],
  ['color'],
];

// Style Dictionary's outputReferences rewrites a composite value by replacing
// each referenced value with its var(), so two fields with the same value
// (e.g. offset-x and spread = 0px) get each other's var(). A shadow whose
// every field points at an emitted token is written field by field instead,
// in box-shadow order, so it stays correct when a layer overrides one field.
// Any other shadow is emitted resolved.
// Tokens Studio's boxShadow becomes the DTCG "shadow" type (with offsetX /
// offsetY fields) in the tokens-studio preprocessor; both spellings are read.
const isShadow = (token) => ['shadow', 'boxShadow'].includes(token.$type ?? token.type);

function shadowFromReferences(token, dictionary) {
  if (!isShadow(token)) return null;
  const usesDtcg = '$value' in token.original;
  const original = usesDtcg ? token.original.$value : token.original.value;
  const layers = Array.isArray(original) ? original : [original];
  const tokens = dictionary.unfilteredTokens ?? dictionary.tokens;

  const shadows = [];
  for (const layer of layers) {
    if (!layer || typeof layer !== 'object') return null;
    const parts = [];
    for (const keys of SHADOW_FIELDS) {
      const field = keys.map((key) => layer[key]).find((value) => value !== undefined);
      if (typeof field !== 'string' || !/^\{[^{}]+\}$/.test(field)) return null;
      const [target] = getReferences(field, tokens, { usesDtcg, warnImmediately: false });
      if (!target || !isExported(target)) return null;
      parts.push(`var(--${target.name})`);
    }
    shadows.push(`${layer.type === 'innerShadow' ? 'inset ' : ''}${parts.join(' ')}`);
  }
  return shadows.join(', ');
}

// Every file is scoped by its own selector. Brand, product, mode and platform
// selectors use separate data-* attributes, so they combine freely and a
// product ([data-brand][data-product]) always outranks its base ([data-brand]).
StyleDictionary.registerFormat({
  name: 'css/scoped-variables',
  async format({ dictionary, file, options }) {
    const header = await fileHeader({ file, options });
    const literal = new Set();
    const allTokens = dictionary.allTokens.map((token) => {
      const shadow = options.outputReferences ? shadowFromReferences(token, dictionary) : null;
      if (!shadow) return token;
      const rewritten = { ...token, $value: shadow, value: shadow };
      literal.add(rewritten);
      return rewritten;
    });
    const outputReferences =
      typeof options.outputReferences === 'function'
        ? (token, context) => !literal.has(token) && options.outputReferences(token, context)
        : options.outputReferences;
    const declarations = formattedVariables({
      format: 'css',
      dictionary: { ...dictionary, allTokens },
      outputReferences,
      usesDtcg: options.usesDtcg,
    });
    return `${header}${file.options.selector} {\n${declarations}\n}\n`;
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
  // The atoms of the composite shadows (shadow.<size>.<layer>.<field>) only
  // feed style.shadow.*; as box-shadow utilities they'd be invalid.
  shadow: 'shadowAtoms',
  spacing: 'spacing',
};

// Composite shadows from Tokens Studio (style.<kind>.<size>) become Tailwind's
// shadow utilities: shadow-xs, inset-shadow-sm… style.drop-shadow.* is left
// out: its values carry a spread, which the drop-shadow() filter doesn't take.
const STYLE_TO_THEME_KEY = {
  shadow: 'boxShadow',
  'inset-shadow': 'insetShadow',
};

function toCamelCase(value) {
  return value.replace(/[-_](\w)/g, (_, char) => char.toUpperCase());
}

function resolveTailwindEntry(token) {
  const [top, ...rest] = token.path;
  if (top === 'style' && STYLE_TO_THEME_KEY[rest[0]]) {
    return { themeKey: STYLE_TO_THEME_KEY[rest[0]], tokenKey: rest.slice(1).join('-') };
  }
  // Control heights size buttons, inputs and selects, through every sizing
  // utility: h-control-height-md, size-control-height-sm, min-h-…
  if (top === 'control-height') {
    return { themeKey: 'spacing', tokenKey: token.path.join('-') };
  }
  const themeKey = CATEGORY_TO_THEME_KEY[top] ?? toCamelCase(top);
  const tokenKey = rest.join('-') || top;
  return { themeKey, tokenKey };
}

// Points every token at its CSS custom property instead of a resolved value,
// so the preset stays valid across brands, products, modes and platforms
// (those swap which custom property values are active, not this file).
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
// inline styles and CSS-in-JS that should keep following the active brand,
// product, mode and platform instead of freezing one theme's values.
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
// Manifest — brands, products, modes and platforms are derived from the set
// names and the Tokens Studio themes ($themes[].selectedTokenSets).
// ---------------------------------------------------------------------------

export function slugify(value) {
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

// "<brand>/base" or "<brand>/<product>".
function brandLayer(setKey) {
  const parts = setKey.split('/');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(`Set "${setKey}" is not "<brand>/base" or "<brand>/<product>" (see arquitetura.md).`);
  }
  return { brand: slugify(parts[0]), layer: slugify(parts[1]) };
}

function themesOf(themes, groups, setOrder) {
  const matches = themes.filter((theme) => groups.includes(theme.group));
  if (matches.length === 0) {
    throw new Error(
      `No theme with group ${groups.map((group) => `"${group}"`).join(' or ')} found in $themes. Update THEME_GROUPS in build.mjs to match the groups defined in Tokens Studio.`,
    );
  }
  const byOrder = (a, b) => setOrder.indexOf(a) - setOrder.indexOf(b);
  return matches.map((theme) => {
    const entries = Object.entries(theme.selectedTokenSets ?? {});
    return {
      name: theme.name,
      slug: slugify(theme.name),
      enabled: entries.filter(([, status]) => status === 'enabled').map(([key]) => key).sort(byOrder),
      source: entries.filter(([, status]) => status === 'source').map(([key]) => key),
    };
  });
}

export async function loadManifest(sourceFile = SOURCE_FILE) {
  const content = JSON.parse(await readFile(sourceFile, 'utf-8'));
  const sets = Object.fromEntries(Object.entries(content).filter(([key]) => !key.startsWith('$')));
  const themes = content.$themes ?? [];
  const setOrder = content.$metadata?.tokenSetOrder ?? Object.keys(sets);

  for (const key of [PRIMITIVES_SET, FOUNDATIONS_SET]) {
    if (!(key in sets)) throw new Error(`Set "${key}" not found in tokens.json (see arquitetura.md).`);
  }

  const products = themesOf(themes, THEME_GROUPS.product, setOrder);
  const modes = themesOf(themes, THEME_GROUPS.mode, setOrder);
  const platforms = themesOf(themes, THEME_GROUPS.platform, setOrder);

  // Each brand theme uses the foundations plus its brand chain: one or more
  // bases (a brand that inherits another, e.g. pas/base → tchello/base) and at
  // most one product. The last base names the brand. The foundations may be
  // "enabled" or "source" (source keeps them in their own Figma collection,
  // aliased by the brand one); the build always applies them first.
  const brands = new Map();
  const productLayers = new Map();
  for (const theme of products) {
    if (!theme.enabled.includes(FOUNDATIONS_SET) && !theme.source.includes(FOUNDATIONS_SET)) {
      throw new Error(`Theme "${theme.name}" doesn't use "${FOUNDATIONS_SET}" (enabled or source).`);
    }
    const chain = theme.enabled.filter((key) => key !== FOUNDATIONS_SET);
    const bases = chain.filter((key) => brandLayer(key).layer === BASE_LAYER);
    const productSets = chain.filter((key) => brandLayer(key).layer !== BASE_LAYER);
    if (bases.length === 0 || productSets.length > 1) {
      throw new Error(`Theme "${theme.name}" must enable at least one "<brand>/base" and at most one "<brand>/<product>".`);
    }

    theme.brand = brandLayer(bases.at(-1)).brand;
    theme.baseSetKeys = bases;
    theme.setKeys = chain;
    const known = brands.get(theme.brand);
    if (known && known.join() !== bases.join()) {
      throw new Error(`Themes of brand "${theme.brand}" enable different bases: ${known.join(', ')} / ${bases.join(', ')}.`);
    }
    brands.set(theme.brand, bases);

    if (productSets.length === 1) {
      const { brand, layer } = brandLayer(productSets[0]);
      if (brand !== theme.brand) {
        throw new Error(`Theme "${theme.name}" combines product "${productSets[0]}" with brand "${theme.brand}".`);
      }
      theme.product = layer;
      productLayers.set(`${brand}/${layer}`, { brand, product: layer, setKey: productSets[0] });
    }
  }

  for (const theme of [...modes, ...platforms]) {
    theme.setKeys = theme.enabled;
  }

  // Modes and platforms reference brand tokens (e.g. palette.primary.light),
  // whose *values* differ per brand but whose *names* are the same. Merging
  // every brand layer into one set gives those references something to resolve
  // against; the values never reach the output, since references to emitted
  // tokens are written as var(--...).
  const brandUnion = {};
  for (const theme of products) {
    for (const key of theme.setKeys) deepMerge(brandUnion, sets[key]);
  }

  return { sets, setOrder, products, modes, platforms, brands, productLayers, brandUnion };
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

const BRAND_UNION_FILE = '__brand-union.json';
const PRIMITIVES_FILE = `${slugify(PRIMITIVES_SET)}.json`;

// Primitives are never emitted: they only resolve values.
function isExported(token) {
  return path.basename(token.filePath ?? '') !== PRIMITIVES_FILE;
}

// Each set is written to its own temp file, so Style Dictionary's normal
// multi-source merge flattens them into one token tree and tags every token
// with the originating file — which is how each output keeps only its own
// layer (filter by filePath), and how references to primitives are found.
async function materializeSets(tmpDir, sets, brandUnion) {
  const fileForSet = new Map();
  for (const [key, value] of Object.entries(sets)) {
    const fileName = `${slugify(key)}.json`;
    await writeFile(path.join(tmpDir, fileName), JSON.stringify(value));
    fileForSet.set(key, fileName);
  }
  await writeFile(path.join(tmpDir, BRAND_UNION_FILE), JSON.stringify(brandUnion));
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

// A reference is kept as var(--...) when it points only at emitted tokens; a
// reference to a primitive is resolved, since primitives never become custom
// properties. Composite values are resolved too (except shadows, rewritten
// field by field in css/scoped-variables), because Style Dictionary can swap
// the var() of fields that share a value.
function cssReferences(token, { dictionary }) {
  const usesDtcg = '$value' in token.original;
  const original = usesDtcg ? token.original.$value : token.original.value;
  if (typeof original === 'object' && original !== null) return false;
  const refs = getReferences(original, dictionary.unfilteredTokens ?? dictionary.tokens, {
    usesDtcg,
    warnImmediately: false,
  });
  return refs.length > 0 && refs.every(isExported);
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

export const PLATFORM_CONFIG = {
  css: { transformGroup: 'tokens-studio', transforms: ['name/kebab', 'ds/line-height/px', 'ds/font-family/fallback'] },
  ts: { transformGroup: 'tokens-studio', transforms: ['name/camel', 'ds/line-height/px', 'ds/font-family/fallback'] },
  android: {
    transforms: [...NATIVE_BASE_TRANSFORMS, 'ds/size/android', 'color/hex8android', 'name/snake'],
  },
  ios: {
    transforms: [...NATIVE_BASE_TRANSFORMS, 'ds/size/swift', 'ds/font-family/swift', 'color/ColorSwiftUI', 'name/camel'],
  },
};

export const STYLE_DICTIONARY_OPTIONS = {
  preprocessors: ['tokens-studio'],
  expand: { typesMap: expandTypesMap, include: EXPANDED_TYPES },
  log: LOG_CONFIG,
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

function createBuilder(tmpDir, fileForSet) {
  const toFiles = (setKeys) => setKeys.map((key) => (key === BRAND_UNION_FILE ? key : fileForSet.get(key)));

  // `platforms` maps a PLATFORM_CONFIG key to the files it writes. Each file
  // only gets tokens from `outputSetKeys`, further narrowed by its own filter.
  // The primitives are always included, to resolve references.
  return async function buildLayer({ setKeys, outputSetKeys, platforms }) {
    const sourceFiles = toFiles([PRIMITIVES_SET, ...setKeys]);
    const baseFilter = fromFiles(toFiles(outputSetKeys));

    const sd = new StyleDictionary({
      ...STYLE_DICTIONARY_OPTIONS,
      source: sourceFiles.map((file) => path.join(tmpDir, file).replace(/\\/g, '/')),
      platforms: Object.fromEntries(
        Object.entries(platforms).map(([platform, files]) => [
          platform,
          {
            ...PLATFORM_CONFIG[platform],
            buildPath: `${DIST_DIR.replace(/\\/g, '/')}/`,
            options: { outputReferences: platform === 'css' ? cssReferences : false },
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

function cssFile(destination, selector) {
  return { destination, format: 'css/scoped-variables', options: { selector } };
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
// values-night and desktop to a minimum-width qualifier at the breakpoint
// token — the OS picks the right file with no code.
const ANDROID_MODE_QUALIFIER = { dark: 'night' };

function androidModeDir(mode, isDefault) {
  if (isDefault) return 'values';
  const qualifier = ANDROID_MODE_QUALIFIER[mode.slug];
  if (!qualifier) {
    throw new Error(`No Android resource qualifier for mode "${mode.name}". Add it to ANDROID_MODE_QUALIFIER in build.mjs.`);
  }
  return `values-${qualifier}`;
}

// Native and TS outputs can't switch layers by cascade, so they get resolved
// values per brand theme: one layer per mode (everything the theme shows in
// that mode) and one per platform (just the platform tokens).
function resolvedOutputs({ theme, modes, platforms, breakpoint }) {
  const base = [FOUNDATIONS_SET, ...theme.setKeys];
  const className = toPascalCase(theme.slug);

  return [
    ...modes.map((mode, index) => {
      const isDefault = index === 0;
      const valuesDir = `android/${theme.slug}/${androidModeDir(mode, isDefault)}`;
      return {
        setKeys: [...base, ...mode.setKeys],
        outputSetKeys: [...base, ...mode.setKeys],
        platforms: {
          ts: tsFiles(`ts/${theme.slug}/${mode.slug}`),
          // Non-color tokens are the same in every mode, so only the default
          // mode writes them; other modes only override colors.
          android: isDefault
            ? [androidFile(`${valuesDir}/colors.xml`, isColor), androidFile(`${valuesDir}/tokens.xml`, isNotColor)]
            : [androidFile(`${valuesDir}/colors.xml`, isColor)],
          ios: [swiftFile(`ios/${theme.slug}/${className}${toPascalCase(mode.slug)}.swift`, `${className}${toPascalCase(mode.slug)}`)],
        },
      };
    }),
    ...platforms.map((platform) => {
      const valuesDir = /mobile/i.test(platform.name) ? 'values' : `values-w${breakpoint}dp`;
      return {
        setKeys: [...base, ...platform.setKeys],
        outputSetKeys: platform.setKeys,
        platforms: {
          ts: tsFiles(`ts/${theme.slug}/${platform.slug}`),
          android: [androidFile(`android/${theme.slug}/${valuesDir}/platform.xml`)],
          ios: [swiftFile(`ios/${theme.slug}/${className}${toPascalCase(platform.slug)}.swift`, `${className}${toPascalCase(platform.slug)}`)],
        },
      };
    }),
  ];
}

// CSS layers in cascade order: what index.css imports, and what the
// acceptance test applies for each theme combination.
export function cssLayers({ brands, productLayers, modes, platforms }) {
  return [
    { kind: 'foundations', setKeys: [FOUNDATIONS_SET], outputSetKeys: [FOUNDATIONS_SET], file: 'css/foundations.css', selector: ':root' },
    ...[...brands].flatMap(([brand, bases]) => [
      {
        kind: 'brand',
        brand,
        // The brand's products come before its bases only to resolve base
        // tokens that point at product-only tokens (an ITSS base token can
        // reference a palette color each product defines); those references
        // are written as var(), and the products' values aren't emitted here.
        setKeys: [
          FOUNDATIONS_SET,
          ...[...productLayers.values()].filter((layer) => layer.brand === brand).map((layer) => layer.setKey),
          ...bases,
        ],
        // A brand that inherits another (tchello ← pas) emits the whole chain
        // under its own selector, since [data-brand] holds a single brand.
        outputSetKeys: bases,
        file: `css/${brand}/base.css`,
        selector: `[data-brand="${brand}"]`,
      },
      ...[...productLayers.values()]
        .filter((layer) => layer.brand === brand)
        .map((layer) => ({
          kind: 'product',
          brand,
          product: layer.product,
          setKeys: [FOUNDATIONS_SET, ...bases, layer.setKey],
          outputSetKeys: [layer.setKey],
          file: `css/${brand}/${layer.product}.css`,
          selector: `[data-brand="${brand}"][data-product="${layer.product}"]`,
        })),
    ]),
    ...modes.map((mode) => ({
      kind: 'mode',
      mode: mode.slug,
      setKeys: [FOUNDATIONS_SET, BRAND_UNION_FILE, ...mode.setKeys],
      outputSetKeys: mode.setKeys,
      file: `css/themes/${mode.slug}.css`,
      selector: `[data-mode="${mode.slug}"]`,
    })),
    ...platforms.map((platform) => ({
      kind: 'platform',
      platform: platform.slug,
      setKeys: [FOUNDATIONS_SET, BRAND_UNION_FILE, ...platform.setKeys],
      outputSetKeys: platform.setKeys,
      file: `css/platforms/${platform.slug}.css`,
      selector: `[data-platform="${platform.slug}"]`,
    })),
  ];
}

async function writeGenerated(relativePath, body) {
  const target = path.join(DIST_DIR, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `/**\n * Do not edit directly, this file was auto-generated.\n */\n${body}`);
}

// `clean: false` (watch mode) overwrites dist/ in place instead of deleting it
// first: a running Storybook would otherwise import the CSS while it's gone
// and stay stuck loading. A full build still cleans, so files of a renamed
// brand or product don't linger in dist/.
export async function build({ clean = true } = {}) {
  const manifest = await loadManifest();
  const { sets, products, modes, platforms, brandUnion } = manifest;

  const breakpoint = parseFloat(readTokenValue(sets, MOBILE_BREAKPOINT_TOKEN));
  if (Number.isNaN(breakpoint)) {
    throw new Error(`Token "${MOBILE_BREAKPOINT_TOKEN}" (MOBILE_BREAKPOINT_TOKEN in build.mjs) not found or not numeric.`);
  }

  // Cleaned once up front instead of per Style Dictionary instance: the
  // builds below run in parallel and share dist/, so a per-instance
  // cleanAllPlatforms() can delete files/dirs another build is writing.
  // Retries cover Windows briefly locking a file that an editor or file
  // watcher has open (EBUSY/EPERM), which otherwise fails the build at random.
  if (clean) await rm(DIST_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });

  const tmpDir = await mkdtemp(path.join(tmpdir(), 'ds-tokens-'));
  try {
    const fileForSet = await materializeSets(tmpDir, sets, brandUnion);
    const buildLayer = createBuilder(tmpDir, fileForSet);
    const layers = cssLayers(manifest);
    const [defaultMode] = modes;
    const [defaultPlatform] = platforms;
    const everyName = [FOUNDATIONS_SET, BRAND_UNION_FILE, ...defaultMode.setKeys, ...defaultPlatform.setKeys];

    const outputs = [
      ...layers.map((layer) => ({
        setKeys: layer.setKeys,
        outputSetKeys: layer.outputSetKeys,
        platforms: { css: [cssFile(layer.file, layer.selector)] },
      })),
      // Token *names* are the same across brands, modes and platforms, so the
      // union of brands plus the default mode and platform has every name for
      // the preset and the vars.
      {
        setKeys: everyName,
        outputSetKeys: everyName,
        platforms: {
          css: [
            { destination: 'tailwind/preset.cjs', format: 'tailwind/preset' },
            { destination: 'ts/vars.js', format: 'javascript/css-vars' },
            { destination: 'ts/vars.d.ts', format: 'typescript/css-vars-declarations' },
          ],
        },
      },
      ...products.flatMap((theme) => resolvedOutputs({ theme, modes, platforms, breakpoint })),
    ];

    await Promise.all(outputs.map(buildLayer));

    await writeGenerated(
      'css/index.css',
      `${layers.map((layer) => `@import "${layer.file.replace(/^css\//, './')}";`).join('\n')}\n`,
    );

    // One entry point per brand theme: `import { light, desktop } from '.../ts/pas-cms'`.
    const layerSlugs = [...modes, ...platforms].map((layer) => layer.slug);
    const reExports = `${layerSlugs.map((slug) => `export * as ${toCamelCase(slug)} from './${slug}.js';`).join('\n')}\n`;
    for (const theme of products) {
      await writeGenerated(`ts/${theme.slug}/index.js`, reExports);
      await writeGenerated(`ts/${theme.slug}/index.d.ts`, reExports);
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }

  const productKeys = [...manifest.productLayers.keys()];
  console.log(
    `[tokens] built foundations, ${manifest.brands.size} brand(s) (${[...manifest.brands.keys()].join(', ')}), ` +
      `${productKeys.length} product override(s) (${productKeys.join(', ')}), ` +
      `${modes.length} mode(s) (${modes.map((m) => m.slug).join(', ')}), ` +
      `${platforms.length} platform(s) (${platforms.map((p) => p.slug).join(', ')}) for css, tailwind, ts, android and ios`,
  );
}

async function main() {
  const watchMode = process.argv.includes('--watch');
  await build({ clean: !watchMode });

  if (watchMode) {
    console.log('[tokens] watching src/tokens-studio for changes...');
    watch(TOKENS_DIR, { recursive: true }, async (_event, filename) => {
      try {
        console.log(`[tokens] ${filename} changed, rebuilding...`);
        await build({ clean: false });
      } catch (error) {
        console.error('[tokens] build failed:', error);
      }
    });
  }
}

// Run only as a script, so the acceptance test can import the manifest.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
