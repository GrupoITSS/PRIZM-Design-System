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
   * Texto visível do item. Sem `label` e sem `icon`, o `value` aparece no lugar.
   */
  label?: React.ReactNode;
  /**
   * Ícone exibido antes do label. Item só de ícone precisa de `aria-label`.
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
   * Nome do item para o leitor de tela. Use só no item sem texto visível (só de ícone):
   * com texto visível, o nome tem de conter esse texto (WCAG 2.5.3).
   */
  "aria-label"?: string;
  /**
   * @deprecated Use `aria-label`, como nos itens do ButtonGroup.
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
   * Tipo do grupo: seleção única (`radiogroup`) ou múltipla (`toolbar`).
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
   * Espaçamento entre os itens. Com 0, os itens ficam colados, com a borda compartilhada
   * e os cantos só nas pontas; com mais, ficam separados (`gap-*`).
   *
   * @default 0
   */
  spacing?: ToggleGroupSpacing;
  /**
   * Orientação do grupo.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Com `type="single"`, impede que o item ligado seja desligado: o grupo nunca fica
   * sem valor. Use em filtro (Todos, Ativos, Inativos).
   *
   * @default false
   */
  required?: boolean;
  /**
   * O grupo ocupa a largura toda, e os itens dividem o espaço.
   *
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Composição: itens com `ToggleGroupItem`. Quando `items` é fornecido, tem precedência
   * sobre `children`.
   */
  children?: React.ReactNode;
}

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> &
  ToggleVariantProps;
