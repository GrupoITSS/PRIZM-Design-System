import { Input } from "../input";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field";

describe("Field (PRIZM / shadcn)", () => {
  it("renderiza Field com label e input", () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="email@example.com" />
      </Field>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email@example.com")).toBeInTheDocument();
  });

  it("aplica orientação via data-orientation", () => {
    const { rerender } = render(<Field orientation="vertical" data-testid="field" />);
    expect(screen.getByTestId("field")).toHaveAttribute("data-orientation", "vertical");

    rerender(<Field orientation="horizontal" data-testid="field" />);
    expect(screen.getByTestId("field")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("FieldError renderiza children diretamente", () => {
    render(<FieldError>Erro direto</FieldError>);
    expect(screen.getByText("Erro direto")).toBeInTheDocument();
  });

  it("FieldError renderiza lista de errors", () => {
    render(<FieldError errors={[{ message: "Primeiro erro" }, { message: "Segundo erro" }]} />);
    expect(screen.getByText("Primeiro erro")).toBeInTheDocument();
    expect(screen.getByText("Segundo erro")).toBeInTheDocument();
  });

  it("FieldSet e FieldLegend renderizam corretamente", () => {
    render(
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" />
          </Field>
        </FieldGroup>
      </FieldSet>,
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("FieldSeparator renderiza conteúdo opcional", () => {
    render(<FieldSeparator>Ou</FieldSeparator>);
    expect(screen.getByText("Ou")).toBeInTheDocument();
  });

  it("FieldTitle e FieldDescription renderizam conteúdo", () => {
    render(
      <Field>
        <FieldContent>
          <FieldTitle>Título</FieldTitle>
          <FieldDescription>Descrição</FieldDescription>
        </FieldContent>
      </Field>,
    );

    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });
});
