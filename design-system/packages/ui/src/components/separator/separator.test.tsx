import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator (PRIZM / shadcn)", () => {
  it("renderiza horizontal por padrão", () => {
    const { container } = render(<Separator />);
    const el = container.querySelector("[data-orientation='horizontal']");
    expect(el).toBeInTheDocument();
  });

  it("aceita orientação vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.querySelector("[data-orientation='vertical']");
    expect(el).toBeInTheDocument();
  });

  it("usa role none quando decorativo", () => {
    const { container } = render(<Separator decorative />);
    const el = container.querySelector("[data-orientation]");
    expect(el).toHaveAttribute("role", "none");
  });
});
