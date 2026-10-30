import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "../field";
import { Checkbox } from "./checkbox";
import { checkboxRootVariants } from "./checkbox.styles";
import map from "./checkbox.tokens.json";

// Figma token name → Tailwind class suffix: "color/input-strong" → "input-strong",
// "radius/xs" → "xs", "width/3-5" → "3.5", "spacing/4" → "4".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];
const size = (token: string) => suffix(token).replace("-", ".");

const classes = (variant: "default" | "sm" = "default") =>
  checkboxRootVariants({ size: variant }).split(" ");

describe("Checkbox × mapa de tokens (checkbox.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["default", "sm"]);
  });

  it("sem marcar: fundo e borda do mapa estão nas classes", () => {
    expect(classes()).toContain(`bg-${color(map.checked.no.background)}`);
    expect(classes()).toContain(`border-${color(map.checked.no.border)}`);
  });

  it("marcado e indeterminado: fundo, borda e cor do ícone", () => {
    for (const [estado, s] of [
      ["checked", map.checked.yes],
      ["indeterminate", map.checked.indeterminate],
    ] as const) {
      expect(classes()).toContain(`data-[state=${estado}]:bg-${color(s.background)}`);
      expect(classes()).toContain(`data-[state=${estado}]:border-${color(s.border)}`);
      expect(classes()).toContain(`data-[state=${estado}]:text-${color(s.iconColor)}`);
    }
  });

  it("foco: anel e offset do mapa", () => {
    const s = map.states.focus;
    expect(classes()).toContain(`focus-visible:ring-${s.ringWidth}`);
    expect(classes()).toContain(`focus-visible:ring-${color(s.ring)}`);
    expect(classes()).toContain(`focus-visible:ring-offset-${s.ringOffsetWidth}`);
    expect(classes()).toContain(`focus-visible:ring-offset-${color(s.ringOffset)}`);
  });

  it("erro: borda do mapa, também marcada e indeterminada", () => {
    const b = color(map.states.error.border);
    expect(classes()).toContain(`aria-invalid:border-${b}`);
    expect(classes()).toContain(`aria-invalid:data-[state=checked]:border-${b}`);
    expect(classes()).toContain(`aria-invalid:data-[state=indeterminate]:border-${b}`);
  });

  it("disabled: opacidade da caixa", () => {
    expect(classes()).toContain(`disabled:opacity-${suffix(map.states.disabled.opacity)}`);
  });

  it("caixa: raio e tamanhos do mapa", () => {
    expect(classes()).toContain(`rounded-${suffix(map.parts.box.radius)}`);
    expect(classes("default")).toContain(`size-${size(map.sizes.default.width)}`);
    expect(classes("sm")).toContain(`size-${size(map.sizes.sm.width)}`);
  });

  it("Type Box: o FieldLabel que envolve um Field vira o cartão do mapa", () => {
    const { container } = render(
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="plano" defaultChecked />
          <FieldContent>
            <FieldTitle>Plano anual</FieldTitle>
            <FieldDescription>Cobrança uma vez por ano.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>,
    );
    const label = container.querySelector("[data-slot=field-label]");
    const c = map.parts.card;
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(label).toHaveClass(`has-[>[data-slot=field]]:rounded-${suffix(c.radius)}`);
    expect(label).toHaveClass("has-[>[data-slot=field]]:border");
    expect(label).toHaveClass(`[&>[data-slot=field]]:p-${suffix(c.padding)}`);
    expect(label).toHaveClass(`has-data-[state=checked]:border-${color(c.checkedBorder)}`);
    expect(label).toHaveClass(
      `has-data-[state=checked]:bg-${color(c.checkedBackground)}/${suffix(c.checkedBackgroundOpacity)}`,
    );
  });
});
