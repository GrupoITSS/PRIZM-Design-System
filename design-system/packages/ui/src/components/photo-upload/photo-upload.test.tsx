import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhotoUpload } from "./photo-upload";

describe("PhotoUpload", () => {
  it("loading mostra o Spinner com nome, anunciado como status", () => {
    render(<PhotoUpload loading label="Foto" setValue={() => undefined} />);
    expect(screen.getByRole("status", { name: "Carregando foto" })).toBeInTheDocument();
  });

  it("sem loading, não há Spinner", () => {
    render(<PhotoUpload label="Foto" setValue={() => undefined} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
