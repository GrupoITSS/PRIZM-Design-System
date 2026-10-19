import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonGroup } from "./button-group";

describe("ButtonGroup (PRIZM / shadcn)", () => {
  it("renderiza botões via prop buttons (API simplificada)", () => {
    render(
      <ButtonGroup
        aria-label="Actions"
        buttons={[
          { label: "Save", onClick: () => {} },
          { label: "Cancel", onClick: () => {} },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: /actions/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("aplica orientation horizontal por padrão", () => {
    const { container } = render(
      <ButtonGroup
        aria-label="Group"
        buttons={[
          { label: "A", onClick: () => {} },
          { label: "B", onClick: () => {} },
        ]}
      />,
    );
    const group = container.querySelector("[data-slot=button-group]");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
  });

  it("aplica orientation vertical quando informado", () => {
    const { container } = render(
      <ButtonGroup
        aria-label="Group"
        orientation="vertical"
        buttons={[
          { label: "A", onClick: () => {} },
          { label: "B", onClick: () => {} },
        ]}
      />,
    );
    const group = container.querySelector("[data-slot=button-group]");
    expect(group).toHaveAttribute("data-orientation", "vertical");
  });

  it("chama onClick de cada botão quando clicado", () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();
    render(
      <ButtonGroup
        aria-label="Actions"
        buttons={[
          { label: "Save", onClick: onSave },
          { label: "Cancel", onClick: onCancel },
        ]}
      />,
    );
    screen.getByRole("button", { name: /save/i }).click();
    expect(onSave).toHaveBeenCalledTimes(1);
    screen.getByRole("button", { name: /cancel/i }).click();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("renderiza text quando informado", () => {
    render(
      <ButtonGroup
        aria-label="Group"
        text="Label"
        buttons={[{ label: "Action", onClick: () => {} }]}
      />,
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });

  it("renderiza children quando não há buttons (composição)", () => {
    render(
      <ButtonGroup aria-label="Composition">
        <button type="button">Custom</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: /composition/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /custom/i })).toBeInTheDocument();
  });

  it("respeita variant e disabled nos itens de buttons", () => {
    render(
      <ButtonGroup
        aria-label="Group"
        buttons={[
          { label: "Primary", variant: "default", onClick: () => {} },
          { label: "Disabled", disabled: true, onClick: () => {} },
        ]}
      />,
    );
    const primary = screen.getByRole("button", { name: /primary/i });
    const disabled = screen.getByRole("button", { name: /disabled/i });
    expect(primary).not.toBeDisabled();
    expect(disabled).toBeDisabled();
  });
});
