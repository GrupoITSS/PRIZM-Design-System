import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Select } from "../select";
import { Switch } from "../switch";
import { Textarea } from "../textarea";
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

  it("FieldLabel required: asterisco do Label, puxado para spacing/0-5 do texto", () => {
    render(
      <FieldLabel htmlFor="email" required>
        Email
      </FieldLabel>,
    );
    const asterisco = screen.getByText("*");
    expect(asterisco).toHaveAttribute("data-slot", "label-required");
    expect(asterisco).toHaveClass("text-destructive");
    expect(screen.getByText("Email")).toHaveClass("[&>[data-slot=label-required]]:-ml-1.5");
  });
  describe("Field required (DS-89)", () => {
    it("repassa ao FieldLabel (asterisco) e ao Input (aria-required)", () => {
      render(
        <Field required data-testid="field">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" />
        </Field>,
      );
      expect(screen.getByTestId("field")).toHaveAttribute("data-required", "true");
      expect(screen.getByText("*")).toHaveAttribute("data-slot", "label-required");
      expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-required", "true");
    });

    it("sem required: nada de asterisco nem aria-required", () => {
      render(
        <Field data-testid="field">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" />
        </Field>,
      );
      expect(screen.getByTestId("field")).not.toHaveAttribute("data-required");
      expect(screen.queryByText("*")).not.toBeInTheDocument();
      expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-required");
    });

    it("não liga a validação nativa: só o aria-required", () => {
      render(
        <Field required>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" />
        </Field>,
      );
      expect(screen.getByLabelText(/Email/)).not.toHaveAttribute("required");
    });

    it("o required do FieldLabel e o aria-required do controle ganham do Field", () => {
      render(
        <>
          <Field required>
            <FieldLabel htmlFor="a" required={false}>
              A
            </FieldLabel>
            <Input id="a" aria-required="false" />
          </Field>
          <Field>
            <FieldLabel htmlFor="b" required>
              B
            </FieldLabel>
            <Input id="b" />
          </Field>
        </>,
      );
      expect(screen.getByLabelText("A")).toHaveAttribute("aria-required", "false");
      expect(screen.getAllByText("*")).toHaveLength(1);
      expect(screen.getByLabelText(/B/)).not.toHaveAttribute("aria-required");
    });

    it("chega a Textarea, Checkbox, Switch, RadioGroup e Select", () => {
      render(
        <Field required>
          <FieldLabel htmlFor="t">T</FieldLabel>
          <Textarea id="t" />
          <Checkbox id="c" aria-label="C" />
          <Switch id="s" aria-label="S" />
          <RadioGroup aria-label="R">
            <RadioGroupItem value="1" aria-label="um" />
          </RadioGroup>
          <Select aria-label="Sel" options={[{ value: "a", label: "A" }]} />
        </Field>,
      );
      expect(screen.getByLabelText(/T/, { selector: "textarea" })).toHaveAttribute(
        "aria-required",
        "true",
      );
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-required", "true");
      expect(screen.getByRole("switch")).toHaveAttribute("aria-required", "true");
      expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-required", "true");
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-required", "true");
    });

    it("não vaza para o Field vizinho nem para o Field de dentro", () => {
      render(
        <FieldSet>
          <FieldGroup>
            <Field required>
              <FieldLabel htmlFor="a">A</FieldLabel>
              <Input id="a" />
            </Field>
            <Field>
              <FieldLabel htmlFor="b">B</FieldLabel>
              <Input id="b" />
            </Field>
            <Field required>
              <FieldLabel htmlFor="nested">
                <Field>
                  <Input id="inner" aria-label="inner" />
                </Field>
                Opção
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>,
      );
      expect(screen.getByLabelText(/^A/)).toHaveAttribute("aria-required", "true");
      expect(screen.getByLabelText("B")).not.toHaveAttribute("aria-required");
      expect(screen.getByLabelText("inner")).not.toHaveAttribute("aria-required");
      expect(screen.getAllByText("*")).toHaveLength(2);
    });
  });
});
