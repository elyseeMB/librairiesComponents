import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog.tsx";
import { Button } from "../../atoms/button/Button.tsx";
import { ConfirmDialog, useConfirm } from "./ConfirmDialog.tsx";
import { IconSymbols } from "../../atoms/icon/Icon.tsx";

const meta = {
  title: "Molecules/Dialog",
  component: Dialog,
  argTypes: {},
  decorators: [
    (Story) => (
      <>
        <Story />
        <IconSymbols />
        <ConfirmDialog />
      </>
    ),
  ],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

//@ts-ignore
export const Default: Story = {
  parameters: {
    layout: "centered",
  },
  render: () => {
    const confirm = useConfirm();
    const handleConfirm = () => {
      confirm(
        () =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              document.body.style.background = "gray";
              window.requestAnimationFrame(() => resolve());
            }, 3000);
          }),
        {
          message: "je suis le message",
        }
      );
    };
    return <Button children="Dialog" onClick={handleConfirm} />;
  },
};
