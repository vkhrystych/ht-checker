interface HighlightedTextProps {
  text: string;
  searchText: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchText,
}) => {
  if (searchText === "") {
    return <>{text}</>;
  }

  const parts = text
    .split(new RegExp(`(${searchText})`, "gi"))
    .filter((item) => item);

  return (
    <>
      {parts.map((part, i) => {
        return (
          <span key={i}>
            {part.toLowerCase() === searchText.toLowerCase() ? (
              <span className="HighlightedText-highlight">{part}</span>
            ) : (
              part
            )}
          </span>
        );
      })}
    </>
  );
};
