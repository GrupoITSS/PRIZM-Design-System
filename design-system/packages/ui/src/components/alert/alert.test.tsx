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
      expect(root).toHaveClass(
        "bg-card",
        "border-border",
        "text-foreground",
        "[&>svg]:text-foreground",
      );
      expect(root).toHaveClass("[&_[data-slot=alert-description]]:text-muted-foreground");
    });

    it.each(["destructive", "warning", "success", "info"] as const)(
      "%s: fundo -weak, borda e ícone no tom, texto -strong",
      (tone) => {
        const { container } = render(<Alert variant={tone} title="Title" />);
        const root = container.firstElementChild;
        expect(root).toHaveClass(
          `bg-${tone}-weak`,
          `border-${tone}`,
          `text-${tone}-strong`,
          `[&>svg]:text-${tone}`,
        );
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
        <Alert
          variant="destructive"
          title="Não foi possível salvar"
          description="Verifique a conexão."
        >
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

  describe("action (decisão de 11/11/2026)", () => {
    it("a ação fica ao lado do texto, depois da descrição, e o ícone segue à esquerda", () => {
      render(
        <Alert
          variant="destructive"
          icon={<svg data-testid="icon" />}
          title="Oportunidade não encontrada"
          description="O CRM não respondeu."
          action={<button type="button">Recarregar</button>}
        />,
      );
      const root = screen.getByRole("alert");
      const main = root.querySelector('[data-slot="alert-main"]');
      const body = root.querySelector('[data-slot="alert-body"]');
      const action = root.querySelector('[data-slot="alert-action"]');
      expect(main).toHaveClass("flex", "flex-wrap", "items-center", "gap-x-4");
      expect(body).toContainElement(screen.getByText("O CRM não respondeu."));
      expect(action).toContainElement(screen.getByRole("button", { name: "Recarregar" }));
      expect(root.firstElementChild).toBe(screen.getByTestId("icon"));
    });

    it("só com action também usa a API por props", () => {
      render(<Alert action={<button type="button">Ok</button>} />);
      expect(document.querySelector('[data-slot="alert-action"]')).toBeInTheDocument();
    });

    it("sem action, a estrutura não muda", () => {
      render(<Alert title="Title" description="Desc" />);
      expect(document.querySelector('[data-slot="alert-main"]')).not.toBeInTheDocument();
    });

    it('actionPosition="right" é o padrão', () => {
      render(<Alert title="T" action={<button type="button">Ok</button>} />);
      const main = document.querySelector('[data-slot="alert-main"]');
      expect(main).toHaveAttribute("data-action-position", "right");
      expect(main).toHaveClass("flex-wrap", "items-center");
      expect(document.querySelector('[data-slot="alert-body"]')).toHaveClass("flex-1", "basis-48");
    });

    it('actionPosition="bottom": texto com a largura toda e a ação numa linha abaixo', () => {
      render(
        <Alert
          variant="warning"
          title="Desconto acima de 15%"
          description="Peça aprovação para seguir."
          action={<button type="button">Pedir aprovação</button>}
          actionPosition="bottom"
        />,
      );
      const main = document.querySelector('[data-slot="alert-main"]');
      const body = document.querySelector('[data-slot="alert-body"]');
      expect(main).toHaveAttribute("data-action-position", "bottom");
      expect(main).toHaveClass("flex", "flex-col", "items-start", "gap-2");
      expect(main).not.toHaveClass("flex-wrap");
      expect(body).toHaveClass("w-full");
      expect(body).not.toHaveClass("basis-48");
      expect(body?.nextElementSibling).toHaveAttribute("data-slot", "alert-action");
    });

    it("actionPosition sem action não muda a estrutura", () => {
      render(<Alert title="T" actionPosition="bottom" />);
      expect(document.querySelector('[data-slot="alert-main"]')).not.toBeInTheDocument();
    });
  });
});
