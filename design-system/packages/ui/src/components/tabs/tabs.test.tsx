import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

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

  const items = [
    { value: "one", label: "Primeira", content: <div>Conteúdo 1</div> },
    { value: "two", label: "Pendentes", content: <div>Conteúdo 2</div>, badge: 3 },
  ];

  it.each(["underline", "pills"] as const)(
    "aba do %s tem o anel de foco padrão (WCAG 2.4.7)",
    (variant) => {
      render(<Tabs variant={variant} items={items} />);
      const tab = screen.getByRole("tab", { name: /primeira/i });
      expect(tab.className).toContain("focus-visible:ring-[3px]");
      expect(tab.className).toContain("focus-visible:ring-ring");
      expect(tab.className).toContain("focus-visible:ring-offset-ring-offset");
      expect(tab.className).not.toContain("focus-visible:ring-0");
    },
  );

  it("badge entra depois do rótulo, como Badge número, e faz parte do nome", () => {
    render(<Tabs items={items} />);
    const tab = screen.getByRole("tab", { name: "Pendentes 3" });
    const badge = tab.querySelector('[data-slot="tabs-trigger-badge"] [data-slot="badge"]');
    expect(badge).toHaveTextContent("3");
  });

  it("pills tem a lista de 36px (h-9)", () => {
    render(<Tabs variant="pills" items={items} />);
    expect(screen.getByRole("tablist").className).toContain("h-9");
  });

  it("compõe com TabsList, TabsTrigger e TabsContent, na variante da Tabs", () => {
    render(
      <Tabs variant="pills" defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Alfa</TabsTrigger>
          <TabsTrigger value="b">Beta</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Painel Alfa</TabsContent>
        <TabsContent value="b">Painel Beta</TabsContent>
      </Tabs>,
    );
    const alfa = screen.getByRole("tab", { name: "Alfa" });
    expect(alfa).toHaveAttribute("aria-selected", "true");
    expect(alfa.className).toContain("rounded-md");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Painel Alfa");
  });
});
