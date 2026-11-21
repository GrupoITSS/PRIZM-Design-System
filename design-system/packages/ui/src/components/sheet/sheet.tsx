import { Button } from "../button";
import { cn } from "../../lib/cn";
import { X } from "../icons";
import { Dialog as RadixDialog } from "radix-ui";
import {
  sheetBodyStyles,
  sheetCloseStyles,
  sheetContentVariants,
  sheetDefaultSize,
  sheetDescriptionStyles,
  sheetEyebrowStyles,
  sheetFooterActionsStyles,
  sheetFooterLeadingStyles,
  sheetFooterStyles,
  sheetHeaderActionsStyles,
  sheetHeaderStyles,
  sheetOverlayStyles,
  sheetTitleRowStyles,
  sheetTitleStyles,
} from "./sheet.styles";
import type { SheetProps } from "./sheet.types";

/**
 * Sheet (root). Painel deslizante a partir de uma borda da tela.
 *
 * API por props, sem subcomponentes públicos:
 *
 * ```tsx
 * <Sheet
 *   side="right"
 *   size="md"
 *   trigger={<Button variant="outline">Open</Button>}
 *   eyebrow="Order #1234"
 *   title="Edit order"
 *   titleAdornment={<Badge variant="default">Active</Badge>}
 *   description="Make changes to the order here."
 *   headerActions={<Button variant="ghost" size="icon-sm" aria-label="Edit">…</Button>}
 *   body={<div>…</div>}
 *   footerLeading={<Button variant="link">Learn more</Button>}
 *   footer={
 *     <>
 *       <Button variant="outline">Cancel</Button>
 *       <Button>Save</Button>
 *     </>
 *   }
 * />
 * ```
 *
 * Cabeçalho e rodapé ficam fixos; só o corpo rola. O botão fechar é o `Button` ghost `icon-sm`
 * do Prizm. Todo botão só de ícone em `headerActions` precisa de `aria-label`.
 *
 * @see https://ui.shadcn.com/docs/components/radix/sheet
 */
function SheetRoot({
  side = "right",
  size,
  trigger,
  eyebrow,
  title,
  titleAdornment,
  description,
  headerActions,
  body,
  footer,
  footerLeading,
  showCloseButton = true,
  closeLabel = "Close",
  contentClassName,
  bodyClassName,
  children,
  ...rootProps
}: SheetProps) {
  const useSimplifiedAPI =
    trigger !== undefined ||
    title !== undefined ||
    titleAdornment !== undefined ||
    eyebrow !== undefined ||
    description !== undefined ||
    body !== undefined ||
    footer !== undefined;

  if (!useSimplifiedAPI) {
    return <RadixDialog.Root {...rootProps}>{children}</RadixDialog.Root>;
  }

  const hasTitleRow = Boolean(title || titleAdornment || headerActions);

  return (
    <RadixDialog.Root {...rootProps}>
      {Boolean(trigger) && (
        <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      )}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          data-slot="sheet-overlay"
          className={sheetOverlayStyles}
        />
        <RadixDialog.Content
          data-slot="sheet-content"
          data-side={side}
          className={cn(
            sheetContentVariants({
              side,
              size: size ?? sheetDefaultSize[side],
            }),
            contentClassName,
          )}
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          <div data-slot="sheet-header" className={sheetHeaderStyles}>
            {eyebrow ? (
              <div data-slot="sheet-eyebrow" className={sheetEyebrowStyles}>
                {eyebrow}
              </div>
            ) : null}
            {hasTitleRow ? (
              <div data-slot="sheet-title-row" className={sheetTitleRowStyles}>
                <RadixDialog.Title
                  data-slot="sheet-title"
                  className={cn(sheetTitleStyles, !title && "sr-only")}
                >
                  {title || "Painel"}
                </RadixDialog.Title>
                {titleAdornment ? (
                  <div
                    data-slot="sheet-title-adornment"
                    className="flex items-center gap-2"
                  >
                    {titleAdornment}
                  </div>
                ) : null}
                {headerActions ? (
                  <div
                    data-slot="sheet-header-actions"
                    className={sheetHeaderActionsStyles}
                  >
                    {headerActions}
                  </div>
                ) : null}
              </div>
            ) : (
              <RadixDialog.Title className="sr-only">Painel</RadixDialog.Title>
            )}
            {description ? (
              <RadixDialog.Description
                data-slot="sheet-description"
                className={sheetDescriptionStyles}
              >
                {description}
              </RadixDialog.Description>
            ) : null}
          </div>

          {body ? (
            <div
              data-slot="sheet-body"
              className={cn(sheetBodyStyles, bodyClassName)}
            >
              {body}
            </div>
          ) : (
            <div className="min-h-0 flex-1" aria-hidden="true" />
          )}

          {footer || footerLeading ? (
            <div data-slot="sheet-footer" className={sheetFooterStyles}>
              {footerLeading ? (
                <div
                  data-slot="sheet-footer-leading"
                  className={sheetFooterLeadingStyles}
                >
                  {footerLeading}
                </div>
              ) : null}
              {footer ? (
                <div
                  data-slot="sheet-footer-actions"
                  className={sheetFooterActionsStyles}
                >
                  {footer}
                </div>
              ) : null}
            </div>
          ) : null}

          {showCloseButton && (
            <RadixDialog.Close asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={closeLabel}
                data-slot="sheet-close-button"
                className={sheetCloseStyles}
              >
                <X aria-hidden="true" />
              </Button>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

const Sheet = SheetRoot;

export { Sheet };
