import { useCallback, useState } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Dialog } from "./Dialog.tsx";

type State = {
  title?: string;
  message: string | null;
  onConfirm: () => Promise<void>;
};

const useConfirmStore = create(
  combine(
    {
      message: null,
      onConfirm: () => Promise.resolve(),
    } as State,
    (set) => ({
      open: (props: State) => {
        set(props);
      },

      close: () => {
        set({
          message: null,
        });
      },
    })
  )
);

export function useConfirm() {
  const open = useConfirmStore((state) => state.open);

  return useCallback(
    (cb: State["onConfirm"], props: Omit<State, "onConfirm">) => {
      open({
        onConfirm: cb,
        ...props,
        message: props.message,
        title: props.title ?? "Are you sure ?",
      });
    },
    [open]
  );
}

export function ConfirmDialog() {
  const { message, title, onConfirm, close } = useConfirmStore();

  const isOpen = !!message;

  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    onConfirm()
      .then(() => {
        close();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onConfirm={handleConfirm}
      onCancel={close}
      loading={loading}
    />
  );
}
