import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { calendarDayButtonStyles, calendarClassNames, calendarRootStyles } from "../calendar/calendar.styles";
import { DatePicker } from "./date-picker";
import { datePickerTriggerVariants } from "./date-picker.styles";

// Decisões de 27/10/2026 (documentação do DatePicker): D2 a D4 e as pendências de acessibilidade 1 a 4.
describe("DatePicker: decisões de 27/10/2026", () => {
  it("D2: aria-invalid, aria-describedby e aria-label chegam ao botão; erro com borda destructive", () => {
    render(
      <DatePicker aria-label="Data de entrega" aria-invalid aria-describedby="entrega-erro" />,
    );
    const botao = screen.getByRole("button", { name: "Data de entrega" });
    expect(botao).toHaveAttribute("aria-invalid", "true");
    expect(botao).toHaveAttribute("aria-describedby", "entrega-erro");
    expect(datePickerTriggerVariants().split(" ")).toEqual(
      expect.arrayContaining([
        "aria-invalid:border-destructive",
        "aria-invalid:focus-visible:border-destructive",
      ]),
    );
  });

  it("D3: o campo não muda no hover (o hover do Button outline é anulado)", () => {
    render(<DatePicker aria-label="Data" />);
    const classes = screen.getByRole("button", { name: "Data" }).className.split(" ");
    expect(classes).toContain("hover:bg-input-background");
    expect(classes).not.toContain("hover:bg-accent");
  });

  it("D4: com o calendário aberto, o gatilho usa o anel do foco", () => {
    expect(datePickerTriggerVariants().split(" ")).toEqual(
      expect.arrayContaining([
        "data-[state=open]:ring-2",
        "data-[state=open]:ring-ring",
        "data-[state=open]:border-transparent",
      ]),
    );
  });

  it("pendência 1: o calendário aberto tem nome (calendarLabel)", async () => {
    const { unmount } = render(<DatePicker aria-label="Data" />);
    fireEvent.click(screen.getByRole("button", { name: "Data" }));
    expect(await screen.findByRole("dialog", { name: "Escolher data" })).toBeInTheDocument();
    unmount();

    render(<DatePicker aria-label="Data" calendarLabel="Escolher a data de entrega" />);
    fireEvent.click(screen.getByRole("button", { name: "Data" }));
    expect(
      await screen.findByRole("dialog", { name: "Escolher a data de entrega" }),
    ).toBeInTheDocument();
  });

  it("pendência 2: rótulos em pt-BR e foco inicial no dia escolhido", async () => {
    render(<DatePicker aria-label="Data" value={new Date(2026, 9, 27)} />);
    fireEvent.click(screen.getByRole("button", { name: "Data" }));
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Ir para o mês anterior" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ir para o próximo mês" })).toBeInTheDocument();
    expect(document.activeElement?.getAttribute("aria-label")).toMatch(/27 de outubro de 2026/);
  });

  it("pendências 3 e 4: dias fora do mês sem opacidade e foco do dia no anel do sistema", () => {
    expect(calendarRootStyles).not.toContain("--rdp-outside-opacity");
    expect(calendarClassNames.outside).toContain("text-muted-foreground");
    expect(calendarDayButtonStyles).toContain("group-data-[focused=true]/day:ring-2");
    expect(calendarDayButtonStyles).toContain("group-data-[focused=true]/day:ring-ring");
    expect(calendarDayButtonStyles).not.toContain("ring-ring/50");
    expect(calendarClassNames.dropdownRoot).toContain("has-focus:ring-2");
    expect(calendarClassNames.dropdownRoot).not.toContain("ring-ring/50");
  });
});
