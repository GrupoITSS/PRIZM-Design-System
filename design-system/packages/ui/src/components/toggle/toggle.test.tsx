import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toggle } from "./toggle";

describe("Toggle (PRIZM / Radix)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza conteúdo e aplica aria-pressed quando defaultPressed=true", () => {
    render(<Toggle defaultPressed>Ativo</Toggle>);

    const button = screen.getByRole("button", { name: /ativo/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("aplica variantes de tamanho e estilo via props", () => {
    render(
      <Toggle variant="outline" size="sm">
        Pequeno
      </Toggle>,
    );

    const button = screen.getByRole("button", { name: /pequeno/i });
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "sm");
  });

  it("usa control-height na altura e na largura mínima (TG1)", () => {
    render(
      <>
        <Toggle size="sm">sm</Toggle>
        <Toggle>md</Toggle>
        <Toggle size="lg">lg</Toggle>
      </>,
    );

    expect(screen.getByRole("button", { name: "sm" })).toHaveClass("h-control-height-sm", "min-w-control-height-sm");
    expect(screen.getByRole("button", { name: "md" })).toHaveClass("h-control-height-md", "min-w-control-height-md");
    expect(screen.getByRole("button", { name: "lg" })).toHaveClass("h-control-height-lg", "min-w-control-height-lg");
  });

  it("ligado em primary, com hover que não clareia o texto (TG3)", () => {
    render(<Toggle defaultPressed>Negrito</Toggle>);

    expect(screen.getByRole("button", { name: "Negrito" })).toHaveClass(
      "data-[state=on]:bg-primary",
      "data-[state=on]:text-primary-foreground",
      "data-[state=on]:hover:text-primary-foreground",
    );
  });

  it("tem o anel de foco do Prizm (TG4)", () => {
    render(<Toggle>Negrito</Toggle>);

    expect(screen.getByRole("button", { name: "Negrito" })).toHaveClass(
      "focus-visible:ring-[3px]",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-ring-offset",
    );
  });

  it("Outline igual ao do Button, com borda primary quando ligado (P1)", () => {
    render(<Toggle variant="outline">Negrito</Toggle>);

    expect(screen.getByRole("button", { name: "Negrito" })).toHaveClass(
      "border-input",
      "bg-input-background",
      "shadow-xs",
      "data-[state=on]:border-primary",
    );
  });

  it("avisa no console quando o Toggle só de ícone não tem nome", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Toggle>
        <svg aria-hidden="true" />
      </Toggle>,
    );

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Toggle: botão só de ícone sem nome"));
  });

  it("não avisa com aria-label nem com texto dentro de outro elemento", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <>
        <Toggle aria-label="Negrito">
          <svg aria-hidden="true" />
        </Toggle>
        <Toggle>
          <svg aria-hidden="true" />
          <span>Itálico</span>
        </Toggle>
      </>,
    );

    expect(warn).not.toHaveBeenCalled();
  });
});
