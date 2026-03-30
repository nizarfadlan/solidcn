import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function DrawerPage() {
  return (
    <DocPage
      docPath="/docs/components/drawer"
      title="Drawer"
      description="A drawer component that slides in from the bottom. Built on Corvu Drawer with touch gesture support."
      phase="Complex & Overlay"
      componentName="drawer"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";

<Drawer>
  <DrawerTrigger as={Button}>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move Goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose as={Button} variant="outline">Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Drawer>
              <DrawerTrigger as={Button} variant="outline">
                Open Drawer
              </DrawerTrigger>
              <DrawerContent>
                <div class="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <div class="p-4 pb-0">
                    <div class="flex items-center justify-center space-x-2">
                      <div class="flex-1 text-center">
                        <div class="text-7xl font-bold tracking-tighter">350</div>
                        <div class="text-[0.70rem] uppercase text-muted-foreground">
                          Calories/day
                        </div>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose as={Button}>Submit</DrawerClose>
                    <DrawerClose as={Button} variant="outline">
                      Cancel
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ),
          code: `import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "~/components/ui/drawer"
import { Button } from "~/components/ui/button"

export function DrawerDefault() {
  return (
    <Drawer>
      <DrawerTrigger as={Button} variant="outline">Open Drawer</DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div class="p-4 pb-0">
            <div class="text-7xl font-bold text-center">350</div>
            <div class="text-xs uppercase text-muted-foreground text-center">Calories/day</div>
          </div>
          <DrawerFooter>
            <DrawerClose as={Button}>Submit</DrawerClose>
            <DrawerClose as={Button} variant="outline">Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}`,
        },
      ]}
      props={[
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Default open state (uncontrolled)",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback when open state changes",
        },
        {
          name: "snapPoints",
          type: "(number | string)[]",
          description: "Array of snap points as percentages (e.g. [0.5, 1])",
        },
        {
          name: "breakPoints",
          type: "number[]",
          description: "Breakpoints between snap points",
        },
      ]}
    />
  );
}
