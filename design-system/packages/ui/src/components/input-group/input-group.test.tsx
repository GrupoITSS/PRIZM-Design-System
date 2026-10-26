import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

describe("InputGroup: altura do contêiner segue o tamanho do Input", () => {
  it("usa control-height em sm, md e lg, sem o lg de 48px nem o default", async () => {
    const { INPUT_GROUP_BASE_CLASSES } = await import("./input-group.styles");
    const classes = INPUT_GROUP_BASE_CLASSES.split(" ");
    for (const size of ["sm", "md", "lg"]) {
      expect(classes).toContain(`has-[[data-size=${size}]]:h-control-height-${size}`);
    }
    expect(classes).not.toContain("has-[[data-size=lg]]:h-12");
    expect(classes.some((c) => c.includes("data-size=default"))).toBe(false);
  });
});

describe("InputGroup: foco, erro e disabled seguem o Input (acessibilidade)", () => {
  const grupo = (container: HTMLElement) =>
    container.querySelector<HTMLElement>("[data-slot=input-group]")!;

  it("foco: anel de 2px em ring (sem translucidez) e borda transparente", () => {
    const { container } = render(<InputGroup placeholder="c" addonInlineEnd={<span>x</span>} />);
    fireEvent.focus(screen.getByPlaceholderText("c"));
    const classes = [...grupo(container).classList];
    expect(classes).toEqual(expect.arrayContaining(["ring-2", "ring-ring", "border-transparent"]));
    expect(classes.some((c) => c.startsWith("ring-ring/") || c === "ring-[3px]")).toBe(false);
  });

  it("erro com foco: borda destructive e o mesmo anel ring", () => {
    const { container } = render(
      <InputGroup placeholder="c" aria-invalid addonInlineEnd={<span>x</span>} />,
    );
    fireEvent.focus(screen.getByPlaceholderText("c"));
    const classes = [...grupo(container).classList];
    expect(classes).toEqual(expect.arrayContaining(["ring-2", "ring-ring"]));
    expect(classes).toContain("has-[[data-slot][aria-invalid=true]]:border-destructive");
    expect(classes).not.toContain("border-transparent");
    expect(classes.some((c) => c.startsWith("ring-destructive"))).toBe(false);
  });

  it("disabled: opacidade 50% no grupo inteiro, sem somar no campo de dentro", () => {
    const { container } = render(
      <InputGroup placeholder="c" disabled addonInlineEnd={<span>x</span>} />,
    );
    const classes = [...grupo(container).classList];
    expect(classes).toContain("opacity-50");
    expect(classes).not.toContain("bg-muted");
    expect(screen.getByPlaceholderText("c")).toHaveClass("disabled:!opacity-100");
    expect(screen.getByPlaceholderText("c")).toBeDisabled();
  });

  it("o aria-invalid fica no campo, não no role=group", () => {
    const { container } = render(
      <InputGroup placeholder="c" aria-invalid addonInlineEnd={<span>x</span>} />,
    );
    expect(grupo(container)).not.toHaveAttribute("aria-invalid");
    expect(grupo(container)).toHaveAttribute("data-invalid", "true");
    expect(screen.getByPlaceholderText("c")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("InputGroup: ordem de foco e nome dos botões", () => {
  it("o complemento do início vem antes do campo no DOM (a ordem do Tab segue a tela)", () => {
    const { container } = render(
      <InputGroup
        placeholder="c"
        addonInlineStart={<InputGroupButton aria-label="início">I</InputGroupButton>}
        addonInlineEnd={<InputGroupButton aria-label="fim">F</InputGroupButton>}
      />,
    );
    const ordem = [...container.querySelectorAll("button, input")].map(
      (e) => e.getAttribute("aria-label") ?? e.tagName.toLowerCase(),
    );
    expect(ordem).toEqual(["início", "input", "fim"]);
  });

  it("textarea: o complemento block-start vem antes do campo no DOM", () => {
    const { container } = render(
      <InputGroup
        control="textarea"
        placeholder="c"
        addonBlockStart={<InputGroupButton aria-label="topo">T</InputGroupButton>}
        addonBlockEnd={<InputGroupButton aria-label="base">B</InputGroupButton>}
      />,
    );
    const ordem = [...container.querySelectorAll("button, textarea")].map(
      (e) => e.getAttribute("aria-label") ?? e.tagName.toLowerCase(),
    );
    expect(ordem).toEqual(["topo", "textarea", "base"]);
  });

  it("avisa quando o botão só de ícone do complemento não tem nome", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <InputGroupButton size="icon-xs">
        <svg aria-hidden="true" />
      </InputGroupButton>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("sem nome acessível"));
    warn.mockClear();
    render(
      <InputGroupButton size="icon-sm" aria-label="Limpar">
        <svg aria-hidden="true" />
      </InputGroupButton>,
    );
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
