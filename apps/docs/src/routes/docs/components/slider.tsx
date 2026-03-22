import { Slider } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function SliderPage() {
  return (
    <DocPage
        docPath="/docs/components/slider"
        title="Slider"
        description="An input where the user selects a value from within a given range by dragging a thumb. Built on Kobalte Slider."
        phase="Core Primitives"
        componentName="slider"
        manualInstall="npm install @solidcn/core"
        examples={[
          {
            title: "With label",
            preview: (
              <div class="w-full max-w-xs">
                <Slider
                  defaultValue={[50]}
                  minValue={0}
                  maxValue={100}
                  step={1}
                  label="Volume"
                  class="w-full"
                />
              </div>
            ),
            code: `import { Slider } from "~/components/ui/slider";

<Slider
  defaultValue={[50]}
  minValue={0}
  maxValue={100}
  step={1}
  label="Volume"
  class="w-full"
/>`,
          },
          {
            title: "Range (two thumbs)",
            preview: (
              <div class="w-full max-w-xs">
                <Slider
                  defaultValue={[20, 80]}
                  minValue={0}
                  maxValue={100}
                  step={1}
                  label="Price range"
                  class="w-full"
                />
              </div>
            ),
            code: `<Slider
  defaultValue={[20, 80]}
  minValue={0}
  maxValue={100}
  label="Price range"
  class="w-full"
/>`,
          },
        ]}
        props={[
          { name: "value", type: "number[]", description: "Controlled value(s)" },
          {
            name: "defaultValue",
            type: "number[]",
            description: "Default value(s) (uncontrolled)",
          },
          {
            name: "onChange",
            type: "(value: number[]) => void",
            description: "Callback on change",
          },
          { name: "minValue", type: "number", default: "0", description: "Minimum value" },
          { name: "maxValue", type: "number", default: "100", description: "Maximum value" },
          { name: "step", type: "number", default: "1", description: "Step increment" },
          {
            name: "label",
            type: "string",
            description: "Label and value display above the slider",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables interaction",
          },
        ]}
      />
  );
}
