import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuMenu,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuLinkStyle,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/components/alert-dialog",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Popover",
    href: "/docs/components/popover",
    description: "Displays rich content in a portal, triggered by a button.",
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description: "A popup that displays information related to an element.",
  },
];

export default function NavigationMenuPage() {
  return (
    <DocPage
      docPath="/docs/components/navigation-menu"
      title="Navigation Menu"
      description="A collection of links for navigating websites. Built on Kobalte NavigationMenu."
      phase="Layout & Form"
      componentName="navigation-menu"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuMenu,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuMenu>
    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="/docs">Introduction</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuMenu>
  <NavigationMenuViewport />
</NavigationMenu>`}
      examples={[
        {
          title: "Default",
          preview: (
            <NavigationMenu>
              <NavigationMenuMenu>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li class="row-span-3">
                      <NavigationMenuLink
                        class="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div class="mb-2 mt-4 text-lg font-medium">solidcn</div>
                        <p class="text-sm leading-tight text-muted-foreground">
                          SolidJS components built with Tailwind CSS.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/docs">
                        <div class="text-sm font-medium leading-none">Introduction</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Re-usable components built using SolidJS and Tailwind CSS.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/docs/installation">
                        <div class="text-sm font-medium leading-none">Installation</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          How to install dependencies and structure your app.
                        </p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuMenu>
              <NavigationMenuMenu>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <li>
                        <NavigationMenuLink href={component.href} class={navigationMenuLinkStyle}>
                          <div class="text-sm font-medium leading-none">{component.title}</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {component.description}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuMenu>
              <NavigationMenuViewport />
            </NavigationMenu>
          ),
          code: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuMenu,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuLinkStyle,
} from "~/components/ui/navigation-menu"

const components = [
  { title: "Alert Dialog", href: "/docs/...", description: "..." },
  { title: "Popover", href: "/docs/...", description: "..." },
]

export function NavigationMenuDefault() {
  return (
    <NavigationMenu>
      <NavigationMenuMenu>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-6 w-[400px]">
            <li>
              <NavigationMenuLink href="/docs">
                <div class="text-sm font-medium">Introduction</div>
                <p class="text-sm text-muted-foreground">
                  Re-usable components built using SolidJS.
                </p>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuMenu>
      <NavigationMenuMenu>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[500px] gap-3 p-4 md:grid-cols-2">
            {components.map((c) => (
              <li>
                <NavigationMenuLink href={c.href} class={navigationMenuLinkStyle}>
                  <div class="text-sm font-medium">{c.title}</div>
                  <p class="text-sm text-muted-foreground">{c.description}</p>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuMenu>
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}`,
        },
      ]}
      props={[
        {
          name: "NavigationMenuMenu",
          type: "component",
          description: "Container for a single menu (trigger + content)",
        },
        {
          name: "NavigationMenuTrigger",
          type: "component",
          description: "Button that opens the content panel",
        },
        {
          name: "NavigationMenuContent",
          type: "component",
          description: "Content panel shown when the trigger is active",
        },
        {
          name: "NavigationMenuViewport",
          type: "component",
          description: "Animated viewport wrapping all content panels",
        },
        {
          name: "NavigationMenuLink",
          type: "component",
          description: "Styled anchor link inside the content panel",
        },
      ]}
    />
  );
}
