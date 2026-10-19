import type * as React from "react";
import type { EmptyMediaVariantProps } from "./empty.styles";

export interface EmptyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content">, EmptyMediaVariantProps {
  /**
   * `dashed`: bordered placeholder card. `plain`: no border/padding, for empty
   * states inside listings (e.g. `DataTable.emptyMessage`).
   * @default "dashed"
   */
  appearance?: "dashed" | "plain";
  /**
   * Main heading. When provided, the component uses the simplified props-based layout.
   * @example "No items yet"
   */
  title?: React.ReactNode;
  /**
   * Supporting text below the title.
   * @example "Get started by creating your first item."
   */
  description?: React.ReactNode;
  /**
   * Icon or illustration shown above the title. Rendered inside the media area.
   * @example <Inbox className="size-6" />
   */
  icon?: React.ReactNode;
  /**
   * Optional content below the header (e.g. primary action button).
   * @example <Button>Create item</Button>
   */
  content?: React.ReactNode;
  /**
   * Custom content. When `title` is not set, children are rendered as-is (escape hatch).
   * When `title` is set, children are ignored in favor of the props-based layout.
   */
  children?: React.ReactNode;
}
