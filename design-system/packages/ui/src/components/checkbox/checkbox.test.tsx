import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox (PRIZM / shadcn)", () => {
  it("renders with simplified API (label)", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders without label (composition)", () => {
    render(<Checkbox aria-label="Standalone" />);
    expect(screen.getByRole("checkbox", { name: "Standalone" })).toBeInTheDocument();
  });

  it("applies root styles and data-slot", () => {
    render(<Checkbox aria-label="Test" />);
    const root = screen.getByRole("checkbox").closest("[data-slot='checkbox']");
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("rounded-xs", "border", "border-input-strong", "p-px");
  });

  it("respects size variant", () => {
    render(<Checkbox size="sm" aria-label="Small" />);
    const root = screen.getByRole("checkbox").closest("[data-slot='checkbox']");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveClass("size-3.5");
  });

  it("calls onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Click me" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("borda sem marcar em input-strong, com 3:1 contra a página (WCAG 1.4.11)", () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole("checkbox")).toHaveClass("border-input-strong");
  });

  it("fundo, raio e offset do anel seguem os tokens da família", () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole("checkbox")).toHaveClass(
      "bg-input-background",
      "rounded-xs",
      "focus-visible:ring-offset-ring-offset",
    );
  });

  it("erro: borda destructive também com a caixa marcada ou indeterminada", () => {
    render(<Checkbox aria-label="Test" aria-invalid />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveClass(
      "aria-invalid:border-destructive",
      "aria-invalid:data-[state=checked]:border-destructive",
      "aria-invalid:data-[state=indeterminate]:border-destructive",
    );
  });

  it("alvo de ponteiro de 24px nos dois tamanhos, sem mudar o layout (WCAG 2.5.8)", () => {
    const { rerender } = render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole("checkbox")).toHaveClass("relative", "after:-inset-1");
    rerender(<Checkbox aria-label="Test" size="sm" />);
    expect(screen.getByRole("checkbox")).toHaveClass("relative", "after:-inset-[5px]");
  });

  it("indeterminado é anunciado como mixed", () => {
    render(<Checkbox aria-label="Test" checked="indeterminate" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("associates label with checkbox via id when label prop is used", () => {
    render(<Checkbox id="terms" label="Accept" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept").closest("label");
    expect(checkbox).toHaveAttribute("id", "terms");
    expect(label).toHaveAttribute("for", "terms");
  });
});
