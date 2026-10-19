import { ToggleGroup as RadixToggleGroup } from "radix-ui";
import * as React from "react";

import { toggleVariants } from "../toggle/toggle.styles";
import { cn } from "../../lib/cn";

import { getToggleGroupRootClasses } from "./toggle-group.styles";
import type {
  ToggleGroupItemOption,
  ToggleGroupPrimitiveRootProps,
  ToggleGroupProps,
} from "./toggle-group.types";

/**
 * Grupo de toggles do design system PRIZM.
 *
 * **API principal baseada em props**:
 * - `type`, `items`, `value`, `defaultValue`, `onValueChange`
 * - `variant`, `size` (herdadas do `Toggle`)
 *
 * Exemplo recomendado (sem subcomponentes):
 *
 * ```tsx
 * <ToggleGroup
 *   type="multiple"
 *   items={[
 *     { value: "bold", icon: <Bold />, ariaLabel: "Negrito" },
 *     { value: "italic", icon: <Italic />, ariaLabel: "Itálico" },
 *   ]}
 * />
 * ```
 *
 * Para casos avançados, ainda é possível usar `children` com `RadixToggleGroup.Item`,
 * mas o caminho recomendado é via `items`.
 *
 * @see https://ui.shadcn.com/docs/components/toggle-group
 */
function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  type = "single",
  orientation = "horizontal",
  spacing = 1,
  value,
  defaultValue,
  onValueChange,
  items,
  children,
  ref,
  ...props
}: ToggleGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const handleValueChange = React.useCallback(
    (nextValue: string | string[]) => {
      if (!onValueChange) return;
      onValueChange(nextValue);
    },
    [onValueChange],
  );

  const rootProps: ToggleGroupPrimitiveRootProps = {
    type,
    value: value,
    defaultValue: defaultValue,
    onValueChange: handleValueChange as ToggleGroupPrimitiveRootProps["onValueChange"],
    orientation,
    ...props,
  };

  const useItemsAPI = Array.isArray(items) && items.length > 0;

  return (
    <RadixToggleGroup.Root
      ref={ref}
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      className={cn(getToggleGroupRootClasses(orientation, spacing), className)}
      {...rootProps}
    >
      {useItemsAPI
        ? items.map(
            (
              {
                value: itemValue,
                label,
                icon,
                disabled,
                className: itemClassName,
                ariaLabel,
              }: ToggleGroupItemOption,
              index,
            ) => (
              <RadixToggleGroup.Item
                // `value` é único na lista de itens; fallback para índice apenas por segurança.
                // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                key={itemValue ?? index}
                value={itemValue}
                disabled={disabled}
                aria-label={ariaLabel}
                className={cn(
                  toggleVariants({
                    variant,
                    size,
                  }),
                  itemClassName,
                )}
              >
                {icon}
                {label ?? itemValue}
              </RadixToggleGroup.Item>
            ),
          )
        : children}
    </RadixToggleGroup.Root>
  );
}

ToggleGroup.displayName = "ToggleGroup";

export { ToggleGroup };
