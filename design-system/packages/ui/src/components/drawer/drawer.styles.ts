/**
 * PRIZM Drawer — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Cores via variáveis CSS para garantir que usem sempre o tema PRIZM.
 *
 * @see https://vaul.emilkowal.ski/
 */

/** Overlay: escurece o fundo. Mantém negro semi-transparente para contraste. */
export const drawerOverlayStyles =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Content: painel fixo (bottom/top/left/right).
 * Cores explícitas de @grupoitss/prizm-tokens (--background, --border).
 * custom-scroll + overflow-y-auto para scroll com scrollbar PRIZM.
 */
export const drawerContentStyles =
  "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col overflow-y-auto rounded-t-[10px] border bg-background border-border custom-scroll data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom";

/** Alça (handle) no topo do conteúdo. */
export const drawerHandleStyles = "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted";

/** Header: título e descrição. */
export const drawerHeaderStyles = "grid gap-1.5 p-4 text-center sm:text-left";

/** Footer: ações. */
export const drawerFooterStyles = "mt-auto flex flex-col gap-2 p-4";

/** Título do drawer. */
export const drawerTitleStyles =
  "text-lg font-semibold leading-none tracking-tight text-foreground";

/** Descrição do drawer. */
export const drawerDescriptionStyles = "text-sm text-muted-foreground";
