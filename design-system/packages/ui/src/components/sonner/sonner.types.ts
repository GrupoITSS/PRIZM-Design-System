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
 * Para cenários comuns, recomenda‑se configurar apenas:
 * - `richColors` (boolean)
 * - `position`
 * - `expand` / `duration`
 */
export type ToasterProps = SonnerToasterBaseProps;
