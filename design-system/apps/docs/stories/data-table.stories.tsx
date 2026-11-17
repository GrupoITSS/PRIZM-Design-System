import { Button } from "@grupoitss/prizm-ui/button";
import { Download, Trash2 } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ContentRenderType,
  DataTable,
  DataTableColumnHeader,
  DataTableEditableCell,
  type DataTableRowEmphasis,
  type DataTableStatusFilterValue,
} from "@grupoitss/prizm-ui/table";
import * as React from "react";

/*
 * Textos em português, como no produto. No Figma, os textos de exemplo ficam em inglês.
 * Um conjunto de dados para todas as stories: as propostas comerciais e os itens de uma proposta.
 */

type PropostaLinha = {
  id: string;
  cliente: string;
  responsavel: string;
  situacao: "Rascunho" | "Enviada" | "Aprovada" | "Recusada" | "Vencida";
  categoria: string;
  descricao: string;
  valor: number;
  ativa: boolean;
  itens?: string[];
};

const propostas: PropostaLinha[] = [
  {
    id: "P-1042",
    cliente: "Clínica Bem Viver Ltda. – unidade Setor Bueno",
    responsavel: "Ana Souza",
    situacao: "Aprovada",
    categoria: "Saúde",
    descricao: "Licença anual para 200 usuários, com implantação e treinamento em duas turmas.",
    valor: 18900,
    ativa: true,
    itens: ["Licença anual · 200 usuários", "Implantação", "Treinamento · 2 turmas"],
  },
  {
    id: "P-1043",
    cliente: "Construtora Horizonte",
    responsavel: "Bruno Lima",
    situacao: "Enviada",
    categoria: "Construção",
    descricao: "Módulo de obras.",
    valor: 7400,
    ativa: true,
  },
  {
    id: "P-1044",
    cliente: "Escola Aprender Mais",
    responsavel: "Carla Dias",
    situacao: "Vencida",
    categoria: "Educação",
    descricao: "Renovação do contrato de 2025, com reajuste pelo IPCA.",
    valor: 5200,
    ativa: false,
  },
  {
    id: "P-1045",
    cliente: "Hospital São Lucas",
    responsavel: "Ana Souza",
    situacao: "Rascunho",
    categoria: "Saúde",
    descricao: "Integração com o prontuário eletrônico.",
    valor: 32500,
    ativa: true,
    itens: ["Integração HL7", "Suporte estendido"],
  },
  {
    id: "P-1046",
    cliente: "Mercado Bom Preço",
    responsavel: "Diego Alves",
    situacao: "Recusada",
    categoria: "Varejo",
    descricao: "Plano básico para cinco lojas.",
    valor: 2900,
    ativa: false,
  },
  {
    id: "P-1047",
    cliente: "Colégio Santa Clara",
    responsavel: "Carla Dias",
    situacao: "Aprovada",
    categoria: "Educação",
    descricao: "Portal do aluno e app.",
    valor: 9800,
    ativa: true,
  },
  {
    id: "P-1048",
    cliente: "Laboratório Vida",
    responsavel: "Bruno Lima",
    situacao: "Enviada",
    categoria: "Saúde",
    descricao: "Laudos on-line.",
    valor: 6100,
    ativa: true,
  },
  {
    id: "P-1049",
    cliente: "Loja Casa & Cia",
    responsavel: "Diego Alves",
    situacao: "Aprovada",
    categoria: "Varejo",
    descricao: "Frente de caixa.",
    valor: 4300,
    ativa: true,
  },
  {
    id: "P-1050",
    cliente: "Faculdade Alfa",
    responsavel: "Ana Souza",
    situacao: "Enviada",
    categoria: "Educação",
    descricao: "Secretaria acadêmica.",
    valor: 21000,
    ativa: true,
  },
  {
    id: "P-1051",
    cliente: "Edifício Jardins",
    responsavel: "Bruno Lima",
    situacao: "Rascunho",
    categoria: "Construção",
    descricao: "Gestão do condomínio.",
    valor: 1800,
    ativa: true,
  },
  {
    id: "P-1052",
    cliente: "Farmácia Saúde Já",
    responsavel: "Carla Dias",
    situacao: "Aprovada",
    categoria: "Varejo",
    descricao: "Estoque e PDV.",
    valor: 5600,
    ativa: true,
  },
  {
    id: "P-1053",
    cliente: "Clínica Sorriso",
    responsavel: "Diego Alves",
    situacao: "Vencida",
    categoria: "Saúde",
    descricao: "Agenda on-line.",
    valor: 1500,
    ativa: false,
  },
];

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Colunas simples, sem nada além de texto. */
const colunasBasicas: ColumnDef<PropostaLinha>[] = [
  { accessorKey: "id", header: "Proposta", size: 110 },
  { accessorKey: "cliente", header: "Cliente", size: 260 },
  { accessorKey: "responsavel", header: "Responsável", size: 160 },
  { accessorKey: "situacao", header: "Situação", size: 140 },
  {
    accessorKey: "valor",
    header: "Valor",
    size: 140,
    cell: ({ getValue }) => brl(getValue<number>()),
    meta: { prizm: { cellAlign: "right" } },
  },
];

