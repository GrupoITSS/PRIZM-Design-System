import type * as React from "react";
import type * as RechartsPrimitive from "recharts";

/**
 * Configuration map for chart series and segments.
 *
 * Each key represents a logical data series or category and controls:
 * - `label`: human‑readable label used in tooltips and legends
 * - `icon`: optional icon rendered next to labels
 * - `color`/`theme`: CSS color used to derive CSS vars (`--color-<key>`)
 *
 * When `theme` is provided, it is a map of `{ light, dark }` selectors and
 * the actual color is resolved per‑theme.
 */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | {
        color?: never;
        theme: {
          light?: string;
          dark?: string;
          [key: string]: string | undefined;
        };
      }
  );
};

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  /**
   * Chart configuration map. Required.
   */
  config: ChartConfig;
  /**
   * Children are rendered inside a `ResponsiveContainer` from `recharts`.
   *
   * @example
   * <ChartContainer config={config}>
   *   <LineChart data={data}>...</LineChart>
   * </ChartContainer>
   */
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}

/**
 * Shape of a single tooltip payload item (from Recharts).
 * Used so payload items are typed in ChartTooltipContent.
 */
export interface ChartTooltipPayloadItem {
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown> & { fill?: string };
  type?: string;
}

/**
 * Props para o conteúdo customizado de tooltip.
 *
 * Não estendemos diretamente os tipos de Tooltip do Recharts para evitar
 * conflitos de propriedades (como `content`) com atributos HTML.
 * Mantemos apenas o subconjunto que realmente usamos.
 */
export interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: React.ReactNode;
  /** Classe extra do rótulo do tooltip. */
  labelClassName?: string;
  labelFormatter?: (value: React.ReactNode, payload?: unknown[]) => React.ReactNode;
  formatter?: (
    value: number | string,
    name: string,
    item: unknown,
    index: number,
    payload: unknown,
  ) => React.ReactNode;
  color?: string;
  /**
   * Hide the computed label section.
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Hide the color indicator/icon.
   * @default false
   */
  hideIndicator?: boolean;
  /**
   * Type of visual indicator for each series.
   * @default "dot"
   */
  indicator?: "line" | "dot" | "dashed";
  /**
   * Key used to resolve the series name from the payload/config.
   */
  nameKey?: string;
  /**
   * Key used to resolve the label from the payload/config.
   */
  labelKey?: string;
}

/**
 * Shape of a single legend payload item (from Recharts).
 */
export interface ChartLegendPayloadItem {
  value?: string | number;
  dataKey?: string | number;
  color?: string;
  type?: string;
}

export interface ChartLegendContentProps
  extends
    React.ComponentProps<"div">,
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> {
  /**
   * Hide icons in the legend items.
   * @default false
   */
  hideIcon?: boolean;
  /**
   * Key used to resolve the series name from the payload/config.
   */
  nameKey?: string;
}

/** Chart type when using the prop-based API. */
export type ChartType = "bar" | "line" | "area";

/**
 * Props for the prop-based Chart component.
 * Pass config, data, type, xKey and series to render a full chart without subcomponents.
 */
export interface ChartProps extends React.ComponentProps<"div"> {
  /**
   * Chart configuration (labels, colors, theme). Required.
   */
  config: ChartConfig;
  /**
   * Chart data: array of objects. Must include the key used by `xKey` and keys for each `series`.
   */
  data: Record<string, string | number>[];
  /**
   * Chart variant.
   * @default "bar"
   */
  type?: ChartType;
  /**
   * Data key for the x-axis (e.g. "month", "name").
   */
  xKey: string;
  /**
   * Data keys for each series (e.g. ["desktop", "mobile"]). Must match keys in config and data.
   */
  series: string[];
  /**
   * Show tooltip on hover.
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Show legend.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Show cartesian grid.
   * @default true
   */
  showGrid?: boolean;
  /**
   * Minimum height of the chart container (e.g. "200px", 200). Required for responsive behavior.
   * @default "200px"
   */
  height?: number | string;
  /**
   * Optional formatter for x-axis ticks (e.g. value => value.slice(0, 3)).
   */
  xAxisTickFormatter?: (value: string) => string;
  /**
   * Enable Recharts accessibility layer (keyboard + screen reader).
   * @default false
   */
  accessibilityLayer?: boolean;
  /**
   * Tooltip: use a custom key for the label (from config).
   */
  tooltipLabelKey?: string;
  /**
   * Tooltip: use a custom key for the name (from config).
   */
  tooltipNameKey?: string;
  /**
   * Legend: use a custom key for the name (from config).
   */
  legendNameKey?: string;
}
