import { describe, expect, it } from "vitest";
import { alertRoles, alertTitleStyles, alertVariants } from "./alert.styles";
import map from "./alert.tokens.json";

// Figma token → Tailwind: "color/destructive-weak" → "destructive-weak", "spacing/4" → "4".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1];

type Variant = keyof typeof map.variants;
const classesOf = (variant: Variant) => alertVariants({ variant }).split(" ");

describe("Alert × mapa de tokens (alert.tokens.json)", () => {
  it("cobre todas as variantes do código", () => {
    expect(Object.keys(map.variants).sort()).toEqual(
      ["default", "destructive", "warning", "success", "info"].sort(),
    );
    expect(Object.keys(alertRoles).sort()).toEqual(Object.keys(map.variants).sort());
  });

  for (const [variant, v] of Object.entries(map.variants) as [Variant, (typeof map.variants)[Variant]][]) {
    it(`${variant}: fundo, borda, ícone e título do mapa estão nas classes`, () => {
      const classes = classesOf(variant);
      expect(classes).toContain(`bg-${color(v.background)}`);
      expect(classes).toContain(`border-${color(v.border)}`);
      expect(classes).toContain(`[&>svg]:text-${color(v.icon)}`);
      expect(classes).toContain(`text-${color(v.title)}`);
    });

    it(`${variant}: descrição na cor do mapa`, () => {
      const classes = classesOf(variant);
      const override = `[&_[data-slot=alert-description]]:text-${color(v.description)}`;
      // Quando a descrição tem a cor do título, ela só herda; senão, há uma classe para ela.
      if (v.description === v.title) expect(classes.some((c) => c.includes("alert-description"))).toBe(false);
      else expect(classes).toContain(override);
    });

    it(`${variant}: papel ${v.role}`, () => {
      expect(alertRoles[variant]).toBe(v.role);
    });
  }

  it("medidas: espaço, raio, borda e ícone", () => {
    const classes = classesOf("default");
    const l = map.layout;
    expect(classes).toContain(`px-${step(l.paddingX)}`);
    expect(classes).toContain(`py-${step(l.paddingY)}`);
    expect(classes).toContain(`rounded-${step(l.radius)}`);
    expect(classes).toContain("border");
    expect(classes).toContain(`[&>svg]:size-${step(l.iconSize)}`);
    expect(classes).toContain(`[&>svg]:left-${step(l.paddingX)}`);
  });

  it("título: text/sm e font-weight/medium, com o espaço até a descrição", () => {
    const t = alertTitleStyles.split(" ");
    expect(t).toContain("text-sm");
    expect(t).toContain("font-medium");
    expect(t).toContain(`mb-${step(map.layout.titleGap)}`);
  });

  it("estados: sem hover nem foco", () => {
    expect(map.states.hover).toBeNull();
    expect(map.states.focus).toBeNull();
    expect(classesOf("default").some((c) => /^(hover|focus|focus-visible):/.test(c))).toBe(false);
  });
});
