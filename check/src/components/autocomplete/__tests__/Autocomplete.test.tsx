import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Autocomplete } from "../Autocomplete";

describe("Autocomplete", () => {
  it("shouldn't show list on initial render", () => {
    render(<Autocomplete data={["item one"]} />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("should show list when user clicks on input", async () => {
    render(<Autocomplete data={["item one"]} />);

    await userEvent.click(screen.getByRole("searchbox"));

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("should hide list when user clicks element outside of Autocomplete", async () => {
    render(
      <>
        <Autocomplete data={["item one"]} />
        <button>Dummy</button>
      </>
    );

    await userEvent.click(screen.getByRole("searchbox"));
    await userEvent.click(screen.getByRole("button"));

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("should hide list when user focus element outside of Autocomplete", async () => {
    render(
      <>
        <Autocomplete data={["item one"]} />
        <button>Dummy</button>
      </>
    );

    await userEvent.click(screen.getByRole("searchbox"));
    act(() => {
      screen.getByRole("button").focus();
    });

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("shouldn't hide list when user clicks element inside Autocomplete", async () => {
    render(<Autocomplete data={["item one"]} />);

    await userEvent.click(screen.getByRole("searchbox"));
    await userEvent.click(screen.getByRole("listitem"));

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("shouldn't hide list when user focus element inside Autocomplete", async () => {
    render(<Autocomplete data={["item one"]} />);

    await userEvent.click(screen.getByRole("searchbox"));
    act(() => {
      screen.getByRole("listitem").focus();
    });

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
});
