import * as React from "react";
import { Badge } from "../badge";
import { StatusColumnComponent } from "./status-column/status-column";
import { HoverCard } from "../hover-card";
import { Popover } from "../popover";
import { cn } from "../../lib/cn";

import {
  ContentRenderType,
  type ContentFormatType,
  type ImageWithText,
  type PrizmCellMeta,
  type StatusSummaryValue,
  type Tag,
} from "./table-cell-renderers.types";
import { formatTableText, resolveLinkTemplate, toSide } from "./table-cell-renderers.utils";
import { toText } from "../../lib/to-text";

// Links and buttons inside cells use the Button focus ring (decision of 06/11/2026); before, the
// browser outline. rounded-sm keeps the ring around the text.
const RENDERER_FOCUS =
  "rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset";

const STATUS_VARIANT: Record<string, React.ComponentProps<typeof Badge>["variant"]> = {
  PENDING: "secondary",
  IN_PROGRESS: "warning",
  WAITING: "secondary",
  PROCESSING: "warning",
  COMPLETED: "success",
  PROCESSED: "success",
  ERROR: "destructive",
  ACTIVE: "success",
  INACTIVE: "secondary",
};

/** Fallback labels when apps do not pass `statusLabels` on DataTable (English). */
const DEFAULT_PROCESSING_STATUS_LABELS: Record<string, string> = {
  WAITING: "Pending",
  PROCESSING: "Processing",
  PROCESSED: "Processed",
  ERROR: "Failed",
  PENDING: "Pending",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

function normalizeStatusKey(raw: string | undefined): string {
  return (raw ?? "").toUpperCase().trim();
}

function resolveStatusLabel(
  rawStatus: string | undefined,
  statusLabels?: Record<string, string>,
): string {
  if (rawStatus == null || rawStatus === "") return "—";
  const merged = { ...DEFAULT_PROCESSING_STATUS_LABELS, ...(statusLabels ?? {}) };
  if (merged[rawStatus]) return merged[rawStatus];
  const key = normalizeStatusKey(rawStatus);
  return merged[key] ?? rawStatus;
}

function resolveStatusBadgeVariant(
  rawStatus: string | undefined,
): React.ComponentProps<typeof Badge>["variant"] {
  const key = normalizeStatusKey(rawStatus);
  return STATUS_VARIANT[key] ?? "secondary";
}

function isLifecycleStatus(raw: string | undefined): boolean {
  const key = normalizeStatusKey(raw);
  return key === "ACTIVE" || key === "INACTIVE" || key === "ATIVO" || key === "INATIVO";
}

function StatusCell({
  status,
  statusLabels,
}: {
  status: string | boolean;
  statusLabels?: Record<string, string> | undefined;
}) {
  if (typeof status === "boolean" || isLifecycleStatus(String(status ?? ""))) {
    return <StatusColumnComponent status={status} label={statusLabels} />;
  }

  const key = normalizeStatusKey(String(status));
  const label =
    statusLabels?.[String(status)] ??
    statusLabels?.[key] ??
    DEFAULT_PROCESSING_STATUS_LABELS[key] ??
    String(status);
  const variant = resolveStatusBadgeVariant(String(status));
  return (
    <Badge variant={variant} size="sm">
      {label}
    </Badge>
  );
}

function TextCell({
  value,
  format,
  link,
}: {
  value: unknown;
  format?: ContentFormatType | `${ContentFormatType}` | null;
  link?: string;
}) {
  const text = formatTableText(value, format ?? undefined);
  return (
    <div className="truncate text-sm/6">
      {link ? (
        <a className={cn("hover:underline hover:underline-offset-4", RENDERER_FOCUS)} href={link}>
          {text}
        </a>
      ) : (
        text
      )}
    </div>
  );
}

function TextButtonCell({
  value,
  format,
  onClick,
}: {
  value: unknown;
  format?: ContentFormatType | `${ContentFormatType}` | null;
  onClick?: VoidFunction;
}) {
  const text = formatTableText(value, format ?? undefined);
  return (
    <div className="w-full overflow-hidden">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "truncate text-sm/6 w-full text-left hover:underline hover:cursor-pointer hover:underline-offset-4",
          RENDERER_FOCUS,
        )}
      >
        {text}
      </button>
    </div>
  );
}

