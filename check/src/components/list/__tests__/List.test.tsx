import React from "react";
import { render, screen } from "@testing-library/react";

import { List } from "../List";

describe("List", () => {
  const defaultProps = {
    data: [],
    searchText: "",
  };

  it("should render list items", () => {
    render(<List {...defaultProps} data={["item one", "item two"]} />);

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("item one")).toBeInTheDocument();
    expect(screen.getByText("item two")).toBeInTheDocument();
  });

  it("should highlight search text", () => {
    render(<List data={["item one", "item two"]} searchText="it" />);

    expect(screen.getAllByRole("listitem")[0].innerHTML).toBe(
      '<span><span class="HighlightedText-highlight">it</span></span><span>em one</span>'
    );
    expect(screen.getAllByRole("listitem")[1].innerHTML).toBe(
      '<span><span class="HighlightedText-highlight">it</span></span><span>em two</span>'
    );
  });

  it("should render 'No results' text when there is no data", () => {
    render(<List {...defaultProps} />);

    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
