import { cn } from "../../lib/cn";
import * as React from "react";
import { kbdGroupStyles, kbdStyles } from "./kbd.styles";
import type { KbdProps } from "./kbd.types";

/**
 * Kbd — atalho de teclado estilizado (uma tecla ou várias).
 *
 * API por props:
 * - Uma tecla: <Kbd>⌘</Kbd>
 * - Várias teclas: <Kbd keys={["⌘", "K"]} />
 *
 * @see https://ui.shadcn.com/docs/components/kbd
 */
const Kbd = ({
  className,
  keys,
  children,
  ref,
  ...props
}: KbdProps & { ref?: React.Ref<HTMLElement> }) => {
  if (keys != null && keys.length > 0) {
    return (
      <span ref={ref} data-slot="kbd-group" className={cn(kbdGroupStyles, className)} {...props}>
        {keys.map((key, i) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
          <kbd key={i} data-slot="kbd" className={kbdStyles}>
            {key}
          </kbd>
        ))}
      </span>
    );
  }
  return (
    <kbd ref={ref} data-slot="kbd" className={cn(kbdStyles, className)} {...props}>
      {children}
    </kbd>
  );
};
Kbd.displayName = "Kbd";

export { Kbd };
