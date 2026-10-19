import { Button } from "@grupoitss/prizm-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import { MoreHorizontal } from "@grupoitss/prizm-ui/icons";
import { Popover } from "@grupoitss/prizm-ui/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentFormatType, ContentRenderType } from "@grupoitss/prizm-ui/table";
import type { TableColumn, TableFooterRow } from "@grupoitss/prizm-ui/table";
import { Table } from "@grupoitss/prizm-ui/table";

type InvoiceRow = {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
};

const invoices: InvoiceRow[] = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

const invoiceColumns: TableColumn<InvoiceRow>[] = [
  {
    key: "invoice",
    header: "Invoice",
    width: "100px",
    cellClassName: "font-medium",
  },
  { key: "paymentStatus", header: "Status" },
  { key: "paymentMethod", header: "Method" },
  { key: "totalAmount", header: "Amount", align: "right" },
];

const invoiceFooter: TableFooterRow[] = [
  [
    { content: "Total", colSpan: 3 },
    { content: "$2,500.00", align: "right" },
  ],
];

type OrgRow = {
  id: string;
  status: string;
  organization: { imageUrl?: string; text: string };
  document: string;
  createdAt: string;
  plans: string;
  tags: { id: string; name: string }[];
};

const organizations: OrgRow[] = [
  {
    id: "1",
    status: "ACTIVE",
    organization: {
      imageUrl: "https://picsum.photos/64?1",
      text: "ACME Corp",
    },
    document: "12345678000190",
    createdAt: "2024-03-12",
    plans: "3",
    tags: [
      { id: "t1", name: "Enterprise" },
      { id: "t2", name: "IA" },
      { id: "t3", name: "Brasil" },
    ],
  },
  {
    id: "2",
    status: "INACTIVE",
    organization: {
      imageUrl: "https://picsum.photos/64?2",
      text: "Globex Brasil",
    },
    document: "98765432000110",
    createdAt: "2023-11-02",
    plans: "1",
    tags: [{ id: "t4", name: "Trial" }],
  },
  {
    id: "3",
    status: "PENDING",
    organization: {
      text: "Initech",
    },
    document: "11222333000144",
    createdAt: "2025-01-18",
    plans: "0",
    tags: [
      { id: "t5", name: "Onboarding" },
      { id: "t6", name: "API" },
    ],
  },
];

const meta: Meta<typeof Table<OrgRow>> = {
  title: "Primários/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Tabela do design system PRIZM. API por props: `columns`, `rows`, `caption`, `footerRows`.\n\n" +
          "Renderizadores PRIZM (`contentRenderType` / `contentFormatType`) são **compatíveis com a meta API do Grid do Cockpit** " +
          "(STATUS, TEXT_IMAGE, BADGE, HOVER, TEXT_BUTTON, formatação CNPJ/CPF/data etc.).\n\n" +
          '**Referência:** <a href="https://ui.shadcn.com/docs/components/table" target="_blank" rel="noopener noreferrer">Table — shadcn/ui</a>',
      },
    },
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
    caption: { control: "text" },
    emptyMessage: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Table<OrgRow>>;
type InvoiceStory = StoryObj<typeof Table<InvoiceRow>>;

/**
 * Tabela no padrão de produto (listagem de organizações) —
 * STATUS, TEXT_IMAGE, CNPJ, DATE, BADGE e menu de ações.
 */