/** As mesmas colunas, com ordenação em Cliente e Valor. */
const colunasOrdenaveis: ColumnDef<PropostaLinha>[] = [
  { accessorKey: "id", header: "Proposta", size: 110, enableSorting: false },
  {
    accessorKey: "cliente",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
    size: 260,
  },
  { accessorKey: "responsavel", header: "Responsável", size: 160, enableSorting: false },
  { accessorKey: "situacao", header: "Situação", size: 140, enableSorting: false },
  {
    accessorKey: "valor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Valor" />,
    size: 140,
    cell: ({ getValue }) => brl(getValue<number>()),
    meta: { prizm: { cellAlign: "right" } },
  },
];

const meta: Meta<typeof DataTable<PropostaLinha, unknown>> = {
  title: "Primários/DataTable",
  component: DataTable as React.ComponentType<
    React.ComponentProps<typeof DataTable<PropostaLinha, unknown>>
  >,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Figma: [Data Table](https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=27334-3118) · Artigo: [DataTable no CMS](https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=97dd20dc-cd4c-42ef-a25c-cb4e45ac6281&version=v1)\n\n" +
          "Tabela de dados com **TanStack Table**: ordenação, busca e filtros, seleção, paginação, colunas visíveis, linha clicável, ênfase, grupos, resumo, detalhe, célula editável, carregando, vazio, erro e colunas fixas. Usa a Table por dentro, com o mesmo cabeçalho, célula e altura de linha. " +
          "Para mostrar dados sem ordenar, filtrar nem paginar, use a [Table](?path=/docs/primários-table--docs).\n\n" +
          "Cada story abaixo mostra uma possibilidade. A story **Proposta** junta várias, como numa tela de verdade.\n\n" +
          'Referências: <a href="https://tanstack.com/table/latest" target="_blank" rel="noopener noreferrer">TanStack Table</a> · <a href="https://ui.shadcn.com/docs/components/data-table" target="_blank" rel="noopener noreferrer">Data Table — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<PropostaLinha, unknown>>;

const story = (text: string) => ({ docs: { description: { story: text } } });

/* ------------------------------------------------------------------------------------------- *
 * Básico e dados
 * ------------------------------------------------------------------------------------------- */

export const Basic: Story = {
  name: "Básico",
  parameters: story(
    "Colunas com `accessorKey` e `header`, e os dados em `data`. Texto longo corta numa linha, com Tooltip quando corta. Dê nome à tabela com `aria-label`.",
  ),
  render: () => (
    <DataTable<PropostaLinha, unknown>
      aria-label="Propostas"
      columns={[
        { accessorKey: "id", header: "Proposta" },
        { accessorKey: "cliente", header: "Cliente" },
        { accessorKey: "responsavel", header: "Responsável" },
        { accessorKey: "situacao", header: "Situação" },
      ]}
      data={propostas.slice(0, 5)}
    />
  ),
};

export const WithCellFormatting: Story = {
  name: "Formato e alinhamento",
  parameters: story(
    'O `cell` da coluna formata o valor (moeda, data). `meta.prizm.cellAlign: "right"` alinha o cabeçalho e as células à direita, com algarismos de largura fixa. Alinhe à direita números que se comparam.',
  ),
  render: () => (
    <DataTable aria-label="Propostas" columns={colunasBasicas} data={propostas.slice(0, 5)} />
  ),
};

export const TruncatedText: Story = {
  name: "Texto cortado e quebra",
  parameters: story(
    "Por padrão, o texto corta numa linha e o Tooltip mostra o texto inteiro, só quando corta. `meta.prizm.wrap: true` quebra a linha: use em descrição e observação.",
  ),
  render: () => (
    <DataTable<PropostaLinha, unknown>
      aria-label="Propostas"
      columns={[
        { accessorKey: "cliente", header: "Cliente (corta)", size: 220 },
        {
          accessorKey: "descricao",
          header: "Descrição (quebra)",
          size: 320,
          meta: { prizm: { wrap: true } },
        },
        {
          accessorKey: "valor",
          header: "Valor",
          size: 140,
          cell: ({ getValue }) => brl(getValue<number>()),
          meta: { prizm: { cellAlign: "right" } },
        },
      ]}
      data={propostas.slice(0, 4)}
    />
  ),
};

export const WithPrizmMetaCellRenderers: Story = {
  name: "Renderizadores do Prizm",
  parameters: story(
    "`meta.rows.contentRenderType` (ou `meta.prizm`) usa os renderizadores da Table, compatíveis com o Grid do Cockpit, sem escrever `cell`: status, imagem com texto, badges, painel no hover e resumo de status.",
  ),
  render: function RenderizadoresStory() {
    type Linha = {
      id: string;
      status: string;
      empresa: { imageUrl?: string; text: string };
      tags: { id: string; name: string }[];
      resumo: { summary: string; statusItems: { type: string; status: string; value: string }[] };
      planos: string;
    };
    const dados: Linha[] = [
      {
        id: "1",
        status: "ACTIVE",
        empresa: { imageUrl: "https://picsum.photos/64?1", text: "Clínica Bem Viver" },
        tags: [
          { id: "t1", name: "Manutenção" },
          { id: "t2", name: "IA" },
          { id: "t3", name: "Integrações" },
        ],
        resumo: {
          summary: "2/3",
          statusItems: [
            { type: "Documento", status: "processed", value: "Contrato" },
            { type: "Documento", status: "error", value: "Aditivo" },
            { type: "Documento", status: "processed", value: "Proposta" },
          ],
        },
        planos: "2",
      },
    ];
    const colunas: ColumnDef<Linha>[] = [
      {
        accessorKey: "status",
        header: "Status",
        meta: { rows: { contentRenderType: ContentRenderType.STATUS } },
      },
      {
        accessorKey: "empresa",
        header: "Empresa",
        meta: {
          rows: { contentRenderType: ContentRenderType.TEXT_IMAGE, link: "/empresas/:id" },
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        meta: { rows: { contentRenderType: ContentRenderType.BADGE, badgeMaxVisible: 2 } },
      },
      {
        accessorKey: "planos",
        header: "Planos",
        meta: {
          rows: {
            contentRenderType: ContentRenderType.HOVER,
            renderPopover: {
              title: "Planos",
              trigger: "hover",
              position: "bottom",
              content: ({ row }: { row: { original?: { empresa?: { text?: string } } } }) => (
                <div className="space-y-1">
                  <div className="text-sm font-medium">Empresa</div>
                  <div className="text-sm text-muted-foreground">
                    {row.original?.empresa?.text ?? "—"}
                  </div>
                </div>
              ),
            },
          },
        },
      },
      {
        accessorKey: "resumo",
        header: "Documentos",
        meta: { rows: { contentRenderType: ContentRenderType.STATUS_SUMMARY_WITH_POPOVER } },
      },
    ];
    return (
      <DataTable
        aria-label="Empresas"
        columns={colunas}
        data={dados}
        statusLabels={{ ACTIVE: "Ativa" }}
      />
    );
  },
};

/* ------------------------------------------------------------------------------------------- *
 * Ordenar, buscar, filtrar, paginar
 * ------------------------------------------------------------------------------------------- */

export const WithSorting: Story = {
  name: "Ordenação",
  parameters: story(
    "`DataTableColumnHeader` no `header` da coluna: o primeiro clique ordena em ordem crescente, o segundo em decrescente, e o cabeçalho ganha `aria-sort`. Aqui a tabela começa ordenada por Valor, decrescente (`defaultSorting`). Coluna sem ordenação: `enableSorting: false`.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasOrdenaveis}
      data={propostas.slice(0, 6)}
      defaultSorting={[{ id: "valor", desc: true }]}
    />
  ),
};

export const ServerSorting: Story = {
  name: "Ordenação no servidor",
  parameters: story(
    "Com `manualSorting`, a tabela não reordena `data`: avisa a mudança por `onSortingChange`, e quem busca os dados ordena. A ordem atual fica em `sorting`.",
  ),
  render: function OrdenacaoServidorStory() {
    const [sorting, setSorting] = React.useState<{ id: string; desc: boolean }[]>([]);
    const dados = React.useMemo(() => {
      const s = sorting[0];
      if (!s) return propostas.slice(0, 6);
      const key = s.id as keyof PropostaLinha;
      return [...propostas.slice(0, 6)].sort((a, b) =>
        (a[key] as number | string) > (b[key] as number | string) === s.desc ? -1 : 1,
      );
    }, [sorting]);
    return (
      <div className="flex flex-col gap-2">
        <DataTable
          aria-label="Propostas"
          columns={colunasOrdenaveis}
          data={dados}
          manualSorting
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {sorting[0]
            ? `Pedido ao servidor: ${sorting[0].id}, ${sorting[0].desc ? "decrescente" : "crescente"}`
            : "Sem ordenação."}
        </p>
      </div>
    );
  },
};

export const WithFiltering: Story = {
  name: "Busca por coluna",
  parameters: story(
    "`showFilter` e `filterColumn` põem um campo de busca que filtra uma coluna, na hora, no navegador.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={propostas}
      showFilter
      filterColumn="cliente"
      filterPlaceholder="Buscar cliente..."
    />
  ),
};

export const ToolbarFilters: Story = {
  name: "Filtros na toolbar",
  parameters: story(
    "`toolbarFilters` (busca com espera de 350 ms e status Ativos, Inativos e Todos) e `filters` (selects próprios). O filtro em si é do produto: a tabela só mostra os campos e avisa as mudanças.",
  ),
  render: function FiltrosStory() {
    const [busca, setBusca] = React.useState("");
    const [status, setStatus] = React.useState<DataTableStatusFilterValue>("active");
    const [responsavel, setResponsavel] = React.useState("");
    const dados = propostas.filter(
      (p) =>
        (status === "all" || p.ativa === (status === "active")) &&
        (!responsavel || p.responsavel === responsavel) &&
        p.cliente.toLowerCase().includes(busca.toLowerCase()),
    );
    return (
      <DataTable
        aria-label="Propostas"
        columns={colunasBasicas}
        data={dados}
        toolbarFilters={[
          { type: "search", placeholder: "Buscar cliente", value: busca, onChange: setBusca },
          { type: "status", value: status, onChange: setStatus },
        ]}
        filters={[
          {
            id: "responsavel",
            label: "Responsável",
            allLabel: "Todos os responsáveis",
            value: responsavel,
            onChange: setResponsavel,
            options: ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Alves"].map((n) => ({
              value: n,
              label: n,
            })),
          },
        ]}
      />
    );
  },
};

