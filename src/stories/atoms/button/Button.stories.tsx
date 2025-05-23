import type { Meta, StoryObj } from "@storybook/react";

import { Button, buttonVariants } from "./Button.tsx";
import { Icon as IconElement, IconName, IconSymbols } from "../icon/Icon.tsx";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  decorators: [
    (Story) => (
      <>
        <IconSymbols />
        <Story />
      </>
    ),
  ],
  argTypes: {
    variant: { control: "select", options: IconName },
  },

  //   args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Icon: Story = {
  args: {
    icon: <IconElement name="ArrowRightLine" />,
  },
};
