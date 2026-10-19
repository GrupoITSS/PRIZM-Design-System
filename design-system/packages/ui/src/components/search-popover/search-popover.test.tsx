import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../input";
import { SearchPopover } from "./search-popover";

describe("SearchPopover", () => {
  it("renderiza o painel com data-slot quando aberto", () => {
    render(
      <SearchPopover
        open
        onOpenChange={() => undefined}
        anchor={
          <div>
            <Input aria-label="Buscar" />
          </div>
        }
      >
        <p>Sugestões</p>
      </SearchPopover>,
    );

    expect(screen.getByText("Sugestões")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("data-slot", "popover-content");
  });
});
