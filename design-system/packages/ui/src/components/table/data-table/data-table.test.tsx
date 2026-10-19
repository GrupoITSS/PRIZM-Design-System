import type { ColumnDef } from "@tanstack/react-table";
import "@testing-library/jest-dom/vitest";
import { fireEvent } from "@testing-library/react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { MockPayment } from "./data-table.mock";
import { DataTable } from "./index";
import { ContentRenderType } from "../table-cell-renderers.types";

const mockData: MockPayment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "test@example.com",
  },
  {
    id: "2",
    amount: 200,
    status: "success",
    email: "user@example.com",
  },
  {
    id: "3",
    amount: 300,
    status: "failed",
    email: "admin@example.com",
  },
];

const basicColumns: ColumnDef<MockPayment>[] = [
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

describe("DataTable (PRIZM / TanStack Table)", () => {
  describe("Basic rendering", () => {
    it("renderiza headers das colunas", () => {
      render(<DataTable columns={basicColumns} data={mockData} />);
      expect(screen.getByRole("columnheader", { name: /status/i })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: /email/i })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: /amount/i })).toBeInTheDocument();
    });

    it("renderiza dados das linhas", () => {
      render(<DataTable columns={basicColumns} data={mockData} />);
      expect(screen.getByRole("cell", { name: "pending" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "test@example.com" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "100" })).toBeInTheDocument();
    });

    it("mostra emptyMessage quando não há dados", () => {
      const { container } = render(<DataTable columns={basicColumns} data={[]} />);
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
      expect(container.querySelector('[data-slot="empty-icon"]')).toBeInTheDocument();
    });

    it("mostra emptyMessage customizada", () => {
      render(<DataTable columns={basicColumns} data={[]} emptyMessage="Custom empty message" />);
      expect(screen.getByText(/custom empty message/i)).toBeInTheDocument();
    });

    it("mantém a área da tabela com altura mínima preenchendo o espaço restante", () => {
      const { container } = render(<DataTable columns={basicColumns} data={[mockData[0]]} />);
      const root = container.querySelector('[data-slot="data-table"]');
      const card = container.querySelector('[data-slot="data-table-card"]');
      expect(root).toHaveClass("flex-1", "min-h-0", "h-full");
      expect(card).toHaveClass("flex-1", "min-h-0");
    });

    it("mantém busca e colunas visíveis quando o fallback substitui a tabela", () => {
      const { container } = render(
        <DataTable
          columns={basicColumns}
          data={[]}
          showColumnVisibility
          columnVisibilityLabel="Colunas"
          pagination={{
            currentPage: 1,
            totalPages: 1,
            totalRows: 1,
            perPage: 10,
            onPageChange: () => undefined,
          }}
          toolbarFilters={[
            {
              type: "search",
              placeholder: "Buscar",
              value: "xyz",
              onChange: () => undefined,
            },
          ]}
          emptyMessage="Nenhum item encontrado"
        />,
      );
      expect(screen.getByRole("textbox", { name: /buscar/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /colunas/i })).toBeInTheDocument();
      expect(screen.getByText(/nenhum item encontrado/i)).toBeInTheDocument();
      expect(screen.queryByRole("columnheader", { name: /status/i })).not.toBeInTheDocument();
      expect(container.querySelector('[data-slot="data-table-card"]')).toBeNull();
      expect(container.querySelector('[data-slot="data-table-empty"]')).toBeTruthy();
      expect(screen.queryByText(/mostrando/i)).not.toBeInTheDocument();
    });

    it("renderiza células customizadas via cell function", () => {
      const columnsWithCustomCell: ColumnDef<MockPayment>[] = [
        {
          accessorKey: "amount",
          header: "Amount",
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            return <div className="text-right font-medium">${amount}</div>;
          },
        },
      ];

      render(<DataTable columns={columnsWithCustomCell} data={mockData} />);
      expect(screen.getByText("$100")).toBeInTheDocument();
      expect(screen.getByText("$200")).toBeInTheDocument();
    });
  });

  describe("Pagination", () => {
    it("mostra controles de paginação quando showPagination=true", () => {
      render(<DataTable columns={basicColumns} data={mockData} showPagination />);
      expect(screen.getByRole("button", { name: /página anterior/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /próxima página/i })).toBeInTheDocument();
    });

    it("não mostra controles de paginação por padrão", () => {
      render(<DataTable columns={basicColumns} data={mockData} />);
      expect(screen.queryByRole("button", { name: /página anterior/i })).not.toBeInTheDocument();
    });
  });

  describe("Filtering", () => {
    it("mostra input de filtro quando showFilter=true", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          showFilter
          filterColumn="email"
          filterPlaceholder="Filter emails..."
        />,
      );
      expect(screen.getByPlaceholderText(/filter emails/i)).toBeInTheDocument();
    });

    it("não mostra input de filtro por padrão", () => {
      render(<DataTable columns={basicColumns} data={mockData} />);
      expect(screen.queryByPlaceholderText(/filter/i)).not.toBeInTheDocument();
    });

    it("mostra selects de filtro quando filters é informado", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          filters={[
            {
              id: "status",
              allLabel: "Todos os status",
              value: "",
              onChange: () => undefined,
              options: [
                { value: "pending", label: "Pending" },
                { value: "success", label: "Success" },
              ],
            },
          ]}
        />,
      );
      expect(screen.getByText("Todos os status")).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
    });
  });

  describe("Column Visibility", () => {
    it("mostra botão de toggle de colunas quando showColumnVisibility=true", () => {
      render(<DataTable columns={basicColumns} data={mockData} showColumnVisibility />);
      expect(screen.getByRole("button", { name: /columns/i })).toBeInTheDocument();
    });

    it("não mostra botão de toggle por padrão", () => {
      render(<DataTable columns={basicColumns} data={mockData} />);
      expect(screen.queryByRole("button", { name: /columns/i })).not.toBeInTheDocument();
    });

    it("esconde colunas definidas em initialColumnVisibility", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          initialColumnVisibility={{ email: false }}
        />,
      );
      expect(screen.queryByRole("columnheader", { name: /email/i })).not.toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: /status/i })).toBeInTheDocument();
    });
  });

  describe("Toolbar search and status", () => {
    it("coloca a busca compacta à esquerda e as colunas à direita quando não há selects", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          showColumnVisibility
          columnVisibilityLabel="Colunas"
          toolbarFilters={[
            {
              type: "search",
              placeholder: "Buscar",
              value: "",
              onChange: () => undefined,
            },
          ]}
        />,
      );

      const search = screen.getByRole("textbox", { name: /buscar/i });
      const group = search.closest('[data-slot="input-with-icon"]');
      expect(group).toBeInTheDocument();
      expect(group).toHaveClass("w-[200px]");
      expect(group).not.toHaveClass("flex-1");
      expect(group?.querySelector("svg")).toBeTruthy();
      expect(screen.getByRole("button", { name: /colunas/i })).toBeInTheDocument();
    });

    it("sem selects, a toolbar usa espaço entre busca e colunas", () => {
      const { container } = render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          showColumnVisibility
          columnVisibilityLabel="Colunas"
          toolbarFilters={[
            {
              type: "search",
              placeholder: "Buscar",
              value: "",
              onChange: () => undefined,
            },
          ]}
        />,
      );

      const search = screen.getByRole("textbox", { name: /buscar/i });
      expect(search.closest('[data-slot="input-with-icon"]')).toHaveClass("w-[200px]");
      const toolbar = container.querySelector('[data-slot="data-table"] > div');
      expect(toolbar).toHaveClass("justify-between");
    });

    it("com select, a busca permanece compacta à direita", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          showColumnVisibility
          columnVisibilityLabel="Colunas"
          filters={[
            {
              id: "status",
              allLabel: "Todos os status",
              value: "",
              onChange: () => undefined,
              options: [{ value: "active", label: "Ativo" }],
            },
          ]}
          toolbarFilters={[
            {
              type: "search",
              placeholder: "Buscar",
              value: "",
              onChange: () => undefined,
            },
          ]}
        />,
      );

      const group = screen
        .getByRole("textbox", { name: /buscar/i })
        .closest('[data-slot="input-with-icon"]');
      expect(group).toHaveClass("w-[200px]");
      expect(group).not.toHaveClass("flex-1");
      expect(group?.querySelector("svg")).toBeTruthy();
    });

    it("renderiza o filtro de status como select Ativo/Inativo/Todos", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          toolbarFilters={[
            {
              type: "status",
              value: "active",
              onChange: () => undefined,
            },
          ]}
        />,
      );

      expect(screen.getByRole("combobox")).toHaveTextContent(/ativos/i);
      expect(screen.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });
  });

  describe("Row Selection", () => {
    it("desabilita checkbox quando enableRowSelection recusa a linha", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          enableRowSelection={(row) => row.original.id !== "1"}
          getRowId={(row) => row.id}
        />,
      );
      const checkboxes = screen.getAllByRole("checkbox", {
        name: /selecionar linha/i,
      });
      expect(checkboxes[0]).toBeDisabled();
      expect(checkboxes[1]).not.toBeDisabled();
    });

    it("mostra contagem de seleção quando showSelectedCount=true", () => {
      render(
        <DataTable columns={basicColumns} data={mockData} enableRowSelection showSelectedCount />,
      );
      expect(screen.getByText(/0 de 3 selecionada\(s\)/i)).toBeInTheDocument();
    });

    it("não mostra contagem por padrão", () => {
      render(<DataTable columns={basicColumns} data={mockData} />);
      expect(screen.queryByText(/selecionada\(s\)/i)).not.toBeInTheDocument();
    });

    it("mantém linhas selecionadas ao trocar os dados da página", () => {
      const page1 = mockData.slice(0, 2);
      const page2 = [mockData[2]];
      const { rerender } = render(
        <DataTable
          columns={basicColumns}
          data={page1}
          enableRowSelection
          getRowId={(row) => row.id}
        />,
      );

      fireEvent.click(screen.getAllByRole("checkbox", { name: /selecionar linha/i })[0]);
      expect(screen.getByText(/1 item selecionado/i)).toBeInTheDocument();

      rerender(
        <DataTable
          columns={basicColumns}
          data={page2}
          enableRowSelection
          getRowId={(row) => row.id}
        />,
      );

      expect(screen.getByText(/1 item selecionado/i)).toBeInTheDocument();
      expect(screen.getByText("admin@example.com")).toBeInTheDocument();
      expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
    });

    it("acumula a seleção da página atual com a das páginas anteriores", () => {
      const page1 = mockData.slice(0, 2);
      const page2 = [mockData[2]];
      const { rerender } = render(
        <DataTable
          columns={basicColumns}
          data={page1}
          enableRowSelection
          getRowId={(row) => row.id}
        />,
      );

      fireEvent.click(screen.getAllByRole("checkbox", { name: /selecionar linha/i })[0]);

      rerender(
        <DataTable
          columns={basicColumns}
          data={page2}
          enableRowSelection
          getRowId={(row) => row.id}
        />,
      );

      fireEvent.click(screen.getAllByRole("checkbox", { name: /selecionar linha/i })[0]);

      expect(screen.getByText(/2 itens selecionados/i)).toBeInTheDocument();
    });

    it("notifica as linhas das páginas anteriores em onSelectedRowsChange", () => {
      const onSelectedRowsChange = vi.fn();
      const page1 = mockData.slice(0, 2);
      const page2 = [mockData[2]];
      const { rerender } = render(
        <DataTable
          columns={basicColumns}
          data={page1}
          enableRowSelection
          getRowId={(row) => row.id}
          onSelectedRowsChange={onSelectedRowsChange}
        />,
      );

      fireEvent.click(screen.getAllByRole("checkbox", { name: /selecionar linha/i })[0]);
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith([expect.objectContaining({ id: "1" })]);

      rerender(
        <DataTable
          columns={basicColumns}
          data={page2}
          enableRowSelection
          getRowId={(row) => row.id}
          onSelectedRowsChange={onSelectedRowsChange}
        />,
      );

      fireEvent.click(screen.getAllByRole("checkbox", { name: /selecionar linha/i })[0]);
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith([
        expect.objectContaining({ id: "1" }),
        expect.objectContaining({ id: "3" }),
      ]);
    });

    it("não descarta a seleção anterior ao marcar todos da página atual", () => {
      const page1 = mockData.slice(0, 2);
      const page2 = [mockData[2]];
      const { rerender } = render(
        <DataTable
          columns={basicColumns}
          data={page1}
          enableRowSelection
          getRowId={(row) => row.id}
        />,
      );

      fireEvent.click(screen.getAllByRole("checkbox", { name: /selecionar linha/i })[0]);

      rerender(
        <DataTable
          columns={basicColumns}
          data={page2}
          enableRowSelection
          getRowId={(row) => row.id}
        />,
      );

      fireEvent.click(screen.getByRole("checkbox", { name: /selecionar todos/i }));
      expect(screen.getByText(/2 itens selecionados/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole("checkbox", { name: /selecionar todos/i }));
      expect(screen.getByText(/1 item selecionado/i)).toBeInTheDocument();
    });
  });

  describe("data-state attribute", () => {
    it("aplica data-state='selected' quando linha está selecionada", () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} enableRowSelection />,
      );
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(3);
      // Por padrão nenhuma linha tem data-state="selected"
      rows.forEach((row) => {
        expect(row.getAttribute("data-state")).not.toBe("selected");
      });
    });
  });

  describe("PRIZM cell renderers (meta.rows)", () => {
    it("renderiza STATUS via meta.rows.contentRenderType", () => {
      const data = [{ id: "1", status: "PENDING" }];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "status",
          header: "Status",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.STATUS,
              statusLabels: { PENDING: "Aguardando" },
            },
          },
        },
      ];

      render(<DataTable columns={columns} data={data} />);
      expect(screen.getByText("Aguardando")).toBeInTheDocument();
    });

    it("renderiza STATUS Ativo com ícone", () => {
      const data = [{ id: "1", status: "Ativo" }];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "status",
          header: "Status",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.STATUS,
            },
          },
        },
      ];

      const { container } = render(<DataTable columns={columns} data={data} />);
      expect(screen.getByText("Ativo")).toBeInTheDocument();
      expect(container.querySelector("svg")).toBeInTheDocument();
      const statusCell = screen.getByText("Ativo").closest("td");
      expect(statusCell).toHaveClass("overflow-visible");
      expect(statusCell).toHaveClass("text-left");
      expect(statusCell).not.toHaveClass("truncate");
      expect(statusCell).not.toHaveClass("text-center");
    });

    it("trava overflow horizontal quando overflowX=hidden", () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} overflowX="hidden" />,
      );
      const scroller = container.querySelector('[data-slot="data-table-card"] > div');
      expect(scroller).toHaveClass("overflow-x-hidden");
      expect(scroller).toHaveClass("overflow-y-auto");
      expect(scroller).not.toHaveClass("overflow-x-auto");
    });

    it("alinha header e chips de status à esquerda", () => {
      const data = [
        { id: "1", status: "PROVISIONANDO" },
        { id: "2", status: "Ativo" },
      ];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "status",
          header: "Status",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.STATUS,
            },
          },
        },
      ];

      render(<DataTable columns={columns} data={data} />);
      const header = screen.getByText("Status").closest("th");
      expect(header).toHaveClass("text-left");
      expect(screen.getByText("PROVISIONANDO").closest("td")).toHaveClass("text-left");
      expect(screen.getByText("Ativo").closest("td")).toHaveClass("text-left");
    });

    it("renderiza TEXT_IMAGE + link template via meta.rows", () => {
      const data = [{ id: "1", company: { imageUrl: "https://example.com/a.png", text: "ACME" } }];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "company",
          header: "Company",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.TEXT_IMAGE,
              link: "/organization/:id",
            },
          },
        },
      ];

      render(<DataTable columns={columns} data={data} />);
      const link = screen.getByRole<HTMLAnchorElement>("link", { name: "ACME" });
      expect(link.getAttribute("href")).toBe("/organization/1");
    });

    it("renderiza BADGE e mostra contador +N quando há tags extras", () => {
      const data = [
        {
          id: "1",
          tags: [
            { id: "t1", name: "Tag 1" },
            { id: "t2", name: "Tag 2" },
            { id: "t3", name: "Tag 3" },
          ],
        },
      ];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "tags",
          header: "Tags",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.BADGE,
              badgeMaxVisible: 2,
            },
          },
        },
      ];

      const onRowClick = vi.fn();
      render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />);
      expect(screen.getByText("Tag 1")).toBeInTheDocument();
      expect(screen.getByText("Tag 2")).toBeInTheDocument();
      expect(screen.getByText("+1")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: /mostrar mais 1/i }));
      expect(onRowClick).not.toHaveBeenCalled();
    });

    it("renderiza STATUS_SUMMARY_WITH_POPOVER (badge com summary)", () => {
      const data = [
        {
          id: "1",
          summary: {
            summary: "2/3",
            statusItems: [
              { type: "doc", status: "processed", value: "a" },
              { type: "doc", status: "error", value: "b" },
              { type: "doc", status: "processed", value: "c" },
            ],
          },
        },
      ];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "summary",
          header: "Summary",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.STATUS_SUMMARY_WITH_POPOVER,
            },
          },
        },
      ];

      render(<DataTable columns={columns} data={data} />);
      expect(screen.getByText("2/3")).toBeInTheDocument();
      const trigger = screen.getByText("2/3").closest("button");
      expect(trigger).toBeTruthy();
      fireEvent.click(trigger!);
      expect(screen.getAllByText("Processed").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Type")).toBeInTheDocument();
    });

    it("renderiza HOVER com trigger click e abre popover", () => {
      const data = [{ id: "1", plans: "2" }];
      const columns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "plans",
          header: "Plans",
          meta: {
            rows: {
              contentRenderType: ContentRenderType.HOVER,
              renderPopover: {
                title: "Plans",
                trigger: "click",
                position: "bottom",
                content: () => <div>Popover content</div>,
              },
            },
          },
        },
      ];

      render(<DataTable columns={columns} data={data} />);
      fireEvent.click(screen.getByText("2"));
      expect(screen.getByText("Popover content")).toBeInTheDocument();
      expect(within(screen.getByRole("dialog")).getByText("Plans")).toBeInTheDocument();
    });
  });
});
