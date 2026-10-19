import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dropzone } from "./dropzone";

function createFile(name: string, type: string) {
  return new File(["dummy"], name, { type });
}

describe("Dropzone (PRIZM / shadcn)", () => {
  it("renderiza os textos padrão", () => {
    render(<Dropzone />);

    expect(screen.getByText(/clique aqui/i)).toBeInTheDocument();
    expect(screen.getByText(/ou arraste os arquivos nesta área/i)).toBeInTheDocument();
  });

  it("chama onFileSelect e onFilesChange quando um arquivo aceito é selecionado via input", () => {
    const handleSelect = vi.fn();
    const handleChange = vi.fn();

    render(<Dropzone accept=".pdf" onFileSelect={handleSelect} onFilesChange={handleChange} />);

    const input = screen.getByLabelText(/clique aqui/i) as HTMLInputElement | null;

    expect(input).not.toBeNull();

    const file = createFile("documento.pdf", "application/pdf");

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([file]);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(file);
  });

  it("filtra arquivos inválidos com base em accept e chama onInvalidFiles", () => {
    const handleInvalid = vi.fn();
    const handleChange = vi.fn();

    render(
      <Dropzone accept={[".pdf"]} onInvalidFiles={handleInvalid} onFilesChange={handleChange} />,
    );

    const label = screen.getByText(/clique aqui/i).closest("label")!;
    const validFile = createFile("ok.pdf", "application/pdf");
    const invalidFile = createFile("nope.png", "image/png");

    fireEvent.drop(label, {
      dataTransfer: {
        files: [validFile, invalidFile],
      },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([validFile]);
    expect(handleInvalid).toHaveBeenCalledTimes(1);
    expect(handleInvalid).toHaveBeenCalledWith([invalidFile]);
  });

  it("omit secondary line quando secondaryLabel é string vazia", () => {
    render(<Dropzone secondaryLabel="" />);

    expect(screen.getByText(/clique aqui/i)).toBeInTheDocument();
    expect(screen.queryByText(/ou arraste os arquivos nesta área/i)).not.toBeInTheDocument();
  });

  it("não permite interação quando disabled = true", () => {
    const handleSelect = vi.fn();

    render(<Dropzone disabled onFileSelect={handleSelect} />);

    const label = screen.getByText(/clique aqui/i).closest("label")!;
    const file = createFile("file.pdf", "application/pdf");

    fireEvent.drop(label, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("não permite drop quando loading = true", () => {
    const handleSelect = vi.fn();

    render(<Dropzone loading onFileSelect={handleSelect} />);

    const label = screen.getByText(/clique aqui/i).closest("label")!;
    const file = createFile("file.pdf", "application/pdf");

    fireEvent.drop(label, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(handleSelect).not.toHaveBeenCalled();
  });
});
