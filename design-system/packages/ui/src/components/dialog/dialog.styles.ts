/**
 * PRIZM Dialog — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 *
 * Componente de dialog genérico baseado em Radix Dialog, alinhado visualmente
 * ao `AlertDialog` do design system, mas sem variantes semânticas.
 *
 * @see https://ui.shadcn.com/docs/components/radix/dialog
 */

/** Overlay: escurece o fundo com leve blur, usando alpha do PRIZM. */
export const dialogOverlayStyles =
  "fixed inset-0 z-50 bg-alpha-80 backdrop-blur-[0.125rem] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Content: modal centralizado com animação de zoom + fade.
 * Usa tokens de cor de `@grupoitss/prizm-tokens` (sidebar) e é compatível com tema claro/escuro.
 */
export const dialogContentStyles =
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-sidebar text-sidebar-foreground p-6 shadow-lg duration-200 overflow-y-auto custom-scroll data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-2xl";

/** Header: título e descrição alinhados como no AlertDialog. */
export const dialogHeaderStyles = "flex flex-col space-y-1.5 text-center sm:text-left";

/** Footer: botões alinhados à direita em telas maiores. */
export const dialogFooterStyles = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

/** Título do dialog. */
export const dialogTitleStyles = "text-lg font-semibold leading-none tracking-tight";

/** Descrição do dialog. */
export const dialogDescriptionStyles = "text-sm text-muted-foreground";

/**
 * Botão de fechar (X) — inset das bordas do modal.
 * Usado por Dialog (e reutilizado em Sheet) para manter o mesmo respiro em todas as modais.
 */
export const dialogCloseButtonStyles =
  "cursor-pointer absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground";

/** Seção de confirmação por digitação (ex.: exclusão destrutiva). */
export const dialogConfirmSectionStyles = "flex w-full flex-col gap-2";

/** Label acima do input de confirmação. */
export const dialogConfirmLabelStyles = "select-none text-sm leading-5 text-muted-foreground";
