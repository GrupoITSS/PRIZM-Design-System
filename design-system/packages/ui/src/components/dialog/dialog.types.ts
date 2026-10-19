import type * as React from "react";
import type { Dialog as RadixDialog } from "radix-ui";

/**
 * Campo de confirmação opcional exibido entre o cabeçalho e o rodapé do dialog.
 * A validação compara o valor digitado com `expectedValue`, ignorando
 * maiúsculas/minúsculas, acentuação e espaços.
 */
export interface DialogConfirmInputConfig {
  /**
   * Valor que o usuário deve digitar para habilitar ações destrutivas.
   *
   * @example "Leo"
   */
  expectedValue: string;

  /**
   * Rótulo exibido acima do input. Pode incluir destaque do nome esperado.
   *
   * @example <>Digite <strong>Leo</strong> para confirmar a exclusão:</>
   */
  label: React.ReactNode;

  /**
   * Placeholder do input. Por padrão usa `expectedValue`.
   */
  placeholder?: string;
}

/**
 * Props do componente raiz `Dialog` do design system PRIZM.
 *
 * Usa diretamente os tipos do Radix Dialog (`Dialog.Root`), permitindo
 * controlar abertura, modos controlado/ não controlado, etc.
 *
 * **Regra de design:** a API simplificada via props é o caminho principal de uso.
 * Subcomponentes (`DialogContent`, `DialogHeader`, etc.) existem apenas como
 * escape hatch para composição avançada.
 */
export interface DialogProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Root> {
  /**
   * Elemento que abre o dialog (por exemplo, um `Button`).
   *
   * @example <Button variant="outline">Open dialog</Button>
   */
  trigger?: React.ReactNode;

  /**
   * Título do dialog. Altamente recomendado para acessibilidade.
   *
   * @example "Edit profile"
   */
  title?: React.ReactNode;

  /**
   * Descrição do dialog. Recomendada para explicar o contexto.
   *
   * @example "Make changes to your profile here. Click save when you're done."
   */
  description?: React.ReactNode;

  /**
   * Conteúdo principal do dialog (corpo).
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
   * Conteúdo do rodapé do dialog (ações, botões, etc).
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
   * Classe CSS aplicada ao `DialogContent` quando usando a API simplificada.
   * Útil para ajustar tamanho do modal em cenários específicos (ex.: textarea
   * expandida ocupando grande parte da tela).
   */
  contentClassName?: string;

  /**
   * Exibe um input de confirmação (após o `body`) com validação flexível
   * (case, acentos e espaços). Use `onConfirmValidityChange` para
   * habilitar/desabilitar ações no footer.
   */
  confirmInput?: DialogConfirmInputConfig;

  /**
   * Callback disparado quando a validação do `confirmInput` muda.
   * Quando `confirmInput` não é informado, o valor é sempre `true`.
   */
  onConfirmValidityChange?: (isValid: boolean) => void;
}

export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Trigger>;

export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Portal>;

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;

/**
 * Props do conteúdo do Dialog (`DialogContent`).
 *
 * Além das props padrão do Radix, adiciona:
 * - `showCloseButton` para controlar a renderização do botão de fechar;
 * - `closeLabel` para personalizar o texto de acessibilidade do botão.
 */
export interface DialogContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
  "className"
> {
  className?: string;
  /**
   * Props repassadas para o `DialogPortal` (Radix `Dialog.Portal`).
   *
   * Útil para cenários com Shadow DOM (web components), onde o portal
   * precisa renderizar dentro de um container específico em vez de `document.body`.
   */
  portalProps?: DialogPortalProps;
  /**
   * Controla se o botão de fechar no canto superior direito é exibido.
   *
   * @default true
   * @example <DialogContent showCloseButton={false}>...</DialogContent>
   */
  showCloseButton?: boolean;
  /**
   * Texto usado no `sr-only` do botão de fechar, para acessibilidade.
   *
   * @default "Close"
   */
  closeLabel?: string;
  /**
   * Classes adicionais no overlay (após o estilo padrão), por exemplo
   * `absolute inset-0` em diálogos ancorados a um container em vez do viewport.
   */
  overlayClassName?: string;
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Title>;

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Description>;

export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Close>;
