import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Empty } from "./empty";

describe("Empty (PRIZM)", () => {
  it("renders title and description via props", () => {
    render(<Empty title="No items" description="Get started by adding one." />);
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.getByText("Get started by adding one.")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<Empty title="Empty" icon={<span data-testid="empty-icon">Icon</span>} />);
    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("renders content slot when content prop is provided", () => {
    render(<Empty title="Empty" content={<button type="button">Add item</button>} />);
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });

  it("renders children when title is not set (escape hatch)", () => {
    render(
      <Empty>
        <span data-testid="custom-child">Custom content</span>
      </Empty>,
    );
    expect(screen.getByTestId("custom-child")).toHaveTextContent("Custom content");
  });

  it("uses simplified layout when title is set (ignores children for layout)", () => {
    render(
      <Empty title="Title" description="Desc">
        <span data-testid="child">Child</span>
      </Empty>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    // Children are not rendered when using simplified API
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
  });

  it("has data-slot empty on root", () => {
    render(<Empty title="Title" />);
    const root = document.querySelector('[data-slot="empty"]');
    expect(root).toBeInTheDocument();
  });

  it("applies mediaVariant icon class when mediaVariant is icon", () => {
    render(<Empty title="Title" icon={<span />} mediaVariant="icon" />);
    const iconSlot = document.querySelector('[data-slot="empty-icon"]');
    expect(iconSlot).toHaveClass("bg-muted");
  });

  it("removes border and padding when appearance is plain", () => {
    render(<Empty appearance="plain" title="Title" description="Desc" />);
    const root = document.querySelector('[data-slot="empty"]');
    expect(root).toHaveAttribute("data-appearance", "plain");
    expect(root).toHaveClass("border-none", "p-0");
    expect(root).not.toHaveClass("border-dashed");
    expect(document.querySelector('[data-slot="empty-description"]')).toHaveClass("max-w-xl");
  });
});
