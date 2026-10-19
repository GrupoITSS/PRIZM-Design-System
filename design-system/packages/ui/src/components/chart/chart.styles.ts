/**
 * PRIZM Chart — styles for Recharts-based charts.
 *
 * These classes rely on tokens from `@grupoitss/prizm-tokens` via Tailwind utilities
 * (border-border, bg-background, text-muted-foreground, etc.).
 */

/**
 * Root container styles applied to the chart wrapper.
 *
 * Includes a11y-friendly defaults for text and grid lines inside Recharts.
 */
export const chartContainerStyles =
  "flex aspect-video justify-center text-xs " +
  "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground " +
  "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 " +
  "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border " +
  "[&_.recharts-dot[stroke='#fff']]:stroke-transparent " +
  "[&_.recharts-layer]:outline-none " +
  "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border " +
  "[&_.recharts-radial-bar-background-sector]:fill-muted " +
  "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted " +
  "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border " +
  "[&_.recharts-sector[stroke='#fff']]:stroke-transparent " +
  "[&_.recharts-sector]:outline-none " +
  "[&_.recharts-surface]:outline-none";

export const chartTooltipContentStyles =
  "grid min-w-[8rem] items-start gap-1.5 rounded-lg border " +
  "border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl";

export const chartLegendContentStyles = "flex items-center justify-center gap-4";