function TextImageCell({
  value,
  link,
  onClick,
}: {
  value: ImageWithText;
  link?: string;
  onClick?: VoidFunction;
}) {
  return (
    <div className="flex items-center gap-2 truncate">
      <div className="shrink-0 rounded-lg overflow-hidden bg-muted w-7 h-7">
        {value.imageUrl && (
          // Decorative: the name is right next to it. alt={value.text} read it twice (WCAG 1.1.1).
          <img src={value.imageUrl} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="text-sm/6 truncate">
        {link ? (
          <a
            className={cn("font-normal hover:underline hover:underline-offset-4", RENDERER_FOCUS)}
            href={link}
          >
            {value.text}
          </a>
        ) : onClick ? (
          <button
            type="button"
            onClick={onClick}
            className={cn("hover:underline hover:underline-offset-4", RENDERER_FOCUS)}
          >
            {value.text}
          </button>
        ) : (
          <span>{value.text}</span>
        )}
      </div>
    </div>
  );
}

function toBadgeTags(value: unknown): Tag[] {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        if (item && typeof item === "object") {
          const tag = item as { id?: unknown; name?: unknown };
          const name = toText(tag.name).trim();
          if (!name) return null;
          return { id: toText(tag.id) || name, name };
        }
        const name = String(item ?? "").trim();
        if (!name) return null;
        return { id: `${name}-${index}`, name };
      })
      .filter((tag): tag is Tag => tag != null);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((part, index) => {
        const name = part.trim();
        return name ? { id: `${name}-${index}`, name } : null;
      })
      .filter((tag): tag is Tag => tag != null);
  }
  return [];
}

const NEUTRAL_BADGE = {
  variant: "outline",
  size: "sm",
} as const;

function stopRowClick(event: React.SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function BadgeOverflowTrigger({
  hiddenCount,
  content,
}: {
  hiddenCount: number;
  content: React.ReactNode;
}) {
  return (
    <HoverCard
      openDelay={0}
      closeDelay={120}
      side="bottom"
      align="start"
      contentClassName="w-auto max-w-64 p-2"
      trigger={
        <button
          type="button"
          className={cn("inline-flex shrink-0", RENDERER_FOCUS)}
          aria-label={`Mostrar mais ${hiddenCount}`}
          onClick={stopRowClick}
          onPointerDown={stopRowClick}
          onMouseDown={stopRowClick}
        >
          <Badge {...NEUTRAL_BADGE}>+{hiddenCount}</Badge>
        </button>
      }
      content={content}
    />
  );
}

function BadgeCell({ tags, maxVisible = 2 }: { tags: unknown; maxVisible?: number }) {
  const normalized = toBadgeTags(tags);
  if (!normalized.length) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  const visible = normalized.slice(0, Math.max(0, maxVisible));
  const hiddenCount = Math.max(0, normalized.length - visible.length);

  const list = (
    <div className="flex max-w-64 flex-col gap-1.5">
      {normalized.map((t) => (
        <Badge key={t.id} {...NEUTRAL_BADGE} title={t.name} className="max-w-full truncate">
          {t.name}
        </Badge>
      ))}
    </div>
  );

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      {visible.map((t) => (
        <Badge
          key={t.id}
          {...NEUTRAL_BADGE}
          title={t.name}
          className={cn("min-w-0 truncate", hiddenCount > 0 ? "max-w-34" : "max-w-full")}
        >
          {t.name}
        </Badge>
      ))}
      {hiddenCount > 0 ? <BadgeOverflowTrigger hiddenCount={hiddenCount} content={list} /> : null}
    </div>
  );
}

function deriveStatusSummaryBadgeVariant(
  items: Array<{ status?: string }>,
): React.ComponentProps<typeof Badge>["variant"] {
  if (items.length === 0) return "success";
  const normalized = items.map((i) => (i.status ?? "").toUpperCase());
  const all = (s: string) => normalized.every((x) => x === s);
  if (all("PROCESSED")) return "success";
  if (all("ERROR")) return "destructive";
  if (all("WAITING")) return "secondary";
  if (all("PROCESSING")) return "warning";
  if (normalized.some((x) => x === "ERROR")) return "destructive";
  if (normalized.some((x) => x === "PROCESSING")) return "warning";
  if (normalized.some((x) => x === "WAITING")) return "secondary";
  if (normalized.some((x) => x === "PROCESSED")) return "warning";
  return "secondary";
}

