// ---------------------------------------------------------------------------
// Toast Theme Sync
//
// Injects toast-specific CSS variables so that @solidcn/toast automatically
// follows the app theme set by ThemeProvider.
//
// Standard toast maps to the semantic tokens already provided by ThemeProvider.
// Sileo toast gets additional CSS variables for its SVG fill presets.
// ---------------------------------------------------------------------------

export interface ToastThemeVars {
  /** Background for standard toast */
  toastBackground?: string;
  /** Foreground for standard toast */
  toastForeground?: string;
  /** Success accent */
  toastSuccess?: string;
  /** Error accent */
  toastError?: string;
  /** Warning accent */
  toastWarning?: string;
  /** Info accent */
  toastInfo?: string;
  /** Border */
  toastBorder?: string;
  /** Sileo default fill */
  sileoFill?: string;
  /** Sileo title color */
  sileoTitle?: string;
  /** Sileo description color */
  sileoDescription?: string;
  /** Sileo border color */
  sileoBorder?: string;
}

/**
 * Injects toast theme CSS variables onto a given element (defaults to `:root`).
 *
 * Call this once after your ThemeProvider is initialized, or use the
 * `<ToastThemeSync />` component instead.
 */
export function injectToastVars(
  vars: ToastThemeVars,
  target: HTMLElement = document.documentElement,
): void {
  if (vars.toastBackground) target.style.setProperty("--toast-bg", vars.toastBackground);
  if (vars.toastForeground) target.style.setProperty("--toast-fg", vars.toastForeground);
  if (vars.toastSuccess) target.style.setProperty("--toast-success", vars.toastSuccess);
  if (vars.toastError) target.style.setProperty("--toast-error", vars.toastError);
  if (vars.toastWarning) target.style.setProperty("--toast-warning", vars.toastWarning);
  if (vars.toastInfo) target.style.setProperty("--toast-info", vars.toastInfo);
  if (vars.toastBorder) target.style.setProperty("--toast-border", vars.toastBorder);
  if (vars.sileoFill) target.style.setProperty("--sileo-fill", vars.sileoFill);
  if (vars.sileoTitle) target.style.setProperty("--sileo-title", vars.sileoTitle);
  if (vars.sileoDescription) target.style.setProperty("--sileo-description", vars.sileoDescription);
  if (vars.sileoBorder) target.style.setProperty("--sileo-border", vars.sileoBorder);
}

/**
 * Standard toast theme vars that map onto the semantic token system.
 * These use CSS `var()` references so they update automatically when
 * ThemeProvider changes the underlying tokens.
 */
export const defaultToastVars: ToastThemeVars = {
  toastBackground: "hsl(var(--popover))",
  toastForeground: "hsl(var(--popover-foreground))",
  toastSuccess: "142.1 76.2% 36.3%",
  toastError: "0 84.2% 60.2%",
  toastWarning: "38 92% 50%",
  toastInfo: "221.2 83.2% 53.3%",
  toastBorder: "hsl(var(--border))",
  sileoFill: "hsl(var(--popover))",
  sileoTitle: "hsl(var(--popover-foreground))",
  sileoDescription: "hsl(var(--muted-foreground))",
  sileoBorder: "hsl(var(--border))",
};
