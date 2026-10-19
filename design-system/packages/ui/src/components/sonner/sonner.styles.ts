import { buttonVariants } from "../button";

/**
 * Estilos do PRIZM Toaster (Sonner).
 *
 * Mantém os estilos alinhados aos tokens do design system e,
 * principalmente, garante que o botão de ação dentro do toast
 * tenha a **mesma cara do `Button`**.
 */

/** Classe base aplicada ao container do Toaster (portal raiz do sonner). */
export const toasterBaseClassName = "toaster group z-[9999]";

/**
 * Classe base aplicada ao toast em si.
 *
 * Usa `prizm-toast` (não `toast`): hosts como Docnix definem `.toast { opacity: 0 }`
 * para o toaster deles. O Sonner aplica opacity via `:where(...)` (especificidade 0),
 * então a regra do host vencia e o toast do PAS ficava invisível no light DOM.
 */
export const toastBaseClassName =
  // Sonner injeta CSS global sem @layer (`background: var(--normal-bg)` etc.).
  // Com `theme="system"` + OS escuro, `--normal-bg` fica #000 e vence utilitários em @layer.
  // Evitar `!bg-*`/`!text-*` aqui: isso esmagava classes de variante (success/error/info/warning/loading).
  "group prizm-toast bg-background text-foreground border-border shadow-lg";

/**
 * Descrição secundária: evita `muted-foreground` puro em toasts coloridos
 * (ex.: erro com fundo clarinho), onde o contraste costuma falhar — usa
 * `foreground` com opacidade para legibilidade em light e dark.
 */
export const toastDescriptionClassName = "group-[.prizm-toast]:!text-foreground/80";

/**
 * Classe aplicada ao botão de ação principal do toast.
 *
 * Usa exatamente as mesmas classes do `Button` com `variant="ghost"`
 * e `size="sm"`, para manter consistência visual.
 */
export const toastActionButtonClassName = buttonVariants({
  variant: "ghost",
  size: "sm",
})
  // Sonner aplica estilos próprios no actionButton; usamos `!` para garantir
  // que o resultado fique idêntico ao `Button` do PRIZM.
  .concat(" !bg-transparent !text-foreground !shadow-none");

/** Classe aplicada ao botão de cancelar/fechar secundário do toast. */
export const toastCancelButtonClassName =
  "group-[.prizm-toast]:bg-muted group-[.prizm-toast]:text-muted-foreground";

/** Variantes semânticas (PRIZM tokens + color-mix) — usadas no Toaster e no scan do embed portal. */
export const toastSuccessClassName = "!bg-success !text-success-foreground !border-success";

export const toastErrorClassName =
  "!bg-destructive !text-destructive-foreground !border-destructive";

export const toastWarningClassName = "!bg-warning !text-warning-foreground !border-warning";

export const toastInfoClassName = "!bg-primary !text-primary-foreground !border-primary";

export const toastLoadingClassName = "!bg-secondary !text-secondary-foreground !border-secondary";

/** Sentinel para Tailwind `@source` (ex.: assistant-embedded embed-portal.css). */
export const toastVariantClassNamesSentinel = [
  toastSuccessClassName,
  toastErrorClassName,
  toastWarningClassName,
  toastInfoClassName,
  toastLoadingClassName,
].join(" ");
