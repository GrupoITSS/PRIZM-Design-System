import { describe, expect, it } from "vitest";
import { skeletonVariants } from "./skeleton.styles";
import map from "./skeleton.tokens.json";

// Figma token → Tailwind class used by the component.
const bg = (token: string) => `bg-${token.split("/")[1]}`;
const radius = (token: string) => `rounded-${token.split("/")[1]}`;
const classesOf = (shape?: keyof typeof map.shapes) => skeletonVariants({ shape }).split(" ");

describe("Skeleton × mapa de tokens (skeleton.tokens.json)", () => {
  it("cobre as formas do código, com os nomes do Figma (Shape)", () => {
    expect(Object.keys(map.shapes)).toEqual(["rect", "pill", "circle"]);
  });

  for (const [shape, s] of Object.entries(map.shapes)) {
    it(`${shape}: fundo e raio do mapa estão nas classes`, () => {
      const classes = classesOf(shape as keyof typeof map.shapes);
      expect(classes).toContain(bg(s.background));
      expect(classes).toContain(radius(s.radius));
    });
  }

  it("circle é quadrado (aspect-square); rect e pill não", () => {
    expect(classesOf("circle")).toContain("aspect-square");
    expect(classesOf("rect")).not.toContain("aspect-square");
    expect(classesOf("pill")).not.toContain("aspect-square");
  });

  it("o padrão é rect", () => {
    expect(classesOf()).toContain(radius(map.shapes.rect.radius));
  });

  it("pulso: o código do mapa, com o número de ciclos", () => {
    const classes = classesOf();
    expect(classes).toContain(map.animation.code);
    expect(classes).toContain(`[animation-iteration-count:${map.animation.iterations}]!`);
    expect(map.animation.reducedMotion).toBeNull();
    expect(classes.some((c) => c.startsWith("motion-reduce:"))).toBe(false);
  });

  it("estados: o Skeleton não tem hover nem foco", () => {
    expect(map.states.hover).toBeNull();
    expect(map.states.focus).toBeNull();
    expect(classesOf().some((c) => /^(hover|focus|focus-visible):/.test(c))).toBe(false);
  });
});
