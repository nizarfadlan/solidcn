import { DocPage } from "../../../components/ui/DocPage.js";

export default function SidebarPage() {
  return (
    <DocPage
      docPath="/docs/components/sidebar"
      title="Sidebar"
      description="A composable, responsive sidebar component that collapses to a Sheet on mobile. Supports left/right positioning and icon-collapse mode."
      phase="Complex & Overlay"
      componentName="sidebar"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>My App</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <main class="flex-1">
    <SidebarTrigger />
    {/* page content */}
  </main>
</SidebarProvider>`}
      examples={[
        {
          title: "Usage",
          preview: (
            <div class="rounded-lg border border-border p-4 bg-muted/30 text-sm text-muted-foreground w-full max-w-sm">
              Sidebar requires a full-page layout. See the usage code for a complete implementation.
            </div>
          ),
          code: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { Home, Settings, Users } from "lucide-solid"

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function SidebarUsage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span class="font-semibold">My App</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as="a" href={item.url}>
                      <item.icon class="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main class="flex-1 p-4">
        <SidebarTrigger />
        {/* page content */}
      </main>
    </SidebarProvider>
  )
}`,
        },
      ]}
      props={[
        {
          name: "SidebarProvider.defaultOpen",
          type: "boolean",
          default: "true",
          description: "Default open state (uncontrolled)",
        },
        {
          name: "SidebarProvider.open",
          type: "boolean",
          description: "Controlled open state",
        },
        {
          name: "SidebarProvider.onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback when open state changes",
        },
        {
          name: "Sidebar.side",
          type: '"left" | "right"',
          default: '"left"',
          description: "Which side the sidebar appears on",
        },
        {
          name: "Sidebar.variant",
          type: '"sidebar" | "floating" | "inset"',
          default: '"sidebar"',
          description: "Visual style variant of the sidebar",
        },
        {
          name: "Sidebar.collapsible",
          type: '"offcanvas" | "icon" | "none"',
          default: '"offcanvas"',
          description: "Collapse behavior — offcanvas hides it, icon shows only icons",
        },
      ]}
    />
  );
}
