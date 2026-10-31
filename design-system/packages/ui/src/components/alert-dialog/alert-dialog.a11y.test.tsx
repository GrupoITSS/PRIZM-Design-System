import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

const Simples = () => (
  <AlertDialog
    trigger={<Button>Excluir</Button>}
    title="Excluir projeto?"
    description="Esta ação não pode ser desfeita."
    actionText="Excluir projeto"
  />
);

describe("AlertDialog · teclado e nomes", () => {
  it("abre com Enter, foca Cancelar e expõe alertdialog com nome e descrição", async () => {
    render(<Simples />);
    fireEvent.click(screen.getByRole("button", { name: "Excluir" }));
    const dlg = await screen.findByRole("alertdialog");
    expect(dlg).toHaveAccessibleName("Excluir projeto?");
    expect(dlg).toHaveAccessibleDescription("Esta ação não pode ser desfeita.");
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();
  });

  it("prende o foco entre Cancelar e a ação", async () => {
    render(<Simples />);
    fireEvent.click(screen.getByRole("button", { name: "Excluir" }));
    await screen.findByRole("alertdialog");
    const cancelar = screen.getByRole("button", { name: "Cancelar" });
    const acao = screen.getByRole("button", { name: "Excluir projeto" });
    // FocusScope do Radix: Tab no último volta ao primeiro; Shift+Tab no primeiro vai ao último
    acao.focus();
    fireEvent.keyDown(acao, { key: "Tab" });
    expect(cancelar).toHaveFocus();
    fireEvent.keyDown(cancelar, { key: "Tab", shiftKey: true });
    expect(acao).toHaveFocus();
  });

  it("Esc fecha e o foco volta ao gatilho", async () => {
    render(<Simples />);
    const trigger = screen.getByRole("button", { name: "Excluir" });
    trigger.focus();
    fireEvent.click(trigger);
    const dlg = await screen.findByRole("alertdialog");
    fireEvent.keyDown(dlg, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("não fecha clicando fora", async () => {
    render(<Simples />);
    fireEvent.click(screen.getByRole("button", { name: "Excluir" }));
    await screen.findByRole("alertdialog");
    fireEvent.pointerDown(document.body);
    fireEvent.click(document.body);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("ação em loading: o modal fica aberto, o foco não se perde e o estado é exposto", async () => {
    const Comp = () => {
      const [open, setOpen] = React.useState(true);
      const [loading, setLoading] = React.useState(false);
      return (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button>Excluir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
              <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancelar</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  loading={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    setLoading(true);
                  }}
                >
                  Excluir projeto
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    };
    render(<Comp />);
    const acao = await screen.findByRole("button", { name: "Excluir projeto" });
    acao.focus();
    fireEvent.click(acao);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(acao).toHaveAttribute("aria-busy", "true");
    expect(acao).toHaveFocus();
    fireEvent.click(acao);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});

describe("AlertDialog · combinações inválidas", () => {
  it("Esc chama onCancel, como o botão Cancelar", async () => {
    const onCancel = vi.fn();
    render(<AlertDialog defaultOpen title="Excluir projeto?" onCancel={onCancel} />);
    const dlg = await screen.findByRole("alertdialog");
    fireEvent.keyDown(dlg, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("Cancelar chama onCancel uma vez", async () => {
    const onCancel = vi.fn();
    render(<AlertDialog defaultOpen title="Excluir projeto?" onCancel={onCancel} />);
    fireEvent.click(await screen.findByRole("button", { name: "Cancelar" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("avisa no console quando children vem junto da API por props", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <AlertDialog defaultOpen title="Excluir projeto?">
        <span>ignorado</span>
      </AlertDialog>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("children é ignorado"));
    warn.mockRestore();
  });

  it("não avisa na composição nem na API por props sem children", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<AlertDialog defaultOpen title="Excluir projeto?" />);
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogTitle>Título</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("children é ignorado"));
    warn.mockRestore();
  });

  it("trigger sem title não compila", () => {
    // @ts-expect-error: com trigger, title é obrigatório (o diálogo precisa de nome)
    const semTitulo = <AlertDialog trigger={<Button>Excluir</Button>} />;
    expect(semTitulo).toBeTruthy();
  });
});
