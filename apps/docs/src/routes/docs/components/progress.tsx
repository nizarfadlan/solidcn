import { Progress } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function ProgressPage() {
  return (
    <DocPage
      docPath="/docs/components/progress"
      title="Progress"
      description="Displays an indicator showing the completion progress of a task. Built on Kobalte Progress."
      phase="Core Primitives"
      componentName="progress"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "With value",
          preview: (
            <div class="w-full max-w-xs">
              <Progress value={60} label="Loading..." class="w-full" />
            </div>
          ),
          code: `import { Progress } from "~/components/ui/progress"

export function ProgressWithValue() {
  return (
    <Progress value={60} label="Loading..." class="w-full" />
  )
}`,
        },
        {
          title: "Different values",
          preview: (
            <div class="w-full max-w-xs space-y-4">
              <Progress value={25} class="w-full" />
              <Progress value={50} class="w-full" />
              <Progress value={75} class="w-full" />
              <Progress value={100} class="w-full" />
            </div>
          ),
          code: `import { Progress } from "~/components/ui/progress"

export function ProgressDifferentValues() {
  return (
    <div class="space-y-4">
      <Progress value={25} class="w-full" />
      <Progress value={50} class="w-full" />
      <Progress value={75} class="w-full" />
      <Progress value={100} class="w-full" />
    </div>
  )
}`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "number",
          description: "Current progress value (0–maxValue). Omit for indeterminate.",
        },
        { name: "minValue", type: "number", default: "0", description: "Minimum value" },
        { name: "maxValue", type: "number", default: "100", description: "Maximum value" },
        { name: "label", type: "string", description: "Accessible label shown above the bar" },
        { name: "class", type: "string", description: "Additional CSS classes" },
      ]}
    />
  );
}
