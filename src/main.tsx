import { createRoot } from "react-dom/client";
import "./index.css";
import { App, Presentation } from "./Presentation.tsx";
import React from "react";
import { IconSymbols } from "./stories/atoms/icon/Icon.tsx";

document.body.dataset.theme = "dark";

createRoot(document.body).render(
  <React.StrictMode>
    <IconSymbols />
    <App />
  </React.StrictMode>
);
