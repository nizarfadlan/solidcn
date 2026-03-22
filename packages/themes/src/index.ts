// Tokens
export type { TokenName, ThemePalette, ThemeDefinition } from "./tokens.js";
export { toCssVar, themeToCSS, themeToStyle, CSS_VAR_PREFIX } from "./tokens.js";

// Presets
export type { BuiltInTheme } from "./presets/index.js";
export {
  builtInThemes,
  getTheme,
  defaultTheme,
  slateTheme,
  zincTheme,
  roseTheme,
  blueTheme,
  greenTheme,
  orangeTheme,
} from "./presets/index.js";

// Provider
export type {
  ThemeContextValue,
  ThemeProviderProps,
  DarkModeStrategy,
  ColorScheme,
} from "./provider.js";
export { ThemeProvider, useTheme, useColorScheme } from "./provider.js";

// Generator
export type { GeneratorInput, NamedColor } from "./generator.js";
export { generateTheme, generateThemeCSS, namedColors } from "./generator.js";

// Toast sync
export type { ToastThemeVars } from "./toast-sync.js";
export { injectToastVars, defaultToastVars } from "./toast-sync.js";
