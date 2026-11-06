import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

describe("Collapsible (PRIZM / shadcn)", () => {
  it("renders with simplified API (trigger + children)", () => {
    render(
      <Collapsible trigger="Show more" defaultOpen>
        <span>Expandable content</span>
      </Collapsible>,
    );
    expect(screen.getByRole("button", { name: /show more/i })).toBeInTheDocument();
    expect(screen.getByText("Expandable content")).toBeInTheDocument();
  });

  it("renders trigger and content (composition)", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByRole("button", { name: /toggle/i })).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("composition: content hidden when closed", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("has data-slot on root, trigger and content", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(container.querySelector("[data-slot='collapsible']")).toBeInTheDocument();
    expect(container.querySelector("[data-slot='collapsible-trigger']")).toBeInTheDocument();
    expect(container.querySelector("[data-slot='collapsible-content']")).toBeInTheDocument();
  });

  it("toggles content visibility when trigger is clicked", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden until open</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: /toggle/i });
    expect(screen.queryByText("Hidden until open")).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByText("Hidden until open")).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.queryByText("Hidden until open")).not.toBeInTheDocument();
  });

  it("decisões de 06/11/2026: gatilho alinhado ao Accordion", () => {
    render(<Collapsible trigger="Details">Content</Collapsible>);
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger).toHaveClass(
      "w-full",
      "px-2",
      "py-4",
      "gap-4",
      "rounded-md",
      "text-sm",
      "text-left",
    );
    expect(trigger).toHaveClass("hover:bg-accent", "hover:text-accent-foreground");
    expect(trigger.className).not.toContain("muted/50");
    expect(trigger).toHaveClass("focus-visible:ring-offset-ring-offset");
    expect(trigger.className).not.toContain("ring-offset-background");
    expect(trigger).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
  });

  it("o ícone gira com o painel aberto e fica fora do nome", () => {
    render(
      <Collapsible trigger="Details" triggerIcon={<svg data-testid="icon" />}>
        Content
      </Collapsible>,
    );
    const icon = screen.getByTestId("icon").parentElement;
    expect(icon).toHaveAttribute("data-slot", "collapsible-icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveClass("group-data-[state=open]/collapsible:rotate-180");
  });

  it("composição com asChild: o estilo é o do filho (Button)", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button type="button" className="own">
            Toggle
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveClass("own");
    expect(trigger.className).not.toContain("hover:bg-accent");
  });

  it("composição sem asChild: o gatilho tem o estilo do Prizm", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveClass("hover:bg-accent");
  });

  it("simplified API: trigger as function receives open state", () => {
    render(
      <Collapsible trigger={(isOpen) => (isOpen ? "Close" : "Open")}>
        <span>Content</span>
      </Collapsible>,
    );
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
