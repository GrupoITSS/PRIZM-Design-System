import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { getSpinnerClassName, getSpinnerStyle } from "./spinner.styles";
import type { SpinnerProps } from "./spinner.types";

/**
 * Indicador de carregamento simples baseado em ícone SVG.
 *
 * API principal é feita por props (`size`, `className`, `aria-*`), sem subcomponentes.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" aria-label="Loading data" />
 * ```
 */
function Spinner({
  size = "md",
  degree = "normal",
  icon,
  className,
  style,
  "aria-label": ariaLabel,
  role,
  ref,
  ...props
}: SpinnerProps & { ref?: React.Ref<SVGSVGElement> }) {
  const IconComponent = icon ?? Loader2Icon;

  return (
    <IconComponent
      ref={ref}
      role={role ?? "status"}
      aria-label={ariaLabel ?? "Loading"}
      className={getSpinnerClassName({ size, className })}
      style={getSpinnerStyle({ degree, style })}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };
