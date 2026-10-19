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
