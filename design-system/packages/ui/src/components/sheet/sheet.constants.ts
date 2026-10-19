/** Largura padrão dos sheets laterais (PRIZM). */
export const SHEET_PANEL_WIDTH_PX = 550;

/** Classes Tailwind para painel lateral — usar literal fixo (JIT). */
export const sheetPanelWidthClass = "w-[550px] max-w-[calc(100vw-3rem)]";

export const sheetPanelWidthClasses = {
  root: sheetPanelWidthClass,
  left: `data-[vaul-drawer-direction=left]:w-[550px] data-[vaul-drawer-direction=left]:max-w-[calc(100vw-3rem)]`,
  right: `data-[vaul-drawer-direction=right]:w-[550px] data-[vaul-drawer-direction=right]:max-w-[calc(100vw-3rem)]`,
} as const;