export const Default: Story = {
  render: function OrganizationsTable() {
    const columns: TableColumn<OrgRow>[] = [
      {
        key: "organization",
        header: "Organização",
        contentRenderType: ContentRenderType.TEXT_IMAGE,
        link: "/organization/:id",
        width: "240px",
      },
      {
        key: "status",
        header: "Status",
        contentRenderType: ContentRenderType.STATUS,
        statusLabels: {
          ACTIVE: "Ativo",
          INACTIVE: "Inativo",
          PENDING: "Pendente",
        },
        width: "120px",
      },
      {
        key: "document",
        header: "CNPJ",
        contentFormatType: ContentFormatType.CNPJ,
        width: "160px",
      },
      {
        key: "createdAt",
        header: "Criada em",
        contentFormatType: ContentFormatType.DATE,
        width: "120px",
      },
      {
        key: "plans",
        header: "Planos",
        contentRenderType: ContentRenderType.TEXT_BUTTON,
        onColumnClick: (id) => {
          console.log("plans click", id);
        },
        width: "90px",
      },
      {
        key: "tags",
        header: "Tags",
        contentRenderType: ContentRenderType.BADGE,
        badgeMaxVisible: 2,
        width: "220px",
      },
      {
        key: "actions",
        header: "",
        align: "right",
        width: "56px",
        render: (_, row) => (
          <Popover
            size="sm"
            align="end"
            trigger={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-[#6b7280]"
                aria-label={`Ações de ${row.organization.text}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
            content={
              <div className="flex min-w-[10rem] flex-col gap-0.5 py-1">
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm hover:bg-[#f3f4f6]"
                >
                  Ver detalhes
                </button>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm hover:bg-[#f3f4f6]"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm text-[#dc2626] hover:bg-[#fef2f2]"
                >
                  Inativar
                </button>
              </div>
            }
          />
        ),
      },
    ];

    return (
      <div className="w-full max-w-5xl">
        <Table<OrgRow>
          columns={columns}
          rows={organizations}
          getRowKey={(row) => row.id}
          emptyMessage="Nenhuma organização encontrada."
        />
      </div>
    );
  },
};

/** Exemplo clássico (invoices) — API básica sem renderizadores PRIZM. */
export const BasicInvoices: InvoiceStory = {
  args: {
    columns: invoiceColumns,
    rows: invoices,
    caption: "A list of your recent invoices.",
    footerRows: invoiceFooter,
    getRowKey: (row) => row.invoice,
  },
};

export const WithFooter: InvoiceStory = {
  args: {
    columns: invoiceColumns,
    rows: invoices.slice(0, 3),
    caption: "A list of your recent invoices.",
    footerRows: invoiceFooter,
    getRowKey: (row) => row.invoice,
  },
};

export const Empty: Story = {
  args: {
    columns: [
      { key: "organization", header: "Organização" },
      { key: "status", header: "Status" },
    ],
    rows: [],
    emptyMessage: "Nenhuma organização encontrada.",
  },
};

export const WithRowActions: Story = {
  render: function WithRowActionsStory() {
    type ProductRow = { product: string; price: string };
    const products: ProductRow[] = [
      { product: "Wireless Mouse", price: "$29.99" },
      { product: "Mechanical Keyboard", price: "$129.99" },
      { product: "USB-C Hub", price: "$49.99" },
    ];

    const columns: TableColumn<ProductRow>[] = [
      { key: "product", header: "Product", cellClassName: "font-medium" },
      { key: "price", header: "Price" },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        render: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];

    return <Table<ProductRow> columns={columns} rows={products} getRowKey={(row) => row.product} />;
  },
};

/** Renderizadores PRIZM: STATUS, TEXT_IMAGE, HOVER+popover, BADGE, STATUS_SUMMARY. */
export const WithPrizmCellRenderers: Story = {
  render: function WithPrizmCellRenderersStory() {
    type Row = {
      id: string;
      status: string;
      company: { imageUrl?: string; text: string };
      plans: string;
      tags: { id: string; name: string }[];
      summary: {
        summary: string;
        statusItems: { type: string; status: string; value: string }[];
      };
    };

    const rows: Row[] = [
      {
        id: "1",
        status: "PENDING",
        company: { imageUrl: "https://picsum.photos/64?1", text: "ACME" },
        plans: "2",
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
      },
      {
        id: "2",
        status: "COMPLETED",
        company: { imageUrl: "https://picsum.photos/64?2", text: "Globex" },
        plans: "0",
        tags: [{ id: "t4", name: "Tecnologia" }],
        summary: { summary: "0/0", statusItems: [] },
      },
    ];

    const columns: TableColumn<Row>[] = [
      {
        key: "status",
        header: "Status",
        contentRenderType: ContentRenderType.STATUS,
        statusLabels: { PENDING: "Aguardando", COMPLETED: "Processado" },
        width: "140px",
      },
      {
        key: "company",
        header: "Company",
        contentRenderType: ContentRenderType.TEXT_IMAGE,
        link: "/organization/:id",
        width: "220px",
      },
      {
        key: "plans",
        header: "Plans",
        contentRenderType: ContentRenderType.HOVER,
        renderPopover: {
          title: "Plans",
          trigger: "click",
          position: "bottom",
          content: ({ row }) => (
            <div className="space-y-1">
              <div className="text-sm font-medium">Company</div>
              <div className="text-sm text-muted-foreground">{row?.company?.text ?? "—"}</div>
            </div>
          ),
        },
        width: "100px",
      },
      {
        key: "tags",
        header: "Tags",
        contentRenderType: ContentRenderType.BADGE,
        badgeMaxVisible: 2,
        width: "280px",
      },
      {
        key: "summary",
        header: "Summary",
        contentRenderType: ContentRenderType.STATUS_SUMMARY_WITH_POPOVER,
        width: "120px",
      },
    ];

    return <Table<Row> columns={columns} rows={rows} getRowKey={(r) => r.id} />;
  },
};

/** Formatação de valores (CNPJ, CPF, telefone, moeda, %). */
export const WithFormatters: Story = {
  render: function FormattersStory() {
    type Row = {
      id: string;
      cnpj: string;
      cpf: string;
      phone: string;
      amount: number;
      ratio: number;
    };

    const rows: Row[] = [
      {
        id: "1",
        cnpj: "12345678000190",
        cpf: "12345678909",
        phone: "11999887766",
        amount: 1250.5,
        ratio: 84.5,
      },
      {
        id: "2",
        cnpj: "98765432000110",
        cpf: "98765432100",
        phone: "2133445566",
        amount: 99,
        ratio: 12,
      },
    ];

    const columns: TableColumn<Row>[] = [
      {
        key: "cnpj",
        header: "CNPJ",
        contentFormatType: ContentFormatType.CNPJ,
      },
      {
        key: "cpf",
        header: "CPF",
        contentFormatType: ContentFormatType.CPF,
      },
      {
        key: "phone",
        header: "Telefone",
        contentFormatType: ContentFormatType.PHONE,
      },
      {
        key: "amount",
        header: "Valor",
        contentFormatType: ContentFormatType.CURRENCY,
        align: "right",
      },
      {
        key: "ratio",
        header: "%",
        contentFormatType: ContentFormatType.PERCENTAGE,
        align: "right",
      },
    ];

    return <Table<Row> columns={columns} rows={rows} getRowKey={(r) => r.id} />;
  },
};
