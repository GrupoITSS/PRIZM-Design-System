import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { buttonVariants } from "../button";
import { Pagination } from "./pagination";

const classesOf = (el: HTMLElement) => el.className.split(/\s+/);

describe("Pagination (PRIZM / shadcn)", () => {
  it("renderiza a navegação com nome em pt-BR, a página atual e o total", () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByRole("navigation", { name: "Paginação" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  it("marca a página atual com aria-current", () => {
    render(<Pagination page={2} totalPages={5} />);
    const current = screen.getByRole("button", { current: "page" });
    expect(current).toHaveTextContent("2");
  });

  it("chama onPageChange quando um número de página é clicado", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("chama onPageChange ao clicar em Anterior e em Próxima", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Ir para a página anterior" }));
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    fireEvent.click(screen.getByRole("button", { name: "Ir para a próxima página" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });

  it("textos padrão em pt-BR", () => {
    render(<Pagination page={3} totalPages={10} showFirstLast />);
    for (const t of ["Anterior", "Próxima", "Primeira", "Última"]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });

  it("com getHref renderiza links", () => {
    render(<Pagination page={2} totalPages={5} getHref={(p) => `#page-${p}`} />);
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute("href", "#page-3");
  });

  it("aplica className ao nav", () => {
    const { container } = render(
      <Pagination page={1} totalPages={3} className="custom-pagination" />,
    );
    expect(container.querySelector("nav.custom-pagination")).toBeInTheDocument();
  });
});

describe("Pagination: decisões de 03/11/2026", () => {
  it("1: itens com o Button do Prizm, ghost nas páginas e outline na atual", () => {
    render(<Pagination page={2} totalPages={5} />);
    const atual = screen.getByRole("button", { name: "2" });
    const outra = screen.getByRole("button", { name: "3" });
    for (const c of buttonVariants({ variant: "outline", size: "default" }).split(" ")) {
      expect(classesOf(atual)).toContain(c);
    }
    for (const c of buttonVariants({ variant: "ghost", size: "default" }).split(" ")) {
      expect(classesOf(outra)).toContain(c);
    }
    expect(classesOf(outra)).toContain("min-w-control-height-md");
  });

  it("2: a página atual não é desabilitada e clicar nela não muda de página", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    const atual = screen.getByRole("button", { name: "2" });
    expect(atual).not.toBeDisabled();
    expect(atual).not.toHaveAttribute("aria-disabled");
    atual.focus();
    expect(atual).toHaveFocus();
    fireEvent.click(atual);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("4: icon e icon-sm deixam os números quadrados; icon-sm não cai no tamanho md", () => {
    const { rerender } = render(<Pagination page={2} totalPages={5} size="icon" />);
    expect(classesOf(screen.getByRole("button", { name: "3" }))).toContain(
      "size-control-height-md",
    );
    rerender(<Pagination page={2} totalPages={5} size="icon-sm" />);
    const p = classesOf(screen.getByRole("button", { name: "3" }));
    expect(p).toContain("size-control-height-sm");
    expect(p).not.toContain("size-control-height-md");
  });

  it("5: First e Last opcionais, com ícone e aria-label", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination page={3} totalPages={10} showFirstLast onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Ir para a primeira página" }));
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    fireEvent.click(screen.getByRole("button", { name: "Ir para a última página" }));
    expect(onPageChange).toHaveBeenLastCalledWith(10);
    expect(container.querySelectorAll("button svg")).toHaveLength(4);
  });

  it("P1: em size icon, as setas ficam só com o ícone", () => {
    render(<Pagination page={2} totalPages={5} size="icon" showFirstLast />);
    const prev = screen.getByRole("button", { name: "Ir para a página anterior" });
    expect(prev).not.toHaveTextContent("Anterior");
    expect(prev.querySelector("svg")).toBeInTheDocument();
    expect(classesOf(prev)).toContain("size-control-height-md");
  });

  it("P2: showIcons={false} deixa as setas e First/Last só com texto", () => {
    const { container } = render(
      <Pagination page={2} totalPages={5} showFirstLast showIcons={false} />,
    );
    expect(container.querySelectorAll("button svg")).toHaveLength(0);
    expect(screen.getByText("Anterior")).toBeInTheDocument();
  });

  it("iconsOnly: só as setas, com ícone, sem números", () => {
    render(<Pagination page={2} totalPages={10} iconsOnly />);
    const next = screen.getByRole("button", { name: "Ir para a próxima página" });
    expect(next).not.toHaveTextContent("Próxima");
    expect(screen.queryByRole("button", { name: "2" })).not.toBeInTheDocument();
  });
});

describe("Pagination: acessibilidade (pendências de 03/11/2026)", () => {
  it("pendência 2: 'Mais páginas' chega ao leitor de tela; só o ícone é aria-hidden", () => {
    const { container } = render(<Pagination page={5} totalPages={20} />);
    const textos = screen.getAllByText("Mais páginas");
    expect(textos.length).toBe(2);
    for (const t of textos) expect(t.closest("[aria-hidden]")).toBeNull();
    for (const svg of container.querySelectorAll("li > span svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("pendência 3: nas pontas, as setas ficam aria-disabled e o foco não se perde", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(<Pagination page={4} totalPages={5} onPageChange={onPageChange} />);
    const next = screen.getByRole("button", { name: "Ir para a próxima página" });
    next.focus();
    rerender(<Pagination page={5} totalPages={5} onPageChange={onPageChange} />);
    const nextNaPonta = screen.getByRole("button", { name: "Ir para a próxima página" });
    expect(nextNaPonta).toHaveAttribute("aria-disabled", "true");
    expect(nextNaPonta).not.toBeDisabled();
    expect(nextNaPonta).toHaveFocus();
    fireEvent.click(nextNaPonta);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("Anterior e Primeira indisponíveis na primeira página", () => {
    render(<Pagination page={1} totalPages={5} showFirstLast />);
    expect(screen.getByRole("button", { name: "Ir para a página anterior" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("button", { name: "Ir para a primeira página" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});

describe("Pagination: combinações inválidas (decisão de 03/11/2026)", () => {
  it("avisa no console com iconsOnly e showPrevNext={false}", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Pagination page={1} totalPages={5} iconsOnly showPrevNext={false} onPageChange={() => {}} />,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("não mostra nada"));
    warn.mockRestore();
  });

  it("avisa no console sem onPageChange e sem getHref", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Pagination page={1} totalPages={5} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("não fazem nada"));
    warn.mockRestore();
  });

  it("não avisa no uso normal", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    render(<Pagination page={1} totalPages={5} getHref={(p) => `?page=${p}`} />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
