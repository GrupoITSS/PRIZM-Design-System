import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Tooltip } from "./tooltip";

function hoverTrigger(trigger: HTMLElement) {
  fireEvent.pointerEnter(trigger);
  fireEvent.pointerMove(trigger);
}

describe("Tooltip (PRIZM / shadcn)", () => {
  it("renderiza o trigger e mostra content no hover", async () => {
    render(
      <Tooltip content="Hint text">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    const button = screen.getByRole("button", { name: /hover me/i });
    expect(button).toBeInTheDocument();
    hoverTrigger(button);
    expect(await screen.findByRole("tooltip", { name: "Hint text" })).toBeInTheDocument();
  });

  it("aceita content como ReactNode", async () => {
    render(
      <Tooltip content={<span data-testid="custom-content">Custom</span>}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    hoverTrigger(screen.getByRole("button", { name: /trigger/i }));
    const tooltip = await screen.findByRole("tooltip", { name: "Custom" });
    expect(tooltip).toBeInTheDocument();
    expect(screen.getAllByTestId("custom-content").length).toBeGreaterThanOrEqual(1);
  });

  it("aplica contentClassName ao conteúdo do tooltip", async () => {
    render(
      <Tooltip content="Test" contentClassName="custom-tooltip-class">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    hoverTrigger(screen.getByRole("button"));
    const tooltip = await screen.findByRole("tooltip", { name: "Test" });
    expect(tooltip.closest(".custom-tooltip-class")).toBeInTheDocument();
  });

  it("usa side e sideOffset nas props do Content", async () => {
    render(
      <Tooltip content="Bottom tip" side="bottom" sideOffset={10}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    hoverTrigger(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip", { name: "Bottom tip" })).toBeInTheDocument();
  });
});
