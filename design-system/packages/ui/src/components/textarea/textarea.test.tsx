import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";
import { textareaVariants } from "./textarea.styles";

describe("Textarea (PRIZM / shadcn)", () => {
  it("renderiza um textarea básico", () => {
    render(<Textarea placeholder="Mensagem" />);
    expect(screen.getByPlaceholderText("Mensagem")).toBeInTheDocument();
  });

  it("aplica classes de tamanho via data-size", () => {
    const { rerender } = render(<Textarea placeholder="sm" size="sm" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "sm");

    rerender(<Textarea placeholder="md" size="md" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "md");

    rerender(<Textarea placeholder="lg" size="lg" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("data-size", "lg");
  });

  it("prop disabled desabilita o textarea", () => {
    render(<Textarea placeholder="Desabilitado" disabled />);
    const textarea = screen.getByPlaceholderText("Desabilitado");
    expect(textarea).toBeDisabled();
  });

  it("renderiza botão de expansão quando expandable é true", () => {
    render(<Textarea expandable placeholder="Com expansão" />);

    expect(screen.getByRole("button", { name: "Expandir campo" })).toBeInTheDocument();
  });
});

describe("Textarea: decisões de 26/10/2026", () => {
  it("T2: aria-invalid pinta a borda de destructive, também no foco", () => {
    const classes = textareaVariants({ size: "md" }).split(" ");
    expect(classes).toEqual(
      expect.arrayContaining([
        "aria-invalid:border-destructive",
        "aria-invalid:focus-visible:border-destructive",
        "focus-visible:ring-ring",
      ]),
    );
    render(<Textarea placeholder="Erro" aria-invalid />);
    expect(screen.getByPlaceholderText("Erro")).toHaveAttribute("aria-invalid", "true");
  });

  it("T4: botão de expandir com o anel de foco padrão, sem offset, e ícone fora da leitura", () => {
    render(<Textarea expandable placeholder="Com expansão" />);
    const button = screen.getByRole("button", { name: "Expandir campo" });
    expect(button.className).toContain("focus-visible:ring-2");
    expect(button.className).not.toContain("ring-offset");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("Dialog de edição tem nome; o textarea dele não repete o id e é nomeado pelo título", async () => {
    render(
      <>
        <label htmlFor="obs">Observações</label>
        <Textarea id="obs" expandable defaultValue="abc" />
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Expandir campo" }));

    const dialog = await screen.findByRole("dialog", { name: "Editar texto" });
    const inner = within(dialog).getByRole("textbox", { name: "Editar texto" });
    expect(inner).not.toHaveAttribute("id");
    expect(document.querySelectorAll("#obs")).toHaveLength(1);
  });

  it("expandTitle troca o título do Dialog", async () => {
    render(<Textarea expandable expandTitle="Editar observações" />);
    fireEvent.click(screen.getByRole("button", { name: "Expandir campo" }));
    expect(await screen.findByRole("dialog", { name: "Editar observações" })).toBeInTheDocument();
  });
});

describe("Textarea: escala e estados iguais aos do Input (21/10/2026)", () => {
  it.each(["sm", "md", "lg"] as const)("foco e disabled seguem a mesma regra no tamanho %s", (size) => {
    const classes = textareaVariants({ size }).split(" ");
    expect(classes).toEqual(
      expect.arrayContaining([
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:border-transparent",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
      ]),
    );
    expect(classes).not.toContain("focus-visible:ring-ring/30");
    expect(classes).not.toContain("disabled:bg-muted");
  });
});
