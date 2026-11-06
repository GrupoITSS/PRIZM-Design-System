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

  it("semântico (decorative={false}): role=separator (D1, corrigido)", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("data-slot=separator, e quem usa pode trocar (ButtonGroup)", () => {
    render(
      <div>
        <Separator data-testid="a" />
        <Separator data-testid="b" data-slot="button-group-separator" />
      </div>,
    );
    expect(screen.getByTestId("a")).toHaveAttribute("data-slot", "separator");
    expect(screen.getByTestId("b")).toHaveAttribute("data-slot", "button-group-separator");
  });
});
