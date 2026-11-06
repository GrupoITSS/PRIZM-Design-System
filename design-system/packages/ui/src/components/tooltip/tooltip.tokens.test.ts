import { describe, expect, it } from "vitest";
import { tooltipArrowStyles, tooltipContentStyles } from "./tooltip.styles";
import map from "./tooltip.tokens.json";

// Figma token → Tailwind: "color/tooltip" → "tooltip", "spacing/1-5" → "1.5", "radius/md" → "md",
// "text/xs" → "xs", "max-width/sm" → "sm", "width/2-5" → "2.5".
const step = (token: string) => {
  const v = token.split("/").slice(1).join("/");
  return /^\d+-\d+$/.test(v) ? v.replace("-", ".") : v;
};
const cls = (s: string) => s.split(/\s+/);
const p = map.parts;

describe("Tooltip × mapa de tokens (tooltip.tokens.json)", () => {
  it("balão: fundo, espaço, raio e largura máxima", () => {
    const c = cls(tooltipContentStyles);
    expect(c).toContain(`bg-${step(p.bubble.background)}`);
    expect(c).toContain(`px-${step(p.bubble.paddingX)}`);
    expect(c).toContain(`py-${step(p.bubble.paddingY)}`);
    expect(c).toContain(`rounded-${step(p.bubble.radius)}`);
    expect(c).toContain(`max-w-${step(p.bubble.maxWidth)}`);
  });

  it("balão: sem sombra e sem borda", () => {
    expect(tooltipContentStyles).not.toMatch(/\bshadow-|\bborder\b|\bborder-/);
  });

  it("texto: cor, tamanho e peso", () => {
    const c = cls(tooltipContentStyles);
    expect(c).toContain(`text-${step(p.text.color)}`);
    expect(c).toContain(`text-${step(p.text.fontSize)}`);
    expect(c).toContain(`font-${step(p.text.fontWeight)}`);
  });

  it("seta: cor do balão e tamanho", () => {
    const c = cls(tooltipArrowStyles);
    expect(c).toContain(`bg-${step(p.arrow.background)}`);
    expect(c).toContain(`fill-${step(p.arrow.background)}`);
    expect(c).toContain(`size-${step(p.arrow.size)}`);
  });
});
