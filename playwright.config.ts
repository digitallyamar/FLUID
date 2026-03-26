import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000"
  },
  webServer: {
    command:
      "npm run -w @fluid-ui/react build && npm run -w @fluid-ui/docs build && npm run -w @fluid-ui/docs start -- --port 3000",
    url: "http://localhost:3000/components/button",
    reuseExistingServer: true,
    timeout: 30_000
  }
});
