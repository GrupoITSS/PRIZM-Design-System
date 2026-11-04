import { describe, expect, it } from "vitest";
import { popoverContentVariants } from "./popover.styles";
import map from "./popover.tokens.json";

// Figma token name → Tailwind class suffix: "color/popover" → "popover", "radius/md" → "md".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];
const cls = (s: string) => s.split(" ");

describe("Popover × mapa de tokens (popover.tokens.json)", () => {
  it("contêiner: fundo, texto, borda, raio e sombra do mapa", () => {
    const c = map.parts.container;
    const base = cls(popoverContentVariants());
    expect(base).toContain(`bg-${color(c.background)}`);
    expect(base).toContain(`text-${color(c.text)}`);
    expect(base).toContain(`border-${color(c.border)}`);
    expect(base).toContain(`rounded-${suffix(c.radius)}`);
    expect(base).toContain(`shadow-${suffix(c.shadow)}`);
  });

  it("tamanhos: largura e padding do mapa", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const s = map.sizes[size];
      const classes = cls(popoverContentVariants({ size }));
      expect(classes).toContain(s.width);
      expect(classes).toContain(`p-${suffix(s.padding)}`);
    }
  });
});
