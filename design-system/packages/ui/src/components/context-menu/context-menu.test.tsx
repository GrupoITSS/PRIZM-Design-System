import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContextMenu } from "./context-menu";

describe("ContextMenu (PRIZM / shadcn)", () => {
  it("renderiza a área de clique direito quando usando API simplificada", () => {
    render(
      <ContextMenu items={[{ label: "Profile" }]}>
        <div data-testid="trigger-area">Right-click here</div>
      </ContextMenu>,
    );

    const area = screen.getByTestId("trigger-area");
    expect(area).toBeInTheDocument();
    expect(area).toHaveTextContent("Right-click here");
    // Menu deve iniciar fechado (conteúdo não visível no DOM até abrir)
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("renderiza children em modo composição (sem items)", () => {
    render(
      <ContextMenu>
        <div data-testid="composition-child">Area</div>
      </ContextMenu>,
    );

    expect(screen.getByTestId("composition-child")).toBeInTheDocument();
  });
});
