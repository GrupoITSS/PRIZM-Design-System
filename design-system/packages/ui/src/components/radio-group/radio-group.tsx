import { cn } from "../../lib/cn";
import { Circle } from "../icons";
import { RadioGroup as RadixRadioGroup } from "radix-ui";
import * as React from "react";

import {
  getRadioGroupRootClasses,
  radioItemContentClasses,
  radioItemControlClasses,
  radioItemDescriptionClasses,
  radioItemDotClasses,
  radioItemIndicatorClasses,
  radioItemLabelClasses,
  radioItemWrapperClasses,
} from "./radio-group.styles";
import type { RadioGroupItemProps, RadioGroupOption, RadioGroupProps } from "./radio-group.types";

/**
 * Item do RadioGroup, para composição com `Field`, `FieldLabel` e `FieldDescription`.
 *
 * ```tsx
 * <RadioGroup aria-labelledby="plano-legenda" defaultValue="anual">
 *   <FieldLabel htmlFor="anual">
 *     <Field orientation="horizontal">
 *       <RadioGroupItem id="anual" value="anual" />
 *       <FieldContent>
 *         <FieldTitle>Anual</FieldTitle>
 *         <FieldDescription>Cobrança uma vez por ano.</FieldDescription>
 *       </FieldContent>
 *     </Field>
 *   </FieldLabel>
 * </RadioGroup>
 * ```
 */
function RadioGroupItem({
  className,
  ref,
  ...props
}: RadioGroupItemProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <RadixRadioGroup.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(radioItemControlClasses, className)}
      {...props}
    >
      <RadixRadioGroup.Indicator data-slot="radio-group-indicator" className={radioItemIndicatorClasses}>
        <Circle className={radioItemDotClasses} aria-hidden />
      </RadixRadioGroup.Indicator>
    </RadixRadioGroup.Item>
  );
}

RadioGroupItem.displayName = "RadioGroupItem";

/**
 * Grupo de botões de opção (radio) do design system PRIZM.
 *
 * **API principal baseada em props**:
 * - `items`, `value`, `defaultValue`, `onValueChange`
 * - `orientation`, `spacing`
 *
 * ```tsx
 * <RadioGroup
 *   aria-label="Densidade"
 *   value={value}
 *   onValueChange={setValue}
 *   items={[
 *     { value: "option-1", label: "Opção 1" },
 *     { value: "option-2", label: "Opção 2", description: "Descrição opcional" },
 *   ]}
 * />
 * ```
 *
 * Para cartão, descrição com `FieldDescription` ou erro com `FieldError`, passe
 * `RadioGroupItem` como `children` em vez de `items`.
 *
 * O grupo precisa de nome: `aria-label`, ou `aria-labelledby` apontando para a legenda.
 * Para erro, passe `aria-invalid` no grupo: todos os círculos ficam com a borda `destructive`.
 *
 * @see https://ui.shadcn.com/docs/components/radio-group
 */
function RadioGroup({
  className,
  items,
  children,
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

  // Sem nome, o leitor de tela lê as opções sem a pergunta (WCAG 4.1.2, pendência 3).
  const named = Boolean(props["aria-label"] ?? props["aria-labelledby"]);
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!named) {
      console.warn(
        "RadioGroup: grupo sem nome acessível. Passe aria-label, ou aria-labelledby apontando para a legenda.",
      );
    }
  }, [named]);

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
      {items
        ? items.map(
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
                  <RadioGroupItem
                    id={itemId}
                    value={itemValue}
                    disabled={disabled}
                    aria-label={ariaLabel}
                  />

                  <div className={radioItemContentClasses}>
                    <span className={radioItemLabelClasses}>{label}</span>
                    {description ? (
                      <p className={radioItemDescriptionClasses}>{description}</p>
                    ) : null}
                  </div>
                </label>
              );
            },
          )
        : children}
    </RadixRadioGroup.Root>
  );
}

RadioGroup.displayName = "RadioGroup";

export { RadioGroup, RadioGroupItem };
