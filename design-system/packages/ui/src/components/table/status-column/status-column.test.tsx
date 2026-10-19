import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusColumnComponent } from "./status-column";

describe("StatusColumnComponent", () => {
  it("renderiza Ativo com ícone Check", () => {
    const { container } = render(<StatusColumnComponent status="Ativo" />);
    expect(screen.getByText("Ativo")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renderiza Inativo com ícone Inactive", () => {
    const { container } = render(<StatusColumnComponent status="Inativo" />);
    expect(screen.getByText("Inativo")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
