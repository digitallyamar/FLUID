import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.mjs",
      formats: ["es"],
      fileName: "bundle"
    },
    outDir: "./dist",
    minify: false
  }
});
