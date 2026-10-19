import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Menubar } from "./menubar";

describe("Menubar (PRIZM / Radix)", () => {
  it("renderiza menus e itens via API de props", () => {
    const onSelect = vi.fn();

    render(
      <Menubar
        menus={[
          {
            label: "File",
            items: [{ label: "New Tab", shortcut: "⌘T", onSelect }],
          },
        ]}
      />,
    );

    // Trigger do menu (API simplificada por props)
    expect(screen.getByText("File")).toBeInTheDocument();
  });
});
