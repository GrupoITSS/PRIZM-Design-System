import { cn } from "../../lib/cn";
import { Circle } from "lucide-react";
import { RadioGroup as RadixRadioGroup } from "radix-ui";
import * as React from "react";

import {
  getRadioGroupRootClasses,
  radioItemControlClasses,
  radioItemDescriptionClasses,
  radioItemLabelClasses,
  radioItemWrapperClasses,
} from "./radio-group.styles";
import type { RadioGroupOption, RadioGroupProps } from "./radio-group.types";

/**
 * Grupo de botões de opção (radio) do design system PRIZM.
 *
 * **API principal baseada em props**:
 * - `items`, `value`, `defaultValue`, `onValueChange`
 * - `orientation`, `spacing`
 *
 * Exemplo recomendado (sem subcomponentes):
 *
 * ```tsx
 * <RadioGroup
 *   value={value}
 *   onValueChange={setValue}
 *   items={[
 *     { value: "option-1", label: "Opção 1" },
 *     { value: "option-2", label: "Opção 2", description: "Descrição opcional" },
 *   ]}
 * />
 * ```
 *
 * O componente **não expõe subcomponentes**; toda a configuração é feita via props.
 *
 * @see https://ui.shadcn.com/docs/components/radio-group
 */
function RadioGroup({
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  orientation = "vertical",
  spacing = 2,
  name,
  ref,
  ...props
}: RadioGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reactId = React.useId();

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue);
    },
    [onValueChange],
  );

  const rootName = name ?? `radio-group-${reactId}`;

  return (
    <RadixRadioGroup.Root
      ref={ref}
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn(getRadioGroupRootClasses(orientation, spacing), className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      orientation={orientation}
      name={rootName}
      {...props}
    >
      {items.map(
        (
          {
            value: itemValue,
            label,
            description,
            disabled,
            className: itemClassName,
            ariaLabel,
          }: RadioGroupOption,
          index,
        ) => {
          const itemId = `${rootName}-${index}`;

          return (
            <label
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              key={itemValue ?? index}
              htmlFor={itemId}
              className={cn(radioItemWrapperClasses, itemClassName)}
            >
              <RadixRadioGroup.Item
                id={itemId}
                value={itemValue}
                disabled={disabled}
                aria-label={ariaLabel}
                className={radioItemControlClasses}
              >
                <RadixRadioGroup.Indicator className="grid place-content-center text-current animate-in zoom-in-50 duration-150">
                  <Circle className="size-2.5 fill-current" aria-hidden />
                </RadixRadioGroup.Indicator>
              </RadixRadioGroup.Item>

              <div className="space-y-1">
                <span className={radioItemLabelClasses}>{label}</span>
                {description ? <p className={radioItemDescriptionClasses}>{description}</p> : null}
              </div>
            </label>
          );
        },
      )}
    </RadixRadioGroup.Root>
  );
}

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