export const WithPagination: Story = {
  name: "Paginação",
  parameters: story(
    '`showPagination` pagina no navegador, de 10 em 10, com a contagem e "Página X de Y". Os botões são o Button outline `icon`, como no Figma.',
  ),
  render: () => (
    <DataTable aria-label="Propostas" columns={colunasBasicas} data={propostas} showPagination />
  ),
};

export const ServerPagination: Story = {
  name: "Paginação no servidor",
  parameters: story(
    "`pagination` recebe a página, o total e `onPageChange`: a tabela mostra a página que o produto buscou. Use com `isLoading` enquanto a próxima página chega.",
  ),
  render: function PaginacaoServidorStory() {
    const porPagina = 5;
    const [pagina, setPagina] = React.useState(1);
    const total = propostas.length;
    return (
      <DataTable
        aria-label="Propostas"
        columns={colunasBasicas}
        data={propostas.slice((pagina - 1) * porPagina, pagina * porPagina)}
        pagination={{
          currentPage: pagina,
          perPage: porPagina,
          totalRows: total,
          totalPages: Math.ceil(total / porPagina),
          onPageChange: setPagina,
        }}
      />
    );
  },
};

export const WithColumnVisibility: Story = {
  name: "Colunas visíveis",
  parameters: story(
    "`showColumnVisibility` põe o botão Colunas, que mostra e esconde colunas. `initialColumnVisibility` começa com Responsável escondida.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={propostas.slice(0, 5)}
      showColumnVisibility
      initialColumnVisibility={{ responsavel: false }}
    />
  ),
};

