import { createSignal, onMount } from "solid-js";

const STORAGE_KEY = "solidcn-docs-theme";

export type DocsTheme = "dark" | "light";

function getInitialTheme(): DocsTheme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as DocsTheme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function applyTheme(theme: DocsTheme) {
  if (typeof document === "undefined") return;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const [docsTheme, setDocsThemeSignal] = createSignal<DocsTheme>("light");

export function setDocsTheme(theme: DocsTheme) {
  setDocsThemeSignal(theme);
  applyTheme(theme);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, theme);
  }
}

export function toggleDocsTheme() {
  setDocsTheme(docsTheme() === "dark" ? "light" : "dark");
}

export function initDocsTheme() {
  onMount(() => {
    const t = getInitialTheme();
    setDocsThemeSignal(t);
    applyTheme(t);
  });
}
