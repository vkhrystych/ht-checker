import { useRef, useEffect } from "react";

/**
 * Hook that handles click and focus outside an element.
 * Implementation based on: https://www.smashingmagazine.com/2021/03/outside-focus-click-handler-react-component/
 */
export const useClickOutside = (ref: React.RefObject<HTMLElement>) => {
  const callbackRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent | TouchEvent | FocusEvent
    ) => {
      // TODO: investigate whether it's possible to remove type assertion
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    };
  }, [ref]);

  return (callback: () => void) => {
    callbackRef.current = callback;
  };
};
