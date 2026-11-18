import { Button } from "../button";
import { Separator } from "../separator";
import { cn } from "../../lib/cn";
import { Slot } from "radix-ui";
import * as React from "react";
import {
  buttonGroupSeparatorClass,
  buttonGroupTextClass,
  buttonGroupVariants,
} from "./button-group.styles";
import type {
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
} from "./button-group.types";

/**
 * ButtonGroup — agrupa botões com estilo consistente e bordas compartilhadas.
 *
 * **API recomendada (somente props, sem subcomponentes):**
 * ```tsx
 * <ButtonGroup
 *   aria-label="Actions"
 *   buttons={[{ label: "Save", onClick: save }, { label: "Cancel", variant: "outline", onClick: cancel }]}
 * />
 * <ButtonGroup aria-label="Formato" buttons={[{ label: "One" }, { label: "Two" }]} text="Label" />
 * ```
 *
 * Composição com ButtonGroupSeparator / ButtonGroupText disponível como escape hatch.
 *
 * @see https://ui.shadcn.com/docs/components/radix/button-group
 */
function ButtonGroupRoot({
  className,
  orientation = "horizontal",
  buttons,
  separatorBetween = "auto",
  text,
  "aria-label": ariaLabel,
  children,
  ...props
}: ButtonGroupProps) {
  const useSimplifiedAPI = Array.isArray(buttons) && buttons.length > 0;
  const named = Boolean(ariaLabel ?? props["aria-labelledby"]);

  // Pendência 1 (18/11/2026): o grupo é role="group" e precisa de nome para o leitor de tela.
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        "ButtonGroup: grupo sem nome acessível. Passe aria-label ou aria-labelledby (ex.: aria-label=\"Ações do documento\").",
      );
    }
  }, [named]);

  const groupClassName = cn(buttonGroupVariants({ orientation }), className);

  const groupProps = {
    role: "group" as const,
    "data-slot": "button-group",
    "data-orientation": orientation,
    "aria-label": ariaLabel,
    className: groupClassName,
    ...props,
  };

  if (useSimplifiedAPI) {
    const sepOrientation = orientation === "vertical" ? "horizontal" : "vertical";
    // B3 (17/11/2026): no automático, o separador aparece nos grupos com fundo e nunca no Outline,
    // onde a borda já separa os botões.
    const showSeparator =
      separatorBetween === "auto"
        ? buttons.every((item) => (item.variant ?? "default") !== "outline")
        : separatorBetween;
    return (
      <div {...groupProps}>
        {text != null && (
          <div className={cn(buttonGroupTextClass)} data-slot="button-group-text">
            {text}
          </div>
        )}
        {buttons.map((item, index) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
          <React.Fragment key={index}>
            {showSeparator && index > 0 && (
              <Separator
                data-slot="button-group-separator"
                orientation={sepOrientation}
                className={cn(buttonGroupSeparatorClass)}
                decorative
              />
            )}
            <Button
              type={item.type ?? "button"}
              variant={item.variant ?? "default"}
              size={item.size ?? "default"}
              disabled={item.disabled}
              onClick={item.onClick}
              aria-label={item["aria-label"]}
            >
              {item.icon}
              {item.label}
            </Button>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return <div {...groupProps}>{children}</div>;
}

ButtonGroupRoot.displayName = "ButtonGroup";

/**
 * Separador visual entre botões no grupo (escape hatch para composição).
 * Para uso padrão, use a prop `separatorBetween` do ButtonGroup.
 */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(buttonGroupSeparatorClass, className)}
      decorative
      {...props}
    />
  );
}

ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

/**
 * Texto/label dentro do grupo (escape hatch para composição).
 * Para uso padrão, use a prop `text` do ButtonGroup.
 */
function ButtonGroupText({ className, asChild = false, ...props }: ButtonGroupTextProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      className={cn(buttonGroupTextClass, className)}
      data-slot="button-group-text"
      {...props}
    />
  );
}

ButtonGroupText.displayName = "ButtonGroupText";

export { ButtonGroupRoot as ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
