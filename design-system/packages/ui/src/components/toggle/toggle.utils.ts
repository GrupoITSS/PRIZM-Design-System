import { isValidElement, type ReactNode } from "react";

/**
 * Diz se o conteúdo tem texto que dá nome ao botão: um texto, um número ou um elemento
 * sr-only, em qualquer nível. Um ícone sozinho não dá nome.
 */
export function hasTextContent(children: ReactNode): boolean {
  if (Array.isArray(children)) return children.some((child: ReactNode) => hasTextContent(child));
  if (typeof children === "string") return children.trim() !== "";
  if (typeof children === "number") return true;
  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    if (children.props.className?.includes("sr-only")) return true;
    return hasTextContent(children.props.children);
  }
  return false;
}

/** Nome vindo de atributo: aria-label, aria-labelledby ou title. */
export function hasNameAttribute(props: {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  title?: string;
}): boolean {
  return Boolean(props["aria-label"] ?? props["aria-labelledby"] ?? props.title);
}
