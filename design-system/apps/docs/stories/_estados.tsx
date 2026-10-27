import type { ReactNode } from "react";

/**
 * Grade da story "Estados": um campo por estado, com o nome do estado e o que o
 * dispara no código, como a seção Estados do frame de documentação no Figma.
 * O foco é forçado pelo storybook-addon-pseudo-states (parameters.pseudo).
 */
export interface Estado {
  nome: string;
  gatilho: string;
  campo: ReactNode;
}

export function EstadosGrade({ estados }: { estados: Estado[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-6">
      {estados.map((estado) => (
        <div key={estado.nome} className="flex flex-col gap-2">
          {estado.campo}
          <div>
            <p className="text-sm font-semibold text-foreground">{estado.nome}</p>
            <p className="font-mono text-xs text-muted-foreground">{estado.gatilho}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
