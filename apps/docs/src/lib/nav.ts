export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Flat list in sidebar order — used for Prev / Next on doc pages */
export function getFlatNavItems(): NavItem[] {
  return navigation.flatMap((g) => g.items);
}

export function getDocNeighbors(href: string): {
  prev: NavItem | undefined;
  next: NavItem | undefined;
} {
  const items = getFlatNavItems();
  const i = items.findIndex((item) => item.href === href);
  if (i < 0) {
    return { prev: undefined, next: undefined };
  }
  return {
    prev: i > 0 ? items[i - 1] : undefined,
    next: i < items.length - 1 ? items[i + 1] : undefined,
  };
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "CLI", href: "/docs/cli" },
      { title: "MCP Server", href: "/docs/mcp", badge: "AI" },
      { title: "Open Registry", href: "/docs/registry" },
      { title: "Forms", href: "/docs/forms" },
    ],
  },
  {
    title: "Core Primitives",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Context Menu", href: "/docs/components/context-menu" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Collapsible", href: "/docs/components/collapsible" },
    ],
  },
  {
    title: "Layout & Form",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Form", href: "/docs/components/form" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Menubar", href: "/docs/components/menubar" },
    ],
  },
  {
    title: "Complex & Overlay",
    items: [
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Resizable", href: "/docs/components/resizable" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "Scroll Area", href: "/docs/components/scroll-area" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Hover Card", href: "/docs/components/hover-card" },
    ],
  },
  {
    title: "Toast",
    items: [
      { title: "Toast — Standard", href: "/docs/components/toast" },
      { title: "Toast — Sileo", href: "/docs/components/toast-sileo", badge: "Physics" },
    ],
  },
];
