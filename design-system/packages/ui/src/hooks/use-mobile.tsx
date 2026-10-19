import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function canMatchMedia() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

function subscribe(onChange: () => void) {
  if (!canMatchMedia()) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return canMatchMedia() ? window.matchMedia(QUERY).matches : false;
}

function getServerSnapshot() {
  return false;
}

/**
 * Hook responsável por indicar se o viewport atual é considerado mobile.
 * Usa `window.matchMedia` e atualiza em tempo real ao redimensionar.
 *
 * Em ambiente de testes (onde `window.matchMedia` pode não existir) e no
 * servidor, o hook retorna sempre `false`.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
