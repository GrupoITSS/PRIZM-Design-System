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

  describe("pendências de acessibilidade de 18/11/2026", () => {
    it("avisa no console quando o grupo não tem nome (pendência 1)", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<ButtonGroup buttons={[{ label: "A" }, { label: "B" }]} />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("ButtonGroup: grupo sem nome acessível"));
      warn.mockRestore();
    });

    it("não avisa com aria-label nem com aria-labelledby", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <>
          <ButtonGroup aria-label="Ações" buttons={[{ label: "A" }]} />
          <span id="titulo">Formato</span>
          <ButtonGroup aria-labelledby="titulo">
            <button type="button">B</button>
          </ButtonGroup>
        </>,
      );
      expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("ButtonGroup:"));
      expect(screen.getByRole("group", { name: "Formato" })).toBeInTheDocument();
      warn.mockRestore();
    });

    it("dá nome ao botão só de ícone pelo aria-label do item (pendência 2)", () => {
      render(
        <ButtonGroup
          aria-label="Zoom"
          buttons={[
            { label: <svg aria-hidden="true" />, "aria-label": "Reduzir", size: "icon" },
            { label: <svg aria-hidden="true" />, "aria-label": "Ampliar", size: "icon" },
          ]}
        />,
      );
      expect(screen.getByRole("button", { name: "Reduzir" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ampliar" })).toBeInTheDocument();
    });

    it("põe separador sozinho quando nenhum botão é outline (pendência 4)", () => {
      const { container } = render(
        <ButtonGroup aria-label="Cheio" buttons={[{ label: "A" }, { label: "B" }, { label: "C" }]} />,
      );
      expect(container.querySelectorAll("[data-slot=button-group-separator]")).toHaveLength(2);
    });

    it("não põe separador no automático quando há botão outline", () => {
      const { container } = render(
        <ButtonGroup
          aria-label="Contorno"
          buttons={[
            { label: "A", variant: "outline" },
            { label: "B", variant: "outline" },
          ]}
        />,
      );
      expect(container.querySelectorAll("[data-slot=button-group-separator]")).toHaveLength(0);
    });

    it("respeita separatorBetween explícito", () => {
      const { container, rerender } = render(
        <ButtonGroup aria-label="G" separatorBetween={false} buttons={[{ label: "A" }, { label: "B" }]} />,
      );
      expect(container.querySelectorAll("[data-slot=button-group-separator]")).toHaveLength(0);
      rerender(
        <ButtonGroup
          aria-label="G"
          separatorBetween
          buttons={[
            { label: "A", variant: "outline" },
            { label: "B", variant: "outline" },
          ]}
        />,
      );
      expect(container.querySelectorAll("[data-slot=button-group-separator]")).toHaveLength(1);
    });

    it("cor do separador pela variante do botão anterior (pendência 3)", () => {
      const { container } = render(
        <ButtonGroup
          aria-label="Secundário"
          buttons={[
            { label: "A", variant: "secondary" },
            { label: "B", variant: "secondary" },
          ]}
        />,
      );
      const sep = container.querySelector("[data-slot=button-group-separator]");
      expect(sep?.previousElementSibling).toHaveAttribute("data-variant", "secondary");
      expect(sep?.className).toContain("bg-border");
      expect(sep?.className).toContain("[[data-variant=default]+&]:bg-primary-foreground/20");
    });
  });
});
