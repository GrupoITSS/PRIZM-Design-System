import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ToggleGroup } from "./toggle-group";

describe("ToggleGroup (PRIZM / Radix)", () => {
  it("renderiza itens via API de `items` (props based)", () => {
    render(
      <ToggleGroup
        type="multiple"
        items={[
          { value: "bold", label: "Bold", ariaLabel: "Negrito" },
          { value: "italic", label: "Italic", ariaLabel: "Itálico" },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: /negrito/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /itálico/i })).toBeInTheDocument();
  });

  it("aplica orientação e espaçamento via props na raiz", () => {
    render(
      <ToggleGroup
        type="single"
        orientation="vertical"
        spacing={2}
        items={[{ value: "top", label: "Top", ariaLabel: "Top" }]}
      />,
    );

    // radix-ui 1.8+: a single-selection group is exposed as a radiogroup.
    const root = screen.getByRole("radiogroup");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root.className).toContain("flex-col");
    expect(root.className).toContain("gap-2");
  });
});
