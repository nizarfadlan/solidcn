import { resolve } from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.tsx"),
        "standard/index": resolve(__dirname, "src/standard/index.ts"),
        "sileo/index": resolve(__dirname, "src/sileo/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "solid-js",
        "solid-js/web",
        "solid-js/store",
        "@kobalte/core",
        "class-variance-authority",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
