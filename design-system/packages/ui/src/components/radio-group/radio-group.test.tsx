import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup (PRIZM / Radix)", () => {
  it("renderiza itens via API de `items` (props based)", () => {
    render(
      <RadioGroup
        items={[
          { value: "default", label: "Default" },
          { value: "comfortable", label: "Comfortable" },
          { value: "compact", label: "Compact" },
        ]}
      />,
    );

    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Comfortable")).toBeInTheDocument();
    expect(screen.getByText("Compact")).toBeInTheDocument();
  });

  it("dispara onValueChange ao selecionar um item", () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup
        onValueChange={handleChange}
        items={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
      />,
    );

    fireEvent.click(screen.getByText("Option 2"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("option2");
  });

  it("aplica orientação e espaçamento via props na raiz", () => {
    render(
      <RadioGroup
        orientation="horizontal"
        spacing={2}
        items={[{ value: "default", label: "Default" }]}
      />,
    );

    const root = screen.getByRole("radiogroup");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    expect(root.className).toContain("flex-row");
    expect(root.className).toContain("gap-2");
  });
});

describe("RadioGroup: decisões de 03/11/2026", () => {
  const items = [
    { value: "mensal", label: "Mensal", description: "Cobrança todo mês." },
    { value: "anual", label: "Anual" },
  ];

  it("borda sem marcar em input-strong e fundo de campo (D5, D6)", () => {
    render(<RadioGroup aria-label="Plano" items={items} />);
    const [radio] = screen.getAllByRole("radio");
    expect(radio).toHaveClass("border-input-strong", "bg-input-background");
    expect(radio).not.toHaveClass("border-input");
  });

  it("marcado: borda primary, sem fundo primary/10 (D6)", () => {
    render(<RadioGroup aria-label="Plano" defaultValue="anual" items={items} />);
    const radio = screen.getByRole("radio", { name: "Anual" });
    expect(radio).toBeChecked();
    expect(radio).toHaveClass("data-[state=checked]:border-primary", "text-primary");
    expect(radio.className).not.toContain("bg-primary/10");
  });

  it("ponto de 8px, decorativo (D10)", () => {
    render(<RadioGroup aria-label="Plano" defaultValue="anual" items={items} />);
    const dot = screen.getByRole("radio", { name: "Anual" }).querySelector("svg");
    expect(dot).toHaveClass("size-2");
    expect(dot).toHaveAttribute("aria-hidden");
  });

  it("aria-invalid no grupo pinta a borda de destructive, também marcado (pendência 4)", () => {
    render(<RadioGroup aria-label="Plano" aria-invalid items={items} />);
    expect(screen.getByRole("radiogroup")).toHaveClass("group/radio-group");
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-invalid", "true");
    const [radio] = screen.getAllByRole("radio");
    expect(radio).toHaveClass(
      "group-aria-invalid/radio-group:border-destructive",
      "group-aria-invalid/radio-group:data-[state=checked]:border-destructive",
    );
  });

  it("foco com ring-offset-ring-offset e alvo de 24px (D8, D9)", () => {
    render(<RadioGroup aria-label="Plano" items={items} />);
    const [radio] = screen.getAllByRole("radio");
    expect(radio).toHaveClass("focus-visible:ring-offset-ring-offset", "after:-inset-1", "relative");
  });

  it("descrição em text-sm, a 6px do rótulo (D11)", () => {
    render(<RadioGroup aria-label="Plano" items={items} />);
    const desc = screen.getByText("Cobrança todo mês.");
    expect(desc).toHaveClass("text-sm", "text-muted-foreground");
    expect(desc.parentElement).toHaveClass("gap-1.5");
  });

  it("composição: RadioGroupItem como children (D1)", () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup aria-label="Plano" onValueChange={handleChange}>
        <label htmlFor="mensal">
          <RadioGroupItem id="mensal" value="mensal" />
          Mensal
        </label>
        <label htmlFor="anual">
          <RadioGroupItem id="anual" value="anual" />
          Anual
        </label>
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    fireEvent.click(screen.getByText("Anual"));
    expect(handleChange).toHaveBeenCalledWith("anual");
  });

  it("avisa no console quando o grupo não tem nome (pendência 3)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { unmount } = render(<RadioGroup items={items} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("RadioGroup: grupo sem nome"));
    unmount();
    warn.mockClear();
    render(<RadioGroup aria-label="Plano" items={items} />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
