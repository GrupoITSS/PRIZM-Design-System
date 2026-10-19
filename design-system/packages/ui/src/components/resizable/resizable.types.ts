import type * as React from "react";

export type ResizableDirection = "horizontal" | "vertical";

/**
 * Configuração de um painel dentro do grupo de painéis redimensionáveis.
 *
 * A API é focada em **props**: o chamador passa um array de painéis com
 * `content` e configurações de tamanho, sem precisar lidar com subcomponentes.
 */
export interface ResizablePanelConfig {
  /**
   * Identificador opcional para o painel. Se não for fornecido,
   * o índice do array será usado como key.
   */
  id?: string;
  /**
   * Conteúdo React exibido dentro do painel.
   */
  content: React.ReactNode;
  /**
   * Classe adicional aplicada ao painel.
   */
  className?: string;
  /**
   * Tamanho padrão em porcentagem.
   */
  defaultSize?: number;
  /**
   * Tamanho mínimo em porcentagem.
   */
  minSize?: number;
  /**
   * Tamanho máximo em porcentagem.
   */
  maxSize?: number;
  /**
   * Define se o painel é colapsável.
   */
  collapsible?: boolean;
  /**
   * Tamanho quando colapsado em porcentagem.
   */
  collapsedSize?: number;
}

export interface ResizablePanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Lista de painéis a serem renderizados dentro do grupo.
   *
   * **API principal recomendada**: o componente não expõe subcomponentes,
   * todo o layout é definido via este array.
   */
  panels?: ResizablePanelConfig[];
  /**
   * Direção do grupo de painéis.
   *
   * @default "horizontal"
   */
  direction?: ResizableDirection;
  /**
   * Se verdadeiro, exibe um "grip" visual dentro do handle entre os painéis.
   *
   * @default true
   */
  withHandle?: boolean;
  /**
   * Identificador opcional passado para o grupo subjacente.
   */
  id?: string;
}
