import type { ColumnDef } from "@tanstack/react-table";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataTableWithFilters } from "./index";

type AccessRow = {
  id: string;
  name: string;
  group: string;
  role: string;
  status: string;
};

const rows: AccessRow[] = [
  { id: "1", name: "Ana", group: "Admin", role: "admin", status: "active" },
  { id: "2", name: "Bruno", group: "Ops", role: "user", status: "inactive" },
];

const columns: ColumnDef<AccessRow>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "group", header: "Grupo" },
  { accessorKey: "role", header: "Papel" },
  { accessorKey: "status", header: "Status" },
];

describe("DataTableWithFilters", () => {
  it("renderiza filtros e o botão Colunas", () => {
    render(
      <DataTableWithFilters
        columns={columns}
        data={rows}
        filters={[
          {
            id: "group",
            allLabel: "Todos os grupos",
            value: "",
            onChange: vi.fn(),
            options: [
              { value: "Admin", label: "Admin" },
              { value: "Ops", label: "Ops" },
            ],
          },
          {
            id: "object",
            allLabel: "Todos os objetos",
            value: "",
            onChange: vi.fn(),
            options: [],
          },
          {
            id: "role",
            allLabel: "Todos os papéis",
            value: "",
            onChange: vi.fn(),
            options: [
              { value: "admin", label: "Administrador" },
              { value: "user", label: "Usuário" },
            ],
          },
          {
            id: "status",
            allLabel: "Todos os status",
            value: "",
            onChange: vi.fn(),
            options: [
              { value: "active", label: "Ativo" },
              { value: "inactive", label: "Inativo" },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText("Todos os grupos")).toBeInTheDocument();
    expect(screen.getByText("Todos os objetos")).toBeInTheDocument();
    expect(screen.getByText("Todos os papéis")).toBeInTheDocument();
    expect(screen.getByText("Todos os status")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /colunas/i })).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Bruno")).toBeInTheDocument();
  });
});
