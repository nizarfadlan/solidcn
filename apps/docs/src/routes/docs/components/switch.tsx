import { Switch } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function SwitchPage() {
  return (
    <DocPage
      docPath="/docs/components/switch"
      title="Switch"
      description="A control that allows the user to toggle between checked and unchecked states. Built on Kobalte Switch."
      phase="Core Primitives"
      componentName="switch"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "With label",
          preview: <Switch label="Airplane Mode" />,
          code: `import { Switch } from "~/components/ui/switch"

export function SwitchWithLabel() {
  return (
    <Switch label="Airplane Mode" />
  )
}`,
        },
        {
          title: "Default checked",
          preview: <Switch label="Dark mode" defaultChecked />,
          code: `import { Switch } from "~/components/ui/switch"

export function SwitchDefaultChecked() {
  return (
    <Switch label="Dark mode" defaultChecked />
  )
}`,
        },
        {
          title: "Disabled",
          preview: <Switch label="Notifications" disabled />,
          code: `import { Switch } from "~/components/ui/switch"

export function SwitchDisabled() {
  return (
    <Switch label="Notifications" disabled />
  )
}`,
        },
      ]}
      props={[
        { name: "label", type: "string", description: "Label shown next to the switch" },
        { name: "checked", type: "boolean", description: "Controlled checked state" },
        {
          name: "defaultChecked",
          type: "boolean",
          default: "false",
          description: "Default checked (uncontrolled)",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Callback when state changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents interaction",
        },
      ]}
    />
  );
}
