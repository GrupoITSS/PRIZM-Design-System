import { describe, expect, it } from "vitest";
import {
  selectContentStyles,
  selectItemStyles,
  selectLabelStyles,
  selectTriggerVariants,
  selectViewportStyles,
} from "./select.styles";
import map from "./select.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "control-height/md" → "control-height-md", "shadow/xs" → "shadow-xs",
// "spacing/1-5" → "1.5", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");
const spacing = (token: string) => token.replace(/^spacing\//, "").replace("-", ".");
const suffix = (token: string) => token.split("/")[1];

const triggerClasses = (size = "md") => selectTriggerVariants({ size: size as never }).split(" ");
const split = (styles: string) => styles.split(" ");

describe("Select × mapa de tokens (select.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["sm", "md", "lg"].sort());
  });

  it("default: fundo, texto, placeholder, borda e sombra do mapa estão nas classes", () => {
    const classes = triggerClasses();
    const s = map.states.default;
    expect(classes).toContain(`bg-${color(s.background)}`);
    expect(classes).toContain(`text-${color(s.text)}`);
    expect(classes).toContain(`data-[placeholder]:text-${color(s.placeholder)}`);
    expect(classes).toContain(`border-${color(s.border)}`);
    expect(classes).toContain(scale(s.shadow));
  });

  it("foco e lista aberta: anel e borda do mapa estão nas classes", () => {
    const classes = triggerClasses();
    const s = map.states.focus;
    for (const prefix of ["focus-visible:", "data-[state=open]:"]) {
      expect(classes).toContain(`${prefix}ring-${color(s.ring)}`);
      expect(classes).toContain(`${prefix}ring-${s.ringWidth}`);
      expect(classes).toContain(`${prefix}border-${color(s.border)}`);
    }
    expect(classes.some((c) => /^(focus-visible|data-\[state=open\]):ring-offset-/.test(c))).toBe(false);
  });

  it("erro: borda do mapa está nas classes, também com foco e com a lista aberta", () => {
    const classes = triggerClasses();
    expect(classes).toContain(`aria-invalid:border-${color(map.states.error.border)}`);
    expect(classes).toContain(`aria-invalid:focus-visible:border-${color(map.states.errorFocus.border)}`);
    expect(classes).toContain(`aria-invalid:data-[state=open]:border-${color(map.states.errorFocus.border)}`);
  });

  it("disabled: a aparência do default com a opacidade do mapa", () => {
    const classes = triggerClasses();
    const s = map.states.disabled;
    expect(classes).toContain(`disabled:opacity-${suffix(s.opacity)}`);
    expect(s.background).toBe(map.states.default.background);
    expect(s.border).toBe(map.states.default.border);
    expect(classes.some((c) => /^disabled:(bg|border|shadow)-/.test(c))).toBe(false);
  });

  it("lista: fundo, texto, borda, raio, sombra e padding do mapa estão nas classes", () => {
    const classes = split(selectContentStyles);
    const p = map.parts.content;
    expect(classes).toContain(`bg-${color(p.background)}`);
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`border-${color(p.border)}`);
    expect(classes).toContain(`rounded-${suffix(p.radius)}`);
    expect(classes).toContain(scale(p.shadow));
    expect(split(selectViewportStyles)).toContain(`p-${spacing(p.padding)}`);
  });

  it("item: raio, padding, texto e destaque do mapa estão nas classes", () => {
    const classes = split(selectItemStyles);
    const p = map.parts.item;
    expect(classes).toContain(`rounded-${suffix(p.radius)}`);
    expect(classes).toContain(`pl-${spacing(p.paddingLeft)}`);
    expect(classes).toContain(`pr-${spacing(p.paddingRight)}`);
    expect(classes).toContain(`py-${spacing(p.paddingY)}`);
    expect(classes).toContain(`text-${suffix(p.fontSize)}`);
    expect(classes).toContain(`data-[highlighted]:bg-${color(p.highlighted.background)}`);
  });

  it("rótulo da lista: texto, tamanho, peso e padding do mapa estão nas classes", () => {
    const classes = split(selectLabelStyles);
    const p = map.parts.label;
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`text-${suffix(p.fontSize)}`);
    expect(classes).toContain(`font-${suffix(p.fontWeight)}`);
    expect(classes).toContain(`px-${spacing(p.paddingX)}`);
    expect(classes).toContain(`py-${spacing(p.paddingY)}`);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura, padding, gap e raio do mapa estão nas classes`, () => {
      const classes = triggerClasses(size);
      expect(classes).toContain(`h-${scale(tokens.height)}`);
      expect(classes).toContain(`px-${spacing(tokens.paddingX)}`);
      expect(classes).toContain(`py-${spacing(tokens.paddingY)}`);
      expect(classes).toContain(`gap-${spacing(tokens.gap)}`);
      expect(classes).toContain(`rounded-${suffix(tokens.radius)}`);
    });
  }
});
