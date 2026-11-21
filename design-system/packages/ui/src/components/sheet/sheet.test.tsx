import { Button } from "../button";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sheet } from "./sheet";

const content = () =>
  document.querySelector<HTMLElement>('[data-slot="sheet-content"]');

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
    render(
      <Sheet
        defaultOpen
        side="left"
        title="Side test"
        body={<div>Content</div>}
      />,
    );
    expect(content()).toHaveAttribute("data-side", "left");
  });

  it("size: laterais com sm no padrão, limitadas por sm:max-w-*", () => {
    const { unmount } = render(
      <Sheet defaultOpen title="T" body={<div>B</div>} />,
    );
    expect(content()?.className).toContain("w-3/4");
    expect(content()?.className).toContain("sm:max-w-sm");
    unmount();
    render(
      <Sheet
        defaultOpen
        side="left"
        size="2xl"
        title="T"
        body={<div>B</div>}
      />,
    );
    expect(content()?.className).toContain("sm:max-w-2xl");
  });

  it("size: topo e base são largura inteira no padrão e centralizam com size", () => {
    const { unmount } = render(
      <Sheet defaultOpen side="top" title="T" body={<div>B</div>} />,
    );
    expect(content()?.className).toContain("max-w-none");
    unmount();
    render(
      <Sheet
        defaultOpen
        side="bottom"
        size="md"
        title="T"
        body={<div>B</div>}
      />,
    );
    expect(content()?.className).toEqual(expect.stringContaining("sm:mx-auto"));
    expect(content()?.className).toContain("sm:max-w-md");
  });

  it("cabeçalho: eyebrow, titleAdornment e headerActions", () => {
    render(
      <Sheet
        defaultOpen
        eyebrow={<span>Order #1234</span>}
        title="Edit order"
        titleAdornment={<span>Active</span>}
        headerActions={<Button aria-label="Edit">E</Button>}
        description="Make changes"
        body={<div>Body</div>}
      />,
    );

    expect(screen.getByText("Order #1234")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    // O adorno fica fora do nome do painel.
    expect(screen.getByRole("dialog")).toHaveAccessibleName("Edit order");
  });

  it("rodapé: footerLeading antes das ações", () => {
    render(
      <Sheet
        defaultOpen
        title="T"
        body={<div>B</div>}
        footerLeading={<span>Leading</span>}
        footer={<Button>Save</Button>}
      />,
    );

    const footer = document.querySelector<HTMLElement>(
      '[data-slot="sheet-footer"]',
    );
    expect(footer?.firstElementChild).toHaveTextContent("Leading");
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("só o corpo rola: cabeçalho e rodapé não rolam", () => {
    render(
      <Sheet
        defaultOpen
        title="T"
        body={<div>B</div>}
        footer={<Button>Save</Button>}
      />,
    );
    const body = document.querySelector<HTMLElement>(
      '[data-slot="sheet-body"]',
    );
    expect(body?.className).toContain("overflow-y-auto");
    expect(body?.className).toContain("min-h-0");
    expect(content()?.className).toContain("overflow-hidden");
  });

  it("o botão fechar é o Button ghost icon-sm e delega ao onOpenChange (permite guard)", () => {
    const calls: boolean[] = [];
    render(
      <Sheet
        open
        onOpenChange={(next) => calls.push(next)}
        title="Guarded"
        body={<div>Body</div>}
      />,
    );

    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("data-variant", "ghost");
    expect(close.className).toContain("size-control-height-sm");
    fireEvent.click(close);

    expect(calls).toEqual([false]);
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("permite esconder o botão de fechar com showCloseButton=false", () => {
    render(
      <Sheet
        defaultOpen
        showCloseButton={false}
        title="No close button"
        body={<div>Body</div>}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();
  });
});
