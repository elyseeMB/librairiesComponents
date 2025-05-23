import { createRoot } from "react-dom/client";
import "./index.css";
import { Presentation } from "./Presentation.tsx";

document.body.dataset.theme = "dark";

createRoot(document.body).render(<Presentation />);
