# @solidcn/toast

Dual toast notification system for SolidJS — standard (shadcn/sonner-style) and Sileo (physics-based with animated presets).

## Installation

```bash
npm install @solidcn/toast class-variance-authority
```

Requires `solid-js` ≥ 1.9.

## Quick Start

Place the `Toaster` component at the root of your app:

```tsx
import { Toaster, toast } from "@solidcn/toast";

export default function App() {
  return (
    <>
      <Toaster />
      <button onClick={() => toast.success("Saved successfully!")}>
        Save
      </button>
    </>
  );
}
```

## Two Toast Modes

### Standard Mode (default)

Familiar sonner-style toasts with stacking, collapse animation, and rich colors:

```tsx
import { Toaster, toast, StandardToaster } from "@solidcn/toast";
```

```ts
// Standard toast types
toast.success("Message", options?);
toast.error("Message", options?);
toast.warning("Message", options?);
toast.info("Message", options?);
toast.loading("Message", options?);
toast.message("Message", options?);
```

### Sileo Mode

Physics-based toasts with animated presets (`spring`, `fade`, `slide`, `bounce`) and custom styling:

```tsx
import { Toaster, sileo, SileoToaster } from "@solidcn/toast";

export default function App() {
  return (
    <>
      <Toaster mode="sileo" />
      <button onClick={() => sileo.success({ title: "Done!", description: "File uploaded." })}>
        Upload
      </button>
    </>
  );
}
```

```ts
// Sileo toast types
sileo.success({ title: "Success", description? });
sileo.error({ title: "Error", description? });
sileo.warning({ title: "Warning", description? });
sileo.info({ title: "Info", description? });
sileo.loading({ title: "Loading" });
sileo.action({ title: "Action", button: { title: "Undo", onClick: fn } });
```

## Promise Toast

Both modes support promise-based toasts that transition through loading, success, and error states:

```ts
toast.promise(submitForm(), {
  loading: "Saving...",
  success: "Form submitted!",
  error: "Something went wrong.",
});
```

## Toaster Component

### StandardToaster

```tsx
interface StandardToasterProps {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  mode?: "standard";
  theme?: "light" | "dark" | "system";
  richColors?: boolean;
  closeButton?: boolean;
  expand?: boolean;
  gap?: number;
  maxToasts?: number;
  offset?: { x?: number; y?: number };
  class?: string;
}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | See above | `"bottom-right"` | Toast placement |
| `theme` | `"light" \| "dark" \| "system"` | `"system"` | Toast theme override |
| `richColors` | `boolean` | `false` | When enabled, toast color reflects type (success=green, error=red, etc.) |
| `closeButton` | `boolean` | `false` | Show dismiss button on each toast |
| `expand` | `boolean` | `false` | Keep toasts expanded instead of stacked |
| `gap` | `number` | — | Gap between stacked toasts |
| `maxToasts` | `number` | — | Maximum visible toasts |
| `offset` | `{ x?, y? }` | — | Offset from screen edge in pixels |

### SileoToaster

```tsx
interface SileoToasterProps {
  position?: ToastPosition;
  mode: "sileo";
  sileoPreset?: SileoPreset;
  animation?: ToastAnimation;
  maxToasts?: number;
  offset?: { x?: number; y?: number };
  class?: string;
}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `sileoPreset` | `"default" \| "flat" \| "outlined" \| "glass" \| "dark" \| "minimal"` | `"default"` | Visual preset |
| `animation` | `"spring" \| "fade" \| "slide" \| "bounce" \| "none"` | `"spring"` | Entrance/exit animation |

### ToastPosition (Sileo)

`"top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"`

## Toast Options

### StandardToastOptions

```ts
interface StandardToastOptions {
  id?: string;
  description?: string;
  duration?: number | null;     // null = persistent
  action?: { label: string; onClick: () => void };
  cancel?: ToastAction;
  onDismiss?: (id: string) => void;
  onAutoClose?: (id: string) => void;
  icon?: JSX.Element;
  closeButton?: boolean;
  important?: boolean;
}
```

### SileoToastOptions

```ts
interface SileoToastOptions {
  id?: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
  duration?: number | null;     // null = persistent
  preset?: "default" | "flat" | "outlined" | "glass" | "dark" | "minimal";
  styles?: {
    fill?: string;
    titleColor?: string;
    descriptionColor?: string;
    borderColor?: string;
    iconColor?: string;
  };
  animation?: "spring" | "fade" | "slide" | "bounce" | "none";
  button?: { title: string; onClick: () => void };
  onDismiss?: (id: string) => void;
}
```

## Unified Toaster

The `Toaster` component accepts a union of both modes. Use `mode="sileo"` to activate Sileo mode, otherwise defaults to standard:

```tsx
<Toaster position="top-right" richColors />       {/* Standard */}
<Toaster mode="sileo" animation="spring" />        {/* Sileo */}
```

## Dismiss

Programmatically dismiss a specific toast or all toasts:

```ts
const id = toast.success("Loading...");
toast.dismiss(id);     // specific toast
toast.dismiss();       // all toasts
```

```ts
const id = sileo.action({ title: "Processing..." });
sileo.dismiss(id);
sileo.dismiss();
```

## Exports

```ts
// Unified
export { Toaster, toast, sileo };

// Mode-specific
export { StandardToaster, SileoToaster };

// Types
export type {
  ToasterProps,
  StandardToasterProps,
  SileoToasterProps,
  StandardToastOptions,
  SileoToastOptions,
  SileoPreset,
  ToastAnimation,
};
```

## License

MIT
