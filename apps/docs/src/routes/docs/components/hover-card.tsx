import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@solidcn/core";
import { CalendarDays } from "lucide-solid";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function HoverCardPage() {
  return (
    <DocPage
      docPath="/docs/components/hover-card"
      title="Hover Card"
      description="For sighted users to preview content available behind a link. Built on Kobalte HoverCard."
      phase="Complex & Overlay"
      componentName="hover-card"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger>@solidcn</HoverCardTrigger>
  <HoverCardContent>
    <p>The SolidJS component library.</p>
  </HoverCardContent>
</HoverCard>`}
      examples={[
        {
          title: "Default",
          preview: (
            <HoverCard>
              <HoverCardTrigger class="inline-flex items-center rounded-md text-sm font-medium underline underline-offset-4 cursor-pointer">
                @solidcn
              </HoverCardTrigger>
              <HoverCardContent class="w-80">
                <div class="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div class="space-y-1">
                    <h4 class="text-sm font-semibold">@solidcn</h4>
                    <p class="text-sm text-muted-foreground">
                      SolidJS port of shadcn/ui — beautiful components built with SolidJS and
                      Tailwind CSS.
                    </p>
                    <div class="flex items-center pt-2">
                      <CalendarDays class="mr-2 h-4 w-4 text-muted-foreground" stroke-width={2} />
                      <span class="text-xs text-muted-foreground">Joined December 2024</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { CalendarDays } from "lucide-solid"

export function HoverCardDefault() {
  return (
    <HoverCard>
      <HoverCardTrigger class="underline underline-offset-4 cursor-pointer">
        @solidcn
      </HoverCardTrigger>
      <HoverCardContent class="w-80">
        <div class="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">@solidcn</h4>
            <p class="text-sm text-muted-foreground">
              SolidJS port of shadcn/ui.
            </p>
            <div class="flex items-center pt-2">
              <CalendarDays class="mr-2 h-4 w-4 text-muted-foreground" />
              <span class="text-xs text-muted-foreground">Joined December 2024</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
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
          name: "openDelay",
          type: "number",
          default: "700",
          description: "Delay in ms before opening on hover",
        },
        {
          name: "closeDelay",
          type: "number",
          default: "300",
          description: "Delay in ms before closing after hover out",
        },
      ]}
    />
  );
}
