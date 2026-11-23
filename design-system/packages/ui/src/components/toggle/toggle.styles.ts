import { cva, type VariantProps } from "class-variance-authority";

// Decisões de 23/11/2026 (documentação do ToggleGroup, DS-91):
// - TG3: ligado em primary, como a pílula ativa do Tabs (DS-92). O accent de antes ficava
//   de 1,09 a 1,95:1 contra o fundo; o primary fica de 3,53 a 13,41:1.
// - TG4: anel de foco do Prizm, o mesmo do Button.
// - TG5: hover em accent nas duas variantes. No ligado, o véu preto de 10% sobre o primary,
//   como o hover dos tons do Button (DS-63).
const toggleBase = [
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap",
  "transition-[color,background-color,box-shadow] outline-none",
  "hover:bg-accent hover:text-accent-foreground",
  "focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
  "data-[state=on]:hover:bg-[color-mix(in_srgb,var(--prizm-color-primary),black_10%)] data-[state=on]:hover:text-primary-foreground",
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
].join(" ");

export const toggleVariants = cva(toggleBase, {
  variants: {
    variant: {
      default: "bg-transparent",
      // P1 (23/11/2026): o mesmo Outline do Button, com input-background e shadow-xs.
      outline:
        "border border-input bg-input-background shadow-xs data-[state=on]:border-primary",
    },
    // TG1 (23/11/2026): altura e largura mínima em control-height, como o Button. O item só
    // de ícone fica quadrado. Antes, h-9, h-10 e h-11, com texto xs no sm e base no lg.
    size: {
      default: "h-control-height-md min-w-control-height-md px-2",
      sm: "h-control-height-sm min-w-control-height-sm px-1.5",
      lg: "h-control-height-lg min-w-control-height-lg px-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
