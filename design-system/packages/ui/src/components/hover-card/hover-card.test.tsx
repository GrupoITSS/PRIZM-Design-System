import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HoverCard } from "./hover-card";

describe("HoverCard (PRIZM / Radix)", () => {
  it("renderiza trigger e conteúdo via API de props", () => {
    render(
      <HoverCard
        open
        trigger={<button>Trigger hover</button>}
        content={<span>Conteúdo do hover card</span>}
      />,
    );

    expect(screen.getByRole("button", { name: /trigger hover/i })).toBeInTheDocument();

    expect(screen.getByText(/conteúdo do hover card/i)).toBeInTheDocument();
  });
});
