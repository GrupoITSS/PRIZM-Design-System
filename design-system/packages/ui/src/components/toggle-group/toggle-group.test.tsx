import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const status = [
  { value: "todos", label: "Todos" },
  { value: "ativos", label: "Ativos" },
  { value: "inativos", label: "Inativos" },
];

describe("ToggleGroup (PRIZM / Radix)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza itens via API de `items`, com o grupo nomeado", () => {
    render(<ToggleGroup aria-label="Status" items={status} />);

    // radix-ui 1.8+: a single-selection group is exposed as a radiogroup.
    expect(screen.getByRole("radiogroup", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Todos" })).toBeInTheDocument();
  });

  it("aplica orientação e espaçamento via props na raiz", () => {
    render(
      <ToggleGroup
        aria-label="Posição"
        type="single"
        orientation="vertical"
        spacing={2}
        items={[{ value: "top", label: "Topo" }]}
      />,
    );

    const root = screen.getByRole("radiogroup");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root.className).toContain("flex-col");
    expect(root.className).toContain("gap-2");
  });

  it("cola os itens por padrão: outline, sem gap, cantos só nas pontas (TG2 e P2)", () => {
    render(<ToggleGroup aria-label="Status" items={status} />);

    const root = screen.getByRole("radiogroup");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root.className).toContain("gap-0");
    expect(root.className).toContain("w-fit");
    const item = screen.getByRole("radio", { name: "Ativos" });
    expect(item).toHaveClass("rounded-none", "first:rounded-l-md", "last:rounded-r-md", "border-l-0", "first:border-l", "focus-visible:z-10");
  });

  it("com spacing maior, os itens ficam separados e com os cantos todos", () => {
    render(<ToggleGroup aria-label="Status" spacing={2} items={status} />);

    const item = screen.getByRole("radio", { name: "Ativos" });
    expect(item).not.toHaveClass("rounded-none");
    expect(item).toHaveClass("rounded-md");
  });

  it("com fullWidth, ocupa a largura e os itens dividem o espaço (TG9)", () => {
    render(<ToggleGroup aria-label="Status" fullWidth items={status} />);

    expect(screen.getByRole("radiogroup").className).toContain("w-full");
    expect(screen.getByRole("radio", { name: "Todos" })).toHaveClass("flex-1");
  });

  it("com required, o item ligado não desliga, sem value (TG8)", () => {
    render(<ToggleGroup aria-label="Status" required defaultValue="todos" items={status} />);

    const todos = screen.getByRole("radio", { name: "Todos" });
    fireEvent.click(todos);
    expect(todos).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-required", "true");

    fireEvent.click(screen.getByRole("radio", { name: "Ativos" }));
    expect(screen.getByRole("radio", { name: "Ativos" })).toHaveAttribute("aria-checked", "true");
    expect(todos).toHaveAttribute("aria-checked", "false");
  });

  it("com required e value, não chama onValueChange com valor vazio", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup aria-label="Status" required value="todos" onValueChange={onValueChange} items={status} />,
    );

    fireEvent.click(screen.getByRole("radio", { name: "Todos" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("sem required, o item ligado desliga e o grupo fica vazio", () => {
    render(<ToggleGroup aria-label="Status" defaultValue="todos" items={status} />);

    const todos = screen.getByRole("radio", { name: "Todos" });
    fireEvent.click(todos);
    expect(todos).toHaveAttribute("aria-checked", "false");
  });

  it("type=\"multiple\" vira toolbar, com aria-pressed nos itens", () => {
    render(
      <ToggleGroup
        aria-label="Formatação"
        type="multiple"
        defaultValue={["negrito"]}
        items={[
          { value: "negrito", label: "Negrito" },
          { value: "italico", label: "Itálico" },
        ]}
      />,
    );

    expect(screen.getByRole("toolbar", { name: "Formatação" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Negrito" })).toHaveAttribute("aria-pressed", "true");
  });

  it("item só de ícone usa aria-label e não mostra o value (TG6)", () => {
    render(
      <ToggleGroup
        aria-label="Formatação"
        type="multiple"
        items={[{ value: "bold", icon: <svg aria-hidden="true" />, "aria-label": "Negrito" }]}
      />,
    );

    const item = screen.getByRole("button", { name: "Negrito" });
    expect(item).not.toHaveTextContent("bold");
  });

  it("aceita ariaLabel como alias de aria-label", () => {
    render(
      <ToggleGroup
        aria-label="Formatação"
        type="multiple"
        items={[{ value: "italic", icon: <svg aria-hidden="true" />, ariaLabel: "Itálico" }]}
      />,
    );

    expect(screen.getByRole("button", { name: "Itálico" })).toBeInTheDocument();
  });

  it("item ligado em primary e tamanho em control-height", () => {
    render(<ToggleGroup aria-label="Status" size="sm" defaultValue="todos" items={status} />);

    const item = screen.getByRole("radio", { name: "Todos" });
    expect(item).toHaveClass("data-[state=on]:bg-primary", "h-control-height-sm", "bg-input-background");
  });

  it("avisa no console quando o grupo não tem nome (pendência 1)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<ToggleGroup items={status} />);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("ToggleGroup: grupo sem nome"));
  });

  it("avisa no console quando o item só de ícone não tem nome (pendência 2)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<ToggleGroup aria-label="Formatação" type="multiple" items={[{ value: "bold", icon: <svg aria-hidden="true" /> }]} />);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("ToggleGroup: item só de ícone sem nome"));
  });

  it("ToggleGroupItem recebe variante, tamanho e espaçamento do grupo (TG7)", () => {
    render(
      <ToggleGroup aria-label="Status" size="lg">
        <ToggleGroupItem value="todos">Todos</ToggleGroupItem>
        <ToggleGroupItem value="ativos">Ativos</ToggleGroupItem>
      </ToggleGroup>,
    );

    const item = screen.getByRole("radio", { name: "Ativos" });
    expect(item).toHaveAttribute("data-variant", "outline");
    expect(item).toHaveAttribute("data-size", "lg");
    expect(item).toHaveClass("h-control-height-lg", "rounded-none", "border-l-0");
  });
});
