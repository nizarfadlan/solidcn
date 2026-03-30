import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function ContextMenuPage() {
  return (
    <DocPage
      docPath="/docs/components/context-menu"
      title="Context Menu"
      description="Displays a menu to the user — triggered by a right-click or long-press. Built on Kobalte ContextMenu."
      phase="Core Primitives"
      componentName="context-menu"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Settings</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
      examples={[
        {
          title: "Default",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground select-none">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent class="w-64">
                <ContextMenuItem>
                  Back
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>
                  Forward
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  Reload
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Save Page As…</ContextMenuItem>
                    <ContextMenuItem>Create Shortcut…</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuLabel>Settings</ContextMenuLabel>
                <ContextMenuCheckboxItem checked>
                  Show Bookmarks Bar
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
              </ContextMenuContent>
            </ContextMenu>
          ),
          code: `import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "~/components/ui/context-menu"

export function ContextMenuDefault() {
  return (
    <ContextMenu>
      <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent class="w-64">
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save Page As…</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuLabel>Settings</ContextMenuLabel>
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
        },
      ]}
      props={[
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
      ]}
    />
  );
}
