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
 * const [enabled, setEnabled] = React.useState(false);
 *
 * <Switch
 *   checked={enabled}
 *   onChange={setEnabled}
 *   aria-label="Airplane mode"
 * />
 * ```
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
  onChange,
  className,
  ref,
  ...rootProps
}: SwitchProps & { ref?: React.Ref<React.ElementRef<typeof RadixSwitch.Root>> }) {
  const handleChange = React.useCallback(
    (value: boolean) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <RadixSwitch.Root
      ref={ref}
      data-slot="switch"
      data-size={size}
      className={cn(switchRootVariants({ size, className }))}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleChange}
      {...rootProps}
    >
      <RadixSwitch.Thumb className={switchThumbVariants({ size })} />
    </RadixSwitch.Root>
  );
}

SwitchImpl.displayName = "Switch";

export { SwitchImpl as Switch };
