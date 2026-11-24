import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Progress } from "./progress";

const indicatorOf = (bar: HTMLElement) => bar.querySelector<HTMLElement>('[data-slot="progress-indicator"]');

describe("Progress (PRIZM / shadcn)", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renderiza um progressbar com valor limitado entre 0 e 100", () => {
    render(<Progress value={150} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: /upload/i });
    expect(indicatorOf(bar)).toHaveStyle("transform: translateX(-0%)");
  });

  it("anuncia o valor: aria-valuenow, aria-valuemax e aria-valuetext do Radix", () => {
    render(<Progress value={75} aria-label="Envio" />);
    const bar = screen.getByRole("progressbar", { name: "Envio" });
    expect(bar).toHaveAttribute("aria-valuenow", "75");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "75%");
  });

  it("aplica classes de size no root", () => {
    const { rerender } = render(<Progress value={50} size="sm" aria-label="Envio" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-1");
    rerender(<Progress value={50} size="md" aria-label="Envio" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-2");
    rerender(<Progress value={50} size="lg" aria-label="Envio" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-3");
  });

  it("aplica className no root", () => {
    render(<Progress value={40} className="custom-progress" aria-label="Envio" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-progress");
  });

  it("calcula o transform do indicador pelo value", () => {
    render(<Progress value={25} aria-label="Envio" />);
    expect(indicatorOf(screen.getByRole("progressbar"))).toHaveStyle("transform: translateX(-75%)");
  });

  it("status default por padrão: trilho primary a 20% e indicador primary", () => {
    render(<Progress value={40} aria-label="Envio" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-status", "default");
    expect(bar).toHaveClass("bg-primary/20");
    expect(indicatorOf(bar)).toHaveClass("bg-primary");
  });

  it("não troca para success ao chegar a 100%", () => {
    render(<Progress value={100} aria-label="Envio" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-status", "default");
  });

  it("info é apelido obsoleto de default", () => {
    render(<Progress value={60} status="info" aria-label="Envio" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-status", "default");
    expect(indicatorOf(bar)).toHaveClass("bg-primary");
  });

  it("warning usa warning-strong no indicador e o tom a 20% no trilho", () => {
    render(<Progress value={80} status="warning" aria-label="Envio" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveClass("bg-warning/20");
    expect(indicatorOf(bar)).toHaveClass("bg-warning-strong");
  });

  it("aceita o status vindo do produto", () => {
    render(<Progress value={100} status="error" aria-label="Envio" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-status", "error");
    expect(indicatorOf(bar)).toHaveClass("bg-destructive");
  });

  it("nomeia a barra por aria-labelledby, sem aviso", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <>
        <span id="rotulo">Envio de relatorio.pdf</span>
        <Progress value={30} aria-labelledby="rotulo" />
      </>,
    );
    expect(screen.getByRole("progressbar", { name: "Envio de relatorio.pdf" })).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("avisa no console quando a barra não tem nome", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Progress value={30} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Progress: barra sem nome acessível"));
  });
});
