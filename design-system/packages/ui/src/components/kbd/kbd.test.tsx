import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd } from "./kbd";

describe("Kbd (PRIZM / shadcn)", () => {
  it("renderiza uma tecla via children", () => {
    render(<Kbd>⌘</Kbd>);
    const kbd = screen.getByText("⌘");
    expect(kbd).toBeInTheDocument();
    expect(kbd.tagName).toBe("KBD");
  });

  it("aplica data-slot kbd no modo single key", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K")).toHaveAttribute("data-slot", "kbd");
  });

  it("renderiza múltiplas teclas via prop keys", () => {
    render(<Kbd keys={["⌘", "K"]} />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("usa wrapper com data-slot kbd-group quando keys é passado", () => {
    const { container } = render(<Kbd keys={["⌘", "S"]} />);
    const wrapper = container.querySelector('[data-slot="kbd-group"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.tagName).toBe("SPAN");
  });

  it("aplica classes de estilo do PRIZM no elemento kbd", () => {
    render(<Kbd>Enter</Kbd>);
    const kbd = screen.getByText("Enter");
    expect(kbd).toHaveClass("bg-muted", "text-muted-foreground", "rounded-sm");
  });

  it("aplica className no modo single key", () => {
    render(
      <Kbd className="custom-kbd" data-testid="single">
        X
      </Kbd>,
    );
    const kbd = screen.getByTestId("single");
    expect(kbd).toHaveClass("custom-kbd");
  });

  it("aplica className no wrapper quando keys é passado", () => {
    const { container } = render(
      <Kbd keys={["A", "B"]} className="custom-group" data-testid="group" />,
    );
    const wrapper = container.querySelector('[data-slot="kbd-group"]');
    expect(wrapper).toHaveClass("custom-group");
  });
});
