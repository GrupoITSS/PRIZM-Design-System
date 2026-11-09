import "@testing-library/jest-dom/vitest";
import { fireEvent } from "@testing-library/react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./table";
import { TableBody, TableCell, TableHead, TableHeader, TableRoot, TableRow } from "./table-primitives";
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

  it("renderiza emptyMessage quando rows está vazio", () => {
    render(<Table<Row> columns={columns} rows={[]} emptyMessage="No data" />);
    expect(screen.getByRole("cell", { name: /no data/i })).toBeInTheDocument();
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
      const { unmount } = render(<Table<R> columns={hoverCol(trigger)} rows={[{ id: "1", plans: "2" }]} />);
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
        columns={[{ key: "company", header: "Empresa", contentRenderType: ContentRenderType.TEXT_IMAGE }]}
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
        columns={[
          { key: "name", header: "Nome", link: "/empresas/:id" },
          ...hoverCol("click"),
        ]}
        rows={[{ id: "1", name: "ACME", plans: "2" }]}
      />,
    );
    for (const el of [screen.getByRole("link", { name: "ACME" }), screen.getByRole("button", { name: "2" })]) {
      expect(el).toHaveClass(
        "focus-visible:ring-[3px]",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-ring-offset",
      );
    }
  });
});
