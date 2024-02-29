import { useEffect, useRef, useState, useDeferredValue } from "react";

import "./styles.css";
import { Input } from "../input";
import { List } from "../list";
import { useClickOutside } from "./use-click-outside";

interface AutocompleteProps {
  data: string[];
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  data: initData,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const deferredInputValue = useDeferredValue(inputValue);
  const [isListVisible, setIsListVisible] = useState(false);
  const [data, setData] = useState(() => initData);

  // TODO: extract hook and add unit tests that cover data filtering
  useEffect(() => {
    if (deferredInputValue === "") {
      setData(initData);
      return;
    }

    const filteredData = initData.filter((item) =>
      item.toLowerCase().includes(deferredInputValue.toLowerCase())
    );

    setData(filteredData);
  }, [deferredInputValue, initData]);

  const onClickOutside = useClickOutside(wrapperRef);

  onClickOutside(() => {
    setIsListVisible(false);
  });

  const handleInputFocus = () => {
    setIsListVisible(true);
  };

  return (
    <div ref={wrapperRef} className="Autocomplete">
      <Input
        value={inputValue}
        onChange={setInputValue}
        onFocus={handleInputFocus}
      />
      {isListVisible && <List data={data} searchText={inputValue} />}
    </div>
  );
};
