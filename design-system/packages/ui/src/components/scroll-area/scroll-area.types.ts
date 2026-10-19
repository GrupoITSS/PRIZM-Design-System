import type * as React from "react";
import type { ScrollArea as RadixScrollArea } from "radix-ui";
import type { VariantProps } from "class-variance-authority";
import type { scrollBarClasses } from "./scroll-area.styles";

type RadixScrollAreaRootProps = React.ComponentPropsWithoutRef<typeof RadixScrollArea.Root>;

export type ScrollBarVariantProps = VariantProps<typeof scrollBarClasses>;

/**
 * Props do componente ScrollArea do design system PRIZM.
 *
 * API simplificada baseada em props:
 * - `horizontal` para habilitar barra de rolagem horizontal;
 * - `hideScrollbars` para esconder visualmente as barras (mantendo rolagem);
 * - `className` para estilização adicional do contêiner;
 * - Suporta todos os atributos nativos do ScrollArea Radix (exceto `asChild`).
 *
 * Casos avançados devem ser resolvidos por novas props neste wrapper,
 * **não** via subcomponentes.
 */
export interface ScrollAreaProps extends Omit<RadixScrollAreaRootProps, "asChild"> {
  /**
   * Habilita barra de rolagem horizontal além da vertical.
   *
   * @default false
   * @example
   * <ScrollArea horizontal className="w-96">
   *   <div style={{ width: 600 }}>Conteúdo largo</div>
   * </ScrollArea>
   */
  horizontal?: boolean;

  /**
   * Esconde visualmente as barras de rolagem, mantendo a rolagem funcional.
   *
   * Útil para carrosséis e listas onde o scroll é feito via mouse wheel,
   * trackpad ou touch, sem exibir as barras.
   *
   * @default false
   */
  hideScrollbars?: boolean;

  /**
   * Classe CSS adicional aplicada ao elemento raiz do ScrollArea.
   */
  className?: string;
}
