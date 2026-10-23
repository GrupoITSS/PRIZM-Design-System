import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders with default aria attributes, in Portuguese", () => {
    render(<Spinner />);
    const spinner = screen.getByLabelText("Carregando");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("role", "status");
  });

  it("accepts custom aria-label", () => {
    render(<Spinner aria-label="Carregando pedidos" />);
    const spinner = screen.getByLabelText("Carregando pedidos");
    expect(spinner).toBeInTheDocument();
  });

  it("decorative (aria-hidden) gets no role and no default name", () => {
    const { container } = render(<Spinner aria-hidden="true" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toHaveAttribute("role");
    expect(svg).not.toHaveAttribute("aria-label");
  });

  it("applies size classes based on size prop (Figma Size xs to xl)", () => {
    const { rerender } = render(<Spinner size="xs" aria-label="xs" />);
    expect(screen.getByLabelText("xs")).toHaveClass("size-3");

    rerender(<Spinner size="sm" aria-label="sm" />);
    expect(screen.getByLabelText("sm")).toHaveClass("size-4");

    rerender(<Spinner size="md" aria-label="md" />);
    expect(screen.getByLabelText("md")).toHaveClass("size-5");

    rerender(<Spinner size="lg" aria-label="lg" />);
    expect(screen.getByLabelText("lg")).toHaveClass("size-6");

    rerender(<Spinner size="xl" aria-label="xl" />);
    expect(screen.getByLabelText("xl")).toHaveClass("size-8");
  });

  it("applies the animation duration of speed, normal included", () => {
    const { rerender } = render(<Spinner aria-label="normal" />);
    expect(screen.getByLabelText("normal")).toHaveStyle("animation-duration: 600ms");

    rerender(<Spinner speed="slow" aria-label="slow" />);
    expect(screen.getByLabelText("slow")).toHaveStyle("animation-duration: 800ms");

    rerender(<Spinner speed="fast" aria-label="fast" />);
    expect(screen.getByLabelText("fast")).toHaveStyle("animation-duration: 400ms");
  });

  it("still accepts degree, the old name of speed", () => {
    render(<Spinner degree="slow" aria-label="slow" />);
    expect(screen.getByLabelText("slow")).toHaveStyle("animation-duration: 800ms");
  });

  it("turns slower with prefers-reduced-motion", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Carregando")).toHaveClass(
      "motion-reduce:[animation-duration:1.5s]!",
    );
  });
});
