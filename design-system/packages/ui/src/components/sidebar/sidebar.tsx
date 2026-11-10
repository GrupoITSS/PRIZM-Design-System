import { cn } from "../../lib/cn";
import { useIsMobile } from "../../hooks/use-mobile";
import { Button } from "../button";
import { PanelLeft } from "../icons";
import { Input } from "../input";
import { Separator } from "../separator";
import { sheetContentVariants, sheetOverlayStyles } from "../sheet/sheet.styles";
import { Skeleton } from "../skeleton";
import { TooltipProvider } from "../tooltip";
import { tooltipArrowStyles, tooltipContentStyles } from "../tooltip/tooltip.styles";
import { Dialog as RadixDialog, Slot, Tooltip as TooltipPrimitive } from "radix-ui";
import * as React from "react";
import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_LABELS,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_WIDTH_MOBILE,
} from "./sidebar.constants";
import {
  sidebarGroupActionStyles,
  sidebarGroupLabelStyles,
  sidebarMenuActionShowOnHoverStyles,
  sidebarMenuActionStyles,
  sidebarMenuBadgeStyles,
  sidebarMenuButtonVariants,
  sidebarMenuSubButtonStyles,
  sidebarMenuSubStyles,
} from "./sidebar.styles";
import type {
  SidebarActionProps,
  SidebarContextProps,
  SidebarGroupLabelProps,
  SidebarMenuActionProps,
  SidebarMenuButtonProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarTooltipContentProps,
} from "./sidebar.types";

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

/** Estado da Sidebar. Só funciona dentro de um `SidebarProvider`. */
function useSidebar() {
  const context = React.use(SidebarContext);
  if (!context) {
    throw new Error("useSidebar precisa estar dentro de um SidebarProvider.");
  }
  return context;
}

/** Campo editável: o atalho Ctrl ou Cmd + B fica com ele (negrito), não com a Sidebar. */
function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])") !== null;
}

function setRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}

/** Junta o ref interno com o ref de quem usa. */
function useMergedRef<T>(inner: React.Ref<T> | undefined, outer: React.Ref<T> | undefined) {
  return React.useCallback(
    (node: T | null) => {
      setRef(inner, node);
      setRef(outer, node);
    },
    [inner, outer],
  );
}

/**
 * Pendência 8 de 10/11/2026: ação só de ícone precisa de nome. Em desenvolvimento, avisa no
 * console quando a ação não tem `aria-label`, `aria-labelledby`, `title` nem texto (sr-only).
 */
function useWarnUnnamedAction(ref: React.RefObject<HTMLElement | null>, component: string) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const el = ref.current;
    if (!el) return;
    const named =
      el.getAttribute("aria-label") ||
      el.getAttribute("aria-labelledby") ||
      el.getAttribute("title") ||
      el.textContent?.trim();
    if (!named) {
      console.warn(
        `${component}: ação só de ícone sem nome. Passe aria-label ou um texto sr-only.`,
      );
    }
  });
}

/**
 * Estado e atalho da Sidebar. Envolve a Sidebar e o conteúdo da página (`SidebarInset`).
 *
 * ```tsx
 * <SidebarProvider headerHeight="3rem">
 *   <Sidebar>…</Sidebar>
 *   <SidebarInset>…</SidebarInset>
 * </SidebarProvider>
 * ```
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  headerHeight = "0px",
  keyboardShortcut = true,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(openState);
      else setInternalOpen(openState);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen((value) => !value);
  }, [isMobile, setOpen]);

  // Pendência 10 de 10/11/2026: o atalho ignora campos editáveis e pode ser desligado.
  React.useEffect(() => {
    if (!keyboardShortcut) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== SIDEBAR_KEYBOARD_SHORTCUT || !(event.metaKey || event.ctrlKey)) return;
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      toggleSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              "--header-height": headerHeight,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-[calc(100svh-var(--header-height))] w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  );
}

/**
 * Sidebar do design system PRIZM: navegação lateral de uma solução, abaixo do header global.
 * Recolhe para uma faixa de ícones (`collapsible="icon"`, o padrão) e, no celular, abre numa
 * gaveta. O conteúdo fica num `<nav>` com nome (pendência 5).
 *
 * @see https://ui.shadcn.com/docs/components/radix/sidebar
 */
