import { Button } from "@grupoitss/prizm-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import { Ellipsis } from "@grupoitss/prizm-ui/icons";
import { Input } from "@grupoitss/prizm-ui/input";
import { Popover } from "@grupoitss/prizm-ui/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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
    paymentStatus: "Pago",
    totalAmount: "R$ 250,00",
    paymentMethod: "Cartão de crédito",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendente",
    totalAmount: "R$ 150,00",
    paymentMethod: "Pix",
  },
  {
    invoice: "INV003",
    paymentStatus: "Não pago",
    totalAmount: "R$ 350,00",
    paymentMethod: "Transferência",
  },
  {
    invoice: "INV004",
    paymentStatus: "Pago",
    totalAmount: "R$ 450,00",
    paymentMethod: "Cartão de crédito",
  },
];

const invoiceColumns: TableColumn<InvoiceRow>[] = [
  {
    key: "invoice",
    header: "Fatura",
    width: "100px",
    cellClassName: "font-medium",
  },
  { key: "paymentStatus", header: "Status" },
  { key: "paymentMethod", header: "Forma de pagamento" },
  { key: "totalAmount", header: "Valor", align: "right" },
];

const invoiceFooter: TableFooterRow[] = [
  [
    { content: "Total", colSpan: 3 },
    { content: "R$ 2.500,00", align: "right" },
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
    // Nome longo de propósito (DS-81): em coluna estreita o badge corta com reticências, e o grupo
    // vira um botão que abre a lista com o nome inteiro.
    tags: [{ id: "t4", name: "Trial estendido até a renovação do contrato anual" }],
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

// Traceability: the Table components in [PRIZM] Componentes, the documentation frame and the CMS
// article. The token map lives next to the component (table.tokens.json) and is checked in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=27023-3613";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26381-2461";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=47362d42-e44e-4171-87f3-d91b3525e0e2&version=v1";

const meta: Meta<typeof Table<OrgRow>> = {
  title: "Primários/Table",
  component: Table,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com), com tokens PRIZM.\n\n" +
          "Tabela de dados em colunas, com cabeçalho, linhas, rodapé e legenda. API por props: `columns`, `rows`, `caption`, `footerRows` e `emptyMessage`. Para composição livre, as primitivas (`TableRoot`, `TableHeader`, `TableRow`…).\n\n" +
          "Renderizadores PRIZM (`contentRenderType` e `contentFormatType`), compatíveis com a meta API do Grid do Cockpit: `status`, `text-image`, `text-button`, `badge`, `hover`, `status-summary-with-popover` e formatos de CNPJ, CPF, data, moeda e outros.\n\n" +
          "Dê nome à tabela com `caption` ou `aria-label`. A Table ordena (`sortable` na coluna), pinta linhas em destaque (`isRowHighlighted`) e mostra o Empty quando não há linhas. Para filtrar, paginar ou selecionar, use o DataTable.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/table" target="_blank" rel="noopener noreferrer">Table — shadcn/ui</a>\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
    caption: { control: "text" },
    emptyMessage: { control: "text" },
    getSubRows: { control: false },
    isRowHighlighted: { control: false },
    defaultSort: { control: "object" },
    manualSort: { control: "boolean" },
    sort: { control: "object" },
    onSortChange: { control: false },
    defaultExpanded: { control: false },
    expanded: { control: false },
    onExpandedChange: { control: false },
    getRowKey: { control: false },
    footerRows: { control: false },
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
                className="size-8 text-muted-foreground"
                aria-label={`Ações de ${row.organization.text}`}
              >
                <Ellipsis className="size-4" />
              </Button>
            }
            content={
              <div className="flex min-w-[10rem] flex-col gap-0.5 py-1">
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Ver detalhes
                </button>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
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
    caption: "Faturas recentes.",
    footerRows: invoiceFooter,
    getRowKey: (row) => row.invoice,
  },
};

export const WithFooter: InvoiceStory = {
  args: {
    columns: invoiceColumns,
    rows: invoices.slice(0, 3),
    caption: "Faturas recentes.",
    footerRows: invoiceFooter,
    getRowKey: (row) => row.invoice,
  },
};

