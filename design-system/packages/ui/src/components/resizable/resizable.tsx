import { cn } from "../../lib/cn";
import { GripVertical } from "lucide-react";
import {
  Group as ResizablePanelGroup,
  Panel as ResizablePanel,
  Separator as ResizablePanelResizeHandle,
} from "react-resizable-panels";
import * as React from "react";

import { resizableGroupClasses, resizableHandleClasses } from "./resizable.styles";
import type { ResizablePanelsProps } from "./resizable.types";

/**
 * Grupo de painéis redimensionáveis do design system PRIZM.
 *
 * **API principal baseada em props**:
 * - `panels`: array de painéis com `content` e configurações de tamanho.
 * - `direction`: "horizontal" | "vertical"
 * - `withHandle`: controla se o handle exibe um "grip" visual.
 *
 * Exemplo recomendado (sem subcomponentes):
 *
 * ```tsx
 * <ResizablePanels
 *   direction="horizontal"
 *   panels={[
 *     { content: <Sidebar />, defaultSize: 25, minSize: 15 },
 *     { content: <MainContent />, defaultSize: 75, minSize: 50 },
 *   ]}
 * />
 * ```
 *
 * O componente **não expõe subcomponentes**; toda a configuração é feita via props.
 * Internamente, utiliza `react-resizable-panels` para o comportamento de resize.
 *
 * @see https://ui.shadcn.com/docs/components/resizable
 */
function ResizablePanels({
  panels,
  direction = "horizontal",
  withHandle = true,
  className,
  ref,
  ...groupProps
}: ResizablePanelsProps & { ref?: React.Ref<HTMLDivElement> }) {
  const effectivePanels = panels ?? [];

  if (process.env.NODE_ENV !== "production") {
    if (effectivePanels.length === 0) {
      console.warn(
        "ResizablePanels: é recomendado fornecer pelo menos 2 painéis na prop `panels`.",
      );
    }
  }

  return (
    <ResizablePanelGroup
      elementRef={ref}
      data-slot="resizable-panels"
      data-panel-group-direction={direction}
      orientation={direction}
      className={cn(resizableGroupClasses, className)}
      {...groupProps}
    >
      {effectivePanels.map(
        (
          {
            id,
            content,
            className: panelClassName,
            defaultSize,
            minSize,
            maxSize,
            collapsible,
            collapsedSize,
            ...panelProps
          },
          index,
        ) => {
          const key = id ?? index;
          const isLast = index === effectivePanels.length - 1;

          return (
            <React.Fragment key={key}>
              <ResizablePanel
                defaultSize={defaultSize}
                minSize={minSize}
                maxSize={maxSize}
                collapsible={collapsible}
                collapsedSize={collapsedSize}
                className={panelClassName}
                {...panelProps}
              >
                {content}
              </ResizablePanel>

              {!isLast && (
                <ResizablePanelResizeHandle
                  data-panel-group-direction={direction}
                  className={resizableHandleClasses}
                >
                  {withHandle && (
                    <div
                      data-slot="resizable-handle-grip"
                      className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
                    >
                      <GripVertical className="h-2.5 w-2.5" aria-hidden="true" />
                    </div>
                  )}
                </ResizablePanelResizeHandle>
              )}
            </React.Fragment>
          );
        },
      )}
    </ResizablePanelGroup>
  );
}

ResizablePanels.displayName = "ResizablePanels";

export { ResizablePanels };
