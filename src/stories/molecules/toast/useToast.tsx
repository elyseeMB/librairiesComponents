import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type PropsWithChildren,
} from "react";
import { Toast } from "./Toast.tsx";

type Params = ComponentProps<typeof Toast> & { duration?: number };
type ToastsItems = ComponentProps<typeof Toast> & {
  id: number;
  timer: ReturnType<typeof setTimeout>;
};

const defaultFunc = (props: Params) => {};

const defaultValue = {
  pushToastRef: { current: defaultFunc },
};

export const ToastContext = createContext(defaultValue);

export function ToastContextProvider({ children }: PropsWithChildren) {
  const pushToastRef = useRef(defaultFunc);
  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      {children}
      <Toasts />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const { pushToastRef } = useContext(ToastContext);
  return {
    pushToast: useCallback(
      (props: Params) => {
        pushToastRef.current(props);
      },
      [pushToastRef]
    ),
  };
}

export function Toasts() {
  const [toasts, setToasts] = useState<ToastsItems[]>([]);
  const { pushToastRef } = useContext(ToastContext);

  pushToastRef.current = ({ duration, ...params }: Params) => {
    const id = Date.now();
    const timer = setTimeout(() => {
      setToasts((v) => v.filter((t) => t.id !== id));
    }, duration ?? 5 * 1000);
    const toast = { id, timer, ...params };
    setToasts((v) => [...v, toast]);
  };

  function onRemove(toast: ToastsItems) {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
  }

  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id} onClick={() => onRemove(toast)}>
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
}
