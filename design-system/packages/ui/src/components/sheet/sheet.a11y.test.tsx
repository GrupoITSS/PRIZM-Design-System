import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Sheet } from "./sheet";

const Example = () => (
  <Sheet
    trigger={<Button>Open</Button>}
    title="Edit profile"
    description="Make changes."
    body={<input aria-label="Name" />}
    footer={<Button>Save</Button>}
  />
);

describe("Sheet · teclado e nomes (etapa 4, 21/11/2026)", () => {
  it("abre como role=dialog, nomeado pelo título e descrito pela descrição", async () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit profile" });
    expect(dialog).toHaveAccessibleDescription("Make changes.");
  });

  it("o foco entra no Sheet ao abrir e volta ao gatilho ao fechar com Esc", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open" });
    act(() => trigger.focus());
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    fireEvent.keyDown(document.activeElement ?? dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("botão fechar: Button ghost com o anel do Prizm (pendências 1 e 3)", async () => {
    render(<Sheet defaultOpen title="T" body={<p>Corpo</p>} />);
    await screen.findByRole("dialog");
    const close = screen.getByRole("button", { name: "Fechar" });
    expect(close.className).toContain("size-control-height-sm");
    expect(close.className).toContain("focus-visible:ring-[3px]");
    expect(close.className).toContain("focus-visible:ring-ring");
  });

  it("closeLabel troca o nome do botão fechar", async () => {
    render(<Sheet defaultOpen title="Editar" closeLabel="Fechar" body={<p>Corpo</p>} />);
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
  });

  it("sem título, o painel se chama Painel (pendência 4)", async () => {
    render(<Sheet defaultOpen description="x" body={<p>Corpo</p>} />);
    expect(await screen.findByRole("dialog")).toHaveAccessibleName("Painel");
  });

  it("headerActions só com ícone ficam nomeados quando têm aria-label (pendência 5)", async () => {
    render(
      <Sheet
        defaultOpen
        title="T"
        headerActions={<Button size="icon-sm" variant="ghost" aria-label="Edit" />}
        body={<p>Corpo</p>}
      />,
    );
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });
});
