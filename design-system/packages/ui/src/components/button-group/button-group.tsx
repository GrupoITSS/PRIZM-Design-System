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
 * <ButtonGroup buttons={[{ label: "One" }, { label: "Two" }]} separatorBetween text="Label" />
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
  separatorBetween = false,
  text,
  "aria-label": ariaLabel,
  children,
  ...props
}: ButtonGroupProps) {
  const useSimplifiedAPI = Array.isArray(buttons) && buttons.length > 0;

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
            {separatorBetween && index > 0 && (
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
