import { resolve } from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: { "~": resolve(__dirname, "./src") },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        tokens: resolve(__dirname, "src/tokens.ts"),
        "presets/index": resolve(__dirname, "src/presets/index.ts"),
        provider: resolve(__dirname, "src/provider.tsx"),
        generator: resolve(__dirname, "src/generator.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
    },
  },
});
