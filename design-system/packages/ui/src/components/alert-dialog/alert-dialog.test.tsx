import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

describe("AlertDialog (PRIZM / shadcn)", () => {
  it("renderiza trigger e conteúdo quando aberto", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger asChild>
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogDescription>Description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button>OK</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^ok$/i })).toBeInTheDocument();
  });

  it("aplica classes ao content", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger asChild>
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent data-testid="content">
          <AlertDialogHeader>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogDescription>Description for a11y</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const content = screen.getByTestId("content");
    expect(content).toHaveClass("bg-background");
    expect(content).toHaveClass("border-border");
  });

  it("cantos sempre arredondados e 16px de margem no celular", () => {
    render(<AlertDialog defaultOpen title="Title" description="Description" />);
    const content = screen.getByRole("alertdialog");
    expect(content).toHaveClass("rounded-lg", "max-w-[calc(100%-2rem)]", "sm:max-w-lg");
    expect(content).not.toHaveClass("sm:rounded-lg");
  });

  it("título e descrição usam as classes dos tokens, sem variáveis próprias", () => {
    render(<AlertDialog defaultOpen title="Title" description="Description" />);
    const title = screen.getByText("Title");
    const desc = screen.getByText("Description");
    expect(title).toHaveClass("text-foreground");
    expect(desc).toHaveClass("text-muted-foreground");
    expect(title.className).not.toMatch(/--alert-dialog/);
    expect(desc.className).not.toMatch(/--alert-dialog/);
  });

  it("rodapé com spacing/2 entre os botões também no celular", () => {
    render(<AlertDialog defaultOpen title="Title" />);
    const footer = screen.getByRole("button", {
      name: "Cancelar",
    }).parentElement;
    expect(footer).toHaveClass("gap-2", "flex-col-reverse");
  });

  it("icon renderiza a mídia decorativa antes do título", () => {
    render(<AlertDialog defaultOpen title="Excluir projeto?" icon={<svg data-testid="icone" />} />);
    const media = screen.getByTestId("icone").parentElement as HTMLElement;
    expect(media).toHaveAttribute("data-slot", "alert-dialog-media");
    expect(media).toHaveAttribute("aria-hidden", "true");
    expect(media).toHaveClass("size-16", "rounded-md", "bg-muted");
    expect(media.nextElementSibling).toHaveTextContent("Excluir projeto?");
    expect(screen.getByRole("alertdialog")).toHaveAccessibleName("Excluir projeto?");
  });

  it("sem icon, não há mídia", () => {
    render(<AlertDialog defaultOpen title="Title" />);
    expect(document.querySelector('[data-slot="alert-dialog-media"]')).toBeNull();
  });

  it("AlertDialogMedia funciona na composição", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <svg data-testid="icone" />
            </AlertDialogMedia>
            <AlertDialogTitle>Title</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.getByTestId("icone").parentElement).toHaveAttribute(
      "data-slot",
      "alert-dialog-media",
    );
  });
});
