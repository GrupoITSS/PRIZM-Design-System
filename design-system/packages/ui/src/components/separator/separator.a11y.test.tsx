import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator · nomes e papéis (etapa 4, 06/11/2026)", () => {
  it("decorativo (padrão): role=none, fora da árvore de acessibilidade", () => {
    render(<Separator data-testid="s" />);
    expect(screen.getByTestId("s")).toHaveAttribute("role", "none");
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("não recebe foco", () => {
    render(<Separator data-testid="s" decorative={false} />);
    const s = screen.getByTestId("s");
    expect(s).not.toHaveAttribute("tabindex");
    s.focus();
    expect(s).not.toHaveFocus();
  });

  it("vertical semântico: aria-orientation=vertical", () => {
    render(<Separator data-testid="s" decorative={false} orientation="vertical" />);
    expect(screen.getByTestId("s")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("semântico (decorative={false}): hoje sai sem role (D1, corrigir na etapa 5)", () => {
    render(<Separator data-testid="s" decorative={false} />);
    expect(screen.getByTestId("s")).not.toHaveAttribute("role");
  });
});
