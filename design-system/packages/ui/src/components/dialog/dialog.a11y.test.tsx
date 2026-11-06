import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Dialog } from "./dialog";

const Example = () => (
  <Dialog
    trigger={<Button>Edit profile</Button>}
    title="Edit profile"
    description="Make changes to your profile here."
    body={<input aria-label="Name" />}
    footer={<Button>Save changes</Button>}
  />
);

describe("Dialog · teclado e nomes (etapa 4, 06/11/2026)", () => {
  it("abre como role=dialog, nomeado pelo título e descrito pela descrição", async () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Edit profile" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit profile" });
    expect(dialog).toHaveAccessibleDescription("Make changes to your profile here.");
  });

  it("o foco entra no Dialog ao abrir e volta ao gatilho ao fechar com Esc", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Edit profile" });
    act(() => trigger.focus());
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    fireEvent.keyDown(document.activeElement ?? dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("botão fechar: nome padrão Fechar (pendência 2, corrigida)", async () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Edit profile" }));
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
  });

  it("closeLabel troca o nome do botão fechar", async () => {
    render(<Dialog defaultOpen title="Editar perfil" closeLabel="Fechar" body={<p>Corpo</p>} />);
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
  });

  it("confirmInput: o campo é nomeado pelo rótulo", async () => {
    render(
      <Dialog
        defaultOpen
        title="Delete assistant"
        confirmInput={{ expectedValue: "Leo", label: "Type Leo to confirm" }}
      />,
    );
    await screen.findByRole("dialog");
    expect(screen.getByRole("textbox", { name: "Type Leo to confirm" })).toBeInTheDocument();
  });
});
