import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton (PRIZM / Skeleton)", () => {
  it("renderiza um div com data-slot=skeleton", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);

    const element = container.querySelector('[data-slot="skeleton"]');
    expect(element).not.toBeNull();
  });

  it("aplica classes base de skeleton", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);

    const skeleton = container.querySelector<HTMLElement>('[data-slot="skeleton"]');

    expect(skeleton).not.toBeNull();
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("bg-muted");
  });

  it("permite controlar forma via prop shape", () => {
    const { rerender, container } = render(<Skeleton shape="rect" className="h-4 w-32" />);

    let el = container.querySelector<HTMLElement>('[data-slot="skeleton"]');
    expect(el).not.toBeNull();
    expect(el).toHaveClass("rounded-md");

    rerender(<Skeleton shape="pill" className="h-4 w-32" />);
    el = container.querySelector<HTMLElement>('[data-slot="skeleton"]');
    expect(el).toHaveClass("rounded-full");

    rerender(<Skeleton shape="circle" className="h-10 w-10" />);
    el = container.querySelector<HTMLElement>('[data-slot="skeleton"]');
    expect(el).toHaveClass("rounded-full");
  });

  it("aceita className extra para tamanho/layout", () => {
    const { container } = render(<Skeleton className="h-6 w-48 custom-class" />);

    const el = container.querySelector<HTMLElement>('[data-slot="skeleton"]');
    expect(el).not.toBeNull();
    expect(el).toHaveClass("h-6");
    expect(el).toHaveClass("w-48");
    expect(el).toHaveClass("custom-class");
  });
});
