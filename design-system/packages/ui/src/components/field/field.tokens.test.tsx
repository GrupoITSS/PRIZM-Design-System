import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./field";
import { fieldVariants } from "./field.styles";
import map from "./field.tokens.json";

// Figma token name → Tailwind class suffix: "color/muted-foreground" → "muted-foreground",
// "spacing/3" → "3", "text/sm" → "sm".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];
const cls = (el: Element) => el.className.split(" ");

describe("Field × mapa de tokens (field.tokens.json)", () => {
  it("espaço entre as partes e entre campos", () => {
    expect(fieldVariants().split(" ")).toContain(`gap-${suffix(map.parts.field.gap)}`);
    const { container } = render(<FieldGroup />);
    expect(cls(container.firstElementChild!)).toContain(`gap-${suffix(map.parts.group.gap)}`);
  });

  it("rótulo, descrição e erro nos tokens do mapa", () => {
    render(
      <Field data-invalid="true">
        <FieldLabel htmlFor="c">Rótulo</FieldLabel>
        <input id="c" />
        <FieldDescription>Ajuda</FieldDescription>
        <FieldError>Erro</FieldError>
      </Field>,
    );
    const label = screen.getByText("Rótulo");
    expect(cls(label)).toContain(`text-${color(map.parts.label.text)}`);
    expect(cls(label)).toContain(`font-${suffix(map.parts.label.fontWeight)}`);
    expect(cls(screen.getByText("Ajuda"))).toContain(`text-${color(map.parts.description.text)}`);
    expect(cls(screen.getByRole("alert"))).toContain(`text-${color(map.parts.error.text)}`);
    // No erro, o rótulo continua em foreground (D2).
    expect(map.states.invalid.label).toBe("color/foreground");
  });

  it("legenda: tamanho e espaço até o grupo", () => {
    render(
      <FieldSet>
        <FieldLegend>Legenda</FieldLegend>
      </FieldSet>,
    );
    const legend = screen.getByText("Legenda");
    expect(cls(legend)).toContain(`data-[variant=legend]:text-${suffix(map.parts.legend.fontSize)}`);
    expect(cls(legend)).toContain(`mb-${suffix(map.parts.legend.marginBottom)}`);
  });

  it("a ligação à mão com aria-describedby dá ao controle a ajuda e o erro", () => {
    render(
      <Field data-invalid="true">
        <FieldLabel htmlFor="email">E-mail</FieldLabel>
        <input id="email" aria-invalid="true" aria-describedby="email-ajuda email-erro" />
        <FieldDescription id="email-ajuda">Usamos para contato.</FieldDescription>
        <FieldError id="email-erro">Informe um e-mail válido.</FieldError>
      </Field>,
    );
    const campo = screen.getByRole("textbox", { name: "E-mail" });
    expect(campo).toHaveAccessibleDescription("Usamos para contato. Informe um e-mail válido.");
  });
});
