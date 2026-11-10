import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

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

  it("aplica estilos alinhados ao Figma (radius/xl e título text/base)", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>,
    );

    const card = screen.getByText("Content").closest("[data-slot='card']");
    expect(card).toHaveClass("rounded-xl");
    expect(card).toHaveClass("bg-card");
    expect(card).toHaveClass("text-card-foreground");

    const title = screen.getByText("Title");
    expect(title).toHaveClass("text-base");
    expect(title).toHaveClass("font-semibold");
    expect(title).not.toHaveClass("text-2xl");
  });

  it("coloca CardAction no cabeçalho com data-slot para a grade", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    const action = screen.getByText("Action");
    expect(action.closest("[data-slot='card-action']")).toBeTruthy();
    expect(screen.getByText("Title").closest("[data-slot='card-header']")).toHaveClass(
      "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
    );
  });
});
