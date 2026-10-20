import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button";
import map from "./button.tokens.json";

// Figma token name → Tailwind class suffix: "color/primary" → "primary",
// "control-height/md" → "control-height-md", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");

const classesOf = (variant: string, size = "default") =>
  buttonVariants({ variant: variant as never, size: size as never }).split(" ");

describe("Button × mapa de tokens (button.tokens.json)", () => {
  it("cobre todas as variantes e tamanhos do código", () => {
    expect(Object.keys(map.variants).sort()).toEqual(
      ["default", "secondary", "destructive", "outline", "ghost", "link", "text"].sort(),
    );
    expect(Object.keys(map.sizes).sort()).toEqual(
      ["xs", "sm", "default", "lg", "icon-xs", "icon-sm", "icon", "icon-lg"].sort(),
    );
  });

  for (const [variant, tokens] of Object.entries(map.variants)) {
    it(`${variant}: fundo, texto e borda do mapa estão nas classes`, () => {
      const classes = classesOf(variant);
      if (tokens.background) expect(classes).toContain(`bg-${color(tokens.background)}`);
      expect(classes).toContain(`text-${color(tokens.text)}`);
      if (tokens.border) expect(classes).toContain(`border-${color(tokens.border)}`);
    });
  }

  it("foco: anel e espaço do mapa estão nas classes", () => {
    const classes = classesOf("default");
    expect(classes).toContain(`focus-visible:ring-${color(map.states.focus.ring)}`);
    expect(classes).toContain(`focus-visible:ring-[${map.states.focus.ringWidth}px]`);
    expect(classes).toContain(`focus-visible:ring-offset-${map.states.focus.ringOffsetWidth}`);
    expect(classes).toContain(`focus-visible:ring-offset-${color(map.states.focus.ringOffset)}`);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura do mapa está nas classes`, () => {
      const classes = classesOf("default", size);
      const height = scale(tokens.height);
      expect(classes.some((c) => c === `h-${height}` || c === `size-${height}`)).toBe(true);
    });
  }
});
