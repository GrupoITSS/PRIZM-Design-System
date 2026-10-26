import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";
import { textareaVariants } from "./textarea.styles";
import map from "./textarea.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "shadow/xs" → "shadow-xs", "spacing/1-5" → "1.5", "height/16" → "16", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");
const step = (token: string) => token.split("/")[1].replace("-", ".");

const classesOf = (size = "md") => textareaVariants({ size: size as never }).split(" ");

describe("Textarea × mapa de tokens (textarea.tokens.json)", () => {
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

  it("foco: anel e borda do mapa estão nas classes, sem offset", () => {
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

  it("disabled: a aparência do default com a opacidade do mapa", () => {
    const classes = classesOf();
    const s = map.states.disabled;
    expect(classes).toContain(`disabled:opacity-${step(s.opacity)}`);
    expect(s.background).toBe(map.states.default.background);
    expect(s.border).toBe(map.states.default.border);
    expect(classes.some((c) => /^disabled:(bg|border|shadow)-/.test(c))).toBe(false);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura mínima, padding, raio e texto do mapa estão nas classes`, () => {
      const classes = classesOf(size);
      expect(classes).toContain(`min-h-${step(tokens.minHeight)}`);
      expect(classes).toContain(`px-${step(tokens.paddingX)}`);
      expect(classes).toContain(`py-${step(tokens.paddingY)}`);
      expect(classes).toContain(`rounded-${step(tokens.radius)}`);
      // lg: texto responsivo no código (divergência aberta no mapa); o Figma mostra o desktop.
      const textClass = size === "lg" ? `md:text-${step(tokens.fontSize)}` : `text-${step(tokens.fontSize)}`;
      expect(classes).toContain(textClass);
    });
  }

  it("botão de expandir: tamanho, raio, cor, hover e anel do mapa estão nas classes", () => {
    render(createElement(Textarea, { expandable: true }));
    const classes = screen.getByRole("button", { name: "Expandir campo" }).className.split(" ");
    const p = map.parts.expandButton;
    expect(classes).toEqual(
      expect.arrayContaining([
        `h-${step(p.size)}`,
        `w-${step(p.size)}`,
        `rounded-${step(p.radius)}`,
        `text-${color(p.color)}`,
        `hover:bg-${color(p.hover.background)}`,
        `hover:text-${color(p.hover.text)}`,
        `focus-visible:ring-${color(p.ring)}`,
        `focus-visible:ring-${p.ringWidth}`,
      ]),
    );
  });
});
