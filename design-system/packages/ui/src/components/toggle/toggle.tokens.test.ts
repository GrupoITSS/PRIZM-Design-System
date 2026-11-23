import { describe, expect, it } from "vitest";
import { toggleVariants } from "./toggle.styles";
import map from "./toggle.tokens.json";

// Figma token name → Tailwind class suffix: "color/primary" → "primary",
// "control-height/md" → "control-height-md", "spacing/1-5" → "1.5", "text/sm" → "sm".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");
const step = (token: string) => (token.split("/").pop() ?? token).replace("-", ".");

const classesOf = (variant: "default" | "outline", size: "sm" | "default" | "lg" = "default") =>
  toggleVariants({ variant, size }).split(" ");

describe("Toggle × mapa de tokens (toggle.tokens.json)", () => {
  it("cobre as variantes e os tamanhos do código", () => {
    expect(Object.keys(map.variants)).toEqual(["default", "outline"]);
    expect(Object.keys(map.sizes)).toEqual(["sm", "default", "lg"]);
  });

  it("default: sem fundo e sem borda", () => {
    const classes = classesOf("default");
    expect(classes).toContain("bg-transparent");
    expect(classes).not.toContain("border");
  });

  it("outline: fundo, borda, sombra e borda do ligado do mapa (P1)", () => {
    const o = map.variants.outline;
    const classes = classesOf("outline");
    expect(classes).toContain(`bg-${color(o.background)}`);
    expect(classes).toContain(`border-${color(o.border)}`);
    expect(classes).toContain("border");
    expect(classes).toContain(`shadow-${o.shadow.split("/").pop() ?? ""}`);
    expect(classes).toContain(`data-[state=on]:border-${color(o.pressedBorder)}`);
  });

  it("hover, ligado e ligado no hover do mapa (TG3, TG5)", () => {
    const s = map.states;
    const classes = classesOf("default");
    expect(classes).toContain(`hover:bg-${color(s.hover.background)}`);
    expect(classes).toContain(`hover:text-${color(s.hover.text)}`);
    expect(classes).toContain(`data-[state=on]:bg-${color(s.pressed.background)}`);
    expect(classes).toContain(`data-[state=on]:text-${color(s.pressed.text)}`);
    expect(classes).toContain("data-[state=on]:hover:bg-[color-mix(in_srgb,var(--prizm-color-primary),black_10%)]");
    expect(classes).toContain(`data-[state=on]:hover:text-${color(s.pressed.text)}`);
  });

  it("foco: anel e espaço do mapa (TG4)", () => {
    const f = map.states.focus;
    const classes = classesOf("outline");
    expect(classes).toContain(`focus-visible:ring-[${f.ringWidth}px]`);
    expect(classes).toContain(`focus-visible:ring-${color(f.ring)}`);
    expect(classes).toContain(`focus-visible:ring-offset-${f.ringOffsetWidth}`);
    expect(classes).toContain(`focus-visible:ring-offset-${color(f.ringOffset)}`);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura, largura mínima e padding do mapa (TG1)`, () => {
      const classes = classesOf("default", size as "sm" | "default" | "lg");
      expect(classes).toContain(`h-${scale(tokens.height)}`);
      expect(classes).toContain(`min-w-${scale(tokens.minWidth)}`);
      expect(classes).toContain(`px-${step(tokens.paddingX)}`);
    });
  }

  it("texto, raio, espaço e ícone do mapa", () => {
    const classes = classesOf("default");
    expect(classes).toContain(`text-${step(map.typography.fontSize)}`);
    expect(classes).toContain(`font-${step(map.typography.fontWeight)}`);
    expect(classes).toContain(`rounded-${step(map.radius)}`);
    expect(classes).toContain(`gap-${step(map.gap)}`);
    // width/4 = 16px = size-4
    expect(classes).toContain(`[&_svg:not([class*='size-'])]:size-${step(map.icon.size)}`);
    expect(classes).toContain(`disabled:opacity-${step(map.states.disabled.opacity)}`);
  });

  it("toda divergência tem Figma, código e status", () => {
    for (const d of map.divergences) {
      expect(["aberta", "representação"]).toContain(d.status);
      expect(d.figma).not.toBe("");
      expect(d.code).not.toBe("");
    }
  });
});
