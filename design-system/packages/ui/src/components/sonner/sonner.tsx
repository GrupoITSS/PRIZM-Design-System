import { Toaster as SonnerToaster } from "sonner";
import { cn } from "../../lib/cn";
import { CircleCheckBig, Info, Loader, OctagonX, TriangleAlert } from "../icons";
import {
  toastActionButtonClassName,
  toastBaseClassName,
  toastCancelButtonClassName,
  toastDescriptionClassName,
  toastErrorClassName,
  toastInfoClassName,
  toastLoadingClassName,
  toastSuccessClassName,
  toastWarningClassName,
  toasterBaseClassName,
} from "./sonner.styles";
import type { ToasterProps } from "./sonner.types";

/**
 * PRIZM Toaster (Sonner).
 *
 * Wrapper do `sonner` configurado com:
 * - Tema via prop `theme` (`"light" | "dark" | "system"`); o app controla (ex.: estado ou contexto).
 * - Ícones padrão para `success`, `info`, `warning`, `error` e `loading`.
 * - Classes alinhadas aos tokens PRIZM (`bg-background`, `text-foreground`, etc.).
 *
 * Uso recomendado:
 * - Renderizar **uma única vez** próximo à raiz da aplicação (ex.: `app/layout.tsx`).
 * - Declarar `sonner` como dependência da app e disparar toasts via `toast(...)`:
 *   - `toast("Mensagem")`
 *   - `toast.success("Criado")`
 *   - `toast("...", { description, action, position, ... })`
 *
 * @example
 * ```tsx
 * import { Toaster } from "@grupoitss/prizm-ui";
 * import { toast } from "sonner";
 *
 * function Page() {
 *   return (
 *     <>
 *       <button onClick={() => toast("Event has been created")}>Show</button>
 *       <Toaster richColors />
 *     </>
 *   );
 * }
 * ```
 *
 * @see https://sonner.emilkowal.ski/getting-started — Documentação oficial do Sonner.
 */
const Toaster: React.FC<ToasterProps> = (props) => {
  const {
    theme = "system",
    position = "top-right",
    richColors = false,
    closeButton = true,
    className,
    toastOptions,
    ...rest
  } = props;

  return (
    <SonnerToaster
      theme={theme}
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      className={cn(toasterBaseClassName, className)}
      icons={{
        success: <CircleCheckBig className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <Loader className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: toastBaseClassName,
          description: toastDescriptionClassName,
          actionButton: toastActionButtonClassName,
          cancelButton: toastCancelButtonClassName,
          // Variants (Sonner)
          // Use PRIZM semantic tokens instead of Sonner `richColors`.
          // `!` is needed to override Sonner defaults (Tailwind v4).
          success: toastSuccessClassName,
          error: toastErrorClassName,
          warning: toastWarningClassName,
          info: toastInfoClassName,
          loading: toastLoadingClassName,
          ...toastOptions?.classNames,
        },
      }}
      {...rest}
    />
  );
};

Toaster.displayName = "Toaster";

export { Toaster };
