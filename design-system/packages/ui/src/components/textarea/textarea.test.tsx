import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";
import { textareaVariants } from "./textarea.styles";

describe("Textarea (PRIZM / shadcn)", () => {
  it("renderiza um textarea básico", () => {
    render(<Textarea placeholder="Mensagem" />);
    expect(screen.getByPlaceholderText("Mensagem")).toBeInTheDocument();
  });

  it("aplica classes de tamanho via data-size", () => {
    const { rerender } = render(<Textarea placeholder="sm" size="sm" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "sm");

    rerender(<Textarea placeholder="md" size="md" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "md");

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

describe("Textarea: escala e estados iguais aos do Input (21/10/2026)", () => {
  it.each(["sm", "md", "lg"] as const)("foco e disabled seguem a mesma regra no tamanho %s", (size) => {
    const classes = textareaVariants({ size }).split(" ");
    expect(classes).toEqual(
      expect.arrayContaining([
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:border-transparent",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
      ]),
    );
    expect(classes).not.toContain("focus-visible:ring-ring/30");
    expect(classes).not.toContain("disabled:bg-muted");
  });
});
