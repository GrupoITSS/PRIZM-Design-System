import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toggle } from "./toggle";

describe("Toggle (PRIZM / Radix)", () => {
  it("renderiza conteúdo e aplica aria-pressed quando defaultPressed=true", () => {
    render(<Toggle defaultPressed>Ativo</Toggle>);

    const button = screen.getByRole("button", { name: /ativo/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("aplica variantes de tamanho e estilo via props", () => {
    render(
      <Toggle variant="outline" size="sm">
        Pequeno
      </Toggle>,
    );

    const button = screen.getByRole("button", { name: /pequeno/i });
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "sm");
  });
});
