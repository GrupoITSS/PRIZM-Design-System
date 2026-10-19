import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs } from "./tabs";

describe("Tabs (PRIZM / Radix)", () => {
  it("renderiza labels e conteúdo baseado em items (API por props)", () => {
    render(
      <Tabs
        items={[
          {
            value: "one",
            label: "Primeira",
            content: <div>Conteúdo 1</div>,
          },
          {
            value: "two",
            label: "Segunda",
            content: <div>Conteúdo 2</div>,
          },
        ]}
      />,
    );

    expect(screen.getByRole("tab", { name: /primeira/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /segunda/i })).toBeInTheDocument();

    // Primeiro conteúdo é mostrado por padrão (tabpanel ativo)
    expect(screen.getByText("Conteúdo 1")).toBeInTheDocument();
  });

  it("aplica estado desabilitado quando disabled=true no item", () => {
    render(
      <Tabs
        items={[
          {
            value: "enabled",
            label: "Ativa",
            content: <div>Ativa</div>,
          },
          {
            value: "disabled",
            label: "Desabilitada",
            disabled: true,
            content: <div>Desabilitada</div>,
          },
        ]}
      />,
    );

    const disabledTab = screen.getByRole("tab", { name: /desabilitada/i });
    expect(disabledTab).toHaveAttribute("data-disabled");
  });
});
