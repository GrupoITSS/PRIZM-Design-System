import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert (PRIZM / shadcn)", () => {
  it("renderiza título e descrição", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("tem role alert", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("aplica variant default", () => {
    render(
      <Alert variant="default">
        <AlertTitle>Title</AlertTitle>
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("bg-card");
  });

  it("aplica variant destructive", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("text-destructive");
  });

  it("aplica variant warning", () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("text-warning");
  });

  it("aplica variant success", () => {
    render(
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("text-success");
  });
});