export const Empty: Story = {
  name: "Vazio",
  parameters: {
    docs: {
      description: {
        story:
          'Sem linhas, o Empty aparece numa linha da largura toda, abaixo do cabeçalho. `emptyMessage` troca o texto (padrão "Nenhum resultado.") ou o conteúdo inteiro. No Figma, Table com Show Empty. Decisão de 17/11/2026.',
      },
    },
  },
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
      { product: "Mouse sem fio", price: "R$ 129,90" },
      { product: "Teclado mecânico", price: "R$ 459,90" },
      { product: "Hub USB-C", price: "R$ 189,90" },
    ];

    const columns: TableColumn<ProductRow>[] = [
      { key: "product", header: "Produto", cellClassName: "font-medium" },
      { key: "price", header: "Preço", align: "right" },
      {
        key: "actions",
        header: "Ações",
        align: "right",
        render: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Ellipsis />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Duplicar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                Excluir
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
        header: "Empresa",
        contentRenderType: ContentRenderType.TEXT_IMAGE,
        link: "/organization/:id",
        width: "220px",
      },
      {
        key: "plans",
        header: "Planos",
        contentRenderType: ContentRenderType.HOVER,
        renderPopover: {
          title: "Planos",
          trigger: "click",
          position: "bottom",
          content: ({ row }) => (
            <div className="space-y-1">
              <div className="text-sm font-medium">Empresa</div>
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
        header: "Resumo",
        statusSummaryColumnHeaders: { type: "Tipo", item: "Item", status: "Status" },
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

type OrderItem = { id: string; nome: string; preco: number; planos?: OrderItem[] };

const orderItems: OrderItem[] = [
  {
    id: "produto-a",
    nome: "Produto A",
    preco: 0,
    planos: [
      { id: "basico", nome: "Plano Básico", preco: 100 },
      { id: "pro", nome: "Plano Pro", preco: 250 },
    ],
  },
  {
    id: "produto-b",
    nome: "Produto B",
    preco: 0,
    planos: [
      { id: "mensal", nome: "Mensal", preco: 200 },
      { id: "anual", nome: "Anual", preco: 400 },
    ],
  },
  { id: "produto-c", nome: "Produto C", preco: 80 },
];

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function OrderItemsTable() {
  const [qtd, setQtd] = useState<Record<string, number>>({
    basico: 2,
    pro: 1,
    mensal: 1,
    anual: 1,
    "produto-c": 3,
  });
  const leafTotal = (item: OrderItem) => item.preco * (qtd[item.id] ?? 0);
  const rowTotal = (item: OrderItem) =>
    item.planos ? item.planos.reduce((s, p) => s + leafTotal(p), 0) : leafTotal(item);
  const total = orderItems.reduce((s, i) => s + rowTotal(i), 0);

  const columns: TableColumn<OrderItem>[] = [
    { key: "nome", header: "Produto" },
    {
      key: "preco",
      header: "Preço",
      align: "right",
      render: (_, item, { subRows }) => (subRows ? "—" : brl(item.preco)),
    },
    {
      key: "qtd",
      header: "Quantidade",
      width: "120px",
      render: (_, item, { subRows }) =>
        subRows ? null : (
          <Input
            type="number"
            min={0}
            aria-label={`Quantidade de ${item.nome}`}
            value={qtd[item.id] ?? 0}
            onChange={(e) => setQtd({ ...qtd, [item.id]: Number(e.target.value) })}
          />
        ),
    },
    {
      key: "subtotal",
      header: "Subtotal",
      align: "right",
      cellClassName: "tabular-nums",
      render: (_, item) => brl(rowTotal(item)),
    },
  ];

  return (
    <Table<OrderItem>
      columns={columns}
      rows={orderItems}
      getRowKey={(r) => r.id}
      getSubRows={(r) => r.planos}
      defaultExpanded={["produto-a"]}
      caption="Itens do orçamento"
      footerRows={[
        [
          { content: "Total", colSpan: 3 },
          { content: <span aria-live="polite">{brl(total)}</span>, align: "right" },
        ],
      ]}
    />
  );
}

/**
 * Linhas que expandem (16/11/2026): itens do orçamento com quantidade por plano. A linha do
 * produto mostra a soma das sub-linhas; o total fica no rodapé.
 */
export const WithExpandableRows: Story = {
  name: "Linhas que expandem",
  render: () => <OrderItemsTable />,
};

type ProductRow = { id: string; produto: string; descricao: string; valor: number };

const productRows: ProductRow[] = [
  {
    id: "1",
    produto: "Plano Empresarial com suporte dedicado e integrações ilimitadas",
    descricao: "Inclui implantação, treinamento da equipe e suporte em horário estendido.",
    valor: 1290,
  },
  { id: "2", produto: "Plano Básico", descricao: "Para equipes pequenas.", valor: 100 },
  { id: "3", produto: "Plano Pro", descricao: "Relatórios e automações.", valor: 250 },
];

const productColumns: TableColumn<ProductRow>[] = [
  { key: "produto", header: "Produto", width: "220px" },
  { key: "descricao", header: "Descrição", wrap: true },
  {
    key: "valor",
    header: "Valor",
    align: "right",
    width: "120px",
    contentFormatType: ContentFormatType.CURRENCY,
  },
];

/**
 * Decisões de 17/11/2026: texto cortado numa linha por padrão, com Tooltip quando corta (passe o
 * ponteiro sobre o primeiro produto); `wrap` na coluna Descrição quebra. Valor à direita com
 * algarismos de largura fixa.
 */
export const TruncatedText: Story = {
  name: "Texto cortado e quebra",
  render: () => (
    <Table<ProductRow> columns={productColumns} rows={productRows} getRowKey={(r) => r.id} />
  ),
};

/** Ordenação: `sortable` na coluna. O cabeçalho vira botão, com `aria-sort`. Decisão de 17/11/2026. */
export const Sorting: Story = {
  name: "Ordenação",
  parameters: {
    docs: {
      description: {
        story:
          "`sortable: true` na coluna põe um botão no cabeçalho: o primeiro clique ordena em ordem crescente, o segundo em decrescente. `defaultSort` começa ordenado (aqui, Valor decrescente); `sort` e `onSortChange` controlam; com `manualSort`, a tabela não reordena (ordenação no servidor). No Figma, Table / Head com Show Sort.",
      },
    },
  },
  render: () => (
    <Table<ProductRow>
      aria-label="Produtos"
      columns={[
        { key: "produto", header: "Produto", width: "220px", sortable: true },
        { key: "descricao", header: "Descrição", wrap: true },
        {
          key: "valor",
          header: "Valor",
          align: "right",
          width: "140px",
          contentFormatType: ContentFormatType.CURRENCY,
          sortable: true,
        },
      ]}
      rows={productRows}
      getRowKey={(r) => r.id}
      defaultSort={{ key: "valor", direction: "desc" }}
    />
  ),
};

/** Alinhamento da coluna: esquerda (padrão), centro e direita. */
export const Alignment: Story = {
  name: "Alinhamento",
  parameters: {
    docs: {
      description: {
        story:
          "`align` alinha o cabeçalho e as células da coluna: `left` (padrão), `center` e `right`. À direita, os números usam algarismos de largura fixa. No Figma, Table / Head com Align e Table / Cell com Variant=Center ou Number.",
      },
    },
  },
  render: () => (
    <Table<{ id: string; produto: string; qtd: number; valor: number }>
      aria-label="Itens"
      columns={[
        { key: "produto", header: "Produto" },
        { key: "qtd", header: "Quantidade", align: "center", width: "140px" },
        {
          key: "valor",
          header: "Valor",
          align: "right",
          width: "140px",
          contentFormatType: ContentFormatType.CURRENCY,
        },
      ]}
      rows={[
        { id: "1", produto: "Licença anual", qtd: 2, valor: 1290 },
        { id: "2", produto: "Implantação", qtd: 1, valor: 250 },
        { id: "3", produto: "Treinamento", qtd: 12, valor: 480 },
      ]}
      getRowKey={(r) => r.id}
    />
  ),
};

/** Linha em destaque: `isRowHighlighted`, o mesmo nome do DataTable. */
export const RowHighlight: Story = {
  name: "Linha em destaque",
  parameters: {
    docs: {
      description: {
        story:
          "`isRowHighlighted` pinta o fundo da linha com `muted`, para diferenciar umas linhas das outras (aqui, o complemento de licença). O mesmo nome e o mesmo visual no DataTable. No Figma, Table / Cell com State=Selected.",
      },
    },
  },
  render: () => (
    <Table<{ id: string; codigo: string; licenca: string; preco: number; complemento?: boolean }>
      aria-label="Licenciamento"
      columns={[
        { key: "codigo", header: "Código", width: "140px" },
        { key: "licenca", header: "Licença" },
        {
          key: "preco",
          header: "Preço",
          align: "right",
          width: "140px",
          contentFormatType: ContentFormatType.CURRENCY,
        },
      ]}
      rows={[
        { id: "1", codigo: "P-1.01-S", licenca: "Simultâneo (padrão)", preco: 150 },
        { id: "2", codigo: "P-1.01-C", licenca: "Consulta", preco: 10, complemento: true },
        { id: "3", codigo: "P-1.02-S", licenca: "Simultâneo (padrão)", preco: 150 },
      ]}
      getRowKey={(r) => r.id}
      isRowHighlighted={(r) => r.complemento === true}
    />
  ),
};
