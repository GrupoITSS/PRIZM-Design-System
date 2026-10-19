import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea (PRIZM / shadcn)", () => {
  it("renderiza um textarea básico", () => {
    render(<Textarea placeholder="Mensagem" />);
    expect(screen.getByPlaceholderText("Mensagem")).toBeInTheDocument();
  });

  it("aplica classes de tamanho via data-size", () => {
    const { rerender } = render(<Textarea placeholder="sm" size="sm" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "sm");

    rerender(<Textarea placeholder="default" size="default" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "default");

    rerender(<Textarea placeholder="lg" size="lg" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "lg");
  });

  it("prop disabled desabilita o textarea", () => {
    render(<Textarea placeholder="Desabilitado" disabled />);
    const textarea = screen.getByPlaceholderText("Desabilitado");
    expect(textarea).toBeDisabled();
  });

  it("renderiza botão de expansão quando expandable é true", () => {
    render(<Textarea expandable placeholder="Com expansão" />);

    expect(screen.getByRole("button", { name: /expandir textarea/i })).toBeInTheDocument();
  });
});
