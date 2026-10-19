import { Field, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Select } from "@grupoitss/prizm-ui/select";
import { DataTable } from "@grupoitss/prizm-ui/table";
import type { MockPayment } from "./mocks/data-table.mock";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Pagination } from "@grupoitss/prizm-ui/pagination";

const minimalTableData: MockPayment[] = [
  { id: "1", amount: 100, status: "pending", email: "a@x.com" },
  { id: "2", amount: 200, status: "success", email: "b@x.com" },
  { id: "3", amount: 300, status: "processing", email: "c@x.com" },
  { id: "4", amount: 400, status: "failed", email: "d@x.com" },
  { id: "5", amount: 500, status: "success", email: "e@x.com" },
  { id: "6", amount: 600, status: "pending", email: "f@x.com" },
  { id: "7", amount: 700, status: "success", email: "g@x.com" },
  { id: "8", amount: 800, status: "processing", email: "h@x.com" },
  { id: "9", amount: 900, status: "pending", email: "i@x.com" },
  { id: "10", amount: 1000, status: "success", email: "j@x.com" },
  { id: "11", amount: 1100, status: "failed", email: "k@x.com" },
];

const meta: Meta<typeof Pagination> = {
  title: "Primários/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Paginação do design system PRIZM. API 100% baseada em props: informe `page`, `totalPages` e opcionalmente `onPageChange` ou `getHref`. Suporta modo simples (apenas números), com prev/next, primeiro/último e modo só ícones (útil para tabelas).\n\n**Documentação de referência:** <a href="https://ui.shadcn.com/docs/components/pagination" target="_blank" rel="noopener noreferrer">Pagination — shadcn/ui</a>',
      },
    },
  },
  args: {
    page: 2,
    totalPages: 10,
    showPrevNext: true,
    showFirstLast: false,
    iconsOnly: false,
    siblingCount: 1,
    prevLabel: "Previous",
    nextLabel: "Next",
    firstLabel: "First",
    lastLabel: "Last",
    size: "default",
  },
  argTypes: {
    page: {
      control: { type: "number", min: 1 },
      description: "Current page (1-based)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    onPageChange: {
      action: "pageChange",
      description: "Called when user selects a page (SPA)",
    },
    showPrevNext: {
      control: "boolean",
      description: "Show Previous / Next buttons",
    },
    showFirstLast: {
      control: "boolean",
      description: "Show First / Last page buttons",
    },
    iconsOnly: {
      control: "boolean",
      description: "Only Previous and Next (no page numbers); useful for data tables",
    },
    siblingCount: {
      control: { type: "number", min: 0 },
      description: "Page numbers on each side of current before ellipsis",
    },
    size: {
      control: "select",
      options: ["default", "sm", "icon", "icon-sm"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/** Uso completo: prev, números com ellipsis, next. Equivalente ao exemplo "Usage" do shadcn (1, 2, 3, ..., next). */
export const Default: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(args.page ?? 2);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
  args: {
    page: 2,
    totalPages: 10,
  },
};

/** Apenas números de página, sem ellipsis (poucas páginas). Equivalente ao "Example Simple" do shadcn. */
export const Simple: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(args.page ?? 2);
    return <Pagination {...args} page={page} totalPages={5} onPageChange={setPage} />;
  },
  args: {
    page: 2,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Poucas páginas: 1 a 5, sem ellipsis.",
      },
    },
  },
};

/** Apenas botões Previous e Next, sem números. Útil para tabelas com seletor de linhas por página. */
export const IconsOnly: Story = {
  render: function IconsOnlyStory(args) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState("25");
    const totalPages = 10;
    return (
      <div className="flex items-center justify-between gap-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Rows per page</FieldLabel>
          <Select
            className="w-20"
            options={[
              { value: "10", label: "10" },
              { value: "25", label: "25" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
            value={rowsPerPage}
            onChange={(v) => v !== undefined && setRowsPerPage(v)}
            placeholder="Select"
          />
        </Field>
        <Pagination
          {...args}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          iconsOnly
          className="mx-0 w-auto"
        />
      </div>
    );
  },
  args: {
    iconsOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Apenas Previous e Next, sem números. Útil para data tables com seletor de linhas por página.",
      },
    },
  },
};

/** Com botões First e Last. */
export const WithFirstLast: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(args.page ?? 3);
    return (
      <Pagination {...args} page={page} totalPages={10} onPageChange={setPage} showFirstLast />
    );
  },
  args: {
    page: 3,
    totalPages: 10,
    showFirstLast: true,
  },
};

/** Navegação por links (SSR): usa `getHref` para gerar URLs. */
export const WithHref: Story = {
  render: (args) => <Pagination {...args} page={2} totalPages={10} getHref={(p) => `#page-${p}`} />,
  args: {
    getHref: (p: number) => `#page-${p}`,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando `getHref` é passado, os itens são renderizados como `<a href={...}>` para SSR ou navegação real.",
      },
    },
  },
};

/** Tamanho menor. */
export const SizeSm: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(2);
    return <Pagination {...args} page={page} totalPages={10} onPageChange={setPage} size="sm" />;
  },
  args: {
    size: "sm",
  },
};

/**
 * Pagination integrado ao DataTable (modo iconsOnly).
 * O DataTable usa este componente quando `showPagination` está ativo.
 */
export const InDataTable: Story = {
  render: function PaginationInDataTable() {
    const columns: ColumnDef<MockPayment>[] = [
      { accessorKey: "status", header: "Status" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "amount", header: "Amount" },
    ];
    return (
      <div className="container mx-auto max-w-2xl py-6">
        <DataTable columns={columns} data={minimalTableData} showPagination />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "O **DataTable** usa o componente Pagination em modo `iconsOnly` quando `showPagination={true}`. Ver [Table/DataTable](?path=/story/prizm-components-table-datatable--with-pagination) para a story completa.",
      },
    },
  },
};
