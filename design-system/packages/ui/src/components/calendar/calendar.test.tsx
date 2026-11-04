import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar (PRIZM / shadcn)", () => {
  it("renderiza a estrutura básica do calendário", () => {
    render(<Calendar mode="single" />);

    // `react-day-picker` usa role="grid" para o calendário.
    const grid = screen.getByRole("grid");
    expect(grid).toBeInTheDocument();
  });

  it("suporta seleção de intervalo (mode='range')", () => {
    render(<Calendar mode="range" numberOfMonths={2} />);

    const grids = screen.getAllByRole("grid");
    expect(grids).toHaveLength(2);
  });

  it("mantém no dia o anel de foco do Button", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 10, 1)} />);

    // O ring-0! (com !important) apagava o anel: o dia focado ficava sem sinal visível.
    const dia = screen.getByRole("button", { name: / 3 de novembro de 2026/ });
    expect(dia.className).not.toMatch(/(^|\s)ring-0!/);
    expect(dia).toHaveClass("focus-visible:ring-[3px]", "focus-visible:ring-offset-2");
  });

  it("usa text-xs nos dias da semana e no número da semana", () => {
    const { container } = render(
      <Calendar mode="single" showWeekNumber defaultMonth={new Date(2026, 10, 1)} />,
    );

    // O cabeçalho dos dias fica com aria-hidden: cada dia já diz o dia da semana no nome.
    expect(container.querySelector(".rdp-weekday")).toHaveClass("text-xs");
    expect(container.querySelector(".rdp-week_number")).toHaveClass("text-xs");
    expect(container.innerHTML).not.toContain("text-[0.8rem]");
  });

  it("nomeia as setas em pt-BR por padrão", () => {
    render(<Calendar mode="single" />);

    expect(screen.getByRole("button", { name: "Ir para o mês anterior" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ir para o próximo mês" })).toBeInTheDocument();
  });
});
