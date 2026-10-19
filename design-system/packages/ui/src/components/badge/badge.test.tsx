import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge (PRIZM / shadcn)", () => {
  it("renderiza o conteúdo passado em children", () => {
    render(<Badge variant="default">New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("aplica variant default corretamente", () => {
    render(<Badge variant="default">Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-foreground");
  });

  it("aplica variant primary corretamente", () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText("Primary");
    expect(badge).toHaveClass("bg-primary");
  });

  it("aplica variant success corretamente", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-success");
  });

  it("aplica variant warning corretamente", () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-warning");
  });

  it("aplica variant info corretamente", () => {
    render(<Badge variant="info">Info</Badge>);
    const badge = screen.getByText("Info");
    expect(badge).toHaveClass("bg-info");
  });

  it("aplica outras variants corretamente", () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");

    rerender(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");

    rerender(
      <Badge variant="violet" appearance="outlined">
        Personalizado
      </Badge>,
    );
    expect(screen.getByText("Personalizado")).toHaveClass(
      "bg-violet-600/10",
      "text-violet-600",
      "border-violet-600/40",
    );
  });

  it("aplica tamanhos diferentes via prop size", () => {
    const { rerender } = render(
      <Badge variant="default" size="sm">
        Small
      </Badge>,
    );
    let badge = screen.getByText("Small");
    expect(badge).toHaveClass("h-5", "gap-1", "text-xs");

    rerender(
      <Badge variant="default" size="lg">
        Large
      </Badge>,
    );
    badge = screen.getByText("Large");
    expect(badge).toHaveClass("h-7", "gap-2", "text-sm");
  });

  it("renderiza startIcon e endIcon com data-icon corretos", () => {
    render(
      <Badge
        variant="default"
        startIcon={<span data-testid="start" />}
        endIcon={<span data-testid="end" />}
      >
        Labeled
      </Badge>,
    );
    const start = screen.getByTestId("start").parentElement;
    const end = screen.getByTestId("end").parentElement;
    expect(start).toHaveAttribute("data-icon", "inline-start");
    expect(end).toHaveAttribute("data-icon", "inline-end");
  });

  it("marca badge como loading com aria-busy e data-loading", () => {
    render(
      <Badge variant="default" loading>
        Loading
      </Badge>,
    );
    const badge = screen.getByText("Loading");
    expect(badge).toHaveAttribute("aria-busy", "true");
    expect(badge).toHaveAttribute("data-loading", "");
  });
});
