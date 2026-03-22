import { ChevronLeft, ChevronRight } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { createContext, createSignal, onCleanup, onMount, splitProps, useContext } from "solid-js";
import { cn } from "~/lib/cn.js";
import { Button } from "../button/button.js";

type CarouselOrientation = "horizontal" | "vertical";

interface CarouselContext {
  orientation: CarouselOrientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
}

const CarouselContext = createContext<CarouselContext>({
  orientation: "horizontal",
  scrollPrev: () => {},
  scrollNext: () => {},
  canScrollPrev: () => false,
  canScrollNext: () => false,
});

export const useCarousel = () => useContext(CarouselContext);

export type CarouselProps = {
  orientation?: CarouselOrientation;
  opts?: { loop?: boolean };
  class?: string;
  children?: JSX.Element;
};

export const Carousel: Component<CarouselProps> = (props) => {
  const [local] = splitProps(props, ["class", "orientation", "opts", "children"]);
  let containerRef!: HTMLDivElement;
  const [canScrollPrev, setCanScrollPrev] = createSignal(false);
  const [canScrollNext, setCanScrollNext] = createSignal(true);
  const orientation = () => local.orientation ?? "horizontal";

  const updateScrollState = () => {
    if (!containerRef) return;
    const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } =
      containerRef;
    if (orientation() === "horizontal") {
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(Math.round(scrollLeft + clientWidth) < scrollWidth);
    } else {
      setCanScrollPrev(scrollTop > 0);
      setCanScrollNext(Math.round(scrollTop + clientHeight) < scrollHeight);
    }
  };

  const scrollPrev = () => {
    if (!containerRef) return;
    const amount =
      orientation() === "horizontal" ? -containerRef.clientWidth : -containerRef.clientHeight;
    containerRef.scrollBy({
      left: orientation() === "horizontal" ? amount : 0,
      top: orientation() === "vertical" ? amount : 0,
      behavior: "smooth",
    });
  };

  const scrollNext = () => {
    if (!containerRef) return;
    const amount =
      orientation() === "horizontal" ? containerRef.clientWidth : containerRef.clientHeight;
    containerRef.scrollBy({
      left: orientation() === "horizontal" ? amount : 0,
      top: orientation() === "vertical" ? amount : 0,
      behavior: "smooth",
    });
  };

  onMount(() => {
    if (!containerRef) return;
    updateScrollState();
    containerRef.addEventListener("scroll", updateScrollState, { passive: true });
    onCleanup(() => containerRef.removeEventListener("scroll", updateScrollState));
  });

  return (
    <CarouselContext.Provider
      value={{ orientation: orientation(), scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <section class={cn("relative", local.class)} aria-roledescription="carousel">
        {/* Internal scroll container — referenced by children via context */}
        <div
          ref={containerRef}
          class={cn("overflow-hidden", orientation() === "horizontal" ? "flex" : "flex flex-col")}
          aria-live="polite"
          aria-atomic="false"
        >
          {local.children}
        </div>
      </section>
    </CarouselContext.Provider>
  );
};

export const CarouselContent: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { orientation } = useCarousel();
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", local.class)}
      {...rest}
    />
  );
};

export const CarouselItem: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { orientation } = useCarousel();
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      role="group"
      aria-roledescription="slide"
      class={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        local.class,
      )}
      {...rest}
    />
  );
};

export const CarouselPrevious: Component<JSX.HTMLAttributes<HTMLButtonElement>> = (props) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Button
      variant="outline"
      size="icon"
      class={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        local.class,
      )}
      disabled={!canScrollPrev()}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...rest}
    >
      <ChevronLeft class="h-4 w-4" />
    </Button>
  );
};

export const CarouselNext: Component<JSX.HTMLAttributes<HTMLButtonElement>> = (props) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Button
      variant="outline"
      size="icon"
      class={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        local.class,
      )}
      disabled={!canScrollNext()}
      onClick={scrollNext}
      aria-label="Next slide"
      {...rest}
    >
      <ChevronRight class="h-4 w-4" />
    </Button>
  );
};
