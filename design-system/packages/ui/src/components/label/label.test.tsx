import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./label";

describe("Label (PRIZM / shadcn)", () => {
  it("renderiza texto do label", () => {
    render(<Label htmlFor="name">Name</Label>);
    const el = screen.getByText("Name");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("for", "name");
  });

  it("className de quem usa vence as classes base", () => {
    render(<Label className="leading-snug">Nome</Label>);
    const el = screen.getByText("Nome");
    expect(el).toHaveClass("leading-snug");
    expect(el).not.toHaveClass("leading-none");
  });

  it("required mostra o asterisco fora do nome acessível", () => {
    render(
      <>
        <Label htmlFor="email" required>
          Email
        </Label>
        <input id="email" required />
      </>,
    );
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("textbox", { name: "Email" })).toBeRequired();
  });

  it("sem required não mostra o asterisco", () => {
    render(<Label>Nome</Label>);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("clicar no rótulo aciona o campo ligado por htmlFor", () => {
    render(
      <>
        <Label htmlFor="termos">Aceito os termos</Label>
        <input id="termos" type="checkbox" />
      </>,
    );
    fireEvent.click(screen.getByText("Aceito os termos"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
