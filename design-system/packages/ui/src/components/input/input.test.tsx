import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input (PRIZM / shadcn)", () => {
  it("renderiza um campo de texto básico", () => {
    render(<Input placeholder="Nome" />);
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
  });

  it("aceita diferentes tipos de input", () => {
    const { rerender } = render(<Input placeholder="Email" type="email" />);
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toHaveAttribute("type", "email");

    rerender(<Input placeholder="Senha" type="password" />);
    const passwordInput = screen.getByPlaceholderText("Senha");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("aplica size md por padrão", () => {
    render(<Input placeholder="médio" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("data-size", "md");
  });

  it("aplica classes de tamanho via data-size", () => {
    const { rerender } = render(<Input placeholder="sm" size="sm" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("data-size", "sm");

    rerender(<Input placeholder="lg" size="lg" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("data-size", "lg");
  });

  it("cada tamanho usa a altura de controle do Core", () => {
    const { rerender } = render(<Input size="sm" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("h-control-height-sm");

    rerender(<Input size="md" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("h-control-height-md");

    rerender(<Input size="lg" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("h-control-height-lg");
    expect(screen.getByTestId("input")).not.toHaveClass("h-12");
  });

  it.each(["sm", "md", "lg"] as const)(
    "foco, erro e disabled seguem a mesma regra no tamanho %s",
    (size) => {
      render(<Input size={size} data-testid="input" />);
      const input = screen.getByTestId("input");
      // Anel cheio em ring (ring/30 ficava entre 1,28:1 e 1,84:1, abaixo do 3:1).
      expect(input).toHaveClass("focus-visible:ring-2", "focus-visible:ring-ring", "focus-visible:border-transparent");
      expect(input).not.toHaveClass("focus-visible:ring-ring/30");
      expect(input).toHaveClass("aria-invalid:border-destructive", "aria-invalid:focus-visible:border-destructive");
      expect(input).toHaveClass("disabled:bg-muted", "disabled:border-transparent");
      expect(input).not.toHaveClass("disabled:opacity-50");
    },
  );

  it("marca o campo inválido com aria-invalid e a borda destructive", () => {
    render(<Input placeholder="E-mail" aria-invalid />);
    const input = screen.getByPlaceholderText("E-mail");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveClass("aria-invalid:border-destructive");
  });

  it("o botão de senha entra na ordem do Tab e tem alvo de 24px", () => {
    render(<Input type="password" placeholder="Senha" />);
    const toggle = screen.getByRole("button", { name: "Exibir senha" });
    // Antes tinha tabIndex -1 e só funcionava com ponteiro (WCAG 2.1.1).
    expect(toggle).not.toHaveAttribute("tabindex");
    expect(toggle.tabIndex).toBe(0);
    // 24 × 24px (WCAG 2.5.8); antes o alvo era o ícone de 16px.
    expect(toggle).toHaveClass("size-6");
  });

  it("o botão de senha alterna a visibilidade e o nome", () => {
    render(<Input type="password" placeholder="Senha" />);
    const input = screen.getByPlaceholderText("Senha");
    fireEvent.click(screen.getByRole("button", { name: "Exibir senha" }));
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Ocultar senha" })).toBeInTheDocument();
  });

  it("renderiza ícone à esquerda quando startIcon é passado", () => {
    render(<Input placeholder="Buscar" startIcon={<span data-testid="search-icon" />} />);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar")).toHaveClass("pl-9");
  });

  it("prop disabled desabilita o input", () => {
    render(<Input placeholder="Desabilitado" disabled />);
    const input = screen.getByPlaceholderText("Desabilitado");
    expect(input).toBeDisabled();
  });
});
