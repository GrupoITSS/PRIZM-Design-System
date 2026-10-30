import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert (PRIZM / shadcn)", () => {
  it("renderiza título e descrição", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("título é div, fora da estrutura de títulos da página (1.3.1)", () => {
    render(<Alert title="Saved" description="Your changes were saved." />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Saved").tagName).toBe("DIV");
  });

  describe("papel pela variante (4.1.3)", () => {
    it.each(["destructive", "warning"] as const)("%s usa role alert", (variant) => {
      render(<Alert variant={variant} title="Title" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it.each([undefined, "default", "success", "info"] as const)("%s usa role status", (variant) => {
      render(<Alert variant={variant} title="Title" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("role pode ser sobrescrito", () => {
      render(<Alert variant="success" role="alert" title="Title" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("cores (padrão de aviso)", () => {
    it("default é neutro, com descrição secundária", () => {
      render(<Alert title="Title" description="Desc" />);
      const root = screen.getByRole("status");
      expect(root).toHaveClass("bg-card", "border-border", "text-foreground", "[&>svg]:text-foreground");
      expect(root).toHaveClass("[&_[data-slot=alert-description]]:text-muted-foreground");
    });

    it.each(["destructive", "warning", "success", "info"] as const)(
      "%s: fundo -weak, borda e ícone no tom, texto -strong",
      (tone) => {
        const { container } = render(<Alert variant={tone} title="Title" />);
        const root = container.firstElementChild;
        expect(root).toHaveClass(`bg-${tone}-weak`, `border-${tone}`, `text-${tone}-strong`, `[&>svg]:text-${tone}`);
        expect(root).not.toHaveClass("bg-card", `text-${tone}`);
      },
    );
  });

  it("espaçamento 12/16 (py-3 px-4)", () => {
    render(<Alert title="Title" />);
    expect(screen.getByRole("status")).toHaveClass("py-3", "px-4");
  });

  describe("props sem título e ação (decisões de 30/10/2026)", () => {
    it("description e icon sem title aparecem, sem título vazio", () => {
      render(
        <Alert
          variant="warning"
          icon={<svg data-testid="icon" />}
          description="Alguns campos podem estar desatualizados."
        />,
      );
      expect(screen.getByText("Alguns campos podem estar desatualizados.")).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(document.querySelector('[data-slot="alert-title"]')).not.toBeInTheDocument();
    });

    it("com title e description, children (ação) entram depois da descrição", () => {
      render(
        <Alert variant="destructive" title="Não foi possível salvar" description="Verifique a conexão.">
          <button type="button">Tentar de novo</button>
        </Alert>,
      );
      const root = screen.getByRole("alert");
      const button = screen.getByRole("button", { name: "Tentar de novo" });
      expect(root).toContainElement(button);
      const desc = document.querySelector('[data-slot="alert-description"]');
      expect(desc?.compareDocumentPosition(button)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it("sem title, description e icon, continua composição", () => {
      render(
        <Alert>
          <AlertTitle>Composição</AlertTitle>
        </Alert>,
      );
      expect(screen.getByText("Composição")).toBeInTheDocument();
    });
  });
});