function Sidebar({
  side = "left",
  collapsible = "icon",
  label = SIDEBAR_LABELS.nav,
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  // A gaveta abre por estado, sem Dialog.Trigger: o Radix não sabe para onde devolver o foco ao
  // fechar e o manda para o body (2.4.3). Guarda quem tinha o foco ao abrir e devolve a ele.
  const returnFocusRef = React.useRef<HTMLElement | null>(null);

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        {...props}
      >
        <nav aria-label={label} className="flex h-full w-full flex-col">
          {children}
        </nav>
      </div>
    );
  }

  if (isMobile) {
    return (
      <RadixDialog.Root open={openMobile} onOpenChange={setOpenMobile}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay data-slot="sidebar-overlay" className={sheetOverlayStyles} />
          <RadixDialog.Content
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            className={cn(
              sheetContentVariants({ side }),
              "w-(--sidebar-width) gap-0 bg-sidebar p-0 text-sidebar-foreground",
            )}
            style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
            onOpenAutoFocus={() => {
              const active = document.activeElement;
              returnFocusRef.current =
                active instanceof HTMLElement && active !== document.body ? active : null;
            }}
            onCloseAutoFocus={(event) => {
              const target = returnFocusRef.current;
              if (target?.isConnected) {
                event.preventDefault();
                target.focus();
              }
            }}
          >
            <RadixDialog.Title className="sr-only">{SIDEBAR_LABELS.mobileTitle}</RadixDialog.Title>
            <RadixDialog.Description className="sr-only">
              {SIDEBAR_LABELS.mobileDescription}
            </RadixDialog.Description>
            <nav aria-label={label} className="flex h-full w-full flex-col">
              {children}
            </nav>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant="sidebar"
      data-side={side}
      data-slot="sidebar"
    >
      {/* Ocupa a largura da Sidebar no fluxo da página, no desktop. */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          "group-data-[side=right]:rotate-180",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          // S2: começa abaixo do header global (--header-height).
          "fixed top-(--header-height) bottom-0 z-10 hidden h-[calc(100svh-var(--header-height))] w-(--sidebar-width) border-sidebar-border transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <nav
          aria-label={label}
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col bg-sidebar"
        >
          {children}
        </nav>
      </div>
    </div>
  );
}

/** Botão que abre e recolhe a Sidebar; no celular, abre a gaveta. */
function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft aria-hidden="true" />
      <span className="sr-only">{SIDEBAR_LABELS.toggle}</span>
    </Button>
  );
}

/**
 * Faixa fina na borda da Sidebar que abre e recolhe com o mouse. Fica fora do Tab: o
 * SidebarTrigger e o atalho fazem o mesmo pelo teclado.
 */
function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label={SIDEBAR_LABELS.toggle}
      tabIndex={-1}
      onClick={toggleSidebar}
      title={SIDEBAR_LABELS.toggle}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

/** Conteúdo da página, ao lado da Sidebar. */
function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn("relative flex w-full flex-1 flex-col bg-background", className)}
      {...props}
    />
  );
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

interface SidebarGroupContextProps {
  labelId: string;
  setLabel: (id: string | undefined) => void;
}

const SidebarGroupContext = React.createContext<SidebarGroupContextProps | null>(null);

/**
 * Grupo de itens. Com um SidebarGroupLabel dentro, vira `role="group"` com `aria-labelledby` no
 * rótulo (pendência 6).
 */
function SidebarGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  const labelId = React.useId();
  const [currentLabel, setCurrentLabel] = React.useState<string | undefined>(undefined);
  const contextValue = React.useMemo(() => ({ labelId, setLabel: setCurrentLabel }), [labelId]);

  return (
    <SidebarGroupContext value={contextValue}>
      <div
        data-slot="sidebar-group"
        data-sidebar="group"
        role={currentLabel ? "group" : undefined}
        aria-labelledby={currentLabel}
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarGroupContext>
  );
}

