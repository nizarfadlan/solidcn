import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function SheetPage() {
  return (
    <DocPage
      docPath="/docs/components/sheet"
      title="Sheet"
      description="Extends the Dialog component to display content that complements the main content of the screen. Slides in from the edge. Built on Corvu Drawer."
      phase="Complex & Overlay"
      componentName="sheet"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Right side (default)",
          preview: (
            <Sheet>
              <SheetTrigger as={Button} variant="outline">
                Open Sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when done.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ),
          code: `import {
  Sheet, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";

<Sheet>
  <SheetTrigger as={Button} variant="outline">
    Open Sheet
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
        {
          title: "Left side",
          preview: (
            <Sheet>
              <SheetTrigger as={Button} variant="outline">
                Open Left
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ),
          code: `<Sheet>
  <SheetTrigger as={Button} variant="outline">
    Open Left
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
      ]}
      props={[
        {
          name: "side",
          type: '"left" | "right" | "top" | "bottom"',
          default: '"right"',
          description: "Which side the sheet slides in from",
        },
        { name: "open", type: "boolean", description: "Controlled open state" },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback on open change",
        },
      ]}
    />
  );
}
