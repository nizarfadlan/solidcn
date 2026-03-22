// ---------------------------------------------------------------------------
// Design token definitions for solidcn
//
// These map to CSS custom properties (--token-name) that Tailwind v4 reads.
// Consumers include the generated CSS in their entry stylesheet.
// ---------------------------------------------------------------------------

/** All semantic CSS variable token names */
export type TokenName =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring"
  | "radius"
  // Sidebar tokens
  | "sidebar"
  | "sidebar-foreground"
  | "sidebar-border"
  | "sidebar-accent"
  | "sidebar-accent-foreground"
  | "sidebar-ring"
  // Chart tokens
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5";

/** A palette is a map of token names to HSL values (no `hsl()` wrapper needed for Tailwind v4) */
export type ThemePalette = Record<TokenName, string>;

/** Represents the full light+dark definition of a theme */
export interface ThemeDefinition {
  name: string;
  label: string;
  /** Values for `light` mode */
  light: ThemePalette;
  /** Values for `dark` mode */
  dark: ThemePalette;
}

/** CSS variable prefix */
export const CSS_VAR_PREFIX = "--";

/** Returns the CSS variable declaration for a given token + value */
export function toCssVar(token: TokenName, value: string): string {
  return `${CSS_VAR_PREFIX}${token}: ${value};`;
}

/**
 * Generates a `<style>` block string (`:root { ... }` + `.dark { ... }`) from
 * a ThemeDefinition. Suitable for injecting into `<head>`.
 */
export function themeToCSS(theme: ThemeDefinition): string {
  const lightVars = (Object.entries(theme.light) as [TokenName, string][])
    .map(([k, v]) => `  ${toCssVar(k, v)}`)
    .join("\n");

  const darkVars = (Object.entries(theme.dark) as [TokenName, string][])
    .map(([k, v]) => `  ${toCssVar(k, v)}`)
    .join("\n");

  return `:root {\n${lightVars}\n}\n\n.dark {\n${darkVars}\n}`;
}

/**
 * Generates inline CSS variables as a style object for direct injection on an
 * element (e.g. via `<div style={themeToStyle(palette)}>`).
 */
export function themeToStyle(palette: ThemePalette): Record<string, string> {
  return Object.fromEntries(
    (Object.entries(palette) as [TokenName, string][]).map(([k, v]) => [
      `${CSS_VAR_PREFIX}${k}`,
      v,
    ]),
  );
}
