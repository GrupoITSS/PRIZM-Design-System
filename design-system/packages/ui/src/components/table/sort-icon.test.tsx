import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ColumnDef } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";
import {
  ArrowDown,
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUp,
  ArrowUpDown,
} from "../icons";
import { DataTable, DataTableColumnHeader } from "./data-table";
import { getSortIcon } from "./sort-icon";
import { Table } from "./table";
import type { TableColumn } from "./table.types";

describe("getSortIcon", () => {
  it("sem direção, todo tipo usa ArrowUpDown", () => {
    for (const t of ["default", "text", "number"] as const) {
      expect(getSortIcon(t, false)).toBe(ArrowUpDown);
      expect(getSortIcon(t)).toBe(ArrowUpDown);
    }
  });

  it("default usa setas; text usa A–Z; number usa 0–1", () => {
    expect(getSortIcon(undefined, "asc")).toBe(ArrowUp);
    expect(getSortIcon("default", "desc")).toBe(ArrowDown);
    expect(getSortIcon("text", "asc")).toBe(ArrowDownAZ);
    expect(getSortIcon("text", "desc")).toBe(ArrowDownZA);
    expect(getSortIcon("number", "asc")).toBe(ArrowDown01);
    expect(getSortIcon("number", "desc")).toBe(ArrowDown10);
  });
});

type Row = { nome: string; valor: number };
const rows: Row[] = [
  { nome: "Banana", valor: 30 },
  { nome: "Abacate", valor: 5 },
];
const icon = (name: string) =>
  screen.getByRole("button", { name }).querySelector("svg");

describe("sortType na Table", () => {
  const cols: TableColumn<Row>[] = [
    { key: "nome", header: "Produto", sortable: true, sortType: "text" },
    {
      key: "valor",
      header: "Valor",
      align: "right",
      sortable: true,
      sortType: "number",
    },
    { key: "extra", header: "Extra", sortable: true },
  ];

  it("troca o ícone conforme o tipo e a direção", () => {
    render(<Table<Row> columns={cols} rows={rows as never} />);
    expect(icon("Produto")).toHaveClass("lucide-arrow-up-down");
    fireEvent.click(screen.getByRole("button", { name: "Produto" }));
    expect(icon("Produto")).toHaveClass("lucide-arrow-down-a-z");
    fireEvent.click(screen.getByRole("button", { name: "Produto" }));
    expect(icon("Produto")).toHaveClass("lucide-arrow-down-z-a");
    fireEvent.click(screen.getByRole("button", { name: "Valor" }));
    expect(icon("Valor")).toHaveClass("lucide-arrow-down-0-1");
    fireEvent.click(screen.getByRole("button", { name: "Valor" }));
    expect(icon("Valor")).toHaveClass("lucide-arrow-down-1-0");
    fireEvent.click(screen.getByRole("button", { name: "Extra" }));
    expect(icon("Extra")).toHaveClass("lucide-arrow-up");
  });
});

describe("sortType no DataTableColumnHeader", () => {
  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Produto"
          sortType="text"
        />
      ),
    },
    {
      accessorKey: "valor",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Valor"
          sortType="number"
        />
      ),
    },
  ];

  it("troca o ícone conforme o tipo e a direção", () => {
    render(<DataTable columns={columns} data={rows} />);
    fireEvent.click(screen.getByRole("button", { name: "Produto" }));
    expect(icon("Produto")).toHaveClass("lucide-arrow-down-a-z");
    fireEvent.click(screen.getByRole("button", { name: "Produto" }));
    expect(icon("Produto")).toHaveClass("lucide-arrow-down-z-a");
    fireEvent.click(screen.getByRole("button", { name: "Valor" }));
    expect(icon("Valor")).toHaveClass("lucide-arrow-down-0-1");
  });
});
