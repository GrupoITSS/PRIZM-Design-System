import { ChevronDown, ChevronUp, Check } from "../icons";
import { cn } from "../../lib/cn";
import { Field, FieldLabel } from "../field";
import { Select as RadixSelect } from "radix-ui";
import * as React from "react";
import { Skeleton } from "../skeleton";
import {
  selectContentStyles,
  selectFooterSeparatorStyles,
  selectFooterStyles,
  selectItemStyles,
  selectLabelStyles,
  selectScrollButtonStyles,
  selectTriggerIconStyles,
  selectTriggerVariants,
  selectViewportStyles,
  type SelectTriggerVariantProps,
} from "./select.styles";
import type { SelectProps } from "./select.types";

const SELECT_SKELETON_HEIGHT: Record<NonNullable<SelectTriggerVariantProps["size"]>, string> = {
  sm: "h-control-height-sm",
  md: "h-control-height-md",
  lg: "h-control-height-lg",
};

function SelectLoadingSkeleton({
  size = "md",
  label,
  fillWidth = false,
}: {
  size?: SelectTriggerVariantProps["size"];
  label?: string;
  fillWidth?: boolean;
}) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={label ? `Carregando ${label}` : "Carregando"}
      className="min-w-0"
    >
      <Skeleton
        data-slot="select-skeleton"
        className={cn(
          "block border-0 shadow-none bg-muted-foreground/20",
          fillWidth ? "w-full" : "w-36 min-w-[9rem]",
          SELECT_SKELETON_HEIGHT[size ?? "md"],
        )}
        aria-hidden
      />
      <span className="sr-only">Carregando</span>
    </div>
  );
}

/**
 * Select do design system PRIZM.
 *
 * API **100% baseada em props**, sem subcomponentes:
 *
 * ```tsx
 * <Select
 *   label="Organização"
 *   placeholder="Selecione uma opção"
 *   value={value}
 *   onChange={setValue}
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *   ]}
 * />
 * ```
 *
 * Com `label`, renderiza o `FieldLabel` do shadcn acima do trigger.
 *
 * Internamente usa Radix `Select`, mantendo acessibilidade e comportamento padrão
 * do shadcn/ui, mas toda a composição é encapsulada.
 *
 * @see https://ui.shadcn.com/docs/components/radix/select
 */
