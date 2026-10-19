import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination (PRIZM / shadcn)", () => {
  it("renderiza navegação com página atual e total", () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  it("marca a página atual com aria-current", () => {
    render(<Pagination page={2} totalPages={5} />);
    const current = screen.getByRole("button", { current: "page" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveTextContent("2");
  });

  it("chama onPageChange quando um número de página é clicado", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("chama onPageChange ao clicar em Previous", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("chama onPageChange ao clicar em Next", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("desabilita Previous na primeira página", () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  it("desabilita Next na última página", () => {
    render(<Pagination page={5} totalPages={5} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  it("modo iconsOnly não mostra números de página", () => {
    render(<Pagination page={2} totalPages={10} iconsOnly />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "2" })).not.toBeInTheDocument();
  });

  it("com getHref renderiza links", () => {
    render(<Pagination page={2} totalPages={5} getHref={(p) => `#page-${p}`} />);
    const link = screen.getByRole("link", { name: "3" });
    expect(link).toHaveAttribute("href", "#page-3");
  });

  it("showFirstLast exibe First e Last", () => {
    render(<Pagination page={3} totalPages={10} showFirstLast />);
    expect(screen.getByRole("button", { name: /first/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /last/i })).toBeInTheDocument();
  });

  it("aplica className ao nav", () => {
    const { container } = render(
      <Pagination page={1} totalPages={3} className="custom-pagination" />,
    );
    const nav = container.querySelector("nav.custom-pagination");
    expect(nav).toBeInTheDocument();
  });
});
