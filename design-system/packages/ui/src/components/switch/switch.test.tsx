import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as React from "react";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders and toggles in uncontrolled mode", () => {
    render(<Switch aria-label="Airplane mode" />);

    const toggle = screen.getByRole("switch", { name: /airplane mode/i });
    expect(toggle).toHaveAttribute("data-state", "unchecked");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "checked");
  });

  it("calls onChange in controlled mode", () => {
    const handleChange = vi.fn();

    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch
          aria-label="Notifications"
          checked={checked}
          onChange={(value) => {
            setChecked(value);
            handleChange(value);
          }}
        />
      );
    }

    render(<Controlled />);

    const toggle = screen.getByRole("switch", { name: /notifications/i });
    fireEvent.click(toggle);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
