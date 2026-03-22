import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

function AccordionDemo() {
  return (
    <Accordion collapsible class="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern via @kobalte/core.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>
          Yes. It's unstyled by default, giving you full control over styling.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          Yes! The content area animates open/close with CSS transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function AccordionPage() {
  return (
    <DocPage
        docPath="/docs/components/accordion"
        title="Accordion"
        description="A vertically stacked set of interactive headings that reveal/hide associated content. Built on Kobalte Accordion."
        phase="Core Primitives"
        componentName="accordion"
        manualInstall="npm install @solidcn/core"
        examples={[
          {
            title: "Single (collapsible)",
            preview: <AccordionDemo />,
            code: `import {
  Accordion, AccordionContent,
  AccordionItem, AccordionTrigger,
} from "~/components/ui/accordion";

<Accordion collapsible class="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. WAI-ARIA compliant via @kobalte/core.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it unstyled?</AccordionTrigger>
    <AccordionContent>
      Yes. Full control over styling.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
          },
          {
            title: "Multiple open",
            preview: (
              <Accordion multiple class="w-full max-w-md">
                <AccordionItem value="a">
                  <AccordionTrigger>Section A</AccordionTrigger>
                  <AccordionContent>Content for section A.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Section B</AccordionTrigger>
                  <AccordionContent>Content for section B.</AccordionContent>
                </AccordionItem>
              </Accordion>
            ),
            code: `<Accordion multiple class="w-full">
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Content for section A.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section B</AccordionTrigger>
    <AccordionContent>Content for section B.</AccordionContent>
  </AccordionItem>
</Accordion>`,
          },
        ]}
        props={[
          {
            name: "collapsible",
            type: "boolean",
            default: "false",
            description: "Allow closing the open item",
          },
          {
            name: "multiple",
            type: "boolean",
            default: "false",
            description: "Allow multiple items open simultaneously",
          },
          { name: "value", type: "string | string[]", description: "Controlled open item(s)" },
          {
            name: "defaultValue",
            type: "string | string[]",
            description: "Default open item(s) (uncontrolled)",
          },
          {
            name: "onChange",
            type: "(value: string | string[]) => void",
            description: "Callback on value change",
          },
        ]}
      />
  );
}
