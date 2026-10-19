import { ToggleGroup as RadixToggleGroup } from "radix-ui";
import type { ToggleVariantProps } from "../toggle/toggle.styles";

export type ToggleGroupType = "single" | "multiple";

export type ToggleGroupValue = string | string[] | undefined;

export type ToggleGroupSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;

/**
 * Tipagem base para o `RadixToggleGroup.Root`.
 *
 * O componente raiz do Radix usa uma união interna para `single` e `multiple`,
 * o que acaba tornando difícil expor uma API simplificada (`ToggleGroupValue`
 * = `string | string[] | undefined`) sem conflitos de tipos em `defaultValue`
 * e `value`.
 *
 * Aqui "afrouxamos" esses campos para `any` para permitir que a API de alto
 * nível do design system aceite ambos os formatos de valor, enquanto ainda
 * reaproveita o resto das props do Radix.
 */
export type ToggleGroupPrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroup.Root
> & {
  /* eslint-disable @typescript-eslint/no-explicit-any -- see above */
  value?: any;
  defaultValue?: any;
  onValueChange?: (value: any) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

export interface ToggleGroupItemOption {
  /**
   * Valor interno do item, usado para controle do estado.
   */
  value: string;
  /**
   * Conteúdo textual/visual do item.
   * Quando não definido, `value` é usado como label.
   */
  label?: React.ReactNode;
  /**
   * Ícone opcional exibido antes do label.
   */
  icon?: React.ReactNode;
  /**
   * Desabilita apenas este item.
   */
  disabled?: boolean;
  /**
   * Classe adicional para estilizar apenas este item.
   */
  className?: string;
  /**
   * Rótulo para acessibilidade quando o conteúdo visual não é suficiente.
   */
  ariaLabel?: string;
}

export interface ToggleGroupProps
  extends
    Omit<
      ToggleGroupPrimitiveRootProps,
      "type" | "value" | "defaultValue" | "onValueChange" | "children" | "orientation"
    >,
    ToggleVariantProps {
  /**
   * Tipo do grupo: seleção única ou múltipla.
   * @default "single"
   */
  type?: ToggleGroupType;
  /**
   * Valor controlado do grupo.
   *
   * - Para `type="single"`: `string | undefined`
   * - Para `type="multiple"`: `string[] | undefined`
   */
  value?: ToggleGroupValue;
  /**
   * Valor inicial não controlado do grupo.
   */
  defaultValue?: ToggleGroupValue;
  /**
   * Callback disparado quando o valor do grupo muda.
   */
  onValueChange?: (value: ToggleGroupValue) => void;
  /**
   * Itens do grupo, usados para renderização baseada em props (API principal).
   *
   * Quando definido, o componente ignora `children` e renderiza
   * automaticamente um item para cada entrada.
   */
  items?: ToggleGroupItemOption[];
  /**
   * Espaçamento entre os itens do grupo (gap utilitário).
   *
   * Usa internamente classes utilitárias (`gap-*`). Valores que não estiverem
   * mapeados caem no padrão `gap-1`.
   *
   * Exemplos:
   * - `spacing={1}` → `gap-1`
   * - `spacing={2}` → `gap-2`
   *
   * @default 1
   */
  spacing?: ToggleGroupSpacing;
  /**
   * Orientação do grupo.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * **Composição (escape hatch):** conteúdo customizado usando `RadixToggleGroup.Item`.
   * Quando `items` é fornecido, tem precedência sobre `children`.
   */
  children?: React.ReactNode;
}
