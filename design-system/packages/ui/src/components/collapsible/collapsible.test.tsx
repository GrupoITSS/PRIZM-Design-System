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

  it("applies trigger variant class (composition)", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger variant="ghost">Ghost</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: /ghost/i });
    expect(trigger).toHaveClass("hover:bg-transparent");
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