/* ------------------------------------------------------------------------------------------- *
 * Linhas
 * ------------------------------------------------------------------------------------------- */

export const WithRowSelection: Story = {
  name: "Seleção de linhas",
  parameters: story(
    "`enableRowSelection` põe a coluna de checkbox. Com linhas marcadas, aparece a barra de seleção, com as ações de `selectionBar.actions`. `showSelectedCount` mostra a contagem no rodapé.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={propostas.slice(0, 6)}
      getRowId={(p) => p.id}
      enableRowSelection
      defaultSelection={{ "P-1043": true }}
      showSelectedCount
      selectionBar={{
        actions: (
          <>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Exportar
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 data-icon="inline-start" />
              Excluir
            </Button>
          </>
        ),
      }}
    />
  ),
};

export const ClickableRow: Story = {
  name: "Linha clicável",
  parameters: story(
    "Com `onRowClick`, a linha abre no clique e também pelo teclado: Tab até a linha e Enter ou Espaço. Clique ou Enter num botão, link ou campo da linha não abrem a linha.",
  ),
  render: function LinhaClicavelStory() {
    const [aberta, setAberta] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DataTable
          aria-label="Propostas"
          columns={colunasBasicas}
          data={propostas.slice(0, 4)}
          onRowClick={(p) => setAberta(`${p.id} · ${p.cliente}`)}
        />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {aberta ? `Aberta: ${aberta}` : "Clique numa linha, ou use Tab e Enter."}
        </p>
      </div>
    );
  },
};

