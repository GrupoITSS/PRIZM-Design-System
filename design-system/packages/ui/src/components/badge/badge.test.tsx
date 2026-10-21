import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge (PRIZM / Figma)", () => {
  it("renderiza o conteúdo passado em children", () => {
    render(<Badge variant="default">New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("aplica variant default em color/primary, como no Figma", () => {
    render(<Badge variant="default">Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("aplica as variants secondary e destructive", () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary", "text-secondary-foreground");

    rerender(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toHaveClass(
      "bg-destructive",
      "text-destructive-foreground",
    );
  });

  it("outline usa os mesmos tokens do outline do Button", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass(
      "border-input",
      "bg-input-background",
      "text-foreground",
      "shadow-xs",
      "hover:bg-accent",
      "hover:text-accent-foreground",
    );
  });

  it("verified usa o tom info", () => {
    render(<Badge variant="verified">Verified</Badge>);
    expect(screen.getByText("Verified")).toHaveClass("bg-info", "text-info-foreground");
  });

  it("success usa bg-success e o texto success-foreground", () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass(
      "bg-success",
      "text-success-foreground",
      "hover:bg-success/80",
    );
  });

  it("segue o Figma: raio md, peso semibold, padding de 8px e 20px de altura", () => {
    render(<Badge variant="default">Figma</Badge>);
    expect(screen.getByText("Figma")).toHaveClass(
      "rounded-md",
      "font-semibold",
      "px-2",
      "py-0.5",
      "h-5",
    );
  });

  it("shape number vira contador redondo de 20px no mínimo", () => {
    render(
      <Badge variant="default" shape="number">
        8
      </Badge>,
    );
    const badge = screen.getByText("8");
    expect(badge).toHaveClass("min-w-5", "rounded-full", "px-1");
    expect(badge).not.toHaveClass("rounded-md");
    expect(badge).not.toHaveClass("px-2");
  });

  it("cores fora do Figma entram por className", () => {
    render(
      <Badge variant="default" className="bg-warning text-warning-foreground">
        Custom
      </Badge>,
    );
    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("bg-warning", "text-warning-foreground");
    expect(badge).not.toHaveClass("bg-primary");
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
