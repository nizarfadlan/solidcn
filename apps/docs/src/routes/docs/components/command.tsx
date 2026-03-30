import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@solidcn/core";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-solid";
import { createSignal } from "solid-js";
import { DocPage } from "../../../components/ui/DocPage.js";

function CommandDemo() {
  return (
    <Command class="rounded-lg border border-border shadow-md w-[400px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => {}}>
            <Calendar class="mr-2 h-4 w-4" stroke-width={2} />
            Calendar
          </CommandItem>
          <CommandItem onSelect={() => {}}>
            <Smile class="mr-2 h-4 w-4" stroke-width={2} />
            Search Emoji
          </CommandItem>
          <CommandItem onSelect={() => {}}>
            <Calculator class="mr-2 h-4 w-4" stroke-width={2} />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => {}}>
            <User class="mr-2 h-4 w-4" stroke-width={2} />
            Profile
            <span class="ml-auto text-xs text-muted-foreground">⌘P</span>
          </CommandItem>
          <CommandItem onSelect={() => {}}>
            <CreditCard class="mr-2 h-4 w-4" stroke-width={2} />
            Billing
            <span class="ml-auto text-xs text-muted-foreground">⌘B</span>
          </CommandItem>
          <CommandItem onSelect={() => {}}>
            <Settings class="mr-2 h-4 w-4" stroke-width={2} />
            Settings
            <span class="ml-auto text-xs text-muted-foreground">⌘S</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function CommandDialogDemo() {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <p class="text-sm text-muted-foreground mb-2">
        Press{" "}
        <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span class="text-xs">⌘</span>K
        </kbd>
      </p>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Search Emoji</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default function CommandPage() {
  return (
    <DocPage
      docPath="/docs/components/command"
      title="Command"
      description="Fast, composable command menu for SolidJS. Searchable command palette with grouping and keyboard navigation."
      phase="Layout & Form"
      componentName="command"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      examples={[
        {
          title: "Default",
          preview: <CommandDemo />,
          code: `import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from "~/components/ui/command"
import { Calendar, Calculator, Smile, Settings } from "lucide-solid"

export function CommandDefault() {
  return (
    <Command class="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar class="mr-2 h-4 w-4" />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile class="mr-2 h-4 w-4" />
            Search Emoji
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings class="mr-2 h-4 w-4" />
            Settings
            <span class="ml-auto text-xs text-muted-foreground">⌘S</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
        },
        {
          title: "Dialog",
          preview: <CommandDialogDemo />,
          code: `import {
  CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
} from "~/components/ui/command"
import { Button } from "~/components/ui/button"
import { createSignal } from "solid-js"

export function CommandDialogDemo() {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}`,
        },
      ]}
      props={[
        {
          name: "items",
          type: "CommandItem[]",
          description: "Array of command items (alternative to composable children)",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Type a command or search..."',
          description: "Placeholder text for the search input",
        },
        {
          name: "emptyMessage",
          type: "string",
          default: '"No results found."',
          description: "Message shown when no results match the query",
        },
        {
          name: "CommandItem.onSelect",
          type: "() => void",
          description: "Callback fired when item is selected",
        },
        {
          name: "CommandItem.shortcut",
          type: "string",
          description: "Keyboard shortcut label displayed on the right",
        },
        {
          name: "CommandGroup.heading",
          type: "string",
          description: "Group label shown above the items",
        },
      ]}
    />
  );
}
