import { render, screen } from "@testing-library/react";
import type { ColumnDef } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";
import { DataTable, DataTableSelectionBar } from "./data-table";
import * as s from "./data-table.styles";
import map from "./data-table.tokens.json";

const cls = (c: string) => c.split(/\s+/);
const color = (token: string) =>
  token
    .replace(/^color\//, "")
    .split(",")[0]
    .trim();
/** `spacing/4` → `4`; `spacing/2-5` → `2.5`. */
const step = (token: string) =>
  token
    .replace(/^spacing\//, "")
    .split(" ")[0]
    .replace("-", ".");

type Row = { id: string; nome: string };
const rows: Row[] = [
  { id: "1", nome: "Ana" },
  { id: "2", nome: "Bruno" },
];
const columns: ColumnDef<Row>[] = [{ accessorKey: "nome", header: "Nome" }];

describe("DataTable × mapa de tokens (data-table.tokens.json)", () => {
  it("o mapa cobre as peças do Figma", () => {
    expect(Object.keys(map.parts).sort()).toEqual(
      [
        "root",
        "card",
        "toolbar",
        "selectionBar",
        "head",
        "cell",
        "sort",
        "groupRow",
        "summaryRow",
        "detail",
        "subRows",
        "editableCell",
        "loading",
        "empty",
        "error",
        "pagination",
        "sticky",
      ].sort(),
    );
    expect(Object.keys(map.states).sort()).toEqual(["expanded", "focus", "hover", "selected"]);
  });

  it("cabeçalho e célula como a Table", () => {
    expect(map.parts.head.height).toBe("height/10");
    expect(cls(s.dataTableHead)).toEqual(
      expect.arrayContaining(["h-10", `px-${step(map.parts.head.paddingX)}`, "text-foreground"]),
    );
    expect(map.parts.cell.minHeight).toMatch(/^52px \(h-13\)/);
    expect(cls(s.dataTableCell)).toEqual(
      expect.arrayContaining(["h-13", `p-${step(map.parts.cell.padding)}`]),
    );
    expect(cls(s.dataTableCellNumeric)).toContain("tabular-nums");
  });

  it("linha de grupo, resumo e detalhe", () => {
    expect(cls(s.dataTableGroupRow)).toEqual(
      expect.arrayContaining([
        `bg-${color(map.parts.groupRow.background)}`,
        `border-${color(map.parts.groupRow.border)}`,
      ]),
    );
    expect(cls(s.dataTableGroupCell)).toEqual(
      expect.arrayContaining(["h-10", `px-${step(map.parts.groupRow.paddingX)}`, "font-medium"]),
    );
    expect(cls(s.dataTableSummaryRow)).toEqual(expect.arrayContaining(["border-t", "bg-muted/50"]));
    expect(cls(s.dataTableExpandCell)).toContain("w-12");
    expect(cls(s.dataTableDetailCell)).toEqual(
      expect.arrayContaining([
        `pl-${step(map.parts.detail.paddingLeft)}`,
        `py-${step(map.parts.detail.paddingY)}`,
        `px-${step(map.parts.detail.paddingRight)}`,
      ]),
    );
  });

  it("carregando, linha clicável e coluna fixa", () => {
    expect(map.parts.loading.skeleton).toMatch(/^Skeleton height\/4/);
    expect(cls(s.dataTableSkeleton)).toEqual(expect.arrayContaining(["h-4", "max-w-40"]));
    expect(cls(s.dataTableRowClickable)).toEqual(
      expect.arrayContaining(["focus-visible:outline-2", "focus-visible:outline-ring"]),
    );
    expect(cls(s.dataTableStickyCell)).toEqual(
      expect.arrayContaining(["sticky", "bg-background", "[tr[data-state=selected]>&]:bg-accent"]),
    );
    expect(s.dataTableStickyEdgeLeft).toContain("var(--prizm-color-border)");
  });

  it("barra de seleção: muted, border, radius/xl, spacing/4 × spacing/2-5, spacing/3", () => {
    render(<DataTableSelectionBar count={2} entityName={{ one: "pedido", other: "pedidos" }} />);
    const bar = screen.getByRole("group");
    const sb = map.parts.selectionBar;
    expect(cls(bar.className)).toEqual(
      expect.arrayContaining([
        "rounded-xl",
        "border",
        `px-${step(sb.paddingX)}`,
        `py-${step(sb.paddingY)}`,
        `gap-${step(sb.gap)}`,
      ]),
    );
    expect(cls(bar.className)).toEqual(
      expect.arrayContaining([`bg-${color(sb.background)}`, `border-${color(sb.border)}`]),
    );
  });

  it("contêiner, cartão, vazio e rodapé com paginação", () => {
    const { container, rerender } = render(
      <DataTable columns={columns} data={rows} pagination={{ perPage: 1 }} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(cls(root.className)).toContain(`gap-${step(map.parts.root.gap)}`);

    const card = container.querySelector(".rounded-2xl") as HTMLElement;
    expect(cls(card.className)).toEqual(
      expect.arrayContaining([
        `bg-${color(map.parts.card.background)}`,
        `border-${color(map.parts.card.border)}`,
      ]),
    );

    const footer = container.querySelector('[data-slot="data-table-footer"]') as HTMLElement;
    const p = map.parts.pagination;
    expect(cls(footer.className)).toEqual(
      expect.arrayContaining([
        "border-t",
        `border-${color(p.border)}`,
        `bg-${color(p.background)}`,
        `px-${step(p.paddingX)}`,
        `py-${step(p.paddingY)}`,
      ]),
    );
    const count = footer.querySelector('[role="status"]') as HTMLElement;
    expect(cls(count.className)).toContain("text-muted-foreground");
    expect(footer.querySelector(".gap-3")).not.toBeNull();

    rerender(<DataTable columns={columns} data={[]} />);
    const empty = container.querySelector(".py-20") as HTMLElement;
    expect(empty).not.toBeNull();
    expect(cls(empty.className)).toEqual(
      expect.arrayContaining([
        `py-${step(map.parts.empty.paddingY)}`,
        `px-${step(map.parts.empty.paddingX)}`,
      ]),
    );
  });

  it("linha selecionada e linha pai aberta em accent", () => {
    expect(map.states.selected.background).toBe("color/accent");
    expect(map.states.expanded.background).toBe("color/accent");
    expect(map.states.selected.attribute).toBe("data-state=selected");
    expect(map.states.expanded.attribute).toBe("data-expanded=true");
  });
});
