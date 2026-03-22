import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

function CardDemo() {
  return (
    <Card class="w-72">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">Deploy to Vercel, Netlify or Cloudflare Pages.</p>
      </CardContent>
      <CardFooter class="gap-2">
        <Button variant="outline" class="flex-1">
          Cancel
        </Button>
        <Button class="flex-1">Deploy</Button>
      </CardFooter>
    </Card>
  );
}

export default function CardPage() {
  return (
    <DocPage
      docPath="/docs/components/card"
      title="Card"
      description="A container with a header, content, and footer — the building block of most UIs."
      phase="Layout & Form"
      componentName="card"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Default",
          preview: <CardDemo />,
          code: `import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "~/components/ui/card";

<Card class="w-72">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">
      Deploy to Vercel, Netlify or Cloudflare Pages.
    </p>
  </CardContent>
  <CardFooter class="gap-2">
    <Button variant="outline" class="flex-1">Cancel</Button>
    <Button class="flex-1">Deploy</Button>
  </CardFooter>
</Card>`,
        },
      ]}
    />
  );
}
