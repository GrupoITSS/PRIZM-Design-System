import { Dialog } from "../dialog";
import { Expand } from "../icons";
import { cn } from "../../lib/cn";
import * as React from "react";
import { textareaVariants } from "./textarea.styles";
import type { TextareaProps } from "./textarea.types";

/**
 * Textarea do design system PRIZM.
 *
 * Wrapper estilizado para o `<textarea />` nativo, com tamanhos (`size`) e
 * tokens de cor tipados via `@grupoitss/prizm-tokens`.
 *
 * Uso recomendado:
 * ```tsx
 * <Textarea placeholder="Digite sua mensagem" />
 * <Textarea rows={4} size="sm" />
 * <Textarea size="lg" disabled />
 * ```
 *
 * Baseado em shadcn/ui (Radix).
 *
 * @see https://ui.shadcn.com/docs/components/radix/textarea
 */
function Textarea({
  className,
  size = "md",
  resizable = false,
  "aria-invalid": ariaInvalidProp,
  style,
  expandable = false,
  expandTitle = "Editar texto",
  value,
  defaultValue,
  onChange,
  ref,
  ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  const isInvalid = ariaInvalidProp === true || ariaInvalidProp === "true" ? true : false;

  const resizeStyle: React.CSSProperties = {
    resize: resizable ? "vertical" : "none",
  };

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...resizeStyle,
  };

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | number | readonly string[] | undefined
  >(defaultValue);

  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }
    onChange?.(event);
  };

  const expandTitleId = React.useId();

  // Shared by the inline textarea and the one in the expanded dialog. The ref
  // goes only to the inline one; the dialog copy drops the id (no duplicate ids)
  // and takes its name from the dialog title.
  const textareaProps = (inDialog: boolean = false) => ({
    "data-slot": "textarea",
    "data-size": size,
    "data-invalid": isInvalid ? "true" : undefined,
    "aria-invalid": isInvalid ? ("true" as const) : undefined,
    className: cn(
      textareaVariants({ size, className }),
      "custom-scroll",
      inDialog && "h-full min-h-0",
    ),
    style: mergedStyle,
    value: currentValue,
    onChange: handleChange,
    ...props,
    ...(inDialog ? { id: undefined, "aria-labelledby": expandTitleId } : {}),
  });

  if (!expandable) {
    return <textarea ref={ref} {...textareaProps()} />;
  }

  return (
    <div className="relative w-full h-full">
      <textarea ref={ref} {...textareaProps()} />
      <Dialog
        trigger={
          <button
            type="button"
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground bg-transparent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            aria-label="Expandir campo"
          >
            <Expand className="size-3.5" aria-hidden />
          </button>
        }
        title={<span id={expandTitleId}>{expandTitle}</span>}
        description={undefined}
        contentClassName="w-[96vw] max-w-6xl h-[92vh] max-h-[96vh]"
        body={
          <div className="h-full p-4">
            <textarea {...textareaProps(true)} />
          </div>
        }
      />
    </div>
  );
}

Textarea.displayName = "Textarea";

export { Textarea };
