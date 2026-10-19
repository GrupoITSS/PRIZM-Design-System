import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders vertical scroll area by default", () => {
    render(
      <ScrollArea aria-label="Scrollable content">
        <div data-slot="scroll-area-content">Content</div>
      </ScrollArea>,
    );

    const region = screen.getByLabelText(/scrollable content/i);
    expect(region).toBeInTheDocument();
  });

  it("renders horizontal scrollbar when `horizontal` is true", () => {
    const { container } = render(
      <ScrollArea horizontal>
        <div data-slot="scroll-area-content" style={{ width: 600 }}>
          Wide content
        </div>
      </ScrollArea>,
    );

    const viewport = container.querySelector("[data-radix-scroll-area-viewport]");

    expect(viewport).toBeInTheDocument();
    expect(viewport).toHaveStyle("overflow-x: scroll");
  });
});
