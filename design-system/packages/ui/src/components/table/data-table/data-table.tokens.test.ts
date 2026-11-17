import { describe, expect, it } from "vitest";
import * as s from "./data-table.styles";
import map from "./data-table.tokens.json";

const cls = (c: string) => c.split(/\s+/);
const color = (token: string) => token.replace(/^color\//, "");

describe("DataTable × mapa de tokens (data-table.tokens.json)", () => {
  it("cabeçalho e célula como a Table", () => {
    expect(map.parts.head.height).toBe("height/10");
    expect(cls(s.dataTableHead)).toEqual(
      expect.arrayContaining(["h-10", "px-2", "text-foreground"]),
    );
    expect(map.parts.cell.minHeight).toMatch(/^52px \(h-13\)/);
    expect(cls(s.dataTableCell)).toEqual(expect.arrayContaining(["h-13", "p-2"]));
    expect(cls(s.dataTableCellNumeric)).toContain("tabular-nums");
  });

  it("linha em destaque: só o fundo muted", () => {
    expect(cls(s.dataTableRowHighlighted)).toContain(`bg-${color(map.highlighted.background)}`);
  });

  it("linha de grupo, resumo e detalhe", () => {
    expect(cls(s.dataTableGroupRow)).toContain(`bg-${color(map.parts.groupRow.background)}`);
    expect(cls(s.dataTableGroupCell)).toContain("h-10");
    expect(cls(s.dataTableSummaryRow)).toEqual(expect.arrayContaining(["border-t", "bg-muted/50"]));
    expect(cls(s.dataTableExpandCell)).toContain("w-12");
    expect(cls(s.dataTableDetailCell)).toContain("pl-14");
  });

  it("foco da linha clicável e coluna fixa", () => {
    expect(cls(s.dataTableRowClickable)).toEqual(
      expect.arrayContaining(["focus-visible:outline-2", "focus-visible:outline-ring"]),
    );
    expect(cls(s.dataTableStickyCell)).toEqual(expect.arrayContaining(["sticky", "bg-background"]));
    expect(s.dataTableStickyEdgeLeft).toContain("var(--prizm-color-border)");
  });
});