function StatusSummaryWithPopoverCell({
  value,
  statusLabels,
  columnHeaders,
}: {
  value: StatusSummaryValue;
  statusLabels?: Record<string, string> | undefined;
  columnHeaders?: {
    type: string;
    item: string;
    status: string;
  };
}) {
  const statusItems = value.statusItems ?? [];
  const summaryVariant = deriveStatusSummaryBadgeVariant(statusItems);
  const headers = columnHeaders ?? {
    type: "Type",
    item: "Item",
    status: "Status",
  };

  const content =
    statusItems.length > 0 ? (
      <div className="max-h-80 min-w-0 max-w-full overflow-y-auto overflow-x-hidden">
        <div
          className="grid grid-cols-[minmax(0,4.5rem)_minmax(0,1fr)_minmax(0,7rem)] gap-x-2 border-b border-border pb-2 text-left text-xs font-medium text-muted-foreground"
          role="row"
        >
          <span className="min-w-0 truncate">{headers.type}</span>
          <span className="min-w-0 truncate">{headers.item}</span>
          <span className="min-w-0 truncate">{headers.status}</span>
        </div>
        <ul className="m-0 list-none p-0" role="list">
          {statusItems.map((item, index) => (
            <li
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              key={`${item.type}-${item.value}-${index}`}
              className="grid grid-cols-[minmax(0,4.5rem)_minmax(0,1fr)_minmax(0,7rem)] gap-x-2 border-b border-border py-2 text-sm last:border-0"
              role="listitem"
            >
              <span className="min-w-0 truncate capitalize text-foreground">{item.type}</span>
              <span className="min-w-0 truncate text-foreground" title={item.value}>
                {item.value}
              </span>
              <div className="flex min-w-0 items-center justify-start">
                <Badge
                  variant={resolveStatusBadgeVariant(item.status)}
                  size="sm"
                  className="max-w-full truncate"
                  title={resolveStatusLabel(item.status, statusLabels)}
                >
                  {resolveStatusLabel(item.status, statusLabels)}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <span className="text-sm text-muted-foreground">—</span>
    );

  return (
    <div className="flex w-full min-w-0 items-center justify-start">
      <Popover
        size="lg"
        contentProps={{ "aria-label": "Detalhes" }}
        className="max-h-[min(85vh,32rem)] min-w-0 max-w-[min(calc(100vw-1.5rem),24rem)] overflow-hidden p-2 sm:max-w-[min(calc(100vw-2rem),26rem)] sm:p-3"
        trigger={
          <button
            type="button"
            className={cn(
              "inline-flex max-w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0",
              RENDERER_FOCUS,
            )}
            aria-haspopup="dialog"
          >
            <Badge variant={summaryVariant} size="sm" className="max-w-full truncate">
              {value.summary}
            </Badge>
          </button>
        }
        content={content}
        side="bottom"
        align="start"
      />
    </div>
  );
}

export type RenderPrizmCellArgs<TRow = unknown> = {
  value: unknown;
  row: TRow;
  rowId: string;
  meta?: PrizmCellMeta<TRow> | null;
  /** Optional getter (TanStack compat). */
  getValue?: () => unknown;
  /** Optional fallback labels for STATUS cells. */
  statusLabels?: Record<string, string>;
};

export function renderPrizmCell<TRow = unknown>({
  value,
  row,
  rowId,
  meta,
  getValue,
  statusLabels,
}: RenderPrizmCellArgs<TRow>): React.ReactNode {
  const contentRenderType = meta?.contentRenderType;
  const contentFormatType = meta?.contentFormatType;

  const resolvedLink =
    typeof meta?.link === "function"
      ? meta.link(row)
      : typeof meta?.link === "string"
        ? resolveLinkTemplate(meta.link, rowId)
        : undefined;

  const onClick = meta?.onColumnClick != null ? () => meta.onColumnClick?.(rowId, row) : undefined;

  switch (contentRenderType) {
    case ContentRenderType.STATUS:
      return (
        <StatusCell
          status={typeof value === "boolean" ? value : toText(value)}
          statusLabels={{
            ...(statusLabels ?? {}),
            ...(meta?.statusLabels as Record<string, string> | undefined),
          }}
        />
      );

    case ContentRenderType.STATUS_SUMMARY_WITH_POPOVER:
      return (
        <StatusSummaryWithPopoverCell
          value={value as StatusSummaryValue}
          statusLabels={statusLabels}
          columnHeaders={meta?.statusSummaryColumnHeaders}
        />
      );

    case ContentRenderType.TEXT_IMAGE:
      return <TextImageCell value={value as ImageWithText} link={resolvedLink} onClick={onClick} />;

    case ContentRenderType.TEXT_BUTTON:
      return (
        <TextButtonCell value={value} format={contentFormatType ?? undefined} onClick={onClick} />
      );

    case ContentRenderType.HOVER: {
      const popover = meta?.renderPopover;
      const triggerNode = <span className="truncate text-sm/6">{toText(value)}</span>;

      if (!popover) return triggerNode;
      // The trigger is a real button (06/11/2026): a span never received focus, so the keyboard
      // could not open the Popover or the HoverCard (WCAG 2.1.1 and 4.1.2).
      const triggerButton = (cursor: string) => (
        <button
          type="button"
          className={cn("max-w-full truncate text-left text-sm/6", cursor, RENDERER_FOCUS)}
        >
          {toText(value)}
        </button>
      );
      const side = toSide(popover.position);
      const content = popover.content({ row, value, getValue });

      return popover.trigger === "click" ? (
        <Popover
          contentProps={{ "aria-label": typeof popover.title === "string" ? popover.title : "Detalhes" }}
          trigger={triggerButton("cursor-pointer")}
          content={
            <div className="space-y-2">
              {popover.title ? <div className="text-sm font-medium">{popover.title}</div> : null}
              {content}
            </div>
          }
          side={side}
          align="start"
        />
      ) : (
        <HoverCard
          trigger={triggerButton("cursor-help")}
          content={
            <div className="space-y-2">
              {popover.title ? <div className="text-sm font-medium">{popover.title}</div> : null}
              {content}
            </div>
          }
          side={side}
          align="start"
        />
      );
    }

    case ContentRenderType.BADGE:
      return <BadgeCell tags={value ?? []} maxVisible={meta?.badgeMaxVisible ?? 2} />;

    default:
      return <TextCell value={value} format={contentFormatType ?? undefined} link={resolvedLink} />;
  }
}
