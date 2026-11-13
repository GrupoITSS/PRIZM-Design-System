import type * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

/**
 * Base props do `sonner` Toaster.
 * Mantemos esse tipo como extensão direta do componente original para herdar
 * novas props automaticamente em futuras versões da lib.
 */
export type SonnerToasterBaseProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * Props do `PRIZM Toaster` (wrapper do Sonner).
 *
 * API é totalmente baseada em props, seguindo a API original do Sonner:
 * - `position`, `richColors`, `closeButton`, `duration`, `theme`, etc.
 *
 * Padrões do Prizm (decisões de 13/11/2026): `position="top-right"`, `richColors` ligado (é ele
 * que aplica os tons do Prizm; desligado, todo toast fica neutro), `closeButton` desligado e
 * `theme="system"`. As cores seguem o `data-mode` do Prizm, não o `theme`.
 *
 * Toast com ação: use `duration` maior (ex.: `10000`) e deixe a mesma ação disponível fora do
 * toast, porque ele some (WCAG 2.2.1).
 */
export type ToasterProps = SonnerToasterBaseProps;
