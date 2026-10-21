import { describe, expect, it } from "vitest";
import { badgeVariants } from "./badge.styles";
import map from "./badge.tokens.json";

// Figma token name → Tailwind class suffix: "color/primary" → "primary",
// "spacing/0-5" → "0.5", "radius/md" → "md", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");

const classesOf = (variant: string, shape = "default", size = "sm") =>
  badgeVariants({ variant: variant as never, shape: shape as never, size: size as never }).split(
    " ",
  );

describe("Badge × mapa de tokens (badge.tokens.json)", () => {
  it("cobre todas as variantes, tamanhos e formas do código", () => {
    expect(Object.keys(map.variants).sort()).toEqual(
      ["default", "secondary", "outline", "destructive", "success", "verified", "warning"].sort(),
    );
    expect(Object.keys(map.sizes)).toEqual(["sm", "md", "lg"]);
    expect(Object.keys(map.shapes)).toEqual(["number"]);
  });

  for (const [variant, tokens] of Object.entries(map.variants)) {
    it(`${variant}: fundo, texto e borda do mapa estão nas classes`, () => {
      const classes = classesOf(variant);
      expect(classes).toContain(`bg-${color(tokens.background)}`);
      expect(classes).toContain(`text-${color(tokens.text)}`);
      if (tokens.border) expect(classes).toContain(`border-${color(tokens.border)}`);
    });
  }

  for (const [size, s] of Object.entries(map.sizes)) {
    it(`${size}: altura, padding, gap, ícone, raio e texto do mapa estão nas classes`, () => {
      const classes = classesOf("default", "default", size);
      expect(classes).toContain(`h-${step(s.height)}`);
      expect(classes).toContain(`px-${step(s.paddingX)}`);
      expect(classes).toContain(`py-${step(s.paddingY)}`);
      expect(classes).toContain(`gap-${step(s.gap)}`);
      expect(classes.some((c) => c.endsWith(`]:size-${step(s.icon)}`))).toBe(true);
      expect(classes).toContain(`rounded-${step(s.radius)}`);
      expect(classes).toContain(`text-${step(s.fontSize)}`);
      expect(classes).toContain(`font-${step(s.fontWeight)}`);
    });
  }

  it("forma number: largura mínima, padding e raio do mapa estão nas classes", () => {
    const classes = classesOf("default", "number");
    const n = map.shapes.number;
    expect(classes).toContain(`min-w-${step(n.minWidth)}`);
    expect(classes).toContain(`px-${step(n.paddingX)}`);
    expect(classes).toContain(`rounded-${step(n.radius)}`);
  });

  it("estados: o mapa registra que o Badge é estático, e o código não tem hover nem foco", () => {
    expect(map.states.hover).toBeNull();
    expect(map.states.focus).toBeNull();
    for (const variant of Object.keys(map.variants)) {
      const classes = classesOf(variant);
      expect(classes.some((c) => /^(hover|focus|focus-visible):/.test(c))).toBe(false);
    }
  });
});
