import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-resizable-panels", () => {
  const Group = ({
    orientation,
    elementRef,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical";
    elementRef?: React.Ref<HTMLDivElement>;
  }) => <div ref={elementRef} data-panel-group-direction={orientation} {...props} />;

  const Panel: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <div data-mock="panel" {...props} />
  );

  const Separator: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <div data-mock="handle" {...props} />
  );

  return {
    Group,
    Panel,
    Separator,
  };
});

import { ResizablePanels } from "./resizable";

describe("ResizablePanels (PRIZM / Resizable)", () => {
  it("renderiza conteúdo dos painéis via API de `panels` (props based)", () => {
    render(
      <ResizablePanels
        panels={[
          { id: "left", content: <div>Left panel content</div> },
          { id: "right", content: <div>Right panel content</div> },
        ]}
      />,
    );

    expect(screen.getByText("Left panel content")).toBeInTheDocument();
    expect(screen.getByText("Right panel content")).toBeInTheDocument();
  });

  it("aplica direção na raiz do PanelGroup", () => {
    const { container } = render(
      <ResizablePanels
        direction="vertical"
        panels={[
          { id: "top", content: <div>Top</div> },
          { id: "bottom", content: <div>Bottom</div> },
        ]}
      />,
    );

    const root = container.querySelector<HTMLElement>('[data-slot="resizable-panels"]');

    expect(root).not.toBeNull();
    expect(root).toHaveAttribute("data-panel-group-direction", "vertical");
  });

  it("exibe ou esconde o grip do handle conforme `withHandle`", () => {
    const { container: withGrip } = render(
      <ResizablePanels
        withHandle
        panels={[
          { id: "left", content: <div>Left</div> },
          { id: "right", content: <div>Right</div> },
        ]}
      />,
    );

    const gripWithHandle = withGrip.querySelector('[data-slot="resizable-handle-grip"]');
    expect(gripWithHandle).not.toBeNull();

    const { container: withoutGrip } = render(
      <ResizablePanels
        withHandle={false}
        panels={[
          { id: "left", content: <div>Left</div> },
          { id: "right", content: <div>Right</div> },
        ]}
      />,
    );

    const gripWithoutHandle = withoutGrip.querySelector('[data-slot="resizable-handle-grip"]');
    expect(gripWithoutHandle).toBeNull();
  });
});
