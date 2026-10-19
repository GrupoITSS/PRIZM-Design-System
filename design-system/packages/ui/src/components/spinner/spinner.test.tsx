import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders with default aria attributes", () => {
    render(<Spinner />);

    const spinner = screen.getByLabelText("Loading");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("role", "status");
  });

  it("accepts custom aria-label", () => {
    render(<Spinner aria-label="Loading data" />);

    const spinner = screen.getByLabelText("Loading data");
    expect(spinner).toBeInTheDocument();
  });

  it("applies size classes based on size prop", () => {
    const { rerender } = render(<Spinner size="xs" aria-label="xs" />);
    expect(screen.getByLabelText("xs")).toHaveClass("size-3");

    rerender(<Spinner size="sm" aria-label="sm" />);
    expect(screen.getByLabelText("sm")).toHaveClass("size-4");

    rerender(<Spinner size="md" aria-label="md" />);
    expect(screen.getByLabelText("md")).toHaveClass("size-5");

    rerender(<Spinner size="lg" aria-label="lg" />);
    expect(screen.getByLabelText("lg")).toHaveClass("size-8");
  });
  it("applies custom animation duration when degree is not normal", () => {
    const { rerender } = render(<Spinner degree="slow" aria-label="slow" />);
    expect(screen.getByLabelText("slow")).toHaveStyle("animation-duration: 800ms");

    rerender(<Spinner degree="fast" aria-label="fast" />);
    expect(screen.getByLabelText("fast")).toHaveStyle("animation-duration: 400ms");
  });
});
