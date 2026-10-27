import type { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type * as React from "react";

/**
 * Tipos base que espelham a API do Combobox do Base UI.
 * Úteis para usos avançados via composição.
 */

export type ComboboxRootProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root>;

export type ComboboxInputProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>;

export type ComboboxContentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Popup>;

export type ComboboxListProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.List>;

export type ComboboxItemProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>;

export type ComboboxEmptyProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>;

export type ComboboxGroupProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group>;

export type ComboboxLabelProps = React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.GroupLabel
>;

export type ComboboxCollectionProps = React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.Collection
>;

export type ComboboxSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.Separator
>;

export type ComboboxChipsProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Chips>;

export type ComboboxChipProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Chip>;

/** Tamanhos do campo, os mesmos do Input. @default "md" */
export type ComboboxSize = "sm" | "md" | "lg";

/**
 * API simplificada por props para uso primário (~90% dos casos).
 * Quando `items` é passado e não há `children`, o Combobox renderiza
 * input, content, list e itens internamente.
 */
export interface ComboboxSimplifiedProps<T = string> extends Omit<
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root>,
  "children"
> {
  /** Itens da lista (obrigatório para API simplificada). */
  items?: T[];
  /** Placeholder do input. @default "Selecionar…" */
  placeholder?: string;
  /** Mensagem quando não há resultados. @default "Nenhum item encontrado." */
  emptyMessage?: React.ReactNode;
  /** Mostrar botão de seta para abrir. @default true */
  showTrigger?: boolean;
  /** Mostrar botão de limpar. @default false */
  showClear?: boolean;
  /** Tamanho do campo. @default "md" */
  size?: ComboboxSize;
  /** Estado de erro, encaminhado ao input. */
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  /** Descrição do erro, encaminhada ao input. */
  "aria-describedby"?: string;
  /** Conteúdo quando usar composição (escape hatch). */
  children?: React.ReactNode;
}
