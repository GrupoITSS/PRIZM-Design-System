import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const Composto = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>Ações</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Conta</DropdownMenuLabel>
      <DropdownMenuItem>Perfil</DropdownMenuItem>
      <DropdownMenuItem disabled>Faturamento</DropdownMenuItem>
      <DropdownMenuItem>Configurações</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked>Barra de status</DropdownMenuCheckboxItem>
      <DropdownMenuRadioGroup value="topo">
        <DropdownMenuRadioItem value="topo">Topo</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="base">Base</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>E-mail</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
);

const abrir = async () => {
  const trigger = screen.getByRole("button", { name: "Ações" });
  trigger.focus();
  act(() => {
    fireEvent.keyDown(trigger, { key: "Enter" });
  });
  await screen.findByRole("menu");
  return trigger;
};

describe("DropdownMenu · teclado e nomes (etapa 4, 04/11/2026)", () => {
  it("gatilho: aria-haspopup=menu e aria-expanded acompanha o estado", async () => {
    render(<Composto />);
    const trigger = screen.getByRole("button", { name: "Ações" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await abrir();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("abre com Enter e o foco vai para o primeiro item", async () => {
    render(<Composto />);
    await abrir();
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Perfil" })).toHaveFocus());
  });

  it("seta para baixo pula o item desabilitado", async () => {
    render(<Composto />);
    await abrir();
    const perfil = screen.getByRole("menuitem", { name: "Perfil" });
    await waitFor(() => expect(perfil).toHaveFocus());
    fireEvent.keyDown(perfil, { key: "ArrowDown" });
    // O Radix move o foco num setTimeout (roving focus).
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Configurações" })).toHaveFocus(),
    );
    expect(screen.getByRole("menuitem", { name: "Faturamento" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("Esc fecha e devolve o foco ao gatilho", async () => {
    render(<Composto />);
    const trigger = await abrir();
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("papéis: rótulo não é item, separador, checkbox e radio com estado, submenu", async () => {
    render(<Composto />);
    await abrir();
    expect(screen.queryByRole("menuitem", { name: "Conta" })).not.toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByRole("menuitemcheckbox", { name: "Barra de status" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("menuitemradio", { name: "Topo" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("menuitemradio", { name: "Base" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getByRole("menuitem", { name: "Compartilhar" })).toHaveAttribute(
      "aria-haspopup",
      "menu",
    );
  });

  it("ícones dos indicadores e do submenu ficam fora do nome (aria-hidden)", async () => {
    render(<Composto />);
    const menu = await (async () => {
      await abrir();
      return screen.getByRole("menu");
    })();
    const svgs = menu.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
    for (const svg of svgs) expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("API por props: o nome é só o rótulo; descrição por aria-describedby; atalho oculto", async () => {
    render(
      <DropdownMenu
        trigger={<Button>Ações</Button>}
        items={[{ label: "Configurações", shortcut: "⌘S", description: "Preferências da conta" }]}
      />,
    );
    await abrir();
    const item = screen.getByRole("menuitem");
    expect(item).toHaveAccessibleName("Configurações");
    expect(item).toHaveAccessibleDescription("Preferências da conta");
    expect(screen.getByText("⌘S")).toHaveAttribute("aria-hidden", "true");
  });

  it("submenu aberto: o SubTrigger mantém o destaque quando o foco entra no submenu", async () => {
    render(<Composto />);
    await abrir();
    const sub = screen.getByRole("menuitem", { name: "Compartilhar" });
    act(() => {
      sub.focus();
    });
    fireEvent.keyDown(sub, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "E-mail" })).toHaveFocus());
    expect(sub).toHaveAttribute("data-state", "open");
    expect(sub).toHaveClass("data-[state=open]:bg-accent");
  });
});
