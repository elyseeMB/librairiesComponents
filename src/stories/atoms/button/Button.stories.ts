import type { Meta, StoryObj } from "@storybook/react";

import { Button, buttonVariants } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  // tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: buttonVariants },
  },

  //   args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Button +",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button +",
    variant: "secondary",
  },
};

export const Large: Story = {
  args: {
    children: "Button +",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    children: "Button +",
    size: "small",
  },
};
