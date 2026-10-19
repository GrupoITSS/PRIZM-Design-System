import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Sheet — estilos alinhados ao shadcn/ui (new-york) + tokens de `@grupoitss/prizm-tokens`.
 *
 * @see https://ui.shadcn.com/docs/components/radix/sheet
 */
export const sheetOverlayStyles =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const sheetContentBase =
  "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500";

/**
 * Variantes de lado — iguais ao registry shadcn new-york:
 * laterais `w-3/4 sm:max-w-sm`; topo/base sem altura fixa artificial.
 */
export const sheetContentVariants = cva(sheetContentBase, {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

export type SheetContentVariantProps = VariantProps<typeof sheetContentVariants>;

/**
 * Layout `panel`: header / body / footer com bordas e scroll apenas no corpo
 * (padrão de painéis laterais de formulário/detalhe).
 */
export const sheetPanelStyles = {
  content: "min-w-0 gap-0 overflow-hidden p-0",
  header:
    "relative flex shrink-0 items-start justify-between gap-3 border-b border-border bg-background px-6 py-6",
  headerMain: "flex min-w-0 items-start gap-3",
  headerIcon: "shrink-0 pt-0.5",
  headerText: "flex min-w-0 flex-col gap-1",
  eyebrow: "mb-1",
  title: "text-base font-semibold leading-6 text-foreground",
  description: "text-sm leading-5 text-muted-foreground",
  headerActions: "flex shrink-0 items-center gap-2",
  close:
    "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  body: "custom-scroll min-h-0 min-w-0 flex-1 select-text overflow-y-auto overflow-x-hidden px-6 py-6",
  footer:
    "flex w-full shrink-0 items-center justify-end gap-4 border-t border-border bg-background px-5 py-6",
} as const;
