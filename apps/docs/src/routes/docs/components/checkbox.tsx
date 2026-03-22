import { Checkbox } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function CheckboxPage() {
  return (
    <DocPage
        docPath="/docs/components/checkbox"
        title="Checkbox"
        description="A control that allows the user to toggle between checked and not checked. Built on Kobalte Checkbox."
        phase="Core Primitives"
        componentName="checkbox"
        manualInstall="npm install @solidcn/core"
        examples={[
          {
            title: "With label",
            preview: <Checkbox label="Accept terms and conditions" />,
            code: `import { Checkbox } from "~/components/ui/checkbox";

<Checkbox label="Accept terms and conditions" />`,
          },
          {
            title: "Default checked",
            preview: <Checkbox label="Subscribed to newsletter" defaultChecked />,
            code: `<Checkbox label="Subscribed to newsletter" defaultChecked />`,
          },
          {
            title: "Disabled",
            preview: <Checkbox label="Disabled option" disabled />,
            code: `<Checkbox label="Disabled option" disabled />`,
          },
        ]}
        props={[
          {
            name: "label",
            type: "string",
            description: "Label text displayed next to the checkbox",
          },
          {
            name: "checked",
            type: "boolean | 'indeterminate'",
            description: "Controlled checked state",
          },
          {
            name: "defaultChecked",
            type: "boolean",
            default: "false",
            description: "Default state (uncontrolled)",
          },
          {
            name: "onCheckedChange",
            type: "(checked: boolean) => void",
            description: "Callback on change",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables interaction",
          },
          {
            name: "required",
            type: "boolean",
            default: "false",
            description: "Marks as required in a form",
          },
        ]}
      />
  );
}
