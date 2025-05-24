import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox.tsx";
import { IconSymbols } from "../../atoms/icon/Icon.tsx";

const meta = {
  title: "Molecules/Combobox",
  decorators: [
    (Story) => (
      <>
        <IconSymbols />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
