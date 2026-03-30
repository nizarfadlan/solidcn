import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function AlertDialogPage() {
  return (
    <DocPage
      docPath="/docs/components/alert-dialog"
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response. Built on Kobalte AlertDialog."
      phase="Core Primitives"
      componentName="alert-dialog"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

<AlertDialog>
  <AlertDialogTrigger as={Button} variant="outline">
    Delete account
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel as={Button} variant="outline">Cancel</AlertDialogCancel>
      <AlertDialogAction as={Button} variant="destructive">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      examples={[
        {
          title: "Default",
          preview: (
            <AlertDialog>
              <AlertDialogTrigger as={Button} variant="outline">
                Delete account
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel as={Button} variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction as={Button} variant="destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger as={Button} variant="outline">
        Delete account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            your account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel as={Button} variant="outline">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction as={Button} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
          name: "preventScroll",
          type: "boolean",
          default: "true",
          description: "Prevent body scroll when dialog is open",
        },
      ]}
    />
  );
}
