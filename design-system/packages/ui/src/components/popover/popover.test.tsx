import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Popover } from "./popover";

describe("Popover (PRIZM / shadcn)", () => {
  it("abre o conteúdo ao clicar no trigger (API props-based)", () => {
    render(
      <Popover
        trigger={<button type="button">Open popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Open popover"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("aplica classes de size e className customizado no conteúdo", () => {
    render(
      <Popover
        trigger={<button type="button">Open</button>}
        content={<div>Sized content</div>}
        size="lg"
        className="custom-popover"
      />,
    );

    fireEvent.click(screen.getByText("Open"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("custom-popover");
    expect(dialog).toHaveClass("w-96");
  });

  it("propaga corretamente as props de alinhamento e lado para o conteúdo", () => {
    render(
      <Popover
        trigger={<button type="button">Trigger</button>}
        content={<div>Aligned content</div>}
        align="start"
        side="right"
      />,
    );

    fireEvent.click(screen.getByText("Trigger"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-align", "start");
    expect(dialog).toHaveAttribute("data-side", "right");
  });
});
