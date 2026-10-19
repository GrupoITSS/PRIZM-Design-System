import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";

// `cmdk` usa ResizeObserver internamente; em ambiente de teste (jsdom)
// precisamos garantir que exista uma implementação mínima.
beforeAll(() => {
  if (typeof window !== "undefined") {
    if (!("ResizeObserver" in window)) {
      // @ts-expect-error - usado apenas em testes
      window.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }

    if (!("scrollIntoView" in window.HTMLElement.prototype)) {
      // @ts-expect-error - usado apenas em testes
      window.HTMLElement.prototype.scrollIntoView = () => {};
    }
  }
});

describe("Command (PRIZM / cmdk)", () => {
  it("renderiza input, grupos e itens", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Group">
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("aplica estilos base do command", () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </Command>,
    );

    const item = screen.getByText("Item");
    const list = item.closest("[cmdk-list]");
    const commandRoot = item.closest("[cmdk-root]");

    expect(commandRoot).toHaveClass("rounded-md");
    expect(commandRoot).toHaveClass("bg-popover");
    expect(commandRoot).toHaveClass("text-popover-foreground");

    expect(list).toHaveClass("overflow-y-auto");
  });
});
