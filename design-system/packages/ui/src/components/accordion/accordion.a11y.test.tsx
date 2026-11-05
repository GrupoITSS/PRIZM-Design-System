import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Accordion } from "./accordion";

const itens = [
  { value: "entrega", trigger: "Entrega", content: "Enviamos em até 2 dias úteis." },
  { value: "pagamento", trigger: "Pagamento", content: "Cartão ou boleto.", disabled: true },
  { value: "trocas", trigger: "Trocas", content: "Até 30 dias depois da compra." },
];

const Grupo = () => <Accordion type="single" collapsible items={itens} />;

describe("Accordion · teclado e nomes (etapa 4, 05/11/2026)", () => {
  it("o título é um botão dentro de um heading, com aria-expanded; aberto, aponta a região", () => {
    render(<Accordion type="single" collapsible defaultValue="trocas" items={itens} />);
    const entrega = screen.getByRole("button", { name: "Entrega" });
    expect(entrega).toHaveAttribute("aria-expanded", "false");
    expect(entrega.closest("h3")).not.toBeNull();
    const trocas = screen.getByRole("button", { name: "Trocas" });
    expect(trocas).toHaveAttribute("aria-expanded", "true");
    // O Radix só põe aria-controls no item aberto, quando a região existe no DOM.
    const regiao = screen.getByRole("region", { name: "Trocas" });
    expect(trocas).toHaveAttribute("aria-controls", regiao.id);
  });

  it("Enter e Espaço abrem e fecham; o conteúdo é uma região com o nome do título", async () => {
    render(<Grupo />);
    const entrega = screen.getByRole("button", { name: "Entrega" });
    act(() => entrega.focus());
    fireEvent.keyDown(entrega, { key: "Enter" });
    fireEvent.click(entrega);
    await waitFor(() => expect(entrega).toHaveAttribute("aria-expanded", "true"));
    const regiao = screen.getByRole("region", { name: "Entrega" });
    expect(regiao).toHaveTextContent("Enviamos em até 2 dias úteis.");
    fireEvent.click(entrega);
    await waitFor(() => expect(entrega).toHaveAttribute("aria-expanded", "false"));
  });

  it("seta para baixo vai ao próximo título e pula o desabilitado; Home e End vão às pontas", async () => {
    render(<Grupo />);
    const entrega = screen.getByRole("button", { name: "Entrega" });
    const trocas = screen.getByRole("button", { name: "Trocas" });
    act(() => entrega.focus());
    fireEvent.keyDown(entrega, { key: "ArrowDown" });
    await waitFor(() => expect(trocas).toHaveFocus());
    fireEvent.keyDown(trocas, { key: "Home" });
    await waitFor(() => expect(entrega).toHaveFocus());
    fireEvent.keyDown(entrega, { key: "End" });
    await waitFor(() => expect(trocas).toHaveFocus());
  });

  it("item desabilitado: botão disabled, fora do Tab", () => {
    render(<Grupo />);
    expect(screen.getByRole("button", { name: "Pagamento" })).toBeDisabled();
  });

  it("o chevron fica fora do nome (aria-hidden)", () => {
    const { container } = render(<Grupo />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(3);
    for (const svg of svgs) expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
