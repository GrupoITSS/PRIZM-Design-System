import { Button } from "../button";
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  dropdownMenuCheckboxItemStyles,
  dropdownMenuItemStyles,
  dropdownMenuLabelStyles,
  dropdownMenuRadioItemStyles,
  dropdownMenuSeparatorStyles,
  dropdownMenuShortcutStyles,
} from "./dropdown-menu.styles";

describe("DropdownMenu (PRIZM / shadcn)", () => {
  it("renderiza apenas o trigger quando fechado (API simplificada)", () => {
    render(<DropdownMenu trigger={<Button>Open</Button>} items={[{ label: "Profile" }]} />);

    const trigger = screen.getByRole("button", { name: /open/i });
    expect(trigger).toBeInTheDocument();
    // Menu deve iniciar fechado (conteúdo não presente)
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });
});

const cls = (s: string) => s.split(/\s+/);
const abrir = async (name = "Ações") => {
  const t = screen.getByRole("button", { name });
  t.focus();
  act(() => {
    fireEvent.keyDown(t, { key: "Enter" });
  });
  await screen.findByRole("menu");
};

describe("DropdownMenu: decisões de 04/11/2026", () => {
  it("1: variant destructive no item e nos items, com destructive-strong em repouso", async () => {
    render(
      <DropdownMenu
        trigger={<Button>Ações</Button>}
        items={[{ label: "Editar" }, { label: "Excluir", variant: "destructive" }]}
      />,
    );
    await abrir();
    expect(screen.getByRole("menuitem", { name: "Excluir" })).toHaveAttribute(
      "data-variant",
      "destructive",
    );
    expect(screen.getByRole("menuitem", { name: "Editar" })).toHaveAttribute(
      "data-variant",
      "default",
    );
    const c = cls(dropdownMenuItemStyles);
    expect(c).toContain("data-[variant=destructive]:text-destructive-strong");
    expect(c).toContain("data-[variant=destructive]:focus:text-destructive");
  });

  it("1: variant destructive na composição", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Ações</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await abrir();
    expect(screen.getByRole("menuitem", { name: "Excluir" })).toHaveAttribute(
      "data-variant",
      "destructive",
    );
  });

  it("2: descrição em text-xs muted-foreground", async () => {
    render(
      <DropdownMenu
        trigger={<Button>Ações</Button>}
        items={[{ label: "Perfil", description: "Ver e editar" }]}
      />,
    );
    await abrir();
    expect(screen.getByText("Ver e editar")).toHaveClass("text-xs", "text-muted-foreground");
  });

  it("3, 4 e 5: rótulo herda o texto do menu, separador em border, atalho em muted-foreground", () => {
    expect(cls(dropdownMenuLabelStyles)).not.toContain("text-muted-foreground");
    expect(cls(dropdownMenuSeparatorStyles)).toContain("bg-border");
    expect(cls(dropdownMenuSeparatorStyles)).not.toContain("bg-muted");
    expect(cls(dropdownMenuShortcutStyles)).toContain("text-muted-foreground");
    expect(cls(dropdownMenuShortcutStyles)).not.toContain("opacity-60");
  });

  it("6: desabilitado sem clique, sem cursor-not-allowed (item, checkbox e radio)", () => {
    for (const s of [
      dropdownMenuItemStyles,
      dropdownMenuCheckboxItemStyles,
      dropdownMenuRadioItemStyles,
    ]) {
      expect(cls(s)).toContain("data-[disabled]:pointer-events-none");
      expect(s).not.toContain("cursor-not-allowed");
    }
  });

  it("ícone do item em muted-foreground, accent-foreground no destaque; chevron do submenu segue o texto", async () => {
    const c = cls(dropdownMenuItemStyles);
    expect(c).toContain("[&_svg:not([class*='text-'])]:text-muted-foreground");
    expect(c).toContain("focus:[&_svg:not([class*='text-'])]:text-accent-foreground");
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Ações</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await abrir();
    expect(screen.getByRole("menuitem", { name: "Compartilhar" }).querySelector("svg")).toHaveClass(
      "text-current",
    );
  });
});
