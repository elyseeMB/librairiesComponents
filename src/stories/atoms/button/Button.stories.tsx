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

const label = {
  button: "Button +",
};

export const AllButtons: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <div className="stack">
        <div className="hstack">
          <Button variant="primary" children={label.button} />
          <Button variant="secondary" children={label.button} />
          <Button variant="destructive" children={label.button} />
          <Button variant="outline" children={label.button} />
          <Button variant="ghost" children={label.button} />
          <Button variant="link" children={label.button} />
          <Button icon={<IconElement name="ArrowRightLine" />} />
          <Button
            variant="with-icon"
            children={label.button}
            icon={<IconElement name="MailLine" />}
          />
          <Button
            variant="loading"
            children={label.button}
            icon={<IconElement name="SpinnerLine" />}
          />
        </div>
        <div className="hstack">
          <Button disabled variant="primary" children={label.button} />
          <Button disabled variant="secondary" children={label.button} />
          <Button disabled variant="destructive" children={label.button} />
          <Button disabled variant="ghost" children={label.button} />
          <Button disabled variant="link" children={label.button} />
        </div>
        <div className="hstack">
          <Button size="large" children={label.button} />
        </div>
        <div className="hstack">
          <Button size="medium" children={label.button} />
        </div>
        <div className="hstack">
          <Button size="small" children={label.button} />
        </div>
      </div>
    </div>
  ),
};

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outilne: Story = {
  args: {
    children: "Outilne",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const Icon: Story = {
  args: {
    icon: <IconElement name="ArrowRightLine" />,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <IconElement name="MailLine" />,
    variant: "with-icon",
    children: "Login with Email",
  },
};

export const Loading: Story = {
  args: {
    variant: "loading",
    children: "Please wait",
    icon: <IconElement name="SpinnerLine" />,
  },
};
