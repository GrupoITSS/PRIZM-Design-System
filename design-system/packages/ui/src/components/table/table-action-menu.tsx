import { Button } from "../button";
import { EllipsisVertical } from "../icons";
import { Popover } from "../popover";
import { cn } from "../../lib/cn";
import { type ReactNode, useState } from "react";

export type GridAction = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive" | "warning";
};

export type GridActionMenuProps = {
  actions: GridAction[];
  position?: "top" | "bottom" | "left" | "right";
  align?: "center" | "start" | "end";
  children?: ReactNode;
};

export function GridActionMenu({
  actions,
  position = "bottom",
  align = "end",
  children,
}: GridActionMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      size="sm"
      side={position}
      align={align}
      open={open}
      onOpenChange={setOpen}
      className="w-max min-w-56 max-w-[calc(100vw-1.5rem)]"
      trigger={
        children ?? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-[1.875rem] rotate-90 text-muted-foreground"
            aria-label="Abrir menu de ações"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        )
      }
      content={
        <div className="flex w-full flex-col gap-1.5 p-1">
          {actions.map(({ label, icon, onClick, disabled, variant = "default" }) => (
            <button
              key={label}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onClick();
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-start gap-2.5 whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors",
                variant === "destructive" && "text-destructive hover:bg-destructive/10",
                variant === "warning" && "text-warning hover:bg-warning/10",
                variant === "default" && "text-foreground hover:bg-accent",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      }
    />
  );
}
