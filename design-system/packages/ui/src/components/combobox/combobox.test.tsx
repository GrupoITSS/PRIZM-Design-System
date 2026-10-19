import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Combobox } from "./combobox";

describe("Combobox (PRIZM / base-ui)", () => {
  it("renderiza input via API por props (items + placeholder)", () => {
    render(
      <Combobox
        items={["Apple", "Orange", "Banana"]}
        placeholder="Select a fruit..."
        emptyMessage="No items found."
      />,
    );

    expect(screen.getByPlaceholderText("Select a fruit...")).toBeInTheDocument();
  });
});
