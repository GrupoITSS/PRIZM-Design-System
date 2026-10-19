import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import {
  Chart,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  type ChartConfig,
} from "@grupoitss/prizm-ui/chart";

const meta: Meta<typeof Chart> = {
  title: "Primários/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Charts do design system PRIZM, baseados em Recharts. " +
          '**Uso recomendado:** API por props com `<Chart config={} data={} type="bar" xKey="month" series={["desktop", "mobile"]} />`. ' +
          "Para customização avançada use `ChartContainer` + Recharts + `ChartTooltipContent` / `ChartLegendContent`.\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/chart" target="_blank" rel="noopener noreferrer">Chart — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chart>;

// Dados e config do doc "Your First Chart" (Untitled-1.md)
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--prizm-color-chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--prizm-color-chart-2)",
  },
};

/** Primeiro chart do doc: bar com grid, eixo, tooltip e legenda — só props. */
export const YourFirstChart: Story = {
  args: {
    config: chartConfig,
    data: chartData,
    type: "bar",
    xKey: "month",
    series: ["desktop", "mobile"],
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    height: 320,
    xAxisTickFormatter: (value) => value.slice(0, 3),
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-xl">
      <Chart {...args} />
    </div>
  ),
};

/** Bar chart por props. */
export const BarChartProps: Story = {
  ...YourFirstChart,
  args: {
    ...YourFirstChart.args,
    type: "bar",
  },
};

/** Line chart por props. */
export const LineChartProps: Story = {
  args: {
    config: chartConfig,
    data: chartData,
    type: "line",
    xKey: "month",
    series: ["desktop", "mobile"],
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    height: 320,
    xAxisTickFormatter: (value) => value.slice(0, 3),
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-xl">
      <Chart {...args} />
    </div>
  ),
};

/** Area chart por props. */
export const AreaChartProps: Story = {
  args: {
    config: chartConfig,
    data: chartData,
    type: "area",
    xKey: "month",
    series: ["desktop", "mobile"],
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    height: 320,
    xAxisTickFormatter: (value) => value.slice(0, 3),
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-xl">
      <Chart {...args} />
    </div>
  ),
};

/** Sem tooltip nem legenda (apenas grid e eixos). */
export const BarNoTooltipNoLegend: Story = {
  args: {
    config: chartConfig,
    data: chartData,
    type: "bar",
    xKey: "month",
    series: ["desktop", "mobile"],
    showTooltip: false,
    showLegend: false,
    showGrid: true,
    height: 280,
    xAxisTickFormatter: (value) => value.slice(0, 3),
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-xl">
      <Chart {...args} />
    </div>
  ),
};

/** Tooltip custom: labelKey/nameKey (ex. doc "Custom" — visitors + browser). */
const visitorsConfig: ChartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--prizm-color-chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--prizm-color-chart-2)",
  },
};

const browserData = [
  { browser: "chrome", visitors: 187 },
  { browser: "safari", visitors: 200 },
];

export const TooltipCustomKeys: Story = {
  args: {
    config: visitorsConfig,
    data: browserData,
    type: "bar",
    xKey: "browser",
    series: ["visitors"],
    showTooltip: true,
    showLegend: true,
    height: 280,
    tooltipLabelKey: "visitors",
    tooltipNameKey: "browser",
    legendNameKey: "browser",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <Chart {...args} />
    </div>
  ),
};

/** Escape hatch: composição com ChartContainer + Recharts (igual ao doc). */
export const Composition: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xl">
      <ChartContainer config={chartConfig} className="h-[320px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};
