import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock de `recharts` para evitar dependência pesada de SVG/layout em testes.
vi.mock("recharts", () => {
  const ResponsiveContainer = ({
    children,
  }: {
    children: React.ReactNode | ((props: unknown) => React.ReactNode);
  }) => (
    <div data-testid="responsive-container">
      {typeof children === "function" ? children({}) : children}
    </div>
  );

  const Tooltip = (props: React.ComponentProps<"div">) => <div data-testid="tooltip" {...props} />;
  const Legend = (props: React.ComponentProps<"div">) => <div data-testid="legend" {...props} />;

  const Noop = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return {
    ResponsiveContainer,
    Tooltip,
    Legend,
    CartesianGrid: Noop,
    XAxis: Noop,
    YAxis: Noop,
    BarChart: Noop,
    LineChart: Noop,
    AreaChart: Noop,
    Bar: Noop,
    Line: Noop,
    Area: Noop,
  };
});

import {
  Chart,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart";
import type { ChartTooltipContentProps } from "./chart.types";

describe("Chart (PRIZM / shadcn)", () => {
  const config: ChartConfig = {
    visitors: {
      label: "Visitors",
      color: "hsl(221 83% 53%)",
      icon: undefined,
    },
  };

  it("renderiza o container com atributo data-chart", () => {
    render(
      <ChartContainer config={config}>
        <div />
      </ChartContainer>,
    );

    const root = screen.getByTestId("responsive-container").parentElement as HTMLElement;

    expect(root).toHaveAttribute("data-chart");
  });

  it("gera variáveis CSS de cor no estilo inline", () => {
    render(
      <ChartContainer config={config}>
        <div>Chart content</div>
      </ChartContainer>,
    );

    const styleTags = Array.from(document.querySelectorAll("style"));

    const hasColorVar = styleTags.some((tag) => tag.innerHTML.includes("--color-visitors"));

    expect(hasColorVar).toBe(true);
  });

  it("usa o config para renderizar label no tooltip", () => {
    const payload = [
      {
        dataKey: "visitors",
        name: "visitors",
        value: 100,
        color: "hsl(221 83% 53%)",
        payload: {
          visitors: "visitors",
        },
        type: "line",
      },
    ];

    const { getAllByText } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          payload={payload as ChartTooltipContentProps["payload"]}
          label="visitors"
        />
      </ChartContainer>,
    );

    expect(getAllByText("Visitors").length).toBeGreaterThanOrEqual(1);
  });

  it("usa o config para renderizar label na legenda", () => {
    const payload = [
      {
        dataKey: "visitors",
        color: "hsl(221 83% 53%)",
        value: "visitors",
        type: "line",
      },
    ];

    render(
      <ChartContainer config={config}>
        {/* children must be ReactElement, not a function */}
        <ChartLegendContent
          payload={payload as React.ComponentProps<typeof ChartLegendContent>["payload"]}
        />
      </ChartContainer>,
    );

    expect(screen.getByText("Visitors")).toBeInTheDocument();
  });

  it("API por props: renderiza Chart com config, data, type, xKey e series", () => {
    const barConfig: ChartConfig = {
      desktop: { label: "Desktop", color: "#2563eb" },
      mobile: { label: "Mobile", color: "#60a5fa" },
    };
    const barData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
    ];

    render(
      <Chart
        config={barConfig}
        data={barData}
        type="bar"
        xKey="month"
        series={["desktop", "mobile"]}
      />,
    );

    const root = document.querySelector("[data-chart]");
    expect(root).toBeInTheDocument();
  });
});
