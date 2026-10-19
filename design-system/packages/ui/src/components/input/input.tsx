import { cn } from "../../lib/cn";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { inputVariants } from "./input.styles";
import type { InputProps } from "./input.types";

/**
 * Campo de texto do design system PRIZM.
 *
 * Wrapper estilizado para o `<input />` nativo, com tamanhos (`size`) e
 * tokens de cor tipados via `@grupoitss/prizm-tokens`.
 * Quando `type="password"`, exibe automaticamente o botão Eye/EyeOff.
 *
 * Uso recomendado:
 * ```tsx
 * <Input placeholder="Digite seu nome" />
 * <Input type="email" size="sm" />
 * <Input type="password" size="lg" disabled />
 * ```
 *
 * Baseado em shadcn/ui (Radix).
 *
 * @see https://ui.shadcn.com/docs/components/radix/input
 */
function Input({
  className,
  size = "md",
  type,
  startIcon,
  "aria-invalid": ariaInvalidProp,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const isInvalid = ariaInvalidProp === true || ariaInvalidProp === "true" ? true : false;
  const isPassword = type === "password";

  const [showPassword, setShowPassword] = React.useState(false);

  const inputClassName = cn(
    inputVariants({ size }),
    startIcon && "w-full pl-9",
    isPassword && "w-full pr-10",
    !startIcon && !isPassword && className,
  );

  const field = (
    <input
      ref={ref}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      data-slot="input"
      data-size={size}
      data-invalid={isInvalid ? "true" : undefined}
      aria-invalid={isInvalid ? "true" : undefined}
      className={inputClassName}
      {...props}
    />
  );

  if (!startIcon && !isPassword) {
    return field;
  }

  return (
    <div className={cn("relative min-w-0", className)} data-slot="input-with-icon">
      {startIcon ? (
        <span
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground [&_svg]:size-4"
          aria-hidden
        >
          {startIcon}
        </span>
      ) : null}
      {field}
      {isPassword ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
          onClick={() => setShowPassword((v) => !v)}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      ) : null}
    </div>
  );
}

Input.displayName = "Input";

export { Input };
