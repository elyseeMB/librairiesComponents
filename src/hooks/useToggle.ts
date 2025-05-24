import { useState } from "react";

export function useToggle(initialValue: Boolean = false) {
  const [state, setState] = useState(initialValue);
  return [state, () => setState((s) => !s), setState];
}
