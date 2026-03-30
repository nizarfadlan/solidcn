import { DatePicker } from "@solidcn/core";
import { createSignal } from "solid-js";
import { DocPage } from "../../../components/ui/DocPage.js";

function DatePickerDemo() {
  const [date, setDate] = createSignal<Date | undefined>();
  return <DatePicker selected={date()} onSelect={setDate} class="w-[280px]" />;
}

export default function DatePickerPage() {
  return (
    <DocPage
      docPath="/docs/components/date-picker"
      title="Date Picker"
      description="A date picker component built using Calendar and Popover, with formatted display and keyboard navigation."
      phase="Layout & Form"
      componentName="date-picker"
      manualInstall="npm install @solidcn/core"
      usage={`import { DatePicker } from "~/components/ui/date-picker";
import { createSignal } from "solid-js";

export default function App() {
  const [date, setDate] = createSignal<Date | undefined>();

  return (
    <DatePicker
      selected={date()}
      onSelect={setDate}
      placeholder="Pick a date"
    />
  );
}`}
      examples={[
        {
          title: "Default",
          preview: <DatePickerDemo />,
          code: `import { DatePicker } from "~/components/ui/date-picker"
import { createSignal } from "solid-js"

export function DatePickerDefault() {
  const [date, setDate] = createSignal<Date | undefined>()

  return (
    <DatePicker
      selected={date()}
      onSelect={setDate}
      placeholder="Pick a date"
    />
  )
}`,
        },
        {
          title: "Custom format",
          preview: (
            <DatePicker
              placeholder="Pick a date"
              format={(d: Date) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            />
          ),
          code: `import { DatePicker } from "~/components/ui/date-picker"

export function DatePickerCustomFormat() {
  return (
    <DatePicker
      placeholder="Pick a date"
      format={(d) =>
        d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      }
    />
  )
}`,
        },
        {
          title: "Disabled",
          preview: <DatePicker placeholder="Pick a date" disabled />,
          code: `import { DatePicker } from "~/components/ui/date-picker"

export function DatePickerDisabled() {
  return (
    <DatePicker placeholder="Pick a date" disabled />
  )
}`,
        },
      ]}
      props={[
        {
          name: "selected",
          type: "Date",
          description: "Controlled selected date",
        },
        {
          name: "onSelect",
          type: "(date: Date) => void",
          description: "Callback when a date is selected",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a date"',
          description: "Placeholder text shown when no date is selected",
        },
        {
          name: "format",
          type: "(date: Date) => string",
          description: "Custom format function for the selected date display",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the date picker trigger",
        },
        {
          name: "class",
          type: "string",
          description: "Additional CSS classes (typically sets width)",
        },
      ]}
    />
  );
}
