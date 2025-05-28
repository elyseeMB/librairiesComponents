import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox.tsx";
import { IconSymbols } from "../../atoms/icon/Icon.tsx";
import { TooltipContextProvider } from "../Tooltip/TooltipContext.tsx";

const meta = {
  title: "Molecules/Combobox",
  decorators: [
    (Story) => (
      <>
        <TooltipContextProvider>
          <IconSymbols />
          <Story />
        </TooltipContextProvider>
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

export const WithTooltip: Story = {
  args: {
    info: "I component With Tooltip in stories",
  },
};
