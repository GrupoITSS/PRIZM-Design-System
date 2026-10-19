import { cn } from "../../lib/cn";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import {
  drawerContentStyles,
  drawerDescriptionStyles,
  drawerFooterStyles,
  drawerHandleStyles,
  drawerHeaderStyles,
  drawerOverlayStyles,
  drawerTitleStyles,
} from "./drawer.styles";
import type {
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerProps,
  DrawerTitleProps,
} from "./drawer.types";

/**
 * Drawer (root). Painel deslizante (bottom/top/left/right) para conteúdo.
 *
 * **API recomendada (props diretas):**
 *
 * ```tsx
 * <Drawer
 *   trigger={<Button variant="outline">Open Drawer</Button>}
 *   title="Edit profile"
 *   description="Make changes below. Click save when done."
 *   body={<Form>...</Form>}
 *   footer={<><Button variant="outline">Cancel</Button><Button>Save</Button></>}
 * />
 * ```
 *
 * **API de composição (escape hatch):**
 *
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger asChild>...</DrawerTrigger>
 *   <DrawerContent>...</DrawerContent>
 * </Drawer>
 * ```
 *
 * @see https://vaul.emilkowal.ski/
 */
function DrawerRoot({
  trigger,
  title,
  description,
  body,
  footer,
  showHandle = true,
  contentClassName,
  side,
  direction,
  modal = true,
  dismissible = true,
  handleOnly = false,
  repositionInputs = true,
  shouldScaleBackground = true,
  container,
  children,
  ...props
}: DrawerProps) {
  const useSimplifiedAPI =
    trigger !== undefined ||
    title !== undefined ||
    description !== undefined ||
    body !== undefined ||
    footer !== undefined;

  const resolvedDirection = side ?? direction ?? "bottom";

  const defaultMaxSizeStyle: React.CSSProperties =
    resolvedDirection === "top" || resolvedDirection === "bottom"
      ? { maxHeight: "85vh" }
      : { maxWidth: "85vw" };

  const rootProps = {
    direction: resolvedDirection,
    modal,
    dismissible,
    handleOnly,
    repositionInputs,
    shouldScaleBackground,
    container,
    ...props,
  } as React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>;

  if (useSimplifiedAPI) {
    return (
      <DrawerPrimitive.Root {...rootProps}>
        {Boolean(trigger) && <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>}
        <DrawerContent
          className={contentClassName}
          style={defaultMaxSizeStyle}
          showHandle={showHandle}
        >
          {Boolean(title || description) && (
            <DrawerHeader>
              {Boolean(title) && <DrawerTitle>{title}</DrawerTitle>}
              {Boolean(description) && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          )}
          {body}
          {Boolean(footer) && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </DrawerPrimitive.Root>
    );
  }

  return <DrawerPrimitive.Root {...rootProps}>{children}</DrawerPrimitive.Root>;
}

const Drawer = DrawerRoot as React.FC<DrawerProps> & { displayName?: string };
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger as typeof DrawerPrimitive.Trigger & {
  displayName?: string;
};
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerPortal = DrawerPrimitive.Portal as typeof DrawerPrimitive.Portal & {
  displayName?: string;
};
DrawerPortal.displayName = "DrawerPortal";

const DrawerClose = DrawerPrimitive.Close as typeof DrawerPrimitive.Close & {
  displayName?: string;
};
DrawerClose.displayName = "DrawerClose";

const DrawerOverlay = ({
  className,
  ref,
  ...props
}: DrawerOverlayProps & {
  ref?: React.Ref<React.ComponentRef<typeof DrawerPrimitive.Overlay>>;
}) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn(drawerOverlayStyles, className)} {...props} />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName ?? "DrawerOverlay";

const DrawerContent = ({
  className,
  children,
  showHandle = true,
  ref,
  ...props
}: DrawerContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof DrawerPrimitive.Content>>;
}) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content ref={ref} className={cn(drawerContentStyles, className)} {...props}>
      {showHandle && <div className={drawerHandleStyles} />}
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div data-slot="drawer-header" className={cn(drawerHeaderStyles, className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div data-slot="drawer-footer" className={cn(drawerFooterStyles, className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = ({
  className,
  ref,
  ...props
}: DrawerTitleProps & { ref?: React.Ref<React.ComponentRef<typeof DrawerPrimitive.Title>> }) => (
  <DrawerPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn(drawerTitleStyles, className)}
    {...props}
  />
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName ?? "DrawerTitle";

const DrawerDescription = ({
  className,
  ref,
  ...props
}: DrawerDescriptionProps & {
  ref?: React.Ref<React.ComponentRef<typeof DrawerPrimitive.Description>>;
}) => (
  <DrawerPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn(drawerDescriptionStyles, className)}
    {...props}
  />
);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName ?? "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
