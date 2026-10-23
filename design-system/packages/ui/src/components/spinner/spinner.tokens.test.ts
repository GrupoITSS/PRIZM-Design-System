import { describe, expect, it } from "vitest";
import { getSpinnerClassName, spinnerSpeeds } from "./spinner.styles";
import map from "./spinner.tokens.json";

// Figma stroke-width token → px: "stroke-width/1-33" → 1.33.
const strokePx = (token: string) => Number(token.split("/")[1].replace("-", "."));
// Lucide draws a 2px stroke in a 24px box; the stroke grows with the size.
const lucideStroke = (px: number) => Math.round(((2 * px) / 24) * 100) / 100;
const px = (size: string) => Number(size.replace("px", ""));

describe("Spinner × mapa de tokens (spinner.tokens.json)", () => {
  it("cobre os tamanhos do código, na escala do Figma", () => {
    expect(Object.keys(map.sizes)).toEqual(["xs", "sm", "md", "lg", "xl"]);
  });

  for (const [size, s] of Object.entries(map.sizes)) {
    it(`${size}: o tamanho do mapa está nas classes`, () => {
      const classes = getSpinnerClassName({ size: size as never }).split(" ");
      expect(classes).toContain(`size-${px(s.size) / 4}`);
    });

    it(`${size}: o traço do Figma é o do código, ou a diferença está nas divergências`, () => {
      const same = Math.abs(strokePx(s.strokeWidth) - lucideStroke(px(s.size))) < 0.01;
      const listed = map.divergences.some((d) => d.where.includes(`(${s.size})`));
      expect(same || listed).toBe(true);
    });
  }

  it("velocidades do mapa são as do código", () => {
    for (const speed of ["slow", "normal", "fast"] as const) {
      expect(spinnerSpeeds[speed]).toBe(map.speeds[speed]);
    }
    expect(getSpinnerClassName({}).split(" ")).toContain(
      `motion-reduce:[animation-duration:${map.speeds.reducedMotion}]!`,
    );
  });

  it("estados: o Spinner não tem hover nem foco", () => {
    expect(map.states.hover).toBeNull();
    expect(map.states.focus).toBeNull();
    expect(getSpinnerClassName({}).split(" ").some((c) => /^(hover|focus|focus-visible):/.test(c))).toBe(
      false,
    );
  });
});
