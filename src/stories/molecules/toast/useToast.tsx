import type { ComponentProps } from "react";
import { Toast } from "./Toast.tsx";
import { create } from "zustand";
import { combine } from "zustand/middleware";

type Params = ComponentProps<typeof Toast> & { duration?: number };
type ToastsItems = ComponentProps<typeof Toast> & {
  id?: number;
  timer?: ReturnType<typeof setTimeout>;
};

const duration = 3000;

const useToasts = create(
  combine({ toasts: [] as ToastsItems[] }, (set) => ({
    add: (toast: ToastsItems) => {
      const id = Date.now();
      set((state) => ({
        toasts: [{ ...toast, id }, ...state.toasts],
      }));
      setTimeout(() => {
        set((state) => ({
          toasts: [...state.toasts.filter((toast) => toast.id !== id)],
        }));
      }, duration);
    },
    remove: (id: number) =>
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      })),
  }))
);

export function useToast() {
  return {
    toast: useToasts().add,
  };
}

export function Toasts() {
  const { toasts, remove } = useToasts();
  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id} onClick={() => remove(toast.id!)}>
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
}
