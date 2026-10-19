import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NavigationMenu } from "./navigation-menu";

describe("NavigationMenu (PRIZM / Radix)", () => {
  it("renderiza itens via API de props", () => {
    render(
      <NavigationMenu
        items={[
          { label: "Home", href: "/" },
          {
            type: "panel",
            label: "Products",
            items: [
              {
                label: "Analytics",
                description: "Dashboards & insights",
                href: "/analytics",
              },
            ],
          },
        ]}
      />,
    );

    // Trigger principal renderizado pela API simplificada
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renderiza picker em lista sem viewport compartilhado", () => {
    render(
      <NavigationMenu
        viewport={false}
        items={[
          {
            type: "panel",
            label: "Todas as organizações",
            layout: "list",
            items: [
              { label: "Org A", onSelect: () => undefined, selected: true },
              { label: "Org B", onSelect: () => undefined },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText("Todas as organizações")).toBeInTheDocument();
  });
});
