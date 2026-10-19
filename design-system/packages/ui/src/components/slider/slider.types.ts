import type * as React from "react";

/**
 * SliderProps — props para o componente de slider principal do PRIZM.
 *
 * A API é baseada em **props simples**, sem subcomponentes.
 *
 * Por padrão o slider é de um único valor (`value: number`), mas você pode
 * usar o modo avançado passando `values: number[]` para casos de range.
 */
export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Valor controlado do slider (modo simples, único valor).
   *
   * @example 50
   */
  value?: number;

  /**
   * Valor inicial não controlado do slider (modo simples, único valor).
   *
   * @example 25
   */
  defaultValue?: number;

  /**
   * Callback disparado quando o valor muda (modo simples, único valor).
   *
   * @example
   * <Slider defaultValue={20} onValueChange={(v) => console.log(v)} />
   */
  onValueChange?: (value: number) => void;

  /**
   * Valor mínimo permitido.
   *
   * @default 0
   */
  min?: number;

  /**
   * Valor máximo permitido.
   *
   * @default 100
   */
  max?: number;

  /**
   * Incremento entre os valores.
   *
   * @default 1
   */
  step?: number;

  /**
   * Indica se o slider está desabilitado.
   */
  disabled?: boolean;

  /**
   * Rótulo acessível para leitores de tela.
   *
   * Se não for fornecido, use `aria-label` ou `aria-labelledby` externamente.
   */
  "aria-label"?: string;

  /**
   * Modo avançado: usar array de valores (ex.: range).
   * Quando fornecido, tem precedência sobre `value`/`defaultValue`.
   *
   * @example [20, 80]
   */
  values?: number[];

  /**
   * Callback disparado quando o array de valores muda (modo avançado).
   *
   * @example
   * <Slider values={[20, 80]} onValuesChange={(vals) => console.log(vals)} />
   */
  onValuesChange?: (values: number[]) => void;

  /**
   * Exibe rótulos de valor mínimo e máximo nas extremidades do slider.
   *
   * @default true
   */
  showLabels?: boolean;

  /**
   * Conteúdo do rótulo mínimo. Quando não informado, usa o valor de `min`.
   */
  minLabel?: React.ReactNode;

  /**
   * Conteúdo do rótulo máximo. Quando não informado, usa o valor de `max`.
   */
  maxLabel?: React.ReactNode;

  /**
   * Texto auxiliar exibido abaixo do slider (por exemplo, mensagem de erro).
   */
  helperText?: React.ReactNode;

  /**
   * Classes adicionais aplicadas especificamente ao trilho/raiz do slider.
   * A prop `className` é usada no wrapper externo.
   */
  trackClassName?: string;

  /**
   * Função opcional para formatar o valor exibido na tooltip do thumb
   * enquanto o usuário está arrastando.
   *
   * Quando omitido, o número de casas decimais é derivado de `step`
   * (ex.: `step={0.01}` → `0.31`).
   *
   * @example
   * formatValue={(v) => `${Math.round(v * 100)}%`}
   */
  formatValue?: (value: number) => React.ReactNode;

  /**
   * Habilita a tooltip que aparece acima do thumb enquanto ele estiver
   * sendo pressionado/arrastado (estado "active"), mostrando o valor atual.
   *
   * @default true
   */
  showActiveValueTooltip?: boolean;
}
