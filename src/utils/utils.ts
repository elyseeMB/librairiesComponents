import type { Meta, ReactRenderer } from "@storybook/react";
import type { ComponentType } from "react";
import type { BaseAnnotations } from "storybook/internal/types";

export function defineMeta(
  component: ComponentType,
  args?: BaseAnnotations<
    ReactRenderer,
    React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  >["argTypes"]
) {
  return {
    title: "Atoms/Button",
    component: component,
    parameters: {
      layout: "centered",
    },
    ...args,
  } satisfies Meta<typeof component>;
}
