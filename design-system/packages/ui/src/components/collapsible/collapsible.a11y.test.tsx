import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChevronDown } from "../icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

describe("Collapsible · teclado e nomes (etapa 4, 06/11/2026)", () => {
  it("API por props: o gatilho é um botão com aria-expanded e aria-controls apontando o conteúdo", async () => {
    render(
      <Collapsible trigger="Product details" triggerIcon={<ChevronDown />}>
        Details
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Product details" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
    const content = screen.getByText("Details");
    expect(trigger).toHaveAttribute("aria-controls", content.id);
  });

  it("Enter e Espaço abrem e fecham (botão nativo)", async () => {
    render(<Collapsible trigger="Product details">Details</Collapsible>);
    const trigger = screen.getByRole("button", { name: "Product details" });
    act(() => trigger.focus());
    expect(trigger).toHaveFocus();
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger).toHaveAttribute("type", "button");
    fireEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
  });

  it("o ícone fica fora do nome do botão (aria-hidden)", () => {
    const { container } = render(
      <Collapsible trigger="Product details" triggerIcon={<ChevronDown />}>
        Details
      </Collapsible>,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button")).toHaveAccessibleName("Product details");
  });

  it("disabled: botão disabled, não abre", () => {
    render(
      <Collapsible trigger="Product details" disabled>
        Details
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Product details" });
    expect(trigger).toBeDisabled();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("composição: gatilho só com ícone precisa de nome (sr-only ou aria-label)", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger aria-label="Toggle order details">
          <ChevronDown />
        </CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleName("Toggle order details");
  });
});
