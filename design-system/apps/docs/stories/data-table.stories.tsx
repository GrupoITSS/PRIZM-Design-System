import { Button } from "@grupoitss/prizm-ui/button";
import { Checkbox } from "@grupoitss/prizm-ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import { ArrowUpDown, Ellipsis } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import type { MockPayment } from "./mocks/data-table.mock";
import { DataTable } from "@grupoitss/prizm-ui/table";
import { ContentRenderType } from "@grupoitss/prizm-ui/table";

const mockData: MockPayment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "3a2f8b1c",
    amount: 250,
    status: "success",
    email: "john@doe.com",
  },
  {
    id: "5d9c4e7a",
    amount: 75,
    status: "failed",
    email: "jane@smith.com",
  },
  {
    id: "8f1a2b3c",
    amount: 180,
    status: "success",
    email: "test@test.com",
  },
  {
    id: "9g2h4k5l",
    amount: 220,
    status: "pending",
    email: "user@domain.com",
  },
  {
    id: "1m3n5p7q",
    amount: 310,
    status: "success",
    email: "admin@site.com",
  },
  {
    id: "2r4t6v8x",
    amount: 95,
    status: "failed",
    email: "guest@mail.com",
  },
  {
    id: "3y5z7a9b",
    amount: 450,
    status: "processing",
    email: "support@help.com",
  },
  {
    id: "4c6e8g0h",
    amount: 160,
    status: "success",
    email: "info@company.com",
  },
  {
    id: "5i7k9m1n",
    amount: 270,
    status: "pending",
    email: "sales@shop.com",
  },
  {
    id: "6o8q0s2t",
    amount: 390,
    status: "success",
    email: "contact@business.com",
  },
];

const meta: Meta<typeof DataTable<MockPayment, unknown>> = {
  title: "Primários/DataTable",
  component: DataTable as React.ComponentType<
    React.ComponentProps<typeof DataTable<MockPayment, unknown>>
  >,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'DataTable do design system PRIZM — integração completa com **TanStack Table** para tabelas avançadas.\n\n**Features suportadas:**\n- ✅ Pagination (paginação de dados) — usa o componente <a href="?path=/story/prizm-components-pagination--default" target="_self">Pagination</a> em modo `iconsOnly`\n- ✅ Sorting (ordenação de colunas)\n- ✅ Filtering (filtro por coluna)\n- ✅ Column Visibility (toggle de colunas)\n- ✅ Row Selection (seleção com checkboxes)\n- ✅ Cell Formatting (formatação customizada)\n- ✅ Row Actions (ações por linha)\n\n**Documentação e API de referência:**\n- <a href="https://tanstack.com/table/latest" target="_blank" rel="noopener noreferrer">TanStack Table</a>\n- <a href="https://ui.shadcn.com/docs/components/data-table" target="_blank" rel="noopener noreferrer">Data Table — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<MockPayment, unknown>>;

/**
 * **1. Basic** — Tabela básica com TanStack Table.
 * Define colunas simples (accessorKey + header) e passa os dados.
 */
export const Basic: Story = {
  render: function BasicDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData.slice(0, 5)} />
      </div>
    );
  },
};

/**
 * **2. Pagination** — Paginação automática com o componente **Pagination** (modo `iconsOnly`).
 * Por padrão, pagina em blocos de 10 linhas. Ver também: PRIZM/v1/Pagination.
 */
export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Os controles de página são o componente **Pagination** em modo só ícones (Previous/Next). Ver [PRIZM/v1/Pagination](?path=/story/prizm-components-pagination--icons-only) para mais variantes.",
      },
    },
  },
  render: function PaginationDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData} showPagination />
      </div>
    );
  },
};

/**
 * **3. Sorting** — Ordenação de colunas.
 * Clique no header "Email" para alternar entre asc/desc/none.
 * Usa `column.toggleSorting()` e ícone ArrowUpDown.
 */
export const WithSorting: Story = {
  render: function SortingDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Email
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData.slice(0, 8)} />
      </div>
    );
  },
};

/**
 * **4. Filtering** — Filtro por coluna (email).
 * Input de busca que filtra a coluna "email" em tempo real.
 */
export const WithFiltering: Story = {
  render: function FilteringDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={mockData}
          showFilter
          filterColumn="email"
          filterPlaceholder="Filter emails..."
        />
      </div>
    );
  },
};

/**
 * **5. Column Visibility** — Toggle de visibilidade de colunas.
 * Dropdown "Columns" permite mostrar/ocultar colunas.
 */
export const WithColumnVisibility: Story = {
  render: function ColumnVisibilityDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData.slice(0, 5)} showColumnVisibility />
      </div>
    );
  },
};

