import { Calendar } from "@solidcn/core";
import { createSignal } from "solid-js";
import { DocPage } from "../../../components/ui/DocPage.js";

function CalendarDemo() {
  const [date, setDate] = createSignal<Date>(new Date());
  return (
    <div class="flex flex-col items-center gap-4">
      <Calendar selected={date()} onSelect={setDate} class="rounded-md border border-border" />
      <p class="text-sm text-muted-foreground">
        Selected: {date()?.toLocaleDateString() ?? "None"}
      </p>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <DocPage
      docPath="/docs/components/calendar"
      title="Calendar"
      description="A date field component that allows users to enter and edit date. Custom built with full keyboard navigation."
      phase="Layout & Form"
      componentName="calendar"
      manualInstall="npm install @solidcn/core"
      usage={`import { Calendar } from "~/components/ui/calendar";
import { createSignal } from "solid-js";

export default function App() {
  const [date, setDate] = createSignal(new Date());
  return (
    <Calendar
      selected={date()}
      onSelect={setDate}
      class="rounded-md border"
    />
  );
}`}
      examples={[
        {
          title: "Default",
          preview: <CalendarDemo />,
          code: `import { Calendar } from "~/components/ui/calendar"
import { createSignal } from "solid-js"

export function CalendarDefault() {
  const [date, setDate] = createSignal<Date | undefined>(new Date())

  return (
    <div class="flex flex-col items-center gap-4">
      <Calendar
        selected={date()}
        onSelect={setDate}
        class="rounded-md border"
      />
      <p class="text-sm text-muted-foreground">
        Selected: {date()?.toLocaleDateString() ?? "None"}
      </p>
    </div>
  )
}`,
        },
        {
          title: "With disabled dates",
          preview: (
            <Calendar
              class="rounded-md border border-border"
              disabled={(date: Date) => date < new Date()}
            />
          ),
          code: `import { Calendar } from "~/components/ui/calendar"

export function CalendarWithDisabledDates() {
  return (
    <Calendar
      class="rounded-md border"
      disabled={(date) => date < new Date()}
    />
  )
}`,
        },
      ]}
      props={[
        {
          name: "selected",
          type: "Date",
          description: "Currently selected date",
        },
        {
          name: "onSelect",
          type: "(date: Date) => void",
          description: "Callback when a date is selected",
        },
        {
          name: "defaultMonth",
          type: "Date",
          description: "Month to display initially",
        },
        {
          name: "disabled",
          type: "(date: Date) => boolean",
          description: "Function to mark dates as disabled",
        },
        {
          name: "class",
          type: "string",
          description: "Additional CSS classes",
        },
      ]}
    />
  );
}
