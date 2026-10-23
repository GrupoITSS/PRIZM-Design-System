import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Plus } from "../icons";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button (PRIZM)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loading bloqueia o clique sem o atributo disabled, para manter o foco", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Salvar
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("aria-busy", "true");

    button.focus();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveFocus();
  });

  it("loading mostra o Spinner decorativo, e o nome do botão continua o rótulo", () => {
    const { container } = render(<Button loading>Salvar</Button>);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("animate-spin");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("loading num botão submit não envia o formulário", () => {
    const onSubmit = vi.fn();
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Button loading type="submit">
          Enviar
        </Button>
      </form>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("chama onClick fora do loading", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disabled continua usando o atributo nativo", () => {
    render(<Button disabled>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeDisabled();
  });

  it("link é sempre sublinhado", () => {
    render(<Button variant="link">Ver mais</Button>);
    expect(screen.getByRole("button", { name: "Ver mais" })).toHaveClass("underline");
  });

  it("hover do secondary sobrepõe o foreground a 10%", () => {
    render(<Button variant="secondary">Cancelar</Button>);
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveClass(
      "hover:bg-[color-mix(in_oklab,var(--prizm-color-secondary),var(--prizm-color-foreground)_10%)]",
    );
  });

  it("hover do text usa o fundo destructive-weak", () => {
    render(<Button variant="text">Excluir</Button>);
    expect(screen.getByRole("button", { name: "Excluir" })).toHaveClass(
      "text-destructive-strong",
      "hover:bg-destructive-weak",
    );
  });

  it("anel de foco com espaço de 2px na cor do fundo", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toHaveClass(
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-ring-offset",
    );
  });

  it("avisa quando um botão de ícone não tem nome acessível", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Button size="icon">
        <Plus />
      </Button>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("sem nome acessível"));
  });

  it("não avisa com aria-label, texto sr-only ou texto visível", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <>
        <Button aria-label="Adicionar" size="icon">
          <Plus />
        </Button>
        <Button size="icon-sm">
          <Plus />
          <span className="sr-only">Adicionar</span>
        </Button>
        <Button size="icon-sm">12</Button>
      </>,
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("marca data-variant, que o Badge usa para inverter as cores dentro do botão", () => {
    const { rerender } = render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toHaveAttribute("data-variant", "default");
    rerender(<Button variant="secondary">Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toHaveAttribute("data-variant", "secondary");
  });
});
