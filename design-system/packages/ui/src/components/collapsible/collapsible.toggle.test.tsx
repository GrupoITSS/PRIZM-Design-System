import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buttonVariants } from "../button";
import { Collapsible, CollapsibleContent, CollapsibleToggle } from "./collapsible";
import { collapsibleToggleStyles } from "./collapsible.styles";
import map from "./collapsible.tokens.json";

const Header = (props: { disabled?: boolean; onEdit?: () => void }) => (
  <Collapsible disabled={props.disabled}>
    <div>
      <CollapsibleToggle aria-label="Mostrar produtos de Bebidas" />
      <span>Bebidas</span>
      <button type="button" onClick={props.onEdit}>
        Editar
      </button>
    </div>
    <CollapsibleContent>Lista de produtos</CollapsibleContent>
  </Collapsible>
);

describe("CollapsibleToggle (06/11/2026, pedido do Pricing)", () => {
  it("é o Button ghost icon-sm do Prizm", () => {
    render(<Header />);
    const t = screen.getByRole("button", { name: "Mostrar produtos de Bebidas" });
    for (const c of buttonVariants({ variant: "ghost", size: "icon-sm" }).split(/\s+/))
      expect(t).toHaveClass(c);
    expect(map.parts.toggle.button).toBe("Button ghost icon-sm");
  });

  it("abre e fecha pelo clique e pelo teclado, com aria-expanded", async () => {
    render(<Header />);
    const t = screen.getByRole("button", { name: "Mostrar produtos de Bebidas" });
    expect(t).toHaveAttribute("aria-expanded", "false");
    act(() => t.focus());
    expect(t).toHaveFocus();
    fireEvent.click(t);
    await waitFor(() => expect(t).toHaveAttribute("aria-expanded", "true"));
    expect(t).toHaveAttribute("data-state", "open");
    expect(t).toHaveAttribute("aria-controls", screen.getByText("Lista de produtos").id);
  });

  it("as outras ações do cabeçalho não abrem o painel", () => {
    let edited = 0;
    render(<Header onEdit={() => edited++} />);
    fireEvent.click(screen.getByRole("button", { name: "Editar" }));
    expect(edited).toBe(1);
    expect(screen.getByRole("button", { name: "Mostrar produtos de Bebidas" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("ícone ChevronRight fora do nome, girando 90° aberto (vira ChevronDown)", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(collapsibleToggleStyles.split(/\s+/)).toContain(
      `data-[state=open]:[&_svg]:rotate-${map.parts.toggle.openRotation}`,
    );
  });

  it("nome padrão em pt-BR quando não se passa aria-label", () => {
    render(
      <Collapsible>
        <CollapsibleToggle />
      </Collapsible>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleName("Mostrar ou ocultar");
  });

  it("disabled no Collapsible: o toggle fica disabled e não abre", () => {
    render(<Header disabled />);
    const t = screen.getByRole("button", { name: "Mostrar produtos de Bebidas" });
    expect(t).toBeDisabled();
    fireEvent.click(t);
    expect(t).toHaveAttribute("aria-expanded", "false");
  });
});
