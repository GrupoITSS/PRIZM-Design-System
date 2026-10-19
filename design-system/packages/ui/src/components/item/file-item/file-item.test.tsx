import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FileItem, FileList } from "../item";
import type { FileItemData } from "./file-item.types";

describe("FileItem", () => {
  const pdfFile: FileItemData = {
    id: "f1",
    name: "report.pdf",
    size: 2_400_000,
    mimeType: "application/pdf",
    status: "PROCESSED",
  };

  it("renderiza o nome do arquivo", () => {
    render(<FileItem file={pdfFile} />);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("renderiza meta com tipo e tamanho", () => {
    render(<FileItem file={pdfFile} />);
    expect(screen.getByText("PDF · 2.3 MB")).toBeInTheDocument();
  });

  it("renderiza tipo sem tamanho quando size não é fornecido", () => {
    render(<FileItem file={{ id: "f2", name: "notes.txt" }} />);
    expect(screen.getByText("TXT")).toBeInTheDocument();
  });

  it("aplica data-file-id e data-file-status", () => {
    render(<FileItem file={pdfFile} />);
    const el = document.querySelector("[data-file-id='f1']");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("data-file-status", "PROCESSED");
  });

  it("renderiza botão de remoção quando removable=true", () => {
    render(<FileItem file={pdfFile} removable />);
    expect(screen.getByLabelText("Remove report.pdf")).toBeInTheDocument();
  });

  it("não renderiza botão de remoção quando removable=false (default)", () => {
    render(<FileItem file={pdfFile} />);
    expect(screen.queryByLabelText("Remove report.pdf")).not.toBeInTheDocument();
  });

  it("chama onRemove ao clicar no botão de remoção", () => {
    const onRemove = vi.fn();
    render(<FileItem file={pdfFile} removable onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText("Remove report.pdf"));
    expect(onRemove).toHaveBeenCalledWith("f1");
  });

  it("renderiza label de status baseado em status=PROCESSED", () => {
    render(<FileItem file={pdfFile} />);
    expect(screen.getByText("Processado")).toBeInTheDocument();
  });

  it("renderiza label de status baseado em status=WAITING", () => {
    const waitingFile: FileItemData = {
      ...pdfFile,
      id: "f2",
      status: "WAITING",
    };
    render(<FileItem file={waitingFile} />);
    expect(screen.getByText("Aguardando")).toBeInTheDocument();
  });

  it("usa variant file como padrão", () => {
    render(<FileItem file={pdfFile} />);
    const el = document.querySelector("[data-slot='item']");
    expect(el).toHaveAttribute("data-variant", "file");
  });

  it("não é interativo por padrão", () => {
    render(<FileItem file={pdfFile} />);
    const el = document.querySelector("[data-file-id='f1']");
    expect(el).not.toHaveAttribute("data-interactive");
  });

  it("aplica classes de hover quando interactive=true", () => {
    render(<FileItem file={pdfFile} interactive />);
    const el = document.querySelector("[data-file-id='f1']");
    expect(el).toHaveAttribute("data-interactive", "");
    expect(el?.className ?? "").toContain("hover:bg-accent/60");
  });
});

describe("FileList", () => {
  const files: FileItemData[] = [
    { id: "a", name: "doc.pdf", size: 100_000, mimeType: "application/pdf" },
    { id: "b", name: "img.png", size: 200_000, mimeType: "image/png" },
    { id: "c", name: "data.csv", size: 50_000, mimeType: "text/csv" },
  ];

  it("renderiza todos os arquivos", () => {
    render(<FileList files={files} />);
    expect(screen.getByText("doc.pdf")).toBeInTheDocument();
    expect(screen.getByText("img.png")).toBeInTheDocument();
    expect(screen.getByText("data.csv")).toBeInTheDocument();
  });

  it("renderiza container com data-slot file-list", () => {
    render(<FileList files={files} />);
    expect(document.querySelector("[data-slot='file-list']")).toBeInTheDocument();
  });

  it("renderiza container vazio quando não há arquivos", () => {
    render(<FileList files={[]} />);
    const list = document.querySelector("[data-slot='file-list']");
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  it("renderiza botões de remoção quando removable=true", () => {
    render(<FileList files={files} removable />);
    expect(screen.getByLabelText("Remove doc.pdf")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove img.png")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove data.csv")).toBeInTheDocument();
  });

  it("chama onRemove com o id correto", () => {
    const onRemove = vi.fn();
    render(<FileList files={files} removable onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText("Remove img.png"));
    expect(onRemove).toHaveBeenCalledWith("b");
  });
});
