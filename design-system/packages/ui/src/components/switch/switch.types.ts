import type * as React from "react";
import type { Switch as RadixSwitch } from "radix-ui";
import type { SwitchVariantProps } from "./switch.styles";

type RadixSwitchRootProps = React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>;

/**
 * Props do componente Switch do design system PRIZM.
 *
 * API simplificada baseada em props:
 * - `checked` / `defaultChecked` + `onChange` para controle;
 * - `size` para variações visuais;
 * - Suporta todos os atributos nativos do Switch Radix (exceto `asChild` e `children`).
 *
 * Casos avançados devem ser resolvidos por novas props neste wrapper,
 * **não** via subcomponentes.
 */
export interface SwitchProps
  extends
    Omit<
      RadixSwitchRootProps,
      "asChild" | "children" | "checked" | "defaultChecked" | "onCheckedChange" | "onChange"
    >,
    SwitchVariantProps {
  /**
   * Estado controlado do Switch.
   */
  checked?: boolean;
  /**
   * Estado inicial (modo não controlado).
   */
  defaultChecked?: boolean;
  /**
   * Callback disparado quando o valor muda.
   */
  onChange?: (checked: boolean) => void;
  /**
   * Classe CSS adicional aplicada ao elemento raiz do Switch.
   */
  className?: string;
}
