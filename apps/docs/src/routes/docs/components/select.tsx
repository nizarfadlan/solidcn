import type { CollectionNode } from "@kobalte/core";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

const frameworks = ["SolidJS", "React", "Vue", "Svelte", "Astro"];

export default function SelectPage() {
  return (
    <DocPage
        docPath="/docs/components/select"
        title="Select"
        description="Displays a list of options for the user to pick from — triggered by a button. Built on Kobalte Select."
        phase="Core Primitives"
        componentName="select"
        manualInstall="npm install @solidcn/core"
        examples={[
          {
            title: "Default",
            preview: (
              <Select<string>
                options={frameworks}
                placeholder="Select a framework"
                itemComponent={(props: { item: CollectionNode<string> }) => (
                  <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                )}
              >
                <SelectTrigger class="w-48">{frameworks[0]}</SelectTrigger>
                <SelectContent />
              </Select>
            ),
            code: `import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from "~/components/ui/select";

const frameworks = ["SolidJS", "React", "Vue", "Svelte"];

<Select<string>
  options={frameworks}
  placeholder="Select a framework"
  itemComponent={(props) => (
    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
  )}
>
  <SelectTrigger class="w-48">
    Select a framework...
  </SelectTrigger>
  <SelectContent />
</Select>`,
          },
        ]}
        props={[
          { name: "options", type: "T[]", required: true, description: "Array of option values" },
          { name: "value", type: "T | null", description: "Controlled selected value" },
          {
            name: "onChange",
            type: "(value: T | null) => void",
            description: "Callback on selection",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Placeholder text when nothing selected",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables the select",
          },
          {
            name: "multiple",
            type: "boolean",
            default: "false",
            description: "Allow multiple selections",
          },
          {
            name: "itemComponent",
            type: "Component<{ item: ListboxItem<T> }>",
            required: true,
            description: "Render function for each option",
          },
        ]}
      />
  );
}
