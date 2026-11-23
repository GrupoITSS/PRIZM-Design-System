import { cn } from "../../lib/cn";
import { Toggle as RadixToggle } from "radix-ui";
import * as React from "react";
import { toggleVariants } from "./toggle.styles";
import type { ToggleProps } from "./toggle.types";
import { hasNameAttribute, hasTextContent } from "./toggle.utils";

/**
 * Toggle do design system PRIZM: botão que liga e desliga um estado (`aria-pressed`).
 *
 * API principal é baseada em props (`pressed`, `defaultPressed`, `onPressedChange`),
 * sem necessidade de subcomponentes. Usa Radix Toggle como base para acessibilidade.
 *
 * Toggle só de ícone precisa de `aria-label`. Com texto visível, não passe `aria-label`:
 * o nome tem de conter o texto que a pessoa vê (WCAG 2.5.3).
 *
 * @see [Toggle — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/toggle)
 */
function Toggle({
  className,
  variant = "default",
  size = "default",
  pressed,
  defaultPressed,
  onPressedChange,
  asChild = false,
  children,
  ref,
  ...props
}: ToggleProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const named = asChild || hasNameAttribute(props) || hasTextContent(children);

  // Pendência 2 de acessibilidade (23/11/2026): Toggle só de ícone sem nome vira um botão sem nome.
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        'Toggle: botão só de ícone sem nome acessível. Passe aria-label (ex.: aria-label="Negrito").',
      );
    }
  }, [named]);

  return (
    <RadixToggle.Root
      ref={ref}
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(toggleVariants({ variant, size, className }))}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      asChild={asChild}
      {...props}
    >
      {children}
    </RadixToggle.Root>
  );
}

Toggle.displayName = "Toggle";

export { Toggle };
