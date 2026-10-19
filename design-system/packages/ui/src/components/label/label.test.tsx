import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./label";

describe("Label (PRIZM / shadcn)", () => {
  it("renderiza texto do label", () => {
    render(<Label htmlFor="name">Name</Label>);
    const el = screen.getByText("Name");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("for", "name");
  });
});
