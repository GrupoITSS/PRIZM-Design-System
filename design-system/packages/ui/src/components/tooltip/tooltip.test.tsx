import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import { Tooltip, TooltipProvider } from "./tooltip";

// A seta do Radix (Tooltip.Arrow) mede o tamanho com ResizeObserver, que o jsdom não tem.
beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

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

describe("Tooltip · decisões de 06/11/2026", () => {
  it("balão em tooltip/tooltip-foreground, text-xs, sem sombra nem borda, max-w-sm", async () => {
    render(
      <Tooltip content="Hint" defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await screen.findByRole("tooltip");
    const content = document.querySelector("[data-slot=tooltip-content]") as HTMLElement;
    expect(content).toHaveClass(
      "bg-tooltip",
      "text-tooltip-foreground",
      "text-xs",
      "font-normal",
      "max-w-sm",
      "rounded-md",
      "px-3",
      "py-1.5",
    );
    expect(content.className).not.toMatch(/shadow|border|bg-popover/);
  });

  it("tem seta na cor do balão", async () => {
    render(
      <Tooltip content="Hint" defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await screen.findByRole("tooltip");
    const arrow = document.querySelector("[data-slot=tooltip-arrow]");
    expect(arrow).toHaveClass("bg-tooltip", "fill-tooltip", "size-2.5");
  });
});

describe("TooltipProvider", () => {
  afterEach(() => vi.useRealTimers());

  const open = (name: string) => {
    const t = screen.getByRole("button", { name });
    fireEvent.pointerMove(t, { pointerType: "mouse" });
  };

  it("sem provider: o Tooltip espera os 200ms padrão", () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Bold tip">
        <button type="button">Bold</button>
      </Tooltip>,
    );
    open("Bold");
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole("tooltip", { name: "Bold tip" })).toBeInTheDocument();
  });

  it("dentro do provider: usa o atraso do provider, não cria o próprio", () => {
    vi.useFakeTimers();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Bold tip">
          <button type="button">Bold</button>
        </Tooltip>
      </TooltipProvider>,
    );
    open("Bold");
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.getByRole("tooltip", { name: "Bold tip" })).toBeInTheDocument();
  });

  it("dentro do provider: delayDuration no Tooltip vale só para ele", () => {
    vi.useFakeTimers();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Slow tip" delayDuration={500}>
          <button type="button">Slow</button>
        </Tooltip>
      </TooltipProvider>,
    );
    open("Slow");
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(screen.getByRole("tooltip", { name: "Slow tip" })).toBeInTheDocument();
  });
});
