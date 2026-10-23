import { cn } from "../../lib/cn";
import { X } from "../icons";
import { Dialog as RadixDialog } from "radix-ui";
import { dialogCloseButtonStyles } from "../dialog/dialog.styles";
import { sheetPanelWidthClass } from "./sheet.constants";
import type { SheetContentVariantProps } from "./sheet.styles";
import { sheetContentVariants, sheetOverlayStyles, sheetPanelStyles } from "./sheet.styles";
import type { SheetProps } from "./sheet.types";

interface InternalSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>, SheetContentVariantProps {
  showCloseButton?: boolean;
  closeLabel?: string;
}

function SheetContent({
  side,
  className,
  children,
  showCloseButton = true,
  closeLabel = "Close",
  ...props
}: InternalSheetContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay data-slot="sheet-overlay" className={cn(sheetOverlayStyles)} />
      <RadixDialog.Content
        data-slot="sheet-content"
        data-side={side ?? "right"}
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <RadixDialog.Close className={cn(dialogCloseButtonStyles)}>
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{closeLabel}</span>
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

/**
 * Sheet (root). Painel deslizante a partir de uma borda da tela.
 *
 * **API principal baseada em props (recomendada):**
 *
 * ```tsx
 * <Sheet
 *   side="right"
 *   trigger={<Button variant="outline">Open</Button>}
 *   title="Edit profile"
 *   description="Make changes to your profile here."
 *   body={<div>…</div>}
 *   footer={
 *     <>
 *       <Button variant="outline">Cancel</Button>
 *       <Button>Save</Button>
 *     </>
 *   }
 * />
 * ```
 *
 * Estilos alinhados ao shadcn/ui (new-york). Não expõe subcomponentes públicos.
 *
 * @see https://ui.shadcn.com/docs/components/radix/sheet
 */
function SheetRoot({
  side = "right",
  trigger,
  title,
  description,
  body,
  footer,
  showCloseButton = true,
  closeLabel = "Close",
  contentClassName,
  layout = "default",
  icon,
  eyebrow,
  headerActions,
  bodyClassName,
  children,
  ...rootProps
}: SheetProps) {
  const useSimplifiedAPI =
    trigger !== undefined ||
    title !== undefined ||
    description !== undefined ||
    body !== undefined ||
    footer !== undefined;

  if (useSimplifiedAPI && layout === "panel") {
    return (
      <RadixDialog.Root {...rootProps}>
        {Boolean(trigger) && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
        <SheetContent
          side={side}
          showCloseButton={false}
          data-layout="panel"
          className={cn(
            sheetPanelWidthClass,
            "sm:max-w-[calc(100vw-3rem)]",
            sheetPanelStyles.content,
            contentClassName,
          )}
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          <div data-slot="sheet-header" className={sheetPanelStyles.header}>
            <div className={sheetPanelStyles.headerMain}>
              {icon ? (
                <div data-slot="sheet-icon" className={sheetPanelStyles.headerIcon}>
                  {icon}
                </div>
              ) : null}
              <div className={sheetPanelStyles.headerText}>
                {eyebrow ? (
                  <div data-slot="sheet-eyebrow" className={sheetPanelStyles.eyebrow}>
                    {eyebrow}
                  </div>
                ) : null}
                <RadixDialog.Title
                  data-slot="sheet-title"
                  className={cn(sheetPanelStyles.title, !title && "sr-only")}
                >
                  {title || "Sheet"}
                </RadixDialog.Title>
                {description ? (
                  <RadixDialog.Description
                    data-slot="sheet-description"
                    className={sheetPanelStyles.description}
                  >
                    {description}
                  </RadixDialog.Description>
                ) : null}
              </div>
            </div>
            {headerActions || showCloseButton ? (
              <div data-slot="sheet-header-actions" className={sheetPanelStyles.headerActions}>
                {headerActions}
                {showCloseButton ? (
                  <RadixDialog.Close type="button" className={sheetPanelStyles.close}>
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">{closeLabel}</span>
                  </RadixDialog.Close>
                ) : null}
              </div>
            ) : null}
          </div>

          <div data-slot="sheet-body" className={cn(sheetPanelStyles.body, bodyClassName)}>
            {body}
          </div>

          {footer ? (
            <div data-slot="sheet-footer" className={sheetPanelStyles.footer}>
              {footer}
            </div>
          ) : null}
        </SheetContent>
      </RadixDialog.Root>
    );
  }

  if (useSimplifiedAPI) {
    return (
      <RadixDialog.Root {...rootProps}>
        {Boolean(trigger) && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
        <SheetContent
          side={side}
          showCloseButton={showCloseButton}
          closeLabel={closeLabel}
          className={contentClassName}
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          {Boolean(title || description) && (
            <div
              data-slot="sheet-header"
              className="flex flex-col space-y-2 pr-8 text-center sm:text-left"
            >
              {title ? (
                <RadixDialog.Title
                  data-slot="sheet-title"
                  className="text-lg font-semibold text-foreground"
                >
                  {title}
                </RadixDialog.Title>
              ) : (
                <RadixDialog.Title className="sr-only">Sheet</RadixDialog.Title>
              )}
              {description ? (
                <RadixDialog.Description
                  data-slot="sheet-description"
                  className="text-sm text-muted-foreground"
                >
                  {description}
                </RadixDialog.Description>
              ) : null}
            </div>
          )}

          {body ? (
            <div
              data-slot="sheet-body"
              className={cn(
                "custom-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-1",
                bodyClassName,
              )}
            >
              {body}
            </div>
          ) : null}

          {footer ? (
            <div
              data-slot="sheet-footer"
              className="mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2"
            >
              {footer}
            </div>
          ) : null}
        </SheetContent>
      </RadixDialog.Root>
    );
  }

  return <RadixDialog.Root {...rootProps}>{children}</RadixDialog.Root>;
}

const Sheet = SheetRoot;

export { Sheet };
