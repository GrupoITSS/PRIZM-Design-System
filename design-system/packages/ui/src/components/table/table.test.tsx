import "@testing-library/jest-dom/vitest";
import { fireEvent } from "@testing-library/react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table } from "./table";
import type { TableColumn } from "./table.types";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "./table-primitives";
import { ContentRenderType } from "./table-cell-renderers.types";

type Row = { id: string; name: string; value: number };

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "value", header: "Value", align: "right" as const },
];

const rows: Row[] = [
  { id: "1", name: "Alpha", value: 10 },
  { id: "2", name: "Beta", value: 20 },
];

describe("Table (PRIZM / prop-based)", () => {
  it("renderiza header a partir de columns", () => {
    render(<Table<Row> columns={columns} rows={rows} />);
    expect(screen.getByRole("columnheader", { name: /id/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /value/i })).toBeInTheDocument();
  });

  it("renderiza linhas com dados de rows", () => {
    render(<Table<Row> columns={columns} rows={rows} />);
    expect(screen.getByRole("cell", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "10" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Beta" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "20" })).toBeInTheDocument();
  });

  it("renderiza caption quando informada", () => {
    render(<Table<Row> columns={columns} rows={rows} caption="Test caption" />);
    expect(screen.getByRole("table", { name: /test caption/i })).toBeInTheDocument();
  });

  it("renderiza footer quando footerRows é informado", () => {
    const footerRows = [[{ content: "Total" }, { content: "30", align: "right" as const }]];
    render(<Table<Row> columns={columns} rows={rows} footerRows={footerRows} />);
    expect(screen.getByRole("cell", { name: "Total" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "30" })).toBeInTheDocument();
  });

  it("vazio: o Empty com emptyMessage, numa célula da largura toda", () => {
    const { container } = render(
      <Table<Row> columns={columns} rows={[]} emptyMessage="Sem dados" />,
    );
    const cell = container.querySelector("[data-slot=table-empty]")!;
    expect(cell).toHaveAttribute("colspan", String(columns.length));
    expect(cell.querySelector("[data-slot=empty]")).not.toBeNull();
    expect(cell).toHaveTextContent("Sem dados");
  });

  it('vazio sem emptyMessage: "Nenhum resultado."', () => {
    render(<Table<Row> columns={columns} rows={[]} />);
    expect(screen.getByText("Nenhum resultado.")).toBeInTheDocument();
  });

  it("usa getRowKey para keys das linhas", () => {
    const { container } = render(
      <Table<Row> columns={columns} rows={rows} getRowKey={(row) => row.id} />,
    );
    const tbody = container.querySelector("tbody");
    expect(tbody?.querySelectorAll("tr")).toHaveLength(2);
  });

  it("usa render da coluna para conteúdo customizado", () => {
    const colsWithRender = [
      ...columns,
      {
        key: "custom" as const,
        header: "Custom",
        render: (_value: unknown, row: Row) => `custom-${row.id}`,
      },
    ];
    render(<Table<Row> columns={colsWithRender} rows={rows} />);
    expect(screen.getByRole("cell", { name: "custom-1" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "custom-2" })).toBeInTheDocument();
  });

  it("suporta renderização via contentRenderType (STATUS)", () => {
    type R = { id: string; status: string };
    const cols = [
      {
        key: "status",
        header: "Status",
        contentRenderType: ContentRenderType.STATUS,
        statusLabels: { PENDING: "Aguardando" },
      },
    ];
    render(<Table<R> columns={cols} rows={[{ id: "1", status: "PENDING" }]} />);
    expect(screen.getByText("Aguardando")).toBeInTheDocument();
  });

  it("suporta renderização via contentRenderType (HOVER) com trigger click", () => {
    type R = { id: string; plans: string };
    const cols = [
      {
        key: "plans",
        header: "Plans",
        contentRenderType: ContentRenderType.HOVER,
        renderPopover: {
          title: "Plans",
          trigger: "click" as const,
          position: "bottom" as const,
          content: () => <div>Popover content</div>,
        },
      },
    ];

    render(<Table<R> columns={cols} rows={[{ id: "1", plans: "2" }]} />);
    fireEvent.click(screen.getByText("2"));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
    expect(within(screen.getByRole("dialog")).getByText("Plans")).toBeInTheDocument();
  });
});

describe("Table · decisões de 06/11/2026", () => {
  it("cabeçalho com 40px, 8px dos lados, foreground e sem quebra; célula com 8px", () => {
    render(<Table<Row> columns={columns} rows={rows} />);
    const th = screen.getByRole("columnheader", { name: /id/i });
    expect(th).toHaveClass("h-10", "px-2", "text-foreground", "whitespace-nowrap");
    expect(th).not.toHaveClass("h-12", "px-4", "text-muted-foreground");
    const td = screen.getByText("Alpha").closest("td")!;
    expect(td).toHaveClass("p-2");
    expect(td).not.toHaveClass("p-4", "whitespace-nowrap");
  });

  it("todas as peças da Table por props têm data-slot, como no shadcn", () => {
    const { container } = render(
      <Table<Row>
        columns={columns}
        rows={rows}
        caption="Legenda"
        footerRows={[[{ content: "Total", colSpan: 3 }]]}
      />,
    );
    for (const slot of [
      "table-container",
      "table",
      "table-caption",
      "table-header",
      "table-body",
      "table-footer",
      "table-row",
      "table-head",
      "table-cell",
    ]) {
      expect(container.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
    }
  });

  it("as primitivas têm data-slot, e o TableRoot tem border-collapse", () => {
    const { container } = render(
      <TableRoot>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ana</TableCell>
          </TableRow>
        </TableBody>
      </TableRoot>,
    );
    expect(container.querySelector('[data-slot="table"]')).toHaveClass("border-collapse");
    expect(container.querySelector('[data-slot="table-container"]')).not.toBeNull();
    expect(container.querySelector('[data-slot="table-head"]')).toHaveTextContent("Nome");
    expect(container.querySelector('[data-slot="table-cell"]')).toHaveTextContent("Ana");
  });
});

describe("Table · renderizadores e acessibilidade (06/11/2026)", () => {
  type R = { id: string; plans: string };
  const hoverCol = (trigger: "click" | "hover") => [
    {
      key: "plans",
      header: "Plans",
      contentRenderType: ContentRenderType.HOVER,
      renderPopover: {
        title: "Plans",
        trigger,
        position: "bottom" as const,
        content: () => <div>Popover content</div>,
      },
    },
  ];

  it("o gatilho do renderizador hover é um botão focável, nos dois tipos de gatilho", () => {
    for (const trigger of ["click", "hover"] as const) {
      const { unmount } = render(
        <Table<R> columns={hoverCol(trigger)} rows={[{ id: "1", plans: "2" }]} />,
      );
      const btn = screen.getByRole("button", { name: "2" });
      expect(btn).toHaveAttribute("type", "button");
      btn.focus();
      expect(btn).toHaveFocus();
      unmount();
    }
  });

  it("a imagem do text-image é decorativa (alt vazio): o nome já está ao lado", () => {
    type I = { id: string; company: { imageUrl: string; text: string } };
    const { container } = render(
      <Table<I>
        columns={[
          { key: "company", header: "Empresa", contentRenderType: ContentRenderType.TEXT_IMAGE },
        ]}
        rows={[{ id: "1", company: { imageUrl: "logo.png", text: "ACME" } }]}
      />,
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(screen.getByText("ACME")).toBeInTheDocument();
  });

  it("links e botões dos renderizadores usam o anel de foco do Button", () => {
    type L = { id: string; name: string; plans: string };
    render(
      <Table<L>
        columns={[{ key: "name", header: "Nome", link: "/empresas/:id" }, ...hoverCol("click")]}
        rows={[{ id: "1", name: "ACME", plans: "2" }]}
      />,
    );
    for (const el of [
      screen.getByRole("link", { name: "ACME" }),
      screen.getByRole("button", { name: "2" }),
    ]) {
      expect(el).toHaveClass(
        "focus-visible:ring-[3px]",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-ring-offset",
      );
    }
  });
});

describe("Table · renderizador actions (06/11/2026)", () => {
  type A = { id: string; acoes: { label: string; onClick: () => void }[] };

  it("mostra o ActionMenu quando o valor é a lista de ações da linha", () => {
    const onClick = vi.fn();
    render(
      <Table<A>
        columns={[{ key: "acoes", header: "Ações", contentRenderType: ContentRenderType.ACTIONS }]}
        rows={[{ id: "1", acoes: [{ label: "Editar", onClick }] }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu de ações" }));
    fireEvent.click(screen.getByRole("button", { name: "Editar" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("sem ações, mostra um traço", () => {
    render(
      <Table<A>
        columns={[{ key: "acoes", header: "Ações", contentRenderType: ContentRenderType.ACTIONS }]}
        rows={[{ id: "1", acoes: [] }]}
      />,
    );
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("Table: linhas que expandem (decisão de 16/11/2026)", () => {
  type Item = { id: string; nome: string; preco: number; planos?: Item[] };
  const itens: Item[] = [
    {
      id: "a",
      nome: "Produto A",
      preco: 0,
      planos: [
        { id: "a1", nome: "Plano Básico", preco: 100 },
        { id: "a2", nome: "Plano Pro", preco: 250 },
      ],
    },
    {
      id: "b",
      nome: "Produto B",
      preco: 0,
      planos: [{ id: "b1", nome: "Plano Único", preco: 600 }],
    },
    { id: "c", nome: "Produto C", preco: 80 },
  ];
  const cols = [
    { key: "nome", header: "Produto" },
    {
      key: "preco",
      header: "Subtotal",
      align: "right" as const,
      render: (v: unknown, _r: Item, meta: { subRows?: Item[] }) =>
        meta.subRows ? `soma ${meta.subRows.reduce((s, x) => s + x.preco, 0)}` : String(v),
    },
  ];
  const base = {
    columns: cols,
    rows: itens,
    getRowKey: (r: Item) => r.id,
    getSubRows: (r: Item) => r.planos,
  };

  it("sem getSubRows, não há coluna de expandir", () => {
    render(<Table<Item> columns={cols} rows={itens} />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("botão só nas linhas com sub-linhas, fechado, com nome e cabeçalho só para leitor de tela", () => {
    render(<Table<Item> {...base} />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getByRole("columnheader", { name: "Expandir" })).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: "Expandir Produto A" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Expandir Produto B" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Produto C/ })).not.toBeInTheDocument();
    expect(screen.queryByText("Plano Básico")).not.toBeInTheDocument();
  });

  it("abre e fecha pelo clique, com aria-controls para as sub-linhas recuadas", () => {
    render(<Table<Item> {...base} />);
    fireEvent.click(screen.getByRole("button", { name: "Expandir Produto A" }));
    const btn = screen.getByRole("button", { name: "Recolher Produto A" });
    expect(btn).toHaveAttribute("aria-expanded", "true");
    const ids = btn.getAttribute("aria-controls")?.split(" ") ?? [];
    expect(ids).toHaveLength(2);
    for (const id of ids) expect(document.getElementById(id)).toHaveAttribute("data-depth", "1");
    expect(screen.getByText("Plano Básico").closest("td")).toHaveClass("pl-10");
    fireEvent.click(btn);
    expect(screen.queryByText("Plano Básico")).not.toBeInTheDocument();
  });

  it("o render recebe subRows na linha pai (para a soma)", () => {
    render(<Table<Item> {...base} />);
    expect(screen.getByText("soma 350")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  it("defaultExpanded abre as linhas pedidas; true abre todas", () => {
    const { unmount } = render(<Table<Item> {...base} defaultExpanded={["b"]} />);
    expect(screen.getByText("Plano Único")).toBeInTheDocument();
    expect(screen.queryByText("Plano Básico")).not.toBeInTheDocument();
    unmount();
    render(<Table<Item> {...base} defaultExpanded />);
    expect(screen.getByText("Plano Básico")).toBeInTheDocument();
    expect(screen.getByText("Plano Único")).toBeInTheDocument();
  });

  it("controlado: expanded e onExpandedChange", () => {
    const onChange = vi.fn();
    render(<Table<Item> {...base} expanded={[]} onExpandedChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Expandir Produto A" }));
    expect(onChange).toHaveBeenCalledWith(["a"]);
    expect(screen.queryByText("Plano Básico")).not.toBeInTheDocument();
  });

  it("é um botão nativo: o teclado abre com Enter e o foco fica nele", () => {
    render(<Table<Item> {...base} />);
    const btn = screen.getByRole("button", { name: "Expandir Produto A" });
    expect(btn.tagName).toBe("BUTTON");
    btn.focus();
    fireEvent.click(btn);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Recolher Produto A" }));
  });

  it("rodapé: a primeira célula ocupa a coluna de expandir", () => {
    render(
      <Table<Item>
        {...base}
        footerRows={[[{ content: "Total" }, { content: "1.290", align: "right" }]]}
      />,
    );
    expect(screen.getByText("Total").closest("td")).toHaveAttribute("colspan", "2");
  });

  it("getExpandLabel troca o nome do botão", () => {
    render(
      <Table<Item>
        {...base}
        getExpandLabel={(r, o) => `${o ? "Fechar" : "Ver"} planos de ${r.nome}`}
      />,
    );
    expect(screen.getByRole("button", { name: "Ver planos de Produto A" })).toBeInTheDocument();
  });
});

describe("Table: decisões de 17/11/2026 (teste da Proposta)", () => {
  type P = { id: string; nome: string; valor: number; obs: string };
  const linhas: P[] = [{ id: "1", nome: "Produto A", valor: 1290, obs: "Observação longa" }];
  const colunas = [
    { key: "nome", header: "Produto" },
    { key: "valor", header: "Valor", align: "right" as const },
    { key: "obs", header: "Observação", wrap: true },
  ];

  it("linha de 52px (h-13), uma densidade só", () => {
    render(<Table<P> columns={colunas} rows={linhas} />);
    expect(screen.getByText("Produto A").closest("td")).toHaveClass("h-13");
  });

  it("texto cortado numa linha por padrão; wrap quebra", () => {
    render(<Table<P> columns={colunas} rows={linhas} />);
    const nome = screen.getByText("Produto A");
    expect(nome).toHaveAttribute("data-slot", "table-cell-text");
    expect(nome).toHaveClass("block", "truncate");
    expect(nome.closest("td")).toHaveClass("max-w-0");
    const obs = screen.getByText("Observação longa");
    expect(obs.tagName).toBe("TD");
    expect(obs).not.toHaveClass("max-w-0");
  });

  it("conteúdo que não é texto não é cortado", () => {
    render(
      <Table<P>
        columns={[{ key: "nome", header: "Produto", render: (v) => <strong>{String(v)}</strong> }]}
        rows={linhas}
      />,
    );
    expect(screen.getByText("Produto A").tagName).toBe("STRONG");
  });

  it("coluna à direita com algarismos de largura fixa", () => {
    render(<Table<P> columns={colunas} rows={linhas} />);
    expect(screen.getByText("1290").closest("td")).toHaveClass("text-right", "tabular-nums");
  });

  it("isRowHighlighted: fundo muted e data-highlighted, como no DataTable", () => {
    render(<Table<P> columns={colunas} rows={linhas} isRowHighlighted={(r) => r.id === "1"} />);
    const tr = screen.getByText("Produto A").closest("tr")!;
    expect(tr).toHaveAttribute("data-highlighted", "true");
    expect(tr).toHaveClass("bg-muted");
  });

  it("ordenação: botão no cabeçalho, aria-sort, crescente e decrescente", () => {
    const onSortChange = vi.fn();
    const cols: TableColumn<P>[] = [
      { key: "nome", header: "Produto", sortable: true },
      { key: "valor", header: "Valor", align: "right", sortable: true },
    ];
    const dados = [
      { id: "1", nome: "Banana", valor: 30, obs: "" },
      { id: "2", nome: "Abacate", valor: 5, obs: "" },
      { id: "3", nome: "Caju", valor: 100, obs: "" },
    ] as unknown as P[];
    render(<Table<P> columns={cols} rows={dados} onSortChange={onSortChange} />);
    const nomes = () =>
      screen
        .getAllByRole("row")
        .slice(1)
        .map((r) => r.textContent);
    fireEvent.click(screen.getByRole("button", { name: "Valor" }));
    expect(screen.getByRole("columnheader", { name: "Valor" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expect(nomes()[0]).toContain("Abacate");
    fireEvent.click(screen.getByRole("button", { name: "Valor" }));
    expect(screen.getByRole("columnheader", { name: "Valor" })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
    expect(nomes()[0]).toContain("Caju");
    fireEvent.click(screen.getByRole("button", { name: "Produto" }));
    expect(nomes()[0]).toContain("Abacate");
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "nome", direction: "asc" });
    expect(screen.getByRole("columnheader", { name: "Valor" })).not.toHaveAttribute("aria-sort");
  });

  it("manualSort não reordena; coluna sem sortable não tem botão", () => {
    const cols: TableColumn<P>[] = [
      { key: "nome", header: "Produto" },
      { key: "valor", header: "Valor", sortable: true },
    ];
    const dados = [
      { id: "1", nome: "B", valor: 30, obs: "" },
      { id: "2", nome: "A", valor: 5, obs: "" },
    ] as unknown as P[];
    render(
      <Table<P>
        columns={cols}
        rows={dados}
        manualSort
        defaultSort={{ key: "valor", direction: "asc" }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Produto" })).toBeNull();
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("B");
    expect(screen.getByRole("columnheader", { name: "Valor" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("Tooltip com o texto inteiro só quando o texto corta", async () => {
    // A seta do Radix mede com ResizeObserver, que o jsdom não tem.
    if (!("ResizeObserver" in globalThis)) {
      (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }
    const widths = (scroll: number) => {
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(scroll);
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
    };
    widths(100);
    const { unmount } = render(<Table<P> columns={colunas} rows={linhas} />);
    fireEvent.pointerEnter(screen.getByText("Produto A"));
    fireEvent.pointerMove(screen.getByText("Produto A"));
    await new Promise((r) => setTimeout(r, 250));
    expect(screen.queryByRole("tooltip")).toBeNull();
    unmount();
    widths(300);
    render(<Table<P> columns={colunas} rows={linhas} />);
    fireEvent.pointerEnter(screen.getByText("Produto A"));
    fireEvent.pointerMove(screen.getByText("Produto A"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Produto A");
    expect(screen.queryAllByRole("tooltip")).toHaveLength(1);
    vi.restoreAllMocks();
  });
});
