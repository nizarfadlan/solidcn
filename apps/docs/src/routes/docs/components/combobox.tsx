import { Combobox, ComboboxContent, ComboboxItem, ComboboxTrigger } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export default function ComboboxPage() {
  return (
    <DocPage
      docPath="/docs/components/combobox"
      title="Combobox"
      description="Autocomplete input and command palette with a list of suggestions. Built on Kobalte Combobox."
      phase="Core Primitives"
      componentName="combobox"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxTrigger,
} from "~/components/ui/combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
];

<Combobox
  options={frameworks}
  optionValue="value"
  optionLabel="label"
  optionTextValue="label"
  placeholder="Select a framework..."
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
  )}
>
  <ComboboxTrigger />
  <ComboboxContent />
</Combobox>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Combobox
              options={frameworks}
              optionValue="value"
              optionLabel="label"
              optionTextValue="label"
              placeholder="Select a framework..."
              class="w-[220px]"
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
              )}
            >
              <ComboboxTrigger />
              <ComboboxContent />
            </Combobox>
          ),
          code: `import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxTrigger,
} from "~/components/ui/combobox"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function ComboboxDefault() {
  return (
    <Combobox
      options={frameworks}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      placeholder="Select a framework..."
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
    >
      <ComboboxTrigger />
      <ComboboxContent />
    </Combobox>
  )
}`,
        },
      ]}
      props={[
        {
          name: "options",
          type: "T[]",
          required: true,
          description: "Array of items to display",
        },
        {
          name: "optionValue",
          type: "keyof T | string",
          required: true,
          description: "Key used as the item's value",
        },
        {
          name: "optionLabel",
          type: "keyof T | string",
          required: true,
          description: "Key used to display the item",
        },
        {
          name: "optionTextValue",
          type: "keyof T | string",
          description: "Key used for filtering",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when nothing is selected",
        },
        {
          name: "value",
          type: "T | null",
          description: "Controlled selected value",
        },
        {
          name: "defaultValue",
          type: "T | null",
          description: "Default selected value (uncontrolled)",
        },
        {
          name: "onChange",
          type: "(value: T | null) => void",
          description: "Callback when selection changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the combobox",
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description: "Allows multiple selections",
        },
      ]}
    />
  );
}
