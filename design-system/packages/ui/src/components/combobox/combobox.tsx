import { Button } from "../button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../input-group";
import { cn } from "../../lib/cn";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import {
  comboboxChipStyles,
  comboboxChipsStyles,
  comboboxContentStyles,
  comboboxItemStyles,
  comboboxListStyles,
} from "./combobox.styles";
import type { ComboboxSimplifiedProps } from "./combobox.types";

/**
 * Combobox — input de seleção e busca baseado em `@base-ui/react`.
 *
 * **API principal (props diretas):**
 *
 * ```tsx
 * const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
 *
 * <Combobox
 *   items={frameworks}
 *   placeholder="Select a framework"
 *   emptyMessage="No items found."
 * />
 * ```
 *
 * Múltipla seleção: `multiple` + `value` + `onValueChange` (renderiza chips internamente).
 * Itens customizados: `itemToStringValue={(obj) => obj.label}`.
 *
 * Composição com subcomponentes fica disponível como escape hatch (passe `children`).
 *
 * @see https://base-ui.com/react/components/combobox
 */
function ComboboxRoot<T = string>({
  items,
  placeholder = "Select...",
  emptyMessage = "No items found.",
  showTrigger = true,
  showClear = false,
  multiple,
  value,
  onValueChange,
  itemToStringValue,
  children,
  ...rootProps
}: ComboboxSimplifiedProps<T>) {
  const useSimplifiedAPI = Array.isArray(items) && items.length > 0 && children === undefined;

  if (!useSimplifiedAPI) {
    return (
      <ComboboxPrimitive.Root
        items={items}
        itemToStringValue={itemToStringValue}
        multiple={multiple}
        value={value}
        onValueChange={onValueChange}
        {...rootProps}
      >
        {children}
      </ComboboxPrimitive.Root>
    );
  }

  const getKey = (item: T) =>
    typeof item === "object" && item !== null && "value" in item
      ? String((item as { value: string }).value)
      : String(itemToStringValue ? itemToStringValue(item) : item);
  const getLabel = (item: T) => (itemToStringValue ? itemToStringValue(item) : String(item));

  if (multiple && Array.isArray(value)) {
    return (
      <ComboboxPrimitive.Root
        items={items}
        multiple
        value={value}
        onValueChange={onValueChange}
        itemToStringValue={itemToStringValue}
        {...(rootProps as object)}
      >
        <ComboboxChips>
          <ComboboxValue>
            {(value as T[]).map((item) => (
              <ComboboxChip key={getKey(item)}>{getLabel(item)}</ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder={placeholder} />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
          <ComboboxList>
            {(item: T) => (
              <ComboboxItem key={getKey(item)} value={item}>
                {getLabel(item)}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPrimitive.Root>
    );
  }

  return (
    <ComboboxPrimitive.Root items={items} itemToStringValue={itemToStringValue} {...rootProps}>
      <ComboboxInput placeholder={placeholder} showTrigger={showTrigger} showClear={showClear} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item: T) => (
            <ComboboxItem key={getKey(item)} value={item}>
              {getLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPrimitive.Root>
  );
}

const Combobox = ComboboxRoot;

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton variant="ghost" size="icon-xs">
          <XIcon className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <ComboboxPrimitive.Trigger
            render={
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                data-slot="input-group-button"
                className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                disabled={disabled}
              >
                <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
              </InputGroupButton>
            }
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(comboboxContentStyles, className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList(props: ComboboxPrimitive.List.Props) {
  const { className, ...rest } = props;
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(comboboxListStyles, className)}
      {...rest}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(comboboxItemStyles, className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
            <CheckIcon className="pointer-events-none" />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />
  );
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function ComboboxChips(
  props: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
    ComboboxPrimitive.Chips.Props,
) {
  const { className, ...rest } = props;
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(comboboxChipsStyles, className)}
      {...rest}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(comboboxChipStyles, className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
          render={
            <Button variant="ghost" size="icon-xs">
              <XIcon className="pointer-events-none" />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput(props: ComboboxPrimitive.Input.Props) {
  const { className, ...rest } = props;
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...rest}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
