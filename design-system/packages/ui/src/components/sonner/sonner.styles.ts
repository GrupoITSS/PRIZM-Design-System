import type * as React from "react";
import { buttonVariants } from "../button";

/**
 * Estilos do PRIZM Toaster (Sonner).
 *
 * Decisões de 13/11/2026 (etapa 1 da documentação):
 * - Tons no padrão do Alert: fundo `<tom>-weak`, borda e ícone no tom, título e descrição em
 *   `<tom>-strong`. `default` e `loading` são neutros (`card`, `border`, `foreground`), com a
 *   descrição em `muted-foreground`.
 * - Texto em `text-sm` (14px), não nos 13px do Sonner.
 * - Ação com o Button `outline` `sm` do Prizm.
 * - Info com os tokens `info` (antes, `primary`).
 * - Foco com o anel do Prizm (etapa 4: o anel do Sonner, preto a 16%, não chegava a 3:1).
 *
 * O Sonner injeta CSS global fora de `@layer`, e CSS fora de camada vence os utilitários do
 * Tailwind, que ficam em `@layer utilities`, qualquer que seja a especificidade. Por isso:
 * - as cores vão pelas variáveis CSS do próprio Sonner (`toasterStyle`), sem `!`;
 * - o que o Sonner fixa sem variável (tamanho da fonte, gap, sombra, foco, o botão de ação)
 *   leva `!`.
 */

/** Classe base aplicada ao container do Toaster (portal raiz do sonner). */
export const toasterBaseClassName = "toaster group z-[9999]";

/**
 * Cores e raio pelas variáveis do Sonner, apontando para os tokens do Prizm. Valem para os
 * temas claro e escuro do Sonner: quem decide o modo é o `data-mode` do Prizm.
 * Os tons (`--success-*`, `--info-*`, `--warning-*`, `--error-*`) só se aplicam com
 * `richColors`, que o Toaster liga por padrão.
 */
export const toasterStyle = {
  "--normal-bg": "var(--prizm-color-card)",
  "--normal-border": "var(--prizm-color-border)",
  "--normal-text": "var(--prizm-color-foreground)",
  "--success-bg": "var(--prizm-color-success-weak)",
  "--success-border": "var(--prizm-color-success)",
  "--success-text": "var(--prizm-color-success-strong)",
  "--info-bg": "var(--prizm-color-info-weak)",
  "--info-border": "var(--prizm-color-info)",
  "--info-text": "var(--prizm-color-info-strong)",
  "--warning-bg": "var(--prizm-color-warning-weak)",
  "--warning-border": "var(--prizm-color-warning)",
  "--warning-text": "var(--prizm-color-warning-strong)",
  "--error-bg": "var(--prizm-color-destructive-weak)",
  "--error-border": "var(--prizm-color-destructive)",
  "--error-text": "var(--prizm-color-destructive-strong)",
  "--border-radius": "var(--prizm-radius-lg)",
} as React.CSSProperties;

/** Anel de foco do Prizm (o mesmo do Button), forçado sobre o box-shadow do Sonner. */
const focusRingClassName =
  "focus-visible:!ring-[3px] focus-visible:!ring-ring focus-visible:!ring-offset-2 focus-visible:!ring-offset-ring-offset";

/**
 * Classe base aplicada ao toast em si.
 *
 * Usa `prizm-toast` (não `toast`): hosts como Docnix definem `.toast { opacity: 0 }`
 * para o toaster deles. O Sonner aplica opacity via `:where(...)` (especificidade 0),
 * então a regra do host vencia e o toast do PAS ficava invisível no light DOM.
 */
export const toastBaseClassName = [
  "group prizm-toast !gap-2 !text-sm !shadow-lg",
  focusRingClassName,
].join(" ");

/** Título: `text/sm` medium, com a altura de linha do `text-sm` (20px). */
export const toastTitleClassName = "!leading-5";

/** Descrição: `text/sm` normal. A cor é a do tom; em `default` e `loading`, `muted-foreground`. */
export const toastDescriptionClassName = "!leading-5";

/** `default` e `loading`: descrição secundária, como no Alert. */
export const toastNeutralClassName = "[&_[data-description]]:!text-muted-foreground";

/**
 * Botão de ação: o Button `outline` `sm` do Prizm. O Sonner fixa altura, padding, fonte, cores,
 * borda e foco do `[data-button]` fora de camada, então as classes do Button vão com `!`.
 */
export const toastActionButtonClassName = [
  buttonVariants({ variant: "outline", size: "sm" }),
  "!h-control-height-sm !rounded-md !border !border-input !bg-input-background !px-3 !text-xs !font-medium !text-foreground !shadow-xs",
  "hover:!bg-accent hover:!text-accent-foreground",
  focusRingClassName,
].join(" ");

/** Classe aplicada ao botão de cancelar secundário do toast. */
export const toastCancelButtonClassName =
  "group-[.prizm-toast]:bg-muted group-[.prizm-toast]:text-muted-foreground";

/**
 * Botão fechar: 24px, o alvo mínimo da WCAG 2.2 (2.5.8). O do Sonner tem 20px.
 * Desligado por padrão (`closeButton={false}`).
 */
export const toastCloseButtonClassName = "!size-6";

/** Ícone de cada tom no tom base, como no Alert; o texto fica no `-strong`. */
export const toastSuccessClassName = "[&_[data-icon]]:text-success";

export const toastErrorClassName = "[&_[data-icon]]:text-destructive";

export const toastWarningClassName = "[&_[data-icon]]:text-warning";

export const toastInfoClassName = "[&_[data-icon]]:text-info";

export const toastLoadingClassName = toastNeutralClassName;

/** Sentinel para Tailwind `@source` (ex.: assistant-embedded embed-portal.css). */
export const toastVariantClassNamesSentinel = [
  toastSuccessClassName,
  toastErrorClassName,
  toastWarningClassName,
  toastInfoClassName,
  toastLoadingClassName,
  toastNeutralClassName,
].join(" ");
