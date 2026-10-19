/**
 * PRIZM Carousel — wrapper for Embla carousel.
 * Uses tokens from @grupoitss/prizm-tokens (border-border, bg-background, etc.) via Tailwind classes.
 *
 * Base layout classes são simples o suficiente para não exigir CVA,
 * mas ficam aqui centralizadas para manter consistência com outros componentes.
 */

export const carouselRootStyles = "relative";

export const carouselViewportStyles = "overflow-hidden";

export const carouselContentStyles = (orientation: "horizontal" | "vertical"): string =>
  ["flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col"].join(" ");

export const carouselItemStyles = (orientation: "horizontal" | "vertical") =>
  ["min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4"].join(" ");

export const carouselPreviousButtonStyles = (orientation: "horizontal" | "vertical"): string =>
  [
    "absolute h-8 w-8 rounded-full",
    orientation === "horizontal"
      ? "-left-12 top-1/2 -translate-y-1/2"
      : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
  ].join(" ");

export const carouselNextButtonStyles = (orientation: "horizontal" | "vertical"): string =>
  [
    "absolute h-8 w-8 rounded-full",
    orientation === "horizontal"
      ? "-right-12 top-1/2 -translate-y-1/2"
      : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
  ].join(" ");
