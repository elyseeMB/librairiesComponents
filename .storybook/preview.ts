import type { Preview } from "@storybook/react";
import "../src/index.css";

document.body.dataset.theme = "dark";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
