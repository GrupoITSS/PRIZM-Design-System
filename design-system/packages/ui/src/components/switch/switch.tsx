import { cn } from "../../lib/cn";
import { Switch as RadixSwitch } from "radix-ui";
import * as React from "react";
import { switchRootVariants, switchThumbVariants } from "./switch.styles";
import type { SwitchProps } from "./switch.types";

/**
 * Switch do design system PRIZM.
 *
 * API **100% baseada em props**, sem subcomponentes:
 *
 * ```tsx
 * const [ativo, setAtivo] = React.useState(false);
 *
 * <Switch
 *   checked={ativo}
 *   onCheckedChange={setAtivo}
 *   aria-label="Modo avião"
 * />
 * ```
 *
 * Com rótulo, descrição ou erro, use a composição com `Field` e `FieldLabel`.
 * O Switch precisa de nome: `FieldLabel` ligado pelo `id`, ou `aria-label`.
 *
 * Internamente usa Radix `Switch`, mantendo acessibilidade e comportamento
 * padrão do shadcn/ui, mas toda a composição é encapsulada.
 *
 * @see https://ui.shadcn.com/docs/components/radix/switch
 */
function SwitchImpl({
  size = "default",
  checked,
  defaultChecked,
  onCheckedChange,
  onChange,
  className,
  ref,
  ...rootProps
}: SwitchProps & { ref?: React.Ref<React.ElementRef<typeof RadixSwitch.Root>> }) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const handleChange = React.useCallback(
    (value: boolean) => {
      onCheckedChange?.(value);
      onChange?.(value);
    },
    [onCheckedChange, onChange],
  );

  // Sem nome, o leitor de tela anuncia só "botão de alternância" (WCAG 4.1.2, pendência 3).
  const ariaLabel = rootProps["aria-label"];
  const ariaLabelledBy = rootProps["aria-labelledby"];
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const named =
      Boolean(ariaLabel ?? ariaLabelledBy) || (buttonRef.current?.labels?.length ?? 0) > 0;
    if (!named) {
      console.warn(
        "Switch: sem nome acessível. Ligue um FieldLabel pelo id ou passe aria-label.",
      );
    }
  }, [ariaLabel, ariaLabelledBy]);

  return (
    <RadixSwitch.Root
      ref={setRefs}
      data-slot="switch"
      data-size={size}
      className={cn(switchRootVariants({ size, className }))}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleChange}
      {...rootProps}
    >
      <RadixSwitch.Thumb data-slot="switch-thumb" className={switchThumbVariants({ size })} />
    </RadixSwitch.Root>
  );
}

SwitchImpl.displayName = "Switch";

export { SwitchImpl as Switch };
