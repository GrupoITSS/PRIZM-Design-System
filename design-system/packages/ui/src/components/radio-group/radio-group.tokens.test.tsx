import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "../field";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
  getRadioGroupRootClasses,
  radioItemContentClasses,
  radioItemControlClasses,
  radioItemDescriptionClasses,
  radioItemDotClasses,
  radioItemLabelClasses,
  radioItemWrapperClasses,
} from "./radio-group.styles";
import map from "./radio-group.tokens.json";

// Figma token name → Tailwind class suffix: "color/input-strong" → "input-strong",
// "radius/full" → "full", "spacing/1-5" → "1.5", "width/4" → "4".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];
const size = (token: string) => suffix(token).replace("-", ".");

const control = radioItemControlClasses.split(" ");

describe("RadioGroup × mapa de tokens (radio-group.tokens.json)", () => {
  it("sem marcar: fundo e borda do mapa", () => {
    expect(control).toContain(`bg-${color(map.checked.no.background)}`);
    expect(control).toContain(`border-${color(map.checked.no.border)}`);
  });

  it("marcado: borda e ponto do mapa, fundo igual ao sem marcar", () => {
    expect(map.checked.yes.background).toBe(map.checked.no.background);
    expect(control).toContain(`data-[state=checked]:border-${color(map.checked.yes.border)}`);
    expect(control).toContain(`text-${color(map.checked.yes.dot)}`);
  });

  it("foco: anel e offset do mapa", () => {
    const s = map.states.focus;
    expect(control).toContain(`focus-visible:ring-${s.ringWidth}`);
    expect(control).toContain(`focus-visible:ring-${color(s.ring)}`);
    expect(control).toContain(`focus-visible:ring-offset-${s.ringOffsetWidth}`);
    expect(control).toContain(`focus-visible:ring-offset-${color(s.ringOffset)}`);
  });

  it("erro: borda do mapa no item e no grupo, também marcado", () => {
    const b = color(map.states.error.border);
    expect(control).toContain(`aria-invalid:border-${b}`);
    expect(control).toContain(`aria-invalid:data-[state=checked]:border-${b}`);
    expect(control).toContain(`group-aria-invalid/radio-group:border-${b}`);
    expect(control).toContain(`group-aria-invalid/radio-group:data-[state=checked]:border-${b}`);
  });

  it("disabled: opacidade do círculo", () => {
    expect(control).toContain(`disabled:opacity-${suffix(map.states.disabled.opacity)}`);
  });

  it("círculo e ponto: tamanho e raio do mapa", () => {
    expect(control).toContain(`size-${size(map.parts.circle.width)}`);
    expect(control).toContain(`rounded-${suffix(map.parts.circle.radius)}`);
    expect(radioItemDotClasses.split(" ")).toContain(`size-${size(map.parts.dot.width)}`);
  });

  it("textos e espaçamento do mapa", () => {
    expect(radioItemLabelClasses.split(" ")).toContain(`font-${suffix(map.parts.label.fontWeight)}`);
    expect(radioItemDescriptionClasses.split(" ")).toContain(`text-${suffix(map.parts.description.fontSize)}`);
    expect(radioItemDescriptionClasses.split(" ")).toContain(`text-${color(map.parts.description.color)}`);
    expect(radioItemContentClasses.split(" ")).toContain(`gap-${size(map.spacing.labelToDescription)}`);
    expect(radioItemWrapperClasses.split(" ")).toContain(`gap-${size(map.spacing.circleToText)}`);
    expect(getRadioGroupRootClasses().split(" ")).toContain(`gap-${size(map.spacing.betweenItems)}`);
  });

  it("Type Box: o FieldLabel que envolve um Field vira o cartão do mapa", () => {
    const { container } = render(
      <RadioGroup aria-label="Plano" defaultValue="anual">
        <FieldLabel htmlFor="anual">
          <Field orientation="horizontal">
            <RadioGroupItem id="anual" value="anual" />
            <FieldContent>
              <FieldTitle>Anual</FieldTitle>
              <FieldDescription>Cobrança uma vez por ano.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </RadioGroup>,
    );
    const label = container.querySelector("[data-slot=field-label]");
    const c = map.parts.card;
    expect(screen.getByRole("radio")).toBeChecked();
    expect(label).toHaveClass(`has-[>[data-slot=field]]:rounded-${suffix(c.radius)}`);
    expect(label).toHaveClass("has-[>[data-slot=field]]:border");
    expect(label).toHaveClass(`[&>[data-slot=field]]:p-${suffix(c.padding)}`);
    expect(label).toHaveClass(`has-data-[state=checked]:border-${color(c.checkedBorder)}`);
    expect(label).toHaveClass(
      `has-data-[state=checked]:bg-${color(c.checkedBackground)}/${suffix(c.checkedBackgroundOpacity)}`,
    );
  });
});
