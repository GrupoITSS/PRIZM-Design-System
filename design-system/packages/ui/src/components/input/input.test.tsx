import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
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

    rerender(<Input placeholder="default" size="default" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("data-size", "default");

    rerender(<Input placeholder="lg" size="lg" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("data-size", "lg");
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
