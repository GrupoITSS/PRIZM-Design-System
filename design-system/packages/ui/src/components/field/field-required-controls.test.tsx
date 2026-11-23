import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxList } from "../combobox";
import { DatePicker } from "../date-picker";
import { InputGroup, InputGroupInput, InputGroupTextarea } from "../input-group";
import { InputOTP } from "../input-otp";
import { MaskedInput, MaskTypeEnum } from "../masked-input";
import { Field } from "./field";

describe("Field required (DS-89): controles compostos", () => {
  it("InputGroupInput e InputGroupTextarea herdam aria-required", () => {
    render(
      <Field required>
        <InputGroup>
          <InputGroupInput aria-label="a" />
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea aria-label="b" />
        </InputGroup>
      </Field>,
    );
    expect(screen.getByLabelText("a")).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText("b")).toHaveAttribute("aria-required", "true");
  });

  it("MaskedInput herda aria-required", () => {
    render(
      <Field required>
        <MaskedInput mask={MaskTypeEnum.CPF} aria-label="cpf" />
      </Field>,
    );
    expect(screen.getByLabelText("cpf")).toHaveAttribute("aria-required", "true");
  });

  it("Combobox (simples) herda aria-required", () => {
    render(
      <Field required>
        <Combobox items={["a", "b"]} placeholder="c" />
      </Field>,
    );
    expect(screen.getByPlaceholderText("c")).toHaveAttribute("aria-required", "true");
  });

  it("Combobox (múltiplo) herda aria-required", () => {
    render(
      <Field required>
        <Combobox items={["a", "b"]} multiple value={[]} placeholder="m" />
      </Field>,
    );
    expect(screen.getByPlaceholderText("m")).toHaveAttribute("aria-required", "true");
  });

  it("Combobox por composição (ComboboxInput) herda aria-required", () => {
    render(
      <Field required>
        <Combobox items={["a", "b"]}>
          <ComboboxInput placeholder="comp" />
          <ComboboxContent>
            <ComboboxList>{(item: string) => <div key={item}>{item}</div>}</ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>,
    );
    expect(screen.getByPlaceholderText("comp")).toHaveAttribute("aria-required", "true");
  });

  it("InputOTP herda aria-required", () => {
    render(
      <Field required>
        <InputOTP aria-label="otp" length={4} />
      </Field>,
    );
    expect(screen.getByLabelText("otp")).toHaveAttribute("aria-required", "true");
  });

  it("InputOTP: aria-required explícito vence o contexto", () => {
    render(
      <Field required>
        <InputOTP aria-label="otp" length={4} aria-required={false} />
      </Field>,
    );
    expect(screen.getByLabelText("otp")).toHaveAttribute("aria-required", "false");
  });

  it("DatePicker: o botão do gatilho não recebe aria-required (ARIA inválido em button)", () => {
    render(
      <Field required>
        <DatePicker aria-label="data" />
      </Field>,
    );
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-required");
  });

  it("sem required no Field, nenhum deles recebe aria-required", () => {
    render(
      <Field>
        <InputOTP aria-label="otp" length={4} />
        <MaskedInput mask={MaskTypeEnum.CPF} aria-label="cpf" />
      </Field>,
    );
    expect(screen.getByLabelText("otp")).not.toHaveAttribute("aria-required");
    expect(screen.getByLabelText("cpf")).not.toHaveAttribute("aria-required");
  });
});
