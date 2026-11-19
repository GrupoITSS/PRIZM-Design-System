import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

describe("Breadcrumb (PRIZM / shadcn)", () => {
  it("renderiza corretamente usando a API simplificada (items)", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "PRIZM UI" },
        ]}
        data-testid="breadcrumb"
      />,
    );

    const nav = screen.getByTestId("breadcrumb");
    expect(nav).toHaveAttribute("aria-label", "Trilha de navegação");

    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("Projects")).toHaveAttribute("href", "/projects");

    const current = screen.getByText("PRIZM UI");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("usa isCurrent para definir explicitamente o item atual", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects", isCurrent: true },
          { label: "Ignored current" },
        ]}
      />,
    );

    const current = screen.getByText("Projects");
    expect(current).toHaveAttribute("aria-current", "page");
    // O último item deixa de ser atual quando outro é marcado.
    expect(screen.getByText("Ignored current")).not.toHaveAttribute("aria-current");
    expect(document.querySelectorAll("[aria-current]")).toHaveLength(1);
  });

  it("renderiza item do meio sem href como texto simples, sem aria-current", () => {
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Configurações" }, { label: "Conta" }]}
      />,
    );

    const middle = screen.getByText("Configurações");
    expect(middle.tagName).toBe("SPAN");
    expect(middle).not.toHaveAttribute("aria-current");
    expect(middle).toHaveAttribute("data-slot", "breadcrumb-text");
    expect(screen.getByText("Conta")).toHaveAttribute("aria-current", "page");
    expect(document.querySelectorAll("[aria-current]")).toHaveLength(1);
  });

  it("marca a página atual só com aria-current, sem role link nem aria-disabled", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Conta" }]} />);

    const current = screen.getByText("Conta");
    expect(current).not.toHaveAttribute("role");
    expect(current).not.toHaveAttribute("aria-disabled");
    expect(screen.queryByRole("link", { name: "Conta" })).toBeNull();
  });

  it("aceita outro nome para a navegação", () => {
    render(<Breadcrumb aria-label="Caminho do documento" items={[{ label: "Home" }]} />);
    expect(screen.getByRole("navigation")).toHaveAccessibleName("Caminho do documento");
  });

  it("dá ao link o anel de foco do Prizm", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveClass("focus-visible:ring-[3px]", "focus-visible:ring-ring", "rounded-xs");
  });

  it("permite composição manual com subcomponentes", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    const current = screen.getByText("Current");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renderiza BreadcrumbEllipsis como botão com nome", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const ellipsis = screen.getByRole("button", { name: "Mais páginas" });
    expect(ellipsis).toHaveAttribute("type", "button");
    expect(ellipsis).toHaveClass("hover:bg-accent", "hover:text-accent-foreground");
    expect(ellipsis).toHaveClass("focus-visible:ring-[3px]");
  });

  it("aceita outro nome para as reticências", () => {
    render(<BreadcrumbEllipsis aria-label="Mostrar pastas" />);
    expect(screen.getByRole("button", { name: "Mostrar pastas" })).toBeInTheDocument();
  });
});
