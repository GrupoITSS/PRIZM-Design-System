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

  it("herda a cor do pai dentro do tooltip", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K")).toHaveClass(
      "[[data-slot=tooltip-content]_&]:bg-current/20",
      "[[data-slot=tooltip-content]_&]:text-current",
    );
  });

  it("muda de contexto só em botão cheio (default e destructive), como o Badge", () => {
    render(<Kbd>K</Kbd>);
    const kbd = screen.getByText("K");
    expect(kbd).toHaveClass(
      "[[data-slot=button][data-variant=default]_&]:bg-primary-foreground/20",
      "[[data-slot=button][data-variant=default]_&]:text-primary-foreground",
      "[[data-slot=button][data-variant=destructive]_&]:bg-destructive-foreground/20",
      "[[data-slot=button][data-variant=destructive]_&]:text-destructive-foreground",
    );
    // Em botão neutro mantém bg-muted: nenhuma regra genérica de button.
    expect(kbd.className).not.toContain("[[data-slot=button]_&]");
  });

  it("mostra o separador entre as teclas quando separator é passado", () => {
    const { container } = render(<Kbd keys={["Ctrl", "Alt", "B"]} separator="+" />);
    const group = container.querySelector('[data-slot="kbd-group"]');
    const seps = container.querySelectorAll('[data-slot="kbd-separator"]');
    expect(seps).toHaveLength(2);
    expect(group?.textContent).toBe("Ctrl+Alt+B");
    expect(seps[0]).toHaveClass("text-muted-foreground", "font-normal");
  });

  it("não mostra separador sem a prop separator", () => {
    const { container } = render(<Kbd keys={["⌘", "K"]} />);
    expect(container.querySelector('[data-slot="kbd-separator"]')).not.toBeInTheDocument();
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
