import React from "react";

import "./styles.css";
import { HighlightedText } from "./HighlightedText";

interface ListProps {
  data: string[];
  searchText: string;
}

export const List: React.FC<ListProps> = ({ data, searchText }) => {
  return (
    <div className="List">
      {data.length === 0 ? (
        <div className="List-no-results">No results</div>
      ) : (
        <ul className="List-list">
          {data.map((item, index) => (
            <li key={index} tabIndex={0} className="List-item">
              <HighlightedText text={item} searchText={searchText} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
