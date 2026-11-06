import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Button } from "../button";
import { Kbd } from "../kbd";
import { Tooltip } from "./tooltip";

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

describe("Tooltip · teclado e nomes (etapa 4, 06/11/2026)", () => {
  it("abre no foco de teclado e liga o gatilho ao balão por aria-describedby", async () => {
    render(
      <Tooltip content="Save changes">
        <Button aria-label="Save">S</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Save" });
    act(() => trigger.focus());
    const tip = await screen.findByRole("tooltip", { name: "Save changes" });
    expect(trigger).toHaveAttribute("aria-describedby", tip.id);
    expect(trigger).toHaveAccessibleName("Save");
    expect(trigger).toHaveAccessibleDescription("Save changes");
  });

  it("Esc fecha sem tirar o foco do gatilho (1.4.13, dispensável)", async () => {
    render(
      <Tooltip content="Save changes">
        <Button>Save</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Save" });
    act(() => trigger.focus());
    await screen.findByRole("tooltip");
    fireEvent.keyDown(document.activeElement ?? trigger, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("botão disabled não recebe foco: o tooltip não abre pelo teclado (pendência D7)", () => {
    render(
      <Tooltip content="This feature is currently unavailable">
        <span className="inline-block">
          <Button disabled>Disabled</Button>
        </span>
      </Tooltip>,
    );
    const btn = screen.getByRole("button", { name: "Disabled" });
    act(() => btn.focus());
    expect(btn).not.toHaveFocus();
  });

  it("Kbd dentro do balão: o conteúdo tem data-slot=tooltip-content (pendência 2, corrigida)", async () => {
    render(
      <Tooltip
        content={
          <span>
            Save <Kbd keys={["S"]} />
          </span>
        }
        defaultOpen
      >
        <Button>Save</Button>
      </Tooltip>,
    );
    await screen.findByRole("tooltip");
    expect(
      document.querySelector(
        "[data-slot=tooltip-content] kbd, [data-slot=tooltip-content] [data-slot=kbd]",
      ),
    ).toBeTruthy();
  });
});
