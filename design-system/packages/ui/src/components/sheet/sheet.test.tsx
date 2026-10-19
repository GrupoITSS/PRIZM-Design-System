import { Button } from "../button";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sheet } from "./sheet";

describe("Sheet (PRIZM / Sheet)", () => {
  it("renderiza conteúdo via API baseada em props quando aberto por defaultOpen", () => {
    render(
      <Sheet
        defaultOpen
        title="Sheet title"
        description="Sheet description"
        body={<div>Sheet body content</div>}
        footer={
          <>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </>
        }
      />,
    );

    expect(screen.getByText("Sheet title")).toBeInTheDocument();
    expect(screen.getByText("Sheet description")).toBeInTheDocument();
    expect(screen.getByText("Sheet body content")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("abre o sheet ao clicar no trigger", () => {
    render(
      <Sheet
        trigger={<Button>Open sheet</Button>}
        title="Triggered sheet"
        body={<div>Triggered content</div>}
      />,
    );

    expect(screen.queryByText("Triggered content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Open sheet"));

    expect(screen.getByText("Triggered content")).toBeInTheDocument();
  });

  it("aplica o lado correto no content via data-side", () => {
    render(<Sheet defaultOpen side="left" title="Side test" body={<div>Content</div>} />);

    const content = document.querySelector<HTMLElement>('[data-slot="sheet-content"]');

    expect(content).not.toBeNull();
    expect(content).toHaveAttribute("data-side", "left");
  });

  it("layout panel renderiza header com ícone, eyebrow, ações e footer", () => {
    render(
      <Sheet
        defaultOpen
        layout="panel"
        icon={<span>icon</span>}
        eyebrow={<span>eyebrow</span>}
        headerActions={<Button>Editar</Button>}
        title="Panel title"
        description="Panel description"
        closeLabel="Fechar"
        body={<div>Panel body</div>}
        footer={<Button>Salvar</Button>}
      />,
    );

    const content = document.querySelector<HTMLElement>('[data-slot="sheet-content"]');
    expect(content).toHaveAttribute("data-layout", "panel");
    expect(content?.className).toContain("w-[550px]");
    const body = document.querySelector<HTMLElement>('[data-slot="sheet-body"]');
    expect(body?.className).toContain("custom-scroll");
    expect(body?.className).toContain("overflow-y-auto");
    expect(screen.getByText("icon")).toBeInTheDocument();
    expect(screen.getByText("eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Panel title")).toBeInTheDocument();
    expect(screen.getByText("Panel description")).toBeInTheDocument();
    expect(screen.getByText("Panel body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
  });

  it("layout panel delega o fechamento ao onOpenChange (permite guard)", () => {
    const calls: boolean[] = [];
    render(
      <Sheet
        open
        onOpenChange={(next) => calls.push(next)}
        layout="panel"
        title="Guarded"
        closeLabel="Fechar"
        body={<div>Body</div>}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(calls).toEqual([false]);
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("permite esconder o botão de fechar com showCloseButton=false", () => {
    render(
      <Sheet defaultOpen showCloseButton={false} title="No close button" body={<div>Body</div>} />,
    );

    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  });
});
