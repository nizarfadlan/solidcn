# @solidcn/themes

Theme management for SolidJS applications with CSS custom properties, runtime provider, and built-in design token system.

## Installation

```bash
npm install @solidcn/themes
```

Requires `solid-js` ≥ 1.9.

## Features

- **CSS variable tokens** — design tokens expressed as semantic names (`background`, `foreground`, `primary`, etc.)
- **ThemeProvider** — declarative context provider with automatic `.dark` class management
- **7 built-in themes** — `default`, `slate`, `zinc`, `rose`, `blue`, `green`, `orange`
- **Runtime theme switching** — change palettes without page reload
- **Persistence** — color scheme preference stored in `localStorage`
- **System detection** — respects `prefers-color-scheme` by default
- **Token utilities** — convert theme objects to CSS strings or inline style maps

## Quick Start

Wrap your app with the provider:

```tsx
import { ThemeProvider } from "@solidcn/themes/provider";

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
```

Or with explicit configuration:

```tsx
import { ThemeProvider } from "@solidcn/themes/provider";

<ThemeProvider
  theme="zinc"
  colorScheme="system"
  darkModeStrategy="class"
  scope="root"
>
  <Router />
</ThemeProvider>;
```

## ThemeProvider API

```tsx
interface ThemeProviderProps {
  theme?: BuiltInTheme | ThemeDefinition;
  colorScheme?: "light" | "dark" | "system";
  darkModeStrategy?: "class" | "media";
  scope?: "root" | "self";
  storageKey?: string | null;
  children: JSX.Element;
}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `BuiltInTheme \| ThemeDefinition` | `"default"` | Initial theme palette |
| `colorScheme` | `"light" \| "dark" \| "system"` | `"system"` | Preferred color scheme |
| `darkModeStrategy` | `"class" \| "media"` | `"class"` | How to activate dark mode. `"class"` toggles `.dark` on `<html>`, `"media"` uses `prefers-color-scheme` |
| `scope` | `"root" \| "self"` | `"root"` | Where CSS variables are injected. `"root"` injects into `document.documentElement`, `"self"` applies inline on the provider wrapper |
| `storageKey` | `string \| null` | `"solidcn-color-scheme"` | `localStorage` key for persisting color scheme. Set to `null` to disable persistence |

### useTheme

Access the current theme context from any descendant component:

```tsx
import { useTheme } from "@solidcn/themes/provider";

function ThemeSwitcher() {
  const themeCtx = useTheme();

  return (
    <button onClick={() => themeCtx.setColorScheme("dark")}>
      Dark mode
    </button>
  );
}
```

Returns `ThemeContextValue`:

```ts
interface ThemeContextValue {
  theme: () => ThemeDefinition;
  colorScheme: () => "light" | "dark" | "system";
  isDark: () => boolean;
  setTheme: (theme: BuiltInTheme | ThemeDefinition) => void;
  setColorScheme: (scheme: "light" | "dark" | "system") => void;
}
```

### useColorScheme

Convenience hook with additional controls:

```tsx
import { useColorScheme } from "@solidcn/themes/provider";

function ColorSchemeToggle() {
  const { colorScheme, isDark, toggle, cycle, setColorScheme } = useColorScheme();

  return (
    <button onClick={toggle}>
      {isDark() ? "Light" : "Dark"}
    </button>
  );
}
```

Returns:

```ts
interface UseColorSchemeReturn {
  colorScheme: () => "light" | "dark" | "system";
  isDark: () => boolean;
  toggle: () => void;
  cycle: () => void;
  setColorScheme: (scheme: "light" | "dark" | "system") => void;
}
```

## Built-in Themes

Available through the presets export:

```ts
import {
  builtInThemes,
  defaultTheme,
  slateTheme,
  zincTheme,
  roseTheme,
  blueTheme,
  greenTheme,
  orangeTheme,
  getTheme,
} from "@solidcn/themes/presets";
```

Each theme implements the `ThemeDefinition` interface with `light` and `dark` color palettes.

## Custom Themes

Define your own theme by implementing `ThemeDefinition`:

```ts
import type { ThemeDefinition } from "@solidcn/themes/tokens";

const myTheme: ThemeDefinition = {
  name: "my-theme",
  label: "My Theme",
  light: {
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    primary: "221.2 83% 53.3%",
    // ...
  },
  dark: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    primary: "217.2 91.2% 59.8%",
    // ...
  },
};
```

## Token Utilities

### toCssVar

Convert a token name and value to a CSS variable declaration:

```ts
import { toCssVar } from "@solidcn/themes/tokens";

toCssVar("background", "0 0% 100%");
// "--background: 0 0% 100%"
```

### themeToCSS

Generate a complete CSS string with `:root` and `.dark` blocks:

```ts
import { themeToCSS } from "@solidcn/themes/tokens";

const css = themeToCSS(zincTheme);
// ":root { --background: ...; ... }\n\n.dark { --background: ...; ... }"
```

### themeToStyle

Generate a style object for inline injection:

```ts
import { themeToStyle } from "@solidcn/themes/tokens";

const style = themeToStyle(zincTheme.light);
// { "--background": "...", "--foreground": "...", ... }
```

## Token Names

The following semantic token names are supported:

| Token | Description |
|---|---|
| `background` | Page background |
| `foreground` | Primary text color |
| `card` | Card background |
| `card-foreground` | Card text color |
| `primary` | Primary action color |
| `primary-foreground` | Primary action text color |
| `secondary` | Secondary surface color |
| `secondary-foreground` | Secondary surface text color |
| `destructive` | Danger/destructive color |
| `destructive-foreground` | Danger text color |
| `muted` | Muted/subtle background |
| `muted-foreground` | Muted text color |
| `accent` | Accent highlight color |
| `accent-foreground` | Accent text color |
| `border` | Border color |
| `input` | Input border color |
| `ring` | Focus ring color |
| `radius` | Border radius |
| `sidebar-*` | Sidebar-specific tokens |
| `chart-*` | Chart color tokens |

## License

MIT
