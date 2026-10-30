import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Combobox } from "./combobox";

const items = ["Next.js", "SvelteKit", "Nuxt.js"];

const grupo = (container: HTMLElement) =>
  container.querySelector<HTMLElement>("[data-slot=input-group]")!;

const chips = (container: HTMLElement) =>
  container.querySelector<HTMLElement>("[data-slot=combobox-chips]")!;

describe("Combobox (PRIZM / base-ui)", () => {
  it("renderiza input via API por props (items + placeholder)", () => {
    render(<Combobox items={items} placeholder="Escolha uma fruta" />);

    expect(screen.getByPlaceholderText("Escolha uma fruta")).toBeInTheDocument();
  });

  it("usa os padrões em pt-BR quando placeholder e emptyMessage não vêm", () => {
    render(<Combobox items={items} />);

    expect(screen.getByPlaceholderText("Selecionar…")).toBeInTheDocument();
  });
});

describe("Combobox: foco, erro e disabled seguem o Input (acessibilidade)", () => {
  it("foco: anel de 2px em ring (sem translucidez) e borda transparente", () => {
    const { container } = render(<Combobox items={items} placeholder="c" />);
    fireEvent.focus(screen.getByPlaceholderText("c"));
    const classes = [...grupo(container).classList];
    expect(classes).toEqual(expect.arrayContaining(["ring-2", "ring-ring", "border-transparent"]));
    expect(classes.some((c) => c.startsWith("ring-ring/") || c === "ring-3")).toBe(false);
  });

  it("erro com foco: borda destructive e o mesmo anel ring", () => {
    const { container } = render(<Combobox items={items} placeholder="c" aria-invalid />);
    const input = screen.getByPlaceholderText("c");
    expect(input).toHaveAttribute("aria-invalid", "true");
    fireEvent.focus(input);
    const classes = [...grupo(container).classList];
    expect(classes).toEqual(expect.arrayContaining(["ring-2", "ring-ring"]));
    expect(classes).toContain("has-[[data-slot][aria-invalid=true]]:border-destructive");
    expect(classes).not.toContain("border-transparent");
    expect(classes.some((c) => c.startsWith("ring-destructive"))).toBe(false);
  });

  it("disabled: opacidade 50% no grupo inteiro e disabled nativo no input", () => {
    const { container } = render(<Combobox items={items} placeholder="c" disabled />);
    const classes = [...grupo(container).classList];
    expect(classes).toContain("opacity-50");
    expect(screen.getByPlaceholderText("c")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Abrir opções" })).toBeDisabled();
  });

  it("aria-describedby chega ao input", () => {
    render(
      <>
        <span id="hint">erro</span>
        <Combobox items={items} placeholder="c" aria-invalid aria-describedby="hint" />
      </>,
    );
    expect(screen.getByPlaceholderText("c")).toHaveAttribute("aria-describedby", "hint");
  });
});

describe("Combobox: size", () => {
  it.each(["sm", "md", "lg"] as const)("size=%s vai para o input", (size) => {
    render(<Combobox items={items} placeholder="c" size={size} />);
    expect(screen.getByPlaceholderText("c")).toHaveAttribute("data-size", size);
  });
});

describe("Combobox: teclado (APG)", () => {
  it("ArrowDown abre, Enter escolhe, Esc fecha", () => {
    render(<Combobox items={items} placeholder="c" />);
    const input = screen.getByPlaceholderText("c");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input).toHaveValue("Next.js");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Combobox: valor controlado na seleção única", () => {
  it("mostra o value vindo de fora", () => {
    render(<Combobox items={items} value="SvelteKit" placeholder="c" />);

    expect(screen.getByPlaceholderText("c")).toHaveValue("SvelteKit");
  });

  it("chama onValueChange ao escolher e segue o estado do pai", () => {
    const escolhas: unknown[] = [];
    function Harness() {
      const [value, setValue] = useState<string | null>(null);
      return (
        <Combobox
          items={items}
          value={value}
          onValueChange={(nextValue) => {
            escolhas.push(nextValue);
            setValue(nextValue as string | null);
          }}
          placeholder="c"
        />
      );
    }
    render(<Harness />);
    const input = screen.getByPlaceholderText("c");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(escolhas).toEqual(["Next.js"]);
    expect(input).toHaveValue("Next.js");
  });
});

describe("Combobox: Multiple", () => {
  function Harness(props: { "aria-invalid"?: boolean; disabled?: boolean; size?: "sm" | "md" | "lg" }) {
    const [value, setValue] = useState<string[]>(["Next.js"]);
    return (
      <Combobox
        items={items}
        multiple
        value={value}
        onValueChange={(nextValue) => setValue(nextValue as string[])}
        placeholder="Adicionar"
        {...props}
      />
    );
  }

  it("foco: anel de 2px em ring, sem ring-3 nem ring/50", () => {
    const { container } = render(<Harness />);
    const classes = [...chips(container).classList];
    expect(classes.some((c) => c === "focus-within:ring-3" || c === "ring-3")).toBe(false);
    expect(classes.some((c) => c.includes("ring-ring/"))).toBe(false);
    fireEvent.focus(screen.getByPlaceholderText("Adicionar"));
    expect([...chips(container).classList]).toEqual(
      expect.arrayContaining(["ring-2", "ring-ring", "border-transparent"]),
    );
  });

  it("aria-invalid chega ao input e o anel de erro não é destructive/20", () => {
    const { container } = render(<Harness aria-invalid />);
    expect(screen.getByPlaceholderText("Adicionar")).toHaveAttribute("aria-invalid", "true");
    const classes = [...chips(container).classList];
    expect(classes).toContain("has-aria-invalid:border-destructive");
    expect(classes.some((c) => c.includes("ring-destructive"))).toBe(false);
    fireEvent.focus(screen.getByPlaceholderText("Adicionar"));
    expect([...chips(container).classList]).toEqual(expect.arrayContaining(["ring-2", "ring-ring"]));
    expect([...chips(container).classList]).not.toContain("border-transparent");
  });

  it("disabled: opacidade 50% na caixa e disabled nativo no input", () => {
    const { container } = render(<Harness disabled />);
    expect([...chips(container).classList]).toContain("opacity-50");
    expect(screen.getByPlaceholderText("Adicionar")).toBeDisabled();
  });

  it("o botão do chip inclui o valor no nome", () => {
    render(<Harness />);
    expect(screen.getByRole("button", { name: "Remover Next.js" })).toBeInTheDocument();
  });
});
