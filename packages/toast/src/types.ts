import type { JSX } from "solid-js";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "success" | "error" | "warning" | "info" | "loading" | "default";

export type ToastAnimation = "spring" | "fade" | "slide" | "bounce" | "none";

export type ToastTheme = "light" | "dark" | "system";

// ---------------------------------------------------------------------------
// Standard toast types
// ---------------------------------------------------------------------------

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface StandardToastOptions {
  id?: string;
  description?: string;
  duration?: number | null;
  action?: ToastAction;
  onDismiss?: (id: string) => void;
  onAutoClose?: (id: string) => void;
  icon?: JSX.Element;
  closeButton?: boolean;
  important?: boolean;
  cancel?: ToastAction;
}

export interface StandardToastItem extends StandardToastOptions {
  id: string;
  type: ToastType;
  message: string;
  createdAt: number;
}

export interface StandardToasterProps {
  position?: ToastPosition;
  mode?: "standard";
  theme?: ToastTheme;
  richColors?: boolean;
  closeButton?: boolean;
  expand?: boolean;
  gap?: number;
  maxToasts?: number;
  offset?: { x?: number; y?: number };
  class?: string;
}

// ---------------------------------------------------------------------------
// Sileo toast types
// ---------------------------------------------------------------------------

export type SileoPreset = "default" | "flat" | "outlined" | "glass" | "dark" | "minimal";

export interface SileoStyles {
  fill?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  iconColor?: string;
}

export interface SileoButton {
  title: string;
  onClick: () => void;
}

export interface SileoToastOptions {
  id?: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
  duration?: number | null;
  preset?: SileoPreset;
  styles?: SileoStyles;
  animation?: ToastAnimation;
  button?: SileoButton;
  onDismiss?: (id: string) => void;
}

export interface SileoToastItem extends SileoToastOptions {
  id: string;
  type: ToastType;
  createdAt: number;
}

export interface SileoToasterProps {
  position?: ToastPosition;
  mode: "sileo";
  sileoPreset?: SileoPreset;
  animation?: ToastAnimation;
  maxToasts?: number;
  offset?: { x?: number; y?: number };
  class?: string;
}

// ---------------------------------------------------------------------------
// Unified Toaster props
// ---------------------------------------------------------------------------

export type ToasterProps = StandardToasterProps | SileoToasterProps;
