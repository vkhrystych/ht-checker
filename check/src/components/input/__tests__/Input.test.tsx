import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "../Input";

describe("Input", () => {
  const defaultProps = {
    value: "",
    onChange: () => {},
  };

  it("should render search input", () => {
    render(<Input {...defaultProps} />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("should call onChange when user types", async () => {
    const mock = jest.fn();

    render(<Input {...defaultProps} onChange={mock} />);

    await userEvent.type(screen.getByRole("searchbox"), "t");

    expect(mock).toHaveBeenCalledWith("t");
  });
});