function SelectImpl({
  className,
  size = "md",
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  name,
  required,
  align = "start",
  hideCheckIcon,
  portalProps,
  footer,
  label,
  fieldLabel,
  id,
  loading = false,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ref,
  ...rootProps
}: SelectProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const resolvedLabel = label ?? fieldLabel;
  const selectLabel = resolvedLabel ? undefined : (ariaLabel ?? placeholder)?.trim() || undefined;
  const triggerAriaLabel = ariaLabel ?? (!resolvedLabel ? placeholder : undefined);
  const generatedId = React.useId();
  const triggerId = id ?? (resolvedLabel ? generatedId : undefined);
  const handleChange = React.useCallback(
    (newValue: string) => {
      if (onChange) {
        onChange(newValue ?? undefined);
      }
    },
    [onChange],
  );

  // Resolved against `options` so the trigger label works even before
  // Select.Item nodes mount (Content is closed). Radix only portals
  // ItemText when Value has no children.
  const resolvedValue = (value ?? "").trim();
  const matchedOption = options.find(
    (option) =>
      option.value === resolvedValue || option.value.toLowerCase() === resolvedValue.toLowerCase(),
  );
  // Keep unmatched API values visible instead of an empty trigger.
  const selectedOption =
    matchedOption ?? (resolvedValue ? { value: resolvedValue, label: resolvedValue } : undefined);
  const effectiveOptions = React.useMemo(() => {
    if (
      resolvedValue &&
      !options.some(
        (option) =>
          option.value === resolvedValue ||
          option.value.toLowerCase() === resolvedValue.toLowerCase(),
      )
    ) {
      return [{ value: resolvedValue, label: resolvedValue }, ...options];
    }
    return options;
  }, [options, resolvedValue]);
  // Radix treats "" as an invalid controlled value; prefer undefined.
  const radixValue = selectedOption?.value || undefined;
  const triggerClassName = cn(
    selectTriggerVariants({ size }),
    resolvedLabel ? undefined : className,
  );

  const withFieldLabel = (control: React.ReactNode) => {
    if (!resolvedLabel) return control;
    return (
      <Field className={cn("w-auto min-w-0 gap-1.5", className)}>
        <FieldLabel htmlFor={loading ? undefined : triggerId}>
          {resolvedLabel}
          {required ? (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          ) : null}
        </FieldLabel>
        {control}
      </Field>
    );
  };

  if (loading) {
    return withFieldLabel(
      <SelectLoadingSkeleton
        size={size}
        label={resolvedLabel}
        fillWidth={Boolean(resolvedLabel)}
      />,
    );
  }

  const trigger = (
    <RadixSelect.Root
      value={radixValue}
      defaultValue={defaultValue}
      onValueChange={handleChange}
      disabled={disabled}
      name={name}
      required={required}
      {...rootProps}
    >
      <RadixSelect.Trigger
        ref={ref}
        id={triggerId}
        aria-label={triggerAriaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        data-slot="select-trigger"
        data-size={size}
        className={triggerClassName}
      >
        <RadixSelect.Value placeholder={placeholder}>
          {selectedOption ? (
            selectedOption.startContent ? (
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center">
                  {selectedOption.startContent}
                </span>
                <span>{selectedOption.label}</span>
              </span>
            ) : (
              selectedOption.label
            )
          ) : null}
        </RadixSelect.Value>
        <RadixSelect.Icon asChild>
          <ChevronDown className={selectTriggerIconStyles} aria-hidden />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal {...portalProps}>
        <RadixSelect.Content
          data-slot="select-content"
          className={selectContentStyles}
          position="popper"
          align={align}
        >
          <RadixSelect.ScrollUpButton className={selectScrollButtonStyles}>
            <ChevronUp className="size-4" aria-hidden />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className={selectViewportStyles}>
            {effectiveOptions.length > 0 ? (
              <RadixSelect.Group>
                {selectLabel ? (
                  <RadixSelect.Label className={selectLabelStyles}>{selectLabel}</RadixSelect.Label>
                ) : null}
                {effectiveOptions.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={selectItemStyles}
                  >
                    {!hideCheckIcon && (
                      <span className="absolute right-2 flex size-3.5 items-center justify-center">
                        <RadixSelect.ItemIndicator>
                          <Check className="size-4" aria-hidden />
                        </RadixSelect.ItemIndicator>
                      </span>
                    )}
                    <RadixSelect.ItemText>
                      {option.startContent ? (
                        <span className="flex items-center gap-2">
                          <span className="flex items-center justify-center">
                            {option.startContent}
                          </span>
                          <span>{option.label}</span>
                        </span>
                      ) : (
                        option.label
                      )}
                    </RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Group>
            ) : (
              !footer && (
                <RadixSelect.Group>
                  {selectLabel ? (
                    <RadixSelect.Label className={selectLabelStyles}>
                      {selectLabel}
                    </RadixSelect.Label>
                  ) : null}
                  <RadixSelect.Label className={selectLabelStyles}>
                    Nenhuma opção disponível
                  </RadixSelect.Label>
                </RadixSelect.Group>
              )
            )}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className={selectScrollButtonStyles}>
            <ChevronDown className="size-4" aria-hidden />
          </RadixSelect.ScrollDownButton>

          {footer ? (
            <div className={selectFooterStyles}>
              <div
                className={selectFooterSeparatorStyles}
                role="separator"
                aria-orientation="horizontal"
              />
              {footer}
            </div>
          ) : null}
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );

  return withFieldLabel(trigger);
}

SelectImpl.displayName = "Select";

export { SelectImpl as Select };
