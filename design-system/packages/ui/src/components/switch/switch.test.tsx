import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as React from "react";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders and toggles in uncontrolled mode", () => {
    render(<Switch aria-label="Airplane mode" />);

    const toggle = screen.getByRole("switch", { name: /airplane mode/i });
    expect(toggle).toHaveAttribute("data-state", "unchecked");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "checked");
  });

  it("calls onChange in controlled mode", () => {
    const handleChange = vi.fn();

    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch
          aria-label="Notifications"
          checked={checked}
          onChange={(value) => {
            setChecked(value);
            handleChange(value);
          }}
        />
      );
    }

    render(<Controlled />);

    const toggle = screen.getByRole("switch", { name: /notifications/i });
    fireEvent.click(toggle);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe("Switch: decisões de 03/11/2026", () => {
  it("onCheckedChange funciona, e o onChange antigo também (D10)", () => {
    const novo = vi.fn();
    const antigo = vi.fn();
    render(<Switch aria-label="Avisos" onCheckedChange={novo} onChange={antigo} />);
    fireEvent.click(screen.getByRole("switch", { name: "Avisos" }));
    expect(novo).toHaveBeenCalledWith(true);
    expect(antigo).toHaveBeenCalledWith(true);
  });

  it("trilho desligado em input e ligado em primary (D4)", () => {
    render(<Switch aria-label="Avisos" />);
    expect(screen.getByRole("switch")).toHaveClass(
      "data-[state=unchecked]:bg-input",
      "data-[state=checked]:bg-primary",
    );
  });

  it("alça sem sombra (D6)", () => {
    const { container } = render(<Switch aria-label="Avisos" />);
    const thumb = container.querySelector("[data-slot=switch-thumb]");
    expect(thumb?.className).not.toMatch(/shadow/);
  });

  it("no escuro, a alça desligada fica em foreground", () => {
    const { container } = render(<Switch aria-label="Avisos" />);
    expect(container.querySelector("[data-slot=switch-thumb]")).toHaveClass(
      "bg-background",
      "in-data-[mode=dark]:data-[state=unchecked]:bg-foreground",
    );
  });

  it("aria-invalid pinta a borda de destructive (D7)", () => {
    render(<Switch aria-label="Termos" aria-invalid />);
    const s = screen.getByRole("switch");
    expect(s).toHaveAttribute("aria-invalid", "true");
    expect(s).toHaveClass("aria-invalid:border-destructive", "border-2");
  });

  it("foco com ring-offset-ring-offset (D8)", () => {
    render(<Switch aria-label="Avisos" />);
    expect(screen.getByRole("switch")).toHaveClass("focus-visible:ring-offset-ring-offset");
  });

  it("sm ganha 24px de alvo; default e lg já têm (D9)", () => {
    const { rerender } = render(<Switch aria-label="Avisos" size="sm" />);
    expect(screen.getByRole("switch")).toHaveClass("relative", "h-5", "after:-inset-0.5");
    rerender(<Switch aria-label="Avisos" size="default" />);
    expect(screen.getByRole("switch")).toHaveClass("h-6");
    expect(screen.getByRole("switch").className).not.toContain("after:-inset");
  });

  it("avisa no console quando não tem nome (pendência 3)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { unmount } = render(<Switch />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Switch: sem nome acessível"));
    unmount();
    warn.mockClear();
    render(
      <>
        <label htmlFor="modo">Modo avião</label>
        <Switch id="modo" />
      </>,
    );
    expect(warn).not.toHaveBeenCalled();
    expect(screen.getByRole("switch", { name: "Modo avião" })).toBeInTheDocument();
    warn.mockRestore();
  });

  it("Enter e Espaço ligam, como botão nativo (pendência 4)", () => {
    render(<Switch aria-label="Avisos" />);
    const s = screen.getByRole("switch");
    expect(s.tagName).toBe("BUTTON");
    expect(s).toHaveAttribute("type", "button");
  });
});
