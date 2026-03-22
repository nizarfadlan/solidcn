import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const componentsDir = resolve(__dirname, "src/components");
const componentEntries = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .reduce<Record<string, string>>((acc, d) => {
    acc[`components/${d.name}/index`] = resolve(componentsDir, d.name, "index.ts");
    return acc;
  }, {});

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        ...componentEntries,
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "solid-js",
        "solid-js/web",
        "solid-js/store",
        "@kobalte/core",
        "tailwind-variants",
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
