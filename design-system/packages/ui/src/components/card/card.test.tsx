import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

describe("Card (PRIZM / shadcn)", () => {
  it("renderiza header, conteúdo e footer", () => {
    render(
      <Card title="Card Title" description="Card Description" action="Action" footer="Card Footer">
        Card Content
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Card Footer")).toBeInTheDocument();
  });

  it("aplica estilos base do card", () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>,
    );

    const card = screen.getByText("Content").closest("[data-slot='card']");
    expect(card).toHaveClass("rounded-lg");
    expect(card).toHaveClass("bg-card");
    expect(card).toHaveClass("text-card-foreground");
  });

  it("usa espaçamento menor quando size='sm'", () => {
    render(
      <Card size="sm">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    const header = screen.getByText("Small Card").closest("[data-slot='card-header']");
    expect(header).toHaveClass("p-4");
  });
});
