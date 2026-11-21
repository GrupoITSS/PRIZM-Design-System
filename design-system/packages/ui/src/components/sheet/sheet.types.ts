import type * as React from "react";
import type { Dialog as RadixDialog } from "radix-ui";
import type { SheetSize } from "./sheet.styles";

export type { SheetSize } from "./sheet.styles";
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
   * Largura máxima, na escala `max-width/*` do Core (a mesma do Dialog): `sm` 384px, `md` 448px,
   * `lg` 512px, `xl` 576px, `2xl` 672px e `full` (a largura da tela, só em `top` e `bottom`).
   * Nas laterais, `full` vale como `2xl`. No celular, as laterais ocupam 75% da tela e
   * `top` e `bottom` a largura toda.
   *
   * @default "sm" em left e right; "full" em top e bottom
   */
  size?: SheetSize;

  /**
   * Elemento que abre o sheet (por exemplo, um `Button`).
   *
   * @example <Button variant="outline">Open sheet</Button>
   */
  trigger?: React.ReactNode;

  /**
   * Título do sheet. Obrigatório para o leitor de tela: sem `title`, o painel se chama "Painel"
   * (`sr-only`).
   *
   * @example "Edit profile"
   */
  title?: React.ReactNode;

  /**
   * Status ou ação ao lado do título (por exemplo, um `Badge`). Não entra no nome do sheet.
   *
   * @example <Badge>Active</Badge>
   */
  titleAdornment?: React.ReactNode;

  /**
   * Texto acima do título, para situar o painel (número do pedido, categoria).
   *
   * @example "Order #1234"
   */
  eyebrow?: React.ReactNode;

  /**
   * Descrição do sheet. Recomendada para explicar o contexto.
   *
   * @example "Make changes to your profile here. Click save when you're done."
   */
  description?: React.ReactNode;

  /**
   * Ações do registro, ao lado do título e antes do botão fechar. Até 2 botões `ghost` `icon-sm`.
   * Todo botão só de ícone precisa de `aria-label`.
   *
   * @example <Button variant="ghost" size="icon-sm" aria-label="Edit"><Pencil /></Button>
   */
  headerActions?: React.ReactNode;

  /**
   * Conteúdo principal do sheet. É a única parte que rola.
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
   * Ações do rodapé, que fica fixo embaixo. No celular, a ação principal fica em cima.
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
   * Conteúdo opcional à esquerda das ações do rodapé (link, checkbox, texto de status).
   *
   * @example <Button variant="link">Learn more</Button>
   */
  footerLeading?: React.ReactNode;

  /**
   * Controla se o botão de fechar (Button ghost `icon-sm`) é exibido.
   *
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Nome acessível do botão de fechar (`aria-label`).
   *
   * @default "Fechar"
   */
  closeLabel?: string;

  /**
   * Classes adicionais aplicadas ao container do conteúdo do sheet
   * (Radix `Dialog.Content`).
   */
  contentClassName?: string;

  /** Classes adicionais do container do corpo. */
  bodyClassName?: string;
}
