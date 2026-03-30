import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["solid-js", "solid-js/web", "solid-js/store", "@kobalte/core"],
    },
  },
  server: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/404"],
    },
  },
});
