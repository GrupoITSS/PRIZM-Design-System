import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Popover } from "./popover";

describe("Popover (PRIZM / shadcn)", () => {
  it("abre o conteúdo ao clicar no trigger (API props-based)", () => {
    render(
      <Popover
        trigger={<button type="button">Open popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Open popover"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("aplica classes de size e className customizado no conteúdo", () => {
    render(
      <Popover
        trigger={<button type="button">Open</button>}
        content={<div>Sized content</div>}
        size="lg"
        className="custom-popover"
      />,
    );

    fireEvent.click(screen.getByText("Open"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("custom-popover");
    expect(dialog).toHaveClass("w-96");
  });

  it("propaga corretamente as props de alinhamento e lado para o conteúdo", () => {
    render(
      <Popover
        trigger={<button type="button">Trigger</button>}
        content={<div>Aligned content</div>}
        align="start"
        side="right"
      />,
    );

    fireEvent.click(screen.getByText("Trigger"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-align", "start");
    expect(dialog).toHaveAttribute("data-side", "right");
  });

  describe("nome do painel (WCAG 4.1.2)", () => {
    afterEach(() => vi.restoreAllMocks());

    it("avisa no console quando abre sem aria-label nem aria-labelledby", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<Popover trigger={<button type="button">Abrir</button>} content="Conteúdo" />);
      fireEvent.click(screen.getByText("Abrir"));
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("Popover: painel sem nome"));
    });

    it("não avisa com aria-label e dá o nome ao diálogo", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <Popover
          trigger={<button type="button">Abrir</button>}
          content="Conteúdo"
          contentProps={{ "aria-label": "Filtros" }}
        />,
      );
      fireEvent.click(screen.getByText("Abrir"));
      expect(screen.getByRole("dialog", { name: "Filtros" })).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("Popover: painel sem nome"));
    });

    it("chama o onOpenAutoFocus de quem usa", () => {
      const onOpenAutoFocus = vi.fn();
      render(
        <Popover
          trigger={<button type="button">Abrir</button>}
          content="Conteúdo"
          contentProps={{ "aria-label": "Filtros", onOpenAutoFocus }}
        />,
      );
      fireEvent.click(screen.getByText("Abrir"));
      expect(onOpenAutoFocus).toHaveBeenCalled();
    });
  });
});
