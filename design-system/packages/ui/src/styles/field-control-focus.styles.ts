/**
 * Estilo de foco padrão PRIZM para campos de formulário (Input, Select, Textarea, etc.).
 * Borda 2px reservada no repouso (border-2 no controle); no foco só muda a cor.
 * Ring inset reforça o realce para dentro, sem crescer para fora do h fixo.
 */
export const fieldControlTransitionStyles = "transition-[color,box-shadow,border-color]";

export const fieldControlFocusVisibleStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/20 focus-visible:border-primary";

export const fieldControlFocusWithinStyles =
  "focus-within:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/20 focus-within:border-primary";

export const fieldControlOpenStyles =
  "data-[state=open]:outline-none data-[state=open]:ring-2 data-[state=open]:ring-inset data-[state=open]:ring-primary/20 data-[state=open]:border-primary";

/**
 * Estado de erro — utilities Tailwind (vencem `border-border` do size md).
 * Usar com `aria-invalid` / `data-invalid="true"` no controle.
 */
export const fieldControlInvalidStyles =
  "aria-invalid:border-destructive data-[invalid=true]:border-destructive aria-invalid:focus-visible:border-destructive data-[invalid=true]:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20 data-[invalid=true]:focus-visible:ring-destructive/20";
