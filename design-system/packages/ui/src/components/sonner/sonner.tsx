import { Toaster as SonnerToaster } from "sonner";
import { cn } from "../../lib/cn";
import { CircleCheckBig, Info, OctagonX, TriangleAlert } from "../icons";
import { Spinner } from "../spinner";
import {
  toastActionButtonClassName,
  toastBaseClassName,
  toastCancelButtonClassName,
  toastCloseButtonClassName,
  toastDescriptionClassName,
  toastErrorClassName,
  toastInfoClassName,
  toastLoadingClassName,
  toastNeutralClassName,
  toastSuccessClassName,
  toastTitleClassName,
  toastWarningClassName,
  toasterBaseClassName,
  toasterStyle,
} from "./sonner.styles";
import type { ToasterProps } from "./sonner.types";

/**
 * PRIZM Toaster (Sonner).
 *
 * Wrapper do `sonner` configurado com:
 * - Tema via prop `theme` (`"light" | "dark" | "system"`); o app controla (ex.: estado ou contexto).
 * - Ícones padrão para `success`, `info`, `warning`, `error` e `loading`.
 * - Tons no padrão do Alert (`<tom>-weak`, tom, `<tom>-strong`), pelas variáveis do Sonner
 *   (`richColors`, ligado por padrão), texto `text-sm`, ação com o Button `outline` `sm`,
 *   foco com o anel do Prizm e sem botão fechar por padrão (decisões de 13/11/2026).
 *
 * Uso recomendado:
 * - Renderizar **uma única vez** próximo à raiz da aplicação (ex.: `app/layout.tsx`).
 * - Disparar toasts com `toast(...)`, exportado por `@grupoitss/prizm-ui/sonner`:
 *   - `toast("Mensagem")`
 *   - `toast.success("Criado")`
 *   - `toast("...", { description, action, position, ... })`
 *
 * @example
 * ```tsx
 * import { Toaster, toast } from "@grupoitss/prizm-ui/sonner";
 *
 * function Page() {
 *   return (
 *     <>
 *       <button onClick={() => toast.success("Alterações salvas")}>Salvar</button>
 *       <Toaster />
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
    richColors = true,
    closeButton = false,
    className,
    style,
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
      style={{ ...toasterStyle, ...style }}
      icons={{
        success: <CircleCheckBig className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        // Decorative: the toast text says what is loading.
        loading: <Spinner size="sm" aria-hidden="true" />,
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: toastBaseClassName,
          title: toastTitleClassName,
          description: toastDescriptionClassName,
          actionButton: toastActionButtonClassName,
          cancelButton: toastCancelButtonClassName,
          closeButton: toastCloseButtonClassName,
          // Tons: cores pelas variáveis do Sonner (toasterStyle); aqui, o ícone no tom base
          // e a descrição secundária nos neutros.
          default: toastNeutralClassName,
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
