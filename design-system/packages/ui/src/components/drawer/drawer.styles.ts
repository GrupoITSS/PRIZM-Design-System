/**
 * PRIZM Drawer — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Cores via variáveis CSS para garantir que usem sempre o tema PRIZM.
 *
 * O lado vem do atributo `data-vaul-drawer-direction` que o vaul põe no conteúdo
 * (bottom, top, right, left). A animação de entrada e saída é do próprio vaul.
 *
 * @see https://vaul.emilkowal.ski/
 */

/** Overlay: color/overlay (quase preto a 80% nos dois modos), sem desfoque. */
export const drawerOverlayStyles =
  "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/**
 * Content: painel preso à borda do lado escolhido.
 * Fundo color/card, como Sheet e Dialog (P4). Raio radius/lg e borda color/border
 * só do lado de dentro (D3). Topo e base até 85% da altura; laterais em 3/4 da
 * tela até max-width/sm (384px).
 */
export const drawerContentStyles = [
  "group/drawer-content fixed z-50 flex h-auto flex-col overflow-y-auto custom-scroll border-border bg-card text-card-foreground",
  "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
  "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[85vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
  "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-lg data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
  "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-lg data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
].join(" ");

/**
 * Alça: decorativa (P3), fora da árvore de acessibilidade. 100 × 8px; embaixo no
 * top; vertical, na borda de dentro, nas laterais.
 */
export const drawerHandleStyles = [
  "mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full bg-muted",
  "group-data-[vaul-drawer-direction=top]/drawer-content:order-last group-data-[vaul-drawer-direction=top]/drawer-content:mt-0 group-data-[vaul-drawer-direction=top]/drawer-content:mb-4",
  "group-data-[vaul-drawer-direction=right]/drawer-content:absolute group-data-[vaul-drawer-direction=right]/drawer-content:left-2 group-data-[vaul-drawer-direction=right]/drawer-content:top-1/2 group-data-[vaul-drawer-direction=right]/drawer-content:mt-0 group-data-[vaul-drawer-direction=right]/drawer-content:h-[100px] group-data-[vaul-drawer-direction=right]/drawer-content:w-2 group-data-[vaul-drawer-direction=right]/drawer-content:-translate-y-1/2",
  "group-data-[vaul-drawer-direction=left]/drawer-content:absolute group-data-[vaul-drawer-direction=left]/drawer-content:right-2 group-data-[vaul-drawer-direction=left]/drawer-content:top-1/2 group-data-[vaul-drawer-direction=left]/drawer-content:mt-0 group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] group-data-[vaul-drawer-direction=left]/drawer-content:w-2 group-data-[vaul-drawer-direction=left]/drawer-content:-translate-y-1/2",
].join(" ");

/** Header: título e descrição. Centralizado em top e bottom no celular; à esquerda nas laterais. */
export const drawerHeaderStyles =
  "grid gap-1.5 p-4 text-center sm:text-left group-data-[vaul-drawer-direction=left]/drawer-content:text-left group-data-[vaul-drawer-direction=right]/drawer-content:text-left";

/** Footer: ações empilhadas, a principal em cima (D2). */
export const drawerFooterStyles = "mt-auto flex flex-col gap-2 p-4";

/** Título do drawer: herda color/card-foreground do conteúdo. */
export const drawerTitleStyles = "text-lg font-semibold leading-none tracking-tight";

/** Descrição do drawer. */
export const drawerDescriptionStyles = "text-sm text-muted-foreground";
