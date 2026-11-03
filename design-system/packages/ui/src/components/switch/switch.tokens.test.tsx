import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "../field";
import { fieldVariants } from "../field/field.styles";
import { Switch } from "./switch";
import { switchRootVariants, switchThumbVariants } from "./switch.styles";
import map from "./switch.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "radius/full" → "full", "width/11" → "11", "border-width/2" → "2".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];

const root = (size: "sm" | "default" | "lg" = "default") => switchRootVariants({ size }).split(" ");
const thumb = (size: "sm" | "default" | "lg" = "default") => switchThumbVariants({ size }).split(" ");

describe("Switch × mapa de tokens (switch.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["default", "lg", "sm"]);
  });

  it("trilho desligado e ligado do mapa", () => {
    expect(root()).toContain(`data-[state=unchecked]:bg-${color(map.checked.no.track)}`);
    expect(root()).toContain(`data-[state=checked]:bg-${color(map.checked.yes.track)}`);
  });

  it("alça do mapa, sem sombra", () => {
    expect(thumb()).toContain(`bg-${color(map.checked.no.thumb)}`);
    expect(thumb().some((c) => c.startsWith("shadow"))).toBe(false);
    expect(thumb()).toContain(`in-data-[mode=dark]:data-[state=unchecked]:bg-${color(map.checked.no.thumbDark)}`);
  });

  it("trilho: raio e borda do mapa", () => {
    expect(root()).toContain(`rounded-${suffix(map.parts.track.radius)}`);
    expect(root()).toContain(`border-${suffix(map.parts.track.borderWidth)}`);
    expect(root()).toContain(`border-${color(map.parts.track.border)}`);
  });

  it("foco: anel e offset do mapa", () => {
    const s = map.states.focus;
    expect(root()).toContain(`focus-visible:ring-${s.ringWidth}`);
    expect(root()).toContain(`focus-visible:ring-${color(s.ring)}`);
    expect(root()).toContain(`focus-visible:ring-offset-${s.ringOffsetWidth}`);
    expect(root()).toContain(`focus-visible:ring-offset-${color(s.ringOffset)}`);
  });

  it("erro e disabled do mapa", () => {
    expect(root()).toContain(`aria-invalid:border-${color(map.states.error.border)}`);
    expect(root()).toContain(`disabled:opacity-${suffix(map.states.disabled.opacity)}`);
  });

  it("tamanhos: trilho e alça do mapa", () => {
    for (const s of ["sm", "default", "lg"] as const) {
      const z = map.sizes[s];
      expect(root(s)).toContain(`w-${suffix(z.width)}`);
      expect(root(s)).toContain(`h-${suffix(z.height)}`);
      expect(thumb(s)).toContain(`w-${suffix(z.thumb)}`);
    }
  });

  it("trilho até o texto: o gap do Field horizontal", () => {
    expect(fieldVariants({ orientation: "horizontal" }).split(" ")).toContain(
      `gap-${suffix(map.spacing.trackToText)}`,
    );
  });

  it("Type Box: o FieldLabel que envolve um Field vira o cartão do mapa", () => {
    const { container } = render(
      <FieldLabel htmlFor="avisos">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Avisos</FieldTitle>
            <FieldDescription>Receber avisos por e-mail.</FieldDescription>
          </FieldContent>
          <Switch id="avisos" defaultChecked />
        </Field>
      </FieldLabel>,
    );
    const label = container.querySelector("[data-slot=field-label]");
    const c = map.parts.card;
    expect(label).toHaveClass(`has-[>[data-slot=field]]:rounded-${suffix(c.radius)}`);
    expect(label).toHaveClass(`[&>[data-slot=field]]:p-${suffix(c.padding)}`);
    expect(label).toHaveClass(`has-data-[state=checked]:border-${color(c.checkedBorder)}`);
    expect(label).toHaveClass(
      `has-data-[state=checked]:bg-${color(c.checkedBackground)}/${suffix(c.checkedBackgroundOpacity)}`,
    );
  });
});
