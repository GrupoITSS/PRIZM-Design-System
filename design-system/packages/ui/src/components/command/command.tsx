import { Dialog, DialogContent, DialogTitle } from "../dialog";
import { cn } from "../../lib/cn";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "../icons";
import * as React from "react";
import {
  commandDialogStyles,
  commandEmptyStyles,
  commandGroupStyles,
  commandInputIconStyles,
  commandInputStyles,
  commandInputWrapperStyles,
  commandItemStyles,
  commandListStyles,
  commandRootStyles,
  commandSeparatorStyles,
  commandShortcutStyles,
} from "./command.styles";
import type {
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandShortcutProps,
} from "./command.types";

/**
 * Command — command menu / palette component built on top of `cmdk`.
 *
 * **API recomendada (props diretas):**
 *
 * ```tsx
 * <Command
 *   className="max-w-sm rounded-lg border"
 *   placeholder="Type a command or search..."
 *   emptyMessage="No results found."
 *   groups={[
 *     {
 *       heading: "Suggestions",
 *       items: [
 *         { label: "Calendar", shortcut: "⌘K" },
 *         { label: "Search Emoji" },
 *         { label: "Calculator" },
 *       ],
 *     },
 *     {
 *       heading: "Settings",
 *       items: [
 *         { label: "Profile" },
 *         { label: "Billing" },
 *         { label: "Settings" },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 *
 * **API avançada (composição / escape hatch):**
 *
 * ```tsx
 * <Command className="max-w-sm rounded-lg border">
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search Emoji</CommandItem>
 *       <CommandItem>Calculator</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 *
 * Para um menu em forma de dialog, use `CommandDialog`.
 *
 * @see https://github.com/dip/cmdk
 * @see https://ui.shadcn.com/docs/components/command
 */
const Command = function Command({
  className,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  groups,
  children,
  ref,
  ...props
}: CommandProps & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive>> }) {
  const useSimplifiedAPI = Array.isArray(groups) && groups.length > 0;

  if (!useSimplifiedAPI) {
    // Composição avançada (fallback)
    return (
      <CommandPrimitive ref={ref} className={cn(commandRootStyles, className)} {...props}>
        {children}
      </CommandPrimitive>
    );
  }

  return (
    <CommandPrimitive ref={ref} className={cn(commandRootStyles, className)} {...props}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {groups.map((group, groupIndex) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
          <CommandGroup key={groupIndex} heading={group.heading}>
            {group.items.map((item, itemIndex) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              <CommandItem key={itemIndex} onSelect={item.onSelect}>
                {Boolean(item.icon) && (
                  <span className="flex h-4 w-4 items-center justify-center">{item.icon}</span>
                )}
                {item.label}
                {Boolean(item.shortcut) && <CommandShortcut>{item.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandPrimitive>
  );
};

type CommandDialogProps = React.ComponentPropsWithoutRef<typeof Dialog>;

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={false} className="overflow-hidden p-0 shadow-lg sm:max-w-xl">
        <DialogTitle className="sr-only">Buscar</DialogTitle>
        <Command className={cn(commandRootStyles, commandDialogStyles)}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = function CommandInput({
  className,
  ref,
  ...props
}: CommandInputProps & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Input>> }) {
  return (
    <div className={commandInputWrapperStyles} cmdk-input-wrapper="">
      <Search className={commandInputIconStyles} />
      <CommandPrimitive.Input ref={ref} className={cn(commandInputStyles, className)} {...props} />
    </div>
  );
};

const CommandList = function CommandList({
  className,
  ref,
  ...props
}: CommandListProps & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.List>> }) {
  return (
    <CommandPrimitive.List ref={ref} className={cn(commandListStyles, className)} {...props} />
  );
};

const CommandEmpty = function CommandEmpty({
  ref,
  ...props
}: CommandEmptyProps & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Empty>> }) {
  return <CommandPrimitive.Empty ref={ref} className={commandEmptyStyles} {...props} />;
};

const CommandGroup = function CommandGroup({
  className,
  ref,
  ...props
}: CommandGroupProps & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Group>> }) {
  return (
    <CommandPrimitive.Group ref={ref} className={cn(commandGroupStyles, className)} {...props} />
  );
};

const CommandSeparator = function CommandSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Separator>>;
}) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn(commandSeparatorStyles, className)}
      {...props}
    />
  );
};

const CommandItem = function CommandItem({
  className,
  ref,
  ...props
}: CommandItemProps & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Item>> }) {
  return (
    <CommandPrimitive.Item ref={ref} className={cn(commandItemStyles, className)} {...props} />
  );
};

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return <span className={cn(commandShortcutStyles, className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
