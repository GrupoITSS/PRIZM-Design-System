import { describe, expect, it } from "vitest";
import { inputVariants } from "./input.styles";
import map from "./input.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "control-height/md" → "control-height-md", "shadow/xs" → "shadow-xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");

const classesOf = (size = "md") => inputVariants({ size: size as never }).split(" ");

describe("Input × mapa de tokens (input.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["sm", "md", "lg"].sort());
  });

  it("default: fundo, texto, placeholder, borda e sombra do mapa estão nas classes", () => {
    const classes = classesOf();
    const s = map.states.default;
    expect(classes).toContain(`bg-${color(s.background)}`);
    expect(classes).toContain(`text-${color(s.text)}`);
    expect(classes).toContain(`placeholder:text-${color(s.placeholder)}`);
    expect(classes).toContain(`border-${color(s.border)}`);
    expect(classes).toContain(scale(s.shadow));
  });

  it("foco: anel e borda do mapa estão nas classes", () => {
    const classes = classesOf();
    const s = map.states.focus;
    expect(classes).toContain(`focus-visible:ring-${color(s.ring)}`);
    expect(classes).toContain(`focus-visible:ring-${s.ringWidth}`);
    expect(classes).toContain(`focus-visible:border-${color(s.border)}`);
    expect(classes.some((c) => c.startsWith("focus-visible:ring-offset-"))).toBe(false);
  });

  it("erro: borda do mapa está nas classes, também com foco", () => {
    const classes = classesOf();
    expect(classes).toContain(`aria-invalid:border-${color(map.states.error.border)}`);
    expect(classes).toContain(`aria-invalid:focus-visible:border-${color(map.states.errorFocus.border)}`);
  });

  it("disabled: fundo, texto e borda do mapa, sem sombra e sem opacidade", () => {
    const classes = classesOf();
    const s = map.states.disabled;
    expect(classes).toContain(`disabled:bg-${color(s.background)}`);
    expect(classes).toContain(`disabled:!text-${color(s.text)}`);
    expect(classes).toContain(`disabled:border-${color(s.border)}`);
    expect(classes).toContain("disabled:shadow-none");
    expect(classes.some((c) => c.startsWith("disabled:opacity-"))).toBe(false);
  });

  it("File: peso do texto do botão interno do mapa está nas classes", () => {
    const weight = map.parts.fileButton.fontWeight.replace(/^font-weight\//, "");
    expect(classesOf()).toContain(`file:font-${weight}`);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura e padding do mapa estão nas classes`, () => {
      const classes = classesOf(size);
      expect(classes).toContain(`h-${scale(tokens.height)}`);
      // spacing/N → px-N / py-N (escala do Tailwind).
      expect(classes).toContain(`px-${tokens.paddingX.replace(/^spacing\//, "")}`);
      expect(classes).toContain(`py-${tokens.paddingY.replace(/^spacing\//, "")}`);
    });
  }
});
