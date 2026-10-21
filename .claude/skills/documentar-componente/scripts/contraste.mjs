#!/usr/bin/env node
// Mede contraste WCAG entre pares de tokens compilados do Prizm, em todas as marcas e modos.
//
// Uso:
//   node contraste.mjs <dist/ts> <texto>/<fundo>[@opacidade] [...] [--sobre <token>] [--min 4.5]
//
// Exemplos:
//   node contraste.mjs packages/tokens/dist/ts primary-foreground/primary destructive-strong/destructive-weak
//   node contraste.mjs packages/tokens/dist/ts ring/background --min 3
//   node contraste.mjs packages/tokens/dist/ts foreground/input-background
//
// Tokens em kebab-case, sem o prefixo "color" (primary-foreground -> colorPrimaryForeground).
// "@0.8" aplica opacidade ao fundo (hover a 80%). Fundo com alfa (rgba, #rrggbbaa) é
// misturado sobre o token de --sobre (padrão: background) antes de medir; texto com alfa,
// sobre o fundo já resolvido.
import { readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const dist = resolve(args.shift() || '');
let sobre = 'background';
let min = 4.5;
const pares = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--sobre') sobre = args[++i];
  else if (args[i] === '--min') min = Number(args[++i]);
  else pares.push(args[i]);
}
if (!existsSync(dist) || !pares.length) {
  console.error('Uso: node contraste.mjs <dist/ts> <texto>/<fundo>[@opacidade] ... [--sobre token] [--min 4.5]');
  process.exit(1);
}

const nome = t => 'color' + t.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
const parse = v => {
  if (!v) return null;
  let m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(v);
  if (m) {
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, m[2] ? parseInt(m[2], 16) / 255 : 1];
  }
  m = /^rgba?\(([^)]+)\)$/.exec(v);
  if (m) {
    const p = m[1].split(',').map(Number);
    return [p[0], p[1], p[2], p[3] ?? 1];
  }
  if (v === 'transparent') return [0, 0, 0, 0];
  return null;
};
const mix = (c, base) => [0, 1, 2].map(i => c[i] * c[3] + base[i] * (1 - c[3])).concat(1);
const lum = c => {
  const [r, g, b] = c.slice(0, 3).map(x => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const razao = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const fmt = r => r.toFixed(2).replace('.', ',') + ':1';

const marcas = readdirSync(dist, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort();
const linhas = [];
let reprovados = 0;
for (const marca of marcas) {
  for (const modo of ['light', 'dark']) {
    const arq = join(dist, marca, modo + '.js');
    if (!existsSync(arq)) continue;
    const t = await import(pathToFileURL(arq).href);
    const base = parse(t[nome(sobre)]);
    const celulas = pares.map(par => {
      const [fgTok, resto] = par.split('/');
      const [bgTok, op] = resto.split('@');
      let bg = parse(t[nome(bgTok)]);
      let fg = parse(t[nome(fgTok)]);
      if (!bg || !fg || !base) return 'ausente';
      if (op) bg = [...bg.slice(0, 3), bg[3] * Number(op)];
      bg = mix(bg, base);
      fg = mix(fg, bg);
      const r = razao(fg, bg);
      if (r < min) reprovados++;
      return fmt(r) + (r < min ? ' ✗' : '');
    });
    linhas.push([`${marca} · ${modo === 'light' ? 'claro' : 'escuro'}`, ...celulas]);
  }
}
console.log(`| Marca · modo | ${pares.join(' | ')} |`);
console.log(`| --- |${pares.map(() => ' --- |').join('')}`);
for (const l of linhas) console.log(`| ${l.join(' | ')} |`);
console.log(`\n${linhas.length * pares.length - reprovados} de ${linhas.length * pares.length} pares passam o mínimo de ${String(min).replace('.', ',')}:1 (fundo com alfa sobre ${sobre}).`);
