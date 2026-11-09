import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

describe("Dialog (PRIZM / shadcn)", () => {
  it("renderiza conteúdo quando aberto via defaultOpen", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(
      screen.getByText(/this action cannot be undone\. this will permanently delete your account/i),
    ).toBeInTheDocument();
  });

  it("aplica classes base ao content", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent data-testid="content">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("bg-background");
  });

  it("permite esconder o botão de fechar com showCloseButton=false", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>No close button</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    // Verifica se o botão padrão de fechar não está presente
    expect(screen.queryByRole("button", { name: /fechar/i })).not.toBeInTheDocument();
  });

  it("renderiza input de confirmação e valida o valor esperado", () => {
    const onConfirmValidityChange = vi.fn();

    function ConfirmDeleteDialog() {
      const [isConfirmValid, setIsConfirmValid] = useState(false);

      return (
        <>
          <Dialog
            defaultOpen
            confirmInput={{
              expectedValue: "Leo",
              label: (
                <>
                  Digite <strong>Leo</strong> para confirmar a deleção:
                </>
              ),
            }}
            onConfirmValidityChange={(isValid) => {
              setIsConfirmValid(isValid);
              onConfirmValidityChange(isValid);
            }}
            title="Pretende deletar esse assistente?"
            description="Esta ação é irreversível."
            footer={
              <Button variant="destructive" disabled={!isConfirmValid}>
                Deletar
              </Button>
            }
          />
        </>
      );
    }

    render(<ConfirmDeleteDialog />);

    const deleteButton = screen.getByRole("button", { name: /deletar/i });
    const confirmInput = screen.getByRole("textbox");

    expect(deleteButton).toBeDisabled();
    expect(screen.getByText(/digite/i)).toBeInTheDocument();

    fireEvent.change(confirmInput, { target: { value: "  lé o " } });

    expect(deleteButton).not.toBeDisabled();
    expect(onConfirmValidityChange).toHaveBeenLastCalledWith(true);
  });
});

describe("Dialog · decisões de 06/11/2026", () => {
  it("conteúdo: fundo background, raio lg, folga de 16px, 512px e altura máxima", async () => {
    render(<Dialog defaultOpen title="Edit profile" body={<p>Body</p>} />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass(
      "bg-background",
      "text-foreground",
      "rounded-lg",
      "w-[calc(100%-2rem)]",
      "max-w-lg",
      "max-h-[calc(100dvh-2rem)]",
      "overflow-y-auto",
    );
    expect(dialog.className).not.toMatch(/bg-sidebar|rounded-2xl/);
  });

  it("rodapé com gap-2 no celular e a ação principal em cima", async () => {
    render(
      <Dialog defaultOpen title="Edit profile" footer={<button type="button">Save</button>} />,
    );
    await screen.findByRole("dialog");
    const footer = document.querySelector("[data-slot=dialog-footer]");
    expect(footer).toHaveClass("flex-col-reverse", "gap-2", "sm:flex-row", "sm:justify-end");
  });

  it("botão fechar é o Button ghost icon-sm do Prizm, a 8px do canto", async () => {
    render(<Dialog defaultOpen title="Edit profile" />);
    await screen.findByRole("dialog");
    const close = screen.getByRole("button", { name: "Fechar" });
    expect(close).toHaveAttribute("data-slot", "dialog-close-button");
    expect(close).toHaveClass("size-control-height-sm", "absolute", "right-2", "top-2");
  });
});

describe("Dialog · size (09/11/2026)", () => {
  const larguras = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-none",
  } as const;

  it("padrão lg, com data-size", async () => {
    render(<Dialog defaultOpen title="Edit profile" />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-size", "lg");
    expect(dialog).toHaveClass("max-w-lg", "w-[calc(100%-2rem)]");
  });

  it.each(Object.entries(larguras))("size=%s limita com %s", async (size, classe) => {
    render(<Dialog defaultOpen title="Edit profile" size={size as keyof typeof larguras} />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-size", size);
    expect(dialog).toHaveClass(classe, "w-[calc(100%-2rem)]");
    const outras = Object.values(larguras).filter((c) => c !== classe);
    for (const c of outras) expect(dialog).not.toHaveClass(c);
  });

  it("composição: size no DialogContent", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent size="4xl">
          <DialogTitle>Produto</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(await screen.findByRole("dialog")).toHaveClass("max-w-4xl");
  });

  it("contentClassName ainda troca a largura", async () => {
    render(<Dialog defaultOpen title="Texto" contentClassName="w-[96vw] max-w-6xl" />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass("w-[96vw]", "max-w-6xl");
    expect(dialog).not.toHaveClass("max-w-lg", "w-[calc(100%-2rem)]");
  });
});
