import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

describe("Accordion (PRIZM / shadcn)", () => {
  it("API simplificada: renderiza triggers via items", () => {
    render(
      <Accordion
        type="single"
        collapsible
        items={[
          { value: "one", trigger: "One", content: "Content one" },
          { value: "two", trigger: "Two", content: "Content two" },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: /one/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /two/i })).toBeInTheDocument();
  });

  it("API de composição: renderiza trigger e região de content", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="one">
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Content here</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole("button", { name: /toggle/i })).toBeInTheDocument();
    // Radix renderiza a região do content (role=region); o texto pode não estar no DOM quando fechado
    expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
  });

  it("aplica classes de item (borda neutra)", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="one" data-testid="item">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const item = screen.getByTestId("item");
    expect(item).toHaveClass("border-border");
  });

  it("decisões de 05/11/2026: título, hover, foco, disabled e conteúdo", () => {
    render(
      <Accordion type="single" defaultValue="one">
        <AccordionItem value="one" data-testid="item">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two" disabled data-testid="disabled">
          <AccordionTrigger>Locked</AccordionTrigger>
          <AccordionContent>Hidden</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Title" });
    // Título: text-sm, à esquerda, com espaço nas laterais e raio para o fundo do hover.
    expect(trigger).toHaveClass("text-sm", "text-left", "px-2", "rounded-md");
    // Hover (e pressed, igual): fundo accent, texto e chevron em accent-foreground; sem sublinhado.
    expect(trigger).toHaveClass("hover:bg-accent", "hover:text-accent-foreground");
    expect(trigger).toHaveClass("hover:[&>svg]:text-accent-foreground");
    expect(trigger.className).not.toContain("underline");
    // Foco do Prizm: anel ring com offset ring-offset, só no foco por teclado.
    expect(trigger).toHaveClass(
      "outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-ring-offset",
    );
    // Disabled: o item inteiro a 50%, e o título sem clique.
    expect(screen.getByTestId("disabled")).toHaveClass("data-[disabled]:opacity-50");
    expect(screen.getByTestId("disabled")).toHaveAttribute("data-disabled");
    expect(screen.getByRole("button", { name: "Locked" })).toHaveClass(
      "disabled:pointer-events-none",
    );
    // Conteúdo em foreground, com spacing/1 em cima para o anel não cobrir a primeira linha.
    const region = screen.getByRole("region", { name: "Title" });
    expect(region).toHaveClass("text-foreground");
    expect(region.className).not.toContain("muted-foreground");
    expect(region.firstElementChild).toHaveClass("px-2", "pt-1", "pb-4");
  });

  it("expande e recolhe ao clicar no trigger", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="one">
          <AccordionTrigger>Open me</AccordionTrigger>
          <AccordionContent>Hidden until open</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: /open me/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