const ENFASE: Partial<Record<PropostaLinha["situacao"], DataTableRowEmphasis>> = {
  Aprovada: "success",
  Enviada: "info",
  Vencida: "warning",
  Recusada: "destructive",
};

export const RowEmphasis: Story = {
  name: "Ênfase de linha",
  parameters: story(
    "`getRowEmphasis` destaca a linha com `info`, `success`, `warning` ou `destructive`: fundo `-weak` e uma barra de 3px no tom, na primeira célula. O motivo tem de estar em texto na linha (aqui, a coluna Situação): a cor sozinha não chega a todo mundo.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={propostas.slice(0, 5)}
      getRowEmphasis={(p) => ENFASE[p.situacao]}
    />
  ),
};

export const RowActions: Story = {
  name: "Ações por linha",
  parameters: story(
    'Uma coluna com `contentRenderType: "actions"` mostra o menu de ações da linha. O valor da célula é a lista de ações (`label`, `onClick`, `icon`, `variant`). Abrir o menu não dispara o clique da linha.',
  ),
  render: () => (
    <DataTable<PropostaLinha & { acoes: unknown }, unknown>
      aria-label="Propostas"
      columns={[
        ...(colunasBasicas as ColumnDef<PropostaLinha & { acoes: unknown }>[]),
        {
          accessorKey: "acoes",
          header: () => <span className="sr-only">Ações</span>,
          size: 64,
          meta: { prizm: { contentRenderType: ContentRenderType.ACTIONS } },
        },
      ]}
      data={propostas.slice(0, 4).map((p) => ({
        ...p,
        acoes: [
          { label: "Abrir", onClick: () => {} },
          { label: "Duplicar", onClick: () => {} },
          { label: "Excluir", onClick: () => {}, variant: "destructive" },
        ],
      }))}
    />
  ),
};

export const Grupos: Story = {
  name: "Linha de grupo",
  parameters: story(
    '`groupBy` agrupa as linhas sob uma linha de grupo, com o nome e a contagem. Os grupos seguem a ordem de `data`: ordene pelos grupos antes. Cada grupo é um `<tbody>` com `<th scope="rowgroup">`. `renderGroupLabel` troca o conteúdo; aqui, mostra a soma do grupo.',
  ),
  render: () => {
    const ordenadas = [...propostas.slice(0, 8)].sort((a, b) =>
      a.categoria.localeCompare(b.categoria),
    );
    return (
      <DataTable
        aria-label="Propostas por categoria"
        columns={colunasBasicas}
        data={ordenadas}
        groupBy={(p) => p.categoria}
        renderGroupLabel={({ key, rows }) => (
          <>
            {key}
            <span className="ml-2 font-normal text-muted-foreground">
              {rows.length} {rows.length === 1 ? "proposta" : "propostas"} ·{" "}
              {brl(rows.reduce((t, r) => t + r.valor, 0))}
            </span>
          </>
        )}
      />
    );
  },
};

