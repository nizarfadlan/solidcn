import { Tabs, TabsContent, TabsList, TabsTrigger } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

function TabsDemo() {
  return (
    <Tabs defaultValue="account" class="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" class="p-4 text-sm">
        Change your account settings here.
      </TabsContent>
      <TabsContent value="password" class="p-4 text-sm">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
}

export default function TabsPage() {
  return (
    <DocPage
      docPath="/docs/components/tabs"
      title="Tabs"
      description="A set of layered sections (panels) displayed one at a time. Built on Kobalte Tabs."
      phase="Core Primitives"
      componentName="tabs"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Default",
          preview: <TabsDemo />,
          code: `import {
  Tabs, TabsList, TabsTrigger, TabsContent
} from "~/components/ui/tabs";

<Tabs defaultValue="account" class="w-full">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Change your account settings here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`,
        },
      ]}
      props={[
        {
          name: "defaultValue",
          type: "string",
          description: "Default active tab (uncontrolled)",
        },
        { name: "value", type: "string", description: "Controlled active tab" },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback on tab change",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Tab orientation",
        },
      ]}
    />
  );
}
