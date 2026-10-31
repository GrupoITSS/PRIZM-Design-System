/**
 * PRIZM Alert Dialog — styles use design tokens from @grupoitss/prizm-tokens.
 * Radix Alert Dialog primitive with shadcn-style layout and tokens.
 *
 * @see [Alert Dialog — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/alert-dialog)
 */

/** Overlay: escurece o fundo + blur (estilo shadcn). */
export const alertDialogOverlayStyles =
  "fixed inset-0 z-50 bg-black/80 backdrop-blur-[0.125rem] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Content: apenas zoom (scale) + fade, sem slide — igual ao padrão shadcn.
 * Cantos sempre em radius/lg e 16px de margem até a borda da tela no celular
 * (max-w-[calc(100%-2rem)]); a partir de 640px, até max-width/lg (512px).
 */
export const alertDialogContentStyles =
  "group/alert-dialog-content fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-lg";

/**
 * Header: centralizado no celular; à esquerda a partir de 640px.
 * Com AlertDialogMedia, a mídia fica acima do título no celular e à esquerda
 * do título e da descrição a partir de 640px (gap spacing/6).
 */
export const alertDialogHeaderStyles =
  "grid grid-rows-[auto_1fr] place-items-center gap-2 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:place-items-start sm:text-left sm:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]";

/** Footer: no celular, botões empilhados com spacing/2 entre eles (a ação fica em cima). */
export const alertDialogFooterStyles = "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";

export const alertDialogTitleStyles =
  "text-lg font-semibold text-foreground sm:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2";

export const alertDialogDescriptionStyles = "text-sm text-muted-foreground";

/** Mídia: quadrado width/16 em color/muted, radius/md, ícone de 32px em color/foreground. */
export const alertDialogMediaStyles =
  "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted text-foreground sm:row-span-2 *:[svg:not([class*='size-'])]:size-8";
