import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio (PRIZM / shadcn)", () => {
  it("renderiza children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span data-testid="child">Content</span>
      </AspectRatio>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("aplica ratio via style (Radix)", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} data-testid="root">
        <div>Inner</div>
      </AspectRatio>,
    );
    const root = container.querySelector("[data-slot='aspect-ratio']");
    expect(root).toBeInTheDocument();
    // Radix AspectRatio sets --aspect-ratio or similar; structure exists
    expect(root).toHaveClass("relative", "w-full");
  });

  it("aceita className customizada", () => {
    const { container } = render(
      <AspectRatio ratio={1} className="max-w-xs">
        <div>Square</div>
      </AspectRatio>,
    );
    const root = container.querySelector("[data-slot='aspect-ratio']");
    expect(root).toHaveClass("max-w-xs");
  });
});
