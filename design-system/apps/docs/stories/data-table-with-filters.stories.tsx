import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { DataTableWithFilters } from "@grupoitss/prizm-ui/table";

type AccessRow = {
  id: string;
  name: string;
  object: string;
  group: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

const mockRows: AccessRow[] = [
  {
    id: "1",
    name: "Ana Souza",
    object: "Assistant",
    group: "Administradores",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Bruno Lima",
    object: "Cockpit",
    group: "Operações",
    role: "user",
    status: "active",
  },
  {
    id: "3",
    name: "Carla Dias",
    object: "Assistant",
    group: "Operações",
    role: "user",
    status: "inactive",
  },
  {
    id: "4",
    name: "Diego Alves",
    object: "Cockpit",
    group: "Administradores",
    role: "admin",
    status: "inactive",
  },
];

const columns: ColumnDef<AccessRow>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "group", header: "Grupo" },
  { accessorKey: "object", header: "Objeto" },
  { accessorKey: "role", header: "Papel" },
  { accessorKey: "status", header: "Status" },
];

const meta: Meta<typeof DataTableWithFilters<AccessRow, unknown>> = {
  title: "Primários/DataTableWithFilters",
  component: DataTableWithFilters as React.ComponentType<
    React.ComponentProps<typeof DataTableWithFilters<AccessRow, unknown>>
  >,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "**DATA_TABLE_WITH_FILTERS** — DataTable com selects de filtro (Grupo, Objeto, Papel, Status) e botão **Colunas** para visibilidade.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTableWithFilters<AccessRow, unknown>>;

export const DATA_TABLE_WITH_FILTERS: Story = {
  render: function DataTableWithFiltersStory() {
    const [group, setGroup] = React.useState("");
    const [object, setObject] = React.useState("");
    const [role, setRole] = React.useState("");
    const [status, setStatus] = React.useState("");

    const data = mockRows.filter((row) => {
      if (group && row.group !== group) return false;
      if (object && row.object !== object) return false;
      if (role && row.role !== role) return false;
      if (status && row.status !== status) return false;
      return true;
    });

    return (
      <div className="container mx-auto py-10">
        <DataTableWithFilters
          columns={columns}
          data={data}
          showPagination
          emptyMessage="Nenhum resultado"
          filters={[
            {
              id: "group",
              allLabel: "Todos os grupos",
              value: group,
              onChange: setGroup,
              options: [
                { value: "Administradores", label: "Administradores" },
                { value: "Operações", label: "Operações" },
              ],
            },
            {
              id: "object",
              allLabel: "Todos os objetos",
              value: object,
              onChange: setObject,
              options: [
                { value: "Assistant", label: "Assistant" },
                { value: "Cockpit", label: "Cockpit" },
              ],
            },
            {
              id: "role",
              allLabel: "Todos os papéis",
              value: role,
              onChange: setRole,
              options: [
                { value: "admin", label: "Administrador" },
                { value: "user", label: "Usuário" },
              ],
            },
            {
              id: "status",
              allLabel: "Todos os status",
              value: status,
              onChange: setStatus,
              options: [
                { value: "active", label: "Ativo" },
                { value: "inactive", label: "Inativo" },
              ],
            },
          ]}
        />
      </div>
    );
  },
};
