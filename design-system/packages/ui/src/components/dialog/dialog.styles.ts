import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Dialog — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 *
 * Componente de dialog genérico baseado em Radix Dialog, alinhado visualmente
 * ao `AlertDialog` do design system, mas sem variantes semânticas.
 *
 * @see https://ui.shadcn.com/docs/components/radix/dialog
 */

/** Overlay: color/overlay (quase preto a 80% nos dois modos), sem desfoque, como o Sheet. */
export const dialogOverlayStyles =
  "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Content: modal centralizado com animação de zoom + fade.
 *
 * Decisões de 06/11/2026, alinhadas ao AlertDialog: raio `rounded-lg` sempre e altura máxima da tela
 * menos 32px. Fundo `card` (DS-77, 23/11/2026; antes `background`, cinza no Digitrol claro), o mesmo do
 * AlertDialog e do Sheet. Coluna com cabeçalho e rodapé fixos: quem rola é o `DialogBody`. Sem ele
 * (composição antiga), o conteúdo inteiro continua rolando.
 *
 * Largura (09/11/2026): a tela menos 32px (16px de folga de cada lado), limitada pelo `size` em
 * `dialogContentVariants`. Sem `max-width` aqui: quem usa só esta string define a largura máxima.
 */
export const dialogContentStyles =
  "fixed left-[50%] top-[50%] z-50 flex flex-col w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto custom-scroll rounded-lg border border-border bg-card text-card-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95";

/**
 * Largura máxima do conteúdo, na escala `max-width/*` do Core (a de `max-w-*` do Tailwind).
 * A largura é sempre a tela menos 32px; o `size` só limita. `full` não limita.
 * Padrão `lg` (512px). Decisão de 09/11/2026, a pedido do Pricing.
 */
export const dialogContentVariants = cva(dialogContentStyles, {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type DialogContentVariantProps = VariantProps<typeof dialogContentVariants>;

/** Os tamanhos do Dialog, na ordem da escala. */
export const dialogSizes = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"] as const;

export type DialogSize = (typeof dialogSizes)[number];

/** Header: título e descrição alinhados como no AlertDialog. */
export const dialogHeaderStyles = "flex shrink-0 flex-col space-y-1.5 text-center sm:text-left";

/**
 * Corpo: a única parte que rola quando o conteúdo passa da altura máxima (DS-77). As margens negativas
 * levam a rolagem até a borda do Dialog e dão espaço ao anel de foco dos campos (`px-6 py-1`).
 */
export const dialogBodyStyles =
  "custom-scroll -mx-6 -my-1 min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-1";

/**
 * Linha do título: o título e um elemento ao lado (status ou ação, como um Switch "Ativo"),
 * a 12px (`spacing/3`), alinhados ao centro. Quebra de linha quando não cabe (8px, `spacing/2`).
 * Centralizada no celular e à esquerda a partir de 640px, como o cabeçalho. Decisão de 09/11/2026.
 */
export const dialogTitleRowStyles =
  "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start";

/** Footer: botões à direita a partir de 640px; no celular, empilhados com a ação principal em cima. */
export const dialogFooterStyles =
  "flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end";

/** Ações do rodapé, quando há `footerLeading`: o grupo da direita. */
export const dialogFooterActionsStyles = "flex flex-col-reverse gap-2 sm:flex-row";

/**
 * Leading do rodapé (DS-77): à esquerda das ações, como no Sheet. Lugar da ação destrutiva, um Button
 * `ghost` isolado ("Excluir"), que abre um AlertDialog para confirmar. No celular, fica embaixo.
 */
export const dialogFooterLeadingStyles = "flex items-center gap-2 sm:mr-auto";

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
