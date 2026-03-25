import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@fluid-ui/react": path.resolve(__dirname, "../../packages/fluid-react/dist")
    }
  }
});
