import type * as React from "react";
import type { Select as RadixSelect } from "radix-ui";
import type { SelectTriggerVariantProps } from "./select.styles";

export interface SelectOption {
  /**
   * Valor enviado em formulários e retornado no `onChange`.
   */
  value: string;
  /**
   * Texto visível da opção.
   */
  label: string;
  /**
   * Conteúdo opcional exibido antes do label (ex.: avatar, ícone).
   */
  startContent?: React.ReactNode;
  /**
   * Se true, desabilita a opção.
   */
  disabled?: boolean;
}

type RadixSelectRootProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Root>;
type RadixSelectPortalProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Portal>;

/**
 * Props do componente Select do design system PRIZM.
 *
 * API simplificada baseada em props:
 * - `options` para lista de opções;
 * - `value`/`defaultValue` + `onChange` para controle;
 * - `placeholder` para texto quando nada está selecionado.
 *
 * Casos avançados devem ser resolvidos por novas props neste wrapper,
 * **não** via subcomponentes.
 */
export interface SelectProps
  extends
    Omit<RadixSelectRootProps, "children" | "value" | "defaultValue" | "onValueChange" | "label">,
    SelectTriggerVariantProps {
  /**
   * Alinhamento horizontal do dropdown em relação ao trigger.
   * - `start`: alinha pela esquerda (padrão).
   * - `center`: centraliza em relação ao trigger.
   * - `end`: alinha pela direita (similar ao DropdownMenu.align="end").
   */
  align?: "start" | "center" | "end";
  /**
   * Lista de opções do Select.
   */
  options: SelectOption[];
  /**
   * Valor selecionado (modo controlado).
   */
  value?: string;
  /**
   * Valor inicial (modo não controlado).
   */
  defaultValue?: string;
  /**
   * Callback disparado quando o valor muda.
   */
  onChange?: (value: string | undefined) => void;
  /**
   * Rótulo visível acima do trigger (`FieldLabel` do shadcn).
   * Também associa o nome acessível do combobox via `htmlFor`.
   * Quando omitido, `placeholder` ou `aria-label` vira `Select.Label` no dropdown.
   */
  label?: string;
  /**
   * Alias de `label`. Preferir `label`.
   */
  fieldLabel?: string;
  /**
   * id do trigger — associa Label htmlFor / acessibilidade.
   */
  id?: string;
  /**
   * Placeholder exibido quando nenhuma opção está selecionada.
   */
  placeholder?: string;
  /**
   * Substitui o trigger por um skeleton da mesma altura.
   * Evita colapso de layout enquanto as opções carregam.
   */
  loading?: boolean;
  /**
   * Desabilita o Select inteiro.
   */
  disabled?: boolean;
  /**
   * Classe CSS adicional aplicada ao trigger.
   */
  className?: string;
  /**
   * Esconde o ícone de seleção (check) à direita das opções.
   * Útil quando o layout já indica o item selecionado de outra forma.
   */
  hideCheckIcon?: boolean;
  /**
   * Repassado ao `Select.Portal` do Radix (ex.: `container` para montar o menu
   * dentro de um nó — necessário em widgets empilhados acima do restante da página).
   */
  portalProps?: RadixSelectPortalProps;
  /**
   * Nome acessível quando não há `label` visível.
   */
  "aria-label"?: string;
  /**
   * Conteúdo fixo exibido no rodapé do dropdown, após o separador.
   * Útil para ações como "Criar assistente" que devem permanecer visíveis
   * mesmo quando a lista de opções está vazia.
   */
  footer?: React.ReactNode;
}
