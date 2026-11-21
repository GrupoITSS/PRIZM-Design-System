import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Sheet — estilos alinhados ao shadcn/ui (new-york) + tokens de `@grupoitss/prizm-tokens`.
 * Decisões de 21/11/2026 (frame de documentação no Figma).
 *
 * @see https://ui.shadcn.com/docs/components/radix/sheet
 */

/** Overlay: `color/overlay` puro, sem desfoque. */
export const sheetOverlayStyles =
  "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Conteúdo: coluna com cabeçalho e rodapé fixos e o corpo rolando (`min-h-0 flex-1` no corpo).
 * Sem padding próprio: cada parte tem o seu (`spacing/6` nas laterais, `spacing/4` entre elas), como
 * no Figma.
 */
const sheetContentBase =
  "fixed z-50 flex flex-col overflow-hidden border-border bg-background text-foreground shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500";

/**
 * Lado e largura máxima (escala `max-width/*` do Core, a mesma do Dialog).
 *
 * - `left` e `right`: 75% da tela, limitado pelo `size` a partir de 640px. `full` não se aplica:
 *   nas laterais vale como `2xl`.
 * - `top` e `bottom`: a largura da tela no celular; a partir de 640px, centralizado e limitado
 *   pelo `size`. `full` não limita.
 *
 * Classes literais, por causa do JIT do Tailwind.
 */
export const sheetContentVariants = cva(sheetContentBase, {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
      full: "",
    },
  },
  compoundVariants: [
    { side: ["left", "right"], size: "sm", class: "sm:max-w-sm" },
    { side: ["left", "right"], size: "md", class: "sm:max-w-md" },
    { side: ["left", "right"], size: "lg", class: "sm:max-w-lg" },
    { side: ["left", "right"], size: "xl", class: "sm:max-w-xl" },
    { side: ["left", "right"], size: ["2xl", "full"], class: "sm:max-w-2xl" },
    { side: ["top", "bottom"], size: "sm", class: "sm:mx-auto sm:max-w-sm" },
    { side: ["top", "bottom"], size: "md", class: "sm:mx-auto sm:max-w-md" },
    { side: ["top", "bottom"], size: "lg", class: "sm:mx-auto sm:max-w-lg" },
    { side: ["top", "bottom"], size: "xl", class: "sm:mx-auto sm:max-w-xl" },
    { side: ["top", "bottom"], size: "2xl", class: "sm:mx-auto sm:max-w-2xl" },
    { side: ["top", "bottom"], size: "full", class: "max-w-none" },
  ],
  defaultVariants: {
    side: "right",
    size: "sm",
  },
});

export type SheetContentVariantProps = VariantProps<typeof sheetContentVariants>;

/** Os tamanhos do Sheet, na ordem da escala. */
export const sheetSizes = ["sm", "md", "lg", "xl", "2xl", "full"] as const;

export type SheetSize = (typeof sheetSizes)[number];

/**
 * Tamanho padrão por lado: `sm` (384px) nas laterais e `full` (largura da tela) em cima e embaixo,
 * que é o que o Sheet já fazia antes do `size`.
 */
export const sheetDefaultSize = {
  left: "sm",
  right: "sm",
  top: "full",
  bottom: "full",
} as const satisfies Record<"left" | "right" | "top" | "bottom", SheetSize>;

/** Cabeçalho: eyebrow, linha do título e descrição, a `spacing/1-5`. Centro no celular. */
export const sheetHeaderStyles =
  "flex shrink-0 flex-col gap-1.5 pb-4 pl-6 pr-12 pt-6 text-center sm:text-left";

/** Eyebrow: acima do título. */
export const sheetEyebrowStyles = "text-xs font-medium text-muted-foreground";

/**
 * Linha do título: título, Title Adornment (a `spacing/3`) e Header Actions à direita, alinhados ao
 * centro. Quebra de linha quando não cabe (`spacing/2`).
 */
export const sheetTitleRowStyles =
  "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start";

/** Título do sheet. */
export const sheetTitleStyles = "text-lg font-semibold leading-none tracking-tight";

/** Descrição do sheet. */
export const sheetDescriptionStyles = "text-sm text-muted-foreground";

/** Ações do cabeçalho: até 2 botões ghost icon-sm, à direita da linha do título. */
export const sheetHeaderActionsStyles = "flex items-center gap-2 sm:ml-auto";

/** Corpo: a única parte que rola. */
export const sheetBodyStyles =
  "custom-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-6 pb-4";

/**
 * Rodapé fixo, com linha em cima: botões à direita a partir de 640px; no celular, empilhados com a ação principal em
 * cima. O Leading (opcional) fica à esquerda.
 */
export const sheetFooterStyles =
  "flex shrink-0 flex-col-reverse gap-3 border-t border-border px-6 pb-6 pt-4 sm:flex-row sm:items-center sm:justify-end";

/** Ações do rodapé: botões a `spacing/2`; no celular, empilhados com a principal em cima. */
export const sheetFooterActionsStyles = "flex flex-col-reverse gap-2 sm:flex-row";

/** Leading do rodapé: à esquerda das ações a partir de 640px. */
export const sheetFooterLeadingStyles = "flex items-center gap-2 sm:mr-auto";

/** Botão fechar: o Button ghost icon-sm (32px) a `spacing/2` do canto, como no Dialog. */
export const sheetCloseStyles = "absolute right-2 top-2";
