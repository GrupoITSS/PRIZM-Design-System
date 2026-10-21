import { cva, type VariantProps } from "class-variance-authority";

export const INPUT_GROUP_BASE_CLASSES =
  // Wrapper visual alinhado ao `Input` base (tokens de `@grupoitss/prizm-tokens`)
  "group/input-group relative flex w-full min-w-0 items-center rounded-md border border-input bg-input-background shadow-xs " +
  // Transições suaves para foco/erro (border, box-shadow, background)
  "transition-[color,box-shadow,border-color,background-color] " +
  // Altura padrão alinhada ao Input sm (textarea força altura automática)
  "h-control-height-sm has-[>textarea]:h-auto " +
  "has-[[data-size=sm]]:h-control-height-sm has-[[data-size=md]]:h-control-height-md has-[[data-size=lg]]:h-control-height-lg " +
  // Espaçamento interno quando há addons inline
  "has-[>[data-align=inline-start]]:[&>input]:pl-2 " +
  "has-[>[data-align=inline-end]]:[&>input]:pr-2 " +
  // Layout em coluna quando addons estão em block (top/bottom)
  "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3 " +
  "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 " +
  // Estado de erro quando o controle interno está inválido
  "has-[[data-slot][aria-invalid=true]]:border-destructive";

export const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-sm [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first shrink-0 pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

export const inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-sm px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "h-control-height-sm gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-sm p-0 has-[>svg]:p-0",
      "icon-sm": "size-control-height-sm p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

export type InputGroupAddonVariantProps = VariantProps<typeof inputGroupAddonVariants>;

export type InputGroupButtonVariantProps = VariantProps<typeof inputGroupButtonVariants>;
