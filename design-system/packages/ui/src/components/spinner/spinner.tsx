import { LoaderCircle } from "../icons";
import * as React from "react";

import { getSpinnerClassName, getSpinnerStyle } from "./spinner.styles";
import type { SpinnerProps } from "./spinner.types";

/**
 * Indicador de carregamento simples baseado em ícone SVG.
 *
 * API principal é feita por props (`size`, `speed`, `className`, `aria-*`), sem subcomponentes.
 * Dentro de um botão ou ao lado de um texto que já diz o que carrega, passe
 * `aria-hidden="true"`: quem anuncia é o botão (`aria-busy`) ou o texto.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" aria-label="Carregando pedidos" />
 * ```
 */
function Spinner({
  size = "md",
  speed,
  degree,
  icon,
  className,
  style,
  "aria-label": ariaLabel,
  role,
  ref,
  ...props
}: SpinnerProps & { ref?: React.Ref<SVGSVGElement> }) {
  const IconComponent = icon ?? LoaderCircle;
  // Decorative spinner (aria-hidden): no role and no default name.
  const hidden = props["aria-hidden"] === true || props["aria-hidden"] === "true";

  return (
    <IconComponent
      ref={ref}
      role={hidden ? role : (role ?? "status")}
      aria-label={hidden ? ariaLabel : (ariaLabel ?? "Carregando")}
      className={getSpinnerClassName({ size, className })}
      style={getSpinnerStyle({ speed: speed ?? degree ?? "normal", style })}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };
