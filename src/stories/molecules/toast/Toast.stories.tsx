import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast.tsx";
import { Toasts, useToast } from "./useToast.tsx";
import { Button } from "../../atoms/button/Button.tsx";

const meta = {
  title: "Molecules/Toast",
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toasts />
      </>
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
    const { toast } = useToast();
    const handleToast = () => {
      toast({
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
