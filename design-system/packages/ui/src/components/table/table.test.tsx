import "@testing-library/jest-dom/vitest";
import { fireEvent } from "@testing-library/react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./table";
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
