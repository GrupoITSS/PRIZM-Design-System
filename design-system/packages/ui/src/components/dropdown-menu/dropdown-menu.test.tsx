import { Button } from "../button";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DropdownMenu } from "./dropdown-menu";

describe("DropdownMenu (PRIZM / shadcn)", () => {
  it("renderiza apenas o trigger quando fechado (API simplificada)", () => {
    render(<DropdownMenu trigger={<Button>Open</Button>} items={[{ label: "Profile" }]} />);

    const trigger = screen.getByRole("button", { name: /open/i });
    expect(trigger).toBeInTheDocument();
    // Menu deve iniciar fechado (conteúdo não presente)
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });
});