/**
 * **6. Row Selection** — Seleção de linhas com checkboxes.
 * Checkbox no header seleciona todas as linhas da página.
 * Mostra contagem de linhas selecionadas.
 */
export const WithRowSelection: Story = {
  render: function RowSelectionDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={mockData.slice(0, 8)}
          enableRowSelection
          showSelectedCount
        />
      </div>
    );
  },
};

/**
 * **7. Cell Formatting** — Formatação customizada de células.
 * Coluna "Amount" formata valores como moeda USD e alinha à direita.
 */
export const WithCellFormatting: Story = {
  render: function CellFormattingDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);

          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData.slice(0, 5)} />
      </div>
    );
  },
};

/**
 * **8. Row Actions** — Ações contextuais por linha.
 * Coluna "actions" com dropdown (Copy ID, View customer, View details).
 * Acessa dados da linha via `row.original`.
 */
export const WithRowActions: Story = {
  render: function RowActionsDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);

          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    void navigator.clipboard.writeText(payment.id);
                  }}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData.slice(0, 5)} />
      </div>
    );
  },
};

/**
 * **9. Complete Example** — Todas as features ativadas.
 * Pagination + Sorting + Filtering + Column Visibility + Row Selection + Cell Formatting + Actions.
 * A paginação usa o componente **Pagination** (PRIZM/v1/Pagination).
 */
export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Inclui **Pagination** (iconsOnly) no rodapé. Ver [Pagination](?path=/story/prizm-components-pagination--default) para a API completa.",
      },
    },
  },
  render: function CompleteDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Email
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);

          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    void navigator.clipboard.writeText(payment.id);
                  }}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={mockData}
          showPagination
          showFilter
          filterColumn="email"
          filterPlaceholder="Filter emails..."
          showColumnVisibility
          enableRowSelection
          showSelectedCount
        />
      </div>
    );
  },
};

/**
 * **10. Empty State** — Mensagem customizada quando não há dados.
 */
export const Empty: Story = {
  render: function EmptyDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={[]} emptyMessage="No payments found." />
      </div>
    );
  },
};

/**
 * **11. PRIZM Meta Cell Renderers** — Usa `columnDef.meta.rows.contentRenderType`
 * (compatível com o Grid do assistant/cockpit) sem precisar definir `cell` manualmente.
 */
export const WithPrizmMetaCellRenderers: Story = {
  render: function WithPrizmMetaCellRenderers() {
    type Row = {
      id: string;
      status: string;
      company: { imageUrl?: string; text: string };
      tags: { id: string; name: string }[];
      summary: { summary: string; statusItems: { type: string; status: string; value: string }[] };
      plans: string;
    };

    const data: Row[] = [
      {
        id: "1",
        status: "PENDING",
        company: { imageUrl: "https://picsum.photos/64?1", text: "ACME" },
        tags: [
          { id: "t1", name: "Manutenção" },
          { id: "t2", name: "IA" },
          { id: "t3", name: "Debugging" },
        ],
        summary: {
          summary: "2/3",
          statusItems: [
            { type: "doc", status: "processed", value: "a" },
            { type: "doc", status: "error", value: "b" },
            { type: "doc", status: "processed", value: "c" },
          ],
        },
        plans: "2",
      },
    ];

    const columns: ColumnDef<Row>[] = [
      {
        accessorKey: "status",
        header: "Status",
        meta: { rows: { contentRenderType: ContentRenderType.STATUS } },
      },
      {
        accessorKey: "company",
        header: "Company",
        meta: {
          rows: { contentRenderType: ContentRenderType.TEXT_IMAGE, link: "/organization/:id" },
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        meta: { rows: { contentRenderType: ContentRenderType.BADGE, badgeMaxVisible: 2 } },
      },
      {
        accessorKey: "plans",
        header: "Plans",
        meta: {
          rows: {
            contentRenderType: ContentRenderType.HOVER,
            renderPopover: {
              title: "Plans",
              trigger: "hover",
              position: "bottom",
              content: ({ row }: { row: { original?: { company?: { text?: string } } } }) => (
                <div className="space-y-1">
                  <div className="text-sm font-medium">Organization</div>
                  <div className="text-sm text-muted-foreground">
                    {row.original?.company?.text ?? "—"}
                  </div>
                </div>
              ),
            },
          },
        },
      },
      {
        accessorKey: "summary",
        header: "Summary",
        meta: { rows: { contentRenderType: ContentRenderType.STATUS_SUMMARY_WITH_POPOVER } },
      },
    ];

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    );
  },
};
