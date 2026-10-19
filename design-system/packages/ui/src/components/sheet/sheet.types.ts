import type * as React from "react";
import type { Dialog as RadixDialog } from "radix-ui";

export type SheetSide = "top" | "bottom" | "left" | "right";

/**
 * Props do componente raiz `Sheet` do design system PRIZM.
 *
 * Usa os tipos do Radix Dialog (`Dialog.Root`) para controlar abertura
 * (controlado/não controlado), com uma **API principal baseada em props**
 * para os casos mais comuns (trigger, título, descrição, corpo, rodapé).
 *
 * **Importante:** este componente **não expõe subcomponentes públicos**
 * (`SheetContent`, `SheetHeader`, etc.). Toda a configuração é feita via props.
 */
export interface SheetProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Root> {
  /**
   * Lado da tela de onde o Sheet aparece.
   *
   * @default "right"
   */
  side?: SheetSide;

  /**
   * Elemento que abre o sheet (por exemplo, um `Button`).
   *
   * @example <Button variant="outline">Open sheet</Button>
   */
  trigger?: React.ReactNode;

  /**
   * Título do sheet. Altamente recomendado para acessibilidade.
   *
   * @example "Edit profile"
   */
  title?: React.ReactNode;

  /**
   * Descrição do sheet. Recomendada para explicar o contexto.
   *
   * @example "Make changes to your profile here. Click save when you're done."
   */
  description?: React.ReactNode;

  /**
   * Conteúdo principal do sheet (corpo).
   *
   * @example
   * body={
   *   <Form>
   *     <Field>...</Field>
   *   </Form>
   * }
   */
  body?: React.ReactNode;

  /**
   * Conteúdo do rodapé do sheet (ações, botões, etc).
   *
   * @example
   * footer={
   *   <>
   *     <Button variant="outline">Cancel</Button>
   *     <Button>Save</Button>
   *   </>
   * }
   */
  footer?: React.ReactNode;

  /**
   * Controla se o botão de fechar no canto superior direito é exibido
   * na API simplificada.
   *
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Texto usado no `sr-only` do botão de fechar, para acessibilidade,
   * na API simplificada.
   *
   * @default "Close"
   */
  closeLabel?: string;

  /**
   * Classes adicionais aplicadas ao container do conteúdo do sheet
   * (Radix `Dialog.Content`). Permite customizar largura, padding,
   * borda, etc., sem perder os estilos do design system.
   *
   * @example
   * contentClassName="border-0 w-[40vw] max-w-2xl"
   */
  contentClassName?: string;

  /**
   * `default`: layout shadcn (padding único, close absoluto).
   * `panel`: header/body/footer com bordas, scroll só no corpo e largura
   * padrão de painel lateral (`sheetPanelWidthClass`).
   *
   * @default "default"
   */
  layout?: SheetLayout;

  /** Ícone ou avatar à esquerda do título (layout `panel`). */
  icon?: React.ReactNode;

  /** Conteúdo acima do título — chips, eyebrow (layout `panel`). */
  eyebrow?: React.ReactNode;

  /** Ações no header, ao lado do botão de fechar (layout `panel`). */
  headerActions?: React.ReactNode;

  /** Classes adicionais do container do corpo. */
  bodyClassName?: string;
}

export type SheetLayout = "default" | "panel";
