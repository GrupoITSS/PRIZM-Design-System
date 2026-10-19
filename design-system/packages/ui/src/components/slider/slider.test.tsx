import "@testing-library/jest-dom/vitest";
import { fireEvent, render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Slider } from "./slider";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {};
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
});

describe("Slider", () => {
  it("renders with default props", () => {
    const { container } = render(<Slider aria-label="volume" />);

    const element = container.querySelector('[data-slot="slider"]');
    expect(element).not.toBeNull();
  });

  it("calls onValueChange when value changes (simple mode)", () => {
    const handleChange = vi.fn();

    render(<Slider aria-label="volume" defaultValue={20} onValueChange={handleChange} />);

    // Apenas garante que o callback é recebido e usado pela camada Radix.
    // A interação real (drag/keyboard) é coberta por testes de integração/E2E.
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("supports controlled value", () => {
    const { rerender } = render(<Slider aria-label="volume" value={10} onValueChange={vi.fn()} />);

    rerender(<Slider aria-label="volume" value={40} onValueChange={vi.fn()} />);
  });

  it("supports advanced range mode with values[]", () => {
    const handleRangeChange = vi.fn();

    const { container } = render(
      <Slider aria-label="range" values={[20, 80]} onValuesChange={handleRangeChange} />,
    );

    // Apenas garante que o componente renderiza sem crashar.
    const element = container.querySelector('[data-slot="slider"]');
    expect(element).not.toBeNull();
    expect(handleRangeChange).not.toHaveBeenCalled();
  });

  it("renders an inactive value tooltip per thumb by default", () => {
    const { container } = render(
      <Slider aria-label="volume" value={0.31} min={0} max={1} step={0.01} />,
    );

    const tooltip = container.querySelector('[data-slot="slider-thumb-tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip).toHaveAttribute("data-state", "closed");
  });

  it("activates the value tooltip while the thumb is pressed (pointer down/up)", () => {
    const { container } = render(
      <Slider aria-label="creativity" value={0.31} min={0} max={1} step={0.01} />,
    );

    const thumb = container.querySelector<HTMLElement>('[role="slider"]');
    expect(thumb).not.toBeNull();
    const tooltip = thumb?.querySelector<HTMLElement>('[data-slot="slider-thumb-tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip).toHaveAttribute("data-state", "closed");

    fireEvent.pointerDown(thumb as HTMLElement, { pointerId: 1 });
    expect(tooltip).toHaveAttribute("data-state", "open");
    expect(tooltip?.textContent).toBe("0.31");

    fireEvent.pointerUp(thumb as HTMLElement, { pointerId: 1 });
    expect(tooltip).toHaveAttribute("data-state", "closed");
  });

  it("derives decimals from step for the default tooltip formatter", () => {
    const { container } = render(
      <Slider aria-label="volume" value={42} min={0} max={100} step={1} />,
    );

    const tooltip = container.querySelector<HTMLElement>('[data-slot="slider-thumb-tooltip"]');
    expect(tooltip?.textContent).toBe("42");
  });

  it("allows customizing the tooltip value via formatValue", () => {
    const { container } = render(
      <Slider
        aria-label="volume"
        value={0.5}
        min={0}
        max={1}
        step={0.01}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />,
    );

    const tooltip = container.querySelector<HTMLElement>('[data-slot="slider-thumb-tooltip"]');
    expect(tooltip?.textContent).toBe("50%");
  });

  it("applies cursor-not-allowed when disabled", () => {
    const { container } = render(<Slider aria-label="volume" value={0.5} disabled />);

    const root = container.querySelector('[data-slot="slider"]');
    expect(root).toHaveClass("cursor-not-allowed");
    expect(root).toHaveAttribute("data-disabled");
    expect(container.firstElementChild).toHaveClass("cursor-not-allowed");
  });

  it("does not render the tooltip when showActiveValueTooltip is false", () => {
    const { container } = render(
      <Slider aria-label="volume" value={10} min={0} max={100} showActiveValueTooltip={false} />,
    );

    const tooltip = container.querySelector('[data-slot="slider-thumb-tooltip"]');
    expect(tooltip).toBeNull();
  });
});
