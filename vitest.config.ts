import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@fluid-ui/react": path.resolve(__dirname, "./packages/fluid-react/src")
    }
  }
});
