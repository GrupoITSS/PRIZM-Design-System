import { describe, expect, it } from "vitest";
import { kbdGroupStyles, kbdSeparatorStyles, kbdStyles } from "./kbd.styles";
import map from "./kbd.tokens.json";

// Figma token name → Tailwind class suffix: "color/muted" → "muted",
// "spacing/1" → "1", "radius/sm" → "sm", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");
const opacity = (value: number) => (value === 1 ? "" : `/${Math.round(value * 100)}`);

const kbd = kbdStyles.split(" ");
const separator = kbdSeparatorStyles.split(" ");

describe("Kbd × mapa de tokens (kbd.tokens.json)", () => {
  it("cobre os três contextos do Figma", () => {
    expect(Object.keys(map.contexts)).toEqual(["padrao", "sobrePrimary", "sobreDestructive"]);
  });

  for (const [name, c] of Object.entries(map.contexts)) {
    it(`${name}: fundo e texto do mapa estão nas classes`, () => {
      const prefix = c.buttonVariant
        ? `[[data-slot=button][data-variant=${c.buttonVariant}]_&]:`
        : "";
      expect(kbd).toContain(`${prefix}bg-${color(c.background)}${opacity(c.backgroundOpacity)}`);
      expect(kbd).toContain(`${prefix}text-${color(c.text)}`);
    });
  }

  it("só botão cheio muda o contexto: nenhuma regra para outras variantes do Button", () => {
    const variants = Object.values(map.contexts)
      .map((c) => c.buttonVariant)
      .filter(Boolean);
    const buttonRules = kbd.filter((c) => c.startsWith("[[data-slot=button]"));
    for (const rule of buttonRules) {
      expect(variants.some((v) => rule.startsWith(`[[data-slot=button][data-variant=${v}]_&]:`))).toBe(
        true,
      );
    }
  });

  it("tamanho: altura, largura mínima, padding, gap, raio, fonte e ícone do mapa estão nas classes", () => {
    const s = map.sizes.default;
    expect(kbd).toContain(`h-${step(s.height)}`);
    expect(kbd).toContain(`min-w-${step(s.minWidth)}`);
    expect(kbd).toContain(`px-${step(s.paddingX)}`);
    expect(kbd).toContain(`gap-${step(s.gap)}`);
    expect(kbd).toContain(`rounded-${step(s.radius)}`);
    expect(kbd).toContain(`font-${step(s.fontFamily)}`);
    expect(kbd).toContain(`text-${step(s.fontSize)}`);
    expect(kbd).toContain(`font-${step(s.fontWeight)}`);
    // 12px = size-3
    expect(kbd.some((c) => c.endsWith("]:size-3"))).toBe(true);
  });

  it("grupo: espaço entre as teclas do mapa está nas classes", () => {
    expect(kbdGroupStyles.split(" ")).toContain(`gap-${step(map.group.gap)}`);
  });

  it("separador: cor, tamanho e peso do mapa estão nas classes", () => {
    const sep = map.parts.separator;
    expect(separator).toContain(`text-${color(sep.text)}`);
    expect(separator).toContain(`text-${step(sep.fontSize)}`);
    expect(separator).toContain(`font-${step(sep.fontWeight)}`);
  });

  it("estados: o mapa registra que o Kbd é estático, e o código não tem hover nem foco", () => {
    expect(map.states.hover).toBeNull();
    expect(map.states.focus).toBeNull();
    expect(kbd.some((c) => /^(hover|focus|focus-visible):/.test(c))).toBe(false);
    expect(kbd).toContain("pointer-events-none");
  });
});
