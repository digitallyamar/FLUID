import React from "react";
import { createRoot } from "react-dom/client";
import { DocsApp } from "./DocsApp";
import "../../../packages/fluid-react/src/styles/dist/fluid.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DocsApp />
  </React.StrictMode>
);
