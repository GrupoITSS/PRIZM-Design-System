import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/cn";
import {
  chartContainerStyles,
  chartLegendContentStyles,
  chartTooltipContentStyles,
} from "./chart.styles";
import type {
  ChartConfig,
  ChartContainerProps,
  ChartLegendContentProps,
  ChartProps,
  ChartTooltipContentProps,
  ChartTooltipPayloadItem,
} from "./chart.types";
import { toText } from "../../lib/to-text";

// Selector of each mode: @grupoitss/prizm-tokens switches mode with data-mode.
const THEMES = { light: "", dark: '[data-mode="dark"]' } as const;

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart(): ChartContextValue {
  const context = React.use(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/**
 * ChartContainer — wrapper para gráficos baseados em `recharts`.
 *
 * Responsável por:
 * - Fornecer contexto (`ChartConfig`) para tooltips e legendas.
 * - Aplicar estilos globais coerentes com o PRIZM (tokens de `@grupoitss/prizm-tokens`).
 * - Gerar variáveis CSS (`--color-<key>`) com base no `config`.
 *
 * Uso típico:
 *
 * ```tsx
 * const chartConfig: ChartConfig = {
 *   visitors: {
 *     label: "Visitors",
 *     theme: {
 *       light: "hsl(220 80% 56%)",
 *       dark: "hsl(220 70% 60%)",
 *     },
 *   },
 * };
 *
 * <ChartContainer config={chartConfig}>
 *   <LineChart data={data}>
 *     <Tooltip content={<ChartTooltipContent />} />
 *     <Legend content={<ChartLegendContent />} />
 *   </LineChart>
 * </ChartContainer>
 * ```
 *
 * @see https://ui.shadcn.com/docs/components/chart
 */
const ChartContainer = ({
  id,
  className,
  children,
  config,
  ref,
  ...props
}: ChartContainerProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(chartContainerStyles, className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext>
  );
};
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      // The CSS is built from the chart config (keys and colors), not user input.
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;

    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = ({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  ref,
  ...props
}: ChartTooltipContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div ref={ref} className={cn(chartTooltipContentStyles, className)} {...props}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {(payload ?? [])
          .filter((item: ChartTooltipPayloadItem) => item.type !== "none")
          .map((item: ChartTooltipPayloadItem, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload?.fill || item.color;

            return (
              <div
                // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                key={item.dataKey ?? index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-xs border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  ref,
  ...props
}: ChartLegendContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(chartLegendContentStyles, verticalAlign === "top" ? "pb-3" : "pt-3", className)}
      {...props}
    >
      {(payload ?? [])
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = nameKey || toText(item.dataKey) || "value";
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={toText(item.value)}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-xs"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
};
ChartLegendContent.displayName = "ChartLegendContent";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const record = payload as Record<string, unknown>;
  const nested = record.payload;
  const payloadPayload =
    typeof nested === "object" && nested !== null ? (nested as Record<string, unknown>) : undefined;

  let configLabelKey: string = key;
  const own = record[key];
  const fromNested = payloadPayload?.[key];

  if (typeof own === "string") {
    configLabelKey = own;
  } else if (typeof fromNested === "string") {
    configLabelKey = fromNested;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

const defaultHeight = 200;

/**
 * Chart — API por props. Renderiza um gráfico completo (bar, line ou area)
 * com grid, eixos, tooltip e legenda conforme as props, sem usar subcomponentes.
 *
 * Uso recomendado:
 *
 * ```tsx
 * <Chart
 *   config={chartConfig}
 *   data={chartData}
 *   type="bar"
 *   xKey="month"
 *   series={["desktop", "mobile"]}
 *   showTooltip
 *   showLegend
 *   showGrid
 * />
 * ```
 *
 * Para customização avançada, use ChartContainer + Recharts + ChartTooltipContent/ChartLegendContent.
 */
const Chart = ({
  config,
  data,
  type = "bar",
  xKey,
  series,
  showTooltip = true,
  showLegend = true,
  showGrid = true,
  height = defaultHeight,
  className,
  style,
  xAxisTickFormatter,
  accessibilityLayer = false,
  tooltipLabelKey,
  tooltipNameKey,
  legendNameKey,
  ref,
  ...props
}: ChartProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const heightValue = typeof height === "number" ? `${height}px` : String(height);

  const commonChartProps = {
    data,
    accessibilityLayer,
    margin: { left: 12, right: 12 },
  };

  const grid = showGrid ? (
    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" vertical={false} />
  ) : null;

  const xAxis = (
    <RechartsPrimitive.XAxis
      dataKey={xKey}
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={xAxisTickFormatter}
    />
  );

  const yAxis = <RechartsPrimitive.YAxis tickLine={false} axisLine={false} />;

  const tooltip = showTooltip ? (
    <ChartTooltip
      content={<ChartTooltipContent labelKey={tooltipLabelKey} nameKey={tooltipNameKey} />}
    />
  ) : null;

  const legend = showLegend ? (
    <ChartLegend content={<ChartLegendContent nameKey={legendNameKey} />} />
  ) : null;

  const seriesNodes = series.map((key) => {
    const fill = `var(--color-${key})`;
    if (type === "bar") {
      return <RechartsPrimitive.Bar key={key} dataKey={key} fill={fill} radius={4} />;
    }
    if (type === "line") {
      return (
        <RechartsPrimitive.Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={fill}
          strokeWidth={2}
          dot={false}
        />
      );
    }
    return (
      <RechartsPrimitive.Area
        key={key}
        type="monotone"
        dataKey={key}
        stroke={fill}
        fill={fill}
        fillOpacity={0.2}
      />
    );
  });

  const chart =
    type === "bar" ? (
      <RechartsPrimitive.BarChart {...commonChartProps}>
        {grid}
        {xAxis}
        {yAxis}
        {tooltip}
        {legend}
        {seriesNodes}
      </RechartsPrimitive.BarChart>
    ) : type === "line" ? (
      <RechartsPrimitive.LineChart {...commonChartProps}>
        {grid}
        {xAxis}
        {yAxis}
        {tooltip}
        {legend}
        {seriesNodes}
      </RechartsPrimitive.LineChart>
    ) : (
      <RechartsPrimitive.AreaChart {...commonChartProps}>
        {grid}
        {xAxis}
        {yAxis}
        {tooltip}
        {legend}
        {seriesNodes}
      </RechartsPrimitive.AreaChart>
    );

  return (
    <ChartContainer
      ref={ref}
      config={config}
      className={cn("w-full", className)}
      style={{ height: heightValue, ...style }}
      {...props}
    >
      {chart}
    </ChartContainer>
  );
};
Chart.displayName = "Chart";

export {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
export type { ChartConfig } from "./chart.types";
