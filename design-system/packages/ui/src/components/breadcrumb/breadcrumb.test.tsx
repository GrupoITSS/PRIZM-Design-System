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
    expect(nav).toHaveAttribute("aria-label", "breadcrumb");

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

  it("renderiza BreadcrumbEllipsis com conteúdo acessível oculto", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const ellipsis = screen.getByRole("presentation", { hidden: true });
    expect(ellipsis).toBeInTheDocument();
    expect(screen.getByText("More")).toHaveClass("sr-only");
  });
});
