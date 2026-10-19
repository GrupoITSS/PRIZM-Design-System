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
});
