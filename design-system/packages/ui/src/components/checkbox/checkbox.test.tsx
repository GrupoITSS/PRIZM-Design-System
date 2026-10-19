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
    expect(root).toHaveClass("rounded-[4px]", "border", "border-input", "p-px");
  });

  it("respects size variant", () => {
    render(<Checkbox size="sm" aria-label="Small" />);
    const root = screen.getByRole("checkbox").closest("[data-slot='checkbox']");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveClass("h-[14px]", "w-[14px]");
  });

  it("calls onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Click me" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("associates label with checkbox via id when label prop is used", () => {
    render(<Checkbox id="terms" label="Accept" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept").closest("label");
    expect(checkbox).toHaveAttribute("id", "terms");
    expect(label).toHaveAttribute("for", "terms");
  });
});
