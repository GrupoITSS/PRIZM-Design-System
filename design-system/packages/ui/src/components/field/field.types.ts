import type * as React from "react";
import type { LabelProps } from "../label/label.types";
import type { FieldVariantProps } from "./field.styles";

export type FieldSetProps = React.ComponentProps<"fieldset">;

export interface FieldLegendProps extends React.ComponentProps<"legend"> {
  variant?: "legend" | "label";
}

export type FieldGroupProps = React.ComponentProps<"div">;

export type FieldProps = React.ComponentProps<"div"> &
  FieldVariantProps & {
    /**
     * Marca o campo como obrigatório. O `FieldLabel` mostra o asterisco e os controles do Prizm
     * dentro do Field (Input, Textarea, Select, Checkbox, RadioGroup e Switch) recebem
     * `aria-required`. Não ativa a validação nativa do navegador: para isso, passe `required`
     * no controle. O `required` do `FieldLabel` e o `aria-required` do controle, quando
     * passados, ganham do Field.
     */
    required?: boolean;
  };

export type FieldContentProps = React.ComponentProps<"div">;

export type FieldLabelProps = LabelProps;

export type FieldTitleProps = React.ComponentProps<"div">;

export type FieldDescriptionProps = React.ComponentProps<"p">;

export interface FieldSeparatorProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

export interface FieldErrorProps extends React.ComponentProps<"div"> {
  errors?: Array<{ message?: string } | undefined>;
}
