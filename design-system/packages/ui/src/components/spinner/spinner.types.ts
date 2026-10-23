import type * as React from "react";

/**
 * Props do componente `Spinner` do design system PRIZM.
 *
 * - Baseado em um ícone SVG (`LoaderCircle`) com animação de loading.
 * - Expõe `size` como API principal para tamanhos mais comuns.
 * - Permite sobrescrever `className`, velocidade (`speed`), ícone (`icon`) e outros atributos nativos de `<svg>`.
 */
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Define o tamanho visual do spinner: xs 12px, sm 16px, md 20px, lg 24px e xl 32px
   * (o "Size" do Figma).
   *
   * @default "md"
   * @example
   * ```tsx
   * <Spinner size="sm" />
   * <Spinner size="xl" />
   * ```
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Velocidade da rotação: slow 800ms, normal 600ms e fast 400ms por volta.
   * Com prefers-reduced-motion, o spinner gira a 1,5s por volta.
   *
   * @default "normal"
   * @example
   * ```tsx
   * <Spinner speed="slow" />
   * <Spinner speed="fast" />
   * ```
   */
  speed?: "slow" | "normal" | "fast";

  /**
   * @deprecated Use `speed`. Aceito até a próxima versão.
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
