// ---------------------------------------------------------------------------
// Theme Generator
//
// Generates a full ThemeDefinition from a base HSL color.
// Inspired by shadcn/ui's theme generator approach.
// ---------------------------------------------------------------------------

import type { ThemeDefinition, ThemePalette } from "./tokens.js";
import { themeToCSS } from "./tokens.js";

export interface GeneratorInput {
  /** Theme name (slug) */
  name: string;
  /** Display label */
  label?: string;
  /**
   * Primary color as HSL string without `hsl()` wrapper.
   * e.g. "221.2 83.2% 53.3%"
   */
  primaryHsl: string;
  /** Border radius override. Default: "0.5rem" */
  radius?: string;
}

/**
 * Parses "H S% L%" into [h, s, l] numbers.
 */
function parseHsl(hsl: string): [number, number, number] {
  const parts = hsl.trim().split(/\s+/);
  const h = Number.parseFloat(parts[0] ?? "0");
  const s = Number.parseFloat((parts[1] ?? "0").replace("%", ""));
  const l = Number.parseFloat((parts[2] ?? "0").replace("%", ""));
  return [h, s, l];
}

function toHslStr(h: number, s: number, l: number): string {
  return `${Math.round(h * 10) / 10} ${Math.round(s * 10) / 10}% ${Math.round(l * 10) / 10}%`;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Generates a light + dark ThemeDefinition from a base primary HSL color.
 *
 * Algorithm:
 * - Foreground = very dark tint of hue
 * - Background = near-white tint of hue
 * - Secondary / Muted / Accent = desaturated tints
 * - Destructive = fixed red (0 84% 60%)
 * - Border / Input = subtle tint
 * - Ring = matches primary
 */
export function generateTheme(input: GeneratorInput): ThemeDefinition {
  const [h, s, l] = parseHsl(input.primaryHsl);
  const radius = input.radius ?? "0.5rem";

  // --- Light palette ---
  const lightFgL = clamp(l * 0.08 + 4, 2, 12);
  const lightBgL = 100;
  const mutedS = clamp(s * 0.3, 2, 20);

  const light: ThemePalette = {
    background: toHslStr(h, 0, lightBgL),
    foreground: toHslStr(h, clamp(s * 0.5, 5, 50), lightFgL),
    card: toHslStr(h, 0, lightBgL),
    "card-foreground": toHslStr(h, clamp(s * 0.5, 5, 50), lightFgL),
    popover: toHslStr(h, 0, lightBgL),
    "popover-foreground": toHslStr(h, clamp(s * 0.5, 5, 50), lightFgL),
    primary: input.primaryHsl,
    "primary-foreground": l > 55 ? toHslStr(h, 10, 10) : toHslStr(h, 10, 98),
    secondary: toHslStr(h, mutedS, 95),
    "secondary-foreground": toHslStr(h, clamp(s * 0.5, 5, 50), lightFgL),
    muted: toHslStr(h, mutedS, 96),
    "muted-foreground": toHslStr(h, mutedS * 0.8, 46),
    accent: toHslStr(h, mutedS, 95),
    "accent-foreground": toHslStr(h, clamp(s * 0.5, 5, 50), lightFgL),
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "0 0% 98%",
    border: toHslStr(h, clamp(s * 0.2, 5, 30), 91),
    input: toHslStr(h, clamp(s * 0.2, 5, 30), 91),
    ring: input.primaryHsl,
    radius,
    sidebar: toHslStr(h, clamp(s * 0.15, 2, 20), 98),
    "sidebar-foreground": toHslStr(h, mutedS, 26),
    "sidebar-border": toHslStr(h, clamp(s * 0.2, 5, 30), 91),
    "sidebar-accent": toHslStr(h, clamp(s * 0.4, 4, 40), 94),
    "sidebar-accent-foreground": toHslStr(h, clamp(s, 40, 100), clamp(l - 15, 20, 45)),
    "sidebar-ring": input.primaryHsl,
    "chart-1": input.primaryHsl,
    "chart-2": toHslStr((h + 40) % 360, s * 0.9, clamp(l + 15, 40, 75)),
    "chart-3": toHslStr((h + 80) % 360, s * 0.8, clamp(l + 5, 35, 65)),
    "chart-4": toHslStr((h + 140) % 360, s * 0.7, clamp(l + 20, 50, 80)),
    "chart-5": toHslStr((h + 200) % 360, s * 0.6, clamp(l + 30, 60, 90)),
  };

  // --- Dark palette ---
  const darkBgL = clamp(l * 0.06 + 4, 3, 8);
  const darkFgL = 98;

  const dark: ThemePalette = {
    background: toHslStr(h, clamp(s * 0.1, 3, 14), darkBgL),
    foreground: toHslStr(h, 0, darkFgL),
    card: toHslStr(h, clamp(s * 0.1, 3, 14), clamp(darkBgL + 5, 7, 14)),
    "card-foreground": toHslStr(h, 0, darkFgL),
    popover: toHslStr(h, 0, clamp(darkBgL + 4, 6, 12)),
    "popover-foreground": toHslStr(h, 0, darkFgL),
    primary: toHslStr(h, clamp(s * 0.85, 40, 100), clamp(l + 5, 45, 75)),
    "primary-foreground": toHslStr(h, clamp(s * 0.6, 10, 50), clamp(l * 0.15, 8, 15)),
    secondary: toHslStr(h, clamp(s * 0.08, 2, 10), clamp(darkBgL + 10, 13, 20)),
    "secondary-foreground": toHslStr(h, 0, darkFgL),
    muted: toHslStr(h, 0, clamp(darkBgL + 10, 12, 18)),
    "muted-foreground": toHslStr(h, clamp(s * 0.05, 2, 8), 65),
    accent: toHslStr(h, clamp(s * 0.08, 3, 12), clamp(darkBgL + 10, 13, 18)),
    "accent-foreground": toHslStr(h, 0, darkFgL),
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "0 0% 98%",
    border: toHslStr(h, clamp(s * 0.05, 2, 8), clamp(darkBgL + 10, 12, 18)),
    input: toHslStr(h, clamp(s * 0.05, 2, 8), clamp(darkBgL + 10, 12, 18)),
    ring: toHslStr(h, clamp(s * 0.7, 30, 100), clamp(l * 0.55, 25, 50)),
    radius,
    sidebar: toHslStr(h, clamp(s * 0.1, 3, 14), clamp(darkBgL + 2, 5, 10)),
    "sidebar-foreground": toHslStr(h, 0, 90),
    "sidebar-border": toHslStr(h, clamp(s * 0.05, 2, 8), clamp(darkBgL + 10, 12, 18)),
    "sidebar-accent": toHslStr(h, clamp(s * 0.08, 3, 12), clamp(darkBgL + 8, 10, 16)),
    "sidebar-accent-foreground": toHslStr(h, 0, darkFgL),
    "sidebar-ring": toHslStr(h, clamp(s * 0.85, 40, 100), clamp(l + 5, 45, 75)),
    "chart-1": toHslStr(h, clamp(s * 0.85, 40, 100), clamp(l + 5, 45, 75)),
    "chart-2": toHslStr((h + 40) % 360, s * 0.8, clamp(l + 20, 50, 75)),
    "chart-3": toHslStr((h + 80) % 360, s * 0.75, clamp(l + 10, 45, 65)),
    "chart-4": toHslStr((h + 140) % 360, s * 0.65, clamp(l + 25, 55, 80)),
    "chart-5": toHslStr((h + 200) % 360, s * 0.6, clamp(l + 35, 60, 85)),
  };

  return {
    name: input.name,
    label: input.label ?? input.name,
    light,
    dark,
  };
}

/**
 * Generates a CSS string from a GeneratorInput (`:root {}` + `.dark {}`).
 */
export function generateThemeCSS(input: GeneratorInput): string {
  return themeToCSS(generateTheme(input));
}

/**
 * Common named colors for quick theme generation
 */
export const namedColors = {
  slate: "215.3 25% 26.7%",
  zinc: "240 5.9% 10%",
  stone: "25 5.3% 44.7%",
  red: "0 72.2% 50.6%",
  orange: "24.6 95% 53.1%",
  amber: "38 92% 50%",
  yellow: "45.4 93.4% 47.5%",
  lime: "84.4 81.5% 44.3%",
  green: "142.1 76.2% 36.3%",
  emerald: "160.1 84.1% 39.4%",
  teal: "172.7 66.7% 50.4%",
  cyan: "186.7 100% 42%",
  sky: "199.4 95.5% 57.5%",
  blue: "221.2 83.2% 53.3%",
  indigo: "234.5 89.5% 73.9%",
  violet: "258.3 89.5% 66.3%",
  purple: "272.1 71.7% 47.1%",
  fuchsia: "292.2 84.1% 60.6%",
  pink: "330.7 81.2% 60.4%",
  rose: "346.8 77.2% 49.8%",
} as const;

export type NamedColor = keyof typeof namedColors;
