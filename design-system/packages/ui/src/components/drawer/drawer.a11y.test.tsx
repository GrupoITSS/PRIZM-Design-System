import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Button } from "../button";
import { Drawer, DrawerClose } from "./drawer";

// O vaul consulta matchMedia ao abrir; o jsdom não tem.
beforeAll(() => {
  if (typeof window.matchMedia === "function") return;
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

function Exemplo(props: { dismissible?: boolean }) {
  return (
    <Drawer
      dismissible={props.dismissible}
      trigger={<Button>Abrir</Button>}
      title="Editar perfil"
      description="Altere os dados e salve."
      body={<input aria-label="Nome" />}
      footer={
        <DrawerClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DrawerClose>
      }
    />
  );
}

describe("Drawer · teclado e nomes", () => {
  it("abre pelo gatilho, expõe dialog com nome e descrição e leva o foco para dentro", async () => {
    render(<Exemplo />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir" }));
    const dlg = await screen.findByRole("dialog");
    expect(dlg).toHaveAccessibleName("Editar perfil");
    expect(dlg).toHaveAccessibleDescription("Altere os dados e salve.");
    await waitFor(() => expect(dlg.contains(document.activeElement)).toBe(true));
  });

  it("prende o foco no painel: Tab no último volta ao primeiro", async () => {
    render(<Exemplo />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir" }));
    await screen.findByRole("dialog");
    const nome = screen.getByRole("textbox", { name: "Nome" });
    const cancelar = screen.getByRole("button", { name: "Cancelar" });
    cancelar.focus();
    fireEvent.keyDown(cancelar, { key: "Tab" });
    expect(nome).toHaveFocus();
    fireEvent.keyDown(nome, { key: "Tab", shiftKey: true });
    expect(cancelar).toHaveFocus();
  });

  it("Esc fecha e o foco volta ao gatilho", async () => {
    render(<Exemplo />);
    const trigger = screen.getByRole("button", { name: "Abrir" });
    trigger.focus();
    fireEvent.click(trigger);
    const dlg = await screen.findByRole("dialog");
    fireEvent.keyDown(dlg, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("a alça fica fora da árvore de acessibilidade e o lado chega ao conteúdo", async () => {
    render(
      <Drawer defaultOpen side="right" trigger={<Button>Abrir</Button>} title="Filtros" body={null} />,
    );
    const dlg = await screen.findByRole("dialog");
    expect(dlg).toHaveAttribute("data-vaul-drawer-direction", "right");
    expect(dlg.querySelector('[data-slot="drawer-handle"]')).toHaveAttribute("aria-hidden", "true");
  });

  it("com dismissible={false}, Esc não fecha; o botão fecha", async () => {
    render(<Exemplo dismissible={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir" }));
    const dlg = await screen.findByRole("dialog");
    fireEvent.keyDown(dlg, { key: "Escape" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
