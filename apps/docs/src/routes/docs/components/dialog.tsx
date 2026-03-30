import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger as={Button}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DialogPage() {
  return (
    <DocPage
      docPath="/docs/components/dialog"
      title="Dialog"
      description="A modal dialog that interrupts the user with important content, built on Kobalte."
      phase="Core Primitives"
      componentName="dialog"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Default",
          preview: <DialogDemo />,
          code: `import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogTitle, DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"

export function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger as={Button}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
        },
      ]}
      props={[
        { name: "open", type: "boolean", description: "Controlled open state" },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback when open state changes",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Initial open state (uncontrolled)",
        },
      ]}
    />
  );
}
