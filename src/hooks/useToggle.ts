import { useCallback, useState } from "react";

export function useToggle(initialValue: boolean = false) {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(() => setState((s) => !s), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, toggle, setFalse] as const;
}
