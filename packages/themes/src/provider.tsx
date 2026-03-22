import type { Component, JSX } from "solid-js";
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  splitProps,
  useContext,
} from "solid-js";
import { isServer } from "solid-js/web";
import type { BuiltInTheme } from "./presets/index.js";
import { builtInThemes, defaultTheme } from "./presets/index.js";
import type { ThemeDefinition, ThemePalette } from "./tokens.js";
import { themeToStyle } from "./tokens.js";

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------

export type DarkModeStrategy = "class" | "media";
export type ColorScheme = "light" | "dark" | "system";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface ThemeContextValue {
  /** Active theme definition */
  theme: () => ThemeDefinition;
  /** Current color scheme */
  colorScheme: () => ColorScheme;
  /** Resolved dark mode — true when dark is actually applied */
  isDark: () => boolean;
  /** Set active theme by name or definition */
  setTheme: (theme: BuiltInTheme | ThemeDefinition) => void;
  /** Set color scheme */
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: () => defaultTheme,
  colorScheme: (): ColorScheme => "system",
  isDark: () => false,
  setTheme: () => {},
  setColorScheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ---------------------------------------------------------------------------
// ThemeProvider
// ---------------------------------------------------------------------------

export type ThemeProviderProps = {
  /** Initial theme — built-in name or custom definition. Default: "default" */
  theme?: BuiltInTheme | ThemeDefinition;
  /** Color scheme strategy. Default: "system" */
  colorScheme?: ColorScheme;
  /**
   * How dark mode is toggled:
   * - `"class"` — adds/removes `.dark` on `<html>` (default, Tailwind-friendly)
   * - `"media"` — reads `prefers-color-scheme` only (CSS-driven, no JS toggle)
   */
  darkModeStrategy?: DarkModeStrategy;
  /**
   * Where to inject CSS variables:
   * - `"root"` — injects on `<html>` (default, global)
   * - `"self"` — injects inline on the provider wrapper element
   */
  scope?: "root" | "self";
  /** Storage key for persisting color scheme. Set to `null` to disable persistence. */
  storageKey?: string | null;
  children: JSX.Element;
};

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  const [local] = splitProps(props, [
    "theme",
    "colorScheme",
    "darkModeStrategy",
    "scope",
    "storageKey",
    "children",
  ]);

  const strategy = () => local.darkModeStrategy ?? "class";
  const scope = () => local.scope ?? "root";
  const storageKey = () =>
    local.storageKey === undefined ? "solidcn-color-scheme" : local.storageKey;

  // Resolve initial theme
  const resolveTheme = (t: BuiltInTheme | ThemeDefinition | undefined): ThemeDefinition => {
    if (!t) return defaultTheme;
    if (typeof t === "string") return builtInThemes[t] ?? defaultTheme;
    return t;
  };

  const [theme, setThemeInternal] = createSignal<ThemeDefinition>(resolveTheme(local.theme));

  // Resolve initial color scheme from storage or prop
  const readStoredScheme = (): ColorScheme => {
    if (isServer) return "system";
    const key = storageKey();
    if (!key) return "system";
    const stored = localStorage.getItem(key);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
    return "system";
  };

  const [colorScheme, setColorSchemeInternal] = createSignal<ColorScheme>(
    local.colorScheme ?? readStoredScheme(),
  );

  // Media query signal
  const [systemIsDark, setSystemIsDark] = createSignal(false);

  onMount(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mq.addEventListener("change", handler);
    // cleanup handled by solid-js onCleanup automatically when component unmounts
  });

  const isDark = () => {
    const scheme = colorScheme();
    if (scheme === "dark") return true;
    if (scheme === "light") return false;
    return systemIsDark();
  };

  // Apply dark class to <html> when strategy is "class"
  createEffect(() => {
    if (isServer) return;
    if (strategy() !== "class") return;
    const html = document.documentElement;
    if (isDark()) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  });

  // Apply CSS variables to :root when scope is "root"
  createEffect(() => {
    if (isServer) return;
    if (scope() !== "root") return;
    const palette: ThemePalette = isDark() ? theme().dark : theme().light;
    const style = themeToStyle(palette);
    const html = document.documentElement;
    for (const [k, v] of Object.entries(style)) {
      html.style.setProperty(k, v);
    }
  });

  const setTheme = (t: BuiltInTheme | ThemeDefinition) => {
    setThemeInternal(resolveTheme(typeof t === "string" ? t : undefined) ?? (t as ThemeDefinition));
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeInternal(scheme);
    if (!isServer) {
      const key = storageKey();
      if (key) localStorage.setItem(key, scheme);
    }
  };

  const ctx: ThemeContextValue = {
    theme,
    colorScheme,
    isDark,
    setTheme,
    setColorScheme,
  };

  // When scope="self" inject inline vars on wrapper div
  const inlineStyle = () => {
    if (scope() !== "self") return {};
    const palette: ThemePalette = isDark() ? theme().dark : theme().light;
    return themeToStyle(palette);
  };

  return (
    <ThemeContext.Provider value={ctx}>
      {scope() === "self" ? (
        <div style={inlineStyle()} data-solidcn-theme={theme().name}>
          {local.children}
        </div>
      ) : (
        local.children
      )}
    </ThemeContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// DarkModeToggle — a convenience hook for toggling
// ---------------------------------------------------------------------------

export function useColorScheme() {
  const { colorScheme, setColorScheme, isDark } = useTheme();

  const toggle = () => {
    setColorScheme(isDark() ? "light" : "dark");
  };

  const cycle = () => {
    const current = colorScheme();
    const next: ColorScheme =
      current === "light" ? "dark" : current === "dark" ? "system" : "light";
    setColorScheme(next);
  };

  return { colorScheme, isDark, toggle, cycle, setColorScheme };
}
