import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress";

describe("Progress (PRIZM / shadcn)", () => {
  it("renderiza um progressbar com valor clampado entre 0 e 100", () => {
    render(<Progress value={150} aria-label="Upload" />);
    const progressbar = screen.getByRole("progressbar", { name: /upload/i });
    expect(progressbar).toBeInTheDocument();

    const indicator = progressbar.querySelector<HTMLElement>(".flex-1");
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveStyle("transform: translateX(-0%)");
  });

  it("aplica classes de size corretamente no root", () => {
    const { rerender } = render(<Progress value={50} size="sm" />);
    let progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveClass("h-1");

    rerender(<Progress value={50} size="md" />);
    progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveClass("h-2");

    rerender(<Progress value={50} size="lg" />);
    progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveClass("h-3");
  });

  it("aplica className customizado no root", () => {
    render(<Progress value={40} className="custom-progress" />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveClass("custom-progress");
  });

  it("calcula o transform do indicador de acordo com o value", () => {
    render(<Progress value={25} />);
    const progressbar = screen.getByRole("progressbar");
    const indicator = progressbar.querySelector<HTMLElement>(".flex-1");
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveStyle("transform: translateX(-75%)");
  });

  it("usa status success automaticamente quando value = 100", () => {
    render(<Progress value={100} />);
    const progressbar = screen.getByRole("progressbar");
    const indicator = progressbar.querySelector<HTMLElement>(".flex-1");
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveAttribute("data-status", "success");
  });

  it("permite sobrescrever o status via prop", () => {
    render(<Progress value={100} status="error" />);
    const progressbar = screen.getByRole("progressbar");
    const indicator = progressbar.querySelector<HTMLElement>(".flex-1");
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveAttribute("data-status", "error");
  });
});
