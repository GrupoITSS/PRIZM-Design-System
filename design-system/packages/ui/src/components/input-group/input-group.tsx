import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { cn } from "../../lib/cn";
import * as React from "react";
import { useInputGroupWrapper } from "./input-group.hooks";
import {
  INPUT_GROUP_BASE_CLASSES,
  inputGroupAddonVariants,
  inputGroupButtonVariants,
} from "./input-group.styles";
import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextProps,
  InputGroupTextareaProps,
} from "./input-group.types";

/** Props that belong to the wrapper div, not to the control. */
const DIV_ONLY_KEYS = [
  "className",
  "control",
  "addonInlineStart",
  "addonInlineEnd",
  "addonBlockStart",
  "addonBlockEnd",
] as const;

/**
 * InputGroup — componente de alto nível para agrupar Input/Textarea com addons.
 *
 * **API recomendada (somente props):**
 * ```tsx
 * <InputGroup placeholder="Buscar..." addonInlineEnd={<Search className="size-4" />} />
 * <InputGroup control="textarea" placeholder="Mensagem" rows={4} addonBlockEnd={<Button>Enviar</Button>} />
 * ```
 *
 * Subcomponentes (InputGroupInput, InputGroupAddon, etc.) existem apenas como escape hatch.
 *
 * @see https://ui.shadcn.com/docs/components/radix/input-group
 */
// API por props (addons): its own component, so the wrapper hook is always called.
function InputGroupWithAddons({
  className,
  control = "input",
  addonInlineStart,
  addonInlineEnd,
  addonBlockStart,
  addonBlockEnd,
  ...rest
}: InputGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const divProps: React.HTMLAttributes<HTMLDivElement> = {};
  const controlProps: Record<string, unknown> = {};
  let ariaInvalid: React.AriaAttributes["aria-invalid"] | undefined;
  let disabled: boolean | undefined;

  for (const [key, value] of Object.entries(rest)) {
    if (DIV_ONLY_KEYS.includes(key as (typeof DIV_ONLY_KEYS)[number])) continue;

    if (key === "style" || key === "ref") {
      divProps[key as keyof React.HTMLAttributes<HTMLDivElement>] = value as never;
    } else if (key === "size" && typeof value === "number") {
      // Omit native input size (number); Input component uses "sm" | "md" | "lg"
      continue;
    } else if (key === "aria-invalid") {
      ariaInvalid = value as React.AriaAttributes["aria-invalid"];
      controlProps[key] = value;
    } else if (key === "disabled") {
      disabled = value as boolean;
      controlProps[key] = value;
    } else {
      controlProps[key] = value;
    }
  }

  const isTextarea = control === "textarea";

  const isInvalid = ariaInvalid === true || ariaInvalid === "true" ? true : false;

  const { onFocus, onBlur, ...divRest } = divProps;
  const { wrapperClassName, handleFocus, handleBlur } = useInputGroupWrapper({
    className,
    disabled,
    isInvalid,
    onFocus,
    onBlur,
  });

  return (
    <div
      data-slot="input-group"
      role="group"
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      aria-disabled={disabled || undefined}
      className={wrapperClassName}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...divRest}
    >
      {isTextarea ? (
        <>
          {/* Complementos de início antes do controle no DOM: a ordem do Tab segue a da tela. */}
          {addonBlockStart != null && (
            <InputGroupAddon align="block-start">{addonBlockStart}</InputGroupAddon>
          )}
          <InputGroupTextarea {...controlProps} />
          {addonBlockEnd != null && (
            <InputGroupAddon align="block-end">{addonBlockEnd}</InputGroupAddon>
          )}
        </>
      ) : (
        <>
          {addonInlineStart != null && (
            <InputGroupAddon align="inline-start">{addonInlineStart}</InputGroupAddon>
          )}
          <InputGroupInput {...controlProps} />
          {addonInlineEnd != null && (
            <InputGroupAddon align="inline-end">{addonInlineEnd}</InputGroupAddon>
          )}
        </>
      )}
    </div>
  );
}

function InputGroupRoot({
  className,
  control = "input",
  addonInlineStart,
  addonInlineEnd,
  addonBlockStart,
  addonBlockEnd,
  children,
  ...rest
}: InputGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const useSimplifiedAPI =
    addonInlineStart !== undefined ||
    addonInlineEnd !== undefined ||
    addonBlockStart !== undefined ||
    addonBlockEnd !== undefined;

  if (useSimplifiedAPI) {
    return (
      <InputGroupWithAddons
        className={className}
        control={control}
        addonInlineStart={addonInlineStart}
        addonInlineEnd={addonInlineEnd}
        addonBlockStart={addonBlockStart}
        addonBlockEnd={addonBlockEnd}
        {...rest}
      />
    );
  }

  // API por children: props de controle não vão no wrapper <div>.
  /* eslint-disable @typescript-eslint/no-unused-vars -- pulled out so they don't reach the <div> */
  const {
    placeholder: _placeholder,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    type: _type,
    rows: _rows,
    id: _id,
    disabled: _disabled,
    size: _size,
    ...divRest
  } = rest;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(INPUT_GROUP_BASE_CLASSES, className)}
      {...divRest}
    >
      {children}
    </div>
  );
}

function InputGroupAddon({ className, align = "inline-start", ...props }: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;

        const groupRoot = e.currentTarget.closest<HTMLElement>("[data-slot=input-group]");
        const control =
          groupRoot?.querySelector<HTMLElement>("[data-slot=input], [data-slot=textarea]") ?? null;

        control?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      size={size}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  size = "md",
  ...props
}: InputGroupInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <Input
      size={size}
      className={cn(
        "min-w-0 flex-1 !w-auto rounded-none border-0 bg-transparent shadow-none",
        // Sobrescreve tokens !important do Input size=md (Cockpit)
        "!border-0 !bg-transparent !shadow-none hover:!bg-transparent",
        "focus-visible:!shadow-none focus-visible:!ring-0 focus-visible:!border-transparent",
        "",
        "disabled:!bg-transparent disabled:!opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: InputGroupTextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  return (
    <Textarea
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3",
        "focus-visible:shadow-none! data-[invalid=true]:focus-visible:shadow-none!",
        // A caixa do grupo já fica a 50%; o campo de dentro não soma outra opacidade.
        "disabled:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

const _InputGroup = ({ ref, ...props }: InputGroupProps & { ref?: React.Ref<HTMLDivElement> }) => (
  <InputGroupRoot {...props} ref={ref} />
);
_InputGroup.displayName = "InputGroup";

export {
  _InputGroup as InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
