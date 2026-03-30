import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function PaginationPage() {
  return (
    <DocPage
      docPath="/docs/components/pagination"
      title="Pagination"
      description="Pagination with page navigation, next and previous links."
      phase="Layout & Form"
      componentName="pagination"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: `import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "~/components/ui/pagination"

export function PaginationDefault() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
        },
      ]}
      props={[
        {
          name: "PaginationLink.isActive",
          type: "boolean",
          default: "false",
          description: "Marks this link as the current page",
        },
        {
          name: "PaginationLink.size",
          type: '"default" | "sm" | "lg" | "icon"',
          default: '"icon"',
          description: "Size variant from Button",
        },
        {
          name: "PaginationLink.href",
          type: "string",
          description: "URL for the page link",
        },
      ]}
    />
  );
}
