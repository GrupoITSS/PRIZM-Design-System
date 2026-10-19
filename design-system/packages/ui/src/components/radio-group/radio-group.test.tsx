import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup } from "./radio-group";

describe("RadioGroup (PRIZM / Radix)", () => {
  it("renderiza itens via API de `items` (props based)", () => {
    render(
      <RadioGroup
        items={[
          { value: "default", label: "Default" },
          { value: "comfortable", label: "Comfortable" },
          { value: "compact", label: "Compact" },
        ]}
      />,
    );

    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Comfortable")).toBeInTheDocument();
    expect(screen.getByText("Compact")).toBeInTheDocument();
  });

  it("dispara onValueChange ao selecionar um item", () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup
        onValueChange={handleChange}
        items={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
      />,
    );

    fireEvent.click(screen.getByText("Option 2"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("option2");
  });

  it("aplica orientação e espaçamento via props na raiz", () => {
    render(
      <RadioGroup
        orientation="horizontal"
        spacing={2}
        items={[{ value: "default", label: "Default" }]}
      />,
    );

    const root = screen.getByRole("radiogroup");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    expect(root.className).toContain("flex-row");
    expect(root.className).toContain("gap-2");
  });
});
