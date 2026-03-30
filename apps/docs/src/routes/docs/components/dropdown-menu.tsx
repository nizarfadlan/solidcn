import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@solidcn/core";
import { User } from "lucide-solid";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function DropdownMenuPage() {
  return (
    <DocPage
      docPath="/docs/components/dropdown-menu"
      title="Dropdown Menu"
      description="Displays a menu to the user — such as a set of actions or functions — triggered by a button. Built on Kobalte DropdownMenu."
      phase="Core Primitives"
      componentName="dropdown-menu"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger as={Button} variant="outline">
    Open
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      examples={[
        {
          title: "Default",
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger as={Button} variant="outline">
                <User class="mr-2 h-4 w-4" stroke-width={2} />
                My Account
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { User } from "lucide-solid"

export function DropdownMenuDefault() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} variant="outline">
        <User class="mr-2 h-4 w-4" />
        My Account
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
        },
        {
          title: "With submenu",
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger as={Button} variant="outline">
                Open
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-48">
                <DropdownMenuItem>New Tab</DropdownMenuItem>
                <DropdownMenuItem>New Window</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Save Page As…</DropdownMenuItem>
                    <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"

export function DropdownMenuWithSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} variant="outline">Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Save Page As…</DropdownMenuItem>
            <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
        },
        {
          title: "With checkboxes",
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger as={Button} variant="outline">
                View
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-48">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Panel</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: `import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"

export function DropdownMenuWithCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} variant="outline">View</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Panel</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
        },
      ]}
      props={[
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Default open state (uncontrolled)",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback when open state changes",
        },
        {
          name: "modal",
          type: "boolean",
          default: "true",
          description: "Whether the menu behaves as a modal",
        },
        {
          name: "placement",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom-start"',
          description: "Preferred placement of the menu",
        },
      ]}
    />
  );
}
