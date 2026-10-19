import { cva, type VariantProps } from "class-variance-authority";

export const labelVariants = cva(
  "text-sm font-light text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-100 peer-disabled:font-medium",
);

export type LabelVariantProps = VariantProps<typeof labelVariants>;
