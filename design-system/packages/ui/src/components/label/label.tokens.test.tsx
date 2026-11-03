import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./label";
import { labelVariants } from "./label.styles";
import map from "./label.tokens.json";

// Figma token name → Tailwind class suffix: "color/foreground" → "foreground",
// "opacity/70" → "70", "spacing/0-5" → "0.5".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];

const classes = labelVariants().split(" ");

describe("Label × mapa de tokens (label.tokens.json)", () => {
  it("texto: cor e tamanho do mapa", () => {
    expect(classes).toContain(`text-${color(map.states.default.color)}`);
    expect(classes).toContain(`text-${suffix(map.parts.text.fontSize)}`);
  });

  it("disabled: opacidade do mapa", () => {
    expect(classes).toContain(`peer-disabled:opacity-${suffix(map.states.disabled.opacity)}`);
  });

  it("asterisco: cor e distância do mapa", () => {
    render(<Label required>Nome</Label>);
    const asterisco = screen.getByText("*");
    expect(asterisco).toHaveClass(`text-${color(map.states.required.asterisk)}`);
    expect(asterisco).toHaveClass(`ml-${suffix(map.parts.asterisk.gap).replace("-", ".")}`);
  });

  it("peso: o do mapa, sem divergência com o Figma", () => {
    expect(classes).toContain(`font-${suffix(map.parts.text.fontWeight)}`);
    expect(map.divergences).toEqual([]);
  });
});
