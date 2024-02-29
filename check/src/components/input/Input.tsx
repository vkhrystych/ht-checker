import { ChangeEvent } from "react";

import "./styles.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange, onFocus }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label htmlFor="search" className="VisuallyHidden">
        Search
      </label>
      <input
        id="search"
        className="Input"
        type="search"
        placeholder="Search pokemon"
        value={value}
        onChange={handleOnChange}
        onFocus={onFocus}
      />
    </>
  );
};