export const SummaryRow: Story = {
  name: "Linha de resumo",
  parameters: story(
    "`summaryRow` põe uma linha no fim da tabela, por id de coluna, alinhada como a coluna. O cálculo é do produto. No Figma, é o Show Footer da Table.",
  ),
  render: () => {
    const dados = propostas.slice(0, 5);
    return (
      <DataTable
        aria-label="Propostas"
        columns={colunasBasicas}
        data={dados}
        summaryRow={{ id: "Total", valor: brl(dados.reduce((t, p) => t + p.valor, 0)) }}
      />
    );
  },
};

export const Detalhe: Story = {
  name: "Linha de detalhe",
  parameters: story(
    "`renderRowDetail` põe um botão à esquerda que abre o detalhe abaixo da linha. Linha sem detalhe (retorno `null`) fica sem botão. `defaultExpandedRows` abre a primeira. Para sub-linhas com as mesmas colunas, use a Table com `getSubRows`.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={propostas.slice(0, 5)}
      getRowId={(p) => p.id}
      defaultExpandedRows={["P-1042"]}
      renderRowDetail={(p) =>
        p.itens ? (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Itens da proposta</p>
            <ul className="list-disc pl-4 text-sm">
              {p.itens.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ) : null
      }
    />
  ),
};

export const CelulaEditavel: Story = {
  name: "Célula editável",
  parameters: story(
    "`DataTableEditableCell` é o Input `sm` na célula, com nome da linha. Estados nesta story: preenchido, inválido com mensagem (quantidade negativa) e desabilitado (Treinamento). O valor e a validação são do produto; o total vem na linha de resumo.",
  ),
  render: function EditavelStory() {
    type Item = { id: string; produto: string; preco: number };
    const itens: Item[] = [
      { id: "i1", produto: "Licença anual · 200 usuários", preco: 1290 },
      { id: "i2", produto: "Implantação", preco: 250 },
      { id: "i3", produto: "Suporte estendido", preco: 100 },
      { id: "i4", produto: "Treinamento · 2 turmas", preco: 480 },
    ];
    const [qtd, setQtd] = React.useState<Record<string, string>>({
      i1: "2",
      i2: "1",
      i3: "-1",
      i4: "1",
    });
    const sub = (i: Item) => i.preco * Math.max(0, Number(qtd[i.id] ?? 0));
    const colunas: ColumnDef<Item>[] = [
      { accessorKey: "produto", header: "Produto", size: 260 },
      {
        accessorKey: "preco",
        header: "Preço",
        size: 120,
        cell: ({ getValue }) => brl(getValue<number>()),
        meta: { prizm: { cellAlign: "right" } },
      },
      {
        id: "qtd",
        header: "Quantidade",
        size: 140,
        cell: ({ row }) => {
          const v = qtd[row.id] ?? "0";
          return (
            <DataTableEditableCell
              type="number"
              align="right"
              label={`Quantidade de ${row.original.produto}`}
              value={v}
              disabled={row.id === "i4"}
              error={Number(v) < 0 ? "Não pode ser negativa" : undefined}
              onChange={(next) => setQtd({ ...qtd, [row.id]: next })}
            />
          );
        },
        meta: { prizm: { cellAlign: "right" } },
      },
      {
        id: "subtotal",
        header: "Subtotal",
        size: 140,
        cell: ({ row }) => brl(sub(row.original)),
        meta: { prizm: { cellAlign: "right" } },
      },
    ];
    return (
      <DataTable
        aria-label="Itens da proposta"
        columns={colunas}
        data={itens}
        getRowId={(i) => i.id}
        summaryRow={{ produto: "Total", subtotal: brl(itens.reduce((t, i) => t + sub(i), 0)) }}
      />
    );
  },
};

/* ------------------------------------------------------------------------------------------- *
 * Toolbar, estados e layout
 * ------------------------------------------------------------------------------------------- */

export const ToolbarActions: Story = {
  name: "Ações na toolbar",
  parameters: story(
    "`toolbarActions` fica no fim da toolbar, depois de Colunas. Use para a ação principal da tela, como criar um item.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={propostas.slice(0, 4)}
      showColumnVisibility
      toolbarActions={<Button>Nova proposta</Button>}
    />
  ),
};

export const Loading: Story = {
  name: "Carregando",
  parameters: story(
    "`isLoading` mostra linhas de Skeleton no lugar dos dados (`loadingRows`, 5 por padrão), com `aria-busy` na tabela. O cabeçalho continua.",
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={[]}
      isLoading
      loadingRows={4}
    />
  ),
};

export const Empty: Story = {
  name: "Vazio",
  parameters: story(
    'Sem linhas, o Empty aparece no lugar da tabela. O texto padrão é "Nenhum resultado."; `emptyMessage` troca o texto ou o conteúdo inteiro.',
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={[]}
      emptyMessage="Nenhuma proposta encontrada."
    />
  ),
};

export const ErrorState: Story = {
  name: "Erro",
  parameters: story(
    'Com `error`, a mensagem aparece no lugar da tabela, com `role="alert"`. Com `onRetry`, o botão "Tentar novamente" (`retryLabel` troca o texto).',
  ),
  render: () => (
    <DataTable
      aria-label="Propostas"
      columns={colunasBasicas}
      data={[]}
      error="Não foi possível carregar as propostas."
      onRetry={() => {}}
    />
  ),
};

export const ColunaFixa: Story = {
  name: "Coluna fixa",
  parameters: story(
    "Role para o lado e para baixo. `stickyFirstColumn` fixa a primeira coluna (com a de seleção), `stickyLastColumn` a última, e `stickyHeader` o cabeçalho. A coluna fixa precisa de `size`.",
  ),
  render: () => (
    <div className="h-80 w-[640px]">
      <DataTable<PropostaLinha, unknown>
        aria-label="Propostas"
        columns={[
          ...colunasBasicas.slice(0, 4),
          {
            accessorKey: "descricao",
            header: "Descrição",
            size: 280,
          },
          colunasBasicas[4],
        ]}
        data={propostas}
        enableRowSelection
        stickyFirstColumn
        stickyLastColumn
        stickyHeader
      />
    </div>
  ),
};

/* ------------------------------------------------------------------------------------------- *
 * Tudo junto
 * ------------------------------------------------------------------------------------------- */

export const Proposta: Story = {
  parameters: story(
    "O que o teste de tela da Proposta pediu (17/11/2026), numa tela só: busca, colunas visíveis, ação na toolbar, ordenação, texto cortado e quebra, ênfase, seleção, linha clicável, detalhe, linha de resumo e paginação.",
  ),
  render: function PropostaStory() {
    const [aberta, setAberta] = React.useState<string | null>(null);
    const colunas: ColumnDef<PropostaLinha>[] = [
      ...colunasOrdenaveis
        .slice(0, 4)
        .map((c) =>
          c.id === "cliente" || ("accessorKey" in c && c.accessorKey === "cliente")
            ? { ...c, size: 200 }
            : c,
        ),
      {
        accessorKey: "descricao",
        header: "Descrição",
        size: 200,
        meta: { prizm: { wrap: true } },
      },
      colunasOrdenaveis[4],
    ];
    return (
      <div className="flex flex-col gap-2">
        <DataTable
          aria-label="Propostas"
          columns={colunas}
          data={propostas}
          getRowId={(p) => p.id}
          showFilter
          filterColumn="cliente"
          filterPlaceholder="Buscar cliente..."
          showColumnVisibility
          toolbarActions={<Button>Nova proposta</Button>}
          defaultSorting={[{ id: "valor", desc: true }]}
          getRowEmphasis={(p) => ENFASE[p.situacao]}
          enableRowSelection
          renderRowDetail={(p) =>
            p.itens ? (
              <ul className="list-disc pl-4 text-sm">
                {p.itens.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : null
          }
          onRowClick={(p) => setAberta(`${p.id} · ${p.cliente}`)}
          summaryRow={{ id: "Total", valor: brl(propostas.reduce((t, p) => t + p.valor, 0)) }}
          showPagination
        />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {aberta ? `Aberta: ${aberta}` : "Clique numa linha, ou use Tab e Enter."}
        </p>
      </div>
    );
  },
};
