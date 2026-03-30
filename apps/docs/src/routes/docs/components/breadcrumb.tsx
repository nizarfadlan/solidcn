import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@solidcn/core";
import { Slash } from "lucide-solid";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function BreadcrumbPage_() {
  return (
    <DocPage
      docPath="/docs/components/breadcrumb"
      title="Breadcrumb"
      description="Displays the path to the current resource using a hierarchy of links."
      phase="Layout & Form"
      componentName="breadcrumb"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Docs</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: `import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

export function BreadcrumbDefault() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
        },
        {
          title: "Custom separator",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash class="h-3 w-3" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash class="h-3 w-3" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: `import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Slash } from "lucide-solid"

export function BreadcrumbCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash class="h-3 w-3" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash class="h-3 w-3" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
        },
        {
          title: "With ellipsis",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: `import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

export function BreadcrumbWithEllipsis() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
        },
      ]}
      props={[
        {
          name: "BreadcrumbLink.href",
          type: "string",
          description: "URL for the breadcrumb link",
        },
        {
          name: "BreadcrumbSeparator.children",
          type: "JSX.Element",
          description: "Custom separator element (defaults to ChevronRight icon)",
        },
      ]}
    />
  );
}
