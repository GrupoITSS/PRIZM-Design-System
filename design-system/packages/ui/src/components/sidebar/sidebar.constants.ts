/** Cookie que guarda se a Sidebar está aberta ou recolhida. */
export const SIDEBAR_COOKIE_NAME = "sidebar_state";
/** Validade do cookie: 7 dias. */
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
/** Largura aberta (256px). */
export const SIDEBAR_WIDTH = "16rem";
/** Largura da gaveta no celular (288px). */
export const SIDEBAR_WIDTH_MOBILE = "18rem";
/** Largura recolhida, a faixa de ícones (48px). */
export const SIDEBAR_WIDTH_ICON = "3rem";
/** Tecla do atalho, com Ctrl ou Cmd. */
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

/**
 * Textos padrão (pendência 9 de 10/11/2026): em pt-BR, para o leitor de tela não ler em inglês
 * numa página em português.
 */
export const SIDEBAR_LABELS = {
  /** Nome da região de navegação (`<nav aria-label>`). */
  nav: "Navegação",
  /** Nome do SidebarTrigger e do SidebarRail. */
  toggle: "Mostrar ou ocultar a navegação",
  /** Título da gaveta no celular (só para o leitor de tela). */
  mobileTitle: "Navegação",
  /** Descrição da gaveta no celular (só para o leitor de tela). */
  mobileDescription: "Navegação da solução.",
} as const;
