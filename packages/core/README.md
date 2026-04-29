# @solidcn/core

Accessible, customizable SolidJS UI components built on Kobalte and corvu.

## Installation

```bash
npm install @solidcn/core @kobalte/core corvu @modular-forms/solid class-variance-authority clsx tailwind-merge
```

### Peer Dependencies

| Package | Version | Purpose |
|---|---|---|
| `solid-js` | ≥ 1.9 | Framework |
| `@kobalte/core` | ≥ 0.13 | Accessible headless primitives |
| `corvu` | ≥ 0.7 | Advanced primitives (Drawer, Resizable) |
| `@modular-forms/solid` | ≥ 0.25 | Form handling |
| `class-variance-authority` | ≥ 0.7 | Variant styling system |

### Dev Dependencies (bundled in package builds)

| Package | Purpose |
|---|---|
| `clsx` | Conditional class composition |
| `tailwind-merge` | Tailwind class deduplication |
| `lucide-solid` | Icon library |

## Architecture

Each component is a thin functional wrapper around headless primitives that:

- Accepts standard JSX element props (e.g. `JSX.ButtonHTMLAttributes`)
- Uses `splitProps` to separate variant props from rest props
- Merges classes via the `cn` helper (composed of `clsx` + `tailwind-merge`)
- Applies `class-variance-authority` for type-safe variant definitions
- Forwards remaining props to the underlying element

The `cn` utility is re-exported for use in your own components:

```ts
import { cn } from "@solidcn/core";
```

## Components

### Primitives

| Component | Path | Description |
|---|---|---|
| **Button** | `@solidcn/core/components/button` | Variant-rich button with `asChild` support |
| **Badge** | `@solidcn/core/components/badge` | Status and label badges |
| **Separator** | `@solidcn/core/components/separator` | Horizontal or vertical divider |
| **Accordion** | `@solidcn/core/components/accordion` | Collapsible content panels |
| **Checkbox** | `@solidcn/core/components/checkbox` | Boolean toggle input |
| **RadioGroup** | `@solidcn/core/components/radio-group` | Exclusive selection group |
| **Toggle** | `@solidcn/core/components/toggle` | Two-state toggle button |
| **Switch** | `@solidcn/core/components/switch` | Native-style toggle switch |
| **Slider** | `@solidcn/core/components/slider` | Range slider input |
| **Progress** | `@solidcn/core/components/progress` | Linear progress indicator |
| **Tooltip** | `@solidcn/core/components/tooltip` | Hover/focus overlay tips |
| **Popover** | `@solidcn/core/components/popover` | Floating panel with backdrop |
| **Dialog** | `@solidcn/core/components/dialog` | Modal dialog overlay |
| **AlertDialog** | `@solidcn/core/components/alert-dialog` | Confirmation dialog |

### Layout & Form

| Component | Path | Description |
|---|---|---|
| **Card** | `@solidcn/core/components/card` | Header, content, footer card layout |
| **Table** | `@solidcn/core/components/table` | Data table structure |
| **Avatar** | `@solidcn/core/components/avatar` | User avatar with fallback |
| **Skeleton** | `@solidcn/core/components/skeleton` | Loading placeholder |
| **Input** | `@solidcn/core/components/input` | Text input field |
| **Textarea** | `@solidcn/core/components/textarea` | Multi-line text input |
| **Label** | `@solidcn/core/components/label` | Form field label |
| **Form** | `@solidcn/core/components/form` | Form wrapper with `@modular-forms/solid` integration |
| **Calendar** | `@solidcn/core/components/calendar` | Date selection calendar |
| **DatePicker** | `@solidcn/core/components/date-picker` | Combined date input + calendar |
| **Command** | `@solidcn/core/components/command` | Searchable command palette |
| **Breadcrumb** | `@solidcn/core/components/breadcrumb` | Navigation trail |
| **Pagination** | `@solidcn/core/components/pagination` | Page navigation controls |
| **NavigationMenu** | `@solidcn/core/components/navigation-menu` | Horizontal nav with flyouts |
| **Menubar** | `@solidcn/core/components/menubar` | Application menu bar |

### Complex & Overlay

| Component | Path | Description |
|---|---|---|
| **Sheet** | `@solidcn/core/components/sheet` | Side-panel overlay |
| **Drawer** | `@solidcn/core/components/drawer` | Slide-up panel (corvu-based) |
| **Resizable** | `@solidcn/core/components/resizable` | Split-pane layout |
| **Carousel** | `@solidcn/core/components/carousel` | Sliding content carousel |
| **ScrollArea** | `@solidcn/core/components/scroll-area` | Custom scrollbar container |
| **Sidebar** | `@solidcn/core/components/sidebar` | Collapsible sidebar layout |
| **HoverCard** | `@solidcn/core/components/hover-card` | Hover-triggered info card |

### Selection & Dropdowns

| Component | Path | Description |
|---|---|---|
| **Select** | `@solidcn/core/components/select` | Dropdown selection menu |
| **Combobox** | `@solidcn/core/components/combobox` | Searchable dropdown input |
| **DropdownMenu** | `@solidcn/core/components/dropdown-menu` | Contextual dropdown menu |
| **ContextMenu** | `@solidcn/core/components/context-menu` | Right-click context menu |

### Organization & Tabs

| Component | Path | Description |
|---|---|---|
| **Tabs** | `@solidcn/core/components/tabs` | Tabbed content panels |
| **Collapsible** | `@solidcn/core/components/collapsible` | Show/hide container |

## Usage

### With the CLI (recommended)

Components are copied into your project — you own the code and can modify them:

```bash
npx solidcn@latest add button card
```

```tsx
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Learn more</Button>
      </CardContent>
    </Card>
  );
}
```

### As an npm package

Install and import directly:

```tsx
import { Button } from "@solidcn/core/components/button";

<Button variant="destructive" size="sm">
  Delete
</Button>;
```

## Variant Props Pattern

Components that use `class-variance-authority` export their variant helpers for external use:

```tsx
import { Button, buttonVariants } from "~/components/ui/button";

// Use buttonVariants to style custom elements consistently
const CustomLink = () => (
  <a class={buttonVariants({ variant: "outline", size: "icon" })} href="/docs">
    Docs
  </a>
);
```

## Theming

All components use CSS custom properties configured through `@solidcn/themes`. Pair with the `ThemeProvider` for runtime theme switching:

```tsx
import { ThemeProvider } from "@solidcn/themes";

<ThemeProvider>
  <App />
</ThemeProvider>;
```

## TypeScript

All components are fully typed with TypeScript. Component props extend the corresponding HTML element attributes, so standard attributes like `onClick`, `disabled`, `aria-*` are available.

```tsx
import type { ButtonProps } from "~/components/ui/button";

function MyButton(props: ButtonProps) {
  return <Button {...props} />;
}
```

## License

MIT
