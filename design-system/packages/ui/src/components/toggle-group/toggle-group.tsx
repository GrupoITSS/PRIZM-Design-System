import { ToggleGroup as RadixToggleGroup } from "radix-ui";
import * as React from "react";

import { toggleVariants } from "../toggle/toggle.styles";
import { hasNameAttribute, hasTextContent } from "../toggle/toggle.utils";
import { cn } from "../../lib/cn";

import { getToggleGroupItemClasses, getToggleGroupRootClasses } from "./toggle-group.styles";
import type {
  ToggleGroupItemOption,
  ToggleGroupItemProps,
  ToggleGroupPrimitiveRootProps,
  ToggleGroupProps,
  ToggleGroupSpacing,
  ToggleGroupValue,
} from "./toggle-group.types";

type ToggleGroupContextValue = {
  variant: ToggleGroupProps["variant"];
  size: ToggleGroupProps["size"];
  spacing: ToggleGroupSpacing;
  orientation: "horizontal" | "vertical";
  fullWidth: boolean;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "outline",
  size: "default",
  spacing: 0,
  orientation: "horizontal",
  fullWidth: false,
});

/**
 * Grupo de toggles do design system PRIZM.
 *
 * Com `type="single"`, o item ligado é a opção escolhida (`radiogroup`), como num filtro;
 * use `required` para que o grupo nunca fique sem valor. Com `type="multiple"`, cada item
 * liga e desliga sozinho (`toolbar`), como numa barra de formatação.
 *
 * O grupo precisa de nome (`aria-label` ou `aria-labelledby`). Item só de ícone precisa de
 * `aria-label`; com texto visível, não passe `aria-label` (WCAG 2.5.3).
 *
 * ```tsx
 * <ToggleGroup
 *   aria-label="Status"
 *   required
 *   defaultValue="todos"
 *   items={[
 *     { value: "todos", label: "Todos" },
 *     { value: "ativos", label: "Ativos" },
 *     { value: "inativos", label: "Inativos" },
 *   ]}
 * />
 * ```
 *
 * Para casos que `items` não cobre, use a composição com `ToggleGroupItem`.
 *
 * @see https://ui.shadcn.com/docs/components/toggle-group
 */
function ToggleGroup({
  className,
  variant = "outline",
  size = "default",
  type = "single",
  orientation = "horizontal",
  spacing = 0,
  required = false,
  fullWidth = false,
  value,
  defaultValue,
  onValueChange,
  items,
  children,
  ref,
  ...props
}: ToggleGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const named = hasNameAttribute(props);

  // Pendência 1 de acessibilidade (23/11/2026): o grupo precisa de nome para o leitor de tela.
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        'ToggleGroup: grupo sem nome acessível. Passe aria-label ou aria-labelledby (ex.: aria-label="Status").',
      );
    }
  }, [named]);

  // O valor fica sempre controlado no Radix, para que `required` funcione também sem `value`.
  const isControlled = value !== undefined;
  const emptyValue: ToggleGroupValue = type === "multiple" ? [] : "";
  const [innerValue, setInnerValue] = React.useState<ToggleGroupValue>(defaultValue ?? emptyValue);
  const currentValue = isControlled ? value : innerValue;

  const handleValueChange = React.useCallback(
    (nextValue: string | string[]) => {
      // TG8 (23/11/2026): com required, o item ligado não desliga e o grupo não fica vazio.
      if (required && type === "single" && !nextValue) return;
      if (!isControlled) setInnerValue(nextValue);
      onValueChange?.(nextValue);
    },
    [required, type, isControlled, onValueChange],
  );

  const rootProps: ToggleGroupPrimitiveRootProps = {
    type,
    value: currentValue ?? emptyValue,
    onValueChange: handleValueChange as ToggleGroupPrimitiveRootProps["onValueChange"],
    orientation,
    ...props,
  };

  const context = React.useMemo<ToggleGroupContextValue>(
    () => ({ variant, size, spacing, orientation, fullWidth }),
    [variant, size, spacing, orientation, fullWidth],
  );

  const useItemsAPI = Array.isArray(items) && items.length > 0;

  return (
    <RadixToggleGroup.Root
      ref={ref}
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      aria-required={type === "single" && required ? true : undefined}
      className={cn(getToggleGroupRootClasses(orientation, spacing, fullWidth), className)}
      {...rootProps}
    >
      <ToggleGroupContext value={context}>
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
                  "aria-label": itemAriaLabel,
                }: ToggleGroupItemOption,
                index,
              ) => (
                <ToggleGroupItem
                  // `value` é único na lista de itens; fallback para índice apenas por segurança.
                  // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                  key={itemValue ?? index}
                  value={itemValue}
                  disabled={disabled}
                  aria-label={itemAriaLabel ?? ariaLabel}
                  className={itemClassName}
                >
                  {icon}
                  {/* TG6 (23/11/2026): item com ícone e sem label não mostra o value. */}
                  {label ?? (icon ? null : itemValue)}
                </ToggleGroupItem>
              ),
            )
          : children}
      </ToggleGroupContext>
    </RadixToggleGroup.Root>
  );
}

ToggleGroup.displayName = "ToggleGroup";

/**
 * Item do ToggleGroup, para a composição. Recebe a variante, o tamanho e o espaçamento do
 * grupo em volta (TG7, 23/11/2026).
 */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ref,
  ...props
}: ToggleGroupItemProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const context = React.use(ToggleGroupContext);
  const itemVariant = variant ?? context.variant;
  const itemSize = size ?? context.size;
  const named = hasNameAttribute(props) || hasTextContent(children);

  // Pendência 2 de acessibilidade (23/11/2026): item só de ícone sem nome vira um botão sem nome.
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        'ToggleGroup: item só de ícone sem nome acessível. Passe aria-label no item (ex.: aria-label="Negrito").',
      );
    }
  }, [named]);

  return (
    <RadixToggleGroup.Item
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      className={cn(
        toggleVariants({ variant: itemVariant, size: itemSize }),
        getToggleGroupItemClasses({
          spacing: context.spacing,
          orientation: context.orientation,
          variant: itemVariant,
          fullWidth: context.fullWidth,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </RadixToggleGroup.Item>
  );
}

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
