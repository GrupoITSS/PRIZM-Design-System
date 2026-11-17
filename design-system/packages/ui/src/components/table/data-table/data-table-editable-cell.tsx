import * as React from "react";
import { cn } from "../../../lib/cn";
import { Input } from "../../input";

export interface DataTableEditableCellProps extends Omit<
  React.ComponentProps<typeof Input>,
  "size" | "value" | "onChange"
> {
  /** Valor do campo. */
  value: string | number;
  /** Chamado a cada mudança, com o texto do campo. */
  onChange: (value: string) => void;
  /** Nome do campo para o leitor de tela, com a linha: "Quantidade de Plano Básico". */
  label: string;
  /** Mensagem de erro. Com ela, o campo fica inválido (`aria-invalid`) e a mensagem aparece embaixo. */
  error?: React.ReactNode;
  /** Alinhamento do texto, o mesmo da coluna. Números à direita. @default "left" */
  align?: "left" | "right";
}

/**
 * Campo dentro de uma célula do DataTable: o Input `sm` do Prizm, que cabe na linha de 52px.
 * Estados: padrão, foco, inválido (com mensagem), desabilitado e só leitura, todos do Input.
 * A mensagem de erro vai em `destructive-strong`: em `destructive`, o texto fica abaixo de 4,5:1 no
 * Docnix escuro (4,22:1) e no ITSS · Digitrol claro (4,43:1), medido em 17/11/2026.
 * O valor e a validação são do produto; o DataTable não guarda nada.
 *
 * @example
 * cell: ({ row }) => (
 *   <DataTableEditableCell
 *     label={`Quantidade de ${row.original.nome}`}
 *     type="number"
 *     align="right"
 *     value={qtd[row.id] ?? 0}
 *     onChange={(v) => setQtd({ ...qtd, [row.id]: Number(v) })}
 *     error={qtd[row.id] < 0 ? "Quantidade não pode ser negativa" : undefined}
 *   />
 * )
 */
export function DataTableEditableCell({
  value,
  onChange,
  label,
  error,
  align = "left",
  className,
  id,
  ...props
}: DataTableEditableCellProps) {
  const autoId = React.useId();
  const inputId = id ?? `${autoId}-input`;
  const errorId = `${autoId}-error`;
  return (
    <div data-slot="data-table-editable-cell" className="flex flex-col gap-1">
      <Input
        {...props}
        id={inputId}
        size="sm"
        value={value}
        aria-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(align === "right" && "text-right tabular-nums", className)}
        onChange={(event) => onChange(event.currentTarget.value)}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          // Enter e Espaço no campo não abrem a linha clicável.
          event.stopPropagation();
          props.onKeyDown?.(event);
        }}
      />
      {error ? (
        <p id={errorId} className="text-sm text-destructive-strong">
          {error}
        </p>
      ) : null}
    </div>
  );
}
