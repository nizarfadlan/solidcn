import type { Component } from "solid-js";
import { SileoToaster } from "./sileo/toaster.js";
import { StandardToaster } from "./standard/toaster.js";
import type { ToasterProps } from "./types.js";

// Unified Toaster — delegates to Standard or Sileo based on `mode` prop
export const Toaster: Component<ToasterProps> = (props) => {
  if (props.mode === "sileo") {
    return <SileoToaster {...props} />;
  }
  return <StandardToaster {...(props as Parameters<typeof StandardToaster>[0])} />;
};

// Named exports for direct use
export { toast } from "./standard/store.js";
export { sileo } from "./sileo/store.js";
export { StandardToaster } from "./standard/toaster.js";
export { SileoToaster } from "./sileo/toaster.js";

// Types
export type {
  ToasterProps,
  StandardToasterProps,
  SileoToasterProps,
  StandardToastOptions,
  SileoToastOptions,
  SileoPreset,
  SileoStyles,
  ToastPosition,
  ToastType,
  ToastAnimation,
  ToastTheme,
} from "./types.js";
