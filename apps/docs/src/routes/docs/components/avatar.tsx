import { Avatar, AvatarFallback, AvatarImage } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function AvatarPage() {
  return (
    <DocPage
      docPath="/docs/components/avatar"
      title="Avatar"
      description="An image element with a fallback for representing the user. Shows initials or a placeholder when the image fails to load."
      phase="Layout & Form"
      componentName="avatar"
      manualInstall="npm install @solidcn/core"
      usage={`import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ),
          code: `import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

export function AvatarDefault() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
        },
        {
          title: "Fallback",
          preview: (
            <Avatar>
              <AvatarImage src="/broken-image.jpg" alt="@user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
          code: `import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

export function AvatarFallbackDemo() {
  return (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="@user" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}`,
        },
        {
          title: "Sizes",
          preview: (
            <div class="flex items-center gap-4">
              <Avatar class="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback class="text-xs">CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar class="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback class="text-lg">CN</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

export function AvatarSizes() {
  return (
    <div class="flex items-center gap-4">
      <Avatar class="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback class="text-xs">CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar class="h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback class="text-lg">CN</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
        },
        {
          title: "Stack",
          preview: (
            <div class="flex -space-x-2">
              <Avatar class="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar class="border-2 border-background">
                <AvatarFallback class="bg-blue-500 text-white">U2</AvatarFallback>
              </Avatar>
              <Avatar class="border-2 border-background">
                <AvatarFallback class="bg-green-500 text-white">U3</AvatarFallback>
              </Avatar>
              <Avatar class="border-2 border-background">
                <AvatarFallback class="bg-muted text-muted-foreground text-xs">+5</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

export function AvatarStack() {
  return (
    <div class="flex -space-x-2">
      <Avatar class="border-2 border-background">
        <AvatarImage src="..." alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar class="border-2 border-background">
        <AvatarFallback class="bg-blue-500 text-white">U2</AvatarFallback>
      </Avatar>
      <Avatar class="border-2 border-background">
        <AvatarFallback class="text-xs">+5</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
        },
      ]}
      props={[
        {
          name: "class",
          type: "string",
          description: "Additional CSS classes for size/shape overrides",
        },
        {
          name: "src",
          type: "string",
          description: "Image URL (on AvatarImage)",
        },
        {
          name: "alt",
          type: "string",
          description: "Accessible alt text (on AvatarImage)",
        },
      ]}
    />
  );
}
