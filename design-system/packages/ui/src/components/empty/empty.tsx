import { cn } from "../../lib/cn";
import * as React from "react";
import {
  emptyContentStyles,
  emptyDescriptionStyles,
  emptyHeaderStyles,
  emptyMediaVariants,
  emptyPlainStyles,
  emptyRootStyles,
  emptyTitleStyles,
} from "./empty.styles";
import type { EmptyProps } from "./empty.types";

/**
 * Empty — empty state placeholder (no items, no results, etc.).
 *
 * **Simplified API (recommended):** Pass `title`, `description`, `icon`, `content` as props.
 * Example: `<Empty title="No items" description="Get started by adding one." icon={<Inbox />} content={<Button>Add</Button>} />`
 *
 * **Composition (escape hatch):** Omit `title` and pass `children` for full custom layout.
 *
 * @see [Empty state patterns](https://ui.shadcn.com/docs/components/empty)
 */
const Empty = ({
  className,
  title,
  description,
  icon,
  mediaVariant = "default",
  appearance = "dashed",
  content,
  children,
  ref,
  ...props
}: EmptyProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const useSimplifiedAPI = title !== undefined;
  const isPlain = appearance === "plain";

  return (
    <div
      ref={ref}
      data-slot="empty"
      data-appearance={appearance}
      className={cn(emptyRootStyles, isPlain && emptyPlainStyles.root, className)}
      {...props}
    >
      {useSimplifiedAPI ? (
        <>
          <div
            data-slot="empty-header"
            className={cn(emptyHeaderStyles, isPlain && emptyPlainStyles.header)}
          >
            {icon != null ? (
              <div
                data-slot="empty-icon"
                data-variant={mediaVariant}
                className={cn(
                  emptyMediaVariants({ mediaVariant }),
                  isPlain && emptyPlainStyles.icon,
                )}
              >
                {icon}
              </div>
            ) : null}
            <div data-slot="empty-title" className={emptyTitleStyles}>
              {title}
            </div>
            {description != null ? (
              <div
                data-slot="empty-description"
                className={cn(emptyDescriptionStyles, isPlain && emptyPlainStyles.description)}
              >
                {description}
              </div>
            ) : null}
          </div>
          {content != null ? (
            <div data-slot="empty-content" className={emptyContentStyles}>
              {content}
            </div>
          ) : null}
        </>
      ) : (
        children
      )}
    </div>
  );
};
Empty.displayName = "Empty";

export { Empty };
