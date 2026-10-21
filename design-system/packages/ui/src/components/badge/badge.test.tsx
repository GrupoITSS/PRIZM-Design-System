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

  it("warning usa bg-warning e o texto warning-foreground", () => {
    render(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText("Warning")).toHaveClass(
      "bg-warning",
      "text-warning-foreground",
      "hover:bg-warning/80",
    );
  });

  it("tamanhos sm (padrão), md e lg, como no Figma", () => {
    const { rerender } = render(<Badge variant="default">Tamanho</Badge>);
    expect(screen.getByText("Tamanho")).toHaveClass("h-5", "gap-1", "text-xs");
    rerender(
      <Badge variant="default" size="md">
        Tamanho
      </Badge>,
    );
    expect(screen.getByText("Tamanho")).toHaveClass("h-6", "gap-1.5", "text-xs");
    rerender(
      <Badge variant="default" size="lg">
        Tamanho
      </Badge>,
    );
    expect(screen.getByText("Tamanho")).toHaveClass("h-7", "gap-2", "text-sm");
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
      <Badge variant="default" className="bg-info-weak text-info-strong">
        Custom
      </Badge>,
    );
    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("bg-info-weak", "text-info-strong");
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

  it("não remove o outline sem um anel no lugar (Critério de acessibilidade, 2.4.7)", () => {
    render(<Badge variant="default">Outline</Badge>);
    const classes = screen.getByText("Outline").className.split(" ");
    const semOutline = classes.some((c) => c.endsWith("outline-none"));
    const comAnel = classes.some((c) => c.startsWith("focus-visible:ring"));
    expect(semOutline && !comAnel).toBe(false);
  });
});