/** Rótulo do grupo, em `text-xs` com o texto a 70% (P1). */
function SidebarGroupLabel({ className, asChild = false, id, ...props }: SidebarGroupLabelProps) {
  const Comp = asChild ? Slot.Root : "div";
  const group = React.use(SidebarGroupContext);
  const labelId = id ?? group?.labelId;

  React.useEffect(() => {
    if (!group) return;
    group.setLabel(labelId);
    return () => group.setLabel(undefined);
  }, [group, labelId]);

  return (
    <Comp
      id={labelId}
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(sidebarGroupLabelStyles, className)}
      {...props}
    />
  );
}

/** Ação do grupo, só de ícone. Precisa de nome: `aria-label` ou texto sr-only. */
function SidebarGroupAction({ className, asChild = false, ref, ...props }: SidebarActionProps) {
  const Comp = asChild ? Slot.Root : "button";
  const innerRef = React.useRef<HTMLButtonElement>(null);
  const mergedRef = useMergedRef<HTMLButtonElement>(innerRef, ref);
  useWarnUnnamedAction(innerRef, "SidebarGroupAction");

  return (
    <Comp
      ref={mergedRef}
      {...(asChild ? {} : { type: "button" as const })}
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(sidebarGroupActionStyles, className)}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

/** Tooltip do item recolhido. Com a Sidebar aberta ou no celular, fica fechado. */
function SidebarMenuTooltip({
  disabled,
  content,
  children,
}: {
  disabled: boolean;
  content: SidebarTooltipContentProps;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const { className, children: label, ...contentProps } = content;

  return (
    <TooltipPrimitive.Root open={!disabled && open} onOpenChange={setOpen}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          side="right"
          align="center"
          sideOffset={4}
          className={cn(tooltipContentStyles, className)}
          {...contentProps}
        >
          {label}
          <TooltipPrimitive.Arrow data-slot="tooltip-arrow" className={tooltipArrowStyles} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

/**
 * Item da Sidebar. Com `isActive`, fica em `color/sidebar-primary` e ganha `aria-current="page"`
 * (pendência 4). Com `tooltip`, mostra o nome quando a Sidebar está recolhida.
 */
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      {...(asChild ? {} : { type: "button" as const })}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      aria-current={isActive ? "page" : undefined}
      className={cn(sidebarMenuButtonVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  const content = typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <SidebarMenuTooltip disabled={state !== "collapsed" || isMobile} content={content}>
      {button}
    </SidebarMenuTooltip>
  );
}

/** Ação do item, só de ícone (o "…" do Dropdown). Precisa de nome: `aria-label` ou texto sr-only. */
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ref,
  ...props
}: SidebarMenuActionProps) {
  const Comp = asChild ? Slot.Root : "button";
  const innerRef = React.useRef<HTMLButtonElement>(null);
  const mergedRef = useMergedRef<HTMLButtonElement>(innerRef, ref);
  useWarnUnnamedAction(innerRef, "SidebarMenuAction");

  return (
    <Comp
      ref={mergedRef}
      {...(asChild ? {} : { type: "button" as const })}
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        sidebarMenuActionStyles,
        showOnHover && sidebarMenuActionShowOnHoverStyles,
        className,
      )}
      {...props}
    />
  );
}

/** Contador do item (o Type=Badge do Figma). Não é interativo. */
function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(sidebarMenuBadgeStyles, className)}
      {...props}
    />
  );
}

/** Item carregando. A largura do texto varia entre 50% e 90%. */
function SidebarMenuSkeleton({ className, showIcon = false, ...props }: SidebarMenuSkeletonProps) {
  const [width] = React.useState(() => `${Math.floor(Math.random() * 40) + 50}%`);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(sidebarMenuSubStyles, className)}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

/** Subitem (link). Com `isActive`, fica em `color/sidebar-accent` (P2) e ganha `aria-current="page"`. */
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        sidebarMenuSubButtonStyles,
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
