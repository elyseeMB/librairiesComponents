import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast.tsx";
import { ToastContextProvider, Toasts, useToast } from "./useToast.tsx";
import { Button } from "../../atoms/button/Button.tsx";

const meta = {
  title: "Molecules/Toast",
  decorators: [
    (Story) => (
      <ToastContextProvider>
        <Story />
      </ToastContextProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    const { pushToast } = useToast();
    const handleToast = () => {
      pushToast({
        title: "je suis le titre du component toast",
        content: "je suis le contenu du component toast",
      });
    };
    return (
      <div>
        <Button onClick={handleToast}>render toast</Button>
      </div>
    );
  },
};
