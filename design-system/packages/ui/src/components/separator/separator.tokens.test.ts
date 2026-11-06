import { describe, expect, it } from "vitest";
import { separatorVariants } from "./separator.styles";
import map from "./separator.tokens.json";

// Figma token → Tailwind: "color/border" → "border"; "border-width/1" → 1px → "px".
const step = (token: string) => token.split("/")[1];
const cls = (s: string) => s.split(/\s+/);

describe("Separator × mapa de tokens (separator.tokens.json)", () => {
  it("linha na cor do mapa, nas duas orientações", () => {
    for (const orientation of ["horizontal", "vertical"] as const)
      expect(cls(separatorVariants({ orientation }))).toContain(`bg-${step(map.parts.line.color)}`);
  });

  it("espessura de 1px (border-width/1) e comprimento do pai", () => {
    expect(map.parts.line.thickness).toBe("border-width/1");
    for (const orientation of ["horizontal", "vertical"] as const) {
      const c = cls(separatorVariants({ orientation }));
      expect(c).toContain(map.orientations[orientation].thickness);
      expect(c).toContain(map.orientations[orientation].length);
    }
  });
});
