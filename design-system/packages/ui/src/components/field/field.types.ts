import type * as React from "react";
import type { LabelProps } from "../label/label.types";
import type { FieldVariantProps } from "./field.styles";

export type FieldSetProps = React.ComponentProps<"fieldset">;

export interface FieldLegendProps extends React.ComponentProps<"legend"> {
  variant?: "legend" | "label";
}

export type FieldGroupProps = React.ComponentProps<"div">;

export type FieldProps = React.ComponentProps<"div"> & FieldVariantProps;

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
