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

// Traceability: the component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (pagination.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=208-1651";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25825-2133";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=b5975f0a-93e8-4199-bc3c-722c27d5e187&version=v1";

const meta: Meta<typeof Pagination> = {
  title: "Primários/Pagination",
  component: Pagination,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Paginação do design system PRIZM. API 100% baseada em props: informe `page`, `totalPages` e opcionalmente `onPageChange` ou `getHref`. Os itens são o Button do Prizm: ghost nas páginas e nas setas, outline na página atual (`aria-current="page"`). Anterior/Próxima, Primeira/Última opcionais, `size` default · sm · icon · icon-sm (quadrados) e `iconsOnly` para tabelas.\n\n**Documentação de referência:** <a href="https://ui.shadcn.com/docs/components/pagination" target="_blank" rel="noopener noreferrer">Pagination — shadcn/ui</a>' +
          `\n\n[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
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
    showIcons: true,
    prevLabel: "Anterior",
    nextLabel: "Próxima",
    firstLabel: "Primeira",
    lastLabel: "Última",
    size: "default",
  },
  argTypes: {
    page: {
      control: { type: "number", min: 1 },
      description: "Página atual (começa em 1)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total de páginas",
    },
    onPageChange: {
      action: "pageChange",
      description: "Chamado ao escolher uma página (SPA)",
    },
    showPrevNext: {
      control: "boolean",
      description: "Mostra Anterior e Próxima",
    },
    showFirstLast: {
      control: "boolean",
      description: "Mostra Primeira e Última (com ChevronsLeft e ChevronsRight)",
    },
    iconsOnly: {
      control: "boolean",
      description: "Só as setas, com ícone, sem números; para tabelas",
    },
    showIcons: {
      control: "boolean",
      description: "Ícones nas setas e em Primeira/Última; false deixa só o texto",
    },
    siblingCount: {
      control: { type: "number", min: 0 },
      description: "Páginas de cada lado da atual antes das reticências",
    },
    size: {
      control: "select",
      options: ["default", "sm", "icon", "icon-sm"],
      description: "icon e icon-sm: números quadrados e setas só com ícone",
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

/** Tamanhos do Figma: icon e icon-sm deixam os números quadrados e as setas só com ícone. */
export const Sizes: Story = {
  name: "Tamanhos",
  render: function SizesStory() {
    const [page, setPage] = useState(2);
    return (
      <div className="flex flex-col items-center gap-4">
        {(["default", "sm", "icon", "icon-sm"] as const).map((size) => (
          <Pagination
            key={size}
            aria-label={`Paginação ${size}`}
            page={page}
            totalPages={10}
            onPageChange={setPage}
            size={size}
          />
        ))}
      </div>
    );
  },
};

/** showIcons={false}: Anterior, Próxima, Primeira e Última só com texto. */
export const SemIcones: Story = {
  name: "Sem ícones",
  render: function SemIconesStory() {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        page={page}
        totalPages={20}
        onPageChange={setPage}
        showFirstLast
        showIcons={false}
      />
    );
  },
};
