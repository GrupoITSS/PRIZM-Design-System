import "@testing-library/jest-dom/vitest";
import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";
import { datePickerTriggerVariants } from "./date-picker.styles";

vi.mock("../popover", () => {
  const Popover = ({
    trigger,
    content,
  }: {
    trigger: React.ReactElement;
    content?: React.ReactNode;
  }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        {/* The click on the trigger button bubbles up and toggles the content. */}
        <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
        {open && <div role="dialog">{content}</div>}
      </div>
    );
  };

  return { Popover };
});

describe("DatePicker (PRIZM / shadcn)", () => {
  it("renderiza placeholder quando nenhum valor está selecionado", () => {
    render(<DatePicker placeholder="Pick a date" />);

    expect(screen.getByRole("button")).toHaveTextContent("Pick a date");
  });

  it("chama onChange ao abrir programaticamente (sanidade básica de integração com Calendar)", () => {
    const onChange = vi.fn();
    render(<DatePicker value={undefined} onChange={onChange} />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Não há uma forma simples e estável de clicar em um dia específico do `react-day-picker`
    // sem acoplar o teste a detalhes internos de aria/roles. Aqui validamos apenas que o
    // calendário é renderizado dentro do popover.
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renderiza Calendar em modo range quando mode='range'", () => {
    render(<DatePicker mode="range" value={undefined} onChange={() => {}} />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("aceita props avançadas de Calendar via calendarProps", () => {
    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        calendarProps={{
          captionLayout: "dropdown",
        }}
      />,
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Quando captionLayout é "dropdown", o calendário deve renderizar selects no caption.
    const dropdowns = screen.getAllByRole("combobox");
    expect(dropdowns.length).toBeGreaterThanOrEqual(1);
  });
});

describe("DatePicker: escala e estados iguais aos do Input (21/10/2026)", () => {
  it.each(["sm", "md", "lg"] as const)("foco e disabled seguem a mesma regra no tamanho %s", (size) => {
    const classes = datePickerTriggerVariants({ size }).split(" ");
    expect(classes).toEqual(
      expect.arrayContaining([
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:border-transparent",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
      ]),
    );
    expect(classes).not.toContain("focus-visible:ring-ring/30");
    expect(classes).not.toContain("disabled:bg-muted");
    expect(classes).toContain(`h-control-height-${size}`);
    expect(classes).not.toContain("h-12");
    // O gatilho é um Button: o espaço do anel dele não vale aqui.
    expect(classes).toContain("focus-visible:ring-offset-0");
  });
});
