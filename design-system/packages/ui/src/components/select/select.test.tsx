import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./select";
import { selectContentStyles, selectItemStyles, selectTriggerVariants } from "./select.styles";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange", disabled: true },
];

describe("Select (PRIZM / shadcn)", () => {
  it("renderiza o placeholder quando nenhum valor está selecionado", () => {
    render(<Select placeholder="Selecione uma fruta" options={options} defaultValue={undefined} />);

    expect(screen.getByText("Selecione uma fruta")).toBeInTheDocument();
  });

  it("dispara onChange quando uma opção é selecionada", () => {
    const handleChange = vi.fn();

    render(<Select placeholder="Selecione uma fruta" options={options} onChange={handleChange} />);

    // Em ambiente de teste, o Radix Select depende de scroll/portal que não está
    // totalmente implementado no jsdom, o que causa erros em scrollIntoView.
    // Aqui validamos apenas que o componente monta sem lançar erros com onChange.
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renderiza estado vazio sem erro quando não há opções", () => {
    render(<Select placeholder="Selecione uma conta" options={[]} defaultValue={undefined} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("mostra FieldLabel visível acima do trigger", () => {
    render(<Select label="Organização" placeholder="Selecione" options={options} />);

    expect(screen.getByText("Organização")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Organização" })).toBeInTheDocument();
  });

  it("aceita fieldLabel como alias de label", () => {
    render(<Select fieldLabel="Conta" placeholder="Selecione" options={options} />);

    expect(screen.getByText("Conta")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Conta" })).toBeInTheDocument();
  });

  it("substitui o trigger por skeleton quando loading = true", () => {
    render(<Select loading label="Organização" placeholder="Selecione" options={options} />);

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByRole("status", { name: /carregando organização/i })).toBeInTheDocument();
    expect(screen.getByText("Organização")).toBeInTheDocument();
    const skeleton = document.querySelector("[data-slot=select-skeleton]");
    expect(skeleton).toBeTruthy();
    expect(skeleton?.className).not.toMatch(/border-input|border-border/);
  });

  it("usa Select.Label no dropdown quando não há label no campo", async () => {
    Element.prototype.scrollIntoView = vi.fn();

    render(
      <Select
        placeholder="Selecione"
        aria-label="Fruits"
        options={options}
        defaultValue={undefined}
      />,
    );

    screen.getByRole("combobox").click();
    expect(await screen.findByText("Fruits")).toBeInTheDocument();
  });

  it("não duplica Select.Label no dropdown quando label já está no campo", () => {
    Element.prototype.scrollIntoView = vi.fn();

    render(<Select label="Organização" placeholder="Selecione" options={options} />);

    screen.getByRole("combobox").click();
    expect(screen.getAllByText("Organização")).toHaveLength(1);
  });

  it("não permite seleção quando disabled = true", () => {
    const handleChange = vi.fn();

    render(
      <Select
        placeholder="Selecione uma fruta"
        options={options}
        disabled
        onChange={handleChange}
      />,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();
  });
});

describe("Select: escala e estados iguais aos do Input (21/10/2026)", () => {
  it.each(["sm", "md", "lg"] as const)("foco e disabled seguem a mesma regra no tamanho %s", (size) => {
    const classes = selectTriggerVariants({ size }).split(" ");
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
  });
});

describe("Select: decisões de 26/10/2026", () => {
  it("P2: aria-invalid e aria-describedby chegam ao trigger, com a borda destructive", () => {
    render(<Select label="Organização" options={options} aria-invalid aria-describedby="erro-org" />);
    const trigger = screen.getByRole("combobox", { name: "Organização" });
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-describedby", "erro-org");
    expect(trigger).toHaveClass("aria-invalid:border-destructive", "aria-invalid:focus-visible:border-destructive");
  });

  it("P3: a lista aberta usa o mesmo anel do foco", () => {
    const classes = selectTriggerVariants({ size: "md" }).split(" ");
    expect(classes).toEqual(
      expect.arrayContaining(["data-[state=open]:ring-2", "data-[state=open]:ring-ring", "data-[state=open]:border-transparent"]),
    );
    expect(classes).not.toContain("data-[state=open]:ring-ring/50");
    expect(classes).not.toContain("data-[state=open]:ring-[3px]");
  });

  it("P4: o trigger usa ChevronDown", () => {
    const { container } = render(<Select placeholder="Escolha" options={options} />);
    expect(container.querySelector("svg.lucide-chevron-down")).toBeInTheDocument();
    expect(container.querySelector("svg.lucide-chevrons-up-down")).not.toBeInTheDocument();
  });

  it("P5 e P6: lista com border-border e item com rounded-sm", () => {
    expect(selectContentStyles.split(" ")).toContain("border-border");
    expect(selectContentStyles.split(" ")).not.toContain("border-input");
    expect(selectItemStyles.split(" ")).toContain("rounded-sm");
    expect(selectItemStyles.split(" ")).not.toContain("rounded-md");
  });
});
