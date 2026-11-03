import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

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

describe("Command: decisões de 03/11/2026", () => {
  const groups = [{ heading: "Sugestões", items: [{ label: "Calendário", shortcut: "⌘K" }, { label: "Calculadora" }] }];

  it("textos padrão em pt-BR (D1)", () => {
    render(<Command groups={groups} />);
    expect(screen.getByPlaceholderText("Digite um comando ou busque…")).toBeInTheDocument();
  });

  it("a busca tem nome: label padrão Buscar comandos (pendência 1)", () => {
    render(<Command groups={groups} />);
    expect(screen.getByRole("combobox", { name: "Buscar comandos" })).toBeInTheDocument();
  });

  it("label pode ser trocado", () => {
    render(<Command groups={groups} label="Buscar páginas" />);
    expect(screen.getByRole("combobox", { name: "Buscar páginas" })).toBeInTheDocument();
  });

  it("item com 32px e radius/sm, como o Select (D4, D5)", () => {
    render(<Command groups={groups} />);
    const item = screen.getByRole("option", { name: /Calendário/ });
    expect(item).toHaveClass("rounded-sm", "px-2", "py-1.5", "gap-2");
    expect(item).not.toHaveClass("rounded-md", "py-2.5");
  });

  it("ícone de busca em muted-foreground, sem opacidade (D6)", () => {
    const { container } = render(<Command groups={groups} />);
    const icon = container.querySelector("[cmdk-input-wrapper] svg");
    expect(icon).toHaveClass("text-muted-foreground");
    expect(icon?.getAttribute("class")).not.toContain("opacity-50");
  });

  it("CommandDialog com trigger mostra a busca e a lista, com descrição", async () => {
    render(
      <CommandDialog trigger={<button type="button">Abrir comandos</button>}>
        <CommandInput placeholder="Buscar…" />
        <CommandList>
          <CommandItem>Calendário</CommandItem>
        </CommandList>
      </CommandDialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Abrir comandos" }));
    const dialog = await screen.findByRole("dialog", { name: "Buscar" });
    expect(dialog).toHaveAccessibleDescription("Digite para filtrar e use as setas para escolher.");
    expect(screen.getByPlaceholderText("Buscar…")).toBeInTheDocument();
    expect(screen.getByText("Calendário")).toBeInTheDocument();
  });

  it("contêiner em radius/lg (D8)", () => {
    const { container } = render(<Command groups={groups} />);
    expect(container.querySelector("[cmdk-root]")).toHaveClass("rounded-lg");
  });
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

    expect(commandRoot).toHaveClass("rounded-lg");
    expect(commandRoot).toHaveClass("bg-popover");
    expect(commandRoot).toHaveClass("text-popover-foreground");

    expect(list).toHaveClass("overflow-y-auto");
  });
});
