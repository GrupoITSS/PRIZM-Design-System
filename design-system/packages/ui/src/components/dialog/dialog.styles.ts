/**
 * PRIZM Dialog — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 *
 * Componente de dialog genérico baseado em Radix Dialog, alinhado visualmente
 * ao `AlertDialog` do design system, mas sem variantes semânticas.
 *
 * @see https://ui.shadcn.com/docs/components/radix/dialog
 */

/** Overlay: color/overlay (quase preto a 80% nos dois modos) com leve blur. */
export const dialogOverlayStyles =
  "fixed inset-0 z-50 bg-overlay backdrop-blur-[0.125rem] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Content: modal centralizado com animação de zoom + fade.
 *
 * Decisões de 06/11/2026, alinhadas ao AlertDialog: fundo `background` (antes `sidebar`, que no Docnix
 * e no Digitrol era escuro), raio `rounded-lg` sempre, 16px de folga no celular e 512px a partir de
 * 640px, altura máxima da tela menos 32px com rolagem por dentro.
 */
export const dialogContentStyles =
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto custom-scroll rounded-lg border border-border bg-background text-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-lg";

/** Header: título e descrição alinhados como no AlertDialog. */
export const dialogHeaderStyles = "flex flex-col space-y-1.5 text-center sm:text-left";

/** Footer: botões à direita a partir de 640px; no celular, empilhados com a ação principal em cima. */
export const dialogFooterStyles = "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";

/** Título do dialog. */
export const dialogTitleStyles = "text-lg font-semibold leading-none tracking-tight";

/** Descrição do dialog. */
export const dialogDescriptionStyles = "text-sm text-muted-foreground";

/**
 * Botão de fechar (X) antigo — 16px, `right-6 top-6`, foco antigo.
 * @deprecated O Dialog usa `dialogCloseStyles` desde 06/11/2026 (Button ghost icon-sm do Prizm).
 * Mantido porque o Sheet ainda usa.
 */
export const dialogCloseButtonStyles =
  "cursor-pointer absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground";

/**
 * Posição do botão fechar do Dialog: o Button ghost icon-sm (32px) a 8px do canto, para o X de 16px
 * ficar a 16px do canto, como no Figma.
 */
export const dialogCloseStyles = "absolute right-2 top-2";

/** Seção de confirmação por digitação (ex.: exclusão destrutiva). */
export const dialogConfirmSectionStyles = "flex w-full flex-col gap-2";

/** Label acima do input de confirmação. */
export const dialogConfirmLabelStyles = "select-none text-sm leading-5 text-muted-foreground";
