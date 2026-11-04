import type * as React from "react";
import type { Avatar as RadixAvatar } from "radix-ui";
import type { AvatarStatus, AvatarVariantProps } from "./avatar.styles";

export interface AvatarProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>, "className">,
    AvatarVariantProps {
  className?: string;
  /**
   * Image URL to display. The component preloads the URL and only renders the
   * image after a successful load; until then (or on failure) `fallback` is shown.
   */
  src?: string;
  /**
   * Nome da pessoa. Com o avatar sozinho, passe o nome; com o nome escrito ao lado, passe `""`
   * (decorativo). Com `alt`, as iniciais ficam ocultas do leitor de tela e ele lê o `alt`.
   * Com `src` e sem `alt`, há um aviso no console em desenvolvimento.
   * @example "John Doe"
   */
  alt?: string;
  /**
   * Fallback content (e.g. initials like "JD"). **Required when using simplified API** (src/fallback props).
   * Displayed when `src` is not provided or fails to load. Omit when using composition (children).
   * @example "JD"
   */
  fallback?: string;
  /**
   * Status da pessoa. Sem `status`, não há badge; com ele, o badge aparece no canto inferior
   * direito, com o texto do status oculto para o leitor de tela. Funciona na API simplificada e
   * na composição.
   */
  status?: AvatarStatus;
}

export interface AvatarImageProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>,
  "className"
> {
  className?: string;
}

export interface AvatarFallbackProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>,
  "className"
> {
  className?: string;
}

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Cor e texto oculto do status. Padrão `online`. */
  status?: AvatarStatus;
}

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement>;

/** Use `aria-label` para dar contexto ao +N (ex.: "Mais 3 pessoas"). */
export type AvatarGroupCountProps = React.HTMLAttributes<HTMLSpanElement>;

export type { AvatarStatus };
