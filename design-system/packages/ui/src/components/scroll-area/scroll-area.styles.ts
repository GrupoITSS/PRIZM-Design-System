import { cva } from "class-variance-authority";

/**
 * PRIZM ScrollArea — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Baseado no componente ScrollArea do shadcn/ui (Radix).
 */
export const scrollAreaRootClasses = "relative overflow-hidden bg-background text-foreground";

export const scrollAreaViewportClasses =
  "h-full w-full rounded-[inherit] [&>[data-slot=scroll-area-content]]:h-full [&>[data-slot=scroll-area-content]]:w-full";

export const scrollBarClasses = cva("flex touch-none select-none transition-colors", {
  variants: {
    orientation: {
      vertical: "h-full w-2.5 border-l border-l-transparent p-[1px] data-[state=hidden]:opacity-0",
      horizontal:
        "h-2.5 flex-col border-t border-t-transparent p-[1px] data-[state=hidden]:opacity-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const scrollBarThumbClasses =
  "relative flex-1 rounded-full bg-border before:absolute before:left-1/2 before:top-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:content-['']";
