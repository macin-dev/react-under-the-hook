import { useEffect, useState } from "react";

export const useLocalStorageState = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storage = localStorage.getItem(key);
    return JSON.parse(storage) || initialState;
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
