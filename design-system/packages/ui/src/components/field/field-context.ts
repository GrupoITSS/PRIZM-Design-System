import * as React from "react";

interface FieldContextValue {
  /** `required` do `Field` mais próximo. */
  required: boolean;
}

const FieldContext = React.createContext<FieldContextValue>({ required: false });

/**
 * Lê o `required` do `Field` mais próximo. Fora de um `Field`, é `false`.
 * O `FieldLabel` usa para o asterisco; os controles, para o `aria-required`.
 */
function useFieldRequired(): boolean {
  return React.use(FieldContext).required;
}

/**
 * Props de acessibilidade que o controle herda do `Field`: `aria-required="true"` quando o
 * `Field` é `required`, e nada no resto. Espalhe antes das props do controle, para que um
 * `aria-required` passado direto no controle ganhe.
 */
function useFieldControlProps(): { "aria-required"?: true } {
  return useFieldRequired() ? { "aria-required": true } : {};
}

export { FieldContext, useFieldControlProps, useFieldRequired };
