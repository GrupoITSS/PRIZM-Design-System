import type * as React from "react";

/**
 * Props do componente `Spinner` do design system PRIZM.
 *
 * - Baseado em um ícone SVG (`LoaderCircle`) com animação de loading.
 * - Expõe `size` como API principal para tamanhos mais comuns.
 * - Permite sobrescrever `className`, velocidade (`degree`), ícone (`icon`) e outros atributos nativos de `<svg>`.
 */
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Define o tamanho visual do spinner.
   *
   * @default "md"
   * @example
   * ```tsx
   * <Spinner size="sm" />
   * <Spinner size="lg" />
   * ```
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Velocidade da animação de rotação do spinner.
   *
   * @default "normal"
   * @example
   * ```tsx
   * <Spinner degree="slow" />
   * <Spinner degree="fast" />
   * ```
   */
  degree?: "slow" | "normal" | "fast";

  /**
   * Componente de ícone a ser usado no lugar do `LoaderCircle` padrão.
   * Deve ser um SVG compatível com os atributos nativos de `<svg>`.
   *
   * @default LoaderCircle
   * @example
   * ```tsx
   * import { Loader } from "@grupoitss/prizm-ui/icons";
   *
   * <Spinner icon={Loader} />
   * ```
   */
  icon?: React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
}
