import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group";

describe("InputGroup (PRIZM / shadcn)", () => {
  it("renderiza conteúdo dentro do grupo", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Buscar" />
        <InputGroupAddon>
          <InputGroupText>Addon</InputGroupText>
        </InputGroupAddon>
      </InputGroup>,
    );

    expect(screen.getByPlaceholderText("Buscar")).toBeInTheDocument();
    expect(screen.getByText("Addon")).toBeInTheDocument();
  });

  it("altera alinhamento do addon via prop align", () => {
    const { rerender } = render(
      <InputGroup>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-start" data-testid="addon">
          @
        </InputGroupAddon>
      </InputGroup>,
    );

    expect(screen.getByTestId("addon")).toHaveAttribute("data-align", "inline-start");

    rerender(
      <InputGroup>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-end" data-testid="addon">
          @
        </InputGroupAddon>
      </InputGroup>,
    );

    expect(screen.getByTestId("addon")).toHaveAttribute("data-align", "inline-end");
  });

  it("foca o input ao clicar no addon (quando não é botão)", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Buscar" />
        <InputGroupAddon>
          <InputGroupText data-testid="text">/</InputGroupText>
        </InputGroupAddon>
      </InputGroup>,
    );

    const input = screen.getByPlaceholderText("Buscar");
    expect(input).not.toHaveFocus();

    fireEvent.click(screen.getByTestId("text"));

    expect(input).toHaveFocus();
  });

  it("não altera foco quando clica em um botão dentro do addon", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Buscar" />
        <InputGroupAddon>
          <InputGroupButton data-testid="button">Go</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    );

    const input = screen.getByPlaceholderText("Buscar");
    fireEvent.click(screen.getByTestId("button"));

    expect(input).not.toHaveFocus();
  });

  it("renderiza textarea dentro do grupo", () => {
    render(
      <InputGroup>
        <InputGroupTextarea placeholder="Mensagem" rows={3} />
      </InputGroup>,
    );

    expect(screen.getByPlaceholderText("Mensagem").tagName).toBe("TEXTAREA");
  });

  it("API por props: renderiza input e addon via addonInlineEnd", () => {
    render(<InputGroup placeholder="Buscar" addonInlineEnd={<span data-testid="addon">/</span>} />);

    expect(screen.getByPlaceholderText("Buscar")).toBeInTheDocument();
    expect(screen.getByTestId("addon")).toHaveTextContent("/");
  });

  it("API por props: control=textarea e addonBlockEnd", () => {
    render(
      <InputGroup
        control="textarea"
        placeholder="Mensagem"
        rows={2}
        addonBlockEnd={<span data-testid="block-addon">Enviar</span>}
      />,
    );

    expect(screen.getByPlaceholderText("Mensagem").tagName).toBe("TEXTAREA");
    expect(screen.getByTestId("block-addon")).toHaveTextContent("Enviar");
  });
});
