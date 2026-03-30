import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@solidcn/core";
import { For } from "solid-js";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function CarouselPage() {
  return (
    <DocPage
      docPath="/docs/components/carousel"
      title="Carousel"
      description="A carousel with motion and swipe built using native scroll and SolidJS context."
      phase="Complex & Overlay"
      componentName="carousel"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Carousel class="w-full max-w-xs">
              <CarouselContent>
                <For each={Array.from({ length: 5 }, (_, i) => i + 1)}>
                  {(item) => (
                    <CarouselItem>
                      <div class="p-1">
                        <Card>
                          <CardContent class="flex aspect-square items-center justify-center p-6">
                            <span class="text-4xl font-semibold">{item}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )}
                </For>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ),
          code: `import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "~/components/ui/carousel"
import { Card, CardContent } from "~/components/ui/card"
import { For } from "solid-js"

export function CarouselDefault() {
  return (
    <Carousel class="w-full max-w-xs">
      <CarouselContent>
        <For each={[1, 2, 3, 4, 5]}>
          {(item) => (
            <CarouselItem>
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{item}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </For>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
        },
        {
          title: "Multiple items",
          preview: (
            <Carousel
              class="w-full max-w-sm"
              opts={{ loop: true }}
            >
              <CarouselContent class="-ml-1">
                <For each={Array.from({ length: 5 }, (_, i) => i + 1)}>
                  {(item) => (
                    <CarouselItem class="pl-1 basis-1/3">
                      <div class="p-1">
                        <Card>
                          <CardContent class="flex aspect-square items-center justify-center p-4">
                            <span class="text-2xl font-semibold">{item}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )}
                </For>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ),
          code: `import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "~/components/ui/carousel"
import { Card, CardContent } from "~/components/ui/card"
import { For } from "solid-js"

export function CarouselMultipleItems() {
  return (
    <Carousel class="w-full max-w-sm" opts={{ loop: true }}>
      <CarouselContent class="-ml-1">
        <For each={[1, 2, 3, 4, 5]}>
          {(item) => (
            <CarouselItem class="pl-1 basis-1/3">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-4">
                  <span class="text-2xl font-semibold">{item}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          )}
        </For>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
        },
      ]}
      props={[
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Scroll orientation of the carousel",
        },
        {
          name: "opts.loop",
          type: "boolean",
          default: "false",
          description: "Loop back to the start when reaching the end",
        },
        {
          name: "CarouselItem.class",
          type: "string",
          description: "Use basis-* to control item width (e.g. basis-1/3 for 3-per-view)",
        },
      ]}
    />
  );
}
