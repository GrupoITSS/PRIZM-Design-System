import type * as React from "react";
import type { RadioGroup as RadixRadioGroup } from "radix-ui";

export type RadioGroupOrientation = "horizontal" | "vertical";

export type RadioGroupSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;

export interface RadioGroupOption {
  /**
   * Valor interno do item, usado para controle do estado.
   */
  value: string;
  /**
   * Label principal visível ao lado do rádio.
   */
  label: React.ReactNode;
  /**
   * Descrição opcional exibida abaixo do label.
   */
  description?: React.ReactNode;
  /**
   * Desabilita apenas este item.
   */
  disabled?: boolean;
  /**
   * Classe adicional aplicada ao wrapper do item.
   */
  className?: string;
  /**
   * Rótulo para acessibilidade quando o conteúdo visual não for suficiente.
   */
  ariaLabel?: string;
}

/** Tipagem base para o `RadixRadioGroup.Root` (o valor já é `string`). */
export type RadioGroupPrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroup.Root
>;

export interface RadioGroupProps extends Omit<
  RadioGroupPrimitiveRootProps,
  "value" | "defaultValue" | "onValueChange" | "children" | "orientation"
> {
  /**
   * Valor controlado do grupo.
   */
  value?: string;
  /**
   * Valor inicial não controlado.
   */
  defaultValue?: string;
  /**
   * Callback disparado quando o valor selecionado muda.
   */
  onValueChange?: (value: string) => void;
  /**
   * Itens do grupo, usados para renderização baseada em props.
   *
   * **API principal recomendada**: o componente não expõe subcomponentes.
   */
  items: RadioGroupOption[];
  /**
   * Orientação do grupo.
   * @default "vertical"
   */
  orientation?: RadioGroupOrientation;
  /**
   * Espaçamento entre os itens do grupo (gap utilitário).
   * @default 2
   */
  spacing?: RadioGroupSpacing;
}
